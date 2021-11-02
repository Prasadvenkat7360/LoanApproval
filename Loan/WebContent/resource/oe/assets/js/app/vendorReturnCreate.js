/*
 *  ##	Author (UI)    :   Dipankar Naha
	##	Author (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Nageswara  Rao 
	##	Date Creation 	: 	12-01-2018
*/
var lineItemCtC = 0.00;

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

$("#loading").hide();
//loadPermission();

var globalMcPerc;
var globalMcDebit;
var globalWastagePerc ;
var globalWastageDebitAmt;
var globalWastageDebitWt;
var globalvendorCostDebit;

$("#gridTabs").hide();
$("#backFromCreate").hide();
$("#SearchPageCreateId").show();
$("#vendorCreateHide").hide();
$("#vendorSearchHide").show();
$("#hideCreateId").hide();
$("#hideSearchId").show();
$("#grvTypePacketFlag").hide();

$("#backFromCreate").on("click",function(){
	$("#backFromCreate").hide();
	$("#vendorCreateHide").hide();
	$("#hideCreateId").hide();
	
	$("#hideSearchId").show();
	$("#vendorSearchHide").show();
	$("#SearchPageCreateId").show();
	
	$("#tabGrDet").hide();
	$("#jqxgridV").hide();
	$("#jqxgridS").hide();
	$("#jqxgridA").hide();
	redirect();
});

$("#tabGrDet").hide();
$("#jqxgridV").hide();
$("#jqxgridS").hide();
$("#jqxgridA").hide();
$("#jqxgridTax").hide();

$("#saveVendorReturn").hide();
$("#clearForm").hide();
$("#matTypec").prop("disabled",false);
$("#segmentC").prop("disabled",false);
$("#metalLocC").prop("disabled",false);
$("#saveVendorReturn").prop("disabled",true);

$(".tabDisabledA").addClass("tabDisabled");
$("#tabGrDet").tabs({
	disabled:[]
});

$("#matTypeC").on("change",function(){
	
	var matTypec = $("#matTypeC").val();
	if(matTypec =="F"){
		$("#metalTypeCHide").show()
		$("#categoryHide").hide();
	}else{
		$("#categoryHide").show();
		$("#metalTypeCHide").hide()
	}
	if(matTypec == "A"){
		$("#metalLocCId").hide();
	}else{
		$("#metalLocCId").show();
	}
});

//############################# date picker functions ###############

$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});
var updateTaxDetails = function(value){
	var taxRows =  $("#jqxgridTax").jqxGrid("getrows");
	if(typeof taxRows != "undefined" && taxRows.length > 0)
	{
		for(var i=0; i<taxRows.length; i++){
			var cgstAmt = ((taxRows[i].cgstPrc*parseFloat(value))/100).toFixed(2);
			var sgstAmt = ((taxRows[i].sgstPrc*parseFloat(value))/100).toFixed(2);
			var cessAmt = ((taxRows[i].cessPrc*parseFloat(value))/100).toFixed(2);
			var igstAmt = ((taxRows[i].igstPrc*parseFloat(value))/100).toFixed(2);
			
			$("#jqxgridTax").jqxGrid('setcellvalue', i, 'cgstAmt',cgstAmt);
			$("#jqxgridTax").jqxGrid('setcellvalue', i, 'sgstAmt',sgstAmt);
			$("#jqxgridTax").jqxGrid('setcellvalue', i, 'igstAmt',igstAmt);
			$("#jqxgridTax").jqxGrid('setcellvalue', i, 'cessAmt',cessAmt);
		} 
		var rowDet = $("#jqxgridV").jqxGrid('getrows');
		$.each(rowDet,function(k,v){
			$("#jqxgridV").jqxGrid('setcellvalue',k,'vendorItemAmt',value);
	    }); 
		
	}
}

function validateNumber(val) {	
		var mrvTypeId = $("#mrvTypeId").val();
		var value = parseFloat(val).toFixed(2);
		if(mrvTypeId == "Dealer"){
			updateTaxDetails(value)
		}
		return value;	
};
function validateNumberFixedThree(val) {	
		return parseFloat(val).toFixed(3);	
};
function validateNumberS(val) {
	var regex = /^\d{0,9}(d{0,0})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseInt(val);
	}
	return '';
};
$("#SearchPageCreateId").on("click",function(){
	
	$("#categoryHide").hide();
	$("#backFromCreate").show();
	$("#vendorCreateHide").show();
	$("#hideCreateId").show();
	
	$("#hideSearchId").hide();
	$("#vendorSearchHide").hide();
	$("#SearchPageCreateId").hide();
	
	$("#matTypeC").prop("disabled",false);
	$("#segmentC").prop("disabled",false);
	$("#vendorCodeC").prop("disabled",false);
	$("#metalLocC").prop("disabled",false);
	
	
	$('#vendorReturnCretForm').trigger("reset");
	
	$("#tabGrDet").hide();
	$("#jqxgridV").hide();
	$("#jqxgridA").hide();
	$("#jqxgridS").hide();
	$("#jqxgridTax").hide();
	
	$("#refTypeNoIDHide").hide();
	$("#refTypeNoID").hide();
	$("#SearchVendorMAsterC").hide();
	$("#addDetails").hide();
	
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	output = (day<10 ? '0' : '') + day+ '/' +
    (month<10 ? '0' : '') + month + '/' +d.getFullYear();
	$("#dateC").val(output);
	onLoadFunction();
});

var	mrvTypeArray = [{
	   "id": "Sub-Contract",
       "name": "Sub-Contract",
     },{
     	 "id": "Dealer",
	     "name": "Dealer",
     }]

var headerDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'refType','type' : 'string'},
			{'name' : 'refNo','type' : 'long'}, 
			{'name' : 'refSlNo','type' : 'long'},
			{'name' : 'mrvType','type' : 'string','map':''},
			{'name' : 'seghide','type' : 'string','map':''},
			{'name' : 'segHiddenCodeID','type' : 'string','map':''},
			{'name' : 'seg','type' : 'string','map':''}, 
			{'name' : 'jewelCode','type' : 'string','map':''},
			{'name' : 'jewelCodehide','type' : 'string','map':''},
			{'name' : 'pcs','type' : 'int','map':''}, 
			{'name' : 'gWt','type' : 'float','map':''},
			{'name' : 'nWt','type' : 'float','map':''},
			{'name' : 'purity','type' : 'float','map':''}, 
			{'name' : 'fullyOrPartially','type' : 'float','map':''},
			{'name' : 'metalRate','type' : 'float','map':''},
			{'name' : 'metalCost','type' : 'float','map':''},
			{'name' : 'metalTotalCost','type' : 'float','map':''}, 
			{'name' : 'wastgeWt','type' : 'float','map':''}, 
			{'name' : 'wastgeAmt','type' : 'float','map':''}, 
			{'name' : 'wastagePerc','type' : 'float','map':''},
			{'name' : 'wastageAmtDeb','type' : 'float','map':''},
			{'name' : 'mcPerc','type' : 'float','map':''}, 
			{'name' : 'wastageFullyPC','type' : 'string','map':''},
			{'name' : 'meltingPurity','type' : 'string'}, 
			{'name' : 'mcDebit','type' : 'float','map':''},
			{'name' : 'makingCharge','type' : 'float','map':''},
			{'name' : 'vendorItemAmt','type' : 'float','map':''},
			{'name' : 'lineItemCostC','type' : 'float','map':''},
			{'name' : 'costCode','type' : 'string'},
			{'name' : 'standardMetalRate','type' : 'float'},
			{'name' : 'standardMetalCost','type' : 'float'},
			{'name' : 'wastageDebitWt','type' : 'float'},
			{'name' : 'pbItemAmt','type' : 'float'},
			{'name' : 'mrvNo','type' : 'float'},
			{'name' : 'mrvSlNo','type' : 'float'},
			{'name' : 'metalTypeId','type' : 'float'},
			{'name' : 'costCode','type' : 'float'},
			{'name' : 'serialNo','type' : 'float'},
			{'name' : 'mcFullyPartiallyC','type' : 'float'},
			{'name' : 'metalLocation','type' : 'float'},
			{'name' : 'selectionStatus','type' : 'bool'},
			{'name' : 'vendorCode','type' : 'string'},
			{'name' : 'viAmtOrg','type' : 'float'},
			{'name' : 'debitFlag','type' : 'string'},
			{'name' : 'wastageDebitWt','type' : 'float'},

		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 70,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Vendor Return Details');
		},
		columns : [
			{'text' : 'SerialNo', "datafield" : 'serialNo','width' : '4%',editable : false},
			{'text' : 'Vendor Code', "datafield" : 'vendorCode','width' : '6%',editable : false},
			{'text' : 'Cost Code', "datafield" : 'costCode','width' : '6%',hidden:true,editable : false},
			{'text' : 'Debit Flag', "datafield" : 'debitFlag','width' : '6%',hidden:true,editable : false},

			{'text' : 'Ref Type','datafield' : 'refType','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Ref No','datafield' : 'refNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Sl No','datafield' : 'refSlNo','width' : '5%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'MRV Type','datafield' : 'mrvType','width' : '6%',sortable : false,editable : true,cellsalign : 'center',align : 'center',displayfield : 'mrvType',columntype :'dropdownlist',
				initeditor : function(row, value, editor) {
					var grvObj = { "id": "Dealer","name": "Dealer"}
					var grvType = [];
					grvType.push(grvObj);
					editor.on('click', function(event){	
						
						console.log(grvType);
						editor.jqxDropDownList({ source: grvType , displayMember: 'name', valueMember: 'id'});
					});
				},
				cellbeginedit : function(row){
					 var matType = $("#matTypeC").val();
					 var refType = $("#jqxgridV").jqxGrid('getcellvalue',row,'refType');
					if((matType == "S" || matType == "A") && refType == "Purchase Bill"){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
				},
			},
			{'text' : '','datafield' : 'seghide','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : 'vi org','datafield' : 'viAmtOrg','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},

			{'text' : 'Segment','datafield' : 'seg','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Jewel Code','datafield' : 'jewelCode','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : '','datafield' : 'jewelCodehide','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : 'Pcs',	'datafield' : 'pcs','width' : '4%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Making Charges','datafield' : 'makingCharge','width' : '5%',	sortable : false,editable : false,	cellsalign : 'right',	align : 'center',hidden:true,cellsformat :'d2'},
			{'text' : 'Gross Wt','datafield' : 'gWt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'Net Wt','datafield' : 'nWt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'Purity',	'datafield' : 'purity','width' : '6%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Line Item Cost',	'datafield' : 'lineItemCostC','width' : '6%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			//{'text' : 'Vendor Debit Amt',	'datafield' : 'wastageDebitWt','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Metal Rate','datafield' : 'metalRate',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '6%',cellsformat : 'd2'},
			{'text' : 'Metal Cost','datafield' : 'metalCost','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'MC/Total Cost','datafield' : 'metalTotalCost','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'MC Full/Partial','datafield' : 'mcFullyPartiallyC','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'MC %','datafield' : 'mcPerc','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'MC Debited','datafield' : 'mcDebit','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd2'},
			{'text' : 'Wastage Wt.','datafield' : 'wastgeWt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd3'},
			{'text' : 'Wastage Amt.','datafield' : 'wastgeAmt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd2'},
			{'text' : 'Wastage Full/Partial','datafield' : 'wastageFullyPC','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Wastage %',	'datafield' : 'wastagePerc','width' : '5%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Wastage Wt Debited',	'datafield' : 'wastageDebitWt','width' : '5%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},

			{'text' : 'Wastage Amt Debited','datafield' : 'wastageAmtDeb',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '5%',cellsformat : 'd2'},
			{'text' : 'Item Amt','datafield' : 'vendorItemAmt','width' : '10%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			//{'text' : 'Item Amt','datafield' : 'wastageDebitWt','width' : '6%',sortable : false}
		]
	});
};

//####################### stone search grid ######################
var accCostForPb = 0.00;
var stoneCostForPb = 0.00;
var stoneDetailsGrid = function(data){
	console.log(data);
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'refDocType','type' : 'string'},
			{'name' : 'refDocNo','type' : 'long'}, 
			{'name' : 'slNo','type' : 'long'}, 
			{'name' : 'stSuppBy','type' : 'string'},
			{'name' : 'seg','type' : 'string'},
			{'name' : 'segId','type' : 'string'},
			{'name' : 'mainCat','type' : 'string'}, 
			{'name' : 'mainCatId','type' : 'string'}, 
			{'name' : 'subCatOrShape','type' : 'string'},
			{'name' : 'subCatOrShapeId','type' : 'string'},
			{'name' : 'shapeDes','type' : 'string'},
			{'name' : 'shapeId','type' : 'string'},
			{'name' : 'stCode','type' : 'string'},
			{'name' : 'clarity','type' : 'string'},
			{'name' : 'serialNumber','type' : 'string'},
			//{'name' : 'hsnCode','type' : 'string'}, 
			{'name' : 'meltingPurity','type' : 'string'}, 
			{'name' : 'actCol','type' : 'string'},
			{'name' : 'color','type' : 'string'},
			{'name' : 'cutGrade','type' : 'string'}, 
			{'name' : 'wtRange','type' : 'string'},
			{'name' : 'pcs','type' : 'long'},
			{'name' : 'stWt','type' : 'float'}, 
			{'name' : 'uqc','type' : 'string'},
			{'name' : 'subCategoryDesc','type' : 'string'},
			
			{'name' : 'stRate','type' : 'float'},
			{'name' : 'vendStCost','type' : 'float'},
			{'name' : 'vendPercDeb','type' : 'float'},
			{'name' : 'vendPercDebOrg','type' : 'float','map':'vendPercDeb'},

			{'name' : 'vendCostDeb','type' : 'float'}, 
			{'name' : 'vendCostDebOrg','type' : 'float','map':'vendCostDeb'}, 

			{'name' : 'stoneEditFlag','type' : 'string'},
			{'name' : 'costCode','type' : 'string'},
			{'name':'jwType','type':'string'},
			{'name' : 'debitFlag','type' : 'string'},


		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridS").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 70,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stones Details');
		},
		
		columns : [
			{'text' : '','datafield' : 'stoneEditFlag',hidden:true},
			{'text' : '','datafield' : 'costCode',hidden:true},
			{'text' : '','datafield' : 'jwType',hidden:true},
			{'text' : '','datafield' : 'vendPercDebOrg',hidden:true},
			{'text' : '','datafield' : 'debitFlag',hidden:true},

			{'text' : 'Serial Number','datafield' : 'serialNumber','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Type','datafield' : 'refDocType','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Ref No','datafield' : 'refDocNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Ref Sl No','datafield' : 'slNo','width' : '5%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			//{'text' : 'Stone Supplied By','datafield' : 'stSuppBy','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Segment','datafield' : 'seg','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Main Cat',	'datafield' : 'mainCat','width' : '7%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat','datafield' : 'subCatOrShape',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Sub Cat Desc','datafield' : 'subCategoryDesc',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Shape','datafield' : 'shapeDes',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%'},
			
			{'text' : 'Stone Code','datafield' : 'stCode','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Actual Color','datafield' : 'actCol','width' : '6%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Color','datafield' : 'color','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Wt/Cost Range',	'datafield' : 'wtRange','width' : '7%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '5%'},
			
			{'text' : 'Stone Wt.','datafield' : 'stWt','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Stone Rate','datafield' : 'stRate','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Stone Cost','datafield' : 'vendStCost','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Stone % Debited','datafield' : 'vendPercDeb','width' : '7%',sortable : true,editable : true,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellbeginedit:function(row,columntype,displayfield) {
					 var refType = $("#jqxgridS").jqxGrid("getcellvalue",row,"refDocType");
         			 var mrvType = $("#jqxgridS").jqxGrid("getcellvalue",row,"jwType");
         			 console.log(mrvType);

					 if(refType != "Goods Reciepts"){
	          			 var costCode = $("#jqxgridS").jqxGrid("getcellvalue",row,"costCode");
						     if(costCode == "Total Cost"){
		     					  return false;
		 				     }else if($("#matTypeC").val() == "S" && mrvType == "Consignment"){
			          			 return false;
			          		 }else if(mrvType == "Consignment"){
			          			 return false;
			          		 }else{			  
		     					 return true;	
			          		 }
	          		 }
	          		 else{
	          			 return false;	
	          		 }
	      	  },
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var vendAccCost = $("#jqxgridS").jqxGrid("getcellvalue",row,"vendStCost");
					var vendorCostDebit = (vendAccCost * newvalue)/100;					   
					$("#jqxgridS").jqxGrid('setcellvalue',row,'vendCostDeb',vendorCostDebit);
							
	     			var vendPercDebOrg = $("#jqxgridS").jqxGrid("getcellvalue",row,"vendPercDebOrg");
	     			var vendPercDeb = $("#jqxgridS").jqxGrid("getcellvalue",row,"vendPercDeb");
		         		
					var refDocType = $("#jqxgridS").jqxGrid("getcellvalue",row,"refDocType");
					var refDocNo = $("#jqxgridS").jqxGrid("getcellvalue",row,"refDocNo");
					//var refDocSlNo = $("#jqxgridS").jqxGrid("getcellvalue",row,"slNo");
					var refDocSlNo = $("#jqxgridS").jqxGrid("getcellvalue",row,"slNo");

						if( refDocType != "Purchase Bill"){
							//var mcDebAmnt = $("#mcDebitedC").val();
							calculateVendItemAmt(refDocNo,refDocSlNo);
							
						  // Tax Calculation
					        var taxDetUpdated= [];
						    var rowsT = $("#jqxgridTax").jqxGrid('getrows');

					        console.log(rowsT);
					        var vendCostDeb1 =  $("#jqxgridS").jqxGrid("getcellvalue",row,"vendCostDeb");
					        var refDocNo =  $("#jqxgridS").jqxGrid("getcellvalue",row,"refDocNo");
					        var stoneSlNum =  $("#jqxgridS").jqxGrid("getcellvalue",row,"serialNumber");

					        $.each(rowsT,function(k,v){
					        	console.log(v);
					        	if(v.stoneSrlNo == stoneSlNum && v.refDocNo == refDocNo){
					        		if(v.igstPrc != null){
						        		v.igstAmt = (v.igstPrc * vendCostDeb1)/100;
					        		}else{
						        		v.igstAmt = 0.00;
					        		}
					        		
					        		if(v.cgstPrc != null){
						        		v.cgstAmt = (v.cgstPrc * vendCostDeb1)/100;
					        		}else{
						        		v.cgstAmt = 0.00;
					        		}
					        		
					        		if(v.sgstPrc != null){
						        		v.sgstAmt = (v.sgstPrc * vendCostDeb1)/100;
					        		}else{
					        			v.sgstAmt = 0.00;
					        		}
					        		
					        		if(v.cessPrc != null){
						        		v.cessAmt = (v.cessPrc * vendCostDeb1)/100;
					        		}else{
						        		v.cessAmt = 0.00;
					        		}
					        	}
					        	
					        	else if(v.refDocNo == refDocNo && v.accSrlNo == null && v.stoneSrlNo == null && v.refDocType != "Stock"){
					        		var lineItemCtC = 0.00;
					        		var mainGrid = $("#jqxgridV").jqxGrid('getrows');
					        		$.each(mainGrid,function(key,val){
					        			if(refDocNo == val.refNo &&  val.costCode != "Manufacture"){
					        				lineItemCtC = val.mcDebit;
					        			}else{
					        				lineItemCtC = val.vendorItemAmt;
					        			}
					        		});
					        		
					        		if(v.igstPrc != null){
						        		v.igstAmt = (v.igstPrc * lineItemCtC)/100;
					        		}else{
						        		v.igstAmt = 0.00;
					        		}
					        		
					        		if(v.cgstPrc != null){
					        			v.cgstAmt = (v.cgstPrc * lineItemCtC)/100;
					        		}else{
						        		v.cgstAmt = 0.00;
					        		}
					        		
					        		if(v.sgstPrc != null){
					        			v.sgstAmt = (v.sgstPrc * lineItemCtC)/100;
					        		}else{
					        			v.sgstAmt = 0.00;
					        		}
					        		
					        		if(v.cessPrc != null){
					        			v.cessAmt = (v.cessPrc * lineItemCtC)/100;
					        		}else{
						        		v.cessAmt = 0.00;
					        		}
					        	}
					        	else if(v.refDocNo == refDocNo && v.accSrlNo == null && v.stoneSrlNo == null && v.refDocType == "Stock"){
					        		var lineItemCtC = 0.00;

					        		var mainGrid = $("#jqxgridV").jqxGrid('getrows');
					        		$.each(mainGrid,function(key,val){
					        			if(refDocNo == val.refNo &&  val.costCode != "Manufacture"){
					        				lineItemCtC = val.mcDebit;
					        			}else{
					        				lineItemCtC = val.vendorItemAmt;
					        			}
					        		});
					        		if(v.igstPrc != null){
						        		v.igstAmt = (v.igstPrc * lineItemCtC)/100;
					        		}else{
						        		v.igstAmt = 0.00;
					        		}
					        		
					        		if(v.cgstPrc != null){
					        			v.cgstAmt = (v.cgstPrc * lineItemCtC)/100;
					        		}else{
						        		v.cgstAmt = 0.00;
					        		}
					        		
					        		if(v.sgstPrc != null){
					        			v.sgstAmt = (v.sgstPrc * lineItemCtC)/100;
					        		}else{
					        			v.sgstAmt = 0.00;
					        		}
					        		
					        		if(v.cessPrc != null){
					        			v.cessAmt = (v.cessPrc * lineItemCtC)/100;
					        		}else{
						        		v.cessAmt = 0.00;
					        		}
					        	}
					        	console.log(v);
					        	taxDetUpdated.push(v);
					        	taxDetailsGrid(taxDetUpdated);
					        });
						}else{
							calculatePbValues(row, newvalue,datafield);
						}
		      	   }, 
			},
			{'text' : 'Stone Cost Debited','datafield' : 'vendCostDeb','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'}
		]
	});
}

