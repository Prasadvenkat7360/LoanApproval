/*  ##	Author1         : 	Pooja Sangve(UI)
	##	Date Creation 	: 	2-05-2018
	## 	Description		:	Addition Of Stones and Accessory Codes(Saving)
*/

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

var redirect = function() {
	window.location.href = "javascript:showContentPage('addStoneAccessoryCodes', 'bodySwitcher')";
	return window.location.href;
}

//################### OnloadLOvs ###########################
var onloadApi = function(){
	$('#orderNo').empty().append('<option value="" selected>--Select--</option>');
	var orderNo = $("#orderNo").val();
	$.getJSON("/OrderExecution/api/v1/getOrderNosForStoneAccAdd",function(data){
		var orderNos = data.payload.orderNos;
		$.each(orderNos,function(k,v){
			$("#orderNo").append('<option value="'+ v +'">' + v + '</option>' )
		});
   });
};
$("#orderNo").on("change",function(){
	$('#OrderSrlNo').empty().append('<option value="" selected>--Select--</option>');
	var orderNo = $("#orderNo").val();
	if(orderNo != ""){
		$.getJSON("/OrderExecution/api/v1/getOrderItemSrlsForAddStoneAcc?orderNo="+orderNo,function(data){
			var orderItemSrlNos = data.payload.orderItemSrlNos;
			$.each(orderItemSrlNos,function(k,v){
				$("#OrderSrlNo").append('<option value="'+ v +'">' + v + '</option>' )
			});
		});
	};
});
onloadApi();
// ############################ Hide Show of Stone Fields ################
var showHideField = function(){
	var stoneSeg = $("#stoneSeg option:selected").attr('code');
	var stoneMainCat = $("#stoneMainCat option:selected").attr('code');
	var stoneSuppBy  = $("#stoneSuppBy").val();
	if(stoneSuppBy == "V"){
		$("#jwStonePcsSection").show();
		$("#jwStoneWtSection").show();
		$("#jwPriceSection").show();
		$("#dplStonePcsSection").hide();
		$("#dplStoneWtSection").hide();
		$("#stonePriceSection").hide();
	}else if(stoneSuppBy == "CO"){
		$("#jwStonePcsSection").hide();
		$("#jwStoneWtSection").hide();
		$("#jwPriceSection").hide();
		$("#dplStonePcsSection").show();
		$("#dplStoneWtSection").show();
		$("#stonePriceSection").show();
	}
	if(stoneSeg == "DI"){
		$("#actualColorSection").hide();
		$("#stoneSubCatSection").hide();
		$("#stoneShapeSection").show();
		$("#wtRangeSection").show();
		$("#claritySection").show();
		$("#colorSection").show();
		$("#cutGradeSection").show();
		
		if(stoneMainCat == "CM" || stoneMainCat == "CP" || stoneMainCat == "CS"){
			$("#actualColorSection").show();
		}
	}else{
		$("#actualColorSection").hide();
		$("#stoneSubCatSection").show();
		$("#stoneShapeSection").hide();
		$("#wtRangeSection").hide();
		$("#claritySection").hide();
		$("#colorSection").hide();
		$("#cutGradeSection").hide();
	}
}
// ############################ On Change API Call #######################

$("#OrderSrlNo").on("change",function(){
	var orderNo = $("#orderNo").val();
	var OrderSrlNo = $("#OrderSrlNo").val();
	var AccArray = [];
	var stoneArr = [];
	if(OrderSrlNo != "" || orderNo != ""){
		var StoneAcc = $("#stoneAccId").val();
		if(StoneAcc == "S"){
			$.getJSON("/OrderExecution/api/v1/getOrderItemStonesForAdd?orderNo="+orderNo+'&'+"srlNo="+OrderSrlNo,function(data){
				$.each(data.payload.orderItemStones,function(k,v){
					stoneArr.push(v);
				})
				if(stoneArr.length != 0){
					stoneDetails(stoneArr,stoneId=1);
				}
				$("#vendorId").val(data.payload.vendorId);
				$("#segmentId").val(data.payload.segmentDesc);
				$("#storeId").val(data.payload.storeId);
			});
			
		}else if(StoneAcc == "A"){
			$.getJSON("/OrderExecution/api/v1/getOrderItemAccsForAdd?orderNo="+orderNo+'&'+"srlNo="+OrderSrlNo,function(data){
				$.each(data.payload.orderItemAccs,function(k,v){
					AccArray.push(v);
				})
				if(AccArray.length != 0){
					AccDetails(AccArray,AccId=1);
				}
				$("#vendorId").val(data.payload.vendorId);
				$("#segmentId").val(data.payload.segmentDesc);
				$("#storeId").val(data.payload.storeId);
			});
		}
	}
	$("#orderNo").prop("disabled",true);
	$("#OrderSrlNo").prop("disabled",true);
});

