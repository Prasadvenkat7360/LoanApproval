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

var onLoadStoneReq = function() {

	$.getJSON('/OrderExecution/api/v1/stoneRequirementReportLOV ',
					function(data) {

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
									+ val.vendorCode+ "-"+ val.vendorName + '</option>';
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
onLoadStoneReq();

var stoneReqMasterFieldFilters = function() {
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	var storeNameObj = $('#storeNameObj').val();
	if(storeNameObj == null || storeNameObj == ""){
		var storeNameS = "";
	}else{
		var storeNameS = storeNameObj.join(",");
	}
	
	var orderTypeObj = $('#orderTypeObj').val();
	if(orderTypeObj == null || orderTypeObj == ""){
		var orderTypeS = "";
	}else{
		var orderTypeS = orderTypeObj.join(",");
	}
	
	var vendorCodeObj = $('#vendorCodeObj').val();
	if(vendorCodeObj == null || vendorCodeObj == ""){
		var vendorCodeS = "";
	}else{
		var vendorCodeS = vendorCodeObj.join(",");
	}
	
	var dcNameObj = $('#dcNameObj').val();
	if(dcNameObj == null || dcNameObj == ""){
		var dcNameS = "";
	}else{
		var dcNameS = dcNameObj.join(",");
	}
	
	if (orderTypeS != "" && orderTypeS != null) {
		fieldFilters.fieldFilters["orderTypes"] = orderTypeS;
	}
	if (dcNameS != "" && dcNameS != null) {
		fieldFilters.fieldFilters["dc"] = dcNameS;
	}
	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["storeIds"] = storeNameS;
	}
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendor"] = vendorCodeS;
	}
	return fieldFilters;
}

$('#search').on('click', function() {
	stoneReqMasterGrid();
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

/* GRID STARTED #####################################################*/
function stoneReqMasterGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ {
		'name' : 'storeName',
		'type' : 'string',
		'map' : 'storeOrDcName'
	}, {
		'name' : 'id',
		'type' : 'int'
	}, {
		'name' : 'orderTypdescriptin',
		'type' : 'string'
	}, {
		'name' : 'orderDate',
		'type' : 'date'
	}, {
		'name' : 'dueDate',
		'type' : 'date'
	}, {
		'name' : 'advance',
		'type' : 'long'
	}, {
		'name' : 'orderItems',
		'type' : 'array'
	} ];

	var columns = [ {
		'text' : 'Store/DC Name',
		'datafield' : 'storeName',
		'width' : '20%',
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Order No',
		'datafield' : 'id',
		'width' : '20%',
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Order Type',
		'datafield' : 'orderTypdescriptin',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Order Due Date',
		'datafield' : 'dueDate',
		'cellsformat' : 'dd/MM/yyyy',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}/*,{
		'text' : 'Order Adv',
		'datafield' : 'advance',	
		'width' : '25%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}*/, {
		'text' : 'Order Date',
		'datafield' : 'orderDate',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		'cellsformat' : 'dd/MM/yyyy',		
		editable : false
		
	} ];

	showMyGrid(datafields,	"/OrderExecution/api/v1/stoneRequiremetList", "list",	columns, stoneReqMasterFieldFilters(), updateRows, "code");

	var initrowdetails = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.orderItems;
		var inlineSource = {
			datafields : [ {				
				name : 'designRequired',
				type : 'string'
			},{
				name : 'serialNumber',
				type : 'int'
			},{
				name : 'orderKind',
				type : 'string',
				'map': 'oKind>name'
			}, {
				name : 'orderItemDueDate',
				type : 'date'
			}, {
				name : 'segmentN',
				type : 'string',
				'map' : 'metalId>description'
			}, {
				name : 'jewelType',
				'map' : 'jewelType>description',
				type : 'string'
			}, {
				name : 'vendor',
				'map' : 'vendor>name',
				type : 'string'
			}, {
				name : 'salesExecutive',
				'map' : 'salesExecutive>name',
				type : 'string'
			}, {
				name : 'designStatus',
				type : 'string'
			}, {
				name : 'stones',
				'type' : 'array'
			} ],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		
		if (data.length != 0) {
			
			grid.jqxGrid({
				source : inlineSource,
				width : "99%",
				height : 200,
				theme: 'energyblue',
				enabletooltips : true,
				columnsresize : true,
				rowdetails : true,
				rowsheight : 35,
				rowdetailstemplate : {
					rowdetails : "<div id='grid' style='margin-bottom: 40px; margin-top: 10px;'></div>",
					rowdetailsheight : 250,
					rowdetailshidden : true
				},
				initrowdetails : initrowdetails3,
				columns : [ {
					text : 'Order Sl No.',
					datafield : 'serialNumber',
					width : '10%',
					cellsalign : 'center',
					align : 'center'
				},{
					text : 'Order Kind',
					datafield : 'orderKind',
					width : '9%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Order Item Due Dt',
					datafield : 'orderItemDueDate',
					width : '12%',
					cellsalign : 'center',
					align : 'center',
					'cellsformat' : 'dd/MM/yyyy'
				}, {
					text : 'Segment',
					datafield : 'segmentN',
					width : '9%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Jewel Type',
					datafield : 'jewelType',
					width : '12%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Vendor Code',
					datafield : 'vendor',
					width : '10%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Sales Executive',
					datafield : 'salesExecutive',
					width : '14%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Design Status',
					datafield : 'designStatus',
					width : '10%',
					cellsalign : 'center',
					align : 'center'
				},{
					text : 'Design Req Y/N',
					datafield : 'designRequired',
					width : '12%',
					cellsalign : 'center',
					align : 'center'
				} ],
				showaggregates : true
			});
		}
	}

	// 3rd Level Grid Started 
	var initrowdetails3 = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.stones;
		
		var inlineSource3 = {
			datafields : [ {
				name : 'serialNumber',
				type : 'string'
			}, {
				name : 'suppliedBy',
				'map': 'suppliedBy>name',
				type : 'string'
			}, {
				name : 'subCategoryDesc',
				type : 'string'
			}, {
				name : 'stoneCode',			
				type : 'string'
			}, {
				name : 'cutGrade',
				'map' : 'cutGrade>name',
				type : 'string'
			},{
				name : 'segmentN',
				'map' : 'stone>segment>description',
				type : 'string'
			},{
				name : 'clarity',
				type : 'string',
				'map' : 'clarity>name'
			}, {
				name : 'color',
				'map' : 'color>name',
				type : 'string'
			}, {
				name : 'actualColor',
				type : 'string',
				'map' : 'actualColor>name'
			}, {
				name : 'uom',
				'map':'stone>uom',
				type : 'string'
			}, {
				name : 'stoneRate',
				type : 'string',
				'map' : 'rate'
			},{
				name : 'stoneCode',
				'map':'stone>stoneCode',
				type : 'string'
			},{
				name : 'weightRange',
				'map' : 'weightRange>name',
				type : 'string'
			},{
				name : 'compReqdWt',
				type : 'string',
			}, {
				name : 'compReqPcs',
				type : 'string'
			} ],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		if (data.length != 0) {
			grid.jqxGrid({
				source : inlineSource3,
				width : "95%",
				height : 100,
				rowsheight : 50,
				columnsheight: 50,
				theme: 'energyblue',
				enabletooltips : true,
				columnsresize : true,
				columns : [ {
					text : 'Stone Sl No',
					datafield : 'serialNumber',
					width : '6%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Stone Supplied By',
					datafield : 'suppliedBy',
					width : '11%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Stone Seg',
					datafield : 'segmentN',
					width : '7%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Sub Cat',
					datafield : 'subCategoryDesc',
					width : '34%',
					cellsalign : 'left',
					columnsresize : true,
					align : 'center',
				}, {
					text : 'Stone Code',
					datafield : 'stoneCode',
					width : '8%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Cut Grade',
					datafield : 'cutGrade',
					width : '6%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Color',
					datafield : 'color',
					width : '6%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'Clarity',
					datafield : 'clarity',
					width : '6%',
					cellsalign : 'center',
					align : 'center'
				},{
					text : 'Actual Color',
					datafield : 'actualColor',
					width : '7%',
					cellsalign : 'center',
					align : 'center'
				}, {
					text : 'UQC',
					datafield : 'uom',
					width : '5%',
					cellsalign : 'center',
					align : 'center',
				} ,{
					text : 'Weight/Cost Range',
					datafield : 'weightRange',
					width : '8%',
					cellsalign : 'center',
					align : 'center'
				},{
					text : 'Req Stone Wt',
					datafield : 'compReqdWt',
					width : '8%',
					cellsformat : 'd3',
					cellsalign : 'right',
					align : 'center'
				},{
					text : 'Req Stone pcs',
					datafield : 'compReqPcs',
					width : '6%',
					cellsalign : 'center',
					align : 'center'
				},{
					text : 'Stone Rate',
					datafield : 'stoneRate',
					width : '8%',
					cellsformat : 'd2',
					cellsalign : 'right',
					align : 'center'
				}],
				showaggregates : true,
				//showstatusbar : true
			});
		}
	}
	// 3rd Level Grid Started
	$("#jqxgrid").jqxGrid({		
		rowdetails : true,
		width : '100%',
        sortable: true,         
        virtualmode: true,
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 50,
		columnsheight: 60,
		initrowdetails : initrowdetails,
		rowdetailstemplate : {
		rowdetails : "<div id='grid' style='margin: 10px;' 'margin-bottom : 10px;' 'margin-top:10px;'></div>",
		rowdetailsheight : 200,
		rowdetailshidden : true
		}
	});

}

/* GRID ENDED #####################################################*/
//Print Functionality to be done by Venkat
//#######################################
$("#printSR").on('click', function() {

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
			"reportName" : "RPT_Stone_Requirement_Report"
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
				navigator.msSaveBlob(file, 'RPT_Stone_Requirement_Report.pdf');
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
		postJSON('/OrderExecution/api/v1/exportStoneRequirementList',JSON.stringify(stoneReqMasterFieldFilters()),function(response) {
			data = response.payload.list;
			console.log(data);
			for (i = 0; i < data.length; i++) {
				newData.push({
					        'Store/DC Code' : (data[i].storeName != null) ? data[i].storeName : "",
							'Order No ' : (data[i].orderNo != null) ? data[i].orderNo : "",
							'Order Type' : (data[i].orderType != null) ? data[i].orderType : "",
							'Order Due Date':(data[i].orderItemDueDate != null) ? data[i].orderItemDueDate : "",
							'Order Date':(data[i].orderCreatedDate != null) ? data[i].orderCreatedDate : "",
							'Order Sl ' : (data[i].orderItemSrlNo != null) ? data[i].orderItemSrlNo : "",
							'Order Kind' : (data[i].orderKind != null) ? data[i].orderKind : "",
							'Order Item Due Date':(data[i].orderItemDueDate != null) ? data[i].orderItemDueDate : "",
							'Segment' : (data[i].segment != null) ? data[i].segment : "",
							'Jewel Type' : (data[i].jewelType != null) ? data[i].jewelType : "",
							'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode : "",
							'Sales/DC Executive Name':(data[i].salesExecutive !=null) ? data[i].salesExecutive :" ",
							'Design Status ' : (data[i].designStatus != null) ? data[i].designStatus : "",
							'Design Req Y/N' : (data[i].designReqYesOrNo != null) ? data[i].designReqYesOrNo : "",
							'Stone Sl No' : (data[i].stoneSrlNo != null) ? data[i].stoneSrlNo : "",
							'Stone Supp By' : (data[i].stoneSuppBy != null) ? data[i].stoneSuppBy : "",												
							'Stone Segment' : (data[i].stoneSegment != null) ? data[i].stoneSegment : "",
							'Stone Sub Category' : (data[i].stoneSubCategory != null) ? data[i].stoneSubCategory : "",
							'Stone Code' : (data[i].stoneCode != null) ? data[i].stoneCode : "",
							'Cut Grade' : (data[i].cutGrade != null) ? data[i].cutGrade : "",
							'Color' : (data[i].color != null) ? data[i].color : "",
							'Clarity' : (data[i].clarity != null) ? data[i].clarity : "",
							'Actual Color' : (data[i].actualColor != null) ? data[i].actualColor : "",
							'UQC' : (data[i].UOM != null) ? data[i].UOM : "",
							'Weight/Cost Range' : (data[i].weightRange != null) ? data[i].weightRange : "",
							'Req Stone Wt' : (data[i].reqStoneWt !=null) ? data[i].reqStoneWt : " ",
							'Req Stone PCS' :(data[i].reqStonePcs !=null)? data[i].reqStonePcs :" ",
							'Stone Rate' : (data[i].stoneRate != null) ? data[i].stoneRate : ""
						})
					}
			//	JSONToCSVConvertor(newData, "Stone Requirement Master" + "_"+ sysdate, true);	
				  var opts = [{sheetid:'Stone_Requirement_Report',header:true}];
                  var res = alasql('SELECT * INTO XLSX("Stone Requirement Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
			 });										
    });