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
$("#exportFg").prop('disabled',true);
//loadPermission();
$("#ageAnalysis").hide();
$("#stoneAcc").hide();
$('input[name=ageAnalysis]:radio').on('click', function() {
	var selectedVal = $(this).val();

	if (selectedVal == "fgCustomer") {
		$("#ageAnalysis").show();
		$("#stoneAcc").hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');

	} else if (selectedVal == "stoneAccessory") {
		$("#stoneAcc").show();
		$("#ageAnalysis").hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
		
		stoneAccOnLoadFunc()
	}
});

$("#jewelDet").hide();
$("#mainCatDet").hide();
$("#subCatDet").hide();
$("#aCode").hide();
$("#consignmentType").hide();

var ageingAnalysisFieldFilters = function() {
	var scOrder = $('#scOrder').val();
	var storedc = $('#storedc').val();
	var storeDcName = $('#storeDcName').val();
	var artSeg = $('#artSeg').val();
	var vendors = $('#vendors').val();
	var consType = $('#consTypeObj').val();
	var zoneId = $('#zoneName').val();
	/*
	 * var jewelCode = $('#jewelCode').val(); var mainCat = $('#mainCat').val();
	 * var subCat = $('#subCat').val();
	 */
	var daysFrom = $('#daysFrom').val();
	var daysTo = $('#daysTo').val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (scOrder == "Customer Order") {
		fieldFilters.fieldFilters["orderType"] = scOrder;
		if (storedc == "DC") {
			fieldFilters.fieldFilters["storeDcId"] = storeDcName;
		}
		if (storedc == "Store") {
			fieldFilters.fieldFilters["storeDcId"] = storeDcName;
		}
		if (storedc == "DC") {
			fieldFilters.fieldFilters["storeDcType"] = storedc;
		}
		if (storedc == "Store") {
			fieldFilters.fieldFilters["storeDcType"] = storedc;
		}
	}
	if (scOrder == "Stock Item") {
		fieldFilters.fieldFilters["orderType"] = scOrder;
		if (storedc == "DC") {
			fieldFilters.fieldFilters["storeDcType"] = storedc;
		}
		if (storedc == "DC") {
			fieldFilters.fieldFilters["storeDcId"] = storeDcName;
		}
		if (storedc == "Store") {
			fieldFilters.fieldFilters["storeDcType"] = storedc;
		}
		if (storedc == "Store") {
			fieldFilters.fieldFilters["storeDcId"] = storeDcName;
		}
	}
	if (daysFrom != "" && daysFrom != null) {
		fieldFilters.fieldFilters["fromDays"] = parseInt(daysFrom);
	}
	if (daysTo != "" && daysTo != null) {
		fieldFilters.fieldFilters["toDays"] = parseInt(daysTo);
	}

	if (zoneId != "" && zoneId != null) {
		fieldFilters.fieldFilters["zoneId"] = zoneId;
	}

	var artSegObj = $('#artSegObj').val();
	if (artSegObj == null || artSegObj == "") {
		var artSeg = "";
	} else {
		var artSeg = artSegObj.join(",");
	}
	
	var jewelCodeObj = $('#jewelCodeObj').val();
	if (jewelCodeObj == null || jewelCodeObj == "") {
		var jwCode = "";
	} else {
		var jwCode = jewelCodeObj.join(",");
	}
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendors = "";
	} else {
		var vendors = vendorCodeObj.join(",");
	}

	/*
	 * var jewelCodeObj = $('#jewelCodeObj').val(); if (jewelCodeObj == null ||
	 * jewelCodeObj == "") { var jewelCode = ""; } else { var jewelCode =
	 * jewelCodeObj.join(","); }
	 * 
	 * var mainCatObj = $('#mainCatObj').val(); if (mainCatObj == null ||
	 * mainCatObj == "") { var mainCat = ""; } else { var mainCat =
	 * mainCatObj.join(","); }
	 * 
	 * var subCatObj = $('#subCatObj').val(); if (subCatObj == null || subCatObj ==
	 * "") { var subCat = ""; } else { var subCat = subCatObj.join(","); }
	 */

	if (vendors != "" && vendors != null) {
		fieldFilters.fieldFilters["vendorId"] = vendors;
	}

	if (jwCode != "" && jwCode != null) {
		fieldFilters.fieldFilters["jewelTypeId"] = jwCode;
	}
	
	if (artSeg != "" && artSeg != null) {
		fieldFilters.fieldFilters["segId"] = artSeg;
	}

	if (consType == "CG") {
		fieldFilters.fieldFilters["CG"] = "1";
	}

	if (consType == "NCG") {
		fieldFilters.fieldFilters["NCG"] = "1";
	}
	
	
	/*
	 * if(consType=="CG,NCG"){ fieldFilters.fieldFilters["CGNCG"] = "1,1"; }
	 */
	/*
	 * if (jewelCode != "" && jewelCode != null) {
	 * fieldFilters.fieldFilters["jewelTypeId"] = jewelCode; }
	 * 
	 * if (mainCat != "" && mainCat != null) {
	 * fieldFilters.fieldFilters["catId"] = mainCat; }
	 * 
	 * if (subCat != "" && subCat != null) {
	 * fieldFilters.fieldFilters["subCatId"] = subCat; }
	 */

	return fieldFilters;
}

