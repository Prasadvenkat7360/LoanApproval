/** CREATED BY UI : DIPANKAR
 *  DEVELOPER : RAVI
 *  DESC : Renumbering GR Loose Stone with difference reference type
 */

$("#searchGrAccForm").show();
$("#createGrAccForm").hide();
$("#create").show();
$("#back").hide();

var redirect = function() {
	window.location.href = "javascript:showContentPage('renumberingGRACC', 'bodySwitcher')";
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
		{ name: 'srlNo', type: 'int',map:'accSrlNo'},
	    { name: 'segment',  type: 'int', map : 'segment'},
	    { name: 'mainCategory', type: 'string', map : 'mainCategoryName'},
        { name: 'subCat', type: 'string', map: 'subCategoryName'},
        { name: 'accCode', type: 'string','map':'accCode'},
        { name: 'dealerCostRate', type: 'float'},
        { name: 'costRange', type: 'string'},
        { name: 'pcs', type: 'int', map: 'pcs'},
        { name: 'accWt', type: 'float', map: 'weight'},
        { name: 'uqc', type: 'string', map: ''},
        { name: 'accSellingRate', type: 'float'},
        { name: 'accValue', type: 'float'},
        { name: 'dealerCostAmt', type: 'float','map':'dealerCostAmount'},
        { name: 'storeOrDc', type: 'string'},
        { name: 'store', type: 'string', map : 'storeN'},
        { name: 'zone', type: 'string', map : 'zoneN'}
    ];

var columns =
	[
	   // { text: 'Srl.', datafield: 'srlNo', width: "3%", cellsalign : 'left', align:'center',sortable : false, hidden : false, editable: false, sorting: false, cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},
        { text: 'Segment', datafield: 'segment', width: "6%", cellsalign : 'center',sortable : false,  align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Main Category', datafield: 'mainCategory', width: "7%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Sub Cat', datafield: 'subCat', width: "8%", cellsalign : 'left',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Acc Code', datafield: 'accCode', width: "6%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Dealer Cost Rate', datafield: 'dealerCostRate', width: "8%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d2'},
        { text: 'Cost Range', datafield: 'costRange', width: "8%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Pcs', datafield: 'pcs', width: "4%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Acc Wt', datafield: 'accWt', width: "6%",cellsformat:'d3' ,cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'UQC', datafield: 'uqc', width: "4%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Selling Acc Rate', datafield: 'accSellingRate', width: "7%",cellsformat:'d2', cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Acc Value', datafield: 'accValue', width: "6%",cellsformat:'d2', cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Dealer Cost Amount', datafield: 'dealerCostAmt',cellsformat:'d2', width: "7%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Store/DC', datafield: 'storeOrDc', width: "5%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Store', datafield: 'store', width: "7%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Zone', datafield: 'zone', width: "10%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false}
    ];

var searchFieldFilter = function(){
	fieldFilters = {"fieldFilters" : {}};
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var subCatS = $('#subCatS').val();
	var category = $('#categoryS').val();
	var refType = $('#refTypeS').val();
	var refNo = $('#refNoS').val();
	var refSlNo = $("#refSlNoS").val();
	var igrNo = $('#igrNoS').val();
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	
	if (subCatS != "" && subCatS != null) {
		fieldFilters.fieldFilters["subCategoryId"] = subCatS;
	}
	
	if (category != "" && category != null) {
		fieldFilters.fieldFilters["categoryId"] = category;
	}
	
	if (refType != "" && refType != null) {
		fieldFilters.fieldFilters["refDocType"] = refType;
	}
	
	if (refNo != "" && refNo != null) {
		fieldFilters.fieldFilters["docNo"] = refNo;
	}
	
	if (refSlNo != "" && refSlNo != null) {
		fieldFilters.fieldFilters["docSrlNo"] = refSlNo;
	}
	
	if (igrNo != "" && igrNo != null) {
		fieldFilters.fieldFilters["renumGrNo"] = igrNo;
	}
	return fieldFilters;
}

// Renumbering GR LS Search Grid.
var searchRenumberingGRLS = function(gridName, datafields,columns){
var updateRows = function(rowid, newdata, commit) {	commit(); };
	
	showMyGrid(datafields,"/OrderExecution/api/v1/looseAccessoriesRenumGrSearch", "list", columns, searchFieldFilter(), updateRows, "");
	
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
		$.growl.error({ message: "Please select From & To Date.", duration: 10000, title: 'Error' });
		return false;
	}
	var gridDiamondQuery = "#jqxgrid";	    	
	searchRenumberingGRLS(gridDiamondQuery,datafields,columns); 
	$("#jqxgrid").show();
});

