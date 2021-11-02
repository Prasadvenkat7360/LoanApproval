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

$("#stoneVendorMasterCreate").hide();
$("#headerSection").show();
$("#stoneVendorMasterCreate").hide();
$("#footerSection").hide();


$("#Show_ShapeC").hide();
$("#showClarityC").hide();
$("#showActualColorC").hide();
$("#showColorC").hide();
$("#showCutGradeC").hide();


var redirect = function() {
	window.location.href = "javascript:showContentPage('vendorStoneSearch', 'bodySwitcher')";
	return window.location.href;
}

$("#create").on('click', function(){
	$("#stoneVendorMasterCreate").show();
	$("#headerSection").hide();
	$("#footerSection").hide();
	loadLovCreate();
});

$("#addVendorStone").on('click', function(){
	var vendorCodeC = $("#vendorCodeC-value").val();
	var stoneSegmentC = $("#stoneSegmentC option:selected").attr('ide');
	var stoneCategoryC = $("#stoneCategoryC").val();
	var ShapeC = $("#ShapeC").val();	
	var stoneCodeC = $("#stoneCodeC").val();	
	var clarityC = $("#clarityC").val();	
	var actualColorC = $("#actualColorC").val();	
	var colorC = $("#colorC").val();	
	var uomC = $("#uomC").val();	
	var cutGradeC = $("#cutGradeC").val();	
	var handlingCharges = $("#handlingCharges").val();
	var subCategoryC = $("#subCategoryC").val();
	var vHsnCode = $("#vendorHsnCodeC").val();
	var cHsnCode = $("#compHsnCodeC").val();
	
	
	//var data = "'" + $("#stoneSegmentC option:selected").text() + " " + $("#stoneCategoryC option:selected").text() + " " + $("#ShapeC option:selected").text() + " " + $("#clarityC option:selected").text() + " " + $("#colorC option:selected").text() + " " + $("#cutGradeC option:selected").text() +  "'" ;
	if(stoneSegmentC == "" || stoneSegmentC == null){
		$.growl.error({
			message : "Please select mandatory fields.",
			duration : 10000
		});
		return false;
	}
	
	if(stoneSegmentC == "DI"){
		if(vendorCodeC == "" || stoneCategoryC == "" || ShapeC == "" || stoneCodeC == "" || clarityC == "" ||  colorC == "" || uomC == "" || cutGradeC  == ""|| vHsnCode == "" || cHsnCode == ""){
			
			$.growl.error({
				message : "Please select mandatory fields.",
				duration : 10000
			});
			return false;
			
		}
		if(stoneCategoryC == 36 || stoneCategoryC == 37 || stoneCategoryC == 38){
			if(actualColorC == ""){
				$.growl.error({
					message : "Please select actual color.",
					duration : 10000
				});
				return false;
			}
		}
		
	}
	else{
		if(vendorCodeC == "" || stoneCategoryC == "" || stoneCodeC == "" || uomC == "" || subCategoryC == "" || vHsnCode == "" || cHsnCode == ""){
			$.growl.error({
				message : "Please select mandatory fields.",
				duration : 10000
			});
			return false;
		}
	}
	$("#vendorStoneCreateGrid").show();	
	vendorStoneCreateGridFunc();
	$("#vendorStoneCreateGrid").jqxGrid('clear');
	
	$(this).prop('disabled', true);
	
	$("#vendorCodeC").prop('disabled', true);
	$("#stoneSegmentC").prop('disabled', true);
	$("#stoneCategoryC").prop('disabled', true);
	$("#subCategoryC").prop('disabled', true);
	$("#handlingCharges").prop('disabled', true);
	$("#ShapeC").prop('disabled', true);
	$("#clarityC").prop('disabled', true);
	$("#actualColorC").prop('disabled', true);
	$("#colorC").prop('disabled', true);
	$("#cutGradeC").prop('disabled', true);
	$("#vendorHsnCodeC").prop('disabled', true);
	$("#compHsnCodeC").prop('disabled', true);
	
	$("#footerSection").show();
});

$("#resetVendorStone").on('click', function(){
	redirect();
	$("#vendorCodeC-value").val(null);
	$('#createStoneVendor').trigger("reset");
	$("#vendorStoneCreateGrid").hide();
	
	$("#vendorStoneCreateGrid").jqxGrid('clear');
	
	$('input').prop('disabled', false);
	$('select').prop('disabled', false);
	$("#addVendorStone").prop('disabled', false);
	$("#stoneCodeC").prop('disabled', true);
	$("#uomC").prop('disabled', true);
	$("#footerSection").hide();
});

var loadLovCreate = function(){
	$.getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search', function(data) {					
		if(data.resCode == 1){								
			var $stoneSegment = $('#stoneSegmentC');
			$.each(data.payload.mTypes, function(key, val) {
				$stoneSegment.append('<option value="' + val.id + '" idE = '+ val.code +'>' + val.description + '</option>');
			})
			
			vendorList = data.payload.vCodeList;
			
			var data = [];
			$.each( vendorList, function( key, value ) {			      
					data.push({ value: value.id, label: value.name});
			});
			
				
			$("#vendorCodeC").autocomplete({						
				source: data,
				focus: function(event, ui) {						
					event.preventDefault();
					$(this).val(ui.item.label);						
				},
				select: function(event, ui) {					
					event.preventDefault();
					$(this).val(ui.item.label);					
					$("#vendorCodeC-value").val(ui.item.value);					
				}
			});
		}			
	});
}

$("#stoneSegmentC").on("change", function() {
	if($("#stoneSegmentC").val() == "") {
		clearStoneData(2);
		clearStoneData(5);
		return;
	}
	clearStoneData(5);
	if($("#stoneSegmentC").val() != "") {
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
				$.each (data.payload.mainCatList, function(key, val) {
					$('#stoneCategoryC').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			}
		});		
		
		$.getJSON('/OrderExecution/api/v1/getHsnCodesBySegmentId?id='+$("#stoneSegmentC").val()+'&type=S',function(data) {
			if(1 == data.resCode){
				$('#compHsnCodeC').empty().append('<option value="" selected>-- Select Option --</option>');
				$.each (data.payload.hsnCodes, function(key, val) {
					$('#compHsnCodeC').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			}
		});
		
		var segmentName = $('#stoneSegmentC option:selected').text();
		
		if (segmentName == "Diamond") {
        	$("#Show_ShapeC").show();
        	$("#Show_SubCategoryC").hide();
		}else {
        	$("#Show_ShapeC").hide();
        	$("#Show_SubCategoryC").show();
		}
		
		if(isExtraStoneField()) {
			$("#showClarityC").show();
			$("#showColorC").show();
			$("#showCutGradeC").show();
		}else {
			$("#showClarityC").hide();
			$("#showColorC").hide();
			$("#showCutGradeC").hide();
			$("#showActualColorC").hide();
		}		
	}
});

$("#stoneCategoryC").on("change", function() {
	if($("#stoneCategoryC").val() == "") {
		$("#stoneCodeC").val('');
		$('#ShapeC').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
		return;
	}
	
    if ($("#stoneSegmentC").val() != "" && $("#stoneCategoryC").val() != "") {
    	$("#stoneCodeC").val('');
    	
    	onchangeAPIFromToCostWt($(this).val());
    	
    	$('#ShapeC').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
		
		/*getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search&criteria=color&id='+$("#stoneCategoryC").val(), function(data) {
			$('#colorC').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each (data.payload.color , function(key, val) {
						$('#colorC').append('<option value="' + val.id + '">' + val.name + '</option>');
			});			
		});
		*/
	/*	getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search&criteria=actualColor&id='+$("#stoneCategoryC").val(), function(data) {
			$('#actualColorC').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each (data.payload.actualColor, function(key, val) {
						$('#actualColorC').append('<option value="' + val.id + '">' + val.name + '</option>');
			});		
		});*/
    	
        var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#stoneSegmentC').val(),
				"sSeg" : $('#stoneSegmentC option:selected').text(),
				"catId" : $("#stoneCategoryC").val()
			}
        };
        
        var segmentName = $('#stoneSegmentC option:selected').text();
        if (segmentName == "Diamond") {
			$('#ShapeC').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getShapes', JSON.stringify(params), function(data) {
    			if(1 == data.resCode){
    				$('#ShapeC').empty().append('<option value="" selected>-- Select Option --</option>');
    				$.each (data.payload.subCatList,  function(key, val) {
    					$('#ShapeC').append('<option value="' + val.id + '">' + val.description + '</option>');
					});
    			}
    		});
    		
			if(isActualColorField()) {
				$("#showActualColorC").show();
			}
			else {
				$("#showActualColorC").hide();
			}
			
        } else {
			$('#subCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getStoneSubCategories', JSON.stringify(params), function(data) {
    			if(1 == data.resCode){
    				$('#subCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
    				$.each (data.payload.subCatList, function(key, val) {
    					$('#subCategoryC').append('<option  code="' + val.id + '" value="' + val.name + '">' + val.description + '</option>');
					});
    			}
    		});
        }
    }
});

$("#ShapeC").on("change", function() {
	if($("#ShapeC").val() == "") {
		$("#stoneCodeC").val('');
		return;
	}
	
	if ($("#stoneSegmentC").val() != "" && $("#stoneCategoryC").val() != "" && $("#ShapeC") != "") {
        var params = {
    		"fieldFilters": 
    		{
    			"segId" : $('#stoneSegmentC').val(),
    			"catId" : $("#stoneCategoryC").val(),
    			"suppliedBy": 'CO',
    			"shapeId": $("#ShapeC").val()
    		}
    	};
        $('#cutGradeC').empty().append('<option value="" selected>-- Select Option --</option>');
        $('#colorC').empty().append('<option value="" selected>-- Select Option --</option>');
        $('#clarityC').empty().append('<option value="" selected>-- Select Option --</option>');
        $('#actualColorC').empty().append('<option value="" selected>-- Select Option --</option>');
		
        
		postJSON('api/v1/getStoneCodeAndOthers', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$("#stoneCodeC").val(data.payload.stoneDetails.name);
				$("#stoneCodeIdC").val(data.payload.stoneDetails.id);
				$.each (data.payload.cutGrade , function(key, val) {					
					$('#cutGradeC').append('<option value="' + val.id + '">' + val.id + '</option>');
				});
				
				$.each (data.payload.color , function(key, val) {
					$('#colorC').append('<option value="' + val.id + '">' + val.id + '</option>');
				});	
				
				$.each (data.payload.clarity, function(key, val) {					
					$('#clarityC').append('<option value="'	+ val.id + '">' + val.id + '</option>');
				});	
				
				$.each (data.payload.actualColor, function(key, val) {
					$('#actualColorC').append('<option value="' + val.id + '">' + val.id + '</option>');
				});		
				
				$("#uomC").val(data.payload.uom);
			}
		});
    }
});


$("#subCategoryC").on("change", function() {
	if($("#subCategoryC").val() == "") {
		$("#stoneCodeC").val('');
		return;
	}
	if ($("#stoneSegmentC").val() != "" && $("#subCategoryC") != "") {
        var params = {
    		"fieldFilters": {
    			"segId" : $('#stoneSegmentC').val(),
    			"catId" : $("#stoneCategoryC").val(),
    			"suppliedBy": 'CO',
    			"subCatCode": $("#subCategoryC").val()
    		}
        }; 
        $('#cutGradeC').empty().append('<option value="" selected>-- Select Option --</option>');
        postJSON('api/v1/getStoneCodeAndOthers', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$("#stoneCodeC").val(data.payload.stoneDetails.name);
				$("#stoneCodeIdC").val(data.payload.stoneDetails.id);
				$.each (data.payload.cutGrade , function(key, val) {					
					$('#cutGradeC').append('<option value="' + val.id + '">' + val.id + '</option>');
				});
				$("#uomC").val(data.payload.stoneDetails.value);
			}
        });
    }
});
function clearStoneData (level) {

    if (level <= 1) {
    	$('#stoneSegmentC').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 2) {
    	$('#stoneCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 3) {
    	$('#ShapeC').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 4) {		
		$('#actualColorC').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#colorC').empty().append('<option value="" selected>-- Select Option --</option>');		
		$("#stoneCodeC").val('');
    }
}

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
            return false;
        }
    } else {
        return false;
    }
}

