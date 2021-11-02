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

$("#menuSection").hide();
$("#bottomSection").hide();

$('#meduleNameC').empty().append('<option value="" selected>--Select--</option>');
$('#meduleNameE').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/getPortal', function(data) {
		$.each(data.payload.portal, function(key, val) {
	    $('#meduleNameC').append('<option value="' + val.id + '">' + val.name + '</option>');
	    $('#meduleNameE').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});

$('#meduleNameC').on("change",function(){
	$('#menuNameC').empty().append('<option value="" selected>--Select--</option>');
	var modulName = $('#meduleNameC').val();
	if(modulName != ""){
		$.getJSON('/OrderExecution/api/v1/findMenu?portal='+modulName, function(data) {
			if(data.resCode == 1){
				$("#menuSection").show();			
				var s = '<select id="menuNameCObj"  name="menuNameCObj" class="form-control" multiple="multiple">';
				$.each(data.payload.menus, function(key, val) {
					s += '<option value="' + val.id + '">' + val.name + '</option>'; });
					s += '</select>';
					$("#menuNameC").html(s);
					$('#menuNameCObj').multiselect({includeSelectAllOption : true,maxHeight : 250,numberDisplayed : 1,buttonClass : 'col-md-12 form-control text-left'});
			}
	  });
	}else{
		$.growl.error({	message : "Please select Module.",duration : 10000,title : 'Error'});
		return false;
	}
});

var updateMenuDto = function(modulName, menuDtoArr){
	
	$.getJSON('/OrderExecution/api/v1/findMenu?portal='+ modulName, function(data) {
		if(data.resCode == 1){
			$("#menuSectionE").show();				    
		    $('#menuNameEObj').empty().append('<option value="" selected>--Select--</option>');
			var s = '<select id="menuNameEObj"  name="menuNameEObj" class="form-control" multiple="multiple">';
			$.each(data.payload.menus, function(key, val) {
					if($.inArray(val.id, menuDtoArr) == -1){
						s += '<option value="' + val.id + '">' + val.name + '</option>'; 						
					}else{
						s += '<option selected value="' + val.id + '">' + val.name + '</option>'; 
					}
			}); 
				s += '</select>';
				$("#menuNameE").html(s);
				$('#menuNameEObj').multiselect({includeSelectAllOption : true, maxHeight : 250,numberDisplayed : 1,buttonClass : 'col-md-12 form-control text-left'});
			}
	  });
	
}



var functionArray = [];
// Check Validate or Not
var checkValidate = function(){

	var roleCode = $("#roleCode").val();
	var roleName = $("#roleName").val();
	var meduleNameC = $("#meduleNameC").val();
	var menuName = $("#menuNameCObj").val();
	var menuList = menuName;
	
	if(roleCode == "" || roleName == "" || meduleNameC == "" || typeof menuList == "undefined"|| menuList ==null){
		$.growl.error({message : "Please select mandatory fields.",duration : 10000,title : 'Error'});
		return false;
	}else{
		$.getJSON('/OrderExecution/api/v1/findFunction?menuId='+menuList, function(data) {
			if(data.resCode == 1 && typeof data != "undefined"){
				$("#bottomSection").show();
				functionArray = data.payload.functions;	
			}else{
				functionArray = [];
			}
		});
		return true;
	}
}
// Add row in grid
var addRows = function(i){	
	var row = {};
	
	row["slNo"] = i;
	row["id"] = null;
	row["functionList"] = "";
	row["menuId"] = "";
	row["canAdd"] = "";
	row["canEdit"] = "";
	row["canDelete"] = "";
	row["canExport"] = "";
	row["canPrint"] = "";
	row["canAdjustVoucherPosting"] = "";
	row["canSearch"] = "";
	rowId = rowId + 1;
	return row;
}

// Delete row for grid
var deleteRow = function(row){
	
	var selectedrowindex = $("#jqxgridRole").jqxGrid('getselectedrowindex');
	var rowscount = $("#jqxgridRole").jqxGrid('getdatainformation').rowscount;
	for (var i = 0; i < rowscount; i++) {
		$("#jqxgridRole").jqxGrid("setcellvalue", i, "slNo", i + 1);
	}
	
	if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
		var id = $("#jqxgridRole").jqxGrid('getrowid',selectedrowindex);
		var commit = $("#jqxgridRole").jqxGrid('deleterow', id);
	}
	
	for (var j = 0; j < rowscount; j++) {
		$("#jqxgridRole").jqxGrid("setcellvalue", j,"slNo", j + 1);					
	}
	
	setTimeout(function () {
		$('#jqxgridRole').jqxGrid('selectrow', (rowscount - 2));
		$('#jqxgridRole').jqxGrid('ensurerowvisible', (rowscount - 2));
	}, 0);
}

