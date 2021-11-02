$("#accMovementSplitSection").hide();
$("#saveAccMove").hide();



var stockNo;
var accMovSplitFunc = function(docNo){
	console.log(docNo);
	$("#accMovementSplitSection").show();
	$("#stoneMovementSplitSection").hide();
	$("#unsettingSplitSection").hide();
	$("#fromTypeC").val("SI");
	//$("#addDet").hide();
	$("#accStockIdC").val(docNo);
	//onloadFunction();
}

/*var onloadFunction = function(docNo){
	//stockNo = docNo;
	var params = {"fieldFilters":{"type":"allSplitOrderNos","stockId":$("#accStockIdC").val();}}
	
	 postJSON('/OrderExecution/api/v1/onloadMovementOfAccessories',JSON.stringify(params),function(response) {
	 });
}
*/

$("#searchAM").on('click',function(){
	if($("#accStockIdC").val() == ""){
		$.growl.error({
			message : "Please Enter Stock No !!! ",
			duration : 1000,
			title :'Error'
		});
		return false;
	}else{
	var params = {"fieldFilters":{"type":"allSplitAccMovements","stockId":$("#accStockIdC").val()}}
	
	 postJSON('/OrderExecution/api/v1/onloadMovementOfAccessories',JSON.stringify(params),function(response) {
		 if(response.resCode == 1){
			 accMovementGrid(response.payload.splitAccMovements);
			 $("#jqxgridA").show();
			 $("#saveAccMove").show();
		 }else{
			 accMovementGrid();
			 $("#jqxgridA").show();
			 $("#saveAccMove").hide();
			 
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

var accMovementGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'fromType','type' : 'string','map' : 'fromType'},
				{'name' : 'fromDocNo','type' : 'long','map' : 'fromDocNo'},
				{'name' : 'fromDocSlNo','type' : 'long','map' : 'fromDocSrlNo'},
				
				{'name' : 'fromAccSlNo','type' : 'long','map' : 'fromDocAccSrlNo'},
				{'name' : 'segment','type' : 'string','map' : 'segmentDTO>description'},
				{'name' : 'mainCat','type' : 'string','map' : 'mainCat>description'},
				
				{'name' : 'subCat','type' : 'string','map' : 'subcat>description'},
				{'name' : 'accCode','type' : 'string','map' : 'accCode'},
				
				{'name' : 'pcs','type' : 'long','map' : 'pcs'},
				{'name' : 'weight','type' : 'float','map' : 'wt'},
				{'name' : 'accCostPrice','type' : 'float','map' : ''}, 
				{'name' : 'accSellingPrice','type' : 'float','map' : ''},
				{'name' : 'toType','type' : 'string','map' : 'toType'},
				{'name' : 'toDocNo','type' : 'long','map':'toDocNo'}, 

				{'name' : 'toDocSlNo','type' : 'long','map' : 'toDocSrlNo'}, 
				{'name' : 'toAccSlNo','type' : 'long','map' : 'toDocAccSrlNo'},
		        {'name' : 'remarks','type' : 'string','map' : 'remarks'},
		        {'name': 'movementType','type':'string','map':'movementType'},
		        
		        {'name' : 'segmentId','type' : 'string','map' : 'segmentDTO>id'},
		        {'name' : 'segmentCode','type' : 'string','map' : 'segmentDTO>code'},
		        
		        {'name' : 'mainCatId','type' : 'string','map' : 'mainCat>id'},
		        {'name' : 'mainCatCode','type' : 'string','map' : 'mainCat>name'},
		        
				{'name' : 'subCatId','type' : 'string','map' : 'subcat>id'},
				{'name' : 'subCatCode','type' : 'string','map' : 'subcat>code'},
				{'name': 'sellingRate','type':'float'}

			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridA").jqxGrid({
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
			{'text' : 'From Type','datafield' : 'fromType','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'From Doc No','datafield' : 'fromDocNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'From Doc Srl No','datafield' : 'fromDocSlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'From Acc Srl No','datafield' : 'fromAccSlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Segment','datafield' : 'segment','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Cat','datafield' : 'mainCat','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Sub Cat','datafield' : 'subCat','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Code','datafield' : 'accCode','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Wt','datafield' : 'weight','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'},
			{'text' : 'Cost Price','datafield' : 'accCostPrice','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d2'},
			{'text' : 'Selling Price','datafield' : 'accSellingPrice','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d2'} ,
			{'text' : 'To Type','datafield' : 'toType','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'To Doc No','datafield' : 'toDocNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'To Doc Srl No','datafield' : 'toDocSlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'To Acc Srl No','datafield' : 'toAccSlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Remarks','datafield' : 'remarks','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : '', datafield : 'movementType', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			
			{text : '', datafield : 'segmentId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'segmentCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'mainCatId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'mainCatCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'subCatId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'subCatCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'sellingRate', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
		]
	});
}

var saveMovementOfAcc = function(){
	var rows = $('#jqxgridA').jqxGrid('getrows');
	var arrAcc = [];
	$.each(rows,function(k,v){
		console.log(v);
		arrAcc.push({
		"movementType": v.movementType,
		"fromType" : v.fromType==""? null : v.fromType,
		"fromDocNo": v.fromDocNo==""?null : parseInt(v.fromDocNo),
		"fromDocSrlNo": v.fromDocSlNo == "" ? null:parseInt(v.fromDocSlNo),
		"fromDocAccSrlNo": v.fromAccSlNo == "" ? null :parseInt(v.fromAccSlNo),
		"segmentDTO": {
		  "id": parseInt(v.segmentId),
		  "description": v.segment,
		  "code": v.segmentCode,
		},
		"mainCat": {
		  "id": parseInt(v.mainCatId),
		  "name": v.mainCatCode,
		  "description": v.mainCat,
		},
		"subcat": {
		  "id": parseInt(v.subCatId),
		  "name": v.subCatCode,
		  "description": v.subCat,
		},
		"pcs": parseInt(v.pcs),
		"wt":parseFloat(v.weight),
		"accCostPrice": v.accCostPrice==""?null:v.accCostPrice,
		"accSellingPrice": v.accSellingPrice,
		"accCode"	: v.accCode,	
		"toType": (v.toType),
		"toDocNo": v.toDocNo==""?null:parseInt(v.toDocNo),
		"toDocSrlNo": v.toDocSlNo==""?null:parseInt(v.toDocSlNo),
		"toDocAccSrlNo":v.toAccSlNo==""?null:parseInt(v.toAccSlNo),
		"remarks":v.remarks==""?null:v.remarks,
		"sellingRate": v.sellingRate == "" ? null : v.sellingRate		
		});
	})
	return arrAcc;
}

$("#saveAccMove").on('click',function(){
	var createData = saveMovementOfAcc();
	console.log(createData);
	
	if (createData) {
		postJSON('/OrderExecution/api/v1/createAccMovement',JSON.stringify(createData),function(data) {
			if (data.resCode == 1) {			
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});				
					$("#jqxgridA").jqxGrid('clear');
					$("#jqxgridA").hide();
					$("#saveAccMove").hide();
					$("#saveAccMove").prop('disabled',true);
					$("#accStockIdC").val("");
					window.location.href="javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')"

			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
				$("#saveAccMove").prop('disabled',false);
				$("#jqxgridA").show();
				$("#saveAccMove").show();
			 }
	    });
	}
});

$("#clearAcc").on('click',function(){
	$("#accStockIdC").val(""); 
	$("#jqxgridA").jqxGrid('clear');
	$("#saveAccMove").hide();
	$("#jqxgridA").hide();
});