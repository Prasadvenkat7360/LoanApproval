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

//################################# Create Grids Started ###########################################3
var assembleSbDetGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{name : 'sbNo', type : 'int','map' : 'sbRetHeaderId'}, 
			{name : 'slNo', type : 'int','map' : 'serialNumber'},
			{name : 'sbRetHeaderId', type : 'int','map' : 'sbRetHeaderId'},

			{name: 'materialType', type: 'string','map':'materialType>id'},
			{name: 'grWt', type: 'float','map':'grossWeight'},
			{name : 'ntWt', type : 'float','map':'netWeight'},
			{name : 'costCode', type : 'string','map' : 'costCode'},
			{name : 'pcs', type : 'int','map': 'pieces'},
			{name : 'jewelType', type : 'string','map' : 'jewelType>name'},
			{name : 'segment', type : 'string','map': 'metalSegment>description'},
			{name : 'spurity', type : 'float','map' : 'skinPurity'},
			{name : 'mpurity', type : 'float','map' : 'meltingPurity'},
			{name : 'wastageWt', type : 'float','map' :'wastageWeight'},
			{name : 'salesRetAmt', type : 'float','map' :'amount'},
			{name : 'makingCharges', type : 'float'},
			{name : 'costMakingCharges', type : 'float'},
			{name : 'costWastageWt', type : 'float'},
			{name : 'segId', type : 'int','map': 'metalSegment>id'},
			{name : 'jewId', type : 'int','map' : 'jewelType>id'},
			{name : 'segCode', type : 'string','map' : 'metalSegment>name'},
			{name : 'hsnId', type : 'int','map': 'hsnMasterDTO>id'},
			{name : 'hsnCode', type : 'string','map' : 'hsnMasterDTO>hsnCode'},
			{name : 'hsnDesc', type : 'string','map' : 'hsnMasterDTO>hsnDescription'},
			{name : 'metalAccLocation', type : 'string','map': 'metalAccLocation'},
			{name : 'id', type : 'int','map' : 'id'}, 
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridSBAssembleHeader").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
		columns : [
			{ text : 'Sale Bill Ret Det No', datafield : 'sbNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sl No.', datafield : 'slNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'materialType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'HSN Id', datafield : 'hsnDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt.', datafield : 'grWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Net Wt.', datafield : 'ntWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Cost Code', datafield : 'costCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pcs', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Jewel Type', datafield : 'jewelType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Segment', datafield : 'segment', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Skin Purity', datafield : 'spurity', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Melting Purity', datafield : 'mpurity', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Wastage Wt.', datafield : 'wastageWt', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Sales Return Amt', datafield : 'salesRetAmt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			
			{text : '',datafield : 'makingCharges', hidden: true,cellsformat : 'd2'}, 
			{text : '',datafield : 'costMakingCharges',  hidden: true,cellsformat : 'd2'},
			{text : '',datafield : 'costWastageWt', hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'segId',  hidden: true},
			{text : '',datafield : 'jewId', hidden: true}, 
			{text : '',datafield : 'segCode',  hidden: true},
			{text : '',datafield : 'hsnId', hidden: true}, 
			{text : '',datafield : 'hsnCode',  hidden: true},
			{text : '',datafield : 'metalAccLocation',  hidden: true},

			{text : '',datafield : 'sbRetHeaderId',  hidden: true},
			{text : '',datafield : 'id',  hidden: true},

		]
	});
}

