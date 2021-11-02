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

var globalIndex = null;
var vendorList = {};
var data = {};
var globalStoneWt = null;

var orderItemDesignRenderer = function(row, column, value) {
	var data =  $("#grDetailGrid").jqxGrid("getCellvalue", row , 'psr');
	var rows = $('#grDetailGrid').jqxGrid('getrows');	
		
	var grFgDetailsGrid = "grFgDetailsGrid";
	if(null != value && "N" != data && null != data){
		if (rows[row].viewDesign != null) {
			return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#designView" type="button" href="orderItemDesign?psr='+ data + '"/><span class="fa fa-binoculars"></span> View </a>';
		}
	}else{
		return "";
	}
		
}

function articleSearchPopUp()  {	
	$("#articleSearch").modal({ remote: "articleSearch?vendorId=" + $('#vendorCode-valueC').val() + "&segId=" + $("#metalSegmentId").val(), target: "articleSearch" });
	return false;
}

$('#articleSearch').on('loaded.bs.modal',function(e) {			
	var segmentId = $("#metalSegmentId").val();						
	if(segmentId.length > 0) {	
		$("#segment").val(segmentId).change();
	}			
});

$('#articleSearch').on('hide.bs.modal', function(e) {	
	var cell = $("#grDetailGrid").jqxGrid('getselectedcell');
	var rowid = $("#grDetailGrid").jqxGrid('getrowid', cell.rowindex);
	var row = $("#grDetailGrid").jqxGrid('getrowdatabyid', rowid);
	if($("#articleCode").val() != "") {
		row['articleCode'] = $("#articleCode").val();		
		row['hsnMasterCode'] = $("#hsnMasterCode").val();		
		row['hsnMasterId'] = $("#hsnMasterId").val();		
		row['taxStructureId'] = $("#taxStructureId").val();		
		row['articleDesc'] = $("#articleDesc").val();
		row['jwlType'] = $("#jewelType option:selected").attr("CodeJwl");
		row['isPair'] = $("#isPair").val();
		row['segmentId'] = $("#segment").val();
		row['segmentCode'] = $("#segment :selected").text();
		row['jwType'] = $("#jewelType").val();
		row['mainCategory'] = $("#category").val();
		row['subCategory'] = $("#subCategory").val();
		row['metalTypeId'] = $("#metalTypeId").val();
		row['storeId'] = $("#storeId").val();
		$('#grDetailGrid').jqxGrid('updaterow', rowid, row);
	}
	$("#grDetailGrid").jqxGrid('focus');
});

function stoneSearchPopUp(row)  {	
	var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
    var psrType =  $('#grDetailGrid').jqxGrid('getcellvalue', (grSrlno-1), 'psr');
    
	$("#stoneSearch").modal({ remote: "stoneSearch?from=grfg", target: "stoneSearch" });
	return false;
}


var accSearchPopUp = function() {
	$("#jwAccPcsSection").hide();
	$("#jwAccWtSection").hide();
	$("#jwAccPriceSection").hide();
	$("#compAccWt").prop('disabled', false);
	$("#accConditionSection").hide();

	$("#compAccPcsSection").hide();
	$("#compAccWtSection").hide();
	$("#compAccPriceSection").hide();
	$('#accSupBy').empty().append(
			'<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/getAccessoryHeaders ', function(data) {
		var accSupByList = data.payload.suppliedBy;

		$.each(accSupByList, function(k, v) {
			if (v.id != "CU") {
				$('#accSupBy').append('<option value="' + v.id + '">' + v.name	+ '</option>');
			}
		});
	});
}

$('#stoneSearch').on('loaded.bs.modal',	function(e) {
	var cell = $("#grStoneDetailGrid").jqxGrid('getselectedcell');
	var rowid = $("#grStoneDetailGrid").jqxGrid('getrowid', cell.rowindex);
	var row = $("#grStoneDetailGrid").jqxGrid('getrowdatabyid', rowid);
	var suppliedBy = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
	
	$("#suppBy").val(suppliedBy).change();
});

$('#stoneSearch').on('hide.bs.modal', function(e) {
	var cell = $("#grStoneDetailGrid").jqxGrid('getselectedcell');
	var rowid = $("#grStoneDetailGrid").jqxGrid('getrowid', cell.rowindex);
	var row = $("#grStoneDetailGrid").jqxGrid('getrowdatabyid', rowid);
	
	if ($("#subCategoryDesc").val() != "") {
		row["suppliedBy"] = $("#suppBy").val();
		row["suppliedBys"] = $('#suppBy option:selected').text();
		row["stoneCode"] = $("#stoneCode").val();;
		row["subCategory"] = $("#subCategoryDesc").val();
		row["uom"] =  $("#uom").val();

		if (new String("Diamond").valueOf() == $('#segment option:selected').text()) {
			row['wgtRange'] = $("#weightRange").val();
			row['clarity'] = $("#clarity").val();
			if($("#actualColor").val() != "") {
				row['actualColor'] = $("#actualColor").val();
			}
			row['color'] = $("#color").val();
			row['cutGrade'] = $("#cutGrade").val();
		}
		
		$('#grStoneDetailGrid').jqxGrid('updaterow', rowid, row);
		
		var params = {
			"stoneCode" : row["stoneCode"],
			"cutGrade" : row["cutGrade"],
			"clarity" : row['clarity'],
			"color" : row['color'],
			"actualColor" : row['actualColor'] ,
			"wgtRange" : row['wgtRange'],
			"vendorId" : $('#vendorCode-value').val()
			
		};

		postJSON('/OrderExecution/api/v1/vendorStoneCostDetails', JSON.stringify(params), function(data) {		
			if(1 == data.resCode){
				row['GRStoneCostSPDTO'] = data.payload.list;
				$('#grStoneDetailGrid').jqxGrid('updaterow', rowid, row);
			}else{
				$.growl.error({ message: data.mesgStr, duration: 5000, title: 'Error' });
			}
		});
	}

	$("#grStoneDetailGrid").jqxGrid('focus');
});

function attributeSearchPopUp(row)  {

	var articleCode = $('#grDetailGrid').jqxGrid('getcellvalue', row, 'articleCode');
	if(articleCode == null) {
		$.growl.error({ message: "Article Code is mandatory to set the attributes!", duration: 5000, title: 'Error' });
		return false;
	}

	$("#attributeSearch").modal({ remote: "attributeSearch?article=" + articleCode, target: "attributeSearch" });
}


$('#attributeSearch').on('loaded.bs.modal',	function(e) {
	var cell = $("#grDetailGrid").jqxGrid('getselectedcell');
	var rowid = $("#grDetailGrid").jqxGrid('getrowid', cell.rowindex);
	var row = $("#grDetailGrid").jqxGrid('getrowdatabyid', rowid);

	populateAttributePopUp(
		row['attrLength'], row['size'], row['height'],row['diameter'], row['width'], row['metalColor'],row['hookType'], row['screwType'], row['loopType'],
		row['polishType'], row['settingType'],row['vendorArticle'], row['combination'],	row['collectionName']
	);
});

var handlekeyboardnavigation = function(event, gridId)
{
    var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
    if(key == 112) {
    	var cell = $('#grDetailGrid').jqxGrid('getselectedcell');
    	if(cell != null && cell.datafield == 'hallMarkCharges') {
    		$("#grDetailGrid").jqxGrid('addrow', null, {});
    		var rowindex = cell.rowindex;
    		return true;
    	}
    }
}

//############################################ Moved from grProcessOnloadPage To Grfg Page @POOJA #######################################
function updateStoneDetails(row){	
	var stoneRows = $("#grStoneDetailGrid").jqxGrid('getrows');
	
	if(null != stoneRows && stoneRows.length >0 && (stoneRows[0].grSlNo == (row+1))){
		var rowData = $("#grDetailGrid").jqxGrid('getrowdata', row);
	
		rowData['stoneList'] = stoneRows;
		$('#grDetailGrid').jqxGrid('updaterow', row, rowData); 
	}
}

function updateAccDetails(row){
	var accRows = $("#grAccDetailGrid").jqxGrid('getrows');	
	if(null != accRows && accRows.length > 0 && (accRows[0].grSlNo == (row+1))){
		var rowData = $("#grDetailGrid").jqxGrid('getrowdata', row);
		rowData['accessoryList'] = accRows;
		$('#grDetailGrid').jqxGrid('updaterow', row, rowData);
	}
}

function onClickSrlUpdateStoneDetails(){
	var stoneRows = $("#grStoneDetailGrid").jqxGrid('getrows');
	
	if(undefined != stoneRows && null != stoneRows && stoneRows.length > 0){
		var rowData = $("#grDetailGrid").jqxGrid('getrowdata', (stoneRows[0].grSlNo-1));
		rowData['stoneList'] = stoneRows;
		$('#grDetailGrid').jqxGrid('updaterow', (stoneRows[0].grSlNo-1), rowData); 
	}
}

function onClickSrlUpdateAccDetails(){
	var accRows = $("#grAccDetailGrid").jqxGrid('getrows');
	
	if(undefined != accRows && null != accRows && accRows.length > 0){
		var rowData = $("#grDetailGrid").jqxGrid('getrowdata', (accRows[0].grSlNo-1));
		rowData['accessoryList'] = accRows;
		$('#grDetailGrid').jqxGrid('updaterow', (accRows[0].grSlNo-1), rowData);
	}
}

//#################################################################################### ##############################

function grStoneAccDetails(srl)
{
	onClickSrlUpdateStoneDetails();
	onClickSrlUpdateAccDetails();
	
	var row = $("#grDetailGrid").jqxGrid('getrowdata', (srl-1));
	var psr = row.psr;
	if(null != row && (null == psr)){
		$.growl.error({ message: "Please select PSR No field.", duration: 10000, title: 'Error' });
		
		return false;
	}

	grAccessoryGrid();
	grStoneGrid();
	
	var stoneData = row.stoneList;
	 
	var accData = row.accessoryList;
	 
	
	if(stoneData != null) {
		 for(var i=0; i<stoneData.length; i++){
			 $("#grStoneDetailGrid").jqxGrid('addrow', null, stoneData[i]);
		 }
	}else{
		 if(psr == "N"){
			 if(stoneData != null){
				 for(var i=0; i<stoneData.length; i++){
					 $("#grStoneDetailGrid").jqxGrid('addrow', null, adGrStones(srl));
				 } 
			 }
		 }		
	 }
	
	 if(accData != null) {
		 for(var i=0; i<accData.length; i++){
			 $("#grAccDetailGrid").jqxGrid('addrow', null, accData[i]);
		 }
	 }else{
		 if(psr == "N"){
			 if(accData != null){
				 for(var i=0; i<accData.length; i++){
					 $("#grAccDetailGrid").jqxGrid('addrow', null, adGrAccessorys(srl));
				 } 
			 }
		 }		 
	 }
}

var checkGRDetailsValid = function(row, datafield, columntype){	 
	if(row > 0){	
		var grossWt =  $('#grDetailGrid').jqxGrid('getcellvalue', (row-1), 'grossWt');
		var isValid =  $('#grDetailGrid').jqxGrid('getcellvalue', (row-1), 'isValid');
		var netWt =  $('#grDetailGrid').jqxGrid('getcellvalue', (row-1), 'netWt');
		if(grossWt == null && netWt == null){
			$.growl.error({ message: "Previous line item not validate.", duration: 10000, title: 'Error' });
			return false;
		}
		
		if((grossWt != netWt)){
			if(isValid == false){
				$.growl.error({ message: "Previous line item not validate.", duration: 10000, title: 'Error' });				
				return false;
			}else{
				return true;
			}
		}
		
		if(grossWt == netWt){
			return true;
		}
		
	}else{
		return true;
	}		
}

var updateProvFlag = function(row){
	var actcostMCValue = $("#grDetailGrid").jqxGrid('getcellvalue', row, "actcostMC");
	var costMCValue = $("#grDetailGrid").jqxGrid('getcellvalue', row, "costMC");
	
	var actcostWastageWtValue = $("#grDetailGrid").jqxGrid('getcellvalue', row, "actcostWastageWt");
	var costWastageWTValue = $("#grDetailGrid").jqxGrid('getcellvalue', row, "costWastageWT");
	
	
	if((actcostMCValue == costMCValue) && (actcostWastageWtValue == costWastageWTValue)){			    				
		$("#grDetailGrid").jqxGrid('setcellvalue', row, "provisional", false);
	}else{
		$("#grDetailGrid").jqxGrid('setcellvalue', row, "provisional", true);
	}
}

