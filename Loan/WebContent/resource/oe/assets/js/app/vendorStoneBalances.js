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
		if( val == "search" || val == "Search"){
			if(permission.canSearch == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}  
		
		if(val=="Create" || val=="create"){
			if(permission.canAdd == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if( val == "export" || val == "Export"){
			if(permission.canExport == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "print" || val == "Print"){
			if(permission.canPrint == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "delete" || val == "Delete"){
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

$("#fromDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0,
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#toDate").datepicker('option', 'minDate', min || '0'); 
	}
});
$("#toDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0
});

$.date = function(dateObject) {
	var d = new Date(dateObject);
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}
	var date = day + "/" + month + "/" + year;

	return date;
};

// Vendor Stone Search listing filed Filter
var vendorFieldFiltersVal = function() {
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var dc = $("#dcName").val();
	var vendorCode = $('#vendorCode-value').val();
	var stoneCategory = $('#stoneCategory').val();
	var stoneSegment = $('#stoneSegment').val();
	var subCategory = $('#subCategory').val();
	var dcName = $('#dcName').val();
	var stSegm = $("#stoneSegment option:selected").attr('idZ');
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (dc != "" && dc != null) {
		fieldFilters.fieldFilters["dc"] = dc;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendor"] = vendorCode;
	}
	if (stoneCategory != "" && stoneCategory != null) {
		fieldFilters.fieldFilters["stoneCategory"] = stoneCategory;
	}

	if (stSegm == "DI") {
		if (subCategory != "" && subCategory != null) {
			fieldFilters.fieldFilters["shapeId"] = subCategory;
		}
	} else {
		if (subCategory != "" && subCategory != null) {
			fieldFilters.fieldFilters["subCategory"] = subCategory;
		}
	}
	if (stoneSegment != "" && stoneSegment != null) {
		fieldFilters.fieldFilters["segment"] = stoneSegment;
	}
	
	return fieldFilters;
}

var cellsrenderer = function(row, column, value) {
	return '<div style="text-align: centerS; margin-top: 5px;">' + value
			+ '</div>';
}
var columnsrenderer = function(value) {
	return '<div style="text-align: center; margin-top: 5px;">' + value
			+ '</div>';
}
var viewStone = function(row, column, value) {
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewVendorBalance"  type="button" id='
			+ row
			+ ' onclick="viewStoneBalance('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>'
}

// Search Grid for Vendor Stone Balance is started.
function vendorStoneBalanceGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'vendorCodeN',
		'type' : 'string',
		'map' : 'vendor>vendorName'
	}, {
		'name' : 'stoneSegment',
		'type' : 'string',
		'map' : 'segment>description'
	}, {
		'name' : 'stoneCategoryN',
		'type' : 'string',
		'map' : 'category>description'
	}, {
		'name' : 'subcategoryN',
		'type' : 'string',
		'map' : 'subcategory>description'
	}, {
		'name' : 'shapeN',
		'type' : 'string',
		'map' : 'shape'
	}, {
		'name' : 'bulkOrPcsN',
		'type' : 'string',
		'map' : 'psrBulkFlag'
	}, {
		'name' : 'clarityN',
		'type' : 'string',
		'map' : 'clarity'
	}, {
		'name' : 'color',
		'type' : 'string'
	}, {
		'name' : 'cutGradeN',
		'type' : 'string',
		'map' : 'cutGrade'
	}, {
		'name' : 'accountDate',
		'type' : 'date',
		'map' : 'createdDate'
	}, {
		'name' : 'stoneOpenweight',
		'type' : 'double',
		'map' : 'openingWeight'
	}, {
		'name' : 'slab',
		'type' : 'string',
		'map' : 'weightRange'
	}, {
		'name' : 'openingPcs',
		'type' : 'int',
		'map' : 'openingPieces'
	}, {
		'name' : 'stonereciptWeight',
		'type' : 'double'
	}, {
		'name' : 'reciptPices',
		'type' : 'int'
	}, {
		'name' : 'stoneIssueWeight',
		'type' : 'double'
	}, {
		'name' : 'stoneIssuePices',
		'type' : 'int'
	}, {
		'name' : 'stoneCloseingWeight',
		'type' : 'double'
	}, {
		'name' : 'stoneCloseingPices',
		'type' : 'double'
	}, {
		'name' : 'uom',
		'type' : 'string',
		'map' : 'uom'
	}, {
		'name' : 'dcName',
		'type' : 'String',
		'map' : 'dc>dcname'
	}, {
		'name' : 'createdBy',
		'type' : 'string',
		'map' : 'createdBy'
	},{
		'name' : 'id',
		'type' : 'int',
	}  ];

	var columns = [ {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCodeN',
		'width' : '10%',
		align : 'center',
		cellsalign : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Stone Seg. ',
		'datafield' : 'stoneSegment',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Stone Cat.',
		'datafield' : 'stoneCategoryN',
		'width' : '12%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Sub Cat. ',
		'datafield' : 'subcategoryN',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Shape',
		'datafield' : 'shapeN',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Clarity',
		'datafield' : 'clarityN',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Color',
		'datafield' : 'color',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Cut Grade',
		'datafield' : 'cutGradeN',
		'width' : '8%',
		cellsalign : 'center',
		sortable : false,
		align : 'center',
		editable : false
	}, {
		'text' : 'Acc. Date',
		'datafield' : 'accountDate',
		'width' : '8%',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		editable : false
	}, {
		'text' : 'Wt. Slab / Cost range',
		'datafield' : 'slab',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'd3',
		sortable : true,
		editable : false
	},{
		'text' : 'Created By',
		'datafield' : 'createdBy',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	},{
		'text' : 'View',
		'datafield' : 'id',
		'width' : '4%',
		cellsrenderer : viewStone,
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}];

	showMyGrid(datafields,"/OrderExecution/api/v1/searchVendorStoneDetails?page=search","list", columns,vendorFieldFiltersVal(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
		sortable : true,
		altrows : true,
		theme: 'energyblue',
		columnsresize : true
	});
}