var overlap = false;
var msg = null;
var checkWeightRange = function(overlap,fromcost,costRange,msg,array){
	if(costRange != null && costRange !=undefined && costRange != ""){
	   overlap = duplicateWeightRange(fromcost,costRange,array.length,array);
	}else{
		return false;
	}
}

var duplicateWeightRange = function(fromcost,costRange, n, a) {
	var i;
	overlap = false;
	if(a.length > 1){
		for (i = 0; i < n-1; i++) {
			if (fromcost == a[i].fromWtCostN && costRange == a[i].colorDiamondFromCost) {
				overlap = true;
				$.growl.error({
					message : "Please select Unique Wt Ranges!!",
					duration : 10000,
					title : 'Error'
				});
			  return false;
			}
		}
	}
	return overlap;
}

//Accessory Item Grid
var rowIdStone = 0;
var generaterow = function(i) {
	var row = {};
	row["articleDesc"] = ($("#stoneSegmentC option:selected").attr('ide') == "DI") ? $("#stoneSegmentC option:selected").text() + " " + $("#stoneCategoryC option:selected").text() + " " + $("#ShapeC option:selected").text() + " " + $("#clarityC option:selected").text() + " " + $("#colorC option:selected").text() + " " + $("#cutGradeC option:selected").text() : $("#subCategoryC option:selected").text();
	row["fromWtCost"] = "";
	row["toWtCost"] = "";
	row["wtCostRange"] = "";
	row["costPrice"] = "";
	row["directPer"] = "";
	row["exchangePer"] = "";
	row["sellingate"] = "";
	row["colorDiamondToCost"] = "";
	row["colorDiamondFromCost"] = "";
	rowIdStone = rowIdStone + 1;
	return row;
}
var vendorStoneCreateGridFunc = function() {
	var source = {
		datafields : [ 
			{name : 'articleDesc', type : 'string'}, 
			{name : 'fromWtCost', type : 'float'},
			{name: 'toWtCost', type: 'string'},
			{name : 'wtCostRange', type : 'string'},
			{name : 'costPrice', type : 'float'},
			{name : 'directPer', type : 'string'},
			{name : 'exchangePer', type : 'string'},
			{name : 'sellingate', type : 'float'},
			{name : 'colorDiamondFromCost', type : 'float'},
			{name : 'colorDiamondToCost', type : 'float'}
			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};
	
	 var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
         if (value < 20) {
             return '<div style="margin-left: 35%; margin-top: 7%; float: ' + columnproperties.cellsalign + ';">' + value + '</div>';
         }
         else {
             return '<div style="margin-left: 35%;margin-top: 7%; float: ' + columnproperties.cellsalign + '; ">' + value + '</div>';
         }
     }
	 
	var fromToCost = [];
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#vendorStoneCreateGrid").jqxGrid({
		source : dataAdapter,	
		width : '100%',
		editable : true,
		height : 200,
		columnsheight : 60,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			
			container.append('<div class="col-md-4 row"><div style="margin-bottom:10px;"  id="addrowbutton" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div></div>');
			container.append('<div class="col-md-4"><div style="margin-bottom:10px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="text-center">Create Vendor Stone Details</div></div>');
			container.append('<div class="col-md-4 pull-right"><div style="margin-bottom:10px;" id="deleteVS" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div></div>');
			$("#addrowbutton").jqxButton();
			$("#deleteVS").jqxButton();
			
			$("#addrowbutton").on('click', function() {
				if($("#stoneSegmentC option:selected").attr('ide') == "DI"){
				var colorDimond = $("#stoneCategoryC option:selected").text();
					if(colorDimond == "CD Melees" || colorDimond == "CD Pointers" || colorDimond == "CD Solitaire"){
						if(overlap == true){
							 $.growl.error({
									message :"Please select Unique Wt Ranges OR Delete the Current Row!!" ,
									duration : 10000,
									title : 'Error'
								});
							 return false;
						}
					}
				}
				var rows = $('#vendorStoneCreateGrid').jqxGrid('getrows');
				if(rows.length == 0){
					$("#vendorStoneCreateGrid").jqxGrid('addrow',null,generaterow(rowIdStone));
				}else{
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].sellingate == "" || rows[i].sellingate == null	|| rows[i].fromWtCostN == "" || rows[i].fromWtCostN == null) {
							$.growl.error({
								message : "Please fill mandatory fields.",
								duration : 10000,
								title : 'Error'
							});		
							return false;
						}
					}
					$("#vendorStoneCreateGrid").jqxGrid('addrow',null,generaterow(rowIdStone));
				}
			});
			$("#deleteVS").on('click', function() {
				var selectedrowindex = $("#vendorStoneCreateGrid").jqxGrid('getselectedrowindex');
				var rowscount = $("#vendorStoneCreateGrid").jqxGrid('getdatainformation').rowscount;					
				
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#vendorStoneCreateGrid").jqxGrid('getrowid', selectedrowindex);
					var colorDimond = $("#stoneCategoryC option:selected").text();
						if(colorDimond == "CD Melees" || colorDimond == "CD Pointers" || colorDimond == "CD Solitaire"){
							if(overlap == true){
								var commit = $("#vendorStoneCreateGrid").jqxGrid('deleterow', id);	
								var rows = $('#vendorStoneCreateGrid').jqxGrid('getrows');
							     $.each(rows,function(k,v){
									 var fromRange = $("#vendorStoneCreateGrid").jqxGrid('getcellvalue', k, 'fromWtCostN');
									 var colorDiamondFromCost = $("#vendorStoneCreateGrid").jqxGrid('getcellvalue', k, 'colorDiamondFromCost');
									 checkWeightRange(overlap,fromRange,colorDiamondFromCost,msg,rows);
							    });
							}
				      }
				       var commit = $("#vendorStoneCreateGrid").jqxGrid('deleterow', id);	
				  }
				for (var m = 0; m < rowscount; m++) {
					$("#vendorStoneCreateGrid").jqxGrid("setcellvalue", m, "serialNo", m + 1);
				}
			});
		},
		columns : [ 
			{ datafield : 'colorDiamondFromCost',hidden:true},
			{ datafield : 'serialNo',hidden:true},
			{ datafield : 'colorDiamondToCost',hidden:true},
			{ text : 'Article Desc.', datafield : 'articleDesc', width : '20%', cellsalign : 'left', align : 'center', editable : false},
			{ text : 'From Cost/Wt', datafield : 'fromWtCost', width : '12%', cellsalign : 'center', align : 'center', editable : true, columntype : 'dropdownlist',	displayfield : 'fromWtCostN',	
				createeditor : function(row, cellvalue, editor) {
					
					if($("#stoneSegmentC option:selected").attr('ide') == "DI"){
						var apiName = 'api/v1/vendorStoneMasterCostWtLOV?id=' + $("#stoneCategoryC option:selected").val();
					}else{
						var apiName = 'api/v1/vendorStoneMasterCostWtLOV?segId=' + $("#stoneSegmentC option:selected").val();					
					}
					
					$.getJSON(apiName, function(data) {
						if(data.resCode == 1){
							var fromWtCost = data.payload.wtCost;
						
							editor.jqxDropDownList({
								source : fromWtCost,
								displayMember : 'name',
								valueMember : 'description'
							});
						}
						
					});
				
				},cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					
							//$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'fromWtCost', newvalue.value);
							
							var rows = $("#vendorStoneCreateGrid").jqxGrid('getrows');
							/*if(parseFloat(newvalue) < parseFloat(rows[row].fromWtCost)){
								$.growl.error({
									message : "To Cost/Wt should be greater than From Cost/Wt.",
									duration : 10000
								});
								
							}*/
							var wtRange ;
							if(newvalue != ""){
								$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'toWtCost', newvalue.value);
								 wtRange = newvalue.label + "-" +  newvalue.value;
								$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'wtCostRange', wtRange);
							}
							var articleDesc = ($("#stoneSegmentC option:selected").attr('ide') == "DI") ? $("#stoneSegmentC option:selected").text() + " " + $("#stoneCategoryC option:selected").text() + " " + $("#ShapeC option:selected").text() + " " + $("#clarityC option:selected").text() + " " + $("#colorC option:selected").text() + " " + $("#cutGradeC option:selected").text() : $("#subCategoryC option:selected").text();
							//$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'sellingate', newvalue.label);
							var articleDescC;
							if(typeof(wtRange) != "undefined"){
								 articleDescC = articleDesc + " " + wtRange;
							}
							if($("#stoneSegmentC option:selected").attr('ide') == "DI"){
								$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'articleDesc', articleDescC);
							}else{
								$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'articleDesc', articleDesc);
							}
							if($("#stoneSegmentC option:selected").attr('ide') == "DI"){
								var colorDimond = $("#stoneCategoryC option:selected").text();
								if(colorDimond == "CD Melees" || colorDimond == "CD Pointers" || colorDimond == "CD Solitaire"){
									     //var rowsArr =  $("#vendorStoneCreateGrid").jqxGrid("getrows")
									     // var costPrice = $("#vendorStoneCreateGrid").jqxGrid('getcellvalue', row, 'costPrice');
									     //checkWeightRange(overlap,newvalue.label,costPrice,msg,rowsArr);
									     var fieldFilter = null
								}else{
								   var fieldFilter = {
										"filterscount": 0, "groupscount": 0, "sortdatafield": "", "sortorder": "asc",  "pagenum": 0, "pagesize": 20,  "recordstartindex": 0,
										  "recordendindex": 20,  "fieldFilters": {
										    "cut": $("#cutGradeC option:selected").text(),
										    "clarity": $("#clarityC option:selected").text(),
										    "color": $("#colorC option:selected").text(),
										    "segment":$("#stoneSegmentC option:selected").attr('idE'),
										    "category": parseInt($("#stoneCategoryC").val()),
										    "shape": parseInt($("#ShapeC option:selected").val()),
										    "fromRange":parseFloat( newvalue.label),
									  },
									  "offset": 0
									}
								}
							}else{
								var fieldFilter = {
								"filterscount": 0, "groupscount": 0, "sortdatafield": "", "sortorder": "asc",  "pagenum": 0, "pagesize": 20,  "recordstartindex": 0,
								  "recordendindex": 20,  "fieldFilters": {							
									  "segment": $("#stoneSegmentC option:selected").attr('idE'),
									   //"fromRange":parseFloat( newvalue.label),
									   "toRange": parseFloat(newvalue.value),
									  "category": parseInt($("#stoneCategoryC").val()),
									  "subCategory":  parseInt($("#subCategoryC option:selected").attr('code'))
								  },
								  "offset": 0
								}
							}
							if(newvalue.label != "undefined" || newvalue.label !=null){
								if(fieldFilter != null){
									postJSON('/OrderExecution/api/v1/getSellingPriceForVSM', JSON.stringify(fieldFilter),function(data) {
										$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'sellingate', data.sellingPrice);
										$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'colorDiamondFromCost', data.colorDiamondFromCost);
										$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'colorDiamondToCost', data.colorDiamondToCost);
									});
						      }
						}
				  }
			},
			{ text : 'To Cost/Wt', datafield : 'toWtCost', width : '12%', cellsalign : 'center', align : 'center', editable : false},
			{ text : 'Wt/Cost Range', datafield : 'wtCostRange', width : '12%', cellsalign : 'center', align : 'center', editable : false},
			{ text : 'Cost Price', datafield : 'costPrice', width : '12%',  cellsrenderer: cellsrenderer,cellsalign : 'right', align : 'center', editable : true, cellsformat : 'd2', columntype: 'numberinput',
				validation: function (cell, value) {
					var rows = $("#vendorStoneCreateGrid").jqxGrid('getrows');
					if($("#stoneSegmentC option:selected").attr('ide') != "DI"){
						if (value < rows[cell.row].fromWtCostN || value > rows[cell.row].toWtCost) {
							 $.growl.error({ message: "Cost price should be entered within the range.", duration: 10000, title: 'Error' });
			    			 return false;
	                    }else{
	                    	 return true;
	                    }
					}else{
						 return true;
					}
				},	
			cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					 var colorDimond = $("#stoneCategoryC option:selected").text();
					 var rowsArr =  $("#vendorStoneCreateGrid").jqxGrid("getrows")
					 var fromRange = $("#vendorStoneCreateGrid").jqxGrid('getcellvalue', row, 'fromWtCostN');
					 if($("#stoneSegmentC option:selected").attr('ide') == "DI"){
					 	    if(colorDimond == "CD Melees" || colorDimond == "CD Pointers" || colorDimond == "CD Solitaire"){
							var actulColr = $('#actualColorC').val();
							var fieldFilter = {
									"filterscount": 0, "groupscount": 0, "sortdatafield": "", "sortorder": "asc",  "pagenum": 0, "pagesize": 20,  "recordstartindex": 0,
									  "recordendindex": 20,  "fieldFilters": {
									    "cut": $("#cutGradeC option:selected").text(),
									    "clarity": $("#clarityC option:selected").text(),
									    "color": $("#colorC option:selected").text(),
									    "segment":$("#stoneSegmentC option:selected").attr('idE'),
									    "category": parseInt($("#stoneCategoryC").val()),
									    "shape": parseInt($("#ShapeC option:selected").val()),
									    "fromRange": fromRange,
								        "actualColorVal":actulColr,
								        "costPriceVal" : newvalue
								  },
								  "offset": 0
								}
						}else{
						   var fieldFilter = null
						}
						if(newvalue != "undefined" || newvalue !=null){
							if(fieldFilter != null){
								postJSON('/OrderExecution/api/v1/getSellingPriceForVSM', JSON.stringify(fieldFilter),function(data) {
								    $("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'colorDiamondFromCost', data.colorDiamondFromCost);
									$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'colorDiamondToCost', data.colorDiamondToCost);
									 if(colorDimond == "CD Melees" || colorDimond == "CD Pointers" || colorDimond == "CD Solitaire"){
									   checkWeightRange(overlap,fromRange,data.colorDiamondFromCost,msg,rowsArr);
									   $("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'sellingate', data.sellingPrice);
									 }else{
										 $("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'sellingate', data.sellingPrice);
									 }
								});
					        }
					   }
				    }
			    }
			},
			{ text : 'Direct %', datafield : 'directPer', width : '10%', cellsrenderer: cellsrenderer, cellsalign : 'right', align : 'center', editable : true, cellsformat : 'd2', columntype: 'numberinput',
				
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var rows = $("#vendorStoneCreateGrid").jqxGrid('getrows');
					if(newvalue > 100){
						$.growl.error({
							message : "Direct % should be less than  or Equal to 100%.",
							duration : 10000
						});						
					}
				}
			
			},
			{ text : 'Exchange %', datafield : 'exchangePer', width : '10%',  cellsrenderer: cellsrenderer,cellsalign : 'right', align : 'center', editable : true, cellsformat : 'd2', columntype: 'numberinput',
				
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var rows = $("#vendorStoneCreateGrid").jqxGrid('getrows');
					if($("#stoneSegmentC option:selected").attr('ide') == "DI"){
					var fieldFilter = {
							  "filterscount": 0, "groupscount": 0, "sortdatafield": "", "sortorder": "asc",  "pagenum": 0, "pagesize": 20,  "recordstartindex": 0,
							  "recordendindex": 20,  "fieldFilters": {
							    "cut": $("#cutGradeC option:selected").text(),
							    "clarity": $("#clarityC option:selected").text(),
							    "color": $("#colorC option:selected").text(),
							    "segment": parseInt($("#stoneSegmentC option:selected").val()),
							    "shape": parseInt($("#ShapeC option:selected").val()),
							    "fromWtCostrange":parseFloat( rows[row].fromWtCost),
							    "toWtCostrange": parseFloat(rows[row].toWtCost),
							  },
							  "offset": 0
							}
					}else{
							var fieldFilter = {
							  "filterscount": 0, "groupscount": 0, "sortdatafield": "", "sortorder": "asc",  "pagenum": 0, "pagesize": 20,  "recordstartindex": 0,
							  "recordendindex": 20,  "fieldFilters": {							
								  "segment": parseInt($("#stoneSegmentC option:selected").val()),
								  "fromWtCostrange":parseFloat( rows[row].fromWtCost),
								    "toWtCostrange": parseFloat(rows[row].toWtCost)
							  },
							  "offset": 0
							}
					}
					if(newvalue > 100){
						$.growl.error({
							message : "Exchange % should be less than or Equal to 100%.",
							duration : 10000
						});						
					}
					/*postJSON('/OrderExecution/api/v1/getSellingPriceForVSM', JSON.stringify(fieldFilter),function(data) {
						$("#vendorStoneCreateGrid").jqxGrid('setcellvalue', row, 'sellingate', data.sellingPrice);
					});*/
				}
			},			
			{ text : 'Selling Rate', datafield : 'sellingate', width : '12%', cellsalign : 'right', align : 'center', editable : false, cellsformat : 'd2',
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var rows = $("#vendorStoneCreateGrid").jqxGrid('getrows');
					var segment = $("#stoneSegmentC option:selected").attr('ide');
					if(segment == "DI"){
						if(parseFloat(newvalue) < parseFloat(rows[row].costPrice)){
							$.growl.error({
								message : "Selling Rate should be greater then Cost Price",
								duration : 10000
							});						
						}
					}
				}
			}
		]
	});
}


