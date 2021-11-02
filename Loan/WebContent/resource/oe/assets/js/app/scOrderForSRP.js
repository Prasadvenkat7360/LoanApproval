/*  ##	Author1         : 	Pooja Sangve(UI)
	##  Author [SERVER] :   Nageshwar Rao(JAVA)
	##	Date Creation 	: 	22-03-2018
	## 	Description		:	Stock And Consignment Order  (Create And Edit  -> For SSP And SRP )
*/
var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
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

//loadPermission();

// ################### for adding the metal Properties In Case of SRP #####################
var addMetalPropts  = function(){
	var globalVarible;
	$('#preRepairSP').empty().append('<option value="" selected>--Select--</option>');
	$('#metalWtType').empty().append('<option value="" selected>--Select--</option>');
	$('#preRpmetalColor').empty().append('<option value="" selected>--Select--</option>');
	var arrList = [];
	var metalColor = [];
	var equalflag = false;
	var MainGridRow = $("#jqxgridAcc").jqxGrid("getrows");
	var stockNoId = $("#stockNoId").val();
	
		$.each(MainGridRow,function(k,v){
			var stockId = $("#jqxgridAcc").jqxGrid("getcellvalue",k,"stockNumber");
			if((stockId !="undefined")&&(stockNoId == stockId)){
				$.growl.error({
					message : "Stock ID you Entered is Already In Use, Please Select the Different Stock ID !!",
					duration : 10000,
					title : 'Error'
				});
				equalflag = true
			 }else if((stockNoId == stockId)){
					$.growl.error({
						message : "Stock ID you Entered is Already In Use, Please Select the Different Stock ID!!",
						duration : 10000,
						title : 'Error'
					});
				equalflag = true
			 }
		});
		 if(equalflag == true){
			 return false;
		 }else{
				metalWeightType = {id: 'Absolute', name: 'Absolute'},{id: 'Range', name: 'Range'};
				$.getJSON('/OrderExecution/api/v1/getStockItemById?id='+stockNoId,function(data) {
						 if(data.resCode == 2){
								$.growl.error({
								message : data.mesgStr,
								duration : 10000,
								title : 'Error'
						   });
							return false;
					    }
					    var selectedrowindexMasterForSRP = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
						var rowsOrderKind = $('#jqxgridAcc').jqxGrid('getcellvalue',selectedrowindexMasterForSRP,"orderKind");
						if(rowsOrderKind == 'SSP'){}
						else if(rowsOrderKind == 'SRP'){
							gbleAttributeObj.push(data.payload.stockItem.attributes);
							var rows1 = $('#jqxgridAcc').jqxGrid('getrows');
							var segment = rows1[0].segmentN;
							if( typeof data.payload.stockItem != "undefined"){
								if(rows1.length > 1){
									if(segment == "Silver"){
										if(data.payload.stockItem.segId.description != "Silver"){
											$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindexMasterForSRP,'segmentN',null);
											$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindexMasterForSRP,'metalTypeN', null);
											$.growl.error({
												message : "Combination of this Segment is  not allowed,Please select different Stock No!!",
												duration : 10000,
												title : 'Error'
											});
											return false;
										}
									}else if(segment == "Diamond" || segment == "Gold" || segment == "Platinum"){
										if(data.payload.stockItem.segId.description == "Silver"){
											$("#jqxgridAcc").jqxGrid('setcellvalue',selectedrowindexMasterForSRP,'segmentN',null);
											$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindexMasterForSRP,'metalTypeN', null);
											$.growl.error({
												message : "Combination this Segment is  not allowed",
												duration : 10000,
												title : 'Error'
											});
											return false;
										}
									}
								}
							}
						}
					if(data.resCode == 1){
						globalVarible = data.payload.stockItem;
						if(globalVarible.orderItemSkinPurity != null){
							arrList.push(globalVarible.orderItemSkinPurity);
							$.each(arrList, function(k, v) {
								$('#preRepairSP').append('<option selected  value="' + v.skinPurity	+ '" code ="'+v.meltingPurity+'">' + v.skinPurity + '</option>');
							});
						}
						if(data.payload.stockItem.metalColor != null){
						metalColor.push(data.payload.stockItem.metalColor);
							$.each(metalColor, function(k, v) {
								$('#preRpmetalColor').append('<option selected value="' + v.id	+ '">' + v.name + '</option>');
							});
						}
					
						$("#preRepairNetWt").val((data.payload.stockItem.preRepairNetWeight != null)?data.payload.stockItem.preRepairNetWeight:"");
						$("#preRepairGrWt").val((data.payload.stockItem.preRepairGrossWeight != null)?data.payload.stockItem.preRepairGrossWeight:"");
						$("#preRepairNetWt1").val((data.payload.stockItem.finishedNetWeight != null)?data.payload.stockItem.finishedNetWeight:"");
						$("#preRepairGrWt1").val((data.payload.stockItem.finishedGrossWeight != null)?data.payload.stockItem.finishedGrossWeight:"");
						$("#preRepairMP").val((data.payload.stockItem.orderItemMeltingPurity != null)?data.payload.stockItem.orderItemMeltingPurity:"");
						
			}
		});
	}
		 
}

//############################################# edit functionality #################################

