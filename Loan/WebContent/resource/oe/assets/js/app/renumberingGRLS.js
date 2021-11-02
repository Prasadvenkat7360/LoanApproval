/** CREATED BY UI : DIPANKAR
 *  DEVELOPER : RAVI
 *  DESC : Renumbering GR Loose Stone with difference reference type
 */

$("#searchGrFgForm").show();
$("#createGrFgForm").hide();
$("#create").show();
$("#back").hide();

var redirect = function() {
	window.location.href = "javascript:showContentPage('renumberingGRLS', 'bodySwitcher')";
	return window.location.href;
}

//Date From
$("#fromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDate").datepicker('option', 'minDate', min || '0');
    }
});

//Date To
$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

// Search Data Field and Coloumn
var datafields =
	[
		{ name: 'srlNo', type: 'int'},
	    { name: 'vendorCode',	type: 'string'},
	    { name: 'segment',  type: 'int', map : 'segmentCode'},
	    { name: 'mainCategory', type: 'string', map : 'categoryDesc'},
        { name: 'clarity', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'actualColor', type: 'string'},
        { name: 'cutGrade', type: 'string'},
        { name: 'weightRange', type: 'string', map : 'stoneWeightRange'},
        { name: 'costRange', type: 'string'},
        { name: 'subCategoryDesc', type: 'string', map: 'subCatDescp'},
        { name: 'stoneCode', type: 'string'},
        { name: 'noOfPcs', type: 'int', map: 'pieces'},
        { name: 'diamondCertId', type: 'int', map: 'dimondCertificateId'},
        { name: 'stoneCostRate', type: 'float'},
        { name: 'stoneSellingRate', type: 'float'},
        { name: 'stoneValue', type: 'float'},
        { name: 'stoneSellingPrice', type: 'float'},
        { name: 'storeOrDc', type: 'string'},
        { name: 'store', type: 'string', map : 'storeN'},
        { name: 'zone', type: 'string', map : 'zoneN'},
        { name: 'stoneWeight', type: 'float'},

    ];

