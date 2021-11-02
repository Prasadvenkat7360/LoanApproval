/*
	##	Author UI       : 	Dipankar Naha
	##  JAVA            :   Divya Madhuri
	##	Date Creation 	: 	29-05-2019
	## 	Description		:	Scanning/Weight Check Create & Search Functionality
*/
$("#metSegLocSection").hide();
$("#viewDailyStockCheck").hide();
$("#dailyStockCheckView").hide();
$(".loader").hide();
// date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});

$("#othMetStkAccC").hide();
$("#finalChk").hide();
$("#Dcm").hide();
$("#Dcs").hide();
$("#DcfgAcc").hide();
$("#DcMetAcc").hide();
$("#DcMetLoc").hide();
$("#stockCheckUpdate").hide();

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
});

$(".loader").hide();
$("#checkUpdate").hide();

//onload API to get login person
var loggedinPerson,metalLocFlag ;
var onLoadFunction = function(){
	var params = {};
	postJSON('/OrderExecution/api/v1/onloadStockCheckDCCreate?page=onload',JSON.stringify(params), function(data) {
		loggedinPerson = data.payload.loginPerson;
		 if(loggedinPerson.name == "DCINV"){
			 $("#create").hide();
			 $("#checkUpdate").show();
			 $("#stockCheckUpdate").show();
			 checkUpdate();
		 }else{
			 $("#create").show();
			 $("#checkUpdate").hide();
			 $("#stockCheckUpdate").hide();
		 }
	});
}

onLoadFunction();

// View daily stock check details for a particular row
var viewDailyStockCheck = function(row, column, value) {
	return '<a class="btn btn-sm btn-primary" type="button" id='
	+ row
	+ ' onclick="viewStockChkDet('
	+ value
	+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>'
}

//view functionality started 
var viewMRVFgData = [];
var viewParcelData = [];
var viewMRVLsData = [];
var viewMRVAccData = [];
var viewGRAccData =[];
var viweGRSTData = [];
var viewLSStone = [];
var viewTRALSStone = [];
var viewRelFG = [];
var viewRelLS = [];
var viewRelACC = [];
var viewOthFg = [];
var viewOthAcc = [];
var viewOthMetalAcc = [];
var tallyReasonArr = [];
var indvLoginPerson;
var viewStockChkDet = function(stkChkNo)
{	
	$("#searchDiv").hide();
	$("#jqxgrid").hide();
	$("#dailyStockCheckSearch").hide();
	$("#create").hide();
	$("#back").show();
	$("#dailyStockCheckView").show();
	$("#createDailyStockCheck").hide();
	$("#viewDailyStockCheck").show();
	$("#stockCheckUpdate").hide();
	
	$("#panelId1").hide();
	$("#panelId2").hide();
	$("#panelId3").hide();
	$("#panelId4").hide();
	
	if(loggedinPerson.name == "DESH"){
		$("#jqxgridOthFgV").addClass("designView");
	}else{
		$("#jqxgridOthFgV").removeClass("designView");
	}
	
	if(loggedinPerson.name == "MRV"){
		$("#jqxgridOthFgV").addClass("mrvView");
	}else{
		$("#jqxgridOthFgV").removeClass("mrvView");
	}
	if(loggedinPerson.name == "SGRA" || loggedinPerson.name == "SG" || loggedinPerson.name == "DSG" ||  loggedinPerson.name == "ASG" ){
		$("#jqxgridOthFgV").addClass("sgView");
	}else{
		$("#jqxgridOthFgV").removeClass("sgView");
	}
	
	var viewVariable = "view";
	if(loggedinPerson.name == "DCINV"){
		$("#finalChk").show();
		viewVariable = "DCSearch";
		//$("#jqxgridOthFgV").addClass("dchView");
	}else{
		$("#finalChk").hide();
		viewVariable = "view";
	//	$("#jqxgridOthFgV").removeClass("dchView");
	}
	
	$.getJSON('/OrderExecution/api/v1/viewDetailsOfStockCheckDC?stkChkId='+stkChkNo+'&search='+viewVariable, function(data) {
		var viewResponse = data.payload.StockCheckDetailDTOList;
		tallyReasonArr =  data.payload.NotTallyReason;
		indvLoginPerson = data.payload.empRole.name;
		$("#dailyStockCheckView").text("Daily Stock Check - View" + " (" + loggedinPerson.description + ")");
		
		if(loggedinPerson.name == "DCINV" && indvLoginPerson != "RGLD" && indvLoginPerson != "DESH"){
			$("#jqxgridOthFgV").addClass("dchView");
		}
		else{
			$("#jqxgridOthFgV").removeClass("dchView");
		}
		
		if(indvLoginPerson == "DESH"){
			$("#jqxgridOthFgV").addClass("designView");
		}else{
			$("#jqxgridOthFgV").removeClass("designView");
		}
		
		$.each(viewResponse,function(k,v){
			if(v.stockCheckFunc == "MRV_FG"){
				viewMRVFgData.push(v);
			}
			if(v.stockCheckFunc == "MRV_PARCEL"  || v.stockCheckFunc == "SG_ASG_PARCEL"){
				viewParcelData.push(v);
			}
			if(v.stockCheckFunc ==  "MRV_LS"){
				viewMRVLsData.push(v)
			}
			if(v.stockCheckFunc == "MRV_ACC"){
				viewMRVAccData.push(v);
			}
			if(v.stockCheckFunc == "MRV_GR_ACC"){
				viewGRAccData.push(v);
			}
			if(v.stockCheckFunc == "SG_ASG_STONE_RECEIPT"){
				viweGRSTData.push(v);
			}
			if(v.stockCheckFunc == "SG_ASG_LS_STN_STK"){
				viewLSStone.push(v);
			}
			if(v.stockCheckFunc == "SG_ASG_LS_STN_PKT"){
				viewTRALSStone.push(v);
			}
			if(v.stockCheckFunc == "REL_FG"){
				viewRelFG.push(v);
			}
			if(v.stockCheckFunc == "REL_LS"){
				viewRelLS.push(v);
			}
			if(v.stockCheckFunc == "REL_ACC"){
				viewRelACC.push(v);
			}
			if(v.stockCheckFunc == "OTHER_STK_FG"){
				viewOthFg.push(v);
			}
			if(v.stockCheckFunc == "OTHER_STK_ACC"){
				viewOthAcc.push(v);
			}
			if(v.stockCheckFunc == "OTHER_METAL_STOCK"){
				viewOthMetalAcc.push(v);
			}
		});
		
	if(loggedinPerson.name != "DCINV"){
		
		if(viewGRAccData.length > 0){
			viewGRAccGrid(viewGRAccData);
		}
		if(viewMRVAccData.length > 0){
			viewMrvAccGrid(viewMRVAccData);
		}
		
		if(viewMRVLsData.length > 0){
			viewMrvLSGrid(viewMRVLsData);		
		}
		
		if(viewMRVFgData.length > 0){
			viewMrvFGGrid(viewMRVFgData);
		}
		
		if(viewParcelData.length > 0){
			viewParcelDetGrid(viewParcelData);
		}
		if(viweGRSTData.length > 0){
			viewGrStoneReceiptGrid(viweGRSTData);
		}
		if(viewLSStone.length > 0){
			viewLooseStoneGrid(viewLSStone);
		}
		if(viewTRALSStone.length > 0){
			viewTRALsGrid(viewTRALSStone);
		}
		if(viewRelFG.length >0){
			viewRelFGGrid(viewRelFG);
		}
		if(viewRelLS.length >0){
			viewRelLSGrid(viewRelLS);
		}
		if(viewRelACC.length >0){
			viewRelACCGrid(viewRelACC);
		}
		if(viewOthFg.length >0){
			viewOtherFGGrid(viewOthFg);
		}
		if(viewOthAcc.length >0){
			viewOtherAccGrid(viewOthAcc);
		}
		if(viewOthMetalAcc.length > 0){
			viewOthMetalAccGrid(viewOthMetalAcc);
		}
	}else{
		var coloumnsParcelV = [];
		var columnsFGV = [];
		var columnsStoneV = [];
		var columnsAccV = [];
		var columnsGRAccV = [];
		
		var coloumnsOtherStockFGV = [];
		var coloumnsOtherStockAccV = [];
		var coloumnOtherMetalAccV = [];
		var columnsSGLSV = [];
		var columnsGRSTV = [];
		var columnsTRALSV = [];
		var columnsRelFGV = [];
		var columnsRelLSV =[];
		var columnsRelACCV = [];
		
		var data = [];
		console.log(viewLSStone);
		var gridNameParcelV = "#jqxgridParcelV";
		var gridNameFGV = "#jqxgridMrvFGV";
		var gridNameStoneV = "#jqxgridMrvLSV";
		var gridNameAccV = "#jqxgridMRVAccV";
		var gridNameGRAccV = "#jqxgridGRAccV";
		
		var gridNameOtherStockFGV = "#jqxgridOthFgV";
		var gridNameOtherStockAccV = "#jqxgridOthAccV";
		var gridNameOtherMetalStockAccV = "#jqxgridMetalAccV";
		
		var gridNameSGLSV ="#jqxgridLSV";
		var gridNameGRSTV ="#jqxgridGRSTV";
		var gridNameTRALSV ="#jqxgridTRALSV";
		
		var gridNameRelFGV ="#jqxgridRelFgV";
		var gridNameRelLSV ="#jqxgridRelLsV";
		var gridNameRelACCV ="#jqxgridRelAccV";

		
		var headerTitleParcelV = "Function: Parcel";
		var headerTitleFGV = "Function: GRV (FG)";
		var headerTitleStoneV = "Function: GRV (Loose Stone)";
		var headerTitleAccV = "Function: GRV (Accessory)";
		var headerTitleGRAccV = "Function: GR Accessory";
		
		var headerTitleOtherStockFGV = "Function: FG Stock";
		var headerTitleOtherStockAccV = "Function : Stock Accessory";
		var headerTitleMetalStockAccV = "Function : Metal Location Stock Check"
		
		var headerTitleSGLSV = "Function : Loose Stone (STK)";
		var headerTitleGRSTV = "Function : GR Stone (Stone Receipt)";
		var headerTitleTRALSV  = "Function : TRA for Loose Stone (Packet)";
		
		var headerTitleRelFGV = "Function : Finished Goods";
		var headerTitleRelLSV = "Function : Loose Stone";
		var headerTitleRelACCV  = "Function : Loose Accessory";
		
		
		// Push data to respective array.
		coloumnsParcelV.push(vendorCode,vendorName,materialType,articleSegmentV,systemFGOrStoneOrAccPcsV,noOfParcelsV,tallied,tallyReason);
		columnsFGV.push(vendorCode,vendorName,refDocNo,refDocSrlNo,materialType,metalSegment,grWt,mrvNetWt,systemFGOrStoneOrAccWtV,grossWtV,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId,systemFGOrStoneOrAccPcs,tallied,tallyReason);
		columnsStoneV.push(vendorCode,vendorName,mrvNo,mrvSlNo,refDocStnOrAccSrlNo,stoneCodes,stoneSubCat,materialType,sysStoneWtV,sysStonePcsV,weightV,piecesV,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId,tallied,tallyReason);
		columnsAccV.push(vendorCode,vendorName,mrvNo,mrvSlNo,refAccSlNo,accCode,accDesc,materialType,sysAccWtV,sysAccPcsV,accWtV,pcsV,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId,tallied,tallyReason);
		columnsGRAccV.push(vendorCode,vendorName,accGrNo,accGrSlNo,accCode,accDesc,materialType,sysAccWtV,sysAccPcsV,inpGrsWtV,inpPcsV,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId,tallied,tallyReason);
		coloumnsOtherStockAccV.push(category,stoneSubCat,sysPiecesV,pcsV,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId,tallied,tallyReason);
		coloumnsOtherStockFGV.push(JewelType,sysPiecesV,pcsV,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId,tallied,tallyReason);
		coloumnOtherMetalAccV.push(metalSegment,locCode,systemFGOrStoneOrAccWtV,grossWtV,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId,tallied,tallyReason);
		
		columnsSGLSV.push(slNoV,stoneCatId,stoneCat,sysStonePcsV,pcsV,tallied,tallyReason);
		columnsGRSTV.push(vendorCode,vendorName,stoneRecNoV,stoneRecSlNoV,stoneCodes,stoneSubCat,materialType,sysStoneWtV,sysStonePcsV,weightV,piecesV,vendorId,tallied,tallyReason);
		columnsTRALSV.push(pktId,stoneSeg,stoneSubCat,stoneCodes,type,sysStoneWtV,sysStonePcsV,pcsV,grossWtV,tallied,tallyReason);
		
		columnsRelFGV.push(orderKind,psrNo,orderId,orderSlNo,jewelTypeDescription,vendorCode,vendorName,metalOrArticleOrStnOrAccSegmentId,metalSegment,systemFGOrStoneOrAccWtV,grossWtV,tallied,tallyReason);
		columnsRelLSV.push(orderId,orderSlNo,stoneOrAccSrlNo,psrNo,stoneSubCat,vendorCode,vendorName,suppBy,sysStoneWtV,weightV,tallied,tallyReason);
		columnsRelACCV.push(orderId,orderSlNo,accSrlNo,psrNo,accDesc,vendorCode,vendorName,suppBy,sysAccPcsV,pcsV,tallied,tallyReason);
	
		if(viewParcelData.length > 0){
			loadDcHeadViewGrids(parcelDataField,coloumnsParcelV, viewParcelData, gridNameParcelV,headerTitleParcelV);
		}
		
		if(viewMRVFgData.length > 0){
			loadDcHeadViewGrids(parcelDataField,columnsFGV,viewMRVFgData, gridNameFGV, headerTitleFGV); // Loading GR FG grid
		}
		
		if(viewMRVLsData.length > 0){
			loadDcHeadViewGrids(parcelDataField,columnsStoneV, viewMRVLsData, gridNameStoneV, headerTitleStoneV); // Loading Stone grid
		}
		
		if(viewMRVAccData.length > 0){
			loadDcHeadViewGrids(parcelDataField,columnsAccV,viewMRVAccData, gridNameAccV, headerTitleAccV); // Loading Accessory grid
		}
		
		if(viewGRAccData.length  > 0){
			loadDcHeadViewGrids(parcelDataField,columnsGRAccV, viewGRAccData, gridNameGRAccV, headerTitleGRAccV); // Loading GR Accessory grid
		}
		
		if(viewLSStone.length > 0){
			loadDcHeadViewGrids(parcelDataField,columnsSGLSV, viewLSStone, gridNameSGLSV, headerTitleSGLSV); // Loading GR FG grid
		}
		
		if(viweGRSTData.length > 0){
			loadDcHeadViewGrids(parcelDataField,columnsGRSTV, viweGRSTData, gridNameGRSTV, headerTitleGRSTV); // Loading Stone grid
		}
		
		if(viewTRALSStone.length > 0){
			loadDcHeadViewGrids(parcelDataField,columnsTRALSV,viewTRALSStone, gridNameTRALSV, headerTitleTRALSV); // Loading Accessory grid
		}
		
		if(viewRelFG.length > 0){
			loadMasterGrid(parcelDataField,columnsRelFGV,viewRelFG, gridNameRelFGV,headerTitleRelFGV);
		}
		
		if(viewRelLS.length > 0){
			loadMasterGrid(parcelDataField,columnsRelLSV, viewRelLS, gridNameRelLSV, headerTitleRelLSV); // Loading GR FG grid
		}
		
		if(viewRelACC.length > 0){
			loadMasterGrid(parcelDataField,columnsRelACCV, viewRelACC, gridNameRelACCV, headerTitleRelACCV); // Loading Stone grid
		}
		
		if(viewOthFg.length > 0){
			loadMasterGrid(parcelDataField,coloumnsOtherStockFGV, viewOthFg, gridNameOtherStockFGV, headerTitleOtherStockFGV); // Loading Stone grid
		}
		
		if(viewOthAcc.length > 0){
			loadMasterGrid(parcelDataField,coloumnsOtherStockAccV, viewOthAcc, gridNameOtherStockAccV, headerTitleOtherStockAccV); // Loading Stone grid
		}
		
		if(viewOthMetalAcc.length > 0){
			loadMasterGrid(parcelDataField,coloumnOtherMetalAccV, viewOthMetalAcc, gridNameOtherMetalStockAccV, headerTitleMetalStockAccV); // Loading Stone grid
		}
		
	  }
  });
}
var loadDcHeadViewGrids = function(dataFields,columns, data, gridName, headerTitle){
	var source = { datafields : dataFields,	localdata : data };
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	$(gridName).jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><i class="fa fa-list fa-sm"></i><b>&nbsp;'+ headerTitle +'</b></div>');	
		},
		columns : columns
	});	
	
}

