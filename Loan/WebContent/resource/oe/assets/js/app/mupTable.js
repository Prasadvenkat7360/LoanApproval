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

//on change the metal Name
function onSelectLoad(){
$.getJSON('/OrderExecution/api/v1/getMupTableLOV', function(data) {
	$('#BusinessMupTableS').empty().append(
			'<option value="" selected>--Select--</option>');
	$('#segmentMupTableS').empty().append(
			'<option value="" selected>--Select--</option>');
	/*$('#regionMupTableS').empty().append(
			'<option value="" selected>--Select--</option>');*/
	$('#mupCategoryTableS').empty().append(
			'<option value="" selected>--Select--</option>');
	$.each(data.payload.business, function(key, val) {
		$('#BusinessMupTableS').append(
				'<option value="' + val.id + '" >' + val.name + '</option>');
	});
	$.each(data.payload.METAL_SEGMENT_LOV, function(key, val) {
		$('#segmentMupTableS').append(
				'<option value="' + val.id + '" >' + val.description
						+ '</option>');
	});
/*	$.each(data.payload.rList, function(key, val) {
		$('#regionMupTableS').append(
				'<option value="' + val.id + '" >' + val.name + '</option>');
	});*/
	
});
}

$("#BusinessMupTableS").on("change",function(){
	$('#regionMupTableS').empty().append('<option value="" selected>--Select--</option>');
	var id = $("#BusinessMupTableS").val();
	$.getJSON('/OrderExecution/api/v1/getRegion?bId='+id, function(data) {
		$.each(data.payload.Regions, function(key, val) {
			$('#regionMupTableS').append('<option value="' + val.id + '" >' + val.name + '</option>');
		});
	});
});

$("#segmentMupTableS").on("change",function(){
	var id =$("#segmentMupTableS").val();

	$('#mupCategoryTableS').empty().append(
	'<option value="" selected>--Select--</option>');
	
	
	$.getJSON('/OrderExecution/api/v1/getMupcategoryLOV?segment='+id, function(data) {
		$.each(data.payload.muptype, function(key, val) {
			$('#mupCategoryTableS').append(
					'<option value="' + val.id + '">' +val.code +"-"+ val.description
							+ '</option>');
		});
	});
 	
});


// edit button
var editMupTable = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"  data-target="#editMupTable" type="button" id='
			+ row
			+ ' onclick="editMupTable('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i></button>'
	}
}

function mupTableGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'business',
		'type' : 'string',
		'map' : 'businessName'
	}, {
		'name' : 'regionName',
		'type' : 'string',
		'map' : 'region>name'
	}, {
		'name' : 'segment',
		'type' : 'string',
		'map' : 'metalSegment>description'
	}, {
		'name' : 'skinPurity',
		'type' : 'string',
		'map' : 'skinPurity'
	}, {
		'name' : 'mupType',
		'type' : 'string',
		'map' : 'mupType>description'
	}, {
		'name' : 'actionid',
		'type' : 'id',
		'map' : 'id'
	}, {
		'name' : 'bussinessId',
		'type' : 'id',
		'map' : 'businessId'
	}, {
		'name' : 'regionId',
		'type' : 'id',
		'map' : 'region>id'
	}, {
		'name' : 'segmentId',
		'type' : 'id',
		'map' : 'metalSegment>id'
	}, , {
		'name' : 'mupCategoryId',
		'type' : 'id',
		'map' : 'mupType>id'
	} ];

	var columns = [ {
		'text' : 'Business',
		'datafield' : 'business',
		cellsalign : 'center',
		align : 'center',
		'width' : '16%',
		sortable : true,
		editable : false

	}, {
		'text' : 'Region',
		'datafield' : 'regionName',
		cellsalign : 'center',
		align : 'center',
		'width' : '16%',
		sortable : true,
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '16%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : ' Mup Category',
		'datafield' : 'mupType',
		'width' : '34%',
	    cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : '  Skin Purity',
		'datafield' : 'skinPurity',
		'width' : '15%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		sortable : true,
		editable : false
	}, {
		'text' : '',
		'datafield' : 'actionid',
		cellsrenderer : editMupTable,
		'width' : '3%',
		cellsalign : 'center',
		filterable: false,
		align : 'center',
		editable : false,

	} ];

	showMyGrid(datafields,
			"/OrderExecution/api/v1/mcConfigListing?page=search", "list",
			columns, mupTableSearchFilters(), updateRows);
	$("#jqxgrid").jqxGrid({ 
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});

}