function stoneViewGrid(data) {
		var source = {
	        localdata: data,
	        datatype: "json",
			datafields : [ 
				{'name' : 'id','type' : 'string','map':'id'},
				{'name' : 'accDate','type' : 'date','map':'accountDate'},
				{'name' : 'psrFlag','type' : 'float','map':'psrFlag'},
				{'name' : 'openPcs','type' : 'float','map':'psrStonePcs'},
				{'name' : 'openWt','type' : 'string','map':'psrStoneBulkOpenWt'}, 
				{'name' : 'issuePcs','type' : 'string','map':'psrbulkStoneIssuePcs'}, 
				{'name' : 'issueWt','type' : 'string','map':'psrBulkIssueWt'},
				{'name' : 'reptPcs','type' : 'string','map':'psrBulkStoneReciptPcs'},
				{'name' : 'reptWt','type' : 'string','map':'psrBulkStoneReciptWt'},
				{'name' : 'closedWt','type' : 'string','map':'psrBulkStoneCloseWt'},
				{'name' : 'closedPcs','type' : 'string','map':'psrBulkStoneClosePcs'},
				{'name' : 'dcId','type' : 'string','map':'dc>dcname'},
			]
		};

		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#jqxgridView").jqxGrid({
			source : dataAdapter,
			width : '100%',
			editable : false,
			columnsheight : 40,
			autoheight : true,
			theme: 'energyblue',
			altRows : true,
			columnsresize : true,
			pageable:true,
			pagesize:5,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				container.append('<i class="fa fa-list fa-md"></i>&nbsp; Item Details');
			},
			columns : [
				{'text' : 'Id','datafield' : 'id','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
				{'text' : 'Account_Date','datafield' : 'accDate','width' : '8%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
				{'text' : 'PSR_BULK_Flag','datafield' : 'psrFlag','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
				{'text' : 'Open Pcs',	'datafield' : 'openPcs','width' : '9%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
				{'text' : 'Open Wt','datafield' : 'openWt',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '8%',cellsformat : 'd3'},
				{'text' : 'Issue Pcs','datafield' : 'issuePcs',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '8%'},
				{'text' : 'Issue Wt','datafield' : 'issueWt','width' : '10%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
				{'text' : 'Receipt Pcs','datafield' : 'reptPcs','width' : '10%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
				{'text' : 'Receipt Wt','datafield' : 'reptWt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd3'},
				{'text' : 'Closed Wt',	'datafield' : 'closedWt','width' : '10%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
				{'text' : 'Closed Pcs','datafield' : 'closedPcs','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
				{'text' : 'DC Id','datafield' : 'dcId',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '9%'},
			]
		});
}

var viewStoneBalance = function(id){
		$.getJSON("/OrderExecution/api/v1/getvendorStoneDetail?vbId="+id,function(data){
			stoneViewGrid(data.payload.detail);
			$("#jqxgridView").show();
		});
}

// Validate Field for Creation of Vendor Stone Balance
var validateVendorStonebalance = function() {

	var vendorCodec = $('#vendorCode-valuec').val();
	var stoneSegmentC = $('#stoneSegmentC').val();
	var stoneCategoryC = $('#stoneCategoryC').val();
	var stoneCode = $('#stoneCode').val();

	if (vendorCodec == "" || stoneSegmentC == "" || stoneCategoryC == "") {
		$.growl.error({
			message : "Fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	return true;
}

var saveVendorStoneBalance = function() {
	var fieldFilters = {};

	var vendorCode = $('#vendorCode-valuec').val();
	var stoneSegmentC = $('#stoneSegmentC').val()
	var stoneCategoryC = $('#stoneCategoryC').val();
	var SubCategoryC = $('#SubCategoryC').val();
	var bulkPsr = $('#bulkPsr').val();
	var clarity = $('#clarity').val();
	
	var stoneOpenweight = 0;
	var stonereciptWeight = 0;
	var stoneIssueWeight = 0;
	var stoneIssuePices = 0;
	var stoneCloseingWeight = 0;
	var stoneCloseingPices = 0;
	var psrBulkFlag = $('input[name=bulkOrPsr]:checked').val();
	var color = $('#colorC').val();
	var cutGrideC = $('#cutGrideC').val();
	var wtRangeC = $('#wtRangeC option:selected').text();
	var costRangeC = $('#costRangeC option:selected').text();
	var Shape = $('#Shape').val();
	var stoneCode = $('#stoneCode').val();
	var stoneCode1 = $('#stoneCodeId').val();
	
	if (stoneCode1 != "" || stoneCode1 != null) {
		fieldFilters["stoneMaster"] = {
			"id" : ($("#stoneSegmentC option:selected").attr('idM') == "DI") ? parseInt(stoneCode1) : parseInt($("#stoneIdC").val())
		};
	}
	
	if (stoneCode != "" || stoneCode != null) {
	fieldFilters["stoneCode"] = stoneCode;
	}
	
	if (vendorCode != "" || vendorCode != null) {
		fieldFilters["vendor"] = {
			"id" : parseInt(vendorCode)
		};
	}
	if (stoneSegmentC != "" || stoneSegmentC != null) {
		fieldFilters["segment"] = {
			"id" : parseInt(stoneSegmentC),
			"code" : $("#stoneSegmentC option:selected").attr('idM'),
			"description" : $("#stoneSegmentC option:selected").text()
		};
	}
	if ($("#stoneSegmentC option:selected").attr('idM') != "DI") {
		if (SubCategoryC != "" || SubCategoryC != null) {
			fieldFilters["subcategory"] = {
				"id" : parseInt(SubCategoryC),
				"code" : $("#SubCategoryC option:selected").attr('idE'),
				"description" : $("#SubCategoryC option:selected").text()
			};
		}
	}
	var subcategoryDesc;
	if($("#stoneSegmentC option:selected").attr('idM') == "DI"){
	    subcategoryDesc = $("#Shape option:selected").text()
	}else{
		subcategoryDesc = $("#SubCategoryC option:selected").text();
	}
	
	fieldFilters["subCategoryDesc"] = subcategoryDesc
	if (stoneCategoryC != "" || stoneCategoryC != null) {
		fieldFilters["category"] = {
			"id" : parseInt(stoneCategoryC),
			"code" : $("#stoneCategoryC option:selected").attr('idC'),
			"description" : $("#stoneCategoryC option:selected").text()
		};
	}
	
	if (clarity != "" || clarity != null) {
		fieldFilters["clarity"] = clarity;
	}

	if (cutGrideC != "" || cutGrideC != null) {
		fieldFilters["cutGrade"] = cutGrideC;
	}

	if ($("#stoneSegmentC option:selected").attr('idM') == "DI") {
		if (wtRangeC != "" || wtRangeC != null) {
			fieldFilters["weightRange"] = wtRangeC;
		}
	}else{
		fieldFilters["costRange"] = costRangeC;
	}

	if ($("#stoneSegmentC option:selected").attr('idM') == "DI") {
		if (Shape != "" || Shape != null) {
			fieldFilters["shape"] = $("#Shape option:selected").text()
		}
	}

	if (color != "" || color != null) {
		fieldFilters["color"] = color;
	}

	fieldFilters["stoneOpenweight"] = stoneOpenweight;

	fieldFilters["stonereciptWeight"] = stonereciptWeight;

	fieldFilters["stoneIssueWeight"] = stoneIssueWeight;

	fieldFilters["stoneIssuePices"] = stoneIssuePices;

	fieldFilters["stoneCloseingWeight"] = stoneCloseingWeight;

	fieldFilters["stoneCloseingPices"] = stoneCloseingPices;

	fieldFilters["psrBulkFlag"] = psrBulkFlag.toString();
	
	if (bulkPsr != "" || bulkPsr != null) {
	fieldFilters["vDetailDTOs"]= [{"psrFlag": psrBulkFlag.toString()}]
	}
	if (stoneSegmentC != "" || stoneSegmentC != null) {
		var segmentVar = $("#stoneSegmentC option:selected").attr('idM');
		if(segmentVar == "DI"){
			fieldFilters["isDiamond"] = true;	
		}else{
			fieldFilters["isDiamond"] = false;
		}
	}
	
	return fieldFilters;
}

// Create and save Vendor Stone Balance
$("#vendorStoneBalanceCreate").on('click',function() {
	trimmer();
					var stSeg = $("#stoneSegmentC option:selected").text();
					var stCat = $("#stoneCategoryC option:selected").text();
					if (stSeg == "Diamond") {
						if ($("#Shape").val() == ""|| $("#Shape").val() == null|| $("#clarity").val() == ""|| $("#clarity").val() == null|| $("#wtRangeC").val() == null
						|| $("#colorC").val() == ""|| $("#colorC").val() == null|| $("#cutGrideC").val() == ""|| $("#cutGrideC").val() == null|| $("#wtRangeC").val() == ""){
							$.growl.error({
								message : "Please Fill Mandatory Fields !!!",
								duration : 1000,
								title : 'Error'
							});
							return false;
						}
					}
					if (stSeg == "Other Stones" || stSeg == "Precious Stones") {
						if ($("#SubCategoryC").val() == ""
								|| $("#SubCategoryC").val() == null) {
							$.growl.error({
								message : "Please Select Sub Category !!!",
								duration : 1000,
								title : 'Error'
							});
							return false;
						}
					}
					if (stCat == "CD Melees" || stCat == "CD Pointers"|| stCat == "CD Solitaire") {
						if ($("#actualColorC").val() == "") {
							$.growl.error({
								message : "Please Select Actual Color !!!",
								duration : 1000,
								title : 'Error'
							});
							return false;
						}
					}
					if (validateVendorDetails()) {
						var vendorStoneBalance = saveVendorStoneBalance();
						if (vendorStoneBalance) {
							postJSON('/OrderExecution/api/v1/createvendorStoneBalance',JSON.stringify(vendorStoneBalance),function(data) {
								if (data.resCode == "1") {
									$.growl.notice({
										message : data.mesgStr,
										duration : 10000,
										title : 'Success'
									});
									$('#createVendorBalance').modal('hide');
									vendorStoneBalanceGrid();
								}else if (data.resCode == "2") {
									$.growl.error({
										message : data.mesgStr,
										duration : 10000,
										title : 'Error'
									});
									return false;
								}else{
									$.growl.error({
										message : data.mesgStr,
										duration : 10000,
										title : 'Error'
									});
									return false;
								}
							});
						}
					}
				});

$.date = function(dateObject) {
	var d = new Date(dateObject);
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}
	var date = day + "/" + month + "/" + year;

	return date;
};

// Export function for Vendor Stone Balance
$("#export")
		.on(
				"click",
				function() {
					$('#createVendorBalance').on('hidden.bs.modal', function() {
						$("form").trigger("reset");
					});
					var data;
					var fromDate = $("#fromDate").val();
					var toDate = $("#toDate").val();
					var dc = $("#dcName").val();
					var vendorCode = $('#vendorCode').val();
					var stoneCategory = $('#stoneCategory').val();
					var stoneSegment = $('#stoneSegment').val();
					var subCategory = $('#subCategory').val();
					fieldFilters = {
						"fieldFilters" : {}
					};

					if (fromDate != "" && fromDate != null) {
						fieldFilters.fieldFilters["fromDate"] = fromDate;
					}
					if (toDate != "" && toDate != null) {
						fieldFilters.fieldFilters["toDate"] = toDate;
					}
					if (dc != "" && dc != null) {
						fieldFilters.fieldFilters["dc"] = dc;
					}
					if (vendorCode != "" && vendorCode != null) {
						fieldFilters.fieldFilters["vendor"] = vendorCode;
					}
					if (stoneCategory != "" && stoneCategory != null) {
						fieldFilters.fieldFilters["stoneCategory"] = stoneCategory;
					}
					if (subCategory != "" && subCategory != null) {
						fieldFilters.fieldFilters["subCategory"] = subCategory;
					}
					if (stoneSegment != "" && stoneSegment != null) {
						fieldFilters.fieldFilters["segment"] = stoneSegment;
					}
					var sysdate = moment().format('DDMMYYYYHHmmSS');
					var rows = $('#jqxgrid').jqxGrid('getrows');
					if (rows == undefined || rows == 0) {
						$.growl.error({
							message : "No Data To Export",
							duration : 10000
						});
						return false;
					} else {
						var rows = $("#jqxgrid").jqxGrid('getdatainformation');
						if (rows.rowscount != 0) {
							var newData = [];
							postJSON(
									'/OrderExecution/api/v1/searchVendorStoneDetails?page=export',
									JSON.stringify(fieldFilters),
									function(response) {
										data = response.payload.list;
										if (response != null) {
											for (i = 0; i < data.length; i++) {
												newData
														.push({
															'Vendor Code' : (data[i].vendor != null) ? data[i].vendor.vendorCode
																	: "",
															'Stone Segment' : (data[i].segment != null) ? data[i].segment.description
																	: "",
															'Stone Category' : (data[i].stoneCategory != null) ? data[i].stoneCategory.description
																	: "",
															'Sub Category' : (data[i].subcategory != null) ? data[i].subcategory.description
																	: "",
															'Shape' : (data[i].shape != null) ? data[i].shape.description
																	: "",
															'Bulk/PSR' : (data[i].psrBulkFlag != null) ? data[i].psrBulkFlag
																	: "",
															'Clarity' : (data[i].clarity != null) ? data[i].clarity.name
																	: "",
															'Color' : (data[i].color != null) ? data[i].color
																	: "",
															'Cut Grade' : (data[i].cutGrade != null) ? data[i].cutGrade.name
																	: "",
															'Accounted Date' : (data[i].createdDate),
															'Wt Slab/Cost Range' : (data[i].slab != null) ? data[i].slab
																	: "",
															'Opening Weight' : (data[i].stoneOpenweight != null) ? data[i].stoneOpenweight
																	: "",
															'Opening Pieces' : (data[i].openPices != null) ? data[i].openPices
																	: "",
															'Receipt Weight' : (data[i].stonereciptWeight) ? data[i].stonereciptWeight
																	: "",
															'Receipt Pieces' : data[i].reciptPices,
															'Issue Weight' : (data[i].stoneIssueWeight != null) ? data[i].stoneIssueWeight
																	: "",
															'Issue Pieces' : (data[i].stoneIssuePices != null) ? data[i].stoneIssuePices
																	: "",
															'Closing Weight' : (data[i].stoneCloseingWeight != null) ? data[i].stoneCloseingWeight
																	: "",
															'Closing Pieces' : (data[i].stoneCloseingPices != null) ? data[i].stoneCloseingPices
																	: "",
															'UOM' : (data[i].uom != null) ? data[i].uom
																	: "",
															'DC Name' : (data[i].dc != null) ? data[i].dc.name
																	: "",
															'Created By' : (data[i].createdBy != null) ? data[i].createdBy
																	: ""

														});
											}
											// JSONToCSVConvertor(newData,
											// "vendorStoneBalance" + "_" +
											// sysdate, true);
											var opts = [ {
												sheetid : 'Vendor_Stone_Balance',
												header : true
											} ];
											var res = alasql(
													'SELECT * INTO XLSX("Vendor Stone Balance_'
															+ sysdate
															+ '.xlsx",?) FROM ?',
													[ opts, [ newData ] ]);
										}
									});
						} else {
							$.growl.error({
								message : "No Data To Export",
								duration : 10000
							});
							return false;
						}
					}

				});

$("#create").on(
		'click',
		function() {
			getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search',
					function(data) {

						if (data.resCode == 1) {

							var createdByC = data.payload.createdBy;
							var createdOnC = data.payload.createdon;
							var accountedDateC = data.payload.createdon;
							$("#createdByC").val(createdByC);
							$("#createdOnC").val(createdOnC);
							$("#accountedDateC").val(accountedDateC);

							vendorList = data.payload.vCodeList;

							var data = [];
							$.each(vendorList, function(key, value) {
								data.push({
									value : value.id,
									label : value.name
								});
							});

							$(function() {
								$("#vendorCodec").autocomplete(
										{

											source : data,
											focus : function(event, ui) {

												event.preventDefault();
												$(this).val(ui.item.label);
											},
											select : function(event, ui) {
												event.preventDefault();
												$(this).val(ui.item.label);
												$("#vendorCode-valuec").val(
														ui.item.value);
											}
										});

							});
						}
						// });
					});
		});

$("#ClearStoneDet").on('click', function() {
	$("#vendorCodec").val("");
	$("#stoneSegmentC").val("");
	$("#stoneCategoryC").val("");
	$("#Shape").val("");
	$("#stoneCode").val("");
	$("#colorC").val("");
	$("#clarity").val("");
	$("#actualColorC").val("");
	$("#cutGrideC").val("");
	$("#wtRangeC").val("");
	$("#uomC").val("");
	$("#SubCategoryC").val("");
	$("#bulkPsr").removeAttr('checked');
});

// Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