var columns =
	[
	   // { text: 'Srl.', datafield: 'srlNo', width: "3%", cellsalign : 'left', align:'center',sortable : false, hidden : false, editable: false, sorting: false, cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},
        { text: 'Vendor Code', datafield: 'vendorCode', width: "4%", cellsalign : 'center', align:'center', sortable : false, hidden : false, editable: false, sorting: false},
        { text: 'Segment', datafield: 'segment', width: "4%", cellsalign : 'center',sortable : false,  align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Main Category', datafield: 'mainCategory', width: "7%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Clarity', datafield: 'clarity', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Color', datafield: 'color', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Actual Color', datafield: 'actualColor', width: "4%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Cut Grade', datafield: 'cutGrade', width: "4%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Wt. Range', datafield: 'weightRange', width: "4%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Cost Range', datafield: 'costRange', width: "4%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Shape/Sub Cat', datafield: 'subCategoryDesc', width: "8%", cellsalign : 'left',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Stone Code', datafield: 'stoneCode', width: "4%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'No. Of Pcs', datafield: 'noOfPcs', width: "4%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Stone Weight', datafield: 'stoneWeight', width: "5%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d3'},
        { text: 'Diamond Cert. ID', datafield: 'diamondCertId', width: "5%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Stone Cost Rate', datafield: 'stoneCostRate', width: "7%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d2'},
        { text: 'Stone Selling Rate', datafield: 'stoneSellingRate', width: "7%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d2'},
        { text: 'Stone Value', datafield: 'stoneValue', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d2'},
        { text: 'Stone Selling Price', datafield: 'stoneSellingPrice', width: "7%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d2'},
        { text: 'Store/DC', datafield: 'storeOrDc', width: "5%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Store', datafield: 'store', width: "6%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Zone', datafield: 'zone', width: "6%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false}
    ];

var searchFieldFilter = function(){
	fieldFilters = {"fieldFilters" : {}};
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var segment = $('#segmentS').val();
	var category = $('#categoryS').val();
	var refType = $('#refTypeS').val();
	var refNo = $('#refSlNoS').val();
	var igrNo = $('#igrNoS').val();
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segmentId"] = segment;
	}
	
	if (category != "" && category != null) {
		fieldFilters.fieldFilters["categoryId"] = category;
	}
	
	if (refType != "" && refType != null) {
		fieldFilters.fieldFilters["docType"] = refType;
	}
	
	if (refNo != "" && refNo != null) {
		fieldFilters.fieldFilters["docNo"] = refNo;
	}
	
	if (igrNo != "" && igrNo != null) {
		fieldFilters.fieldFilters["lsrenumgrNo"] = igrNo;
	}
	return fieldFilters;
}

// Renumbering GR LS Search Grid.
var searchRenumberingGRLS = function(gridName, datafields,columns){
var updateRows = function(rowid, newdata, commit) {	commit(); };
	
	showMyGrid(datafields,"/OrderExecution/api/v1/looseStoneRenumGrSearch", "list", columns, searchFieldFilter(), updateRows, "");
	
	$(gridName).jqxGrid({	
		width : '100%',
        columnsheight: 60,
        columnsresize: true,  
		rowsheight : 20,
		theme: 'energyblue',
		autorowheight : true,
		groupable: true,
		rowdetails : true,
		editable: false
	});
	
}

$("#search").on('click', function(){
	$("#jqxgridCreate").hide();
	$("#create").show();
	$("#back").hide();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	if((fromDate == null || fromDate == "") || (toDate == null || toDate == "")){
		$.growl.error({ message: "Please select From & To Date.", duration: 10000, title: 'Error in Saving IGR' });
		return false;
	}
	var gridDiamondQuery = "#jqxgrid";	    	
	searchRenumberingGRLS(gridDiamondQuery,datafields,columns); 
	$("#jqxgrid").show();
});

//Create Section Data Filed and Coloumns.

var diamondCertViewData = function(row){
	
}

//View daily stock check details for a particular row
var diamondCertView = function(row, column, value){
	return '<div class="text-center"><button class="btn btn-sm btn-primary"  type="button"data-toggle="modal" data-target="#certDetails" onclick="diamondCertViewData('+ row +');"/><span class="fa fa-eye"></span> </button></div>';
}





var catDropdown = function(row, value, editor){
	editor.on('click', function(){
		var segId = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'segmentId');
		$.getJSON('/OrderExecution/api/v1/getMainCategories?segId='+segId, function(data) {	
			editor.jqxDropDownList({
				source : data.payload.mainCategories,
				displayMember : 'description',
				valueMember : 'id'
			});
		});
	});
}

var clarityDropdown = function(row, value, editor){
	editor.on('click', function(){
		editor.jqxDropDownList({
			source : clarityArr,
			displayMember : 'name',
			valueMember : 'name'
		});
	});
}

var colorDropdown = function(row, value, editor){
	editor.on('click', function(){
		var allColors = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'allColors');
		editor.jqxDropDownList({
			source : colorArr,
			displayMember : 'name',
			valueMember : 'name'
		});
	});
}

var actualColorDropdown = function(row, value, editor){
	editor.on('click', function(){
		var allActualColors = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'allActualColors');
		editor.jqxDropDownList({
			source : actualColorArr,
			displayMember : 'name',
			valueMember : 'name'
		});
	});
}

var cutGradeDropdown = function(row, value, editor){
	editor.on('click', function(){
		var allCutGrades = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'allCutGrades');
		editor.jqxDropDownList({
			source : cutGradeArr,
			displayMember : 'name',
			valueMember : 'name'
		});
	});
}

var dataFieldEditable = function(row, datafield, columntype){
	var stoneWeightRanges = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneWeightRanges');
	var segmentName = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'segmentName');
	if(datafield == "stoneWtRange" && stoneWeightRanges.length > 0 && segmentName == "Diamond"){
		return true;
	}else if(datafield == "categoryId"){
		return true;
	}else if(datafield == "SubCatId"){
		if(subCatArr.length == 0){
			return false;
		}else{
			return true;
		}
		
	}else if(datafield == "costRange"){
		if(costRangeArr.length == 0){
			return false;
		}else{
			return true;
		}
	}else if(datafield == "clarity"){
		if(clarityArr.length == 0){
			return false;
		}
	}else if(datafield == "color"){
		if(colorArr.length == 0){
			return false;
		}
	}else if(datafield == "actualColor"){
		if(actualColorArr.length == 0){
			return false;
		}
	}else if(datafield == "cutGrade"){
		if(cutGradeArr.length == 0){
			return false;
		}
	}else if(datafield == "shapeId"){
		if(shapeArr.length == 0){
			return false;
		}
	}
	else{
		return false;
	}
}