// On load Function List
var onloadFunction = function(row, cellvalue,	editor) {
	editor.on('click', function(event){
		checkValidate();
		editor.jqxDropDownList({
			placeHolder: "--Select Function--",
			dropDownHorizontalAlignment: 'top',
			animationType: 'slide',
			filterable: true,
			source : functionArray, 
			displayMember : 'description', 
			valueMember : 'id'
		});
	});
}

var updateOnchangeFunction = function(row, datafield, columntype, oldvalue, newvalue, event){
	var rowdata = $("#jqxgridRole").jqxGrid('getrows');
	for(var i=0;i<rowdata.length;i++){
		if(rowdata[i].functionList == newvalue.value){
			$.growl.error({ message: newvalue.label+" function name already exist", duration: 5000, title: 'Error' });
			$("#jqxgridRole").jqxGrid("setcellvalue", row, "functionList","");
			$("#jqxgridRole").jqxGrid("setcellvalue", row, "functionListN","");
			return false;
		}		
	}
	$.each(functionArray, function(k, v){
		if(v.id == newvalue.value){
			$("#jqxgridRole").jqxGrid("setcellvalue", row, "menuId",v.menuDto.id);
		}
	});
	$("#jqxgridRole").jqxGrid("setcellvalue", row, "functionList",newvalue.value);
	$("#jqxgridRole").jqxGrid("setcellvalue", row, "functionListN",newvalue.label);
}

// On Load Action List
var onloadAction = function(row, cellvalue,	editor){
	editor.jqxDropDownList({
		source : actionArray, checkboxes: true,  displayMember : 'name', valueMember : 'id'
	});
}

var updateOnchangeAction = function(row, datafield, columntype, oldvalue, newvalue, event){
		var rows = $("#jqxgridRole").jqxGrid('getrowdata', row);
		
		var strVale = newvalue.value;
		var arr = strVale.split(',');
		var checkedItemArray = [];
		for(i=0; i < arr.length; i++){
			var obj = {"id" : arr[i]};
			checkedItemArray.push(obj);
		}
		rows['actionListVal'] = checkedItemArray;
	    $('#jqxgridRole').jqxGrid('setcellvalue', row, rows);
}


var onloadFunctionAddEdit = function(row, cellvalue,editor){
	var json = [
		{"id" : true, "name" : "Yes"},
		{"id" : false, "name" : "No"}
	];
	
	editor.jqxDropDownList({
		source : json,  displayMember : 'name', valueMember : 'id'
	});
}

var updateOnchangeAddEdit  =  function(row, datafield, columntype, oldvalue, newvalue, event){
	
}

