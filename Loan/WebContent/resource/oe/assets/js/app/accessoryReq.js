/*
	##	Author1         : 	Raksha (UI)
	## 	Author2 	    :   Dipankar (UI)
	##	Date Creation 	: 	11-04-2017
	## 	Description		:	Accessory Requirements Master.
 */

// API call for LOV

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

var onLoadAccReq = function() {
	$.getJSON('/OrderExecution/api/v1/stoneRequirementReportLOV ',function(data) {
		var slist = data.payload.STORE_LOV;
		var dclist = data.payload.dcList;
		var vendorCodeS = data.payload.vCodeList;
		var orderType = data.payload.orderTypes;
		// Stores Names

		var s = '<select id="storeNameObj"  name="storeNameObj" class="form-control" multiple="multiple">';
		$.each(slist, function(key, val) {
			s += '<option value="' + val.id + '">' + val.name
					+ '</option>';
		});
		s += '</select>';
		$("#storeNameS").html(s);
		$('#storeNameObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});

		// DC Name

		var d = '<select id="dcNameObj" name="dcNameObj" class="form-control" multiple="multiple">';
		$.each(dclist, function(key, val) {
			d += '<option value="' + val.id + '">' + val.name
					+ '</option>';
		});
		d += '</select>';
		$("#dcNameS").html(d);
		$('#dcNameObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});

		// Order Type

		var o = '<select id="orderTypeObj" name="orderTypeObj" class="form-control" multiple="multiple">';
		$.each(orderType, function(key, val) {
			o += '<option value="' + val.id + '">' + val.name
					+ '</option>';
		});
		o += '</select>';
		$("#orderTypeS").html(o);
		$('#orderTypeObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});

		var v = '<select id="vendorCodeObj" name="vendorCodeObj" class="form-control" multiple="multiple">';
		$.each(vendorCodeS, function(key, val) {
			v += '<option value="' + val.id + '">'
			+ val.vendorCode + '-' + val.vendorName
			+ '</option>';							
		});
		v += '</select>';
		$("#vendorCodeS").html(v);
		$('#vendorCodeObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});

	});

}
onLoadAccReq();

// Field Filters
var accReqMasterFieldFilters = function() {

	fieldFilters = {
		"fieldFilters" : {}
	};

	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var storeNameS = "";
	} else {
		var storeNameS = storeNameObj.join(",");
	}

	var orderTypeObj = $('#orderTypeObj').val();
	if (orderTypeObj == null || orderTypeObj == "") {
		var orderTypeS = "";
	} else {
		var orderTypeS = orderTypeObj.join(",");
	}
	var dcNameObj = $('#dcNameObj').val();
	if (dcNameObj == null || dcNameObj == "") {
		var dcNameS = "";
	} else {
		var dcNameS = dcNameObj.join(",");
	}
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCodeS = "";
	} else {
		var vendorCodeS = vendorCodeObj.join(",");
	}

	if (orderTypeS != "" && orderTypeS != null) {
		fieldFilters.fieldFilters["orderTypes"] = orderTypeS;
	}

	if (dcNameS != "" && dcNameS != null) {
		fieldFilters.fieldFilters["dc"] = dcNameS;
	}
	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["store"] = storeNameS;
	}
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendor"] = vendorCodeS;
	}
	return fieldFilters;
}