function grFgGrid() {
	
	var updateRow = function(rowid, newdata, commit) {
		commit(true);
	}

	var deleteRow = function(rowid, commit) {
		commit(true);
	}
	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}

	var psrTypeSource = {datatype : 'json', datafields : [{name : 'id', type : 'String'}, {name : 'name', type : 'String'}],localdata : psrList};

	var psrTypeDataAdapter = new $.jqx.dataAdapter(psrTypeSource, {	autoBind : true });
	
	var vendorCostSource = {datatype : 'json',datafields : [{name : 'id',type : 'string'}, {name : 'name',type : 'string'}], localdata : vendorCost};

	var vendorCostDataAdapter = new $.jqx.dataAdapter(vendorCostSource, {autoBind : true});

	var costToBeBorne = {datatype : 'json',	datafields : [{	name : 'id',type : 'string'	}, {name : 'name',type : 'string'}],localdata : costToBeBorneBy};

	var costToBeBorneByDorp = new $.jqx.dataAdapter(costToBeBorne, {autoBind : true});
	
	var datafields = [ 
		{'name' : 'srl','type' : 'int'}, 
		{'name' : 'psr','type' : 'string'},
		{'name' : 'psrNos',value : 'psrNo',	values : {source : psrTypeDataAdapter.records,value : 'id',	name : 'name'}},  
		{'name' : 'segmentId','type' : 'long'}, 
		{'name' : 'segmentCode','type' : 'string'}, 
		{'name' : 'jwType','type' : 'string'},  
		{'name' : 'mainCategory','type' : 'string'}, 
		{'name' : 'subCategory','type' : 'string'}, 
		{'name' : 'articleCode','type' : 'string'}, 
		{'name' : 'articleDesc','type' : 'string'}, 
		{'name' : 'hsnMasterCode','type' : 'string'}, 
		{'name' : 'hsnMasterId','type' : 'int'},  
		{'name' : 'jwlType','type' : 'string'}, 
		{'name' : 'pcs','type' : 'long'}, 
		{'name' : 'pendingPcs','type' : 'long'}, 
		{'name' : 'isPair','type' : 'string'},
		{'name' : 'grossWt','type' : 'double'}, 
		{'name' : 'netWt','type' : 'double'},
		{'name' : 'costCode','type' : 'string'},
		{'name' : 'costCodes',value : 'costCode',values : {	source : vendorCostDataAdapter.records,	value : 'id',name : 'name'}},
		{'name' : 'costWastageWT','type' : 'double'}, 
		{'name' : 'costMC','type' : 'double'}, 	
		{'name' : 'actcostWastageWt','type' : 'double'}, 
		{'name' : 'actcostMC','type' : 'double'}, 
		{'name' : 'sellWastageWt','type' : 'double'}, 
		{'name' : 'sellMC','type' : 'double'},
		{'name' : 'actsellWastageWt','type' : 'double'}, 
		{'name' : 'actsellMC','type' : 'double'},
		{'name' : 'metalValue','type' : 'double'},
		{'name' : 'wastageValue','type' : 'double'},
		{'name' : 'reason','type' : 'string'},
		{'name' : 'selling_price','type' : 'double'},
		{'name' : 'setSellingPrice','type' : 'string'},
		{'name' : 'attributes','type' : 'string'}, 
		{'name' : 'photo','type' : 'string'}, 
		{'name' : 'viewDesign','type' : 'string'},
		{'name' : 'provisional','type' : 'boolean'}, 
		{'name' : 'hallMarkCharges','type' : 'double'}, 
		{'name' : 'stoneList','type' : 'array'}, 
		{'name' : 'accessoryList','type' : 'array'},
		{'name' : 'validate','type' : 'string'},
		{'name' : 'action','type' : 'string'},
		{'name' : 'isValid','type' : 'boolean'},
		{'name' : 'attrLength','type' : 'string'},
		{'name' : 'size','type' : 'string'},
		{'name' : 'height','type' : 'string'},
		{'name' : 'diameter','type' : 'string'},
		{'name' : 'width','type' : 'string'},
		{'name' : 'vendorArticle','type' : 'string'},
		{'name' : 'combination','type' : 'string'},
		{'name' : 'metalColor','type' : 'string'},
		{'name' : 'hookType','type' : 'string'},
		{'name' : 'screwType','type' : 'string'},
		{'name' : 'loopType','type' : 'string'},
		{'name' : 'polishType',	'type' : 'string'},
		{'name' : 'settingType','type' : 'string'},
		{'name' : 'collectionName',	'type' : 'string'},
		{'name' : 'orderKind','type' : 'string'},
		{'name' : 'orderType','type' : 'string'},
		{'name' : 'metalTypeId','type' : 'long'},
		{'name' : 'storeId','type' : 'long'},
		{'name' : 'selectionStatus','type' : 'bool'},
		{'name' : 'selectionStatusCopy','type' : 'bool'}];
	
	var columns = [ 
		{text : 'Srl No.', sortable : false, filterable : false, editable : false, groupable : false,draggable : false,resizable : false, datafield : 'srl',width : '3%',
			cellsrenderer : function(row, column, value) {
				return '<a style="margin:4px;"  onclick=grStoneAccDetails('+ (value) +') href="#?id=' + (value) + '"/>'+ (value) +'</a>';
			}
		}, 
		{text : 'Pending Pcs',datafield : 'pendingPcs',width : '6%', hidden:true, editable : true,cellsalign : 'center',	align:'center'},
		{text : 'Order Type',datafield : 'orderType',width : '6%', hidden:true, editable : true,cellsalign : 'center',	align:'center'},
		{text : 'PSR No.',datafield : 'psr',width : '6%',editable : true,cellsalign : 'center',	align:'center',
			columntype : 'combobox', displayfield : 'psrNos',filtertype : 'checkedlist',
			createeditor : function(row, value, editor) {
			editor.jqxComboBox({
				source : psrTypeDataAdapter,displayMember : 'name',	valueMember : 'id'
			});
			},

			cellbeginedit : checkGRDetailsValid,
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) { 
				var isValid =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'isValid');
				var orderKind =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'psr');
				
				if(isValid == true){
					$.growl.notice({ message: "Row " + (row+1) + " already validate!", duration: 10000, title: 'success' });
					return false;
				}
				
				$("#grDetailGrid").jqxGrid('setcellvalue', row, "selectionStatus", true);   

				var orderType =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'orderType');
				var rowData = $("#grDetailGrid").jqxGrid('getrowdatabyid', row);
				if("N" == newvalue.value){ 
					rowData['articleCode'] = null;
    				rowData['articleDesc'] = null;
    				rowData['hsnMasterCode'] = null;
    				rowData['hsnMasterId'] = null;
    				rowData['taxStructureId'] = null;
					rowData['grossWt'] = 0;
    				rowData['netWt'] = 0;
    				rowData['pcs'] = 0;
    				rowData['jwlType'] = null;
    				rowData['isValid'] = false;
    				rowData['attributes'] = false;
    				rowData['orderKind'] = null;
    				rowData['costMC'] = 0;
    				rowData['costWastageWT'] = 0;
    				rowData['actcostMC'] = 0;
    				rowData['actcostWastageWt'] = 0;
    				rowData['sellMC'] = 0;
    				rowData['sellWastageWt'] = 0;
    				rowData['actsellMC'] = 0;
    				rowData['actsellWastageWt'] = 0;
    				rowData['metalValue'] = 0;
    				rowData['wastageValue'] = 0;
    				rowData['selling_price'] = 0;
    				rowData['costCodes'] = null;
    				rowData['costCode'] = null;	
					return newvalue;					
				}
				var characterReg = /^([0-9]{0,19})$/;
			    if(!characterReg.test(newvalue.value)) {
			    	$.growl.error({ message: "Invalid PSR value", duration: 10000, title: 'Error' });
			    	return "";
			    }
			    if(materialTypePSR((row+1), newvalue.value) && orderKind != 'ST'){		    	
			    	$.growl.error({ message: "Duplicate PSR No for the GR Details", duration: 10000, title: 'Error' });
			    	return "";
			    }else{
			    	postJSON('/OrderExecution/api/v1/GRDetailsByPSR', JSON.stringify(grFilterValues(newvalue.value, (row+1))), function(data) {					
			    		if(1 == data.resCode){
			    	
		    				
		    				
			    			
			    			rowData['grossWt'] = 0;
		    				rowData['netWt'] = 0;
		    				rowData['pcs'] = 0;
		    				rowData['jwlType'] = null;
		    				rowData['isValid'] = false;
		    				rowData['attributes'] = false;
		    				rowData['orderKind'] = null;
		    				rowData['costMC'] = 0;
		    				rowData['costWastageWT'] = 0;
		    				rowData['actcostMC'] = 0;
		    				rowData['actcostWastageWt'] = 0;
		    				rowData['sellMC'] = 0;
		    				rowData['sellWastageWt'] = 0;
		    				rowData['actsellMC'] = 0;
		    				rowData['actsellWastageWt'] = 0;
		    				rowData['metalValue'] = 0;
		    				rowData['wastageValue'] = 0;
		    				rowData['selling_price'] = 0;
		    				rowData['costCodes'] = null;
		    				rowData['costCode'] = null;		
			    			var stoneLength = data.payload.psrDetails.stoneList;
			    			var accLength = data.payload.psrDetails.accessoryList;
			    			if(stoneLength.length == 0){ $("#grStoneDetailGrid").jqxGrid('clear');}
			    			if(accLength.length == 0){
			    				$("#grAccDetailGrid").jqxGrid('clear');
			    			}
			    			
			    			if("ST" == data.payload.psrDetails.orderType){
			    				rowData['pendingPcs'] = data.payload.psrDetails.pendingPcs;
			    				rowData['isValid'] = false;			
			    			}
			    			rowData['orderType'] = data.payload.psrDetails.orderType;
			    			if("CSP" == data.payload.psrDetails.orderKind){
			    				rowData['articleCode'] = data.payload.psrDetails.articleCode;
			    				rowData['articleDesc'] = data.payload.psrDetails.articleDesc;
			    				rowData['hsnMasterCode'] = data.payload.psrDetails.hsnMasterCode;
			    				rowData['hsnMasterId'] = data.payload.psrDetails.hsnMasterId;
			    				rowData['taxStructureId'] = data.payload.psrDetails.taxStructureId;
			    				rowData['grossWt'] = data.payload.psrDetails.grossWt;
			    				rowData['netWt'] = data.payload.psrDetails.netWt;
			    				rowData['pcs'] = data.payload.psrDetails.pcs;
			    				rowData['jwlType'] = data.payload.psrDetails.jwTypeDesc;
			    				rowData['isValid'] = true;
			    				rowData['attributes'] = true;
			    				rowData['orderKind'] = data.payload.psrDetails.orderKind;
			    				rowData['costMC'] = 0;
			    				rowData['costWastageWT'] = 0;
			    				rowData['actcostMC'] = 0;
			    				rowData['actcostWastageWt'] = 0;
			    				rowData['sellMC'] = 0;
			    				rowData['sellWastageWt'] = 0;
			    				rowData['actsellMC'] = 0;
			    				rowData['actsellWastageWt'] = 0;
			    				rowData['metalValue'] = 0;
			    				rowData['wastageValue'] = 0;
			    				rowData['selling_price'] = 0;
			    				
			    			}else{
			    				rowData['articleCode'] = data.payload.psrDetails.articleCode;
			    				rowData['articleDesc'] = data.payload.psrDetails.articleDesc;
			    				rowData['hsnMasterCode'] = data.payload.psrDetails.hsnMasterCode;
			    				rowData['hsnMasterId'] = data.payload.psrDetails.hsnMasterId;
			    				rowData['taxStructureId'] = data.payload.psrDetails.taxStructureId;
			    				
			    				rowData['pcs'] = (data.payload.psrDetails.orderType != "ST") ? data.payload.psrDetails.pcs : null;
			    				rowData['viewDesign'] = data.payload.psrDetails.designLink;
			    				rowData['jwlType'] = data.payload.psrDetails.jwTypeDesc;
			    				rowData['attrLength'] = data.payload.psrDetails.attrLength;
			    				rowData['size'] = data.payload.psrDetails.size;
			    				rowData['height'] = data.payload.psrDetails.height;
			    				rowData['diameter'] = data.payload.psrDetails.diameter;
			    				rowData['width'] = data.payload.psrDetails.width;
			    				rowData['vendorArticle'] = null;
			    				rowData['combination'] = null;
			    				rowData['metalColor'] = data.payload.psrDetails.metalColor;
			    				rowData['hookType'] = data.payload.psrDetails.hookType;
			    				rowData['screwType'] = data.payload.psrDetails.screwType;
			    				rowData['loopType'] = data.payload.psrDetails.loopType;
			    				rowData['polishType'] = data.payload.psrDetails.polishType;
			    				rowData['settingType'] = data.payload.psrDetails.settingType;
			    				rowData['collectionName'] = data.payload.psrDetails.collectionName;
			    				rowData['orderKind'] = data.payload.psrDetails.orderKind;
			    				
				    			if("CRP" == data.payload.psrDetails.orderKind){
				    				rowData['costCodes'] = "Repair";
				    				rowData['costCode'] = "R";			    				
				    				rowData['costWastageWT'] = 0;
				    				rowData['costMC'] = 0;
				    				rowData['sellWastageWt'] = 0;
				    				rowData['sellMC'] = 0;
				    			}
				    			
				    			if(data.payload.psrDetails.articlePairFlag == true){
				    				rowData['hallMarkCharges'] = ((data.payload.psrDetails.pcs/2) * halmarkCharges[data.payload.psrDetails.segmentCode.toUpperCase()]);
				    			}else{
				    				rowData['hallMarkCharges'] = (data.payload.psrDetails.pcs * halmarkCharges[data.payload.psrDetails.segmentCode.toUpperCase()]);
				    			}
			    			}
			    			rowData['segmentId'] = data.payload.psrDetails.segmentId;
			    			rowData['segmentCode'] = data.payload.psrDetails.segmentCode;
			    			rowData['metalTypeId'] = data.payload.psrDetails.metalTypeId;
			    			rowData['storeId'] = data.payload.psrDetails.storeId;
			    			rowData['jwType'] = data.payload.psrDetails.jwType;
			    					    			
			    			
			    			rowData['attributes'] = true;		    			

							var stoneRowsData = $("#grStoneDetailGrid").jqxGrid('getrows');
			    			$('#grDetailGrid').jqxGrid('updaterow', row, rowData);		    			
						
			    			var stoneDetails = data.payload.psrDetails.stoneList;
							
			    			if(null != stoneDetails){
								grStoneGrid();
								for(var i=0; i<stoneDetails.length; i++){
										if(row > 0){
											if(stoneRowsData.length != 0){
												var issuedPcs = stoneRowsData[i].issuedPcs - stoneRowsData[i].usedPcs;
												var issuedWt = stoneRowsData[i].issuedWt - stoneRowsData[i].usedWt;
											}else{
												var issuedPcs = null;
												var issuedWt = null;
											}
											
											stoneDetails[i]['issuedPcs'] = issuedPcs;
											stoneDetails[i]['issuedWt'] = issuedWt;
										}
									 $("#grStoneDetailGrid").jqxGrid('addrow', null, adGrStonesByPsr(stoneDetails[i]));
								 }
								 $("#grDetailsSrl").val(row+1);
								 updateStoneDetails(row);
								 $("#addStone").show();							 
							}
						
			    			var accDetails = data.payload.psrDetails.accessoryList;
			    			if(null != accDetails){
			    				grAccessoryGrid();
			    				for(var i=0; i<accDetails.length; i++){
			    					$("#grAccDetailGrid").jqxGrid('addrow', null, adGrAccByPsr(accDetails[i]));
			    				}							 
			    				$("#grDetailsSrl").val(row+1);
			    				updateAccDetails(row);
			    				$("#addAccessory").show();
			    			}						 
			    			return;						
			    		}else {
			    			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			    			return "";
			    		}
			    	});
			    }
			}
		},	
		{'text' : 'Art. Code','datafield' : 'articleCode','width' : '6%',editable : true,cellbeginedit: grFgDetails},
		{'text' : 'J.Code','datafield' : 'jwlType','width' : '6%',editable : false},  
		{'text' : 'Art. Desc.','datafield' : 'articleDesc','width' : '6%',editable : false}, 
		{'text' : '','datafield' : 'hsnMasterCode','width' : '4%',editable : false, hidden: true}, 
		{'text' : '','datafield' : 'hsnMasterId','width' : '4%',editable : false, hidden: true},  
		
		{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',editable : true,	cellbeginedit: grNtWtValidation,cellsformat: 'n',columntype: 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits:0, min: 0, spinButtons: false });
			},
			validation: function (cell, value) {
				var row = $("#grDetailGrid").jqxGrid('getrowdatabyid', cell.row);
	            if (value < 0) {
	                return { result: false, message: "Invalid Number" };
	            }
	            
	            if(row["isPair"] == "true" && value%2 != 0) {            	
	            	return { result: false, message: "Enter even number of pieces" };           	
	            }
	            return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {	    
				var rowData = $("#grDetailGrid").jqxGrid('getrowdatabyid', row);        	
				var segmentCode =  jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'segmentCode');	    	
				var halmark= (newvalue * halmarkCharges[rowData['segmentCode'].toUpperCase()]);        	
				$("#grDetailGrid").jqxGrid('setcellvalue', row, "hallMarkCharges", halmark);        	
				$("#grDetailGrid").jqxGrid('setcellvalue', row, "isValid", false);
			}
		}, 
	    {'text' : 'Gr.Wt.','datafield' : 'grossWt','width' : '4%',cellbeginedit: grNtWtValidation,editable : true,cellsformat : 'd3',columntype : 'numberinput',
	    	initeditor: function (row, cellvalue, editor) {
	    		editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
	    	},
	    	validation: function (cell, value) {
	    		if (value < 0) { return { result: false, message: "Invalid Number" }; }
	    		return true;
	    	},
	    	cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {		
	    		$("#grDetailGrid").jqxGrid('setcellvalue', row, "isValid", false);		    
	    		var orderKind =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'orderKind');
    		
	    		if(orderKind != undefined && "CRP" == orderKind){
	    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "netWt", null);
	    		}else if((orderKind != undefined && "CRP" != orderKind) || orderKind == undefined){
	    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "costCode", null);
					$("#grDetailGrid").jqxGrid('setcellvalue', row, "costCodes", null);
					$("#grDetailGrid").jqxGrid('setcellvalue', row, "netWt", null);
	    		}
	    	}
    	}, 
    	{'text' : 'Net Wt.','datafield' : 'netWt','width' : '4%',editable : true,cellbeginedit: grNtWtValidation,cellsformat : 'd3',columntype : 'numberinput',
    		initeditor: function (row, cellvalue, editor) {
	    		 editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
    		},
    		validation: function (cell, value) {
    			if (value < 0) {return { result: false, message: "Invalid Number" };}
    			return true;
    		},	     
    		
    		cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    		 $("#grDetailGrid").jqxGrid('setcellvalue', row, "isValid", false);
	    		 var grWt = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'grossWt');
	    		 if(newvalue > grWt.value){
	    			 $.growl.error({ message: "Net Wt cannot be greater than gross wt", duration: 10000, title: 'Error' });
	    			 return "";
	    		 }else{
	    			 costCodeMandatoryValidation(row, newvalue);
	    			 var orderKind =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'orderKind');
		    		if((orderKind != undefined && "CRP" != orderKind) || orderKind == undefined){
		    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "costCode", null);
						$("#grDetailGrid").jqxGrid('setcellvalue', row, "costCodes", null);
						$("#grDetailGrid").jqxGrid('setcellvalue', row, "netWt", null);
		    		}
		    		return newvalue;
	    		 }
	    	 }
    	 }, 
    	 {'text' : 'Cost Code','datafield' : 'costCode','width' : '4%',sortable : false,editable : true,cellbeginedit: grCostCode,columntype : 'combobox',displayfield : 'costCodes',
    		 initeditor : function(row, value, editor) {
				editor.jqxComboBox({
					source : vendorCostDataAdapter,
					displayMember : 'name',
					valueMember : 'id'
				});
    		 },
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				
				$("#grDetailGrid").jqxGrid('setcellvalue', row, "costMC", 0); 
				var netWt = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'netWt');
				var costMC = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'costMC');
				
				if("M" == newvalue.value && costCodeMandatoryValidation(row, netWt.value)){				
			    	postJSON('/OrderExecution/api/v1/grCostCode', JSON.stringify(grCostFilterValues(row, netWt.value, "M", costMC.value)), function(data) {						
			    		if(1 == data.resCode){	
			    			populateTestingData(data.payload.dataList);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "costMC", data.payload.costMc);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "costWastageWT", data.payload.costWastageWt);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellMC", data.payload.sellingMc);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellWastageWt", data.payload.sellingWastageWt);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "metalValue", data.payload.v_metal_value);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "wastageValue", data.payload.costWastage);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "selling_price", data.payload.v_selling_price);
		    				
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "actcostMC", data.payload.costMc);							
		    				$("#grDetailGrid").jqxGrid('setcellvalue', row, "actcostWastageWt", data.payload.costWastageWt);
		    				$("#grDetailGrid").jqxGrid('setcellvalue', row, "actsellMC", data.payload.sellingMc);
		    				$("#grDetailGrid").jqxGrid('setcellvalue', row, "actsellWastageWt", data.payload.sellingWastageWt);
							$("#grDetailGrid").jqxGrid('setColumnProperty', 'sellMC', 'editable', false);							
			    		}else if(2 == data.resCode) {	
			    			populateTestingData(null);
							var articleCode = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'articleCode');
      					    $.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });							 
							
							$("#grDetailGrid").jqxGrid('setcellvalue', row, "costWastageWT", 0);
							$("#grDetailGrid").jqxGrid('setcellvalue', row, "costMC", 0);
							$("#grDetailGrid").jqxGrid('setcellvalue', row, "actcostWastageWt", 0);
							$("#grDetailGrid").jqxGrid('setcellvalue', row, "actcostMC", 0);							
							$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellWastageWt", 0);
							$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellMC", 0);
							$("#grDetailGrid").jqxGrid('setcellvalue', row, "actsellWastageWt", 0);
							$("#grDetailGrid").jqxGrid('setcellvalue', row, "actsellMC", 0);
							$("#grDetailGrid").jqxGrid('setcellvalue', row, "metalValue", 0);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "wastageValue", 0);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "selling_price", 0);
							$("#grDetailGrid").jqxGrid('setColumnProperty', 'sellMC', 'editable', true);							 
						 }else{
							 $.growl.error({ message:data.mesgStr , duration: 10000, title: 'Error' });
						 }
			    	});
					
				}else if( ("T" == newvalue.value || "R" == newvalue.value) && costCodeMandatoryValidation(row, netWt.value)){					
					$("#grDetailGrid").jqxGrid('setcellvalue', row, "costWastageWT", 0);
					$("#grDetailGrid").jqxGrid('setcellvalue', row, "costMC", 0);
					$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellWastageWt", 0);
					$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellMC",0);					
				}
				return newvalue;
			}
		 }, 
		 {'text' : 'Cost Wast Wt.','datafield' : 'costWastageWT','width' : '5%',sortable : false,editable : true,cellbeginedit: grCostCode,cellsformat: 'd3',columntype: 'numberinput',
			 initeditor: function (row, cellvalue, editor) {
				 editor.jqxNumberInput({ decimalDigits:3, min: 0.000, spinButtons: false  });
			 },
	        validation: function (cell, value) {
	            if (value < 0) {
	                return { result: false, message: "Invalid Number" };
	            }
	            return true;
	        },
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				var costMc = $('#grDetailGrid').jqxGrid ('getcellvalue', row, 'costMC');
				
				if(costMc != null && costMc != "" && costMc != 0){
					var actcostMc = $('#grDetailGrid').jqxGrid ('getCell', row, 'actcostMC');
					var actCostWastageWt = $('#grDetailGrid').jqxGrid ('getCell', row, 'actcostWastageWt');
					var costWastageWT = $('#grDetailGrid').jqxGrid ('getCell', row, 'costWastageWT');
					var netWt = $('#grDetailGrid').jqxGrid ('getCell', row, 'netWt');
					var costCode =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'costCode');
					if(!costCodeMandatoryValidation(row, netWt.value)){
						return oldvalue;
					}
					if (costCode == "M") {
						var netWt = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'netWt');
						postJSON('/OrderExecution/api/v1/grCostCode', JSON.stringify(grCostWastWtFilterValues(row, netWt.value, costCode, costMc, newvalue)), function(data) {
							 var articleCode = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'articleCode');
				    		 if(newvalue != costWastageWT.value){
				    			 var costWasWt = newvalue;
				    		 }else{
				    			 var costWasWt = costWastageWT.value;
				    		 }
							 if(1 == data.resCode){
		                        populateTestingData(data.payload.dataList);
			    				$("#grDetailGrid").jqxGrid('setcellvalue', row, "costMC", costMc);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "costWastageWT", (newvalue == null ) ? costWastageWT.value : costWasWt);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellMC", data.payload.sellingMc);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellWastageWt", data.payload.sellingWastageWt);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "metalValue", data.payload.v_metal_value);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "wastageValue", data.payload.costWastage);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "selling_price", data.payload.v_selling_price);
			    				
				    			updateProvFlag(row);
				    			
				    		}else{
				    			populateTestingData(null);
				    			jQuery('#grDetailGrid').jqxGrid ('setcellvalue', row, 'sellMC', 0);
				    			jQuery('#grDetailGrid').jqxGrid ('setcellvalue', row, 'setSellingPrice', true);
								$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });						 
				    		}
						});
				    }
				}
			
			}
	    }, 
	    {'text' : 'Cost MC/ Tot. cost','datafield' : 'costMC','width' : '5%',sortable : false,editable : true,cellbeginedit: grCostCode,cellsformat: 'd2',columntype: 'numberinput',	      
			initeditor: function (row, cellvalue, editor) {
	            editor.jqxNumberInput({ decimalDigits:2, min: 0.00, spinButtons: false  });
	        },
	        validation: function (cell, value) {
	            if (value < 0) {
	                return { result: false, message: "Invalid Number" };
	            }
	            return true;
	        },
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				var actcostMc = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'actcostMC');
				var actCostWastageWt = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'actcostWastageWt');
				var costWastageWT = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'costWastageWT');
				var netWt = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'netWt');
				var costCode =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'costCode');
				if(!costCodeMandatoryValidation(row, netWt.value)){
					return oldvalue;
				}
				if (costCode == "T" || costCode == "R" || costCode == "M") {
					var netWt = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'netWt');
					postJSON('/OrderExecution/api/v1/grCostCode', JSON.stringify(grCostFilterValues(row, netWt.value, costCode, newvalue)), function(data) {
						 var articleCode = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'articleCode');
			    		
						 if(1 == data.resCode){
	                        populateTestingData(data.payload.dataList);
		    				$("#grDetailGrid").jqxGrid('setcellvalue', row, "costMC", newvalue);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "costWastageWT", data.payload.costWastageWt);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellMC", data.payload.sellingMc);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellWastageWt", data.payload.sellingWastageWt);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "metalValue", data.payload.v_metal_value);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "wastageValue", data.payload.costWastage);
			    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "selling_price", data.payload.v_selling_price);
			    			
			    			updateProvFlag(row);
			    			
			    			
			    		}else{
			    			populateTestingData(null);
			    			jQuery('#grDetailGrid').jqxGrid ('setcellvalue', row, 'sellMC', 0);
			    			jQuery('#grDetailGrid').jqxGrid ('setcellvalue', row, 'setSellingPrice', true);
							$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });						 
			    		}
					});
			    }else{
			    	var actsellMC = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'actsellMC');
					if(newvalue > actcostMc.value){
						if(0 != actcostMc.value){
							jQuery('#grDetailGrid').jqxGrid ('setcellvalue', row, 'provisional', true);
							var diff = ((newvalue - actcostMc.value)/actcostMc.value)*100;	
							var sellMC = actsellMC.value * (1+ (diff/100));	
							jQuery('#grDetailGrid').jqxGrid ('setcellvalue', row, 'sellMC', sellMC);
							return newvalue;
						}else{
							return oldvalue;
						}
					}else{
						jQuery('#grDetailGrid').jqxGrid ('setcellvalue', row, 'provisional', false);
						jQuery('#grDetailGrid').jqxGrid ('setcellvalue', row, 'sellMC', actsellMC.value);
					}
			    }
			}
	    }, 
	    {'text' : 'Act Cost Wast Wt.','datafield' : 'actcostWastageWt','width' : '5%',sortable : false,editable : true}, 
	    {'text' : 'Act Cost MC.','datafield' : 'actcostMC','width' : '4%',sortable : false,editable : true}, 
	    {'text' : 'Set Selling Price','datafield' : 'setSellingPrice','width' : '6%',editable : true,cellbeginedit: grSellCostCode,columntype: 'checkbox',
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				var netWt = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'netWt');
				var costMC = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'costMC');
				var costCode = $('#grDetailGrid').jqxGrid('getcellvalue', row, 'costCode');
			
				if ((newvalue == false || newvalue == null) && datafield == 'setSellingPrice') {
					if("M" == costCode && costCodeMandatoryValidation(row, netWt.value)){
						
				    	postJSON('/OrderExecution/api/v1/grCostCode', JSON
								.stringify(grCostFilterValues(row, netWt.value, "M", costMC.value)), function(data) {
							
				    		if(1 == data.resCode){
				    			populateTestingData(data.payload.dataList);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "metalValue", data.payload.metalValue);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "costMC", data.payload.costMc);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "costWastageWT", data.payload.costWastageWt);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellMC", data.payload.sellingMc);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellWastageWt", data.payload.sellingWastageWt);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "metalValue", data.payload.v_metal_value);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "wastageValue", data.payload.costWastage);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "selling_price", data.payload.v_selling_price);
				    			
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "actcostMC", data.payload.costMc);							
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "actcostWastageWt", data.payload.costWastageWt);
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "actsellMC", data.payload.sellingMc);
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "actsellWastageWt", data.payload.sellingWastageWt);
								$("#grDetailGrid").jqxGrid('setColumnProperty', 'sellMC', 'editable', false);	
				    			
				    		}else if(2 == data.resCode) {
				    			populateTestingData(null);
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "costWastageWT", 0);
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "costMC", 0);
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "actcostWastageWt", 0);
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "actcostMC", 0);
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "metalValue", 0);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "wastageValue", 0);
				    			$("#grDetailGrid").jqxGrid('setcellvalue', row, "selling_price", 0);
								
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellWastageWt", 0);
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellMC", 0);
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "actsellWastageWt", 0);
								$("#grDetailGrid").jqxGrid('setcellvalue', row, "actsellMC", 0);
								$("#grDetailGrid").jqxGrid('setColumnProperty', 'sellMC', 'editable', true);
							 }else{
								 $.growl.error({ message:data.mesgStr , duration: 10000, title: 'Error' });
							 }
				    	});
						
					}else if( ("T" == costCode || "R" == costCode) && costCodeMandatoryValidation(row, netWt.value)){
						$("#grDetailGrid").jqxGrid('setcellvalue', row, "costWastageWT", 0);
						$("#grDetailGrid").jqxGrid('setcellvalue', row, "costMC", 0);
						$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellWastageWt", 0);
						$("#grDetailGrid").jqxGrid('setcellvalue', row, "sellMC",0);
						$("#grDetailGrid").jqxGrid('setColumnProperty', 'sellMC', 'editable', true);
					}
				 }
	
				if (newvalue == true && datafield == 'setSellingPrice') {		
					 $("#grDetailGrid").jqxGrid('setColumnProperty', 'sellMC', 'editable', true);
				 }
			}
	    },
	    {'text' : 'Sell Wast Wt.','datafield' : 'sellWastageWt','width' : '4%',sortable : false,editable : true,cellbeginedit: grSellCostCode,cellsformat: 'd3',columntype: 'numberinput',	      
			initeditor: function (row, cellvalue, editor) {
	            editor.jqxNumberInput({ decimalDigits:3, min: 0.000, spinButtons: false  });
	        },
	        validation: function (cell, value) {
	            if (value < 0) {
	                return { result: false, message: "Invalid Number" };
	            }
	            return true;
	        },
	        cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	        	var costWastageWT = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'costWastageWT');
	        	
	        	if(newvalue <= costWastageWT.value){
	        		 $.growl.error({ message: "Sell Wast Wt. should not be less than Cost Wast Wt", duration: 10000, title: 'Error' });
	        		 return oldvalue;
	        	}else {
	        		return newvalue;
	        	}
	        	
	        }
	    }, 
	    {'text' : 'Sell MC/ Total cost','datafield' : 'sellMC','width' : '4%',sortable : false,editable : true,cellbeginedit: grSellCostCode,cellsformat: 'd2',columntype: 'numberinput',	      
			initeditor: function (row, cellvalue, editor) {
	            editor.jqxNumberInput({ decimalDigits:2, min: 0.00, spinButtons: false  });
	        },
	        validation: function (cell, value) {
	            if (value < 0) {
	                return { result: false, message: "Invalid Number" };
	            }
	            return true;
	        },
	        cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	        	var costMC = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'costMC');
	        	var costCode = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'costCode');
	        	
	        	if(newvalue < costMC.value){
	       		 $.growl.error({ message: "Sell MC/ Total cost. should not be less than Cost MC/ Total cost", duration: 10000, title: 'Error' });
	       		 
	       		return oldvalue;
	        	}else {
	        		return newvalue;
	        	}
	        }
	    }, 
	    {'text' : 'Act Sell Wast Wt.','datafield' : 'actsellWastageWt','width' : '4%',sortable : false,editable : true}, 
	    {'text' : 'Act Sell MC.','datafield' : 'actsellMC','width' : '4%',sortable : false,editable : true}, 
	    
	    {'text' : 'Metal Value','datafield' : 'metalValue','width' : '4%',sortable : false,editable : false,hidden : true},
	    {'text' : 'Wastage Value','datafield' : 'wastageValue','width' : '4%',sortable : false,editable : false,hidden : true},
	    {'text' : 'Reason','datafield' : 'reason','width' : '4%',sortable : false,editable : false,hidden : true},
	    {'text' : 'Selling Price','datafield' : 'selling_price','width' : '4%',sortable : false,editable : false,hidden : true},
	    
	    {'text' : 'Attributes','datafield' : 'attributes','width' : '4%',sortable : false,editable : true,cellbeginedit : attributeSearchPopUp}, 
	    {'text' : 'Product Photo No','datafield' : 'photo','width' : '6%',sortable : false,editable : true}, 
	    {'text' : 'View Design',datafield : 'viewDesign','width' : '4%',sortable : false,editable : false,
			cellbeginedit : function(row) {
				var rows = $('#grDetailGrid').jqxGrid('getrows');
				if (rows[row].viewDesign == "" || rows[row].viewDesign == null) {
					var viewDesign =  $("#grDetailGrid").jqxGrid("setcellvalue", row , null);
					return false;
				}
			},
			cellsrenderer: orderItemDesignRenderer
	    }, 
	    {'text' : 'Provisional','datafield' : 'provisional','width' : '4%',editable : false},
	    {'text' : 'Hall Mark Charges','datafield' : 'hallMarkCharges',editable : true,sortable : false,'width' : '5%',cellsformat: 'd2',columntype: 'numberinput',	      
			initeditor: function (row, cellvalue, editor) {
	            editor.jqxNumberInput({ decimalDigits:2, min: 0.00, spinButtons: false  });
	        },
	        validation: function (cell, value) {
	            if (value < 0) {
	                return { result: false, message: "Invalid Number" };
	            }
	            return true;
	        }
	    },
	    {'text' : '',datafield : 'validate','width' : '3%',sortable : false,editable : false,
			cellsrenderer: function (row, column, value) {
				var psr = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'psr');
				if(null != value){
	            	return '<button id="'+row+'" class="btn btn-sm btn-primary" style="margin-left:3px;" type="button" onclick="validateGRFGDetails('+ row +')"> <i class="fa fa-check" ></i></button>';
				}
			}
	    },
	    {'text' : 'Is Valid','datafield' : 'isValid','width' : '4%',sortable : false,editable : false},
	    {'text' : '','datafield' : 'delete','width' : '4%',columntype : 'button',cellsalign : 'center',align:'center',
			cellsrenderer : function() {
				return "Delete";
			},
			buttonclick : function(row) {
				var masterRows = $("#grDetailGrid").jqxGrid('getrows');
				var rowscount = $("#grDetailGrid").jqxGrid('getdatainformation').rowscount;
				var rowsStone = $("#grStoneDetailGrid").jqxGrid('getrows');
				var rowsAcc = $("#grAccDetailGrid").jqxGrid('getrows');
				var newArrayStone = [];
				var newArrayAcc = [];
				
				if(typeof masterRows != "undefined"){
					for(var m=0; m<masterRows.length; m++){
						
						if(typeof rowsStone != "undefined"){
							for(var k=0; k<rowsStone.length; k++){
								if(masterRows[m].srl ==  rowsStone[k].grSlNo){
									var idVal = $("#grStoneDetailGrid").jqxGrid('getrowid', k);
									newArrayStone.push(idVal);						
								}
							}	
						}
						if(typeof rowsAcc != "undefined"){
							for(var n=0; n<rowsAcc.length; n++){
								if(masterRows[m].srl ==  rowsAcc[n].grSlNo){
									var idValAcc = $("#grAccDetailGrid").jqxGrid('getrowid', n);
									newArrayAcc.push(idValAcc);						
								}
							}
						}
					}			
				}
				if(typeof rowsStone != "undefined"){
					$("#grStoneDetailGrid").jqxGrid('deleterow', newArrayStone);
				}
				if(typeof rowsAcc != "undefined"){
					$("#grAccDetailGrid").jqxGrid('deleterow', newArrayAcc);
				}
				id = $("#grDetailGrid").jqxGrid('getrowid', row);
				$("#grDetailGrid").jqxGrid('deleterow', id);
				
				for (var j = 0; j < rowscount; j++) {
					$("#grDetailGrid").jqxGrid("setcellvalue", j,"srl", j + 1);
				}
				var totalRowsVal = $("#grDetailGrid").jqxGrid('getrows');
				var rowLengthVal = totalRowsVal.length; 
				if(rowLengthVal < 5){				
					for(var i=rowLengthVal; i<5; i++){	
						$("#grDetailGrid").jqxGrid('addrow', null, addGRFGrow(i+1));
					}
				}
			}
	    },
	    {'text' : '',menu : false,sortable : false,datafield : 'selectionStatus',columntype : 'checkbox',width : '4%',hidden: true,cellbeginedit : grDetailsDeleteRow,
			cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue) {
			},
			renderer : function() {
				return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
			}
	    },
		{'text' : '',menu : false,sortable : false,datafield : 'selectionStatusCopy',columntype : 'checkbox',width : '4%',
			cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue) {
			
			},
			renderer : function() {
				return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
			}
	
		}];
		masterChildGrid(datafields, columns, data, "#grDetailGrid", addrow,	updateRow, deleteRow, false);
		$("#grDetailGrid").jqxGrid({
	        height: 159,
	        autoheight: true,
	        columnsheight : 45,
	        columnsresize : true,
	        rowsheight: 21
		});
}