// ####################################### Saving Of Stone Codes ###########################
var stoneDetails = function(data,stoneId){
	if(stoneId == 1){
		var source = {
	        localdata: data,
	        datatype: "json",
			datafields : [ 
				{'name' : 'id','type' : 'int','map':"id"},
				{'name' : 'serialNumber','type' : 'int','map':'serialNumber'},
				{'name' : 'uiSuppliedByE','type' : 'string','map':'suppliedBy>name'},
				{'name' : 'uiSuppliedBy','type' : 'string','map':'suppliedBy>id'},
				{'name' : 'segment','type' : 'string','map':'stoneSegment'},
				{'name' : 'mainCategory','type' : 'string','map':"stoneCategory"}, 
				{'name' : 'subCategoryDesc','type' : 'string','map':"subCategoryDesc"},
				{'name' : 'uiCodeE','type' : 'string','map':'code>name'},
				{'name' : 'uiCode','type' : 'string','map':'code>id'},
				{'name' : 'uiColorE','type' : 'string','map':'color>name'},
				{'name' : 'uiCutGradeE','type' : 'string','map':"cutGrade>id"}, 
				{'name' : 'uiClarityE','type' : 'string','map':"clarity>id"}, 
				{'name' : 'uiWeightRangeE','type' : 'string','map':"weightRange>name"},
				{'name' : 'compPieces','type' : 'int','map':"compReqPcs"},
				{'name' : 'uom','type' : 'string','map':"uom"},
				{'name' : 'rate','type' : 'float','map':"rate"},
				{'name' : 'vendorWeight','type' : 'float','map':"vendorReqWeight"},
				{'name' : 'vendorPrice','type' : 'float','map':"vendorPrice"},
				{'name' : 'vendorPieces','type' : 'int','map':"vendorReqPieces"}, 
				{'name' : 'compWeight','type' : 'float','map':"compReqdWt"},
				{'name' : 'compPrice','type' : 'float','map':"compPrice"},
				{'name' : 'uiConditionE','type' : 'string','map':"uiCondition>name"}, 
				{'name' : 'actColor','type' : 'string','map':"actualColor>id"},
				{'name' : 'editDelete','type' : 'int'},
				{'name' : 'orderItemSlNo','type' : 'int','map':"orderItemSlNo"},
				
			]
		};
	}else{
		var source = {
		        localdata: data,
		        datatype: "json",
				datafields : [ 
					{'name' : 'id','type' : 'int'},
					{'name' : 'serialNumber','type' : 'int'},
					{'name' : 'uiSuppliedByE','type' : 'string'},
					{'name' : 'uiSuppliedBy','type' : 'string'},
					{'name' : 'segment','type' : 'string'},
					{'name' : 'uiCondition','type' : 'string'},
					{'name' : 'uiConditionE','type' : 'string'},
					{'name' : 'uiWeightRange','type' : 'string'},
					{'name' : 'uiWeightRangeE','type' : 'string'},
					{'name' : 'shape','type' : 'string'},
					{'name' : 'subCategoryDesc','type' : 'string'},
					{'name' : 'uiCode','type' : 'string'},
					{'name' : 'uiCodeE','type' : 'string'},
					{'name' : 'uiColor','type' : 'string'},
					{'name' : 'uiColorE','type' : 'string'},
					{'name' : 'uiCutGrade','type' : 'string'}, 
					{'name' : 'uiCutGradeE','type' : 'string'}, 
					{'name' : 'uiClarity','type' : 'string'}, 
					{'name' : 'uiClarityE','type' : 'string'}, 
					{'name' : 'uiActualColor','type' : 'string'},
					{'name' : 'uiActualColorE','type' : 'string'},
					{'name' : 'stoneSeg','type' : 'string'},
					{'name' : 'mainCategory','type' : 'string'}, 
					{'name' : 'stoneMainCat','type' : 'string'},
					{'name' : 'stoneShape','type' : 'string'},
					{'name' : 'uiSubCategoryE','type' : 'string'},
					{'name' : 'uiSubCategory','type' : 'string'},
					{'name' : 'stoneShapeName','type' : 'string'},
					{'name' : 'compPieces','type' : 'int'},
					{'name' : 'uom','type' : 'string'},
					{'name' : 'rate','type' : 'float'},
					{'name' : 'vendorWeight','type' : 'float'},
					{'name' : 'vendorPrice','type' : 'float'},
					{'name' : 'vendorPieces','type' : 'int'}, 
					{'name' : 'compWeight','type' : 'float'},
					{'name' : 'compPrice','type' : 'float'},
					{'name' : 'editDelete','type' : 'int'},
					{'name' : 'orderItemSlNo','type' : 'int'},
					{'name' : 'compPieces','type' : 'string'},
					{'name' : 'Flag' ,'type': 'string'},
					{'name' : 'newStoneFlag' ,'type': 'string'},
				]
			};
	}

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStone").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 50,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		pageable:true,
		pagesize:5,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stones Details');
		},
		columns : [
			{'text' : 'Stone srl no','datafield' : 'serialNumber','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Supp. By','datafield' : 'uiSuppliedByE','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Segment','datafield' : 'segment',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'Main Category',	'datafield' : 'mainCategory','width' : '8%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat. Desc','datafield' : 'subCategoryDesc',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '11%'},
			{'text' : 'Code','datafield' : 'uiCodeE','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Color','datafield' : 'uiColorE','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Actual Color','datafield' : 'uiActualColor','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Cut Grade','datafield' : 'uiCutGradeE','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Clarity','datafield' : 'uiClarityE','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Wt./Cost Range',	'datafield' : 'uiWeightRangeE','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center',cellsformat : 'd3'},
			{'text' : 'UOM','datafield' : 'uom','width' : '3%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Rate/HC','datafield' : 'rate','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd2'},			
			{'text' : 'JW PCs.','datafield' : 'vendorPieces','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'JW Wt.','datafield' : 'vendorWeight','width' : '8%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'JW Price.','datafield' : 'vendorPrice','width' : '8%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Comp PCs.','datafield' : 'compPieces','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : true,
				cellbeginedit : function(row) {
					var rows = $('#jqxgridStone').jqxGrid('getrows');
					var rowId = $('#jqxgridStone').jqxGrid('getcellvalue',row,"id");
					if(typeof rows != "undefined"){
						if(rowId == "" || rowId == null){
							return true;
						}else{
							return false;
						}
					}
				},
			},
			{'text' : 'Comp Wt.','datafield' : 'compWeight','width' : '8%',cellsalign : 'right',	align : 'center',sortable : false,editable : true,cellsformat : 'd3',
				cellbeginedit : function(row) {
					var rows = $('#jqxgridStone').jqxGrid('getrows');
					var rowId = $('#jqxgridStone').jqxGrid('getcellvalue',row,"id");
					if(typeof rows != "undefined"){
						if(rowId == "" || rowId == null){
							return true;
						}else{
							return false;
						}
					}
				},
			},
			{'text' : 'Comp Price.','datafield' : 'compPrice','width' : '8%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},			
			{'text' : 'Condition','datafield' : 'uiConditionE','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : '','datafield' : 'newStoneFlag','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},

			]
	});
}
var AccDetails = function(data,AccId){
	if(AccId == 1){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' : 'id','type' : 'int','map':'disassembleAccId'},
        	{'name' : 'rateHc','type' : 'int','map':'rate'},
			{'name' : 'serialNumber','type' : 'int','map':'serialNumber'},
			{'name' : 'uiSuppliedByE','type' : 'string','map':"suppliedBy>name"},
			{'name' : 'uiSuppliedBy','type' : 'string','map':"suppliedBy>id"},
			{'name' : 'category','type' : 'string','map':"category"},
			{'name' : 'categoryId','type' : 'string','map':"category"},
			{'name' : 'accessoryDesc','type' : 'string','map':"subCategory>description"},
			{'name' : 'subCatId','type' : 'string','map':"subCategory>id"},
			{'name' : 'uiCode','type' : 'string','map':"code>id"},
			{'name' : 'uiCodeE','type' : 'string','map':"code>name"},
			{'name' : 'rate','type' : 'float','map':"rate"},
			{'name' : 'vendorWeight','type' : 'float','map':"vendorReqWeight"},
			{'name' : 'vendorPrice','type' : 'float','map':"vendorPrice"},
			{'name' : 'vendorPieces','type' : 'int','map':"vendorReqPieces"}, 
			{'name' : 'compWeight','type' : 'float','map':'companyReqWt'},
			{'name' : 'compPrice','type' : 'float','map':"compPrice"},
			{'name' : 'compPieces','type' : 'float','map':"companyReqPcs"},
			{'name' : 'uiConditionE','type' : 'string','map':"condition>name"}, 
			{'name' : 'uom','type' : 'float','map':"uom>id"},
			{'name' : 'id','type' : 'float','map':"id"}, 
			{'name' : 'orderItemSlNo','type' : 'float','map':"orderItemSlNo"},
			
		]
	};
	}else{
		var source = {
	        localdata: data,
	        datatype: "json",
	        datafields : [ 
	        	{'name' : 'Flag','type' : 'string'},
				{'name' : 'serialNumber','type' : 'int'},
				{'name' : 'uiSuppliedByE','type' : 'string'},
				{'name' : 'uiSuppliedBy','type' : 'string'},
				{'name' : 'category','type' : 'string'},
				{'name' : 'categoryId','type' : 'string'},
				{'name' : 'accessoryDesc','type' : 'string'},
				{'name' : 'uiSubCategory','type' : 'int'},
				{'name' : 'uiSubCategoryE','type' : 'string'},
				{'name' : 'uiCodeE','type' : 'string'},
				{'name' : 'uiCode','type' : 'string'},
				{'name' : 'rate','type' : 'float'},
				{'name' : 'vendorWeight','type' : 'float'},
				{'name' : 'vendorPrice','type' : 'float'},
				{'name' : 'vendorPieces','type' : 'int'}, 
				{'name' : 'compWeight','type' : 'float'},
				{'name' : 'compPrice','type' : 'float'},
				{'name' : 'compPieces','type' : 'float'},
				{'name' : 'uiConditionE','type' : 'string'},
				{'name' : 'uiCondition','type' : 'string'},
				{'name' : 'uom','type' : 'float'},
				{'name' : 'id','type' : 'float'}, 
				{'name' : 'orderItemSlNo','type' : 'float'},
				{'name' : 'newAccFlag','type' : 'string'},
			]
		};
	}

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 50,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		pagesize:5,
		pageable:true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 12px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Accessory Details');
		},
		columns : [
			{'text' : 'Acc.Sl.No.','datafield' : 'serialNumber','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supplied By','datafield' : 'uiSuppliedByE','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Category','datafield' : 'category','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub category Description','datafield' : 'accessoryDesc',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '15%'},
			{'text' : 'Code','datafield' : 'uiCodeE','width' : '7%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'UOM','datafield' : 'uom','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Rate/HC','datafield' : 'rate','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd2'},
			{'text' : 'JW PCs.','datafield' : 'vendorPieces','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'JW Wt.','datafield' : 'vendorWeight','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'JW Price.','datafield' : 'vendorPrice','width' : '8%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Comp PCs.','datafield' : 'compPieces','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : true,
				cellbeginedit : function(row) {
					var rows = $('#jqxgridAcc').jqxGrid('getrows');
					var rowId = $('#jqxgridAcc').jqxGrid('getcellvalue',row,"id");
					if(typeof rows != "undefined"){
						if(rowId == "" || rowId == null){
							return true;
						}else{
							return false;
						}
					}
				},
			},
			{'text' : 'Comp Wt.','datafield' : 'compWeight','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : true,cellsformat : 'd3',
				cellbeginedit : function(row) {
					var rows = $('#jqxgridAcc').jqxGrid('getrows');
					var rowId = $('#jqxgridAcc').jqxGrid('getcellvalue',row,"id");
					if(typeof rows != "undefined"){
						if(rowId == "" || rowId == null){
							return true;
						}else{
							return false;
						}
					}
				},
			},
			{'text' : 'Comp Price.','datafield' : 'compPrice','width' : '8%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},			
			{'text' : 'Condition','datafield' : 'uiConditionE','width' : '10%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			//{'text' : '','datafield' : 'editDelete','width' : '3%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'newAccFlag','datafield' : 'newAccFlag','width' : '8%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,hidden:true},			

			]
	});
}

