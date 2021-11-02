/**
 * Developer UI : Dipankar
 * Developer Server : Nagesh
 */
$("#assignAuthRoleGridSec").hide();
$("#assignAuthRoleGrid").hide();

$("#create").on('click',function(){
	$("#saveAuthRole").prop('disabled',true);
	$("#assignAuthRoleGrid").hide();
});

var onloadApi = function(resp){
	$("#authType").empty().append('<option value="" selected>--Select--</option>');
	$("#storeDC").empty().append('<option value="" selected>--Select--</option>');
	
	$("#authTypeC").empty().append('<option value="" selected>--Select--</option>');
	$("#storeDCC").empty().append('<option value="" selected>--Select--</option>');
	
	
	$.getJSON('/OrderExecution/api/v1/authorizationRoleLOVs', function(data) {
		var authTypeDet = data.payload.authTypes;
		var storeDCDet = data.payload.storeOrDcType;
		var role = data.payload.role;
		if(resp == null){
			$.each(authTypeDet, function(key, val) {
				$("#authType").append('<option  value="' + val.id + '">' + val.name + '</option>');
				$("#authTypeC").append('<option  value="' + val.id + '">' + val.name + '</option>');
			});
			
			$.each(storeDCDet, function(key, val) {
				$("#storeDC").append('<option value="' + val.id + '">' + val.name + '</option>');
				$("#storeDCC").append('<option value="' + val.id + '">' + val.name + '</option>');
			});
			
			var o = '<select id="roleCObj"  name="roleCObj" class="form-control" multiple="multiple">';
			$.each(data.payload.role, function(key, val) {
				o += '<option value="' + val.id + '" code="' + val.name + '">' + val.description + '</option>'; 
			});
			
			o += '</select>';
			
			$("#roleC").html(o);
			
			$('#roleCObj').multiselect({
				includeSelectAllOption : false,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
		}else{

			$("#authTypeE").val(resp.code);
			$("#storeDCE").val(resp.storeOrDCType);
			$("#authTypeCodeE").val(resp.description);
			$("#authRoleId").val(resp.id);
			
			var oE = '<select id="roleCObjE"  name="roleCObjE" class="form-control" multiple="multiple">';
			var result = [];
			$.each(role, function(key, val) {
				$.each(resp.details, function(k, v) {
					if(v.role.id == parseInt(val.id)){
						result.push(parseInt(val.id));
						oE += '<option selected disabled value="' + val.id + '" code="isActive">' + val.description + '</option>';
					}				
					
				});
				if ($.inArray( parseInt(val.id), result ) == -1){
					result.push(parseInt(val.id));
					 oE += '<option  value="' + val.id + '" code="' + val.name + '">' + val.description + '</option>';
					
				}
			});
			
			oE += '</select>';
			
			$("#roleE").html(oE);
			
			$('#roleCObjE').multiselect({
				includeSelectAllOption : false,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
		}
	});
}

onloadApi(null);

var redirect = function() {
	window.location.href = "javascript:showContentPage('assignAuthRole', 'bodySwitcher')";
	return window.location.href;
}

var assignAuthRoleGrid = function(data){
	var source = {
		datafields : [ 
			{name : 'authCode', type : 'string'}, 
			{name : 'codeName',	type : 'string'}, 
			{name : 'role', type : 'string'}, 
			{name : 'roleId',	type : 'int'},
			{name : 'storeDC',	type : 'string'}, 
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},

	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#assignAuthRoleGrid").jqxGrid({
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
			container.append('<div class="col-md-4 pull-left"><i class="fa fa-list fa-md"></i>&nbsp; Assign Authorization Role</div><div class="pull-right">(select row to delete)&nbsp;<div  id="deleteAuthRowbutton" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
			
			$("#deleteAuthRowbutton").jqxButton();
	
			$("#deleteAuthRowbutton").on('click', function() {
				debugger;
				
				var selectedrowindex = $("#assignAuthRoleGrid").jqxGrid('getselectedrowindex');
				var rowscount = $("#assignAuthRoleGrid").jqxGrid('getdatainformation').rowscount;
				
				if(selectedrowindex == -1){
					$.growl.error({
						message : "Please Select Row to be Deleted",
						duration  : "1000",
						title : "Error"
					});
					return false;
				}
				
				if ( selectedrowindex >=0 && selectedrowindex < rowscount) {
					var id = $("#assignAuthRoleGrid").jqxGrid('getrowid', selectedrowindex);
					$("#assignAuthRoleGrid").jqxGrid('deleterow',selectedrowindex);
				}
				
				for (var i = 0; i < rowscount; i++) {
					$("#assignAuthRoleGrid").jqxGrid("setcellvalue", i, "slNo", i + 1);
				}
				
			});
		},
		columns : [ 
			{text : 'Authorization Code',datafield : 'authCode',	width : '25%',cellsalign : 'center',align : 'center', editable : false}, 
			{text : 'Code Name',datafield : 'codeName',width : '25%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Role',datafield : 'role',width : '25%',	cellsalign : 'center',align : 'center',	editable : false}, 
			{text : 'Store/DC',datafield : 'storeDC',	width : '25%',cellsalign : 'center',align : 'center',editable : false},
			{text : '',datafield : 'roleId',	width : '25%',hidden : true}
		]
	});
}

var disabledColoumns =  function(row, editor) {
	var flag = $("#assignAuthRoleGridE").jqxGrid('getcellvalue', row, 'flag');
	console.log(flag);
	if(flag == false){		
		editor.jqxDropDownList('disableItem', row);
	}else{
		return true;
	}
}

var assignAuthRoleGridE = function(data){
	var statusSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : statusArr
		};
	var statusDataAdapterE = new $.jqx.dataAdapter(statusSource, {autoBind : true});
	
	
	var source = {
		datafields : [ 
			{name : 'authCode', type : 'string'}, 
			{name : 'codeName',	type : 'string'}, 
			{name : 'role', type : 'string'}, 
			{name : 'roleId',	type : 'int'},
			{name : 'storeDC',	type : 'string'},
			{name : 'status',	type : 'bool'},
			{
				name : 'statuss',
				value : 'status',
				values : {
					source : statusDataAdapterE.records,
					value : 'id',
					name : 'name'
				}
			},
			{name : 'id',	type : 'int'},
			{name : 'flag',	type : 'bool'}
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},

	};
	
	var loadDropDownStatus = function(row, cellvalue, editor){		
		editor.on('click', function(){
			editor.jqxDropDownList({
				source : statusArr, displayMember : 'name', valueMember : 'id'
			});
		})
	}

	
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#assignAuthRoleGridE").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		theme: 'energyblue',
		columnsheight : 50,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		rendertoolbar : function(toolbar) {
			var me = this;
		},
		columns : [ 
			{text : 'Authorization Code',datafield : 'authCode',	width : '25%',cellsalign : 'center',align : 'center', editable : false}, 
			{text : 'Code Name',datafield : 'codeName',width : '25%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Role',datafield : 'role',width : '15%',	cellsalign : 'center',align : 'center',	editable : false}, 
			{text : 'Store/DC',datafield : 'storeDC',	width : '25%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Status',datafield : 'status',columntype : 'dropdownlist',displayfield : 'statuss',	width : '10%',cellsalign : 'center',align : 'center',createeditor : loadDropDownStatus, cellbeginedit: disabledColoumns},
			{text : '',datafield : 'flag',hidden : true},
			{text : '',datafield : 'roleId',hidden : true},
			{text : '',datafield : 'id',hidden : true}
		]
	});
}