var delStoneDet = function(rowsStone, row){
	var sLength = rowsStone.length;
	for(var k=0; k<sLength; k++){
		if(rowsStone[k].grSlNo == row){
			var idVal = $("#grStoneDetailGrid").jqxGrid('getrowid', k);
			var commit = $("#grStoneDetailGrid").jqxGrid('deleterow', idVal);
		}
	}
	 return true;
}

var delAccDet = function(rowsAcc, row){
	var aLength = rowsAcc.length;
	for(var m=0; m < aLength; m++){
		if(rowsAcc[m].grSlNo == row){
			var idVal = $("#grAccDetailGrid").jqxGrid('getrowid', m);
			var commit = $("#grAccDetailGrid").jqxGrid('deleterow', idVal);
		}
	}  
	 return true;
}


var addGRFGrow = function (i) {
	var row = {};
    row["psr"] = null;
    row["srl"] = i;
    row["articleCode"] = null;
    row["articleDesc"] = null;
    row["hsnMasterCode"] = null;
    row["hsnMasterId"] = null;
    row["taxStructureId"] = null;
    row["pcs"] = null;
    row["grossWt"] = null;
    row["netWt"] = null;
    row["costCode"] = null;
    row["costCodes"] = null;
    row["costWastageWT"] = null;
    row["costMC"] = null;
    row["actcostWastageWt"] = null;
    row["actcostMC"] = null;
    row["totalCost"] = null;
    row["sellWastageWt"] = null;
    row["sellMC"] = null;
    row["actsellWastageWt"] = null;
    row["actsellMC"] = null;
    row["setSellingPrice"] = null;
    row["attributes"] = null;
    row["photo"] = null;
    row["viewDesign"] = null;
    row["provisional"] = false;
    row["hallMarkCharges"] = null;
    row["isValid"] = false;
    row["totalValue"] = null;
    row["stoneList"] = null;
    row["accessoryList"] = null;
    row["attrLength"] = null;
    row["size"] = null;
    row["height"] = null;
    row["diameter"] = null;
    row["width"] = null;
    row["combination"] = null;
    row["metalColor"] = null;
    row["hookType"] = null;
    row["screwType"] = null;
    row["loopType"] = null;
    row["polishType"] = null;
    row["settingType"] = null;
    row["collectionName"] = null;
    row["vendorArticle"] = null;
    row["selectionStatus"] = null;
    row["selectionStatusCopy"] = null;
    return row;
}