var generaterow = function(grSlNo,data){
	console.log(data);
	var row = {};	
	var stoneCostRate = 0.00;
	if($("#refType").val() == "PB"){
		if(data.uom == "Cts"){
			stoneCostRate = data.stoneValue/data.stoneWeight;
		}else{
			stoneCostRate = data.stoneValue/data.pieces;
		}
	}else{
		stoneCostRate = data.stoneCostRate;
	}
	//var subCategoryDesc = data.segmentName + " " + data.categoryDesc + " " + data.subCatDesc + " " + data.clarity + " " + data.color + " " + data.cutGrade + " " + data.stoneWtRange;
	row['srlNo'] = grSlNo;
	row['segmentId'] = data.segmentId;	
	row["segmentName"] = data.segmentName;
	row["categoryId"] = data.categoryId;
	row["categoryDesc"] = data.categoryDesc;
	row["claritys"] = data.clarity;
	row["clarity"] = data.clarity;
	row["colors"] = data.color;
	row["color"] = data.color;
	row["packetOrStock"] = data.packetOrStock;
	row["packetId"] = data.packetId;
	row["hsnId"] = data.hsnId;
	row["stoneId"] = data.stoneId;
	row["actualColors"] = data.actualColor;
	row["actualColor"] = data.actualColor;
	row["cutGrades"] = data.cutGrade;
	row["cutGrade"] = data.cutGrade;
	row["stoneWtRange"] = data.stoneWtRange;
	row["weightRanges"] = (data.segmentCode == "DI") ? data.stoneWtRange : null,
	row["stoneWeightRanges"] = data.stoneWeightRanges;
	row["costRange"] = data.costRange;
	row["costRanges"] = data.costRange;
	row["SubCatId"] = data.SubCatId;
	row["subCatDesc"] = data.subCatDescp;
	row["stoneCode"] = data.stoneCode;
	row["pieces"] = data.pieces;
	
	row["actualStoneWeight"] = data.stoneWeight;
	row["dimondCertificateId"] = data.dimondCertificateId;
	row["stoneCostRate"] = stoneCostRate;
	row["stoneCostPrice"] = (data.stoneWeight * data.stoneCostRate);
	row["stoneSellingRate"] = data.stoneSellingRate;
	row["stoneValue"] = data.stoneValue;
	row["stoneSellingPrice"] = (data.stoneWeight * data.stoneSellingRate);
	row["storeOrDC"] = data.storeOrDc;
	row["store"] = data.store;
	row["zone"] = data.zone;
	row["certficateDetails"] = data.listDimondCertificateId;
	row["refType"] = $("#refType").val();
	row["refDocNo"] = parseInt($("#refNo").val());
	row["refDocSrlNo"] = parseInt($("#refSlNo").val());
	row["vendorId"] = parseInt($("#vendorCode").val());
	row["uom"] = (data.uom == null) ? "Cts" : data.uom;
	row["stoneWeight"] = data.stoneWeight;
	row["ConsignmentOrDealer"] = data.ConsignmentOrDealer;
	row["subCatDescp"] = data.subCatDescp;
	return row;
}
// Load data thru API call.
var loadData = function(){
	var data = [];	
	var gridNameParcel = "#jqxgridCreate";	
	var headerTitleParcel = "Renumbering GR LS - Create";	
	var refType = $('#refType').val();
	var refNo = $('#refNo').val();
	var refSlNo = $('#refSlNo').val();
	var vendorCode = $('#vendorCode').val();
	var rows = $("#jqxgridCreate").jqxGrid('getrows');
	console.log(rows);
	if(typeof rows == "undefined" || rows == null){
		var rowID = 1;
	}else{
		var rowID = rows.length + 1;
	}
	$.getJSON('/OrderExecution/api/v1/looseStoneRenumberGrDetails?refType='+refType+'&&refDocNo='+refNo+'&&refSiNO='+refSlNo+'&&venderId='+vendorCode, function(data) {
		if(data.resCode == 1){
		var onLoadData = data.payload.renumGrStoneAccDetails;
			$.each(onLoadData, function(k,v){			
				$("#jqxgridCreate").jqxGrid('addrow', null, generaterow(rowID,v));							
			});
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving IGR' });
			return false;
		}
	});		
	
}

var subCatArr = [];
var clarityArr = [];
var colorArr = [];
var actualColorArr = [];
var cutGradeArr = [];
var shapeArr = [];

var onChangeMainCategory = function(row, datafield, columntype, oldvalue, newvalue, event){
	$("#jqxgridCreate").jqxGrid('setcellvalue', row, "categoryId",newvalue.value);	
	if(newvalue.label != "CD Melees" || newvalue.label != "CD Pointers" || newvalue.label != "CD Solitaire"){
		actualColorArr = [];
		$("#jqxgridCreate").jqxGrid('setcellvalue', row, "actualColor",null);	
		$("#jqxgridCreate").jqxGrid('setcellvalue', row, "actualColors",null);	
	}
	$("#jqxgridCreate").jqxGrid('setcellvalue', row, "shapeId",null);	
	$("#jqxgridCreate").jqxGrid('setcellvalue', row, "shapeName",null);	
	
	$.getJSON('/OrderExecution/api/v1/looseStoneRenumberGrLOV?CatId=' + newvalue.value, function(data) {
		console.log(data);
		if(data.resCode == 1){
			subCatArr =[];
			clarityArr = [];
			colorArr =[];
			$.each(data.payload.allSubCategories,function(k,v){
				subCatArr.push(v);
			});
			$.each(data.payload.allClaritys, function(k,v){
				clarityArr.push(v);
			});
			
			$.each(data.payload.allColors, function(k,v){
				colorArr.push(v);
			});
			
			$.each(data.payload.allActualColors, function(k,v){
				actualColorArr.push(v);
			});
			
			$.each(data.payload.allCutGrades, function(k,v){
				cutGradeArr.push(v);
			});
			
			$.each(data.payload.allShapes, function(k,v){
				shapeArr.push(v);
			});
			
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving IGR' });
			return false;
		}
	});
	var segmentId = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'segmentId');
	$.getJSON('/OrderExecution/api/v1/getStoneStanderdRateAndsubCategories?segId='+segmentId+'&catId=' + newvalue.value, function(data) {
		if(data.resCode == "1"){	
			$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneStanderdRate", data.payload.stoneStanderdRate);	
		
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving IGR' });
			return false;
		}
	});
	var refType = $("#refType").val();
	if(refType == "SM"){
		var refDocNo = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'refDocNo');
		$.getJSON('/OrderExecution/api/v1/getStoneMovementCostRate?segId='+segmentId+'&catId=' + newvalue.value+'&refDocNo='+refDocNo, function(data) {
			if(data.resCode =="1"){
				var stoneWeight = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneWeight');
				var uom = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'uom');
				var pieces = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'pieces');
				
				
				
				if(data.payload.stoneMovementCostRate != null || data.payload.stoneMovementCostRate != " "){
					$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneCostRate",data.payload.stoneMovementCostRate);
					
					$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneValue",data.payload.stoneMovementCostRate * stoneWeight);
					
					if(uom == "Cts"){
						$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneCostPrice",data.payload.stoneMovementCostRate * stoneWeight);
					}else{
						$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneCostPrice",data.payload.stoneMovementCostRate * pieces);
					}
				}
			}else{
				$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneCostRate", null);
				
				$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneValue", null);
				
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	}else{
		var stoneCost = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneCostRate');
		var stoneWt = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneWeight');
		
		$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneValue", stoneCost * stoneWt );
		
	}
}