// Create Role Grid
var roleMasterGrid = function() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var source = {
		datafields : [ 
			{name : 'slNo',	type : 'int'},
			{name : 'functionList',	type : 'string'},
			{name : 'fname',	type : 'string'},
			{name : 'menuId',	type : 'int'},
			{name : 'canAdd',	type : 'string'},
			{name : 'canEdit',	type : 'string'},
			{name : 'canDelete',	type : 'string'},
			{name : 'canExport',	type : 'string'},
			{name : 'canPrint',	type : 'string'},
			{name : 'canAdjustVoucherPosting',	type : 'string'},
			{name : 'canSearch',	type : 'string'}/*
			{name : 'actionListVal',	type : 'array'}*/
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridRole").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		autorowheight : false,
		autoheight : false,
		height: '300px',
		columnsheight : 30,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			
			var container = $("<div class='col-md-12' style='margin-top: 5px;'></div>");
			toolbar.append(container);
			container.append('<div class="col-md-4 pull-left"><div class="btn btn-primary btn-sm" id="addrowbutton"><i  class="fa fa-plus fa-md"></i></div>&nbsp;Assign Function to Role</div><div class="pull-right">(select row to delete)&nbsp;<div  id="deleterowbutton" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
			
			$("#addrowbutton").jqxButton();
			$("#deleterowbutton").jqxButton();
			
			$("#addrowbutton").on('click',	function() {			
				if(checkValidate()){
					var rowscount = $("#jqxgridRole").jqxGrid('getdatainformation').rowscount;
					if (rowscount == 0) {var rowId = 1;} else {	var rowId = rowscount + 1;}
					$("#jqxgridRole").jqxGrid('addrow', null, addRows(rowId));
					
					
					var boundindex = $('#jqxgridRole').jqxGrid('getrowboundindex', rowId-1);
					$("#jqxgridRole").jqxGrid('selectrow', boundindex);
					$("#jqxgridRole").jqxGrid('ensurerowvisible', boundindex);
					
					commit(true);
				}			
			});
			$("#deleterowbutton").on('click', function() {
				deleteRow();				
			});
		},
		
		columns : [
			{text : 'Sl.No', datafield : 'slNo', width : '6%', cellsalign : 'center', align : 'center',editable : false},
			{text : '', datafield : 'menuId', width : '8%', cellsalign : 'center', align : 'center',editable : false, hidden: true},
			{text : '', datafield : 'actionListVal', width : '8%', cellsalign : 'center', align : 'center',editable : false, hidden: true},
			{text : 'Function Name', datafield : 'functionList', width : '16%', cellsalign : 'center',createeditor : onloadFunction,cellvaluechanging: updateOnchangeFunction, align : 'center',displayfield : 'functionListN', columnType : 'dropdownlist',editable : true},
			{text : 'Add(Y/N)', datafield : 'canAdd', width : '8%', cellsalign : 'center',createeditor : onloadFunctionAddEdit,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canAddN', columnType : 'dropdownlist',editable : true},
			{text : 'Edit(Y/N)', datafield : 'canEdit', width : '8%', cellsalign : 'center',createeditor : onloadFunctionAddEdit,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canEditN', columnType : 'dropdownlist',editable : true},
			{text : 'Delete(Y/N)', datafield : 'canDelete', width : '10%', cellsalign : 'center',createeditor : onloadFunctionAddEdit,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canDeleteN', columnType : 'dropdownlist',editable : true},
			{text : 'Export(Y/N)', datafield : 'canExport', width : '10%', cellsalign : 'center',createeditor : onloadFunctionAddEdit,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canExportN', columnType : 'dropdownlist',editable : true},
			{text : 'Print(Y/N)', datafield : 'canPrint', width : '8%', cellsalign : 'center',createeditor : onloadFunctionAddEdit,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canPrintN', columnType : 'dropdownlist',editable : true},
			{text : 'Adjust Voucher Posting(Y/N)', datafield : 'canAdjustVoucherPosting', width : '22%', cellsalign : 'center',createeditor : onloadFunctionAddEdit,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canAdjustVoucherPostingN', columnType : 'dropdownlist',editable : true},
			{text : 'Search(Y/N)', datafield : 'canSearch', width : '12%', cellsalign : 'center',createeditor : onloadFunctionAddEdit,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canSearchN', columnType : 'dropdownlist',editable : true}
			/*{text : 'Action', datafield : 'actionList', width : '50%', cellsalign : 'center',initeditor: initDropDownListMultiSelect, geteditorvalue : geteditorvalueMultiSelect, createeditor : onloadAction,cellvaluechanging: updateOnchangeAction, align : 'center',displayfield : 'actionListN', columnType : 'dropdownlist',editable : true}
			*/
		]
	});
	
}

$("#saveRoleDet").on('click', function(){
	trimmer();
	
	var roleCode = $("#roleCode").val();
	var roleName = $("#roleName").val();
	var menuList = $("#menuNameCObj").val();
	var saveRoleObj = {"roleFunctionList" : []};
	
	var roleLineArray = [];
	var menuDtoArray = [];
	var menuSaveArr = [];
	for(i=0; i < menuList.length; i++){
		var obj = {"id" : menuList[i]};
		menuDtoArray.push(obj);
	}
	
	var rowData = $("#jqxgridRole").jqxGrid("getrows");
	if(typeof rowData != "undefined"){
		for(var i=0; i<rowData.length; i++){
			if(menuSaveArr.length == 0)
				menuSaveArr.push(rowData[i].menuId);
				else{
					var flag = false;
					for(var j=0 ; j<menuSaveArr.length ; j++){
						if(rowData[i].menuId == menuSaveArr[j])
						{
							flag = true;
							break;
						}
					}
					if(!flag){
						menuSaveArr.push(rowData[i].menuId);
					}
				}
			var obj = {
					"functionDTO": {"id": rowData[i].functionList},
					"menuId": rowData[i].menuId,
					"canAdd": rowData[i].canAdd,
					"canEdit": rowData[i].canEdit,
					"canDelete": rowData[i].canDelete,
					"canExport" : rowData[i].canExport,
					"canPrint" : rowData[i].canPrint,
					"canAdjustVoucherPosting" : rowData[i].canAdjustVoucherPosting,
					"canSearch" : rowData[i].canSearch
			}
			roleLineArray.push(obj);
		}
	}
	saveRoleObj.name = roleCode;
	saveRoleObj.description = roleName;
	saveRoleObj.menuDto = menuDtoArray;
	saveRoleObj.roleFunctionList = roleLineArray;

	saveRoleObj.isStoreHead = $("#isStoreHead").prop("checked")?"true":"false";
	saveRoleObj.isCashier = $("#isCashier").prop("checked")?"true":"false";
	saveRoleObj.isSalesExecutive = $("#isSalesExecutive").prop("checked")?"true":"false";
	saveRoleObj.isSupervisor = $("#isSupervisor").prop("checked")?"true":"false"
	
	var uniqueArray = menuSaveArr.sort(function(a, b){return a - b});
	menuList = menuList.sort(function(a, b){return a - b});
	console.log(uniqueArray)
	console.log(menuList)
	if(uniqueArray.length!=menuList.length){
		$.growl.error({ message: "Function name is missing", duration: 5000, title: 'Error' });
		return false;
	}else{
		for(var i=0;i<uniqueArray.length;i++){			
			if(uniqueArray[i]!=parseInt(menuList[i])){
				$.growl.error({ message:"Menu name is missing", duration: 5000, title: 'Error' });
				return false
			}						
		}
	}
	console.log(JSON.stringify(saveRoleObj));
	
	postJSON('/OrderExecution/api/v1/createRole', JSON.stringify(saveRoleObj), function(data) {
		if(data.resCode == 1 && typeof data != "undefined"){
			$.growl.notice({ message: data.mesgStr, duration: 5000, title: 'Success' });
			$('#createRoleDet').modal('hide');
		}else{
			$.growl.error({ message: data.mesgStr, duration: 5000, title: 'Error' });
		}
	});
	
});

var menuArr = [];

// Role Search code #######################
var editRoleDetails = function(value)
{
	$("#EditsaveRoleDet").prop('disabled', false);
	$("#editAssignRoles").empty().append();
	$.getJSON('/OrderExecution/api/v1/getRoleById?roleId='+ value,function(data){
		var res = data.payload.roleFunction;
		var dataVal = res.roleFunctionList;
		$("#roleIdE").val(res.id);
		$("#rcompanyNameE").val(res.company.compName);
		$("#roleCodeE").val(res.name);
		$("#roleNameE").val(res.description);
		$("#roleEditId").val(res.id);
		$("#roleE").val(res.company.id);
		
		if(res.oeOrSale == "OE"){
			$("#meduleNameE").val('Order Execution');
		}else{
			$("#meduleNameE").val('Sales');
		}
		
		$("#isStoreHeadE").prop("checked",res.isStoreHead);
		$("#isCashierE").prop("checked",res.isCashier);
		$("#isSalesExecutiveE").prop("checked",res.isSalesExecutive);
		$("#isSupervisorE").prop("checked",res.isSupervisor);
		var dataValArr = [];
		var menuArray = res.menuDto;
		for(var i=0; i<menuArray.length; i++){
			menuArr.push(menuArray[i].id);
		}
		updateMenuDto(res.oeOrSale,menuArr);
		
		for(var j=0; j<dataVal.length; j++){
			var obj = {
					"id" : dataVal[j].id,
					"menuId" : dataVal[j].menuId,
					"functionList" : dataVal[j].functionDTO.id,
					"functionLists" : dataVal[j].functionDTO.description,
					"slNo":j+1,					
					"isFlag" : false,		
					"canAdd" : (dataVal[j].canAdd == true) ? "Yes" : "No",
					"canEdit" : (dataVal[j].canEdit == true) ? "Yes" : "No",
					"canDelete" : (dataVal[j].canDelete == true) ? "Yes" : "No",
					"canExport" : (dataVal[j].canExport == true) ? "Yes" : "No",
					"canPrint" : (dataVal[j].canPrint == true) ? "Yes" : "No",
					"canAdjustVoucherPosting" : (dataVal[j].canAdjustVoucherPosting == true) ? "Yes" : "No",
					"canSearch" : (dataVal[j].canSearch == true) ? "Yes" : "No"
			}
			dataValArr.push(obj);
		}
		
		roleMasterGridEdit(dataValArr);
		$("#jqxgridRoleE").show();
	});
}

var editRole = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editRoleDet"  type="button" id='
			+ row + ' onclick="editRoleDetails('+ value	+ ')"/><i class="fa fa-pencil fa-sm"></i></button>';
}

var roleSearchgrid = function(){
	var updateRows = function(row, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'roleCode',
		'type' : 'string',
		'map' : 'name'
	}, {
		'name' : 'roleName',
		'type' : 'string',
		'map' : 'description'
	}, {
		'name' : 'roleIdS',
		'type' : 'int',
		'map': 'id'
	}];

	var columns = [ {
		'text' : 'Role Code',
		'datafield' : 'roleCode',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : 'Role Name',
		'datafield' : 'roleName',
		'width' : '50%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		text : '',
		datafield : 'roleIdS',
		editable : false,
		cellsrenderer : editRole,		
		sortable : true,
		'width' : '5%',
		 filterable: false 
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchRole", "list", columns,roleDetailsVal(), updateRows);
	
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true 
	});
}

var onloadFunctionAddEditPage = function(row, cellvalue,editor){
	
		var json = [
			{"id" : true, "name" : "Yes"},
			{"id" : false, "name" : "No"}
		];
		
		editor.jqxDropDownList({
			source : json,  displayMember : 'name', valueMember : 'id'
		});
	
}

//On load Function List
var onloadFunctionEditPage = function(row, cellvalue,	editor) {
	console.log(cellvalue);
	editor.on('click', function(event){	
		checkValidateE();
		editor.jqxDropDownList({
			placeHolder: "--Select Function--",
			source : functionArrayE, 
			displayMember : 'description', 
			valueMember : 'id',
			dropDownHorizontalAlignment: 'top',
			animationType: 'slide',
			filterable: true,
		});	
	});
	
}

var updateOnchangeFunctionEdit = function(row, datafield, columntype, oldvalue, newvalue, event){
	var rowdata = $("#jqxgridRoleE").jqxGrid('getrows');
	for(var i=0;i<rowdata.length;i++){
		if(rowdata[i].functionList == newvalue.value){
			$.growl.error({ message: newvalue.label+" function name already exist", duration: 5000, title: 'Error' });
			$("#jqxgridRoleE").jqxGrid("setcellvalue", row, "functionList","");
			$("#jqxgridRoleE").jqxGrid("setcellvalue", row, "functionLists","");
			return false;
		}		
	}
	$.each(functionArrayE, function(k, v){
		if(v.id == newvalue.value){
			$("#jqxgridRoleE").jqxGrid("setcellvalue", row, "menuId",v.menuDto.id);
		}
	});
	$("#jqxgridRoleE").jqxGrid("setcellvalue", row, "functionList",newvalue.value);
	$("#jqxgridRoleE").jqxGrid("setcellvalue", row, "functionLists",newvalue.label);
}


var generaterowT = function(i) {
	var row = {};
	row["slNo"] = i;
	row["id"] = null;
	row["functionList"] = "";
	row["menuId"] = "";
	row["canAdd"] = "";
	row["canEdit"] = "";
	row["canDelete"] = "";
	row["canExport"] = "";
	row["canPrint"] = "";
	row["canAdjustVoucherPosting"] = "";
	row["canSearch"] = "";
	return row;
}



var functionArrayE = [];
var checkValidateE = function(){
	var menuName = $("#menuNameEObj").val();
	var menuList = menuName;
	
	$.getJSON('/OrderExecution/api/v1/findFunction?menuId='+menuList, function(data) {
		if(data.resCode == 1 && typeof data != "undefined"){
			$("#bottomSection").show();
			functionArrayE = data.payload.functions;		
		}else{
			functionArrayE = [];
		}
	});
}


$("#addRoleE").on('click',function(){	
	var rowscount = $("#jqxgridRoleE").jqxGrid('getdatainformation').rowscount;
	if (rowscount == 0) {var rowId = 1;} else {	var rowId = rowscount + 1;}
	var datarow = generaterowT(rowId);
	var commit = $("#jqxgridRoleE").jqxGrid('addrow', null, datarow);	
	checkValidateE();
	var boundindex = $('#jqxgridRoleE').jqxGrid('getrowboundindex', rowId-1);
	$("#jqxgridRoleE").jqxGrid('selectrow', boundindex);
	$("#jqxgridRoleE").jqxGrid('ensurerowvisible', boundindex);
});

var deleteRowE = function(row){	
	var rowscount = $("#jqxgridRoleE").jqxGrid('getdatainformation').rowscount;	
	var id = $("#jqxgridRoleE").jqxGrid('getrowid',row);
	var commit = $("#jqxgridRoleE").jqxGrid('deleterow', id);
	setTimeout(function () {
		$('#jqxgridRoleE').jqxGrid('selectrow', (rowscount - 2));
		$('#jqxgridRoleE').jqxGrid('ensurerowvisible', (rowscount - 2));
	}, 0);
}

var deleteRowServer = function(value, row){
	$.getJSON('/OrderExecution//api/v1/deAssignFunction?rfId='+value , function(data) {
		if(data.resCode == 1){
			$.growl.notice({ message: data.mesgStr, duration: 5000, title: 'Success' });
			var id = $("#jqxgridRoleE").jqxGrid('getrowid', row);
			$("#jqxgridRoleE").jqxGrid('deleterow', id);
		}else{
			$.growl.error({ message: data.mesgStr, duration: 5000, title: 'Error' });
		}
	});
}

var checkEditable = function(row, datafield, columntype){
	var id =  $('#jqxgridRoleE').jqxGrid('getcellvalue', row, 'id');
	$('#jqxgridRoleE').jqxGrid('setcellvalue', row, 'isFlag', true);
	if(id == null || id == ""){
		return true;
	}else{
		if(datafield == "functionList"){
			return false;
		}
		return true;
	}
}

// Edit Role Function
var roleMasterGridEdit = function(data) {

	var source = {
			datafields : [ 
				{name : 'slNo',	type : 'int'},
				{name : 'id',	type : 'int'},
				//{name : 'functionList',	type : 'string'},
				{name : 'menuId',	type : 'int'}, 
				{
					name : 'functionList',
					value : 'functionList'
				},
				{
					name : 'functionLists',
					value : 'functionLists'
				},
				
				{name : 'isFlag',	type : 'bool'},
				{name : 'canAdd',	type : 'string'},
				{name : 'canEdit',	type : 'string'},
				{name : 'canDelete',	type : 'string'},
				{name : 'canExport',	type : 'string'},
				{name : 'canPrint',	type : 'string'},
				{name : 'canAdjustVoucherPosting',	type : 'string'},
				{name : 'canSearch',	type : 'string'},
				{
					name : 'canAddN',
					value : 'canAdd'
				},
				{
					name : 'canEditN',
					value : 'canEdit'
				},
				{
					name : 'canDeleteN',
					value : 'canDelete'
				},
				{
					name : 'canExportN',
					value : 'canExport'
				},
				{
					name : 'canPrintN',
					value : 'canPrint'
				},
				{
					name : 'canAdjustVoucherPostingN',
					value : 'canAdjustVoucherPosting'
				},
				{
					name : 'canSearchN',
					value : 'canSearch'
				}
				],
				localdata : data,
				deleterow : function(rowid, commit) {
					commit(true);
			},
		};
		var dataAdapter = new $.jqx.dataAdapter(source,
                {
            formatData: function (data)
            {
                data.name_startsWith = $("#searchField").val();
                return data;
            }
        });
		 var emptySource = true;
		$("#jqxgridRoleE").jqxGrid({
			source : dataAdapter,			
			width : '100%',
			editable : true,
			autorowheight : false,
			autoheight : false,
		    filterable: true,
			height: '300px',
			columnsheight : 30,
			theme: 'energyblue',
			altRows : true,
			columnsresize : true,
			selectionmode : 'singlecell',
			/*showtoolbar: true,
			rendertoolbar: function (toolbar)
			{
				var me = this;
				var container = "";
				container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				  
				container.append("<div class='col-md-4 row'><input class='jqx-input jqx-widget-content jqx-rc-all' id='searchField' type='text' style='height: 23px; float: left; width: 223px;' /></div>");
				$inputVal = $("#searchField");
				console.log($inputVal);
				    var oldVal = "";
				    $inputVal.on('keyup', function (event)
                		    {
                		        if (emptySource === false && $inputVal.val().length === 0)
                		        {
                		            $("#jqxgridRoleE").jqxGrid({ source: [] });
                		        }
                		        if ($inputVal.val().length >= 1)
                		        {
                		            if (emptySource === true)
                		            {
                		                $("#jqxgridRoleE").jqxGrid({ source: dataAdapter.records });
                		                emptySource = false;
                		            }
                		            if (me.timer)
                		            {
                		                clearTimeout(me.timer);
                		            }
                		            if (oldVal != $inputVal.val())
                		            {
                		                me.timer = setTimeout(function ()
                		                {
                		                    $("#jqxgridRoleE").jqxGrid('updatebounddata');
                		                }, 1000);
                		                oldVal = $inputVal.val();
                		            }
                		        }
                		    });
             },
 			*/
 			columns : [  
				{text : 'Sl.No', datafield : 'slNo', width : '5%', cellsalign : 'center', align : 'center',editable : false},
				{text : '', datafield : 'id', width : '8%', cellsalign : 'center', align : 'center',editable : false, hidden: true},
				{text : '', datafield : 'isFlag', width : '8%', cellsalign : 'center', align : 'center',editable : false, hidden: true},
				{text : '', datafield : 'menuId', width : '8%', cellsalign : 'center', align : 'center',editable : false, hidden: true},
				{text : '', datafield : 'actionListVal', width : '8%', cellsalign : 'center', align : 'center',editable : false, hidden: true},
				{text : 'Function Name', datafield : 'functionList', width : '26%', cellsalign : 'left',initeditor : onloadFunctionEditPage,cellvaluechanging: updateOnchangeFunctionEdit, align : 'center',displayfield : 'functionLists', columnType : 'dropdownlist',editable : true,cellbeginedit : checkEditable},
				{text : 'Add(Y/N)', datafield : 'canAdd', width : '7%', cellsalign : 'center',createeditor : onloadFunctionAddEditPage,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canAddN', columnType : 'dropdownlist',editable : true,cellbeginedit : checkEditable},
				{text : 'Edit(Y/N)', datafield : 'canEdit', width : '7%', cellsalign : 'center',createeditor : onloadFunctionAddEditPage,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canEditN', columnType : 'dropdownlist',editable : true,cellbeginedit : checkEditable},
				{text : 'Delete(Y/N)', datafield : 'canDelete', width : '7%', cellsalign : 'center',createeditor : onloadFunctionAddEditPage,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canDeleteN', columnType : 'dropdownlist',editable : true,cellbeginedit : checkEditable},
				{text : 'Search(Y/N)', datafield : 'canSearch', width : '8%', cellsalign : 'center',createeditor : onloadFunctionAddEditPage,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canSearchN', columnType : 'dropdownlist',editable : true,cellbeginedit : checkEditable},
				{text : 'Export(Y/N)', datafield : 'canExport', width : '8%', cellsalign : 'center',createeditor : onloadFunctionAddEditPage,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canExportN', columnType : 'dropdownlist',editable : true,cellbeginedit : checkEditable},
				{text : 'Print(Y/N)', datafield : 'canPrint', width : '10%', cellsalign : 'center',createeditor : onloadFunctionAddEditPage,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canPrintN', columnType : 'dropdownlist',editable : true,cellbeginedit : checkEditable},
				{text : 'Adjust Voucher Posting(Y/N)', datafield : 'canAdjustVoucherPosting', width : '20%', cellsalign : 'center',createeditor : onloadFunctionAddEditPage,cellvaluechanging: updateOnchangeAddEdit, align : 'center',displayfield : 'canAdjustVoucherPostingN', columnType : 'dropdownlist',editable : true,cellbeginedit : checkEditable},,
				{text : 'Action',datafield : 'Delete','width' : '2%',cellsalign:'center',align:'center',formatoptions: {editbutton:false,delbutton:false},editable: false,cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue){
						var rowId = $("#jqxgridRoleE").jqxGrid("getcellvalue", row,"id");
						if(typeof rowId == "undefined" || rowId == null){
							return  "<button onclick='deleteRowE("+row+")' type='button' class='btn btn-danger btn-sm text-center'><i class='fa fa-trash-o fa-md'></i></button>";
						}else{					
							return  "<button onclick='deleteRowServer("+rowId+", "+row+")'  type='button' class='btn btn-danger btn-sm text-center'><i class='fa fa-trash-o fa-md'></i></button>";
						}
					
					}
				}
				]
		});	
}

$("#EditsaveRoleDet").on('click', function(){
	trimmer();
	
	var roleCode = $("#roleCodeE").val();
	var roleName = $("#roleNameE").val();
	var menuList = $("#menuNameEObj").val();
	var saveRoleObj = {"roleFunctionList" : []};
	var roleIdE = $("#roleIdE").val();
	var roleLineArray = [];
	var menuDtoArray = [];
	var menuSaveArr = [];
	for(i=0; i < menuList.length; i++){
		var obj = {"id" : menuList[i]};
		menuDtoArray.push(obj);
	}
	
	var rowData = $("#jqxgridRoleE").jqxGrid("getrows");
	if(typeof rowData != "undefined"){
		for(var i=0; i<rowData.length; i++){			
				if(menuSaveArr.length == 0){
					menuSaveArr.push(rowData[i].menuId);
				}
				else{
					var flag = false;
					for(var j=0 ; j<menuSaveArr.length ; j++){
						if(rowData[i].menuId == menuSaveArr[j])
						{
							flag = true;
							break;
						}
					}
					if(!flag){
						menuSaveArr.push(rowData[i].menuId);
					}
				}
				if(rowData[i].isFlag == true){
					var obj = {
							"id" : rowData[i].id,
							"functionDTO": {"id": rowData[i].functionList},
							"menuId": rowData[i].menuId,
							"canAdd": (rowData[i].canAddN == "Yes")?true:false,
							"canEdit": (rowData[i].canEditN == "Yes")?true:false,
							"canDelete": (rowData[i].canDeleteN == "Yes")?true:false,
							"canExport" : (rowData[i].canExportN == "Yes")?true:false,
							"canPrint" : (rowData[i].canPrintN == "Yes")?true:false,
							"canAdjustVoucherPosting" : (rowData[i].canAdjustVoucherPostingN == "Yes")?true:false,
							"canSearch" : (rowData[i].canSearchN == "Yes")?true:false
					}
					roleLineArray.push(obj);
				}
		}	
	}
	
	saveRoleObj.isStoreHead = $("#isStoreHeadE").prop("checked")?"true":"false";
	saveRoleObj.isCashier = $("#isCashierE").prop("checked")?"true":"false";
	saveRoleObj.isSalesExecutive = $("#isSalesExecutiveE").prop("checked")?"true":"false";
	saveRoleObj.isSupervisor = $("#isSupervisorE").prop("checked")?"true":"false"
	saveRoleObj.id = roleIdE;
	saveRoleObj.name = roleCode;
	saveRoleObj.description = roleName;
	saveRoleObj.menuDto = menuDtoArray;
	saveRoleObj.roleFunctionList = roleLineArray;
	//var uniqueArray = $.uniqueSort(menuSaveArr); 
	var uniqueArray = menuSaveArr.sort(function(a, b){return a - b});
	menuList = menuList.sort(function(a, b){return a - b});
	if(uniqueArray.length!=menuList.length){
		$.growl.error({ message: "Function name is missing", duration: 5000, title: 'Error' });
		return false;
	}else{
		for(var i=0;i<uniqueArray.length;i++){			
			if(uniqueArray[i]!=parseInt(menuList[i])){
				$.growl.error({ message:"Menu name is missing", duration: 5000, title: 'Error' });
				return false
			}						
		}
	}
	
	postJSON('/OrderExecution/api/v1/updateRoleFunction ', JSON.stringify(saveRoleObj), function(data) {
		if(data.resCode == 1 && typeof data != "undefined"){
			$.growl.notice({ message: data.mesgStr, duration: 5000, title: 'Success' });
			$('#editRoleDet').modal('hide');
		}else{
			$.growl.error({ message: data.mesgStr, duration: 5000, title: 'Error' });
		}
	});
	
});

$('#createRoleDet').on('hidden.bs.modal', function() {	
	$("form").trigger("reset");
	$('#jqxgridRole').jqxGrid('clear');
	var rows = $("#jqxgridRole").jqxGrid('getrows');
	for(var i=0; i<rows.length; i++){
        var id = $("#jqxgridRole").jqxGrid('getrowid', i);
		$("#jqxgridRole").jqxGrid('deleterow', id);
	}
});