var StoneAcc = $("#stoneAccId").val();
if(StoneAcc == "S"){
	$("#jqxgridStone").show();
	stoneDetails();
	$("#jqxgridAcc").hide();
}else if(StoneAcc == "A"){
	$("#jqxgridStone").hide();
	$("#jqxgridAcc").show();
	AccDetails();
}

$("#stoneAccId").on("change",function(){
	$("#orderNo").prop("disabled",false);
	$("#OrderSrlNo").prop("disabled",false);
	$('#OrderSrlNo').val("");
	$('#orderNo').val("");
	var StoneAcc = $("#stoneAccId").val();
	if(StoneAcc == "S"){
		$("#jqxgridStone").show();
		stoneDetails();
		$("#jqxgridAcc").hide();
	}else if(StoneAcc == "A"){
		$("#jqxgridStone").hide();
		$("#jqxgridAcc").show();
		AccDetails();
	}
});
// #################### Model POpUP For Stones And Accessory #######################

$("#add").on("click",function(){
	
	if(($('#orderNo').val() == null || $('#orderNo').val() == "") || ($('#OrderSrlNo').val() == null || $('#OrderSrlNo').val() == "")){
		$.growl.error({
			message : "Please fill the mandatory feilds !!",
			duration : 10000
		});
		return false;
	}
	var StoneAcc = $("#stoneAccId").val();
	if(StoneAcc == "S"){
		$('#addStone').modal('show');
		$("#stoneShapeSection").hide();
		$("#wtRangeSection").hide();
		$("#claritySection").hide();
		$("#actualColorSection").hide();
		$("#colorSection").hide();
		$("#cutGradeSection").hide();
		$("#uomSection").show();
		$("#jwStonePcsSection").hide();
		$("#jwStoneWtSection").hide();
		$("#dplStonePcsSection").hide();
		$("#dplStoneWtSection").hide();
		$("#stonePriceSection").hide();
		$("#stoneCondSection").hide();
		$("#subCatSection").hide();
		$("#stoneDescSection").hide();
		$("#jwPriceSection").hide();
		$("#subCatSection").hide();
		$("#stoneDescSection").hide();
	
		$('#stoneSuppBy').empty().append('<option value="" selected>--Select--</option>');
		$.getJSON('/OrderExecution/api/v1/getStoneHeadersForSC', function(data) {
			var stoneSupByList = data.payload.suppliedBy;
	
			$.each(stoneSupByList,function(k, v) {
					if (v.id != "CU" && v.id != "COV") {
						$('#stoneSuppBy').append('<option value="' + v.id + '">' + v.name + '</option>');
					}
			  });
		 });
	 }else if(StoneAcc == "A"){
		 $("#addAcc").modal('show');
		 $("#jwAccPcsSection").hide();
		 $("#jwAccWtSection").hide();
		 $("#jwAccPriceSection").hide();
		 $("#compAccWt").prop('disabled', false);
		 $("#accConditionSection").hide();

		 $("#compAccPcsSection").hide();
		 $("#compAccWtSection").hide();
		 $("#compAccPriceSection").hide();
		 $('#accSupBy').empty().append('<option value="" selected>--Select--</option>');
		 $.getJSON('/OrderExecution/api/v1/getAccessoryHeaders ', function(data) {
			var accSupByList = data.payload.suppliedBy;
			$.each(accSupByList,function(k, v) {
				if (v.id != "CU" && v.id != "COV") {
					$('#accSupBy').append('<option value="' + v.id + '">' + v.name + '</option>');
				}
			});
		});
	 };
});

