/** AUTHOR : DIPANKAR
 *  DATE : 03/08/2017
 *  DESC : Design Order search and Creation
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

//loadPermission();

$("#headerScOrder").hide();
$("#searchScOrderSection").show();
$("#saveDOSection").hide();
$("#designOrderCancelSection").hide();
$("#jqxgridD").hide();
var redirect = function() {
	window.location.href = "javascript:showContentPage('designOrder', 'bodySwitcher')";
	return window.location.href;
}
// Date From
$("#designOrderFromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#designOrderToDate").datepicker('option', 'minDate', min || '0');
    }
});

//Date To
$("#designOrderToDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

// To Reset the form
$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

// On-load and On-change LOV's
var designOrderOnLoadLov = function(){
	$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?page=search&criteria=sTypes&id=-1', function(data) {
		var segmentDetails = data.payload.sTypes;
		$("#segmentDO").empty().append('<option value="" selected>--Select--</option>');
		$.each(segmentDetails, function(key, val) {
			$("#segmentDO").append('<option code="' + val.code + '" value="' + val.id + '">' + val.description + '</option>');
		});
	});
}

designOrderOnLoadLov();

// On change segment loading JewelType
$("#segmentDO").on('change', function(){
	var segmentID = $(this).val();
	$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=jewelType&id=' + segmentID, function(data) {
		var jewelTypeDetails = data.payload.jewelType;
		$("#jewelTypeDO").empty().append('<option value="" selected>--Select--</option>');
		$.each(jewelTypeDetails, function(key, val) {
			$("#jewelTypeDO").append('<option code="' + val.code + '" value="' + val.id + '">' + val.description + '</option>');
		});
	});
});

$("#createDO").on('click', function(){	
	$("#searchScOrderSection").toggle();

	$("#designSearchGrid").jqxGrid('clear');
	$("#designSearchGrid").hide();
	designOrderGrid();
	$("#designOrderGrid").show();
	$("#searchDesignOrderGrid").hide();
	$("#headerScOrder").show();
	$("#searchScOrderSection").hide();
	$("#saveDOSection").show();
});

//Design By Change Designer Name will Load
$("#designBy").on('change',	function() {
	var designBy = $(this).val();
	var fieldFilters = {"fieldFilters" : {"designBy" : designBy}};
	$('#designerName').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/getDesigners', JSON.stringify(fieldFilters), function(data) {
		var designersList = data.payload.designers;
		$.each(designersList, function(k, v) {
			if (v.id == 0) {
				$('#designerName').append('<option selected value="' + v.id + '">'	+ v.name + '</option>');
			} else {
				$('#designerName').append('<option value="' + v.id + '">' + v.name	+ '</option>');
			}
		});
	});
});

$("#designByEdit").on('change',	function() {
	var designBy = $(this).val();
	var fieldFilters = {"fieldFilters" : {"designBy" : designBy}};
	$('#designerNameEdit').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/getDesigners', JSON.stringify(fieldFilters), function(data) {
		var designersList = data.payload.designers;
		$.each(designersList, function(k, v) {
			if (v.id == 0) {
				$('#designerNameEdit').append('<option selected value="' + v.id + '">'	+ v.name + '</option>');
			} else {
				$('#designerNameEdit').append('<option value="' + v.id + '">' + v.name	+ '</option>');
			}
		});
	});
});

// On click of search hiding create 
$("#searchDO").on('click', function(){	
	
	var designOrderFromDate = $("#designOrderFromDate").val();
	var designOrderToDate = $("#designOrderToDate").val();
	var segmentDO = $("#segmentDO").val();
	var jewelTypeDO = $("#jewelTypeDO").val();
	
	var fieldFilter = {
			"fieldFilters" : {}
	};
	
	if(designOrderFromDate != null && designOrderFromDate != ""){
		fieldFilter.fieldFilters['orderFromDate'] = designOrderFromDate;
	}
	if(designOrderToDate != null && designOrderToDate != ""){
		fieldFilter.fieldFilters['orderToDate'] = designOrderToDate;
	}
	if(segmentDO != null && segmentDO != ""){
		fieldFilter.fieldFilters['sType'] = segmentDO;
	}
	if(jewelTypeDO != null && jewelTypeDO != ""){
		fieldFilter.fieldFilters['jType'] = jewelTypeDO;
	}	
	
	postJSON('/OrderExecution/api/v1/ordersListDO', JSON.stringify(fieldFilter), function(data) {
		searchDesignOrderGrid(data.payload.list);
	});
	
	$("#searchScOrderSection").show();	
	$("#designOrderGrid").hide();
	$("#searchDesignOrderGrid").show();
	$("#designOrderGrid").jqxGrid('clear');
	$("#designOrderGrid").hide();
	$("#headerScOrder").hide();
	$("#saveDOSection").hide();
});

//Add Design Details
var addDesign = function() {
	$('input:radio[name="designToApprov"]').filter('[value="1"]').attr('checked', true);
	var date = new Date();
	var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	var rows = $("#designOrderGrid").jqxGrid('getrows');
	var selectedrowindexMaster = $("#designOrderGrid").jqxGrid('getselectedrowindex');

	var fullDate = new Date();
	var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
	var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

	$("#designStatusDate").val(currentDate);
	$("#designDueDate").datepicker({
		changeMonth : true,
		changeYear : true,
		minDate : today,
		dateFormat : "dd/mm/yy",
		maxDate : rows[selectedrowindexMaster].dueDate,
		onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); 
			$("#designStatusDate").datepicker('option', 'maxDate', min || '0'); 
		}
	});

	
	var segId = 1;
	var metalId = 1;
	$("#designIdShowHide").hide();
	$('input:radio[name=designTomade]').filter('[value="0"]').attr('checked',
			true);

	var fieldFilters = {
		"fieldFilters" : {
			"segId" : segId,
			"metalId" : metalId
		}
	};
	$('#designBy').empty().append('<option value="" selected>--Select--</option>');
	
	postJSON('/OrderExecution/api/v1/getDesignDetails', JSON.stringify(fieldFilters), function(data) {
		var accSubCatsList = data.payload.dDetails.dStatus;
		var designByList = data.payload.dDetails.designBy;
		
		$("#designStatus").val(accSubCatsList.name);
		$("#designStatusId").val(accSubCatsList.id);

		$.each(designByList, function(k, v) {
			if (v.name == "In-house") {
				$('#designBy').append('<option selected code="' + v.id + '" value="' + v.name + '">' + v.name + '</option>');
			} else {
				$('#designBy').append('<option code="' + v.id + '" value="' + v.name + '">' + v.name + '</option>');
			}

		});

	});

	var fieldFilters = {
		"fieldFilters" : {
			"designBy" : "In-house"
		}
	};
	$('#designerName').empty().append('<option value="" selected>--Select--</option>');
	
	postJSON('/OrderExecution/api/v1/getDesigners', JSON.stringify(fieldFilters), function(data) {
		var designersList = data.payload.designers;
		
		$.each(designersList, function(k, v) {
			if (v.id == 0) {
				$('#designerName').append('<option selected value="' + v.id + '">'	+ v.name + '</option>');
			} else {
				$('#designerName').append('<option value="' + v.id + '">' + v.name	+ '</option>');
			}
		});
	});
}


$("#saveDesignForm").on('click',function(){
	if($("#designerName").val() == ""){
		$.growl.error({
			message :"Please Select Designer Name !!!",
			duration :10000,
			title : 'Error'
		});
		return false;
	}
	if($("#designerName").val() == 0){
		$.growl.error({
			message :"Please Select Designer Name other than  NONE !!!",
			duration :10000,
			title : 'Error'
		});
		return false;
	}
});


//Accessory Master Grid
var designOrderGrid = function(data) {
	
	var addDesignDet = function(row, column, value) {	
			return '<button class="btn btn-sm btn-primary" onclick="addDesign();" data-toggle="modal" id="designDisabled" data-target="#DesignDetSC" style="display: block; margin-left:auto; margin-right:auto; margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>   </button>';
	}	
	
	var segmentArr = [];
	
	var generaterow = function(i) {
		var row = {};
		row["slNo"] = i;
		row["segment"] = "";
		row["jewelType"] = "";
		row["orderKind"] = "NO";
		row["expGrWt"] = "";
		row["expNetWt"] = "";
		row["orderKindId"] = 1;
		return row;
	}
	
	$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?page=search&criteria=sTypes&id=-1',function(data) {
		var res = data.payload.sTypes;
		for (var i = 0; i < res.length; i++) {
			segmentArr.push({"id" : res[i].id,"description" : res[i].description});
		}
	});
	
	var dropDownListSource = {
			datatype : 'json',
			datafields : [ 
			{name : 'id',type : 'int'}, 
			{name : 'description',type : 'string'}],
			localdata : segmentArr

	};
	
	var dropdownListAdapter = new $.jqx.dataAdapter(dropDownListSource, {
		autoBind : true,
		async : false
	});
	
	var source = {
		datafields : [ 
			{name : 'slNo',	type : 'int'},
			{name : 'segment',	type : 'int'},
			{name : 'jewelType',	type : 'int'},
			{name : 'orderKind',	type : 'int'},
			{name : 'expGrWt',	type : 'int'},
			{name : 'expNetWt',	type : 'int'},
			{name : 'designDet',	type : 'int'},
			{
				name : 'segmentN',
				value : 'segment',
				values : {
					source : dropdownListAdapter.records,
					value : 'id',
					name : 'description'
				}
			}
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#designOrderGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 70,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			
			var container = $("<div class='col-md-12' style='margin-top: 5px;'></div>");
			toolbar.append(container);
			container.append('<div class="col-md-4 pull-left"><div class="btn btn-primary btn-sm" id="addrowbutton"><i  class="fa fa-plus fa-md"></i></div>&nbsp; Design Order Details</div><div class="pull-right">(select row to delete)&nbsp;<div  id="deleterowbutton" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
			
			$("#addrowbutton").jqxButton();
			$("#deleterowbutton").jqxButton();
			
			$("#addrowbutton").on('click',	function() {
			
				var rowscount = $("#designOrderGrid").jqxGrid('getdatainformation').rowscount;
				if (rowscount == 0) {
					var rowId = 1;
				} else {
					var rowId = rowscount + 1;
					var rows = $('#designOrderGrid').jqxGrid('getrows');
					for (var i = 0; i < rowscount; i++) {
						if (rows[i].Segment == "" || rows[i].jewelType == "" || rows[i].orderKind == "" || rows[i].expGrWt == "" || rows[i].expNetWt == "") {
							$.growl.error({
								message : "Please fill mandatory fields.",
								duration : 10000,
								title : 'Error'
							});
							return false;
						}
					}
				}

				var datarow = generaterow(rowId);
				var commit = $("#designOrderGrid").jqxGrid('addrow',	null, datarow);
			});
			$("#deleterowbutton").on('click', function() {
				var designMasterGrid = $("#designOrderGrid").jqxGrid('getrows');
				var selectedrowindex = $("#designOrderGrid").jqxGrid('getselectedrowindex');
				var rowsDesign = $("#designDetGrid").jqxGrid('getrows');
				
				var rowscount = $("#designOrderGrid").jqxGrid('getdatainformation').rowscount;

				if (typeof rowsDesign != "undefined") {
					for (var i = 0; i < rowsDesign.length; i++) {
						var slMasterGrid = designMasterGrid[selectedrowindex].slNo;
						if (rowsDesign[i].slNo == slMasterGrid) {
							var idVal = $("#designDetGrid").jqxGrid('getrowid',	i);
							var commit = $("#designDetGrid").jqxGrid('deleterow',idVal);
						}
					}
				}
				
				for (var i = 0; i < rowscount; i++) {
					$("#designOrderGrid").jqxGrid("setcellvalue", i, "slNo",	i + 1);
				}
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#designOrderGrid").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#designOrderGrid").jqxGrid('deleterow', id);
				}

				for (var j = 0; j < rowscount; j++) {
					$("#designOrderGrid").jqxGrid("setcellvalue", j, "slNo", j + 1);
					$("#designDetGrid").jqxGrid("setcellvalue",	j, "slNo",j + 1);
				}
			});
		},
		
		columns : [
			{text : 'Sl No', datafield : 'slNo', width : '8%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Segment', datafield : 'segment', width : '18%', cellsalign : 'center', align : 'center',editable : true, columntype : 'dropdownlist', 	displayfield : 'segmentN',
				createeditor : function(row, cellvalue,	editor) {
					editor.jqxDropDownList({
						source : dropdownListAdapter,
						displayMember : 'description',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
					
				}
			},
			
			{text : 'Jewel Type', datafield : 'jewelType', width : '18%', cellsalign : 'center', align : 'center',editable : true, columnType : 'dropdownlist', displayfield : 'jewelTypeN',
				createeditor : function(row, cellvalue,	editor) {
					var segment = $("#designOrderGrid").jqxGrid('getcellvalue', row,'segment');
					$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=jewelType&id='+ segment,function(data) {
						var res = data.payload.jewelType;
						editor.jqxDropDownList({
							source : res,
							displayMember : 'description',
							valueMember : 'id'
						});
					});

				}
			},
			{text : 'Order Kind', datafield : 'orderKind', width : '16%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Exp. From Wt', datafield : 'expGrWt', width : '15%', cellsalign : 'right', align : 'center',editable : true,cellsformat:'d3'},
			{text : 'Exp. To Wt', datafield : 'expNetWt', width : '15%', cellsalign : 'right', align : 'center',editable : true,cellsformat:'d3',
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var expGrWt = $("#designOrderGrid").jqxGrid('getcellvalue', row,'expGrWt');	
					if(newvalue < expGrWt){
							$.growl.error({
								message : "Exp. From Wt should not be less than Exp. From Wt !!!",
								duration :10000,
								title : 'Error'
							});
							return "";
						}
				}
			},
			{text : 'Design Det.', datafield : 'designDet', width : '10%', cellsalign : 'center', align : 'center', editable : false, cellsrenderer : addDesignDet}]
	});
	
	
}

//Validation Accessory Modal Form
$('#designDetailsForm').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"designDueDate" : {required : true},
		"designStatus" : {required : true},
		"designBy" : {required : true},
		"designerName" : {required : true},
		"noOfDesignReq" : {required : true},
		"designInstr" : {required : true},
	},
	submitHandler : function(form) {

		var designArray = [];
		var approveDesign;
		
		
		var rowsMaster = $("#designOrderGrid").jqxGrid('getrows');
		var selectedrowindexMaster = $("#designOrderGrid").jqxGrid('getselectedrowindex');
		var designTomade = $('input[name=designToApprov]:checked').val();
		if (designTomade == "0") {
			approveDesign = false;
		} else {
			approveDesign = true;
		}
		var rows = $("#designDetGrid").jqxGrid('getrows');

		if (typeof rows != "undefined") {
			if (rows.length > 0) {
				for (var j = 0; j < rowsMaster.length; j++) {
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].slNo == rowsMaster[selectedrowindexMaster].slNo) {						
							var idVal = $("#designDetGrid").jqxGrid('getrowid',i);
							var commit = $("#designDetGrid").jqxGrid('deleterow',	idVal);
						}
					}
				}
			}
		}

		if (typeof rows == "undefined") {
			var rowDesign = {
				"slNo" : rowsMaster[selectedrowindexMaster].slNo,
				"isEmpApprovalReqd" : (approveDesign == true) ? "True" : "False",
				"isCustApprovalReqd" : 0,
				"designStatus" : $("#designStatus").val(),
				"designStatusId" : $("#designStatusId").val(),
				"designerType" : $("#designBy option:selected").text(),
				"designerTypeId" : $("#designBy option:selected").attr('code'),
				"designerName" : $("#designerName option:selected").text(),
				"designerNameId" : $("#designerName").val(),
				"dueDate" : $("#designDueDate").val(),
				"numberOfVariations" : $("#noOfDesignReq").val(),
				"catalogueRefNumber" : $("#scCatalogueNo").val(),
				"designInstruction" : $("#designInstr").val()
			};
		} else {

			var rowDesign = {
				"slNo" : rowsMaster[selectedrowindexMaster].slNo,
				"isEmpApprovalReqd" : (approveDesign == true) ? "True" : "False",
				"isCustApprovalReqd" : 0,
				"designStatus" : $("#designStatus").val(),
				"designStatusId" : $("#designStatusId").val(),
				"designerType" : $("#designBy option:selected").text(),
				"designerTypeId" : $("#designBy option:selected").attr('code'),
				"designerName" : $("#designerName option:selected").text(),
				"designerNameId" : $("#designerName").val(),
				"dueDate" : $("#designDueDate").val(),
				"numberOfVariations" : $("#noOfDesignReq").val(),
				"catalogueRefNumber" : $("#scCatalogueNo").val(),
				"designInstruction" : $("#designInstr").val()
			};
			for (i = 0; i < rows.length; i++) {
				designArray.push(rows[i]);
			}
		}

		designArray.push(rowDesign);

		designMasterGrid(designArray);

		$("#designDetGrid").show();
		$("#DesignDetSC").modal('hide');
		return false;
	}
});


//Design Details Grid
var designMasterGrid = function(data) {

	var source = {
		datafields : [ 
		{name : 'slNo', type : 'int'}, 
		{name : 'designStatus',	type : 'string'}, 
		{name : 'designStatusId', type : 'string'}, 
		{name : 'designerType',	type : 'string'}, 
		{name : 'designerTypeId', type : 'string'}, 
		{name : 'designerName',	type : 'long'}, 
		{name : 'designerNameId',type : 'int'}, 
		{name : 'dueDate',type : 'date'}, 
		{name : 'numberOfVariations',type : 'int'}, 
		{name : 'catalogueRefNumber',type : 'string'}, 
		{name : 'designInstruction',type : 'string'}],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},

	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#designDetGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : false,
		theme: 'energyblue',
		columnsheight : 50,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			
			var container = $("<div class='col-md-12' style='margin-top: 5px;'></div>");
			toolbar.append(container);
			container.append('<div class="col-md-4 pull-left"><i class="fa fa-list fa-md"></i>&nbsp; Design Details</div><div class="pull-right">(select row to delete)&nbsp;<div  id="deletedesignrowbutton" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
			
			$("#deletedesignrowbutton").jqxButton();
	
			$("#deletedesignrowbutton").on('click', function() {
				var selectedrowindex = $("#designDetGrid").jqxGrid('getselectedrowindex');
				var rowscount = $("#designDetGrid").jqxGrid('getdatainformation').rowscount;
				for (var i = 0; i < rowscount; i++) {
					$("#designOrderGrid").jqxGrid("setcellvalue", i, "slNo", i + 1);
				}
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#designDetGrid").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#designDetGrid").jqxGrid('deleterow', id);
				}
			});
		},
		columns : [ 
		{text : 'Link Sl No',datafield : 'slNo',	width : '10%',cellsalign : 'center',align : 'center'}, 
		{text : 'Design Status',datafield : 'designStatus',width : '10%',cellsalign : 'center',align : 'center',editable : false}, 
		{text : 'Design Type',datafield : 'designerType',width : '15%',	cellsalign : 'center',align : 'center',	editable : false}, 
		{text : 'Designer Name',datafield : 'designerName',	width : '10%',cellsalign : 'center',align : 'center',editable : false}, 
		{text : 'Due Date',	datafield : 'dueDate',width : '10%',cellsalign : 'center',align : 'center',	editable : false,'cellsformat' : 'dd/MM/yyyy'}, 
		{text : 'No of Variation',datafield : 'numberOfVariations',	width : '15%',cellsalign : 'center',align : 'center',editable : false}, 
		{text : 'Catalogue Ref. No',datafield : 'catalogueRefNumber',width : '15%',cellsalign : 'center',align : 'center',editable : false}, 
		{text : 'Design Instru.',datafield : 'designInstruction',width : '15%',cellsalign : 'left',align : 'center',editable : false}]
	});
}

// Create Design Order
$("#saveDesignOrder").on('click', function(){
	var orderItemArray = [];

	var masterRows = $("#designOrderGrid").jqxGrid('getrows');
	var designRows = $("#designDetGrid").jqxGrid('getrows');
	var sysdate = moment().format('DD-MM-YYYY HH:mm:SS A');
	var getDesignRows = $("#designDetGrid").jqxGrid('getrows');
	if(masterRows.length == 0){
		$.growl.error({
			message : "Please add lines.",
			duration : 10000,
			title   : 'Error'
		});
		return false;
	}
	
	if(typeof designRows == "undefined"){
		$.growl.error({
			message : "Please add design details. ",
			duration : 10000,
			title   : 'Error'
		});
		return false;
	}else{
		for (var i = 0; i < designRows.length; i++) {
			if(designRows[i].designStatus == "" || designRows[i].designerName == "" || designRows[i].designerType == "" || designRows[i].dueDate == "" ||
					designRows[i].numberOfVariations == "" ){
				$.growl.error({
					message : "Please add all design details for row " + i,
					duration : 10000,
					title   : 'Error'
				});
				return false;
			}
		}
	}
	
	
	
	for (var m = 0; m < masterRows.length; m++) {
		var orderItems = {
			"design" : {},
			"attributes" : {},
			"stones" : [],
			"accessories" : []
		}
		if(masterRows[m].expGrWt == "" || masterRows[m].expGrWt == "" || masterRows[m].expGrWt == "" || masterRows[m].expGrWt == "" || masterRows[m].expGrWt == ""){
			$.growl.error({
				message : "Please fill mandatory fields.",
				duration : 10000,
				title   : 'Error'
			});
			return false;
		}
		orderItems["serialNumber"] = masterRows[m].slNo;
		var expGrWt = masterRows[m].expGrWt;
		var expNetWt = masterRows[m].expNetWt;
		if( expGrWt > expNetWt){
			$.growl.error({
				message : "Expected To Wt Should be greater than Expected From Wt",
				duration : 10000,
				title   : 'Error'
			});
			return false;
		}
		
		
		if (typeof getDesignRows != "undefined") {
			for (var j = 0; j < getDesignRows.length; j++) {
				if (masterRows[m].slNo == getDesignRows[j].slNo) {
					var designItem = {
						"isEmpApprovalReqd" : true,
						"isCustApprovalReqd" : 0,
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
						"dueDate" : getDesignRows[j].dueDate,
						"numberOfVariations" : getDesignRows[j].numberOfVariations,
						"catalogueRefNumber" : getDesignRows[j].catalogueRefNumber,
						"designInstruction" : getDesignRows[j].designInstruction

					};
					orderItems['design'] = designItem;
				}

			}
		} else {
			orderItems['design'] = null;
		}
		orderItems["isDesignReqd"] = 1;		
		orderItems["isStoneReqd"] = 0;
		orderItems["isAccessoryReqd"] = 0;
		orderItems["linkedTosln"] = null;	
		orderItems["oKind"] = {
			"id" : "NO",
			"name" : "New Order-NO",
			"description" : null,
			"rateList" : null,
			"value" : null
		};
		orderItems["salesExecutive"] = {"id" : 19,"name" : "Murthy DCPL"};		
		orderItems["orderItemDescription"] = null;
		orderItems["jobWorkerInstruction"] = null;		
		orderItems["expectedPieces"] = null;
		orderItems["isAdditionalWorkReqdType"] = 0;
		orderItems["dueDateType"] = { "id" : "General", "name" : "General"};
		orderItems["segId"] = {	"id" : masterRows[m].segment,"description" : masterRows[m].segmentN};
		
		if(masterRows[m].segment == 1 || masterRows[m].segment == 2){
			orderItems["metalId"] = {"id" : 1};
		}else if(masterRows[m].segment == 3){
			orderItems["metalId"] = {"id" : 3};
		}else if(masterRows[m].segment == 4){
			orderItems["metalId"] = {"id" : 4};
		}		
		orderItems["orderItemMeltingPurity"] = null;
		orderItems["metalColor"] = null;
		orderItems["articleMaster"] = null;
		orderItems["vendor"] = null;
		orderItems["jewelType"] = {	"id" : masterRows[m].jewelType, "description" : masterRows[m].jewelTypeN};
		orderItems["mainCategory"] = null;
		orderItems["subCategory"] = null;
		orderItems["orderItemDueDate"] = null;
		orderItems["metalWeightType"] = null;
		orderItems["store"] = null;
		orderItems["expectedGrossWeight"] = masterRows[m].expNetWt;
		orderItems["expectedNetWeight"] = masterRows[m].expGrWt;		
		orderItems["orderItemSkinPurity"] = null;
		orderItems['attributes'] = null;
		
		orderItemArray.push(orderItems);

	}

	// Design Object Creation

	var designOrderArr = {
		"isAdvancedPayment" : 0,
		"intimationReqd" : {"id" : "No"},
		"printNameInBill" : {"id" : "No"},
		"deliveryAddress" : {"id" : "No"},
		"isCashierConfirmed" : true,
		"intimationMode" : {"id" : "Postal"},
		"isDesignOrderFromOE" : true,
		"orderStatus" : "Generated",
		"orderType" : "DesignOrder", 
		"orderDate" : sysdate,
		"orderSource" : "Store",
		"orderItems" : orderItemArray,
		"orderCreditAccountList" : []
	}
	postJSON('/OrderExecution/api/v1/createDesignOrder', JSON.stringify(designOrderArr), function(data) {
		if (data.resCode == 1) {
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			redirect();
		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
			return false
		}
	});
});

var viewEditDesignOrder = function(row, column, value) {
	var designStatusId = $('#designSearchGrid').jqxGrid('getcellvalue', row, 'designStatusId');
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px;" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
		if(designStatusId == "G"){
			return '<button  id='+ row + ' name="edit" onclick="editDesignOrder('+ value +')" style="margin-left:2px; margin-top:3px;" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#DesignDetEdit"  type="button" /><i class="fa fa-pencil fa-sm"></i></button>';	
		}else{
			return '<button style="margin-left:2px; margin-top:3px;" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
		}
	}
}

var cancelDesignOrder = function(row, column, value) {
	return '<a class="btn btn-danger btn-sm" type="button" id=' + row + ' onclick="cancelDO('+ value +')" href="javascript:void(0);"/><i class="fa fa-window-close"></i>Cancel </a>'

	//return '<button  id='+ row + ' onclick="cancelDO('+ value +')" style="margin-left:2px; margin-top:3px;" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#DesignDetEdit"  type="button" /><i class=""></i> Cancel </button>';	
}




var d = new Date();
var cancelDate = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear() ;

var designId ;
var cancelDO = function(id){
	designId = id;
	$("#designOrderCancelSection").show();
	$("#headerScOrder").hide();
	$("#searchScOrderSection").hide();
	$("#saveDOSection").hide();
	$("#designSearchGrid").hide();
	designOrderCancelGrid();
	$("#jqxgridD").show();
	$.getJSON('/OrderExecution/api/v1/getDesignOrder?id='+id ,function(data) {
		var headerData = data.payload.customerOrder;
		var employeeDetails = data.payload.employeeDetails;
		var detailData = headerData.orderItems;
		$("#orderNo").val(headerData.orderNo);
		$("#date").val(headerData.orderDate);
		$("#status").val(headerData.orderStatus);
		$("#cancelledOn").val(cancelDate);
		$("#advancePaid").val(headerData.advance);
		$("#advance").val((headerData.isAdvancedPayment == false)? 'NO': 'YES');
		$("#unrealizedAmt").val(headerData.unrealizedChequeDDAmount);
		$("#cancelledBy").val(employeeDetails.name);
		designOrderCancelGrid(detailData);
	});
}

// Search Design Order Grid
var searchDesignOrderGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{name : 'orderNo',	type : 'int', map: 'orderNo'},
			{name : 'orderDate', type : 'date', map:'createdDate'},
			{name : 'orderSlNo', type : 'string', map: 'serialNumber'},
			{name : 'createdBy', type : 'string', map: 'orderCreatedBy'},
			{name : 'segment', type : 'int', map: 'segId>description'},
			{name : 'jewelType', type : 'date', map: 'jewelType>description'},
			{name : 'expGrWt', type : 'int', map: 'expectedGrossWeight'},
			{name : 'expNetWt', type : 'string', map: 'expectedNetWeight'},
			{name : 'designDueDate', type : 'date', map: 'design>dueDate'},
			{name : 'designStatusId', type : 'int', map: 'design>designStatus>id'},
			{name : 'designStatus', type : 'float', map: 'design>designStatus>name'},
			{name : 'designBy', type : 'date', map: 'design>designerType>name'},
			{name : 'designerName', type : 'string', map: 'design>designerName>name'},
			{name : 'designReq', type : 'string', map: 'design>numberOfVariations'},
			{name : 'refNo', type : 'string', map: 'design>catalogueRefNumber'},
			{name : 'designInst', type : 'int', map: 'design>designInstruction'},
			{name: 'actionId', type: 'int', map: 'id'},
			{name: 'actionIdC', type: 'int', map: 'orderNo'}
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#designSearchGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : false,
		theme: 'energyblue',
		columnsheight : 70,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Design Search Listing');
			
		},
		
		columns : [
			{text : 'Order No', datafield : 'orderNo', width : '3.5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Order Date', datafield : 'orderDate', width : '7%', cellsalign : 'center', align : 'center',editable : false,cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},			
			{text : 'Order Sl. No.', datafield : 'orderSlNo', width : '4%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Created By', datafield : 'createdBy', width : '6%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Segment', datafield : 'segment', width : '6%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Jewel Type', datafield : 'jewelType', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Exp. Gross Wt', datafield : 'expGrWt', width : '5%', cellsformat : 'd3', cellsalign : 'right', align : 'center', editable : false},
			{text : 'Exp. Net Wt.', datafield : 'expNetWt', width : '5%', cellsformat : 'd3', cellsalign : 'right', align : 'center', editable : false},
			{text : 'Design Due Date', datafield : 'designDueDate', width : '7%', cellsalign : 'center', align : 'center', editable : false,cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},
			{text : 'Design Status', datafield : 'designStatus', width : '7%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'Design By', datafield : 'designBy', width  : '5%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'Designer Name', datafield : 'designerName', width : '6%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'No of Design Req.', datafield : 'designReq', width : '7%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'Stock/ Catalogue Ref. No', datafield : 'refNo', width : '11%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'Design Inst.', datafield : 'designInst', width : '7%', cellsalign : 'left', align : 'center', editable : false},
			{text : '', datafield : 'actionId', width : '3%', cellsalign : 'center', align : 'center', editable : false, cellsrenderer : viewEditDesignOrder},
			{text : '', datafield : 'actionIdC', width : '5.5%', cellsalign : 'center', align : 'center', editable : false, cellsrenderer : cancelDesignOrder}
		]
	});
	
}

var editOnloadApi = function(designerType, designerName, designStatus,dueDate){
	var date = new Date();
	var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	
	var fullDate = new Date();
	var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
	var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
	$("#designStatusEdit").val(designStatus.name);
	$("#designStatusIdEdit").val(designStatus.id);
	
	$("#designStatusDate").val(currentDate);
	$("#designDueDateEdit").val(dueDate);
	$("#designDueDateEdit").datepicker({
		changeMonth : true,
		changeYear : true,
		minDate : today,
		dateFormat : "dd/mm/yy"
	});

	
	var segId = 1;
	var metalId = 1;
	$("#designIdShowHide").hide();
	$('input:radio[name=designTomade]').filter('[value="0"]').attr('checked',true);

	var fieldFilters = {
		"fieldFilters" : {
			"segId" : segId,
			"metalId" : metalId
		}
	};
	$('#designByEdit').empty().append('<option value="" selected>--Select--</option>');
	
	postJSON('/OrderExecution/api/v1/getDesignDetails', JSON.stringify(fieldFilters), function(data) {
		var accSubCatsList = data.payload.dDetails.dStatus;
		var designByList = data.payload.dDetails.designBy;
		
		

		$.each(designByList, function(k, v) {
			if(designerType == null){
				$('#designByEdit').append('<option code="' + v.id + '" value="' + v.name + '">' + v.name + '</option>');
			}
			else{
				if (v.id == designerType.id) {
					$('#designByEdit').append('<option selected code="' + v.id + '" value="' + v.name + '">' + v.name + '</option>');
				} else {
					$('#designByEdit').append('<option code="' + v.id + '" value="' + v.name + '">' + v.name + '</option>');
				}
			}
		});

	});
}

var editDesignOrder = function(id){
	$.getJSON('/OrderExecution/api/v1/getDesignOrderOEById?id=' + id ,function(data) {
		var designDet = data.payload.orderItem;
		editOnloadApi(designDet.design.designerType, designDet.design.designerName, designDet.design.designStatus,designDet.design.dueDate)
		$("#designOrderNo").val(designDet.orderNo);
		$("#designOrderId").val(designDet.id);
		$("#expGrWtEdit").val(designDet.expectedGrossWeight);
		$("#expNetWtEdit").val(designDet.expectedNetWeight);
		$("#noOfDesignReqEdit").val(designDet.design.numberOfVariations);
		
		$("#designStatusIdEdit").val(designDet.design.designStatus.id);
		$("#designStatusEdit").val(designDet.design.designStatus.name);
		
		$("#scCatalogueNoEdit").val(designDet.design.catalogueRefNumber);
		$("#designInstrEdit").val(designDet.design.designInstruction);	
		
		var fieldFilters = {
				"fieldFilters" : {
					"designBy" : designDet.design.designerType.name
				}
			};
			$('#designerNameEdit').empty().append('<option value="" selected>--Select--</option>');
			
			postJSON('/OrderExecution/api/v1/getDesigners', JSON.stringify(fieldFilters), function(data) {
				var designersList = data.payload.designers;
				$.each(designersList, function(k, v) {
					if(designerName == null){
						$('#designerNameEdit').append('<option value="' + v.id + '">' + v.name	+ '</option>');
					}else{
						if (v.id == designDet.design.designerName.id) {
							$('#designerNameEdit').append('<option selected value="' + v.id + '">'	+ v.name + '</option>');
						} else {
							$('#designerNameEdit').append('<option value="' + v.id + '">' + v.name	+ '</option>');
						}
					}
				});
			});
		
	});
}


// Update Design Details
$("#updateDesignDetails").on('click', function(){
	var designOrderId = $("#designOrderId").val();
	var expGrWtEdit = $("#expGrWtEdit").val();
	var expNetWtEdit = $("#expNetWtEdit").val();
	var noOfDesignReqEdit = $("#noOfDesignReqEdit").val();
	var scCatalogueNoEdit= $("#scCatalogueNoEdit").val();
	var designInstrEdit = $("#designInstrEdit").val();
	var designDueDateEdit = $("#designDueDateEdit").val();
	var designByEdit = $("#designByEdit option:selected").text();
	var designByEditId = $("#designByEdit option:selected").attr('code');
	var designerNameEdit = $("#designerNameEdit option:selected").text();
	var designerNameEditId = $("#designerNameEdit option:selected").val();
	
	if(designInstrEdit == "" || designInstrEdit == null){
		$.growl.error({
			message : "Please Enter Design Instructions !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	var editDesignDetailsObj ={
			 "id": designOrderId,
			  "expectedGrossWeight": parseFloat(expGrWtEdit),
			  "expectedNetWeight": parseFloat(expNetWtEdit),
			  "design": {
			    "dueDate": designDueDateEdit,
			    "designerType": {
			      "id": designByEditId,
			      "name": designByEdit,
			      "description": null
			    },
			    "numberOfVariations": parseInt(noOfDesignReqEdit),
			    "catalogueRefNumber": scCatalogueNoEdit,
			    "designInstruction": designInstrEdit,
			    "designerName": {
			      "id": designerNameEditId,
			      "name": designerNameEdit,
			      "description": null
			    }
			  }
	};
	postJSON('/OrderExecution/api/v1/editDesignOrderOE', JSON.stringify(editDesignDetailsObj), function(data) {
		if (data.resCode == "1") {
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$("#DesignDetEdit").modal('hide');
			$("#searchDO").click();
		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});

		}
	});
	
});


//Design Order Cancellation Grid
var designOrderCancelGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'id', type : 'int','map':'id'}, 
			{name : 'stSrlNo', type : 'int'}, 
			{name : 'slNo', type : 'int','map' : 'serialNumber'},
			{name: 'orderKind', type: 'string','map':'oKind>name'},
			{name: 'stockNo', type: 'string','map':''},
			{name : 'preciousMetal', type : 'string','map':'isPreciousMetal'},
			{name : 'status', type : 'string','map' : 'orderItemStatus'},
			{name : 'segType', type : 'string','map': 'segId>description'},
			{name : 'metalType', type : 'string','map' : 'metalId>description'},
			{name : 'jewType', type : 'string','map': 'jewelType>description'},
			{name : 'subCat', type : 'string','map' : 'subCategory>description'},
			{name : 'articleCode', type : 'string','map' :'articleMaster>name'},
			{name : 'vendCode', type : 'string','map' :'vendor>name'},
			{name : 'linkedToSlNo', type : 'int','map' : 'linkedTosln'},
			{name : 'pcs', type : 'int','map':'finishedPieces'},
			{name : 'dueDateType', type : 'string','map' : 'dueDateType>name'},
			{name : 'dueDate', type : 'string','map' :'orderItemDueDate'},
			{name : 'seUser', type : 'string','map' :'salesExecutive'},
			{name : 'workOrderInst', type : 'string','map' : 'jobWorkerInstruction'},
			{name : 'metalSellingRate', type : 'float','map' :'metalSellingRate'},
			{name : 'estimatedPrice', type : 'float','map' : 'sellingPrice'},
			{'name' : 'selectionStatus','type' : 'bool'},
			{name : 'orderItemStatusType', type : 'string'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridD").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		theme: 'energyblue',
		columnsheight : 80,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		selectionmode : 'checkbox',
		columns : [ 
			{ text : '', datafield : 'id', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'Sl No', datafield : 'slNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Order Kind', datafield : 'orderKind', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock No', datafield : 'stockNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Is Precious Metal', datafield : 'preciousMetal', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Status', datafield : 'status', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg Type', datafield : 'segType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Type', datafield : 'metalType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Jewel Type', datafield : 'jewType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat', datafield : 'subCat', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Code', datafield : 'articleCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Code', datafield : 'vendCode', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Linked To Sl No', datafield : 'linkedToSlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
			{ text : 'Due-Date Type', datafield : 'dueDateType', width : '4.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Due Date', datafield : 'dueDate', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'SE User', datafield : 'seUser', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Work Order Instruction', datafield : 'workOrderInst', width : '7%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Selling Rate', datafield : 'metalSellingRate', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Estimated Price', datafield : 'estimatedPrice', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
			
			{text : '',sortable : false,hidden: true,datafield : 'selectionStatus',columntype : 'checkbox',width : '5%',cellsalign : 'center',align:'center',filterable: false,
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue) {
					if (newvalue) {$("#jqxgridD").jqxGrid('selectrow', row, 'selectionStatus', true);}
					else {$("#jqxgridD").jqxGrid('unselectrow', row, 'selectionStatus', false);}
				}
			}, 
			{ text : '', datafield : 'orderItemStatusType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},

			]
	});
}


// Clear All
$("#clear").on('click', function(){
	redirect();
});

$("#backFromCancel").on('click',function(){
	$("#searchScOrderSection").show();
	$("#designOrderCancelSection").hide();
});

$('input[name=orderItem]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if (selectedVal == "orderItem") {
		 $('#jqxgridD').jqxGrid('clearselection');
	} else if (selectedVal == "lineItem") {
		 $('#jqxgridD').jqxGrid('clearselection');
	}
});

var orderId = [];
$("#designOrderCancel").on('click',function(){
	var selectedOption = $("input:radio[name=orderItem]:checked").val();
	if(typeof selectedOption == "undefined"){
		$.growl.error({
			message  : "Please Select Order/Line Item !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	else if(selectedOption == "lineItem"){
	 var selectedRows = $("#jqxgridD").jqxGrid('selectedrowindexes');
		if(selectedRows.length == 0){
			$.growl.error({
				message : "Please Select Item to be Cancelled !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		if(selectedRows.length > 1){
			$.growl.error({
				message : "Please Select one Line Item at a Time !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	 for(var i=0; i<selectedRows.length; i++){
		 $("#jqxgridD").jqxGrid('setcellvalue', selectedRows[i], 'selectionStatus', true);
	 }
	  orderId = [];
	 var rows = $("#jqxgridD").jqxGrid('getrows');
	 for(var i = 0; i<rows.length; i++){
		if(rows[i].selectionStatus == true){
			if(rows[i].status == "C" || rows[i].status == "CC"){
				 $.growl.error({
					 message : "Order Item Already Cancelled !!",
					 duration : 1000,
					 title : 'Error'
				 });
				 return false;
			 }else if(rows[i].status == "Q"){
				 $.growl.error({
					 message : "Order Item Already "+ rows[i].orderItemStatusType + " Please Do Material Return !!" ,
					 duration : 1000,
					 title : 'Error'
				 });
				 return false;
			 }else{
				 orderId.push(rows[i].id);
			 }
		}
	}
  }else if(selectedOption == "orderItem"){
		if($("#status").val() == "Req. Cancel"){
			$.growl.error({
				message : "Order Item Already " + $("#status").val() + " Please do Material Return !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	 }else{}
});

$("#cancelDes").on('click',function(){
	 if($("#reason").val() == ""){
		 $.growl.error({
			message : 'Please Enter Cancellation Reason !!!',
			duration : 10000,
			title : 'Error'
		 });
		 return false;
	 }else{
		 var selectedOptionS = $("input:radio[name=orderItem]:checked").val();
		 if(selectedOptionS == "lineItem"){
		 $.getJSON('/OrderExecution/api/v1/cancelDesignOrder?orderItemId='+orderId+"&reason="+$("#reason").val() ,function(data) {
			 if(data.resCode == 1){
				 $.growl.notice({
					 message : data.mesgStr,
					 duration : 1000,
					 title : 'Success'
				 });
				 $('#cancelDesignOrderCC').modal('hide');
				 $('#jqxgridD').jqxGrid('clearselection');
				 cancelDO(designId);
			 }else{
				 $.growl.error({
					 message : data.mesgStr,
					 duration : 10000,
					 title :'error'
				 });
				 return false;
			 }
		 });
	   }
		 else if(selectedOptionS == "orderItem"){
			 $.getJSON('/OrderExecution/api/v1/cancelStockOrderHeader?orderId='+$("#orderNo").val()+"&reason="+$("#reason").val() ,function(data) {
				 if(data.resCode == 1){
					 $.growl.notice({
						 message : data.mesgStr,
						 duration : 1000,
						 title : 'Success'
					 });
					 $('#cancelDesignOrderCC').modal('hide');
					 $('#jqxgridD').jqxGrid('clearselection');
					 cancelDO(designId);
				 }else{
					 $.growl.error({
						 message : data.mesgStr,
						 duration : 10000,
						 title :'error'
					 });
					 return false;
				 }
			 }); 
		 }else{}
	}
});

