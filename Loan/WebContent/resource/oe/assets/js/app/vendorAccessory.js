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
$("#stoneVendorDateFrom").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#stoneVendorDateTo").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#stoneVendorDateTo").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});

$("#createVA").on('click',function(){
	accVendorMasterCreateGrid();
	$("#jqxgridS").show();
});

// on load LOV's for search page
var loadLovCreate = function(){
	$.getJSON('/OrderExecution/api/v1/vendorAccessoryMasterLOV', function(data) {					
		if(data.resCode == 1){								
			$('#accSegment').empty().append('<option value="" selected>-- Select Option --</option>');
			$('#accSegmentC').empty().append('<option value="" selected>-- Select Option --</option>');
				$.each (data.payload.segments, function(key, val) {
					$('#accSegment').append('<option value="' + val.id + '" idS = '+ val.name +'>' + val.description + '</option>');
					$('#accSegmentC').append('<option value="' + val.id + '" idC = '+ val.name +'>' + val.description + '</option>');
				});
			
			vendorList = data.payload.vendors;
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

loadLovCreate();

$("#accSegment").on('change',function(){
	var params = {
			"fieldFilters" : {
			"sSegId" : $("#accSegment").val()
		}
	};
  postJSON('/OrderExecution/api/v1/getPMSAMcategory',JSON.stringify(params),function(data) {
	  $('#mainCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.mainCatList, function(key, val) {
			$('#mainCategory').append('<option value="' + val.id + '">' + val.code + '</option>');
		});
	});
});

$("#mainCategory").on('change',function(){
	var id = $("#mainCategory").val();
	$.getJSON('/OrderExecution/api/v1/accessoryArtLOV?criteria=sCategory&id='+id, function(data) {	
		  $('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each (data.payload.sCategory, function(key, val) {
				$('#subCategory').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
	});
});

$("#subCategory").on('change',function(){
	var segmentId = $("#accSegment").val();
	var mainCatId = $("#mainCategory").val();
	var subCatId = $("#subCategory").val();
	$.getJSON('/OrderExecution/api/v1/accessoryArt/validate?id='+ segmentId + '&cat=' + mainCatId + '&sub='+ subCatId, function(data) {
		$("#accCode").val(data.payload.articleCode.articleCode);
	});
});

//###################### On Load LOV for Create #########################
$("#accSegmentC").on('change',function(){
	var params = {
			"fieldFilters" : {
			"sSegId" : $("#accSegmentC").val()
		}
	};
  postJSON('/OrderExecution/api/v1/getPMSAMcategory',JSON.stringify(params),function(data) {
	  $('#mainCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.mainCatList, function(key, val) {
			$('#mainCategoryC').append('<option value="' + val.id + '">' + val.code + '</option>');
		});
	});
  
  $.getJSON('/OrderExecution/api/v1/getHsnCodesBySegmentId?id='+$("#accSegmentC").val()+'&type=AC',function(data) {
		if(1 == data.resCode){
			$('#compHsnCodeC').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each (data.payload.hsnCodes, function(key, val) {
				$('#compHsnCodeC').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
		}
	});
});


$("#mainCategoryC").on('change',function(){
	var id = $("#mainCategoryC").val();
	$.getJSON('/OrderExecution/api/v1/accessoryArtLOV?criteria=sCategory&id='+id, function(data) {	
		  $('#subCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each (data.payload.sCategory, function(key, val) {
				$('#subCategoryC').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
	});
});

$("#subCategoryC").on('change',function(){
	var segmentIdC = $("#accSegmentC").val();
	var mainCatIdC = $("#mainCategoryC").val();
	var subCatIdC = $("#subCategoryC").val();
	$.getJSON('/OrderExecution/api/v1/accessoryArt/validate?id='+ segmentIdC + '&cat=' + mainCatIdC + '&sub='+ subCatIdC, function(data) {
		$("#articleCode").val(data.payload.articleCode.articleCode);
	});
});

var vendorAccFieldFilters = function() {
	var vendor = $("#vendorCode-value").val();
	var accSegment = $('#accSegment').val();
	var mainCategory = $('#mainCategory').val();
	var subCategory = $('#subCategory').val();
	var status = $('#status').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (vendor != "" && vendor != null) {
		fieldFilters.fieldFilters["vendorId"] = parseInt(vendor);
	}
	if (accSegment != "" && accSegment != null) {
		fieldFilters.fieldFilters["segmentId"] = parseInt(accSegment);
	}
	if (mainCategory != "" && mainCategory != null) {
		fieldFilters.fieldFilters["categoryId"] = parseInt(mainCategory);
	}
	if (subCategory != "" && subCategory != null) {
		fieldFilters.fieldFilters["subCategoryId"] = parseInt(subCategory);
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = (status == "true") ? true : false ;
	}
	return fieldFilters;
}


var accVendorMasterGrid = function(searchRes) {
	var source = {
		datafields : [ 
			{'name' : 'vendor','type' : 'string','map': 'vendorAccessory>vendor>vendorName'}, 
			{'name' : 'segment','type' : 'string','map' : 'vendorAccessory>accessory>segmentDTO>description'},
			{'name' : 'mainCategory','type' : 'string','map': 'vendorAccessory>accessory>category>description'},
			{'name' : 'subCategory','type' : 'string','map' : 'vendorAccessory>accessory>subCategory>description'}, 
			{'name' : 'articleCode','type' : 'string','map' : 'vendorAccessory>accessory>code'},
			{'name' : 'fromCost','type' : 'float','map' : 'fromCost'},
			{'name' : 'toCost','type' : 'float','map' : 'toCost'},
			{'name' : 'costPerPcs','type' : 'float','map' : 'costPriceInRs'},
			{'name' : 'uom','type' : 'string','map' : 'vendorAccessory>accessory>uom'},
			{'name' : 'status','type' : 'string','map' : 'status'},
			{'name' : 'sellingPrice','type' : 'float','map' : 'sellingPrice'},
			{'name' : 'createdBy','type' : 'string',}, 
			{'name' : 'accVendorId','type' : 'long','map' : 'id'} 
			],
			localdata : searchRes,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 65,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		sortable: true,
		rowsheight: 30,
		altRows : true,
		columnsresize : true,
		columns : [ 
				{'text' : 'Vendor','datafield' : 'vendor','width' : '12.5%',editable : false,cellsalign : 'center',align : 'center',sortable: false,},
				{'text' : 'Segment','datafield' : 'segment','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable: false},
				{'text' : 'Main Category','datafield' : 'mainCategory','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable: true},
				{'text' : 'Sub Category','datafield' : 'subCategory','width' : '17%',cellsalign : 'center',align : 'center',sortable: true,editable : false},
				{'text' : 'Article Code','datafield' : 'articleCode','width' : '8%',cellsalign : 'center',align : 'center',sortable: false,editable : false},
				{'text' : 'From Cost','datafield' : 'fromCost','width' : '6%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable: false,editable : false},
				{'text' : 'To Cost','datafield' : 'toCost','width' : '5%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable: false,editable : false},
				{'text' : 'Cost Price','datafield' : 'costPerPcs','width' : '6%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable : false,editable : false}, 
				{'text' : 'UOM','datafield' : 'uom','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
				{'text' : 'Selling Price','datafield' : 'sellingPrice','width' : '6.5%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable : false,editable : false}, 
				{'text' : 'Created BY','datafield' : 'createdBy','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
				{'text' : 'Status','datafield' : 'status',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '6%'},
				{'text' : '','datafield' : 'accVendorId',editable : false,sortable : false,cellsrenderer : vendAccEditlinkrenderer,filterable : false,'width' : '3%'}
		]
	});
}

var searchRes ; 

var searchFunc = function(){
	postJSON('/OrderExecution/api/v1/searchVendorAccessory?param=search',JSON.stringify(vendorAccFieldFilters()),function(data) {
		 searchRes = data.payload.list;
		 accVendorMasterGrid(searchRes);
		 $("#jqxgrid").show(); 
	 });
}
$("#Search").on('click',function(){
	searchFunc(); 
});


var vendAccEditlinkrenderer = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	/*if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{*/
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#accVendorMasterEdit" type="button" id='
			+ row
			+ ' onclick="editVendorAccessoryDet('
			+ value
			+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
//	/}
}


function validateNumberPercentage(val) {
	if (val && !isNaN(val)) {
		return parseFloat(val).toFixed(2);
	}
}

var editVendorAccessoryDet = function(id) {
	var rows = $("#jqxgrid").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');	
	for (var i = 0; i < rows.length; i++) {
		var status ;
		if(rows[selectedrowindex].status == "Active"){
			status = true;
		}else{
			status = false;
		}
		$.getJSON('/OrderExecution/api/v1/getVendorAccessoryById?id='+ id +'&status='+status,function(data) {
			var response = data.payload.detail;
			$("#vendorAccessoryIdE").val(response.id);
			$("#vendorE").val(response.vendorAccessory.vendor.vendorName);
			$("#segmentE").val(response.vendorAccessory.accessory.segmentDTO.description);
			$("#MainCatE").val(response.vendorAccessory.accessory.category.description);
			$("#subCatE").val(response.vendorAccessory.accessory.subCategory.description);
			
			$("#vendorIdE").val(response.vendorAccessory.vendor.id);
			$("#segmentIdE").val(response.vendorAccessory.accessory.segmentDTO.id);
			$("#mainCatIdE").val(response.vendorAccessory.accessory.category.id);
			$("#subCatIdE").val(response.vendorAccessory.accessory.subCategory.id);
			
			$("#fromCostE").val((parseFloat(response.fromCost)).toFixed(2));
			$("#toCostE").val((parseFloat(response.toCost)).toFixed(2));
			$("#costPriceE").val((parseFloat(response.costPriceInRs)).toFixed(2));
			$("#articleCodeE").val(response.vendorAccessory.accessory.code);
			$("#artDescE").val(response.vendorAccessory.accessory.subCategory.description);
			$("#uomE").val(response.vendorAccessory.accessory.uom);
			$("#sellingPriceE").val((parseFloat(response.sellingPrice)).toFixed(2));
			$("#vendorHsnCodeE").val(response.vendorAccessory.vendorHsnCode);
			
			 if(response.isActive == true){
				 $("#costPriceE").prop('disabled',false);
				 $("#saveVendAccE").prop('disabled',false);
			 }else if(response.isActive == false){
				 $("#costPriceE").prop('disabled',true);
				 $("#saveVendAccE").prop('disabled',true);
			 }
			 
			 
				$.getJSON('/OrderExecution/api/v1/getHsnCodesBySegmentId?id='+$("#segmentIdE").val()+'&type=AC',function(data) {
					$('#compHsnCodeE').empty().append('<option value="" selected>--Select--</option>');
					$.each(data.payload.hsnCodes, function(key, val) {
						if(response.vendorAccessory.hsnMaster != null){
							if(response.vendorAccessory.hsnMaster.hsnCode == val.name){
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

			 
		});
	}
}


$("#costPriceE").on('change',function(){
	if($("#costPriceE").val() <= 0){
		$("#costPriceE").val("0.00");
		$.growl.error({
			message : "Cost Price Should be Greater than 0 !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	
	if(parseFloat($("#costPriceE").val()) < parseFloat($("#fromCostE").val()) || parseFloat($("#costPriceE").val())  > parseFloat($("#toCostE").val())){
		$("#costPriceE").val(0.00);
		$.growl.error({
			message : "Cost Price Should be between  " +  $("#fromCostE").val() + " and  " + $("#toCostE").val() + " !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
});

$("#saveVendAccE").on('click',function(){
	trimmer();
	
	if($("#costPriceE").val() == "" || $("#costPriceE").val() == null || $("#vendorHsnCodeE").val() == "" || $("#vendorHsnCodeE").val() == null
			|| $("#compHsnCodeE").val() == "" || $("#compHsnCodeE").val() == null){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	if($("#costPriceE").val() <= 0){
		$.growl.error({
			message : "Cost Price Should be Greater than 0 !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	if(parseFloat($("#costPriceE").val()) < parseFloat($("#fromCostE").val()) || parseFloat($("#costPriceE").val())  > parseFloat($("#toCostE").val())){
		$.growl.error({
			message : "Cost Price Should be between  " +  $("#fromCostE").val() + " and  " + $("#toCostE").val() + " !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	var params = {
			"id" : parseInt($("#vendorAccessoryIdE").val()),
			"costPriceInRs" : parseFloat($("#costPriceE").val()),
			"vendorAccessory": {
				"vendorHsnCode" :$('#vendorHsnCodeE').val(),
				"hsnMaster" :{"id" : parseInt($('#compHsnCodeE').val())},
			}
	}
	postJSON('/OrderExecution/api/v1/updateVendorAccessory',JSON.stringify(params),function(data) {
		if (data.resCode == "1") {
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$('#accVendorMasterEdit').modal('hide');
			searchFunc(); 
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
		}
	})
	
});


var rowId = 0;
var generaterow = function(i) {
	var row = {};
	row["accDesc"] = $("#subCategoryC option:selected").text();
	row["fCost"] = "",
	row["tCost"] = "",
	row["costRange"] = "",
	row["costPrice"] = "",
	row["sellingPrice"] = "",
	rowId = rowId + 1;
	return row;
}


$("#add").on('click',function(){
	var vendCode = $("#vendorCodeC-value").val();
	var accSegm = $("#accSegmentC").val();
	var mainCat = $("#mainCategoryC").val();
	var subCat = $("#subCategoryC").val();
	var vendorHsnCodeC = $("#vendorHsnCodeC").val();
	var compHsnCodeC = $("#compHsnCodeC").val();
	var state = true;
	 if(vendCode == "" || vendCode == null || accSegm == "" || accSegm == null || mainCat == "" || mainCat == null 
		 ||subCat == "" || subCat == null  || vendorHsnCodeC == "" || vendorHsnCodeC == null || compHsnCodeC == "" || compHsnCodeC == null ){
		 $.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 1000,
			title : 'Error'
		 });
		 state = false;
	 }
		var rows = $("#jqxgridS").jqxGrid("getrows");
		for(var i=0;i<rows.length;i++){
			if(typeof rows[i].fCost == "undefined" || typeof rows[i].tCost == "undefined" || rows[i].costPrice == "" || rows[i].sellingPrice == "" || 
				rows[i].costRange == ""){
				$.growl.error({
					message : "Please Fill Grid Fields !!!",
					duration : 10000,
					title  : 'Error'
				});
				state = false;
       }
	}
	if(state == true){
		 $("#jqxgridS").jqxGrid('addrow', null, generaterow(rowId + 1));
	 }
 });

var fromCostArray = [];

var accVendorMasterCreateGrid = function(data){
	
	
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [
		{
			'name' : 'accDesc',
			'type' : 'string'
		}, {
			'name' : 'fCost',
			'type' : 'float'
		}, {
			'name' : 'tCost',
			'type' : 'float'
		}, {
			'name' : 'costRange',
			'type' : 'string'
		}, {
			'name' : 'costPrice',
			'type' : 'float'
		}, {
			'name' : 'sellingPrice',
			'type' : 'float'
		}];
	var columns = [ 
		{
			'text' : 'Accessory Desc',
			'datafield' : 'accDesc',
			'width' : '20%',
			cellsalign : 'left',
			align:'center',
			editable : false
		},
		{
			'text' : 'From Cost',
			'datafield' : 'fCost',
			'width' : '15%',
			cellsalign : 'right',
			align:'center',
			columntype : 'dropdownlist',	
			displayfield : 'fromCostN',
			cellsformat : 'd2',
			editable : true,
			createeditor : function(row, value, editor) {
					var id = $("#subCategoryC").val();
						$.getJSON('/OrderExecution/api/v1/vendorAccessoryMasterCostRanges?subCatId='+id, function(data) {
							 fromCostArray = data.payload.costRanges ;
							var fCostArray = [];
							$.each(fromCostArray, function(k, v){
								fCostArray.push({
									"id" : v.name,
									"name" : v.description
								})
							});
							editor.jqxDropDownList({ source: fCostArray , displayMember: 'id', valueMember: 'name'});
						});
			},
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				if(typeof (newvalue.label) != "undefined" && typeof(newvalue.value) != "undefined" ){
					var toCost = parseFloat(newvalue.value);
					$('#jqxgridS').jqxGrid ('setcellvalue', row, 'tCost',toCost);
					var costRange = parseFloat(newvalue.label) + "-" + (parseFloat(newvalue.value)).toFixed(2)  ;
					$('#jqxgridS').jqxGrid ('setcellvalue', row, 'costRange',costRange);
				}
				$.each(fromCostArray, function(key, val) {	
					 if( val.name  == newvalue.label){	
						 $('#jqxgridS').jqxGrid ('setcellvalue', row, 'sellingPrice',val.value);
					}
				})
			}
		},
		{
			'text' : 'To Cost',
			'datafield' : 'tCost',
			'width' : '15%',
			cellsalign : 'right',
			align:'center',
			cellsformat : 'd2',
			editable : false
		}, {
			'text' : 'Cost Range',
			'datafield' : 'costRange',
			'width' : '20%',
			cellsalign : 'center',
			align:'center',
			editable : false
		}, {
			'text' : 'Cost Price',
			'datafield' : 'costPrice',
			'width' : '12%',
			cellsalign : 'right',
			align:'center',
			cellsformat : 'd2',
			editable : true,
			columntype : 'numberinput',
	    	createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						decimalDigits : 2
					});
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if(newvalue <= 0){
						$.growl.error({
							message : "Cost Price Must Be Greater Than Zero !!!",
							duration : 1000,
							title : 'Error'
						});
						return "";
					}
					var toCost = $("#jqxgridS").jqxGrid("getCellvalue", row , 'tCost');
					var fromCost = $("#jqxgridS").jqxGrid("getCellvalue", row , 'fromCostN');
					if(newvalue > toCost || newvalue < fromCost){
						$.growl.error({
							message : "Cost Price Must Between " + fromCost + " and " + toCost.toFixed(2) + " !!!",
							duration : 1000,
							title : 'Error'
						});
						return "";
					}
			}
		}, {
			'text' : 'Selling Price',
			'datafield' : 'sellingPrice',
			'width' : '12%',
			cellsalign : 'right',
			align:'center',
			cellsformat : 'd2',
			editable : false
		},{text : '',
			datafield : 'Delete',
			'width' : '6%',
			cellsalign:'center',
			align:'center',
			formatoptions: {editbutton:false,delbutton:false},
			editable: false,
			cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
				var rows = $("#jqxgridS").jqxGrid("getrows");
				if(typeof rows != "undefined"){
					var id = rows[row].id;
					if(typeof id != "undefined"){
						return  "";
					}else{					
						return  "<button onclick='deleteRow("+row+")'  type='button' class='btn btn-danger btn-sm'><i class='fa fa-trash-o fa-md'></i></button>";
					}
				}
			
			},
			}
		
		];
	addGrid(datafields, columns, updateRows, data, "", '#jqxgridS');
	$("#jqxgridS").jqxGrid({
        height: 159,
        autoheight: true,
        columnsheight : 52,
        columnsresize : true,
        rowsheight: 30,
        sortable: false,
        theme: 'energyblue',
	});
}

var deleteRow = function(rowId){		
	var id = $("#jqxgridS").jqxGrid('getrowid', rowId);
	$("#jqxgridS").jqxGrid('deleterow', id);
}

var getVendorAccessoryDetC = function(){
	var vendorAccessoryDetC = [] ;
		var getVendAccDetC = $('#jqxgridS').jqxGrid('getrows');
		for (i = 0; i < getVendAccDetC.length; i++) {
			vendorAccessoryDetC.push({
				"fromCost":parseFloat(getVendAccDetC[i].fromCostN),
				"toCost" :parseFloat(getVendAccDetC[i].tCost),
				"costPriceInRs" :(getVendAccDetC[i].costPrice != "") ? (parseFloat(getVendAccDetC[i].costPrice)) : ""
			})
		}
	return vendorAccessoryDetC;
}

var getFormDataC = function() {
	var vAccGridDetC = getVendorAccessoryDetC();
	var vendorAccessoryMaster = {
			"vendor" : {"id" : parseInt($("#vendorCodeC-value").val()),
						"vendorName" : $("#vendorCodeC").val(),
			},
			"accessory" : {"code" :$('#articleCode').val(),
						   "segmentDTO" : { 
							   				"id": parseInt($("#accSegmentC").val()),
							   				"description" : $("#accSegmentC option:selected").text()
							   				},
							"subCategory" : {
								 			"id" : parseInt($("#subCategoryC").val()),
								 			"description" : $("#subCategoryC option:selected").text()
							 				} 				
				},
				
			"vendorHsnCode" :$('#vendorHsnCodeC').val(),
			"hsnMaster" :{"id" : parseInt($('#compHsnCodeC').val())},
			"vendorAccessoryDetails" : vAccGridDetC 
	}
	return vendorAccessoryMaster;
}

$("#saveVendAcc").on('click',function(){
	trimmer();
	var vendor = $("#vendorCodeC-value").val();
	var acc = $("#accSegmentC").val();
	var mainCat = $("#mainCategoryC").val();
	var subCat = $("#subCategoryC").val();
	var vendorHsnCodeC = $("#vendorHsnCodeC").val();
	var compHsnCodeC = $("#compHsnCodeC").val();
		if(vendor == "" || vendor == null || acc == "" || acc == null || mainCat == "" || mainCat == null 
				|| subCat == "" || subCat == null || vendorHsnCodeC == "" || vendorHsnCodeC == null 
				|| compHsnCodeC == "" || compHsnCodeC == null ){
			$.growl.error({
				message : "Please Fill Mandatory Fields !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	var vendorAccDetailsC = getFormDataC();
	var vendAccArr = $('#jqxgridS').jqxGrid('getrows');
		if(vendAccArr.length == 0){
			$.growl.error({
				message : "Please Fill Grid Fields !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		 for(var i = 0;i<vendAccArr.length;i++){
			 if(vendAccArr[i].accDesc == "" || vendAccArr[i].accDesc == null || vendAccArr[i].fCost == "" || vendAccArr[i].fCost == null
					 || vendAccArr[i].tCost == "" || vendAccArr[i].tCost == null){
				 $.growl.error({
					 message : "Grid Fields are Mandatory !!!",
					 duration : 1000,
					 title : 'Error'
				 });
				 return false;
			 }
			 if(vendAccArr[i].costPrice == "" || vendAccArr[i].costPrice == null){
				 $.growl.error({
					 message : "Cost Price is Mandatory !!!",
					 duration : 1000,
					 title : 'Error'
				 });
				 return false;
			 }
		 }
	if (vendorAccDetailsC) {
		postJSON('/OrderExecution/api/v1/createVendorAccessory',JSON.stringify(vendorAccDetailsC),function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#accVendorMasterCreate').modal('hide');
				$('#accVendorMasterCreate').on('hidden.bs.modal',function() {
					$(this).find('form').trigger('reset');
				});
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			}					
		});
	 }
});



//Export function for Adjustment Voucher
$("#export").on("click",function() {
	var data;
	fieldFilters = {
		"fieldFilters" : {}
	};
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		var rows = $('#jqxgrid').jqxGrid('getrows');
		if (  rows == undefined || rows == 0 ) {
			$.growl
			.error({
				message : "No Data To Export",
				duration : 10000
			});
			return false;
		}else{
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
				var newData = [];					
					postJSON('/OrderExecution/api/v1/searchVendorAccessory?param=export',JSON.stringify(vendorAccFieldFilters()),function(response) {
						data = response.payload.list;
							for (i = 0; i < data.length; i++) {
								newData.push({	
									'Vendor' : (data[i].vendorAccessory != null) ? data[i].vendorAccessory.vendor.vendorName : "",
									'Segment' : (data[i].vendorAccessory != null) ? data[i].vendorAccessory.accessory.segmentDTO.description : "",
									'Main Category' : (data[i].vendorAccessory != null) ? data[i].vendorAccessory.accessory.category.description : "",
									'Sub Category' : (data[i].vendorAccessory != null) ? data[i].vendorAccessory.accessory.subCategory.description : "",
									'Article Code' : (data[i].vendorAccessory != null) ? data[i].vendorAccessory.accessory.code : "",
									'From Cost' : (data[i].fromCost != null) ? data[i].fromCost : "",
									'To Cost' : (data[i].toCost != null) ? data[i].toCost : "",
									'Cost Price' : (data[i].costPriceInRs != null) ?data[i].costPriceInRs	: "",
									'UOM' : (data[i].vendorAccessory != null) ?data[i].vendorAccessory.accessory.uom : "",		
									'Selling Price' : (data[i].sellingPrice != null) ?data[i].sellingPrice : "",
									'Created By' : (data[i].createdBy != null) ?data[i].createdBy : "",
									'Status' : (data[i].status != null) ? data[i].status: "",
								});
							}
							 var opts = [{sheetid:'Vendor_Accessory',header:true}];
		                     var res = alasql('SELECT * INTO XLSX("Vendor Accessory'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
						});	
						}else{
							   $.growl.error({
									message : "No Data To Export",
									duration : 10000
								});
							   return false;	
							   }
						   }
});

$('.modal').on('hidden.bs.modal', function () {
    $("form").each(function(){
      $(this).validate().resetForm();
    });
    $("form").trigger("reset");
});

/* Clear Form Filter and Re-set to default search and clear Grid data */
$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('vendorAccessorySeacrh', 'bodySwitcher')"
});



///////////*************Export to Audit************//////////
$("#exportAudit").on("click",function(){
	
	    var fieldFilters = vendorAccFieldFilters();
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		var rows = $("#jqxgrid").jqxGrid('getrows');
	    				
		if(rows.length != 0){
			postJSON('/OrderExecution/api/v1/downloadOrExportVendorAccessory',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
					data = response.payload.list;
					exportVendorAccessoryMasterSideBySide(data);
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

function exportVendorAccessoryMasterSideBySide(data){

	var sql0 = 'SEARCH / AS @vh \
		RETURN ( \
		   @vh->[vaccHeaderId] AS [VAccHeaderId], \
	       @vh->[isActive] AS [IsActive] ,\
		   @vh->[desc] AS [Desc], \
	       @vh->[acmDTO]->code AS [AccCode], \
		   @vh->[acmDTO]->segmentDTO->description AS [SegmentDesc], \
	       @vh->[acmDTO]->subCategory->description AS [SubCategoryDesc], \
		   @vh->[acmDTO]->category->description AS [CategoryDesc], \
	       @vh->[vendor]->id AS [VendorId], \
	       @vh->[hsnMaster]->hsnCode AS [HsnCode], \
		   @vh->[vendorHsnCode] AS [VendorHsnCode], \
	       @vh->[vaccDetailId] AS [VaccDetailId], \
	       @vh->[costPriceInRupees] AS [costPriceInRupees], \
	       @vh->[fromCost] AS [fromCost], \
	       @vh->[detailIsActive] AS [detailIsActive], \
		   @vh->[toCost] AS [ToCost] \
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
    	res = alasql("SELECT * INTO XLSX('VendorAccessoryDetails.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	alert(err.message);
    }

	
}

///////////Download the Vendor Stone Article ///////////////////////////
$("#downloadVAccData").on("click",function(){
		var fieldFilters = vendorAccFieldFilters();
		var rows = $("#jqxgrid").jqxGrid('getrows');
		if(typeof rows == "undefined"){
			$.growl.error({
				message : "No Data to Download.",
				duration : 10000
			});
			return false;
		 }else{				
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
				postJSON('/OrderExecution/api/v1/downloadOrExportVendorAccessory',JSON.stringify(fieldFilters),function(response) {
					if (response != null) {
						data = response.payload.list;
						downloadVendorAccessoryMasterSideBySide(data);
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

function downloadVendorAccessoryMasterSideBySide(data){
		var sql0 = 'SEARCH / AS @vh \
			RETURN ( \
			 @vh->[vaccHeaderId] AS [VAccHeaderId], \
		       @vh->[isActive] AS [IsActive] ,\
			   @vh->[desc] AS [Desc], \
		       @vh->[acmDTO]->id AS [AccId], \
			   @vh->[acmDTO]->segmentDTO->id AS [SegmentId], \
			   @vh->[acmDTO]->segmentDTO->description AS [SegmentDesc], \
		       @vh->[acmDTO]->subCategory->id AS [SubCategoryId], \
			   @vh->[acmDTO]->subCategory->description AS [SubCategoryDesc], \
			   @vh->[acmDTO]->category->id AS [CategoryId], \
			   @vh->[acmDTO]->category->description AS [CategoryDesc], \
		       @vh->[vendor]->id AS [VendorId], \
			   @vh->[vendor]->vendorName AS [VendorName], \
		       @vh->[hsnMaster]->id AS [HsnId], \
			   @vh->[hsnMaster]->hsnDescription AS [HsnDesc], \
			   @vh->[vendorHsnCode] AS [VendorHsnCode], \
		       @vh->[vaccDetailId] AS [VaccDetailId], \
		       @vh->[costPriceInRupees] AS [CostPriceInRupees], \
		       @vh->[fromCost] AS [FromCost], \
		       @vh->[detailIsActive] AS [DetailIsActive], \
			   @vh->[toCost] AS [ToCost] \
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
	    	res = alasql("SELECT * INTO XLSX('DownloadVendorArticleAccessoryDetails.xlsx',?) FROM ?",[mystyle, res]);
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
							if(value.VAccHeaderId != null && value.VAccHeaderId != 'undefined' && value.VAccHeaderId != '' && value.VAccHeaderId == dataValue.vaccHeaderId){
								flag = true;
								var row ={	
										"vaccDetailId": value.VaccDetailId,
								        "costPriceInRupees": value.CostPriceInRupees,
								        "fromCost": value.FromCost,
								        "detailIsActive": value.DetailIsActive,
								        "toCost": value.ToCost
								}
								dataValue.vendorAccessoryDetails.push(row);
								return;
							}else if( value.VendorId == dataValue.vendor.id && value.SegmentId == dataValue.acmDTO.segmentDTO.id && value.CategoryId == dataValue.acmDTO.category.id && value.SubCategoryId ==  dataValue.acmDTO.subCategory.id){
								flag = true;
								var row ={	
										"vaccDetailId": value.VaccDetailId,
								        "costPriceInRupees": value.CostPriceInRupees,
								        "fromCost": value.FromCost,
								        "detailIsActive": value.DetailIsActive,
								        "toCost": value.ToCost
								}
								dataValue.vendorAccessoryDetails.push(row);
								return;
							}
						});
					}
					if(flag == false){
						var rowObj = {
								"vaccHeaderId": value.VAccHeaderId,
							    "desc": value.Desc,
							    "isActive": value.IsActive,
							    "acmDTO": {
							      "id": value.AccId,
							      "segmentDTO": {
							        "id": value.SegmentId,							        
							      },
							      "subCategory": {
							        "id": value.SubCategoryId,							        
							      },
							      "category": {
							        "id": value.CategoryId,
							      }
							    },
							    "vendor": {
							      "id": value.VendorId
							    },
							    "hsnMaster": {
							      "id": value.HsnId
							    },
							    "vendorHsnCode": value.VendorHsnCode,
							    "vendorAccessoryDetails": [
							      {
							    	  "vaccDetailId": value.VaccDetailId,
								       "costPriceInRupees": value.CostPriceInRupees,
								       "fromCost": value.FromCost,
								       "detailIsActive": value.DetailIsActive,
								       "toCost": value.ToCost
							      }
							    ]

						}
						dataVendorDetails.push(rowObj);
					}
					
				});
				var arrFg = [];		
				for(var i=0;i<dataVendorDetails.length;i++){					
					if( dataVendorDetails[i].vaccHeaderId == null  && dataVendorDetails[i].vendor.id == undefined && dataVendorDetails[i].acmDTO.segmentDTO.id == undefined &&
					    dataVendorDetails[i].acmDTO.category.id == undefined && dataVendorDetails[i].acmDTO.subCategory.id	== undefined	
					) {	
						
					} else {
						arrFg.push(dataVendorDetails[i]);
					}
				}
				var sdetails = JSON.stringify(arrFg);
				console.log(sdetails);
				
				postJSON('/OrderExecution/api/v1/UploadVendorAccessoryArticle', sdetails, function(response) {
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
	document.getElementById("vendorAccessoryUpload").value = "";
	fileEvent = null;
 }

 function captureFileSelectEvent(event)
 {
 	fileEvent = event;
 }