/* GRID STARTED ##################################################### */
function accReqGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ {
		'name' : 'storeOrDcName',
		'type' : 'string'
	}, {
		'name' : 'orderType',
		'type' : 'string'
	}, {
		'name' : 'orderNumber',
		'type' : 'int'
	}, {
		'name' : 'orderDate',
		'type' : 'date'
	}, {
		'name' : 'orderDuedate',
		'type' : 'date'
	}, {
		'name' : 'orderItem',
		'type' : 'array'
	} ];

	var columns = [ {
		'text' : 'Store/DC Name ',
		'datafield' : 'storeOrDcName',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		editable:false,
		sortable:false
	}, {
		'text' : 'Order Number',
		'datafield' : 'orderNumber',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		editable:false,
		sortable:true
	}, {
		'text' : 'Order Type',
		'datafield' : 'orderType',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		editable:false,
		sortable:false
	}, {
		'text' : 'Order Date',
		'datafield' : 'orderDate',
		'cellsformat' : 'dd/MM/yyyy',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		editable:false,
		sortable:false
	}, {
		'text' : 'Order Due Date',
		'datafield' : 'orderDuedate',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		'cellsformat' : 'dd/MM/yyyy',
		editable:false,
		sortable:false

	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/accessoryRequirementList",
			"list", columns, accReqMasterFieldFilters(), updateRows,
			"orderType");

	var initrowdetails = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.orderItem;
		var inlineSource = {
			datafields : [ {
				'name' : 'serialNumber',
				'type' : 'long'
			}, {
				'name' : 'orderKind',
				'type' : 'String',
				'map' : 'oKind>name'
			}, {
				'name' : 'segment',
				'type' : 'string',
				'map' : 'segId>description'
			}, {
				'name' : 'jewelType',
				'map' : 'jewelType>description',
				'type' : 'string'
			}, {
				'name' : 'vendor',
				'map' : 'vendor>name',
				'type' : 'long'
			}, {
				'name' : 'salesExecutive',
				'map' : 'salesExecutive>name',
				'type' : 'string'
			}, {
				'name' : 'designReq',
				'map' : 'design>designRequired',
				'type' : 'string'
			}, {
				'name' : 'designStatus',
				'map' : 'design>designStatus>name',
				'type' : 'string'
			},{
				'name' : 'orderItemDueDate',
				'type' : 'date'
			}, {
				'name' : 'accessories',
				'type' : 'array'
			} ],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};

		if (data.length != 0) {

			grid
					.jqxGrid({
						source : inlineSource,
						width : "100%",
						height : 150,
						enabletooltips : true,
						columnsresize : true,
						rowdetails : true,
						sortable : true,
						pageable : 'true',
						rowsheight : 35,
						theme: 'energyblue',
						rowdetailstemplate : {
							rowdetails : "<div id='grid' style='margin-bottom: 40px; margin-top: 10px;'></div>",
							rowdetailsheight : 250,
							rowdetailshidden : true
						},
						initrowdetails : initrowdetails3,
						columns : [ {
							text : 'Order Sl',
							datafield : 'serialNumber',
							width : '10%',
							cellsalign : 'center',
							sortable : true,
							align : 'center'
						}, {
							text : 'Order Kind',
							datafield : 'orderKind',
							width : '15%',
							cellsalign : 'center',
							sortable : true,
							align : 'center'
						}, {
							text : 'Segment',
							datafield : 'segment',
							width : '6%',
							cellsalign : 'center',
							sortable : true,
							align : 'center'
						}, {
							text : 'Jewel Type',
							datafield : 'jewelType',
							width : '10%',
							cellsalign : 'center',
							sortable : true,
							align : 'center'
						}, {
							text : 'Vendor Code',
							datafield : 'vendor',
							width : '12%',
							cellsalign : 'center',
							sortable : true,
							align : 'center'
						}, {
							text : 'Sales Executive',
							datafield : 'salesExecutive',
							width : '12%',
							cellsalign : 'center',
							sortable : true,
							align : 'center'
						}, {
							text : 'Design  Req Y/N',
							datafield : 'designReq',
							width : '11%',
							cellsalign : 'center',
							sortable : true,
							align : 'center'
						}, {
							text : 'Design Status',
							datafield : 'designStatus',
							width : '9%',
							cellsalign : 'center',
							sortable : true,
							align : 'center'
						},{
							'text' : 'Order Item Due Dt',
							'datafield' : 'orderItemDueDate',
							'cellsformat' : 'dd/MM/yyyy',
							'width' : '12%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						} ],
						showaggregates : true,
					//	showstatusbar : true,
					});
		}
	}

	// 3rd Level Grid Started
	var initrowdetails3 = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.accessories;

		var inlineSource3 = {
			datafields : [ {
				'name' : 'serialNumber',
				'type' : 'long'
			}, {
				'name' : 'accCode',
				'type' : 'string',
				'map' : 'code>name'
			}, {
				'name' : 'suppliedBy',
				'type' : 'string',
				'map' : 'suppliedBy>name'
			}, {
				'name' : 'category',
				'type' : 'string'
			}, {
				'name' : 'subCat',
				'type' : 'string',
				'map' : 'subCategory>description'
			},{
				'name' : 'companyReqPcs',
				'type' : 'long'
			}, {
				'name' : 'companyReqWt',
				'type' : 'long'
			}, {
				'name' : 'uom',
				'type' : 'string',
				'map' : 'uom>name'
			}, {
				'name' : 'rate',
				'type' : 'long'
			} ],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		if (data.length != 0) {
			grid.jqxGrid({
				source : inlineSource3,
				width : "100%",
				height : 150,
				enabletooltips : true,
				columnsresize : true,
				columns : [ {
					text : 'Acc.Sl No.',
					datafield : 'serialNumber',
					width : '8%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Acc.Code',
					datafield : 'accCode',
					width : '12%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Acc. Supp By',
					datafield : 'suppliedBy',
					width : '12%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Acc.Main Cat.',
					datafield : 'category',
					width : '12%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Acc.Sub Cat.',
					datafield : 'subCat',
					width : '12%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Req Acc PCS',
					datafield : 'companyReqPcs',
					width : '12%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Req Acc Wt.',
					datafield : 'companyReqWt',
					width : '12%',
					cellsformat : 'd3',
					cellsalign : 'right',
					align : 'center'
				}, {
					text : 'UQC',
					datafield : 'uom',
					width : '10%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Acc. Rate',
					datafield : 'rate',
					width : '9%',
					cellsalign : 'right',
					align : 'center',
					cellsformat : 'd2',
				} ],
				showaggregates : true
			});
		}
	}
	// 3rd Level Grid Started
	$("#jqxgrid")
			.jqxGrid(
					{
						width : '100%',
				        sortable: true,            
				     	altrows: true,
				     	virtualmode:true,
						pageable : 'true',
				    	rowdetails : true,
						pagesize : 20,
				    	theme: 'energyblue',
						selectionmode : 'none',
						initrowdetails : initrowdetails,
						rowdetailstemplate : {
							rowdetails : "<div id='grid' style='margin-bottom: 40px; margin-top: 10px;'></div>",
							rowdetailsheight : 200,
							rowdetailshidden : true
						}

					});

}
$('#search').on('click', function() {
	accReqGrid();
	$("#jqxgrid").show();
});
$('#clear').on('click', function() {
	$('#vendorCodeObj').multiselect("clearSelection");
	$('#dcNameObj').multiselect("clearSelection");
	$('#storeNameObj').multiselect("clearSelection");
	$('#orderTypeObj').multiselect("clearSelection");
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
//Print Functionality to be done by Venkat
//#######################################
$("#printAR").on('click', function() {

	var storeNameObj = $('#storeNameObj').val();
	var orderTypeObj = $('#orderTypeObj').val();
	var vendorCodeObj = $('#vendorCodeObj').val();
	var dcNameObj = $('#dcNameObj').val();

	if (storeNameObj == null || storeNameObj == "") {
		var storeNameS = "";
	} else {
		var storeNameS = storeNameObj.join(",");
	}
	if (orderTypeObj == null || orderTypeObj == "") {
		var orderTypeS = "";
	} else {
		var orderTypeS = orderTypeObj.join(",");
	}
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCodeS = "";
	} else {
		var vendorCodeS = vendorCodeObj.join(",");
	}
	if (dcNameObj == null || dcNameObj == "") {
		var dcNameS = "";
	} else {
		var dcNameS = dcNameObj.join(",");
	}
	fieldFilters = {
		"fieldFilters" : {
			"vendorId" : vendorCodeS,
			"storeId" : storeNameS,
			"orderTypes" : orderTypeS,
			"dcId" : dcNameS,
			"mode" : "pdf",
			"reportName" : "RPT_Accessory_Requirement_Report"
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
				navigator.msSaveBlob(file, 'RPT_Accessory_Requirement_Report.pdf');
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





$("#export").on("click",function() {
	var data;
	var newData = [];
	
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $('#jqxgrid').jqxGrid('getrows');
	console.log(rows);
	if (rows == undefined || rows == 0) {
		$.growl.error({
			message : "No Data To Export",
			duration : 10000
		});
		return false;
	}
	postJSON('/OrderExecution/api/v1/exportAccessoryRequirementList',JSON.stringify(accReqMasterFieldFilters()),function(response) {
				data = response.payload.list;
				for (i = 0; i < data.length; i++) {
					newData.push({
						'Store/DC Name  ' : (data[i].storeName != null) ? data[i].storeName : "",
						'Order No' : (data[i].orderNo != null) ? data[i].orderNo : "",
						'Order Type ' : (data[i].orderType != null) ? data[i].orderType : "",
						'Order Date' : (data[i].orderCreatedDate != null) ? data[i].orderCreatedDate : "",
					    'Order Due Date' : (data[i].orderDueDate != null) ? data[i].orderDueDate : "",
						'Order Sl' : (data[i].orderItemSrlNo != null) ? data[i].orderItemSrlNo : "",
						'Order kind' : (data[i].orderKind != null) ? data[i].orderKind : "",
						'Segment' : (data[i].segment != null) ? data[i].segment : "",
						'Jewel Type' : (data[i].jewelType != null) ? data[i].jewelType : "",
						'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode : "",
						'Sales Executive' : (data[i].salesExecutive != null) ? data[i].salesExecutive : "",
						'Design Status ' : (data[i].designStatus != null) ? data[i].designStatus : "",
						'Design Req Y/N' : (data[i].designReqYesOrNo != null) ? data[i].designReqYesOrNo : "",
						'Order Item Due Date' : (data[i].orderItemDueDate != null) ? data[i].orderItemDueDate : "",
						'Acc. Sl No' : (data[i].accSrlNo != null) ? data[i].accSrlNo : "",
						'Acc. Code' : (data[i].accCode != null) ? data[i].accCode : "",
						'Acc. Supp By' : (data[i].accSuppBy != null) ? data[i].accSuppBy : "",
						'Acc. Main Cat.' : (data[i].accMainCategory != null) ? data[i].accMainCategory : "",
						'Acc. Sub Cat.' : (data[i].accSubCategory != null) ? data[i].accSubCategory : "",
						'Req Acc. Pcs' : (data[i].reqAccPcs != null) ? data[i].reqAccPcs : "",
						'Req Acc. Wt' : (data[i].reqAccWt != null) ? data[i].reqAccWt : "",
						'UQC ' : (data[i].UOM != null) ? data[i].UOM : "",
						'Acc. Rate' : (data[i].accRate != null) ? data[i].accRate: "",
					})
				}
				 var opts = [{sheetid:'Accessory_Requirement_Report',header:true}];
                 var res = alasql('SELECT * INTO XLSX("Accessory Requirement Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
			});
	
	});