function grFgFilterValues() {
	fieldFilters = {
		"fieldFilters" : {}
	};
	return fieldFilters;
}

var rowId = 0;
var adGrStones = function(grsrl){
	var data =  $("#grDetailGrid").jqxGrid("getrows");
	var grslno = null;
	for(var i =0;i<data.length;i++){
		grslno = data[i].visibleindex + 1;
	}
	var row = {};
	row["grSlNo"] = grsrl;
	row["suppliedBy"] = "V";
	row["suppliedBys"] = "Vendor";
	row["stoneCode"] = null;
	row["subCategory"] = null;
	row["flag"] = "P";
	row["flags"] = "Positive";
	row["issuedPcs"] = null;
	row["issuedWt"] = null;
	row["usedPcs"] = null;
	row["usedWt"] = null;
	row["bulkPcs"] = 0;
	row["bulkWt"] = 0.000;
	row["returnedPcs"] = null;
	row["returnedWt"] = null;
	row["breakageReceivedPcs"] = null;
	row["breakageReceived"] = null;
	row["breakageNotReceivedPcs"] = null;
	row["breakageNotReceived"] = null;
	row["uom"] = null;
	row["stoneRate"] = null;
	row["stoneRates"] = null;
	row["stoneCost"] = null;
	row["stoneHC"] = null;
	row["sellingRate"] = null;
	row["sellingPrice"] = null;
	row["GRStoneCostSPDTO"] = null;
	row["systemCostRate"] = null;
	row["provisional"] = false;
	row["isCertficateRequired"] = null;
	row["clarity"] = null;
	row["actualColor"] = null;
	row["wgtRange"] = null;
	row["color"] = null;
	row["cutGrade"] = null;
	row["selectionStatus"] = true;
	return row;
}

var adGrAccessorys = function(grsrl) {
	var data =  $("#grDetailGrid").jqxGrid("getrows");
	
	var row = {};
	row["grSlNo"] = grsrl;
	row["suppliedBy"] = "V";
	row["suppliedBys"] = "Vendor";
	row["accCode"] = null;
	row["subCategory"] = null;
	row["flag"] = "P";
	row["flags"] = "Positive";
	row["issuedPcs"] = null;
	
	row["issuedWt"] = null;
	row["usedPcs"] = null;
	row["usedWt"] = null;
	row["returnedPcs"] = null;
	row["returnedWt"] = null;
	row["breakageReceivedPcs"] = null;
	row["breakageReceived"] = null;
	row["breakageNotReceived"] = null;
	row["breakageNotReceivedPcs"] = null;
	row["uom"] = null;
	row["accRate"] = null;
	row["accCost"] = null;
	row["stoneHC"] = null;
	row["provisional"] = null;
	row["selectionStatus"] = true;
	return row;
}

$("#addAccessory").on("click", function() {	
	checkRowGR("A");
});


var checkRowGR = function(stoneOrAcc){
	var rows = $("#grDetailGrid").jqxGrid('getrows');
	if(typeof rows != "undefined"){
		for(var i=0; i<rows.length; i++){
			if(rows[i].isValid == false && rows[i].psr != null){
				if(rows[i].grossWt != rows[i].netWt){					
					var grSrlno = $('#grDetailGrid').jqxGrid('getcellvalue', i, 'srl');
					if(grSrlno == globalIndex){
						if(stoneOrAcc == "S"){
							$("#grStoneDetailGrid").jqxGrid('addrow', null, adGrStones(globalIndex))
						}else if(stoneOrAcc == "A"){
							$("#grAccDetailGrid").jqxGrid('addrow', null, adGrAccessorys(globalIndex));
						}
					}			
				}
			}
		}
	}
}

$("#addStone").on("click", function() {	
	checkRowGR("S");
});

function adGrStonesByPsr(sd) {
	var row = {};
	row["grSlNo"] = sd.grSlNo;
	row["suppliedBy"] = sd.suppliedBy;
	row["suppliedBys"] = sd.suppliedByType;;
	row["stoneCode"] = sd.stoneCode;
	row["subCategory"] = sd.subCategory;
	row["flag"] = "P";
	row["flags"] = "Positive";
	row["issuedPcs"] = sd.issuedPcs;
	row["issuedWt"] = sd.issuedWt;
	row["usedPcs"] = null;
	row["usedWt"] = null;
	row["bulkPcs"] = null;
	row["bulkWt"] = null;
	row["returnedPcs"] = null;
	row["returnedWt"] = null;
	row["breakageReceivedPcs"] = null;
	row["breakageReceived"] = null;
	row["breakageNotReceivedPcs"] = null;
	row["breakageNotReceived"] = null;
	row["uom"] = sd.uom;
	if("CU" == sd.suppliedBy && null != sd.grStoneCostSPDTO){
		row["stoneRates"] = null;
		row["stoneRate"] = null;
		row["stoneCostRate"] = null;
		row["stoneCost"] = null;
		row["systemCostRate"] = null;
		row["stoneHC"] = sd.grStoneCostSPDTO.vendorHandlingCharges;
		row["sellingRate"] = sd.grStoneCostSPDTO.sellingRate;
		row["sellingPrice"] = 0;
		row["GRStoneCostSPDTO"] = null;
		
	}else if("CO" == sd.suppliedBy && null != sd.grStoneCostSPDTO){
		if(null != sd.grStoneCostSPDTO && null != sd.grStoneCostSPDTO.masterVendorStoneCostDtos){
			var stoneCostDtos = sd.grStoneCostSPDTO.masterVendorStoneCostDtos;
			
			if(0 < stoneCostDtos.length){
				row["stoneRate"] = stoneCostDtos[0].displayValue;
			}
			
		}
		row["stoneRates"] = sd.grStoneCostSPDTO.systemCostRate;
		row["stoneCostRate"] = sd.grStoneCostSPDTO.systemCostRate;
		row["systemCostRate"] = sd.grStoneCostSPDTO.systemCostRate;
		row["stoneCost"] = null;
		row["stoneHC"] = sd.grStoneCostSPDTO.vendorHandlingCharges;
		row["sellingRate"] = sd.grStoneCostSPDTO.sellingRate;
		row["sellingPrice"] = 0;
		row["GRStoneCostSPDTO"] = sd.grStoneCostSPDTO.masterVendorStoneCostDtos;
		
	}else if("V" == sd.suppliedBy && null != sd.grStoneCostSPDTO){
		
		row["stoneRates"] = null;
		row["stoneRate"] = null;
		row["stoneCostRate"] = null;
		row["stoneCost"] = null;
		row["systemCostRate"] = null;
		row["sellingRate"] = sd.grStoneCostSPDTO.sellingRate;
		row["sellingPrice"] = 0;
		row["GRStoneCostSPDTO"] = sd.grStoneCostSPDTO.masterVendorStoneCostDtos;
	}
	
	row["provisional"] = false;
	row["isCertficateRequired"] = null;
	
	row["clarity"] = sd.clarity;
	row["actualColor"] = sd.actualColor;
	row["wgtRange"] = sd.wgtRange;
	row["color"] = sd.color;
	row["cutGrade"] = sd.cutGrade;
	row["selectionStatus"] = true;
	return row;
}

