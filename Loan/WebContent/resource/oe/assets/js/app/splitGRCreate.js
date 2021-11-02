$("#saveSplitGR").hide();
$("#splitGrSearchSection").hide();

var splitGRData = [];
var attrData= {};
var headerData ;
var metalAccData ;
var splitStockId ;
var grOnloadFunction = function(stockNo,status){
	$.getJSON('/OrderExecution/api/v1/getGROnLoadForSplitStockId?stockId='+stockNo, function(data) {
		if(data.resCode == 1){
			$("#saveSplitGR").show();
			$('#loading').hide();
			splitGRData = data.payload.splitList;
			attrData = data.payload.attributeDetails;
			headerData =  data.payload;
			metalAccData = data.payload;
			splitStockId = stockNo;
			
			//searchOnload(metalAccData);
			$("#vendorIdGRC").val(data.payload.splitVendor.id);
			$("#vendorGRC").val(data.payload.splitVendor.vendorCode + "-" + data.payload.splitVendor.vendorName);
			$("#stockNumb").val(stockNo);
			
			$("#grvNumb").val(data.payload.splitMRVNo);
			$("#grossWght").val(parseFloat(data.payload.splitGrossWt).toFixed(3));
			$("#netWght").val(parseFloat(data.payload.splitNetWt).toFixed(3));
			$("#count").val(data.payload.splitCount - 1);
			
			debugger;
			if(status == "CreateIGR"){
				$("#grMetalAccounting").prop('disabled',false);
			}else{
				$("#grMetalAccounting").prop('disabled',true);
			}
			
			var stoneDet = [];
			var accDet = [];
			$.each(data.payload.splitList,function(k,v){
				v.provisional = false;
				v.photoNo = 0;
				$.each(v.stockItemStoneDTOList,function(key,val){
					if(v.srlNo == val.detailSrlNo){
						val.provisional = false;
						stoneDet.push(val);
					}
				});
				
				$.each(v.stockItemAccDTOList,function(key1,val1){
					if(v.srlNo == val1.detailSrlNo){
						val1.provisional = false;
						accDet.push(val1);
					}
				});
			});
			$.each(splitGRData,function(k,v){
				v.validFlag = false;
			});
			grItemGrid(splitGRData);
			$("#itemDetailsGrid").show();
			
			stoneItemGrid(stoneDet);
			$("#stoneGrid").show();

			accItemGrid(accDet);
			$("#accGridDet").show();
			
			
		}else{
			$('#loading').hide();
			$("#saveSplitGR").hide();
			$.growl.error({
				message : data.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		$('#loading').hide();
	});
}

var grItemGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'psrNo', type : 'int','map':'psrNumber'}, 
			{name : 'srlNo', type : 'int','map':'srlNo'},
			{name : 'artCode', type : 'string','map':'articlMasterDTO>articleCode'},
			{name: 'jewelCode', type: 'string','map':'jewelTypeDTO>code'},
			{name: 'jewelId', type: 'string','map':'jewelTypeDTO>id'},

			{name: 'artDesc', type: 'string','map':'articlMasterDTO>articleDesc'},
			{name : 'pcs', type : 'string','map':'pcs'},
			{name : 'splitGrossWeight', type : 'float','map':'splitGrossWeight'},
			{name : 'splitNetWeight', type : 'float','map':'splitNetWeight'},
			{name : 'costCode', type : 'string','map':'costCode'},
			{name : 'costCodes', type : 'string','map':'costCodeType'},
			{name : 'hallMark', type : 'string','map':''},
			{name : 'splitCostWastageWT', type : 'float','map':'splitCostWastageWT'},
			{name : 'splitCostMCTotalCost', type : 'float','map':'splitCostMCTotalCost'},
			{name : 'splitSellingWastageWT', type : 'float','map':'splitSellingWastageWT'},
			{name : 'splitSellingMCTotalCost', type : 'float','map':'splitSellingMCTotalCost'},
			{name : 'attributes', type : 'string','map':''},
			{name : 'photoNo', type : 'int','map':''},
			{name : 'viewDesign', type : 'int','map':''},
			{name : 'provisional', type : 'string','map':''},
			{'name' : 'isValid','type' : 'boolean'}, 
			{'name' : 'setSellingPrice','type' : 'boolean'}, 
			
			{name: 'hsnMasterId', type: 'int','map':'hsnMasterDTO>id'},
			{name: 'hsnMasterCode', type: 'string','map':'hsnMasterDTO>hsnCode'},
			
			{name: 'storeId', type: 'int','map':'storeOrDCId'},
			{name: 'metalTypeId', type: 'string','map':'metalSegment>id'},
			
			{name: 'segmentId', type: 'int','map':'segmentDTO>id'},
			{name: 'segmentCode', type: 'string','map':'segmentDTO>description'},
			{name: 'validFlag', type: 'string'},
			{name:'splitMetalValue',type:'float'},
			{name :'sellingPrice',type:'float'}
			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#itemDetailsGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '250px',
		theme: 'energyblue',
        columnsheight: 40,
        columnsresize: true,  
		rowsheight : 30,
		autoheight : false,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: false, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Create IGR Details : </b>');			
		},
		columns : [ 
			{ text : 'Srl', datafield : 'srlNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'PSR No.', datafield : 'psrNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Art. Code', datafield : 'artCode', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'J.Code', datafield : 'jewelCode', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Art. Desc.', datafield : 'artDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pcs', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gr. Wt.', datafield : 'splitGrossWeight', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Net Wt.', datafield : 'splitNetWeight', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Cost Code', datafield : 'costCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Hall Mark', datafield : 'hallMark', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cost Wastage Wt.', datafield : 'splitCostWastageWT', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Cost MC/Tot. Cost', datafield : 'splitCostMCTotalCost', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{'text' : 'Set Sellling Price',datafield : 'setSellingPrice','width' : '4%',editable : false,columntype: 'checkbox',cellsalign : 'center',align:'center',},
			{ text : 'Selling Wastage Wt.', datafield : 'splitSellingWastageWT', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Sell MC/Tot. Cost', datafield : 'splitSellingMCTotalCost', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
		    {'text' : 'Attr',datafield : 'attributes','width' : '2.5%',sortable : false,cellsalign : 'center',align:'center', cellsrenderer : attributeSearchPopUp},
			{ text : 'Prod. Photo No', datafield : 'photoNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'View Design', datafield : 'viewDesign', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsrenderer : viewDesignPopUp},
			{ text : 'Provisional', datafield : 'provisional', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		    {'text' : '',datafield : 'isValid','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center', cellsrenderer : checkValidate},
		
		    {'text' : '',datafield : 'hsnMasterCode','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center',hidden:true},
		    {'text' : '',datafield : 'hsnMasterId','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center',hidden:true},
		    {'text' : '',datafield : 'storeId','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center',hidden:true},
		    {'text' : '',datafield : 'metalTypeId','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center',hidden:true},
		    {'text' : '',datafield : 'segmentId','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center',hidden:true},
		    {'text' : '',datafield : 'segmentCode','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center',hidden:true},
		    {'text' : '',datafield : 'validFlag','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center',hidden:true},
		    {'text' : '',datafield : 'splitMetalValue','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center',hidden:true, cellsformat : 'd2'},
		    {'text' : '',datafield : 'sellingPrice','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center',hidden:true, cellsformat : 'd2'},

		]
	});
}

var attributeSearchPopUp = function (row, columnfield, value, defaulthtml, columnproperties) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#attributeSearch"  type="button" id='
	+ row
	+ ' onclick="attributesDetails('
	+ value
	+ ')"/><i class="fa fa-eye fa-sm"></i></button>'
}

var viewDesignPopUp = function (row, columnfield, value, defaulthtml, columnproperties) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" style="margin-left:20px;" data-target="#attributeSearch" disabled type="button" id='
	+ row
	+ ' onclick="attributesDetails('
	+ value
	+ ')"/><i class="fa fa-eye fa-sm"></i></button>'
}