$("#saveVendorStone").on('click', function(){
	var rows = $("#vendorStoneCreateGrid").jqxGrid('getrows');
	var vendorStoneDetailsArr  = [];
	if(rows.length == 0){
		$.growl.error({
			message : "Please add vendor stone details.",
			duration : 10000
		});
		return false;
	}else if(overlap == true){
		 $.growl.error({
				message :"Please select Unique Wt Ranges!!" ,
				duration : 10000,
				title : 'Error'
			});
		 return false;
	}else{
		for(var i=0; i<rows.length; i++){
			if(rows[i].fromWtCost == "" || rows[i].toWtCost == "" || rows[i].wtCostRange == "" || rows[i].costPrice == "" 
				|| (rows[i].sellingate == "" || rows[i].sellingate == null)){
				$.growl.error({
					message : "Selling Price not found for " + $("#stoneSegmentC option:selected").text() +" in Stone Details !!!",
					duration : 10000
				});
				return false;
			}else{
				if(rows[i].toWtCost < rows[i].fromWtCost){
					$.growl.error({
						message : "To Cost/Wt should be greater than From Cost/Wt.",
						duration : 10000
					});
					return false;
				}
				/*if(rows[i].directPer > 100){
					$.growl.error({
						message : "Direct % should be less or Equal to 100%.",
						duration : 10000
					});
					return false;
				}
				if(rows[i].exchangePer > 100){
					$.growl.error({
						message : "Exchange % should be less or Equal to 100%.",
						duration : 10000
					});
					return false;
				}*/
				
				if($("#stoneSegmentC option:selected").attr('ide') == "DI"){
					if(rows[i].sellingate != null){
						if(rows[i].sellingate <= rows[i].costPrice){
							$.growl.error({
								message : "Selling Rate should be greater then Cost Price",
								duration : 10000
							});
							return false;
						}
					}
				}
				var stoneDetObj = {
						"cut": ($("#cutGradeC option:selected").val() == "" || $("#cutGradeC option:selected").val() == null)?null:$("#cutGradeC option:selected").val() ,
						"clarity": ($("#clarityC option:selected").val() == "" || $("#clarityC option:selected").val() == null)?null:$("#clarityC option:selected").val(),
						"color": ($("#colorC option:selected").val() == "" || $("#colorC option:selected").val() == null)?null:$("#colorC option:selected").val(),
						"fromWtCostrange": parseFloat(rows[i].fromWtCostN),
						"toWtCostrange": parseFloat(rows[i].toWtCost),
						"slab": rows[i].wtCostRange,
						"costPriceInRs": rows[i].costPrice,
						"articleDescription": rows[i].articleDesc,
						"exchangePercentage": rows[i].exchangePer,
						"directPercentage": rows[i].directPer,
						"colorDiamondFromCost" : rows[i].colorDiamondFromCost,
						"colorDiamondToCost" : rows[i].colorDiamondToCost,
						"actualColor" : ($("#actualColorC option:selected").val() == "" || $("#actualColorC option:selected").val() == null)?null : $("#actualColorC option:selected").val(),
				}
				vendorStoneDetailsArr.push(stoneDetObj);
			}
		}
	}

	var stoneVendorObj = {
			  "handlingCharges": ($("#handlingCharges").val() == "" || $("#handlingCharges").val() == null) ? null :  parseFloat($("#handlingCharges").val()),
			  "segment":(parseInt($("#stoneSegmentC option:selected").val()) != null && parseInt($("#stoneSegmentC option:selected").val()) != "") ? { "id": parseInt($("#stoneSegmentC option:selected").val()), "code" : $("#stoneSegmentC option:selected").attr('idE'),}  : null,
			  "vendor": ($("#vendorCodeC-value").val() != null && $("#vendorCodeC-value").val() != "") ? { "vendorId": $("#vendorCodeC-value").val()}  : null,
			  "stone": ($("#stoneCodeC").val() != null && $("#stoneCodeC").val() != "") ? { "id": $("#stoneCodeIdC").val(),"stoneCode": $("#stoneCodeC").val()}  : null,
			  "category":($("#stoneCategoryC").val() != null && $("#stoneCategoryC").val() != "") ? { "id": $("#stoneCategoryC").val(),"description": $("#stoneCategoryC option:selected").text()}  : null,
			  "subCategory": ($("#subCategoryC option:selected").attr('code') != null && $("#subCategoryC option:selected").attr('code')  != "") ? { "id": $("#subCategoryC option:selected").attr('code')}  : null,
        	  "shape":($("#ShapeC").val() != null && $("#ShapeC").val() != "") ? { "id": $("#ShapeC").val()}  : null,
        	  "vendorHsnCode" :$('#vendorHsnCodeC').val(),
			  "hsnMaster" :{"id" : parseInt($('#compHsnCodeC').val())},
			  "vendorStoneDetails": vendorStoneDetailsArr
			}
	
	if(stoneVendorObj){
	postJSON('/OrderExecution/api/v1/createVendorStone', JSON.stringify(stoneVendorObj),function(response) {
		if (response.resCode == 1) {
			$.growl.notice({
				message : response.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			window.location.href = "javascript:showContentPage('vendorStoneSearch', 'bodySwitcher')";
			
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 10000
			});
			return false;
		}	
	});
	}
});

var onchangeAPIFromToCostWt  =  function(id){
	if(id == null){
		var apiName = 'api/v1/vendorStoneMasterCostWtLOV?segId=' + $("#stoneSegment option:selected").val();
	}else{
		var apiName = 'api/v1/vendorStoneMasterCostWtLOV?id=' + id;
	}
	
	$.getJSON(apiName, function(data) {
		if(data.resCode == 1){
			$('#fromWtCost').empty().append('<option value="" selected>-- Select Option --</option>');
			$('#toWtCost').empty().append('<option value="" selected>-- Select Option --</option>');
			
			$.each (data.payload.wtCost, function(key, val) {
				$('#fromWtCost').append('<option value="' + val.name + '">' + val.name + '</option>');
			});
			
			$.each (data.payload.wtCost, function(key, val) {
				$('#toWtCost').append('<option value="' + val.description + '">' + val.description + '</option>');
			});
		}
		
	});
}

$("#stoneVendorDateFrom").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#stoneVendorDateTo").datepicker('option', 'minDate', min || '0');
    }
});

$("#stoneVendorDateTo").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

/* Clear Form Filter and Re-set to default search and clear Grid data */
$("#clearAll").on('click', function() {
	$("#vendorCode-value").val(null);
	$('#designRA').trigger("reset");
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href = "javascript:showContentPage('vendorStoneSearch', 'bodySwitcher')";	
});

var editstoneVendor = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	/*if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{*/
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editStonendorDet" style="margin-top:10px;" type="button" id='
	+ row
	+ ' onclick="editVendorStoneDet('
	+ value
	+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
	//}
}