$("#stoneSuppBy").on('change',function() {
		if ($(this).val() == "COV") {
			$("#jwStonePcsSection").show();
			$("#jwStoneWtSection").show();
			$("#jwPriceSection").show();
			$("#dplStonePcsSection").show();
			$("#dplStoneWtSection").show();
			$("#stonePriceSection").show();
			$("#stoneSubCatSection").hide();
			$("#stoneDescSection").hide();
		}
		if ($("#stoneSuppBy").val() == "CO") {
			$("#jwStonePcsSection").hide();
			$("#jwStoneWtSection").hide();
			$("#jwPriceSection").hide();
			$("#dplStonePcsSection").show();
			$("#dplStoneWtSection").show();
			$("#stonePriceSection").show();
			$("#stoneSubCatSection").hide();
			$("#stoneDescSection").hide();
		}
		if ($("#stoneSuppBy").val() == "V") {
			$("#jwStonePcsSection").show();
			$("#jwStoneWtSection").show();
			$("#jwPriceSection").show();
			$("#dplStonePcsSection").hide();
			$("#dplStoneWtSection").hide();
			$("#stonePriceSection").hide();
			$("#stoneSubCatSection").hide();
			$("#stoneDescSection").hide();
		}
		var stoneSupBy = $(this).val();
		var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : stoneSupBy,
				"mCode" :    $("#segmentId").val()
			}
		};
		$('#stoneSeg').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneSegments', JSON.stringify(fieldFilters), function(data) {
			var stoneSegList = data.payload.stoneSeg;
			$.each(stoneSegList, function(k, v) {
				$('#stoneSeg').append('<option code="' + v.code + '" value="'+ v.id + '">' + v.description + '</option>');
		 });
	 });
});

var showSubCatDesc = function() {
	var subCatDesc = "";
	if ($("#stoneSeg").val() != "") {
		subCatDesc += $("#stoneSeg option:selected").text() + " ";
	}
	if ($("#stoneMainCat").val() != "") {
		subCatDesc += $("#stoneMainCat option:selected").text() + " ";
	}

	if ($("#stoneShape").val() != "") {
		subCatDesc += $("#stoneShape option:selected").text() + " ";
	}

	if ($("#clarity").val() != "") {
		subCatDesc += $("#clarity option:selected").text() + " ";
	}

	if ($("#color").val() != "") {
		subCatDesc += $("#color option:selected").text() + " ";
	}

	if ($("#cutGrade").val() != "") {
		subCatDesc += $("#cutGrade option:selected").text() + " ";
	}

	if ($("#wtRange").val() != "") {
		subCatDesc += $("#wtRange option:selected").text() + " ";
	}
	
	$("#subCatDescriptionDesc").val(subCatDesc);
	$("#subCatDescription").html(subCatDesc);
}

$("#stoneSeg").on('change',function() {
        showHideField();
		var stoneSeg = $(this).val();
		var stoneSuppBy = $("#stoneSuppBy").val();
		var stoneSegName = $("#stoneSeg option:selected").attr('code');
		var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : stoneSuppBy,
				"sSegId" : stoneSeg,
				"sSeg" : stoneSegName,
				"vId" : $("#vendorId").val()
			}
		};
		$('#stoneMainCat').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneCategories', JSON.stringify(fieldFilters), function(data) {
			var mainCatListList = data.payload.mainCatList;
			$.each(mainCatListList, function(k, v) {
				$('#stoneMainCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
		  });
	 });
});