var statusArr = [{
	"id" : true, "name" : "Active"
},{
	"id" : false, "name" : "In-Active"
}]
var detailsVal;
var viewAssignRole = function(value,row){
	$('#roleCObjE').multiselect("clearSelection");
	
	$("#assignAuthRoleGrid").jqxGrid('clear');
	
	var code = $("#jqxGrid").jqxGrid('getcellvalue', row,'code');
	var description = $("#jqxGrid").jqxGrid('getcellvalue', row,'description');
	
	$.getJSON('/OrderExecution/api/v1/getAuthRoleById?id='+value, function(data) {
		if(typeof data != "undefined" && data.resCode == 1){
			var resp = data.payload.header;
			detailsVal = resp.details;
			var data = generateDataED(resp.description,resp.code,resp.storeOrDCType,resp.details);
			console.log(data);
			assignAuthRoleGridE(data);
			onloadApi(resp);
		}else{
			$.growl.error({ message : data.mesgStr, duration : 2000, title : 'Error'});
			 return false;
		}
	});
	
}

//Search Assign Authorization Role
var searchAssignAuthRoleGrid = function(data){
	
	var viewEdit = function(row, column, value){
		return '<button  id='+ row + ' onclick="viewAssignRole('+ value +','+ row +')" style="margin-left:6px; margin-top:6px;" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewAssignRole"  type="button" /><i class="fa fa-eye fa-md"></i></button>';
	}
	
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{name : 'code',	type : 'string'},
			{name : 'description', type : 'string'},
			{name : 'storeOrDCType', type : 'string'},
			{name : 'createdDate', type : 'string'},
			{name: 'actionId', type: 'int', map: 'id'}
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxGrid").jqxGrid({
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
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Assign Authorization Role Search Listing');
			
		},
		
		columns : [
			{text : 'Authorization Code', datafield : 'code', width : '24%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Code Name', datafield : 'description', width : '24%', cellsalign : 'center', align : 'center',editable : false},			
			{text : 'Store/DC', datafield : 'storeOrDCType', width : '24%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Created Date', datafield : 'createdDate', width : '24%', cellsalign : 'center', align : 'center',editable : false,cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},
			{text : '', datafield : 'actionId', width : '4%', cellsalign : 'center', align : 'center', editable : false, cellsrenderer : viewEdit},
		]
	});
	
}