// Vendor stone search grid
var stoneVendorMasterGrid = function() {

	var updateRows = function(rowid, newdata, commit) {

	}
	
	var datafields = [ 
		{'name' : 'vendor',	'type' : 'string', map: 'vendorStone>vendor>vendorName'}, 
		{'name' : 'stoneSegment', 'type' : 'string', map: 'vendorStone>segment>description'}, 
		{'name' : 'mainCategory', 'type' : 'string', map: 'vendorStone>category>description'}, 
		{'name' : 'articleCode', 'type' : 'string', map: 'vendorStone>stone>stoneCode'}, 
		{'name' : 'uom', 'type' : 'string'}, 
		{'name' : 'articleDescription', 'type' : 'string'}, 
		{'name' : 'slab', 'type' : 'string'}, 
		{'name' : 'fromWtCostrange',	'type' : 'string'}, 
		{'name' : 'toWtCostrange', 'type' : 'string'}, 
		{'name' : 'costPriceInRs', 'type' : 'double'}, 
		{'name' : 'tableRef', 'type' : 'long', 'map' : 'parcelId'}, 
		{'name' : 'status', 'type' : 'string'}, 
		{'name' : 'createdBy', 'type' : 'string'},
		{'name' : 'shape', 'type' : 'string', map : 'shape>description'},
		{'name' : 'cut', 'type' : 'string'},
		{'name' : 'color', 'type' : 'string'},
		{'name' : 'clarity', 'type' : 'string'},
		{'name' : 'actualColor', 'type' : 'string'},
		{'name' : 'directPercentage', 'type' : 'string'},
		{'name' : 'exchangePercentage', 'type' : 'string'},
		{'name' : 'sellingPrice', 'type' : 'string'},
		{'name' : 'colorDiamondFromCost', 'type' : 'string'},
		{'name' : 'colorDiamondToCost', 'type' : 'string'},
		{'name' : 'stoneVendorId', 'type' : 'string', map: 'id'}
		
		
	];

	var columns = [ 
		{ 'text' : 'Vendor', 'datafield' : 'vendor', 'width' : '5%', cellsalign: 'left', align: 'center', sortable : true}, 
		{ 'text' : 'Segment', 'datafield' : 'stoneSegment', 'width' : '5%', cellsalign: 'center', align: 'center', sortable : true}, 
		{ 'text' : 'Main Category', 'datafield' : 'mainCategory', 'width' : '5%', cellsalign: 'left', align: 'center', sortable : true}, 
		{ 'text' : 'Article Code', 'datafield' : 'articleCode', 'width' : '5%', cellsalign: 'center', align: 'center', sortable : false}, 
		{ 'text' : 'Article Description', 'datafield' : 'articleDescription', 'width' : '5%', cellsalign: 'left', align: 'center', sortable : true}, 
		
		{ 'text' : 'Cut', 'datafield' : 'cut', 'width' : '4.5%', cellsalign: 'center', align: 'center', sortable : true}, 
		{ 'text' : 'Color', 'datafield' : 'color', 'width' : '4%', cellsalign: 'center', align: 'center', sortable : true}, 
		{ 'text' : 'Clarity', 'datafield' : 'clarity', 'width' : '5%', cellsalign: 'center', align: 'center', sortable : true}, 
		{ 'text' : 'Actual Color', 'datafield' : 'actualColor', 'width' : '5%', cellsalign: 'left', align: 'center', sortable : false}, 		
		{ 'text' : 'Shape', 'datafield' : 'shape', 'width' : '5%', cellsalign: 'left', align: 'center', sortable : true}, 
		
		{ 'text' : 'From', 'datafield' : 'colorDiamondFromCost', 'width' : '4%', cellsalign: 'right', align: 'center', sortable : false, columngroup : 'colordiamondcost'}, 
		{ 'text' : 'To', 'datafield' : 'colorDiamondToCost', 'width' : '4%', cellsalign: 'right', align: 'center', sortable : false, columngroup : 'colordiamondcost'}, 
		
		
		{ 'text' : 'From Wt/Cost', 'datafield' : 'fromWtCostrange', 'width' : '4%', cellsalign: 'right', align: 'center', sortable : false, cellsformat : 'd3'}, 
		{ 'text' : 'To Wt/Cost', 'datafield' : 'toWtCostrange', 'width' : '4.5%', cellsalign: 'right', align: 'center', sortable : false, cellsformat : 'd3'}, 
		{ 'text' : 'Wt/Cost Range', 'datafield' : 'slab', 'width' : '5%', cellsalign: 'center', align: 'center'}, 
		{ 'text' : 'Cost Price', 'datafield' : 'costPriceInRs', 'width' : '5%', cellsalign: 'right', align: 'center', cellsformat : 'd2', sortable : false}, 
		{ 'text' : 'UQC', 'datafield' : 'uom', 'width' : '3%', cellsalign: 'center', align: 'center', sortable : false}, 
		
		{ 'text' : 'Direct %', 'datafield' : 'directPercentage', 'width' : '3%', cellsalign: 'right', align: 'center', sortable : false, cellsformat : 'd2'}, 
		{ 'text' : 'Exchange %', 'datafield' : 'exchangePercentage', 'width' : '3%', cellsalign: 'right', align: 'center', sortable : false, cellsformat : 'd2'}, 
		{ 'text' : 'Selling Rate', 'datafield' : 'sellingPrice', 'width' : '5%', cellsalign: 'right', align: 'center', sortable : false, cellsformat : 'd2'}, 
		
		{ 'text' : 'Created By', 'datafield' : 'createdBy', 'width' : '4%', cellsalign: 'center', align: 'center', sortable : false}, 
		{ 'text' : 'Status', 'datafield' : 'status', cellsalign: 'center', align: 'center', sortable : false, 'width' : '4%'}, 
		{ 'text' : '', 'datafield' : 'stoneVendorId', sortable : false, filterable : false, 'width' : '3%', cellsrenderer : editstoneVendor}
	];
	
	
	showMyGrid(datafields, "/OrderExecution/api/v1/searchVendorStone", "list", columns, vendorStoneFilterValues(), "");
	
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	editable: false,
     	theme: 'energyblue',
    	columnsresize: true,
    	columngroups : [ {
    		text : 'Color Diamond Cost',
    		align : 'center',
    		name : 'colordiamondcost', 
    		cellsformat : 'd2'
    	} ]
	});
}

$("#inactive").on("click", function() {
			var fieldFilters = vendorStoneFilterValues();
			if(fieldFilters.fieldFilters["status"] == 0)
			{
				$.growl.error({
					message : "Please choose Active status to In-Activate",
					duration : 10000
				});
				return;
			}
			
			if (validateStoneFilterData()) {
				delete fieldFilters.fieldFilters["stoneVendorDateFrom"];
				delete fieldFilters.fieldFilters["stoneVendorDateTo"];
				postJSON('/OrderExecution/api/v1/inActivateVendorStone', JSON.stringify(fieldFilters), function(data) {					
					if(data)
					{
						$.growl.notice({
							message : "In-Activated Successfully",
							duration : 10000,
							title : 'Success'
						});
						$("#Search").click();
					}
				});
			} else {
				$.growl.error({
					message : "Please fill all the mandatory fields",
					duration : 10000
				});
			}

		});


function validateStoneFilterData() {
	var fieldFilters = vendorStoneFilterValues()
	
	if (!fieldFilters.fieldFilters.hasOwnProperty('vendor') || fieldFilters.fieldFilters["vendor"] == "" || fieldFilters.fieldFilters["vendor"] == null) {
        return false;
	}
	if (!fieldFilters.fieldFilters.hasOwnProperty('stoneSegment') || fieldFilters.fieldFilters["stoneSegment"] == "" || fieldFilters.fieldFilters["stoneSegment"] == null) {
		return false;
	}
	if (!fieldFilters.fieldFilters.hasOwnProperty('stoneCategory') || fieldFilters.fieldFilters["stoneCategory"] == "" || fieldFilters.fieldFilters["stoneCategory"] == null) {
		return false;
	}
	if ($('#Show_SubCategory').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('subCategory') ||  fieldFilters.fieldFilters["subCategory"] == "" || fieldFilters.fieldFilters["subCategory"] == null)) {
		return false;
	}
	if ($('#Show_Shape').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('shape') ||  fieldFilters.fieldFilters["shape"] == "" || fieldFilters.fieldFilters["shape"] == null)) {
		return false;
	}
	if (!fieldFilters.fieldFilters.hasOwnProperty('stoneCode') ||  fieldFilters.fieldFilters["stoneCode"] == "" || fieldFilters.fieldFilters["stoneCode"] == null) {
		return false;
	}
	if ($('#showClarity').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('clarityVal') ||  fieldFilters.fieldFilters["clarityVal"] == "" || fieldFilters.fieldFilters["clarityVal"]  == null)) {
		return false;
	}
	if ($('#showActualColor').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('actualColorVal') ||  fieldFilters.fieldFilters["actualColorVal"]  == "" || fieldFilters.fieldFilters["actualColorVal"]  == null)) {
		return false;
	}
	if ($('#showColor').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('colorVal') ||  fieldFilters.fieldFilters["colorVal"] == "" || fieldFilters.fieldFilters["colorVal"] == null)) {
		return false;
	}
	if ($('#showCutGrade').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('cutGradeVal') ||  fieldFilters.fieldFilters["cutGradeVal"]  == "" || fieldFilters.fieldFilters["cutGradeVal"]  == null)) {
		return false;
	}
	return true;
}


function vendorStoneFilterValues() {
	fieldFilters = {
		"fieldFilters" : {}
	};
	
    var vendor = $('#vendorCode-value').val();
	var stoneSegment = $('#stoneSegment').val();
	var stoneCategory = $('#stoneCategory').val();
	var subCategory = $('#subCategory').val();
	var shape = $('#Shape').val();
	var stoneCode = $('#stoneCode').val();  
	var clarity = $("#clarity option:selected").text();
	var actualColor = $("#actualColor option:selected").text();
	var color =  $("#color option:selected").text();
	var cutGrade = $("#cutGrade option:selected").text();
	var status = $('#status').val();
	var stoneVendorDateFrom = $('#stoneVendorDateFrom').val();
	var stoneVendorDateTo = $('#stoneVendorDateTo').val();
	
	var businessS = $('#businessS').val();
	//var regionS = $('#regionS').val();	
	var fromWtCost = $('#fromWtCost').val();
	var toWtCost = $('#toWtCost').val();
	
	if (businessS != "" && businessS != null) {
		fieldFilters.fieldFilters["business"] = parseInt(businessS);
	}
	/*if (regionS != "" && regionS != null) {
		fieldFilters.fieldFilters["regionId"] = parseInt(regionS);
	}*/
	if (fromWtCost != "" && fromWtCost != null) {
		fieldFilters.fieldFilters["fromWtCost"] = parseFloat(fromWtCost);
	}
	if (toWtCost != "" && toWtCost != null) {
		fieldFilters.fieldFilters["toWtCost"] = parseFloat(toWtCost);
	}
	
	
	if (stoneVendorDateFrom != "" && stoneVendorDateFrom != null) {
		fieldFilters.fieldFilters["stoneVendorDateFrom"] = stoneVendorDateFrom;
	}

	if (stoneVendorDateTo != "" && stoneVendorDateTo != null) {
		fieldFilters.fieldFilters["stoneVendorDateTo"] = stoneVendorDateTo;
	}
	
	if ($('#vendorCode').val() != "" && $('#vendorCode').val() != null) {
		fieldFilters.fieldFilters["vendor"] = parseInt(vendor);
	}
	if (stoneSegment != "" && stoneSegment != null) {
		fieldFilters.fieldFilters["stoneSegment"] = parseInt(stoneSegment);
	}
	
	if (stoneCategory != "" && stoneCategory != null) {
		fieldFilters.fieldFilters["stoneCategory"] = parseInt(stoneCategory);
	}
	if ($('#Show_SubCategory').is(":visible") && subCategory != "" && subCategory != null) {
		fieldFilters.fieldFilters["subCategory"] = subCategory;
	}
	if ($('#Show_Shape').is(":visible") && shape != "" && shape != null) {
		fieldFilters.fieldFilters["shape"] = parseInt(shape);
	}
	if (stoneCode != "" && stoneCode != null) {
		fieldFilters.fieldFilters["stoneCode"] = stoneCode;
	}
	if ($('#showClarity').is(":visible") && $('#clarity').val() != "" && $('#clarity').val()  != null) {
		fieldFilters.fieldFilters["clarityVal"] = clarity;
	}
	if ($('#showActualColor').is(":visible") && $('#actualColor').val()  != "" && $('#actualColor').val()  != null) {
		fieldFilters.fieldFilters["actualColorVal"] = actualColor;
	}
	if ($('#showColor').is(":visible") && $('#color').val() != "" && $('#color').val() != null) {
		fieldFilters.fieldFilters["colorVal"] = color;
	}
	if ($('#showCutGrade').is(":visible") && $('#cutGrade').val()  != "" && $('#cutGrade').val()  != null) {
		fieldFilters.fieldFilters["cutGradeVal"] = cutGrade;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = parseInt(status);
	}
	return fieldFilters;
}