//Search Functionality
var stockChkSearchGrid = function() {

	var updateRows = function(rowid, newdata, commit) {	commit; };
    
	var datafields =
    	[
    		{ name: 'createdDate',	type: 'date','map':'createdDate'},
		    { name: 'empName',	type: 'string','map':'EmployeeDTO>name'},
		    { name: 'empRole',  type: 'string','map':'EmployeeDTO>roleName'},
		    { name: 'stockCheckZone', type: 'string','map':'EmployeeDTO>empZone>description'},
		    { name: 'stockCheckComplete', type: 'string','map':'isStkChkComplete'},
	        { name: 'id', type: 'int'}
        ];

	var columns =
		[
    	    { text: 'Created Date', datafield: 'createdDate', width: "17%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : false,editable:false},
            { text: 'Employee Name', datafield: 'empName', width: "20%", cellsalign : 'center', align:'center', sortable : false,editable:false},
            { text: 'Employee Role', datafield: 'empRole', width: "20%", cellsalign : 'center',sortable : false,  align:'center',editable:false },
            { text: 'Stock Check Zone', datafield: 'stockCheckZone', width: "20%", cellsalign : 'center',sortable : false, align:'center',editable:false },
            { text: 'Stock Check Complete', datafield: 'stockCheckComplete', width: "15%", cellsalign : 'center',sortable : false, align:'center',editable:false},
            { text: '',datafield: 'id',  width: "8%", cellsalign : 'center',sortable : false, align:'center', cellsrenderer : viewDailyStockCheck,editable:false }       
        ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchStockCheckDC","StockCheckDCList", columns, validateHeader(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :true,
    	theme: 'energyblue',
        columnsheight: 30,
        columnsresize: true,
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

// Validate form header
var validateHeader = function(){
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	fieldFilters = {"fieldFilters" : {}};
	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	return fieldFilters;
}

var checkValidate = function(){
	
	$form = $('#dailyStockCheckForm');
    $form.validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	"fromDateS": { required: true,  dateITA : true },
            "toDateS": { required: true,  dateITA : true }
        },errorPlacement: function(error, element) {
        	if(element.context.name == "fromDateS" || element.context.name == "toDateS"){
        		error.insertAfter(element.parent());
        	}else{
        		error.insertAfter(element);
        	}
        }
    });
    
    if ($form.valid()) {
    	if(loggedinPerson.name != "DCINV"){
    		stockChkSearchGrid();	
        	$("#jqxgrid").show();
        	
        	
    	}else{
    		loadDCHeadSearchData();
    	}
    	
    } else {
    	 return false;
    }
    return false;
}

$("#panelId1").hide();
$("#panelId2").hide();
$("#panelId3").hide();
$("#panelId4").hide();

var loadDCHeadSearchData =  function(){
	var dcHeadMrv = [],dcHeadSg = [],dcHeadRel = [],dcHeadDes = [];
	postJSON('/OrderExecution/api/v1/searchStockCheckDC',JSON.stringify(validateHeader()),function(data) {
		if(data.resCode == "1"){
			var dcHeadData = data.payload.StockCheckDCList;
			$.each(dcHeadData,function(k,v){
				console.log(v.EmployeeDTO.roleName);
				if(v.EmployeeDTO.roleName == "MRV"){
					dcHeadMrv.push(v);
					$("#panelId1").show();
					dcHeadMRVSearchGrid(dcHeadMrv);
					$("#jqxgridM").show();
				}
				if(v.EmployeeDTO.roleName == "SGRA" || v.EmployeeDTO.roleName == "DSG" || v.EmployeeDTO.roleName == "ASG" || v.EmployeeDTO.roleName == "SG"){
					dcHeadSg.push(v);
					$("#panelId2").show();
					dcHeadSGSearchGrid(dcHeadSg);
					$("#jqxgridS").show();
				}
				if(v.EmployeeDTO.roleName == "RGLD" || v.EmployeeDTO.roleName == "REL" ){
					dcHeadRel.push(v);
					$("#panelId3").show();
					dcHeadRelSearchGrid(dcHeadRel);
					$("#jqxgridR").show();
				}
				if(v.EmployeeDTO.roleName == "DESH"){
					dcHeadDes.push(v);
					$("#panelId4").show();
					dcHeadDesSearchGrid(dcHeadDes);
					$("#jqxgridD").show();
				}
			});
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration :10000,
				title : 'Error'
			});
			return false;
		}
	});
}

$("#toggle1").on('click', function(){
	$("#panel1").slideToggle();
});

$("#toggle2").on('click', function(){
	$("#panel2").slideToggle();
});

$("#toggle3").on('click', function(){
	$("#panel3").slideToggle();
});

$("#toggle4").on('click', function(){
	$("#panel4").slideToggle();
});

$("#toggle5").on('click', function(){
	$("#panel5").slideToggle();
});
var dcHeadMRVSearchGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'createdDate',	type: 'date','map':'createdDate'},
			    { name: 'empName',	type: 'string','map':'EmployeeDTO>name'},
			    { name: 'empRole',  type: 'string','map':'EmployeeDTO>roleName'},
			    { name: 'stockCheckDCType', type: 'string'},
			    { name: 'stockCheckComplete', type: 'string','map':'isStkChkComplete'},
		        { name: 'id', type: 'int'}
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridM").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '300px',
		theme: 'energyblue',
        columnsheight: 40,
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
			 	{ text: 'Created Date', datafield: 'createdDate', width: "17%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : false},
	            { text: 'Employee Name', datafield: 'empName', width: "20%", cellsalign : 'center', align:'center', sortable : false},
	            { text: 'Employee Role', datafield: 'empRole', width: "20%", cellsalign : 'center',sortable : false,  align:'center' },
	            { text: 'Stock Check Type', datafield: 'stockCheckDCType', width: "20%", cellsalign : 'center',sortable : false, align:'center' },
	            { text: 'Stock Check Complete', datafield: 'stockCheckComplete', width: "15%", cellsalign : 'center',sortable : false, align:'center' },
	            { text: '',datafield: 'id',  width: "8%", cellsalign : 'center',sortable : false, align:'center', cellsrenderer : viewDailyStockCheck,editable:false } 
		]
	});
}

var dcHeadSGSearchGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'createdDate',	type: 'date','map':'createdDate'},
			    { name: 'empName',	type: 'string','map':'EmployeeDTO>name'},
			    { name: 'empRole',  type: 'string','map':'EmployeeDTO>roleName'},
			    { name: 'stockCheckDCType', type: 'string'},
			    { name: 'stockCheckComplete', type: 'string','map':'isStkChkComplete'},
		        { name: 'id', type: 'int'}
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridS").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '300px',
		theme: 'energyblue',
        columnsheight: 40,
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
			 	{ text: 'Created Date', datafield: 'createdDate', width: "17%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : false},
	            { text: 'Employee Name', datafield: 'empName', width: "20%", cellsalign : 'center', align:'center', sortable : false},
	            { text: 'Employee Role', datafield: 'empRole', width: "20%", cellsalign : 'center',sortable : false,  align:'center' },
	            { text: 'Stock Check Type', datafield: 'stockCheckDCType', width: "20%", cellsalign : 'center',sortable : false, align:'center' },
	            { text: 'Stock Check Complete', datafield: 'stockCheckComplete', width: "15%", cellsalign : 'center',sortable : false, align:'center' },
	            { text: '',datafield: 'id',  width: "8%", cellsalign : 'center',sortable : false, align:'center', cellsrenderer : viewDailyStockCheck,editable:false } 
		]
	});
}

var dcHeadRelSearchGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'createdDate',	type: 'date','map':'createdDate'},
			    { name: 'empName',	type: 'string','map':'EmployeeDTO>name'},
			    { name: 'empRole',  type: 'string','map':'EmployeeDTO>roleName'},
			    { name: 'stockCheckDCType', type: 'string'},
			    { name: 'stockCheckComplete', type: 'string','map':'isStkChkComplete'},
		        { name: 'id', type: 'int'}
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
		height: '300px',
		theme: 'energyblue',
        columnsheight: 40,
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
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 5px;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left"><i class="fa fa-list fa-sm"></i><b>&nbsp; Release </b></div>');	
		},
		columns : [
			 	{ text: 'Created Date', datafield: 'createdDate', width: "17%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : false},
	            { text: 'Employee Name', datafield: 'empName', width: "20%", cellsalign : 'center', align:'center', sortable : false},
	            { text: 'Employee Role', datafield: 'empRole', width: "20%", cellsalign : 'center',sortable : false,  align:'center' },
	            { text: 'Stock Check Type', datafield: 'stockCheckDCType', width: "20%", cellsalign : 'center',sortable : false, align:'center' },
	            { text: 'Stock Check Complete', datafield: 'stockCheckComplete', width: "15%", cellsalign : 'center',sortable : false, align:'center' },
	            { text: '',datafield: 'id',  width: "8%", cellsalign : 'center',sortable : false, align:'center', cellsrenderer : viewDailyStockCheck,editable:false } 
		]
	});
}

var dcHeadDesSearchGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'createdDate',	type: 'date','map':'createdDate'},
			    { name: 'empName',	type: 'string','map':'EmployeeDTO>name'},
			    { name: 'empRole',  type: 'string','map':'EmployeeDTO>roleName'},
			    { name: 'stockCheckDCType', type: 'string'},
			    { name: 'stockCheckComplete', type: 'string','map':'isStkChkComplete'},
		        { name: 'id', type: 'int'}
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridD").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '300px',
		theme: 'energyblue',
        columnsheight: 40,
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
			 	{ text: 'Created Date', datafield: 'createdDate', width: "17%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : false},
	            { text: 'Employee Name', datafield: 'empName', width: "20%", cellsalign : 'center', align:'center', sortable : false},
	            { text: 'Employee Role', datafield: 'empRole', width: "20%", cellsalign : 'center',sortable : false,  align:'center' },
	            { text: 'Stock Check Type', datafield: 'stockCheckDCType', width: "20%", cellsalign : 'center',sortable : false, align:'center' },
	            { text: 'Stock Check Complete', datafield: 'stockCheckComplete', width: "15%", cellsalign : 'center',sortable : false, align:'center' },
	            { text: '',datafield: 'id',  width: "8%", cellsalign : 'center',sortable : false, align:'center', cellsrenderer : viewDailyStockCheck,editable:false } 
		]
	});
}
// Generate row universal