$("#mainCat").on('change',function() {
		var mainCate = $(this).val();
		var rows = $("#jqxgridAcc").jqxGrid('getrows');
		var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
		var stoneSegId = $("#stoneSeg").val();

		var fieldFilters = {
			"fieldFilters" : {
				"segId" : stoneSegId,
				"mJewelId" : "",
				"catId" : mainCate,
				"vId" : $("#vendorId").val()
			}
		};
		$('#subCat').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getCategorySubCategory', JSON.stringify(fieldFilters), function(data) {
			var subCatList = data.payload.subCatList;
			$.each(subCatList, function(k, v) {
		    	$('#subCat').append('<option value="' + v.id + '">' + v.description + '</option>');
		 });
	});
});

$("#stoneMainCat").on('change',function() {
    showHideField();
	var stoneMainCat = $("#stoneMainCat").val();
	var stoneSuppBy = $("#stoneSuppBy").val();
	var stoneSeg = $("#stoneSeg").val();
	var stoneSegName = $("#stoneSeg option:selected").attr('code');

	if ($("#stoneSeg option:selected").attr('code') == "DI") {

		var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : stoneSuppBy,
				"sSegId" : stoneSeg,
				"sSeg" : stoneSegName,
				"catId" : stoneMainCat,
				"vId" : $("#vendorId").val()
			}
		};

		$('#stoneShape').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getShapes', JSON.stringify(fieldFilters), function(data) {
			var subCatList = data.payload.subCatList;
			$.each(subCatList, function(k, v) {
				$('#stoneShape').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
			});
		});
	} else {
		var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : stoneSuppBy,
				"sSegId" : stoneSeg,
				"sSeg" : stoneSegName,
				"catId" : stoneMainCat,
				"vId" : $("#vendorId").val()
			}
		};

		$('#stoneSubCat').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneSubCategories', JSON.stringify(fieldFilters), function(data) {
			var subCatList = data.payload.subCatList;
			$.each(subCatList, function(k, v) {
				$('#stoneSubCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
			});
		});
	}
});
$("#stoneShape").on('change',function() {

	if ($("#stoneShape").val() != "") {
		$("#subCatSection").show();
		$("#stoneDescSection").show();
		$("#uomSection").show();
	}

	var stoneSegName = $("#stoneSeg option:selected").attr('code');
	var stoneSuppBy = $("#stoneSuppBy").val();
	var stoneShape = $("#stoneShape option:selected").attr('code');
	var stoneMainCat = $("#stoneMainCat option:selected").attr('code');

	var fieldFilters = {
		"fieldFilters" : {
			"sSeg" : stoneSegName,
			"catCode" : stoneMainCat,
			"suppliedBy" : stoneSuppBy,
			"shapeCode" : stoneShape,
			"vId" : $("#vendorId").val()
		}
	};
	$('#wtRange').empty().append('<option value="" selected>--Select--</option>');
	$('#clarity').empty().append('<option value="" selected>--Select--</option>');
	$('#color').empty().append('<option value="" selected>--Select--</option>');
	$('#cutGrade').empty().append('<option value="" selected>--Select--</option>');
	$('#actualColor').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(fieldFilters), function(data) {
		var weightSlabList = data.payload.weightSlab;
		var clarityList = data.payload.clarity;
		var colorList = data.payload.color;
		var cutGradeList = data.payload.cutGrade;
		var actualColor = data.payload.actualColor;

		$.each(weightSlabList, function(k, v) {
			$('#wtRange').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
		});

		$.each(clarityList, function(key, val) {
			$('#clarity').append('<option code="' + val.id + '" value="' + val.id+ '">' + val.id + '</option>');
		});

		$.each(colorList, function(ke, va) {
			$('#color').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
		});

		$.each(cutGradeList, function(ke, va) {
			$('#cutGrade').append('<option code="' + va.id + '" value="' + va.id+ '">' + va.id + '</option>');
		});

		$.each(actualColor, function(ke, va) {
			$('#actualColor').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
		});

		$('#uom').val(data.payload.uom);
		$('#stoneIdVal').val(data.payload.stoneDetails.id);

		$('#stoneArticleCode').val(data.payload.stoneDetails.name);
		$('#stoneArticleId').val(data.payload.stoneDetails.id);

	});
});

$("#cutGrade").on('change',function() {
	var stoneSuppBy = $("#stoneSuppBy").val();
	var clarity = $("#clarity").val();
	var color = $("#color").val();
	var cutGrade = $("#cutGrade").val();
	var stoneSuppBy = $("#stoneSuppBy").val();
	var wtRange = $("#wtRange").val();
	var uom = $("#uom").val();
	var stoneMainCat = $("#stoneMainCat").val();
	var stoneId = $("#stoneIdVal").val();
	var stoneSeg = $("#stoneSeg").attr('code');
	var actualColor = $("#actualColor").val();
	var fieldFilters = {
		"fieldFilters" : {
			"suppliedBy" : stoneSuppBy,
			"stoneId" : stoneId,
			"clarity" : clarity,
			"color" : color,
			"cutGrade" : cutGrade,
			"weightSlab" : wtRange,
			"uom" : uom,
			"actualColor" : actualColor == ""?null:actualColor
		}
	};
	$('#stoneRate').empty().append('<option value="" selected>--Select--</option>');

	postJSON('/OrderExecution/api/v1/getStoneCodeRate', JSON.stringify(fieldFilters), function(data) {
		if (data.resCode == 1) {
			var stoneDetails = data.payload;
			$.each(stoneDetails.rateList,function(k, v) {
				$('#stoneRate').append('<option value="' + v + '">' + v + '</option>');
		   });
		}
	});
});