var generateData = function(authTypeC,storeDCC,roleC){
	var codeName = $("#authTypeC option:selected").text();
	var roleArr = [];
	$.each(roleC, function(k,v){
		var obj = {
				"authCode" : authTypeC,
				"codeName" : codeName,
				"storeDC" : storeDCC,
				"role" : v.label,
				"roleId" : v.value
		}
		roleArr.push(obj);
	});
	return roleArr;
}
var generateDataED = function(authTypeE,authTypeCodeE,storeDCE,roleE){
	var roleArrE = [];
	console.log(roleE);
	$.each(roleE, function(k,v){
		var objE = {
				"authCode" : authTypeCodeE,
				"codeName" : authTypeE,
				"storeDC" : storeDCE,
				"role" : v.role.description,
				"roleId" : v.role.id,
				"id" : v.id,
				"status" : (v.isActive == true) ? true : false,
				"statuss" : (v.isActive == true) ? "Active" : "In-Active",
				"flag" : true
		}
		roleArrE.push(objE);
	});
	return roleArrE;
}

var generateDataE = function(authTypeE,authTypeCodeE,storeDCE,roleE){
	var roleArrE = [];
	$.each(roleE, function(k,v){
		var  detId = $("#assignAuthRoleGridE").jqxGrid('getcellvalue', k, 'id');
		var  status = $("#assignAuthRoleGridE").jqxGrid('getcellvalue', k, 'status');
		var objE = {
				"authCode" : authTypeE,
				"codeName" : authTypeCodeE,
				"storeDC" : storeDCE,
				"role" : v.label,
				"roleId" : v.value,
				"id" : (detId == null || detId == "" || typeof detId == "undefined") ? null : detId,
				"status" : (detId == null || detId == "" || typeof detId == "undefined") ? true : (status == true) ? true : false,
				"statuss" :  (detId == null || detId == "" || typeof detId == "undefined") ? "Active" :  (status == true) ? "Active" : "In-Active",
				"flag" : (detId == null || detId == "" || typeof detId == "undefined") ? false : true,
		}
		roleArrE.push(objE);
	});
	return roleArrE;
}

$("#continueC").on('click', function(){
	var authTypeC = $("#authTypeC").val();
	var storeDCC = $("#storeDCC").val();
	var roleC = $("#roleC option:selected");
	
	if(authTypeC == "" && authTypeC == "" && authTypeC == ""){
		$("#authTypeC").prop('disabled', false);
		$("#storeDCC").prop('disabled', false);
		 $.growl.error({ message : "Please Select mandatory fields!", duration : 500, title : 'Error'});
		 return false;
	}else{
		$("#assignAuthRoleGridSec").show();
		$("#assignAuthRoleGrid").show();
		$("#authTypeC").prop('disabled', true);
		$("#storeDCC").prop('disabled', true);
		var data = generateData(authTypeC,storeDCC,roleC);
		assignAuthRoleGrid(data);
		$("#saveAuthRole").prop('disabled',false);
	}
});

$("#continueE").on('click', function(){
	var authTypeE = $("#authTypeE").val();
	var authTypeCodeE = $("#authTypeCodeE").val();
	var storeDCE = $("#storeDCE").val();
	var roleE = $("#roleE option:selected");
	
	if(authTypeE == "" && authTypeE == "" && authTypeE == ""){
		 $.growl.error({ message : "Please Select mandatory fields!", duration : 500, title : 'Error'});
		 return false;
	}else{
		$("#assignAuthRoleGridSecE").show();
		$("#assignAuthRoleGridE").show();
		var data = generateDataE(authTypeE,authTypeCodeE,storeDCE,roleE);
		assignAuthRoleGridE(data);
	}
});

var checkFilters = function(){
	var authType = $("#authType").val();
	var storeDC = $("#storeDC").val();
	var fieldFilters = {"fieldFilters" : {}};
	if(authType != "" && authType != null){
		fieldFilters.fieldFilters['code'] = authType;
	}
	if(storeDC != "" && storeDC != null){
		fieldFilters.fieldFilters['storeOrDCType'] = storeDC;
	}
	
	return fieldFilters;
}