var editOrderDets = function(row, column, value) {
	var status = $("#jqxgrid").jqxGrid("getcellvalue",row,"orderStatus");
	if(status != "Closed"){
		return '<button class="btn btn-sm btn-primary" type="button"  id='
		+ row
		+ ' onclick="editDet('
		+ value
		+ ')" /><i class="fa fa-pencil fa-1"></i></button> <button class="btn btn-danger btn-sm"  type="button" id='
		+ row
		+ ' onclick="cancelSO('
		+ value
		+ ')" ><span class="fa fa-window-close"></span>Cancel</button>'
	}
	else{
		return '<button class="btn btn-sm btn-primary"  type="button" disabled><span class="fa fa-pencil fa-1"></span> </button> <button class="btn btn-danger btn-sm"  type="button"  disabled><span class="fa fa-window-close"></span>Cancel</button>';
	}
}
var gbleAttributeObj= [];
var orderEdit;
var editDet = function(row){
	var arrArr = [];
	var stoneArr = [];
	$("#goback").show();
	$("#saveSCOrder").hide();
	$("#saveSCOrderEdit").show();
	$("#orderTypeHide").show();
	$("#CustOrderDue").show();
	$("#headerScOrder").show();
	$("#searchScOrderSection").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$("#editHeader").show();
	$("#cretaeHeader").hide();
	$("#orderTypeHide").hide();
	$("#cancelHeader").hide();
	var designArr = [];
	$.getJSON('/OrderExecution/api/v1/getDesignOrder?id='+row,function(data){
		arrObj = data.payload.customerOrder.orderItems;
		
		$.each(data.payload.customerOrder.orderItems,function(k,v){
			if(v.orderItemStatus =="G"){
				$("#saveSCOrderEdit").prop("disabled",false);
			}else{
				$("#saveSCOrderEdit").prop("disabled",true);
			}
		});
		
		orderEdit = data.payload.customerOrder.orderNo;
		createStockConsignmentGrid(segId = 1,arrObj);
		$('#jqxgridAcc').show();
		$.each(data.payload.customerOrder.orderItems,function(k,v){
		   if(v.design != null){
			   designArr.push(v.design)
			   designMasterGrid(designArr,DesignId=null);
			   $("#designDetGrid").show();
		   }
		});
		$.each(data.payload.customerOrder.orderItems,function(k,v){
			$.each(v.stones,function(x,y){
				stoneArr.push(y);
			})
		});
		if(stoneArr.length != 0){
			stoneMasterGrid(stoneArr,stoneId=null);
			$("#stoneMasterGrid").show();
		}
		$.each(data.payload.customerOrder.orderItems,function(k,v){
			$.each(v.accessories,function(x,y){
				arrArr.push(y);
			})
		});
	    if(arrArr.length != 0){
			accMasterGrid(arrArr,accryId=null);
			$("#accMasterGrid").show();
		}
		
		var mpArray = [];
		var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
		var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
       
		$.each(data.payload.customerOrder.orderItems,function(k,v){
			
		var stockNoId = v.stockNumber;
		if(v.oKind.id=="SSP"){
			var preRepairGrWt = v.finishedGrossWeight;
			var preRepairNetWt = v.finishedNetWeight;
		}else {
			var preRepairGrWt = v.preRepairGrossWeight;
			var preRepairNetWt = v.preRepairNetWeight;
		}
		
		var metalWtType = v.metalWeightType.name;
		var preRpmetalColor = v.metalColor.id;
		if(typeof v.orderItemSkinPurity != "undefined"){
			var preRepairSP = v.orderItemSkinPurity.skinPurity;
		}
		var preRepairMP = v.orderItemSkinPurity.meltingPurity;
		
			var idVal = preRepairSP;
			var description = preRepairSP;
			
			if(rowsMaster[k].orderKind == "SRP"){
				var metalPropValues = "<b>Pre Repair Gr Wt :</b> "
						+ preRepairGrWt
						+ ", <b>Pre Repair Net Wt :</b> "
						+ preRepairNetWt 
						+ ", <b>Pre Repair Skin Purity  :</b> "
						+ preRepairSP
						+ ", <b>Pre Repair Melting Purity :</b> "
						+ preRepairMP;
				
				}else if( rowsMaster[k].orderKind == "SSP"){
					var metalPropValues = "<b>Finished Gr Wt :</b> "
						+ preRepairGrWt
						+ ", <b>Finished Net Wt :</b> "
						+ preRepairNetWt 
						+ ", <b>Pre Repair Skin Purity  :</b> "
						+ preRepairSP
						+ ", <b>Pre Repair Melting Purity :</b> "
						+ preRepairMP;
				}
			
			var mpValue = $("#metalPropDetSection").jqxGrid('getrows');
	
			if (typeof mpValue == "undefined") {
				var metalPropArr = {
					
					"artLinkSlNo" : rowsMaster[k].serialNo,
					"metalPropValues" : metalPropValues,
					"preRepairGrWt" : (typeof preRepairGrWt == "undefined") ? "" : preRepairGrWt,
					"preRepairNetWt" : (typeof preRepairNetWt == "undefined") ? "" : preRepairNetWt,
					"preRepairPcs" : (typeof preRepairPcs == "undefined") ? "" : preRepairPcs,
					"preRepairSP" : (typeof preRepairSP == "undefined") ? "" : preRepairSP,
					"preRepairMP" : (typeof preRepairMP == "undefined") ? "" : preRepairMP,
					"refStockNo" : (typeof refStockNo == "undefined") ? ""   : refStockNo,
					"sampDesc" : (typeof sampDesc == "undefined") ? ""       : sampDesc,
					"sampPur" : (typeof sampPur == "undefined") ? ""         : sampPur
				};
			} else {
				var metalPropArr = {
					"artLinkSlNo" : rowsMaster[k].serialNo,
					"metalPropValues" : metalPropValues,
					"preRepairGrWt" : (typeof preRepairGrWt == "undefined") ? ""  : preRepairGrWt,
					"preRepairNetWt" : (typeof preRepairNetWt == "undefined") ? "" : preRepairNetWt,
					"preRepairPcs" : (typeof preRepairPcs == "undefined") ? "" : preRepairPcs,
					"preRepairSP" : (typeof preRepairSP == "undefined") ? ""  : preRepairSP,
					"preRepairMP" : (typeof preRepairMP == "undefined") ? ""  : preRepairMP,
					"refStockNo" : (typeof refStockNo == "undefined") ? ""  : refStockNo,
					"sampDesc" : (typeof sampDesc == "undefined") ? "" : sampDesc,
					"sampPur" : (typeof sampPur == "undefined") ? ""  : sampPur
				};
			}
			if(rowsMaster[k].orderKind != "NO"){
				mpArray.push(metalPropArr);
				if (mpArray.length > 0) {
					metalPropGrid(mpArray,mType=null);
			    }
			}
		});
		var attributeArray = [];
		$.each(data.payload.customerOrder.orderItems,function(k,v){
		var arr1 = [];
		var newVal = "";
		var linkedAttrArr = [];
		var obj = {};
		if(v.attributes != null){
		gbleAttributeObj.push(v.attributes);
		console.log(v.attributes);
		var mAttributes = v.attributes;
		if (typeof mAttributes != "undefined") {
			$.each(mAttributes, function(key, value) {
					if(value != null){
						var labelObj = value.id;
						var attrName = value.name;
						var showtext = "<b> " + key + " </b> : " + attrName + " ";
						linkedAttrArr.push(showtext);
						var newArr = {
								"id" : key,
								"name" : attrName
							}
							obj[key] = newArr;
					 }
			   })
			 var rows = $("#attributeDetSection").jqxGrid('getrows');
			 var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
	   				var rowAttribute = {
	   					"artLinkSlNo" : k+1,
	   					"attributes" : linkedAttrArr.toString(),
	   					"attrdetval" : obj
	   				};
			    attributeArray.push((rowAttribute));
	    	  }
			}
		});
		console.log(gbleAttributeObj);
		attributeMasterGrid(attributeArray,attrId=null);
		$("#attributeDetSection").show();
	});
};