$("#jqxgrid").bind('cellselect',function(event) {
	var row = event.args.rowindex;
	var datafield = event.args.datafield;
	var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
	var regionId = datarow.regionId;
	var segmentId = datarow.segmentId;
	var skinPurity = datarow.skinPurity;
	var mupCategoryId = datarow.mupCategoryId;
	var bId = datarow.bussinessId;
	var editMupatable = function() {
		fieldFilters = {
			"fieldFilters" : {}
		};

		if (regionId != "" && regionId != null) {
			fieldFilters.fieldFilters["region"] = regionId;
		}
		if (segmentId != "" && segmentId != null) {
			fieldFilters.fieldFilters["metalSegment"] = segmentId;
		}
		if (skinPurity != "" && skinPurity != null) {
			fieldFilters.fieldFilters["skinpurity"] = skinPurity;
		}
		if (mupCategoryId != "" && mupCategoryId != null) {
			fieldFilters.fieldFilters["mupcategory"] = mupCategoryId;
		}
		if (bId != "" && bId != null) {
			fieldFilters.fieldFilters["bId"] = bId;
		}

		return fieldFilters;
	}
	postJSON('/OrderExecution/api/v1/searchMcConfig?page=update',JSON.stringify(editMupatable()),function(response) {
		if(response.resCode =="1"){
			var data = response.payload.mupCategory;
			$("#regionMupTableEdit").val(data.region.name);
			$("#baseMetalrateMupTableEdit").val(
					data.baseMetalRate);
			$("#mcApprotionTableEidt").val(
					data.mcApportionPercentage)
			$("#wastageApprotionTableEdit").val(
					data.wastageApportionPercentage);
			$("#sellingRateforPurityTableEdit").val(
					data.metalRateForPurity);
			$("#skinPurityMupTableEidt").val(
					data.skinPurity);
			$("#metalSegmentMupTableEdit").val(
					data.metalSegment.description);
			$("#CategoryMupTableEdit").val(
					data.mupType.description);
			$("#metalRateMarkUpTableEdit").val(data.markuprate);
			var metalPUrityRate = (data.baseMetalRate * data.skinPurity) / 99.9;
			$("#MetalCostForPurityMupTableEidt").val(
					metalPUrityRate.toFixed(2));
			var weightRange = [];
			weightRange  = response.payload.weightRange
			$.each(weightRange,function(k,v){
				v.metalSellRatePurity = $("#sellingRateforPurityTableEdit").val();
				v.baseMetalrate = $("#baseMetalrateMupTableEdit").val();
				v.metalPurity = $("#MetalCostForPurityMupTableEidt").val();
			});
			mupTableEdit(weightRange);
		}
	});
});

// filter for Main Search
// search filters
var mupTableSearchFilters = function() {
	var BusinessMupTableS = $("#BusinessMupTableS").val();
	var regionMupTableS = $("#regionMupTableS").val();
	var segmentMupTableS = $("#segmentMupTableS").val();
	var mupCategoryTableS = $("#mupCategoryTableS").val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (BusinessMupTableS != "" && BusinessMupTableS != null) {
		fieldFilters.fieldFilters["bId"] = BusinessMupTableS;
	}
	if (regionMupTableS != "" && regionMupTableS != null) {
		fieldFilters.fieldFilters["region"] = regionMupTableS;
	}
	if (segmentMupTableS != "" && segmentMupTableS != null) {
		fieldFilters.fieldFilters["metalSegment"] = segmentMupTableS;
	}
	if (mupCategoryTableS != "" && mupCategoryTableS != null) {
		fieldFilters.fieldFilters["mupcategory"] = mupCategoryTableS;
	}

	return fieldFilters;

}
// Search form
$('#mupTableSearch').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"segmentMupTableS" : {
			required : true
		},
		"mupCategoryTableS" : {
			required : true
		}
	},
	submitHandler : function(form) {
		mupTableGrid();
		$('#jqxgrid').show();

		return false;
	}
});

$("#createMupTable").on(
		"click",
		function() {
			$('#businessMupTableC').empty().append(
					'<option value="" selected>--Select--</option>');
			$('#metalSegmentMupTableC').empty().append(
					'<option value="" selected>--Select--</option>');
			
			$('#skinPurityMupTableC').empty().append(
					'<option value="" selected>--Select--</option>');
			$.getJSON('/OrderExecution/api/v1/getMupTableLOV', function(data) {

				$.each(data.payload.business, function(key, val) {
					$('#businessMupTableC').append(
							'<option value="' + val.id + '" >' + val.name
									+ '</option>');
				});
				$.each(data.payload.METAL_SEGMENT_LOV, function(key, val) {
					$('#metalSegmentMupTableC').append(
							'<option value="' + val.id + '" >'
									+ val.description + '</option>');
				});
				/*$.each(data.payload.rList, function(key, val) {
					$('#regionMupTableC').append(
							'<option value="' + val.id + '" >' + val.name
									+ '</option>');
				});*/
				
			});
			$('#jqxgrideD').hide();
		});