$("#search").on('click', function(){
	var authType = $("#authType").val();
	if(authType == null || authType == ""){
		$.growl.error({	message : "Please select mandatory field!", duration : 500,title : 'Error'});
		$("#jqxGrid").hide();
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/searchAuthRoles', JSON.stringify(checkFilters()), function(data) {
			if(typeof data != "undefined" && data.resCode == 1){				
				searchAssignAuthRoleGrid(data.payload.list);
				$("#jqxGrid").show();
			}else{
				searchAssignAuthRoleGrid();
				$("#jqxGrid").show();
			}
		});
		
	}
	
});

$("#clearAll").on('click', function(){
	redirect();
});

$("#create").on('click', function(){
	$('#roleCObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();
	$("#authTypeC").prop('disabled', false);
	$("#storeDCC").prop('disabled', false);
	
	$("#assignAuthRoleGrid").jqxGrid('clear');
	onloadApi(null);
});


$("#clearC").on('click', function(){
	$('#roleCObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();
	$("#authTypeC").prop('disabled', false);
	$("#storeDCC").prop('disabled', false);
	
	$("#assignAuthRoleGrid").jqxGrid('clear');
	$("#assignAuthRoleGrid").hide();
	$("#saveAuthRole").prop('disabled',true);
});

var createAuthRoleObj = function(){
	var rows = $("#assignAuthRoleGrid").jqxGrid('getrows');

	var authType = $("#authTypeC").val();
	var storeDC = $("#storeDCC").val();
	var codeName = $("#authTypeC option:selected").text();
	
	var createArray = {
			"details" : []
		};
	
	var detailsArr = [];
	if(typeof rows != "undefined" && rows.length > 0){
		for(var i=0; i<rows.length; i++){
			var object = {
					"role" : {"id" : rows[i].roleId},
					"isActive" : true
			}
			detailsArr.push(object);
		}
	}
	
	createArray.code = authType;
	createArray.description = codeName;
	createArray.storeOrDCType = storeDC;
	createArray.details = detailsArr;
	
	return createArray;
}

var updateAuthRoleObj = function(){
	var rows = $("#assignAuthRoleGridE").jqxGrid('getrows');
	var authType = $("#authTypeE").val();
	var storeDC = $("#storeDCE").val();
	var codeName = $("#authTypeCodeE").val();
	var authRoleId = $("#authRoleId").val();
	
	var createArray = {
			"details" : []
		};
	
	var detailsArrE = [];
	if(typeof rows != "undefined" && rows.length > 0){
		console.log(rows);
		for(var i=0; i<rows.length; i++){
			var objectE = {
					"id" : rows[i].id,
					"role" : {"id" : rows[i].roleId},
					"isActive" :rows[i].status
					//"status" : rows[i].status
			}
			detailsArrE.push(objectE);
		}
	}
	
	createArray.id = parseInt(authRoleId);
	createArray.code = authType;
	createArray.description = codeName;
	createArray.storeOrDCType = storeDC;
	createArray.details = detailsArrE;
	
	return createArray;
}

$("#saveAuthRole").on('click', function(){
	var gridData = createAuthRoleObj();
	if(gridData.details.length == 0){
		$.growl.error({
			message : "Please Fill Grid Details !!!",
			duration : 10000,
			error : 'error'
		})
		return false;
	}
	else{
	 postJSON('/OrderExecution/api/v1/createAuthRole', JSON.stringify(createAuthRoleObj()), function(data) {
		if(typeof data != "undefined" && data.resCode == 1){
			 $.growl.notice({ message : data.mesgStr, duration : 2000, title : 'Success'});
			 $("#createAuthRole").modal('hide');
			 return false;
		}else{
			$.growl.error({ message : data.mesgStr, duration : 2000, title : 'Error'});
			 return false;
		}
	});
}

});

$("#saveAuthRoleE").on('click', function(){
	console.log(JSON.stringify(updateAuthRoleObj()));
	postJSON('/OrderExecution/api/v1/updateAuthRole', JSON.stringify(updateAuthRoleObj()), function(data) {
		if(typeof data != "undefined" && data.resCode == 1){
			 $.growl.notice({ message : data.mesgStr, duration : 2000, title : 'Success'});
			 $("#viewAssignRole").modal('hide');
			 return false;
		}else{
			$.growl.error({ message : data.mesgStr, duration : 2000, title : 'Error'});
			 return false;
		}
	});
});