//################# Acc Grid ##########################

var accDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'serialNumber','type' : 'string'},
			{'name' : 'refDocType','type' : 'string'},
			{'name' : 'refDocNo','type' : 'long'}, 
			{'name' : 'accSlNo','type' : 'long'}, 
			{'name' : 'accSuppBy','type' : 'string'},
			{'name' : 'accSeg','type' : 'string'},
			{'name' : 'accSegId','type' : 'string'},
			{'name' : 'subCategoryDesc','type' : 'string'},
			{'name' : 'accMainCat','type' : 'string'}, 
			{'name' : 'accMainCatId','type' : 'string'}, 
			{'name' : 'accSubCatOrShapeID','type' : 'string'},
			{'name' : 'accSubCatOrShape','type' : 'string'},
			{'name' : 'accCode','type' : 'string'},
			{'name' : 'shapeDes','type' : 'string'},
			{'name' : 'shapeId','type' : 'string'},
			{'name' : 'accPcs','type' : 'long'},
			{'name' : 'accWt','type' : 'float'}, 
			{'name' : 'accUqc','type' : 'string'},
			{'name' : 'accRate','type' : 'float'},
			{'name' : 'vendAccCost','type' : 'float'},
			{'name' : 'vendAccPercDeb','type' : 'float'},
			{'name' : 'vendPercDebOrg','type' : 'float','map':'vendAccPercDeb'},

			{'name' : 'vendAccCostDeb','type' : 'float'}, 
			{'name' : 'accEditFlag','type' : 'string'},
			{'name' : 'costCode','type' : 'string'},
			{'name':'jwType','type':'string'},
			{'name' : 'vendAccCostDebOrg','type' : 'float','map':'vendAccCostDeb'}, 


		]
	};

var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridA").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		theme: 'energyblue',
		columnsheight : 70,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Accessory Details');
		},
		columns : [
			{'text' : '','datafield' :'accEditFlag',hidden:true},
			{'text' : '','datafield' : 'costCode',hidden:true},
			{'text' : '','datafield' : 'jwType',hidden:true},
			{'text' : '','datafield' : 'vendPercDebOrg',hidden:true},
			{'text' : '','datafield' : 'vendAccCostDebOrg',hidden:true},

			{'text' : 'Serial Number','datafield' : 'serialNumber','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Type','datafield' : 'refDocType','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Ref No','datafield' : 'refDocNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Ref Sl No','datafield' : 'accSlNo','width' : '6%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Seg','datafield' : 'accSeg','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Main Cat',	'datafield' : 'accMainCat','width' : '7%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat','datafield' : 'accSubCatOrShapeID',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'Sub Cat Des','datafield' : 'subCategoryDesc',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Acc Code','datafield' : 'accCode','width' : '7%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Pcs','datafield' : 'accPcs','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '7%',	sortable : false,editable : false,	cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'accUqc','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Rate','datafield' : 'accRate','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Cost',	'datafield' : 'vendAccCost','width' : '9%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc % Debited','datafield' : 'vendAccPercDeb',editable : true,cellsalign : 'right',	align : 'center',sortable : false,'width' : '9%',cellsformat : 'd2',
				cellbeginedit:function(row,columntype,displayfield) {
					var refTypeC = $("#jqxgridA").jqxGrid("getcellvalue",row,"refDocType");
         			 var mrvType = $("#jqxgridA").jqxGrid("getcellvalue",row,"jwType");

         			 console.log(mrvType);
	          		 if(refTypeC != "Goods Reciepts"){
	          			 var costCode = $("#jqxgridA").jqxGrid("getcellvalue",row,"costCode");
						     if(costCode == "Total Cost"){
		     					  return false;
		 				     }else if(mrvType == "Consignment"){
			          			 return false;
			          		 }
						     else{			  
		     					 return true;	 	
		     			    }
	          		 }else{
	          			return false; 
	          		 }
	      	    }
				,cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
        			 var mrvType = $("#jqxgridA").jqxGrid("getcellvalue",row,"jwType");
					 var vendAccCostAcc = $("#jqxgridA").jqxGrid("getcellvalue",row,"vendAccCost");
					 var vendorCostDebitAcc = (vendAccCostAcc * newvalue)/100;		
						$("#jqxgridA").jqxGrid('setcellvalue',row,'vendAccCostDeb',vendorCostDebitAcc);
						
					 var refDocType = $("#jqxgridA").jqxGrid("getcellvalue",row,"refDocType");
					 var refDocNo = $("#jqxgridA").jqxGrid("getcellvalue",row,"refDocNo");
					 var refDocSlNo = $("#jqxgridA").jqxGrid("getcellvalue",row,"accSlNo");

					 
		         	 var vendPercDebOrg = $("#jqxgridA").jqxGrid("getcellvalue",row,"vendPercDebOrg");
		         			 
						if( refDocType != "Purchase Bill"){
							
							var mcDebAmnt = $("#mcDebitedC").val();
							calculateVendItemAmt(refDocNo,refDocSlNo);
							
					        var taxDetUpdated= [];
							var accSlNum = $("#jqxgridA").jqxGrid("getcellvalue",row,"serialNumber");
							var vendAccCostDeb1 = $("#jqxgridA").jqxGrid("getcellvalue",row,"vendAccCostDeb");
							var refDocNo = $("#jqxgridA").jqxGrid("getcellvalue",row,"refDocNo");
					        var rowsT = $("#jqxgridTax").jqxGrid('getrows');
				        	console.log(rowsT);

					        $.each(rowsT,function(k,v){
					        	console.log(v);
					        	console.log(refDocNo);
					        	if(v.accSrlNo == accSlNum && v.refDocNo == refDocNo){
					        		if(v.igstPrc != null){
						        		v.igstAmt = (v.igstPrc * vendAccCostDeb1)/100;
					        		}else{
						        		v.igstAmt = 0.00;
					        		}
					        		
					        		if(v.cgstPrc != null){
						        		v.cgstAmt = (v.cgstPrc * vendAccCostDeb1)/100;
					        		}else{
						        		v.cgstAmt = 0.00;
					        		}
					        		
					        		if(v.sgstPrc != null){
						        		v.sgstAmt = (v.sgstPrc * vendAccCostDeb1)/100;
					        		}else{
						        		v.sgstAmt = 0.00;
					        		}
					        		
					        		if(v.cessPrc){
						        		v.cessAmt = (v.cessPrc * vendAccCostDeb1)/100;
					        		}else{
						        		v.cessAmt = 0.00;
					        		}
					        	}
					        	
					        	else if(v.refDocNo == refDocNo && v.accSrlNo == null && v.stoneSrlNo == null && v.refDocType != "Stock"){
					        		console.log(lineItemCtC);
					        		var lineItemCtC = 0.00;
					        		var mainGrid = $("#jqxgridV").jqxGrid('getrows');
					        		$.each(mainGrid,function(key,val){
					        			if(refDocNo == val.refNo &&  val.costCode != "Manufacture"){
					        				lineItemCtC = val.mcDebit;
					        			}else{
					        				lineItemCtC = val.vendorItemAmt;
					        			}
					        		});
					        		if(v.igstPrc != null){
						        		v.igstAmt = (v.igstPrc * lineItemCtC)/100;
					        		}else{
					        			v.igstAmt  = 0.00;
					        		}
					        		
					        		if(v.cgstPrc != null){
						        		v.cgstAmt = (v.cgstPrc * lineItemCtC)/100;
					        		}else{
						        		v.cgstAmt = 0.00;
					        		}
					        		
					        		if(v.sgstPrc != null){
						        		v.sgstAmt = (v.sgstPrc * lineItemCtC)/100;
					        		}else{
						        		v.sgstAmt = 0.00;
					        		}
					        		
					        		if(v.cessPrc != null){
						        		v.cessAmt = (v.cessPrc * lineItemCtC)/100;
					        		}else{
						        		v.cessAmt = 0.00;
					        		}
					        	}
					        	else if(v.refDocNo == refDocNo && v.accSrlNo == null && v.stoneSrlNo == null && v.refDocType == "Stock"){
					        		var mainGrid = $("#jqxgridV").jqxGrid('getrows');
					        		$.each(mainGrid,function(key,val){
					        			if(refDocNo == val.refNo &&  val.costCode != "Manufacture"){
					        				lineItemCtC = val.mcDebit
					        			}else{
					        				lineItemCtC = val.vendorItemAmt;
					        			}
					        		});
					        		if(v.igstPrc != null){
						        		v.igstAmt = (v.igstPrc * lineItemCtC)/100;
					        		}else{
					        			v.igstAmt  = 0.00;
					        		}
					        		
					        		if(v.cgstPrc != null){
						        		v.cgstAmt = (v.cgstPrc * lineItemCtC)/100;
					        		}else{
						        		v.cgstAmt = 0.00;
					        		}
					        		
					        		if(v.sgstPrc != null){
						        		v.sgstAmt = (v.sgstPrc * lineItemCtC)/100;
					        		}else{
						        		v.sgstAmt = 0.00;
					        		}
					        		
					        		if(v.cessPrc != null){
						        		v.cessAmt = (v.cessPrc * lineItemCtC)/100;
					        		}else{
						        		v.cessAmt = 0.00;
					        		}
					        	}
					        	console.log(v);
					        	taxDetUpdated.push(v);
					        	taxDetailsGrid(taxDetUpdated);
					        });

						}else{
							calculatePbValues(row, newvalue,datafield);
						}
		      	   }, 
			},
			{'text' : 'Acc Cost Debited','datafield' : 'vendAccCostDeb','width' : '10%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		]
	});
}