$("#businessMupTableC").on("change",function(){
	$('#regionMupTableC').empty().append('<option value="" selected>--Select--</option>');
	var id = $("#businessMupTableC").val();
	$.getJSON('/OrderExecution/api/v1/getRegion?bId='+id, function(data) {
		$.each(data.payload.Regions, function(key, val) {
			$('#regionMupTableC').append('<option value="' + val.id + '" >' + val.name + '</option>');
		});
	});
});
$("#metalSegmentMupTableC").on("change",function() {
	
			$('#CategoryMupTableC').empty().append(
					'<option value="" selected>--Select--</option>');
			$('#skinPurityMupTableC').empty().append(
			'<option value="" selected>--Select--</option>');
			var id = $("#metalSegmentMupTableC").val();
			
		
		 	if (id != "") {
		 		
		 		$.getJSON('/OrderExecution/api/v1/getMupSkinPurityLov?metalId='+id, function(data) {
		 			console.log(data);
		 			
		 				$.each(data.payload.METAL_SEGMENT_LOV, function(key, val) {
		 					$('#skinPurityMupTableC').append(
		 							'<option value="' + val.skinPurity + '">' + val.skinPurity
		 									+ '</option>');
		 				});			
		 			});
	
		$.getJSON('/OrderExecution/api/v1/getMupcategoryLOV?segment='+id, function(data) {
			$.each(data.payload.muptype, function(key, val) {
				
				$('#CategoryMupTableC').append(
						'<option value="' + val.id + '">' +val.code +"-"+ val.description
								+ '</option>');
			});
		});
		 	}
		});

