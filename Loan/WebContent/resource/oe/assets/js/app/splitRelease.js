var splitReleaseFunc = function(stockNum){
	//$("#relStockIdC").val(stockNum);
}

$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

// Smart Search For Vendor Code

var onLoadLovFunc = function(){
$.getJSON('/OrderExecution/api/v1/vcmLOV?page=search&criteria=vType&id=-1', function(data) {
	$("#relStatusC").val("Generarted");
	
	vendorList = data.payload.vCodeList;
	data = [];
	$.each(vendorList, function(key, value) {
		data.push({
			value : value.id,
			label : value.name
		});
	});
	
	$("#vendorCode").autocomplete({

		source : data,
		focus : function(event, ui) {
			event.preventDefault();
			$(this).val(ui.item.label);
		},
		select : function(event, ui) {
			event.preventDefault();
			$(this).val(ui.item.label);
			$("#vendorCode-value").val(ui.item.value);
		}
	});
	});
}

onLoadLovFunc();

var vendorArry = [];
var splitReleaseGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'storeOrDc','type' : 'string','map' : 'storeCode'},
				{'name' : 'orderType','type' : 'string','map' : 'orderType'},
				{'name' : 'orderNo','type' : 'long','map' : 'orderNo'},
				
				{'name' : 'orderSrlNo','type' : 'long','map' : 'orderSl'},
				{'name' : 'orderKind','type' : 'string','map' : 'orderKind'},
				{'name' : 'segment','type' : 'string','map' : 'segment'},
				{'name' : 'jewelType','type' : 'string','map' : 'jewelType'},
				{'name' : 'mainCat','type' : 'string','map' : 'category'},
				
				{'name' : 'subCat','type' : 'string','map' : 'subCategory'},
				{'name' : 'accCode','type' : 'string','map' : 'articleCode'},
				
				{'name' : 'toWeight','type' : 'float','map' : 'toWeight'},
				{'name' : 'fromWeight','type' : 'float','map' : 'fromWeight'},
		        {'name' : 'vendInstruction','type' : 'string','map' : 'inventoryHeadRemarks'},
		        {'name' : 'orderDate','type' : 'string','map' : 'orderDate'},
		        {'name' : 'orderItemDueDate','type' : 'string','map' : 'orderItemDueDate'},
		        {'name' : 'vendorDueDate','type' : 'string','map' : 'vendorDueDate'},
		        {'name' : 'vendorCode','type' : 'string','map' : 'vendorCode'},
		        {'name' : 'vendorName','type' : 'string','map' : ''},
		        {'name' : 'vendorId','type' : 'string','map' : 'vendorId'},
		        {'name' : 'orderItemNo','type' : 'string','map' : ''},
		        {'name' : 'vendorFlag','type' : 'string','map' : 'vendorFlag'},

				/*
				{'name' : 'pcs','type' : 'long','map' : 'pcs'},
				{'name' : 'weight','type' : 'float','map' : 'wt'},
				{'name' : 'accCostPrice','type' : 'float','map' : ''}, 
				{'name' : 'accSellingPrice','type' : 'float','map' : ''},
				{'name' : 'toType','type' : 'string','map' : 'toType'},
				{'name' : 'toDocNo','type' : 'long','map':'toDocNo'}, 

				{'name' : 'toDocSlNo','type' : 'long','map' : 'toDocSrlNo'}, 
				{'name' : 'toAccSlNo','type' : 'long','map' : 'toDocAccSrlNo'},
		        {'name': 'movementType','type':'string','map':'movementType'},
		        
		        {'name' : 'segmentId','type' : 'string','map' : 'segmentDTO>id'},
		        {'name' : 'segmentCode','type' : 'string','map' : 'segmentDTO>code'},
		        
		        {'name' : 'mainCatId','type' : 'string','map' : 'mainCat>id'},
		        {'name' : 'mainCatCode','type' : 'string','map' : 'mainCat>name'},
		        
				{'name' : 'subCatId','type' : 'string','map' : 'subcat>id'},
				{'name' : 'subCatCode','type' : 'string','map' : 'subcat>code'},
*/
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridR").jqxGrid({
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
		editable : true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		columns : [
			{'text' : 'Store/DC','datafield' : 'storeOrDc','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Order Type','datafield' : 'orderType','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Order No','datafield' : 'orderNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Order Srl No','datafield' : 'orderSrlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Order Kind','datafield' : 'orderKind','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Segment','datafield' : 'segment','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Main Cat','datafield' : 'mainCat','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub Cat','datafield' : 'subCat','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Code','datafield' : 'accCode','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'From Weight','datafield' : 'fromWeight','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'},
			{'text' : 'To Weight','datafield' : 'toWeight','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'} ,
			{'text' : 'Vendor Instructions','datafield' : 'vendInstruction','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Order Date','datafield' : 'orderDate','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Order Item Due Date','datafield' : 'orderItemDueDate','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Vendor Due Date','datafield' : 'vendorDueDate','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Vendor Code','datafield' : 'vendorCode',columntype : 'dropdownlist',displayfield : 'vendorCodeN','width' : '5%',cellsalign : 'center',align : 'center',editable : true,sortable : false,
				createeditor : function(row, value, editor) {
					//editor.on('click', function(event){	
						$.getJSON('/OrderExecution/api/v1/vcmLOV?page=search&criteria=vType&id=-1', function(data) {
							var vendorCode = data.payload.vCodeList;
							vendorArry = data.payload.vCodeList;
							var vendorCodeArr = [];
							$.each(vendorCode,function(k,v){
								var vCode;
								vCode = v.name.split("-");
								v.name = vCode;
								
								vendorCodeArr.push({
									"id" :v.id,
									"code" : vCode[0],
									"name":v.name[1]
								});
							});
							
							console.log(vendorCodeArr);
							//console.log(vendorCode);
							
							editor.jqxDropDownList({ source: vendorCodeArr , displayMember: 'code', valueMember: 'id'});
						});
					//});
				},
				 cellbeginedit : function(row){
						var vendorFlag = jQuery('#jqxgridR').jqxGrid ('getcellvalue', row, 'vendorFlag');
						console.log(vendorFlag)
						if(vendorFlag == "true"){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
				
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					console.log(newvalue);
					 $("#jqxgridR").jqxGrid('setcellvalue', row, "vendorId", newvalue.value);
					 $("#jqxgridR").jqxGrid('setcellvalue', row, "vendorName", newvalue.name);
					 $("#jqxgridR").jqxGrid('setcellvalue', row, "vendorCode", newvalue.label);

					updateGrid(newvalue);
				}
			},
			{'text' : 'Vendor Name', datafield : 'vendorName', width : '10%', cellsalign : 'center', align : 'center',editable : false},
			
			{text : '', datafield : 'vendorId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'orderItemNo', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : 'vf', datafield : 'vendorFlag', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},

		]
	});
}