// API call for Ageing Analysis drop down
$.getJSON('/OrderExecution/api/v1/ageingAnalysisLOVs', function(data) {
	$('#scOrder').empty().append(
			'<option value="" selected>--Select--</option>');
	$('#storedc').empty().append(
			'<option value="" selected>--Select--</option>');

	$.each(data.payload.orderType, function(key, val) {
		$('#scOrder').append(
				'<option value="' + val.name + '">' + val.name + '</option>');
	});

	$.each(data.payload.toStoreOrDC, function(key, val) {
		$('#storedc').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
});

$("#scOrder").on("change",function() {
	var id = $("#scOrder").val();
		$.getJSON('/OrderExecution/api/v1/ageingAnalysisLOVs',function(data) {
					if (id == "Stock Item") {
						$("#consignmentType").show();
						var oType = data.payload.consignmentTypes;
						var o = '<select id="consTypeObj" name="consTypeObj" class="form-control" multiple="multiple">';
						$.each(oType, function(key, val) {
							o += '<option value="' + val.id
									+ '">' + val.name
									+ '</option>';
						});
						o += '</select>';
						$("#consType").html(o);
						$('#consTypeObj')
								.multiselect(
										{
											includeSelectAllOption : true,
											enableFiltering : false,
											maxHeight : 250,
											numberDisplayed : 1,
											buttonClass : 'col-md-12 form-control text-left'
										});
					} else {
						$("#consignmentType").hide();
					}
			});
	});

$("#storedc").on("change",function() {
	$('#storeDcName').empty().append('<option value="" selected>--Select--</option>');
		var id = $("#storedc").val();
			$.getJSON('/OrderExecution/api/v1/ageingAnalysisLOVs', function(data) {
				if (id == "Store") {
					$.each(data.payload.storeNames, function(key, val) {
						$('#storeDcName').append(
								'<option value="' + val.id + '">' + val.name
										+ '</option>');
					});
				} else {
					$.each(data.payload.dcNames, function(key, val) {
						$('#storeDcName').append(
								'<option value="' + val.id + '">' + val.name
										+ '</option>');
					});
				}
			});
		});


$("#storeDcName").on("change",function(){
	var params = {
			"fieldFilters" : {
				"dcorStore" : $("#storedc").val(),
				"ids" : $("#storeDcName").val()
			}
		}; 
	postJSON('/OrderExecution/api/v1/zoneLOV', JSON.stringify(params), function(data) {
		$('#zoneName').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeOrdDc, function(key, val) {
			$('#zoneName').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
    });
})

// On change of segment loading jewel type multiselect values
$('#artSeg').bind('change',function() {
	var ida = $("#artSegObj").val();
		if (ida == null) {
			$("#jewelDet").hide();
		} else {
			if (ida.length == 1) {
				$("#jewelDet").show();
					$.getJSON('/OrderExecution/api/v1/ageingAnalysisLOVs?criteria=jewelType&&segmentId='+ ida,function(data) {
						var g = '<select id="jewelCodeObj" class="form-control" multiple="multiple">';
							$.each(data.payload.jewelType,function(key,val) {
								g += '<option value="'
										+ val.id
										+ '">'
										+ val.description
										+ '</option>';
								});
								g += '</select>';
								$("#jewelCode").html(g);
								$('#jewelCodeObj').multiselect({
									includeSelectAllOption : true,
									enableFiltering : false,
									maxHeight : 250,
									numberDisplayed : 1,
									buttonClass : 'col-md-12 form-control text-left'
								});
							});
						} else {
							$("#jewelDet").hide();
						    $("#mainCatDet").hide();
						    $("#subCatDet").hide();
						    $("#aCode").hide();
						}
					}
				});

// On change of jewel type loading Main Category multiselect values
$('#jewelCode').bind('change',function() {
	var segId = $("#artSegObj").val();
	var jewelTypeId = $("#jewelCodeObj").val();
		if (jewelTypeId == null) {
			$("#mainCatDet").hide();
		} else {
			if (jewelTypeId.length == 1) {
				$("#mainCatDet").show();
					$.getJSON('/OrderExecution/api/v1/ageingAnalysisLOVs?criteria=mCategory&&segmentId='+ segId + '&&jewelTypeId='+ jewelTypeId,function(data) {
						var m = '<select id="mainCatObj" class="form-control" multiple="multiple">';
							$.each(data.payload.mainCatList,function(key,val) {
								m += '<option value="'
										+ val.id
										+ '">'
										+ val.description
										+ '</option>';
								});
								m += '</select>';
								$("#mainCat").html(m);
									$('#mainCatObj').multiselect(
										{
											includeSelectAllOption : true,
											enableFiltering : false,
											maxHeight : 250,
											numberDisplayed : 1,
											buttonClass : 'col-md-12 form-control text-left'
										});
									});
					} else {
						 $("#mainCatDet").hide();
						 $("#subCatDet").hide();
						 $("#aCode").hide();
						}
					}
		});

// On change of Main Category loading Sub Category multiselect values
$('#mainCat').bind('change',function() {
	var catId = $("#mainCatObj").val();
	var jewelTypeId = $("#jewelCodeObj").val();
		if (catId == null) {
			$("#subCatDet").hide();
		} else {
			if (catId.length == 1) {
				$("#subCatDet").show();
					$.getJSON('/OrderExecution/api/v1/ageingAnalysisLOVs?criteria=sCategory&&categoryId='+ catId + '&&jewelTypeId='+ jewelTypeId,function(data) {
						var s = '<select id="subCatObj" class="form-control" multiple="multiple">';
							$.each(data.payload.subCatList,function(key,val) {
								s += '<option value="'
										+ val.id
										+ '">'
										+ val.description
										+ '</option>';
							});
							s += '</select>';
							$("#subCat").html(s);
							$('#subCatObj').multiselect({
								includeSelectAllOption : true,
								enableFiltering : false,
								maxHeight : 250,
								numberDisplayed : 1,
								buttonClass : 'col-md-12 form-control text-left'
							});
						});
						} else {
							$("#subCatDet").hide();
						    $("#aCode").hide();
						}
					}
				});

// On change of Sub Category loading Article Code
$("#subCat").on("change",function() {
	var segId = $("#artSegObj").val();
	var segIds = segId.join(",");
	var subCatId = $("#subCatObj").val();
	if (subCatId == null) {
		$("#aCode").hide();
	} else {
		if (subCatId.length == 1) {
			$("#aCode").show();
				var jewelTypeId = $("#jewelCodeObj").val();
					$.getJSON('/OrderExecution/api/v1/ageingAnalysisLOVs?criteria=articleCode&&segmentId='+ segIds + '&&subCatId=' + subCatId + '&&jewelTypeId=' + jewelTypeId, function(data){
						$.each(data.payload.articleCode, function(key,
								value) {
							$("#artCode").val(value);
						});
					});
				}else{
					$("#aCode").hide();
				}
			}
		});

var onLoadAgeingAnalysis = function() {
	// GET JSON API CALL FOR LOV
	$.getJSON('/OrderExecution/api/v1/ageingAnalysisLOVs?criteria=vtype',function(data) {
		var vendor = data.payload.vCodeList;
		var v = '<select id="vendorCodeObj"  name="vendorCodeObj" class="form-control" multiple="multiple">';
		$.each(vendor, function(key, val) {
			v += '<option value="' + val.id + '">' + val.name
					+ '</option>';
		});
		v += '</select>';
		$("#vendors").html(v);
		$('#vendorCodeObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	});
}

onLoadAgeingAnalysis();

var onLoadAgeingAnalysisS = function() {

	// GET JSON API CALL FOR LOV

	$.getJSON('/OrderExecution/api/v1/ageingAnalysisLOVs',function(data) {
			var seg = data.payload.segments;
			var t = '<select id="artSegObj"  name="artSegObj" class="form-control" multiple="multiple">';
			$.each(seg, function(key, val) {
				t += '<option value="' + val.id + '">' + val.description
						+ '</option>';
			});
			t += '</select>';
			$("#artSeg").html(t);
			$('#artSegObj').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
	});
}
onLoadAgeingAnalysisS();

// Grid Started
var loadMasterGrid = function(dataFields,coloums, data, gridName, headerTitle,height,columnsheightVal){
	
	var source = { datafields : dataFields,	localdata : data };
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	$(gridName).jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight :columnsheightVal,
		theme: 'energyblue',
		columnsresize: true, 
        autoshowfiltericon: true,
		filterable: true,
		autoheight: false,
		altRows : false,
		pageable: true,
	    sortable: true,
		height: height,
		pagesize : 20,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			toolbar.empty();
			var container = $("<div style='margin: 5px; margin-bottom: 5px;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left"><b>'+ headerTitle +'</b></div>');	
		},
		columns : coloums
	});	
}

// Clear grid and reset input and Drop down value
$('#ClearAll').on('click', function() {
	$('#jewelCodeObj').multiselect("clearSelection");
	$('#mainCatObj').multiselect("clearSelection");
	$('#subCatObj').multiselect("clearSelection");
	$('#articleCodeObj').multiselect("clearSelection");
	$('#vendorCodeObj').multiselect("clearSelection");
	$('#artSegObj').multiselect("clearSelection");
	$('#consTypeObj').multiselect("clearSelection");

	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

var datafieldsStone = [ 
	{name : 'stoneCode',type : 'string'}, 
	{name : 'subCategoryDesc',type : 'string'}, 
	{name : 'pieces',type : 'long'}, 
	{name : 'weight',type : 'double'}, 
	{name : 'vendorPrice',type : 'float'}, 
	{name : 'vendorWeight',type : 'float'}, 
	{name : 'custWeight',type : 'float'}, 
	{name : 'custPieces',type : 'int'}, 
	{name : 'custPrice',type : 'float'}, 
	{name : 'compPrice',type : 'float'}, 
	{name : 'compPieces',type : 'int'}, 
	{name : 'compWeight',type : 'float'}, 
	{name : 'stoneCost',type : 'string'}
];

var datafieldsAcc = [
	{name : 'accCode',type : 'string'}, 
	{name : 'subCategoryDesc',type : 'string'}, 
	{name : 'pieces',type : 'long'}, 
	{name : 'weight',type : 'double'},
	{name : 'accCost',type : 'double'}, 
	{name : 'vendorPieces',type : 'int'}, 
	{name : 'vendorPrice',type : 'float'}, 
	{name : 'vendorWeight',type : 'float'}, 
	{name : 'custWeight',type : 'float'}, 
	{name : 'custPieces',type : 'int'}, 
	{name : 'custPrice',type : 'float'}, 
	{name : 'compPrice',type : 'float'}, 
	{name : 'compPieces',type : 'int'}, 
	{name : 'compWeight',type : 'float'}
];

var columnsStone = [ 
	{text : 'Stone Code',datafield : 'stoneCode',width : '20%',cellsalign : 'center',align : 'center', editable: false}, 
	{text : 'Stone Sub Cat.',datafield : 'subCategoryDesc',width : '20%',cellsalign : 'center',align : 'center', editable: false}, 
	{text : 'Stone Pcs',datafield : 'pieces',width : '20%',cellsalign : 'center',align : 'center', editable: false}, 
	{text : 'Stone Wt.',datafield : 'weight',width : '20%',cellsformat : 'd3',cellsalign : 'right',align : 'center', editable: false},
	{text : 'Stone Cost',datafield : 'stoneCost',width : '20%',cellsformat : 'd2',cellsalign : 'right',align : 'center', editable: false}
];

var columnsAcc = [ 
	{text : 'Acc Code',datafield : 'accCode',width : '20%',cellsalign : 'center',align : 'center', editable: false}, 
	{text : 'Acc Sub Cat.',datafield : 'subCategoryDesc',width : '20%',cellsalign : 'center',align : 'center', editable: false}, 
	{text : 'Acc PCS',datafield : 'pieces',width : '20%',cellsalign : 'center',align : 'center', editable: false}, 
	{text : 'Acc Wt.',datafield : 'weight',width : '20%',cellsformat : 'd3',cellsalign : 'right',align : 'center', editable: false}, 
	{text : 'Acc Cost',datafield : 'accCost',width : '20%',cellsformat : 'd2',cellsalign : 'right',align : 'center', editable: false} 
];

var viewStoneAccDetails = function(row){
	var stonesRows = $("#jqxgrid").jqxGrid('getcellvalue', row, 'stones');
	var accRows = $("#jqxgrid").jqxGrid('getcellvalue', row, 'accessories');
	var orderType = $("#jqxgrid").jqxGrid('getcellvalue', row, 'orderType');
	
	var stoneData = [];
	var accData = [];
	
	
		var gridNameStone  = "#jqxgridStone";
		var gridNameAcc  = "#jqxgridAcc";
		
		var headerTitleStone = "Stone Details";
		var headerTitleAcc = "Accessory Details";
		
		var heightStone = "220px";
		var heightAcc = "220px";
		
		var columnsheightVal = "35px";
		
		
			if(stonesRows != null){			 
		
				$.each(stonesRows, function(k,v){
					if(orderType == "Customer Order"){
						if(v.suppliedBy.id == "V"){
							var stoneObj = {"pieces" : v.vendorPieces,"stoneCost" : v.vendorPrice,"weight" : v.vendorWeight,"stoneCode" : v.stone.stoneCode,"subCategoryDesc" : v.subCategoryDesc}			
						}
						if(v.suppliedBy.id == "CU"){
							var stoneObj = {"pieces" : v.custPieces,"stoneCost" : v.custPrice,"weight" : v.custWeight,"stoneCode" : v.stone.stoneCode,"subCategoryDesc" : v.subCategoryDesc}			
						}
						if(v.suppliedBy.id == "CO"){
							var stoneObj = {"pieces" : v.compPieces,"stoneCost" : v.compPrice,"weight" : v.compWeight,"stoneCode" : v.stone.stoneCode,"subCategoryDesc" : v.subCategoryDesc}			
						}
					}else{
						var stoneObj = {"pieces" : v.pieces,"stoneCost" : v.costPrice,"weight" : v.weight,"stoneCode" : v.code.id,"subCategoryDesc" : v.subCategoryDesc}			
					}
						
					stoneData.push(stoneObj);		
				});
			}else{
				stoneData = [];
			}
			
			if(accRows != null){
				$.each(accRows, function(k,v){
					if(orderType == "Customer Order"){
						if(v.suppliedBy.id == "V"){
							var accObj = {"pieces" : v.vendorPieces,"accCost" : v.vendorPrice,"weight" : v.vendorWeight,"accCode" : v.code.name,"subCategoryDesc" : v.subCategoryDesc}			
						}
						if(v.suppliedBy.id == "CU"){
							var accObj = {"pieces" : v.custPieces,"accCost" : v.custPrice,"weight" : v.custWeight,"accCode" : v.code.name,"subCategoryDesc" : v.subCategoryDesc}			
						}
						if(v.suppliedBy.id == "CO"){
							var accObj = {"pieces" : v.compPieces,"accCost" : v.compPrice,"weight" : v.compWeight,"accCode" : v.code.name,"subCategoryDesc" : v.subCategoryDesc}			
						}
					}else{
						var accObj = {"pieces" : v.pieces,"accCost" : v.costPrice,"weight" : v.weight,"accCode" : v.accessoryCode,"subCategoryDesc" : v.subCategoryDesc}			
					}
					accData.push(accObj);
				});
				
			}else{
				accData = [];
			}
	
		$(gridNameStone).jqxGrid('clear');
		$(gridNameAcc).jqxGrid('clear');
		
		loadMasterGrid(datafieldsStone,columnsStone, stoneData, gridNameStone, headerTitleStone, heightStone,columnsheightVal);
		loadMasterGrid(datafieldsAcc,columnsAcc, accData, gridNameAcc, headerTitleAcc, heightAcc,columnsheightVal);
	
}

// View Stone Acc Details
var viewStoneAccDet = function(row, column, value){
	var stonesRows = $("#jqxgrid").jqxGrid('getcellvalue', row, 'stones');
	var accRows = $("#jqxgrid").jqxGrid('getcellvalue', row, 'accessories');
	
	if(stonesRows == null && accRows == null){
		return '<div class="text-center"><button  disabled class="btn btn-sm btn-primary" data-toggle="modal" type="button" /><span class="fa fa-eye"></span> </button></div>';
	}else{
		return '<div class="text-center"><button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewStoneAccDetModal" type="button" onclick="viewStoneAccDetails('+ row +');"/><span class="fa fa-eye"></span> </button></div>';
	}
	
}


var datafields = [ 
	{'name' : 'storeName','type' : 'string','map' : 'store>name'}, 
	{'name' : 'dcName','type' : 'string','map' : 'dc>dcname'}, 

	{'name' : 'zoneName','type' : 'String','map' : 'createdZone>description'}, 
	{'name' : 'orderType','type' : 'string','map' : 'orderType'}, 
	{'name' : 'orderIdSrlNo','type' : 'long'}, 
	{'name' : 'weightRange','type' : 'string','map' : 'wtRange'}, 
	{'name' : 'size','type' : 'long'}, 
	{'name' : 'orderItemStatusDate','type' : 'date'}, 
	{'name' : 'noOfDays','type' : 'long'}, 
	{'name' : 'metalSeg','type' : 'string','map' : 'metalSegment>description'}, 
	{'name' : 'articleSeg','type' : 'string','map' : 'segment>description'}, 
	{'name' : 'jewelCode','type' : 'string','map' : 'jewelType>code'}, 
	{'name' : 'subCat','type' : 'string','map' : 'articleMaster>subCategory'}, 
	{'name' : 'artCode','type' : 'string','map' : 'articleMaster>articleCode'}, 
	{'name' : 'vCode','type' : 'String','map' : 'vendor>vendorName'}, 
	{'name' : 'finishedPieces','type' : 'long','map'  : 'finishedPieces'}, 
	{'name' : 'finishedGrossWeight','type' : 'double'}, 
	{'name' : 'finishedNetWeight','type' : 'double'}, 
	{'name' : 'costPrice','type' : 'long'}, 
	{'name' : 'sellingPrice','type' : 'long'}, 
	{'name' : 'costMc','type' : 'float','map'  :'costMCTotalCost'},
	{'name' : 'costWastage','type' : 'float','map' : 'costWastageWT'}, 
	{'name' : 'createdBy','type' : 'String','map' : 'employee>name'}, 
	{'name' : 'stones','type' : 'array'}, 
	{'name' : 'accessories','type' : 'array'}, 
	{'name' : 'valueOnQC','type' : 'float'}, 
	{'name' : 'indicativePrice','type' : 'float'}, 
	{'name':"gpPerc",'type':'float'},
	{'name' : 'actionId','type' : 'float', 'map' : 'id'}
];

var datafields1 = [ 
	{'name' : 'storeName','type' : 'string','map' : 'store>name'}, 
	{'name' : 'dcName','type' : 'string','map' : 'dc>dcname'}, 

	{'name' : 'zoneName','type' : 'String','map' : 'currentZone>description'}, 
	{'name' : 'orderType','type' : 'string','map' : 'orderType'}, 
	{'name' : 'orderIdSrlNo','type' : 'int','map':'id'}, 
	{'name' : 'weightRange','type' : 'string','map' : 'wtRange'}, 
	{'name' : 'size','type' : 'long','map':'sizeLength'}, 
	{'name' : 'orderItemStatusDate','type' : 'date','map':'createdDate'}, 
	{'name' : 'noOfDays','type' : 'int'}, 
	{'name' : 'metalSeg','type' : 'string','map' : 'segId>description'}, 
	{'name' : 'articleSeg','type' : 'string','map' : 'metalId>description'}, 
	{'name' : 'jewelCode','type' : 'string','map' : 'jewelType>code'}, 
	{'name' : 'subCat','type' : 'string','map' : 'articleMasterDTO>subCategory'}, 
	{'name' : 'artCode','type' : 'string','map' : 'articleMasterDTO>articleCode'}, 
	{'name' : 'vCode','type' : 'String','map' : 'vendor>name'}, 
	{'name' : 'finishedPieces','type' : 'long','map'  : 'finishedPieces'}, 
	{'name' : 'finishedGrossWeight','type' : 'double','map':'grossWeight'}, 
	{'name' : 'finishedNetWeight','type' : 'double'}, 
	{'name' : 'costPrice','type' : 'long'}, 
	{'name' : 'sellingPrice','type' : 'long'}, 
	{'name' : 'costMc','type' : 'float','map'  :'costMCTotalCost'},
	{'name' : 'costWastage','type' : 'float','map' : 'costWastageWt'}, 
	{'name' : 'createdBy','type' : 'String','map' : 'createdName'}, 
	{'name' : 'stones','type' : 'array'}, 
	{'name' : 'accessories','type' : 'array'}, 
	{'name' : 'valueOnQC','type' : 'float'}, 
	{'name' : 'indicativePrice','type' : 'float'}, 
	{'name' : 'actionId','type' : 'float', 'map' : 'id'},
	{'name':"gpPerc",'type':'float'}
];
 
var columns = [ 
	{'text' : 'vi org','datafield' : 'dcName','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},

	{'text' : 'Store/DC Name','datafield' : 'storeName','width' : '4%',editable : false,align : 'center',sortable : false,
		  cellsrenderer: function(row, column, value){
			  var storeDcName;
				 var dcName = $("#jqxgrid").jqxGrid('getcellvalue',row,'dcName');
				 var storeName = $("#jqxgrid").jqxGrid('getcellvalue',row,'storeName');
				 	console.log(dcName);
				 	console.log(storeName);
				 	
				 	if(storeName == null){
				 		storeDcName = dcName;
				 	}else{
				 		storeDcName = storeName
				 	}
	      		return "<div align='center'style='margin-top:8px;'>"+ storeDcName +"</div>";
	      	} 
	},
	{'text' : 'Zone Name','datafield' : 'zoneName','width' : '4%',editable : false,cellsalign : 'center',align : 'center',sortable : false}, 
	{'text' : 'Stock/Cust Order','datafield' : 'orderType','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Stock/OP No-Sl No.','datafield' : 'orderIdSrlNo','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Wt Range','datafield' : 'weightRange','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : true}, 
	{'text' : 'Size/Length','datafield' : 'size','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
	{'text' : 'GR Entry Date','datafield' : 'orderItemStatusDate','width' : '4%',cellsalign : 'center',align : 'center','cellsformat' : 'dd/MM/yyyy',editable : false,sortable : false}, 
	{'text' : 'No Of Days At Company','datafield' : 'noOfDays', autoshowfiltericon: false,'width' : '4%',cellsalign : 'center',filterable:false,align : 'center',editable : false,sortable:false}, 
	{'text' : 'Metal Seg','datafield' : 'articleSeg','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Article Seg','datafield' : 'metalSeg','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 

	{'text' : 'Jewel Code','datafield' : 'jewelCode','width' : '4%',cellsalign : 'center',align : 'center',	editable : false,sortable : false}, 
	{'text' : 'Sub Cat.','datafield' : 'subCat','width' : '4%',cellsalign : 'left',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Article Code','datafield' : 'artCode','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Vendor Code','datafield' : 'vCode','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'PCS','datafield' : 'finishedPieces','width' : '3%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Gross Wt.','datafield' : 'finishedGrossWeight','width' : '4%',cellsalign : 'right',cellsformat : 'd3',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Net Wt.','datafield' : 'finishedNetWeight','width' : '4%',cellsformat : 'd3',cellsalign : 'right',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Cost MC','datafield' : 'costMc','width' : '4%',cellsformat : 'd2',cellsalign : 'right',align : 'center',editable : false,sortable : false},
	{'text' : 'Cost Wastage','datafield' : 'costWastage','width' : '4%',cellsformat : 'd3',cellsalign : 'right',align : 'center',editable : false,sortable : false},
	{'text' : 'Line Item Cost','datafield' : 'valueOnQC','width' : '5%',cellsalign : 'right',align : 'center',cellsformat : 'd2',editable : false,sortable : false}, 
	{'text' : 'Present Line Item SP','datafield' : 'indicativePrice','width' : '6%',cellsalign : 'right',align : 'center',cellsformat : 'd2',editable : false,sortable : false}, 
	{'text' : 'GP %','datafield' : 'gpPerc','width' : '7%',cellsalign : 'center',align : 'center',editable : false,sortable : true},

	{'text' : 'Order/Stock GR Entered By','datafield' : 'createdBy','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
	{'text' : '','datafield' : 'actionId','width' : '3%',cellsalign : 'center',align : 'center',editable : false,cellsrenderer: viewStoneAccDet} 
];

var columns1 = [ 
	{'text' : 'vi org','datafield' : 'dcName','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},

	{'text' : 'Store/DC Name','datafield' : 'storeName','width' : '4%',editable : false,align : 'center',sortable : false,
		  cellsrenderer: function(row, column, value){
			  var storeDcName;
				 var dcName = $("#jqxgrid").jqxGrid('getcellvalue',row,'dcName');
				 var storeName = $("#jqxgrid").jqxGrid('getcellvalue',row,'storeName');
				 	console.log(dcName);
				 	console.log(storeName);
				 	
				 	if(storeName == null){
				 		storeDcName = dcName;
				 	}else{
				 		storeDcName = storeName
				 	}
	      		return "<div align='center'style='margin-top:8px;'>"+ storeDcName +"</div>";
	      	} 
	},
	{'text' : 'Zone Name','datafield' : 'zoneName','width' : '4%',editable : false,cellsalign : 'center',align : 'center',sortable : false}, 
	{'text' : 'Stock/Cust Order','datafield' : 'orderType','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Stock/OP No-Sl No.','datafield' : 'orderIdSrlNo','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Wt Range','datafield' : 'weightRange','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : true}, 
	{'text' : 'Size/Length','datafield' : 'size','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
	{'text' : 'GR Entry Date','datafield' : 'orderItemStatusDate','width' : '4%',cellsalign : 'center',align : 'center','cellsformat' : 'dd/MM/yyyy',editable : false,sortable : false}, 
	{'text' : 'No Of Days At Company','datafield' : 'noOfDays', autoshowfiltericon: false,'width' : '4%',cellsalign : 'center',filterable:false,align : 'center',editable : false,sortable:false}, 
	{'text' : 'Metal Seg','datafield' : 'metalSeg','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Article Seg','datafield' : 'articleSeg','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Jewel Code','datafield' : 'jewelCode','width' : '4%',cellsalign : 'center',align : 'center',	editable : false,sortable : false}, 
	{'text' : 'Sub Cat.','datafield' : 'subCat','width' : '4%',cellsalign : 'left',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Article Code','datafield' : 'artCode','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Vendor Code','datafield' : 'vCode','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'PCS','datafield' : 'finishedPieces','width' : '3%',cellsalign : 'center',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Gross Wt.','datafield' : 'finishedGrossWeight','width' : '4%',cellsalign : 'right',cellsformat : 'd3',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Net Wt.','datafield' : 'finishedNetWeight','width' : '4%',cellsformat : 'd3',cellsalign : 'right',align : 'center',editable : false,sortable : false}, 
	{'text' : 'Cost MC','datafield' : 'costMc','width' : '4%',cellsformat : 'd2',cellsalign : 'right',align : 'center',editable : false,sortable : false},
	{'text' : 'Cost Wastage','datafield' : 'costWastage','width' : '4%',cellsformat : 'd3',cellsalign : 'right',align : 'center',editable : false,sortable : false},
	{'text' : 'Line Item Cost','datafield' : 'valueOnQC','width' : '5%',cellsalign : 'right',align : 'center',cellsformat : 'd2',editable : false,sortable : false}, 
	{'text' : 'Present Line Item SP','datafield' : 'indicativePrice','width' : '6%',cellsalign : 'right',align : 'center',cellsformat : 'd2',editable : false,sortable : false}, 

	{'text' : 'Order/Stock GR Entered By','datafield' : 'createdBy','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
	{'text' : '','datafield' : 'actionId','width' : '3%',cellsalign : 'center',align : 'center',editable : false,cellsrenderer: viewStoneAccDet} 
];

var dataFld ;
var response = [];
var daysCnt = 0;
$("#jqxgrid").on('columnclick', function (event){
	console.log(event.args.datafield);
	console.log(event);
	dataFld = event.args.datafield;
	console.log(daysCnt);
	console.log(dataFld);

	response.sort(function(a,b){
		if(dataFld == "noOfDays"){
			daysCnt = daysCnt + 1;
			console.log(daysCnt);
			/*if(daysCnt == true){
				return parseInt(b.noOfDays)-parseInt(a.noOfDays);
				daysCnt = !daysCnt;
			}if(daysCnt == false){*/
				return parseInt(a.noOfDays)-parseInt(b.noOfDays);
				/*daysCnt = !daysCnt;
			}*/
		}
		if(dataFld == "orderIdSrlNo"){
			return parseInt(a.id)-parseInt(b.id);
		}
		if(dataFld == "finishedGrossWeight"){
			return parseFloat(a.finishedGrossWeight)-parseFloat(b.finishedGrossWeight);
		}
		if(dataFld == "finishedNetWeight"){
			return parseFloat(a.finishedNetWeight)-parseFloat(b.finishedNetWeight);
		}
		
	});
	var orderType = $('#scOrder').val();
	var height = "290px";
	var columnsheightVal = "80px";
	var gridName = "#jqxgrid";
	
	if(orderType == "Customer Order"){
		var headerTitle = "Ageing Analysis - Customer Order";
		loadMasterGrid(datafields,columns, response, gridName, headerTitle, height,columnsheightVal);
		$("#jqxgrid").show();
	}
	if(orderType == "Stock Order"){
		var headerTitle = "Ageing Analysis - Stock Order";
		loadMasterGrid(datafields1,columns, response, gridName, headerTitle, height,columnsheightVal);
		$("#jqxgrid").show();
	}
	
});


$('#stockFgCustomer').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"scOrder" : { required : true},
		"storedc" : { required : true},
		"storeDcName" : { required : true},
		"artSegObj" : { required : true},
		"daysFrom" : { required : true,digits : true},
		"daysTo" : { required : true,digits : true}
	},
	messages : {
		'daysFrom' : {required : "Please Enter From Days!",	digits : "Your From Days Must Be  Numbers!"},
		'daysTo' : {required : "Please Enter To Days!",digits : "Your To Days Must Be  Numbers!"}
	},
	errorPlacement : function(error, element) {
		if (element.context.name == "artSegObj") {
			error.insertAfter(element.parent());
		} else {
			error.insertAfter(element);
		}
	},
	submitHandler : function(form) {
		var orderType = $('#scOrder').val();
		var dataArr = [];
		
		postJSON('/OrderExecution/api/v1/ageingAnalysisSearch', JSON.stringify(ageingAnalysisFieldFilters()), function(data) {
			
			if(data.resCode == "1" && typeof data != "undefined"){
				dataArr = data.payload.list;
				response = data.payload.list;
				/*dataArr.sort(function(a, b){
					return parseInt(a.noOfDays)-parseInt(b.noOfDays);
				});*/
				
				$.each(dataArr,function(k,v){
					if(v.indicativePrice != null && v.valueOnQC != null ){
						v.gpPerc = parseFloat(((v.indicativePrice - v.valueOnQC)/v.indicativePrice)*100).toFixed(2);
					}else{
						v.gpPerc = parseFloat(0).toFixed(2);
					}
				});
				
				var height = "290px";
				var columnsheightVal = "80px";
				var gridName = "#jqxgrid";
				if (orderType == "Customer Order") {
					var minval = minMaxValues();
					var headerTitle = "Ageing Analysis - Customer Order";
					if (minval != false) {
						console.log(dataArr);
						$(gridName).jqxGrid('clear');
						loadMasterGrid(datafields,columns1, dataArr, gridName, headerTitle, height,columnsheightVal);
						$("#jqxgrid").show();
						return false;
					}
				} else if(orderType == "Stock Item"){
					var minval = minMaxValues();
					var headerTitle = "Ageing Analysis - Stock Item";
					if (minval != false) {
						$(gridName).jqxGrid('clear');
						loadMasterGrid(datafields1,columns, dataArr, gridName, headerTitle, height,columnsheightVal);
						$("#jqxgrid").show();
						return false;
					}
		
				}
			}
		});

	}
});

function minMaxValues() {
	var daysFrom = parseInt($("#daysFrom").val());
	var daysTo = parseInt($("#daysTo").val());
	if ((daysFrom != '') && (daysTo != '') && (daysTo < daysFrom)) {
		$.growl.error({
			message : "To Days should be greater than or equal to From Days",
			duration : 1000
		});
		return false;
	}
}

// Print Functionality to be done by Venkat
// #######################################
$("#printAG").on('click', function() {
	var orderType = $('#scOrder').val();
	var fromZoneId = $('#zoneId').val();
	var storeOrDc = $('#storedc').val();
	if (orderType == "Customer") {
		if (storeOrDc == "Store") {
			var storeOrDcId = $('#storeDcName').val();
			var CuststoreId = storeOrDcId
		} else if (storeOrDc == "DC") {
			var storeOrDcId = $('#storeDcName').val();
			var CustDCId = storeOrDcId
		}
	} else if (orderType == "Stock") {
		var storeOrDcId = $('#storeDcName').val();
		var stockStdcId = storeOrDcId;
	}

	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendors = "";
	} else {
		var vendors = vendorCodeObj.join(",");
	}
	var daysFrom = $('#daysFrom').val();
	var daysTo = $('#daysTo').val();
	var artSegObj = $('#artSegObj').val();
	if (artSegObj == null || artSegObj == "") {
		var artSeg = "";
	} else {
		var artSeg = artSegObj.join(",");
	}

	var jewelCodeObj = $('#jewelCodeObj').val();
	if (jewelCodeObj == null || jewelCodeObj == "") {
		var jewelCode = "";
	} else {
		var jewelCode = jewelCodeObj.join(",");
	}

	var consTypeObj = $('#consTypeObj').val();
	if (consTypeObj == null || consTypeObj == "") {
		var consType = "";
	} else {
		var consType = consTypeObj.join(",");
	}

	fieldFilters = {
		"fieldFilters" : {
			"StockOrConsignment" : orderType,
			"JtypeId" : jewelCode,
			"NoOfDaysTo" : daysTo,
			"NoOfDaysFrom" : daysFrom,
			"AsegmentId" : artSeg,
			"dcId" : CustDCId,
			"storeId" : CuststoreId,
			"CurrentZoneId" : fromZoneId,
			"vendorId" : vendors,
			"StoreOrDCId" : stockStdcId,
			"mode" : "pdf",
			"reportName" : "RPT_Ageing_Analysis"
		}
	}
	$.ajax({
		url : 'jasperReport',
		type : 'post',
		data : fieldFilters,
		contentType : "application/x-www-form-urlencoded",
		xhrFields : {
			responseType : "arraybuffer"
		},
		success : function(data) {
			console.log(data);
			if (navigator.msSaveBlob) {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				navigator.msSaveBlob(file, 'RPT_Ageing_Analysis.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});

});

var NVL = function(source, replaceMentValue){
	if(typeof source != "undefined" && source != null && source != ""){
		return source;
	}
	else return replaceMentValue;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var stoneAccOnLoadFunc = function(){
	var vCode = '<select id="vendorCodeObjS" class="form-control" multiple="multiple"></select>';
	$("#vendorCode").html(vCode);
	$('#vendorCodeObjS').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	
	var sCat = '<select id="saCatObj" class="form-control" multiple="multiple"></select>';
	$("#saCat").html(sCat);
	$('#saCatObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var subCat = '<select id="saSubCatObj" class="form-control" multiple="multiple"></select>';
	$("#saSubCat").html(subCat);
	$('#saSubCatObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var saCode = '<select id="saArtCodeObj" class="form-control" multiple="multiple"></select>';
	$("#saArtCode").html(saCode);
	$('#saArtCodeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	$.getJSON('/OrderExecution/api/v1/ageingAnalysisLAOnloadLov', function(data) {
		$('#looseSA').empty().append('<option value="" selected>--Select--</option>');
		$('#storeOrDc').empty().append('<option value="" selected>--Select--</option>');

		$.each(data.payload.LooseStoneAccessoryType, function(key, val) {
			$('#looseSA').append('<option value="' + val.id + '">' + val.name + '</option>');
		});

		$.each(data.payload.storeOrDCType, function(key, val) {
			$('#storeOrDc').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		
		
	});
}

$("#looseSA").on('change',function(){
	if($("#looseSA").val() != ""){
		$('#stoneAccSegment').empty().append('<option value="" selected>--Select--</option>');
		var params = {"fieldFilters":{"type": $("#looseSA").val()}}
		postJSON('/OrderExecution/api/v1/fetchAgeingAnalysisLA', JSON.stringify(params), function(data) {
			if(data.resCode == 1){
				$.each(data.payload.segements, function(key, val) {
					$('#stoneAccSegment').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
				
				var v = '<select id="vendorCodeObjS"  name="vendorCodeObjS" class="form-control" multiple="multiple">';
				$.each(data.payload.vendorList, function(key, val) {
					v += '<option value="' + val.id + '">' + val.vendorName + '</option>'; 
				});
					
				v += '</select>';
					
				$("#vendorCode").html(v);
					
				$("#vendorCodeObjS").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
	}

});


$("#storeOrDc").on('change',function(){
	$('#storeDcNameS').empty().append('<option value="" selected>--Select--</option>');
	$('#zoneNameS').empty().append('<option value="" selected>--Select--</option>');
	
	var params = {"fieldFilters":{"type": $("#looseSA").val(),"storeOrDCType":$("#storeOrDc").val()}}
	var storeDcList = [];
	var zoneNameList = [];
	postJSON('/OrderExecution/api/v1/fetchAgeingAnalysisLA', JSON.stringify(params), function(data) {
		if(data.resCode == 1){
			if($("#storeOrDc").val() == "DC"){
				storeDcList = data.payload.allDc;
				zoneNameList = data.payload.allZoneForDc;
			}else{
				storeDcList = data.payload.allStores;
				zoneNameList = data.payload.allZoneForStores;
			}
			
			$.each(storeDcList, function(key, val) {
				$('#storeDcNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
			
			$.each(zoneNameList, function(key, val) {
				$('#zoneNameS').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
		}
	});
});

$("#stoneAccSegment").on('change',function(){
	if($("#looseSA").val() == "LSS"){
		$.getJSON('/OrderExecution/api/v1/getStoneCategoryByStone?segmentId='+$("#stoneAccSegment").val(), function(data) {
			if(data.resCode == 1){
				var sc = '<select id="saCatObj"  name="saCatObj" class="form-control" multiple="multiple">';
				$.each(data.payload.stoneCats, function(key, val) {
					sc += '<option value="' + val.id + '">' + val.description + '</option>'; 
				});
					
				sc += '</select>';
					
				$("#saCat").html(sc);
					
				$("#saCatObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
	}else{
		var params = {"fieldFilters":{"type": "AS", "docType":"accCats"}}
		
		postJSON('/OrderExecution/api/v1/fetchAgeingAnalysisLA', JSON.stringify(params), function(data) {
			if(data.resCode == 1){
				var sc = '<select id="saCatObj"  name="saCatObj" class="form-control" multiple="multiple">';
				$.each(data.payload.accCats, function(key, val) {
					sc += '<option value="' + val.id + '">' + val.description + '</option>'; 
				});
					
				sc += '</select>';
					
				$("#saCat").html(sc);
					
				$("#saCatObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
	}
	
	var artParams = {"fieldFilters":{"type": $("#looseSA").val(), "segId":$("#stoneAccSegment").val(), "docType":"articleCode"}}
	postJSON('/OrderExecution/api/v1/fetchAgeingAnalysisLA', JSON.stringify(artParams), function(data) {
		if(data.resCode == 1){
			var sacode = '<select id="saArtCodeObj"  name="saArtCodeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.articleCode, function(key, val) {
				sacode += '<option value="' + val.name + '">' + val.name + '</option>'; 
			});
				
			sacode += '</select>';
				
			$("#saArtCode").html(sacode);
				
			$("#saArtCodeObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
	});
});

$("#saCat").on('change',function(){
		var saCatObj = $("#saCatObj").val();
		saCatObj = saCatObj.join(',');
		
		var params = { "fieldFilters":{ "type":$("#looseSA").val(), 
							"docType": ($("#looseSA").val() == "LSS") ? "stoneSubCategory" : "accSubCats" ,
							"mCategory":saCatObj.toString()}
					 }
		
		postJSON('/OrderExecution/api/v1/fetchAgeingAnalysisLA',JSON.stringify(params),function(response) {
			if(response.resCode == "1"){
				var s = '<select id="saSubCatObj"  name="saSubCatObj" class="form-control" multiple="multiple">';
				$.each(response.payload.subCatList, function(key, val) {
					s += '<option value="' + val.id + '">' + val.description + '</option>'; 
				});
					
				s += '</select>';
					
				$("#saSubCat").html(s);
					
				$("#saSubCatObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
	
});

// Field Filters
var stoneAccFieldFilters = function() {
	var looseSA = $('#looseSA').val();
	var storeOrDc = $('#storeOrDc').val();
	var storeDcNameS = $('#storeDcNameS').val();
	var stoneAccSegment = $('#stoneAccSegment').val();
	var zoneNameS = $('#zoneNameS').val();
	var noDaysFrom = $('#noDaysFrom').val();
	var noDaysTo = $('#noDaysTo').val();
	console.log($('#saArtCodeObj').val());

	fieldFilters = {
		"fieldFilters" : {}
	};
	if (looseSA != "" && looseSA != null) {
		fieldFilters.fieldFilters["type"] = looseSA;
	}
	
	if (storeOrDc != "" && storeOrDc != null) {
		fieldFilters.fieldFilters["storeOrDcType"] = storeOrDc;
	}
	if (storeDcNameS != "" && storeDcNameS != null) {
		fieldFilters.fieldFilters["storeOrDcId"] = storeDcNameS;
	}
	if (zoneNameS != "" && zoneNameS != null) {
		fieldFilters.fieldFilters["zoneId"] = zoneNameS;
	}
	if (stoneAccSegment != "" && stoneAccSegment != null) {
		fieldFilters.fieldFilters["segmentId"] = stoneAccSegment;
	}
	if (noDaysFrom != "" && noDaysFrom != null) {
		fieldFilters.fieldFilters["fromDays"] = noDaysFrom;
	}
	if (noDaysTo != "" && noDaysTo != null) {
		fieldFilters.fieldFilters["toDays"] = noDaysTo;
	}
	
	var saCatObj = $('#saCatObj').val();
	if (saCatObj == null || saCatObj == "") {
		var sCat = "";
	} else {
		var sCat = saCatObj.join(",");
	}
	if (sCat != "" && sCat != null) {
		fieldFilters.fieldFilters["categoryId"] = sCat;
	}
	
	var saSubCatObj = $('#saSubCatObj').val();
	if (saSubCatObj == null || saSubCatObj == "") {
		var saSubCat = "";
	} else {
		var saSubCat = saSubCatObj.join(",");
	}
	if (saSubCat != "" && saSubCat != null) {
		fieldFilters.fieldFilters["subcategoryId"] = saSubCat;
	}
	
	var saArtCodeObj = $('#saArtCodeObj').val();
	if (saArtCodeObj == null || saArtCodeObj == "") {
		var saArtCode = "";
	} else {
		var saArtCode = saArtCodeObj.join(",");
	}
	if (saArtCode != "" && saArtCode != null) {
		fieldFilters.fieldFilters["articleCodes"] = saArtCode;
	}
	
	var vendorCodeObjS = $('#vendorCodeObjS').val();
	if (vendorCodeObjS == null || vendorCodeObjS == "") {
		var vendCode = "";
	} else {
		var vendCode = vendorCodeObjS.join(",");
	}
	if (vendCode != "" && vendCode != null) {
		fieldFilters.fieldFilters["vendorId"] = vendCode;
	}
	
	fieldFilters.fieldFilters["docType"] = "search";
	
	return fieldFilters;
}

$("#searchSA").on('click',function(){
	if($("#looseSA").val() == ""){
		$.growl.error({
			message : "Please Select Loose Stone/Accessory !!!",
			duration : 10000,
			title  : 'Error'
		});
		return false;
	}else{
		if($("#looseSA").val() == "LSS"){
			stoneSearchGrid();
			$("#jqxgrid").show();
			return ;
		}else{
			accessorySearchGrid();
			$("#jqxgrid").show();
		}
	}
	
});

function stoneSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
		  commit(true);
	}
	var datafields = [
		{'name' : 'storeOrDcName','type' : 'string','map':'storeOrDcName'},
		{'name' : 'zoneName','type' : 'string','map':'zoneName'},
		{'name' : 'stoneStockNo','type' : 'long','map':'id'},
		{'name' : 'vendCode','type' : 'string','map' : 'vendor>vendorName'},
		{'name' : 'igrDate','type' : 'string','map':'grEntryDate'}, 
		{'name' : 'noOfDays','type' : 'long','map' : 'noOfDays'},
		{'name' : 'stoneAccSeg','type' : 'string','map' : 'segment>description'},
		{'name' : 'stoneAccCat','type' : 'string','map' : 'mainCategory'},
		{'name' : 'shape','type' : 'string','map' : 'shape'},
		{'name' : 'subCat','type' : 'string','map' : 'subCategory'},
		{'name' : 'sCode','type' : 'string','map' : 'stoneAccCode'},
		{'name' : 'clarity','type' : 'string','map' : 'clarity'},
		{'name' : 'actColor','type' : 'string','map' : 'actColor'}, 
		{'name' : 'color','type' : 'string','map' : 'color'},
		{'name' : 'cutGrade','type' : 'string','map' : 'cutGrade'},
		{'name' : 'wtRange','type' : 'string','map' : 'weightRange'},
		{'name' : 'pcs','type' : 'int','map' : 'pcs'},
		{'name' : 'stoneWt','type' : 'float','map' : 'stoneAccWt'},
		{'name' : 'uqc','type' : 'string','map':'uqc'},
		{'name' : 'stoneRate','type' : 'float','map':'stoneAccRate'},
		{'name' : 'stoneCost','type' : 'float','map':'stoneAccCost'},
		{'name' : 'certCharges','type' : 'float','map':'certCharges'},
		
		{'name' : 'liCost','type' : 'float','map':'lineItemCost'},
		{'name' : 'sellingPrice','type' : 'float','map':''},

		{'name' : 'gpPerc','type' : 'float','map':'gpPercentage'},
		{'name' : 'grDoneBy','type' : 'string','map':'igrDoneBy'},
	 ];

	var columns = [ 
		{'text' : 'Store/DC Name','datafield' : 'storeOrDcName','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false},
		{'text' : 'Zone Name','datafield' : 'zoneName','width' : '6%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'Stone Stock No','datafield' : 'stoneStockNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Vendor Code','datafield' : 'vendCode','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

		{'text' : 'IGR Date','datafield' : 'igrDate','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'No of Days','datafield' : 'noOfDays','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false},
		{'text' : 'Stone Segment','datafield' : 'stoneAccSeg','width' : '5%',cellsalign : 'center',align : 'center',sortable :true,editable : false},
		{'text' : 'Stone Category','datafield' : 'stoneAccCat','width' : '6%',cellsalign : 'center',align : 'center',sortable :true,editable : false},
		{'text' : 'Shape','datafield' : 'shape','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Sub Cat','datafield' : 'subCat','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
		{'text' : 'Stone Article Code','datafield' : 'sCode','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false}, 

		{'text' : 'Act Color','datafield' : 'actColor','width' : '5%',cellsalign : 'right',align : 'center',sortable :false,editable : false,},
		{'text' : 'Color','datafield' : 'color','width' : '5%',cellsalign : 'right',align : 'center',sortable :false,editable : false,},
		{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '7%',cellsalign : 'right',align : 'center',sortable :false,editable : false,},
		{'text' : 'Weight Range','datafield' : 'wtRange','width' : '7%',cellsalign : 'right',align : 'center',sortable :false,editable : false,},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Stone Wt','datafield' : 'stoneWt','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false,'cellsformat' : 'd3'},
		{'text' : 'UQC','datafield' : 'uqc','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Stone Rate','datafield' : 'stoneRate','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'},
		
		{'text' : 'Stone Cost','datafield' : 'stoneCost','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable :false,editable : false,},
		{'text' : 'Cert Charges','datafield' : 'certCharges','width' : '7%',cellsalign : 'right',align : 'center','cellsformat' : 'd2',sortable :false,editable : false,},
		{'text' : 'Line Item Cost','datafield' : 'liCost','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'},
		{'text' : 'Stone Selling Price','datafield' : 'sellingPrice','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false,'cellsformat' : 'd2'},
		{'text' : 'GP %','datafield' : 'gpPerc','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'},
		{'text' : 'IGR Done By','datafield' : 'grDoneBy','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/fetchAgeingAnalysisLA", "listing",columns, stoneAccFieldFilters(), updateRows);
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
		showstatusbar: true,
 	    statusbarheight: 30,
 	    showaggregates: true,
	});
}

function accessorySearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
		  commit(true);
	}
	var datafields = [
		{'name' : 'storeOrDcName','type' : 'string','map':'storeOrDcName'},
		{'name' : 'zoneName','type' : 'string','map':'zoneName'},
		{'name' : 'stoneStockNo','type' : 'long','map':'id'},
		{'name' : 'vendCode','type' : 'string','map' : 'vendor>vendorCode'},
		{'name' : 'igrDate','type' : 'string','map':'grEntryDate'}, 
		{'name' : 'noOfDays','type' : 'long','map' : 'noOfDays'},
		{'name' : 'stoneAccSeg','type' : 'string','map' : 'segment>description'},
		{'name' : 'stoneAccCat','type' : 'string','map' : 'mainCategory'},
		{'name' : 'subCat','type' : 'string','map' : 'subCategory'},
		{'name' : 'sCode','type' : 'string','map' : 'stoneAccCode'},
		{'name' : 'costRange','type' : 'string','map' : 'weightRange'},
		{'name' : 'pcs','type' : 'int','map' : 'pcs'},
		{'name' : 'stoneWt','type' : 'float','map' : 'stoneAccWt'},
		{'name' : 'uqc','type' : 'string','map':'uqc'},
		{'name' : 'stoneRate','type' : 'float','map':'stoneAccRate'},
		{'name' : 'stoneCost','type' : 'float','map':'stoneAccCost'},
		{'name' : 'sellingPrice','type' : 'float','map':''},
		{'name' : 'gpPerc','type' : 'float','map':'gpPercentage'},
		{'name' : 'grDoneBy','type' : 'string','map':'igrDoneBy'},
	 ];

	var columns = [ 
		{'text' : 'Store/DC Name','datafield' : 'storeOrDcName','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false},
		{'text' : 'Zone Name','datafield' : 'zoneName','width' : '6%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'Acc Stock No','datafield' : 'stoneStockNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Vendor Code','datafield' : 'vendCode','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

		{'text' : 'IGR Date','datafield' : 'igrDate','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'No of Days','datafield' : 'noOfDays','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false},
		{'text' : 'Acc Segment','datafield' : 'stoneAccSeg','width' : '5%',cellsalign : 'center',align : 'center',sortable :true,editable : false},

		{'text' : 'Acc Category','datafield' : 'stoneAccCat','width' : '6%',cellsalign : 'center',align : 'center',sortable :true,editable : false},
		{'text' : 'Sub Cat','datafield' : 'subCat','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
		{'text' : 'Stone Article Code','datafield' : 'sCode','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false},

		{'text' : 'Cost Range','datafield' : 'costRange','width' : '5%',cellsalign : 'right',align : 'center',sortable :false,editable : false,},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Acc Wt','datafield' : 'stoneWt','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false,'cellsformat' : 'd3'},
		{'text' : 'UQC','datafield' : 'uqc','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Acc Rate','datafield' : 'stoneRate','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'},
		
		{'text' : 'Acc Cost','datafield' : 'stoneCost','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable :false,editable : false,},
		{'text' : 'Acc Selling Price','datafield' : 'sellingPrice','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false,'cellsformat' : 'd2'},
		{'text' : 'GP %','datafield' : 'gpPerc','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'},
		{'text' : 'IGR Done By','datafield' : 'grDoneBy','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/fetchAgeingAnalysisLA", "listing",columns, stoneAccFieldFilters(), updateRows);
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
		showstatusbar: true,
 	    statusbarheight: 30,
 	    showaggregates: true,
	});
}

$("#clearAllSA").on('click',function(){
	$("#jqxgrid").hide();
	$("#saCatObj").multiselect("clearSelection");
	$("#saSubCatObj").multiselect("clearSelection");
	$("#saArtCodeObj").multiselect("clearSelection");
	$("#vendorCodeObjS").multiselect("clearSelection");
});