var calculateVendItemAmt = function(refDocNo,slNo){
	debugger;
	var stoneGridData = $("#jqxgridS").jqxGrid('getrows');
	var accGridData = $("#jqxgridA").jqxGrid('getrows');
    var vendDetGrid = $("#jqxgridV").jqxGrid('getrows');

	var viAmntVal = 0.00;
	var refType;
	$.each(vendDetGrid,function(k,v){
		if(v.refNo == refDocNo && v.refSlNo == slNo && v.refType != "Stock"){
			viAmntVal = v.mcDebit;
			refType = v.refType;
		}else if(v.refNo == refDocNo && v.refType == "Stock"){
			console.log(v);
			console.log(v.wastageAmtDeb);
			if(v.mrvType != "Sub-Contract"){
				viAmntVal = v.mcDebit + parseFloat(v.metalCost) + parseFloat(v.wastageAmtDeb);
			}else{
				viAmntVal = v.mcDebit + parseFloat(v.wastageAmtDeb);
			}
		}
	});
	$.each(stoneGridData,function(k,v){
		if(refDocNo == v.refDocNo && v.slNo == slNo && refType != "Stock" ){
			viAmntVal = parseFloat(viAmntVal) + parseFloat(v.vendCostDeb);
		}else if(refDocNo == v.refDocNo  && refType == "Stock"){
			viAmntVal = parseFloat(viAmntVal) + parseFloat(v.vendCostDeb);
		}
	});
	console.log(viAmntVal);
	
	$.each(accGridData,function(k,v){
		console.log(v);
		if(refDocNo == v.refDocNo && v.accSlNo == slNo){
			viAmntVal = parseFloat(viAmntVal) + parseFloat(v.vendAccCostDeb);
		}else if(refDocNo == v.refDocNo && refType == "Stock"){
			viAmntVal = parseFloat(viAmntVal) + parseFloat(v.vendAccCostDeb);
		}
	});
	console.log(viAmntVal);

	$.each(vendDetGrid,function(k,v){
		if(v.refNo == refDocNo && v.refSlNo == slNo && v.refType != "Stock"){
			$("#jqxgridV").jqxGrid('setcellvalue',k,'vendorItemAmt',viAmntVal);
		}else if(v.refNo == refDocNo && v.refType == "Stock"){
			$("#jqxgridV").jqxGrid('setcellvalue',k,'vendorItemAmt',viAmntVal);
		}
	});
}

var updateVendItemAmt = function(newvalue,refDocNo,refDocSlNo,viCost){
    var headerGrid = $("#jqxgridV").jqxGrid('getrows');
    var stoneGrid = $("#jqxgridS").jqxGrid('getrows');

    var accGrid = $("#jqxgridA").jqxGrid('getrows');

    console.log(headerGrid);
    console.log(stoneGrid);

    console.log(accGrid);
    
    var vendDebAmt = 0;
    $.each(stoneGrid,function(k,v){
    	if(v.vendCostDebOrg > v.vendCostDeb){
    		// minus
    		vendDebAmt = v.vendCostDebOrg - v.vendCostDeb;
    	}else if(v.vendCostDebOrg < v.vendCostDeb){
    		// plus
    		vendDebAmt = v.vendCostDebOrg + v.vendCostDeb;
    	}else{
    		vendDebAmt = v.vendCostDeb;
    	}
    });
    
    console.log(vendDebAmt);
    
    /*$.each(headerGrid,function(k,v){
    	console.log(v);
    	console.log(typeof v.refDocNo);
    	console.log(typeof refDocNo);
    	console.log(typeof v.refDocSrlNo);
    	console.log(typeof refDocSlNo);
    	
    	if(v.refNo == refDocNo && v.refSlNo == refDocSlNo){
    		v.vendorItemAmt = viCost;
    	}
    });*/
    
    console.log(headerGrid);
    
	/*console.log(newvalue);
	console.log(cost);
	console.log(costDeb);
	console.log(refDocNo);
	console.log(datafield);*/
}

//################# Tax Details Grid ##########################

var taxDetailsGrid = function(data){
	console.log(data);
	var source = {
      localdata: data,
      datatype: "json",
		datafields : [ 
			{'name' : 'id','type':'int'},
			{'name' : 'refDocType','type' : 'string'},
			{'name' : 'refDocNo','type' : 'long'}, 
			{'name' : 'refDocSrlNo','type' : 'long'},
			{'name' : 'stoneSrlNo','type' : 'int'},
			{'name' : 'accSrlNo','type' : 'int'},
			{'name' : 'hsnCode','type' : 'string'}, 
			{'name' : 'cgstPrc','type' : 'float'},
			{'name' : 'cgstAmt','type' : 'float'},
			{'name' : 'sgstPrc','type' : 'float'},
			{'name' : 'sgstAmt','type' : 'float'}, 
			{'name' : 'igstPrc','type' : 'float'},
			{'name' : 'isIgst','type' : 'float'}, 
			{'name' : 'igstAmt','type' : 'float'}, 
			{'name' : 'cessPrc','type' : 'float'},
			{'name' : 'cessAmt','type' : 'float'}, 
			{'name' : 'isService','type' : 'string'},
			{'name' : 'isIgst','type' : 'string'}, 
		]
	};

var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridTax").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		theme: 'energyblue',
		columnsheight : 70,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Tax Details');
		},
		columns : [
			{'text' : '','datafield' : 'id',hidden:true},
			{'text' : '','datafield' : 'isService',hidden:true},
			{'text' : '','datafield' : 'isIgst',hidden:true},
			{'text' : 'Ref Type','datafield' : 'refDocType','width' : '8%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Ref No','datafield' : 'refDocNo','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Sl No','datafield' : 'refDocSrlNo','width' : '7%', sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Stone Sl No','datafield' : 'stoneSrlNo','width' : '7%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Acc Sl No','datafield' : 'accSrlNo','width' : '7%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'HSN Code','datafield' : 'hsnCode','width' : '8%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'CGST %','datafield' : 'cgstPrc','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'CGST Amt','datafield' : 'cgstAmt','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'SGST %','datafield' : 'sgstPrc','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'SGST Amt',	'datafield' : 'sgstAmt','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'IGST %','datafield' : 'igstPrc',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '7%',cellsformat : 'd3'},
			{'text' : 'IGST Amt','datafield' : 'igstAmt','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'CESS %',	'datafield' : 'cessPrc','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'CESS Amt','datafield' : 'cessAmt',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '7%',cellsformat : 'd2'},
	    ]
	});
}

//####################################### Create GRid Loading ########################################	
var vendorArr = [];
var rowId = 0;
var generaterowC = function(i) {
	var vCode = $("#vendorCodeC option:selected").text();
	vCode = vCode.split('-');
	vendorCode = vCode[0];
	var row = {};
			var matTypeC = $("#matTypeC").val();
			if(matTypeC =="F"){
				 row["refNo"] = ($("#refTypeC").val()=="GR") ? ($("#refNoCrtD").val()) : ($("#refNoC").val());
		    }else{
				 row["refNo"] = $("#refNoHideId").val()
			}
			row["vendorCode"] = vendorCode,
		    row["serialNo"] = i,
		    row["refType"]     =  ($("#refTypeC option:selected").text()!=null)?$("#refTypeC option:selected").text():"";
			row["refTypehide"] =  ($("#refTypeC").val()!=null)?($("#refTypeC").val()):"";
			row["refSlNo"] = ($("#refSrlNoC").val()!=null)? ($("#refSrlNoC").val()):"";
			console.log($("#mrvTypeIdPacket").val());
			
			if($("#refTypeC").val() == "P"){
				row["mrvType"] = ($("#mrvTypeIdPacket").val() != "") ? $("#mrvTypeIdPacket").val() : "";
			}else{
				row["mrvType"] = ($("#matTypeC").val() == "F" && $("#refTypeC").val() == "PB")? $("#mrvTypeId").val():$("#mrvTypeC").val();	
			}
			row["seg"] = ($("#segmentVnRtnC").val()!=null)?$("#segmentVnRtnC").val():"";
			row["mrvTypeId"] = ($("#mrvTypeId").val()!=null)?$("#mrvTypeId").val():"";
			row["seghide"] = ($("#segCodeHidden").val()!=null)?$("#segCodeHidden").val():"";
			row["metalTypeId"] = ($("#metalTypeId").val()!=null)?$("#metalTypeId").val():"";
			row["segHiddenCodeID"] =($("#segHiddenCode").val()!=null)?$("#segHiddenCode").val():"";
			row["jewelCode"] = ($("#jwlCode").val()!=null)? $("#jwlCode").val():"";
			row["jewelCodehide"] = ($("#jwlCodeHidden").val()!=null)? $("#jwlCodeHidden").val():"";
			row["pcs"] = ($("#pcsC").val()!=null)? $("#pcsC").val():"";
			row["gWt"] = ($("#grossWtC").val()!=null)? $("#grossWtC").val():"";
			row["nWt"] = ($("#netWtC").val()!=null)? $("#netWtC").val():"";
			row["mrvNo"] = ($("#mrvNo").val()!=null)? $("#mrvNo").val():"";
	     	row["mrvSlNo"] = ($("#mrvSlNo").val()!=null)?$("#mrvSlNo").val():"";
	     	row["isIgst"] = ($("#isIgst").val()!=null)?$("#isIgst").val():"";
	     	row["costCode"] = ($("#costCode").val()!=null)?$("#costCode").val():"";
			row["fullyOrPartially"] = ($("#mcFullyPartiallyC").val()!=null) ? $("#mcFullyPartiallyC").val():"";
			row["metalRate"] = ($("#metalRateC").val()!=null) ? $("#metalRateC").val():"";
			row["metalCost"] = ($("#metalCostC").val()!=null) ? $("#metalCostC").val():"";
			row["metalTotalCost"] = ($("#mcTotalCostC").val()!=null)? $("#mcTotalCostC").val():"";
			row["wastgeWt"] = ($("#wastageWtC").val()!=null)? $("#wastageWtC").val():"";
			row["wastgeAmt"] = ($("#wastageAmtC").val()!=null)? $("#wastageAmtC").val():"";
			row["vendorItemAmt"] = ($("#vendorItemAmtC").val()!=null)? $("#vendorItemAmtC").val():"";
			row["viAmtOrg"] = ($("#vendorItemAmtC").val()!=null)? $("#vendorItemAmtC").val():"";

			row["purity"] = ($("#purityC").val()!=null)? $("#purityC").val():"";
			row["wastagePerc"] = ($("#wastageC").val()!=null)? $("#wastageC").val():"";
			row["wastageAmtDeb"] = ($("#wastageAmtC").val()!=null)? ($("#wastageAmtC").val() * $("#wastageC").val())/100:"";
			row["wastageDebitWt"] = ($("#wastageDebitWt").val()!=null)? $("#wastageDebitWt").val():"";
			row["mcPerc"] = ($("#mcC").val()!=null)? $("#mcC").val():"";
			row["mcDebit"] = ($("#mcTotalCostC").val()!=null)? ($("#mcTotalCostC").val() * $("#mcC").val())/100:"";
			row["metalLocation"] = ($("#metalLocC option:selected").val()!="" || $("#metalLocC option:selected").val()!= null)? $("#metalLocC option:selected").val(): null; 
			row["mcFullyPartiallyC"] = ($("#mcFullyPartiallyC option:selected").text()!=null)? $("#mcFullyPartiallyC option:selected").text():Full;
			row["lineItemCostC"] = ($("#lineItemCostC").val()!=null)? $("#lineItemCostC").val():"";
			row["mrvNo"] = ($("#mrvNo").val() !=null)?$("#mrvNo").val():"";
			row["mrvSlNo"] = ($("#mrvSlNo")!=null)?$("#mrvSlNo").val():"";
			row["wastageFullyPC"] = ($("#wastageFullyPC option:selected").text()!=null) ? $("#wastageFullyPC option:selected").text():Full;
			row["makingCharge"] = ($("#mcC").val()!=null)?$("#mcC").val():"";
			row["hsnCode"] = ($("#hsnCode").val()!=null)?$("#hsnCode").val():"";
			row["meltingPurity"] = ($("#meltingPurityId")!=null)?$("#meltingPurityId").val():"";
			row["standardMetalRate"] = ($("#standardMetalRate").val()!=null)?$("#standardMetalRate").val():"";
			row["costCode"] = ($("#costCode").val()!=null)?$("#costCode").val():"";
			row["standardMetalCost"] = ($("#standardMetalCost")!=null)?$("#standardMetalCost").val():"";
			
		    vendorArr.push(row);
			rowId = rowId + 1;
			return row;
}

$("#artCodeHide").hide();
$("#pbItemAmtHide").hide();
$("#vendorDebitAmtCHide").hide();
$("#fullyPartiallyCHide").hide();

$("#mrvTypeCHide").hide();
$("#segmentVnRtnCHide").hide();
$("#jwlCodeHide").hide();
$("#pcsCHide").hide();
$("#grossWtCHide").hide();

$("#netWtCHide").hide();
$("#purityCHide").hide();
$("#metalRateCHide").hide();
$("#mcTotalCostCHide").hide();
$("#mcFullyPartiallyCHide").hide();

$("#mcCHide").hide();
$("#mcDebitedCHide").hide();
$("#wastageWtCHide").hide();
$("#wastageAmtCHide").hide();

$("#wastageFullyPCHide").hide();
$("#wastageCHide").hide();
$("#wastageAmtDebitedCHide").hide();
$("#wastageWtDebitedCHide").hide();
$("#lineItemCostCHide").hide();

$("#cgstCHide").hide();
$("#cgstAmtCHide").hide();
$("#sgstCHide").hide();
$("#sgstAmtCHide").hide();
$("#costCodeHide").hide();

$("#igstCHide").hide();
$("#igstAmtCHide").hide();
$("#cessCHide").hide();
$("#cessAmtCHide").hide();
$("#vendorItemAmtCHide").hide();
$("#mrvTypeCHideId").hide();


function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};