// Create Grid
function mupTableCreation(data, dataBusinessId) {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'business',
		'type' : 'string',
		'map' : 'bussinessname'
	}, {
		'name' : 'regionName',
		'type' : 'string',
		'map' : 'region>name'
	}, {
		'name' : 'regionId',
		'type' : 'int',
		'map' : 'region>id'
	}, {
		'name' : 'segment',
		'type' : 'string',
		'map' : 'metalSegment>description'
	}, {
		'name' : 'segmentId',
		'type' : 'int',
		'map' : 'metalSegment>id'
	}, {
		'name' : 'segmentCode',
		'type' : 'string',
		'map' : 'metalSegment>code'
	}, {
		'name' : 'skinPurity',
		'type' : 'string'
	}, {
		'name' : 'mupCategory',
		'type' : 'string',
		'map' : 'mupType>description'
	}, {
		'name' : 'mupId',
		'type' : 'int',
		'map' : 'mupType>id'
	}, {
		'name' : 'baseMetalRate',
		'type' : 'int',
		'map' : 'baseMetalrate'
	}, {
		'name' : 'fromRange',
		'type' : 'float',
		'map' : 'fromWeight'
	}, {
		'name' : 'toRange',
		'type' : 'float',
		'map' : 'toWeight'
	}, {
		'name' : 'metalPurity',
		'type' : 'string'
	}, {
		'name' : 'metalPurityMarkup',
		'type' : 'float',
		 'map' : 'metalMarkuprate'
	}, {
		'name' : 'metalSellingRate',
		'type' : 'float',
		'map' : 'sellingRateForPurity'
	}, {
		'name' : 'mcApportion',
		'type' : 'float',
		'map' : 'mcApprotionPercentage'
	}, {
		'name' : 'wastageApportion',
		'type' : 'float',
		'map' : 'mcWastagePercentage'
	}, {
		'name' : 'MUP_1',
		'type' : 'float'
	}, {
		'name' : 'MUP_2',
		'type' : 'float'
	}, {
		'name' : 'MUP_3',
		'type' : 'float'
	}, {
		'name' : 'MUP_4',
		'type' : 'float'
	}, {
		'name' : 'MUP_5',
		'type' : 'float'
	}, {
		'name' : 'MUP_6',
		'type' : 'float'
	}, {
		'name' : 'MUP_7',
		'type' : 'float'
	}, {
		'name' : 'MUP_8',
		'type' : 'float'
	}, {
		'name' : 'MUP_9',
		'type' : 'float'
	}, {
		'name' : 'MUP_10',
		'type' : 'float'
	}, {
		'name' : 'MUP_11',
		'type' : 'float'
	}, {
		'name' : 'MUP_12',
		'type' : 'float'
	}, {
		'name' : 'MUP_13',
		'type' : 'float'
	}, {
		'name' : 'MUP_14',
		'type' : 'float'
	}, {
		'name' : 'MUP_15',
		'type' : 'float'
	}, {
		'name' : 'MUP_16',
		'type' : 'float'
	}, {
		'name' : 'MUP_17',
		'type' : 'float'
	}, {
		'name' : 'MUP_18',
		'type' : 'float'
	}, {
		'name' : 'MUP_19',
		'type' : 'float'
	}, {
		'name' : 'MUP_20',
		'type' : 'float'
	}, {
		'name' : 'WeightRange',
		'type' : 'id'
	} ];

	var columns = [
			{
				'text' : 'Business',
				'datafield' : 'business',
				cellsalign : 'center',
				align : 'center',
				'width' : '10%',
				sortable : true,
				editable : false
			},
			{
				'text' : 'Region',
				'datafield' : 'regionName',
				cellsalign : 'center',
				align : 'center',
				'width' : '6%',
				sortable : true,
				editable : false
			},
			{
				'text' : 'Metal Seg Name',
				'datafield' : 'segment',
				'width' : '6%',
				cellsalign : 'center',
				align : 'center',
				sortable : true,
				editable : false
			},
			{
				'text' : 'Mup Category',
				'datafield' : 'mupCategory',
				'width' : '10%',
				cellsalign : 'center',
				align : 'center',
				sortable : true,
				editable : false
			},
			{
				'text' : '  Skin Purity',
				'datafield' : 'skinPurity',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				sortable : true,
				editable : false
			},
			{
				'text' : '  Base Metal Rate',
				'datafield' : 'baseMetalRate',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				sortable : true,
				editable : false
			},
			{
				'text' : 'Metal Rate for Purity',
				'datafield' : 'metalPurity',
				'width' : '7%',
				cellsalign : 'right',
				align : 'center',
				sortable : true,
				cellsrenderer : true,
				editable : false,
				cellsformat : 'd2',
				cellsrenderer : function(index, datafield, value, defaultvalue,
						column, rowdata) {
					var total = (rowdata.baseMetalRate * rowdata.skinPurity) / 99.9;

					return '<div style="text-align: center; margin-top: 5px;">' + total.toFixed(2)
							+ '</div>';
				}
			}, {
				'text' : 'Metal Rate Mark UP',
				'datafield' : 'metalPurityMarkup',
				'width' : '7%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				sortable : true,
				editable : false
			}, {
				'text' : 'Metal Selling Rate For Purity',
				'datafield' : 'metalSellingRate',
				'width' : '8%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				sortable : true,
				editable : false
			}, {
				'text' : 'MC Apportion %',
				'datafield' : 'mcApportion',
				'width' : '7%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				sortable : true,
				editable : false
			}, {
				'text' : 'Wastage Apportion % ',
				'datafield' : 'wastageApportion',
				'width' : '7%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				sortable : true,
				editable : false
			}, {
				'text' : 'From ',
				'datafield' : 'fromRange',
				'width' : '7%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd3',
				sortable : true,
				columngroup : "ad",
				editable : false
			}, {
				'text' : 'To ',
				'datafield' : 'toRange',
				'width' : '7%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd3',
				sortable : true,
				columngroup : "ad",
				editable : false
			}, {
				'text' : 'MUP_1 ',
				'datafield' : 'MUP_1',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : 'MUP_2',
				'datafield' : 'MUP_2',
				'width' : '6%',
				cellsformat : 'd2',
				formatoptions : 'number',
				cellsalign : 'right',
				align : 'center',

				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_3',
				'datafield' : 'MUP_3',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_4',
				'datafield' : 'MUP_4',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_5',
				'datafield' : 'MUP_5',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_6',
				'datafield' : 'MUP_6',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_7',
				'datafield' : 'MUP_7',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_8',
				'datafield' : 'MUP_8',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_9',
				'datafield' : 'MUP_9',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_10',
				'datafield' : 'MUP_10',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_11',
				'datafield' : 'MUP_11',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_12',
				'datafield' : 'MUP_12',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_13',
				'datafield' : 'MUP_13',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_14',
				'datafield' : 'MUP_14',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_15',
				'datafield' : 'MUP_15',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_16',
				'datafield' : 'MUP_16',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_17',
				'datafield' : 'MUP_17',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_18',
				'datafield' : 'MUP_18',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_19',
				'datafield' : 'MUP_19',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			}, {
				'text' : ' MUP_20',
				'datafield' : 'MUP_20',
				'width' : '6%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd2',
				formatoptions : 'number',
				sortable : true,
				editable : true
			} ];

	addGrid(datafields, columns, updateRows, data, "", "#jqxgrideD");
	$("#jqxgrideD").jqxGrid({
	 	theme: 'energyblue',
		columngroups : [ {
			text : 'Weight Range',
			name : 'ad',
			align : 'center'
		} ]
	});

}