var updateGrid = function(updateVendor){
	var vendName;
	$.each(vendorArry,function(k,v){
		if(v.id == updateVendor.value){
			vendName = v.name[1];
		}
	});
	var gridData = $("#jqxgridR").jqxGrid('getrows');
	var updateGrid = [];
	$.each(gridData,function(k,v){
		v.vendorName = vendName;
		v.vendorId = updateVendor.value;
		v.vendorCode =  updateVendor.value;
		v.vendorCodeN = updateVendor.label;
		updateGrid.push(v);
	});
	console.log(updateGrid);
}
var searchResult = []
$("#searchRel").on('click',function(){
/*	if($("#relStockIdC").val() == ""){
		$.growl.error({
			message : "Please Enter Mandatory Fields !!! ",
			duration : 1000,
			title :'Error'
		});
		return false;
	}else{*/
	var params = {
		"fieldFilters": {
		    "fromDate": $("#fromDateS").val(),
		  	"toDate": $("#toDateS").val(),
		    "stockId": $("#relStockIdC").val(),
			"vendorId" : $("#vendorCode-value").val()
		}
	}
	
	if(params.fieldFilters.stockId == ""){
		delete params.fieldFilters.stockId
	}
	
	if(params.fieldFilters.vendorId == ""){
		delete params.fieldFilters.vendorId
	}
	
	if(params.fieldFilters.fromDate == ""){
		delete params.fieldFilters.fromDate
	}
	
	if(params.fieldFilters.toDate == ""){
		delete params.fieldFilters.toDate;
	}
	 postJSON('/OrderExecution/api/v1/splitReleaseOrderSearch',JSON.stringify(params),function(response) {
		 if(response.resCode == 1){
			 var releaseData = response.payload.list;
			 $.each(releaseData,function(k,v){
				 if(k == 0){
					 v.vendorFlag = true; 
				 }else{
					 v.vendorFlag = false; 
				 }
				
			 });
			// searchResult = releaseData;
			 console.log(releaseData);
			/* for (var i = 0; i < releaseData.length; i++) {
				 releaseData[0].vendorFlag;
				}*/
			 
			 splitReleaseGrid(releaseData);
			 $("#jqxgridR").show();
			 $("#saveSplitRel").show();
		 }else{
			 splitReleaseGrid();
			 $("#jqxgridR").show();
			 $("#saveSplitRel").hide();
		 }
	 });
	//}
});

$("#saveSplitRel").on('click',function(){

	var rows = $('#jqxgridR').jqxGrid('getrows');
	var arrRel= [];
	console.log(rows);
	$.each(rows,function(k,v){
		if(v.vendorId == null || v.vendorId == ""){
			$.growl.error({
				message: "Please Select Vendor Code !!!",
				durartion : 1000,
				title : 'Error'
			});
			return false;
		}else{
			$("#saveSplitRel").prop('disabled',true);
			//$.each(rows,function(k,v){
				console.log(v);
				arrRel.push({
					"orderNo": v.orderNo,
				    "orderSl": v.orderSrlNo,
				    "vendorId": v.vendorId,
				    "orderItemNo": v.orderItemNo,
				    "articleCode": v.accCode,
				    "vendorDueDate": v.vendorDueDate,
				    "orderItemDueDate":v.orderItemDueDate,
				    "vendorInstructions": v.vendInstruction,
				    "selectionStatus" : true
				});
			//});
			console.log(arrRel);
		  }	
	});
	if(arrRel.length > 0){
		postJSON('/OrderExecution/api/v1/assignVROrders',JSON.stringify(arrRel),function(data) {
			if (data.resCode == 1) {			
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});				
					$("#jqxgridR").jqxGrid('clear');
					$("#jqxgridR").hide();
					$("#saveSplitRel").hide();
					$("#saveSplitRel").prop('disabled',true);
					$("#relStockIdC").val("");
					$("#vendorCode").val("");
					$("#vendorCode-value").val("");
					$("#saveSplitRel").prop('disabled',true);
					window.location.href="javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')"
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
				$("#saveSplitRel").prop('disabled',false);
				$("#jqxgridR").show();
				$("#saveSplitRel").show();
				$("#saveSplitRel").prop('disabled',false);
			 }
	    });
	}
	
	
	

});

$("#clearRel").on('click',function(){
	$("#relStockIdC").val("");
	$("#vendorCode").val("");
	$("#vendorCode-value").val("");
	$("#fromDateS").val("");
	$("#toDateS").val("");
	$("#jqxgridR").hide();
	$("#saveSplitRel").hide();
});