function validationInHeaderLevel(response) {
    var refTypeC = $("#refTypeC").val();
    var matTypeC = $("#matTypeC").val();
    
    var mrvTpe = (response.jwType != null) ? response.jwType: "";
    var hsnCode = (response.hsnCode != null) ? response.hsnCode: "";
    
    var segmentId = (response.segment != null) ? response.segment.id: "";
    var segmentDes = (response.segment != null) ? response.segment.description: "";
    
    var segmentCode = (response.segment != null) ? response.segment.code: "";
    var jwlId = (response.jewelType != null) ? response.jewelType.id: "";
    var jwlDes = (response.jewelType != null) ? response.jewelType.description: "";
    	
    $("#SearchVendorMAsterC").show();
	    if(refTypeC == "PB"){
	    	$("#mrvTypeCHideId").show();
	    	$("#mrvTypeCHide").hide();
	    	var data = mrvTypeArr.mrvTypeArray;
	    	$("#mrvTypeId").empty().append('<option value="" selected>--Select--</option>');
	    	$.each(data,function(key,val){
	    		$("#mrvTypeId").append('<option value="'+val.id+'">'+val.name+'</option>');
	    	});
	    	
	    }else{
	    	$("#mrvTypeC").prop("disabled",true);
	    	$("#mrvTypeCHideId").hide();
	    	$("#mrvTypeCHide").show();
	    	$("#mrvTypeC").val(mrvTpe);
	    }
	   
	   $("#refTypeHideId").val(response.refDocType);
	   $("#refNoHideId").val(response.refDocNo);
	   $("#refSrlHideId").val(response.refDocSrlNo);
	  
	   $("#isIgst").val(response.isIgst);
	   $("#segmentVnRtnC").val(segmentDes);
	   $("#segCodeHidden").val(segmentId);
	   $("#segHiddenCode").val(segmentCode);
	   $("#jwlCodeHidden").val(jwlId);
	   $("#jwlCode").val(jwlDes);
	   $("#pcsC").val(response.pieces);
	   $("#grossWtC").val((response.grossWt).toFixed(3));
	   $("#netWtC").val(response.netWt.toFixed(3));
	   $("#fullyPartiallyC").val("Fully");
	   $("#purityC").val(response.skinPurity.toFixed(2));
	   $("#meltingPurityId").val(response.meltingPurity.toFixed(2));
	   $("#hsnCode").val(hsnCode);
	   $("#mcC").val(response.mcPerc.toFixed(2));
	   globalMcPerc = response.mcPerc;
	   $("#mcDebitedC").val(response.mcDebitAmt.toFixed(2));
	   globalMcDebit = response.mcDebitAmt;
	   $("#wastageC").val(response.wastagePerc.toFixed(2));
	   $("#costCode").val(response.costCode);
	   globalWastagePerc = response.wastagePerc;
	   globalWastageDebitAmt = response.wastageDebitAmt;
	   globalWastageDebitWt = response.wastageDebitWt;
	   $("#wastageAmtDebitedC").val(response.wastageDebitAmt.toFixed(2));
	   $("#wastageDebitWt").val(response.wastageDebitWt.toFixed(3));
	   $("#standardMetalRate").val(response.standardMetalRate.toFixed(2));
	   $("#standardMetalCost").val(response.standardMetalCost.toFixed(2));
	   $("#lineItemCostC").val((response.lineItemCost).toFixed(2));
	   $("#pbItemAmt").val(response.lineItemCost.toFixed(2));
	   $("#mrvNo").val(response.mrvNo);
	   $("#mrvSlNo").val(response.mrvSrlNo);
	   $("#metalRateC").val(response.vendorReturnMetalRate.toFixed(2));
	   $("#metalCostC").val(response.vendorReturnMetalCost.toFixed(2));
	   $("#mcTotalCostC").val(response.mcOriginalAmt.toFixed(2));
	   $("#wastageWtC").val(response.wastageOriginalWt.toFixed(3));
	   $("#wastageAmtC").val(response.wastageOriginalAmt.toFixed(2));
	   $("#vendorItemAmtC").val(response.vendorItemCost.toFixed(2));
	   globalVndorItemCost = response.vendorItemCost;
	   
	if(refTypeC == "S" || refTypeC =="O" || refTypeC == "CSR"){
	    	
			$("#artCodeHide").hide();
			$("#pbItemAmtHide").hide();
			$("#vendorDebitAmtCHide").hide();
			$("#fullyPartiallyCHide").hide();

			$("#mrvTypeCHide").show();
			$("#segmentVnRtnCHide").show();
			$("#jwlCodeHide").show();
			$("#pcsCHide").show();
			$("#grossWtCHide").show();

			$("#netWtCHide").show();
			$("#purityCHide").show();
			$("#metalRateCHide").show();
			$("#mcTotalCostCHide").show();
			$("#mcFullyPartiallyCHide").show();

			$("#mcCHide").show();
			$("#mcDebitedCHide").show();
			$("#wastageWtCHide").show();
			$("#wastageAmtCHide").show();
			$("#costCodeHide").show();

			$("#wastageFullyPCHide").show();
			$("#wastageCHide").show();
			$("#wastageAmtDebitedCHide").show();
			$("#wastageWtDebitedCHide").show();
			$("#lineItemCostCHide").show();

			$("#cgstCHide").show();
			$("#cgstAmtCHide").show();
			$("#sgstCHide").show();
			$("#sgstAmtCHide").show();

			$("#igstCHide").show();
			$("#igstAmtCHide").show();
			$("#cessCHide").show();
			$("#cessAmtCHide").show();
			$("#vendorItemAmtCHide").show();
			
			
			if(mrvTpe == "Consignment"){
				$("#metalRateC").prop("disabled",true);
				$("#mcFullyPartiallyC").prop("disabled",true);
				$("#wastageFullyPC").prop("disabled",true);
			}else{
				if(mrvTpe == "Sub-Contract"){
					$("#metalRateC").prop("disabled",true);
				}else{
					$("#metalRateC").prop("disabled",false);
					$("#wastageFullyPC").prop("disabled",true);
					$("#wastageC").prop("disabled",true);
				}
				
				$("#mcFullyPartiallyC").prop("disabled",false);
				$("#wastageFullyPC").prop("disabled",false);
			}
			
		   $("#metalCostC").prop("disabled",true);
		   $("#mcTotalCostC").prop("disabled",true);
		   $("#wastageWtC").prop("disabled",true);
		   $("#wastageAmtC").prop("disabled",true);
		   //$("#metalRateC").prop("disabled",false);
		   $("#artCode").prop("disabled",true);
		   $("#pbItemAmt").prop("disabled",true);
		   $("#vendorDebitAmtC").prop("disabled",false);
		   $("#costCodeHide").prop("disabled",false);
		   
		   if(refTypeC == "S" || refTypeC == "O"){
			   $("#vendorItemAmtC").prop("disabled",false);
			   $("#vendorItemAmtCHide").show();
		   }
		   if(mrvTpe == "Sub-Contract"){
			   $("#vendorItemAmtC").prop("disabled",true);
		   }
	   }else if(refTypeC == "PB"){
		   
		    $("#artCode").prop("disabled",true);
		    $("#pbItemAmt").prop("disabled",true);
		    $("#vendorDebitAmtC").prop("disabled",false);
		    $("#metalRateC").prop("disabled",false);
		    $("#metalCostC").prop("disabled",true);
		    $("#mcTotalCostC").prop("disabled",true);
		    $("#wastageWtC").prop("disabled",true);
		    $("#wastageAmtC").prop("disabled",true);
		    $("#costCodeHide").prop("disabled",true);
		    $("#lineItemCostC").prop("disabled",true);
		    $("#vendorItemAmtC").prop("disabled",false);
		   
		    $("#artCodeHide").show();
		    $("#pbItemAmtHide").show();
		    $("#vendorDebitAmtCHide").hide();
		    $("#fullyPartiallyCHide").hide();
		    $("#costCodeHide").hide();
		    $("#mrvTypeCHide").hide();
			$("#segmentVnRtnCHide").show();
			$("#jwlCodeHide").show();
			$("#pcsCHide").show();
			$("#grossWtCHide").show();
			$("#netWtCHide").show();
			$("#purityCHide").show();
			$("#metalRateCHide").show();
			$("#mcTotalCostCHide").show();
			$("#mcFullyPartiallyCHide").hide();
			$("#mcCHide").hide();
			$("#mcDebitedCHide").hide();
			$("#wastageWtCHide").show();
			$("#wastageAmtCHide").show();
			$("#wastageFullyPCHide").hide();
			$("#wastageCHide").hide();
			$("#wastageAmtDebitedCHide").hide();
			$("#wastageWtDebitedCHide").hide();
			$("#lineItemCostCHide").show();
			$("#cgstCHide").show();
			$("#cgstAmtCHide").show();
			$("#sgstCHide").show();
			$("#sgstAmtCHide").show();
			$("#igstCHide").hide();
			$("#igstAmtCHide").hide();
			$("#cessCHide").show();
			$("#cessAmtCHide").show();
			$("#vendorItemAmtCHide").show();
			
			
	  }else if(refTypeC == "GR"){
		    
		    $("#artCodeHide").hide();
		    $("#costCodeHide").show();
			$("#pbItemAmtHide").hide();
			$("#vendorDebitAmtCHide").hide();
			$("#fullyPartiallyCHide").show();

			$("#mrvTypeCHide").show();
			$("#segmentVnRtnCHide").show();
			$("#jwlCodeHide").show();
			$("#pcsCHide").show();
			$("#grossWtCHide").show();

			$("#netWtCHide").show();
			$("#purityCHide").show();
			$("#metalRateCHide").show();
			$("#mcTotalCostCHide").show();
			$("#mcFullyPartiallyCHide").hide();

			$("#mcCHide").hide();
			$("#mcDebitedCHide").hide();
			$("#wastageWtCHide").show();
			$("#wastageAmtCHide").show();

			$("#wastageFullyPCHide").hide();
			$("#wastageCHide").hide();
			$("#wastageAmtDebitedCHide").hide();
			$("#wastageWtDebitedCHide").hide();
			$("#lineItemCostCHide").show();

			$("#cgstCHide").show();
			$("#cgstAmtCHide").show();
			$("#sgstCHide").show();
			$("#sgstAmtCHide").show();

			$("#igstCHide").show();
			$("#igstAmtCHide").show();
			$("#cessCHide").show();
			$("#cessAmtCHide").show();
			$("#vendorItemAmtCHide").show();
			
		   $("#metalRateC").prop("disabled",true);
		   $("#metalCostC").prop("disabled",true);
		   $("#mcTotalCostC").prop("disabled",true);
		   $("#wastageWtC").prop("disabled",true);
		   $("#wastageAmtC").prop("disabled",true);
		   $("#costCodeHide").prop("disabled",true)
	     }else{}
	
	if(response.costCode == "Total Cost"){
		$("#metalRateC").prop("disabled",true);
		$("#mcFullyPartiallyC").prop("disabled",true);
		$("#wastageFullyPC").prop("disabled",true);
		$("#vendorItemAmtC").prop("disabled",false);
	 }else {
		 if(mrvTpe == "Consignment"){
			 $("#mcFullyPartiallyC").prop("disabled",true);
			 $("#metalRateC").prop("disabled",true);
			 $("#wastageFullyPC").prop("disabled",true);
			 $("#vendorItemAmtC").prop("disabled",false);

		}else if(mrvTpe == "Sub-Contract"){
			$("#metalRateC").prop("disabled",true);
			$("#mcFullyPartiallyC").prop("disabled",false);
			$("#wastageFullyPC").prop("disabled",false);
			$("#vendorItemAmtC").prop("disabled",true);
		}
		 else{
			$("#metalRateC").prop("disabled",false);
			$("#mcFullyPartiallyC").prop("disabled",false);
			$("#wastageFullyPC").prop("disabled",false);
			$("#vendorItemAmtC").prop("disabled",true);
		}	 
		
    }
    $("#addDetails").show();
 };

function validateFunc(){
	 	if(vendorArr.length==0){
	 		return true;
	 	}
		 $.each(vendorArr,function(k,v){
		    var refTypeSearch =v.refTypehide;
		    var refNoSearch = v.refNo;
		    var refSlNoSearch = v.refSlNo;
		
			var refNoC =$("#refNoC").val();
			var refTypeC = $("#refTypeC").val();
			var refSrlNoC =$("#refSrlNoC").val();
			var refNoCrtD =$("#refNoCrtD").val();
		
		if((refSrlNoC == refSlNoSearch)&&((refNoC == refNoSearch)||(refNoCrtD == refNoSearch))&&(refTypeSearch == refTypeC)){
		    $.growl.error({
			   message: "Ref Type "+ refTypeC + " with Ref No " + refNoC + " and Ref Sl No " + refSrlNoC + " Already added Please Select Different Ref No !!" 
			});
		    $("#refSrlNoC").val("");
			$("#refNoC").val("");
			$("#refNoCrtD").val("");
		    $("#addDetails").prop("disabled",true);
		  //  $("#SearchVendorMAsterC").hide();
		    return false;
		}else{
			$("#addDetails").prop("disabled",false);
		}
	});
		 return true;
};

$("#refSrlNoC").on('change', function() {
	validateFunc();
});
	
// ##################################### Calculation part ###############################

$("#mcDebitedC").on("change",function(){
	if (this.value.match(/[^0-9]/g)) {
		  this.value = this.value.replace(/[^0-9]/g, '');
	}else{
		if(($("#costCode").val() == "Total Cost")){
			var mcDebitedC = $("#mcDebitedC").val();
		    $("#vendorItemAmtC").val(mcDebitedC);
		    $("#metalRateC").prop("disabled",true);
		}else{
			$("#metalRateC").prop("disabled",false);
		}
	}
});

$("#mcFullyPartiallyC").on("change",function(){
	
	if(($("#costCode").val() == "Total Cost")){
		$("#mcC").prop("disabled",true);
		if($("#mcFullyPartiallyC").val() == "F"){
			//$("#mcDebitedC").prop("disabled",true);
			$("#mcDebitedC").val(globalMcDebit.toFixed(2));
			$("#mcC").val(globalMcPerc.toFixed(2));
			//var orgViAmt = addDetArr.vendorItemCost;
			//$("#vendorItemAmtC").val(orgViAmt.toFixed(2));

		}
		/*else{
			$("#mcDebitedC").prop("disabled",false);
		}*/
	}else if($("#refTypeC").val() == "S" && $("#mcFullyPartiallyC").val() == "P"){
		$("#mcC").prop("disabled",false);
	}else{
		$("#mcDebitedC").prop("disabled",true);
		updateVIAmount();
		if($("#mcFullyPartiallyC").val() == "F"){
			$("#mcC").prop("disabled",true);
			$("#mcC").val(globalMcPerc.toFixed(2));
			$("#mcDebitedC").val(globalMcDebit.toFixed(2));
			//var orgViAmt = addDetArr.vendorItemCost;
			//$("#vendorItemAmtC").val(orgViAmt.toFixed(2));
			updateVIAmount();
		}else{
			$("#mcC").prop("disabled",false);
		}
	}
	//calculatePbValues();
	
});

var mcFlag;
$("#mcC").on("change",function(){
	var orgMcPer = addDetArr.mcPerc;
	var orgViAmt = addDetArr.vendorItemCost;
	var newVIAmt;
	
/*	if (this.value.match(/[^0-9]/g)) {
		  this.value = this.value.replace(/[^0-9]/g, '');
	}else{*/
		var mcPerc = $("#mcC").val();
		var mcTotalCostC = $("#mcTotalCostC").val();
		var mcDebtAmount = ((mcPerc*mcTotalCostC)/100).toFixed(2);
		 $("#mcDebitedC").val(mcDebtAmount);
		// calculatePbValues();
	//}
	updateVIAmount();
});

$("#wastageFullyPC").on("change",function(){
	if($("#wastageFullyPC").val() == "F"){
		$("#wastageC").prop("disabled",true);
		$("#wastageC").val(globalWastagePerc.toFixed(2));
		$("#wastageDebitWt").val(globalWastageDebitWt.toFixed(3));
		$("#wastageAmtDebitedC").val(globalWastageDebitAmt.toFixed(2));
	}else if($("#refTypeC").val() == "S" && $("#wastageFullyPC").val() == "P"){
		$("#wastageC").prop("disabled",false);
	}else{
		$("#wastageC").prop("disabled",false);
	}
	updateVIAmount();
	//calculatePbValues();
});

