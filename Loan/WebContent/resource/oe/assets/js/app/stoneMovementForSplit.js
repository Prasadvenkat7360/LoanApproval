$("#movTypeC").val("Stone");
$("#toTypeC").val("Order");
$("#saveStoneMove").hide();
$("#ordNumb").hide();

var orderNoArrLen;
var smOnloadFunction = function(docNo){
	var params = {"fieldFilters":{"type":"allSplitOrderNos","stockId":docNo}}
	
	 postJSON('/OrderExecution/api/v1/onloadMovementOfStones',JSON.stringify(params),function(response) {
		 if(response.resCode == 1){
			 $("#ordNumb").show();
			 orderNoArrLen = response.payload.splitOrderNoList.length;
			 var s = '<select id="orderNoObjC"  name="orderNoObjC" class="form-control" multiple="multiple">';
				$.each(response.payload.splitOrderNoList, function(key, val) {
				s += '<option value="' + val + '">' + val + '</option>'; });
				s += '</select>';
				$("#orderNoC").html(s);
				$('#orderNoObjC').multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				//enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
		 }
	 });
}

var stoneMovementGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'segment','type' : 'string','map' : 'segmentDTO>description'},
				{'name' : 'segmentId','type' : 'string','map' : 'segmentDTO>id'},
				{'name' : 'segmentCode','type' : 'string','map' : 'segmentDTO>code'},
				
				{'name' : 'mainCat','type' : 'string','map' : 'mainCat>description'},
				{'name' : 'mainCatId','type' : 'string','map' : 'mainCat>id'},
				{'name' : 'mainCatCode','type' : 'string','map' : 'mainCat>code'},
				
				{'name' : 'shape','type' : 'string','map' : 'shape>name'},
				{'name' : 'shapeId','type' : 'string','map' : 'shape>id'},
				
				{'name' : 'clarity','type' : 'string','map' : 'clarity'},
				{'name' : 'color','type' : 'string','map' : 'color'},
				{'name' : 'actualColor','type' : 'string','map' : 'actualColor'}, 
				{'name' : 'cutGrade','type' : 'string','map' : 'cutgrade'},
				{'name' : 'fromWtCost','type' : 'float'},
				{'name' : 'toWtCost','type' : 'float'},
				{'name' : 'fromWt','type' : 'float'},
				{'name' : 'toWt','type' : 'float'},

				{'name' : 'from','type' : 'string','map' : 'fromType'}, 
				{'name' : 'fromNo','type' : 'long','map' : 'fromPktOrStkOrLocOrOrdNo'},
				{'name' : 'fromSlNo','type' : 'long','map' : 'fromOrderSrlNo'},
				{'name' : 'fromStoneSlNo','type' : 'long','map' : 'fromOrderStoneSrlNo'},
				{'name' : 'to','type' : 'long','map' : 'toType'},
				{'name' : 'toNo','type' : 'long','map' : 'toPktOrStkOrLocOrOrdNo'}, 
				{'name' : 'toSlNo','type' : 'long','map' : 'toOrderSrlNo'}, 
				{'name' : 'toStoneSlNo','type' : 'long','map' : 'toOrderStoneSrlNo'},
				{'name' : 'subCat','type' : 'string','map' : 'subcat>description'},
		        {'name' : 'stoneCode','type' : 'string','map' : 'stoneCode'},
		        {'name' : 'pcs','type' : 'long','map' : 'pcs'},
		        {'name' : 'weight','type' : 'float','map' : 'wt'},
		        {'name' : 'remarks','type' : 'string','map' : 'remarks'},
		        
		        {'name' : 'movementType','type' : 'string','map' : 'movementType'},
		        
		        {'name' : 'uom','type' : 'string','map' : 'uom'},
		        {'name' : 'subCatDes','type' : 'string','map' : 'subCatDes'},
		        {'name' : 'stnCostPrice','type' : 'float','map' : 'stnCostPrice'},
		        {'name' : 'stnSellingPrice','type' : 'float','map' : 'stnSellingPrice'},

			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		columns : [
			{'text' : 'Segment','datafield' : 'segment','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Main Cat','datafield' : 'mainCat','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Shape','datafield' : 'shape','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Clarity','datafield' : 'clarity','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Color','datafield' : 'color','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Actual Color','datafield' : 'actualColor','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'From Wt/Cost','datafield' : 'fromWtCost','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'To Wt/Cost','datafield' : 'toWtCost','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'From','datafield' : 'from','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'From Packet/Stock/Order/Loc No','datafield' : 'fromNo','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'From Order Sl No','datafield' : 'fromSlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'} ,
			{'text' : 'From Stone Sl No','datafield' : 'fromStoneSlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'To','datafield' : 'to','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'To Packet/Stock/Order/Loc No','datafield' : 'toNo','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'To Order Sl No','datafield' : 'toSlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'To Stone Sl No','datafield' : 'toStoneSlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			
			{'text' : 'Sub Cat','datafield' : 'subCat','width' : '4.5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Wt','datafield' : 'weight','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat : 'd3'},
			{'text' : 'Remarks','datafield' : 'remarks','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			
			{text : '', datafield : 'segmentCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'segmentId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'mainCatCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'mainCatId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'shapeId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'movementType', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			
			{text : '', datafield : 'subCatDes', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'uom', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'stnCostPrice', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true,cellsformat : 'd2'},
			{text : '', datafield : 'stnSellingPrice', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true,cellsformat : 'd2'},

			{text : '', datafield : 'fromWt', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true,cellsformat : 'd3'},
			{text : '', datafield : 'toWt', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true,cellsformat : 'd3'},
		]
	});
}


$("#searchSM").on('click',function(){
	console.log(orderNoArrLen);
	console.log($("#orderNoObjC").val());
	if($("#stockNoC").val() == "" || $("#orderNoObjC").val() == null){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!! ",
			duration : 1000,
			title :'Error'
		});
		return false;
	}else if($("#orderNoObjC").val().length < orderNoArrLen){
		$.growl.error({
			message : "Please Select All the Order Numbers !!! ",
			duration : 1000,
			title :'Error'
		});
		return false;
	}else{
		var params = {"fieldFilters":{"type":"allSplitStoneMovements","stockId":$("#stockNoC").val()}}
		
		 postJSON('/OrderExecution/api/v1/onloadMovementOfStones',JSON.stringify(params),function(response) {
			 if(response.resCode == 1){
					stoneMovementGrid(response.payload.splitStoneMovements);
					$("#jqxgrid").show();
					$("#saveStoneMove").show();
			 }else{
				 	stoneMovementGrid();
					$("#jqxgrid").show();
					$("#saveStoneMove").hide();
					
					 $.growl.error({
						message : response.mesgStr,
						duration : 10000,
						title : 'Error'
					 });
					 return false;
					
			 }
		 });
	}
	
});