$("#stoneSubCat").on('change',function() {
	var stoneSegName = $("#stoneSeg option:selected").attr('code');
	var stoneSuppBy = $("#stoneSuppBy").val();
	var subCatCode = $("#stoneSubCat option:selected").attr('code');
	var stoneMainCat = $("#stoneMainCat option:selected").attr('code');
	var fieldFilters = {
		"fieldFilters" : {
			"sSeg" : stoneSegName,
			"catCode" : stoneMainCat,
			"suppliedBy" : stoneSuppBy,
			"subCatCode" : subCatCode,
			"vId" : $("#vendorId").val()
		}
	};
	$('#stoneRate').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(fieldFilters), function(data) {
		var stoneDetails = data.payload.stoneDetails;
		$('#stoneArticleCode').val(stoneDetails.name);
		$('#stoneArticleId').val(stoneDetails.id);
		$("#uom").val(stoneDetails.value);
		$.each(stoneDetails.rateList, function(k, v) {
			$('#stoneRate').append('<option value="' + v + '">' + v + '</option>');
		});
	});
});

// ####################### On Change Function for Stone Rate ################################

$("#stoneRate").on('change', function() {
	$("#dplStonePcs").val();
	$("#dplStoneWt").val();
	$("#jwStonePcs").val();
	$("#jwStoneWt").val();
	$("#stonePrice").val();
	$("#jwPrice").val();
	
	 var uom = $("#uom").val();
	 if( uom == "Cts" || uom == "Gms"){
		 $("#jwStoneWt").val("");
		 $("#dplStoneWt").val("");
		 
	}
	if(uom == "Pcs"){
		 $("#jwStonePcs").val("");
		 $("#dplStonePcs").val("");
	}
});
 //###################################### supplied by company ##############################

 $("#dplStoneWt").on('change',function(){
		var uom = $("#uom").val();
		var stRate = $("#stoneRate").val();
		var stWt = $("#dplStoneWt").val();
		var cPrice;
			if(uom == "Cts" || uom == "Gms"){
				cPrice = parseFloat(stWt) * parseFloat(stRate); 
				var cp = cPrice.toFixed(2);
				$("#stonePrice").val(cp);
			}
	});
 
 $("#dplStonePcs").on('change',function(){
		var cPrice;
		var pcs= $("#dplStonePcs").val();
		var stRate= $("#stoneRate").val();
		var uom = $("#uomC").val();
		if(uom == "Pcs"){
			cPrice = pcs * parseFloat(stRate);
			var cp =  cPrice.toFixed(2);
			$("#stonePrice").val(cp);
		}
	});
 
//#################################### supplied by Vendor #############################
 
$("#jwStoneWt").on('change',function(){
	var uom = $("#uom").val();
	var stRate = $("#stoneRate").val();
	var stWt = $("#jwStoneWt").val();
	var cPrice;
		if(uom == "Cts" || uom == "Gms"){
			cPrice = parseFloat(stWt) * parseFloat(stRate); 
			var cp = cPrice.toFixed(2);
			$("#jwPrice").val(cp);
		}
});

$("#jwStonePcs").on('change',function(){
	var cPrice;
	var pcs= $("#jwStonePcs").val();
	var stRate= $("#stoneRate").val();
	var uom = $("#uom").val();
	if(uom == "Pcs"){
		cPrice = pcs * parseFloat(stRate);
		var cp =  cPrice.toFixed(2);
		$("#jwPrice").val(cp);
	}
});

// ######################################## Accessory POPUp Loading ############################

function compRateCal() {
	var comPcs = $("#compAccPcs").val();
	var compRate = $("#accRate").val();
	var price = compRate * comPcs;
	$("#compAccPrice").val(price);
}

function jwRateCal() {
	var jwPcs = $("#jwAccPcs").val();
	var jwRate = $("#accRate").val();
	var price = jwRate * jwPcs;
	$("#jwAccPrice").val(price);
}

$("#accRate").on('change',function(){
	jwRateCal();
});

$("#compAccWt").prop('disabled', false);
$("#accSupBy").on('change',function() {
		var accSupBy = $(this).val();
		if (accSupBy == "CO") {
			$("#jwAccPcsSection").hide();
			$("#jwAccWtSection").hide();
			$("#jwAccPriceSection").hide();
			$("#compAccWt").prop('disabled', false);
			$("#accConditionSection").hide();
			$("#compAccPcsSection").show();
			$("#compAccWtSection").show();
			$("#compAccPriceSection").show();
			
		}else if (accSupBy == "V") {
			$("#jwAccPcsSection").show();
			$("#jwAccWtSection").show();
			$("#jwAccPriceSection").show();
			$("#compAccWtSection").hide();
			$("#accConditionSection").hide();
			$("#compAccPcsSection").hide();
			$("#compAccWtSection").hide();
			$("#compAccPriceSection").hide();
			
		} else {
			$("#jwAccPcsSection").show();
			$("#jwAccWtSection").show();
			$("#jwAccPriceSection").show();
			$("#compAccWt").prop('disabled', false);
			$("#accConditionSection").hide();
			$("#compAccPcsSection").show();
			$("#compAccWtSection").show();
			$("#compAccPriceSection").show();
		}
		var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : accSupBy,
				"vId": $("#vendorId").val()
			}
		};
		$('#accMainCat').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getAccessoryCategories', JSON.stringify(fieldFilters), function(data) {
			var accCatsList = data.payload.accCats;
			$.each(accCatsList, function(k, v) {
				$('#accMainCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
		  });
	 });
});

$("#accMainCat").on('change',function() {
		var accMainCat = $(this).val();
		var accSupBy = $("#accSupBy").val();
		var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : accSupBy,
				"accMCatId" : accMainCat,
				"vId": $("#vendorId").val()
			}
		};
		$('#accSubCat').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getAccCatSubCategories', JSON.stringify(fieldFilters), function(data) {
			var accSubCatsList = data.payload.accSubCats;
			$.each(accSubCatsList, function(k, v) {
				$('#accSubCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
		 });
	 });
});