$("#wastageC").on("change",function(){
	/*if (this.value.match(/[^0-9]/g)) {
		  this.value = this.value.replace(/[^0-9]/g, '');
    }else{*/
		var wastageC = $("#wastageC").val();
		var wastageWtC = $("#wastageWtC").val();
		var wastageAmtC = $("#wastageAmtC").val();
		var wastageDebitAmount = ((wastageC*wastageAmtC)/100).toFixed(2);
		var wastageDebitWeight = ((wastageC*wastageWtC)/100).toFixed(3);
		$("#wastageAmtDebitedC").val(wastageDebitAmount);
		$("#wastageDebitWt").val(wastageDebitWeight);
		
		updateVIAmount();
		//calculatePbValues();
   // }
});

$("#metalRateC").on("change",function(){
/*	if (this.value.match(/[^0-9]/g)) {
	  this.value = this.value.replace(/[^0-9]/g, '');
	}else{*/
		var metalRateC = $("#metalRateC").val();
		var netWtC = $("#netWtC").val();
		var purityC = $("#purityC").val()
		var rateVal = (netWtC * purityC)/99.9 ;
		var metalCost = parseFloat(rateVal * metalRateC).toFixed(2);
		$("#metalCostC").val(metalCost);
		
		var wastgeWht = $("#wastageDebitWt").val();
		var wastgAmt =( wastgeWht * purityC)/99.9;
		var wastgAmnt = metalRateC * wastgAmt;
		$("#wastageAmtC").val(wastgAmnt.toFixed(2));
		
		if($("#refTypeC").val() == "PB"){
			var netWt = $("#netWtC").val();
			var purityWt = $("#purityC").val();
			var purity = ((netWt*purityWt)/99.9).toFixed(3)
			var mcCostForPB = (purity * $("#metalRateC").val()).toFixed(2)
			$("#metalCostC").val(mcCostForPB);
			
		}
		updateVIAmount();
		//calculatePbValues();
	//}
});

$("#wastageWtC").on("change",function(){
/*	if (this.value.match(/[^0-9]/g)) {
		  this.value = this.value.replace(/[^0-9]/g, '');
	}else{*/
		if($("#refTypeC").val() == "PB"){
			var purityC = $("#purityC").val();
		    var wastageWtC = $("#wastageWtC").val();
		    var metalRateC = $("#metalRateC").val();
		    var pureWastWt = parseFloat((wastageWtC * purityC)/99.9).toFixed(3);
		    var wtAmt = parseFloat(pureWastWt * metalRateC).toFixed(2);
		    $("#wastageAmtC").val(wtAmt);
			calculatePbValues();
		}
	//}
});

$("#mcTotalCostC").on("change",function(){
/*	if (this.value.match(/[^0-9]/g)) {
		  this.value = this.value.replace(/[^0-9]/g, '');
	}else{*/
		if($("#refTypeC").val() == "PB"){
			calculatePbValues();
		}
	//}
});

// Update VI Amount

var updateVIAmount = function(){
	var vendorItemAmt = 0.00;
	var metalCost = $("#metalCostC").val();
	//var mcDebitedC = 
	var totStoneCost = 0.00;
	var totAccCost = 0.00;
	
	$.each(addDetArr.vendorReturnStones,function(k,v){
		totStoneCost = totStoneCost + v.debitCost
	});
	
	console.log(totStoneCost);
	
	$.each(addDetArr.vendorReturnAccessories,function(k,v){
		totAccCost = totAccCost + v.debitCost
	});
	
	console.log(totAccCost);
	var wastageAmtDebitedC = $("#wastageAmtDebitedC").val();
	var mcDebtAmount = $("#mcDebitedC").val();
	if($("#mrvTypeC").val() == "Sub-Contract"){
		vendorItemAmt =  parseFloat(mcDebtAmount) + parseFloat(totStoneCost) + parseFloat(totAccCost) + parseFloat(wastageAmtDebitedC);
	}else{
		vendorItemAmt = parseFloat(metalCost) + parseFloat(mcDebtAmount) + parseFloat(totStoneCost) + parseFloat(totAccCost) + parseFloat(wastageAmtDebitedC);
	}
		
	console.log(vendorItemAmt);
	var viAmtFinal = parseFloat(vendorItemAmt).toFixed(2);
	$("#vendorItemAmtC").val(viAmtFinal);
}

//######################################### Search Functionality In Create Page ###################
var addDetArr = [];
var taxDetArry = [];
var StoneArray = [];
var AccArray = [];
$("#searchC").on('click', function() {
//	$("#addDetails").show();
	$("#artCode").val("");
	$('#mcFullyPartiallyC').empty().append('<option value="" selected>--Select--</option>');
	$('#wastageFullyPC').empty().append('<option value="" selected>--Select--</option>');
	
	   var refTypeC = $("#refTypeC").val();
	   var matTypeC = $("#matTypeC").val();
	   var segmentC = $("#segmentC").val();
	   var refSrlNoC = $("#refSrlNoC").val();
	   var refNoCrtD =$("#refNoCrtD").val();
	   var refNoC =$("#refNoC").val();
	   var categoryId =$("#categoryId").val();
	   var stoneAccSlNo =$("#stoneAccSlNo").val();
	   var metalLocC =$("#metalLocC").val();
	   var vendorCodeC = $("#vendorCodeC").val();
	   $("#mrvTypeId").prop("disabled",false);
	   $("#finArtivle").prop("disabled",false); 
	   
	   $("#mcFullyPartiallyC").prop("disabled",false);
		$("#wastageFullyPC").prop("disabled",false);
		
	   $.each(fullPartialTypes,function(key,val){
		 if(val.id=="F"){
		       $("#mcFullyPartiallyC").append('<option selected value="'+val.id+'">'+val.name+'</option>');
		   }else{
			   $("#mcFullyPartiallyC").append('<option  value="'+val.id+'">'+val.name+'</option>');
		   }
	   });
	   
	   $.each(fullPartialTypes,function(key,val){
		 if(val.id=="F"){
		   $("#wastageFullyPC").append('<option selected value="'+val.id+'">'+val.name+'</option>');
		 }else{
			 $("#wastageFullyPC").append('<option  value="'+val.id+'">'+val.name+'</option>'); 
		   }
	   })
	    
	   if($("#mcFullyPartiallyC").val() == "F"){
			$("#mcC").prop("disabled",true);
		}else{
			$("#mcC").prop("disabled",false);
		}
	   
		if($("#wastageFullyPC").val() == "F"){
			$("#wastageC").prop("disabled",true);
		}else{
			$("#wastageC").prop("disabled",false);
		}

		if((matTypeC == null || matTypeC == "")||(refTypeC == null || refTypeC == "")||(segmentC == null || segmentC == "")||(vendorCodeC == null || vendorCodeC == "")){
			$.growl.error({
					message : "Please fill all  mandatory field!!",
					duration : 10000
				});
			return false;
		 }
		
		if(matTypeC == "F" || matTypeC == "S"){
			 if(metalLocC == null || metalLocC == ""){
				   $.growl.error({
						message : "Please fill all  mandatory field!!",
						duration : 10000
					});
				return false;
			   }
		}
		
		if(matTypeC == "F"){
			   if(refTypeC == "PB"){
				   if((refNoC == null || refNoC == "")||(refSrlNoC == null || refSrlNoC == "")){
						 $.growl.error({
								message : "Please fill all mandatory field!!",
								duration : 10000
							});
						return false;
					 }
				   $("#vendorDebitAmtC").on("change",function(){
					   if (this.value.match(/[^0-9]/g)) {
							  this.value = this.value.replace(/[^0-9]/g, '');
					 }else{
						   var value = $("#vendorDebitAmtC").val();
						   $("#vendorItemAmtC").val(value);
					   }
				   })
			   }
			   if(refTypeC == "GR"){
				   if(refNoCrtD == null || refNoCrtD == ""){
					   $.growl.error({
							message : "Please fill all  mandatory field!!",
							duration : 10000
						});
					return false;
				   }
			   }else{
				   if(refNoC == null || refNoC == ""){
					   $.growl.error({
							message : "Please fill all  mandatory field!!",
							duration : 10000
						});
					return false;
				   }
			   }
			   if(refTypeC != "S"){
				   if(refSrlNoC == null || refSrlNoC == ""){
					   $.growl.error({
							message : "Please fill all mandatory field!!",
							duration : 10000
						});
					return false;
				   }
			 }
		}
		if(matTypeC == "S" || matTypeC == "A"){
			 
			 if((categoryId == null || categoryId == "")){
				   $.growl.error({
						message : "Please fill all mandatory field!!",
						duration : 10000
					});
				return false;
			   }
			 if(refTypeC == "PB"){
				 if(stoneAccSlNo == null || stoneAccSlNo == ""){
					 $.growl.error({
							message : "Please fill all mandatory field!!",
							duration : 10000
						});
					return false;
				 }
			 }
			 if(refTypeC == "PB" || refTypeC == "GR"){
				 if((refNoC == null || refNoC == "")||(refSrlNoC == null || refSrlNoC == "")){
					 $.growl.error({
							message : "Please fill all mandatory field!!",
							duration : 10000
						});
					return false;
				 }
			 }
			 if(refTypeC == "S"){
				 if(refNoC == null || refNoC == ""){
					   $.growl.error({
							message : "Please fill all mandatory field!!",
							duration : 10000
						});
					return false;
				   }
			 }
		}
	   
	$(".tabDisabledA").addClass("tabDisabled");
	$("#tabGrDet").tabs({
		disabled:[]
	});
	   
     var matTypeC = $("#matTypeC").val();
	 if(matTypeC == "S"){
		$("#tabPanelAccessories").hide();
		$("#tabPanelStone").show();
		$("#grPanelDetails").show();
	 }else if(matTypeC == "A"){
		$("#tabPanelStone").hide();
		$("#tabPanelAccessories").show();
		$("#grPanelDetails").show();
	 }else if(matTypeC == "F"){
		$("#tabPanelAccessories").show();
		$("#grPanelDetails").show();
		$("#tabPanelStone").show();
	 }
	var matTypeC = $("#matTypeC").val();
	 if(matTypeC == "F"){
		 $("#vendorReturnCretFormId").show();
		 $("#saveVendorReturn").prop("disabled",true);
	 }else{
		 $("#vendorReturnCretFormId").hide();
		 $("#saveVendorReturn").prop("disabled",false);
	 }
	var gstinC = $("#gstinC").val();
	(typeof gstinC == "undefined" || gstinC == "" || gstinC == null) ? gstinC = null : gstinC = parseInt(gstinC);
	 if(validateFunc()){
	 if(matTypeC == "F"){
	   fieldFilters = {
			"fieldFilters" : {
	           "materialType":$("#matTypeC").val(),
	           "referenceType":$("#refTypeC").val(),
	           "docNo":($("#refTypeC").val()=="GR") ? ($("#refNoCrtD").val()) : ($("#refNoC").val()),
	           "docSrlNo":$("#refSrlNoC").val(),
	           "segmentId":$("#segmentC").val(),
	           "vendorId":$("#vendorCodeC").val(),
	           "vendorTaxId" : gstinC
	        }
	    }
	 }else if(matTypeC == "S"){
		 
		 if($("#refTypeC").val() == "P"){
			 fieldFilters = {
						"fieldFilters" : {
				           "materialType":$("#matTypeC").val(),
				           "referenceType":$("#refTypeC").val(),
				           "packetNo":$("#packetId").val(),
				           "pieces": $("#stonePcsHidden").val(),
				           "weight": $("#stoneWtCode").val(),
				           "uom": $("#stoneUom").val(),
				           "vendorId":$("#vendorCodeC").val(),
				           "vendorTaxId" : gstinC
				      }
				 }
		 }else{
			 fieldFilters = {
						"fieldFilters" : {
				           "materialType":$("#matTypeC").val(),
				           "referenceType":$("#refTypeC").val(),
				           "docNo":$("#refNoC").val(),
				           "docSrlNo":$("#refSrlNoC").val(),
				           "segmentId":$("#segmentC").val(),
				           "vendorId":$("#vendorCodeC").val(),
				           "categoryId": $("#categoryId").val(),
				           "stoneAccSrlNo":$("#stoneAccSlNo").val(),
				           "vendorTaxId" : gstinC
				      }
				 }
		 }
		 
		 
	 }else if(matTypeC == "A"){
	    fieldFilters = {
				"fieldFilters" : {
		           "materialType":$("#matTypeC").val(),
		           "referenceType":$("#refTypeC").val(),
		           "docNo":$("#refNoC").val(),
		           "docSrlNo":$("#refSrlNoC").val(),
		           "segmentId":$("#segmentC").val(),
		           "vendorId":$("#vendorCodeC").val(),
		           "categoryId": $("#categoryId").val(),
		           "stoneAccSrlNo":$("#stoneAccSlNo").val(),
		           "vendorTaxId" : gstinC
		        }
		    }
	    }
	 
	   	var rowsA = $("#jqxgridA").jqxGrid('getrows');
		var rowsS = $("#jqxgridS").jqxGrid('getrows');
        var rowsT = $("#jqxgridTax").jqxGrid('getrows');
        
	   var AccArray = [];
	   if(typeof rowsA != "undefined"){
		   $.each(rowsA,function(k,v){
				AccArray.push(v);
			});
	   }
	   var StoneArray = [];
	   if(typeof rowsS != "undefined"){
		   $.each(rowsS,function(k,v){
				StoneArray.push(v);
			});
	   }
	   var taxDetArry = [];
	   if(typeof rowsT != "undefined"){
		   $.each(rowsT,function(k,v){
			   taxDetArry.push(v);
			});
	   }
	 
	   
		   postJSON("/OrderExecution/api/v1/getVRDetailsByRefType",JSON.stringify(fieldFilters),function(response){
				if(response.resCode == 1){
					res = response.payload.details;
					addDetArr = response.payload.details;
					validationInHeaderLevel(response.payload.details);
					if(refTypeC == "PB" && response.payload.details.vendorReturnStones != null){
						 	
						   var rowsAcc = $("#jqxgridA").jqxGrid('getrows');
						   var rowsStone = $("#jqxgridS").jqxGrid('getrows');
						   if(typeof rowsStone != "undefined"){
							   for(var i=0;i<rowsStone.length;i++){
								    $("#jqxgridS").jqxGrid('setcellvalue',i,'stoneEditFlag',false);
							   }
						   }
						   if(typeof rowsAcc != "undefined"){
							   for(var i=0;i<rowsAcc.length;i++){
								    $("#jqxgridA").jqxGrid('setcellvalue',i,'accEditFlag',false);
							   }
						   }
					   }
					if($("#matTypeC").val() == "S"){
						var stoneArr = [];
						$.each(response.payload.details.vendorReturnStones,function(key,val){
						var mat_type = $("#matTypeC").val();
						var seg = $("#segmentC option:selected").attr("segname");
						var ref_type = $("#refTypeC").val();

						var objS = {
								"serialNumber" : val.serialNumber,
								"refDocType" : val.refDocType,
								"refDocNo" : val.refDocNo,
								"slNo" : val.refDocSrlNo,
								"seg" :(val.segment != null)? val.segment.description : null,
								"segId" : (val.segment != null)? val.segment.id : null,
								"subCategoryDesc" : (mat_type == "S" && (seg == "OS" || seg == "PS") && ref_type == "GR")?null: val.subCategoryDesc,
								"mainCat" : (val.category != null)? val.category.description : null,
								"mainCatId" :(val.category != null)? val.category.id : null,
								"subCatOrShape" :(val.subCategory != null) ? val.subCategory.description : null,
								"subCatOrShapeId" :(val.subCategory != null) ? val.subCategory.id : null,
								"stCode" : val.stoneCode,
								"shapeDes" : (val.shape != null) ? val.shape.description : null,
								"shapeId" : (val.shape != null) ? val.shape.id : null,
								"clarity" : val.clarity,
								"hsnCode" : (val.hsnCode != null) ? val.hsnCode : null,
								"meltingPurity" : val.meltingPurity,
								"actCol" : val.actualColor,
								"color" : val.color,
								"cutGrade" : val.cutGrade,
								"wtRange" : val.wtCostSlab,
								"pcs" : val.stonePieces,
								"stWt" : val.stoneWt,
								"uqc" : val.uom,
								"stRate" : val.stoneRate,
								"vendStCost" : val.stoneCost,
								"vendPercDeb" : val.debitPerc,
								"vendCostDeb" : val.debitCost,
								"stoneEditFlag":true,
								"costCode":res.costCode,
								"jwType":res.jwType
						}
						stoneArr.push(objS);
					});
						 stoneDetailsGrid(stoneArr);

					}
					if($("#matTypeC").val() == "A"){
						var accArr =[];
						$.each(response.payload.details.vendorReturnAccessories,function(key,val){							
						var objA = {
								"serialNumber" : val.serialNumber,
								"refDocType" : val.refDocType,
								"refDocNo" : val.refDocNo,
								"accSlNo" : val.refDocSrlNo,
								"accSuppBy" : val.accSuppBy,
								"accSeg" : (val.segment != null)? val.segment.description : null,
								"accSegId" : (val.segment != null)? val.segment.id : null,
								"subCategoryDesc" : val.subCategoryDesc,
								"accMainCat" : (val.category != null)? val.category.description : null,
								"accMainCatId" : (val.category != null)? val.category.id : null,
								"accSubCatOrShapeID" : (val.subCategory != null) ? val.subCategory.description : null,
								"accSubCatOrShape" : (val.subCategory != null) ? val.subCategory.id : null,
								"accCode" : val.accCode,
								"shapeDes" : (val.shape != null) ? val.shape.description : null,
								"shapeId" : (val.shape != null) ? val.shape.id : null,
								"accPcs" : val.accPieces,
								"accWt" : val.accWt,
								"accUqc" : val.uom,
								"accRate" : val.accRate,
								"vendAccCost" : val.accCost,
								"vendAccPercDeb" : val.debitPerc,
								"vendAccCostDeb" : val.debitCost,
								"accEditFlag" : true,
								"costCode":res.costCode,
								"jwType":res.jwType


						}
						accArr.push(objA);
					});
					  accDetailsGrid(accArr);
					}
					
					if($("#matTypeC").val() == "A" || $("#matTypeC").val() == "S"){

					$.each(response.payload.details.vendorReturnTaxDetails,function(key,val){
						console.log(val);
						var cgstAmt,sgstAmt,igstAmt,cessAmt;
						if(val.refDocType == "Purchase Bill"){
							cgstAmt = (res.vendorItemCost * val.cgstPrc)/100;
							sgstAmt = (res.vendorItemCost * val.sgstPrc)/100;
							igstAmt = (res.vendorItemCost * val.igstPrc)/100;
							cessAmt =  (res.vendorItemCost * val.cessPrc)/100; 
						}else{
							if($("#costCode").val() == "Manufacture" && $("#mrvTypeC").val() == "Sub-Contract"){
								if(val.stoneSrlNo == null && val.accSrlNo == null){
									cgstAmt = ($("#mcDebitedC").val() * val.cgstPrc)/100;
									sgstAmt = ($("#mcDebitedC").val() * val.sgstPrc)/100;
									igstAmt = ($("#mcDebitedC").val() * val.igstPrc)/100;
									cessAmt = ($("#mcDebitedC").val() * val.cessPrc)/100;
								}else{
									cgstAmt = val.cgstAmt;
									sgstAmt = val.sgstAmt;
									igstAmt = val.igstAmt;
									cessAmt =  val.cessAmt;
								}
							}else{
								cgstAmt = val.cgstAmt;
								sgstAmt = val.sgstAmt;
								igstAmt = val.igstAmt;
								cessAmt =  val.cessAmt;
							}
						}
						var objT = {
								"id" : val.id,
								"refDocType" : val.refDocType,
								"refDocNo" : val.refDocNo,
								"refDocSrlNo" : val.refDocSrlNo,
								"stoneSrlNo" : val.stoneSrlNo,
								"accSrlNo" : (val.accSrlNo != null)? val.accSrlNo : null,
								"hsnCode" : (val.hsnCode != null)? val.hsnCode : null,
								"cgstPrc" : val.cgstPrc,
								"cgstAmt" : cgstAmt,
								"sgstPrc" : (val.sgstPrc != null)? val.sgstPrc: null,
								"sgstAmt" : sgstAmt,
								"igstPrc" : (val.igstPrc != null) ? val.igstPrc : null,
								"isIgst" : val.isIgst,
								"igstAmt" : igstAmt,
								"cessPrc" : (val.cessPrc != null) ? val.cessPrc : null,
								"cessAmt" : cessAmt,
								"isService" : val.isService,
								"isIgst" : val.isIgst,
						}
						taxDetArry.push(objT);
					});
					
					taxDetailsGrid(taxDetArry);
					}
					
					
				 //  $("#searchC").prop("disabled",true);
				   $("#addDetails").prop("disabled",false);
				   headerDetailsGrid(vendorArr);
				   
				   var matTypeC = $("#matTypeC").val();
					 if(matTypeC == "F"){
						 $("#saveVendorReturn").prop("disabled",true);
					 }else{
						 $("#saveVendorReturn").prop("disabled",false);
						 $("#jqxgridV").show();
						 $("#tabGrDet").show();
						 $("#saveVendorReturn").show();
						 activaTab('grDetails');
						 $(".tabDisabledA").removeClass("tabDisabled");
						 $("#jqxgridV").jqxGrid('addrow', null, generaterowC(rowId + 1));
						 $("#searchC").prop("disabled",false);
						    $("#refSrlNoC").val("");
							$("#refNoC").val("");
							//$("#refTypeC").val("");
							$("#metalLocC").val("");
							$("#stoneAccSlNo").val("");
							$("#refNoCrtD").val("");				
						}
					// $("#refSrlNoC").prop("disabled",true);
					// $("#refNoC").prop("disabled",true);
					 $("#refTypeC").prop("disabled",true);
					 $("#metalLocC").prop("disabled",true);
					// $("#stoneAccSlNo").prop("disabled",true);
					// $("#refNoCrtD").prop("disabled",true);
				   
				}else if(response.resCode == 2){
					$.growl.error({
						   message:response.mesgStr
						});
					$(".tabDisabledA").removeClass("tabDisabled");
					//$("#searchC").prop("disabled",false);
					$("#addDetails").prop("disabled",true);
					$("#jqxgridV").hide();
				    $("#tabGrDet").hide();
				    $("#saveVendorReturn").prop("disabled",true);
				    $("#saveVendorReturn").hide();
			  }else if(response.resCode == 3){
					$.growl.error({
						   message:response.mesgStr
						});
					$(".tabDisabledA").removeClass("tabDisabled");
				//	$("#searchC").prop("disabled",false);
					$("#addDetails").prop("disabled",true);
					/*$("#jqxgridV").hide();
				    $("#tabGrDet").hide();
				    $("#saveVendorReturn").prop("disabled",true);
				    $("#saveVendorReturn").hide();*/
				    }
				});
		
     }
});