var attributesDetails = function(){
	if(attrData.length != null){
		$("#lengthA").val(attrData.length.name);
	}
	if(attrData.size != null){
		$("#sizeA").val(attrData.size.name);
	}
	if(attrData.combination != null){
		$("#stoneCombinationA").val(attrData.combination.name);
	}
	if(attrData.collectionName != null){
		$("#collectionNameA").val(attrData.collectionName.name);
	}
	if(attrData.combination != null){
		$("#metalColorA").val(attrData.combination.name);
	}
	if(attrData.polishType != null){
		$("#polishTypeA").val(attrData.polishType.name);
	}
	if(attrData.settingType != null){
		$("#settingTypeA").val(attrData.settingType.name);
	}
	
}

var stoneItemGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'igrSlNo', type : 'int','map':'detailSrlNo'}, 
			{name : 'srlNo', type : 'int','map':'stockSerialNo'},
			{name : 'suppBy', type : 'string','map':'suppliedBy>name'},
			{name: 'stoneCode', type: 'string','map':'stoneCode'},
			{name: 'subCategoryDesc', type: 'string','map':'subCategoryDesc'},
			{name : 'flag', type : 'string','map':''},
			{name : 'costRange', type : 'string','map':'weightRange>id'},
			{name : 'issPcs', type : 'int','map':'pieces'},
			{name : 'issWt', type : 'float','map':'weight'},
			{name : 'usedPcs', type : 'int','map':'pieces'},
			{name : 'usedWt', type : 'string','map':'weight'},
			{name : 'retPcs', type : 'int','map':''},
			{name : 'retWt', type : 'float','map':''},
			{name : 'brkRecPcs', type : 'int','map':''},
			{name : 'brkRecWt', type : 'float','map':''},
			{name : 'brkNotRecPcs', type : 'int','map':''},
			{name : 'brkNotRecWt', type : 'float','map':''},

			{name : 'uqc', type : 'string','map':'uom'},
			{name : 'costPrice', type : 'float','map':'costPrice'},
			{name : 'stoneCostRateEdited', type : 'float','map':'costPrice'},
			{name : 'totalCostPrice', type : 'float','map':'totalCostPrice'},
			{name : 'stoneHCEdited', type : 'float','map':''},
			{name : 'stoneHC', type : 'float','map':''},
			{name : 'certReq', type : 'string','map':''},
			{name : 'provisional', type : 'string'},
		    {name : 'psrNo',type: 'long'},
			
			{'name':'suppliedBy',type:'string','map':'suppliedBy>id'},
			{'name':'category',type:'string','map':'category'},
			
			{'name':'clarity',type:'string','map':'clarity>id'},
			{'name':'actualColor',type:'string','map':'actualColor>id'},
			{'name':'wgtRange',type:'string','map':'wtSlab'},
			{'name':'color',type:'string','map':'color>id'},
			{'name':'cutGrade',type:'string','map':'cutGrade>id'},
			
		    {name : 'orderNo',type: 'long'},
		    {name : 'orderSrlNo',type: 'long'},
		    
		    {name : 'stoneCost',type: 'float'},
		    {name : 'stoneCostRate',type: 'float'},
		    {name : 'stoneSellingRate',type: 'float'},
		    {name : 'stoneSellingPrice',type: 'float'},
		    {name:'sellingPrice',type:'float'},
		    {name:'sellingPrice',type:'float'},
		    {name:'stoneListId',type:'int','map':'id'}

			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#stoneGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '250px',
		theme: 'energyblue',
        columnsheight: 40,
        columnsresize: true,  
		rowsheight : 30,
		autoheight : false,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Stone Details : </b>');			
		},
		columns : [ 
			{ text : 'IGR Sl No.', datafield : 'igrSlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'PSR No.', datafield : 'psrNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},

			{ text : 'Srl No.', datafield : 'srlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stn Code', datafield : 'stoneCode', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat/Shape', datafield : 'subCategoryDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Flag', datafield : 'flag', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cost Range', datafield : 'costRange', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Issued Pcs', datafield : 'issPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Issued Wt.', datafield : 'issWt', width : '6%', cellsalign : 'center', align : 'right', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Used Pcs', datafield : 'usedPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Used Wt.', datafield : 'usedWt', width : '6%', cellsalign : 'right', align : 'right', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Ret Pcs', datafield : 'retPcs', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Ret Wt.', datafield : 'retWt', width : '5%', cellsalign : 'right', align : 'right', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Break. Rec.Pcs', datafield : 'brkRecPcs', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Break. Rec. Wt.', datafield : 'brkRecWt', width : '8%', cellsalign : 'right', align : 'right', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Break. Not. Rec. Pcs', datafield : 'brkNotRecPcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Break. Not. Rec. Wt.', datafield : 'brkNotRecWt', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'UQC', datafield : 'uqc', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Cost Rate', datafield : 'costPrice', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Stone Cost Rate (Edited)', datafield : 'stoneCostRateEdited', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Stone Cost', datafield : 'totalCostPrice', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Stone HC(Edited)', datafield : 'stoneHCEdited', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Stone HC', datafield : 'stoneHC', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cert Req', datafield : 'certReq', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Provisional', datafield : 'provisional', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			
			{ text : '', datafield : 'suppliedBy', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'category', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'clarity', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'actualColor', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'wgtRange', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'color', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'cutGrade', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'orderNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'orderSrlNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			
			{ text : '', datafield : 'stoneCost', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'stoneCostRate', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'stoneSellingRate', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'stoneSellingPrice', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'sellingPrice', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'stoneListId', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},

			]
	});
}

var accItemGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'igrSlNo', type : 'int','map':'detailSrlNo'}, 
			{name : 'srlNo', type : 'int','map':'accessorySrlNumber'},
			{name : 'suppBy', type : 'string','map':'suppliedBy>name'},
			{name: 'accCode', type: 'string','map':'accessoryCode'},
			{name: 'subCategoryDesc', type: 'string','map':'subCategoryDesc'},
			{name : 'flag', type : 'string','map':''},
			{name : 'issPcs', type : 'int','map':'pieces'},
			{name : 'issWt', type : 'float','map':'weight'},
			{name : 'usedPcs', type : 'int','map':'pieces'},
			{name : 'usedWt', type : 'string','map':'weight'},
			{name : 'retPcs', type : 'int','map':''},
			{name : 'retWt', type : 'float','map':''},
			{name : 'brkRecPcs', type : 'int','map':''},
			{name : 'brkRecWt', type : 'float','map':''},
			{name : 'brkNotRecPcs', type : 'int','map':''},
			{name : 'brkNotRecWt', type : 'float','map':''},
			{name : 'uqc', type : 'string','map':'uom>id'},
			{name : 'accCostRate', type : 'float','map':'costPrice'},
			{name : 'accCostRateEdited', type : 'float','map':'costPrice'},
			{name : 'accCost', type : 'float','map':'totalCostPrice'},
			{name : 'accHCEdited', type : 'float','map':''},
			{name : 'accHC', type : 'float','map':''},
			{name : 'provisional', type : 'string'},
		    {name : 'psrNo',type: 'long'},
		    {'name':'suppliedBy',type:'string','map':'suppliedBy>id'},
		    {name : 'orderNo',type: 'long'},
		    {name : 'orderSrlNo',type: 'long'},
		    
		    {name : 'totalSellingPrice',type: 'float'},
		    {name : 'totalCostPrice',type: 'float'},
			{name : 'pieces', type : 'int','map':'pieces'},
			{name : 'accListId',type:'int','map':'id'}

			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#accGridDet").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '250px',
		theme: 'energyblue',
        columnsheight: 40,
        columnsresize: true,  
		rowsheight : 30,
		autoheight : false,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Accessory Details : </b>');			
		},
		columns : [ 
			{ text : 'Srl', datafield : 'igrSlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'PSR No.', datafield : 'psrNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Srl No.', datafield : 'srlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},

			{ text : 'Art. Code', datafield : 'suppBy', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'J.Code', datafield : 'accCode', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Art. Desc.', datafield : 'subCategoryDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		//	{ text : 'Pcs', datafield : 'pieces', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Issued Pcs', datafield : 'issPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Issued Wt.', datafield : 'issWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Used Pcs', datafield : 'usedPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Used Wt.', datafield : 'usedWt', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Retd Pcs', datafield : 'retPcs', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Retd Wt.', datafield : 'retWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Break. Rec.Pcs', datafield : 'brkRecPcs', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Break. Rec. Wt.', datafield : 'brkRecWt', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Break.Not Rec. Pcs.', datafield : 'brkNotRecPcs', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Break.Not Rec. Wt.', datafield : 'brkNotRecWt', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'UQC', datafield : 'uqc', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false,
				 cellsrenderer: function(row, column, value){
			      		return "<div align='center'style='margin-top:8px;'>Pcs</div>";
			      	} 
			},
			{ text : 'Acc Cost Rate', datafield : 'accCostRate', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Acc Cost Rate (Edited)', datafield : 'accCostRateEdited', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Acc Cost', datafield : 'accCost', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Acc. HC (Edited)', datafield : 'accHCEdited', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Acc. HC', datafield : 'accHC', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Provisional', datafield : 'provisional', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{ text : '', datafield : 'suppliedBy', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'orderNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'orderSrlNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			
			{ text : '', datafield : 'totalSellingPrice', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'totalCostPrice', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'accListId', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},

		]
	});
}

var checkValidate = function(row, column, value){
	console.log(row);
	var flag = $("#itemDetailsGrid").jqxGrid('getrowdata', row);
	console.log(flag.validFlag);
	if(flag.validFlag == undefined || flag.validFlag == false || flag.validFlag == "false"){
		return '<div class="text-center"><button style="margin-top: 3px;" class="btn btn-sm btn-primary" onclick="validateGRFGDetails('+ row +');" data-toggle="modal" type="button" /><i class="fa fa-check fa-lg"></i></button></div>';
	}else{
		return '<div class="text-center"><button style="margin-top: 3px;" class="btn btn-sm btn-primary" disabled data-toggle="modal" type="button" /><i class="fa fa-check fa-lg"></i></button></div>';

	}
}