$("#accSubCat").on('change',function() {
		var accSubCat = $("#accSubCat option:selected").attr('code');
		var accMainCat = $("#accMainCat option:selected").attr('code');
		var accSupBy = $("#accSupBy").val();
		var fieldFilters = {
			"fieldFilters" : {
				"mCode" : $("#segmentId").val(),
				"catCode" : accMainCat,
				"subCatCode" : accSubCat,
				"suppliedBy" : accSupBy,
				"vId": $("#vendorId").val()
			}
		};
		$('#accArticleCode').empty().append('<option value="" selected>--Select--</option>');
		$('#accRate').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getAccCode', JSON.stringify(fieldFilters), function(data) {
			var accCodeList = data.payload.accCode;
			$('#accArticleCode').val(accCodeList.name);
			$('#accArticleId').val(accCodeList.id);
			$('#rateList').val(JSON.stringify(accCodeList.rateList));
			$.each(accCodeList.rateList, function(k, v) {
				$('#accRate').append('<option value="' + v + '">' + v + '</option>');
		  });
	 });
});

//Validation Accessory Modal Form
$('#addAccDetails').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"accSupBy" : {
			required : true
		},
		"accMainCat" : {
			required : true
		}
	},
	submitHandler : function(form) {
		var accArray = [];
		var rows = $("#jqxgridAcc").jqxGrid('getrows');
			if (typeof rows == "undefined") {
				var rowAcc = {
					"serialNumber" : 1,
					"uiSuppliedBy" : $("#accSupBy").val(),
					"uiSuppliedByE" : $("#accSupBy option:selected").text(),
					"categoryId" : $("#accMainCat").val(),
					"category" : $("#accMainCat option:selected").text(),
					"uiSubCategory" : $("#accSubCat").val(),
					"uiSubCategoryE" : $("#accSubCat option:selected").text(),
					"subCatId" : $("#accSubCat").val(),
					"accessoryDesc" : $("#accSubCat option:selected").text(),
					"uiCodeE" : $("#accArticleCode").val(),
					"uiCode" : $("#accArticleId").val(),
					"uom" : $("#uomAcc").val(),
					"rate" : $("#accRate").val(),
					"vendorPieces" : $("#jwAccPcs").val(),
					"vendorWeight" : $("#jwAccWt").val(),
					"vendorPrice" : $("#jwAccPrice").val(),
					"compWeight" : $("#compAccWt").val(),
					"compPrice" : $("#compAccPrice").val(),
					"compPieces" : $("#compAccPcs").val(),
					"uiCondition" : $("#accCondition").val(),
					"uiConditionE" : $("#accCondition option:selected").text(),
					"Flag":true,
					"newAccFlag" : true
				};
			} else {
				var rowscount = $("#jqxgridAcc").jqxGrid("getdatainformation").rowscount;
				var rowAcc = {
						
					"serialNumber" : rowscount + 1,
					"uiSubCategory" : $("#accSubCat").val(),
					"uiSubCategoryE" : $("#accSubCat option:selected").text(),
					"uiSuppliedBy" : $("#accSupBy").val(),
					"uiSuppliedByE" : $("#accSupBy option:selected").text(),
					"categoryId" : $("#accMainCat").val(),
					"category" : $("#accMainCat option:selected").text(),
					"subCatId" : $("#accSubCat").val(),
					"accessoryDesc" : $("#accSubCat option:selected").text(),
					"uiCodeE" : $("#accArticleCode").val(),
					"uiCode" : $("#accArticleId").val(),
					"uom" : $("#uomAcc").val(),
					"rate" : $("#accRate").val(),
					"vendorPieces" : $("#jwAccPcs").val(),
					"vendorWeight" : $("#jwAccWt").val(),
					"vendorPrice" : $("#jwAccPrice").val(),
					"compWeight" : $("#compAccWt").val(),
					"compPrice" : $("#compAccPrice").val(),
					"compPieces" : $("#compAccPcs").val(),
					"uiCondition" : $("#accCondition").val(),
					"uiConditionE" : $("#accCondition option:selected").text(),
					"Flag":true,
					"newAccFlag" : true
				  };
			for (i = 0; i < rows.length; i++) {
				accArray.push(rows[i]);
			}
		}
		accArray.push(rowAcc);
		AccDetails(accArray,AccId=null);
		$("#jqxgridAcc").show();
		$("#addAcc").modal('hide');
		return false;
	}
});
//Validation Stone Modal Form
$('#addStoneDetails').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"stoneSuppBy" : {
			required : true
		},
		"stoneSeg" : {
			required : true
		},
		"stoneMainCat" : {
			required : true
		},
		"stoneRate" : {
			required : true
		}
	},
	submitHandler : function(form) {
		var stoneArray = [];
		var rowsMaster = $("#jqxgridStone").jqxGrid('getrows');
		if (typeof rowsMaster == "undefined") {
			var rowStone = {
				"serialNumber" : 1,
				"uiSuppliedBy" : $("#stoneSuppBy").val(),
				"uiSuppliedByE" : $("#stoneSuppBy option:selected").text(),
				"stoneSeg" : $("#stoneSeg").val(),
				"sSeg" : $("#stoneSeg option:selected").attr('code'),
				"segment" : $("#stoneSeg option:selected").text(),
				"mainCategory" : $("#stoneMainCat option:selected").text(),
				"uiSubCategory" : $("#stoneSubCat").val(),
				"uiSubCategoryE" : $("#stoneSubCat option:selected").text(),
				"uiCode" : $("#stoneArticleId").val(),
				"uiCodeE" : $("#stoneArticleCode").val(),
				"stoneShape" : $("#stoneShape").val(),
				"stoneShapeName" : $("#stoneShape option:selected").text(),
				"uiClarityE" : $("#clarity").val(),
				"uiClarity" : $("#clarity").val(),
				"uiActualColorE" : $("#actualColor").val(),
				"uiActualColor" : $("#actualColor").val(),
				"uiColor" : $("#color").val(),
				"uiColorE" : $("#color").val(),
				"uiCutGradeE" : $("#cutGrade").val(),
				"uiCutGrade" : $("#cutGrade").val(),
				"uom" : $("#uom").val(),
				"uiWeightRangeE" : (($("#wtRange").val() == null || $("#wtRange").val() == "")?" ": $("#wtRange option:selected").text()),
				"uiWeightRange" : (($("#wtRange").val() == null || $("#wtRange").val() == "")?" ": $("#wtRange option:selected").text()),
				"rate" : $("#stoneRate").val(),
				"vendorPieces" : $("#jwStonePcs").val(),
				"vendorWeight" : $("#jwStoneWt").val(),
				"vendorPrice" : $("#jwPrice").val(),
				"compPieces" : $("#dplStonePcs").val(),
				"compWeight" : $("#dplStoneWt").val(),
				"compPrice" : $("#stonePrice").val(),
				"uiConditionE" : $("#stoneCondition option:selected").text(),
				"uiCondition" : $("#stoneCondition").val(),
				"subCategoryDesc" : $("#subCatDescriptionDesc").val(),
				"shape" : $("#subCatDescriptionDesc").val(),
				"currentOperation": 'add',
				"Flag":true,
				"newStoneFlag" :true
			};
		}else{
			var rowscount = $("#jqxgridStone").jqxGrid("getdatainformation").rowscount;
			var rowStone = {
				"serialNumber" : rowscount + 1,
				"uiSuppliedBy" : $("#stoneSuppBy").val(),
				"uiSuppliedByE" : $("#stoneSuppBy option:selected").text(),
				"stoneSeg" : $("#stoneSeg").val(),
			    "segment" : $("#stoneSeg option:selected").text(),
				"sSeg" : $("#stoneSeg option:selected").attr('code'),
				"mainCategory" : $("#stoneMainCat option:selected").text(),
				"uiSubCategory" : $("#stoneSubCat").val(),
				"uiSubCategoryE" : $("#stoneSubCat option:selected").text(),
				"uiCode" : $("#stoneArticleId").val(),
				"uiCodeE" : $("#stoneArticleCode").val(),
				"stoneShape" : $("#stoneShape").val(),
				"stoneShapeName" : $("#stoneShape option:selected").text(),
				"uiClarityE" : $("#clarity").val(),
				"uiClarity" : $("#clarity").val(),
				"uiActualColorE" : $("#actualColor").val(),
				"uiActualColor" : $("#actualColor").val(),
				"uiColor" : $("#color").val(),
				"uiColorE" : $("#color").val(),
				"uiCutGradeE" : $("#cutGrade").val(),
				"uiCutGrade" : $("#cutGrade").val(),
				"uom" : $("#uom").val(),
				"uiWeightRangeE" : (($("#wtRange").val() == null || $("#wtRange").val() == "")?" ": $("#wtRange option:selected").text()),
				"uiWeightRange" : (($("#wtRange").val() == null || $("#wtRange").val() == "")?" ": $("#wtRange option:selected").text()),
				"rate" : $("#stoneRate").val(),
				"vendorPieces" : $("#jwStonePcs").val(),
				"vendorWeight" : $("#jwStoneWt").val(),
				"vendorPrice" : $("#jwPrice").val(),
				"compPieces" : $("#dplStonePcs").val(),
				"compWeight" : $("#dplStoneWt").val(),
				"compPrice" : $("#stonePrice").val(),
				"uiConditionE" : $("#stoneCondition option:selected").text(),
				"uiCondition" : $("#stoneCondition").val(),
				"subCategoryDesc" : $("#subCatDescriptionDesc").val(),
				"shape" : $("#subCatDescriptionDesc").val(),
				"currentOperation": 'add',
				"Flag":true,
				"newStoneFlag" :true
			};
			for (i = 0; i < rowsMaster.length; i++) {
				stoneArray.push(rowsMaster[i]);
			}
		}
		stoneArray.push(rowStone);
		stoneDetails(stoneArray,stoneId=null);
		$("#jqxgridStone").show();
		$("#addStone").modal('hide');
		return false;
	}
});