//Assemble Stone Grid 
var assembleSbStoneDetGrid = function(data1){
	var source = {
        localdata: data1,
        datatype: "json",
		datafields : [ 
			{name : 'sbNo', type : 'int','map' : 'id'}, 
			{name : 'stoneSlNo', type : 'int','map' : 'stoneSrlNumber'},
			{name: 'suppBy', type: 'string','map':'suppliedBy>id'},
			{name: 'stoneCode', type: 'string','map':'stoneCode'},
			{name : 'stWt', type : 'float','map':'weight'},
			{name : 'stPcs', type : 'int','map' : 'pieces'},
			{name : 'uom', type : 'string','map': 'uom>id'},
			{name : 'segment', type : 'string','map' : 'stoneSegment>name'},
			{name : 'category', type : 'string','map': 'stoneCategory>name'},
			{name : 'subCat', type : 'string','map' :'stoneSubCategory>id'},
			{name : 'cut', type : 'string','map' :'cutGrade'},
			{name : 'color', type : 'string','map' : 'color'},
			{name : 'clarity', type : 'string','map':'clarity'},
			{name : 'stoneValue', type : 'float','map' : 'stoneSellingRate'},
			{name : 'wtRange', type : 'string','map' :'weightCostRange'},
			
			
			{name : 'actualCol', type : 'string','map': 'actualColor'},
			{name : 'segId', type : 'int','map' : 'stoneSegment>id'},
			{name : 'catId', type : 'int','map' : 'stoneCategory>id'},
			{name : 'stoneSellingRate', type : 'float'},
			{name : 'stoneSellingPrice', type : 'float'},
			
			{name : 'stoneCostRate', type : 'float'},
			{name : 'stoneCostPrice', type : 'float'},
			{name : 'shapeId', type : 'int'},
			{name : 'shapeCode', type : 'string'},
			{name : 'shapeDesc', type : 'string'},
			{name : 'detSrlNo', type : 'int'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridSBStoneDetails").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
		
		columns : [
			{ text : 'Sale Bill Ret Det No', datafield : 'sbNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Sl No', datafield : 'stoneSlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Code', datafield : 'stoneCode', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Weight', datafield : 'stWt', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Pcs', datafield : 'stPcs', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uom', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Segment', datafield : 'segment', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Category', datafield : 'category', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCat', width : '10%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Cut', datafield : 'cut', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Color', datafield : 'color', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'clarity', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Value', datafield : 'stoneValue', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
			{ text : 'Wt Range', datafield : 'wtRange', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{text : '',datafield : 'detSrlNo', hidden: true}, 
			{text : '',datafield : 'actualCol', hidden: true}, 
			{text : '',datafield : 'segId',  hidden: true},
			{text : '',datafield : 'catId',  hidden: true},
			{text : '',datafield : 'stoneSellingRate', hidden: true, cellsformat : 'd2'}, 
			{text : '',datafield : 'stoneSellingPrice',hidden : true, cellsformat : 'd2'},
			{text : '',datafield : 'stoneCostRate',hidden : true, cellsformat : 'd2'},
			{text : '',datafield : 'stoneCostPrice',hidden : true, cellsformat : 'd2'},
			{text : '',datafield : 'shapeId', hidden: true,'map':'shapeDTO>id'}, 
			{text : '',datafield : 'shapeCode',  hidden: true,'map':'shapeDTO>code'},
			{text : '',datafield : 'shapeDesc', hidden: true,'map':'shapeDTO>description'}, 
			
		]
	});
}

//Assemble Accessory Grid 
var assembleSbAccDetGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{name : 'sbNo', type : 'int','map' : 'id'},
			{name : 'accSlNo', type : 'int','map' : 'accessorySrlNumber'},
			{name: 'accCode', type: 'string','map':'accessoryCode'},
			{name : 'accWt', type : 'float','map':'weight'},
			{name : 'accPcs', type : 'int','map': 'pieces'},
			{name : 'accUom', type : 'string','map' : 'uom>id'},
			{name : 'accCat', type : 'string','map': 'accessoryCategory>name'},
			{name : 'accSubCat', type : 'string','map' : 'accSubCategory>name'},
			{name : 'accSeg', type : 'string','map' :''},
			
			{name : 'accValue', type : 'float','map' : 'sellingRate'},
			{name : 'catId', type : 'int','map': 'accessoryCategory>id'},
			{name : 'subCatId', type : 'int','map' :'accSubCategory>id'},
			{name : 'suppliedByType', type : 'string'},
			{name : 'costPrice', type : 'float'},
			{name : 'costRate', type : 'float'},
			{name : 'detSrlNo', type : 'int'},
			{name : 'sellingPrice', type : 'double'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridSBAccDetails").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
		columns : [
			{text : '',datafield : 'detSrlNo', hidden: true}, 
			{ text : 'Sale Bill Ret Det No', datafield : 'sbNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Sl No', datafield : 'accSlNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Code', datafield : 'accCode', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Weight', datafield : 'accWt', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Pcs', datafield : 'accPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'accUom', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Category', datafield : 'accCat', width : '13%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat', datafield : 'accSubCat', width : '16%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Segment', datafield : 'accSeg', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Value', datafield : 'accValue', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Acc Selling Price', datafield : 'sellingPrice', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},

			{text : '',datafield : 'catId',hidden : true},
			{text : '',datafield : 'subCatId',hidden : true},
			{text : '',datafield : 'suppliedByType',hidden : true},
			{text : '',datafield : 'costPrice',hidden : true,cellsformat : 'd2'},
			{text : '',datafield : 'costRate',hidden : true,cellsformat : 'd2'},
			
		]
	});
}


/*$("#salesReturnNoC").on('change',function(){
	var sbId = $("#salesReturnNoC").val();
	var assembleSbDetails = $('#jqxgridSBAssembleHeader').jqxGrid('getrows');
		if(typeof assembleSbDetails != "undefined"){
			for(var i=0;i<assembleSbDetails.length;i++){
				if(assembleSbDetails[i].sbNo == sbId){
					$("#salesReturnNoC").val("");
					$.growl.error({
						message : "Sales Return No " + sbId + "  is Already Added !!",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}
		}
	});*/

// Request Format to Validate
// Header Details
var getSbRetValidateDetails = function(){
	var sbHeaderDet = $("#jqxgridSBAssembleHeader").jqxGrid('getrows');
	var sbHeaderDetArr = [];
	console.log(sbHeaderDet);
	for(var i=0;i<sbHeaderDet.length;i++){
		var sbRetHeaderDataC = {
		    "id": sbHeaderDet[i].sbNo,
		    "materialType": {
		      "id": sbHeaderDet[i].materialType,
		      "name": null,
		      "description": null
		    },
		    "grossWeight":  sbHeaderDet[i].grWt,
		    "netWeight":  sbHeaderDet[i].ntWt,
		    "pieces":  sbHeaderDet[i].pcs,
		    "amount":  sbHeaderDet[i].salesRetAmt,
		    "metalSegment": {
		    	 "id": sbHeaderDet[i].segId,
		         "name": sbHeaderDet[i].segment,
		         "description": null
		    },
		    "skinPurity":  sbHeaderDet[i].spurity,
		    "meltingPurity":  sbHeaderDet[i].mpurity,
		    "sbRetStones": getSbRetStoneDetails(sbHeaderDet[i].sbNo,sbHeaderDet[i].slNo),
		    "sbRetAccessories": getSbRetAccDetails(sbHeaderDet[i].sbNo,sbHeaderDet[i].slNo),
		    "serialNumber": sbHeaderDet[i].slNo,
		    "makingCharges": sbHeaderDet[i].makingCharges,
		    "wastageWeight":  sbHeaderDet[i].wastageWt,
		    "sbRetHeaderId":  sbHeaderDet[i].sbNo,
		    "costCode":  sbHeaderDet[i].costCode,
		    "costMakingCharges": sbHeaderDet[i].costMakingCharges,
		    "costWastageWt": sbHeaderDet[i].costWastageWt,
		    "segmentDTO": null,
		    "jewelTypeDTO": {
		    	 "id": sbHeaderDet[i].jewId,
		         "name": sbHeaderDet[i].jewelType,
		         "description": null
		    },
		    "categoryDTO": null,
		    "subCatDTO": null,
		    "articleMasterDTO": null,
		    "hsnMasterDTO": null,
		    "vendorDTO": null,
		    "metalAccLocation" : sbHeaderDet[i].metalAccLocation,
		}
		sbHeaderDetArr.push(sbRetHeaderDataC);
	}
	return sbHeaderDetArr;
}

// Stone Details
var getSbRetStoneDetails = function(sbhNo,sbSrlNo){
	console.log(sbSrlNo);
	console.log(sbhNo);
 	var sbStoneDet = $("#jqxgridSBStoneDetails").jqxGrid('getrows');
	var sbStoneDetArr = [];
	for(var i=0;i<sbStoneDet.length;i++){
		var sbRetStoneDataC = {
				 	"id":  sbStoneDet[i].sbNo,
			        "stoneSrlNumber": sbStoneDet[i].stoneSlNo,
			        "stoneCode": sbStoneDet[i].stoneCode,
			        "weight": sbStoneDet[i].stWt,
			        "pieces": sbStoneDet[i].stPcs,
			        "uom": {
			          "id": sbStoneDet[i].uom,
			          "name": null,
			          "description": null
			        },
			        "stoneSegment": {
			          "id": sbStoneDet[i].segId,
			          "name": sbStoneDet[i].segment,
			          "description": null
			        },
			        "stoneCategory": {
			        	"id" : sbStoneDet[i].catId,
			        	"name" : sbStoneDet[i].category
			        },
			        "color": sbStoneDet[i].color,
			        "clarity": sbStoneDet[i].clarity,
			        "actualColor": sbStoneDet[i].actualCol,
			        "cutGrade": sbStoneDet[i].cut,
			        "weightCostRange": sbStoneDet[i].wtRange,
			        "stoneSubCategory": {
			          "id": null,
			          "name": null,
			          "description": sbStoneDet[i].subCat
			        },
			        "suppliedBy": {
			          "id": sbStoneDet[i].suppBy,
			          "name": null,
			          "description": null
			        },
			        "shapedto": {
			            "id": sbStoneDet[i].shapeId,
			            "code": sbStoneDet[i].shapeCode,
			            "description": sbStoneDet[i].shapeDesc
			          },
			        "stoneSellingRate": sbStoneDet[i].stoneSellingRate,
			        "stoneSellingPrice":sbStoneDet[i].stoneSellingPrice,
			        "stoneCostRate": sbStoneDet[i].stoneCostRate,
			        "stoneCostPrice": sbStoneDet[i].stoneCostPrice,
			        "detailSrlNo" : sbStoneDet[i].detSrlNo
			}
		if(sbhNo == sbStoneDet[i].sbNo && sbSrlNo == sbStoneDet[i].detSrlNo){
			 sbStoneDetArr.push(sbRetStoneDataC); 
		}
	}
	return sbStoneDetArr;
}

// Accessory Details
var getSbRetAccDetails = function(sbhNo,sbSrlNo){
	var sbAccDet = $("#jqxgridSBAccDetails").jqxGrid('getrows');
	var sbAccDetArr = [];
	for(var i=0;i<sbAccDet.length;i++){
		var sbRetAccDataC = {
				"id": sbAccDet[i].sbNo,
		        "accessorySrlNumber": sbAccDet[i].accSlNo,
		        "accessoryCode": sbAccDet[i].accCode,
		        "weight": sbAccDet[i].accWt,
		        "pieces": sbAccDet[i].accPcs,
		        "uom": {
		          "id": sbAccDet[i].accUom,
		          "name": null,
		          "description": null
		        },
		        "accessoryCategory": {
		          "id": sbAccDet[i].catId,
		          "name": sbAccDet[i].accCat,
		          "description": null
		        },
		        "accSubCategory": {
		          "id": sbAccDet[i].subCatId,
		          "name": sbAccDet[i].accSubCat,
		          "description": null
		        },
		        "suppliedByType": sbAccDet[i].suppliedByType,
		        "sellingRate": sbAccDet[i].accValue,
		        "sellingPrice": sbAccDet[i].sellingPrice,
		        "costPrice": sbAccDet[i].costPrice,
		        "costRate":sbAccDet[i].costRate,
		        "detailSrlNo" : sbAccDet[i].detSrlNo
		}
		 if (sbhNo == sbAccDet[i].sbNo && sbSrlNo == sbAccDet[i].detSrlNo){
			 sbAccDetArr.push(sbRetAccDataC); 
		 }
	}
	return sbAccDetArr;
}

$("#validateSBAssembleItems").on('click',function(){
	var validateSbRetData = getSbRetValidateDetails();
	if(validateSbRetData.length == 1){
		$.growl.error({
			message : "Please Add Another Line Item to Create Assemble !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
			
	
		postJSON('/OrderExecution/api/v1/validateAllSaleBillReturnDetailsForAssembling',JSON.stringify(validateSbRetData),function(data) {
			if(data.resCode == 1){
				$("#sbValDetailsC").slideDown();
				$("#sbValidateGrids").show();
				var response = data.payload.finalAssembledFG;
				
				var validatedSbRetData = [];
				validatedSbRetData.push(response);
				validateAssembleSbDetGrid(validatedSbRetData);
				
				var sbStoneValidateDetArry = [];
				var sbStoneDetArryV =  response.sbRetStones;
				for(var i=0;i<sbStoneDetArryV.length;i++){
					sbStoneValidateDetArry.push(sbStoneDetArryV[i]);
				}
				
				validateAssembleSbStoneDetGrid(sbStoneValidateDetArry);
				
				
				var sbAccValidateDetArry = [];
				var sbAccDetArryV =  response.sbRetAccessories;
				for(var i=0;i<sbAccDetArryV.length;i++){
					sbAccValidateDetArry.push(sbAccDetArryV[i]);
				}
				validateAssembleSbAccDetGrid(sbAccValidateDetArry);
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

//########################### Validate Grids Started ###############################
var gridArr=[];
var gridArr1=[];
var res,jwRes,catRes,subCatres,resultH,vendorList;
var validateAssembleSbDetGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{name : 'slNo', type : 'int'},
			{name : 'refNo', type : 'int','map' : 'DisassembleSaleOrtoDCId'}, 
			{name : 'segment', type : 'string','map' : 'segmentDTO>description'},
			{name: 'jewelType', type: 'string','map':'jewelTypeDTO>description'},
			{name: 'category', type: 'string','map':'categoryDTO>description'},
			{name : 'subCat', type : 'string','map':'subCatDTO>description'},
			{name : 'artCode', type : 'string','map' : 'articleMasterDTO>articleCode'},
			{name : 'hsnId', type : 'string','map': 'hsnMasterDTO>hsnDescription'},
			{name : 'skinPurity', type : 'float','map' : 'skinPurity'},
			{name : 'meltingPurity', type : 'float','map': 'meltingPurity'},
			{name : 'costCode', type : 'string','map' : 'costCode'},
			{name : 'metalTypeId', type : 'string','map' :'metalSegment>name'},
			{name : 'vendorCode', type : 'string','map' :'vendorDTO>vendorCode'},
			{name : 'grossWt', type : 'float','map' : 'grossWeight'},
			{name : 'netWt', type : 'float','map':'netWeight'},
			{name : 'makingSelling', type : 'float','map' : 'makingCharges'},
			{name : 'wastageSelling', type : 'float','map' :'wastageWeight'},
			{name : 'costMcTotalCost', type : 'float','map' :'costMakingCharges'},
			{name : 'costWastageWt', type : 'string','map' : 'costWastageWt'},
			
			{name : 'segmentCode', type : 'string'},
			{name : 'jewelCode', type : 'string'},
			{name : 'catCode', type : 'string'},
			{name : 'subCatCode', type : 'string'},
			{name : 'hsnCode', type : 'string'},
			{name : 'articleId', type : 'int'},
			{name : 'articleDescp', type : 'string'},
			{name : 'mSegCode', type : 'string','map' : 'metalSegment>code'},
			{name : 'mSegId', type : 'int','map' : 'metalSegment>id'},
			{name : 'vendCode', type : 'string'},
			{name : 'pieces', type : 'int'},
			{name : 'serialNumber', type : 'int'},
			{name : 'sbRetHeaderId', type : 'int'},
			{name : 'amount', type : 'float'},
			{name : 'metalAccLocation', type : 'string'},
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAssembleHeaderSbV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		
		columns : [
			{ text : '', datafield : 'slNo', width : '2%', cellsalign : 'center', align : 'center', editable : false,hidden:true},
			{ text : '', datafield : 'detSrlNo', width : '2%', cellsalign : 'center', align : 'center', editable : false,hidden:true},

			{ text : 'Seg', datafield : 'segment', width : '6.5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'segmentN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click', function(event){
					var segmentId = $('#jqxgridSBAssembleHeader').jqxGrid('getcellvalue',row,'segId');
					var segmentCode = $('#jqxgridSBAssembleHeader').jqxGrid('getcellvalue',row,'segCode');
					var segment = $('#jqxgridSBAssembleHeader').jqxGrid('getcellvalue',row,'segment');
					fieldFilters = {
						  "fieldFilters": {
						    "type": "segment",
						    "orgSegment": {
						      "id": segmentId,
						      "segmentId": segmentId,
						      "description":segment,
						      "code": segmentCode
						    }
						  }
						}
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
							 res = data.payload.allSegments;
							editor.jqxDropDownList({source : res,displayMember : 'description',valueMember : 'id'});
						});
					});
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
		      		 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'jewTypeN', null);  
			    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'catN', null); 
			    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'subCatN', null); 
			    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'artCode', null);
			    	 
			    	 $.each(res, function(key, val) {
						 if( val.description  == newvalue.label){	
							 $('#jqxgridAssembleHeaderSbV').jqxGrid ('setcellvalue', row,'segmentCode',val.code);
						}
					})
				}
			},
			{ text : 'Jewel Type', datafield : 'jewelType', width : '7.5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'jewTypeN',
				createeditor: function (row, cellvalue, editor) {
				 editor.on('click', function(event){
					var segmentId = $('#jqxgridAssembleHeaderSbV').jqxGrid('getcellvalue',row,'segment');
					fieldFilters = {
						  "fieldFilters": {
						    "type": "jewelType",
						    "segment": {
						      "id": segmentId,
						    }
						  }
						}
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
							 jwRes = data.payload.jeweltypes;
							editor.jqxDropDownList({source : jwRes,displayMember : 'description',valueMember : 'id'});
						});
				 	});
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
			    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'catN', null); 
			    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'subCatN', null); 
			    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'artCode', null); 
			    	 
			    	 $.each(jwRes, function(key, val) {
						 if( val.description  == newvalue.label){	
							 $('#jqxgridAssembleHeaderSbV').jqxGrid ('setcellvalue', row,'jewelCode',val.code);
						}
					})
				  }
			},
			{ text : 'Category', datafield : 'category', width : '9%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'catN',
				createeditor: function (row, cellvalue, editor) { 
					 editor.on('click', function(event){
					var segmentId = $('#jqxgridAssembleHeaderSbV').jqxGrid('getcellvalue',row,'segment');
					var jTypeId = $('#jqxgridAssembleHeaderSbV').jqxGrid('getcellvalue',row,'jewelType');
					
					fieldFilters = {
						  "fieldFilters": {
						    "type": "segCategory",
						    "segment": {
						      "id": segmentId,
						    },
						    "jewel": {
							      "id": jTypeId,
							    }
						  }
						}
					gridArr=[];
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
						var maincats = data.payload.maincats;
						$.each(maincats, function(k, v){
							gridArr.push({
								"id" : parseInt(v.id),
								"description" : v.description
							});
						});
							editor.jqxDropDownList({source : gridArr,displayMember : 'description',valueMember : 'id'});
						});
					 });
			     },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
			    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'subCatN', null); 
			    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'artCode', null); 
			    	 
			    	 $.each(gridArr, function(key, val) {
						 if( val.description  == newvalue.label){	
							 $('#jqxgridAssembleHeaderSbV').jqxGrid ('setcellvalue', row,'catCode',val.name);
						}
					});
				 }
			},
			{ text : 'Sub Cat', datafield : 'subCat', width : '10%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'subCatN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click', function(event){
					var segmentId = $('#jqxgridAssembleHeaderSbV').jqxGrid('getcellvalue',row,'segment');
					var categoryId = $('#jqxgridAssembleHeaderSbV').jqxGrid('getcellvalue',row,'category');
					var jwlType =  $('#jqxgridAssembleHeaderSbV').jqxGrid('getcellvalue',row,'jewelType');
					fieldFilters = {
						  "fieldFilters": {
						    "type": "subCat",
						    "segment": {
						      "id": segmentId,
						    },
						    "category": {
							      "id": categoryId,
							  },
							  "jewel":{"id":jwlType}
						  }
						}
					gridArr1=[];
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
						var subCatres = data.payload.subCats;
						     $.each(subCatres, function(k, v){
						    	 gridArr1.push({
										"id" : parseInt(v.id),
										"description" : v.description
									});
								});
							editor.jqxDropDownList({source : gridArr1,displayMember : 'description',valueMember : 'id'});
						});
					});
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
			        $.each(gridArr1, function(key, val) {
						 if( val.description  == newvalue.label){
							 $('#jqxgridAssembleHeaderSbV').jqxGrid ('setcellvalue', row,'subCatCode',val.name);
						}
					})
			    	
			    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'artCode', null);
			    	 
	      	    	 var segment = $('#jqxgridAssembleHeaderSbV').jqxGrid('getcellvalue',row,'segment');
	       			 var jwlType = $('#jqxgridAssembleHeaderSbV').jqxGrid('getcellvalue',row,'jewelType');
	       			 var categoryC = $('#jqxgridAssembleHeaderSbV').jqxGrid('getcellvalue',row,'category');
     		         fieldFilters = {
							"fieldFilters" : {
					               "type":"articleCode",
					               "subCategory":{ "id":newvalue.value},
					        	   "segment":{"id":segment},
					        	   "category":{"id":categoryC},
					        	   "jewelTypeDTO":{"id":jwlType}
					           }
					      }
     		   	  postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters), function(data) {
     		   	        $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'artCode',null); 
					    var res = data.payload.article;
					    $.each(res,function(k,v){
					    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'artCode', v.name);  
					    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'articleId', v.id);  
					    	 $("#jqxgridAssembleHeaderSbV").jqxGrid("setcellvalue", row, 'articleDescp', v.description);
					    })
      			    });
     		         
	      	     }
			},
			{ text : 'Artical Code', datafield : 'artCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},//auto populate
			{ text : 'HSN Id', datafield : 'hsnId', width : '6%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'hsnN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click', function(event){
						var rows = $('#jqxgridSBAssembleHeader').jqxGrid('getrows');
						var hsn = [];
							for(var i=0;i<rows.length;i++){
								var hsnCodeC = {
									"id" : rows[i].hsnId,
									"name" : rows[i].hsnCode + "-" + rows[i].hsnDesc,
									"description" :  rows[i].hsnDesc
								}
								if(rows[i].hsnId != null){
									hsn.push(hsnCodeC);
								}
							}
							 resultH = [];
							$.each(hsn, function (i, e) {
							    var matchingItems = $.grep(resultH, function (item) {
							       return item.id === e.id && item.name === e.name;
							    });
							    if (matchingItems.length === 0){
							    	resultH.push(e);
							    }
							});
							editor.jqxDropDownList({source : resultH,displayMember : 'name',valueMember : 'id'});
					});
				},
			  cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
				  $.each(resultH, function(key, val) {
						 if( val.name  == newvalue.label){
							 $('#jqxgridAssembleHeaderSbV').jqxGrid ('setcellvalue', row,'hsnCode',val.description);
						}
					})
			  }
			},
			{ text : 'Skin Purity', datafield : 'skinPurity', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Melting Purity', datafield : 'meltingPurity', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost Code', datafield : 'costCode', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Type Id', datafield : 'metalTypeId', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Code', datafield : 'vendorCode', width : '6.5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'vendorCodeN',
				createeditor: function (row, cellvalue, editor) {
					 editor.on('click', function(event){
						 $.getJSON('/OrderExecution/api/v1/getSmallOrderGRLOV?portal=OE', function(data) {
							 vendorList = data.payload.vendorList;
								editor.jqxDropDownList({source : vendorList,displayMember : 'vendorName',valueMember : 'id'});
							});
					 	});
				    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
					  $.each(vendorList, function(key, val) {
							 if( val.vendorName  == newvalue.label){
								 $('#jqxgridAssembleHeaderSbV').jqxGrid ('setcellvalue', row,'vendCode',val.vendorCode);
							}
						})
				  }
			},
			{ text : 'Gross Wt.', datafield : 'grossWt', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Net Wt.', datafield : 'netWt', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false ,cellsformat : 'd3'},
			{ text : 'Making Selling', datafield : 'makingSelling', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Wastage Selling', datafield : 'wastageSelling', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost MC Total Cost', datafield : 'costMcTotalCost', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost Wastage Wt.', datafield : 'costWastageWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			
			{text : '',datafield : 'segmentCode',hidden: true}, 
			{text : '',datafield : 'jewelCode',hidden: true}, 
			{text : '',datafield : 'catCode',hidden: true}, 
			{text : '',datafield : 'subCatCode',hidden: true},
			{text : '',datafield : 'articleId',hidden: true}, 
			{text : '',datafield : 'articleDescp',hidden: true},
			{text : '',datafield : 'hsnCode',hidden: true},
			{text : '',datafield : 'mSegCode',hidden: true},
			{text : '',datafield : 'mSegId',hidden: true},
			{text : '',datafield : 'vendCode',hidden: true},
			{text : '',datafield : 'pieces',hidden: true},
			{text : '',datafield : 'sbRetHeaderId',hidden: true},
			{text : '',datafield : 'serialNumber',hidden: true},
			{text : '',datafield : 'amount',hidden: true,cellsformat : 'd2'},
			{text : '',datafield : 'metalAccLocation',hidden: true},
		]
	});
}