//Create Section Data Filed and Coloumns.

var diamondCertViewData = function(row){
	
}


var catDropdown = function(row, value, editor){
	editor.on('click', function(){
		$.getJSON('/OrderExecution/api/v1/getMainCategoriesAndSubCategories?search=cat', function(data) {	
			editor.jqxDropDownList({
				source : data.payload.mainCategories,
				displayMember : 'description',
				valueMember : 'id'
			});
		});
	});
}

var dataFieldEditable = function(row, datafield, columntype){
	var stoneWeightRanges = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'stoneWeightRanges');
	var refType = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'refType');
	if(datafield == "stoneWtRange" && stoneWeightRanges.length > 0){
		return true;
	}else if(datafield == "mainCategoryId"){
		if(refType == "PB"){
			return true;
		}
		else{
			return false;
		}
	}else if(datafield == "subCategoryId"){
		if(refType == "PB"){
			return true;
		}
		else{
			return false;
		}
	}else if(datafield == "accCode"){
		if(refType == "PB"){
			return true;
		}
		else{
			return false;
		}
	}else if(datafield == "dealerCostRate"){
		if(refType == "PB"){
			return true;
		}
		else{
			return false;
		}
	}
	else if(datafield == "zoneId"){
		var storeDc = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'store');
		console.log(storeDc)
		if(storeDc == "Store"){
			return false;
		}else{
			return true
		}
	}else{
		return false;
	}
}