$("#tabPanelStone").on("click",function(){
	$("#jqxgridS").show();
	$("#jqxgridV").hide();
	$("#jqxgridA").hide();
	$("#jqxgridTax").hide();
});
$("#tabPanelAccessories").on("click",function(){
	$("#jqxgridA").show();
	$("#jqxgridV").hide();
	$("#jqxgridS").hide();
	$("#jqxgridTax").hide();
});
$('#grPanelDetails').on("click",function(){
	$("#jqxgridA").hide();
	$("#jqxgridV").show();
	$("#jqxgridS").hide();
	$("#jqxgridTax").hide();
});
$('#tabPanelTax').on("click",function(){
	$("#jqxgridA").hide();
	$("#jqxgridV").hide();
	$("#jqxgridS").hide();
	$("#jqxgridTax").show();
});


var taxDetForVdrArrSub = [];

$("#addDetails").on("click",function(){
	var refTypeC = $("#refTypeC").val();
	if(refTypeC == "PB"){
		if(($("#mrvTypeId").val()==null || $("#mrvTypeId").val()=="") || ($("#artCode").val() == null || $("#artCode").val() == "")){
			$.growl.error({
			   message: "Please Select the MRV Type And Article Code!!" 
			});
			return false;
		}else{
			calculatePbValues();
		}
	}
	
	
	$("#saveVendorReturn").prop("disabled",false);
	$("#jqxgridV").show();
	$("#tabGrDet").show();
	$("#saveVendorReturn").show();
	activaTab('grDetails');
	validateFunc();
	$(".tabDisabledA").removeClass("tabDisabled");
    headerDetailsGrid(vendorArr);
	/*if($("#mrvTypeId").val() == "Dealer"){
		$.each(taxDetailsForVendor,function(k,v){
			taxDetailsForVendorArr.push(v)
		});
	  taxDetailsGrid(taxDetailsForVendorArr);
	}*/
    $("#jqxgridV").jqxGrid('addrow',null,generaterowC(rowId + 1));
   /* $("#refSrlNoC").val("");
	$("#refNoC").val("");
	$("#refTypeC").val("");
	$("#metalLocC").val("");
	$("#stoneAccSlNo").val("");
	$("#refNoCrtD").val("");*/
	$("#addDetails").prop("disabled",true);
	//$("#searchC").prop("disabled",true);
	$("#pbItemAmt").prop("disabled",true);
    $("#vendorDebitAmtC").prop("disabled",true);
    //$("#metalRateC").prop("disabled",true);
    $("#metalCostC").prop("disabled",true);
    $("#mcTotalCostC").prop("disabled",true);
    $("#wastageWtC").prop("disabled",true); 
   // $("#finArtivle").prop("disabled",true); 
    //$("#mrvTypeId").prop("disabled",true);
	$("#metalRateC").prop("disabled",true);
	$("#mcFullyPartiallyC").prop("disabled",true);
	$("#wastageFullyPC").prop("disabled",true);
	$("#refSrlNoC").val("");
	$("#refNoC").val("");
	$("#vendorItemAmtCHide").hide();
	$("#refSrlNoC").empty().append('<option value="" selected>--Select--</option>');
	
	$.each(addDetArr.vendorReturnStones,function(key,val){
		var mat_type = $("#matTypeC").val();
		var seg = $("#segmentC option:selected").attr("segname");
		var ref_type = $("#refTypeC").val();

		var objS = {
				"serialNumber" : val.serialNumber,
				"refDocType" : val.refDocType,
				"refDocNo" : val.refDocNo,
				"slNo" : val.refDocSrlNo,
				"seg" :(val.segment != null)? val.segment.description : null,
				"segId" : (val.segment != null)? val.segment.id : null,
				"subCategoryDesc" : (mat_type == "S" && (seg == "OS" || seg == "PS") && ref_type == "GR")?null: val.subCategoryDesc,
				"mainCat" : (val.category != null)? val.category.description : null,
				"mainCatId" :(val.category != null)? val.category.id : null,
				"subCatOrShape" :(val.subCategory != null) ? val.subCategory.description : null,
				"subCatOrShapeId" :(val.subCategory != null) ? val.subCategory.id : null,
				"stCode" : val.stoneCode,
				"shapeDes" : (val.shape != null) ? val.shape.description : null,
				"shapeId" : (val.shape != null) ? val.shape.id : null,
				"clarity" : val.clarity,
				"hsnCode" : (val.hsnCode != null) ? val.hsnCode : null,
				"meltingPurity" : val.meltingPurity,
				"actCol" : val.actualColor,
				"color" : val.color,
				"cutGrade" : val.cutGrade,
				"wtRange" : val.wtCostSlab,
				"pcs" : val.stonePieces,
				"stWt" : val.stoneWt,
				"uqc" : val.uom,
				"stRate" : val.stoneRate,
				"vendStCost" : val.stoneCost,
				"vendPercDeb" : val.debitPerc,
				"vendCostDeb" : val.debitCost,
				"stoneEditFlag":true,
				"costCode":res.costCode,
				"jwType":res.jwType
		}
		StoneArray.push(objS);
	});
	 stoneDetailsGrid(StoneArray);
	 
	 $.each(addDetArr.vendorReturnAccessories,function(key,val){							
			var objA = {
					"serialNumber" : val.serialNumber,
					"refDocType" : val.refDocType,
					"refDocNo" : val.refDocNo,
					"accSlNo" : val.refDocSrlNo,
					"accSuppBy" : val.accSuppBy,
					"accSeg" : (val.segment != null)? val.segment.description : null,
					"accSegId" : (val.segment != null)? val.segment.id : null,
					"subCategoryDesc" : val.subCategoryDesc,
					"accMainCat" : (val.category != null)? val.category.description : null,
					"accMainCatId" : (val.category != null)? val.category.id : null,
					"accSubCatOrShapeID" : (val.subCategory != null) ? val.subCategory.description : null,
					"accSubCatOrShape" : (val.subCategory != null) ? val.subCategory.id : null,
					"accCode" : val.accCode,
					"shapeDes" : (val.shape != null) ? val.shape.description : null,
					"shapeId" : (val.shape != null) ? val.shape.id : null,
					"accPcs" : val.accPieces,
					"accWt" : val.accWt,
					"accUqc" : val.uom,
					"accRate" : val.accRate,
					"vendAccCost" : val.accCost,
					"vendAccPercDeb" : val.debitPerc,
					"vendAccCostDeb" : val.debitCost,
					"accEditFlag" : true,
					"costCode":res.costCode,
					"jwType":res.jwType


			}
			AccArray.push(objA);
		});
	   accDetailsGrid(AccArray);

	$.each(addDetArr.vendorReturnTaxDetails,function(key,val){
		console.log(val);
		var cgstAmt,sgstAmt,igstAmt,cessAmt;
		if(val.refDocType == "Purchase Bill"){
			cgstAmt = (res.vendorItemCost * val.cgstPrc)/100;
			sgstAmt = (res.vendorItemCost * val.sgstPrc)/100;
			igstAmt = (res.vendorItemCost * val.igstPrc)/100;
			cessAmt =  (res.vendorItemCost * val.cessPrc)/100; 
		}else{
			if($("#costCode").val() == "Manufacture" && $("#mrvTypeC").val() == "Sub-Contract"){
				if(val.stoneSrlNo == null && val.accSrlNo == null){
					cgstAmt = ($("#mcDebitedC").val() * val.cgstPrc)/100;
					sgstAmt = ($("#mcDebitedC").val() * val.sgstPrc)/100;
					igstAmt = ($("#mcDebitedC").val() * val.igstPrc)/100;
					cessAmt = ($("#mcDebitedC").val() * val.cessPrc)/100;
				}else{
					cgstAmt = val.cgstAmt;
					sgstAmt = val.sgstAmt;
					igstAmt = val.igstAmt;
					cessAmt =  val.cessAmt;
				}
			}else{
				if($("#costCode").val() == "Manufacture" && $("#mrvTypeC").val() == "Dealer"){
					cgstAmt = ($("#vendorItemAmtC").val() * val.cgstPrc)/100;
					sgstAmt = ($("#vendorItemAmtC").val() * val.sgstPrc)/100;
					igstAmt = ($("#vendorItemAmtC").val() * val.igstPrc)/100;
					cessAmt = ($("#vendorItemAmtC").val() * val.cessPrc)/100;
				}else{
					if($("#costCode").val() == "Total Cost" && val.accSrlNo == null && val.stoneSrlNo == null){
						cgstAmt = ($("#vendorItemAmtC").val() * val.cgstPrc)/100;
						sgstAmt = ($("#vendorItemAmtC").val() * val.sgstPrc)/100;
						igstAmt = ($("#vendorItemAmtC").val() * val.igstPrc)/100;
						cessAmt = ($("#vendorItemAmtC").val() * val.cessPrc)/100;
					}else{
						cgstAmt = val.cgstAmt;
						sgstAmt = val.sgstAmt;
						igstAmt = val.igstAmt;
						cessAmt =  val.cessAmt;
					}
				}
			}
		}
		var objT = {
				"id" : val.id,
				"refDocType" : val.refDocType,
				"refDocNo" : val.refDocNo,
				"refDocSrlNo" : val.refDocSrlNo,
				"stoneSrlNo" : val.stoneSrlNo,
				"accSrlNo" : (val.accSrlNo != null)? val.accSrlNo : null,
				"hsnCode" : (val.hsnCode != null)? val.hsnCode : null,
				"cgstPrc" : val.cgstPrc,
				"cgstAmt" : cgstAmt,
				"sgstPrc" : (val.sgstPrc != null)? val.sgstPrc: null,
				"sgstAmt" : sgstAmt,
				"igstPrc" : (val.igstPrc != null) ? val.igstPrc : null,
				"isIgst" : val.isIgst,
				"igstAmt" : igstAmt,
				"cessPrc" : (val.cessPrc != null) ? val.cessPrc : null,
				"cessAmt" : cessAmt,
				"isService" : val.isService,
				"isIgst" : val.isIgst,
		}
		taxDetArry.push(objT);
	});
	
	taxDetailsGrid(taxDetArry);
	 

});