function adGrAccByPsr(sd) {
	var row = {};

	row["grSlNo"] = sd.grSlNo;
	row["suppliedBy"] = sd.suppliedBy;
	row["suppliedBys"] = sd.suppliedByType;
	row["accCode"] = sd.accCode;
	row["subCategory"] = sd.subCategory;
	row["flag"] = "P";
	row["flags"] = "Positive";
	row["issuedPcs"] = sd.issuedPcs;
	row["issuedWt"] = sd.issuedWt;
	row["usedPcs"] = null;
	row["usedWt"] = null;
	row["bulkPcs"] = null;
	row["bulkWt"] = null;
	row["returnedPcs"] = null;
	row["returnedWt"] = null;
	row["breakageReceivedPcs"] = null;
	row["breakageReceived"] = null;
	row["breakageNotReceivedPcs"] = null;
	row["breakageNotReceived"] = null;
	row["uom"] = sd.uom;
	row["accRate"] = sd.accRate;
	row["accCost"] = sd.accCost;
	row["accHC"] = sd.accHC;
	row["provisional"] = null;
	row["selectionStatus"] = true;
	
	return row;
}

var validateFunc = function(datafield, value) {
	switch (datafield) {
	case "articleCode":
		if (value.length == 0) {
			return {
				message : "Please enter Article Code",
				result : false
			};
		}
		return true;
	case "grossWt":
		if (isNaN(value) || value < 0) {
			return {
				message : "Gross Wt. should be greater than 0",
				result : false
			};
		}
		return true;
		break;
	case "netWt":
		if (isNaN(value) || value < 0) {
			return {
				message : "Net Wt. should be greater than 0",
				result : false
			};
		}
		return true;
		break;
	case "pcs":
		if (isNaN(value) || value < 0) {
			return {
				message : "Pieces should be greater than 0",
				result : false
			};
		}
		return true;
		break;

	}
	return true;
}

function grMenu() {
	var contextMenu = $("#Menu").jqxMenu({
		width : 170,
		height : 30,
		autoOpenPopup : false,
		mode : 'popup'
	});
	$("#grDetailGrid").on('contextmenu', function() {
		return false;
	});
	
	$("#grDetailGrid").on(
			'rowclick',
			function(event) {
				if (event.args.rightclick) {
					$("#grDetailGrid")
							.jqxGrid('selectrow', event.args.rowindex);
					var scrollTop = $(window).scrollTop();
					var scrollLeft = $(window).scrollLeft();
					contextMenu.jqxMenu('open',
							parseInt(event.args.originalEvent.clientX) + 5
									+ scrollLeft,
							parseInt(event.args.originalEvent.clientY) + 5
									+ scrollTop);

					return false;
				}
			});

	contextMenu.on('itemclick', function(event) {
		var args = event.args;
		var rowindex = $('#grDetailGrid').jqxGrid('getselectedrowindex');
        var rowid = $("#grDetailGrid").jqxGrid('getrowid', rowindex);
		var row = $("#grDetailGrid").jqxGrid('getrowdatabyid', rowid);
		var offset = $("#grDetailGrid").offset();
		if ($.trim($(args).text()) == "Delete Row") {			
			row['selectionStatus'] = false;
			$('#grDetailGrid').jqxGrid('updaterow', rowid, row);			
		}
		
	});
}

function grStoneMenu() {
	var contextMenu = $("#Menu").jqxMenu({
		width : 170,
		height : 30,
		autoOpenPopup : false,
		mode : 'popup'
	});
	
	$("#grStoneDetailGrid").on('contextmenu', function() {
		return false;
	});

	$("#grStoneDetailGrid").on('rowclick',function(event) {
		if (event.args.rightclick) {
			$("#grStoneDetailGrid").jqxGrid('selectrow', event.args.rowindex);
			var scrollTop = $(window).scrollTop();
			var scrollLeft = $(window).scrollLeft();
			contextMenu.jqxMenu('open',	parseInt(event.args.originalEvent.clientX) + 5	+ scrollLeft,parseInt(event.args.originalEvent.clientY) + 5	+ scrollTop);
			return false;
		}
	});

	contextMenu.on('itemclick', function(event) {
		var args = event.args;
		var rowindex = $('#grStoneDetailGrid').jqxGrid('getselectedrowindex');
        var rowid = $("#grStoneDetailGrid").jqxGrid('getrowid', rowindex);
		var row = $("#grStoneDetailGrid").jqxGrid('getrowdatabyid', rowid);
		var offset = $("#grStoneDetailGrid").offset();
		
		if ($.trim($(args).text()) == "Delete Row") {			
			row['selectionStatus'] = false;
			$('#grStoneDetailGrid').jqxGrid('updaterow', rowid, row);			
		}
		
	});
}

function grAccMenu() {
	var contextMenu = $("#Menu").jqxMenu({
		width : 170,
		height : 30,
		autoOpenPopup : false,
		mode : 'popup'
	});
	
	$("#grAccDetailGrid").on('contextmenu', function() {
		return false;
	});

	$("#grAccDetailGrid").on('rowclick',function(event) {
		if (event.args.rightclick) {
			$("#grAccDetailGrid").jqxGrid('selectrow', event.args.rowindex);
			
			var scrollTop = $(window).scrollTop();
			var scrollLeft = $(window).scrollLeft();
			contextMenu.jqxMenu('open',	parseInt(event.args.originalEvent.clientX) + 5 + scrollLeft, parseInt(event.args.originalEvent.clientY) + 5	+ scrollTop);
			return false;
		}
	});

	contextMenu.on('itemclick', function(event) {
		var args = event.args;
		var rowindex = $('#grAccDetailGrid').jqxGrid('getselectedrowindex');
        var rowid = $("#grAccDetailGrid").jqxGrid('getrowid', rowindex);
		var row = $("#grAccDetailGrid").jqxGrid('getrowdatabyid', rowid);
		var offset = $("#grAccDetailGrid").offset();
		if ($.trim($(args).text()) == "Delete Row") {
			row['selectionStatus'] = false;
			$('#grAccDetailGrid').jqxGrid('updaterow', rowid, row);
		}		
	});


}