$("#saveSplitGR").prop('disabled',true);
var validateGRFGDetails = function(val){
	$('#loading').show();
	var validateFlag = false;
	console.log(headerData);
	var pureRate = headerData.pureRate;
	
	var grDetails = $("#itemDetailsGrid").jqxGrid('getrows');					
	var stoneDets = $("#stoneGrid").jqxGrid('getrows');					
	var accDets = $("#accGridDet").jqxGrid('getrows');
	
	
	$.each(splitGRData,function(k,v){
		console.log(v);
		
		if(v.pcs <= 0){
			$("#saveSplitGR").prop('disabled',true);
			$.growl.error({ message: "Pcs should be more than 0", title: 'Error' });
			return false;
		}else{
			$("#saveSplitGR").prop('disabled',false);
		}
		
		if(v.splitCostWastageWT < 0 || v.splitCostMCTotalCost < 0 || v.splitSellingWastageWT < 0 || v.splitSellingMCTotalCost < 0){
			$("#saveSplitGR").prop('disabled',true);
			$.growl.error({ message: "Cost Wastage WT, Cost MC, Sell Wastage Wt and Sell MC value can not be negetive.", title: 'Error' });
			return false;
		}else{$("#saveSplitGR").prop('disabled',false);}
		
		if(v.costCode == "Total Cost" && v.splitCostMCTotalCost == 0 ){
			$("#saveSplitGR").prop('disabled',true);
			$.growl.error({ message: "Cost MC Cannot be zero !!!", title: 'Error' });
			return false;
		}else{$("#saveSplitGR").prop('disabled',false);}
		
		/*if(v.splitCostWastageWT > v.splitSellingWastageWT ){
			$("#saveSplitGR").prop('disabled',true);
			$.growl.error({ message: "Cost Wastage WT cannot be more than Selling Wastage Wt !!", title: 'Error' });
			return false;
		}else{$("#saveSplitGR").prop('disabled',false);}*/
		
		var totalWtCost = (parseFloat(v.splitCostWastageWT) * pureRate) + parseFloat(v.splitCostMCTotalCost );
		var totalWtSell = (parseFloat(v.splitSellingWastageWT) * pureRate) + parseFloat(v.splitSellingMCTotalCost);
		
		console.log(totalWtCost);
		console.log(totalWtSell);
		if(totalWtCost > totalWtSell ){
			$("#saveSplitGR").prop('disabled',true);
			validateFlag = false;
			$.growl.error({ message: "Cost MC Total Cost cannot be more than Selling MC Total Cost !!", title: 'Error' });
			return false;
		}else{
			$("#saveSplitGR").prop('disabled',false);
			validateFlag = true;
		}
		
	
		var diffWt = 0.000;
		var stoneAccWtSum = 0.000;
		diffWt = parseFloat(v.splitGrossWeight) - parseFloat(v.splitNetWeight);
		//if(diffWt){
			
			// Stones
			$.each(v.stockItemStoneDTOList,function(k1,v1){
				if(v1.psrNo == v.psrNumber){
					if(v1.uom == "Cts"){
						stoneAccWtSum = parseFloat(stoneAccWtSum) + parseFloat(v1.weight/5);
						stoneAccWtSum = parseFloat(stoneAccWtSum).toFixed(3);

					}else{
						stoneAccWtSum = parseFloat(stoneAccWtSum) + parseFloat(v1.weight);
						stoneAccWtSum = parseFloat(stoneAccWtSum).toFixed(3);

					}
				}
				console.log(stoneAccWtSum);
			});
			
			// Accessory
			$.each(v.stockItemAccDTOList,function(k2,v2){
				if(v2.psrNo == v.psrNumber){
					stoneAccWtSum = parseFloat(stoneAccWtSum) + parseFloat(v2.weight);
					stoneAccWtSum = parseFloat(stoneAccWtSum).toFixed(3);
				}
				console.log(stoneAccWtSum);
			});
			
			console.log(parseFloat(diffWt).toFixed(3));
			console.log(stoneAccWtSum);
			var diffWts = parseFloat(diffWt).toFixed(3);
			var stoneAccWt = parseFloat(stoneAccWtSum).toFixed(3);
			if((diffWts - stoneAccWt) > 0.002){
				$("#saveSplitGR").prop('disabled',false);
				validateFlag = false;
				/*$.growl.error({
					message : "Used/Bulk (Stone + Accessory) should be equal to (Difference of G/N Wt + Tolerance) for PSR No "+v.psrNumber,
					duration : 10000,
					title : 'Error'
				});
				return false;*/
			}else{
				$("#saveSplitGR").prop('disabled',false);
				validateFlag = true;
				$.each(splitGRData,function(k,v){
					v.validFlag = true;
				});
				grItemGrid(splitGRData);	
			}
		/*}else{
			$("#saveSplitGR").prop('disabled',false);
			$.growl.notice({ message: "Validation is sucess", duration: 10000, title: 'Success' });	
		}*/
	
	});
	
	if(validateFlag == true){
		$('#loading').hide();
		$.growl.notice({ message: "Validation is sucess", duration: 10000, title: 'Success' });	
	}else{
		$('#loading').hide();
		$.growl.error({
			message : "Used/Bulk (Stone + Accessory) should be equal to (Difference of G/N Wt + Tolerance) for PSR No ",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
}

var getGRDetails = function(){
	
	var grDetails = $("#itemDetailsGrid").jqxGrid('getrows');					
	var stoneDets = $("#stoneGrid").jqxGrid('getrows');					
	var accDets = $("#accGridDet").jqxGrid('getrows');
	
	var grCreateDet = [];
	console.log(stoneDets);
	$.each(grDetails,function(k,v){
		console.log(v);
		var stData = getStoneDetails(v.psrNo);
		var accData = getAccDetails(v.psrNo);
		var grObj = {
				  "srl": v.srlNo,
			      "psr": v.psrNo,
			      "psrNos": v.psrNo,
			      "articleCode": v.artCode,
			      "articleDesc": v.artDesc,
			      "jwlType": v.jewelCode,
			      "pcs": v.pcs,
			      "grossWt": v.splitGrossWeight,
			      "netWt": v.splitNetWeight,
			      "costCode": v.costCodes,
			      "costCodes": v.costCode,
			      "costWastageWT": v.splitCostWastageWT,
			      "costMC": v.splitCostMCTotalCost,
			      "setSellingPrice": false,
			      "sellWastageWt": v.splitSellingWastageWT,
			      "sellMC": v.splitSellingMCTotalCost,
			      "attributes": "True",
			      "photo":null,
			      "viewDesign": null,
			      "provisional": false,
			      "hallMarkCharges": 0.00,
			      "isValid": true,
			      "selectionStatusCopy": null,
			      "hsnMasterId": v.hsnMasterId,
			      "hsnMasterCode": v.hsnMasterCode,
			      "reason": "",
			      "pendingPcs": null,
			      "countStone": (stData != undefined) ? stData.length : 0,
			      "countAcc": (accData != undefined) ? accData.length : 0,
			      "jwType": v.jewelId,
			      "segmentId": v.segmentId,
			      "segmentCode": v.segmentCode,
			      "actcostWastageWt": v.splitCostWastageWT,
			      "actcostMC": v.splitCostMCTotalCost,
			      "actsellWastageWt":  v.splitSellingWastageWT,
			      "actsellMC": v.splitSellingMCTotalCost,
			      "metalValue": parseFloat(v.splitMetalValue).toFixed(2),
			      "wastageValue": 0.00,
			      "selling_price": parseFloat(v.sellingPrice).toFixed(2),
			      "stoneList":(stData != undefined) ? stData : null ,
			      "accessoryList": (accData != undefined) ? accData : null,
			      "attrLength": (attrData.length != null )  ? attrData.length.name : "",
			      "size": (attrData.size != null ) ?  attrData.size.name : "",
			      "vendorArticle": null,
			      "combinationId": (attrData.combination != null ) ? attrData.combination.name : "",
			      "metalColor": (attrData.metalColor != null ) ? attrData.metalColor.name : "",
			      "polishType": (attrData.polishType != null) ? attrData.polishType.name : "",
			      "settingType" : (attrData.settingType != null) ? attrData.settingType.name : "",
			      "collectionName":(attrData.collectionName != null ) ? attrData.collectionName.name :"",
			      "orderKind": "NO",
			      "orderType": "CU",
			      "metalTypeId": v.metalTypeId,
			      "storeId": v.storeId,
			      "isRwk": false,
			      "isDueDtFlag": false,
			      "globalAttrFlag": 1,
			      "awCount": 0,
			      "apportionSellingMc": 0,
			      "apportionsellingWastageWt": 0,
		}
		grCreateDet.push(grObj);
	});
	return grCreateDet;
}

var getStoneDetails = function(psrNo){
	var stoneDets = $("#stoneGrid").jqxGrid('getrows');	
	var stoneList = [];
	
	console.log(stoneDets);
	
	$.each(stoneDets,function(k,v){
		if(v.psrNo == psrNo){
		console.log(v);
	
		 stoneList.push(
		        {
		          "stoneListId": v.stoneListId,
		          "typeRow": false,
		          "srl": v.igrSlNo,
		          "stoneSlNo": v.srlNo,
		          "isPsr": v.psrNo,
		          //"isStock": "CU",
		          "orderKind": "NO",
		          "suppliedBy": v.suppliedBy,
		          "suppliedBys": v.suppBy,
		          "stoneCode": v.stoneCode,
		          "subCategoryDesc": v.subCategoryDesc,
		          "category": v.category,
		          "stoneBulkPcs": null,
		          "stoneBulkWt": null,
		          "flag": "P",
		          "flags": "Positive",
		          "issuedPcs": v.issPcs,
		          "issuedWt": v.issWt,
		          "isRwk": false,
		          "grStoneCertificates": [],
		          "isCertficateRequired": null,
		          "orderNo": v.orderNo,
		          "orderSlNo": v.orderSlNo,
		          "stoneUsedPcs": v.usedPcs,
		          "stoneUsedWt": v.usedWt,
		          "stoneCostPrice": v.stoneCostRate,
		          "stoneSellingPrice": v.totalSellingPrice,
		          "returnStoneCostPrice":  0,
		          "returnStoneSellingPrice": 0,
		          "returnStoneCostPriceAct": v.stoneCostRate,
		          "returnStoneSellingPriceAct": v.sellingPrice,
		          "usedPcs": v.usedPcs,
		          "usedWt": v.usedWt,
		          "bulkPcs": 0,
		          "pendingBulkWt": "0.000",
		          "bulkWt": 0,
		          "returnedPcs": 0,
		          "returnedWt": 0,
		          "breakageReceivedPcs": 0,
		          "breakageReceived": 0,
		          "breakageNotReceivedPcs": 0,
		          "breakageNotReceived": 0,
		          "uom": v.uqc,
		          "stoneRate": v.stoneCostRate,
		          "stoneCostRate": v.stoneCostRate,
		          "actStoneCostRate": 0,
		          "stoneCost": v.totalCostPrice,
		          "stoneHC": 0,
		          "actStoneHC": 0,
		          "sellingRate": v.stoneSellingRate,
		          "actSellingRate": v.stoneSellingRate,
		          "sellingPrice": v.stoneSellingPrice,
		          "stoneHCEdited": 0,
		          "provisional": false,
		          "certificateDetails": null,
		          "costRange": v.costRange,
		          "clarity": v.clarity,
		          "actualColor":v.actualColor,
		          "wgtRange": v.wgtRange,
		          "color": v.color,
		          "cutGrade": v.cutGrade,
		          "costRangeN": v.costRange,
		          "retStoneCost": 0
		        }
		      );
		}
	});
	
	return stoneList;
}

var getAccDetails = function(psrNo){
	var accDets = $("#accGridDet").jqxGrid('getrows');	
	var accList = [];
	
	
	$.each(accDets,function(k,ad){
		if(ad.psrNo == psrNo){
		console.log(ad);
		accList.push({
			"accListId":ad.accListId,
			"typeRow": false,
			"srl" : ad.igrSlNo,
			"accSrNo" : ad.srlNo,
			"suppliedBy" :ad.suppliedBy,
			"suppliedBys" : ad.suppBy,
			"accCode": ad.accCode,
			"subCategory" : ad.subCategoryDesc,
			"flag" :  "P",
			"flags" : "Positive",
			"issuedPcs" : ad.issPcs,
			"issuedWt" : ad.issWt,
			"isRwk": false,
			"orderNo" : ad.orderNo,
			"orderSlNo" : ad.orderSlNo,
			"accUsedPcs" : ad.usedPcs ,
			"accUsedWt" : ad.usedWt,
			"accCostPrice" : ad.totalCostPrice,
			"accSellingPrice" : ad.totalSellingPrice,

			"returnAccCostPrice" :0.00,
			"returnAccSellingPrice": 0.00,
			"returnAccCostPriceAct" :ad.totalCostPrice,
			"returnAccSellingPriceAct" : ad.totalSellingPrice,
			"usedPcs": ad.usedPcs,
			"usedWt": ad.usedWt,
			"bulkPcs": null,
			"bulkWt": null,
			"returnedPcs": null,
			"returnedWt": null,
			"breakageReceivedPcs" :null,
			"breakageReceived": null,
			"breakageNotReceivedPcs":  null,
			"breakageNotReceived" :null,
			"uom" :"Pcs",
			"accRate" :ad.accCost,
			"accRateN" :ad.accCost,
			"systemCostRateList": 0.00,
			"accRateEdited" :ad.accCost,
			"actAccRateEdited": ad.accCost,
			"accCost": ad.accCost,
			"accHC": 0.00,
			"actAccHC" : 0.00,
			"accHCEdited": 0.00,
			
			"provisional" :false,
			"accCostRange": "",
			"isPsr" : ad.psrNo,
			//"isStock" :"",
			"orderKind": "NO",
			"sellingRate" : 0.00,
			"actSellingRate" : 0.00
		  });
		}
	});
	return accList;
}

$("#saveSplitGR").on('click',function(){
	//getGRDetails();
	var params = {"fieldFilters":{"grSrlNoCount":"1","mrvId":$("#grvNumb").val(),"srlNo":"1"}}
	postJSON('/OrderExecution/api/v1/grSrlNoCount',JSON.stringify(params),function(data) {
		if(data.resCode == 1){
			$.growl.notice ({
				messge : data.mesgStr,
				duration :10000,
				title : 'Success'
			});
			saveSplitGR();
		}else{
			$.growl.error ({
				messge : data.mesgStr,
				duration :10000,
				title : 'Error'
			});
			return false;
		}
	});
});

var saveSplitGR = function(){
	var splitGRObj = 
	{ "grdtos" : getGRDetails(),
	  "vendorId": $("#vendorIdGRC").val(),
	  "mrvId": $("#grvNumb").val(),
	  "mrvSrlNo": headerData.splitMRVSrlNo,
	  "vendorBillNO": headerData.vendorBillNo,
	  "metalSegmentId": headerData.splitList[0].metalSegment.id,
	  "pureRate": headerData.pureRate,
	  "skinPurity": headerData.splitList[0].skinPurity,
	  "skinPurityRate": headerData.skinPurityRate,
	  "meltingPurity":headerData.splitList[0].meltingPurity,
	  "consignmentPeriod": 10,
	  "jwType": headerData.splitList[0].jwTpe	
	}
	console.log(splitGRObj);
	if(splitGRObj){
		postJSON('/OrderExecution/api/v1/splitcreateGRFG',JSON.stringify(splitGRObj),function(data) {
			if (data.resCode == 1) {			
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});				
				$("#saveSplitGR").prop('disabled',true);
				//$("#splitGrSearchSection").show();
				//searchOnload(headerData);
				updateStatus("CreateIGR",splitStockId);
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
				$("#saveSplitGR").prop('disabled',false);
				$("#splitGrSearchSection").hide();
			 }
	    });
	}
}

$("#grMetalAccounting").on('click',function(){
	searchOnload(headerData);
});

var searchOnload = function(headerData){
	console.log(headerData);
	fieldFilters = {
            "fieldFilters" : {
                "mrvNo" : headerData.splitMRVNo.toString(),
                "mrvSrl" : headerData.splitMRVSrlNo.toString(),
                "status" : 	"o"
            }
        };
		$('#grVendorS').val(headerData.splitVendor.vendorName);
		postJSON('/OrderExecution/api/v1/grDetailsByMRVSrl', JSON.stringify(fieldFilters), function(data) {
		if(data.resCode == 1){
			$("#unsettingSplitSection").hide();
			$("#splitGRSection").show();
			$("#splitGrSearchSection").show();
			$("#splitGRCreateSection").hide();
			
			$('#middle').show();
			$("#grVendorS").val($('#vendorGRC').val());
			$("#grStatusS").val("Open");
			$("#grGrvNoS").val(headerData.splitMRVNo + "-" + headerData.splitMRVSrlNo);
			$("#grGrvSlNoS").val(headerData.splitMRVSrlNo);
			
			 var grFGDetails = data.payload.grDetails;
			 
			 $('#grBody').empty();
			 
			 $('#grBody').append("<tr><td style ='background-color: #F5F5F5;'><label>Vendor</label></td>"+
					 "<td>"+headerData.splitVendor.vendorCode+"</td>"+
					 "<td style ='background-color: #F5F5F5;'><label>GRV No.</label></td>"+
					 "<td>&nbsp;"+headerData.splitMRVNo+"<input type='hidden' id='grMrvNo' value='"+headerData.splitMRVNo+"'> </td>"+
						
					 "<td style ='background-color: #F5F5F5;'><label>GRV Srl No.</label></td>"+
					 "<td>&nbsp;"+headerData.splitMRVSrlNo+"<input type='hidden' id='grMrvSlNo' value='"+headerData.splitMRVSrlNo+"'></td>"+

					 "<td style ='background-color: #F5F5F5;'><label>Vendor Bill No.</label></td>"+
					 "<td>&nbsp;"+data.payload.mrvDetails.billNumber+" </td>"+
					 
					 "<td style ='background-color: #F5F5F5;'><label>Metal Segment</label></td>"+
					 "<td>&nbsp;"+data.payload.mrvDetails.metalType.description+" </td>" +

						 "<td style ='background-color: #F5F5F5;'><label>Skin Purity</label></td>"+
					 "<td>&nbsp;"+data.payload.mrvDetails.skinPurity+" </td></tr>"+

					 "<tr>" +		 
					 
					 "<td style ='background-color: #F5F5F5;'><label>IGR Srl No Count</label></td>"+
					 "<td>&nbsp;"+data.payload.mrvDetails.grSrlNoCount +
					 "<td style ='background-color: #F5F5F5;'><label>Skin Purity Rate</label></td>"+
					 "<td>&nbsp;"+data.payload.skinPurityRate+" </td>"+
						
					 "<td style ='background-color: #F5F5F5;'><label>Melting Purity</label></td>"+
					 "<td>&nbsp;"+data.payload.mrvDetails.meltingPurity+" </td>"+
					 
					 "<td style ='background-color: #F5F5F5;'><label>GRV Gross Wt</label></td>"+
					 "<td>&nbsp;"+data.payload.mrvDetails.grossWeight+" </td>"+
						
					 "<td style ='background-color: #F5F5F5;'><label>GRV Net Wt</label></td>"+
					 "<td>&nbsp;"+data.payload.mrvDetails.netWeight+" </td>"+
						
					 "<td style ='background-color: #F5F5F5;'><label>GRV Pure Wt</label></td>"+
					 "<td>&nbsp;"+data.payload.mrvDetails.pureWeight+" </td></tr>");
			 
			 if(null != grFGDetails && grFGDetails.length > 0){
				 
				 grFgDetailsGrid(grFGDetails);	
				 $("#grProcessGrid").show();
				 $('#grDetails').show();
				 $('#grDetailsId').show();
				 completeMRVProcess();
				 
				 $("#compute").attr('disabled', false);					 
				
			 }
		
			}else{
				$("#splitGrSearchSection").hide();
				$("#splitGRCreateSection").show();
			}
		});
}

var grFgDetailsGrid = function(response) {
	var source = {
		datafields : [
			{
				'name' : 'grSrl',
				'type' : 'long'
			}, {
				'name' : 'srl',
				'type' : 'int',
			}, {
				'name' : 'createdOn',
				'type' : 'string'
			}, {
				'name' : 'grossWt',
				'type' : 'double'
			}, {
				'name' : 'netWt',
				'type' : 'double'
			}, {
				'name' : 'pureWt',
				'type' : 'double'
			}, {
				'name' : 'createdBy',
				'type' : 'string'
			}, {
				'name' : 'selectionStatus',
				'type' : 'bool'
			}, {
				'name' : 'isMetalAccountCompleted',
				'type' : 'bool'
			}, {
				'name' : 'isCompleted',
				'type' : 'bool'
			}, {
				'name' : 'view',
				'type' : 'long',
				'map':'srl'
			}

			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	$("#grProcessGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		height : 200,
		theme: 'energyblue',
		columnsheight : 80,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		sortable:false,
		columns : [ 
			{
				'text'  : 'Srl No.',
				'datafield' : 'grSrl',
				'columntype' : 'number',
				'width' : '10%',cellsalign : 'center',align:'center',
				cellendedit : function(row, datafield, columntype, oldvalue,
						newvalue, event) {
				},
				cellsrenderer : function(row, column, value) {
					return '<div style="margin-left:60px; margin-top:8px;" href="#?id=' + (value + 1)	+ '"/>' + (value + 1) + '</div>';
				}

			},{
				'text' : 'IGR Date',
				'datafield' : 'createdOn',
				'width' : '16%',cellsalign : 'center',align:'center',
				editable : false
			},{
				'text' : 'IGR#',
				'datafield' : 'srl',
				'width' : '14%',cellsalign : 'center',align:'center',
				editable : false
			},{
				'text' : 'IGR Gross Wt',
				'datafield' : 'grossWt',cellsalign : 'right',align:'center',
				'width' : '15%',
				editable : false
			},{
				'text' : 'IGR Net Wt',
				'datafield' : 'netWt',cellsalign : 'right',align:'center',
				'width' : '13%',
				editable : false

			},{
				'text' : 'IGR Pure Wt',
				'datafield' : 'pureWt',cellsalign : 'right',align:'center',
				'width' : '13%',
				editable : false

			},{
				'text' : 'IGR Done By',
				'datafield' : 'createdBy',cellsalign : 'center',align:'center',
				'width' : '13%',
				sortable : false,
				editable : false,

			},{
				'text' : 'View',
				datafield : 'view',
				'width' : '3%',
				sortable : false,
				editable : false,
				cellsrenderer : viewDesignVariationRenderer
			},{
				text : '',
				menu : false,
				sortable : false,cellsalign : 'center',align:'center',
				datafield : 'selectionStatus',
				columntype : 'checkbox',
				'width' : '3%',
				cellbeginedit : metalAccount,
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue) {
					if (newvalue) {
						$("#grProcessGrid").jqxGrid('selectrow', row);
					} else {
						$("#grProcessGrid").jqxGrid('unselectrow', row);
					}
					
					var rows = $("#grProcessGrid").jqxGrid('getrows');
					if(typeof rows != "undefined"){
						var checkArray = [];
						for(var i=0; i<rows.length; i++){
							if(rows[i].isMetalAccountCompleted == false && (rows[i].selectionStatus == true || newvalue == true)){
								checkArray.push(rows[i].srl);
							}
						}
					}
					var length;
					if(newvalue == true){
						length = checkArray.length;
					}else{
						length = checkArray.length -1;
					}
					if(length == 0){
						$("#grMetalAccount").attr('disabled', true);
					}else{
						$("#grMetalAccount").attr('disabled', false);
					}
				},
				renderer : function() {
					return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
				}
			}
		]
	});
}

function metalAccount(row, datafield, columntype) {
	var isMetalAccountComp = $('#grProcessGrid').jqxGrid('getcellvalue', row,'isMetalAccountCompleted');
	if (isMetalAccountComp && datafield == "selectionStatus") {
		return false;
	} else {
		return true;
	}
}

var viewDesignVariationRenderer = function(row, column, value) {
	var data =  $("#grProcessGrid").jqxGrid("getCellvalue", row , 'srl');
	var grFgDetailsGrid = "grFgDetailsGrid";
	return '<a class="btn btn-sm btn-primary" disabled data-toggle="modal" data-target="#btnViewGr" type="button" href="grHeaderImage?grId='
				+ data + '"/><i class="fa fa-eye"></i></a>'
		
}

$("#toggle1").on('click', function(){
	$("#panel1").toggle();
});


$("#toggle2").on('click', function(){
	$("#panel2").toggle();
});


$("#toggle3").on('click', function(){
	$("#panel3").toggle();
});

$("#toggle4").on('click', function(){
	$("#panel4").toggle();
});

$("#toggle5").on('click', function(){
	$("#panel5").toggle();
});

$("#toggle6").on('click', function(){
	$("#panel6").toggle();
});

//###################################### Metal Accounting Section #################################
$("#grMetalAccounting").on('click',function(){
	searchOnload(metalAccData);
	$("#unsettingSplitSection").hide();
	$("#splitGRSection").show();
	$("#splitGrSearchSection").show();
	$("#splitGRCreateSection").hide();
});

function metalAccounting() {
	var rows =  $("#grProcessGrid").jqxGrid('getrows');
	var grnoArray = [];
	if(typeof rows != "undefined" && rows.length > 0){
		for(var i=0; i<rows.length; i++){
			if(rows[i].selectionStatus == true){
				grnoArray.push(rows[i].srl);
			}
		}
	}
	var grSlNo = grnoArray.toString();
	
	return grSlNo;
}

$("#grMetalAccount").on("click", function() {
	postJSON('/OrderExecution/api/v1/grMetalAccount', metalAccounting(), function(data) {
		 if(1 == data.resCode){				 
			 $.growl.notice({ message: "IGR metal accounting Done.", duration: 10000, title: 'Success' });	
			 
				$("#grCompleteMRVProcess").attr('disabled', false);
				$("#grMetalAccount").attr('disabled', true);
				updateStatus("IGRMetalAccounting",$("#refDocNoC").val());
			// completeMRVProcess(data.payload.grDetails);
			// window.location.href = "javascript:showContentPage('grProcess', 'bodySwitcher')";
		 }else{
			 
			 	$("#grCompleteMRVProcess").attr('disabled', true);
				$("#grMetalAccount").attr('disabled', false);
				
			 $.growl.error({ message: data.mesgStr, duration: 10000});
		 }
		 
		 var grFGDetails = data.payload.grDetails;			 
		 if(null != grFGDetails && grFGDetails.length > 0){				 
			 grFgDetailsGrid();				 
			 $.each(grFGDetails, function( key, value ) {
				 $("#grProcessGrid").jqxGrid('addrow', null, addGRDetails(value));
			 });				 
			 $('#grDetails').show();				 
		 }
		 
	});
	
});

var updateStatus = function(status, stockId){
	$.getJSON('/OrderExecution/api/v1/changeSplitIGRStatus?splitStockId='+stockId+'&splitIGRStatus='+status, function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			window.location.href="javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')"

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

var completeMRVProcess = function(grArray = null){
	if(grArray == null){
		var rows = $("#grProcessGrid").jqxGrid('getrows');
	}else{
		rows = grArray;
	}
	var checkArray = [];
	var checkArray2 = [];
	var rowLength = 0;
	var grProSrlCount = $("#grProSrlCount").val();
	if(typeof rows != "undefined"){
		var rowLength = rows.length;
		for(var i=0; i<rows.length; i++){
			if(rows[i].isMetalAccountCompleted == false){
				checkArray.push(rows[i].srl);
			}
			
			if(rows[i].isCompleted == false){
				checkArray2.push(rows[i].srl);
			}
		}
	}
	
	if(checkArray2.length == 0 && checkArray.length == 0){
		$("#grCompleteMRVProcess").attr('disabled', true);
		$("#grMetalAccount").attr('disabled', true);
	}else if(checkArray.length == 0 && (grProSrlCount == rowLength) && checkArray2.length > 0){
		$("#grCompleteMRVProcess").attr('disabled', false);
		$("#grMetalAccount").attr('disabled', true);
	}else{
		$("#grCompleteMRVProcess").attr('disabled', true);
		$("#grMetalAccount").attr('disabled', true);
	}
}



//################## Complete MRV Process By Raksha #################
var mrvNo,mrvSrlNo;
$("#grCompleteMRVProcess").on('click',function(){
	var mrvNo,mrvSrlNo;
	$.getJSON('/OrderExecution/api/v1/getGROnLoadForSplitStockId?stockId='+$("#refDocNoC").val(), function(data) {
		if(data.resCode == "1"){
			mrvNo = data.payload.splitMRVNo;
			mrvSrlNo = data.payload.splitMRVSrlNo;
			$("#proceedMivNo").val(mrvNo);
			$("#proceedMivSlNo").val(mrvSrlNo);

			var mrvId = mrvNo;
			//var $link = $(e.target);
			 // e.preventDefault();
			  //if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 500) {
				$.getJSON('/OrderExecution/api/v1/grAnalyze?mrvId='+mrvId+'&mrvSrlNo='+mrvSrlNo,function(data){
					var result = data.payload.compute;
					
					$("#mrvGrsWt").val(result.mrvGrossWt);
					$("#mrvNetWt").val(result.mrvNetWt);
					$("#mrvPureWt").val(result.mrvPurWt);
					
					$("#grGrsWt").val(result.grGrossWt);
					$("#grNetWt").val(result.grNetWt);
					$("#grPureWt").val(result.grPurWt);
					
					$("#diffGrsWt").val(result.diffGrossWt);
					$("#diffNetWt").val(result.diffNetWt);
					$("#diffPureWt").val(result.diffPurWt);
					
					$("#remarks").html(result.remark);
					
				});
		}
	});
	
	//  }
	//  $link.data('lockedAt', +new Date());
});

$("#grProceed").on("click",function() {
	/*var mrvId = $("#grGrvNoS").val().split('-');
	mrvNo = mrvId[0];
	mrvSrl =  mrvId[1];*/
	
	//$("#mrvSrlNo").val(mrvSrl);
	
	var grCompDTO = {
			"mrvId" : $("#proceedMivNo").val(),
			"mrvSlNo" :$("#proceedMivSlNo").val(mrvSrlNo),
		};

		postJSON('/OrderExecution/api/v1/grCompleteMRVProcess', JSON.stringify(grCompDTO), function(data) {
				if (1 == data.resCode) {
					$.growl.notice({message : "IGR GRV process completed.",duration : 10000,title : 'Success'});
					$('#grAnalysis').modal('hide');
					parent.jQuery("#grCompleteMRVProcess").attr('disabled',true);
					parent.jQuery("#saveGrCount").attr('disabled',true);
					parent.jQuery("#grCompleteMRVProcess").attr('disabled',true);
					parent.jQuery("#grProSrlCount").attr('disabled',true);
					
					$("#grCompleteMRVProcessModal").modal('hide');
					
					updateStatus("CompleteMRVProcess",$("#refDocNoC").val());
					
				} else {
						$.growl.error({
							message : data.mesgStr,
							duration : 10000
			});
		}
	});
})