var parcelDataField = [
	{'name' : 'vendorCode','type' : 'string'}, //1
	{'name' : 'vendorName','type' : 'string'}, //2
	{'name' : 'materialType','type' : 'string'}, //3
	{'name' : 'metalOrArticleOrStnOrAccSegmentName','type' : 'string','map':'metalOrArticleOrStnOrAccSegmentName'}, //4
	{'name' : 'inputFGOrStoneOrAccPcs','type' : 'int'}, //5
	{'name' : 'mrvNo','type' : 'int','map':'refDocNo'}, //6
	{'name' : 'mrvSearialNo','type' : 'int','map':'refDocSrlNo'}, //7
	{'name' : 'metalOrArticleOrStnOrAccSegmentName','type' : 'string','map':'metalOrArticleOrStnOrAccSegmentName'}, //8
	{'name' : 'grossWt','type' : 'float','map':''}, //9
	{'name' : 'mrvNetWt','type' : 'float'}, //10
	{'name' : 'inputFGOrStoneOrAccWt','type' : 'float'}, //11
	{'name' : 'refStoneSlNo','type' : 'int'}, //12
	{'name' : 'stoneCode','type' : 'string'}, //13
	{'name' : 'subCatDesc','type' : 'string'}, //14
	{'name' : 'stoneWt','type' : 'float'}, //15
	{'name' : 'stonePcs','type' : 'int'}, //16
	{'name' : 'refAccSlNo','type' : 'int'}, //17
	{'name' : 'stoneOrAccCode','type' : 'string','map':'stoneOrAccCode'}, // 18
	{'name' : 'stoneOrAccSubCatDesc','type' : 'string','map':'stoneOrAccSubCatDesc'}, // 19
	{'name' : 'stoneOrAccWt','type' : 'float','map':'stoneOrAccWt'}, // 20
	{'name' : 'accPcs','type' : 'int',}, // 21
	{'name' : 'accGrNo','type' : 'int','map':'refDocNo'}, //22
	{'name' : 'accGrSlNo','type' : 'int','map':'refDocSrlNo'},  // 23
	{'name' : 'jewelTypeDescription','type' : 'string'},  // 24
	{'name' : 'jewelTypeId','type' : 'int'},  // 25
	{'name' : 'category','type' : 'string'},  // 26
	{'name' : 'subCategory','type' : 'string'},  // 26
	{'name' : 'locationCode','type' : 'string'} , // 27
	{'name' : 'id','type':'int'},
	{'name' : 'stockCheckFunc','type':'string'},
	{'name' : 'vendorId','type':'int'},
	{'name' : 'refDocNo','type' : 'long'}, //6
	{'name' : 'refDocSrlNo','type' : 'int'},
	{'name' : 'metalOrArticleOrStnOrAccSegmentId','type' : 'int'},
	{'name' : 'systemFGOrStoneOrAccPcs','type' : 'int'},
	{'name' : 'systemFGOrStoneOrAccWt','type' : 'float'},
	
	{'name':'stoneReceiptNo','type':'int'},
	{'name' : 'stoneReceiptDetailSrlNo','type':'int'},
	{'name':'stoneOrAccCatDesc','type':'string'},
	{'name' : 'refDocType','type':'string'},
	{'name':'refDocStnOrAccSrlNo','type':'int'},
	
	
	{'name':'orderId','type':'long'},
	{'name':'orderSrlNo','type':'long'},
	{'name':'psrNo','type':'long'},
	{'name':'orderKind','type':'string'},
	{'name':'jewelTypeDescription','type':'string'},
	{'name':'suppliedBy','type':'string'},
	{'name':'stoneOrAccSrlNo','type':'int'},
	{'name':'stoneOrAccCatId','type':'stoneOrAccCatId'},
	{'name':'stoneOrAccSubCatId','type':'int'},
	{'name':'notTallyReason','type':'string'},
	{'name':'isTallied','type':'string'},
	
	{'name':'parcelContentType','type':'string'},
	{'name':'packetOrStkId','type':'long'}
	

];

var loadMasterGrid = function(dataFields,columns, data, gridName, headerTitle){
	console.log(headerTitle);
	var source = { datafields : dataFields,	localdata : data };
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	$(gridName).jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
		theme: 'energyblue',
		columnsresize: true, 
        autoshowfiltericon: true,
		filterable: true,
		autoheight: false,
		altRows : false,
		height: '160px',
		showtoolbar : true,
		pageable:true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 5px;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left"><i class="fa fa-list fa-sm"></i><b>&nbsp;'+ headerTitle +'</b></div>');	
		},
		columns : columns
	});	
}