//################################## Update API Call ################################
$("#saveSCOrderEdit").on('click',function() {
		var orderItemArray = [];
		var metlRateArr = [];
	
		var rows = $("#jqxgridAcc").jqxGrid('getrows');
		var sysdate = moment().format('DD-MM-YYYY HH:mm:SS A');
	
		// Attribute Object Creation
		var masterRows = $("#jqxgridAcc").jqxGrid('getrows');
		var getAttrRows = $("#attributeDetSection").jqxGrid('getrows');
		var getDesignRows = $("#designDetGrid").jqxGrid('getrows');
		
		var stoneTempArr = $("#stoneMasterGrid").jqxGrid('getrows');
		$.each(stoneTempArr,function(k,v){
			getStoneRows.push(v);
		});
		
		accAccRowsTempArr = $("#accMasterGrid").jqxGrid('getrows');
		$.each(accAccRowsTempArr,function(k,v){
			accAccRows.push(v);
		});
		
		var metalPropDetSection = $("#metalPropDetSection").jqxGrid('getrows');
		if(typeof rows == "undefined" || rows.length == 0){
			$.growl.error({
				message : "Please add line items.",
				duration : 10000
			});
			return false;
		}
		
		if(typeof getAttrRows == "undefined" || getAttrRows.length == 0){
			$.growl.error({
				message : "Attribute details are mandatory.",
				duration : 10000
			});
			return false;
		}
		for (var m = 0; m < masterRows.length; m++) {
	    
			if(masterRows[m].stockId == null || masterRows[m].stockId == "" ){
			   var 	currentOperation = "add"
			}else{
				 var currentOperation = "modify"
			}
			var orderItems = {
				"attributes" : {},
				"design" : {},
				"stones" : [],
				"accessories" : [],
			}
			var orderMetalRates = {}
				if(masterRows[m].orderKind == "" || masterRows[m].orderKind == null){
					 $.growl.error({
							message : "Please select the Order Kind !!",
							duration : 10000,
							title : 'Error'
						});
					  return false;
				}
				if (masterRows[m].orderKind == "SSP"){
				  if(masterRows[m].linkedToSrNoN == "" || masterRows[m].linkedToSrNoN == null){
						  $.growl.error({
								message : "Please select the linked Serial No !!",
								duration : 10000,
								title : 'Error'
							});
						  return false;
					 }
				}
				if (masterRows[m].orderKind == "SSP"){
				    if (masterRows[m].segment == ""|| masterRows[m].segmentN == ""	|| masterRows[m].expWt == ""	|| masterRows[m].metalWtTypeN == ""
						|| masterRows[m].meltingPurity == ""|| masterRows[m].metalColN == ""
						|| masterRows[m].vendorCode == ""|| masterRows[m].labelName == ""|| masterRows[m].orderKind == ""
						|| masterRows[m].jewelType == "") {
						$.growl.error({
							message : "Please fill mandatory fields.",
							duration : 10000,
							title : 'Error'
						});
						return false;
				  }
			 }else if(masterRows[m].orderKind == "SRP" || masterRows[m].orderKind == "NO"){
				    if (masterRows[m].segment == ""|| masterRows[m].segmentN == ""	|| masterRows[m].expWt == ""|| masterRows[m].metalWtTypeN == ""
						|| masterRows[m].meltingPurity == ""|| masterRows[m].metalColN == ""
						|| masterRows[m].vendorCode == ""|| masterRows[m].labelName == ""|| masterRows[m].orderKind == ""||
						masterRows[m].storeId == ""|| masterRows[m].jewelType == "") {
								$.growl.error({
									message : "Please fill mandatory fields.",
									duration : 10000,
									title : 'Error'
								});
								return false;
							}
					  }
			
			if(masterRows[m].orderKind =='NO' || masterRows[m].orderKind == "SRP" || masterRows[m].orderKind == "SSP"){
				if(masterRows[m].dueDate == null || masterRows[m].dueDate == ""){
					$.growl.error({
						message : "Due Date is mandatory",
						duration : 10000
					});
					return false;
				}
			}
			
			if(masterRows[m].orderKind == 'SRP' || masterRows[m].orderKind == 'NO'){
			if(masterRows[m].metalWtTypeN == "Range"){
				if(masterRows[m].expWtTo <= 0 || masterRows[m].expWt <= 0){
					$.growl.error({
						message : "Range value should be greater than zero.",
						duration : 10000,
						title : 'Error'
					});
					return false;
					
				}else if(parseFloat(masterRows[m].expWtTo) <= parseFloat(masterRows[m].expWt)){
					$.growl.error({
						message : "To wt should be greater than from wt.",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}else{
				if( masterRows[m].expWt <= 0){
					$.growl.error({
						message : "Absolute value should be greater than zero.",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}
			}else{ }
			//$("#saveSCOrderEdit").prop('disabled', true);
			if (typeof getStoneRows != "undefined") {
				var stoneObjVal = {};
				$.each(getStoneRows, function(k, v) {
					if (masterRows[m].serialNo == v.artLinkSlNo) {
						var stoneObj = {
						    "id":v.id,
							"serialNumber":v.slNo,
							"condition" : v.stonCond,
							"suppliedBy" : {
								"id" : v.stoneSupBy,
								"name" : v.suppliedByName,
								"description" : null,
								"rateList" : null,
								"value" : null
							},
							"rate" : v.stoneRate,
							"compPieces" : v.compStonePcs,
							"compWeight" : v.compStoneWt,
							"compPrice" : v.stonePrice,
							"custPieces" : null,
							"custWeight" : null,
							"custPrice" : null,
							"vendorPieces" : v.jwStonePcs,
							"vendorWeight" : v.jwStoneWt,
							"vendorPrice" : v.jwPrice,
							"subCategoryDesc" : v.subCatDesc,
							"code" : {
								"id" : v.stoneArtCodeId,
								"name" : v.stoneArtCode,
								"description" : null,
								"rateList" : null,
								"value" : null
							},
							"subCategory" : {
								"id" : (v.stoneSubCat == null || v.stoneSubCat == "" || typeof v.stoneSubCat == "undefined") ? null : v.stoneSubCat,
								"name" : v.stoneSubCatName,
								"description" : v.stoneSubCatName,
								"rateList" : null,
								"value" : null
						     },
							"shape" : {
								"id" : (v.stoneShape == null || v.stoneShape == "" || typeof v.stoneShape == "undefined") ? null : v.stoneShape,
								"name" : v.stoneShapeCode,
								"description" : v.stoneShapeName,
								"rateList" : null,
								"value" : null
							},
							"clarity" : {
								"id" : (v.clarity == null || v.clarity == "" || typeof v.clarity == "undefined") ? null : v.clarity,
								"name" : null,
								"description" : null,
								"rateList" : null,
								"value" : null
							},
							"color" : {
								"id" : (v.color == null || v.color == "" || typeof v.color == "undefined") ? null :  v.color,
								"name" : null,
								"description" : null,
								"rateList" : null,
								"value" : null
							},
							"cutGrade" : {
								"id" : (v.cutGrade == null || v.cutGrade == "" || typeof v.cutGrade == "undefined") ? null : v.cutGrade,
								"name" : null,
								"description" : null,
								"rateList" : null,
								"value" : null
							},
							"uom" : (v.uom == null || v.uom == "" || typeof v.uom == "undefined") ? null : v.uom,
							"actualColor" : {
								"id" : (v.actualColor == null || v.actualColor == "" || typeof v.actualColor == "undefined") ? null :  v.actualColor,
								"name" : null,
								"description" : null,
								"rateList" : null,
								"value" : null
							},
							"weightRange" : {
								"id" : (v.wtRange == null || v.wtRange == "" || typeof v.wtRange == "undefined") ? null :  v.wtRange,
								"name" : null,
								"description" : null,
								"rateList" : null,
								"value" : null
							},
						  "currentOperation": v.currentOperation,
				          "stoneSegment": v.stoneSeg,
				          "stoneCategory": v.stoneMainCatName,
				          "fromWeightCost":v.fromWeightCost,
						  "toWeightCost":v.toWeightCost,
						  "newStoneFlag" :(typeof v.newStoneFlag == "undefined" || v.newStoneFlag == "" || v.newStoneFlag == null) ? null : v.newStoneFlag
						}
						orderItems['stones'].push(stoneObj);
					}
				})
			} else {
				orderItems['stones'] = null;
			}
	
			if (typeof accAccRows != "undefined") {
				$.each(accAccRows, function(k, v) {
					if (masterRows[m].serialNo == v.artLinkSlNo) {
						var accRow = {
							"id":v.id,
							"condition" : (v.accCondition != "")?v.accCondition:null,
							"rate" : (v.accRate != "")?v.accRate:null,
							"compPieces" : v.compAccPcs,
							"compWeight" : v.compAccWt,
							"compPrice" : v.compAccPrice,
							"custPieces" : null,
							"custWeight" : null,
							"custPrice" : null,
							"vendorPieces" : v.jwAccPcs,
							"vendorWeight" : v.jwAccWt,
							"vendorPrice" : v.jwAccPrice,
							"uom" : {
								"id" : v.uom,
								"name" : v.uom,
								"description" : null,
								"rateList" : null,
								"value" : null
							},
							"suppliedBy" : {
								"id" : v.accSupBy,
								"name" : v.accSupByName,
								"description" : null,
								"rateList" : null,
								"value" : null
							},
							 "mainCategory": {
						            "name": v.accMainCatName,
						          },
							"subCategory" : {
								"id" : v.accSubCat,
								"name" : v.accSubCatCode,
								"description" : v.accSubCatName,
								"rateList" : null,
								"value" : null
							},
							"code" : {
								"id" : v.accArticleId,
								"name" : v.accArtCode,
								"description" : null,
								"rateList" : [v.rateList],
								"value" : null
							},
							"currentOperation":v.currentOperation,
							"newAccFlag" :(typeof v.newAccFlag == "undefined" || v.newAccFlag == "" || v.newAccFlag == null) ? null : v.newAccFlag,
									
						}
						orderItems['accessories'].push(accRow);
					}
				})
			} else {
				orderItems['accessories'] = null;
			}
			
			if (typeof getDesignRows != "undefined") {
				for (var j = 0; j < getDesignRows.length; j++) {
					var dateFormat = (getDesignRows[j].dueDate);
					if (masterRows[m].serialNo == getDesignRows[j].artLinkSlNo) {
						var designItem = {
								"id":getDesignRows[j].id,
							"isEmpApprovalReqd" : getDesignRows[j].isEmpApprovalReqd,
							"isCustApprovalReqd" : getDesignRows[j].isCustApprovalReqd,
							"designStatus" : {
								"id" : getDesignRows[j].designStatusId,
								"name" : getDesignRows[j].designStatus,
								"description" : null,
								"rateList" : null,
								"value" : null
							},
							"designerType" : {
								"id" : getDesignRows[j].designerTypeId,
								"name" : getDesignRows[j].designerType
							},
							"designerName" : {
								"id" : getDesignRows[j].designerNameId,
								"name" : getDesignRows[j].designerName
							},
							"dueDate" : dateFormat,
							"numberOfVariations" : getDesignRows[j].numberOfVariations,
							"catalogueRefNumber" : getDesignRows[j].catalogueRefNumber,
							"designInstruction" : getDesignRows[j].designInstruction
						}
					 orderItems['design'] = designItem;
					}
				}
			} else {
				orderItems['design'] = null;
			}
			orderItems["id"] = masterRows[m].stockId;
			orderItems["serialNumber"] = masterRows[m].serialNo;
			
			if ($.isEmptyObject(orderItems.design) == true || orderItems.design == null) {
				orderItems["isDesignReqd"] = 0;
			} else {
				orderItems["isDesignReqd"] = 1;
			}
	
			if ($.isEmptyObject(orderItems.stones) == true
					|| orderItems.stones == null) {
				orderItems["isStoneReqd"] = 0;
			} else {
				orderItems["isStoneReqd"] = 1;
			}
	
			if ($.isEmptyObject(orderItems.accessories) == true
					|| orderItems.accessories == null) {
				orderItems["isAccessoryReqd"] = 0;
			} else {
				orderItems["isAccessoryReqd"] = 1;
			}
	
			orderItems["linkedTosln"] = {
				"id" : masterRows[m].linkedToSrNoN,
				"name" : masterRows[m].linkedToSrNo
			};
			orderItems["currentOperation"] = currentOperation;
			orderItems["stockNumber"] = masterRows[m].stockNumber;
			if (typeof metalPropDetSection != "undefined") {
				$.each(metalPropDetSection,function(k, v) {
				if (masterRows[m].serialNo == v.artLinkSlNo) {
					orderItems["preRepairMeltingPurity"] = v.preRepairMP;
					if(masterRows[m].orderKind == 'SRP') {
						orderItems["preRepairGrossWeight"] = v.preRepairGrWt;
						orderItems["preRepairNetWeight"] = v.preRepairNetWt;
					}else if(masterRows[m].orderKind == 'SSP') {
						orderItems["finishedGrossWeight"] = v.preRepairGrWt;
						orderItems["finishedNetWeight"] = v.preRepairNetWt;
					}
				} else {
					orderItems["preRepairMeltingPurity"] = null;
				}
		   });
			
	      $.each(metalPropDetSection,function(k, v) {
				if (masterRows[m].serialNo == v.artLinkSlNo) {
					if(masterRows[m].orderKind == 'SSP') {
						orderItems["orderItemDescription"] = v.sampDesc;
						orderItems["jobWorkerInstruction"] = v.sampPur;
					}
					
				} else {
					orderItems["orderItemDescription"] = null;
					orderItems["jobWorkerInstruction"] = null;
				}
			});
		}
		orderItems["oKind"] = {
			"id" : masterRows[m].orderKind,
			"name" : masterRows[m].orderKindN,
			"description" : null,
			"rateList" : null,
			"value" : null
		};
		
		orderItems["salesExecutive"] = {
				"id" : 19,
				"name" : "Murthy DCPL"
			};
		
		if (typeof getAttrRows != "undefined") {
			for (var i = 0; i < getAttrRows.length; i++) {
				if (masterRows[m].serialNo == getAttrRows[i].artLinkSlNo) {
					if(getAttrRows[i].attrdetval != null || getAttrRows[i].attrdetval != undefined){
					  orderItems['attributes'] = getAttrRows[i].attrdetval;
					}else{
					  orderItems['attributes'] = null;
					}
				} else {}
			}
		}
		
		if(masterRows[m].orderKind == 'NO' || masterRows[m].orderKind == 'SRP') {
			orderItems["orderItemDescription"] = null;
			orderItems["jobWorkerInstruction"] = masterRows[m].vendorInst;
		}
		
		orderItems["expectedPieces"] = masterRows[m].labelName;
		orderItems["isAdditionalWorkReqdType"] = 0;
		orderItems["dueDateType"] = {
			"id" : "General",
			"name" : "General"
		};
		orderItems["segId"] = {
			"id" : masterRows[m].segment,
			"description" : masterRows[m].segmentN
		};
		orderItems["metalId"] = {
			"id" : masterRows[m].segment
		};
		orderItems["orderItemMeltingPurity"] = masterRows[m].meltingPurity;
	
		orderItems["metalColor"] = {
			"id" : masterRows[m].metalCol,
			"name" : masterRows[m].metalColN
		};
		orderItems["articleMaster"] = {
			"id" : masterRows[m].articleIdMaster,
			"name" : masterRows[m].articleNameMaster,
			"description" : masterRows[m].articleDescMaster,
			"rateList" : null,
			"value" : "0"
		};
		orderItems["vendor"] = {
			"id" : masterRows[m].vendorCode,
			"name" : null,
			"description" : null,
			"rateList" : null,
			"value" : null
		};
		orderItems["jewelType"] = {
			"id" : masterRows[m].jewelType,
			"description" : masterRows[m].jewelTypeN
		};
		orderItems["subCategory"] = {
			"id" : masterRows[m].subCatId,
			"name" : masterRows[m].subCatCode,
			"description" : masterRows[m].subCatName,
			"rateList" : null,
			"value" : null
		};
		orderItems["orderItemDueDate"] = masterRows[m].dueDate;
		orderItems["metalWeightType"] = {
			"id" : masterRows[m].metalWtTypeN,
			"name" : masterRows[m].metalWtTypeN
		};
		orderItems["storeId"] = {
				"id" : masterRows[m].storeId
		};
		
		orderItems["expectedToWeight"] = masterRows[m].expWtTo;
		orderItems["expectedFromWeight"] = masterRows[m].expWt;
		
		orderItems["orderItemSkinPurity"] = {
			"id" : masterRows[m].smPurityId,
			"skinPurity" : masterRows[m].smPurityN,
			"meltingPurity" : masterRows[m].meltingPurity,
			"description" : masterRows[m].smPurityDesc
		};
		if(masterRows[m].orderKind == 'SRP' || masterRows[m].orderKind == 'SSP'){
			orderItems["vendorType"] = masterRows[m].vendorType;
			orderItems["mapDealerRate"] = masterRows[m].mapDealerRate;
		}
		orderMetalRates = {
		      "metalPurity": {
		        "id": masterRows[m].smPurityId,
		        "skinPurity": masterRows[m].smPurityN,
		        "meltingPurity": masterRows[m].meltingPurity,
		        "description": masterRows[m].smPurityDesc
		      },
		}
	    	metlRateArr.push(orderMetalRates);
			orderItemArray.push(orderItems);
	}

	var scOrderArr = {
		"isAdvancedPayment" : 0,
		"intimationReqd" : {
			"id" : "No"
		},
		"orderNo": orderEdit,
		"printNameInBill" : {
			"id" : "No"
		},
		"deliveryAddress" : {
			"id" : "No"
		},
		"intimationMode" : {
			"id" : "Postal"
		},
		"orderStatus" : "Generated",
		
		"orderDate" : sysdate,
		"orderSource" : "Store",
		"orderItems" : orderItemArray,
		"orderCreditAccountList" : [],
		 "orderMetalRates":metlRateArr,
	}
	console.log(JSON.stringify(scOrderArr));
	postJSON('/OrderExecution/api/v1/editDesignOrder', JSON.stringify(scOrderArr), function(data) {
		if (data.resCode == 1) {
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$(this).find('form').trigger('reset');
			scOrderSearchGrid();
			redirect();
			$("#jqxgrid").show();
			$("#CustOrderDue").show();
			$("#headerScOrder").hide();
			$("#goback").hide();
			$("#jqxgridAcc").hide();
			$("#designDetGrid").hide();
            $("#metalPropDetSection").hide();
			$("#attributeDetSection").hide();
			$("#stoneMasterGrid").hide();
			$("#accMasterGrid").hide();
			$("#searchScOrderSection").show();
		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
			$("#saveSCOrderEdit").prop('disabled', false);
			return false
		}
	});
});


//################################### Design Edit ###################################################

$("#saveDesignForm").show();
$("#updteDesign").hide();
var editDesignDet  = function(row){
	
	$("#saveDesignForm").hide();
	$("#updteDesign").show();
	$("#designDueDate").prop("disabled",true);
	
	var rowindex = $("#designDetGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#designDetGrid").jqxGrid('getrowid', rowindex);
	var row1 = $("#designDetGrid").jqxGrid('getrowdatabyid', rowid);
	
	populateDesignPopUp(row1['designerType'], row1['designerName'], row1['dueDate'],
			row1['numberOfVariations'],row1['catalogueRefNumber'], row1['designInstruction'],
			row1['designStatus'],row1['isEmpApprovalReqd'],row1['designMadeby'],row1['designStatusId'],row1['designerTypeId'],row1['designerNameId']);
};

var  populateDesignPopUp = function(designerType, designerName, dueDate, numberOfVariations, catalogueRefNumber,designInstruction,designStatus,isEmpApprovalReqd,designMadeby,designStatusId,designerTypeId,designerNameId) {

	var fullDate = new Date(dueDate);
	var dd = fullDate.getDate();
	var mm = fullDate.getMonth() + 1;
	var yy = fullDate.getFullYear();
	var fullDateS = dd + "/" + mm + "/" + yy; 
	$("#designDueDate").val(fullDateS);
	//$("#designDueDate").val(dueDate);
	$("#designStatusDate").val(currentDate);
	$("#designDueDate").datepicker({
		changeMonth : true,
		changeYear : true,
		minDate : today,
		dateFormat : "dd/mm/yy",
		maxDate : dueDate,
		onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); 
			$("#designStatusDate").datepicker('option', 'maxDate', min || '0'); 
		}
	});
	$("#designStatus").val(designStatus);
	if(designStatusId === "G"){
		$('input:radio[name="designTomade"][value='+0+']').prop('checked', true);
	}else if(designStatusId === "R"){
		$('input:radio[name="designTomade"][value='+1+']').prop('checked', true);
	}else if(designStatusId === "From Library"){
		$('input:radio[name="designTomade"][value='+2+']').prop('checked', true);
	}
	
	$('#designInstr').val(designInstruction);
	$('#noOfDesignReq').val(numberOfVariations);
	$('#scCatalogueNo').val(catalogueRefNumber);
	$('#designerName').append('<option selected value="' + designerNameId + '">' + designerName + '</option>');
	
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	$.each(rows,function(k,v){
	var segId = $("#jqxgridAcc").jqxGrid('getcellvalue',k,'segment');
	var metalId = $("#jqxgridAcc").jqxGrid('getcellvalue',k,'metalType');	
	$("#designIdShowHide").hide();
		var fieldFilters = {
			"fieldFilters" : {
				"segId" : segId,
				"metalId" : metalId
			}
		};
	postJSON('/OrderExecution/api/v1/getDesignDetails', JSON.stringify(fieldFilters), function(data) {
		$('#designBy').empty().append('<option value="" selected>--Select--</option>');
			var accSubCatsList = data.payload.dDetails.dStatus;
			var designByList = data.payload.dDetails.designBy;
			$("#designStatus").val(accSubCatsList.name);
			$("#designStatusId").val(accSubCatsList.id);
	
			$.each(designByList, function(k, v) {
				if (v.name == designerType) {
					$('#designBy').append('<option selected code="' + v.id + '" value="' + v.name+ '">' + v.name + '</option>');
				} else {
					$('#designBy').append('<option code="' + v.id + '" value="' + v.name + '">'+ v.name + '</option>');
				}
			});
		});
	});
	
	$('input:radio[name="designToApprov"][value='+isEmpApprovalReqd+']').prop('checked', true);
}
//############################ Updating of Deisgn Details #############################

$("#updteDesign").on("click",function(){
	var rowindex = $("#designDetGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#designDetGrid").jqxGrid('getrowid', rowindex);
	var row = $("#designDetGrid").jqxGrid('getrowdatabyid', rowid);
	
	if($("#designerName").val() == "" || $("#designBy").val() == "" || $("#noOfDesignReq").val() == "" || $("#designDueDate").val() == "") {		
		 $.growl.error({ message: "Fields are mandatory.", duration: 10000});
		 return false;
	}else{
		if($("#designBy").val() != "") {
			row['designerType'] = $("#designBy").val();
			row['designerTypeId'] = $("#designBy option:selected").attr('code');
		}
		if($("#designerName").val() != "") {
			row['designerName'] = $("#designerName option:selected").text();
			row['designerNameId'] = $("#designerName").val();
		}	
		
		/*if($("#designDueDate").val() != "") {
			var designDate = $("#designDueDate").val();
			row['dueDate'] = designDate;
		}*/
		
		if($("#designInstr").val() != "") {
			row['designInstruction'] = $("#designInstr").val();
		}
		
		if($("#noOfDesignReq").val() != "") {
			row['numberOfVariations'] = $("#noOfDesignReq").val();
		}
		
		if($("#designToApprov").val() != "") {
			row['isEmpApprovalReqd'] = $("input[name='designToApprov']:checked").val();
		}
		
		if($("#scCatalogueNo").val() != "") {
			row['catalogueRefNumber'] = $("#scCatalogueNo").val();
		}
		
		if($("#designStatus").val() != "") {
			row['designStatus'] = $("#designStatus").val();
			row['designStatusId'] = $("#designStatusId").val();
			row['designMadeby'] = $("input[name='designTomade']:checked").val();
		}
		
		$('#designDetGrid').jqxGrid('updaterow', rowid, row);
		$("#designDetGrid").jqxGrid('focus');
		 $('.modal').modal('hide');  
	 }
});



//##################################   Attribute Edit Started #########################################

var attrArray = [];
var addAttrDetS  = function(row){
	var rowindex = $("#attributeDetSection").jqxGrid('getselectedrowindex');
	var rowid = $("#attributeDetSection").jqxGrid('getrowid', rowindex);
	var rowDet = $("#attributeDetSection").jqxGrid('getrowdatabyid', rowid);
	
	$("#updateAttr").show();
	$("#saveAttribute").hide();
	
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	var segId = rows[row].segment;
	var jewelType = rows[row].jewelType;

	var fieldFilter = {
		"fieldFilters" : {
			"metalId" : segId,
			"mJewelId" : jewelType
		}
	};
	postJSON('/OrderExecution/api/v1/getMetalJewelTypeAttributesForST', JSON.stringify(fieldFilter), function(data) {
		var mAttributes = data.payload.mAttributes;
		if (typeof mAttributes != "undefined") {
			var newVal = "";
			$.each(mAttributes, function(key, value) {
				
				var label = key.split('|');
				newVal += '<div class="col-md-6"><span class="required">*</span>&nbsp;<label>' + label[0]
						+ '</label>';
				newVal += '<input type="hidden" value="' + label[0]
						+ '"><select id="' + label[0]
						+ '" class="form-control">';
				
				attrArray.push(label[0]);
				var rows = $("#attributeDetSection").jqxGrid('getrows');
				var i = $("#attributeDetSection").jqxGrid('selectedrowindexes');
				
				$.each(value, function(k, v) {
						if(gbleAttributeObj[i].length != null &&  label[0] =="length"){
							if(gbleAttributeObj[i].length.id == v.id){
								newVal += '<option selected id="' + gbleAttributeObj[i].length.id  + '" name="' + gbleAttributeObj[i].length.id
								+ '" value="' + gbleAttributeObj[i].length.id + '">' + gbleAttributeObj[i].length.id + '</option>';
							}else{
									newVal += '<option  id="' + v.id  + '" name="' + v.name
									+ '" value="' + v.id + '">' + v.name + '</option>';
								}
							}
						if(gbleAttributeObj[i].polishType != null &&  label[0] =="polishType"){
							if(gbleAttributeObj[i].polishType.name == v.name){
								newVal += '<option selected id="' + gbleAttributeObj[i].polishType.id  + '" name="' + gbleAttributeObj[i].polishType.name
								+ '" value="' + gbleAttributeObj[i].polishType.id + '">' + gbleAttributeObj[i].polishType.name + '</option>';
							}else{
								$("#attributeDetailVal").empty();
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
						
						if(gbleAttributeObj[i].screwType != null &&  label[0] =="screwType"){
							if(gbleAttributeObj[i].screwType.name == v.name){
								newVal += '<option selected id="' + gbleAttributeObj[i].screwType.id  + '" name="' + gbleAttributeObj[i].screwType.name
								+ '" value="' + gbleAttributeObj[i].screwType.id + '">' + gbleAttributeObj[i].screwType.name + '</option>';
							}else{
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
						
						if(gbleAttributeObj[i].size != null &&  label[0] =="size"){
							if(gbleAttributeObj[i].size.id == v.id){
								newVal += '<option selected id="' + gbleAttributeObj[i].size.id  + '" name="' + gbleAttributeObj[i].size.name
								+ '" value="' + gbleAttributeObj[i].size.id + '">' + gbleAttributeObj[i].size.name + '</option>';
							}else{
								$("#attributeDetailVal").empty();
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
						
						if(gbleAttributeObj[i].settingType != null &&  label[0] =="settingType"){
							if(gbleAttributeObj[i].settingType.name == v.name){
								newVal += '<option selected id="' + gbleAttributeObj[i].settingType.id  + '" name="' + gbleAttributeObj[i].settingType.name
								+ '" value="' + gbleAttributeObj[i].settingType.id + '">' + gbleAttributeObj[i].settingType.name + '</option>';
							}else{
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
						
						if(gbleAttributeObj[i].loopType != null &&  label[0] =="loopType"){
							if(gbleAttributeObj[i].loopType.name == v.name){
								newVal += '<option selected id="' + gbleAttributeObj[i].loopType.id  + '" name="' + gbleAttributeObj[i].loopType.name
								+ '" value="' + gbleAttributeObj[i].loopType.id + '">' + gbleAttributeObj[i].loopType.name + '</option>';
							}else{
								$("#attributeDetailVal").empty();
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
						
						if(gbleAttributeObj[i].hookType != null &&  label[0] =="hookType"){
							if(gbleAttributeObj[i].hookType.name == v.name){
								newVal += '<option selected id="' + gbleAttributeObj[i].hookType.id  + '" name="' + gbleAttributeObj[i].hookType.name
								+ '" value="' + gbleAttributeObj[i].hookType.id + '">' + gbleAttributeObj[i].hookType.name + '</option>';
							}else{
								$("#attributeDetailVal").empty();
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
						
						if(gbleAttributeObj[i].height != null &&  label[0] =="length"){
							if(gbleAttributeObj[i].height.id == v.id){
								newVal += '<option selected id="' + gbleAttributeObj[i].height.id  + '" name="' + gbleAttributeObj[i].height.name
								+ '" value="' + gbleAttributeObj[i].height.id + '">' + gbleAttributeObj[i].height.name + '</option>';
							}else{
								$("#attributeDetailVal").empty();
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
						
						if(gbleAttributeObj[i].diameter != null &&  label[0] =="diameter"){
							if(gbleAttributeObj[i].diameter.name == v.name){
								newVal += '<option selected id="' + gbleAttributeObj[i].diameter.id  + '" name="' + gbleAttributeObj[i].diameter.name
								+ '" value="' + gbleAttributeObj[i].diameter.id + '">' + gbleAttributeObj[i].diameter.name + '</option>';
							}else{
								$("#attributeDetailVal").empty();
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
						
						if((gbleAttributeObj[i].combination != null &&  label[0] =="combination")|| label[0] =="combination"){
							
							if(gbleAttributeObj[i].combination != null && gbleAttributeObj[i].combination.name == v.name){
								newVal += '<option selected id="' + gbleAttributeObj[i].combination.id  + '" name="' + gbleAttributeObj[i].combination.name
								+ '" value="' + gbleAttributeObj[i].combination.id + '">' + gbleAttributeObj[i].combination.name + '</option>';
							}else{
								$("#attributeDetailVal").empty();
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
						
						if((gbleAttributeObj[i].collectionName != null &&  label[0] =="collectionName")|| label[0] =="collectionName"){
							if(gbleAttributeObj[i].collectionName != null && gbleAttributeObj[i].collectionName.name == v.name){
								newVal += '<option selected id="' + gbleAttributeObj[i].collectionName.id  + '" name="' + gbleAttributeObj[i].collectionName.name
								+ '" value="' + gbleAttributeObj[i].collectionName.id + '">' + gbleAttributeObj[i].collectionName.name + '</option>';
							}else{
								$("#attributeDetailVal").empty();
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
						
						if(gbleAttributeObj[i].width != null &&  label[0] =="width"){
							if(gbleAttributeObj[i].width.name == v.name){
								newVal += '<option selected id="' + gbleAttributeObj[i].width.id  + '" name="' + gbleAttributeObj[i].width.name
								+ '" value="' + gbleAttributeObj[i].width.id + '">' + gbleAttributeObj[i].width.name + '</option>';
							}else{
								$("#attributeDetailVal").empty();
								newVal += '<option  id="' + v.id  + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
							}
						}
				});
				newVal += '</select></div>';
			});
			$("#attributeDetailVal").append(newVal);
		  }
	});
};

$("#updateAttr").on("click",function(){
	var rowindex = $("#attributeDetSection").jqxGrid('getselectedrowindex');
	var rowid = $("#attributeDetSection").jqxGrid('getrowid', rowindex);
	var row = $("#attributeDetSection").jqxGrid('getrowdatabyid', rowid);
	
	    var attrValue;
		$.each(attrArray,function(k,v){
			 attrValue = $("#"+v).val();
		});
		
		if(attrValue == "" || attrValue == null){
			$.growl.error({
				message :"Please fill all the manadatory field!!" ,
				duration : 10000,
				title : 'Error'
			});
		     return false;
		}
	
	var attributeArray = [];
	var linkedAttrArr = [];
	var obj = {};
	
    $.each($('#attrDetailsForm select option:selected'),function(key, value) {
	$.each($('#attrDetailsForm input'), function(k,v) {
			if (key == k) {
				var labelObj = $(value).attr("id");
				var attrName = $(value).text();
				var attrValue = value.value;
				var label = (v.value);
				var showtext = "<b> " + label + " </b> : " + attrName + " ";
				linkedAttrArr.push(showtext);
				var newArr = {
						"id" : label ,
						"name" : attrName
					}
				obj[label] = newArr;
			}
		});
	});
    var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
	row['attributes'] = linkedAttrArr.toString(),
	row['attrdetval'] = obj
	
	$('#attributeDetSection').jqxGrid('updaterow', rowid, row);
	$("#attributeDetSection").jqxGrid('focus');
	$('.modal').modal('hide');  
});

$("#saveStoneForm").show();
$("#updateS").hide();

var editStoneDetE  = function(row){
	
	$("#saveStoneForm").hide();
	$("#updateS").show();
	var rowindex = $("#stoneMasterGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#stoneMasterGrid").jqxGrid('getrowid', rowindex);
	var row1 = $("#stoneMasterGrid").jqxGrid('getrowdatabyid', rowid);
	
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	var OrderItemrows = $("#jqxgridAcc").jqxGrid('getrows');
	var vendorCode = OrderItemrows[selectedrowindex].vendorCode;
	var jewelType = OrderItemrows[selectedrowindex].jewelType;
	var data = $('#jqxgridAcc').jqxGrid('getrowdata',selectedrowindex);
	
	$('#stoneSuppBy').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneSeg').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneMainCat').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneRate').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneShape').empty().append('<option value="" selected>--Select--</option>');
	$('#wtRange').empty().append('<option value="" selected>--Select--</option>');
	$('#clarity').empty().append('<option value="" selected>--Select--</option>');
	$('#color').empty().append('<option value="" selected>--Select--</option>');
	$('#cutGrade').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneSubCat').empty().append('<option value="" selected>--Select--</option>');
	$('#actualColor').empty().append('<option value="" selected>--Select--</option>');
	
	$("#stoneArticleId").val(row1.stoneArtCodeId);
	$("#stoneArticleCode").val(row1.stoneArtCode);
	$('#uom').val(row1.uom);
	$('#subCatDescriptionDesc').val(row1.subCatDesc);
	if($('#stoneSuppBy').val()=="V"){
		$("#jwStonePcs").val(row1.jwStonePcs);
		$("#jwStoneWt").val(row1.jwStoneWt);
		$("#jwPrice").val(row1.jwPrice); 
	}else if($('#stoneSuppBy').val()=="CO"){
		$("#dplStonePcs").val(row1.compStonePcs);
		$("#dplStoneWt").val(row1.compStoneWt);
		$("#stonePrice").val(row1.stonePrice);
	}else{
		$("#dplStonePcs").val(row1.compStonePcs);
		$("#dplStoneWt").val(row1.compStoneWt);
		$("#stonePrice").val(row1.stonePrice);
		$("#jwStonePcs").val(row1.jwStonePcs);
		$("#jwStoneWt").val(row1.jwStoneWt);
		$("#jwPrice").val(row1.jwPrice); 
	}
	$.getJSON('/OrderExecution/api/v1/getStoneHeadersForSC ', function(data) {
		var stoneSupByList = data.payload.suppliedBy;
		$.each(stoneSupByList,function(k, v) {
				if (v.id != "CU") {
					if(row1.stoneSupBy == v.id){
					    $('#stoneSuppBy').append('<option selected value="' + v.id + '">' + v.name + '</option>');
					}else{
						$('#stoneSuppBy').append('<option  value="' + v.id + '">' + v.name + '</option>');
					}
				}
		  });
	});
	var fieldFilters1 = {
			"fieldFilters" : {
				"suppliedBy" : row1.stoneSupBy,
				"mCode" : data.segmentN
			}
		};
	
   	postJSON('/OrderExecution/api/v1/getStoneSegments', JSON.stringify(fieldFilters1), function(data) {
		var stoneSegList = data.payload.stoneSeg;
		$.each(stoneSegList, function(k, v) {
				if(row1.stoneSeg == v.id){
					$('#stoneSeg').append('<option selected code="' + v.code + '" value="'+ v.id + '">' + v.description + '</option>');
				}else{
				  $('#stoneSeg').append('<option code="' + v.code + '" value="'+ v.id + '">' + v.description + '</option>');
				}
		  });
	 });
   	
	  var fieldFilters2 = {
			"fieldFilters" : {
				"suppliedBy" : row1.stoneSupBy,
				"sSegId" : row1.stoneSeg,
				"sSeg" : row1.stoneSegCode,
				"vId" : vendorCode
			}
		};
	  
		$('#stoneMainCat').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneCategories', JSON.stringify(fieldFilters2), function(data) {
			var mainCatListList = data.payload.mainCatList;
			$.each(mainCatListList, function(k, v) {
				if(row1.stoneMainCat == v.id){
					$('#stoneMainCat').append('<option selected code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				}else{
					$('#stoneMainCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				}
			});
		});
		
		if(row1.stoneSegCode == "PS" || row1.stoneSegCode == "OS"){
		var fieldFilters3 = {
				"fieldFilters" : {
					"suppliedBy" : row1.stoneSupBy,
					"catId" : row1.stoneMainCat,
					"vId" : vendorCode,
				    "sSegId": row1.stoneSeg,
				    "sSeg": row1.stoneSegCode
				}
			};
			postJSON('/OrderExecution/api/v1/getStoneSubCategories', JSON.stringify(fieldFilters3), function(data) {
				var subCatList = data.payload.subCatList;
				$.each(subCatList, function(k, v) {
					if(row1.stoneSubCat == v.id){
						$('#stoneSubCat').append('<option selected code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
					}else{
						$('#stoneSubCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
					}
				});
			});
		}else{
			var fieldFiltersSub = {
						"fieldFilters" : {
							"suppliedBy" : row1.stoneSupBy,
							 "sSegId": row1.stoneSeg,
							 "sSeg": row1.stoneSegCode,
							 "catId" : row1.stoneMainCat,
							 "vId" : vendorCode
						}
					}
				$('#stoneShape').empty().append('<option value="" selected>--Select--</option>');
				postJSON('/OrderExecution/api/v1/getShapes', JSON.stringify(fieldFiltersSub), function(data) {
					var subCatList = data.payload.subCatList;
					$.each(subCatList, function(k, v) {
						if(row1.stoneShapeCode == v.name){
							$('#stoneShape').append('<option selected code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');	
						}else{
						    $('#stoneShape').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
						}
					});
				});
		     } 
			 if(row1.stoneSegCode == "PS" || row1.stoneSegCode == "OS"){
			  var fieldFilters4 = {
					"fieldFilters" : {
						"sSeg" : row1.stoneSegCode,
						"catCode" : row1.stoneMainCatCode,
						"suppliedBy" : row1.stoneSupBy,
						"subCatCode" : row1.stoneSubCatCode,
						"vId" : vendorCode
					}
				};
				postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(fieldFilters4), function(data) {
					var stoneDetails = data.payload.stoneDetails;
					$('#stoneArticleCode').val(stoneDetails.name);
					$('#stoneArticleId').val(stoneDetails.id);
					$("#uom").val(stoneDetails.value);
					$.each(stoneDetails.rateList, function(k, v) {
						if(row1.stoneRate == v){
							$('#stoneRate').append('<option selected value="' + v + '">' + v + '</option>');
						}else{
							$('#stoneRate').append('<option  value="' + v + '">' + v + '</option>');
						}
					});
				});
			}else{
				var fieldFilters5 = {
						"fieldFilters" : {
							"sSeg" : row1.stoneSegCode,
							"catCode" : row1.stoneMainCatCode,
							"suppliedBy" : row1.stoneSupBy,
							"shapeCode" : row1.stoneShapeCode,
							"vId" : vendorCode
						}
					};
				postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(fieldFilters5), function(data) {
					var weightSlabList = data.payload.weightSlab;
					var clarityList = data.payload.clarity;
					var colorList = data.payload.color;
					var cutGradeList = data.payload.cutGrade;
					var actualColor = data.payload.actualColor;

					$.each(weightSlabList, function(k, v) {
						if(row1.wtRange == v.id){
							$('#wtRange').append('<option selected code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
						}else{
							$('#wtRange').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
						}
					});

					$.each(clarityList, function(key, val) {
						if(row1.clarity == val.id){
							$('#clarity').append('<option selected code="' + val.id + '" value="' + val.id+ '">' + val.id + '</option>');
						}else{
							$('#clarity').append('<option code="' + val.id + '" value="' + val.id+ '">' + val.id + '</option>');
						}
					});

					$.each(colorList, function(ke, va) {
						if(row1.color == va.id){
							$('#color').append('<option selected code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
						}else{
							$('#color').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
						}
					});
                    
					$.each(cutGradeList, function(ke, va) {
						if(row1.cutGrade == va.id){
							$('#cutGrade').append('<option selected code="' + va.id + '" value="' + va.id+ '">' + va.id + '</option>');
						}else{
							$('#cutGrade').append('<option code="' + va.id + '" value="' + va.id+ '">' + va.id + '</option>');
						}
					});

					$.each(actualColor, function(ke, va) {
						if(row1.actualColor == va.id){
							$('#actualColor').append('<option selected code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
						}else{
							$('#actualColor').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
						}
					});
					
					$('#uom').val(data.payload.uom);
					if($('#uom').val() == "Cts" || $('#uom').val() == "Gms"){
						$("#hideShowCompWt").show();
					}
					$('#stoneIdVal').val(data.payload.stoneDetails.id);
					$('#stoneArticleCode').val(data.payload.stoneDetails.name);
					$('#stoneArticleId').val(data.payload.stoneDetails.id);
				});
				var stoneId = $("#stoneIdVal").val();
				var uom = $("#uom").val();
				if(row1.stoneSegCode == "DI"){
				var stoneMainCat = $("#stoneMainCat option:selected").attr("code");
						if(row1.stoneMainCatCode == "CM" || row1.stoneMainCatCode == "CS" || row1.stoneMainCatCode == "CP"){
						var fieldFiltersRate = {
								"fieldFilters" : {
									"suppliedBy" : row1.stoneSupBy,
									"stoneId" : stoneId,
									"clarity" : row1.clarity,
									"color" : row1.color,
									"cutGrade" : row1.cutGrade,
									"weightSlab" : row1.wtRange,
									"uom" : uom,
									"actualColor": $("#actualColor").val()
								}
							};
						}else{
							var fieldFiltersRate = {
									"fieldFilters" : {
										"suppliedBy" : row1.stoneSupBy,
										"stoneId" : stoneId,
										"clarity" : row1.clarity,
										"color" : row1.color,
										"cutGrade" : row1.cutGrade,
										"weightSlab" : row1.wtRange,
									}
								};
						}
				   }
					postJSON('/OrderExecution/api/v1/getStoneCodeRate', JSON.stringify(fieldFiltersRate), function(data) {
						if (data.resCode == 1) {
						var stoneDetails = data.payload;
						$.each(stoneDetails.rateList,function(k, v) {
							if(row1.stoneRate == v){
								$('#stoneRate').append('<option selected value="' + v + '">' + v + '</option>');
							}else{
							    $('#stoneRate').append('<option value="' + v + '">' + v + '</option>');
					       }
				    });
			     }
		   });
	   }
	if(row1.suppliedByCode == "V"){
		$("#jwStonePcsSection").show();
		$("#jwStoneWtSection").show();
		$("#jwPriceSection").show();
		$("#dplStonePcsSection").hide();
		$("#dplStoneWtSection").hide();
		$("#stonePriceSection").hide();
	}else if(row1.suppliedByCode == "CO"){
		$("#jwStonePcsSection").hide();
		$("#jwStoneWtSection").hide();
		$("#jwPriceSection").hide();
		$("#dplStonePcsSection").show();
		$("#dplStoneWtSection").show();
		$("#stonePriceSection").show();
	}else if(row1.suppliedByCode == "COV"){
		$("#jwStonePcsSection").show();
		$("#jwStoneWtSection").show();
		$("#jwPriceSection").show();
		$("#dplStonePcsSection").show();
		$("#dplStoneWtSection").show();
		$("#stonePriceSection").show();
	}
	if(row1.stoneSegCode == "DI"){
		$("#actualColorSection").hide();
		$("#stoneSubCatSection").hide();
		$("#stoneShapeSection").show();
		$("#wtRangeSection").show();
		$("#claritySection").show();
		$("#colorSection").show();
		$("#cutGradeSection").show();
		if(row1.stoneMainCatCode == "CM" || row1.stoneMainCatCode == "CP" || row1.stoneMainCatCodea == "CS"){
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
};

//######################### updating Stone Details ########################
$("#updateS").on("click",function(){
	
	var rowindex = $("#stoneMasterGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#stoneMasterGrid").jqxGrid('getrowid', rowindex);
	var row = $("#stoneMasterGrid").jqxGrid('getrowdatabyid', rowid);
		if($("#stoneSeg").val() == "" || $("#stoneMainCat").val() == "" || $("#stoneArticleCode").val() == "" || $("#stoneRate").val() == "") {		
			 $.growl.error({ message: "Fields are mandatory.", duration: 10000});
			 return false;
		}
		var flagValidate = validateStoneModel();
		if(flagValidate == true){
		if($("#stoneSuppBy").val() != "") {
			row['stoneSupBy'] = $("#stoneSuppBy").val();
			row['suppliedByName'] = $("#stoneSuppBy option:selected").text();
			row['suppliedByCode'] = $("#stoneSuppBy option:selected").attr("code");
		}
		if($("#stoneSeg").val() != "") {
			row['stoneSegName'] = $("#stoneSeg option:selected").text();
			row['stoneSeg'] = $("#stoneSeg").val();
			row['stoneSegCode'] = $("#stoneSeg option:selected").attr("code");
		}	
		if($('#stoneMainCat').val() != ""){
			row['stoneMainCatName'] = $("#stoneMainCat option:selected").text();
			row['stoneMainCat'] = $("#stoneMainCat").val();
			row['stoneMainCatCode'] = $("#stoneMainCat option:selected").attr("code");
		}
		if($("#stoneArticleCode").val() != "") {
			row['stoneArtCode'] = $("#stoneArticleCode").val();
			row['stoneArtCodeId'] = $("#stoneArticleId").val();
		}
		if($("#uom").val() != "") {
			row['uom'] = $("#uom").val();
		}	
		if($("#stoneRate").val() != "") {
			row['stoneRate'] = $("#stoneRate").val();
		}	
		
		if ($("#stoneSuppBy").val() == "V") {
			if($("#jwStonePcs").val() != "") {
				row['jwStonePcs'] = $("#jwStonePcs").val();
			}	
			if($("#jwPrice").val() != "") {
				row['jwPrice'] = $("#jwPrice").val();
			}	
			if($("#jwStoneWt").val() != "") {
				row['jwStoneWt'] = $("#jwStoneWt").val();
			}	
			row['dplStonePcs'] = "";
			row['dplStoneWt'] =  "";
			row['stonePrice'] = "";
			
		}else if($("#stoneSuppBy").val() == "CO"){
			
			row['jwStonePcs'] = "";
			row['jwPrice'] =  "";
			row['jwStoneWt'] = "";
			
			if($("#dplStonePcs").val() != "") {
				row['compStonePcs'] = $("#dplStonePcs").val();
			}	
			if($("#dplStoneWt").val() != "") {
				row['compStoneWt'] = $("#dplStoneWt").val();
			}	
			if($("#stonePrice").val() != "") {
				row['stonePrice'] = $("#stonePrice").val();
			}	
		}else{
			if($("#dplStonePcs").val() != "") {
				row['compStonePcs'] = $("#dplStonePcs").val();
			}	
			if($("#dplStoneWt").val() != "") {
				row['compStoneWt'] = $("#dplStoneWt").val();
			}	
			if($("#stonePrice").val() != "") {
				row['stonePrice'] = $("#stonePrice").val();
			}
			if($("#jwStonePcs").val() != "") {
				row['jwStonePcs'] = $("#jwStonePcs").val();
			}	
			if($("#jwPrice").val() != "") {
				row['jwPrice'] = $("#jwPrice").val();
			}	
			if($("#jwStoneWt").val() != "") {
				row['jwStoneWt'] = $("#jwStoneWt").val();
			}	
		}
		
		if($("#stoneSeg option:selected").attr("code") == "DI"){
			if($("#stoneShape").val() != "") {
				row['stoneShape'] = $("#stoneShape").val();
				row['stoneShapeName'] = $("#stoneShape option:selected").text();
				row['stoneShapeCode'] = $("#stoneShape option:selected").attr("code");
			}
			if($("#wtRange").val() != "") {
				row['wtRange'] = $("#wtRange").val();
			}
			if($("#clarity").val() != "") {
				row['clarity'] = $("#clarity").val();
			}
			if($("#color").val() != "") {
				row['color'] = $("#color").val();
			}
			if($("#cutGrade").val() != "") {
				row['cutGrade'] = $("#cutGrade").val();
			}
			var stoneMainCat =  $("#stoneMainCat option:selected").attr('code');
			if(stoneMainCat == "CM" || stoneMainCat == "CP" || stoneMainCat == "CS"){
				if($("#actualColor").val() != "") {
					row['actualColor'] = $("#actualColor").val();
				}
			}else{
				row['actualColor'] = "";
			}
			row['stoneSubCat'] = "";
			row['stoneSubCatName'] = "";
			row['stoneSubCatCode'] = "";
			
		}else{
			row['wtRange'] = "";
			row['clarity'] = "";
			row['color'] = "";
			row['cutGrade'] = "";
			row['actualColor'] = "";
			row['stoneShape'] = "";
			row['stoneShapeName'] =  "";
			row['stoneShapeCode'] = "";
			
			if($("#stoneSubCat").val() != "") {
				row['stoneSubCat'] = $("#stoneSubCat").val();
				row['stoneSubCatName'] = $("#stoneSubCat option:selected").text();
				row['stoneSubCatCode'] = $("#stoneSubCat option:selected").attr("code");
			}
		}
		if($("#subCatDescriptionDesc").val() != "") {
			row['subCatDesc'] = $("#subCatDescriptionDesc").val();
		}
		$('#stoneMasterGrid').jqxGrid('updaterow', rowid, row);
		$("#stoneMasterGrid").jqxGrid('focus');
		 $('.modal').modal('hide');  
	 }
});

$("#saveAccDet").show();
$("#updateAcc").hide();

var editAccDetE  = function(row){
	$("#saveAccDet").hide();
	$("#updateAcc").show();
	var rowindex = $("#accMasterGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#accMasterGrid").jqxGrid('getrowid', rowindex);
	var row1 = $("#accMasterGrid").jqxGrid('getrowdatabyid', rowid);
	
	$('#accSupBy').empty().append('<option value="" selected>--Select--</option>');
	$('#accMainCat').empty().append('<option value="" selected>--Select--</option>');
	$('#accSubCat').empty().append('<option value="" selected>--Select--</option>');
	$('#accRate').empty().append('<option value="" selected>--Select--</option>');
	
	$("#accArticleCode").val(row1.accArtCode);
	$("#accArticleId").val(row1.accArticleId);
	$('#uomAcc').val(row1.uom);
	$.getJSON('/OrderExecution/api/v1/getAccessoryHeaders ', function(data) {
		var accSupByList = data.payload.suppliedBy;
		$.each(accSupByList,function(k, v) {
			if (v.id != "CU") {
				if(row1.accSupBy == v.id){
					$('#accSupBy').append('<option selected value="' + v.id + '">' + v.name + '</option>');
				}else{
					$('#accSupBy').append('<option  value="' + v.id + '">' + v.name + '</option>');
				}
			}
	   });
	});
	var rowSMain = $("#jqxgridAcc").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
    var vendorCode = rowSMain[selectedrowindex].vendorCode;
	var fieldFilters = {
		"fieldFilters" : {
			"suppliedBy" : row1.accSupBy,
			"vId":vendorCode
		}
	};
	$('#accMainCat').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/getAccessoryCategories', JSON.stringify(fieldFilters), function(data) {
		var accCatsList = data.payload.accCats;
		$.each(accCatsList, function(k, v) {
			if(row1.accMainCat == v.id){
			    $('#accMainCat').append('<option selected code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
			}else{
				$('#accMainCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
			}
		});
	});
	var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : row1.accSupBy,
				"accMCatId" : row1.accMainCat,
				"vId":vendorCode
			}
		};
		$('#accSubCat').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getAccCatSubCategories', JSON.stringify(fieldFilters), function(data) {
			var accSubCatsList = data.payload.accSubCats;
			$.each(accSubCatsList, function(k, v) {
				if(row1.accSubCat == v.id){
					$('#accSubCat').append('<option selected code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				}else{
				    $('#accSubCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				}
			});
		});
		var fieldFilters = {
				"fieldFilters" : {
					"mCode" : "AC",
					"catCode" : row1.accMainCatCode,
					"subCatCode" : row1.accSubCatCode,
					"suppliedBy" : row1.accSupBy,
					"vId":vendorCode
				}
			};
			$('#accArticleCode').empty().append('<option value="" selected>--Select--</option>');
			$('#accRate').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getAccCode', JSON.stringify(fieldFilters), function(data) {
				var accCodeList = data.payload.accCode;
				$('#accArticleCode').val(accCodeList.name);
				$('#accArticleId').val(accCodeList.id);
				//$('#uomAcc').val(accCodeList.description);
				$('#rateList').val(JSON.stringify(accCodeList.rateList));
				$.each(accCodeList.rateList, function(k, v) {
					if(row1.accRate == v){
						$('#accRate').append('<option selected value="' + v + '">' + v + '</option>');
					}else{
						$('#accRate').append('<option value="' + v + '">' + v + '</option>');
					}
				});
			});
	
	if($('#accSupBy').val()=="V"){
		$("#jwAccPcs").val(row1.jwAccPcs);
		$("#jwAccWt").val(row1.jwAccWt);
		$("#jwAccPrice").val(row1.jwAccPrice); 
	}else if($('#accSupBy').val()=="CO"){
		$("#compAccPcs").val(row1.compAccPcs);
		$("#compAccWt").val(row1.compAccWt);
		$("#compAccPrice").val(row1.compAccPrice);
	}else{
		$("#compAccPcs").val(row1.compAccPcs);
		$("#compAccWt").val(row1.compAccWt);
		$("#compAccPrice").val(row1.compAccPrice);
		$("#jwAccPcs").val(row1.jwAccPcs);
		$("#jwAccWt").val(row1.jwAccWt);
		$("#jwAccPrice").val(row1.jwAccPrice); 
	}
};

$("#updateAcc").on("click",function(){
	
	var rowindex = $("#accMasterGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#accMasterGrid").jqxGrid('getrowid', rowindex);
	var row = $("#accMasterGrid").jqxGrid('getrowdatabyid', rowid);
	
	if($("#accSupBy").val() == "" || $("#accMainCat").val() == "" || $("#accSubCat").val() == "" || $("#accArticleCode").val() == ""
	  || $("#uomAcc").val() == ""|| $("#uomAcc").val() == ""|| $("#accArticleId").val() == ""){		
		 $.growl.error({ message: "Fields are mandatory.", duration: 10000});
		 return false;
	}
	var validateFlag = validateAccModel();
	if( validateFlag == true){
		if($("#accSupBy").val() != "") {
			row['accSupBy'] = $("#accSupBy").val();
			row['accSupByName'] = $("#accSupBy option:selected").text();
		}
		if($("#accMainCat").val() != "") {
			row['accMainCatName'] = $("#accMainCat option:selected").text();
			row['accMainCat'] = $("#accMainCat").val();
		}	
		if($("#accSubCat").val() != "") {
			row['accSubCatName'] = $("#accSubCat option:selected").text();
			row['accSubCat'] = $("#accSubCat").val();
		}	
		if($("#accArticleCode").val() != "") {
			row['accArtCode'] = $("#accArticleCode").val();
			row['accArticleId'] = $("#accArticleId").val();
		}	
		if($("#uomAcc").val() != "") {
			row['uom'] = $("#uomAcc").val();
		}	
		if($("#accRate").val() != "") {
			row['accRate'] = $("#accRate").val();
		}	
		if($("#jwAccPcs").val() != "") {
			row['jwAccPcs'] = $("#jwAccPcs").val();
		}	
		if($("#jwAccPrice").val() != "") {
			row['jwAccPrice'] = $("#jwAccPrice").val();
		}	
		if($("#jwAccWt").val() != "") {
			row['jwAccWt'] = $("#jwAccWt").val();
		}	
		if($("#compAccPcs").val() != "") {
			row['compAccPcs'] = $("#compAccPcs").val();
		}	
		if($("#compAccWt").val() != "") {
			row['compAccWt'] = $("#compAccWt").val();
		}	
		if($("#compAccPrice").val() != "") {
			row['compAccPrice'] = $("#compAccPrice").val();
		}	
		$('#accMasterGrid').jqxGrid('updaterow', rowid, row);
		$("#accMasterGrid").jqxGrid('focus');
		 $('.modal').modal('hide');  
	 }
})