var createStones = function() {
	var stoneHeader = {
		"stones" : []
	};
	var stoneArray= [];
	var stoneRows = $("#jqxgridStone").jqxGrid("getrows");
	if(typeof stoneRows != "undefined"){
		$.each(stoneRows,function(k,v){
			if(v.Flag === true){
				stoneArray.push(v);
			}
		});
	  stoneHeader.stones = stoneArray;
	  stoneHeader.serialNumber = $('#OrderSrlNo').val();
	  stoneHeader.orderNo = $('#orderNo').val();
   }
	return stoneHeader;
}

var createAcc = function() {
	var accHeader = {
		"accessories" : []
	};
	var acceryArr= [];
	var accRows = $("#jqxgridAcc").jqxGrid("getrows");
	if(typeof accRows != "undefined"){
		$.each(accRows,function(k,v){
			if(v.Flag === true){
				acceryArr.push(v);
			}
		})
   }
	  accHeader.accessories = acceryArr;
	  accHeader.serialNumber = $('#OrderSrlNo').val();
	  accHeader.orderNo = $('#orderNo').val();
	  return accHeader;
}

$("#save").on("click",function(){
	
	var StoneAcc = $("#stoneAccId").val();
	if(StoneAcc == "S"){
		var rows = $("#jqxgridStone").jqxGrid('getrows');
		if(typeof rows == "undefined" || rows.length == 0){
			$.growl.error({
				message : "Please add line items.",
				duration : 10000
			});
			return false;
		}
		postJSON('/OrderExecution/api/v1/addStones', JSON.stringify(createStones()), function(data) {
			if(1 == data.resCode){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				redirect();
			}else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
				return false
			}
		});
	}else{
		 if(StoneAcc == "A"){
			 var rows = $("#jqxgridAcc").jqxGrid('getrows');
				if(typeof rows == "undefined" || rows.length == 0){
					$.growl.error({
						message : "Please add line items.",
						duration : 10000
					});
					return false;
				}
			  postJSON('/OrderExecution/api/v1/addAccessories', JSON.stringify(createAcc()), function(data) {
				if(1 == data.resCode){
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					 redirect();
				}else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
					return false;
				}
			});
		}
	}
});

$("#clearAll").on("click",function(){
   redirect();
});

$('#addStone').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});

$('#addAcc').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});