//########################## MODEL POP ############# On change Sub Category getting article Code #########################
$("#subCat").on("change",function() {
	
	$("#articleList").empty();
	var subCat = $("#subCat").val();

	var fieldFilters = {
		"fieldFilters" : {
			"sCatId" : subCat,
			"segId" : $("#segmentC").val(),
			"mJewelId" : $("#jwlCodeHidden").val(),
			"vId" : $("#vendorCodeC").val()
		}
	};

	postJSON('/OrderExecution/api/v1/getArticleCode', JSON.stringify(fieldFilters), function(data) {
		var vArticleCodeList = data.payload.vArticleCodeList;
		var i = 0;
		var tableData = "";
		$.each(vArticleCodeList, function(k, v) {
			tableData += '<tr>';
			tableData += '<td><input type="radio" desc="'
					+ v.description
					+ '"  name="articleList"  id="articleList" code="'
					+ v.name + '" value="' + v.id + '" > <label>'
					+ v.name + '</label></td>';
			tableData += '</tr>';
			i++;
		});
		$("#articleList").append(tableData);
	});
});
var taxDetailsForVendorArr = [];
var taxDetailsForVendor ; 
var taxDetForSubContractor = [];
$("#selectArticle").on('click',	function() {
	
	var subCatId = $('#subCat option:selected').val();
	var subCatName = $('#subCat option:selected').text();
	var subCatCode = $('#subCat option:selected').attr('code');
	var mainCategoryId = $('#mainCat option:selected').val();
	var mainCategoryName = $('#mainCat option:selected').text();
	var mainCategoryCode = $('#mainCat option:selected').attr('code');
	var articleIdMaster = $('input[name=articleList]:checked').val();
	var articleNameMaster = $('input[name=articleList]:checked').parent().find('label').text();
	var selectedArticleDesc = $('input[name=articleList]:checked').attr('desc');
	var selectedVendorName = $('input[name=vendorCode]:checked').parent().find('label').text();
	$("#artCode").val(articleNameMaster);
	
	var artCodegst = $("#artCode").val();
	var vendorId = $("#vendorCodeC").val();
	var docNo = $("#refNoC").val();
	var docSrlNo = $("#refSrlNoC").val();
	var gstinC = $("#gstinC").val();
	 (typeof gstinC == "undefined" || gstinC == null || gstinC == "") ? gstinC = "": gstinC = gstinC;
	 
	 if($("#mrvTypeId").val() == "Dealer"){
	    $.getJSON("/OrderExecution/api/v1/getTaxForPBandDealer?code="+artCodegst+"&vendorId="+vendorId+"&docNo="+docNo+"&docSrlNo="+docSrlNo+"&vendorTaxId="+gstinC,function(data){ 
	    	taxDetailsForVendor = data.payload.vendorReturnTaxDetails;
	    	var cost = $("#vendorItemAmtC").val();
		      
	    	$.each(taxDetailsForVendor,function(k,v){
	    		console.log(v);
	    		v.igstAmt = (cost * v.igstPrc)/100 ;
	    		v.cgstAmt = (cost * v.cgstPrc)/100 ;
	    		v.sgstAmt = (cost * v.sgstPrc)/100 ;
	    		v.cessAmt = (cost * v.cessPrc)/100 ;
	    	});
	    	taxDetailsGrid(taxDetailsForVendor);
	    	//console.log($("#vendorItemAmtC").val());
	    });
	 }else{
		 
		 $.getJSON("/OrderExecution/api/v1/getTaxForPBandSubContractor?code="+artCodegst+"&vendorId="+vendorId+"&docNo="+docNo+"&docSrlNo="+docSrlNo+"&vendorTaxId="+gstinC,function(data){
			 if(typeof data != "undefined" && data.resCode == "1"){
				 $.each(data.payload.vendorReturnTaxDetails,function(k,v){
	            	  taxDetForSubContractor.push(v)
	              })
	             var cost = $("#vendorItemAmtC").val();
		      
		    	$.each(taxDetForSubContractor,function(k,v){
		    		console.log(v);
		    		v.igstAmt = (cost * v.igstPrc)/100 ;
		    		v.cgstAmt = (cost * v.cgstPrc)/100 ;
		    		v.sgstAmt = (cost * v.sgstPrc)/100 ;
		    		v.cessAmt = (cost * v.cessPrc)/100 ;
		    	});
			      taxDetailsGrid(taxDetForSubContractor);
			 }else{
				 $.growl.error({ message:  data.mesgStr, duration: 10000, title: 'Error' });
			 }
		  });
	 }
});

var cgstAmtC = 0.00;
var sgstAmtC = 0.00;
var cessAmtC = 0.00;
var igstAmtC = 0.00;

var cgstAmt = 0.00;
var sgstAmt = 0.00;
var cessAmt = 0.00;
var igstAmt = 0.00;

$("#vendorItemAmtC").val();
var calculatePbValues = function(row, newvalue, datafield){
	var stoneCostForPb = 0.00;
	var accCostForPb = 0.00;
    
	var rowsAcc = $("#jqxgridA").jqxGrid('getrows');
    var rowsStone = $("#jqxgridS").jqxGrid('getrows');
	    
	    
    if(typeof rowsStone != "undefined" && rowsStone.length > 0){
    	for(var i=0; i<rowsStone.length; i++){
    		if(typeof newvalue == "undefined" ||  newvalue==null){
    			stoneCostForPb += parseFloat(NVL(rowsStone[i].vendCostDeb,0)).toFixed(2);
    		}else if(row == i && newvalue != null && datafield == "vendPercDeb"){
    			stoneCostForPb += ((parseFloat(rowsStone[i].vendStCost) * parseFloat(newvalue))/100).toFixed(2);
    		}else{
    			stoneCostForPb += parseFloat(NVL(rowsStone[i].vendCostDeb,0)).toFixed(2);
    		}
    	}
    }
    
    if(typeof rowsAcc != "undefined" && rowsAcc.length > 0){
    	for(var i=0; i<rowsAcc.length; i++){
    		if(typeof newvalue == "undefined" ||  newvalue==null){
    			accCostForPb += parseFloat(NVL(rowsAcc[i].vendAccCostDeb,0)).toFixed(2);
    		}else if(row == i && newvalue != null && datafield == "vendAccPercDeb"){
    			accCostForPb += ((parseFloat(rowsAcc[i].vendAccCost) * parseFloat(newvalue))/100).toFixed(2);
    		}else{
    			accCostForPb += parseFloat(NVL(rowsAcc[i].vendAccCostDeb,0)).toFixed(2);
    		}
    	}
    }
	
	
	var MCDebited = 0.00;
	var WastAmtC = 0.00;
    var WastAmtVal =$("#wastageAmtC").val();
	var metalCtC =$("#metalCostC").val();
	var MC = $("#mcTotalCostC").val();
    var mcFullyPartiallyC = $("#mcFullyPartiallyC").val();
    var wastFullyPartiallyC = $("#wastageFullyPC").val();    
    var mcPer = $("#mcC").val();
    var wastPer = $("#wastageC").val();
    var refType = $("#refTypeC").val();
    
    if(mcFullyPartiallyC == "P"){	
		MCDebited = (MC * mcPer)/100;
	 }else{
		MCDebited = (MC * 100)/100;
	 }
    
    if(wastFullyPartiallyC == "P"){	
    	WastAmtC = (WastAmtVal * wastPer)/100;
	 }else{
		 WastAmtC = (WastAmtVal * 100)/100;
	 }
    
    if(($("#mrvTypeId").val() == "Sub-Contract" || $("#mrvTypeC").val() == "Sub-Contract") &&  refType != "PB"	){
    	
    	lineItemCtC = parseFloat(MCDebited)+parseFloat(stoneCostForPb)+parseFloat(accCostForPb);
 	    lineItemCtC = lineItemCtC.toFixed(2);
 	    $("#vendorItemAmtC").val(lineItemCtC);
 	    
 	   var taxRows =  $("#jqxgridTax").jqxGrid("getrows");
 	   console.log(taxRows);
 	   
 	 
    	for(var i = 0; i<taxRows.length; i++){
			if((taxRows[i].stoneSrlNo == "" || taxRows[i].stoneSrlNo == null || typeof taxRows[i].stoneSrlNo == "undefined") && (taxRows[i].accSrlNo == "" || taxRows[i].accSrlNo == null || typeof taxRows[i].accSrlNo == "undefined")){
				var rowData = $("#jqxgridTax").jqxGrid('getrowdata',  i);
				
				cgstAmt = ((taxRows[i].cgstPrc*MCDebited)/100).toFixed(2);
    			sgstAmt = ((taxRows[i].sgstPrc*MCDebited)/100).toFixed(2);
    			cessAmt = ((taxRows[i].cessPrc*MCDebited)/100).toFixed(2);
    			igstAmt = ((taxRows[i].igstPrc*MCDebited)/100).toFixed(2);
    			
    			rowData['cgstAmt'] = cgstAmt;
    			rowData['sgstAmt'] = sgstAmt;
    			rowData['igstAmt'] = igstAmt;
    			rowData['cessAmt'] = cessAmt;
			    
			    $('#jqxgridTax').jqxGrid('updaterow', i, rowData); 
			}
    	
			if(typeof rowsStone != "undefined" && rowsStone.length > 0){
				for(var j = 0; j<rowsStone.length; j++){
					if(taxRows[i].stoneSrlNo == rowsStone[j].serialNumber){ 
						var rowData = $("#jqxgridTax").jqxGrid('getrowdata',  i);
						if(datafield == "vendPercDeb"){						
							var stonePer = newvalue;
						}else{
							var vendPercDebStone = $("#jqxgridS").jqxGrid("getcellvalue",j,"vendPercDeb");
							var stonePer = vendPercDebStone;
						}
						var vendorCostDebit = (rowsStone[j].vendStCost * stonePer)/100;
					    $("#jqxgridS").jqxGrid('setcellvalue',j,'vendCostDeb',vendorCostDebit);
					    
						cgstAmt = ((taxRows[i].cgstPrc*vendorCostDebit)/100).toFixed(2);
		    			sgstAmt = ((taxRows[i].sgstPrc*vendorCostDebit)/100).toFixed(2);
		    			cessAmt = ((taxRows[i].cessPrc*vendorCostDebit)/100).toFixed(2);
		    			igstAmt = ((taxRows[i].igstPrc*vendorCostDebit)/100).toFixed(2);
		    			
		    			rowData['cgstAmt'] = cgstAmt;
		    			rowData['sgstAmt'] = sgstAmt;
		    			rowData['igstAmt'] = igstAmt;
		    			rowData['cessAmt'] = cessAmt;
					    
					    $('#jqxgridTax').jqxGrid('updaterow', i, rowData); 
					}
				}
			
			}
			
			console.log(taxRows[i]);
		
			  if(typeof rowsAcc != "undefined" && rowsAcc.length > 0){
				  
				  for(var k = 0; k<rowsAcc.length; k++){
					  console.log(rowsAcc[k])
						if(taxRows[i].accSrlNo == rowsAcc[k].serialNumber){
							var rowData = $("#jqxgridTax").jqxGrid('getrowdata',  i);
							if(datafield == "vendAccPercDeb"){	
								var accPer = newvalue;							
							}else{
								var vendAccPercDebAcc = $("#jqxgridA").jqxGrid("getcellvalue",k,"vendAccPercDeb");
								var accPer = vendAccPercDebAcc;
							}
							
							var vendorCostDebitAcc = (rowsAcc[k].vendAccCost * accPer)/100;
							$("#jqxgridA").jqxGrid('setcellvalue', k, 'vendAccCostDeb',vendorCostDebitAcc);
							
							cgstAmt = ((taxRows[i].cgstPrc*vendorCostDebitAcc)/100).toFixed(2);
			    			sgstAmt = ((taxRows[i].sgstPrc*vendorCostDebitAcc)/100).toFixed(2);
			    			cessAmt = ((taxRows[i].cessPrc*vendorCostDebitAcc)/100).toFixed(2);
			    			igstAmt = ((taxRows[i].igstPrc*vendorCostDebitAcc)/100).toFixed(2);
			    			
			    			rowData['cgstAmt'] = cgstAmt;
			    			rowData['sgstAmt'] = sgstAmt;
			    			rowData['igstAmt'] = igstAmt;
			    			rowData['cessAmt'] = cessAmt;
						    
			    			console.log(rowData);
						    $('#jqxgridTax').jqxGrid('updaterow', i, rowData); 
						}
				  }
			  }
					
 		};
     }else{
    	lineItemCtC = parseFloat(metalCtC)+parseFloat(MCDebited)+parseFloat(WastAmtC)+parseFloat(stoneCostForPb)+parseFloat(accCostForPb);
	 	lineItemCtC = lineItemCtC.toFixed(2);
	    console.log(lineItemCtC);
 	    $("#vendorItemAmtC").val(lineItemCtC);
 	   var taxDetails = $("#jqxgridTax").jqxGrid('getrows');
 	   $.each(taxDetails,function(k1,v1){
   		if(row == null && newvalue == null && datafield==null){
	    		v1.cgstAmt = ((v1.cgstPrc*lineItemCtC)/100).toFixed(2);
	    		v1.sgstAmt = ((v1.sgstPrc*lineItemCtC)/100).toFixed(2);
	    		v1.cessAmt = ((v1.cessPrc*lineItemCtC)/100).toFixed(2);
	    		v1.igstAmt = ((v1.igstPrc*lineItemCtC)/100).toFixed(2);
	    		cgstAmtC = v1.cgstAmt;
				sgstAmtC = v1.sgstAmt;
				cessAmtC = v1.cessAmt;
				igstAmtC = v1.igstAmt;

   		}else{
   			var rowData = $("#jqxgridTax").jqxGrid('getrowdata',  k1);
   				cgstAmt = ((v1.cgstPrc*lineItemCtC)/100).toFixed(2);
	    		sgstAmt = ((v1.sgstPrc*lineItemCtC)/100).toFixed(2);
	    		cessAmt = ((v1.cessPrc*lineItemCtC)/100).toFixed(2);
	    		igstAmt = ((v1.igstPrc*lineItemCtC)/100).toFixed(2);
				if(typeof rowData != "undefined"){
					rowData['cgstAmt'] = cgstAmt;
					rowData['sgstAmt'] = sgstAmt;
					rowData['igstAmt'] = igstAmt;
					rowData['cessAmt'] = cessAmt;
				    
				    $('#jqxgridTax').jqxGrid('updaterow', k1, rowData); 
				}
   		}
   	});
	}
    var rowDet = $("#jqxgridV").jqxGrid('getrows');
	 
  	$.each(rowDet,function(k1,v1){
  		$("#jqxgridV").jqxGrid('setcellvalue',k1,'vendorItemAmt',lineItemCtC);
    }); 
}