var mupTableCreationFilter = function() {
	var businessMupTableC = $("#businessMupTableC").val();
	var regionMupTableC = $("#regionMupTableC").val();
	var metalSegmentMupTableC = $("#metalSegmentMupTableC").val();
	var CategoryMupTableC = $("#CategoryMupTableC").val();
	var skinPurityMupTableC = $("#skinPurityMupTableC").val();
	var metalpurityid = $("#skinPurityMupTableC option:selected").attr('ids');
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (businessMupTableC != "" && businessMupTableC != null) {
		fieldFilters.fieldFilters["bId"] = businessMupTableC;
	}
	if (regionMupTableC != "" && regionMupTableC != null) {
		fieldFilters.fieldFilters["region"] = regionMupTableC;
	}
	if (metalSegmentMupTableC != "" && metalSegmentMupTableC != null) {
		fieldFilters.fieldFilters["metalSegment"] = metalSegmentMupTableC;
	}
	if (CategoryMupTableC != "" && CategoryMupTableC != null) {
		fieldFilters.fieldFilters["mupcategory"] = CategoryMupTableC;
	}
	if (skinPurityMupTableC != "" && skinPurityMupTableC != null) {
		fieldFilters.fieldFilters["skinpurity"] = skinPurityMupTableC;
	}
	if (metalpurityid != "" && metalpurityid != null) {
		fieldFilters.fieldFilters["metalpurityid"] = metalpurityid;
	}

	return fieldFilters;

}

$("#createFooterMupTable").hide();


var mupTableCreatAddBtn1 = function()
{

	$("#jqxgrideD").hide();
// on change of skin purity the API is called

					postJSON('/OrderExecution/api/v1/searchMcConfig?page=create',
							JSON.stringify(mupTableCreationFilter()),
							function(data) {
								var createData = data.payload.mupCategory;
								if (createData == null) {
									$.growl.error({
										message : data.mesgStr,
										duration : 10000,

									});

								} else {
									var skinPurity = $("#skinPurityMupTableC")
											.val();
									$("#baseMetalrateMupTableC").val(
											createData.baseMetalRate);
									$("#sellingRateforPurityTableC").val(
											createData.metalRateForPurity);
									$("#mcApprotionTableC").val(
											createData.mcApportionPercentage);
									$("#wastageApprotionTableC")
											.val(
													createData.wastageApportionPercentage);
									$("#metalRateMarkUpTableC").val(createData.markuprate);
									var metalPurityRate = (createData.baseMetalRate * skinPurity) / 99.9;
									$("#MetalCostForPurityMupTableC").val(
											metalPurityRate.toFixed(2));
									$('#jqxgrideD').show();
									mupTableCreation(data.payload.weightRange);
									$("#createFooterMupTable").show();
								}
							});
				
};

