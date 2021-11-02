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

// API call for LOV's

var onLoadReqForCancel = function() {

	$.getJSON('/OrderExecution/api/v1/orderReqCancelLOV?portal=oe',function(data) {
						var slist = data.payload.sList;
						var dclist = data.payload.dcList;
						var rList = data.payload.rList;
						var orderType = data.payload.orderType;
						
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

						var o = '<select id="orderTypeObj" name="orderTypeObj" class="form-control"><option value="">--select--</option>';
						$.each(orderType, function(key, val) {
							o += '<option value="' + val.id + '">' + val.name
									+ '</option>';
						});
						o += '</select>';
						$("#orderTypeS").html(o);
						/*$('#orderTypeObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
						});*/
						
						// Region LOV

						var r = '<select id="regionObj" name="regionObj" class="form-control" multiple="multiple">';
						$.each(rList, function(key, val) {
							r += '<option value="' + val.id + '">'+ val.name + '</option>';							
						});
						r += '</select>';
						$("#regionS").html(r);
						$('#regionObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
						});

					});

}
onLoadReqForCancel();

$("#dcName").hide();
$("#storeName").hide();

//Field Filters
var reqForCancelFieldFilters = function() {

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
	/*if (orderTypeObj == null || orderTypeObj == "") {
		var orderTypeS = "";
	} else {
		var orderTypeS = orderTypeObj.join(",");
	}*/
	var dcNameObj = $('#dcNameObj').val();
	if (dcNameObj == null || dcNameObj == "") {
		var dcNameS = "";
	} else {
		var dcNameS = dcNameObj.join(",");
	}
	var regionObj = $('#regionObj').val();
	if (regionObj == null || regionObj == "") {
		var regionS = "";
	} else {
		var regionS = regionObj.join(",");
	}

	if (orderTypeObj != "" && orderTypeObj != null) {
		fieldFilters.fieldFilters["orderType"] = orderTypeObj;
	}

	if (dcNameS != "" && dcNameS != null) {
		fieldFilters.fieldFilters["dcName"] = dcNameS;
	}
	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["storeName"] = storeNameS;
	}
	if (regionS != "" && regionS != null) {
		fieldFilters.fieldFilters["region"] = regionS;
	}
	return fieldFilters;
}