var id = {'text' : 'Sl No',datafield : 'id',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center', filterable: true}
var pktId = {'text' : 'Packet Id',datafield : 'packetOrStkId',sortable : false,editable : false, width : '6%',cellsalign : 'center',align:'center', filterable: true}
var vendorCode 		= {'text' : 'Vendor Code',datafield : 'vendorCode',sortable : false,editable : false, width : '9%',cellsalign : 'center',align:'center', filterable: true};
var vendorName 		= {'text' : 'Vendor Name',datafield : 'vendorName',sortable : false,editable : false, width : '18%',cellsalign : 'center',align:'center', filterable: true};
var materialType 	= {'text' : 'Material Type',datafield : 'materialType',sortable : false,editable : false, width : '18%',cellsalign : 'center',align:'center', filterable: true};
var metalSegment 	= {'text' : 'Metal Segment',datafield : 'metalOrArticleOrStnOrAccSegmentName',sortable : false,editable : false, width : '11%',cellsalign : 'center',align:'center', filterable: true};
var noOfParcels 	= {'text' : 'No of Parcels',datafield : 'inputFGOrStoneOrAccPcs',sortable : false,editable : true, width : '21%',cellsalign : 'center',align:'center', filterable: true};
var mrvNo 			= {'text' : 'GRV No',datafield : 'mrvNo',sortable : false,editable : false, width : '7%',cellsalign : 'center',align:'center', filterable: true};
var mrvSlNo 		= {'text' : 'GRV Sl No',datafield : 'mrvSearialNo',sortable : false,editable : false, width : '6%',cellsalign : 'center',align:'center', filterable: true};
var articleSegment 	= {'text' : 'Article Segment',datafield : 'metalOrArticleOrStnOrAccSegmentName',sortable : false,editable : false, width : '30%',cellsalign : 'center',align:'center', filterable: true};
var grWt 			= {'text' : 'GRV Gross Wt',datafield : 'grossWt',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: true,cellsformat:'d3'};
var mrvNetWt 		= {'text' : 'GRV Net Wt',datafield : 'mrvNetWt',sortable : false,editable : false, width : '9%',cellsalign : 'center',align:'center', filterable: true,cellsformat:'d3'};
var grossWt 		= {'text' : 'Input Gross Wt',datafield : 'inputFGOrStoneOrAccWt',sortable : false,editable : true, width : '10%',cellsalign : 'center',align:'center', filterable: true,cellsformat:'d3'};
var refStoneSlNo 	= {'text' : 'Ref Stone Sl No',datafield : 'refStoneSlNo',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var stoneCode 		= {'text' : 'Stone Code',datafield : 'stoneCode',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var subCatDesc 		= {'text' : 'Sub Cat Desc',datafield : 'subCatDesc',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var stoneWt 		= {'text' : 'Stone Wt',datafield : 'stoneWt',sortable : false,editable : true, width : '10%',cellsalign : 'center',align:'center', filterable: true,cellsformat:'d3'};
var stonePcs 		= {'text' : 'Stone Pcs',datafield : 'stonePcs',sortable : false,editable : true, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var refAccSlNo 		= {'text' : 'Ref Acc Sl No',datafield : 'refDocStnOrAccSrlNo',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: true};
var accCode 		= {'text' : 'Acc Code',datafield : 'stoneOrAccCode',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: true};
var accDesc 		= {'text' : 'Acc Desc',datafield : 'stoneOrAccSubCatDesc',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var accWt 			= {'text' : 'Acc Wt',datafield : 'inputFGOrStoneOrAccWt',sortable : false,editable : true, width : '5%',cellsalign : 'center',align:'center', filterable: true,cellsformat:'d3'};
var accPcs 			= {'text' : 'Acc Pcs',datafield : 'accPcs',sortable : false,editable : true, width : '5%',cellsalign : 'center',align:'center', filterable: true};
var accGrNo 		= {'text' : 'Acc GR No',datafield : 'accGrNo',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: true};
var accGrSlNo 		= {'text' : 'Acc GR Sl No',datafield : 'accGrSlNo',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: true};
var JewelType 		= {'text' : 'Jewel Type',datafield : 'jewelTypeDescription',sortable : false,editable : false, width : '80%',cellsalign : 'center',align:'center', filterable: true};
var category 		= {'text' : 'Category',datafield : 'stoneOrAccCatDesc',sortable : false,editable : false, width : '45%',cellsalign : 'center',align:'center', filterable: true};
var subCategory 	= {'text' : 'Sub Category',datafield : 'subCategory',sortable : false,editable : false, width : '40%',cellsalign : 'center',align:'center', filterable: true};
var locCode 		= {'text' : 'Location Code',datafield : 'locationCode',sortable : false,editable : false, width : '75%',cellsalign : 'center',align:'center', filterable: true};
var stockCheckFunc 	= {'text' : 'Stock Check Function',datafield : 'stockCheckFunc',sortable : false,editable : false, width : '80%',cellsalign : 'center',align:'center', filterable: true,hidden:true};
var vendorId        = {'text' : 'vendor Id',datafield : 'vendorId',sortable : false,editable : false, width : '80%',cellsalign : 'center',align:'center', filterable: true,hidden:true};
var refDocNo 	    = {'text' : 'GRV No',datafield : 'mrvNo',sortable : false,editable : false, width : '7%',cellsalign : 'center',align:'center', filterable: true};
var refDocSrlNo 	= {'text' : 'GRV Sl No',datafield : 'mrvSearialNo',sortable : false,editable : false, width : '6%',cellsalign : 'center',align:'center', filterable: true};
var metalOrArticleOrStnOrAccSegmentId 	= {'text' : 'Art Seg Id',datafield : 'metalOrArticleOrStnOrAccSegmentId',sortable : false,editable : false, width : '6%',cellsalign : 'center',align:'center', filterable: true,hidden:true};
var systemFGOrStoneOrAccPcs 	= {'text' : 'Art Seg Id',datafield : 'systemFGOrStoneOrAccPcs',sortable : false,editable : false, width : '6%',cellsalign : 'center',align:'center', filterable: true,hidden:true};
var systemFGOrStoneOrAccWt 	= {'text' : 'Art Seg Id',datafield : 'systemFGOrStoneOrAccWt',sortable : false,editable : false, width : '6%',cellsalign : 'center',align:'center', filterable: true,hidden:true};
var pcs 	= {'text' : 'Pcs',datafield : 'inputFGOrStoneOrAccPcs',sortable : false,editable : true, width : '18%',cellsalign : 'center',align:'center', filterable: true};
var stoneCat 	= {'text' : 'Stone Category',datafield : 'stoneOrAccCatDesc',sortable : false,editable : false, width : '78%',cellsalign : 'center',align:'center', filterable: true};
var stoneCatId 	= {'text' : 'Stone Category',datafield : 'stoneOrAccCatId',sortable : false,editable : false, width : '78%',cellsalign : 'center',align:'center', filterable: true,hidden :true};
var stoneRecNo 	= {'text' : 'Stone Receipt No',datafield : 'stoneReceiptNo',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var stoneRecSlNo 	= {'text' : 'Stone Receipt Sl No',datafield : 'stoneReceiptDetailSrlNo',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var stoneCodes 		= {'text' : 'Stone Code',datafield : 'stoneOrAccCode',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var stoneSubCat = {'text' : 'Sub Cat Desc',datafield : 'stoneOrAccSubCatDesc',sortable : false,editable : false, width : '33%',cellsalign : 'center',align:'center', filterable: true};
var stoneSeg = {'text' : 'Stone Segment',datafield : 'metalOrArticleOrStnOrAccSegmentName',sortable : false,editable : false, width : '12%',cellsalign : 'center',align:'center', filterable: true};
var type = {'text' :'Type', datafield : 'refDocType',sortable : false,editable : false, width : '11%',cellsalign : 'center',align:'center', filterable: true}
var weight = {'text' : 'Stone Wt (Input)',datafield : 'inputFGOrStoneOrAccWt',sortable : false,editable : true, width : '10%',cellsalign : 'center',align:'center', filterable: true,cellsformat:'d3'};
var pieces 	= {'text' : 'Stone Pcs(Input)',datafield : 'inputFGOrStoneOrAccPcs',sortable : false,editable : true, width : '18%',cellsalign : 'center',align:'center', filterable: true};
var refDocStnOrAccSrlNo =  {'text' : 'Ref Stone Sl No',datafield : 'refDocStnOrAccSrlNo',sortable : false,editable : false, width : '18%',cellsalign : 'center',align:'center', filterable: true};

var orderKind =  {'text' : 'Order Kind',datafield : 'orderKind',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var psrNo =  {'text' : 'PSR Number',datafield : 'psrNo',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var orderId =  {'text' : 'Order ID',datafield : 'orderId',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var orderSlNo =  {'text' : 'Order Sl No',datafield : 'orderSrlNo',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var jewelTypeDescription = {'text' : 'Jewel Type',datafield : 'jewelTypeDescription',sortable : false,editable : false, width : '18%',cellsalign : 'center',align:'center', filterable: true};
var stoneOrAccSrlNo = {'text' : 'Stone Sl No',datafield : 'stoneOrAccSrlNo',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var suppBy = {'text' : 'Supplied By',datafield : 'suppliedBy',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var accSrlNo = {'text' : 'Acc Sl No',datafield : 'stoneOrAccSrlNo',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var subCatId = {'text' : 'Stone Sub Category',datafield : 'stoneOrAccSubCatId',sortable : false,editable : false, width : '78%',cellsalign : 'center',align:'center', filterable: true,hidden :true};
var pktIdC = {'text' : 'Packet Id',datafield : 'refDocNo',sortable : false,editable : false, width : '6%',cellsalign : 'center',align:'center', filterable: true}

var tallied = {'text' : 'Tally',datafield : 'isTallied',sortable : false,editable : false, width : '5%',cellsalign : 'center',align:'center', filterable: true,
		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			console.log(typeof value);
			var val ;
			if(value == "false"){
				val = "No";
				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:40px;">' + val + '</div>';
			}else{
				val = "Yes";
				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + val + '</div>';
			}
		 }
	};


var tallyReason = {
		text : 'Remarks',
		datafield : 'notTallyReason',
		columntype : 'dropdownlist',
		displayfield : 'notTallyReasonN',
		'width' : '12%',
		cellsalign : 'right',
		align:'center',
		editable : true,
		sortable : false,
		createeditor : function(row, value, editor) {
			var reasonArr = [];
			$.each(tallyReasonArr,function(k,v){
				reasonArr.push({
					"id" : v,
					"name" : v
				});
			})
			editor.jqxDropDownList({ source: reasonArr , displayMember: 'name', valueMember: 'id'});
				
		},
	}

var noOfParcelsV = {'text' : 'No of Parcels',datafield : 'inputFGOrStoneOrAccPcs',sortable : false,editable : false, width : '12%',cellsalign : 'center',align:'center', filterable: true};
var articleSegmentV = {'text' : 'Article Segment',datafield : 'parcelContentType',sortable : false,editable : false, width : '16%',cellsalign : 'center',align:'center', filterable: true};
var systemFGOrStoneOrAccPcsV = {'text' : 'System Parcels',datafield : 'systemFGOrStoneOrAccPcs',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true,hidden:false};
var systemFGOrStoneOrAccWtV = {'text' : 'System Gross Wt',datafield : 'systemFGOrStoneOrAccWt',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true,cellsformat:'d3'};
var grossWtV = {'text' : 'Input Gross Wt',datafield : 'inputFGOrStoneOrAccWt',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true,cellsformat:'d3'};
var weightV = {'text' : 'Stone Wt (Input)',datafield : 'inputFGOrStoneOrAccWt',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center',cellsformat:'d3'};
var piecesV = {'text' : 'Stone Pcs(Input)',datafield : 'inputFGOrStoneOrAccPcs',sortable : false,editable : false, width : '18%',cellsalign : 'center',align:'center'};
var pcsV 	= {'text' : 'Pcs',datafield : 'inputFGOrStoneOrAccPcs',sortable : false,editable : false, width : '18%',cellsalign : 'center',align:'center'};
var accWtV 	= {'text' : 'Acc Wt',datafield : 'inputFGOrStoneOrAccWt',sortable : false,editable : false, width : '5%',cellsalign : 'center',align:'center',cellsformat:'d3'};
var sysStoneWtV = {'text' : 'System Stone Wt',datafield : 'systemFGOrStoneOrAccWt',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true,hidden:false,cellsformat:'d3'};
var sysStonePcsV = {'text' : 'System Stone Pcs',datafield : 'systemFGOrStoneOrAccPcs',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true,hidden:false};
var sysAccWtV = {'text' : 'System Acc Wt',datafield : 'systemFGOrStoneOrAccWt',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: true,hidden:false,cellsformat:'d3'};
var sysAccPcsV = {'text' : 'System Acc Pcs',datafield : 'systemFGOrStoneOrAccPcs',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: true,hidden:false};
var sysPiecesV = {'text' : 'System Pcs',datafield : 'systemFGOrStoneOrAccPcs',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: true,hidden:false};
var inpGrsWtV = {'text' : 'Input Acc Wt',datafield : 'inputFGOrStoneOrAccWt',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true,cellsformat:'d3'};
var inpPcsV = {'text' : 'Input Acc Pcs',datafield : 'inputFGOrStoneOrAccPcs',sortable : false,editable : false, width : '18%',cellsalign : 'center',align:'center'};
var stoneRecNoV = {'text' : 'Stone Receipt No',datafield : 'refDocNo',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var stoneRecSlNoV 	= {'text' : 'Stone Receipt Sl No',datafield : 'refDocSrlNo',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: true};
var slNoV = {'text' : 'Sl No',datafield : 'id',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center', filterable: true}


var dscCreateData ,loginPerson;
var loadData = function(){
	$(".loader").show();
	var coloumnsParcel = [];
	var columnsFG = [];
	var columnsStone = [];
	var columnsAcc = [];
	var columnsGRAcc = [];
	
	var coloumnsOtherStockFG = [];
	var coloumnsOtherStockAcc = [];	
	var columnsSGLS = [];
	var columnsGRST = [];
	var columnsTRALS = [];
	var columnsRelFG = [];
	var columnsRelLS =[];
	var columnsRelACC = [];
	
	var data = [];
	
	var gridNameParcel = "#jqxgridParcel";
	var gridNameFG = "#jqxgridFG";
	var gridNameStone = "#jqxgridStone";
	var gridNameAcc = "#jqxgridAcc";
	var gridNameGRAcc = "#jqxgridGRAcc";
	
	var gridNameOtherStockFG = "#jqxgridOtherStockFG";
	var gridNameOtherStockAcc = "#jqxgridOtherStockAcc";
	var gridNameSGLS ="#jqxgridSGLS";
	var gridNameGRST ="#jqxgridGRST";
	var gridNameTRALS ="#jqxgridTRALS";
	
	var gridNameRelFG ="#jqxgridRelFG";
	var gridNameRelLS ="#jqxgridRelLS";
	var gridNameRelACC ="#jqxgridRelACC";

	
	var headerTitleParcel = "Function: Parcel";
	var headerTitleFG = "Function: GRV (FG)";
	var headerTitleStone = "Function: GRV (Loose Stone)";
	var headerTitleAcc = "Function: GRV (Accessory)";
	var headerTitleGRAcc = "Function: GR Accessory";
	
	var headerTitleOtherStockFG = "Function: FG Stock";
	var headerTitleOtherStockAcc = "Function : Stock Accessory";
	
	var headerTitleSGLS = "Function : Loose Stone (STK)";
	var headerTitleGRST = "Function : GR Stone (Stone Receipt)";
	var headerTitleTRALS  = "Function : TRA for Loose Stone (Packet)";
	
	var headerTitleRelFG = "Function : Finished Goods";
	var headerTitleRelLS = "Function : Loose Stone";
	var headerTitleRelACC  = "Function : Loose Accessory";
	
	
	// Push data to respective array.
	coloumnsParcel.push(id,vendorCode,vendorName,materialType,articleSegment,noOfParcels,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId,systemFGOrStoneOrAccPcs,systemFGOrStoneOrAccWt);
	columnsFG.push(id,vendorCode,vendorName,refDocNo,refDocSrlNo,materialType,metalSegment,grWt,mrvNetWt,grossWt,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId,systemFGOrStoneOrAccPcs,systemFGOrStoneOrAccWt);
	columnsStone.push(id,vendorCode,vendorName,mrvNo,mrvSlNo,refDocStnOrAccSrlNo,stoneCodes,stoneSubCat,materialType,weight,pieces,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId);
	columnsAcc.push(id,vendorCode,vendorName,mrvNo,mrvSlNo,refAccSlNo,accCode,accDesc,materialType,accWt,pcs,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId);
	columnsGRAcc.push(id,vendorCode,vendorName,accGrNo,accGrSlNo,accCode,accDesc,materialType,grossWt,pcs,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId);
	coloumnsOtherStockAcc.push(id,category,stoneSubCat,pcs,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId,subCatId);
	coloumnsOtherStockFG.push(id,JewelType,pcs,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId);
	//coloumnOtherMetalAcc.push(id,metalSegment,locCode,grossWt,stockCheckFunc,vendorId,metalOrArticleOrStnOrAccSegmentId);
	
	columnsSGLS.push(id,stoneCatId,stoneCat,pcs);
	columnsGRST.push(id,vendorCode,vendorName,stoneRecNo,stoneRecSlNo,stoneCodes,stoneSubCat,materialType,weight,pieces,vendorId);
	columnsTRALS.push(pktIdC,stoneSeg,stoneSubCat,stoneCodes,type,pcs,grossWt,subCatId);
	
	columnsRelFG.push(id,orderKind,psrNo,orderId,orderSlNo,jewelTypeDescription,vendorCode,vendorName,metalOrArticleOrStnOrAccSegmentId,metalSegment,grossWt);
	columnsRelLS.push(id,orderId,orderSlNo,stoneOrAccSrlNo,psrNo,stoneSubCat,vendorCode,vendorName,suppBy,grossWt);
	columnsRelACC.push(id,orderId,orderSlNo,accSrlNo,psrNo,accDesc,vendorCode,vendorName,suppBy,pcs);

	
	var systemDate = new Date();
	var dd = systemDate.getDate();
	var mm = systemDate.getMonth() + 1;
	var yy = systemDate.getFullYear();
	var sysDate = dd + "/" + mm + "/" + yy;
	
	var params = {"fieldFilters":{ "fromDate": sysDate,"toDate": sysDate }}
	
	postJSON('/OrderExecution/api/v1/onloadStockCheckDCCreate?page=create',JSON.stringify(params), function(data) {
		if(data.resCode == 1 || data.resCode == "1"){
		var onLoadData = data.payload.onLoadData;
		dscCreateData = data.payload.onLoadData;
		loginPerson = data.payload.loginPerson;
		
		
		metalLocFlag = data.payload.checkMetalLocations;
		$("#dailyStockCheckCreate").text("Daily Stock Check - Create" + " (" + loginPerson.description + ")");
		if(data.payload.checkMetalLocations == true){
			$("#metSegLocSection").show();
			$('#segment').empty().append('<option value="" selected>--Select--</option>');
			$('#metalLocation').empty().append('<option value="" selected>--Select--</option>');
			
			// Segment  Multi Select
			var o = '<select id="segmentObj" name="segmentObj" class="form-control" multiple="multiple">';
			$.each(data.payload.Segments, function(key, val) {
				o += '<option value="' + val.id 	+ '">' + val.description + '</option>';
			});
			o += '</select>';
			$("#segment").html(o);
			$('#segmentObj').multiselect(
			{
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
			
			// Metal Location Multi Select
			
			var d = '<select id="metalLocationObj" name="metalLocationObj" class="form-control" multiple="multiple">';
			$.each(data.payload.MetalLocations, function(key, val) {
				d += '<option value="' + val + '">' + val + '</option>';
			});
			d += '</select>';
			$("#metalLocation").html(d);
			$('#metalLocationObj').multiselect(
			{
				includeSelectAllOption : true,
		    	enableCaseInsensitiveFiltering:true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
	
		}
		
		$.each(onLoadData, function(k,v){
			if(v.stockCheckDCFunction == "OTHER_STK_FG" && v.otherFgStkList.length > 0){
				loadMasterGrid(parcelDataField,coloumnsOtherStockFG, v.otherFgStkList, gridNameOtherStockFG,headerTitleOtherStockFG);
			}
			
			if(v.stockCheckDCFunction == "OTHER_STK_ACC" && v.otherLsAccList.length > 0){
				loadMasterGrid(parcelDataField,coloumnsOtherStockAcc, v.otherLsAccList, gridNameOtherStockAcc,headerTitleOtherStockAcc);
			}
			
			if(loginPerson.name == "DESH"){
				$("#jqxgridOtherStockFG").addClass("designView");
			}else{
				$("#jqxgridOtherStockFG").removeClass("designView");
			}
			
			if(loginPerson.name == "MRV"){
				$("#jqxgridOtherStockFG").addClass("mrvView");
			}else{
				$("#jqxgridOtherStockFG").removeClass("mrvView");
			}
		});
		
		if(data.payload.loginPerson.name == "MRV"){
			$.each(onLoadData, function(k,v){
				if(v.stockCheckDCFunction == "MRV_Parcel" && v.mrvParcelList.length > 0){
					loadMasterGrid(parcelDataField,coloumnsParcel, v.mrvParcelList, gridNameParcel,headerTitleParcel);
				}
				
				if(v.stockCheckDCFunction == "MRV_FG" && v.mrvFGList.length > 0){
					loadMasterGrid(parcelDataField,columnsFG, v.mrvFGList, gridNameFG, headerTitleFG); // Loading GR FG grid
				}
				
				if(v.stockCheckDCFunction == "MRV_LS" && v.mrvLSList.length > 0){
					loadMasterGrid(parcelDataField,columnsStone, v.mrvLSList, gridNameStone, headerTitleStone); // Loading Stone grid
				}
				
				if(v.stockCheckDCFunction == "MRV_ACC" && v.mrvAccList.length > 0){
					loadMasterGrid(parcelDataField,columnsAcc, v.mrvAccList, gridNameAcc, headerTitleAcc); // Loading Accessory grid
				}
				
				if(v.stockCheckDCFunction == "MRV_GR_ACC" && v.mrvGrAccList.length > 0){
					loadMasterGrid(parcelDataField,columnsGRAcc, v.mrvGrAccList, gridNameGRAcc, headerTitleGRAcc); // Loading GR Accessory grid
				}
				
				$(".loader").hide();
			});
		}
		if(data.payload.loginPerson.name == "SGRA" || data.payload.loginPerson.name == "DSG" || data.payload.loginPerson.name == "ASG" || data.payload.loginPerson.name == "SG" ){
			$.each(onLoadData, function(k,v){
				if(v.stockCheckDCFunction == "SG_ASG_PARCEL" && v.sgOrAsgParcelList.length > 0){
					loadMasterGrid(parcelDataField,coloumnsParcel, v.sgOrAsgParcelList, gridNameParcel,headerTitleParcel);
				}
				
				if(v.stockCheckDCFunction == "SG_ASG_LS_STN_STK" && v.sgOrAsgLSStkList.length > 0){
					loadMasterGrid(parcelDataField,columnsSGLS, v.sgOrAsgLSStkList, gridNameSGLS, headerTitleSGLS); // Loading GR FG grid
				}
				
				if(v.stockCheckDCFunction == "SG_ASG_STONE_RECEIPT" && v.sgOrAsgStoneReceiptList.length > 0){
					loadMasterGrid(parcelDataField,columnsGRST, v.sgOrAsgStoneReceiptList, gridNameGRST, headerTitleGRST); // Loading Stone grid
				}
				
				if(v.stockCheckDCFunction == "SG_ASG_LS_STN_PKT" && v.sgOrAsgLSPktList.length > 0){
					loadMasterGrid(parcelDataField,columnsTRALS, v.sgOrAsgLSPktList, gridNameTRALS, headerTitleTRALS); // Loading Accessory grid
				}
				
				$(".loader").hide();
			});
		}
		if(data.payload.loginPerson.name == "RGLD" || data.payload.loginPerson.name == "REL" ){
			$.each(onLoadData, function(k,v){
				if(v.stockCheckDCFunction == "REL_FG" && v.RelFgList.length > 0){
					loadMasterGrid(parcelDataField,columnsRelFG, v.RelFgList, gridNameRelFG,headerTitleRelFG);
				}
				
				if(v.stockCheckDCFunction == "REL_LS" && v.RelLSList.length > 0){
					loadMasterGrid(parcelDataField,columnsRelLS, v.RelLSList, gridNameRelLS, headerTitleRelLS); // Loading GR FG grid
				}
				
				if(v.stockCheckDCFunction == "REL_ACC" && v.RelAccList.length > 0){
					loadMasterGrid(parcelDataField,columnsRelACC, v.RelAccList, gridNameRelACC, headerTitleRelACC); // Loading Stone grid
				}
				
				$(".loader").hide();
			});
		}
		
		
		}else{
			$.growl.error({	message : data.mesgStr,duration : 10000	});			
			setTimeout(function(){ 
				window.location.href = "javascript:showContentPage('dailyStockCheckDc', 'bodySwitcher')";
			}, 1000);
		}
	
		
	});
}

// On click on search loading grid after checking validation of mandatory fields.
$("#search").on('click', function(){
	/*$("#jqxgridDcm").hide();
	$("#jqxgridDcs").hide();
	$("#jqxgridDcOthFgAcc").hide();
	$("#jqxgridDcOthMetAcc").hide();
	$("#jqxgridOthMetLocCode").hide();*/
	$("#panel5").slideUp();
	
	/*$("#Dcm").hide();
	$("#Dcs").hide();
	$("#DcfgAcc").hide();
	$("#DcMetAcc").hide();
	$("#DcMetLoc").hide();*/
	checkValidate();
});

var clearAll = function(){
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
}

//Clear grid and reset input and Drop down value
$('#clearAll').on('click', function() {
	clearAll();
});

$("#create").show();
$("#dailyStockCheckForm").show();
$("#back").hide();
$("#dailyStockCheckSearch").show();
$("#dailyStockCheckCreate").hide();
$("#createDailyStockCheck").hide();


$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
});

$("#create").on('click', function(){
	clearAll();
	$('#sidebar').addClass('active');
	$("#dailyStockCheckForm").hide();
	$("#create").hide();
	$("#back").show();
	$("#dailyStockCheckSearch").hide();
	$("#dailyStockCheckCreate").show();
	$("#createDailyStockCheck").show();
	
	loadData(); // Calling API on click on created
});

// LOAD METAL STOCK Grid

$("#metalLocation").on('change',function(){
	$('#segmentObj').multiselect("clearSelection");
});


$("#segment").on('change',function(){
	loadMetalLocationStock();
});


var loadMetalLocationStock = function(){
	$(".loader").show();
	$("#toolbarjqxgridOtherMetAcc").hide();
	var metalLocationObj = $("#metalLocationObj").val();
	
	console.log(metalLocationObj);
	if(metalLocationObj == null){
		$.growl.error({
			message : "Please Select Location Code !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	
	metalLocationObj = metalLocationObj.join(',');
	
	console.log(segmentObj);
	
	var segmentObj = $("#segmentObj").val();
	segmentObj = segmentObj.join(',');
	
	var systemDate = new Date();
	var dd = systemDate.getDate();
	var mm = systemDate.getMonth() + 1;
	var yy = systemDate.getFullYear();
	var sysDate = dd + "/" + mm + "/" + yy;
	
	var params = {
			  "fieldFilters": {
				    "MetalLocations":  metalLocationObj.toString(),
				    "MetalSegmentIds":  segmentObj.toString(),
				    "fromDate":sysDate,
				    "toDate":sysDate
				  }
				}
	
	if(metalLocationObj != null && metalLocationObj !="" && segmentObj != null && segmentObj !=""){
		postJSON('/OrderExecution/api/v1/getMetalAccountCheckDetails', JSON.stringify(params), function(data) {
			if(data.resCode == "1"){
				$("#othMetStkAccC").show();
				//loadMasterGrid(parcelDataField,coloumnOtherMetalAcc,data.payload.OTHER_METAL_ACC.otherMetAccList, gridNameOtherMetalAcc,headerTitleOtherMetalAcc);
				otherMetalAccGrid(data.payload.OTHER_METAL_STOCK.otherMetAccList);
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title :'Error'
				});
				return false;
			}
		 });
	}
}

var otherMetalAccGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'id', type : 'int'}, 
			{name : 'locationCode', type : 'string'},
			{name : 'metalOrArticleOrStnOrAccSegmentName', type : 'string'},
			{name : 'inputFGOrStoneOrAccWt', type : 'float'},
			{name : 'metalOrArticleOrStnOrAccSegmentId',type:'int'},
			{name : 'vendorId',type:'int'},
			{name : 'stockCheckFunc',type:'string'},
			{name : 'systemFGOrStoneOrAccPcs',type:'long'},
			{name : 'systemFGOrStoneOrAccWt',type:'float'}	
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridOtherMetAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
		theme: 'energyblue',
		columnsresize: true, 
        autoshowfiltericon: true,
		filterable: true,
		autoheight: false,
		altRows : false,
		height: '160px',
		columns : [ 
			{ text : 'Sl No', datafield : 'id', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Segment', datafield : 'metalOrArticleOrStnOrAccSegmentName', width : '30%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Location Code', datafield : 'locationCode', width : '30%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Input Gross Wt', datafield : 'inputFGOrStoneOrAccWt', width : '20%', cellsalign : 'center', align : 'center', editable : true, sortable : false,cellsformat:'d3'},
		
			{ text : '', datafield : 'metalOrArticleOrStnOrAccSegmentId', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'vendorId', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden :true},
			{ text : '', datafield : 'stockCheckFunc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : '', datafield : 'systemFGOrStoneOrAccPcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : '', datafield : 'systemFGOrStoneOrAccWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true,cellsformat:'d3'},
			]
	});
}

var getDSCCreateData = function(){
	var parcelData = $("#jqxgridParcel").jqxGrid('getrows');
	var mrvFgData = $("#jqxgridFG").jqxGrid('getrows');
	var grAccData = $("#jqxgridGRAcc").jqxGrid('getrows');
	var otherfgStockData = $("#jqxgridOtherStockFG").jqxGrid('getrows');
	var otherStockAccData = $("#jqxgridOtherStockAcc").jqxGrid('getrows');
	var mrvLsData = $("#jqxgridStone").jqxGrid('getrows');
	var mrvAccData = $("#jqxgridAcc").jqxGrid('getrows');
	var otherMetalAccData = $("#jqxgridOtherMetAcc").jqxGrid('getrows');
	
	var createData = [];
	var parcelObj =
	{
	    "stockCheckDCType": "MRV",
	    "stockCheckDCFunction": "MRV_Parcel",
	    "mrvParcelList" : parcelData
	}
	var fgStockObj =
	{
		"stockCheckDCType": "MRV",
	    "stockCheckDCFunction": "MRV_FG",
	    "mrvFGList": mrvFgData
	}
	var grAccDataObj =
	{
		"stockCheckDCType": "MRV",
		"stockCheckDCFunction": "MRV_GR_ACC",
	    "mrvGrAccList": grAccData
	}
	var otherFgStockObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_STK_FG",
	    "otherFgStkList": otherfgStockData
	}
	var otherAccStockObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_STK_ACC",
	    "otherLsAccList": otherStockAccData
	}
	var mrvLsDataObj =
	{
		"stockCheckDCType": "MRV",
		"stockCheckDCFunction": "MRV_LS",
	    "mrvLSList": mrvLsData
	}
	
	var mrvAccDataObj =
	{
		"stockCheckDCType": "MRV",
		"stockCheckDCFunction": "MRV_ACC",
	    "mrvAccList": mrvAccData
	}
	var otherMetalAccDataObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_METAL_STOCK",
	    "otherMetAccList": otherMetalAccData
	}
	
	createData.push(parcelObj);
	createData.push(fgStockObj);
	createData.push(grAccDataObj);
	createData.push(otherFgStockObj);
	createData.push(otherAccStockObj);
	createData.push(mrvLsDataObj);
	createData.push(mrvAccDataObj);
	createData.push(otherMetalAccDataObj);
	
	return createData;

}

var getDSCSGCreateData = function(){
	var parcelData = $("#jqxgridParcel").jqxGrid('getrows');
	var looseStoneData = $("#jqxgridSGLS").jqxGrid('getrows');
	var grStoneData = $("#jqxgridGRST").jqxGrid('getrows');
	var lsPacketData = $("#jqxgridTRALS").jqxGrid('getrows');
	var otherfgStockData = $("#jqxgridOtherStockFG").jqxGrid('getrows');
	var otherStockAccData = $("#jqxgridOtherStockAcc").jqxGrid('getrows');
	var otherMetalAccData = $("#jqxgridOtherMetAcc").jqxGrid('getrows');
	
	var createSGData = [];
	var parcelObj =
	{
	    "stockCheckDCType": "SG_ASG",
	    "stockCheckDCFunction": "SG_ASG_PARCEL",
	    "sgOrAsgParcelList" : parcelData
	}
	var looseStoneObj =
	{
		"stockCheckDCType": "SG_ASG",
	    "stockCheckDCFunction": "SG_ASG_LS_STN_STK",
	    "sgOrAsgLSStkList": looseStoneData
	}
	var grStoneObj =
	{
		"stockCheckDCType": "SG_ASG",
		"stockCheckDCFunction": "SG_ASG_STONE_RECEIPT",
	    "sgOrAsgStoneReceiptList": grStoneData
	}
	var lsPacketObj =
	{
		"stockCheckDCType": "SG_ASG",
		"stockCheckDCFunction": "SG_ASG_LS_STN_PKT",
	    "sgOrAsgLSPktList": lsPacketData
	}
	var otherFgStockObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_STK_FG",
	    "otherFgStkList": otherfgStockData
	}
	var otherAccStockObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_STK_ACC",
	    "otherLsAccList": otherStockAccData
	}
	var otherMetalAccDataObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_METAL_STOCK",
	    "otherMetAccList": otherMetalAccData
	}
	
	createSGData.push(parcelObj);
	createSGData.push(looseStoneObj);
	createSGData.push(grStoneObj);
	createSGData.push(lsPacketObj);
	createSGData.push(otherFgStockObj);
	createSGData.push(otherAccStockObj);
	createSGData.push(otherMetalAccDataObj);
	
	return createSGData;
	
}

var getDSCDesCreateData = function(){
	var otherfgStockData = $("#jqxgridOtherStockFG").jqxGrid('getrows');
	var otherStockAccData = $("#jqxgridOtherStockAcc").jqxGrid('getrows');
	var otherMetalAccData = $("#jqxgridOtherMetAcc").jqxGrid('getrows');
	
	var createDesData = [];
	var otherFgStockObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_STK_FG",
	    "otherFgStkList": otherfgStockData
	}
	var otherAccStockObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_STK_ACC",
	    "otherLsAccList": otherStockAccData
	}
	var otherMetalAccDataObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_METAL_STOCK",
	    "otherMetAccList": otherMetalAccData
	}
	
	createDesData.push(otherFgStockObj);
	createDesData.push(otherAccStockObj);
	createDesData.push(otherMetalAccDataObj);
	
	return createDesData;
	
}

var getDSCRelCreateData = function(){
	var relFgData = $("#jqxgridRelFG").jqxGrid('getrows');
	var relStoneData = $("#jqxgridRelLS").jqxGrid('getrows');
	var relAccData = $("#jqxgridRelACC").jqxGrid('getrows');
	var otherfgStockData = $("#jqxgridOtherStockFG").jqxGrid('getrows');
	var otherStockAccData = $("#jqxgridOtherStockAcc").jqxGrid('getrows');
	var otherMetalAccData = $("#jqxgridOtherMetAcc").jqxGrid('getrows');
	
	var createRelData = [];
	var relFgObj =
	{
	    "stockCheckDCType": "REL",
	    "stockCheckDCFunction": "REL_FG",
	    "RelFgList" : relFgData
	}
	var relStoneObj =
	{
		"stockCheckDCType": "REL",
	    "stockCheckDCFunction": "REL_LS",
	    "RelLSList": relStoneData
	}
	var relAccObj =
	{
		"stockCheckDCType": "REL",
		"stockCheckDCFunction": "REL_ACC",
	    "RelAccList": relAccData
	}
	var otherFgStockObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_STK_FG",
	    "otherFgStkList": otherfgStockData
	}
	var otherAccStockObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_STK_ACC",
	    "otherLsAccList": otherStockAccData
	}
	var otherMetalAccDataObj =
	{
		"stockCheckDCType": "OTHERS",
		"stockCheckDCFunction": "OTHER_METAL_STOCK",
	    "otherMetAccList": otherMetalAccData
	}
	
	createRelData.push(relFgObj);
	createRelData.push(relStoneObj);
	createRelData.push(relAccObj);
	createRelData.push(otherFgStockObj);
	createRelData.push(otherAccStockObj);
	createRelData.push(otherMetalAccDataObj);
	
	return createRelData;
	
}
$("#save").on('click',function(){
	
	var otherfgStockDataV = $("#jqxgridOtherStockFG").jqxGrid('getrows');
	var otherStockAccDataV = $("#jqxgridOtherStockAcc").jqxGrid('getrows');
	var otherMetalAccDataV = $("#jqxgridOtherMetAcc").jqxGrid('getrows');
	console.log(metalLocFlag);
	var dscCreateData = [];
	
	if(loginPerson.name == "MRV"){
		var mrvFgDataV = $("#jqxgridFG").jqxGrid('getrows');
		var grAccDataV = $("#jqxgridGRAcc").jqxGrid('getrows');
		var mrvLsDataV = $("#jqxgridStone").jqxGrid('getrows');
		var mrvAccDataV = $("#jqxgridAcc").jqxGrid('getrows');
		var parcelDataV = $("#jqxgridParcel").jqxGrid('getrows');
		
		if(parcelDataV != undefined && parcelDataV.length > 0){
			for (var i = 0; i < parcelDataV.length; i++) {
				if( parcelDataV[i].inputFGOrStoneOrAccPcs == null ||  parcelDataV[i].inputFGOrStoneOrAccPcs == "" ){
					$.growl.error({
						message : "Please Enter No of Parcels for Parcel Sl No " + parcelDataV[i].id +" !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				if( parcelDataV[i].inputFGOrStoneOrAccPcs < 0 ){
					$.growl.error({
						message : "Please Enter Valid No of Parcels for Parcel Sl No " + parcelDataV[i].id +" !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		
		if(mrvFgDataV != undefined && mrvFgDataV.length > 0){
			for (var i = 0; i < mrvFgDataV.length; i++) {
				if( mrvFgDataV[i].inputFGOrStoneOrAccWt == null ||  mrvFgDataV[i].inputFGOrStoneOrAccWt == "" ){
					$.growl.error({
						message : "Please Enter Gross Wt for GRV(FG) Sl No " + mrvFgDataV[i].id  + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				if( mrvFgDataV[i].inputFGOrStoneOrAccWt < 0 ){
					$.growl.error({
						message : "Please Enter Valid Gross Wt for GRV(FG) Sl No " + mrvFgDataV[i].id  + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		
		if(mrvLsDataV != undefined && mrvLsDataV.length > 0){
			for (var i = 0; i < mrvLsDataV.length; i++) {
				if( mrvLsDataV[i].inputFGOrStoneOrAccPcs == null ||  mrvLsDataV[i].inputFGOrStoneOrAccPcs == "" || 
						mrvLsDataV[i].inputFGOrStoneOrAccWt == null || mrvLsDataV[i].inputFGOrStoneOrAccWt == "" ){
					$.growl.error({
						message : "Please Enter PCS & Wt for GRV(Stone) Sl No" + mrvLsDataV[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
				if( mrvLsDataV[i].inputFGOrStoneOrAccPcs < 0 || mrvLsDataV[i].inputFGOrStoneOrAccWt < 0 ){
					$.growl.error({
						message : "Please Enter Valid PCS & Wt for GRV(Stone) Sl No " + mrvLsDataV[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		
		if(mrvAccDataV != undefined && mrvAccDataV.length > 0){
			for (var i = 0; i < mrvAccDataV.length; i++) {
				if( mrvAccDataV[i].inputFGOrStoneOrAccPcs == null ||  mrvAccDataV[i].inputFGOrStoneOrAccPcs == ""){
					$.growl.error({
						message : "Please Enter PCS & Wt for GRV(Accessory) Sl No " + mrvAccDataV[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
				if( mrvAccDataV[i].inputFGOrStoneOrAccPcs < 0 || mrvAccDataV[i].inputFGOrStoneOrAccWt < 0 ){
					$.growl.error({
						message : "Please Enter Valid PCS for GRV(Accessory) Sl No " + mrvAccDataV[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}	
		}
	
	if(grAccDataV != undefined && grAccDataV.length > 0){
		for (var i = 0; i < grAccDataV.length; i++) {
			if( grAccDataV[i].inputFGOrStoneOrAccPcs == null ||  grAccDataV[i].inputFGOrStoneOrAccPcs == "" || 
					grAccDataV[i].inputFGOrStoneOrAccWt == null || grAccDataV[i].inputFGOrStoneOrAccWt == "" ){
				$.growl.error({
					message : "Please Enter PCS & Wt for GR Accessory Sl No" + grAccDataV[i].id + " !!!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
			
			if( grAccDataV[i].inputFGOrStoneOrAccPcs < 0 || grAccDataV[i].inputFGOrStoneOrAccWt < 0 ){
				$.growl.error({
					message : "Please Enter Valid PCS & Wt for GR Accessory Sl No" + grAccDataV[i].id + " !!!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
	}
		dscCreateData = getDSCCreateData();
	}
	
	if(loginPerson.name == "SGRA" || loginPerson.name == "SG" || loginPerson.name == "DSG" || loginPerson.name == "ASG"){
		var parcelDataV = $("#jqxgridParcel").jqxGrid('getrows');
		var grStoneReceipt = $("#jqxgridGRST").jqxGrid('getrows');
		var sgLooseStone = $("#jqxgridSGLS").jqxGrid('getrows');
		var TRALSV = $("#jqxgridTRALS").jqxGrid('getrows');

		if(parcelDataV != undefined && parcelDataV.length > 0){
			for (var i = 0; i < parcelDataV.length; i++) {
				if( parcelDataV[i].inputFGOrStoneOrAccPcs == null ||  parcelDataV[i].inputFGOrStoneOrAccPcs == "" ){
					$.growl.error({
						message : "Please Enter No of Parcels for Parcel Sl No " + parcelDataV[i].id +" !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				if( parcelDataV[i].inputFGOrStoneOrAccPcs < 0 ){
					$.growl.error({
						message : "Please Enter Valid No of Parcels for Parcel Sl No " + parcelDataV[i].id +" !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		
		if(grStoneReceipt != undefined && grStoneReceipt.length > 0){
			for (var i = 0; i < grStoneReceipt.length; i++) {
				if( grStoneReceipt[i].inputFGOrStoneOrAccPcs == null ||  grStoneReceipt[i].inputFGOrStoneOrAccPcs == "" || 
						grStoneReceipt[i].inputFGOrStoneOrAccWt == null || grStoneReceipt[i].inputFGOrStoneOrAccWt == ""){
					$.growl.error({
						message : "Please Enter PCS & Wt for GR Stone (Stone Receipt) Sl No" + grStoneReceipt[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
				if( grStoneReceipt[i].inputFGOrStoneOrAccPcs < 0 || grStoneReceipt[i].inputFGOrStoneOrAccWt  < 0 ){
					$.growl.error({
						message : "Please Enter Valid  PCS & Wt for GR Stone (Stone Receipt) Sl No " + grStoneReceipt[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		
		if(sgLooseStone != undefined && sgLooseStone.length > 0){
			for (var i = 0; i < sgLooseStone.length; i++) {
				if( sgLooseStone[i].inputFGOrStoneOrAccPcs == null ||  sgLooseStone[i].inputFGOrStoneOrAccPcs == ""){
					$.growl.error({
						message : "Please Enter PCS for Loose Stone (STK) Sl No " + sgLooseStone[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
				if( sgLooseStone[i].inputFGOrStoneOrAccPcs < 0 ){
					$.growl.error({
						message : "Please Enter Valid  PCS for Loose Stone (STK) Sl No " + sgLooseStone[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		
		if(TRALSV != undefined && TRALSV.length > 0){
			for (var i = 0; i < TRALSV.length; i++) {
				if( TRALSV[i].inputFGOrStoneOrAccPcs == null ||  TRALSV[i].inputFGOrStoneOrAccPcs == "" || 
						TRALSV[i].inputFGOrStoneOrAccWt == null || TRALSV[i].inputFGOrStoneOrAccWt == ""){
					$.growl.error({
						message : "Please Enter PCS & Wt for TRA for Loose Stone (Packet)  Sl No " + TRALSV[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
				if( TRALSV[i].inputFGOrStoneOrAccPcs < 0 || TRALSV[i].inputFGOrStoneOrAccWt  < 0 ){
					$.growl.error({
						message : "Please Enter Valid  PCS & Wt for TRA for Loose Stone (Packet) Sl No " + TRALSV[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		dscCreateData = getDSCSGCreateData();
	}
	
	if(loginPerson.name == "RGLD" || loginPerson.name == "REL"){
		var relFg = $("#jqxgridRelFG").jqxGrid('getrows');
		var relLs = $("#jqxgridRelLS").jqxGrid('getrows');
		var relAcc = $("#jqxgridRelACC").jqxGrid('getrows');
		
		if(relFg != undefined && relFg.length > 0){
			for (var i = 0; i < relFg.length; i++) {
				if( relFg[i].inputFGOrStoneOrAccWt == null || relFg[i].inputFGOrStoneOrAccWt == ""){
					$.growl.error({
						message : "Please Enter Wt for Finished Goods Sl No " + relFg[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
				if(relFg[i].inputFGOrStoneOrAccWt  < 0 ){
					$.growl.error({
						message : "Please Enter Valid Wt for Finished Goods Sl No " + relFg[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		
		if(relLs != undefined &&  relLs.length > 0){
			for (var i = 0; i < relLs.length; i++) {
				if( relLs[i].inputFGOrStoneOrAccWt == null || relLs[i].inputFGOrStoneOrAccWt == ""){
					$.growl.error({
						message : "Please Enter Wt for Loose Stone Sl No " + relLs[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
				if(relLs[i].inputFGOrStoneOrAccWt  < 0 ){
					$.growl.error({
						message : "Please Enter Valid Wt for Loose Stone Sl No " + relLs[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		
		if(relAcc != undefined && relAcc.length > 0){
			for (var i = 0; i < relAcc.length; i++) {
				if( relAcc[i].inputFGOrStoneOrAccPcs == null || relAcc[i].inputFGOrStoneOrAccPcs == ""){
					$.growl.error({
						message : "Please Enter Wt for Loose Accessory Sl No " + relAcc[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
				if(relAcc[i].inputFGOrStoneOrAccPcs  < 0 ){
					$.growl.error({
						message : "Please Enter Valid Pcs for Loose Accessory Sl No " + relAcc[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}

		dscCreateData = getDSCRelCreateData();
	}
	
	if(otherfgStockDataV != undefined && otherfgStockDataV.length > 0){
		for(var i=0; i<otherfgStockDataV.length; i++){
			if( otherfgStockDataV[i].inputFGOrStoneOrAccPcs == null ||  otherfgStockDataV[i].inputFGOrStoneOrAccPcs == ""){
				$.growl.error({
					message : "Please Enter PCS for FG Stock Sl No " + otherfgStockDataV[i].id + " !!!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
			
			if( otherfgStockDataV[i].inputFGOrStoneOrAccPcs < 0 ){
				$.growl.error({
					message : "Please Enter Valid PCS for FG Stock Sl No " + otherfgStockDataV[i].id + " !!!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
	}
	
	if(otherStockAccDataV != undefined && otherStockAccDataV.length > 0){
		for(var i=0; i<otherStockAccDataV.length; i++){
			if( otherStockAccDataV[i].inputFGOrStoneOrAccPcs == null ||  otherStockAccDataV[i].inputFGOrStoneOrAccPcs == ""){
				$.growl.error({
					message : "Please Enter PCS for Stock Accessory Sl No " + otherStockAccDataV[i].id + " !!!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
			
			if( otherStockAccDataV[i].inputFGOrStoneOrAccPcs < 0 ){
				$.growl.error({
					message : "Please Enter Valid PCS for Stock Accessory Sl No " + otherStockAccDataV[i].id + " !!!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
	}
	if(loginPerson.name == "DESH"){
		dscCreateData = getDSCDesCreateData();
	}
	if(metalLocFlag == true){
		if($("#segmentObj").val() == null || $("#segmentObj").val() == ""){
			$.growl.error({
				message : "Please Select Mandatory Fields !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		var metalStkAcc = $("#jqxgridOtherMetAcc").jqxGrid('getrows');
		
		if(metalStkAcc != undefined && metalStkAcc.length > 0){
			for(var i=0; i<metalStkAcc.length; i++){
				if( metalStkAcc[i].inputFGOrStoneOrAccWt == null ||  metalStkAcc[i].inputFGOrStoneOrAccWt == ""){
					$.growl.error({
						message : "Please Enter Gross Wt for Metal Location Stock Check Sl No " + metalStkAcc[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
				if( metalStkAcc[i].inputFGOrStoneOrAccWt < 0 ){
					$.growl.error({
						message : "Please Enter Gross Wt for Metal Location Stock Check Sl No" + metalStkAcc[i].id + " !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			}
		}

	}
	var metLoc =  $("#jqxgridOtherMetAcc").jqxGrid('getrows');

	console.log(metLoc);
	
	console.log(dscCreateData);
		
	postJSON('/OrderExecution/api/v1/createStockCheckDC',JSON.stringify(dscCreateData),function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title :'Success'
			});
			window.location.href="javascript:showContentPage('dailyStockCheckDc', 'bodySwitcher')"
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title :'Error'
			});
			return false;
		}
	});
	
});

$("#back").on('click', function(){
	window.location.href = "javascript:showContentPage('dailyStockCheckDc', 'bodySwitcher')";
});

$("#close").on('click',function(){
	window.location.href = "javascript:showContentPage('dailyStockCheckDc', 'bodySwitcher')";
});

// View Grids Started
var viewParcelDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'vendorCode', type : 'string'}, 
			{name : 'vendorName', type : 'string'},
			{name: 'materialType', type: 'string'},
			{name : 'articleSegment', type : 'string','map':'parcelContentType'},
			{name : 'pcs', type : 'int','map':'inputFGOrStoneOrAccPcs'},
		
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridParcelV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			if(loggedinPerson.name == "MRV"){
				container.append('<div class="text-left"><b><i class="fa fa-list"></i>&nbsp;Function : Parcel</b></div>');	
			}else{
				container.append('<div class="text-left"><b><i class="fa fa-list"></i>&nbsp; Function : Parcel</b></div>');	
			}
			
		},
		columns : [ 
			{ text : 'Vendor Code', datafield : 'vendorCode', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Name', datafield : 'vendorName', width : '25%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'materialType', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Segment', datafield : 'articleSegment', width : '25%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'No of Parcels', datafield : 'pcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		]
	});
}

var viewMrvFGGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'vendorCode', type : 'string'}, 
			{name : 'vendorName', type : 'string'},
			{name : 'mrvNo', type : 'int','map':'refDocNo'},
			{name : 'mrvSlNo', type : 'int','map':'refDocSrlNo'},
			{name: 'materialType', type: 'string'},
			{name : 'articleSegment', type : 'string','map':'metalOrArticleOrStnOrAccSegmentName'},
			{name : 'grWt', type : 'float','map':'grossWt'},
			{name : 'mrvNetWt', type : 'float','map':'mrvNetWt'},
			{name : 'grossWt', type : 'float','map':'inputFGOrStoneOrAccWt'},
		
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridMrvFGV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b><i class="fa fa-list"></i>&nbsp;Function : GRV (FG) </b></div>');	
		},
		columns : [ 
			{ text : 'Vendor Code', datafield : 'vendorCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Name', datafield : 'vendorName', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV No', datafield : 'mrvNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV Sl No.', datafield : 'mrvSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'materialType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{ text : 'Article Segment', datafield : 'articleSegment', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV Gross Wt.', datafield : 'grWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d3'},
			{ text : 'GRV Net Wt.', datafield : 'mrvNetWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d3'},
			{ text : 'Gross Wt.', datafield : 'grossWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d3'},
		]
	});
}

var viewMrvLSGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'vendorCode', type : 'string'}, 
			{name : 'vendorName', type : 'string'},
			{name : 'mrvNo', type : 'int','map':'refDocNo'},
			{name : 'mrvSlNo', type : 'int','map':'refDocSrlNo'},
			{name : 'refStoneSlNo', type : 'int','map':'refDocStnOrAccSrlNo'},
			{name: 'stoneCode', type: 'string','map':'stoneOrAccCode'},
			{name : 'subCatDesc', type : 'string','map':'stoneOrAccSubCatDesc'},
			{name: 'materialType', type: 'string'},
			{name : 'stoneWt', type : 'float','map':'inputFGOrStoneOrAccWt'},
			{name : 'stonePcs', type : 'int','map':'inputFGOrStoneOrAccPcs'},
		
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridMrvLSV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b> <i class="fa fa-list"></i>&nbsp;Function : GRV (Loose Stones) </b></div>');	
		},
		columns : [ 
			{ text : 'Vendor Code', datafield : 'vendorCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Name', datafield : 'vendorName', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV No', datafield : 'mrvNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV Sl No.', datafield : 'mrvSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Stone Sl No', datafield : 'refStoneSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{ text : 'Stone Code', datafield : 'stoneCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'materialType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Wt.', datafield : 'stoneWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d3'},
			{ text : 'Stone Pcs', datafield : 'stonePcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		]
	});
}

var viewMrvAccGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'vendorCode', type : 'string'}, 
			{name : 'vendorName', type : 'string'},
			{name : 'mrvNo', type : 'int','map':'refDocNo'},
			{name : 'mrvSlNo', type : 'int','map':'refDocSrlNo'},
			{name : 'refAccSlNo', type : 'int','map':'refDocStnOrAccSrlNo'},
			{name: 'accCode', type: 'string','map':'stoneOrAccCode'},
			{name : 'accDesc', type : 'string','map':'stoneOrAccSubCatDesc'},
			{name: 'materialType', type: 'string'},
			{name : 'accWt', type : 'float','map':'inputFGOrStoneOrAccWt'},
			{name : 'accPcs', type : 'int','map':'inputFGOrStoneOrAccPcs'},
		
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridMRVAccV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b> <i class="fa fa-list"></i>&nbsp;Function : GRV (Accessory) </b></div>');	
		},
		columns : [ 
			{ text : 'Vendor Code', datafield : 'vendorCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Name', datafield : 'vendorName', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV No', datafield : 'mrvNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV Sl No.', datafield : 'mrvSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Acc Sl No', datafield : 'refAccSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{ text : 'Acc Code', datafield : 'accCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Desc', datafield : 'accDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'materialType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Wt.', datafield : 'accWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d3'},
			{ text : 'Acc Pcs', datafield : 'accPcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		]
	});
}

var viewGRAccGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'vendorCode', type : 'string'}, 
			{name : 'vendorName', type : 'string'},
			{name : 'accGrNo', type : 'int','map':'refDocNo'},
			{name : 'accGrSlNo', type : 'int','map':'refDocSrlNo'},
			{name: 'accCode', type: 'string','map':'stoneOrAccCode'},
			{name : 'accDesc', type : 'string','map':'stoneOrAccSubCatDesc'},
			{name: 'materialType', type: 'string'},
			{name : 'accWt', type : 'float','map':'inputFGOrStoneOrAccWt'},
			{name : 'accPcs', type : 'int','map':'inputFGOrStoneOrAccPcs'},
		
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridGRAccV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b> <i class="fa fa-list"></i>&nbsp;Function : GR Accessory</b></div>');	
		},
		columns : [ 
			{ text : 'Vendor Code', datafield : 'vendorCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Name', datafield : 'vendorName', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc GR No', datafield : 'accGrNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc GR Sl No.', datafield : 'accGrSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{ text : 'Acc Code', datafield : 'accCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Desc', datafield : 'accDesc', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'materialType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Wt.', datafield : 'accWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d3'},
			{ text : 'Acc Pcs', datafield : 'accPcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		]
	});
}

// SG View Grids
var viewGrStoneReceiptGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'vendorCode', type : 'string'}, 
			{name : 'vendorName', type : 'string'},
			{name : 'stoneRecNo', type : 'int','map':'refDocNo'},
			{name : 'stoneRecSlNo', type : 'int','map':'refDocSrlNo'},
			{name: 'stoneCode', type: 'string','map':'stoneOrAccCode'},
			{name : 'subCat', type : 'string','map':'stoneOrAccSubCatDesc'},
			{name : 'matType', type : 'string','map':'materialType'},
			{name : 'stoneWt', type : 'float','map':'inputFGOrStoneOrAccWt'},
			{name : 'stonePcs', type : 'int','map':'inputFGOrStoneOrAccPcs'},
		
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridGRSTV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b><i class="fa fa-list"></i>&nbsp;Function : GR Stone (Stone Receipt) </b></div>');	
		},
		columns : [ 
			{ text : 'Vendor Code', datafield : 'vendorCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Name', datafield : 'vendorName', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Receipt No', datafield : 'stoneRecNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Receipt Sl No.', datafield : 'stoneRecSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Code', datafield : 'stoneCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{ text : 'Sub Category', datafield : 'subCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'matType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Wt.', datafield : 'stoneWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Stone Pcs', datafield : 'stonePcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		]
	});
}

var viewLooseStoneGrid = function(data) {
	var source = {
			datafields : [ 
				{name : 'slNo', type : 'int','map':'id'}, 
				{name : 'stoneCat', type : 'string','map':'stoneOrAccCatDesc'},
				{name : 'pcs', type : 'int','map':'inputFGOrStoneOrAccPcs'},
				],
				localdata : data,
				deleterow : function(rowid, commit) {
					commit(true);
			},

		};
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#jqxgridLSV").jqxGrid({
			source : dataAdapter,
			width : '100%',
			editable : true,
			columnsheight : 30,
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
				container.append('<div class="text-left"><b><i class="fa fa-list"></i>&nbsp;Function : Loose Stone (STK) </b></div>');	
			},
			columns : [ 
				{ text : 'Sl No', datafield : 'slNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Stone Category', datafield : 'stoneCat', width : '80%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Pcs', datafield : 'pcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			]
		});
	}

var viewTRALsGrid = function(data) {
	var source = {
			datafields : [ 
				{name : 'pktId', type : 'int','map':'packetOrStkId'}, 
				{name : 'stoneSeg', type : 'string','map':'metalOrArticleOrStnOrAccSegmentName'},
				{name : 'grossWt', type : 'float','map':'inputFGOrStoneOrAccWt'},
				{name : 'stoneSubCat', type : 'string','map':'stoneOrAccSubCatDesc'},
				{name : 'stoneCode', type : 'string','map':'stoneOrAccCode'},
				{name : 'type', type : 'string','map':'refDocType'},
				{name : 'pcs', type : 'int','map':'inputFGOrStoneOrAccPcs'},
				],
				localdata : data,
				deleterow : function(rowid, commit) {
					commit(true);
			},

		};
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#jqxgridTRALSV").jqxGrid({
			source : dataAdapter,
			width : '100%',
			editable : true,
			columnsheight : 30,
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
				container.append('<div class="text-left"><b><i class="fa fa-list"></i>&nbsp;Function : TRA for Loose Stone (Packet) </b></div>');	
			},
			columns : [ 
				{ text : 'Packet Id', datafield : 'pktId', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Stone Segment', datafield : 'stoneSeg', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Sub Cat Desc', datafield : 'stoneSubCat', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Stone Code', datafield : 'stoneCode', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Type', datafield : 'type', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Pcs', datafield : 'pcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Input Gross Wt', datafield : 'grossWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			]
		});
	}

var viewRelFGGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'orderKind', type : 'string','map':'orderKind'}, 
			{name : 'psrNo', type : 'long','map':'psrNo'},
			{name : 'orderId', type : 'int','map':'refDocNo'},
			{name : 'orderSlNo', type : 'int','map':'refDocSrlNo'},
			{name: 'jType', type: 'string','map':'jewelTypeDescription'},
			{name : 'vCode', type : 'string','map':'vendorCode'},
			{name: 'vName', type: 'string','map':'vendorName'},
			{name : 'mSeg', type : 'string','map':'metalOrArticleOrStnOrAccSegmentName'},
			{name : 'grossWt', type : 'float','map':'inputFGOrStoneOrAccWt'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridRelFgV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b> <i class="fa fa-list"></i>&nbsp;Function : Finished Goods </b></div>');	
		},
		columns : [ 
			{ text : 'Order Kind', datafield : 'orderKind', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'PSR Number', datafield : 'psrNo', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Order Id', datafield : 'orderId', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Order Sl No.', datafield : 'orderSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{ text : 'Jewel Type', datafield : 'jType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Code', datafield : 'vCode', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Name', datafield : 'vName', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Segment', datafield : 'mSeg', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt', datafield : 'grossWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
		]
	});
}

var viewRelACCGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'psrNo', type : 'long','map':'psrNo'},
			{name : 'orderId', type : 'int','map':'refDocNo'},
			{name : 'orderSlNo', type : 'int','map':'refDocSrlNo'},
			{name : 'accSlNo', type : 'int','map':'refDocStnOrAccSrlNo'},
			{name: 'suppBy', type: 'string','map':'suppliedBy'},
			{name : 'vCode', type : 'string','map':'vendorCode'},
			{name: 'vName', type: 'string','map':'vendorName'},
			{name : 'subCat', type : 'string','map':'stoneOrAccSubCatDesc'},
			{name : 'inputFGOrStoneOrAccPcs', type : 'int'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridRelAccV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b> <i class="fa fa-list"></i>&nbsp;Function : Loose Accessory </b></div>');	
		},
		columns : [ 
			{ text : 'Order Id', datafield : 'orderId', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Order Sl No.', datafield : 'orderSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Sl No.', datafield : 'accSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'PSR Number', datafield : 'psrNo', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{ text : 'Sub Cat Desc', datafield : 'subCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Code', datafield : 'vCode', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Name', datafield : 'vName', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supplied By', datafield : 'suppBy', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'inputFGOrStoneOrAccPcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		]
	});
}

var viewRelLSGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'psrNo', type : 'long','map':'psrNo'},
			{name : 'orderId', type : 'int','map':'refDocNo'},
			{name : 'orderSlNo', type : 'int','map':'refDocSrlNo'},
			{name : 'stoneSlNo', type : 'int','map':'refDocStnOrAccSrlNo'},
			{name: 'suppBy', type: 'string','map':'suppliedBy'},
			{name : 'vCode', type : 'string','map':'vendorCode'},
			{name: 'vName', type: 'string','map':'vendorName'},
			{name : 'subCat', type : 'string','map':'stoneOrAccSubCatDesc'},
			{name : 'grossWt', type : 'float','map':'inputFGOrStoneOrAccWt'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridRelLsV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b> <i class="fa fa-list"></i>&nbsp;Function : Loose Stone </b></div>');	
		},
		columns : [ 
			{ text : 'Order Id', datafield : 'orderId', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Order Sl No.', datafield : 'orderSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Sl No.', datafield : 'stoneSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'PSR Number', datafield : 'psrNo', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{ text : 'Sub Cat Desc', datafield : 'subCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Code', datafield : 'vCode', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Name', datafield : 'vName', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supplied By', datafield : 'suppBy', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt', datafield : 'grossWt', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
		]
	});
}


var viewOtherFGGrid = function(data) {
	var source = {
		datafields : [ 
			{name: 'jewelType', type: 'string','map':'jewelTypeDescription'},
			{name : 'slNo', type : 'int','map':'id'},
			{name : 'pcs', type : 'int','map':'inputFGOrStoneOrAccPcs'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridOthFgV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b><i class="fa fa-list"></i>&nbsp;Function : FG Stock </b></div>');	
		},
		columns : [ 
			//{ text : 'Sl No', datafield : 'slNo', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Jewel Type', datafield : 'jewelType', width : '80%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pcs', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		]
	});
}

var viewOtherAccGrid = function(data) {
	var source = {
		datafields : [ 
			{name: 'cat', type: 'string','map':'stoneOrAccCatDesc'},
			{name: 'subcat', type: 'string','map':'stoneOrAccSubCatDesc'},
			{name : 'slNo', type : 'int','map':'id'},
			{name : 'pcs', type : 'int','map':'inputFGOrStoneOrAccPcs'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridOthAccV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b><i class="fa fa-list"></i>&nbsp;Function : Stock Accessory </b></div>');	
		},
		columns : [ 
		//	{ text : 'Sl No', datafield : 'slNo', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Category', datafield : 'cat', width : '40%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Category', datafield : 'subcat', width : '40%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pcs', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		]
	});
}

var viewOthMetalAccGrid = function(data) {
	var source = {
		datafields : [ 
			{name: 'mSeg', type: 'string','map':'metalOrArticleOrStnOrAccSegmentName'},
			{name: 'location', type: 'string','map':'locationCode'},
			{name : 'slNo', type : 'int','map':'id'},
			{name : 'grossWt', type : 'float','map':'inputFGOrStoneOrAccWt'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridMetalAccV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 30,
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
			container.append('<div class="text-left"><b><i class="fa fa-list"></i>&nbsp;Function : Metal Location Check Stock </b></div>');	
		},
		columns : [ 
			//{ text : 'Sl No', datafield : 'slNo', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Segment', datafield : 'mSeg', width : '40%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Location Code', datafield : 'location', width : '40%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt', datafield : 'grossWt', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
		]
	});
}

var finalCheckFlag = false;
$('#myModalConfirm').modal('hide');
$("#finalChk").on('click',function(){
	var finalCheckArr = [];
	var parcel = $("#jqxgridParcelV").jqxGrid('getrows') ;
	var mrvFg = $("#jqxgridMrvFGV").jqxGrid('getrows');
	var mrvLs = $("#jqxgridMrvLSV").jqxGrid('getrows');
	var mrvAcc = $("#jqxgridMRVAccV").jqxGrid('getrows');
	var grAcc = $("#jqxgridGRAccV").jqxGrid('getrows');
	var othrFg = $("#jqxgridOthFgV").jqxGrid('getrows');
	var othrAcc = $("#jqxgridOthAccV").jqxGrid('getrows');
	var othrMetAcc = $("#jqxgridMetalAccV").jqxGrid('getrows');
	
	var stoneReceipt = $("#jqxgridGRSTV").jqxGrid('getrows');
	var looseStone = $("#jqxgridLSV").jqxGrid('getrows');
	var traLooseStone = $("#jqxgridTRALSV").jqxGrid('getrows');
	
	var releaseFg = $("#jqxgridRelFgV").jqxGrid('getrows');
	var releaseLs = $("#jqxgridRelLsV").jqxGrid('getrows');
	var releaseAcc = $("#jqxgridRelAccV").jqxGrid('getrows');
	
	    // MRV
		if(parcel != undefined &&  parcel.length > 0 ){
			$.each(parcel,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		if(mrvFg != undefined &&  mrvFg.length > 0){
			$.each(mrvFg,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		if(mrvLs != undefined &&  mrvLs.length > 0){
			$.each(mrvLs,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		if(mrvAcc != undefined &&  mrvAcc.length > 0 ){
			$.each(mrvAcc,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		if(grAcc != undefined &&  grAcc.length > 0){
			$.each(grAcc,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		// Stone Grader
		if(stoneReceipt != undefined && stoneReceipt.length > 0 ){
			$.each(stoneReceipt,function(k,v){
				finalCheckArr.push(v);
			});
		}
			
		if(looseStone != undefined &&  looseStone.length > 0 ){
			$.each(looseStone,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		if(traLooseStone != undefined &&  traLooseStone.length > 0 ){
			$.each(traLooseStone,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		//Release
		if(releaseFg != undefined &&  releaseFg.length > 0 ){
			$.each(releaseFg,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		if(releaseLs != undefined &&  releaseLs.length > 0 ){
			$.each(releaseLs,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		if(releaseAcc != undefined &&  releaseAcc.length > 0 ){
			$.each(releaseAcc,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		// Common Other Scenario
		
		if(othrFg != undefined &&  othrFg.length > 0 ){
			$.each(othrFg,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		if(othrAcc != undefined &&  othrAcc.length > 0 ){
			$.each(othrAcc,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
		if(othrMetAcc != undefined &&  othrMetAcc.length > 0 ){
			$.each(othrMetAcc,function(k,v){
				finalCheckArr.push(v);
			});
		}
		
	//}
		
		console.log(finalCheckArr);
		if(finalCheckArr.length > 0){
			$.each(finalCheckArr,function(k,v){
				if(v.isTallied == "false" && v.notTallyReason == undefined){
					finalCheckFlag = false;
					$('#myModalConfirm').modal('hide');
					$.growl.error({
						message : "Please Enter Valid Not Tally Reason for " + v.stockCheckFunc,
						duration  : 10000,
						title : "Error"
					});
					return false;
					$('#myModalConfirm').modal('hide');
				}else{
					finalCheckFlag = true;
				}
			});
			if(finalCheckFlag == true){
				$('#myModalConfirm').modal('show');
				$("#btnConfirmYes").on('click',function(){
					$('#myModalConfirm').modal('hide');
					finalCheckFunction(finalCheckArr);
				});
			}
	 }
});

function finalCheckFunction(request){
	postJSON('/OrderExecution/api/v1/finalCheckStockCheckDCByDCHead',JSON.stringify(request),function(data) {
		$('#myModalConfirm').modal('hide');
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title :'Success'
			});
			window.location.href="javascript:showContentPage('dailyStockCheckDc', 'bodySwitcher')";
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title :'Error'
			});
			return false;
		}
	});
}

$("#checkUpdate").on('click',function(){
	$("#stockCheckUpdate").show();
	$("#panel5").slideToggle();
	checkUpdate();
});

function checkUpdate(){
	$("#panelId1").hide();
	$("#panelId2").hide();
	$("#panelId3").hide();
	$("#panelId4").hide();
	$.getJSON('/OrderExecution/api/v1/latestUpdatesOnStockCheck', function(data) {
		if(data.resCode == "1"){
			$("#jqxgridDcm").show();
			$("#jqxgridDcs").show();
			$("#jqxgridDcOthFgAcc").show();
			$("#jqxgridDcOthMetAcc").show();
			$("#jqxgridOthMetLocCode").show();
			
			$("#panel5").slideToggle();
			$("#Dcm").show();
			$("#Dcs").show();
			$("#DcfgAcc").show();
			$("#DcMetAcc").show();
			$("#DcMetLoc").show();

			var mrvData = data.payload.MRV_ROLE;
			console.log(mrvData);
			mrvData.sort(function(a, b){
			//	return a.EmployeeDTO.name-b.EmployeeDTO.name;
				return a.EmployeeDTO.name.toLowerCase().localeCompare(b.EmployeeDTO.name.toLowerCase());
			});
			console.log(mrvData);
			dcHeadMrvGrid(mrvData);
			
			var sgData = data.payload.STONE_GRADER_ROLE;
			sgData.sort(function(a, b){
				return a.EmployeeDTO.name.toLowerCase().localeCompare(b.EmployeeDTO.name.toLowerCase());
			});
			dcHeadSgGrid(sgData);
			
			var othFgAcc = [];
			var othFg = data.payload.FG_STOCK;
			var othAcc = data.payload.ACC_STOCK;
			othFg.sort(function(a, b){
				return a.EmployeeDTO.name.toLowerCase().localeCompare(b.EmployeeDTO.name.toLowerCase());
			});
			$.each(othFg,function(k,v){
				othFgAcc.push(v);
			});
			
			othAcc.sort(function(a, b){
				return a.EmployeeDTO.name.toLowerCase().localeCompare(b.EmployeeDTO.name.toLowerCase());
			});
			$.each(othAcc,function(k,v){
				othFgAcc.push(v);
			});
			dcHeadothFgAccGrid(othFgAcc);
			
			var othMetAcc = data.payload.METAL_ACCOUNTING_CHECK;
			othMetAcc.sort(function(a, b){
				return a.EmployeeDTO.name.toLowerCase().localeCompare(b.EmployeeDTO.name.toLowerCase());
			});
			dcHeadOthMetGrid(othMetAcc);
			
			var othMetLocCode = data.payload.METAL_LOCATION_CHECK;
			othMetLocCode.sort(function(a, b){
				return a.EmployeeDTO.name.toLowerCase().localeCompare(b.EmployeeDTO.name.toLowerCase());
			});
			dcHeadOthMetLocGrid(othMetLocCode);
		}
	});
}

var dcHeadMrvGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'createdDate',	type: 'string','map':'createdDate'},
			    { name: 'empName',	type: 'string','map':'EmployeeDTO>name'},
			    { name: 'stockCheckDone', type: 'string','map':'isStkChkComplete'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridDcm").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '200px',
		theme: 'energyblue',
        columnsheight: 35,
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
			 	{ text: 'Date', datafield: 'createdDate', width: "35%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : false,
			 		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			 			var stDone =  $('#jqxgridDcm').jqxGrid('getcellvalue', row, 'stockCheckDone');
	        			if(stDone == "false"){
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
	        			}else{
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
	        			}
			 		}
			 	},
	            { text: 'Employee Name', datafield: 'empName', width: "40%", cellsalign : 'center', align:'center', sortable : false,
			 		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			 			var stDone =  $('#jqxgridDcm').jqxGrid('getcellvalue', row, 'stockCheckDone');
	        			if(stDone == "false"){
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
	        			}else{
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
	        			}
			 		}
	            },
	            { text: 'Stock Check Done', datafield: 'stockCheckDone', width: "25%", cellsalign : 'center',sortable : false, align:'center',
	            	cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	        			console.log(typeof value);
	        			var val ;
	        			if(value == "false"){
	        				val = "No";
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + val + '</div>';
	        			}else{
	        				val = "Yes";
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + val + '</div>';
	        			}
	        		 }
	            }
		]
	});
}

var dcHeadSgGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'createdDate',	type: 'string','map':'createdDate'},
			    { name: 'empName',	type: 'string','map':'EmployeeDTO>name'},
			    { name: 'stockCheckDone', type: 'string','map':'isStkChkComplete'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridDcs").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '200px',
		theme: 'energyblue',
        columnsheight: 35,
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
			 	{ text: 'Date', datafield: 'createdDate', width: "35%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : false,
			 		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			 			var stDone =  $('#jqxgridDcs').jqxGrid('getcellvalue', row, 'stockCheckDone');
	        			if(stDone == "false"){
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
	        			}else{
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
	        			}
			 		}
			 	},
	            { text: 'Employee Name', datafield: 'empName', width: "40%", cellsalign : 'center', align:'center', sortable : false,
			 		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			 			var stDone =  $('#jqxgridDcs').jqxGrid('getcellvalue', row, 'stockCheckDone');
	        			if(stDone == "false"){
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
	        			}else{
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
	        			}
			 		}
	            },
	            { text: 'Stock Check Done', datafield: 'stockCheckDone', width: "25%", cellsalign : 'center',sortable : false, align:'center',
	            	cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	        			console.log(typeof value);
	        			var val ;
	        			if(value == "false"){
	        				val = "No";
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + val + '</div>';
	        			}else{
	        				val = "Yes";
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + val + '</div>';
	        			}
	        		 }
	            }
		]
	});
}

var dcHeadothFgAccGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'createdDate',	type: 'string','map':'createdDate'},
			    { name: 'empName',	type: 'string','map':'EmployeeDTO>name'},
			    { name: 'stockCheckDone', type: 'string','map':'isStkChkComplete'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridDcOthFgAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '200px',
		theme: 'energyblue',
        columnsheight: 35,
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
			 	{ text: 'Date', datafield: 'createdDate', width: "35%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : false,
			 		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			 			var stDone =  $('#jqxgridDcOthFgAcc').jqxGrid('getcellvalue', row, 'stockCheckDone');
	        			if(stDone == "false"){
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
	        			}else{
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
	        			}
			 		}
			 	},
	            { text: 'Employee Name', datafield: 'empName', width: "40%", cellsalign : 'center', align:'center', sortable : false,
			 		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			 			var stDone =  $('#jqxgridDcOthFgAcc').jqxGrid('getcellvalue', row, 'stockCheckDone');
	        			if(stDone == "false"){
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
	        			}else{
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
	        			}
			 		}
	            },
	            { text: 'Stock Check Done', datafield: 'stockCheckDone', width: "25%", cellsalign : 'center',sortable : false, align:'center',
	            	cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	        			console.log(typeof value);
	        			var val ;
	        			if(value == "false"){
	        				val = "No";
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + val + '</div>';
	        			}else{
	        				val = "Yes";
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + val + '</div>';
	        			}
	        		 }
	            }
		]
	});
}

var dcHeadOthMetGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'createdDate',	type: 'string','map':'createdDate'},
			    { name: 'empName',	type: 'string','map':'EmployeeDTO>name'},
			    { name: 'stockCheckDone', type: 'string','map':'isStkChkComplete'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridDcOthMetAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '200px',
		theme: 'energyblue',
        columnsheight: 35,
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
			 	{ text: 'Date', datafield: 'createdDate', width: "35%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : false,
			 		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			 			var stDone =  $('#jqxgridDcOthMetAcc').jqxGrid('getcellvalue', row, 'stockCheckDone');
	        			if(stDone == "false"){
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
	        			}else{
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
	        			}
			 		}
			 	},
	            { text: 'Employee Name', datafield: 'empName', width: "40%", cellsalign : 'center', align:'center', sortable : false,
			 		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			 			var stDone =  $('#jqxgridDcOthMetAcc').jqxGrid('getcellvalue', row, 'stockCheckDone');
	        			if(stDone == "false"){
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
	        			}else{
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
	        			}
			 		}
	            },
	            { text: 'Stock Check Done', datafield: 'stockCheckDone', width: "25%", cellsalign : 'center',sortable : false, align:'center' ,
	            	cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	        			console.log(typeof value);
	        			var val ;
	        			if(value == "false"){
	        				val = "No";
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + val + '</div>';
	        			}else{
	        				val = "Yes";
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + val + '</div>';
	        			}
	        		 }
	            }
		]
	});
}

var dcHeadOthMetLocGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'createdDate',	type: 'string','map':'createdDate'},
			    { name: 'empName',	type: 'string','map':'locationCode'},
			    { name: 'stockCheckDone', type: 'string','map':'isStkChkComplete'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridOthMetLocCode").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '200px',
		theme: 'energyblue',
        columnsheight: 35,
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
			 	{ text: 'Date', datafield: 'createdDate', width: "35%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : false,
			 		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			 			var stDone =  $('#jqxgridOthMetLocCode').jqxGrid('getcellvalue', row, 'stockCheckDone');
	        			if(stDone == "false"){
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
	        			}else{
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
	        			}
			 		}
			 	},
	            { text: 'Location Code', datafield: 'empName', width: "40%", cellsalign : 'center', align:'center', sortable : false,
			 		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			 			var stDone =  $('#jqxgridOthMetLocCode').jqxGrid('getcellvalue', row, 'stockCheckDone');
	        			if(stDone == "false"){
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
	        			}else{
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
	        			}
			 		}
	            },
	            { text: 'Stock Check Done', datafield: 'stockCheckDone', width: "25%", cellsalign : 'center',sortable : false, align:'center' ,
	            	cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	        			console.log(typeof value);
	        			var val ;
	        			if(value == "false"){
	        				val = "No";
	        				return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + val + '</div>';
	        			}else{
	        				val = "Yes";
	        				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + val + '</div>';
	        			}
	        		 }
	            },
		]
	});
}

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('dailyStockCheckDc', 'bodySwitcher')"
});