// Validate Stone Grid
var validateAssembleSbStoneDetGrid = function(data1){
	var source = {
        localdata: data1,
        datatype: "json",
		datafields : [ 
			{name : 'stoneSlNo', type : 'int','map' : 'stoneSrlNumber'},
			{name: 'suppBy', type: 'string','map':'suppliedBy>id'},
			{name: 'subCatDesc', type: 'string','map':'stoneSubCategory>description'},
			{name : 'stseg', type : 'string','map':'stoneSegment>name'},
			{name : 'stsegId', type : 'string','map':'stoneSegment>id'},
			{name : 'cutGrade', type : 'string','map' : 'cutGrade'},
			{name : 'color', type : 'string','map': 'color'},
			{name : 'clarity', type : 'string','map' : 'clarity'},
			{name : 'wtRange', type : 'string','map': 'weightCostRange'},
			{name : 'uom', type : 'string','map' : 'uom>id'},
			{name : 'stonePcs', type : 'int','map' :'pieces'},
			{name : 'stoneWt', type : 'float','map' :'weight'},
			{name : 'sellingRate', type : 'float','map' : 'stoneSellingRate'},
			{name : 'sellingAmt', type : 'float','map':'stoneSellingPrice'},
			{name : 'costRate', type : 'float','map' : 'stoneCostRate'},
			{name : 'costAmt', type : 'float','map' :'stoneCostPrice'},
			
			{name : 'actCol', type : 'string','map' :'actualColor'},
			{name : 'stoneCode', type : 'string','map' :'stoneCode'},
			{name : 'catId', type : 'string','map' :'stoneCategory>id'},
			{name : 'catDesc', type : 'string','map' :'stoneCategory>name'},
			{name : 'shapeId', type : 'int','map':'shapeDTO>id'},
			{name : 'shapeCode', type : 'string','map':'shapeDTO>code'},
			{name : 'shapeDesc', type : 'string','map':'shapeDTO>description'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStoneDetailsSbV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		
		columns : [
			{ text : 'Stone Sl No', datafield : 'stoneSlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '13%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg', datafield : 'stseg', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Color', datafield : 'color', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'clarity', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Wt Range', datafield : 'wtRange', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uom', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Pcs', datafield : 'stonePcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Wt.', datafield : 'stoneWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Selling Rate', datafield : 'sellingRate', width : '6.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Selling Amt', datafield : 'sellingAmt', width : '6.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
			{ text : 'Cost Rate', datafield : 'costRate', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost Amt', datafield : 'costAmt', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			
			{text : '',datafield : 'stoneCode',hidden: true}, 
			{text : '',datafield : 'catId',hidden: true}, 
			{text : '',datafield : 'catDesc',hidden: true},
			{text : '',datafield : 'actCol',hidden: true},
			{text : '',datafield : 'shapeId', hidden: true}, 
			{text : '',datafield : 'shapeCode',  hidden: true},
			{text : '',datafield : 'shapeDesc', hidden: true}, 
		
		]
	});
}


//Validate Accessory Grid 
var validateAssembleSbAccDetGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{name : 'accSlNo', type : 'int','map' : 'accessorySrlNumber'},
			{name: 'suppBy', type: 'string','map':'suppliedByType'},
			{name: 'cat', type: 'string','map':'accessoryCategory>name'},
			{name : 'subCatDesc', type : 'string','map':'accSubCategory>name'},
			{name : 'accWt', type : 'float','map' : 'weight'},
			{name : 'accPcs', type : 'int','map': 'pieces'},
			{name : 'accRate', type : 'float','map' : 'sellingRate'},
			{name : 'accSellingAmt', type : 'float','map': 'sellingRate'},
			{name : 'costRate', type : 'float','map' : 'costRate'},
			{name : 'costAmt', type : 'float','map' :'costPrice'},
			{name : 'sellingPrice', type : 'float'},
			
			{name : 'catId', type : 'int','map':'accessoryCategory>id'},
			{name : 'subCatId', type : 'int','map':'accSubCategory>id'},
			{name : 'accUom', type : 'string','map':'uom>id'},
			{name : 'accCode', type : 'string','map':'accessoryCode'},
		
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAccDetailsSbV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		theme: 'energyblue',
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [
			{ text : 'Acc Sl No', datafield : 'accSlNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cat', datafield : 'cat', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '16%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Wt', datafield : 'accWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Acc Pcs', datafield : 'accPcs', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Selling Rate', datafield : 'accRate', width : '12%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',},
			//{ text : 'Acc Selling Amt', datafield : 'accSellingAmt', width : '11%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Cost Rate', datafield : 'costRate', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Cost Amt', datafield : 'costAmt', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',},
			{ text : 'Selling Price', datafield : 'sellingPrice', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',},

			{text : '',datafield : 'accCode',hidden: true},
			{text : '',datafield : 'catId',hidden: true},
			{text : '',datafield : 'catCode',hidden: true},
			{text : '',datafield : 'subCatId',hidden: true},
			{text : '',datafield : 'subCatCode',hidden: true},
			{text : '',datafield : 'accUom',hidden: true},
		]
	});
}



//###########################  Request Format to create Assemble by Sale Bill Return ##########################
//Header Details
var getValidSbRetDetails = function(){
	var sbRetValidDet = $("#jqxgridAssembleHeaderSbV").jqxGrid('getrows');
	
	//var sbNums = getSbRetValidateDetails();
	var sbNums = $("#jqxgridSBAssembleHeader").jqxGrid('getrows');

	var sbNumbArr = [];
	$.each(sbNums,function(k,v){
		sbNumbArr.push(v.id);
	});
	
	var sbNumbArry = sbNumbArr.join(",");
	for(var i=0;i<sbRetValidDet.length;i++){
		var validatedSbRetDataC = {
				"id": null,
				"assembleDocTypeIds" : sbNumbArry,
				"materialType": null,
				"grossWeight": sbRetValidDet[i].grossWt,
				"netWeight": sbRetValidDet[i].netWt,
				"pieces": sbRetValidDet[i].pieces,
				"jewelType": null,
				"amount":sbRetValidDet[i].amount,
				"metalSegment": {
				    "id": sbRetValidDet[i].mSegId,
				    "name": sbRetValidDet[i].metalTypeId,
				    "description":null
				  },
				 "skinPurity": sbRetValidDet[i].skinPurity,
				 "meltingPurity": sbRetValidDet[i].meltingPurity,
				 "sbRetStones" : getValidSbStoneDetails(),
				 "sbRetAccessories" : getValidSbAccDetails(),
				  "serialNumber": sbRetValidDet[i].serialNumber,
				  "makingCharges": sbRetValidDet[i].makingSelling,
				  "wastageWeight": sbRetValidDet[i].wastageSelling,
				  "sbRetHeaderId": sbRetValidDet[i].sbRetHeaderId,
				  "costCode": sbRetValidDet[i].costCode,
				  "costMakingCharges": (sbRetValidDet[i].costMcTotalCost != "")?sbRetValidDet[i].costMcTotalCost.toFixed(2):sbRetValidDet[i].costMcTotalCost,
				  "costWastageWt": sbRetValidDet[i].costWastageWt,
				  "segmentDTO": {
				    "id": sbRetValidDet[i].segment,
				    "segmentId": sbRetValidDet[i].segment,
				    "description":sbRetValidDet[i].segmentN,
				    "code": sbRetValidDet[i].segmentCode
				  },
				  "jewelTypeDTO": {
				    "id": sbRetValidDet[i].jewelType,
				    "code": sbRetValidDet[i].jewelCode,
				    "description": sbRetValidDet[i].jewTypeN
				  },
				  "categoryDTO": {
				    "id": sbRetValidDet[i].category,
				    "description": sbRetValidDet[i].catN,
				    "code": sbRetValidDet[i].catCode
				  },
				  "subCatDTO": {
				    "id": sbRetValidDet[i].subCat,
				    "code": sbRetValidDet[i].subCatCode,
				    "description": sbRetValidDet[i].subCatN
				  },
				  "articleMasterDTO": {
				    "id": sbRetValidDet[i].articleId,
				    "articleCode": sbRetValidDet[i].artCode,
				    "articleDesc": sbRetValidDet[i].articleDescp
				  },
				  "hsnMasterDTO": {
				    "id":sbRetValidDet[i].hsnId,
				    "hsnCode": sbRetValidDet[i].hsnCode,
				    "hsnDescription": sbRetValidDet[i].hsnN
				  },
				  "vendorDTO": {
				    "id": sbRetValidDet[i].vendorCode,
				    "vendorCode":sbRetValidDet[i].vendCode,
				    "vendorName": sbRetValidDet[i].vendorCodeN
				  },
				  "metalAccLocation" : sbRetValidDet[i].metalAccLocation
		}
	}
	return validatedSbRetDataC;
}

//Stone Details
var getValidSbStoneDetails = function(){
	var sbStoneValidDet = $("#jqxgridStoneDetailsSbV").jqxGrid('getrows');
	var sbStoneArry = [];
	for(var i=0;i<sbStoneValidDet.length;i++){
		var validatedSbStoneDataC = {
	        "id": null,
	        "stoneSrlNumber": sbStoneValidDet[i].stoneSlNo,
	        "stoneCode": sbStoneValidDet[i].stoneCode,
	        "weight": sbStoneValidDet[i].stoneWt,
	        "pieces": sbStoneValidDet[i].stonePcs,
	        "uom": {
	          "id": sbStoneValidDet[i].uom,
	          "name": null,
	          "description": null
	        },
	        "stoneSegment": {
	        	"id": sbStoneValidDet[i].stsegId,
		        "description": sbStoneValidDet[i].stseg,
		        "code":sbStoneValidDet[i].stseg
	        },
	        "stoneCategory": {
	        	"id": sbStoneValidDet[i].catId,
			    "description": sbStoneValidDet[i].catDesc,
	        },
	        "color":  sbStoneValidDet[i].color,
	        "clarity":  sbStoneValidDet[i].clarity,
	        "actualColor":  sbStoneValidDet[i].actCol,
	        "cutGrade": sbStoneValidDet[i].cutGrade,
	        "weightCostRange": sbStoneValidDet[i].wtRange,
	        "stoneSubCategory": {
	        	"id": sbStoneValidDet[i].subCatDesc,
	        	"description" : sbStoneValidDet[i].subCatDesc
	        },
	        "suppliedBy": {
	          "id": sbStoneValidDet[i].suppBy,
	          "name": null,
	          "description": null
	        },
	        "shapedto" : {
	        	  "id" : sbStoneValidDet[i].shapeId,
	        	  "code" : sbStoneValidDet[i].shapeCode,
	        	  "description" : sbStoneValidDet[i].shapeDesc 
	          },
	        "stoneSellingRate": sbStoneValidDet[i].sellingRate,
	        "stoneSellingPrice": sbStoneValidDet[i].sellingAmt,
	        "stoneCostRate": sbStoneValidDet[i].costRate,
	        "stoneCostPrice": sbStoneValidDet[i].costAmt
	      }
		sbStoneArry.push(validatedSbStoneDataC);
	}
	return sbStoneArry;
} 


//Accessory Details
var getValidSbAccDetails = function(){
	var sbRetAccValidDet = $("#jqxgridAccDetailsSbV").jqxGrid('getrows');
    var sbAccArry = [];
	for(var i=0;i<sbRetAccValidDet.length;i++){
		var validatedSbAccDataC = {
				"id": null,
		        "accessorySrlNumber": sbRetAccValidDet[i].accSlNo,
		        "accessoryCode": sbRetAccValidDet[i].accCode,
		        "weight": sbRetAccValidDet[i].accWt,
		        "pieces": sbRetAccValidDet[i].accPcs,
		        "uom": {
		          "id": sbRetAccValidDet[i].accUom,
		          "name": null,
		          "description": null
		        },
		        "accessoryCategory": {
		          "id": sbRetAccValidDet[i].catId,
		          "name": sbRetAccValidDet[i].cat,
		          "description": sbRetAccValidDet[i].cat
		        },
		        "accSubCategory": {
		          "id": sbRetAccValidDet[i].subCatId,
		          "name": sbRetAccValidDet[i].subCatDesc,
		          "description": null
		        },
		        "suppliedByType": sbRetAccValidDet[i].suppBy,
		        "sellingRate": sbRetAccValidDet[i].accRate,
		        "costPrice": sbRetAccValidDet[i].costAmt,
		        "costRate":sbRetAccValidDet[i].costRate,
		        "sellingPrice": sbRetAccValidDet[i].sellingPrice,
		}
		sbAccArry.push(validatedSbAccDataC);
	}
	return sbAccArry;
}


//Save Function
$("#saveAssembleSbItems").on('click',function(){
	var rows = $('#jqxgridAssembleHeaderSbV').jqxGrid('getrows');
	 for (var i = 0; i < rows.length; i++){
		 var row = rows[i];
		 var segment = row.segmentN;
		 var jewelType = row.jewTypeN;
		 var category = row.catN;
		 var subCategory = row.subCatN;
		 var hsnCode = row.hsnN;
		 if(segment == "" || segment == null || jewelType == "" || jewelType == null || category == "" || category == null
				 || subCategory == "" || subCategory == null || hsnCode == "" || hsnCode == null){
			 $.growl.error({
				 message : "Please Fill All the Fields !!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		 }
	 }
	 var sbReturnData = getValidSbRetDetails();
	 console.log(sbReturnData);
		if(typeof sbReturnData != "undefined" || sbReturnData != ""){
		postJSON('/OrderExecution/api/v1/createAssembleOfItemsUsingSaleBillReturn',JSON.stringify(sbReturnData),function(data) {
			if(data.resCode == "1"){
				$.growl.notice({
					message : data.mesgStr,
					duration : 20000,
					title : 'Success'
				});
				saleBillDetArr = [];
				sbStoneArray = [];
				sbAccArray = [];
				
				sbAccValidateDetArry = [];
				sbStoneValidateDetArry = [];
				validatedSbRetData = [];
				
				$("#sbCreateGrids").hide();
				$("#sbValidateGrids").hide();
				
				$("#jqxgridSBAssembleHeader").jqxGrid('clear');
				$("#jqxgridSBStoneDetails").jqxGrid('clear');
				$("#jqxgridSBAccDetails").jqxGrid('clear');
				
				$("#jqxgridAccDetailsSbV").jqxGrid('clear');
				$("#jqxgridStoneDetailsSbV").jqxGrid('clear');
				$("#jqxgridAssembleHeaderSbV").jqxGrid('clear');
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 20000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});