var costRangeArr = [];
var stoneCodePkt ;
var stoneCodePktStk = "";
var onchnageSubCategory = function(row, datafield, columntype, oldvalue, newvalue, event){
	console.log(newvalue);
	var categoryId = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'categoryId');
	var segmentId = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'segmentId');
	
	var catName = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'categoryDesc');
	var cut = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'cutGrade');
	var color = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'color');
	var clarity = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'clarity');
	var wtRange = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneWtRange');
	var costRange = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'costRange');
	var actualColor = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'actualColor');
	var segmentName = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'segmentName');
	var cutgrade = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'cutGrade');
	var shape = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'shapeId');
	var shapeSubCatId = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'SubCatId');
	
	var params;
	
	params = {"fieldFilters" : {
		"catId":categoryId,
		"segmentId" :segmentId,
		"subCatId":(segmentName == "Diamond") ? null : newvalue.value,
		"shapeId" :(segmentName == "Diamond")  ? newvalue.value : null,
		"cut" : cut,
		"color" : color, 
		"clarity" : clarity,
		"wtRange": wtRange,
		"actualColor" : actualColor
	}};
	
	stoneCodeParams = { "fieldFilters" : {
		"catId":categoryId,
		"segmentId" :segmentId,
		"subCatId":(segmentName == "Diamond") ? null : newvalue.value,
		"shapeId" :(segmentName == "Diamond")  ? newvalue.value : null,
	}};
	
	if(segmentName == "Diamond"){
		var subcatDescp = segmentName + " " + catName + " " + newvalue.label + " " + clarity + " " + color + " " + cutgrade + " " + wtRange ;
		$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'subCatDescp', subcatDescp);
	}else{
		$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'subCatDescp', newvalue.label);
	}
	
	postJSON('/OrderExecution/api/v1/getCostRangeAndSellingRates', JSON.stringify(params), function(data){
		if(data.resCode == "1"){	
			costRangeArr = [];
			$("#save").prop('disabled',false);
			$.each(data.payload.allCostRangesAndAllSellingRates, function(k,v){
				var obj = {"id" : v.slab, "name" : v.slab, "sellingRate" : v.sellingRate};
				costRangeArr.push(obj);
			});
			
			var stoneWeight =  $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneWeight');
			console.log(newvalue);
			$.each(costRangeArr,function(k,v){
				if(v.id == costRange){
					$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'stoneSellingRate', v.sellingRate);
					$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'stoneSellingPrice', (stoneWeight * v.sellingRate));
				}
			})
		}else{
			$("#save").prop('disabled',true);
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			return false;
		}
	});
	
	postJSON('/OrderExecution/api/v1/getStoneCode', JSON.stringify(stoneCodeParams), function(data){
		if(data.resCode == "1"){	
			$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'stoneCode', data.payload.stoneCode);
			$("#save").prop('disabled',false);
			$.getJSON('/OrderExecution/api/v1/getStoreOrPacket?stoneCode='+data.payload.stoneCode, function(data) {
				if(data.resCode == "1"){
					$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'packetOrStock', data.payload.storeOrPacket.packetStock);
					$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'stoneId', data.payload.storeOrPacket.id);
					$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'hsnId', data.payload.storeOrPacket.hsnMaster.id);
				}
			});
		}else{
			$("#save").prop('disabled',true);
			$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'stoneCode',null);
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			return false;
		}
	});
	

}

var subCatDropDown = function(row, cellvalue, editor){
	editor.on('click', function(){
		console.log(subCatArr);
		editor.jqxDropDownList({
			source : subCatArr, displayMember : 'description', valueMember : 'id'
		});
	});
}

var loadSubCatDescp = function(row, datafield, columntype, oldvalue, newvalue, event){
	$("#jqxgridCreate").jqxGrid('setcellvalue', row, "shapeId",null);	
	$("#jqxgridCreate").jqxGrid('setcellvalue', row, "shapeName",null);
}
var shapeDropDown = function(row, cellvalue, editor){
	editor.on('click', function(){
		editor.jqxDropDownList({
			source : shapeArr,
			displayMember : 'name',
			valueMember : 'id'
		});
	});
}


var storeDcArr = [
	{"id" : "Store", "name" : "Store"},
	{"id" : "DC", "name" : "DC"}
];


var storeDCSource = {datatype : 'json',datafields : [{name : 'id',type : 'string'}, {name : 'name',type : 'string'}], localdata : storeDcArr};
var storeDCDataAdapter = new $.jqx.dataAdapter(storeDCSource, {autoBind : true});


var loadDropDownStoreDC = function(row, cellvalue, editor){
	editor.on('click', function(){
		editor.jqxDropDownList({
			source : storeDCDataAdapter, displayMember : 'name', valueMember : 'id'
		});
	});
}

var loadDropDownZone = function(row, cellvalue, editor){
	editor.on('click', function(){
		editor.jqxDropDownList({
			source : zoneArr, displayMember : 'description', valueMember : 'id'
		});
	});
}