// Edit Vendor Stone Details ##############################################################

var shapeIdE ;
var editVendorStoneDet = function(id){
	$.getJSON('/OrderExecution/api/v1/getVendorStoneById?id=' + id, function(data) {
		var data = data.payload.detail;

		if(data.vendorStone.segment.code != "DI"){
			$("#shapeEditSection").hide();
			$("#clarityEditSection").hide();
			$("#actualColorEditSection").hide();
			$("#colorEditSection").hide();
			$("#cutGradeEditSection").hide();
			$("#subCatEditSection").show();
		}else{			
			$("#subCatEditSection").hide();
			shapeIdE = data.shape.id
			$("#ShapeE").val(data.shape.name);
			$("#clarityE").val(data.clarity);
			$("#CatIdE").val(data.vendorStone.category.id);
			$("#segmentIdE").val(data.vendorStone.segment.code);
			$("#actualColorE").val(data.actualColor);
			$("#colorE").val(data.color);
			$("#cutGradeE").val(data.cut);
			if(data.vendorStone.category.id == 36 ||data.vendorStone.category.id == 37 || data.vendorStone.category.id == 38){
				$("#actualColorEditSection").show();
			}else{
				$("#actualColorEditSection").hide();
			}
		}
		$("#fromCostRangeE").val(data.fromWtCostrange);
		$("#toCostRangeE").val(data.toWtCostrange);
		
		$("#costPriceE").val(data.costPriceInRs);
		$("#directPerE").val(data.directPercentage);
		$("#exchangePerE").val(data.exchangePercentage);
		
		$("#stoneSegmentE").val(data.vendorStone.segment.description);
		$("#stoneCategoryE").val(data.vendorStone.category.description);
	
		$("#stoneSegIdE").val(data.vendorStone.segment.id);
		
		$("#sellingRateE").val(data.sellingPrice);
		$("#vendorStoneID").val(data.vendorStone.id);
		$("#vendorStoneDetID").val(data.id);
		
		
	//	loadLovCreateE(data.vendorStone.segment.id, data.vendorStone.segment.description, data.clarity, data.vendorStone.category.id, data.shape.id, data.cut);
 		$("#stoneCodeE").val(data.vendorStone.stone.stoneCode);
		$("#vendorCodeE").val(data.vendorStone.vendor.vendorCode);
 		$("#vendorCodeNameE").val(data.vendorStone.vendor.vendorName);
		$("#vendorCodeE-value").val(data.vendorStone.vendor.id);
		$("#uomE").val(data.uom);
		$("#colorDiamondFromCost").val(data.colorDiamondFromCost);
		$("#colorDiamondToCost").val(data.colorDiamondToCost);
		$("#handlingChargesE").val(data.vendorStone.handlingCharges);
		$("#vendorHsnCodeE").val(data.vendorStone.vendorHsnCode);
		var hsnData = data.vendorStone.hsnMaster;

		$.getJSON('/OrderExecution/api/v1/getHsnCodesBySegmentId?id='+$("#stoneSegIdE").val()+'&type=S',function(data) {
			$('#compHsnCodeE').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.hsnCodes, function(key, val) {
				if(hsnData != null){
					if(hsnData.hsnCode == val.name){
	     				$('#compHsnCodeE').append('<option selected value="' + val.id + '">' + val.description + '</option>');
					}else{
						$('#compHsnCodeE').append('<option  value="' + val.id + '">' + val.description + '</option>');
					}
				}
				else{
					$('#compHsnCodeE').append('<option  value="' + val.id + '">' + val.description + '</option>');
				}
				
			});
		});
	})
}


$("#costPriceE").on("change",function(){
	var costPriceE = $("#costPriceE").val()
	 var colorDimond = $("#stoneCategoryE").val();
	 if($("#stoneSegmentE").val() == "Diamond"){
	 	    if(colorDimond == "CD Melees" || colorDimond == "CD Pointers" || colorDimond == "CD Solitaire"){
			var actulColr = $('#actualColorE').val();
			
			var fieldFilter = {
					"filterscount": 0, "groupscount": 0, "sortdatafield": "", "sortorder": "asc",  "pagenum": 0, "pagesize": 20,  "recordstartindex": 0,
					  "recordendindex": 20,  "fieldFilters": {
					    "cut": $("#cutGradeE").val(),
					    "clarity": $("#clarityE").val(),
					    "color": $("#colorE").val(),
					    "segment":$("#segmentIdE").val(),
					    "category":parseInt($("#CatIdE").val()),
					    "shape": parseInt(shapeIdE),
					    "fromRange": $("#fromCostRangeE").val(),
				        "actualColorVal":actulColr,
				        "costPriceVal" : parseFloat(costPriceE)
				  },
				  "offset": 0
				}
		}else{
		   var fieldFilter = null
		}
		if(costPriceE != "undefined" && costPriceE !=null && costPriceE  != ""){
			if(fieldFilter != null){
				postJSON('/OrderExecution/api/v1/getSellingPriceForVSM', JSON.stringify(fieldFilter),function(data) {
					if(data.sellingPrice != null){
						$("#sellingRateE").val(data.sellingPrice);
						 $("#colorDiamondFromCost").val(data.colorDiamondFromCost);
						 $("#colorDiamondToCost").val(data.colorDiamondToCost);
					}
			     });
	         }
	     }
     }
	 if($("#stoneSegmentE").val() == "Precious Stones" || $("#stoneSegmentE").val() == "Other Stones"){
		 if($("#fromCostRangeE").val() != "" && $("#toCostRangeE").val() != ""){
			 if($("#costPriceE").val()  < $("#fromCostRangeE").val() || $("#costPriceE").val()  > $("#toCostRangeE").val()){
				 $("#costPriceE").val("");
				 $.growl.error({
					message : "Cost Price Should be Entered Within the Range. !!!",
					duration : 10000,
					title : 'Error'
				 });
				 return false;
			 }
		 }
	 }
	 
});

var loadLovCreateE = function(segmentId, stoneDesc, clarityName, categoryId, shape, cutgrade){
	$.getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search', function(data) {					
		if(data.resCode == 1){								
			var $stoneSegment = $('#stoneSegmentE');
			$stoneSegment.empty().append('<option value="" selected>-- Select Option --</option>');
			$('#clarityE').empty().append('<option value="" selected>-- Select Option --</option>');
			
			$.each(data.payload.mTypes, function(key, val) {
				
				if(segmentId == val.id){
					$stoneSegment.append('<option selected value="' + val.id + '">' + val.description + '</option>');
				}else{
					$stoneSegment.append('<option value="' + val.id + '">' + val.description + '</option>');
				}
			});
			
			
			$.each (data.payload.clarity, function(key, val) {
				if(clarityName == val.name){
					$('#clarityE').append('<option selected value="'	+ val.id + '">' + val.name + '</option>');
				}else{
					$('#clarityE').append('<option value="'	+ val.id + '">' + val.name + '</option>');
				}
			});
			
		
			vendorList = data.payload.vCodeList;
			
			var data = [];
			$.each( vendorList, function( key, value ) {			      
					data.push({ value: value.id, label: value.name});
			});
			
		
				
			$("#vendorCodeE").autocomplete({						
				source: data,
				focus: function(event, ui) {						
					event.preventDefault();
					$(this).val(ui.item.label);						
				},
				select: function(event, ui) {					
					event.preventDefault();
					$(this).val(ui.item.label);					
					$("#vendorCodeE-value").val(ui.item.value);					
				}
		 });
	 }
});
	  var paramsCG = {
	    		"fieldFilters": 
	    		{
	    			"segId" :segmentId.toString(),
	    			"catId" : categoryId,
	    			"suppliedBy": 'CO',
	    			"shapeId": shape
	    		}
	    	};
	  	$('#cutGradeE').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/', JSON.stringify(paramsCG), function(data) {
			$.each (data.payload.cutGrade, function(key, val) {
				if(cutgrade == val.name){
					$('#cutGradeE').append('<option selected value="'	+ val.id + '">' + val.name + '</option>');
				}else{
					$('#cutGradeE').append('<option value="'	+ val.id + '">' + val.name + '</option>');
				}
			});
		});
		var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : segmentId.toString(),
				"sSeg" : stoneDesc
			}
		};
		$('#stoneCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/getStoneCategories', JSON.stringify(params), function(data) {
				$.each (data.payload.mainCatList, function(key, val) {
					if(categoryId == val.id){
						$('#stoneCategoryE').append('<option selected value="' + val.id + '">' + val.description + '</option>');
					}else{
						$('#stoneCategoryE').append('<option value="' + val.id + '">' + val.description + '</option>');
					}
			});
		});
		var paramsShape = {
					"fieldFilters" : {
						"suppliedBy" : 'CO',
						"sSegId" : segmentId.toString(),
						"sSeg" : stoneDesc,
						"catId" : categoryId.toString()
					}
		        };
		 if (stoneDesc == "Diamond") {
				$('#ShapeE').empty().append('<option value="" selected>-- Select Option --</option>');
	    		postJSON('api/v1/getShapes', JSON.stringify(paramsShape), function(data) {
	    				$('#ShapeE').empty().append('<option value="" selected>-- Select Option --</option>');
	    				$.each (data.payload.subCatList,  function(key, val) {
	    					if(shape == val.id){
	    						$('#ShapeE').append('<option selected value="' + val.id + '">' + val.description + '</option>');
	    					}else{
	    						$('#ShapeE').append('<option value="' + val.id + '">' + val.description + '</option>');
	    					}
						});
	    		});
	    		
				if(isActualColorField()) {
					$("#showActualColorE").show();
				}
				else {
					$("#showActualColorE").hide();
				}
				
	        } else {
				$('#subCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
	    		postJSON('api/v1/getStoneSubCategories', JSON.stringify(paramsShape), function(data) {
	    				$('#subCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
	    				$.each (data.payload.subCatList, function(key, val) {
	    					$('#subCategoryE').append('<option value="' + val.name + '">' + val.description + '</option>');
						});
	    		});
	        }
}

$("#stoneSegmentE").on("change", function() {
	if($("#stoneSegmentE").val() == "") {
		clearStoneDataE(2);
		clearStoneDataE(5);
		return;
	}
	clearStoneDataE(5);
	if($("#stoneSegmentE").val() != "") {
		clearStoneDataE(2);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#stoneSegmentE').val(),
				"sSeg" : $('#stoneSegmentE option:selected').text()
			}
		};
		
		
		$('#stoneCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/getStoneCategories', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$('#stoneCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
				$.each (data.payload.mainCatList, function(key, val) {
					$('#stoneCategoryE').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			}
		});		
		
		var segmentName = $('#stoneSegmentE option:selected').text();
		
		if (segmentName == "Diamond") {
        	$("#Show_ShapeE").show();
        	$("#Show_SubCategoryE").hide();
		}else {
        	$("#Show_ShapeE").hide();
        	$("#Show_SubCategoryE").show();
		}
		
		if(isExtraStoneFieldE()) {
			$("#showClarityE").show();
			$("#showColorE").show();
			$("#showCutGradeE").show();
		}else {
			$("#showClarityE").hide();
			$("#showColorE").hide();
			$("#showCutGradeE").hide();
			$("#showActualColorE").hide();
		}		
	}
});