$("#finArtivle").on("click",function(){
	$('#mainCat').empty().append('<option value="" selected>--Select--</option>');
    $('#subCat').empty().append('<option value="" selected>--Select--</option>');
	
	var fieldFilter = {
		"fieldFilters" : {
			"segId" : $("#segmentC").val(),
			"mJewelId" : $("#jwlCodeHidden").val(),
			"vId" : $("#vendorCodeC").val()
		}
	};
	
	postJSON('/OrderExecution/api/v1/getMetalJewelTypeCategoryAndSubCategory',JSON.stringify(fieldFilter), function(data) {
		var mainCatList = data.payload.mainCatList;
		var subCatList = data.payload.subCatList;

		$.each(mainCatList, function(k, v) {
			$('#mainCat').append('<option code="' + v.name + '" value="' + v.id	+ '">' + v.description + '</option>');
		});

		$.each(subCatList, function(k, v) {
			$('#subCat').append('<option  code="' + v.name + '" value="' + v.id	+ '">' + v.description + '</option>');
		});
	});
});

$("#mrvTypeId").on('change',function(){
	if($("#mrvTypeId").val() == "Sub-Contract" && $("#refTypeC").val() == "PB"){
		$("#metalRateC").prop('disabled',true);
	}else if($("#mrvTypeId").val() == "Dealer" && $("#refTypeC").val() == "PB"){
		$("#metalRateC").prop('disabled',true);
		$("#wastageWtC").prop('disabled',true);
		$("#vendorItemAmtC").prop('disabled',true);
		$("#mcTotalCostC").prop('disabled',true);
		$("#metalCostC").prop('disabled',false);
		$("#mrvTypeId").prop('disabled',true);
	}
	else{
		$("#metalRateC").prop('disabled',false);
	}
});
//######################################## Saving of the Finished Goods Details ##########################

$("#saveVendorReturn").on("click",function(){
	//$("#loading").show();
	var VendorItemArray = [];
	var rowsAcc = $("#jqxgridA").jqxGrid('getrows');
    var rowsStone = $("#jqxgridS").jqxGrid('getrows');
    var rowTax = $("#jqxgridTax").jqxGrid('getrows');
    if(typeof rowTax == "undefined" || rowTax.length == 0){
    	$.growl.error({	message : "Tax details is mandatory.",duration : 1000,title : 'Error'});
		return false;
    }
	var matType = $("#matTypeC").val();
	var rowDet = $("#jqxgridV").jqxGrid('getrows');
	for(var i=0;i<rowDet.length;i++){
		var row = rowDet[i];
		console.log(row);
		if( (matType == "S" || matType == "A") && row.refType == "Purchase Bill"){
			if(row.mrvType == "" || row.mrvType == null){
				$.growl.error({
					message : "Please Select MRV Type !!!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
	}
	for (var i = 0; i < vendorArr.length; i++) {
		var vendorReturnItems = {
			      "serialNo": vendorArr[i].serialNo,
			      "refDocType": (vendorArr[i].refTypehide !=null && (vendorArr[i].refTypehide) !="")?(vendorArr[i].refTypehide):null,
			      "refDocNo": (vendorArr[i].refNo !=null && (vendorArr[i].refNo) !="")?(vendorArr[i].refNo):null,
			      "refDocSrlNo": (vendorArr[i].refSlNo !=null && (vendorArr[i].refSlNo) !="")?(vendorArr[i].refSlNo):null,
			      "grossWt": (vendorArr[i].gWt !=null && (vendorArr[i].gWt) !="")?(vendorArr[i].gWt):null,
			      "netWt": (vendorArr[i].nWt !=null && (vendorArr[i].nWt) !="")?(vendorArr[i].nWt):null,
			      "pieces": (vendorArr[i].pcs !=null && (vendorArr[i].pcs) !="")?(vendorArr[i].pcs):null,
			      "metalLocation": ((vendorArr[i].metalLocation!=null) && (vendorArr[i].metalLocation) !="")?(vendorArr[i].metalLocation):null,
			      "standardMetalRate": (vendorArr[i].standardMetalRate !=null && (vendorArr[i].standardMetalRate) !="")?(vendorArr[i].standardMetalRate):null,
			      "standardMetalCost": (vendorArr[i].standardMetalCost !=null && (vendorArr[i].standardMetalCost) !="")?(vendorArr[i].standardMetalCost):null,
			      "vendorReturnMetalRate":  (vendorArr[i].metalRate !=null && (vendorArr[i].metalRate) !="")?(vendorArr[i].metalRate):null,
			      "vendorReturnMetalCost": (vendorArr[i].metalCost !=null && (vendorArr[i].metalCost) !="")?(vendorArr[i].metalCost):null,
			      "lineItemCost": (vendorArr[i].lineItemCostC !=null && (vendorArr[i].lineItemCostC) !="")?(vendorArr[i].lineItemCostC):null,
			      "mcFullOrPartial": (vendorArr[i].mcFullyPartiallyC !=null && (vendorArr[i].mcFullyPartiallyC) !="")?(vendorArr[i].mcFullyPartiallyC):null,
			      "mcPerc": (vendorArr[i].mcPerc !=null && (vendorArr[i].mcPerc) !="")?(vendorArr[i].mcPerc):null,
			      "mcOriginalAmt": (vendorArr[i].metalTotalCost !=null && (vendorArr[i].metalTotalCost) !="")?(vendorArr[i].metalTotalCost):null,
			      "mcDebitAmt": (vendorArr[i].mcDebit !=null && (vendorArr[i].mcDebit) !="")?(vendorArr[i].mcDebit):null,
			      "wastageFullOrPartial": (vendorArr[i].wastageFullyPC !=null && (vendorArr[i].wastageFullyPC) !="")?(vendorArr[i].wastageFullyPC):null,
			      "wastagePerc": (vendorArr[i].wastagePerc !=null && (vendorArr[i].wastagePerc) !="")?(vendorArr[i].wastagePerc):null,
			      "wastageOriginalAmt": (vendorArr[i].wastgeAmt !=null && (vendorArr[i].wastgeAmt) !="")?(vendorArr[i].wastgeAmt):null,
			      "wastageOriginalWt": (vendorArr[i].wastgeWt !=null && (vendorArr[i].wastgeWt) !="")?(vendorArr[i].wastgeWt):null,
			      "wastageDebitWt": (vendorArr[i].wastageDebitWt !=null && (vendorArr[i].wastageDebitWt) !="")?(vendorArr[i].wastageDebitWt):null,
			      "wastageDebitAmt": (vendorArr[i].wastageAmtDeb !=null && (vendorArr[i].wastageAmtDeb) !="")?(vendorArr[i].wastageAmtDeb):null,
			      "jwType": (vendorArr[i].mrvType !=null && (vendorArr[i].mrvType) !="")?(vendorArr[i].mrvType):(vendorArr[i].mrvTypeId),
			      "skinPurity": (vendorArr[i].purity !=null && (vendorArr[i].purity) !="")?(vendorArr[i].purity):null,
			      "meltingPurity": (vendorArr[i].meltingPurity !=null && (vendorArr[i].meltingPurity) !="")?(vendorArr[i].meltingPurity):null,
			      "costCode": (vendorArr[i].costCode !=null && (vendorArr[i].costCode) !="")?(vendorArr[i].costCode):null,
			      "vendorItemCost": (vendorArr[i].vendorItemAmt !=null && (vendorArr[i].vendorItemAmt) !="")?(vendorArr[i].vendorItemAmt):null,
			      "isIgst":  (vendorArr[i].isIgst !=null && (vendorArr[i].isIgst) !="")?(vendorArr[i].isIgst):null,
			      "metalSegment": (vendorArr[i].metalTypeId !=null && (vendorArr[i].metalTypeId) !="")?{"id" : (vendorArr[i].metalTypeId)}:null,
			      "segment": (vendorArr[i].seghide != null && vendorArr[i].seghide != "") ? { "id": vendorArr[i].seghide}  : null,
			      "jewelType":  (vendorArr[i].jewelCodehide != null && vendorArr[i].jewelCodehide != "") ? { "id": vendorArr[i].jewelCodehide}  : null,
			      "mrvNo": (vendorArr[i].mrvNo !=null && (vendorArr[i].mrvNo) !="")?(vendorArr[i].mrvNo):null,
			      "mrvSrlNo": (vendorArr[i].mrvSlNo !=null && (vendorArr[i].mrvSlNo) !="")?(vendorArr[i].mrvSlNo):null,
			      "hsnCode": (vendorArr[i].hsnCode != null && vendorArr[i].hsnCode != "") ?vendorArr[i].hsnCode: null,
			      "meltingPurity":(vendorArr[i].meltingPurity != null && vendorArr[i].meltingPurity != "")?vendorArr[i].meltingPurity :"",	
			    		
			"vendorReturnStones" : [],
			"vendorReturnAccessories" : [],
			"vendorReturnTaxDetails":[]
		}
		var refTypeC = $("#refTypeC").val();
		if (typeof rowsStone != "undefined") {
			var stoneObjVal = {};
			$.each(rowsStone, function(k, v) {
				if((vendorArr[i].refSlNo == "")){
					vendorArr[i].refSlNo = null;
				}
				if((vendorArr[i].refType == v.refDocType)&&(vendorArr[i].refNo == v.refDocNo)&&(vendorArr[i].refSlNo == v.slNo)){
				  var stoneObj = {
						  "serialNumber": v.serialNumber,
						  "refDocType": (v.refDocType !=null && (v.refDocType) !="")?(v.refDocType):null,
						  "refDocNo": (v.refDocNo !=null && (v.refDocNo) !="")?(v.refDocNo):null,
						  "refDocSrlNo": (v.slNo !=null && (v.slNo) !="")?(v.slNo):null,
						  "stoneCode": v.stCode,
				          "cutGrade": v.cutGrade,
				          "clarity": v.clarity,
				          "color": v.color,
				          "actualColor": v.actCol,
				          "shape":(v.shapeId  != null && v.shapeId != "") ? { "id": v.shapeId}  : null,
				          "stoneWt": v.stWt,
				          "stonePieces":v.pcs,
				          "stoneRate":v.stRate,
				          "stoneCost": v.vendStCost,
				          "wtCostSlab": v.wtRange,
				          "uom": v.uqc,
				          "subCategoryDesc": v.subCategoryDesc,
				          "debitPerc": v.vendPercDeb,
				          "debitCost": v.vendCostDeb,
				          "segment": (v.segId  != null && v.segId != "") ? { "id": v.segId}  : null,
				          "category":(v.mainCatId  != null && v.mainCatId != "") ? { "id": v.mainCatId}  : null,
				          "subCategory": (v.subCatOrShapeId  != null && v.subCatOrShapeId != "") ? { "id": v.subCatOrShapeId}  : null,
				   }
				 vendorReturnItems['vendorReturnStones'].push(stoneObj);
			    }
			 });
			}
		if (typeof rowsAcc != "undefined") {
			$.each(rowsAcc, function(k, v) {
				var accRow = {};
				if((vendorArr[i].refSlNo == "")){
					vendorArr[i].refSlNo = null;
				}
			  if ((vendorArr[i].refType == v.refDocType)&&(vendorArr[i].refNo == v.refDocNo)&&(vendorArr[i].refSlNo == v.accSlNo)) {
				  var accRow = {
							  "serialNumber": v.serialNumber,
							  "refDocType": (v.refDocType !=null && (v.refDocType) !="")?(v.refDocType):null,
							  "refDocNo": (v.refDocNo !=null && (v.refDocNo) !="") ? (v.refDocNo) : null,
							  "refDocSrlNo": (v.accSlNo !=null && (v.accSlNo) !="") ? (v.accSlNo) : null,
							  "accCode": v.accCode,
					          "accWt": v.accWt,
					          "accPieces": v.accPcs,
					          "accRate": v.accRate,
					          "accCost": v.vendAccCost,
					          "uom": v.accUqc,
					          "subCategoryDesc": v.subCategoryDesc,
					          "debitPerc": v.vendAccPercDeb,
					          "debitCost": v.vendAccCostDeb,
					          "segment": (v.accSegId  != null && v.accSegId != "") ? { "id": v.accSegId}  : null,
					          "category": (v.accMainCatId  != null && v.accMainCatId != "") ? { "id": v.accMainCatId}  : null,
					          "subCategory":(v.accSubCatOrShape  != null && v.accSubCatOrShape != "") ? { "id": v.accSubCatOrShape}  : null,
					          "shape":(v.shapeId  != null && v.shapeId != "") ? { "id": v.shapeId}  : null,
					}
					vendorReturnItems['vendorReturnAccessories'].push(accRow);
			     }
	        });
       }
		
		if (typeof rowTax != "undefined" || rowTax != null) {
			$.each(rowTax, function(k, v) {
				var taxRow = {};
				if((vendorArr[i].refSlNo == "")){
					vendorArr[i].refSlNo = null;
				}
				
			    if ((vendorArr[i].refType == v.refDocType)&&(vendorArr[i].refNo == v.refDocNo)&&(vendorArr[i].refSlNo == v.refDocSrlNo)) {
					vendorReturnItems['vendorReturnTaxDetails'].push(v);
			     }
	        });
		}
		VendorItemArray.push(vendorReturnItems);
}
//#################################### Create Object Format #########################
	var vendorReturnArr = {
			"materialType" : $("#matTypeC").val(),
			"vendor" : {
				"id" : $("#vendorCodeC").val()
			},
			"gstin" : $("#gstinC option:selected").text(),
			"vendorReturnDetails" : VendorItemArray,
		}
	console.log(JSON.stringify(vendorReturnArr));
	postJSON('/OrderExecution/api/v1/createVendorReturn', JSON.stringify(vendorReturnArr), function(data) {
		if (data.resCode == 1) {
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			redirect();
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
			return false
		}
	});
});


var redirect = function() {
	window.location.href="javascript:showContentPage('vendorReturnCreate', 'bodySwitcher')";
	return window.location.href;
}
$("#clearallC").on('click', function() {
	redirect();
});
$("#clearall").on('click', function() {
	
	redirect();
});

$('.modal').on('hidden.bs.modal', function() {
	$('#articleModelPopUp').trigger("reset");
});

var NVL = function(source, replaceMentValue){
	if(typeof source != "undefined" && source != null && source != ""){
		return source;
	}
	else return replaceMentValue;
}