var loadDropDownStore = function(row, cellvalue, editor){
	editor.on('click', function(){
		editor.jqxDropDownList({
			source : storeArr, displayMember : 'name', valueMember : 'id'
		});
	});
}
var wtRangeDropDown = function(row, value, editor){
	editor.on('click', function(){
		var stoneWeightRanges = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneWeightRanges');
		var wtRangeArray = [];
		$.each(stoneWeightRanges, function(k,v){
			var obj = {"id": v, "name" : v};
			wtRangeArray.push(obj);
		});
		editor.jqxDropDownList({
			source : wtRangeArray,
			displayMember : 'name',
			valueMember : 'id'
		});
	});
}

var onchnageCostRange = function(row, datafield, columntype, oldvalue, newvalue, event){
	console.log(datafield);
	/*if(datafield == "costRange"){
		var stoneWeight =  $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneWeight');
		console.log(newvalue);
		$.each(costRangeArr,function(k,v){
			if(v.id == newvalue.label){
				$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'stoneSellingRate', v.sellingRate);
				$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'stoneSellingPrice', (stoneWeight * v.sellingRate));
			}
		})
	}*/
	if(datafield == "stoneWeight"){
		if($("#refType").val() == "PB"){
			var uom = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'uom');
			if(uom  == "Cts"){
				var rows = $("#jqxgridCreate").jqxGrid('getrows');
				console.log(rows);
				var stoneVal = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneValue');
				var stoneCostRate = 0.00;
				stoneCostRate = stoneVal/newvalue;
				
				$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneCostRate", stoneCostRate.toFixed(2));
			}
			
		}
		
	else{
		var sellingRate = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneSellingRate');
		if(sellingRate != null){
			$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'stoneSellingPrice', (newvalue * sellingRate));
		}
		
		var stoneCost = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneCostRate');
		var uom = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'uom');

		$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneValue", (newvalue * stoneCost));
		
		if(uom  == "Cts"){
			$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneCostPrice", (newvalue * stoneCost));
		}
	}
	}
	if(datafield == "pieces"){
		var stoneCost = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneCostRate');
		var uom = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'uom');
		
		if($("#refType").val() == "PB"){
			if(uom == "Pcs"){
				var stoneVal = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneValue');
				var stoneCostRate = 0.00;
				stoneCostRate = stoneVal/newvalue;
			}
			$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneCostRate", stoneCostRate.toFixed(2));
		}
		else{
			if(uom  == "Pcs"){
				$("#jqxgridCreate").jqxGrid('setcellvalue', row, "stoneCostPrice", (newvalue * stoneCost));
			}
		}
	}
		
}

var costRangeDropDown = function(row, value, editor){
	editor.on('click', function(){		
		editor.jqxDropDownList({
			source : costRangeArr,
			displayMember : 'name',
			valueMember : 'id'
		});
	});
}