$("#stoneCategoryE").on("change", function() {
	if($("#stoneCategoryE").val() == "") {
		$("#stoneCodeE").val('');
		$('#ShapeE').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
		return;
	}
	
    if ($("#stoneSegmentE").val() != "" && $("#stoneCategoryE").val() != "") {
    	$("#stoneCodeE").val('');
    	
    	onchangeAPIFromToCostWt($(this).val());
    	
    	$('#ShapeE').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
		
    	$.getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search&criteria=color&id='+$("#stoneCategoryE").val(), function(data) {
			$('#colorE').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each (data.payload.color , function(key, val) {
						$('#colorE').append('<option value="' + val.id + '">' + val.name + '</option>');
			});			
		});
		
    	$.getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search&criteria=actualColor&id='+$("#stoneCategoryE").val(), function(data) {
			$('#actualColorE').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each (data.payload.actualColor, function(key, val) {
						$('#actualColorE').append('<option value="' + val.id + '">' + val.name + '</option>');
			});		
		});
    	
        var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#stoneSegmentE').val(),
				"sSeg" : $('#stoneSegmentE option:selected').text(),
				"catId" : $("#stoneCategoryE").val()
			}
        };
        
        var segmentName = $('#stoneSegmentE option:selected').text();
        if (segmentName == "Diamond") {
			$('#ShapeE').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getShapes', JSON.stringify(params), function(data) {
    			if(1 == data.resCode){
    				$('#ShapeE').empty().append('<option value="" selected>-- Select Option --</option>');
    				$.each (data.payload.subCatList,  function(key, val) {
    					$('#ShapeE').append('<option value="' + val.id + '">' + val.description + '</option>');
					});
    			}
    		});
    		
			if(isActualColorField()) {
				$("#showActualColorE").show();
			}
			else {
				$("#showActualColorE").hide();
			}
			
        } else {
			$('#subCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getStoneSubCategories', JSON.stringify(params), function(data) {
    			if(1 == data.resCode){
    				$('#subCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
    				$.each (data.payload.subCatList, function(key, val) {
    					$('#subCategoryE').append('<option value="' + val.name + '">' + val.description + '</option>');
					});
    			}
    		});
        }
    }
});

$("#ShapeE").on("change", function() {
	if($("#ShapeC").val() == "") {
		$("#stoneCodeE").val('');
		return;
	}
	
	if ($("#stoneSegmentE").val() != "" && $("#stoneCategoryE").val() != "" && $("#ShapeE") != "") {
        var params = {
    		"fieldFilters": 
    		{
    			"segId" : $('#stoneSegmentE').val(),
    			"catId" : $("#stoneCategoryE").val(),
    			"suppliedBy": 'CO',
    			"shapeId": $("#ShapeE").val()
    		}
    	};
        $('#cutGradeE').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/getStoneCodeAndOthers', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$("#stoneCodeE").val(data.payload.stoneDetails.name);
				$("#stoneCodeIdE").val(data.payload.stoneDetails.id);
				$.each (data.payload.cutGrade , function(key, val) {					
					$('#cutGradeE').append('<option value="' + val.id + '">' + val.id + '</option>');
				});
				
				$("#uomE").val(data.payload.uom);
			}
		});
    }

});


$("#subCategoryE").on("change", function() {
	if($("#subCategoryE").val() == "") {
		$("#stoneCodeE").val('');
		return;
	}
	if ($("#stoneSegmentE").val() != "" && $("#subCategoryE") != "") {
        var params = {
    		"fieldFilters": {
    			"segId" : $('#stoneSegmentE').val(),
    			"catId" : $("#stoneCategoryE").val(),
    			"suppliedBy": 'CO',
    			"subCatCode": $("#subCategoryE").val()
    		}
        }; 
        $('#cutGradeE').empty().append('<option value="" selected>-- Select Option --</option>');
        postJSON('api/v1/getStoneCodeAndOthers', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$("#stoneCodeE").val(data.payload.stoneDetails.name);
				$("#stoneCodeIdE").val(data.payload.stoneDetails.id);
				$.each (data.payload.cutGrade , function(key, val) {					
					$('#cutGradeE').append('<option value="' + val.id + '">' + val.id + '</option>');
				});

				$("#uomE").val(data.payload.stoneDetails.value);
			}
        });
    }
});

function clearStoneDataE (level) {

    if (level <= 1) {
    	$('#stoneSegmentE').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 2) {
    	$('#stoneCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 3) {
    	$('#ShapeE').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategoryE').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 4) {		
		$('#actualColorE').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#colorE').empty().append('<option value="" selected>-- Select Option --</option>');		
		$("#stoneCodeE").val('');
	
    }
    
}

function isExtraStoneFieldE () {
	   if ($('#stoneSegmentE option:selected').text() == "Diamond") {
	        return true;
	    } else {
	        return false;
	    }
	}

function isActualColorFieldE () {
    var mainCategory = $('#stoneCategoryE option:selected').text();
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

$("#saveStoreMasterE").on('click', function(){
	if($("#sellingRateE").val() == ""){
		$.growl.error({
			message : "Selling Price is mandatory !!!",
			duration : 10000,
			title : 'Success'
		});
		return false;
	}
	if($("#costPriceE").val() == "" || $("#directPerE").val() == "" || $("#exchangePerE").val() == "" || $("#vendorHsnCodeE").val() == "" 
		|| $("#compHsnCodeE").val() == "" ){
		$.growl.error({
			message : "Please Enter mandatory fields.",
			duration : 10000,
			title : 'Success'
		});
		return false;
	}
	var costPriceRate = parseFloat($("#costPriceE").val());
	var sellingRatePrice = parseFloat($("#sellingRateE").val());
	if (costPriceRate > sellingRatePrice) {
		$.growl.error({
			message : "Selling Rate should be greater than or equal to Cost Price",
			duration : 1000
		});
		return false;
	}
	var saveStoneDetObj = {
	  "id": $("#vendorStoneDetID").val(),
	  "costPriceInRs": parseFloat($("#costPriceE").val()),
	  "directPercentage": parseFloat($("#directPerE").val()),
	  "exchangePercentage": parseFloat($("#exchangePerE").val()),
	  "vendorStone": {
	    "id": parseInt($("#vendorStoneID").val()),
	    "handlingCharges": $("#handlingChargesE").val(),
	    "vendorHsnCode" :$("#vendorHsnCodeE").val(),
	    "hsnMaster" : {
	    	  "id" : $("#compHsnCodeE").val()
	         }
	  },
	  "colorDiamondFromCost":parseFloat($("#colorDiamondFromCost").val()),
	  "colorDiamondToCost":parseFloat($("#colorDiamondToCost").val()),
	};
	postJSON('api/v1/editVendorStone', JSON.stringify(saveStoneDetObj), function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$("#editStonendorDet").modal('hide');
			stoneVendorMasterGrid();
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			return false;
		}
	});
});