var reqForCancelGrid = function(){
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	
var datafields = [ {
		 name : 'orderSource',
		 type : 'string',
		 'map':'storeOrDC>name'
		},{ 
			name: 'orderType',
			type:'string',
			'map':'orderTyp>name'	
		},{
			name: 'orderNo',
			type:'long',
			'map': 'id'
		},{ 
			name: 'advPaid',
			type:'double',
			'map':'advance'
		},{ 
			name: 'advUnRealized',
			type:'string',
			'map':'unrealizedChequeDDAmount'
		},{ 
			name: 'metalGiven',
			type:'string',
			'map':'creditAccGoldOrSilverWt'
		},{ 
			name: 'metalGivenPlatinum',
			type:'string',
			'map':'creditAccountPlatinumWeight'
		},{
			name:'orderItems',
			type:'array'
		}];
 var  columns = [{ 
		 text: 'Store/DC Name', 
		 datafield: 'orderSource', 
		 width: '10%',
		 editable : false,
		 cellsalign : 'center',
		 align : 'center'
	 },{ 
		text: 'Order Type',
		datafield: 'orderType', 
		width: '13%',
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},{ 
		text: 'Order No',
		datafield: 'orderNo',
		width: '10%',
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},{
		 text: 'Advance Paid',
		 datafield: 'advPaid', 
		 width: '18%',
		 editable : false,
		 cellsalign : 'right',
		align : 'center'
	},{ 
		 text: 'Advance Unrealized',
		 datafield: 'advUnRealized',
		 width: '13%',
		 editable : false,
		 cellsalign : 'right',
		 align : 'center'
	},{ 
		text: 'Metal Given Gold/Sliver',
	    datafield: 'metalGiven',
		width: '18%',
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center'
	},
	{ 
		text: 'Metal Given Platinum',
	    datafield: 'metalGivenPlatinum',
		width: '18%',
		cellsformat : 'd3',
		editable : false,
		cellsalign : 'right',
		align : 'center'
	}];

  showMyGrid(datafields,
		"/OrderExecution/api/v1/requestForOrderCancellation?page=search&portal=oe", "list", columns, reqForCancelFieldFilters(),updateRows, "");
	

var initrowdetails = function (index, parentElement, gridElement, record) {
	var id = record.uid.toString();
	var grid = $($(parentElement).children()[0]);
	var data = record.orderItems;

	var inlineSource = {
			datafields : [
	    {
		    name : 'orderSl',
		    type : 'int',
		    'map': 'serialNumber'
		},{ 
			name: 'orderKind',
			type:'string',
			'map':'oKind>id'
		},{ 
			name: 'psrNo',
			type:'string',
			'map':'psrNumber'
		},{ 
			name: 'segment',
			type:'string',
			'map':'metalId>description'
		},{
			name: 'jewelType',
			type:'string',
			'map':'jewelType>description'
		},{ 
			name: 'artDesc',
			type:'string',
			'map':'articleMaster>description'
		},{ 
			name: 'oStatus',
			type:'string',
			'map':'orderItemStatusType'
		},{ 
			name: 'oSkinPurity', 
			type:'long',
			'map':'orderItemSkinPurity>skinPurity'
		},{ 
			name: 'oMeltingPurity',
			type:'long',
			'map':'orderItemMeltingPurity'
		},{ 
			name: 'pRepSkinPurity',
			type:'long',
			'map':'preRepairSkinPurity>skinPurity'
		},{ 
			name: 'pRepMeltingPurity',
			type:'int',
			'map':'preRepairMeltingPurity'
		},{ 
			name: 'dueDate',
			type:'date',
			'map':'orderItemDueDate'
		},{ 
			name: 'fGrossWt',
			type:'string',
			'map':'finishedGrossWeight'
		},{ 
			name: 'fNetWt', 
			type:'string',
			'map':'finishedNetWeight'
		},{ 
			name: 'pRepGrossWt',
			type:'string',
			'map':'preRepairGrossWeight'
		},{ 
			name: 'pRepNetWt', 
			type:'string',
			'map':'preRepairNetWeight'
		},{ 
			name: 'storeDC',
			type:'string',
			'map':'storeOrDc>name'
		},{ 
			name: 'salesExcutiveName', 
			type:'string',
			'map' :'orderCreatedBy'
		},{
			name:'stones',
			type:'array'
		},{
			name:'accessories',
			type:'array'
		}],
	
		id : 'id',
		localdata : data,
		datatype : 'json'
	};
	if (data.length != 0) {
		
		grid.jqxGrid({
			source : inlineSource,
			width : "99%",
			height : 470,
			rowsheight : 45,
			theme: 'energyblue',
			columnsheight: 110,
			enabletooltips : true,
			columnsresize : true,
			rowdetails : true,
			rowsheight : 35,
			rowdetailstemplate : {
				rowdetails : "<div id='grid1' style='margin-bottom: 40px; margin-top: 10px;'></div><div id='grid2' style='margin-bottom: 40px; margin-top: 10px;'></div>",
				rowdetailsheight : 500,
				rowdetailshidden : true
			},
			initrowdetails :initrowdetails3,
				
	columns: [{ 
		 text: 'Order Sl', 
		 datafield: 'orderSl', 
		 width: '3.5%',
		 cellsalign: 'center', 
		 align: 'center',
		 editable : false
	 },{ 
		 text: 'Order Kind',
		 datafield: 'orderKind', 
		 width: '5%',
		 cellsalign: 'center', 
		 align: 'center',
		 editable : false
	 },{ 
		 text: 'PsrNo',
		 datafield: 'psrNo', 
		 width: '5%',
		 cellsalign: 'center', 
		 align: 'center',
		 editable : false
	 },{ 
		 text: 'Seg',
		 datafield: 'segment', 
		 width: '5%',
		 cellsalign: 'center', 
		 align: 'center',
		 editable : false
	 },{ 
		 text: 'Jewel Type',
		 datafield: 'jewelType',
		 width: '5%',
		 cellsalign: 'left', 
		 align: 'center',
		 editable : false
	 },{
		 text: 'Article Desc',
		 datafield: 'artDesc', 
		 width: '7%',
		 cellsalign: 'left', 
		 align: 'center',
		 editable : false
	 },{ 
		 text: 'Order Item Status',
		 datafield: 'oStatus',
		 width: '5.5%',
		 cellsalign: 'center',
		 align: 'center',
		 editable : false
	 },{
		 text: 'Order Item Skin Purity',
		 datafield: 'oSkinPurity', 
		 width: '6%' ,
		 cellsformat : 'd2',
		 cellsalign: 'right',
		 align: 'center',
		 editable : false
	 },{ 
		 text: 'Order Item Melting Purity',
		 datafield: 'oMeltingPurity',
		 width: '6%',
		 cellsformat : 'd2',
	     cellsalign: 'right', 
		 align: 'center',
		 editable : false
	},{ 
		text: 'Pre-Repair Skin Purity',
		datafield: 'pRepSkinPurity',
		width: '6%',
		cellsformat : 'd2',
		cellsalign: 'right', 
		align: 'center',
		editable : false
	},{ 
		text: 'Pre-Repair Melting Purity',
		datafield: 'pRepMeltingPurity',
		width: '8%',
		cellsformat : 'd2',
		cellsalign: 'right', 
		align: 'center',
		editable : false
	},{
		text: 'Order Due Dt',
		datafield: 'dueDate', 
		'cellsformat' : 'dd/MM/yyyy',
		width: '6%', 
		cellsalign: 'center',
		align: 'center',
		editable : false
	 },{ 
		text: 'Fin Gross Wt.',
		datafield: 'fGrossWt',
		width: '6%',
		cellsformat : 'd3',
		cellsalign: 'right',
		align: 'center',
		editable : false
	},{
		 text: 'Fin Net Wt.',
		 datafield: 'fNetWt', 
		 width: '6%',
		 cellsformat : 'd3',
		 cellsalign: 'right',
		 align: 'center',
		 editable : false
		 },{ 
   		 text: 'Pre-Repair Gross Wt.',
   		 datafield: 'pRepGrossWt',
   		 width: '8%',
   		 cellsformat : 'd3',
   		 cellsalign: 'right', 
   		 align: 'center',
   		 editable : false
   	},{
   		 text: 'Pre-Repair Net Wt.',
   		 datafield: 'pRepNetWt', 
   		 width: '8%',
   		 cellsformat : 'd3',
   		 cellsalign: 'right', 
   		 align: 'center',
   		 editable : false
   	},{
   	   	 text: 'Store/DC Name',
   	   	 datafield: 'storeDC', 
   	   	 width: '7%',
   	   	 cellsalign: 'center', 
   	   	 align: 'center',
   	     editable : false
   	 },{
   	   	 text: 'Order Created By',
   	   	 datafield: 'salesExcutiveName', 
   	   	 width: '7%',
   	   	 cellsalign: 'center', 
   	   	 align: 'center',
   	  editable : false
   	   }],
	});
  }
}

var initrowdetails3 = function (index, parentElement, gridElement, record) {
	var id = record.uid.toString();
	var grid = $($(parentElement).children()[0]);
	var grid2 = $($(parentElement).children()[1]);
	var dataStones = record.stones;
	
	if(dataStones == null){
		$("#sDet").hide();
		dataStones = [];
	}
	else{
		grid.before('<br/><h4 id="sDet"><u>Stone Details</u></h4>');
	}
	var dataAcc = record.accessories;
	if(dataAcc == null){
		$("#aDets").hide();
		dataAcc = [];	
	}else{
		grid2.before('<h4 id="aDets"><u>Accessory Details</u></h4>');
	}
	
	var inlineSource3 = {
			datafields : [{
				    name : 'ordSl',
				    type : 'int',
				    'map':'serialNumber' 
				},{ 
					name: 'supBy',
					type:'string',
					'map':'suppliedBy>name'
				},{
					name: 'stoneCode',
					type:'string',
					'map':'code>name'
				},{
					name: 'subCatDesc',
					type:'string',
					'map':'subCategoryDesc'
				},{
					name: 'custGivenWt',
					type:'long',
					'map':'custWeight'
				},{
					name: 'custGivenPcs',
					type:'long',
					'map':'custPieces'
				},{
					name: 'handlingCharge',
					type:'long',
					'map':'custPrice'
				},{
					name: 'custRetWt',
					type:'long',
					'map':'custWeight'
				},{
					name: 'custRetPcs',
					type:'long',
					'map':'custPieces'
				},{
					name: 'compGivenWt',
					type:'long',
					'map':'compWeight'
				},{
					name: 'compGivenPcs',
					type:'long',
					'map':'compPieces'
				},{
					name: 'compRetWt',
					type:'long',
					'map':'compWeight'
				},{
					name: 'compRetPcs',
					type:'long',
					'map':'compPieces'
				}],
				id : 'id',
				localdata : dataStones,
				datatype : 'json'
	
	};
	
	
	var inlineSource4 = {
			datafields : [
				 {
					 name : 'orderSlNo',
					 type : 'int',
					 'map':'serialNumber'
						 
					},{ 
						name: 'suppBy',
						type:'string',
						'map':'suppliedBy>name'
					},{
						name: 'accCode',
						type:'string',
						'map':'AccSegment>code'
					},{
						name: 'subCatDescp',
						type:'string',
						'map':'subCategory>description'
					},{
						name: 'cusGivenWt',
						type:'long',
						'map':'custWeight'
					},{
						name: 'cusGivenPcs',
						type:'long',
						'map':'custPieces'
					},{
						name: 'cusMivWt',
						type:'long',
						'map':'custWeight'
					},{
						name: 'cusMivPcs',
						type:'long',
						'map':'custPieces'
					},{
						name: 'comGivenWt',
						type:'long',
						'map':'compWeight'
					},{
						name: 'comGivenPcs',
						type:'long',
						'map':'compPieces'
					},{
						name: 'comRetWt',
						type:'long',
						'map':'compWeight'
					},{
						name: 'comRetPcs',
						type:'long',
						'map':'compPieces'
					},{
						name: 'custHanglingCharge',
						type:'long',
						'map':'rate'
					}],
					id : 'id',
					localdata : dataAcc,
					datatype : 'json'
				
	}
	
	if (dataStones.length != 0) {
		grid.jqxGrid({
			source : inlineSource3,
			width : "99%",
			height : 150,
			theme: 'energyblue',
			rowsheight : 35,
			columnsheight: 85,
			enabletooltips : true,
			columnsresize : true,
			columns: [{ 
	    		 text: 'Order Sl.', 
	    		 datafield: 'ordSl', 
	    		 width: '4%',
	    		 cellsalign: 'center', 
	    		 sortable : true,
	    		 editable : false,
	    		 align: 'center'
	    	 },{ 
	    		text: 'Supplied By',
	    		datafield: 'supBy', 
	    		width: '8%',
	    		sortable : true,
	    		 cellsalign: 'center', 
	    		 editable : false,
	    		 align: 'center'
	    	 },{ 
	    		text: 'Stone Code',
	    		datafield: 'stoneCode',
	    		width: '6%',
	    		sortable : true,
	    		editable : false,
	    		cellsalign: 'center', 
	    		align: 'center'
	    	 },{
	    		 text: 'Sub Cat Desc',
	    		 datafield: 'subCatDesc', 
	    		 width: '10%' ,
	    		 cellsalign: 'left',
	    		 editable : false,
	    		 align: 'center'
	    	 },{
	    		 text: 'Cust Given Wt.',
	    		 datafield: 'custGivenWt', 
	    		 width: '8%' ,
	    		 cellsformat : 'd3',
	    		 cellsalign: 'right', 
	    		 editable : false,
	    		 align: 'center'
	    			 
	    	 },{
	    		 text: 'Cust Given Pcs.',
	    		 datafield: 'custGivenPcs', 
	    		 width: '8%' ,
	    		 cellsalign: 'center', 
	    		 editable : false,
	    		 align: 'center'
	    	 },{
	    		 text: 'Handling Charges Price',
	    		 datafield: 'handlingCharge', 
	    		 width: '8%' ,
	    		 cellsformat : 'd2',
	    		 editable : false,
	    		 cellsalign: 'right', 
	    		 align: 'center'
	    	 },{
	    		 text: 'Cust Retd. Wt.',
	    		 datafield: 'custRetWt', 
	    		 width: '8%' ,
	    		 cellsformat : 'd3',
	    		 editable : false,
	    		 cellsalign: 'right', 
	    		 align: 'center'
	    	 },{
	    		 text: 'Cust Retd. Pcs',
	    		 datafield: 'custRetPcs', 
	    		 width: '8%' ,
	    		 editable : false,
	    		 cellsalign: 'center', 
	    		 align: 'center'
	    	 },{
	    		 text: 'Company Given Wt.',
	    		 datafield: 'compGivenWt', 
	    		 width: '8%' ,
	    		 cellsformat : 'd3',
	    		 editable : false,
	    		 cellsalign: 'right', 
	    		 align: 'center'
	    	 },{
	    		 text: 'Company Given Pcs',
	    		 datafield: 'compGivenPcs', 
	    		 width: '8%' ,
	    		 editable : false,
	    		 cellsalign: 'center', 
	    		 align: 'center'
	    	 },{
	    		 text: 'Company Retd. Wt.',
	    		 datafield: 'compRetWt', 
	    		 width: '8%' ,
	    		 cellsformat : 'd3',
	    		 editable : false,
	    		 cellsalign: 'right', 
	    		 align: 'center'
	    	 },{
	    		 text: 'Company Retd. Pcs',
	    		 datafield: 'compRetPcs', 
	    		 width: '8%' ,
	    		 editable : false,
	    		 cellsalign: 'center', 
	    		 align: 'center'
	    	 }],
	    	 showaggregates : true,
	    	 showstatusbar : true
		});	
	  }
	
	if (dataAcc.length != 0) {
		
		grid2.jqxGrid({
			source : inlineSource4,
			width : "99%",
			height : 400,
			theme: 'energyblue',
			rowsheight : 35,
			columnsheight: 85,
			enabletooltips : true,
			columnsresize : true,
			  columns: [
				     { 
				 		 text: 'Order Sl', 
				 		 datafield: 'orderSlNo', 
				 		 width: '4%',
				 		 editable : false,
				 		 cellsalign: 'center',
			    		 align: 'center'
				 	 },{ 
				 		text: 'Supplied By',
				 		datafield: 'suppBy', 
				 		width: '8%',
				 		editable : false,
				 		cellsalign: 'center',
			    		align: 'center'
				 	 },{ 
				 		text: 'Acc. Code',
				 		datafield: 'accCode',
				 		width: '6%',
				 		editable : false,
				 		cellsalign: 'center',
			    		align: 'center'
				 	 },{ 
				 		 text: 'Sub Cat Desc',
				 		 datafield: 'subCatDescp',
				 		 width: '10%',
				 		 editable : false,
				 		 cellsalign: 'left',
			    		 align: 'center'
				 	},{ 
				 		text: 'Cust Given Wt.',
				 		datafield: 'cusGivenWt',
				 		width: '8%',
				 		editable : false,
				 		cellsformat : 'd3',
				 		cellsalign: 'right',
			    		align: 'center'
				 	},{
				 		 text: 'Cust Given Pcs. ',
				 		 datafield: 'cusGivenPcs', 
				 		 width: '8%',
				 		 editable : false,
				 		 cellsalign: 'center',
			    		 align: 'center'
				 	 },{
				 		 text: 'Handling Charges Prices',
				 		 datafield: 'custHanglingCharge', 
				 		 width: '8%',
				 		 editable : false,
				 		 cellsformat : 'd2',
				 		 cellsalign: 'right',
			    		 align: 'center'
				 	 },{
				 		 text: 'Cust Ret Wt.',
				 		 datafield: 'cusMivWt', 
				 		 width: '8%',
				 		 editable : false,
				 		 cellsformat : 'd3',
				 		 cellsalign: 'right',
			    		 align: 'center'
				 	 },{
				 		 text: 'Cust Ret Pcs',
				 		 datafield: 'cusMivPcs', 
				 		 width: '8%',
				 		 editable : false,
				 		 cellsalign: 'center',
			    		 align: 'center'
				 	 },{
				 		 text: 'Company Given Wt.',
				 		 datafield: 'comGivenWt', 
				 		 width: '8%',
				 		 editable : false,
				 		 cellsformat : 'd3',
				 		 cellsalign: 'right',
			    		 align: 'center'
				 	 },{
				 		 text: 'Company Given Pcs',
				 		 datafield: 'comGivenPcs', 
				 		 width: '8%',
				 		 editable : false,
				 		 cellsalign: 'center',
			    		 align: 'center'
				 	 },{
				 		 text: 'Company Retd Wt.',
				 		 datafield: 'comRetWt', 
				 		 width: '8%',
				 		 editable : false,
				 		 cellsformat : 'd3',
				 		 cellsalign: 'right',
			    		 align: 'center'
				 	 },{
				 		 text: 'Company Retd Pcs',
				 		 datafield: 'comRetPcs', 
				 		 width: '8%',
				 		 editable : false,
				 		 cellsalign: 'center',
			    		 align: 'center'
				 	 }],
				 	showaggregates : true,
					showstatusbar : true,
		});
		}

}



$("#jqxgrid").jqxGrid({
	width : '100%',
    sortable: true,            
 	altrows: true,
	columnsresize: true, 
	rowsheight : 35,
	theme: 'energyblue',
	rowdetails : true,
	virtualmode : true,
	initrowdetails : initrowdetails,
	rowdetailstemplate : {
		rowdetails : "<div id='grid' style='margin-bottom: 40px; margin-top: 10px;'></div>",
		rowdetailsheight : 400,
		rowdetailshidden : true	
	  }
   });
};