var saveMovementOfStone = function(){
	
	var saveMovementOfStoneDet = [];
	
	var rows = $("#jqxgrid").jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
	var row = rows[i];
	console.log(row);
	var movementOfStoneSaveDetails = 
				  {
					
				  	"movementType" : row.movementType,
				    "segmentDTO": {
				      "id":row.segmentId,
				      "description": row.segment,
				      "code": row.segmentCode
				    },
				    "mainCat": {
				      "id":  row.mainCatId,
				      "name":  row.mainCatCode,
				      "description": row.mainCat
				    },
				    "subcat": ( row.segment != "Diamond") ?  { "id": row.stoneSubCatId, "description": row.stoneSubCat} : null,
				    "shape": {
				      "id": row.shapeId,
				      "description": row.shape,
				    },
				    "color": (row.color == null || row.color == "") ? null : row.color,
		    		"actualColor": (row.actualColor == null || row.actualColor == "") ? null : row.actualColor,
				    "clarity": (row.clarity == null || row.clarity == "") ? null : row.clarity,
				    "cutgrade": (row.cutGrade == null || row.cutGrade == "") ? null : row.cutGrade,
				    "fromWtCost": row.fromWtCost,
				    "toWtCost": row.toWtCost,
				    "fromWt" : row.fromWt,
				    "toWt":row.toWt,
				    "fromType": row.from,
				    "fromPktOrStkOrLocOrOrdNo":row.fromNo,
				    "fromOrderSrlNo": (row.fromSlNo == null || row.fromSlNo == "") ? null : row.fromSlNo, 
				    "fromOrderStoneSrlNo": (row.fromStoneSlNo == null || row.fromStoneSlNo == "") ? null : row.fromStoneSlNo,
				    "toType": row.to,
				    "toPktOrStkOrLocOrOrdNo":row.toNo,
				    "toOrderSrlNo": (row.toSlNo == null || row.toSlNo == "") ? null : row.toSlNo, 
				    "toOrderStoneSrlNo": (row.toStoneSlNo == null || row.toStoneSlNo == "") ? null : row.toStoneSlNo,
				    "pcs": row.pcs,
				    "wt": row.weight,
				    "remarks": row.remarks,
				    "stoneCode" : row.stoneCode,
				    "uom":row.uom,
				    "stnSellingPrice":row.stnSellingPrice,
				    "stnCostPrice":row.stnCostPrice,
				    "subCatDes":row.subCatDes
				  }
	     		saveMovementOfStoneDet.push(movementOfStoneSaveDetails);
		   }	
	return saveMovementOfStoneDet;
 }

$("#saveStoneMove").on('click',function(){
	$("#saveStoneMove").prop('disabled',true);
	var createData = saveMovementOfStone();
	console.log(createData);
	
	if (createData) {
		postJSON('/OrderExecution/api/v1/createStoneAccMovement',JSON.stringify(createData),function(data) {
			if (data.resCode == 1) {			
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});				
					$("#jqxgrid").jqxGrid('clear');
					$("#jqxgrid").hide();
					$("#saveStoneMove").hide();
					$("#saveStoneMove").prop('disabled',true);
					$('#orderNoObjC').multiselect("clearSelection");
					$("#stockNoC").val("");
					window.location.href="javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')"

			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
				$("#saveStoneMove").prop('disabled',false);
				$("#jqxgrid").show();
				$("#saveStoneMove").show();
			 }
	    });
	}
});

$("#clearSM").on('click',function(){
	$('#orderNoObjC').multiselect("clearSelection");
	$("#stockNoC").val("");
	$("#jqxgrid").hide();
	$("#saveStoneMove").hide();
});