// Export Vendor Stone
$("#exportA").on('click', function(){
	var data;
	var newData = [];	
	    var vendor = $('#vendorCode-value').val();
		var stoneSegment = $('#stoneSegment').val();
		var stoneCategory = $('#stoneCategory').val();
		var subCategory = $('#subCategory').val();
		var shape = $('#Shape').val();
		var stoneCode = $('#stoneCode').val();  
		var clarity = $("#clarity option:selected").text();
		var actualColor = $("#actualColor option:selected").text();
		var color =  $("#color option:selected").text();
		var cutGrade = $("#cutGrade option:selected").text();
		var status = $('#status').val();
		var stoneVendorDateFrom = $('#stoneVendorDateFrom').val();
		var stoneVendorDateTo = $('#stoneVendorDateTo').val();
		var businessS = $('#businessS').val();
		//var regionS = $('#regionS').val();	
		var fromWtCost = $('#fromWtCost').val();
		var toWtCost = $('#toWtCost').val();
		
		fieldFilters = {
				"fieldFilters" : {}
			};
		if (businessS != "" && businessS != null) {
			fieldFilters.fieldFilters["business"] = parseInt(businessS);
		}
		/*if (regionS != "" && regionS != null) {
			fieldFilters.fieldFilters["regionId"] = parseInt(regionS);
		}*/
		if (fromWtCost != "" && fromWtCost != null) {
			fieldFilters.fieldFilters["fromWtCost"] = parseFloat(fromWtCost);
		}
		if (toWtCost != "" && toWtCost != null) {
			fieldFilters.fieldFilters["toWtCost"] = parseFloat(toWtCost);
		}
		if (stoneVendorDateFrom != "" && stoneVendorDateFrom != null) {
			fieldFilters.fieldFilters["stoneVendorDateFrom"] = stoneVendorDateFrom;
		}
		if (stoneVendorDateTo != "" && stoneVendorDateTo != null) {
			fieldFilters.fieldFilters["stoneVendorDateTo"] = stoneVendorDateTo;
		}
		if ($('#vendorCode').val() != "" && $('#vendorCode').val() != null) {
			fieldFilters.fieldFilters["vendor"] = parseInt(vendor);
		}
		if (stoneSegment != "" && stoneSegment != null) {
			fieldFilters.fieldFilters["stoneSegment"] = parseInt(stoneSegment);
		}
		if (stoneCategory != "" && stoneCategory != null) {
			fieldFilters.fieldFilters["stoneCategory"] = parseInt(stoneCategory);
		}
		if ($('#Show_SubCategory').is(":visible") && subCategory != "" && subCategory != null) {
			fieldFilters.fieldFilters["subCategory"] = subCategory;
		}
		if ($('#Show_Shape').is(":visible") && shape != "" && shape != null) {
			fieldFilters.fieldFilters["shape"] = parseInt(shape);
		}
		if (stoneCode != "" && stoneCode != null) {
			fieldFilters.fieldFilters["stoneCode"] = stoneCode;
		}
		if ($('#showClarity').is(":visible") && $('#clarity').val() != "" && $('#clarity').val()  != null) {
			fieldFilters.fieldFilters["clarityVal"] = clarity;
		}
		if ($('#showActualColor').is(":visible") && $('#actualColor').val()  != "" && $('#actualColor').val()  != null) {
			fieldFilters.fieldFilters["actualColorVal"] = actualColor;
		}
		if ($('#showColor').is(":visible") && $('#color').val() != "" && $('#color').val() != null) {
			fieldFilters.fieldFilters["colorVal"] = color;
		}
		if ($('#showCutGrade').is(":visible") && $('#cutGrade').val()  != "" && $('#cutGrade').val()  != null) {
			fieldFilters.fieldFilters["cutGradeVal"] = cutGrade;
		}
		if (status != "" && status != null) {
			fieldFilters.fieldFilters["status"] = parseInt(status);
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
		   	postJSON('/OrderExecution/api/v1/exportVendorStones',JSON.stringify(fieldFilters), function(response) {
				if(response!=null){
				data = response.payload.list;	
				for(i=0; i<data.length; i++){
					newData.push({										
						'Vendor' : (data[i].vendorStone != null) ? data[i].vendorStone.vendor.vendorName : "",
						'Segment' : (data[i].vendorStone != null) ? data[i].vendorStone.segment.description : "",
						'Main Category':  (data[i].vendorStone != null) ? data[i].vendorStone.category.description: "",
						'Article Code': (data[i].vendorStone != null) ? data[i].vendorStone.stone.stoneCode: "",									
						'Article Description': (data[i].id != null) ? data[i].articleDescription: "",
						'Main Category':  (data[i].vendorStone != null) ?data[i].vendorStone.category.description: "",
						'Cut' : (data[i].cut != null) ?data[i].cut	: "",
						'Color': (data[i].color != null) ? data[i].color: "",
						'Clarity':(data[i].clarity != null) ? data[i].clarity: "",	
						'Actual Color' : (data[i].actualColor != null) ? data[i].actualColor: "",
						'Shape': (data[i].shape != null) ? data[i].shape.name : "",
						'Color Diamond From Cost': (data[i].colorDiamondFromCost != null) ? data[i].colorDiamondFromCost: "",
						'Color Diamond To Cost': (data[i].colorDiamondToCost != null) ? data[i].colorDiamondToCost: "",
						'From Wt.Cost Range':(data[i].fromWtCostrange != null) ? data[i].fromWtCostrange:"",
						'To Wt.Cost Range': (data[i].toWtCostrange != null) ? data[i].toWtCostrange:"",
						'From Wt./To Wt.Cost Range':(data[i].slab != null) ? data[i].slab:"",
						'Cost Price In Rs': (data[i].costPriceInRs != null) ? data[i].costPriceInRs: "",
						'UQC':(data[i].uom != null) ? data[i].uom: "",
						'Direct Percentage': (data[i].directPercentage != null) ? data[i].directPercentage: "",
						'Exchange Percentage': (data[i].exchangePercentage != null) ? data[i].exchangePercentage: "",
						'Selling Price':  (data[i].sellingPrice != null) ?data[i].sellingPrice: "",
						'Created By':  (data[i].createdBy != null) ?data[i].createdBy: "",
						'Status':  (data[i].status != null) ?data[i].status: "",						
					   });	
			        }
				  //JSONToCSVConvertor(newData, "Vendor Stone" + "_" + sysdate, true);	
				var opts = [{sheetid:'Vendor_Stone_Active_Export',header:true}];
		        var res = alasql('SELECT * INTO XLSX("Vendor Stone Active Export_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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


//Export Vendor Stone
$("#export").on('click', function(){
	var data;
	var newData = [];	
	    var vendor = $('#vendorCode-value').val();
		var stoneSegment = $('#stoneSegment').val();
		var stoneCategory = $('#stoneCategory').val();
		var subCategory = $('#subCategory').val();
		var shape = $('#Shape').val();
		var stoneCode = $('#stoneCode').val();  
		var clarity = $("#clarity option:selected").text();
		var actualColor = $("#actualColor option:selected").text();
		var color =  $("#color option:selected").text();
		var cutGrade = $("#cutGrade option:selected").text();
		var status = $('#status').val();
		var stoneVendorDateFrom = $('#stoneVendorDateFrom').val();
		var stoneVendorDateTo = $('#stoneVendorDateTo').val();
		var businessS = $('#businessS').val();
		//var regionS = $('#regionS').val();	
		var fromWtCost = $('#fromWtCost').val();
		var toWtCost = $('#toWtCost').val();
		fieldFilters = {
				"fieldFilters" : {}
			};
		if (businessS != "" && businessS != null) {
			fieldFilters.fieldFilters["business"] = parseInt(businessS);
		}
		/*if (regionS != "" && regionS != null) {
			fieldFilters.fieldFilters["regionId"] = parseInt(regionS);
		}*/
		if (fromWtCost != "" && fromWtCost != null) {
			fieldFilters.fieldFilters["fromWtCost"] = parseFloat(fromWtCost);
		}
		if (toWtCost != "" && toWtCost != null) {
			fieldFilters.fieldFilters["toWtCost"] = parseFloat(toWtCost);
		}
		if (stoneVendorDateFrom != "" && stoneVendorDateFrom != null) {
			fieldFilters.fieldFilters["stoneVendorDateFrom"] = stoneVendorDateFrom;
		}
		if (stoneVendorDateTo != "" && stoneVendorDateTo != null) {
			fieldFilters.fieldFilters["stoneVendorDateTo"] = stoneVendorDateTo;
		}
		if ($('#vendorCode').val() != "" && $('#vendorCode').val() != null) {
			fieldFilters.fieldFilters["vendor"] = parseInt(vendor);
		}
		if (stoneSegment != "" && stoneSegment != null) {
			fieldFilters.fieldFilters["stoneSegment"] = parseInt(stoneSegment);
		}
		if (stoneCategory != "" && stoneCategory != null) {
			fieldFilters.fieldFilters["stoneCategory"] = parseInt(stoneCategory);
		}
		if ($('#Show_SubCategory').is(":visible") && subCategory != "" && subCategory != null) {
			fieldFilters.fieldFilters["subCategory"] = subCategory;
		}
		if ($('#Show_Shape').is(":visible") && shape != "" && shape != null) {
			fieldFilters.fieldFilters["shape"] = parseInt(shape);
		}
		if (stoneCode != "" && stoneCode != null) {
			fieldFilters.fieldFilters["stoneCode"] = stoneCode;
		}
		if ($('#showClarity').is(":visible") && $('#clarity').val() != "" && $('#clarity').val()  != null) {
			fieldFilters.fieldFilters["clarityVal"] = clarity;
		}
		if ($('#showActualColor').is(":visible") && $('#actualColor').val()  != "" && $('#actualColor').val()  != null) {
			fieldFilters.fieldFilters["actualColorVal"] = actualColor;
		}
		if ($('#showColor').is(":visible") && $('#color').val() != "" && $('#color').val() != null) {
			fieldFilters.fieldFilters["colorVal"] = color;
		}
		if ($('#showCutGrade').is(":visible") && $('#cutGrade').val()  != "" && $('#cutGrade').val()  != null) {
			fieldFilters.fieldFilters["cutGradeVal"] = cutGrade;
		}
		if (status != "" && status != null) {
			fieldFilters.fieldFilters["status"] = parseInt(status);
		}
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		var rows = $("#jqxgrid").jqxGrid('getrows');
	    if(status == 1){
		$.growl.error({
			message : "Please Select Status as In-Active",
			duration : 10000
		});
		return false;
	}
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		postJSON('/OrderExecution/api/v1/exportInActiveVendorStones',JSON.stringify(fieldFilters), function(response) {
			if(response.resCode == 2){
				$.growl.error({
					message : response.mesgStr,
					duration : 10000
				});
				return false;
			}
			else
			{
				data = response.payload.list;	
				for(i=0; i<data.length; i++){
					newData.push({					
						'Vendor' : (data[i].vendorStone != null) ? data[i].vendorStone.vendor.vendorName : "",
						'Segment' : (data[i].vendorStone != null) ? data[i].vendorStone.segment.description : "",
						'Main Category':  (data[i].vendorStone != null) ? data[i].vendorStone.category.description: "",
						'Article Code': (data[i].vendorStone != null) ? data[i].vendorStone.stone.stoneCode: "",									
						'Article Description': (data[i].id != null) ? data[i].articleDescription: "",
						'Main Category':  (data[i].vendorStone != null) ?data[i].vendorStone.category.description: "",
						'Cut' : (data[i].cut != null) ?data[i].cut	: "",
						'Color': (data[i].color != null) ? data[i].color: "",
						'Clarity':(data[i].clarity != null) ? data[i].clarity: "",	
						'Actual Color' : (data[i].actualColor != null) ? data[i].actualColor: "",
						'Shape': (data[i].shape != null) ? data[i].shape.name : "",
						'Color Diamond From Cost': (data[i].colorDiamondFromCost != null) ? data[i].colorDiamondFromCost: "",
						'Color Diamond To Cost': (data[i].colorDiamondToCost != null) ? data[i].colorDiamondToCost: "",
						'From Wt.Cost Range':(data[i].fromWtCostrange != null) ? data[i].fromWtCostrange:"",						
						'To Wt.Cost Range': (data[i].toWtCostrange != null) ? data[i].toWtCostrange:"",
						'From Wt./To Wt.Cost Range':(data[i].slab != null) ? data[i].slab:"",
						'Cost Price In Rs': (data[i].costPriceInRs != null) ? data[i].costPriceInRs: "",
						'UQC':(data[i].uom != null) ? data[i].uom: "",
						'Direct Percentage': (data[i].directPercentage != null) ? data[i].directPercentage: "",
						'Exchange Percentage': (data[i].exchangePercentage != null) ? data[i].exchangePercentage: "",
						'Selling Price':  (data[i].sellingPrice != null) ?data[i].sellingPrice: "",
						'Created By':  (data[i].createdBy != null) ?data[i].createdBy: "",
						'Status':  (data[i].status != null) ?data[i].status: "",						
					   });	
			        }
				 // JSONToCSVConvertor(newData, "Vendor Stone" + "_" + sysdate, true);	
				var opts = [{sheetid:'Vendor_Stone_In-Active_Export',header:true}];
		        var res = alasql('SELECT * INTO XLSX("Vendor Stone In-Active Export_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
				}
		   });		 
	});

///////////*************Selected Fieldfilter****************//////////////

var selectedFieldFilter = function(){
	var vendor = $('#vendorCode-value').val();
	var stoneSegment = $('#stoneSegment').val();
	var stoneCategory = $('#stoneCategory').val();
	var subCategory = $('#subCategory').val();
	var shape = $('#Shape').val();
	var stoneCode = $('#stoneCode').val();  
	var clarity = $("#clarity option:selected").text();
	var actualColor = $("#actualColor option:selected").text();
	var color =  $("#color option:selected").text();
	var cutGrade = $("#cutGrade option:selected").text();
	var status = $('#status').val();
	var stoneVendorDateFrom = $('#stoneVendorDateFrom').val();
	var stoneVendorDateTo = $('#stoneVendorDateTo').val();
	var businessS = $('#businessS').val();
	//var regionS = $('#regionS').val();	
	var fromWtCost = $('#fromWtCost').val();
	var toWtCost = $('#toWtCost').val();
	var fieldFilters = {
			"fieldFilters" : {}
		};
	if (businessS != "" && businessS != null) {
		fieldFilters.fieldFilters["business"] = parseInt(businessS);
	}
	/*if (regionS != "" && regionS != null) {
		fieldFilters.fieldFilters["regionId"] = parseInt(regionS);
	}*/
	if (fromWtCost != "" && fromWtCost != null) {
		fieldFilters.fieldFilters["fromWtCost"] = parseFloat(fromWtCost);
	}
	if (toWtCost != "" && toWtCost != null) {
		fieldFilters.fieldFilters["toWtCost"] = parseFloat(toWtCost);
	}
	if (stoneVendorDateFrom != "" && stoneVendorDateFrom != null) {
		fieldFilters.fieldFilters["stoneVendorDateFrom"] = stoneVendorDateFrom;
	}
	if (stoneVendorDateTo != "" && stoneVendorDateTo != null) {
		fieldFilters.fieldFilters["stoneVendorDateTo"] = stoneVendorDateTo;
	}
	if ($('#vendorCode').val() != "" && $('#vendorCode').val() != null) {
		fieldFilters.fieldFilters["vendor"] = parseInt(vendor);
	}
	if (stoneSegment != "" && stoneSegment != null) {
		fieldFilters.fieldFilters["stoneSegment"] = parseInt(stoneSegment);
	}
	if (stoneCategory != "" && stoneCategory != null) {
		fieldFilters.fieldFilters["stoneCategory"] = parseInt(stoneCategory);
	}
	if ($('#Show_SubCategory').is(":visible") && subCategory != "" && subCategory != null) {
		fieldFilters.fieldFilters["subCategory"] = subCategory;
	}
	if ($('#Show_Shape').is(":visible") && shape != "" && shape != null) {
		fieldFilters.fieldFilters["shape"] = parseInt(shape);
	}
	if (stoneCode != "" && stoneCode != null) {
		fieldFilters.fieldFilters["stoneCode"] = stoneCode;
	}
	if ($('#showClarity').is(":visible") && $('#clarity').val() != "" && $('#clarity').val()  != null) {
		fieldFilters.fieldFilters["clarityVal"] = clarity;
	}
	if ($('#showActualColor').is(":visible") && $('#actualColor').val()  != "" && $('#actualColor').val()  != null) {
		fieldFilters.fieldFilters["actualColorVal"] = actualColor;
	}
	if ($('#showColor').is(":visible") && $('#color').val() != "" && $('#color').val() != null) {
		fieldFilters.fieldFilters["colorVal"] = color;
	}
	if ($('#showCutGrade').is(":visible") && $('#cutGrade').val()  != "" && $('#cutGrade').val()  != null) {
		fieldFilters.fieldFilters["cutGradeVal"] = cutGrade;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = parseInt(status);
	}
	 
	return fieldFilters;
}

///////////*************Export to Audit************//////////
$("#exportAudit").on("click",function(){
	
	    var fieldFilters = selectedFieldFilter();
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		var rows = $("#jqxgrid").jqxGrid('getrows');
	    				
		if(rows.length != 0){
			postJSON('/OrderExecution/api/v1/downloadOrExportVendorStoneArticle',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
					data = response.payload.list;
					exportVendorStoneMasterSideBySide(data);
				}
			});
		}
		 else{
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;	
		}
	 
});

function exportVendorStoneMasterSideBySide(data){

	var sql0 = 'SEARCH / AS @vh \
		RETURN ( \
		   @vh->[vendorStoneId] AS [VendorStoneId], \
	       @vh->[isActive] AS [isActive] ,\
		   @vh->[stoneDesc] AS [StoneDesc], \
	       @vh->[stone]->segment AS [StoneSegment], \
		   @vh->[vendor]->vendorName AS [VendorName], \
	       @vh->[category]->description AS [CategoryDesc], \
	       @vh->[handlingCharges] AS [HandlingCharges], \
	       @vh->[segment]->description AS [SegmentDescription], \
		   @vh->[subCategory] AS [subCategory], \
	       @vh->[shape]->description AS [Shape], \
	       @vh->[stoneCode] AS [StoneCode], \
	       @vh->[hsnmaster]->hsnCode AS [Hsnmaster], \
	       @vh->[VendorHsnCode] AS [VendorHsnCode], \
	       @vh->[vendorStoneDetailId] AS [VendorStoneDetailId], \
	       @vh->[actualColor] AS [ActualColor], \
	       @vh->[clarity] AS [Clarity], \
	       @vh->[color] AS [Color], \
	       @vh->[costPriceInRupees] AS [CostPriceInRupees], \
	       @vh->[cutGrade] AS [CutGrade], \
	       @vh->[FromWtCostRange] AS [FromWtCostRange], \
	       @vh->[detailIsActive] AS [DetailIsActive], \
	       @vh->[stoneWtSlab] AS [StoneWtSlab], \
	       @vh->[ToWtCostRange] AS [ToWtCostRange], \
	       @vh->[articleDesc] AS [ArticleDesc], \
	       @vh->[exchangePerc] AS [ExchangePerc], \
		   @vh->[directPerc] AS [DirectPerc], \
		   @vh->[colorDiamondFromCost] AS [ColorDiamondFromCost], \
		   @vh->[colorDiamondToCost] AS [ColorDiamondToCost] \
			) \
		FROM $0';
	

	 var sql1 = 'SELECT * FROM ? AS m ';
    
 var res = null;
    
    var mystyle = {
      cellStyles: true,
      headers:true, 
      column: {style:{Font:{Bold:30}}},
      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
      cells: {1:{1:{
        style: {Font:{Color:"#00FFFF"}}
      }}}
    };
    
    try
    {
    	// Following code generates export data as Master-Child side-by-side
    	res0 = alasql(sql0,[data]);
    	//res1 = alasql(sql1,[data]);
    	res = alasql(sql1,[res0, res]);
    	adjustObjectKeys(res); 
    	removeNullData(res);
    	res = alasql("SELECT * INTO XLSX('VendorStoneDetails.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	alert(err.message);
    }

	
}

///////////Download the Vendor Stone Article ///////////////////////////
$("#downloadVfgData").on("click",function(){
		var fieldFilters = selectedFieldFilter();
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
				postJSON('/OrderExecution/api/v1/downloadOrExportVendorStoneArticle',JSON.stringify(fieldFilters),function(response) {
					if (response != null) {
						data = response.payload.list;
						downloadVendorStoneMasterSideBySide(data);
					}
				});
			}
			 else{
				$.growl.error({
					message : "No Data to Download",
					duration : 10000
				});
				return false;	
			}
		 }
	});

function downloadVendorStoneMasterSideBySide(data){
		var sql0 = 'SEARCH / AS @vh \
			RETURN ( \
			   @vh->[vendorStoneId] AS [VendorStoneId], \
		       @vh->[isActive] AS [isActive] ,\
			   @vh->[stoneDesc] AS [StoneDesc], \
		       @vh->[stone]->id AS [StoneId], \
			   @vh->[vendor]->vendorId AS [VendorId], \
			   @vh->[vendor]->vendorName AS [VendorName], \
		       @vh->[category]->id AS [CategoryId], \
			   @vh->[category]->description AS [CategoryDesc], \
		       @vh->[handlingCharges] AS [HandlingCharges], \
		       @vh->[segment]->segmentId AS [SegmentId], \
			   @vh->[segment]->description AS [SegmentDesc], \
			   @vh->[subCategory]->id AS [subCategoryId], \
			   @vh->[subCategory]->description AS [subCategoryDesc], \
		       @vh->[shape]->shapeId AS [ShapeId], \
			   @vh->[shape]->description AS [ShapeDesc], \
		       @vh->[stoneCode] AS [StoneCode], \
		       @vh->[hsnmaster]->id AS [Hsnmaster], \
			   @vh->[hsnmaster]->hsnDescription AS [HsnmasterDesc], \
		       @vh->[VendorHsnCode] AS [VendorHsnCode], \
		       @vh->[vendorStoneDetailId] AS [VendorStoneDetailId], \
		       @vh->[actualColor] AS [ActualColor], \
		       @vh->[clarity] AS [Clarity], \
		       @vh->[color] AS [Color], \
		       @vh->[costPriceInRupees] AS [CostPriceInRupees], \
		       @vh->[cutGrade] AS [CutGrade], \
		       @vh->[FromWtCostRange] AS [FromWtCostRange], \
		       @vh->[detailIsActive] AS [DetailIsActive], \
		       @vh->[stoneWtSlab] AS [StoneWtSlab], \
		       @vh->[ToWtCostRange] AS [ToWtCostRange], \
		       @vh->[articleDesc] AS [ArticleDesc], \
		       @vh->[exchangePerc] AS [ExchangePerc], \
			   @vh->[directPerc] AS [DirectPerc], \
			   @vh->[colorDiamondFromCost] AS [ColorDiamondFromCost], \
			   @vh->[colorDiamondToCost] AS [ColorDiamondToCost] \
				) \
			FROM $0';
		

		 var sql1 = 'SELECT * FROM ? AS m ';
	    
	 var res = null;
	    
	    var mystyle = {
	      cellStyles: true,
	      headers:true, 
	      column: {style:{Font:{Bold:30}}},
	      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
	      cells: {1:{1:{
	        style: {Font:{Color:"#00FFFF"}}
	      }}}
	    };
	    
	    try
	    {
	    	// Following code generates export data as Master-Child side-by-side
	    	res0 = alasql(sql0,[data]);
	    	//res1 = alasql(sql1,[data]);
	    	res = alasql(sql1,[res0, res]);
	    	adjustObjectKeys(res); 
	    	removeNullData(res);
	    	res = alasql("SELECT * INTO XLSX('DownloadVendorArticleStoneDetails.xlsx',?) FROM ?",[mystyle, res]);
	    }
	    catch (err)
	    {
	    	alert(err.message);
	    } 	 
}


//////////************* Upload function **********///////////////
 
function HandleUploadExcelFile()
{
	// Check if file select event is captured
	if (fileEvent == null || (fileEvent != null && $.type(fileEvent) != "object"))
	{
		alert("Please select the data Excel file to load!");
		return;
	}

	var event = fileEvent;
    try {
	    alasql('SELECT * FROM FILE(?,{headers:true})', [event], function(data){
	        // Process data here if any conversion or validation is required!
			if (data != null)
			{
				var cols = getColumnHeaders(data);
				if (cols != null && cols.length > 0) {
									
				}
				else {
					alert("No data found in the uploaded file...");
				}
				//console.log(JSON.stringify(data));
				var dataVendorDetails = [];			
				$.each(data,function(key,value){					
					var flag = false;				
					if(dataVendorDetails.length>0){
						$.each(dataVendorDetails,function(index,dataValue){
							if(value.VendorStoneId != null && value.VendorStoneId != 'undefined' && value.VendorStoneId != '' && value.VendorStoneId == dataValue.vendorStoneId){
								flag = true;
								var row ={	
										"vendorStoneDetailId": value.VendorStoneDetailId,
								        "actualColor": value.ActualColor,
								        "clarity": value.Clarity,
								        "color": value.Color,
								        "costPriceInRupees": value.CostPriceInRupees,
								        "cutGrade": value.CutGrade,
								        "FromWtCostRange": value.FromWtCostRange,
								        "detailIsActive": value.DetailIsActive,
								        "stoneWtSlab": value.StoneWtSlab,
								        "ToWtCostRange": value.ToWtCostRange,
								        "articleDesc": value.ArticleDesc,
								        "exchangePerc": value.ExchangePerc,
								        "directPerc": value.DirectPerc,
								        "colorDiamondFromCost": value.ColorDiamondFromCost,
								        "colorDiamondToCost": value.ColorDiamondToCost
								}
								dataValue.vendorStoneArticleDetails.push(row);
								return;
							}else if(
									value.isActive == dataValue.isActive && value.StoneId == dataValue.stone.id && value.VendorId == dataValue.vendor.vendorId &&
									value.SegmentId == dataValue.segment.id && value.CategoryId == dataValue.category.id && value.subCategory ==  dataValue.subCategory &&
									value.ShapeId == dataValue.shape.id && value.StoneCode == dataValue.stoneCode && value.Hsnmaster == dataValue.hsnmaster.hsnCode){
								flag = true;
								var row ={	
										"vendorStoneDetailId": value.VendorStoneDetailId,
								        "actualColor": value.ActualColor,
								        "clarity": value.Clarity,
								        "color": value.Color,
								        "costPriceInRupees": value.CostPriceInRupees,
								        "cutGrade": value.CutGrade,
								        "FromWtCostRange": value.FromWtCostRange,
								        "detailIsActive": value.DetailIsActive,
								        "stoneWtSlab": value.StoneWtSlab,
								        "ToWtCostRange": value.ToWtCostRange,
								        "articleDesc": value.ArticleDesc,
								        "exchangePerc": value.ExchangePerc,
								        "directPerc": value.DirectPerc,
								        "colorDiamondFromCost": value.ColorDiamondFromCost,
								        "colorDiamondToCost": value.ColorDiamondToCost
								}
								dataValue.vendorStoneArticleDetails.push(row);
								return;
							}
						});
					}
					if(flag == false){
						var rowObj = {
							"isActive": value.isActive,
					        "vendorStoneId": value.VendorStoneId,
					        "stoneDesc": value.stoneDesc,
					        "stone": {
					          "id": value.StoneId,
					        },
					        "vendor": {
					          "vendorId": value.VendorId,
					        },
					        "category": {
					          "id": value.CategoryId,
					        },
					        "handlingCharges": value.HandlingCharges,
					        "segment": {
					          "id": value.SegmentId,
					        },
					        "subCategory": {
					        	 "id" : value.subCategory,
					        },
					        "shape": {
					          "id": value.ShapeId,
					        },
					        "stoneCode": value.StoneCode,
					        "hsnmaster": {
					          "id": value.Hsnmaster,
					        },
					        "VendorHsnCode": value.VendorHsnCode,
							"vendorStoneArticleDetails":[{
								"vendorStoneDetailId": value.VendorStoneDetailId,
						        "actualColor": value.ActualColor,
						        "clarity": value.Clarity,
						        "color": value.Color,
						        "costPriceInRupees": value.CostPriceInRupees,
						        "cutGrade": value.CutGrade,
						        "FromWtCostRange": value.FromWtCostRange,
						        "detailIsActive": value.DetailIsActive,
						        "stoneWtSlab": value.StoneWtSlab,
						        "ToWtCostRange": value.ToWtCostRange,
						        "articleDesc": value.ArticleDesc,
						        "exchangePerc": value.ExchangePerc,
						        "directPerc": value.DirectPerc,
						        "colorDiamondFromCost": value.ColorDiamondFromCost,
						        "colorDiamondToCost": value.ColorDiamondToCost
							}]
						}
						dataVendorDetails.push(rowObj);
					}
					
				});
				var arrFg = [];		
				for(var i=0;i<dataVendorDetails.length;i++){					
					if(dataVendorDetails[i].VendorStoneId == null && dataVendorDetails[i].vendor.vendorId == undefined && dataVendorDetails[i].category.id==undefined &&
							dataVendorDetails[i].stone.id == undefined && dataVendorDetails[i].segment.id == undefined && dataVendorDetails[i].subCategory.id==undefined &&
							dataVendorDetails[i].hsnmaster.hsnCode == undefined ) {	
						
					} else {
						arrFg.push(dataVendorDetails[i]);
					}
				}
				var sdetails = JSON.stringify(arrFg);
				console.log(sdetails);
				postJSON('/OrderExecution/api/v1/UploadVendorStoneArticle', sdetails, function(response) {
					if (response.resCode == 1) {
						$.growl.notice({
							message : response.mesgStr,
							duration : 10000,
							title : 'Success'
						});
						return false;
					}else {
						$.growl.error({
							message : response.mesgStr,
							duration : 10000
						});
						return false;
					}
					
				});
				
			}
			else {
				alert("Invalid data in the uploaded file...");
			}

	    });	    	
    }
	catch(err) {
		//console.log('Upload Error: ', err);
		alert('Upload Error: ', err);
	};

	//change the 'testUpload' to the input id in your page
	document.getElementById("vendorStoneUpload").value = "";
	fileEvent = null;
 }

 function captureFileSelectEvent(event)
 {
 	fileEvent = event;
 }