$('#reqForCancellation').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"orderTypeObj" : {
			required : true
		}
	},
	errorPlacement : function(error, element) {
		if (element.context.name == "orderTypeObj") {
			error.insertAfter(element.parent());
		} else {
			error.insertAfter(element);
		}
	},
	submitHandler : function(form) {
		reqForCancelGrid();
		$("#jqxgrid").show();
		return false;
	}
});


$('#clearAll').on('click', function() {
	$('#regionObj').multiselect("clearSelection");
	$('#dcNameObj').multiselect("clearSelection");
	$('#storeNameObj').multiselect("clearSelection");
	//$('#orderTypeObj').multiselect("clearSelection");
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});


//*******************************EXPORT*******************************************

$("#export").on("click",function(){
	var count = 0;
	var data;
	var orderTypeS = $("#orderTypeS").val();
	var regionS = $("#regionS").val();
	var storeNameS = $("#storeNameS").val();
	var dcNameS = $("#dcNameS").val();
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
	/*if (orderTypeObj == null || orderTypeObj == "") {
		var orderTypeS = "";
	} else {
		var orderTypeS = orderTypeObj.join(",");
	}*/
	var dcNameObj = $('#dcNameObj').val();
	if (dcNameObj == null || dcNameObj == "") {
		var dcNameS = "";
	} else {
		var dcNameS = dcNameObj.join(",");
	}
	var regionObj = $('#regionObj').val();
	if (regionObj == null || regionObj == "") {
		var regionS = "";
	} else {
		var regionS = regionObj.join(",");
	}

	if (orderTypeObj != "" && orderTypeObj != null) {
		fieldFilters.fieldFilters["orderType"] = orderTypeObj;
	}

	if (dcNameS != "" && dcNameS != null) {
		fieldFilters.fieldFilters["dcName"] = dcNameS;
	}
	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["storeName"] = storeNameS;
	}
	if (regionS != "" && regionS != null) {
		fieldFilters.fieldFilters["region"] = regionS;
	}

	var newData = [];
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
			postJSON('/OrderExecution/api/v1/requestForOrderCancellation?page=export&portal=oe',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
					data = response.payload.list;
					exportExcelSideBySide(data);
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
	 }
});