var storeArr = [];
var zoneArr = [];
var onchnageStoreDC = function(row, datafield, columntype, oldvalue, newvalue, event){
	var storeOrDC =  $('#jqxgridCreate').jqxGrid('getcellvalue', row, 'storeOrDc');
   
	$('#jqxgridCreate').jqxGrid('setcellvalue', row, 'zone', null);
	$('#jqxgridCreate').jqxGrid('setcellvalue', row, 'zoneN', null);
	$('#jqxgridCreate').jqxGrid('setcellvalue', row, 'store', null);
	$('#jqxgridCreate').jqxGrid('setcellvalue', row, 'storeN', null);
	var packetOrStock =  $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'packetOrStock');
	console.log(packetOrStock);
	console.log(datafield);
	
	if(datafield == "storeOrDc" && packetOrStock == "Packet"){
		if(newvalue.value == "Store"){
			$.growl.error({
				message : "Stone is in Packet , Please Select Store/DC as DC !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
	if(newvalue.value == "Store"){		
		$.getJSON("/OrderExecution/api/v1/storeOrDcLOV?acceptRejectType="+newvalue.value,function(data){
			if(data.resCode == "1" && typeof data != "undefined"){
				storeArr = data.payload.store;
			}
       });  
	}
	if(newvalue.value == "DC"){		
		$.getJSON("/OrderExecution/api/v1/storeOrDcLOV?acceptRejectType="+newvalue.value,function(data){
			if(data.resCode == "1" && typeof data != "undefined"){
				zoneArr = data.payload.zone;
			}
		}); 
	}
}

var editStoreDC = function(row, datafield, columntype){
	var storeOrDC =  $('#jqxgridCreate').jqxGrid('getcellvalue', row, 'storeOrDc');
	
	if(datafield == "store" && storeOrDC == "DC"){
		return false;
	}else if(datafield == "zone" && storeOrDC == "Store"){
		return false;
	}else{
		return true;
	}
}

var loadCreateGrid = function(data){
	console.log(data);
	var source = {
			datafields :
			[
				{ name: 'srlNo', type: 'int'},
				{ name: 'segmentId',  type: 'int'},
			    { name: 'segmentName',  type: 'string'},
			    { name: 'categoryId', type: 'int'},
			    { name: 'categoryDesc', type: 'string'},
		        { name: 'clarity', type: 'string'},
		        { name: 'claritys', type: 'string'},
		        { name: 'color', type: 'string'},
		        { name: 'colors', type: 'string'},
		        { name: 'actualColor', type: 'string'},
		        { name: 'actualColors', type: 'string'},
		       
		        { name: 'cutGrade', type: 'string'},
		        { name: 'cutGrades', type: 'string'},
		        { name: 'allCutGrades', type: 'array'},
		        { name: 'stoneWtRange', type: 'string'},
		        { name: 'weightRanges', type: 'string'},
		        { name: 'stoneWeightRanges', type: 'array'},	
		        { name: 'costRange', type: 'string'},
		        { name: 'SubCatId', type: 'int'},
		        { name: 'subCatDesc', type: 'string'},
		        { name: 'stoneCode', type: 'string'},
		        { name: 'pieces', type: 'int'},
		        { name: 'dimondCertificateId', type: 'int'},
		        { name: 'stoneCostRate', type: 'float'},
		        { name: 'stoneSellingRate', type: 'float'},
		        { name: 'stoneValue', type: 'float'},
		        { name: 'stoneSellingPrice', type: 'float'},
		        { name: 'storeOrDc', type: 'string'},
		        { name: 'stoneStanderdRate', type: 'int'},
		        { name: 'store', type: 'string'},
		        { name: 'zone', type: 'string'},
		        { name: 'certficateDetails', type: 'array'},
		        { name: 'uom', type: 'string'},
		        { name: 'refType', type: 'string'},
		        { name: 'refDocNo', type: 'int'},
		        { name: 'refDocSrlNo', type: 'int'},
		        { name: 'vendorId', type: 'int'},
		        { name: 'packetOrStock', type: 'string'},
		        { name: 'packetId', type: 'int'},
		        { name: 'hsnId', type: 'int'},
		        { name: 'stoneId', type: 'int'},
		        { name: 'actualStoneWeight', type: 'float'},
		        { name: 'subCatDescp', type: 'string'},
		        { name: 'stoneWeight', type: 'float'},
		        { name: 'shapeId', type: 'int'},
		        { name: 'shapeName', type: 'string'},
		        { name: 'segmentCode',type:'string'},
		        { name: 'ConsignmentOrDealer',type:'string'},
		        { name: 'stoneCostPrice',type:'float'}

		    ],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			},
			updaterow: function (rowid, newdata, commit) {
                 commit(true);
             }

		};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	$("#jqxgridCreate").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 60,
		theme: 'energyblue',
		columnsresize: true, 
        autoshowfiltericon: true,
		filterable: true,
		autoheight: false,
		altRows : false,
		height: '160px',
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 5px;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left"><b> Renumbering GR LS - Create </b></div>');	
		},
		columns : [
		    { text: 'Srl.', datafield: 'srlNo', width: "3%", cellsalign : 'left', align:'center',sortable : false, hidden : false, editable: false, sorting: false, cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},
	        { text: 'Segment', datafield: 'segmentName', width: "4%", cellsalign : 'right',sortable : false,  align:'center', hidden : false, editable: false, sorting: false},
	        { text: 'Main Category', datafield: 'categoryId',columntype : 'dropdownlist',displayfield : 'categoryDesc', width: "8%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: catDropdown, cellbeginedit: dataFieldEditable, cellvaluechanging : onChangeMainCategory},
	        { text: 'Clarity', datafield: 'clarity',columntype : 'dropdownlist',displayfield : 'claritys', width: "3%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: clarityDropdown, cellbeginedit: dataFieldEditable,cellvaluechanging:loadSubCatDescp},
	        { text: 'Color', datafield: 'color',columntype : 'dropdownlist',displayfield : 'colors', width: "3%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: colorDropdown, cellbeginedit: dataFieldEditable,cellvaluechanging:loadSubCatDescp},
	        { text: 'Actual Color', datafield: 'actualColor',columntype : 'dropdownlist',displayfield : 'actualColors', width: "6%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: actualColorDropdown, cellbeginedit: dataFieldEditable},
	        { text: 'Cut Grade', datafield: 'cutGrade',columntype : 'dropdownlist',displayfield : 'cutGrades', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: cutGradeDropdown, cellbeginedit: dataFieldEditable,cellvaluechanging:loadSubCatDescp},
	        { text: 'Sub Cat', datafield: 'SubCatId',columntype : 'dropdownlist',displayfield : 'subCatDesc', width: "8%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: true, sorting: false,cellvaluechanging : onchnageSubCategory,createeditor: subCatDropDown, cellbeginedit: dataFieldEditable},
	        { text: 'Wt. Range', datafield: 'stoneWtRange',columntype : 'dropdownlist',displayfield : 'weightRanges', width: "6%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: wtRangeDropDown, cellbeginedit: dataFieldEditable,cellvaluechanging:loadSubCatDescp},
	        { text: 'Shape', datafield: 'shapeId',columntype : 'dropdownlist',displayfield : 'shapeName', width: "8%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: shapeDropDown,cellvaluechanging : onchnageSubCategory, cellbeginedit: dataFieldEditable},
	        { text: 'Cost Range', datafield: 'costRange',columntype : 'dropdownlist',displayfield : 'costRanges', width: "6%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: costRangeDropDown, cellbeginedit: dataFieldEditable,cellvaluechanging : onchnageCostRange},
	        
	        { text: 'Sub Cat Desc', datafield: 'subCatDescp', width: "8%", cellsalign : 'left',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
	        { text: 'Stone Code', datafield: 'stoneCode', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
	        { text: 'No. Of Pcs', datafield: 'pieces', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,cellvaluechanging : onchnageCostRange},
	        { text: 'Stone Wt.', datafield: 'stoneWeight', width: "6%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,cellsformat :'d3',cellvaluechanging : onchnageCostRange
	        },

	        { text: 'Diamond Cert. ID', datafield: 'dimondCertificateIdN', width: "5%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,displayfield : 'dimondCertificateId',
	        	cellbeginedit : function(row){
					var refType = $("#refType").val();
					if(refType != "LSS"){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
	        	},
	        	createeditor : function(row, value, editor) {
					var certficateDetails =  $('#jqxgridCreate').jqxGrid('getcellvalue', row, 'certficateDetails');  
					var certficateDetailsArr = []; 
						$.each(certficateDetails, function(k,v){
							certficateDetailsArr.push({
								"id" : v,
							})
						});
						editor.on('click', function(event){	
							editor.jqxDropDownList({ source: certficateDetailsArr , displayMember: 'id', valueMember: 'id'});
						});
				}
	        },
	        { text: 'Stone Cost Rate', datafield: 'stoneCostRate', width: "6%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat: 'd2'},
	        { text: 'Stone Selling Rate', datafield: 'stoneSellingRate', width: "6%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat: 'd2'},
	        { text: 'Stone Value', datafield: 'stoneValue', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat: 'd2'},
	        { text: 'Stone Selling Price', datafield: 'stoneSellingPrice', width: "7%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat: 'd2'},
	        { text: 'UQC', datafield: 'uom', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false},
	        { text : 'Store/DC',datafield : 'storeOrDc','width' : '5%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'storeOrDcN',cellsalign : 'center',align:'center',createeditor : loadDropDownStoreDC,cellvaluechanging: onchnageStoreDC, cellbeginedit: editStoreDC},
			{ text : 'Store',datafield : 'store','width' : '4%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'storeN',cellsalign : 'center',align:'center',createeditor : loadDropDownStore,cellvaluechanging: onchnageStoreDC, cellbeginedit: editStoreDC},
			{ text : 'Zone',datafield : 'zone','width' : '4%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'zoneN',cellsalign : 'center',align:'center',createeditor : loadDropDownZone,cellvaluechanging: onchnageStoreDC, cellbeginedit: editStoreDC},
			{ text: '', datafield: 'certficateDetails', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false, cellsrenderer : diamondCertView},
	        
	        { text: '', datafield: 'stoneStanderdRate', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
			{ text: '', datafield: 'refType', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'refDocNo', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'refDocSrlNo', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'vendorId', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'packetOrStock', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'packetId', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'hsnId', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'stoneId', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'actualStoneWeight', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'segmentCode', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'ConsignmentOrDealer', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'stoneCostPrice', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true,cellsforamt :'d2'},
        ]
	});	
}

var onloadApi = function(){
	$('#refType').empty().append('<option value="" selected>--Select--</option>');
	$('#refTypeS').empty().append('<option value="" selected>--Select--</option>');
	$('#segmentS').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/looseStoneRenumberGr?searchType=onLoad', function(data) {
		$.each(data.payload.refTypes, function(k,v){
			$('#refType').append('<option value="' + v.id + '">' + v.name + '</option>');
		});
		
		$.each(data.payload.refTypes, function(k,v){
			$('#refTypeS').append('<option value="' + v.id + '">' + v.name + '</option>');
		});
	});
	
	$.getJSON('/OrderExecution/api/v1/getAllSegments', function(data) {
		$.each(data.payload.allSegments, function(k,v){
			$('#segmentS').append('<option code="'+v.code+'" value="' + v.id + '">' + v.description + '</option>');
		});
	});
}

$("#refTypeS").on('change', function(){
	var refTypeS = $(this).val();
	$('#refSlNoS').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/getAllRefNos?refType='+refTypeS, function(data) {
		$.each(data.payload.allRefNos, function(k,v){
			$('#refSlNoS').append('<option value="' + v.refDocNo + '">' + v.refDocNo + '</option>');
		});
	});
});

$("#refType").on('change',function(){
	if($("#refType").val() == "LSS" ||$("#refType").val() == "SM" || $("#refType").val() == "MR" ){
	   $("#refSlNo").attr('disabled',true);	
	}else{
		 $("#refSlNo").attr('disabled',false);
	}
});

$("#segmentS").on('change', function(){
	var segId = $(this).val();
	$('#categoryS').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/getAllCategorys?segId='+segId, function(data) {
		$.each(data.payload.allCategorys, function(k,v){
			$('#categoryS').append('<option value="' + v.id + '">' + v.description + '</option>');
		});
	});
});


$("#refNo").on('change', function(){
	var refType = $('#refType').val();
	var refSlNo = $(this).val();
	$('#refSlNo').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/looseStoneRenumberGr?searchType=srlNo&&refType='+refType+'&&refDocNo='+refSlNo, function(data) {
		if(data.resCode == "1" || data.resCode == 1){
			$("#addGr").prop('disabled',false);
			$.each(data.payload.srlNos, function(k,v){
				$('#refSlNo').append('<option value="' + v + '">' + v + '</option>');
			});
		}else if(data.resCode == "2"){
			$("#addGr").prop('disabled',true);
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			return false;
		}else{
			$("#addGr").prop('disabled',true);
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			return false;
		}
	});
	
	if($('#refType').val() == "LSS" || $('#refType').val() == "SM" || $('#refType').val() == "MR"){
		$('#vendorCode').empty().append('<option value="" selected>--Select--</option>');
		$.getJSON('/OrderExecution/api/v1/getLooseStoneListOfVendors?refType='+$("#refType").val()+'&&refDocNo='+$("#refNo").val()+'&&refSiNo='+$("#refSlNo").val(), function(data) {
			if(data.resCode == "1" || data.resCode == 1){
				$.each(data.payload.renumGrVendors, function(k,v){
					$('#vendorCode').append('<option value="' + v.id + '">' + v.name + '</option>');
				});
			}else{
				$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
				return false;
			}
		});
	}
	
});

$("#refSlNo").on('change',function(){
	if($('#refType').val() != "LSS" && $('#refType').val() != "SM" && $('#refType').val() != "MR" ){
		$('#vendorCode').empty().append('<option value="" selected>--Select--</option>');
		$.getJSON('/OrderExecution/api/v1/getLooseStoneListOfVendors?refType='+$("#refType").val()+'&&refDocNo='+$("#refNo").val()+'&&refSiNo='+$("#refSlNo").val(), function(data) {
			if(data.resCode == "1" || data.resCode == 1){
				$.each(data.payload.renumGrVendors, function(k,v){
					$('#vendorCode').append('<option value="' + v.id + '">' + v.name + '</option>');
				});
			}else{
				$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
				return false;
			}
		});
	}
});

onloadApi();
$("#create").on('click', function(){
	$("#searchGrFgForm").hide();
	$("#createGrFgForm").show();
	onloadApi();
	$(this).hide();
	$("#back").show();	
});

$("#addGr").on('click', function(){
	loadData(); // Calling API on click on created
	loadCreateGrid();
	$("#jqxgridCreate").show();
});

$("#back").on('click', function(){
	redirect();
});

$("#clear").on('click', function(){
	redirect();
});

$("#clearCreateGR").on('click', function(){
	$("#grFgForm1").trigger('reset');
	$("#jqxgridCreate").jqxGrid('clear');
	$("#jqxgridCreate").hide();
});

$("#save").on('click', function(){
	var grDetailsArr= [];
	var rows = $("#jqxgridCreate").jqxGrid('getrows');
	if(typeof rows != "undefined"){
		for(var i=0; i<rows.length; i++){
			grDetailsArr.push(rows[i]);
		}
	}
	console.log(rows);
	 for (var i = 0; i < rows.length; i++){
		 var row = rows[i];
		 var storeDc = row.storeOrDcN;
		 if(row.stoneSellingRate == null){
			 $.growl.error({
				 message : "Please Enter all the grid Fields !!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		 }

		 if(storeDc == "" || storeDc == null){
			 $.growl.error({
				 message : "Please Select Store/DC !!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		 }
		 if(storeDc == "Store"){
			 if(row.storeN == "" || row.storeN == null){
				 $.growl.error({
					 message : "Please Select Store !!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			 }
		 }
		 if(storeDc == "DC"){
			 if(row.zoneN == "" || row.zoneN == null){
				 $.growl.error({
					 message : "Please Select Zone !!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			 }
		 }
	 }
	console.log(JSON.stringify(grDetailsArr));
	postJSON('/OrderExecution/api/v1/saveLooseStoneRenumGR', JSON.stringify(grDetailsArr), function(data) {
		if(data.resCode == "1" || data.resCode == 1){
			$.growl.notice({ message: data.mesgStr, duration: 10000, title: 'Success' });	
			window.location.href = "javascript:showContentPage('renumberingGRLS', 'bodySwitcher')";
			return true;	
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving IGR' });
			return false;
		}
	});
});

$("#export").on('click', function(){
	$('#loading').show();
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var refType = $("#refTypeS").val();
	var refNoS = $('#refNoS').val();
	var segmentS = $('#segmentS').val();
	var categoryS = $('#categoryS').val();
	var igrNo = $('#igrNoS').val();
	
		fieldFilters = {
			"fieldFilters" : {
			    "RefDocType":refType,
				"RefDocNo" : refNoS,
				"IgrNo" : igrNo,
				"FromDate" :fromDate ,
				"ToDate" :toDate,
				"SegmentId":segmentS,
				"categoryId":categoryS,
				"mode" : "excel",
				"reportName" : "RPT_Ren_GR_LS_Export"
			}
		}
		$.ajax({
			url : 'jasperReport',
			type : 'post',
			data : fieldFilters,
			contentType : "application/x-www-form-urlencoded",
			xhrFields : {
				responseType : "blob"
			},
			success : function(data) {
				console.log(data);
				$('#loading').hide();
				if (navigator.msSaveBlob) {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					navigator.msSaveBlob(file,'Renumbering_GR_LS.xlsx');
				}else {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
			}
		});
});

$("#print").on('click',function(){
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var refType = $("#refTypeS").val();
	var refNoS = $('#refNoS').val();
	var segmentS = $('#segmentS').val();
	var categoryS = $('#categoryS').val();
	var igrNo = $('#igrNoS').val();
	
		fieldFilters = {
			"fieldFilters" : {
			    "RefDocType":refType,
				"RefDocNo" : refNoS,
				"IgrNo" : igrNo,
				"FromDate" :fromDate ,
				"ToDate" :toDate,
				"SegmentId":segmentS,
				"categoryId":categoryS,
				"mode" : "pdf",
				"reportName" : "RPT_Ren_GR_LS"
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
					navigator.msSaveBlob(file, 'RPT_Ren_GR_LS.pdf');
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