function grStoneGrid() {
	var updateRow = function(rowid, newdata, commit) {		
		commit(true);
	}

	var deleteRow = function(rowid, commit) {
		commit(true);
	}
	
	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	
	var suppliedByTypeSource = {
			datatype : 'json',
			datafields : [ 
				{name : 'id',type : 'string'}, 
				{name : 'name',type : 'string'} 
			],
			localdata : suppliedByList
		};

	var suppliedByTypeDataAdapter = new $.jqx.dataAdapter(suppliedByTypeSource, {
		autoBind : true
	});
	
	var stoneRateTypeSource = {
			datatype : 'json',
			datafields : [ 
				{name : 'id',type : 'string'}, 
				{name : 'name',	type : 'string'} 
			],
			localdata : null
		};

	var stoneRateDataAdapter = new $.jqx.dataAdapter(stoneRateTypeSource, {
		autoBind : true
	});
	
	var flagTypeSource = {
			datatype : 'json',
			datafields : [ 
				{name : 'id',type : 'string'}, 
				{name : 'name',type : 'string'} 
			],
			localdata : flagList
		};

	var flagTypeDataAdapter = new $.jqx.dataAdapter(flagTypeSource, {
		autoBind : true
	});
	
	var datafields = [ 
		{'name' : 'grSlNo','type' : 'long','id' : 'grSlNo'}, 
		{'name' : 'suppliedBy','type' : 'string'},
		{'name' : 'suppliedBys','value' : 'suppliedBy',values : {source : suppliedByTypeDataAdapter.records,value : 'id',name : 'name'}},
		{'name' : 'stoneCode','type' : 'string'}, 
		{'name' : 'subCategory','type' : 'string'}, 
		{'name' : 'flag','type' : 'string'},
		{'name' : 'flags','value' : 'flag',	values : {source : flagTypeDataAdapter.records,value : 'id',name : 'name'}},
		{'name' : 'clarity','type' : 'string'},  
		{'name' : 'actualColor','type' : 'string'}, 
		{'name' : 'wgtRange','type' : 'string'}, 
		{'name' : 'color','type' : 'string'}, 
		{'name' : 'cutGrade','type' : 'string'}, 
		{'name' : 'issuedPcs','type' : 'long'}, 
		{'name' : 'issuedWt','type' : 'double'}, 
		{'name' : 'usedPcs','type' : 'long'}, 
		{'name' : 'usedWt','type' : 'double'}, 
		{'name' : 'bulkPcs','type' : 'long'}, 
		{'name' : 'bulkWt','type' : 'double'}, 
		{'name' : 'returnedPcs','type' : 'long'},
		{'name' : 'returnedWt','type' : 'double'}, 
		{'name' : 'breakageReceivedPcs','type' : 'long'}, 
		{'name' : 'breakageReceived','type' : 'double'},
		{'name' : 'breakageNotReceivedPcs','type' : 'long'}, 
		{'name' : 'breakageNotReceived','type' : 'double'},
		{'name' : 'uom','type' : 'string'},	
		{'name' : 'stoneRate','type' : 'string'},
		{'name' : 'stoneRates','value' : 'stoneRate',values : {source : stoneRateDataAdapter.records,value : 'id',name : 'name'}},
		{'name' : 'stoneCost','type' : 'double'},
		{'name' : 'stoneCostRate','type' : 'double'},
		{'name' : 'sellingRate','type' : 'double'},
		{'name' : 'sellingPrice','type' : 'double'},
		{'name' : 'systemCostRate','type' : 'double'},
		{'name' : 'GRStoneCostSPDTO','type' : 'array'},
		{'name' : 'stoneHC','type' : 'double'}, 
		{'name' : 'provisional','type' : 'boolean'}, 
		{'name' : 'isCertficateRequired','type' : 'string'}, 
		{'name' : 'selectionStatus','type' : 'bool'} 
	];

	var columns = [ 
		{'text' : 'Gr Sl. No.','datafield' : 'grSlNo','width' : '50px',	editable : false},
		{'text' : 'Srl No.',ortable : false,filterable : false,editable : false,groupable : false,draggable : false,resizable : false,datafield : '',columntype : 'number',width : 50,
			cellsrenderer : function(row, column, value) {
				return '<div style ="text-align: center; margin-top: 7px; margin: 7px;">' + (value + 1) + "</div>";
			}
		}, 
		{'text' : 'Supplied By',datafield : 'suppliedBy',width : '65px',cellbeginedit: stoneSearchPopUp,columntype : 'combobox',displayfield : 'suppliedBys',editable : false,
			initeditor : function(row, value, editor) {
				editor.jqxComboBox({
					source : suppliedByTypeDataAdapter,
					displayMember : 'name',
					valueMember : 'id'
				});
			},
		}, 
		{'text' : 'Stone Code','datafield' : 'stoneCode',cellbeginedit: grStoneForPSR,'width' : '80px',editable : true,cellbeginedit: stoneSearchPopUp}, 
		{'text' : 'Sub Category / Shape.','datafield' : 'subCategory','width' : '100px',editable : false}, 
		{'text' : 'Flag (+/-)',datafield : 'flag',width : '65px',columntype : 'combobox',	displayfield : 'flags',editable : false,
			initeditor : function(row, value, editor) {
				editor.jqxComboBox({
					source : flagTypeDataAdapter,
					displayMember : 'name',
					valueMember : 'id'
				});
			},
		}, 
		{'text' : 'Issued/Required Pcs','datafield' : 'issuedPcs','width' : '50px',	editable : false,cellsformat : 'n',columntype : 'numberinput'},
		{'text' : 'Issued. Wt.','datafield' : 'issuedWt','width' : '70px',editable : false,columntype : 'numberinput',cellsformat : 'd3'}, 
		{'text' : 'Used Pcs','datafield' : 'usedPcs','width' : '50px',cellbeginedit: grStoneForPSR,editable : true,cellsformat : 'n',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits:0, min: 0, spinButtons: false  });
			},
			validation: function (cell, value) {
	            if (value < 0) {
	                return { result: false, message: "Invalid Number" };
	            }
	            return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				var suppliedBy = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
				if("V" == suppliedBy){
					$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			    
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneRate", null);
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneRates", null);
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneCostRate", null);
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneCost", null);
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "provisional", false);
				}
			}
		}, 
		{'text' : 'Used. Wt.','datafield' : 'usedWt','width' : '70px',cellbeginedit: grStoneForPSR,editable : true,cellsformat : 'd3',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {	    	
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				var suppliedBy = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
				if("V" == suppliedBy){
				    $("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
				    
				    $("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneRate", null);
				    $("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneRates", null);
				    $("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneCostRate", null);
				    $("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneCost", null);
				    $("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "provisional", false);
				}
				
				if("CO" == suppliedBy){			
					var stoneRates = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'stoneRates');
					var usedPcs = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'usedPcs');
					var usedWt = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'usedWt');
					var uom = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'uom');
					var stoneHC = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'stoneHC');
					var stoneCost1 = (uom == "Cts" || uom=="Gms") ? stoneRates * newvalue : stoneRates * usedPcs;
					var stoneCost2 = (uom == "Cts" || uom=="Gms") ? stoneHC * newvalue : stoneHC * usedPcs;
					var stoneCost = stoneCost1 + stoneCost2;
					
					
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneCost", stoneCost);
				}
				
				if("CU" == suppliedBy || "V" == suppliedBy){			
					var stoneRates = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'stoneRates');
					var usedPcs = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'usedPcs');
					var usedWt = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'usedWt');
					var uom = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'uom');
					var stoneHC = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'stoneHC');
					var stoneCost = (uom == "Cts" || uom=="Gms") ? stoneHC * newvalue : stoneHC * usedPcs;					
					
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneCost", stoneCost);
				}				
			
			}
		}, 
		{'text' : 'Bulk Pcs','datafield' : 'bulkPcs','width' : '50px',editable : true,cellbeginedit: grStoneForPSR,	cellsformat : 'n',columntype : 'numberinput',
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		}, 
		{'text' : 'Bulk. Wt.','datafield' : 'bulkWt','width' : '60px',editable : true,cellbeginedit: grStoneForPSR,	columntype : 'numberinput',	cellsformat : 'd3',		
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		}, 
		{'text' : 'Retd. Pcs.','datafield' : 'returnedPcs','width' : '70px',cellbeginedit: grStoneForPSR,editable : true,cellsformat : 'n',	columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 0, min: 0, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		},
		{'text' : 'Retd. Wt.','datafield' : 'returnedWt','width' : '70px',cellbeginedit: grStoneForPSR,editable : true,	cellsformat : 'd3',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		}, 
		{'text' : 'Breakage Recv pcs','datafield' : 'breakageReceivedPcs','width' : '100px',cellbeginedit: grStoneForPSR,editable : true,cellsformat : 'n',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 0, min: 0, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		},
		{'text' : 'Breakage Recv Wt.','datafield' : 'breakageReceived','width' : '80px',cellbeginedit: grStoneForPSR,editable : true,cellsformat : 'd3',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		}, 
		{'text' : 'Breakage Loss Not Recv pcs','datafield' : 'breakageNotReceivedPcs','width' : '110px',cellbeginedit: grStoneForPSR,editable : true,cellsformat : 'n',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 0, min: 0, spinButtons: false  });
			},
			
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		}, 
		{'text' : 'Breakage Not Recv Wt.','datafield' : 'breakageNotReceived','width' : '90px',cellbeginedit: grStoneForPSR,editable : true,cellsformat : 'd3',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
		    	
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
			    $("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
		     }
		}, 
		{'text' : 'UOM','datafield' : 'uom',cellbeginedit: grStoneForPSR,'width' : '60px',sortable : false,editable : false}, 
		{'text' : 'Stone Cost Rate',datafield : 'stoneRate',width : '70px',cellbeginedit: grStoneForPSR,columntype : 'combobox',displayfield : 'stoneRates',editable : true,sortable : false,
			initeditor : function(row, value, editor) {
				var stoneCostRates = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "GRStoneCostSPDTO");
				editor.jqxComboBox({
					source : stoneCostRates,
					displayMember : 'displayValue',
					valueMember : 'displayValue',
					dropDownHeight: '100px',
					dropDownWidth: '150px'
				});
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    				
				var grSlNo =  $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "grSlNo");
				var isValidGrDetail = $('#grDetailGrid').jqxGrid('getcellvalue', grSlNo-1, "isValid");
			
				var stoneCost = null;
				var sellingPrice = null;
				var uom = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "uom");
				var usedWt = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "usedWt");
				var bulkWt = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "bulkWt");
				var usedPcs = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "usedPcs");
				var bulkPcs = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "bulkPcs");
				if(null != newvalue && "" != newvalue){
					var res = newvalue.value.split("-");
					
					if("Pcs" == uom){						
						stoneCost = (usedPcs+bulkPcs)*res[2];
						sellingPrice = (usedPcs+bulkPcs)*res[3];						
					}else{
						stoneCost = (usedWt+bulkWt)*res[2];
						sellingPrice = (usedPcs+bulkPcs)*res[3];
					}
					
					var stoneDetails = $("#grStoneDetailGrid").jqxGrid('getrowdatabyid', row);
					
					stoneDetails['stoneCostRate'] =res[2];
					stoneDetails['stoneCost'] = stoneCost;
					stoneDetails['sellingRate'] = res[3];
					stoneDetails['sellingPrice'] = sellingPrice;
					stoneDetails['systemCostRate'] = res[2];
					
					$('#grStoneDetailGrid').jqxGrid('updaterow', row, stoneDetails);
				}				
			   
			    return newvalue;		
			}
		}, 
		{'text' : 'Stone Cost Rate (Edited)','datafield' : 'stoneCostRate','width' : '100px',cellbeginedit: grStoneForPSR,sortable : false,	editable : true,cellsformat : 'd2',	columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits:2, min: 0.00, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSlNo =  $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "grSlNo");
				var isValidGrDetail = $('#grDetailGrid').jqxGrid('getcellvalue', grSlNo-1, "isValid");
        	
				var stoneCost = null;

				var uom = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "uom");
				var usedWt = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "usedWt");
				var bulkWt = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "bulkWt");
				var usedPcs = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "usedPcs");
				var bulkPcs = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "bulkPcs");
				var systemCostRate = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, "systemCostRate");				
				
				if("Pcs" == uom){					
					stoneCost = (usedPcs+bulkPcs)*newvalue;					
				}else{
					stoneCost = (usedWt+bulkWt)*newvalue;
				}
				if(null != systemCostRate && newvalue > systemCostRate){
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "provisional", true);
				}else{
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "provisional", false);
				}
				
				$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneCost", stoneCost);
				return newvalue;
		    
			}
		},
	
		{'text' : 'Stone Cost','datafield' : 'stoneCost','width' : '80px',sortable : false,editable : false,cellsformat : 'd2',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits:2, min: 0.00, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
		}, 
		{'text' : 'Stone HC','datafield' : 'stoneHC','width' : '60px',sortable : false,	editable : true,cellsformat : 'd2',	columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits:2, min: 0.00, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				var suppliedBy = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
				
				if("CO" == suppliedBy){			
					var stoneRates = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'stoneRates');
					var usedPcs = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'usedPcs');
					var usedWt = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'usedWt');
					var uom = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'uom');
					var stoneHC = newvalue;
					var stoneCost1 = (uom == "Cts" || uom=="Gms") ? stoneRates * usedWt : stoneRates * usedPcs;
					var stoneCost2 = (uom == "Cts" || uom=="Gms") ? stoneHC * usedWt : stoneHC * usedPcs;
					var stoneCost = stoneCost1 + stoneCost2;
					
					
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneCost", stoneCost);
				}
				
				if("CU" == suppliedBy){			
					var stoneRates = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'stoneRates');
					var usedPcs = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'usedPcs');
					var usedWt = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'usedWt');
					var uom = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'uom');
					var stoneHC = newvalue;
					
					var stoneCost = (uom == "Cts" || uom=="Gms") ? stoneHC * usedWt : stoneHC * usedPcs;
					
					
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneCost", stoneCost);
				}
				
				if("V" == suppliedBy){	
					var usedPcs = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'usedPcs');
					var usedWt = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'usedWt');
					var uom = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'uom');
					var stoneCostRate = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'stoneCostRate');
					
					var stoneHC = newvalue;
					if("Pcs" == uom){					
						stoneCost1 = usedPcs*stoneCostRate;					
					}else{
						stoneCost1 = usedWt*stoneCostRate;
					}
					
					var stoneCost = stoneCost1 + (usedWt*stoneHC);
					alert(stoneCost);
					console.log(stoneCost);
					
					$("#grStoneDetailGrid").jqxGrid('setcellvalue', row, "stoneCost", stoneCost);
				}
			}
		}, 
		{'text' : 'provisional','datafield' : 'provisional','width' : '85px',sortable : false,editable : false}, 
		{'text' : 'Cert. Req.','datafield' : 'isCertficateRequired','width' : '80px',sortable : false,editable : true,
			cellendedit: function (row, datafield, columntype, oldvalue, newvalue, event) {
				var grFg = $("#grStoneDetailGrid").jqxGrid('getrows');
			},
			columntype : 'dropdownlist',displayfield : 'certDeptN',
			createeditor: function (row, cellvalue, editor) { 
				var certObj =[{"id":"Yes","name":"Yes"},{"id":"No","name":"NO"}];
  		  		editor.jqxDropDownList({ source: certObj, displayMember: 'name', valueMember: 'id'});
			}
		}, 
		{'text' : '',	menu : false,sortable : false,datafield : 'selectionStatus',columntype : 'checkbox',width : '30px',cellbeginedit : grStoneDeleteRow,
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			},
			renderer : function() {
				return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
			}
		},
		{'text' : 'Action',datafield : 'Delete','width' : '5%',columntype : 'button',	cellsalign : 'center',align:'center',
			cellsrenderer : function() {
				return "Delete";
			},
			buttonclick : function(row) {
				id = $("#grStoneDetailGrid").jqxGrid('getrowid', row);
				$("#grStoneDetailGrid").jqxGrid('deleterow', id);		
			}
		}
	];

	masterChildGrid(datafields, columns, data, "#grStoneDetailGrid", addrow,updateRow, deleteRow, true);
	$("#grStoneDetailGrid").jqxGrid({
        height: 150,
        autoheight: true,
        columnsheight : 52,
        columnsresize : true,
        rowsheight: 21
	});	
}



function grAccessoryGrid() {

	var updateRow = function(rowid, newdata, commit) {		
		commit(true);
	}

	var deleteRow = function(rowid, commit) {
		commit(true);
	}
	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	
	
	var suppliedByTypeSource = {
			datatype : 'json',
			datafields : [ 
				{name : 'id',type : 'string'},
				{name : 'name',type : 'string'} 
			],
			localdata : suppliedByList
		};

		var suppliedByTypeDataAdapter = new $.jqx.dataAdapter(suppliedByTypeSource, {
			autoBind : true
		});
		
	var flagTypeSource = {
			datatype : 'json',
			datafields : [ 
				{name : 'id',type : 'string'}, 
				{name : 'name',type : 'string'} 
			],
			localdata : flagList
		};

	var flagTypeDataAdapter = new $.jqx.dataAdapter(flagTypeSource, {
		autoBind : true
	});
		
		
	var datafields = [ 
		{'name' : 'grSlNo','type' : 'long'},
		{'name' : 'id','type' : 'long'}, 
		{'name' : 'suppliedBy','type' : 'string'},
		{'name' : 'suppliedBys','value' : 'suppliedBy',	values : {source : suppliedByTypeDataAdapter.records,value : 'id',name : 'name'}},
		{'name' : 'accCode','type' : 'string'}, 
		{'name' : 'subCategory','type' : 'string'},
		{'name' : 'flag','type' : 'string'},
		{'name' : 'flags','value' : 'flag',values : {source : flagTypeDataAdapter.records,value : 'id',name : 'name'}},
		{'name' : 'issuedPcs','type' : 'long'}, 
		{'name' : 'issuedWt','type' : 'double'}, 
		{'name' : 'usedPcs','type' : 'long'}, 
		{'name' : 'usedWt','type' : 'double'}, 
		{'name' : 'returnedPcs','type' : 'double'}, 
		{'name' : 'returnedWt','type' : 'double'}, 
		{'name' : 'breakageReceivedPcs','type' : 'double'}, 
		{'name' : 'breakageReceived','type' : 'double'},
		{'name' : 'breakageNotReceivedPcs','type' : 'double'},
		{'name' : 'breakageNotReceived','type' : 'double'},
		{'name' : 'uom','type' : 'string'}, 
		{'name' : 'accRate','type' : 'double'}, 
		{'name' : 'accCost','type' : 'double'}, 
		{'name' : 'accHC','type' : 'double'},
		{'name' : 'provisional','type' : 'string'},
		{'name' : 'selectionStatus','type' : 'bool'}  
	];

	var columns = [ 
		{'text' : 'Gr Sl. No.','datafield' : 'grSlNo','width' : '50px',editable : false},
		{'text' : 'Srl No.',sortable : false,filterable : false,editable : false,groupable : false,draggable : false,resizable : false,datafield : '',columntype : 'number',width : 50,
			cellsrenderer : function(row, column, value) {
				return "<div style='margin:4px;'>" + (value + 1) + "</div>";
			}
		}, 
		{'text' : 'Supplied By',datafield : 'suppliedBy',width : '80px',cellbeginedit: grAccForPSR,columntype : 'combobox',displayfield : 'suppliedBys',editable : false}, 
		{'text' : 'Acc Code','datafield' : 'accCode',cellbeginedit: grAccForPSR,'width' : '80px',editable : false}, 
		{'text' : 'Sub Category / Shape.','datafield' : 'subCategory',cellbeginedit: grAccForPSR,'width' : '100px',	editable : true},
		{'text' : 'Flag (+/-)',datafield : 'flag',width : '65px',	columntype : 'combobox',displayfield : 'flags',editable : false,
			initeditor : function(row, value, editor) {
				editor.jqxComboBox({
					source : flagTypeDataAdapter,
					displayMember : 'name',
					valueMember : 'id'
				});
			},
		}, 
		{'text' : 'Issued/Required Pcs','datafield' : 'issuedPcs',cellbeginedit: grAccForPSR,'width' : '55px',editable : false,cellsformat : 'n',columntype : 'numberinput'}, 
		{'text' : 'Issued. Wt.','datafield' : 'issuedWt',cellbeginedit: grAccForPSR,'width' : '75px',editable : false,columntype : 'numberinput',cellsformat : 'd3'}, 
		{'text' : 'Used Pcs','datafield' : 'usedPcs','width' : '55px',editable : true,cellbeginedit: grAccForPSR,cellsformat : 'n',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits:0, min: 0, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		}, 
		{'text' : 'Used. Wt.','datafield' : 'usedWt','width' : '70px',cellbeginedit: grAccForPSR,editable : true,cellsformat : 'd3',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		}, 
		{'text' : 'Retd. Pcs.','datafield' : 'returnedPcs','width' : '70px',editable : true,cellbeginedit: grAccForPSR,cellsformat : 'n',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 0, min: 0, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		},	
		{'text' : 'Retd. Wt.','datafield' : 'returnedWt','width' : '70px',editable : true,cellbeginedit: grAccForPSR,cellsformat : 'd3',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		}, 
		{'text' : 'Breakage Recv pcs','datafield' : 'breakageReceivedPcs','width' : '100px',editable : true,cellbeginedit: grAccForPSR,	cellsformat : 'n',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 0, min: 0, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		},  
		{'text' : 'Breakage Recv Wt.','datafield' : 'breakageReceived','width' : '90px',editable : true,cellbeginedit: grAccForPSR,cellsformat : 'd3',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		},
		{'text' : 'Breakage Not Recv Pcs.','datafield' : 'breakageNotReceivedPcs','width' : '100px',editable : true,cellbeginedit: grAccForPSR,cellsformat : 'n',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 0, min: 0, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}	
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		}, 
		{'text' : 'Breakage Not Recv Wt.','datafield' : 'breakageNotReceived','width' : '100px',editable : true,cellbeginedit: grAccForPSR,cellsformat : 'd3',columntype : 'numberinput',
			initeditor: function (row, cellvalue, editor) {
				editor.jqxNumberInput({ decimalDigits: 3, min: 0.000, spinButtons: false  });
			},
			validation: function (cell, value) {
				if (value < 0) {
					return { result: false, message: "Invalid Number" };
				}
				return true;
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
	    	
				var grSrlno = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			}
		}, 
		{'text' : 'UQC','datafield' : 'uom',cellbeginedit: grStoneForPSR,'width' : '60px',sortable : false,	editable : false}, 
		{'text' : 'Acc cost rate','datafield' : 'accRate','width' : '70px',sortable : false,editable : true}, 
		{'text' : 'Acc Cost','datafield' : 'accCost','width' : '70px',sortable : false,editable : true}, 
		{'text' : 'Acc HC','datafield' : 'accHC','width' : '60px',sortable : false,editable : true}, 
		{'text' : 'provisional','datafield' : 'provisional','width' : '85px',sortable : false,editable : false}, 
		{'text' : '',	menu : false,sortable : false,datafield : 'selectionStatus',columntype : 'checkbox',width : '30px',cellbeginedit : grAccDeleteRow,
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
				$("#grDetailGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false);
			},
			renderer : function() {
				return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
			}
		},
		{'text' : 'Action',datafield : 'Delete','width' : '5%',columntype : 'button',	cellsalign : 'center',align:'center',
			cellsrenderer : function() {return "Delete";},
			buttonclick : function(row) {
				id = $("#grAccDetailGrid").jqxGrid('getrowid', row);
				var commit = $("#grAccDetailGrid").jqxGrid('deleterow', id);		
			}		
	}];

	masterChildGrid(datafields, columns, data, "#grAccDetailGrid", addrow,updateRow, deleteRow, true);
	$("#grAccDetailGrid").jqxGrid({
        height: 125,
        autoheight: true,
        columnsheight : 52,
        columnsresize : true,
        rowsheight: 21
	});
}