var generaterow = function(grSlNo,data){
	console.log(data.stoneWeight);
	var row = {};	
	row['srlNo'] = grSlNo;
	row["segment"] = data.segment;
	row["mainCategoryId"] = data.mainCategoryId;
	row["mainCategoryName"] = data.mainCategoryName;
	row["subCategoryId"] = data.subCategoryId;
	row["subCategoryName"] = data.subCategoryName;
	row["accCode"] = data.accCode;
	row["accCodeN"] = data.accCode;
	row["pcs"] = data.pcs;
	row["dealerCostRate"] = data.dealerCostRate;
	row["weight"] = data.weight;
	row["dealerCostAmount"] = (data.dealerCostRate * data.pcs);
	row["storeOrDC"] = data.storeOrDc;
	row["store"] = data.store;
	row["zoneId"] = data.zoneId;
	row["accSellingRate"] = data.accSellingRate;
	row["accValue"] = data.accValue;
	row["costRange"] = data.costRange;
	row["refType"] = $("#refType").val();
	row["refDocNo"] = parseInt($("#refNo").val());
	row["refDocSrlNo"] = parseInt($("#refSlNo").val());
	row["vendorId"] = parseInt($("#vendorCode").val());
	row["uqc"] =data.uqc;
	return row;
}
// Load data thru API call.
var loadData = function(){
	var data = [];	
	var gridNameParcel = "#jqxgridCreate";	
	var headerTitleParcel = "Renumbering GR Acc - Create";	
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
	$.getJSON('/OrderExecution/api/v1/looseAccessoryRenumberGrDetails?refType='+refType+'&&refDocNo='+refNo+'&&refSiNO='+refSlNo+'&&venderId='+vendorCode, function(data) {
		if(data.payload){
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

var subCat = [];
var subCatDropDown = function(row, cellvalue, editor){
	var categoryId = $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'mainCategoryId');

	$.getJSON('/OrderExecution/api/v1/getMainCategoriesAndSubCategories?search=subCat&catId='+categoryId, function(data) {
		if(data.payload){	
			subCat = data.payload.subCategories;
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving IGR' });
			return false;
		}
	});
	editor.on('click', function(){
		editor.jqxDropDownList({
			source : subCat, displayMember : 'description', valueMember : 'id'
		});
	});
}

var accCodeArrs = [];
var accCodeDropDown = function(row, cellvalue, editor){
	var accCodeArry = [];
	editor.on('click', function(){
	$.getJSON('/OrderExecution/api/v1/getAllAccCode', function(data) {
		if(data.payload){	
			accCodeArrs = data.payload.allAccCodes;
			 $.each(accCodeArrs,function(k,v){
				 accCodeArry.push({
					 "id" : v,
					 "name" : v,
				 });
			 });
			 console.log(accCodeArry)
			
				editor.jqxDropDownList({
					source : accCodeArry, displayMember : 'name', valueMember : 'id'
				});
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving IGR' });
			return false;
		}
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

var costRangeArray = [];
var costRangeDropDown = function(row, value, editor){
	  //Load Cost Range
	  editor.on('click', function(){
	  var accCode =  $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'accCode');
	  var dealerCostRate =  $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'dealerCostRate');
	  console.log(accCode);
	  console.log(dealerCostRate);
	  if($("#refType").val() == "PB"){
		  if(accCode == null){
			  $.growl.error({
					message :"Please Select Acc Code !!!" ,
					duration :10000,
					title :'Error'
				}); 
			  return false;
		  }
		  if(dealerCostRate == null){
			  $.growl.error({
					message :"Please Enter Dealer Cost Rate!!!" ,
					duration :10000,
					title :'Error'
				}); 
			  return false;
		  }
	  }
	  $.getJSON('/OrderExecution/api/v1/getCostRangeAndSellingRate?accCode='+accCode+'&dealerCostRate='+dealerCostRate, function(data) {
		if(data.resCode =="1"){
			 var costRangeArr  = [];
			 costRangeArray = [];
			costRangeArr.push(data.payload.costRange);
			if(costRangeArr.length >0){
				 $.each(costRangeArr,function(k,v){
					 costRangeArray.push({
						 "id" : v.id,
						 "name" : v.name,
					 });
				 });
			}
			editor.jqxDropDownList({
				source : costRangeArray, displayMember : 'id', valueMember : 'id'
			});
		}else {
			costRangeArray = [];
			$.growl.error({
				message :data.mesgStr ,
				duration :10000,
				title :'Error'
			});
			return false;
		}
		});
	  });
}

var onchnageDCRate = function(row, datafield, columntype, oldvalue, newvalue, event){
	if(datafield == "accCode"){
		$('#jqxgridCreate').jqxGrid('setcellvalue', row, 'costRanges', null);
		$('#jqxgridCreate').jqxGrid('setcellvalue', row, 'costRange', null);
	}

	if(datafield == "dealerCostRate"){
		var pieces =  $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'pcs');
		 $("#jqxgridCreate").jqxGrid('setcellvalue', row, 'dealerCostAmount', pieces * newvalue);
		 
		 $('#jqxgridCreate').jqxGrid('setcellvalue', row, 'costRanges', null);
		 $('#jqxgridCreate').jqxGrid('setcellvalue', row, 'costRange', null);
	}
	if(datafield == "pcs"){
		var dealerCostRate =  $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'dealerCostRate');
		 $("#jqxgridCreate").jqxGrid('setcellvalue', row, 'dealerCostAmount', dealerCostRate * newvalue);
	}
}

var onchnageCostRange = function(row, datafield, columntype, oldvalue, newvalue, event){
	var pcs =  $("#jqxgridCreate").jqxGrid('getcellvalue', row, 'pcs');
	
	$.each(costRangeArray,function(k,v){
		if(newvalue.value == v.id){
			$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'accSellingRate', v.name);
			$("#jqxgridCreate").jqxGrid('setcellvalue', row, 'accValue', (v.name * pcs));
		}
	});
	
  
}



var storeArr = [];
var zoneArr = [];
var onchnageStoreDC = function(row, datafield, columntype, oldvalue, newvalue, event){
	var storeOrDC =  $('#jqxgridCreate').jqxGrid('getcellvalue', row, 'storeOrDc');

	$('#jqxgridCreate').jqxGrid('setcellvalue', row, 'zoneId', null);
	$('#jqxgridCreate').jqxGrid('setcellvalue', row, 'zoneN', null);
	$('#jqxgridCreate').jqxGrid('setcellvalue', row, 'store', null);
	$('#jqxgridCreate').jqxGrid('setcellvalue', row, 'storeN', null);
	
	console.log(newvalue);
	
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
	var storeDC =  $('#jqxgridCreate').jqxGrid('getcellvalue', row, 'store');
    console.log(datafield)
	if(datafield == "store" && storeOrDC == "DC"){
		return false;
	}else if(datafield == "zoneId" && storeOrDC == "Store"){
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
			    { name: 'segment',  type: 'string'},
			    { name: 'mainCategoryId', type: 'int'},
			    { name: 'mainCategoryName', type: 'string'},
		        { name: 'subCategoryId', type: 'int'},
		        { name: 'subCategoryName', type: 'string'},
		        { name: 'accCode', type: 'string'},
		        { name: 'accCodeN', type: 'string'},
		        { name: 'pcs', type: 'int'},
		        {name :'costRange',type:'float'},
		        { name: 'dealerCostRate', type: 'float'},
		        { name: 'weight', type: 'float'},
		        { name: 'dealerCostAmount', type: 'float'},
		        { name: 'accValue', type: 'float'},
		        { name: 'storeOrDc', type: 'string'},
		        {name:'accSellingRate',type:'float'},
		        {name : 'accValue',type:'float'},
		        { name: 'store', type: 'string'},
		        { name: 'zoneId', type: 'string'},
		        { name: 'uqc', type: 'string'},
		        { name: 'refType', type: 'string'},
		        { name: 'refDocNo', type: 'int'},
		        { name: 'refDocSrlNo', type: 'int'},
		        { name: 'vendorId', type: 'int'},
		        { name: 'storeN', type: 'int'},
		        { name: 'zoneN', type: 'int'},
		        {name :'segmentId',type:'int'}
		      
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
			container.append('<div class="text-left"><b> Renumbering GR Accessory - Create </b></div>');	
		},
		columns : [
		    { text: 'Srl.', datafield: 'srlNo', width: "3%", cellsalign : 'left', align:'center',sortable : false, hidden : false, editable: false, sorting: false, cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},
	        { text: 'Segment', datafield: 'segment', width: "6%", cellsalign : 'center',sortable : false,  align:'center', hidden : false, editable: false, sorting: false},
	        { text: 'Main Category', datafield: 'mainCategoryId',columntype : 'dropdownlist',displayfield : 'mainCategoryName', width: "8%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: catDropdown, cellbeginedit: dataFieldEditable},
	        { text: 'Sub Cat', datafield: 'subCategoryId',columntype : 'dropdownlist',displayfield : 'subCategoryName', width: "9%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: subCatDropDown, cellbeginedit: dataFieldEditable},
	        { text: 'Acc Code', datafield: 'accCode', width: "7%",columntype : 'dropdownlist',displayfield :'accCodeN', cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: accCodeDropDown,cellbeginedit: dataFieldEditable,cellvaluechanging :onchnageDCRate},

	        { text: 'Dealer Cost Rate', datafield: 'dealerCostRate', width: "6%",cellsformat : 'd2', cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,cellbeginedit: dataFieldEditable ,cellvaluechanging :onchnageDCRate},
	        { text: 'Cost Range', datafield: 'costRange',columntype : 'dropdownlist',displayfield : 'costRanges', width: "7%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: true, sorting: false,createeditor: costRangeDropDown,cellvaluechanging : onchnageCostRange},
	        { text: 'Pcs', datafield: 'pcs', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: true, sorting: false,cellvaluechanging :onchnageDCRate},
	        { text: 'Acc Wt.', datafield: 'weight', width: "5%", cellsalign : 'right',sortable : false, align:'center',cellsformat : 'd3', hidden : false, editable: true, sorting: false,cellsformat :'d3',
	        },
	        { text: 'UQC', datafield: 'uqc', width: "4%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false},
	        { text: 'Selling Acc Rate', datafield: 'accSellingRate', width: "6%", cellsalign : 'right',sortable : false, align:'center',cellsformat : 'd2', hidden : false, editable: false, sorting: false},
	        { text: 'Acc Value', datafield: 'accValue', width: "6%", cellsalign : 'right',sortable : false, align:'center',cellsformat : 'd2', hidden : false, editable: false, sorting: false},

	        { text: 'Dealer Cost Amount', datafield: 'dealerCostAmount', width: "6%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false,cellsformat : 'd2', sorting: false},
	        { text : 'Store/DC',datafield : 'storeOrDc','width' : '6%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'storeOrDcN',cellsalign : 'center',align:'center',createeditor : loadDropDownStoreDC,cellbeginedit: editStoreDC,cellvaluechanging : onchnageStoreDC},
			{ text : 'Store',datafield : 'store','width' : '7%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'storeN',cellsalign : 'center',align:'center',createeditor : loadDropDownStore, cellbeginedit: editStoreDC},
			{ text : 'Zone',datafield : 'zoneId','width' : '7%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'zoneN',cellsalign : 'center',align:'center',createeditor : loadDropDownZone,cellbeginedit: editStoreDC},
	        
			{ text: '', datafield: 'refType', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'refDocNo', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'refDocSrlNo', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'vendorId', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
	        { text: '', datafield: 'segmentId', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : true},
        ]
	});	
}

var onloadApi = function(){
	$('#refType').empty().append('<option value="" selected>--Select--</option>');
	$('#refTypeS').empty().append('<option value="" selected>--Select--</option>');
	$('#segmentS').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/looseAccessoryRenumberGrLov?searchType=onLoad', function(data) {
		var refTypeArr = [];
		$.each(data.payload.refTypes,function(k,v){
			if(v.id != "AM" && v.id != "MR"){
				refTypeArr.push(v);
			}
		});
		console.log(refTypeArr)
		$.each(refTypeArr, function(k,v){
			$('#refType').append('<option value="' + v.id + '">' + v.name + '</option>');
		});
		
		$.each(refTypeArr, function(k,v){
			$('#refTypeS').append('<option value="' + v.id + '">' + v.name + '</option>');
		});
	});
	$.getJSON('/OrderExecution/api/v1/getMainCategoriesAndSubCategories?search=cat', function(data) {
		$.each(data.payload.mainCategories, function(k,v){
			$('#categoryS').append('<option value="' + v.id + '">' + v.description + '</option>');
		});
	});
	
	
}

$("#refTypeS").on('change', function(){
	var refTypeS = $(this).val();
	$('#refNoS').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/getAndRefNoAndRefSrlNo?search=refNos&refType='+refTypeS, function(data) {
		$.each(data.payload.refNos, function(k,v){
			$('#refNoS').append('<option value="' + v.refDocNo + '">' + v.refDocNo + '</option>');
		});
	});
});

$("#refNoS").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/getAndRefNoAndRefSrlNo?search=refSrlNos&refType='+$("#refTypeS").val()+'&refNo='+$("#refNoS").val(), function(data) {
		$.each(data.payload.refSrlNos, function(k,v){
			$('#refSlNoS').append('<option value="' + v.refDocSrlNo + '">' + v.refDocSrlNo + '</option>');
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

$("#categoryS").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/getMainCategoriesAndSubCategories?search=subCat&catId='+$("#categoryS").val(), function(data) {
		$.each(data.payload.subCategories, function(k,v){
			$('#subCatS').append('<option value="' + v.id + '">' + v.description + '</option>');
		});
	});
});

$("#refNo").on('change', function(){
	var refType = $('#refType').val();
	var refSlNo = $(this).val();
	$('#refSlNo').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/looseAccessoryRenumberGrLov?refType='+refType+'&&searchType=srlNo&&refDocNo='+refSlNo, function(data) {
		if(data.resCode == "1"){
			$("#addGr").prop('disabled',false);
			$.each(data.payload.srlNos, function(k,v){
				$('#refSlNo').append('<option value="' + v + '">' + v + '</option>');
			});
		}else{
			$("#addGr").prop('disabled',true);
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			return false;
		}
	});
});

$("#refSlNo").on('change',function(){
	if($("#refSlNo").val() !=""){
		$.getJSON('/OrderExecution/api/v1/getLooseAccListOfVendors?refType='+$("#refType").val()+'&&refDocNo='+$("#refNo").val() +'&&refSiNO='+$("#refSlNo").val(), function(data) {
			if(data.payload){
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
	$("#searchGrAccForm").hide();
	$("#createGrAccForm").show();
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
			console.log(rows[i]);
			if(rows[i].costRange == null || rows[i].costRange == " "){
				$.growl.error({
					message :"Please Select Cost Range !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}if(rows[i].storeOrDcN == null || rows[i].storeOrDcN == " "){
				$.growl.error({
					message :"Please Select Store/DC !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}if(rows[i].storeOrDcN != null ){
				if(rows[i].storeOrDcN == "Store" && rows[i].storeN == null || rows[i].storeN == ""){
					$.growl.error({
						message :"Please Select Store !!!",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
				if(rows[i].storeOrDcN == "DC" && rows[i].zoneN == null || rows[i].zoneN == ""){
					$.growl.error({
						message :"Please Select Zone !!!",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}
			
			grDetailsArr.push(rows[i]);
			
		}
	}
	console.log(JSON.stringify(grDetailsArr));
	postJSON('/OrderExecution/api/v1/saveLooseAccessoriesRenumGR', JSON.stringify(grDetailsArr), function(data) {
		if(data.resCode == "1" || data.resCode == 1){
			$.growl.notice({ message: data.mesgStr, duration: 10000, title: 'Success' });	
			window.location.href = "javascript:showContentPage('renumberingGRACC', 'bodySwitcher')";
			return true;	
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			return false;
		}
	});
});

/*$("#export").on('click', function(){
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	if((fromDate == null || fromDate == "") || (toDate == null || toDate == "")){
		$.growl.error({ message: "Please select From & To Date.", duration: 10000, title: 'Error in Saving IGR' });
		return false;
	}
	var data;
	var newData = [];
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $("#jqxgrid").jqxGrid('getrows');
	if(typeof rows == "undefined"){
		$.growl.error({ message: "No Data to export", duration: 10000, title: 'Error in Saving IGR' });
		return false;
	}
	if(rows.length > 0){
		postJSON('/OrderExecution/api/v1/exportLooseAccessoriesRenumGr', JSON.stringify(searchFieldFilter()), function(response) {
			if(response != null){
				data = response.payload.list;	
				for(i=0; i<data.length; i++){	
				
				newData.push({	
							'Segment' : (data[i].segment != null) ? data[i].segment: "",
							'Main Category' : (data[i].mainCategoryName != null) ? data[i].mainCategoryName: "",
							'Sub Cat' : (data[i].subCategoryName != null) ? data[i].subCategoryName	: "",						
							'Acc Code' : (data[i].accCode != null) ? data[i].accCode	: "",
							'Dealer Cost Rate' : (data[i].dealerCostRate != null) ? data[i].dealerCostRate: "",	
							'Cost Range' : (data[i].costRange != null) ? data[i].costRange : "",
							
							'Pcs' : (data[i].pcs != null) ? data[i].pcs: "",
							'Acc Wt' : (data[i].weight != null) ? data[i].weight : "",						
							'UQC' : (data[i].uqc != null) ? data[i].uqc	: "",
							'Selling Acc Rate' : (data[i].accSellingRate != null) ? data[i].accSellingRate: "",	
							'Acc Value' : (data[i].accValue != null) ? data[i].accValue: "",
									
							'Dealer Cost Amount' : (data[i].dealerCostAmount != null) ? data[i].dealerCostAmount: "",
							'Store/DC' : (data[i].storeOrDc != null) ? data[i].storeOrDc: "",	
							'Store' : (data[i].storeN != null) ? data[i].storeN : "",
							'Zone' : (data[i].zoneN != null) ? data[i].zoneN : ""
													
				       });
				}
				 //JSONToCSVConvertor(newData,	"GR Details" + "_" + sysdate, true);
				 var opts = [{sheetid:'RenumberingGRLS',header:true}];
				 var res = alasql('SELECT * INTO XLSX("RenumberingGRAcc_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
			  }
		});
	 }else{
         $.growl.error({  message : "No Data to Export.", duration : 10000 });
	    return false;	
	  }
});*/


$("#export").on('click', function(){
	$('#loading').show();
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var refType = $("#refTypeS").val();
	var refNoS = $('#refNoS').val();
	var subCatS = $('#subCatS').val();
	var categoryS = $('#categoryS').val();
	var igrNo = $('#igrNoS').val();
	var refSlNo = $("#refSlNoS").val();
	
		fieldFilters = {
			"fieldFilters" : {
			    "RefDocType":refType,
				"RefDocNo" : refNoS,
				"RefDocSrlNo" :refSlNo,
				"IgrNo" : igrNo,
				"FromDate" :fromDate ,
				"ToDate" :toDate,
				"SubCategoryId":subCatS,
				"categoryId":categoryS,
				"mode" : "excel",
				"reportName" : "RPT_Ren_GR_LA_Export"
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
					navigator.msSaveBlob(file,'Renumbering_GR_ACC.xlsx');
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
	var subCatS = $('#subCatS').val();
	var categoryS = $('#categoryS').val();
	var igrNo = $('#igrNoS').val();
	var refSlNo = $("#refSlNoS").val();
	
	fieldFilters = {
			"fieldFilters" : {
			    "RefDocType":refType,
				"RefDocNo" : refNoS,
				"RefDocSrlNo" :refSlNo,
				"IgrNo" : igrNo,
				"FromDate" :fromDate ,
				"ToDate" :toDate,
				"SubCategoryId":subCatS,
				"categoryId":categoryS,
				"mode" : "pdf",
				"reportName" : "RPT_Ren_GR_LA"
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
					navigator.msSaveBlob(file, 'RPT_Ren_GR_ACC.pdf');
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