$("#saveMupTable").on(
		"click",
		function() {
			var rows = $('#jqxgrideD').jqxGrid('getrows');
			var rowArry = [];

			for (var i = 0; i < rows.length; i++) {
				if (rows[i].MUP_1 == "" || rows[i].MUP_2 == ""
						|| rows[i].MUP_3 == "" || rows[i].MUP_4 == ""
						|| rows[i].MUP_5 == "" || rows[i].MUP_6 == ""
						|| rows[i].MUP_7 == "" || rows[i].MUP_8 == ""
						|| rows[i].MUP_9 == "" || rows[i].MUP_10 == ""
						|| rows[i].MUP_11 == "" || rows[i].MUP_12 == ""
						|| rows[i].MUP_13 == "" || rows[i].MUP_14 == ""
						|| rows[i].MUP_15 == "" || rows[i].MUP_16 == ""
						|| rows[i].MUP_17 == "" || rows[i].MUP_18 == ""
						|| rows[i].MUP_19 == "" || rows[i].MUP_20 == "") {
					$.growl.error({
						message : "Please fill the All gride values",
						duration : 10000
					});
					return false;
				}
				var row = rows[i];
				rowArry.push({
					"fromWeight" : row.fromRange,
					"toWeight" : row.toRange,
					"mup1" : row.MUP_1,
					"mup2" : row.MUP_2,
					"mup3" : row.MUP_3,
					"mup4" : row.MUP_4,
					"mup5" : row.MUP_5,
					"mup6" : row.MUP_6,
					"mup7" : row.MUP_7,
					"mup8" : row.MUP_8,
					"mup9" : row.MUP_9,
					"mup10" : row.MUP_10,
					"mup11" : row.MUP_11,
					"mup12" : row.MUP_12,
					"mup13" : row.MUP_13,
					"mup14" : row.MUP_14,
					"mup15" : row.MUP_15,
					"mup16" : row.MUP_16,
					"mup17" : row.MUP_17,
					"mup18" : row.MUP_18,
					"mup19" : row.MUP_19,
					"mup20" : row.MUP_20,
					"region" : {
						"id" : row.regionId,
						"name" : row.regionName,
						"business" : {
							"id" : "1",
							"name" : row.business
						}
					},
					"metalSegment" : {
						"id" : row.segmentId,
						"code" : row.segmentCode,
						"description" : row.segment
					},
					"mupType" : {
						"id" : row.mupId,
						"description" : row.mupCategory
					}

				});

			}
			postJSON('/OrderExecution/api/v1/createMupTable', JSON
					.stringify(rowArry), function(response) {
				if ("1" == response.resCode) {
					$.growl.notice({
						message : response.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$("#createMupType").modal('hide');
				} else {
					$.growl.error({
						message : response.mesgStr,
						duration : 10000
					});

				}
			});

		});

function mupTableEdit(data) {
	console.log(data);
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' : 'Business',
		'type' : 'string',
		'map' : 'bussinessname'
	}, {
		'name' : 'regionName',
		'type' : 'string',
		'map' : 'region>name'
	}, {
		'name' : 'regionId',
		'type' : 'int',
		'map' : 'region>id'
	}, {
		'name' : 'Segment',
		'type' : 'string',
		'map' : 'metalSegment>description'
	}, {
		'name' : 'metalSegmentId',
		'type' : 'id',
		'map' : 'metalSegment>id'
	}, {
		'name' : 'metalSegmentCode',
		'type' : 'id',
		'map' : 'metalSegment>code'
	}, {
		'name' : 'skinPurity',
		'type' : 'string',
		'map' : 'skinPurity'
	}, {
		'name' : 'mupCategory',
		'type' : 'string',
		'map' : 'mupType>description'
	}, {
		'name' : 'mupId',
		'type' : 'int',
		'map' : 'mupType>id'
	}, {
		'name' : 'baseMetalRate',
		'type' : 'float',
		'map' : 'baseMetalrate'
	}, {
		'name' : 'fromRange',
		'type' : 'float',
		'map' : 'fromWeight'
	}, {
		'name' : 'toRange',
		'type' : 'float',
		'map' : 'toWeight'
	}, {
		'name' : 'metalPurity',
		'type' : 'float'

	}, {
		'name' : 'metalPurityMarkup',
		'type' : 'float',
		'map' : 'metalMarkuprate'
	}, {
		'name' : 'metalSellRatePurity',
		'type' : 'float',
		'map' : 'metalSellRatePurity'
	}, {
		'name' : 'mcApportion',
		'type' : 'float',
		'map' : 'mcApprotionPercentage'
	}, {
		'name' : 'wastageApportion',
		'type' : 'float',
		'map' : 'mcWastagePercentage'
	}, {
		'name' : 'MUP_1',
		'type' : 'float',
		'map' : 'mup1'
	}, {
		'name' : 'MUP_2',
		'type' : 'float',
		'map' : 'mup2'
			
	}, {
		'name' : 'MUP_3',
		'type' : 'float',
		'map' : 'mup3'
	}, {
		'name' : 'MUP_4',
		'type' : 'float',
		'map' : 'mup4'
	}, {
		'name' : 'MUP_5',
		'type' : 'float',
		'map' : 'mup5'
	}, {
		'name' : 'MUP_6',
		'type' : 'float',
		'map' : 'mup6'
	}, {
		'name' : 'MUP_7',
		'type' : 'float',
		'map' : 'mup7'
	}, {
		'name' : 'MUP_8',
		'type' : 'float',
		'map' : 'mup8'
	}, {
		'name' : 'MUP_9',
		'type' : 'float',
		'map' : 'mup9'
	}, {
		'name' : 'MUP_10',
		'type' : 'float',
		'map' : 'mup10'
	}, {
		'name' : 'MUP_11',
		'type' : 'float',
		'map' : 'mup11'
	}, {
		'name' : 'MUP_12',
		'type' : 'float',
		'map' : 'mup12'
	}, {
		'name' : 'MUP_13',
		'type' : 'float',
		'map' : 'mup13'
	}, {
		'name' : 'MUP_14',
		'type' : 'float',
		'map' : 'mup14'
	}, {
		'name' : 'MUP_15',
		'type' : 'float',
		'map' : 'mup15'
	}, {
		'name' : 'MUP_16',
		'type' : 'float',
		'map' : 'mup16'
	}, {
		'name' : 'MUP_17',
		'type' : 'float',
		'map' : 'mup17'
	}, {
		'name' : 'MUP_18',
		'type' : 'float',
		'map' : 'mup18'
	}, {
		'name' : 'MUP_19',
		'type' : 'float',
		'map' : 'mup19'
	}, {
		'name' : 'MUP_20',
		'type' : 'float',
		'map' : 'mup20'
	}, {
		'name' : 'WeightRange',
		'type' : 'id'
	}, {
		'name' : 'rowId',
		'type' : 'int',
		'map' : 'id'
	}];

	var columns = [ {
		'text' : 'Business',
		'datafield' : 'Business',
		cellsalign : 'center',
		align : 'center',
		'width' : '10%',
		columntype : 'numberinput',
		sortable : true,
		editable : false
	}, {
		'text' : 'Region',
		'datafield' : 'regionName',
		cellsalign : 'center',
		align : 'center',
		'width' : '6%',
		sortable : true,
		editable : false
	}, {
		'text' : 'Metal Seg Name',
		'datafield' : 'Segment',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : ' MUP Cat',
		'datafield' : 'mupCategory',
		'width' : '6%',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : '  Skin Purity',
		'datafield' : 'skinPurity',
		'width' : '5%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		sortable : true,
		editable : false
	}, {
		'text' : '  Base Metal Rate',
		'datafield' : 'baseMetalRate',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : false

	}, {
		'text' : 'Metal Rate for Purity',
		'datafield' : 'metalPurity',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		sortable : true,
		editable : false,
		cellsformat : 'd2',
		cellsrenderer : function(index, datafield, value, defaultvalue,
				column, rowdata) {
			var total = (rowdata.baseMetalRate * rowdata.skinPurity) / 99.9;

			return '<div style="text-align: center; margin-top: 5px;">' + total.toFixed(2)
					+ '</div>';
		}
	}, {
		'text' : 'Metal Rate Mark UP',
		'datafield' : 'metalPurityMarkup',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		sortable : true,
		editable : false
	}, {
		'text' : 'Metal Selling Rate For Purity',
		'datafield' : 'metalSellRatePurity',
		'width' : '8%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		sortable : true,
		editable : false
	}, {
		'text' : 'MC Apportion %',
		'datafield' : 'mcApportion',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		sortable : true,
		editable : false
	}, {
		'text' : 'Wastage Apportion % ',
		'datafield' : 'wastageApportion',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		sortable : true,
		editable : false
	}, {
		'text' : 'From ',
		'datafield' : 'fromRange',
		'width' : '5%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		sortable : true,
		columngroup : "ad",
		editable : false
	}, {
		'text' : 'To ',
		'datafield' : 'toRange',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		sortable : true,
		columngroup : "ad",
		editable : false
	}, {
		'text' : 'MUP_1 ',
		'datafield' : 'MUP_1',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : 'MUP_2',
		'datafield' : 'MUP_2',
		'width' : '6%',
		cellsformat : 'd2',
		formatoptions : 'number',
		cellsalign : 'right',
		align : 'center',

		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_3',
		'datafield' : 'MUP_3',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_4',
		'datafield' : 'MUP_4',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_5',
		'datafield' : 'MUP_5',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_6',
		'datafield' : 'MUP_6',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_7',
		'datafield' : 'MUP_7',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_8',
		'datafield' : 'MUP_8',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_9',
		'datafield' : 'MUP_9',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_10',
		'datafield' : 'MUP_10',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_11',
		'datafield' : 'MUP_11',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_12',
		'datafield' : 'MUP_12',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_13',
		'datafield' : 'MUP_13',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_14',
		'datafield' : 'MUP_14',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_15',
		'datafield' : 'MUP_15',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_16',
		'datafield' : 'MUP_16',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_17',
		'datafield' : 'MUP_17',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_18',
		'datafield' : 'MUP_18',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_19',
		'datafield' : 'MUP_19',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	}, {
		'text' : ' MUP_20',
		'datafield' : 'MUP_20',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		formatoptions : 'number',
		sortable : true,
		editable : true
	} ];

	addGrid(datafields, columns, updateRows, data, "", "#jqxgride");
	$("#jqxgride").jqxGrid({
		theme: 'energyblue',
		columngroups : [ {
			text : 'Weight Range',
			name : 'ad',
			align : 'center'
		} ]
	});
}
$("#saveMupTableEdit").on(
		"click",
		function() {
			var rows = $('#jqxgride').jqxGrid('getrows');
			var rowArry = [];
			for (var i = 0; i < rows.length; i++) {

				if (rows[i].MUP_1 == "" || rows[i].MUP_2 == ""
						|| rows[i].MUP_3 == "" || rows[i].MUP_4 == ""
						|| rows[i].MUP_5 == "" || rows[i].MUP_6 == ""
						|| rows[i].MUP_7 == "" || rows[i].MUP_8 == ""
						|| rows[i].MUP_9 == "" || rows[i].MUP_10 == ""
						|| rows[i].MUP_11 == "" || rows[i].MUP_12 == ""
						|| rows[i].MUP_13 == "" || rows[i].MUP_14 == ""
						|| rows[i].MUP_15 == "" || rows[i].MUP_16 == ""
						|| rows[i].MUP_17 == "" || rows[i].MUP_18 == ""
						|| rows[i].MUP_19 == "" || rows[i].MUP_20 == "") {
					$.growl.error({
						message : "Please fill the All gride values ",
						duration : 10000
					});
					return false;
					}

				var row = rows[i];
		console.log(row.rowId);
				rowArry.push({
					"fromWeight" : row.fromRange,
					"toWeight" : row.toRange,
					"id": row.rowId,
					"mup1" : row.MUP_1,
					"mup2" : row.MUP_2,
					"mup3" : row.MUP_3,
					"mup4" : row.MUP_4,
					"mup5" : row.MUP_5,
					"mup6" : row.MUP_6,
					"mup7" : row.MUP_7,
					"mup8" : row.MUP_8,
					"mup9" : row.MUP_9,
					"mup10" : row.MUP_10,
					"mup11" : row.MUP_11,
					"mup12" : row.MUP_12,
					"mup13" : row.MUP_13,
					"mup14" : row.MUP_14,
					"mup15" : row.MUP_15,
					"mup16" : row.MUP_16,
					"mup17" : row.MUP_17,
					"mup18" : row.MUP_18,
					"mup19" : row.MUP_19,
					"mup20" : row.MUP_20,
					"region" : {
						"id" : row.regionId,
						"name" : row.regionName,
						"business" : {
							"id" : "1",
							"name" : ""
						}
					},
					"metalSegment" : {
						"id" : row.metalSegmentId,
						"code" : row.metalSegmentCode,
						"description" : row.Segment
					},
					"mupType" : {
						"id" : row.mupId,
						"description" : row.mupCategory
					}
				});
			}
			postJSON('/OrderExecution/api/v1/updateMupTable', JSON
					.stringify(rowArry), function(response) {
				if (response.resCode == 1) {
					$.growl.notice({
						message : response.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#editMupTable').modal('hide');
				} else {
					$.growl.error({
						message : response.mesgSt,
						duration : 10000,
						title : 'Error'
					});
				}

			});
		});

function validateNumber(val) {
	var regex = /^\d{0,6}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}
function validateNumberPerc(val) {
	var regex = /^\d{0,2}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

$('#mupTableCreation').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"businessMupTableC" : {
			required : true
		},
		"regionMupTableC" : {
			required : true
		},
		"metalSegmentMupTableC" : {
			required : true
		},
		"CategoryMupTableC" : {
			required : true
		},
		"skinPurityMupTableC" : {
			required : true
		},
		"baseMetalrateMupTableC" : {
			required : true
		},
		"MetalCostForPurityMupTableC" : {
			required : true
		},
		"metalRateMarkUpTableC" : {
			required : true
		},
		"sellingRateforPurityTableC" : {
			required : true
		},
		"mcApprotionTableC" : {
			required : true
		},
		"wastageApprotionTableC" : {
			required : true
		}
	},
	submitHandler : function(form) {
		mupTableCreatAddBtn1();

		return false;
	}
});
$('.modal').on('hidden.bs.modal', function() {
	$(this).find('form')[0].reset();
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});

});

$("#exportMupTable").on('click', function(){
	var newData = [];
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	postJSON('/OrderExecution/api/v1/mcConfigListing?page=export', JSON.stringify(mupTableSearchFilters()),function(response){
		var data = response.payload.list;
	     for (i = 0; i < data.length; i++) {
		     newData.push({
	            'Business ' : (data[i].businessName != null) ? data[i].businessName : "",
			    'Region' : (data[i].region != null) ? data[i].region.name : "",
				'Segment' : (data[i].metalSegment!= null) ? data[i].metalSegment.description : "",
				'Mup Category' : (data[i].mupType != null) ? data[i].mupType.description : "",
				'Skin Purity' : (data[i].skinPurity != null) ? data[i].skinPurity : ""
		   });
	     }
	     var opts = [{sheetid:'Mup_Table_',header:true}];
         var res = alasql('SELECT * INTO XLSX("Mup_Table_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
	});
});