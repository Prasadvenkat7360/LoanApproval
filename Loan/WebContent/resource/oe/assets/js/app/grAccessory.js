/*	##	Author1         : 	Dipankar Naha (UI)
	## 	Author2 	    :   Pooja Sangve (UI)
	## 	Author2 	    :   Manoranjan mishra (Java)
	##	Date Creation 	: 	31-10-2017
	## 	Description		:	UI Integration of  GR Accessory
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

var redirect = function() {
	window.location.href="javascript:showContentPage('grStoneAcc', 'bodySwitcher')";
	return window.location.href;
}
var disable = false;

$("#createGRSection").show();
$("#grGridSection").hide();
$("#grTallySection").show();
$("#stoneSection").show();
$("#accSection").hide();

var widthGrDoneBy;
var actionColoumn;

var status = localStorage.getItem("status");


// INVOICE DATE ,date picker function 
$("#invoiceDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});

var editGrAccDetails = function(row, column, value){
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editAccDetailsModal"  type="button" id=' + row + ' onclick="editGrAccDet(' + value + ')"/><i class="fa fa-pencil fa-sm"></i></button>'
}


if(status == "C"){
	$("#completeMrvProcess").hide();
	$("#createGR").prop("disabled",true);
	widthGrDoneBy = '20%';
	actionColoumn =  { text: '',menu : false, hidden: true, datafield: 'actionId', width: widthGrDoneBy, cellsalign : 'center', align:'center', sortable : false};
}else{
	$("#completeMrvProcess").show();
	$("#createGR").prop("disabled",false);
	widthGrDoneBy = '15%';
	actionColoumn =  { text: '',menu : true, hidden: false, datafield: 'actionId', width: '5%', cellsalign : 'center', align:'center', sortable : false, cellsrenderer : editGrAccDetails};
}

// ############################################### Search GR Acc GRid #########################################

var grDetailsList = function(data){
	
	var dataArray = [];
	
	for (var i = 0; i < data.length; i++) {
		var obj = { "srlNo" : i+1, "grDate" : data[i].grDate, "grValue" : data[i].id, "accWt" : data[i].totalWt, "accPcs" : data[i].totalPcs, 
				"jobWorkerType" : data[i].jobWorkerType, "consignmentPeriod" : data[i].consignmentPeriod,"grDoneBy" : data[i].grDoneBy}
		dataArray.push(obj);
	}
	
	var source =
    {
        localdata: dataArray,
        datatype: "array",
        datafields:
        [
            { name: 'srlNo', type: 'int' },
            { name: 'grDate', type: 'date' },
            { name: 'grValue', type: 'int'},
            { name: 'accWt', type: 'float' },
            { name: 'accPcs', type: 'int'},
            { name: 'jobWorkerType', type: 'float' },
            { name: 'consignmentPeriod', type: 'float' },
            { name: 'grDoneBy', type: 'string'},
            { name: 'actionId', type: 'string', map : 'grValue'}
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
	
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#grDetailsList").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 40,
		autorowheight : true,
		theme: 'energyblue',
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
        source: dataAdapter, 
        columns: [
          { text: 'SL No.', datafield: 'srlNo', width: '10%', cellsalign : 'center',sortable : true, menu : true, align:'center' },
          { text: 'IGR Date', datafield: 'grDate', width: '10%', cellsalign : 'center',sortable : true, menu : true, align:'center', cellsformat : 'dd/MM/yyyy' },
          { text: 'IGR#', datafield: 'grValue', width: '10%', cellsalign : 'center',sortable : true, menu : true, align:'center' },
          { text: 'Acc Wt', datafield: 'accWt', width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat : 'd3'},
          { text: 'Acc Pcs', datafield: 'accPcs', width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center' },         
          { text: 'Job Worker Type', datafield: 'jobWorkerType', width: '15%', cellsalign : 'center',sortable : false, menu : false, align:'center'},
          { text: 'Consignment Priod', datafield: 'consignmentPeriod', width: '15%', cellsalign : 'center',sortable : false, menu : false, align:'center'},
          { text: 'IGR Done By', datafield: 'grDoneBy', width: widthGrDoneBy, cellsalign : 'center', align:'center', sortable : false},
          actionColoumn
        ]
    });
}

var onloadGrAcc = function(){

	$("#createGrAcc").show();
	$("#editGrAcc").hide();
	$("#addRowSam").hide();
	$("#saveGRFGEdit").hide();
	var parcelIds = localStorage.getItem("parcelIds");
	
	$.getJSON('/OrderExecution/api/v1/getAccGRsByParcel?parcelId='+parcelIds, function(data) {
		
		var response = data.payload.grHeaderDTOs;
		
		if(response == null || response == ""){
			$("#grTally").prop("disabled",true);
			$("#completeMrvProcess").prop("disabled",true);
		}else{
			$("#grTally").prop("disabled",false);
			$("#completeMrvProcess").prop("disabled",false);
		}
		$("#noOfParcels").val(data.payload.parcel.noOfParcels);
		$("#parcelId").val(data.payload.parcel.parcelId);
		$("#accWt").val(data.payload.parcel.grossWeight);
		grDetailsList(data.payload.grHeaderDTOs);
		$("#grDetailsList").show();
		$("#vendorCodeC").val(data.payload.parcel.vendorId);
		$("#vendorC").val(data.payload.parcel.vendorName);
	});
}

onloadGrAcc();

// Validate before copy rows.
var validateCopyGrLine = function(){
	var copyData = [];
	var copyGrDetInput = $("#noCloneRow").val();
	var selectedrowindexGRDetailsGrid = $("#grStoneAccCreateGrid").jqxGrid('getselectedrowindex');
	var segment = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'segment');
	var mainCat = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'mainCat');
	var subCat = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'subCat');
	var accCode = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'accCode');
	var dealerCostRate = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'dealerCostRate');
	var costRange = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'costRange');
	var noOfPcs = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'noOfPcs');
	var accWt = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'accWt');
	var uqc = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'uqc');
	var sellingAccRate = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'sellingAccRate');
	var accValue = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'accValue');
	var accCostAmount = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'accCostAmount');
	var acceptRej = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'acceptRej');
	var storeDC = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'storeDC');
	

	if(NVL(copyGrDetInput,"") == ""){
		$.growl.error({ message: "Please select no. of line to copy.", duration: 10000, title: 'Error' });
		return false;
	}if(copyGrDetInput > 250){
		$.growl.error({ message: "Max limit is 250 to copy lines.", duration: 10000, title: 'Error' });
		return false;
	}
	
	if((segment == "" || segment == null) || (mainCat == "" || mainCat == null) || (subCat == "" || subCat == null)  || (dealerCostRate == "" || dealerCostRate == null) ||
			(noOfPcs == "" || noOfPcs == null) || (costRange == "" || costRange == null)  || (accCode == "" || accCode == null) || (accWt == "" || accWt == null) ||
			(uqc == "" || uqc == null) || (sellingAccRate == "" || sellingAccRate == null) || (accValue == "" || accValue == null) || (accCostAmount == "" || accCostAmount == null) || 
			(acceptRej == "" || acceptRej == null) ||	(storeDC == "" || storeDC == null)){
		$.growl.error({ message: "Please fill mandatory field to copy lines.", duration: 10000, title: 'Error' });	return false;
	}
	
	return true;

}
//Clone GR Accessory
var clonerow = function (grSrlNo) {	
	
    var child = new Object(); 
    var row = {};
	var selectedrowindex = $("#grStoneAccCreateGrid").jqxGrid('getselectedrowindex');
	var id = $("#grStoneAccCreateGrid").jqxGrid('getrowid', selectedrowindex);
	var data = $('#grStoneAccCreateGrid').jqxGrid('getrowdatabyid', id);
	
	
	child.grSlNo = grSrlNo;
	child.segment = data.segment;
    child.segmentCode = data.segmentCode;
    child.mainCat = data.mainCat;
    child.subCat = data.subCat;
    child.accCode = data.accCode;
    child.dealerCostRate = data.dealerCostRate;
    child.costRange = data.costRange;
    child.noOfPcs = data.noOfPcs;
    child.accWt = data.accWt;
    
    child.uqc = data.uqc;
    child.sellingAccRate = data.sellingAccRate;
    child.accValue = data.accValue;
    child.accCostAmount = data.accCostAmount;
    child.acceptRej = data.acceptRej;
    child.storeDC = data.storeDC;
    child.storeValue = data.storeValue;
    child.zoneValue = data.zoneValue;
    child.hsnID = data.hsnID;
    child.flag = data.flag;
    
    child.mainCatN = data.mainCatN;
    child.subCatN = data.subCatN;
    child.acceptRejN = data.acceptRejN;
    child.storeValueN = data.storeValueN;
    child.zoneValueN = data.zoneValueN;
    child.storeDCN = data.storeDCN;
    
	return child;
    
}

// ############################################## Create GR Acc GRid #####################################
var pcsValidation = function(){
	
	var accPcs = $("#accPcs").val();
	var rows = $("#grStoneAccCreateGrid").jqxGrid('getrows');
	var validate = true;
	var totalPcs = 0;
	if(typeof rows != "undefined" && rows.length > 0 ){
		for(var i=0; i<rows.length; i++){
			totalPcs += rows[i].noOfPcs;
		}
	}
	
	if(parseInt(NVL(accPcs,0)) < parseInt(NVL(totalPcs,0))){validate = false;}
	else{
		var remPcs = parseInt(NVL(accPcs,0)) - parseInt(NVL(totalPcs,0));
		if(typeof remPcs == "undefined" || remPcs < 0) {validate = false;};	
	}
	
	return validate;
}

var createAccessoryGrid = function(){
	
	var acceptRej = [
		{"id" : "A", "name" : "Accept"},
		{"id" : "R", "name" : "Reject"}
	]
	
	var storeOrDC = [
		{"id" : "Store", "name" : "Store"},
		{"id" : "DC", "name" : "DC"}
	]
	
	var dropDownListSourceAcceptRej = {
			datatype : 'json',
			datafields : [ 
				{name : 'id',type : 'int'}, 
				{name : 'name',type : 'string'} 
			],
			localdata : acceptRej

		};
		var dropdownListAdapterAcceptRej = new $.jqx.dataAdapter(dropDownListSourceAcceptRej, {
			autoBind : true,
			async : false
		});
		var dropDownListSourceStoreOrDC = {
				datatype : 'json',
				datafields : [ 
					{name : 'id',type : 'int'}, 
					{name : 'name',type : 'string'} 
				],
				localdata : storeOrDC

			};
		var dropdownListAdapterStoreOrDC = new $.jqx.dataAdapter(dropDownListSourceStoreOrDC, {
			autoBind : true,
			async : false
		});
		var generaterow = function(i) {
			var row = {};
			row["grSlNo"] = i;
			row["segment"] = "Accessory";
			row["mainCat"] = "";
			row["subCat"] = "";
			row["accCode"] = "";
			row["dealerCostRate"] = "";
			row["costRange"] = "";
			row["noOfPcs"] = "";
			row["accWt"] = "";
			row["uqc"] = "";
			row["sellingAccRate"] = "";
			row["accValue"] = "";
			row["accCostAmount"] = "";
			row["acceptRej"] = "";
			row["storeDC"] = "";
			row["storeValue"] = "";
			row["zoneValue"] = "";
			row["hsnID"] = "";
			return row;
		}
		
		var source = {
			datafields : [ 
				{name : 'grSlNo', type : 'string'}, 
				{name : 'segment', type : 'string'}, 
				{name : 'mainCat', type : 'string'}, 
				{name : 'subCat', type : 'string'}, 
				{name : 'accCode', type : 'string'}, 
				{name : 'dealerCostRate', type : 'float'}, 
				{name : 'costRange', type : 'string'}, 
				{name : 'noOfPcs', type : 'int'}, 
				{name : 'accWt', type : 'float'}, 
				{name : 'uqc', type : 'string'}, 
				{name : 'sellingAccRate', type : 'float'}, 
				{name : 'accValue', type : 'float'}, 
				{name : 'accCostAmount', type : 'float'}, 
				{name : 'acceptRej', type : 'string',
					values : {
						source : dropdownListAdapterAcceptRej.records,
						value : 'id',
						name : 'name'
					}
				}, 
				{name : 'storeDC', type : 'string',
					values : {
						source : dropdownListAdapterStoreOrDC.records,
						value : 'id',
						name : 'name'
					} 
				},
				{name : 'storeValue', type : 'string'}, 
				{name : 'zoneValue', type : 'string'},
				{name : 'hsnID', type : 'string'},
				{name : 'flag', type : 'float'}
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			},
		};

		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#grStoneAccCreateGrid").jqxGrid({
			source : dataAdapter,
			width : '100%',
			theme: 'energyblue',
			editable : true,
			columnsheight : 65,
			autorowheight : true,
			autoheight : true,
			altRows : true,
			columnsresize : true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				
				container.append('<div class="col-md-4 row"><div style="margin-bottom:10px;"  id="addGrStoneAccGrid" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div></div>');
				container.append('<div class="col-md-4"><div style="margin-bottom:10px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="text-center">Create GR Details</div></div>');	
				container.append('<div class="col-md-2"><input style="height:24px; float: left;" type="text" name="noCloneRow" class="form-control input-sm" id="noCloneRow" /><div style="margin-bottom:10px;" id="cloneGRdetailsGrid" class="btn btn-success btn-sm"><i class="fa fa-copy fa-md"></i></div></div>');
				container.append('<div class="col-md-2 pull-right"><div style="margin-bottom:10px;" id="deleteGrStoneAccGrid" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div></div>');
				$("#addGrStoneAccGrid").jqxButton();
				$("#deleteGrStoneAccGrid").jqxButton();
				$("#cloneGRdetailsGrid").jqxButton();
				$("#cloneGRdetailsGrid").on('click', function () {				
					var copyGrDetInput = $("#noCloneRow").val();
					if(validateCopyGrLine()){	
						$("#contentBar").show();
						var rowcount = $('#grStoneAccCreateGrid').jqxGrid('getdatainformation').rowscount;					    
						for(var i=0; i<copyGrDetInput; i++){
							var datarow = clonerow(rowcount +1);
							var commit = $("#grStoneAccCreateGrid").jqxGrid('addrow', null, datarow);
							rowcount = rowcount + 1;
							if(parseInt(rowcount)== parseInt(copyGrDetInput)){
								$("#contentBar").hide();
							}
						}
					}
				 });
				
				$("#addGrStoneAccGrid").on('click', function() {
					var rowscount = $("#grStoneAccCreateGrid").jqxGrid('getdatainformation').rowscount;

					if (rowscount == 0) {
						var rowId = 1;
					} else {
						var rowId = rowscount + 1;
						var rows = $('#grStoneAccCreateGrid').jqxGrid('getrows');						
					}

					var datarow = generaterow(rowId);
					var commit = $("#grStoneAccCreateGrid").jqxGrid('addrow', null, datarow);
					
					var rows = $('#grStoneAccCreateGrid').jqxGrid('getrows');
					for (var i = 0; i < rows.length; i++) {
						var row = rows[i];
					    $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'segment','Accessory')
					}
				});
				
				$("#deleteGrStoneAccGrid").on('click', function() {
					var selectedrowindex = $("#grStoneAccCreateGrid").jqxGrid('getselectedrowindex');
					var rowscount = $("#grStoneAccCreateGrid").jqxGrid('getdatainformation').rowscount;
					for (var i = 0; i < rowscount; i++) {
						$("#grStoneAccCreateGrid").jqxGrid("setcellvalue", i, "grSlNo", i + 1);
					}
					
					if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
						var id = $("#grStoneAccCreateGrid").jqxGrid('getrowid',selectedrowindex);
						var commit = $("#grStoneAccCreateGrid").jqxGrid('deleterow', id);
					}
					
					for (var j = 0; j < rowscount; j++) {
						$("#grStoneAccCreateGrid").jqxGrid("setcellvalue", j,"grSlNo", j + 1);					
					}
				});
			},
			columns : [ 
				{text : 'IGR Sl. No.', datafield : 'grSlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
				{ text  :'','datafield': 'flagID','width' : '5%',cellsalign : 'center', hidden:true,
					
					 cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
							var rows = $("#grStoneAccCreateGrid").jqxGrid("getrows");
							$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'flagID','flagS');
		           	   }
				},
				{text : '', datafield : 'hsnID', width : '5%', cellsalign : 'center', align : 'center', editable : false,hidden:true}, 
				{text : 'Seg.', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
				{text : 'Main Cat.', datafield : 'mainCat', width : '5%', height: '5%', cellsalign : 'center', align : 'center', editable : true,
				columntype : 'dropdownlist',displayfield : 'mainCatN',	
					createeditor: function (row, cellvalue, editor) { 
      					var rows = $("#grStoneAccCreateGrid").jqxGrid('getrows');
					       $.getJSON("/OrderExecution/api/v1/grAccCreateLOV",function(data){
    	          				var res = data.payload.category;
    	          				
    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'name', valueMember: 'id'});
  		  		       });        	          			
            	    },
            	    cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'subCat',null);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'subCatN',null);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'mainCat',newvalue.value);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'mainCatN',newvalue.label);
						
            	    }
				}, 
				{text : 'Shape/Sub Cat.', datafield : 'subCat', width : '7%', cellsalign : 'center', align : 'center', editable : true,
					columntype : 'dropdownlist',displayfield : 'subCatN',
					createeditor: function (row, cellvalue, editor) { 
						editor.on('click', function(event){
      					var mainCat = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'mainCat');
      					if(mainCat !=""|| mainCat !=null){
					       $.getJSON("/OrderExecution/api/v1/getSubcategoryLOV?catId="+mainCat,function(data){
    	          				var res = data.payload.subcategory;
    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'name', valueMember: 'id'});
  		  		           })      
      				     }
					  })
            	    },
            	    cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
						var rows = $("#grStoneAccCreateGrid").jqxGrid('getrows');
						var newval = newvalue.value;
						if(newval != "" || newval != null){
						  $.getJSON("/OrderExecution/api/v1/subCategoryDetails?subcatId="+newval,function(data){
							if(data.resCode == 1){
	          				var res = data.payload.code;
	          				var res1= data.payload.uqc;
	          				var res2= data.payload.accesorymasterId;
	          				var res3= data.payload.hsnId;
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'accCode',res);
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'uqc',res1);
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'accId',res2);
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'hsnID',res3);
							}else if(data.resCode == 2){
								$.growl.error({
									message : data.mesgStr,
									duration : 8000,
									title : 'Error'
								});
								return false;
							}
	  		           });  
				   }
           	    },
				}, 
				{text : '', datafield : 'accId', width : '5%', cellsalign : 'center', align : 'center', editable : false,hidden:true}, 
				{text : 'Acc Code', datafield : 'accCode', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
				{text : 'Dealer Cost Rate', datafield : 'dealerCostRate', width : '8%', cellsalign : 'center', align : 'center', editable : true,cellsformat : 'd2',
					cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
						var rows = $("#grStoneAccCreateGrid").jqxGrid('getrows');
						var accId = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'accId');
						
						var fieldFilters={
								"fieldFilters":{
									"artId":accId,
								   "range":newvalue
						        }
						 }
						if(fieldFilters != "" || fieldFilters != null){
						  postJSON("/OrderExecution/api/v1/getAccDetailByAccMaster ",JSON.stringify(fieldFilters),function(data){
							  if(data.resCode == 1){
	          				var res = data.payload.accessoryDetail;
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'costRange',res.fromToCostRange);
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'sellingAccRate',res.sellingRate);
	          				$("#saveGRFG").prop("disabled",false);
							  }else{
								  $.growl.error({
										message : data.mesgStr,
										duration : 8000,
									});
								  $("#saveGRFG").prop("disabled",true);
							  }
	  		           });  
				   }
           	    },
				}, 
				{text : 'Cost Range', datafield : 'costRange', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
				{text : 'Pcs', datafield : 'noOfPcs', width : '5%', cellsalign : 'center', align : 'center', editable : true,
					cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
						var sellingAccRate = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'sellingAccRate');
						var dealerCostRate = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'dealerCostRate');
						var newval = newvalue*sellingAccRate;
						var newvalCost = newvalue*dealerCostRate;
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'accValue',newval);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'accCostAmount',newvalCost);
		   	         }
				}, 
				{text : 'Acc Wt', datafield : 'accWt', width : '5%', cellsalign : 'center', align : 'center', editable : true,cellsformat : 'd3'}, 
				{text : 'UQC', datafield : 'uqc', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
				{text : 'Selling Acc Rate', datafield : 'sellingAccRate', width : '7%', cellsalign : 'center', align : 'center', editable : false,cellsformat : 'd2'}, 
				{text : 'Acc Value', datafield : 'accValue', width : '5%', cellsalign : 'center', align : 'center', editable : false,cellsformat : 'd3'}, 
				{text : 'Dealer Cost Amount', datafield : 'accCostAmount', width : '10%', cellsalign : 'center', align : 'center', editable : false,cellsformat : 'd3'}, 
				{text : 'Accept/Reject', datafield : 'acceptRej', width : '5%', cellsalign : 'center', align : 'center', editable : true, columntype : 'dropdownlist',displayfield : 'acceptRejN',
					createeditor : function(row, cellvalue,	editor) {
						editor.on('click', function(){
							editor.jqxDropDownList({
								source : acceptRej,
								placeHolder : '--Select--',
								displayMember : 'name',
								valueMember : 'id',
								dropDownWidth : 100
							});
						});
					},				
					cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
						var newval = newvalue.value;
						
						if(newval == "R"){
							$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDC',"DC");
							$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDCN',"DC");
						}else{
							$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDC',null);
							$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDCN',null);
						}						

						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeValue',null);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeValueN',null);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'zoneValue',null);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'zoneValueN',null);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'acceptRej',newvalue.value);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'acceptRejN',newvalue.label);
		   	         },
						
			    },
				{text : 'Store/DC', datafield : 'storeDC', width : '5%', cellsalign : 'center', align : 'center', editable : true, editable : true, columntype : 'dropdownlist',displayfield : 'storeDCN',
			    	cellbeginedit:function(row,columntype,displayfield) {
			    		var acceptRej = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'acceptRej');
			    		 if(acceptRej == "A"){
	       					   return true;
			   			 }else{			  
			       			   return false;	
			       	   }
	        	   },
	        	   createeditor : function(row, cellvalue,	editor) {
	        		   editor.on('click', function(){
	        		   editor.jqxDropDownList({
							source : storeOrDC,
							placeHolder : '--Select--',
							displayMember : 'name',
							valueMember : 'id',
							dropDownWidth : 100
						});
	        		   });
					},				
					cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
						var newval = newvalue.value;
						if(newval == "DC"){
							$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeValue',null);
							$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeValueN',null);
						}

						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'zoneValue',null);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'zoneValueN',null);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDC',newvalue.value);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDCN',newvalue.label);
		   	         },
				}, 
				
				{text : 'Store', datafield : 'storeValue', width : '5%', cellsalign : 'center', align : 'center', editable : true,columntype : 'dropdownlist',displayfield : 'storeValueN',
					cellbeginedit:function(row,columntype,displayfield) {
						var storeDC = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'storeDC');
			    		 if(storeDC == "Store"){
	       					   return true;
			   			 }else{			  
			       			   return false;	
			       	   }
	        	   },
			    	createeditor: function (row, cellvalue, editor) { 
		    		 editor.on('click', function(){
			    		var storeDC = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'storeDC');
						if(storeDC == "Store" && (storeDC !=""|| storeDC !=null)){
					       $.getJSON("/OrderExecution/api/v1/storeOrDcLOV?acceptRejectType="+storeDC,function(data){
    	          				var res = data.payload.store;
			          		  		editor.jqxDropDownList({ source: res, displayMember: 'name', valueMember: 'id'});
			  		           });  
		  				  }
			    		}); 
            	   },
				}, 
				{text : 'Zone', datafield : 'zoneValue', width : '8%', cellsalign : 'center', align : 'center', editable : true,columntype : 'dropdownlist',displayfield : 'zoneValueN',
					cellbeginedit:function(row,columntype,displayfield) {
						var storeDC = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'storeDC');
			    		 if(storeDC == "DC"){
	       					   return true;
			   			 }else{			  
			       			   return false;	
			       	   }
	        	   },
	        	   createeditor: function (row, cellvalue, editor) { 
	        		   editor.on('click', function(){
		        		   var storeDC = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'storeDC');
							if(storeDC == "DC" && (storeDC !=""|| storeDC !=null)){
						       $.getJSON("/OrderExecution/api/v1/storeOrDcLOV?acceptRejectType="+storeDC,function(data){
	   	          					var res = data.payload.zone;
	   	          					editor.jqxDropDownList({ source: res, displayMember: 'description', valueMember: 'id'});
	 		  		           });      
	     				   }
	        		   });
           	        }
	        	  
				}, 
				{text : '', datafield : 'flag', hidden: true, width : '5%', cellsalign : 'center', align : 'center', editable : true}
			]
		});
}
$("#clearGR").on("click",function(){
	$("#grStoneAccCreateGrid").jqxGrid('clear');
})


$('#vendorInvNo').on("change",function() {
	if (this.value.match(/[^0-9]/g)) {
	   this.value = this.value.replace(/[^0-9]/g, '');
	}
});
$('#accPcs').on("change",function() {
	if (this.value.match(/[^0-9]/g)) {
	   this.value = this.value.replace(/[^0-9]/g, '');
	}
});
$('#consignmentPeriod').on("change",function() {
	if (this.value.match(/[^0-9]/g)) {
		   this.value = this.value.replace(/[^0-9]/g, '');
	}
});

//########################################### save GR Acc #######################################################

$("#saveGRFG").on('click', function(e){
	var validate = pcsValidation();
	if(validate == false){
		$.growl.error({
			message : "Pcs are not available.",
			duration : 8000,
			title : 'Error'
		});
		return false;
	}
	var rowscount = $("#grStoneAccCreateGrid").jqxGrid('getdatainformation').rowscount;
	var accGrDet = [];
	if (rowscount == 0) {
		$.growl.error({
			message : "Please Add Line Items To Grid.",
			duration : 8000,
			title : 'Error'
		});
		return false;
	} else {
		var vendorInvNo = $("#vendorInvNo").val();
		var accPcs = $("#accPcs").val();
		var jobWorkerTypeC = $("#jobWorkerTypeC").val();
		var consignmentPeriod = $("#consignmentPeriod").val();
		var gstIn = $("#gstIn").val();
		var statusGr = $("#statusGr").val();
		
		var statusGrIDSelct = $("#statusGrIDSelct").val()
		 
		if((vendorInvNo==""||vendorInvNo== null)||(accPcs==""||accPcs== null)
				||(jobWorkerTypeC==""||jobWorkerTypeC== null)){
				$.growl.error({
					message : "Please Fill all the Manadatory Feilds",
					duration : 8000,
					title : 'Error'
				});
				return false;
		}
		if($("#isRegisterId option:selected").text() == "Register"){
			if((gstIn==""||gstIn== null)){
				$.growl.error({
					message : "Please Fill GST In Feild!",
					duration : 8000,
					title : 'Error'
				});
				return false;
			}
		}else{
			if((statusGrIDSelct ==""||statusGrIDSelct == null)){
				$.growl.error({
					message : "Please Fill Source Of State!",
					duration : 8000,
					title : 'Error'
				});
				return false;
			}
		}
		
		var jwltype = $('#jobWorkerTypeC').val()
		if(jwltype  == "C"){
			if(consignmentPeriod==""||consignmentPeriod== null){
				$.growl.error({
					message : "Please Fill consignment Period Feild",
					duration : 8000,
					title : 'Error'
				});
				return false;
			}
		}
		var rows = $('#grStoneAccCreateGrid').jqxGrid('getrows');
		for (var i = 0; i < rowscount; i++) {
			if ((rows[i].mainCat==""||rows[i].mainCat== null)||(rows[i].subCat==""||rows[i].subCat== null)||(rows[i].accCode==""||rows[i].accCode== null)
				||(rows[i].costRange==""||rows[i].costRange== null)||(rows[i].accWt==""||rows[i].accWt== null)||(rows[i].noOfPcs==""||rows[i].noOfPcs== null)
				||(rows[i].uqc==""||rows[i].uqc== null)||(rows[i].dealerCostRate==""||rows[i].dealerCostRate== null)||(rows[i].sellingAccRate==""||rows[i].sellingAccRate== null)
				||(rows[i].accCostAmount==""||rows[i].accCostAmount== null)||(rows[i].accValue==""||rows[i].accValue== null)||(rows[i].acceptRej==""||rows[i].acceptRej== null)
				||(rows[i].storeDC==""||rows[i].storeDC== null))
			{
				$.growl.error({
					message : "Please Fill all the Manadatory Grid Feilds.",
					duration : 8000,
					title : 'Error'
				});
				return false;
			}
			var storeOrDc = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "storeDC");
			if(storeOrDc == "Store"){
				if(rows[i].storeValue ==""|| rows[i].storeValue == null){
					$.growl.error({
						message : "Please Fill all Store Feild.",
						duration : 8000,
						title : 'Error'
					});
					return false;
				}
			}else{
				if(rows[i].zoneValue ==""|| rows[i].zoneValue == null){
					$.growl.error({
						message : "Please Fill all Zone Feild.",
						duration : 8000,
						title : 'Error'
					});
					return false;
				}
			}
	   accGrDet.push ({
		   
		 "serialNumber": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "grSlNo"),
	      "category": {
	        "id": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "mainCat"),
	      },
	      "subCategory": {
	        "id":  $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "subCat"),
	      },
	      "accCode": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "accCode"),
	      "accCostRangeSlab": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "costRange"),
	      "accWt": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "accWt"),
	      "accPcs": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "noOfPcs"),
	      "uom":$("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "uqc"),
	      "dealerCostRate": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "dealerCostRate"),
	      "accSellingtRate":$("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "sellingAccRate"),
	      "dealerCostAmount": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "accCostAmount"),
	      "accSellingAmount": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "accValue"),
	      "storeOrDC": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "storeDC"),
	      "storeDTO": {
	        "storeId": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "storeValue"),
	      },
	      "hsnMasterDTO": {
	        "id": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "hsnID"),
	      },
         "detailStatus": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "acceptRej"),
	     "zoneDTO": {"id": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "zoneValue"),
	      }
	});
	}}
	
	var grAcc = {
	  "type":  "S",
			
	  "parcelDTO": {
	    "parcelId": $("#parcelIdC").val()
	  },
	  "jobWorkerType":  $("#jobWorkerTypeC").val(),
	  "consignmentPeriod":  $("#consignmentPeriod").val(),
	  "accSegmentDTO": {
	    "id": $("#segmentID").val()
	  },
	  "vendorDTO": {
	    "id":  $("#vendorCodeC").val()
	  },
	  "stateId": ($("#gstIn").val() == null || $("#gstIn").val() =="")?statusGrIDSelct : ($("#statusGrID").val()),
	  "isRegister": ($("#isRegisterId").val()=="false")?false:true,
	  "vendorInvNo":$("#vendorInvNo").val(),
	  "gstIn":$("#gstIn").val(),
	  "totalPcs":$("#accPcs").val(),
	  "vendorInvDate": $("#grCreatedDtS").val(),
	  "accGrDetailsDTO":accGrDet
	}
	var $link = $(e.target);
	  e.preventDefault();
	  if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 500) {

	postJSON('/OrderExecution/api/v1/createGRForAccessory', JSON.stringify(grAcc), function(data) {
		if(data.resCode == 1){
			$("#saveGRFG").prop('disabled', true);

			$.growl.notice({
				message : data.mesgStr,
				duration : 8000,
				title : 'Success'
			});
			
			var disable = true;
			$("#grId").val(data.payload.grId);
			$("#grCreatedDt").val(data.payload.grCreatedDt);
			$("#saveGRFG").prop('disabled',true);
			$('#addGrStoneAccGrid').jqxButton({disabled: true });
			$('#deleteGrStoneAccGrid').jqxButton({disabled: true });
		}else if(data.resCode == 3){
			$("#saveGRFG").prop('disabled', false);
			$.growl.error({
				message : data.mesgStr,
				duration : 8000,
				title : 'Error'
			});
		}else{
			$("#saveGRFG").prop('disabled', false);
			$.growl.error({
				message : data.mesgStr,
				duration : 8000,
				title : 'Error'
			});
		}
	});
}
	  $link.data('lockedAt', +new Date());
});

var getFromGrAccGrid = function(value, flagS){
	createAccessoryGrid();
}

//################################### Create Gr Acc ########################################
var arr = [];
$("#createGR").on('click', function(){
	$("#gstIn").empty().append('<option value="" selected>--Select--</option>');
	$("#statusGrIDSelct").empty().append('<option value="" selected>--Select--</option>');
	$("#jobWorkerTypeC").empty().append('<option value="" selected>--Select--</option>');
	
	$("#createGrAcc").show();
	$("#editGrAcc").hide();
	$("#addRowSam").hide();
	$("#saveGRFGEdit").hide();
	$("#stoneSection").hide();
	$("#accSection").show();
	$("#stoneAccSearchSection").hide();
	$("#createGRSection").toggle();
	$("#grStoneAccCreateGrid").show();
	$("#grGridSection").toggle();
	
	$("#isRegisterId").prop('disabled',false);
	$("#gstIn").prop('disabled',false);
	$("#statusGrIDSelct").prop('disabled',false);
	
    var parcelIds = $("#parcelId").val();
    getFromGrAccGrid(null, 0);
	$("#grTallySection").hide();
	$.each(jwlTypeArr, function(k, v){	
			$('#jobWorkerTypeC').append('<option  value="' + v.id + '">' + v.name	+ '</option>');
			var jwltype = $('#jobWorkerTypeC').val()
			
			if(jwltype  == "D"){
				$("#consignmentPeriod").prop("disabled",true);
			}else{
				$("#consignmentPeriod").prop("disabled",false);
			}
		});
	$.getJSON('/OrderExecution/api/v1/getGrAccessoryDetail?pId='+parcelIds, function(data) {
		var resp = data.payload.grdetail;
		$("#grCreatedDtS").val(resp.createdDate);
		
		$("#vendorCreategr").val(resp.vendorName);		
		$("#parcelIdC").val(resp.parcelId);
		$("#parcelWtC").val(resp.grossWeight);
		
			var response = data.payload.GstIn;
			$.each(response, function(key, val) {
				$("#gstIn").append('<option value="' + val.id + '">' + val.gstinNo + '</option>');
			});
	});
	$.getJSON('/OrderExecution/api/v1/grAccCreateLOV', function(data) {
		var res = data.payload.segment.id;
		$("#segmentID").val(res);
	});
});

$("#isRegisterId").on('change',function(){
	if($("#isRegisterId option:selected").text() == "Register"){
	     $("#statusGrIDSelct").hide();
		 $("#stateeOption").hide();
		 $("#gstN").show();
         $("#statee").show();
         $("#statusGr").show();
         $("#gstIn").show();
	}else{
		$.getJSON('/OrderExecution/api/v1/stateLOV', function(data) {
		var taxStructureMaasterLOV = data.payload.taxStructureMaasterLOV;
		$("#statusGrIDSelct").show();
	    $("#stateeOption").show()
		$.each(taxStructureMaasterLOV, function(k, v){
		    $('#statusGrIDSelct').append('<option  value="' + v.id + '">' + v.description	+ '</option>');
		});
	         $("#statusGr").hide();
	         $("#gstIn").hide();
	         $("#gstN").hide();
	         $("#statee").hide();
		});
	}
})

var jwlTypeArr = [{
	"id" : "C",
	"name" : "Consignment"
}, {
	"id" : "D",
	"name" : "Dealer"
}];

$("#gstIn").empty().append('<option value="" selected>--Select--</option>');
// ############################## Edit GR Acc #################################

var grGstnNo=[];
var editGrAccDet = function(value){
	var taxStructureMaasterLOV;
	$("#createGrAcc").hide();
	$("#editGrAcc").show();
	$("#addRowSam").show();
	$("#saveGRFGEdit").show();
	$("#stoneSection").hide();
	$("#saveGRFG").hide();
	$("#accSection").show();
	$("#stoneAccSearchSection").hide();
	$("#createGRSection").toggle();
	$("#grStoneAccCreateGrid").show();
	$("#grGridSection").toggle();
	//getFromGrAccGrid(value, 1);
	$("#grTallySection").hide();
	
	$("#isRegisterId").prop('disabled',true);
	$("#gstIn").prop('disabled',true);
	$("#statusGrIDSelct").prop('disabled',true);
	
	if($("#isRegisterId option:selected").text() == "Register"){
	     $("#statusGrIDSelct").hide();
		 $("#stateeOption").hide();
		 $("#gstN").show();
         $("#statee").show();
         $("#statusGr").show();
         $("#gstIn").show();
	}else{
		$.getJSON('/OrderExecution/api/v1/stateLOV', function(data) {
		taxStructureMaasterLOV = data.payload.taxStructureMaasterLOV;
		$("#statusGrIDSelct").show();
	    $("#stateeOption").show()
		$.each(taxStructureMaasterLOV, function(k, v){
		    $('#statusGrIDSelct').append('<option  value="' + v.id + '">' + v.description	+ '</option>');
		});
	         $("#statusGr").hide();
	         $("#gstIn").hide();
	         $("#gstN").hide();
	         $("#statee").hide();
		});
	}
	var parcelIds = $("#parcelId").val();
	$.getJSON('/OrderExecution/api/v1/getGrAccessoryDetail?pId='+parcelIds, function(data) {
		var response = data.payload.GstIn;
		if(response != undefined){
		grGstnNo   = response.slice();
		}
		var resp = data.payload.grdetail;
		$("#grCreatedDtS").val(resp.createdDate);
		$.getJSON('/OrderExecution/api/v1/getAccGrById?grId='+value, function(data) {
			var accGrDetailsDTO = data.payload.AccessoryGr.accGrDetailsDTO;
			
			var AccessoryGr = data.payload.AccessoryGr;
			
	        $("#grId").val(data.payload.AccessoryGr.id);
			$("#grCreatedDt").val(AccessoryGr.parcelDTO.createdDate);
			$("#vendorCreategr").val(AccessoryGr.parcelDTO.vendorName);		
			$("#parcelIdC").val(AccessoryGr.parcelDTO.parcelId);
			$("#parcelWtC").val(AccessoryGr.parcelDTO.grossWeight);
			$("#accPcs").val(AccessoryGr.totalPcs);
			$("#vendorInvNo").val(AccessoryGr.vendorInvNo);
			$("#consignmentPeriod").val(AccessoryGr.consignmentPeriod);
			$("#isRegisterId").val((AccessoryGr.isRegister).toString());
			
				$.each(taxStructureMaasterLOV, function(k, v){	
					if(AccessoryGr.sourceStae.id  == v.id){
						$('#statusGrIDSelct').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
					}else{
						$('#statusGrIDSelct').append('<option value="' + v.id + '">' + v.name	+ '</option>');
					}
				});
			
				$.each(jwlTypeArr, function(k, v){	
					if(AccessoryGr.jobWorkerType  == v.id){
						$('#jobWorkerTypeC').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
					}else{
						$('#jobWorkerTypeC').append('<option value="' + v.id + '">' + v.name	+ '</option>');
					}
				});
				if(AccessoryGr.jobWorkerType  == "Consignment"){
					$("#consignmentPeriod").prop("disabled",false);
				}else{
					$("#consignmentPeriod").prop("disabled",true);
				}
			
				$.each(grGstnNo, function(k, v){	
					if(AccessoryGr.gstIn  == v.id){
						$("#gstIn").append('<option selected value="' + v.id + '">' + v.gstinNo + '</option>');
					}else{
						$("#gstIn").append('<option value="' + v.id + '">' + v.gstinNo + '</option>');
					}
				});
					$("#statusGrID").val(AccessoryGr.sourceStae.id);
					$("#statusGr").val( AccessoryGr.sourceStae.name);
				    createAccessoryGridInEditPage(accGrDetailsDTO);
	    });
	});
	$.getJSON('/OrderExecution/api/v1/grAccCreateLOV', function(data) {
		var res = data.payload.segment.id;
		$("#segmentID").val(res);
	});
}

$("#jobWorkerTypeC").on("change",function(){
	var jobWorkerTypeC = $("#jobWorkerTypeC").val()
	if(jobWorkerTypeC == "D"){
		$("#consignmentPeriod").prop("disabled",true);
	}else{
		$("#consignmentPeriod").prop("disabled",false);
	}
});
// ############################################# Edit Page GRid ############################################

var createAccessoryGridInEditPage = function(data){
	
	var acceptRej = [
		{"id" : "A", "name" : "Accept"},
		{"id" : "R", "name" : "Reject"}
	]
	var dropDownListSourceAcceptRej = {
			datatype : 'json',
			datafields : [ 
				{name : 'id',type : 'int'}, 
				{name : 'name',type : 'string'} 
			],
			localdata : acceptRej

		};
		var dropdownListAdapterAcceptRej = new $.jqx.dataAdapter(dropDownListSourceAcceptRej, {
			autoBind : true,
			async : false
		});
		
		var storeOrDC = [
			{"id" : "Store", "name" : "Store"},
			{"id" : "DC", "name" : "DC"}
		]
		var dropDownListSourceStoreOrDC = {
					datatype : 'json',
					datafields : [ 
						{name : 'id',type : 'int'}, 
						{name : 'name',type : 'string'} 
					],
					localdata : storeOrDC

				};
			var dropdownListAdapterStoreOrDC = new $.jqx.dataAdapter(dropDownListSourceStoreOrDC, {
				autoBind : true,
				async : false
			});
			
			
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [
					{name : 'grSlNo', type : 'string','map':'serialNumber'}, 
					{name : 'segment', type : 'string'}, 
					{name : 'grEditID', type : 'string','map':'grNo'}, 
					{name : 'mainCat', type : 'string','map':'category>id'}, 
					{name : 'subCat', type : 'string','map':'subCategory>id'}, 
					{name : 'mainCatN', type : 'string','map':'category>description'}, 
					{name : 'subCatN', type : 'string','map':'subCategory>description'},
					{name : 'accCode', type : 'string','map':'accCode'}, 
					{name : 'dealerCostRate', type : 'float','map':'dealerCostRate'}, 
					{name : 'costRange', type : 'string','map':'accCostRangeSlab'}, 
					{name : 'noOfPcs', type : 'int','map':'accPcs'}, 
					{name : 'accWt', type : 'float','map':'accWt'}, 
					{name : 'uqc', type : 'string','map':'uom'}, 
					{name : 'sellingAccRate', type : 'float','map':'accSellingtRate'}, 
					{name : 'accValue', type : 'float','map':'accSellingAmount'}, 
					{name : 'accCostAmount', type : 'float','map':'dealerCostAmount'},
					{name : 'acceptRejN', type : 'float','map':'detailStatus'},
					{name : 'acceptRej', type : 'string',
						values : {
							source : dropdownListAdapterAcceptRej.records,
							value : 'id',
							name : 'name'
						},'map':'detailStatus'
					}, 
					{name : 'storeDCN', type : 'string','map':'storeOrDC'},
					{name : 'storeDC', type : 'string','map':'storeOrDC', values : {
						source : dropdownListAdapterStoreOrDC.records,
						value : 'id',
						name : 'name'
					} }, 
					{name : 'storeValue', type : 'string','map':'storeDTO>storeId'}, 
					{name : 'zoneValue', type : 'string','map':'zoneDTO>id'},
					{name : 'storeValueN', type : 'string','map':'storeDTO>name'}, 
					{name : 'zoneValueN', type : 'string','map':'zoneDTO>description'},
					{name : 'hsnID', type : 'string','map':'hsnMasterDTO>id'},
					{name : 'flag', type : 'float','map':'totalAmount'}
	           	];
	     
	var columns = [ 
			{text : 'IGR Sl. No.', datafield : 'grSlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{ text  :'','datafield': 'grEditID','width' : '5%',cellsalign : 'center', hidden:true,
				
				 cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
						var rows = $("#grStoneAccCreateGrid").jqxGrid("getrows");
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'grEditID',false);
	           	   }
			},
			{text : '', datafield : 'hsnID', width : '5%', cellsalign : 'center', align : 'center', editable : false,hidden:true}, 
			{text : 'Seg.', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Main Cat.', datafield : 'mainCat', width : '5%', height: '5%', cellsalign : 'center', align : 'center', editable : true,
		     cellbeginedit: function (row) {
				 var grEditID =  $("#grStoneAccCreateGrid").jqxGrid("getCellvalue", row , 'grEditID');
						 if(typeof grEditID == "undefined" || grEditID == null){
							    return true;
						}else{
								return false;
							}
			     },
			         columntype : 'dropdownlist',displayfield : 'mainCatN',	
				        	createeditor: function (row, cellvalue, editor) { 
				        			var rows = $("#grStoneAccCreateGrid").jqxGrid('getrows');
				        			$.getJSON("/OrderExecution/api/v1/grAccCreateLOV",function(data){
				        			var res = data.payload.category;
	          				
				        			editor.jqxDropDownList({ source: res, displayMember: 'name', valueMember: 'id'});
		  		       });        	          			
        	    },
        	    cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'subCat',null);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'subCatN',null);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'mainCat',newvalue.value);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'mainCatN',newvalue.label);
					
        	    }
			}, 
			{text : 'Shape/Sub Cat.', datafield : 'subCat', width : '7%', cellsalign : 'center', align : 'center', editable : true,
				columntype : 'dropdownlist',displayfield : 'subCatN',
				 cellbeginedit: function (row) {
					 var grEditID =  $("#grStoneAccCreateGrid").jqxGrid("getCellvalue", row , 'grEditID');
							 if(typeof grEditID == "undefined" || grEditID == null){
								    return true;
							}else{
									return false;
								}
				     },
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click', function(event){
  					var mainCat = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'mainCat');
  					if(mainCat !=""|| mainCat !=null){
				       $.getJSON("/OrderExecution/api/v1/getSubcategoryLOV?catId="+mainCat,function(data){
	          				var res = data.payload.subcategory;
	          		  		editor.jqxDropDownList({ source: res, displayMember: 'name', valueMember: 'id'});
		  		           })      
  				     }
				  })
        	    },
        	    cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var rows = $("#grStoneAccCreateGrid").jqxGrid('getrows');
					var newval = newvalue.value;
					if(newval != "" || newval != null){
					  $.getJSON("/OrderExecution/api/v1/subCategoryDetails?subcatId="+newval,function(data){
						if(data.resCode == 1){
	          				 var res = data.payload.code;
	          				 var res1= data.payload.uqc;
	          				 var res2= data.payload.accesorymasterId;
	          				 var res3= data.payload.hsnId;
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'accCode',res);
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'uqc',res1);
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'accId',res2);
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'hsnID',res3);
						}else if(data.resCode == 2){
							 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'accCode',"");
							$.growl.error({
								message : data.mesgStr,
								duration : 8000,
								title : 'Error'
							});
							return false;
						}
  		           });  
			   }
       	    },
			}, 
			{text : '', datafield : 'accId', width : '5%', cellsalign : 'center', align : 'center', editable : false,hidden:true}, 
			{text : 'Acc Code', datafield : 'accCode', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Dealer Cost Rate', datafield : 'dealerCostRate', width : '8%', cellsalign : 'center', align : 'center', editable : true,cellsformat : 'd2',
				 cellbeginedit: function (row) {
					 var grEditID =  $("#grStoneAccCreateGrid").jqxGrid("getCellvalue", row , 'grEditID');
							 if(typeof grEditID == "undefined" || grEditID == null){
								    return true;
							}else{
									return false;
								}
				     },
				     cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var rows = $("#grStoneAccCreateGrid").jqxGrid('getrows');
					var accId = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'accId');
					
					var fieldFilters={
							"fieldFilters":{
								"artId":accId,
							   "range":newvalue
					        }
					 }
					if(fieldFilters != "" || fieldFilters != null){
					  postJSON("/OrderExecution/api/v1/getAccDetailByAccMaster ",JSON.stringify(fieldFilters),function(data){
          				if(data.resCode == 1){
	          				var res = data.payload.accessoryDetail;
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'costRange',res.fromToCostRange);
	          				 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'sellingAccRate',res.sellingRate);
	          				 $("#saveGRFGEdit").prop("disabled",false);
							  }else{
								  $.growl.error({
										message : data.mesgStr,
										duration : 8000,
									});
								  $("#saveGRFGEdit").prop("disabled",true);
							  }
  		                });  
			        }
       	        },
			}, 
			{text : 'Cost Range', datafield : 'costRange', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Pcs', datafield : 'noOfPcs', width : '5%', cellsalign : 'center', align : 'center', editable : true,
				 cellbeginedit: function (row) {
					 var grEditID =  $("#grStoneAccCreateGrid").jqxGrid("getCellvalue", row , 'grEditID');
							 if(typeof grEditID == "undefined" || grEditID == null){
								    return true;
							}else{
									return false;
								}
				        },
				    cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var sellingAccRate = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'sellingAccRate');
					var dealerCostRate = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'dealerCostRate');
					var newval = newvalue*sellingAccRate;
					var newvalCost = newvalue*dealerCostRate;
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'accValue',newval);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'accCostAmount',newvalCost);
	   	         },
			}, 
			{text : 'Acc Wt', datafield : 'accWt', width : '5%', cellsalign : 'center', align : 'center', editable : true,cellsformat : 'd3',
				 cellbeginedit: function (row) {
					 var grEditID =  $("#grStoneAccCreateGrid").jqxGrid("getCellvalue", row , 'grEditID');
							 if(typeof grEditID == "undefined" || grEditID == null){
								    return true;
							}else{
									return false;
								}
				     },
			}, 
			{text : 'UQC', datafield : 'uqc', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Selling Acc Rate', datafield : 'sellingAccRate', width : '10%', cellsalign : 'center', align : 'center', editable : false,cellsformat : 'd2'}, 
			{text : 'Acc Value', datafield : 'accValue', width : '5%', cellsalign : 'center', align : 'center', editable : false,cellsformat : 'd3'}, 
			{text : 'Dealer Cost Amount', datafield : 'accCostAmount', width : '10%', cellsalign : 'center', align : 'center', editable : false,cellsformat : 'd3'}, 
			{text : 'Accept/Reject', datafield : 'acceptRej', width : '5%', cellsalign : 'center', align : 'center', editable : true, columntype : 'dropdownlist',displayfield : 'acceptRejN',
				 cellbeginedit: function (row) {
					 var grEditID =  $("#grStoneAccCreateGrid").jqxGrid("getCellvalue", row , 'grEditID');
							 if(typeof grEditID == "undefined" || grEditID == null){
								    return true;
							}else{
									return false;
								}
				     },createeditor : function(row, cellvalue,	editor) {
					editor.jqxDropDownList({
						source : acceptRej,
						placeHolder : '--Select--',
						displayMember : 'name',
						valueMember : 'id',
						dropDownWidth : 100
					});
				},				
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var newval = newvalue.label;
					if(newval == "Reject"){
						 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDC','DC');
						 $("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDCN',"DC");
					}else{
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDC',null);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDCN',null);
					}
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeValue',null);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeValueN',null);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'zoneValue',null);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'zoneValueN',null);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'acceptRej',newvalue.label);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'acceptRejN',newvalue.label);
	   	         },
		    },
			{text : 'Store/DC', datafield : 'storeDC', width : '5%', cellsalign : 'center', align : 'center', editable : true, columntype : 'dropdownlist',displayfield : 'storeDCN',
		    	cellbeginedit:function(row,columntype,displayfield) {
		    		var acceptRej = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'acceptRej');
		    		 if(acceptRej == "A"){
       					   return true;
		   			 }else{			  
		       			   return false;	
		       	   }
        	   },
        	   createeditor : function(row, cellvalue,	editor) {
        		   editor.on('click', function(){
        		   editor.jqxDropDownList({
						source : storeOrDC,
						placeHolder : '--Select--',
						displayMember : 'name',
						valueMember : 'id',
						dropDownWidth : 100
					});
        		   });
				},				
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var newval = newvalue.value;
					if(newval == "DC"){
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeValue',null);
						$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeValueN',null);
					}

					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'zoneValue',null);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'zoneValueN',null);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDC',newvalue.value);
					$("#grStoneAccCreateGrid").jqxGrid('setcellvalue', row, 'storeDCN',newvalue.label);
	   	         }
			}, 
			{text : 'Store', datafield : 'storeValue', width : '5%', cellsalign : 'center', align : 'center', editable : true,columntype : 'dropdownlist',displayfield : 'storeValueN',
				cellbeginedit:function(row,columntype,displayfield) {
					var storeDC = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'storeDC');
		    		 if(storeDC == "Store"){
      					   return true;
		   			 }else{			  
		       			   return false;	
		       	   }
        	   },
		    	createeditor: function (row, cellvalue, editor) { 
		    		editor.on('click', function(){
			    		var storeDC = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'storeDC');
						if(storeDC == "Store" && (storeDC !=""|| storeDC !=null)){
					       $.getJSON("/OrderExecution/api/v1/storeOrDcLOV?acceptRejectType="+storeDC,function(data){
		          				var res = data.payload.store;
			          		  		editor.jqxDropDownList({ source: res, displayMember: 'name', valueMember: 'id'});
			  		           });  
		  				  }
		    		}); 
        	   },
			}, 
			{text : 'Zone', datafield : 'zoneValue', width : '5%', cellsalign : 'center', align : 'center', editable : true,columntype : 'dropdownlist',displayfield : 'zoneValueN',
				cellbeginedit:function(row,columntype,displayfield) {
					var storeDC = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'storeDC');
		    		 if(storeDC == "DC"){
      					   return true;
		   			 }else{			  
		       			   return false;	
		       	   }
        	   },
        	   createeditor: function (row, cellvalue, editor) { 
        		   editor.on('click', function(){
	        		   var storeDC = $("#grStoneAccCreateGrid").jqxGrid('getcellvalue',row,'storeDC');
						if(storeDC == "DC" && (storeDC !=""|| storeDC !=null)){
					       $.getJSON("/OrderExecution/api/v1/storeOrDcLOV?acceptRejectType="+storeDC,function(data){
   	          					var res = data.payload.zone;
   	          					editor.jqxDropDownList({ source: res, displayMember: 'description', valueMember: 'id'});
 		  		           });      
     				   }
        		   });
       	        },
			}, 
			{text : '', datafield : 'flag', hidden: true, width : '5%', cellsalign : 'center', align : 'center', editable : true},
			{
				text : '',
				datafield : 'Delete',
				'width' : '4%',
				cellsalign : 'center',
				align:'center',
				formatoptions: {editbutton:false,delbutton:false},
				editable: false,
				cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
					var rows = $("#grStoneAccCreateGrid").jqxGrid("getrows");
					if(typeof rows != "undefined"){
						var id = rows[row].grEditID;
						 if(typeof id == "undefined" || id == null){
								return  "<button onclick='deleteAccGrEditDet("+row+")'  type='button' class='btn btn-primary btn-sm'><i class='fa fa-trash-o fa-md'></i></button>";
						}else{	
							return  "";
						}
					}
				
				}
			}
			];
	addGrid(datafields, columns, updateRows, data, "", '#grStoneAccCreateGrid');
	$("#grStoneAccCreateGrid").jqxGrid({
        height: 159,
        autoheight: true,
        columnsheight : 52,
		theme: 'energyblue',
        columnsresize : true,
        rowsheight: 21,
        pageable: true,
	});
}

var deleteAccGrEditDet = function(row){	
	id = $("#grStoneAccCreateGrid").jqxGrid('getrowid', row);
	$("#grStoneAccCreateGrid").jqxGrid('deleterow', id);		
}

// ################################# Add row in Edit Page ########################################

var rowId= 1;
var grSlNo  = 0;
var slNo;

var generaterowEditAcc = function(i) {
	var grEditID =  $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", i , 'grSlNo');
	if(typeof grEditID == "undefined" || grEditID == null){
		slNo = grSlNo+1;
	}else{
		slNo = parseInt(grEditID) + 1;
	}
	
	var row = {};
	row["grSlNo"] = slNo;
	row["grEditID"] = null;
	row["segment"] = "Accessory";
	row["mainCat"] = "";
	row["subCat"] = "";
	row["accCode"] = "";
	row["dealerCostRate"] = "";
	row["costRange"] = "";
	row["noOfPcs"] = "";
	row["accWt"] = "";
	row["uqc"] = "";
	row["sellingAccRate"] = "";
	row["accValue"] = "";
	row["accCostAmount"] = "";
	row["acceptRej"] = "";
	row["storeDC"] = "";
	row["storeValue"] = "";
	row["zoneValue"] = "";
	row["hsnID"] = "";
	return row;
}

$("#addRowSam").on('click',function(){
    var rowscount = $("#grStoneAccCreateGrid").jqxGrid('getdatainformation').rowscount;
	$("#grStoneAccCreateGrid").jqxGrid('addrow', null, generaterowEditAcc(rowscount-1));	
});

// ########################################### GR Acc Updation #####################################

$("#saveGRFGEdit").on("click",function(){
	var rowscount = $("#grStoneAccCreateGrid").jqxGrid('getdatainformation').rowscount;
	var accGrDet = [];
	
		var vendorInvNo = $("#vendorInvNo").val();
		var accPcs = $("#accPcs").val();
		var jobWorkerTypeC = $("#jobWorkerTypeC").val();
		var consignmentPeriod = $("#consignmentPeriod").val();
		var gstIn = $("#gstIn").val();
		var statusGr = $("#statusGr option:selected").text();
		var statusGrIDSelct = $("#statusGrIDSelct").val();
		 
		if((vendorInvNo==""||vendorInvNo== null)||(accPcs==""||accPcs== null)
			||(jobWorkerTypeC==""||jobWorkerTypeC== null)){
			$.growl.error({
				message : "Please Fill all the Manadatory Feilds!",
				duration : 8000,
				title : 'Error'
			});
			return false;
		}
		
		if($("#isRegisterId option:selected").text() == "Register"){
			if((gstIn==""||gstIn== null)){
				$.growl.error({
					message : "Please Fill GST In Feild!",
					duration : 8000,
					title : 'Error'
				});
				return false;
			}
		}else{
			if((statusGrIDSelct==""||statusGrIDSelct== null)){
				$.growl.error({
					message : "Please Fill Source Of State!",
					duration : 8000,
					title : 'Error'
				});
				return false;
			}
		}
		var jwltype = $('#jobWorkerTypeC').val()
		if(jwltype  != "D"){
			if(consignmentPeriod==""||consignmentPeriod== null){
				$.growl.error({
					message : "Please Fill consignment Period Feild",
					duration : 8000,
					title : 'Error'
				});
				return false;
			}
		}
		
		for (var i = 0; i < rowscount; i++) {
			var rows = $('#grStoneAccCreateGrid').jqxGrid('getrows');
			var grEditID = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "grEditID");
			
			 if( grEditID == "" || grEditID == null){
				 
			if ((rows[i].mainCat==""||rows[i].mainCat== null)||(rows[i].subCat==""||rows[i].subCat== null)||(rows[i].accCode==""||rows[i].accCode== null)
				||(rows[i].costRange==""||rows[i].costRange== null)||(rows[i].accWt==""||rows[i].accWt== null)||(rows[i].noOfPcs==""||rows[i].noOfPcs== null)
				||(rows[i].uqc==""||rows[i].uqc== null)||(rows[i].dealerCostRate==""||rows[i].dealerCostRate== null)||(rows[i].sellingAccRate==""||rows[i].sellingAccRate== null)
				||(rows[i].accCostAmount==""||rows[i].accCostAmount== null)||(rows[i].accValue==""||rows[i].accValue== null)||(rows[i].acceptRej==""||rows[i].acceptRej== null)
				||(rows[i].storeDC==""||rows[i].storeDC== null))
			{
				$.growl.error({
					message : "Please Fill all the Manadatory Grid Feilds.",
					duration : 8000,
					title : 'Error'
				});
				return false;
			}
			var accStatus = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "acceptRej");
			if(accStatus == "A"){
				if(rows[i].storeValue ==""|| rows[i].storeValue == null){
					$.growl.error({
						message : "Please Fill all Store Feild.",
						duration : 8000,
						title : 'Error'
					});
					return false;
				}
			}else{
				if(rows[i].zoneValue ==""|| rows[i].zoneValue == null){
					$.growl.error({
						message : "Please Fill all Zone Feild.",
						duration : 8000,
						title : 'Error'
					});
					return false;
				}
			}
	
	   accGrDet.push ({
		   
		 "serialNumber": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "grSlNo"),
	      "category": {
	        "id": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "mainCat"),
	      },
	      "subCategory": {
	        "id":  $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "subCat"),
	      },
	      "accCode": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "accCode"),
	      "accCostRangeSlab": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "costRange"),
	      "accWt": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "accWt"),
	      "accPcs": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "noOfPcs"),
	      "uom":$("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "uqc"),
	      "dealerCostRate": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "dealerCostRate"),
	      "accSellingtRate":$("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "sellingAccRate"),
	      "dealerCostAmount": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "accCostAmount"),
	      "accSellingAmount": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "accValue"),
	      "storeOrDC": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "storeDC"),
	      "storeDTO": {
	        "storeId": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "storeValue"),
	      },
	      "hsnMasterDTO": {
	        "id": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "hsnID"),
	      },
         "detailStatus": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "acceptRej"),
	     "zoneDTO": {"id": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "zoneValue"),
	      }
	});
	  }else{
		 
		}
		}
	  
	   var grAcc = {
	   "id" : $("#grId").val(),
	  "type":  "S",
	  "parcelDTO": {
	    "parcelId": $("#parcelIdC").val()
	  },
	  "jobWorkerType":  $("#jobWorkerTypeC").val(),
	  "consignmentPeriod":  $("#consignmentPeriod").val(),
	  "accSegmentDTO": {
	    "id": $("#segmentID").val()
	  },
	  "vendorDTO": {
	    "id":  $("#vendorCodeC").val()
	  },
	  "gstIn":$("#gstIn").val(),
	  "vendorInvDate": $("#grCreatedDtS").val(),
	  "vendorInvNo":$("#vendorInvNo").val(),
	  "stateId": ($("#gstIn").val() == null || $("#gstIn").val() =="")?statusGrIDSelct : ($("#statusGrID").val()),
	  "isRegister": ($("#isRegisterId").val()=="false")?false:true,
	  "totalPcs":$("#accPcs").val(),
	  "accGrDetailsDTO":accGrDet
	}
	
	postJSON('/OrderExecution/api/v1/createGRForAccessory', JSON.stringify(grAcc), function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : "GR For Accessory Is Updated Successfully.",
				duration : 8000,
				title : 'Success'
			});
			$("#addRowSam").prop("disabled",true);
			$("#saveGRFGEdit").prop("disabled",true);
		}else{
			$.growl.error({
				message : "Error on Updating GR For Accessory.",
				duration : 8000,
				title : 'Error'
			});
		 }
	});
})
// ############################################ On Change of GSTIN Loading the Status Feild #####################################

$("#gstIn").on("change",function(arr){
	var gstn = $("#gstIn option:selected").text();
	var vendor = $("#vendorCodeC").val();
	var fieldFilters={
			  "fieldFilters": {
				    "vendorId": vendor,
				    "gstIn": gstn
				  }
			}
		 postJSON("/OrderExecution/api/v1/getStateByGstin",JSON.stringify(fieldFilters),function(data){
		 var accGrDetailsDTO = data.payload.AccessoryGr.name;
		 var AccessoryGr = data.payload.AccessoryGr.id;
		$("#statusGr").val(accGrDetailsDTO);
		$("#statusGrID").val(AccessoryGr);
  });
});


$("#toggle1").on('click', function(){
	$("#panel1").toggle();
});


$("#toggle2").on('click', function(){
	$("#panel2").toggle();
});


$("#toggle3").on('click', function(){
	$("#panel3").toggle();
});

// ################################ GR Tally ####################################################
var parcelDetails = function(data){
	
	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
       
	    	 { name: 'parcelNumber', type: 'int', map: 'parcelDTO>parcelId' },
	         { name: 'vendorCode', type: 'string', map: 'vendorDTO>vendorCode' },
	         { name: 'invoiceNumber', type: 'int', map: 'vendorInvNo' },	         
	         { name: 'invoiceDate', type: 'date', map: 'vendorInvDate' },
	         { name: 'accessoryPcs', type: 'int', map: 'totalPcs' },
	         { name: 'invoiceValue', type: 'float', map: 'totalamount' },	        
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#parcelDetails").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 60,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
		showtoolbar : true,
        source: dataAdapter, 
        showstatusbar: true,
	    statusbarheight: 50,
	    showaggregates: true,
        columns: [
        	{ text: 'Parcel Number', datafield: 'parcelNumber', width: '15%', cellsalign : 'center',sortable : true, menu : true, align:'center' },
            { text: 'Vendor Code', datafield: 'vendorCode', width: '15%', cellsalign : 'center',sortable : false, menu : false, align:'center'},
            { text: 'Invoice Number', datafield: 'invoiceNumber', width: '15%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
            { text: 'Invoice Date', datafield: 'invoiceDate', width: '15%', cellsalign : 'center',sortable : true, menu : true, align:'center', cellsformat : 'dd/MM/yyyy' },
            { text: 'Accessory Pcs', datafield: 'accessoryPcs', width: '20%', cellsalign : 'center', align:'center'},
            { text: 'Invoice Value', datafield: 'invoiceValue', width: '20%', cellsalign : 'center', align:'center', cellsformat: 'd3', sortable : false}
        ]
    });
}


//Adjustment Details Grid No 4 ************##################################****************
var accDetails = function(data){
	
	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'grValue', type: 'int', map: 'grNo' },
            { name: 'mainCat', type: 'string', map: 'category>description' },
            { name: 'subCat', type: 'string', map: 'subCategory>description' },
            { name: 'accCode', type: 'string', map: 'accCode' },
            { name: 'pcs', type: 'int', map: 'accPcs' },
            { name: 'weight', type: 'float', map: 'accWt' },
            { name: 'uqc', type: 'string', map: 'uom' },
            { name: 'costRate', type: 'float', map: 'dealerCostRate' },
            { name: 'costAmount', type: 'float', map: 'dealerCostAmount' },

            { name: 'igstPer', type: 'string', map: 'igstPercent' },
            { name: 'igstAmt', type: 'float', map: 'igstAmount' },
            { name: 'cgstPer', type: 'string', map: 'cgstPercent' },
            { name: 'cgstAmt', type: 'float', map: 'cgstAmount' },
            { name: 'sgstPer', type: 'string', map: 'sgstPercent' },
            { name: 'sgstAmt', type: 'float', map: 'sgstAmount' },
            { name: 'cessPer', type: 'string', map: 'cessPercent' },
            { name: 'cessAmt', type: 'float', map: 'cessAmount' },
            { name: 'total', type: 'float', map: 'totalAmount' }
            
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#accDetails").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 60,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
		showtoolbar : true,
        source: dataAdapter,
        showstatusbar: true,
	    statusbarheight: 50,
	    showaggregates: true,
        columns: [
          { text: 'IGR#', datafield: 'grValue', width: '5%', cellsalign : 'center',sortable : true, menu : true, align:'center'},
          { text: 'Main Cat', datafield: 'mainCat', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
          { text: 'Sub Cat', datafield: 'subCat', width: '8%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
          { text: 'Acc Code', datafield: 'accCode', width: '6%', cellsalign : 'center',sortable : false, menu : false, align:'center'},
          { text: 'Pcs', datafield: 'pcs', width: '4%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Weight', datafield: 'weight', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd3',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['weight'] == null) ? 0 : parseFloat(record['weight']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          },
          { text: 'UQC', datafield: 'uqc', width: '4%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Dealer Cost Rate', datafield: 'costRate', cellsformat: 'd2', width: '7%',sortable : false, menu : false, cellsalign : 'center', align:'center',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['costRate'] == null) ? 0 : parseFloat(record['costRate']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          },
          { text: 'Dealer Cost Amount', datafield: 'costAmount', cellsformat: 'd2', width: '7%',sortable : false, menu : false, cellsalign : 'center', align:'center',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['costAmount'] == null) ? 0 : parseFloat(record['costAmount']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          },
          
          { text: '%', datafield: 'igstPer', columngroup: 'igst', width: '5%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd2',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['igstPer'] == null) ? 0 : parseFloat(record['igstPer']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          
          },
          { text: 'Amt Rs', datafield: 'igstAmt', cellsformat: 'd2', columngroup: 'igst', width: '5%',sortable : false, menu : false, cellsalign : 'center', align:'center',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['igstAmt'] == null) ? 0 : parseFloat(record['igstAmt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          
          },
          { text: '%', datafield: 'cgstPer', columngroup: 'cgst', width: '5%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd2',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['cgstPer'] == null) ? 0 : parseFloat(record['cgstPer']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          },
          { text: 'Amt Rs', datafield: 'cgstAmt', cellsformat: 'd2', columngroup: 'cgst', width: '5%',sortable : false, menu : false, cellsalign : 'center', align:'center',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['cgstAmt'] == null) ? 0 : parseFloat(record['cgstAmt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          },
          { text: '%', datafield: 'sgstPer', columngroup: 'sgst', width: '5%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd2',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['sgstPer'] == null) ? 0 : parseFloat(record['sgstPer']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          },
          { text: 'Amt Rs', datafield: 'sgstAmt', columngroup: 'sgst', width: '5%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd2',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['sgstAmt'] == null) ? 0 : parseFloat(record['sgstAmt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          },
          { text: '%', datafield: 'cessPer', columngroup: 'cess', width: '5%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd2',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['cessPer'] == null) ? 0 : parseFloat(record['cessPer']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          },
          { text: 'Amt Rs', datafield: 'cessAmt', columngroup: 'cess', width: '5%',sortable : false, menu : false, cellsalign : 'center', align:'center',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['cessAmt'] == null) ? 0 : parseFloat(record['cessAmt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          },
          { text: 'Total', datafield: 'total', width: '5%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd2',
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['total'] == null) ? 0 : parseFloat(record['total']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	   } 
           }
        ],
        columngroups:
            [
            	{ text: 'IGST', align: 'center', name: 'igst' },
            	{ text: 'CGST', align: 'center', name: 'cgst' },
            	{ text: 'SGST', align: 'center', name: 'sgst' },
            	{ text: 'CESS', align: 'center', name: 'cess' }
            ]
    });
}
var grDetArrS = [];
var grDetId = [];
$("#grTally").on('click', function(){
	
	var rows = $("#grDetailsList").jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var response = rows[i].actionId;
		
		grDetId.push(response);
	}
	
	var fieldFilters={
		  "fieldFilters": {
		   "parcelId":$("#parcelId").val(),
		   "grdetailIds":grDetId.join(",")
		  }
		}
	 postJSON("/OrderExecution/api/v1/grBillTally ",JSON.stringify(fieldFilters),function(data){
		 if(data.resCode =="1"){
			 var parcel = data.payload.GrHeader;
				grDetArrS = [];
				grDetArrS.push(parcel);
				var AccessoryGr = data.payload.AccessoryGr;
				parcelDetails(grDetArrS);
				accDetails(AccessoryGr);
				//returnDetails(mivList);
		 }else{
			 $.growl.error({
					message : data.mesgStr,
					duration : 8000,
					title : 'Error'
				});
		 }
			
	 });
})  

//############################## GR Completion ###############################

$("#completeMrvProcess").on("click",function(){
	var fieldFilters={
		  "fieldFilters": {
		   "parcelId":$("#parcelId").val(),
		  }
		}
	 postJSON("/OrderExecution/api/v1/completeAccGr",JSON.stringify(fieldFilters),function(data){
		 if(data.resCode == 1){
				$.growl.notice({
					message : "Gr completed Successfully",
					duration : 8000,
					title : 'Success'
				});
				redirect();
		    }else{
				$.growl.error({
					message : "Error on Gr completion.",
					duration : 8000,
					title : 'Error'
				});
			}
	 });
})


var NVL = function(source, replaceMentValue){
	if(typeof source != "undefined" && source != null && source != ""){
		return source;
	}
	else return replaceMentValue;
}