$("#storeDCType").change(function(){
	if($(this).val()=="store"){
		$("#storeName").show();
		$("#dcName").hide();
	}
	if($(this).val()=="dc"){
		$("#dcName").show();
		$("#storeName").hide();
	}
	if($(this).val()==""){
		$("#dcName").hide();
		$("#storeName").hide();
	}
})

function exportExcelSideBySide(data)
{
    /*---- Following queries used for Master-children side-by-side export ----*/
    // Query to get Master fields
	var sql0 = 'SEARCH / AS @o \
					RETURN ( \
						   @o->storeOrDCType AS [Store/DC Name], \
						   @o->[orderTyp]->name AS [Order Type], \
						   @o->id AS [Order_No], \
						   @o->advance AS [Advance Paid], \
						   @o->unrealizedChequeDDAmount AS [Advance Unrealized], \
						   @o->creditAccGoldOrSilverWt AS [Metal Given Gold/Silver],\
		                   @o->creditAccountPlatinumWeight AS [Metal Given Platinum] \
						) \
					FROM $0';
    var sql1 = 'SEARCH / AS @o \
    				orderItems / AS @oi \
    				RETURN ( \
    					   @o->id AS [Order_No], \
    					   @oi->serialNumber AS [Order_Sl_No], \
					       @oi->[oKind]->id AS [Order_Kind], \
					       @oi->psrNumber AS [PSR_No], \
    					   @oi->[metalId]->description AS [Segment], \
    					   @oi->[jewelType]->description AS [Jewel Type], \
    					   @oi->[articleMaster]->description AS [Article Desc], \
    					   @oi->orderItemStatusType AS [Order Item Status], \
    					   @oi->[orderItemSkinPurity]->skinPurity AS [Order Item Skin Purity], \
    					   @oi->orderItemMeltingPurity AS [Order Item Melting Purity], \
    					   @oi->[preRepairSkinPurity]->skinPurity AS [Pre-Repair Skin Purity], \
    					   @oi->preRepairMeltingPurity AS [Pre-Repair Melting Purity], \
    					   @oi->orderItemDueDate AS [Order Due Dt], \
    					   @oi->finishedGrossWeight AS [Fin Gross Wt], \
    					   @oi->finishedNetWeight AS [Fin Net Wt], \
    					   @oi->preRepairGrossWeight AS [Pre-Repair Gross Wt], \
    					   @oi->preRepairNetWeight AS [Pre-Repair Net Wt], \
				    	   @oi->[storeOrDc]->name AS [Store/DC Name], \
				    	   @oi->orderCreatedBy AS [CreatedBy] \
    					) \
    				FROM $0';
    // Query to get first child records (stones)
	var sql2 = 'SEARCH / AS @o\
					orderItems / AS @oi\
							stones / AS @s \
	    				RETURN ( \
							   @o->id AS [Order_No], \
							   @oi->serialNumber AS [Order_Sl_No], \
							   @s->serialNumber AS [SL_NO], \
	    					   @s->[suppliedBy]->name AS [Stone_Supplied_By ], \
							   @s->[code]->name AS [Stone_Stone_Code ], \
							   @s->subCategoryDesc AS [Stone_Sub_Cat_Desc], \
	      					   @s->custWeight AS [Stone_Cust_Given_Wt], \
							   @s->custPieces AS [Stone_Cust_Given_Pcs], \
						       @s->custPrice AS [Stone_Handling_Charges_Price], \
							   @s->custWeight AS [Stone_Cust_Retd_Wt], \
							   @s->custPieces AS [Stone_Cust_Retd_Pcs], \
							   @s->compWeight AS [Stone_Company_Given_Wt], \
							   @s->compPieces AS [StoneCompany_Given_Pcs], \
		   					   @s->compWeight AS [Stone_Company_Retd_Wt], \
		   					   @s->compPieces AS [Stone_Company_Retd_Pcs] \
	    					) \
	    				FROM $0';

    // Query to get second child records (accessories)
	var sql3 = 'SEARCH / AS @o\
					orderItems / AS @oi\
							accessories / AS @a \
	    				RETURN ( \
							   @o->id AS [Order_No], \
							   @oi->serialNumber AS [Order_Sl_No], \
							   @a->serialNumber AS [SL_NO], \
	    					   @a->[suppliedBy]->name AS [Acc_Supplied_By], \
							   @a->[AccSegment]->code AS [Acc_Code], \
							   @a->[subCategory]->description AS [Acc_Sub_Cat_Desc], \
	      					   @a->custWeight AS [Acc_Cust_Given_Wt], \
							   @a->custPieces AS [Acc_Cust_Given_Pcs.], \
							   @a->custPrice AS [Acc_Handling_Charges_Prices], \
							   @a->custWeight AS [Acc_Cust_Retd_Wt], \
		   					   @a->custPieces AS [Acc_Cust_Retd_Pcs], \
							   @a->compWeight AS [Acc_Company_Given_Wt], \
							   @a->compPieces AS [Acc_Company_Given_Pcs], \
							   @a->compWeight AS [Acc_Company_Retd_Wt], \
							   @a->compPieces AS [AccCompany_Retd_Pcs] \
	      					) \
	    				FROM $0';
	
    // Query to join first & second child records (stones + accessories)
    var sql4 = 'SELECT * FROM ? AS m FULL OUTER JOIN ? AS s ON m.[Order_No] = s.[Order_No] AND m.[Order_Sl_No] = s.[Order_Sl_No] AND m.[SL_NO] = s.[SL_NO]';
    // Query to join master and child records (master + stones + accessories)
    var sql5 = 'SELECT * FROM ? AS m FULL OUTER JOIN ? AS a ON m.[Order_No] = a.[Order_No] AND m.[Order_Sl_No] = a.[Order_Sl_No]';
    
    var sql6 = 'SELECT * FROM ? AS m FULL OUTER JOIN ? AS o ON m.[Order_No] = o.[Order_No]';

    var res = null;
    var res0 = null;
    var res1 = null;
    var res2 = null;
    var res3 = null;
    
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
    	var i = j = 0;
    	for(i=0;i<data.length;i++){
        	if(null == data[i].orderItems){
        		data[i].orderItems = [];
        	}
    		for(j=0;j<data[i].orderItems.length;j++){
    			if(null == data[i].orderItems[j].accessories){
    				data[i].orderItems[j].accessories = [];
        		}
        		if(null == data[i].orderItems[j].stones){
        			data[i].orderItems[j].stones = [];
        		}
    		}
    	}
    	// Following code generates export data as Master-Child side-by-side
    	res0 = alasql(sql0,[data]);
    	res1 = alasql(sql1,[data]);
    	res2 = alasql(sql2,[data]);
    	res3 = alasql(sql3,[data]);	
    	res = alasql(sql4,[res2, res3]);
    	res = alasql(sql5,[res1, res]);
    	res = alasql(sql6,[res0, res]);
    	adjustObjectKeys(res); 
    	removeNullData(res);
    	res = alasql("SELECT * INTO XLSX('OrderRequestForCancellationReport.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	console.log(err.message);
    }
}