function openStoneWindow(row, rowindexid, rowid, offset) {
	$("#stone").jqxWindow({
		position : {
			x : parseInt(offset.left) + 20,
			y : parseInt(offset.top) + 20
		},
		showCollapseButton : true,
		height : '30%',
		minWidth : '95%',
		modalOpacity: 0.3,
		isModal: true,
	    modalBackgroundZIndex: 9999,
	    zIndex: 9999,
	    title: 'Stones for GR Srl No: '.concat(1 + rowindexid)

	});
	
	var stoneData = row.stoneList;
	if(stoneData == '') {
		stoneData = [{"stoneCode" : 'dummy'}];
	}

	$("#stone").jqxWindow('show');
	grStoneGrid(stoneData);
	$("#grStoneDetailGrid").show();
	
}

function openAccessoryWindow(row, rowindexid, rowid, offset) {
	$("#stone").jqxWindow({
		position : {
			x : parseInt(offset.left) + 20,
			y : parseInt(offset.top) + 20
		},
		showCollapseButton : true,
		height : '30%',
		minWidth : '95%',
		modalOpacity: 0.3,
		isModal: true,
	    modalBackgroundZIndex: 9999,
	    zIndex: 9999,
	    title: 'Accessory for GR Srl No: '.concat(1 + rowindexid)

	});
	
	var accData = row.accessoryList;
	if(accData == '') {
		accData = [{"accCode" : 'dummy'}];
	}

	$("#stone").jqxWindow('show');
	grAccessoryGrid(accData);
	
	$("#grAccDetailGrid").show();
	
}

function grFgDetails (row, datafield, columntype) {
	
	var psr =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'psr');
	var articleCode =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'articleCode');

	if (psr != "N") {
    	return false;
        
    }else if(psr == "N" && null == articleCode){
    	articleSearchPopUp();
    	return false;
    }else if(psr == "N" && null != articleCode){
    	return false;
    }else{
    	return true;
    }
	
}

var materialTypePSR = function(rowId, psr){
	var mrvRows = $("#grDetailGrid").jqxGrid('getrows');
	var validation = false;
	
	for(var i = 0; i< mrvRows.length; i++){		
		var data = mrvRows[i];
		
		if(null != data.psr && data.psr == psr && data.selectionStatus == true && mrvRows[i].orderType != "ST"){
			validation = true;	
			break;
		}
	}
	
	return validation;
}

var grFilterValues = function(psrNo, grSrl) {

	fieldFilters = {"fieldFilters" : {}};
	var vendorCode = $('#vendorCode-value').val();	
	fieldFilters.fieldFilters["vendorCode"] = vendorCode;
	fieldFilters.fieldFilters["psrNo"] = psrNo;	
	fieldFilters.fieldFilters["grSrl"] = grSrl;
	
	return fieldFilters;
}

var grCostWastWtFilterValues = function(row , netwt, costCode, costMC, costWastWt) {

	grDto = {};
	var vendorCode = $('#vendorCode-value').val();	
	var skinPurity = $('#skinPurity').val();	
	var rowObj =  $("#grDetailGrid").jqxGrid('getrowdatabyid', row);	
	grDto.vendorCode = vendorCode;
	grDto.skinPurity = skinPurity;
	grDto.segmentId = rowObj.segmentId;
	grDto.articleCode = rowObj.articleCode;
	grDto.grossWt = rowObj.grossWt;
	grDto.netWt = netwt;
	grDto.pcs = rowObj.pcs;
	grDto.costCode = costCode;
	grDto.costMC = costMC;
	grDto.accCostMC = rowObj.actcostMC;
	grDto.costWastage = costWastWt;
	grDto.mrvNo = mrvNo;
	grDto.srl = mrvSrl;
	grDto.psr = rowObj.psr;
	grDto.metalRate = $("#pureRate").val();
	return grDto;
}
var grCostFilterValues = function(row , netwt, costCode, costMC) {

	grDto = {};
	var vendorCode = $('#vendorCode-value').val();	
	var skinPurity = $('#skinPurity').val();	
	var rowObj =  $("#grDetailGrid").jqxGrid('getrowdatabyid', row);	
	grDto.vendorCode = vendorCode;
	grDto.skinPurity = skinPurity;
	grDto.segmentId = rowObj.segmentId;
	grDto.articleCode = rowObj.articleCode;
	grDto.grossWt = rowObj.grossWt;
	grDto.netWt = netwt;
	grDto.pcs = rowObj.pcs;
	grDto.costCode = costCode;
	grDto.costMC = costMC;
	grDto.accCostMC = rowObj.actcostMC;
	grDto.costWastage = rowObj.costWastageWT;
	grDto.mrvNo = mrvNo;
	grDto.srl = mrvSrl;
	grDto.psr = rowObj.psr;
	grDto.metalRate = $("#pureRate").val();
	return grDto;
}

var grOpenPsrForVendors = function() {

	grDto = {};
	
	grDto.vendorCode = $('#vendorCode-valueC').val();
	grDto.skinPurity = $('#skinPurity').val();
	grDto.segmentId = $('#metalSegmentId').val();
	
	return grDto;
}

function validateGRFGDetails(row)
{
	var attributDet = $('#grDetailGrid').jqxGrid('getcellvalue', row, 'attributes');
	if(attributDet == null) {
		$.growl.error({ message: "attributes Detail is mandatory!", duration: 5000, title: 'Error' });
		return false;
	}

/*	var rows = $("#grDetailGrid").jqxGrid('getrows');
	console.log(rows);
	for(var i=0; i<rows.length; i++){
		var stoneList = rows[i].stoneList;
		for(var j = 0; j< stoneList.length; j++){
			var issuedPcs = stoneList[j].issuedPcs;
			var issuedPcs = stoneList[j].issuedWt;
			
			//usedPcs
		} 
	}*/
	var details = $("#grDetailGrid").jqxGrid('getrowdata', row);
	var stoneRows = $("#grStoneDetailGrid").jqxGrid('getrows');
	var gWt = $('#grDetailGrid').jqxGrid ('getcellvalue', row, 'grossWt');
	var nWt = $('#grDetailGrid').jqxGrid ('getcellvalue', row, 'netWt');
	var pcs = $('#grDetailGrid').jqxGrid ('getcellvalue', row, 'pcs');
	var orderType = $('#grDetailGrid').jqxGrid ('getcellvalue', row, 'orderType');
	
	var costWastageWT = $('#grDetailGrid').jqxGrid ('getcellvalue', row, 'costWastageWT');
	var costMC = $('#grDetailGrid').jqxGrid ('getcellvalue', row, 'costMC');
	
	var sellWastageWt = $('#grDetailGrid').jqxGrid ('getcellvalue', row, 'sellWastageWt');
	var sellMC = $('#grDetailGrid').jqxGrid ('getcellvalue', row, 'sellMC');
	
	
	if(costWastageWT > sellWastageWt){
		$.growl.error({ message: "Cost Wastage can not be more than Sell Wastage.", duration: 10000, title: 'Error' });
		return false;
	}
	
	if(costMC > sellMC){
		$.growl.error({ message: "Cost MC can not be more than Sell MC.", duration: 10000, title: 'Error' });
		return false;
	}
	
	if(orderType == "ST"){
		var pendingPcs = $('#grDetailGrid').jqxGrid ('getcellvalue', row, 'pendingPcs');
		var totalPcs = 0;
		var totalGWt = 0.00;
		var totalNWt = 0.00;
		for(var i=0; i<=row; i++){
			var tPcs = $('#grDetailGrid').jqxGrid ('getcellvalue', i , 'pcs');		
			totalPcs = totalPcs + tPcs;
		}
		
		if(totalPcs > pendingPcs){
			$.growl.error({ message: "Pcs can not be more than " + pendingPcs, duration: 10000, title: 'Error' });
			return false;
		}
	}
	
	if(gWt == nWt && gWt != null && nWt != null){
		//$("#grDetailGrid").jqxGrid('setcellvalue', row, "totalValue", tValue);
		details['isValid'] = true;
		globalIndex = null;
	}else{
		var grSrlno = $('#grDetailGrid').jqxGrid('getcellvalue', row, 'srl');
		globalIndex = grSrlno;
	}
	
	if(details.selectionStatus == false){
		$.growl.error({ message: "Srl no "+(row+1)+" is deleted. ", duration: 10000, title: 'Error' });
	}else if(details.isValid == false){
		grStoneAccDetails((row+1)); // Before validating Stone and Accessory details are updating to GRDetails
		if(grFGDMandatoryFieldValidation(row)){
			postJSON('/OrderExecution/api/v1/validateGRFGDetail', JSON
					.stringify(details), function(data) {
				if(1 == data.resCode){
					$("#grDetailGrid").jqxGrid('setcellvalue', row, "isValid", true);
					$.growl.notice({ message: "Validation is sucess", duration: 10000, title: 'Success' });	
					
					updateStoneDetails(row);
					updateAccDetails(row);
					
					calculateCompanyStoneCost(details.stoneList);
					
				}else{
					$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
				}
			});
		}
	}
	else{
		$.growl.error({ message: "Srl no "+(row+1)+"is already validated. There are No changes. ", duration: 10000, title: 'Error' });
	}
	
}


function grCostCode (row, datafield, columntype) {
	
	var costCode =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'costCode');
	var orderKind =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'orderKind');
	
	var actcostMC =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'actcostMC');
	var actcostWastageWt =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'actcostWastageWt');
	if("CSP" == orderKind){		
		return false;
	}else if("CRP" == orderKind && datafield == "costCode" && costCode == "R"){		
		return false;		
	}/*else if(costCode == "M" && (datafield == "costWastageWT" || datafield == "costMC") && actcostMC == 0 && actcostWastageWt == 0){		
		return false;		
	}*/else if ((costCode == "T" || costCode == "R") && (datafield == "costWastageWT" || datafield == "sellWastageWt")) {    	
    	return false;        
    }else{
    	return true;
    }
	
}

function grSellCostCode (row, datafield, columntype) {
	
	var costCode =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'costCode');	
	var setSellinPrice = $('#grDetailGrid').jqxGrid('getcellvalue', row, 'setSellingPrice');	
	var orderKind =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'orderKind');	
	if("CSP" == orderKind){		
		return false;		
	}else if (costCode == "T" && datafield == "sellWastageWt") {    	
    	return false;        
    }else if(costCode == "T" && datafield == "sellMC" && setSellinPrice == true){    	
    	return true;
    }	
	if ((setSellinPrice == true) && (datafield == 'sellMC' || datafield == 'sellWastageWt')) {    	
    	return true;        
    }	
}

function grFGDMandatoryFieldValidation (row) {
	
	var netWt =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'netWt');
	var costCode =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'costCode');
	var costWt =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'costWastageWT');
	var costMC =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'costMC');
	var sellMC =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'sellMC');
	var orderType =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'orderType');
	if (null == netWt) {    	
		$.growl.error({ message: "Please ensure PSR, Article code, PCS, G/N Wt are entered.", duration: 10000, title: 'Error' });
    	return false;        
    }else if(null == costCode){
    	$.growl.error({ message: "Please select costCode.", duration: 10000, title: 'Error' });
    	return false;    	
    }else if(null != costCode && "M" == costCode && (costWt == 0 && costMC == 0)){    	
    	$.growl.error({ message: "Data not found for selected Cost Code. Please select correct code or delete record", duration: 10000, title: 'Error' });
    	return false;    	
    }else if(null != costCode && ("T" == costCode || "R" == costCode) && sellMC == 0){    	
    	$.growl.error({ message: "Data not found for selected Cost Code. Please select correct code or delete record", duration: 10000, title: 'Error' });
    	return false;    	
    }else if(!grStoneDetailsValidation(orderType)){
    	return false;
    }else if(!grAccDetailsValidation(orderType)){
    	return false;
    }else {
    	return true;
    }
	
}

function grStoneDetailsValidation(orderType) {
	
	var stoneDetails = $("#grStoneDetailGrid").jqxGrid('getrows');
	var validation = true;
	var srl = 0;
	for(var i = 0; i< stoneDetails.length; i++){
		srl = i;
		var data = stoneDetails[i];
		
		if(data.selectionStatus == false){
			break;
		
			
		}else if((data.uom == "Gms" || data.uom == "Cts") && (data.issuedWt < data.usedWt) && (orderType == "ST") && (data.suppliedBy != "V")){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+(i+1)+" ensure both Used Wt can not be more than Issued Wt.", duration: 10000, title: 'Error' });
			break;
		}else if(data.uom == "Pcs" && (data.issuedPcs < data.usedPcs)  && (orderType == "ST")  && (data.suppliedBy != "V")){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+(i+1)+" ensure both Used PCS/Wt can not be more than Issued Pcs./Wt.", duration: 10000, title: 'Error' });
			break;
		}else if((null != data.usedPcs && null == data.usedWt) || (null != data.usedWt && null == data.usedPcs)  || (null != data.usedPcs && 0 < data.usedPcs && 0 == data.usedWt) || (null != data.usedWt && 0 < data.usedWt && 0 == data.usedPcs)){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+(i+1)+" ensure both Used PCS and Used Wt is entered.", duration: 10000, title: 'Error' });
			break;
		}else if((null != data.bulkPcs && null == data.bulkWt ) || (null != data.bulkWt && null == data.bulkPcs) || (null != data.bulkPcs && 0 < data.bulkPcs && 0 == data.bulkWt ) || (null != data.bulkWt && 0 < data.bulkWt && 0 == data.bulkPcs)){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+(i+1)+" ensure both Bulk PCS and Bulk Wt is entered.", duration: 10000, title: 'Error' });
			break;
		}else if((null != data.returnedPcs && null == data.returnedWt ) || (null != data.returnedWt && null == data.returnedPcs) || (null != data.returnedPcs && 0 < data.returnedPcs && 0 == data.returnedWt ) || (null != data.returnedWt && 0 < data.returnedWt && 0 == data.returnedPcs)){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+(i+1)+" ensure both Returned PCS and Returned Wt is entered.", duration: 10000, title: 'Error' });
			break;
		}else if((null != data.breakageReceivedPcs && null == data.breakageReceived ) || (null != data.breakageReceived && null == data.breakageReceivedPcs ) || (null != data.breakageReceivedPcs && 0 < data.breakageReceivedPcs && 0 == data.breakageReceived ) || (null != data.breakageReceived && 0 < data.breakageReceived && 0 == data.breakageReceivedPcs )){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+(i+1)+" ensure both Breakage PCS and Breakage  Wt is entered.", duration: 10000, title: 'Error' });
			break;
		}else if((null != data.breakageNotReceivedPcs && null == data.breakageNotReceived ) || (null != data.breakageNotReceived && null == data.breakageNotReceivedPcs) || (null != data.breakageNotReceivedPcs && 0 < data.breakageNotReceivedPcs && 0 == data.breakageNotReceived ) || (null != data.breakageNotReceived && 0 < data.breakageNotReceived && 0 == data.breakageNotReceivedPcs)){
			validation = false;
			$.growl.error({ message: "For Stone Srl "+(i+1)+" ensure both Breakage Not Received PCS and Wt is entered.", duration: 10000, title: 'Error' });
			break;
		}else if(("V" == data.suppliedBy && null != data.stoneCode  && (0 < data.usedPcs || 0 < data.usedWt))  && null == data.stoneCostRate){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+(i+1)+" ensure Rate is selected/exists", duration: 10000, title: 'Error' });
			break;
		}else if( ("CO" == data.suppliedBy && null != data.stoneCode  && (0 < data.usedPcs || 0 < data.usedWt || 0 < data.bulkPcs || 0 < data.bulkWt))  && null == data.stoneCostRate){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+(i+1)+" Standard MAP Rate is not found. Please check.", duration: 10000, title: 'Error' });
			break;
		}
		
	}
	
	return validation;
	
}

function grAccDetailsValidation() {
	
	var accDetails = $("#grAccDetailGrid").jqxGrid('getrows');
	var validation = true;
	var srl = 0;
	for(var i = 0; i< accDetails.length; i++){
		
		var data = accDetails[i];
		srl = i;
		
		if(data.selectionStatus == false){
			break;		
		}else if((null != data.usedPcs && null == data.usedWt) || (null != data.usedWt && null == data.usedPcs) || (null != data.usedPcs && 0 < data.usedPcs && 0 == data.usedWt) || (null != data.usedWt && 0 < data.usedWt && 0 == data.usedPcs)){
			validation = false;	
			break;
		}else if((null != data.bulkPcs && null == data.bulkWt ) || (null != data.bulkWt && null == data.bulkPcs) || (null != data.bulkPcs && 0 < data.bulkPcs && 0 == data.bulkWt ) || (null != data.bulkWt && 0 < data.bulkWt && 0 == data.bulkPcs)){
			validation = false;	
			break;
		}else if((null != data.returnedPcs && null == data.returnedWt ) || (null != data.returnedWt && null == data.returnedPcs) || (null != data.returnedPcs && 0 < data.returnedPcs && 0 == data.returnedWt ) || (null != data.returnedWt && 0 < data.returnedWt && 0 == data.returnedPcs)){
			validation = false;	
			break;
		}else if((null != data.breakageReceivedPcs && null == data.breakageReceived) || (null != data.breakageReceived && null == data.breakageReceivedPcs) || (null != data.breakageReceivedPcs && 0 < data.breakageReceivedPcs && 0 == data.breakageReceived) || (null != data.breakageReceived && 0 < data.breakageReceived && 0 == data.breakageReceivedPcs)){
			validation = false;	
			break;
		}else if((null != data.breakageNotReceivedPcs && null == data.breakageNotReceived) || (null != data.breakageNotReceived && null == data.breakageNotReceivedPcs) || (null != data.breakageNotReceivedPcs && 0 < data.breakageNotReceivedPcs && 0 == data.breakageNotReceived) || (null != data.breakageNotReceived && 0 < data.breakageNotReceived && 0 == data.breakageNotReceivedPcs)){
			validation = false;	
			break;
		}
	}
	if(!validation){
		$.growl.error({ message: "For Accessory Srl "+srl+" ensure both PCS and Wt is entered where applicable", duration: 10000, title: 'Error' });
	}
	
	return validation;
	
}



function grNtWtValidation (row, datafield, columntype) {
	
	var grossWt =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'grossWt');	
	var ntWt =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'netWt');	
	var psr =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'psr');	
	var orderKind =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'orderKind');
	var orderType =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'orderType');
	var isValid =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'isValid');
	if(isValid == true){
		return false;
	}
	
	if("CSP" == orderKind || "SSP" == orderKind){		
		return false;		
	}else{
    	return true;
    }
}

function grPSRValidation (row, datafield, columntype) {
	
	
}

function costCodeMandatoryValidation (row, netwt) {
	var articleCode = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'articleCode');	
	var gWt = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'grossWt');
	var pcs = jQuery('#grDetailGrid').jqxGrid ('getCell', row, 'pcs');
	
	if(null == articleCode.value || (null !=articleCode.value && articleCode.value.length == 0)){		
		$.growl.error({ message: "Article code is mandatory", duration: 10000, title: 'Error' });
		return false;		
	}
	
	if(null  == gWt.value || (null != gWt.value && gWt.value.length  == 0)){		
		$.growl.error({ message: "Gross Weight is mandatory", duration: 10000, title: 'Error' });
		return false;		
	}
	
	if(null  == netwt || (null != netwt && netwt.length  == 0)){		
		$.growl.error({ message: "Net Weight code is mandatory", duration: 10000, title: 'Error' });
		return false;		
	}
	
	if(null  == pcs.value || (null != pcs.value && pcs.value.length  == 0)){		
		$.growl.error({ message: "Pcs is mandatory", duration: 10000, title: 'Error' });
		return false;
	}
	
	return true;
}

function grStoneForPSR (row, datafield, columntype) {
	
	
	var grSrlno = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
    var psrType =  $('#grDetailGrid').jqxGrid('getcellvalue', (grSrlno-1), 'psr');    
    var issuedPcs = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'issuedPcs');
    var issuedWt = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'issuedWt');
    var suppliedBy = $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
  
    if( suppliedBy == "CU" && (datafield == "stoneRate" || datafield == "stoneCostRate")){    	
    	return false;    	
    }else if( suppliedBy == "CO" && (datafield == "stoneRate" || datafield == "stoneCostRate")){    	
    	return false;    	
    }else if (psrType != 'N' && suppliedBy == "V" && (datafield == "returnedWt" || datafield == "returnedPcs" || datafield == "breakageReceivedPcs" || datafield == "breakageReceived" ||  datafield == "breakageNotReceivedPcs" || datafield == "breakageNotReceived" || datafield == "bulkPcs" || datafield == "bulkWt")) {
     	return false;
    }else if (psrType != 'N' && suppliedBy == "CU" && (datafield == "bulkPcs" || datafield == "bulkWt")) {    	
    	return false;
    }else if (psrType == 'N' && (datafield != "usedPcs" && datafield != "usedWt"  && datafield != "stoneRate"  && datafield != "stoneCostRate")) {    	
    	return false;
    }
    else{
    	return true;
    }	
}


function grAccForPSR (row, datafield, columntype) {	
	
	var grSrlno = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'grSlNo');
    var psrType =  $('#grDetailGrid').jqxGrid('getcellvalue', (grSrlno-1), 'psr');
    
    var issuedPcs = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'issuedPcs');
    var issuedWt = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'issuedWt');
    var suppliedBy = $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
    
    
	if (psrType != 'N' && (suppliedBy == "CU" || suppliedBy =="CO") && datafield == "usedPcs" && issuedPcs == null) {    	
    	return false;        
    }else if (psrType != 'N' && (suppliedBy == "CU" || suppliedBy =="CO") && datafield == "usedWt" && issuedWt == null) {    	
    	return false;        
    }else if (psrType != 'N' && suppliedBy == "V" && (datafield == "returnedPcs" || datafield == "breakageReceivedPcs" ||  datafield == "breakageNotReceivedPcs" || datafield == "returnedWt" || datafield == "breakageReceived" ||  datafield == "breakageNotReceived")) {
    	return false;        
    }else if (psrType == 'N' && (datafield != "usedPcs" && datafield != "usedWt")) {    	
    	return false;
    }
    else{
    	return true;
    }
	
}


function createGRFG() {
	var grfgHeader = {
		"grdtos" : []
	};
	var grDetailsArr= [];
	var rows = $("#grDetailGrid").jqxGrid('getrows');
	if(typeof rows != "undefined"){
		for(var i=0; i<rows.length; i++){
			if(rows[i].selectionStatus == true){
				grDetailsArr.push(rows[i]);
			}
		}
	}
	
	grfgHeader.grdtos = grDetailsArr;
	grfgHeader.vendorId = $('#vendorCode-value').val();
	grfgHeader.mrvId = $('#mrvIdC').val();
	grfgHeader.mrvSrlNo = $('#mrvSrlNo').val();
	grfgHeader.vendorBillNO = $('#vendorBillNO').val();
	grfgHeader.metalSegmentId = $('#metalSegmentId').val();
	grfgHeader.pureRate = $('#pureRate').val();
	grfgHeader.skinPurity = $('#skinPurity').val();
	grfgHeader.skinPurityRate = $('#skinPurityRate').val();
	grfgHeader.meltingPurity = $('#meltingPurity').val();
	grfgHeader.tally = $('#tally').val();
	grfgHeader.consignmentPeriod = $('#grcPeriod').val();
	grfgHeader.jwType = $('#jwTypee').val();
	return grfgHeader;
}

function isValidAllgrFGDetails() {
	var grFGDetails = $("#grDetailGrid").jqxGrid('getrows');
	
	var grConPeriod =  $('#grcPeriod').val();
	if("C" == jwType && grConPeriod.length == 0){
		$.growl.error({ message: "Consignment period is mandatory.", duration: 10000, title: 'Error' });
		return false;
	}
	
	var pureRate =  $('#pureRate').val();
	
	if(("D" == jwType ||  "C" == jwType) && pureRate.length == 0){
		$.growl.error({ message: "99.9 Pure Rate is mandatory.", duration: 10000, title: 'Error' });
		return false;
	}
	
	
	var grDetais = true;
	for(var i=0; i<grFGDetails.length; i++){
	
		if(grFGDetails[i].selectionStatus == true){
			var gWt = grFGDetails[i].grossWt;
			var nWt = grFGDetails[i].netWt;
			if(gWt == nWt && null != gWt && null != nWt){
				grFGDetails[i].isValid = true;
			}
			if(grFGDetails[i].isValid == false){
				$.growl.error({ message: "Srl no "+ (i+1)+" is not validated please validate", duration: 10000, title: 'Error' });
				grDetais = false;
				break;
			}
			
			var grStones = grFGDetails[i].stoneList;
			if(null != grStones){
				for(var j=0; j<grStones.length; j++){
					if( grStones[j].selectionStatus == true  &&  ("V" == grStones[j].suppliedBy && null != grStones[j].stoneCode  && (0 < grStones[j].usedPcs || 0 < grStones[j].usedWt))  && null == grStones[j].stoneRate){
						$.growl.error({ message: "Please select stone cost for GR Srl no "+ (i+1)+" and Stone srl no"+(j+1), duration: 10000, title: 'Error' });
						grDetais = false;
						break;
					}
				}
			}
			
		}
		
	}
	
	return grDetais;
}

function calculateCompanyStoneCost(stoneDatails){
	
	if(null != stoneDatails){
		for(var i=0; i<stoneDatails.length; i++){
			
			if("CU" == stoneDatails[i].suppliedBy ){
				
				var stoneCost = null;
				
				var uom = stoneDatails[i].uom;
				var usedWt = stoneDatails[i].usedWt;
				var bulkWt = stoneDatails[i].bulkWt;
				var usedPcs = stoneDatails[i].usedPcs;
				var bulkPcs = stoneDatails[i].bulkPcs;
				var stpmeCostRateEdit = stoneDatails[i].stoneCostRate;
				
				if("Pcs" == uom){					
					stoneCost = (usedPcs+bulkPcs)*stpmeCostRateEdit;					
				}else{
					stoneCost = (usedWt+bulkWt)*stpmeCostRateEdit;
				}
				$("#grStoneDetailGrid").jqxGrid('setcellvalue', i+1, "stoneCost", stoneCost);
			}
			
		}
	}
}

function grDetailsDeleteRow (row, datafield, columntype) {
	
	var selectionStatus =  $('#grDetailGrid').jqxGrid('getcellvalue', row, 'selectionStatus');	
	if(datafield == "selectionStatus" &&  selectionStatus == false){		
		return true;		
	}else{
    	return true;
    }
	
}

function grStoneDeleteRow (row, datafield, columntype) {
	
	var selectionStatus =  $('#grStoneDetailGrid').jqxGrid('getcellvalue', row, 'selectionStatus');	
	if(datafield == "selectionStatus" &&  selectionStatus == false){		
		return false;		
	}else{
    	return true;
    }
	
}

function grAccDeleteRow (row, datafield, columntype) {
	
	var selectionStatus =  $('#grAccDetailGrid').jqxGrid('getcellvalue', row, 'selectionStatus');	
	if(datafield == "selectionStatus" &&  selectionStatus == false){		
		return false;		
	}else{
    	return true;
    }	
}
function populateTestingData (response) {
	if(response != null){
		$("#v_is_pair").val((response.v_is_pair == 0)?'False':'True');
		$("#v_metal_value").val(response.v_metal_value);
		$("#v_wastage_charge_type").val(response.v_wastage_charge_type);
		$("#vv_cost_wastage_wt").val(response.vv_cost_wastage_wt);
		$("#v_mc_charge_type").val(response.v_mc_charge_type);
		$("#vv_cost_mc").val(response.vv_cost_mc);
		$("#v_metal_rate_for_purity").val(response.v_metal_rate_for_purity);
		$("#v_incremental_val").val(response.v_incremental_val);
		$("#mup_previous_record").val(response.mup_previous_record);
		$("#mup_current_record").val(response.mup_current_record);
		$("#value_1").val(response.value_1);
		$("#value_2").val(response.value_2);
		$("#value_3").val(response.value_3);
		$("#app_value_1").val(response.app_value_1);
		$("#app_value_2").val(response.app_value_2);
		$("#app_value_markup_1").val(response.app_value_markup_1);
		$("#app_value_markup_2").val(response.app_value_markup_2);
		$("#total_markup_val").val(response.total_markup_val);
		$("#value_4").val(response.value_4);
		$("#v_sell_metal_rate_for_purity").val(response.v_sell_metal_rate_for_purity);
		$("#value_5").val(response.value_5);
		$("#value_6").val(response.value_6);
		$("#v_mc_apportion_percent").val(response.v_mc_apportion_percent);
		$("#v_wastage_apportion_percent").val(response.v_wastage_apportion_percent);
		$("#sellingWastage").val(response.sellingWastage);
		$("#v_selling_price").val(response.v_selling_price);
	}else{	
		$("#testValueForm").trigger('reset');
	}
}