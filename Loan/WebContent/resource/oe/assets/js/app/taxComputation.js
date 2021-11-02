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

/*var id = $('#vendorId').val();
$.getJSON('/OrderExecution/api/v1/getVendorGst?vId=' + id, function(data) {
	taxComputationEditGrid(data.payload.VendorGst);	
});
//$("#jqxgridC").show();
*/

$("#taxDetailsEdit").on('click',function(){	
	taxTabFlag = true;
	var id = $('#vendorId').val();
	$.getJSON('/OrderExecution/api/v1/getVendorGst?vId=' + id, function(data) {
		taxComputationEditGrid(data.payload.VendorGst);	
	});
	
	var isRegE = $("#isVendRegisteredE").val();
	if(isRegE == "Yes"){
		$("#isVendRegisteredE").prop('disabled', true);
		$("#vendRegShow").hide();
		$("#vRegShow").show();
		$("#addToGridE").prop('disabled', false);
	}
	else{
		$("#isVendRegE").val("False");
		$("#vendRegShow").show();
		$("#vRegShow").hide();
		$("#addToGridE").prop('disabled', true);
	}
});

$("#isVendRegisteredE").on('change',function(){
	if($("#isVendRegisteredE").val() == 'Yes'){
		$("#addToGridE").prop('disabled',false);
	}else{
		$("#addToGridE").prop('disabled',true);
	}
});


// On Load LOV for State
var stateListArr = [];
$.getJSON('/OrderExecution/api/v1/stateLOV ', function(data) {	
	stateListArr = data.payload.taxStructureMaasterLOV;
});

var gstFlagC = false;
$("#gstnNoC").on('blur',function(){   
    var inputvalues = $(this).val();
    var gstinformat = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
    if (gstinformat.test(inputvalues)) {
    	 gstFlagC = true;
    	 validateGstin();
    } else {
    	$("#sourceStateC").val("");
		$("#sourceStateIdC").val("");
		$("#gstnNoC").val("");
		gstFlagC = false;
	      $.growl.error({
	    	 message : "Please Enter Valid GSTIN No !!!",
	    	 duration : 10000,
	    	 title : 'Error'
	      });
	      return false;
    }
    
});


var validateGstin = function(){
	var gstinF = false;
	if(gstFlagC == true){
		var gstinCode = $("#gstnNoC").val();
		var gstinCodeC = gstinCode.substring(0,2);
		$.each(stateListArr,function(k,v){
			if(gstinCodeC == v.name){ 
				gstinF = true;
				$("#sourceStateC").val( v.description);
				$("#sourceStateIdC").val(v.id);
			}
		});
		if(gstinF == false){
			$.growl.error({
				message : "State Code " + gstinCodeC + " not Exist For " + gstinCode + " !!!",
				duration : 1000,
				title : 'Error'
			});
			$("#gstnNoC").val("");
			$("#sourceStateC").val("");
			$("#sourceStateIdC").val("");
			return false;
		}
	}
}

var stateName = [];
$.getJSON('/OrderExecution/api/v1/stateLOV ', function(data) {
	$.each(data.payload.taxStructureMaasterLOV, function(key, val) {
		stateName.push({
		  "id" : val.id,
		  "name" : val.description 
		});
	});
});

//date picker function for Create
$("#tanDateC").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
});

//date picker functions for Edit
$("#tanDateE").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
});

$("#isVendRegisteredC").on('change',function(){
	var isVendRegisteredC = $("#isVendRegisteredC").val();
	 	if(isVendRegisteredC == "No"){
	 		$("#gstnNoC").prop('disabled', true);
	 		$("#sourceStateC").prop('disabled', true);
	 		$("#addToGrid").prop('disabled', true);
	 		$("#gstnNoC").val("");
	 		$("#sourceStateC").val("");
	 	}
	 	else{
	 		$("#gstnNoC").prop('disabled', false);
	 		$("#sourceStateC").prop('disabled',true);
	 		$("#addToGrid").prop('disabled', false);
	 	}
});

var taxComputationGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
  }	
	
	var datafields = [  {
		'name' :'gstnNoC',
		'type' :'string'
	}, {
		'name' :'sourceStateC',
		'type' :'string'
	}, {
		'name' :'sourceStateIdC',
		'type' :'int'
	}];
	var columns = [{
		'text'  :'GSTN No',
		'datafield':  'gstnNoC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	},{
		'text'  :'Source State',
		'datafield':  'sourceStateC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false,
	},{
		'text'  :'Source State',
		'datafield':  'sourceStateIdC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : true,
		hidden : true
	},
	,{
		text : 'Action',
		datafield : 'Delete',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		columntype : 'button',
		cellsrenderer : function() {
			return "Delete";
		},
		buttonclick : function(row) {
			id = $("#jqxgridT").jqxGrid('getrowid', row);
			$("#jqxgridT").jqxGrid('deleterow', id);		
		}		
	},
	{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridT');
	$("#jqxgridT").jqxGrid({
		width : '100%',
		rowsheight : 35,
		theme: 'energyblue',
	});	
}


//Generate Row for Tax Computation
var rowId = 0;
var generaterow = function(i) {
	var row = {};		
	row["gstnNoC"] = $("#gstnNoC").val();		
	row["sourceStateC"] = $("#sourceStateC").val();	
	row["sourceStateIdC"] = $("#sourceStateIdC").val();	
	rowId = rowId + 1;
	return row;
}

$('#addToGrid').on('click', function(){	
	var gstnNoC = $("#gstnNoC").val();
	var sourceStateC = $("#sourceStateC").val();

		if(gstnNoC =="" || gstnNoC == null || sourceStateC == "" || sourceStateC == null){
			$.growl.error({
				message : "Please Fill GSTIN No and State Fields!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		  }
		else{
			$("#jqxgridT").jqxGrid('addrow', null, generaterow(rowId + 1));  
		}
});


var stateArr = [];
$.getJSON("/OrderExecution/api/v1/stateLOV", function(response) {
	var res = response.payload.taxStructureMaasterLOV;
	for(var i=0; i<res.length; i++){
		stateObj = {
			"id" : res[i].id,
			"name" : res[i].name,
			"description" :res[i].description,
		}
		stateArr.push(stateObj);		
	}

});	
//edit grid
var taxComputationEditGrid = function(data) {
	var updateRows = function(rowid, newdata, commit) {
	}	
	
	var datafields = [{
		'name' :'id',
		'type' :'string'
	},{
		'name' :'gstinNo',
		'type' :'string',
		
	},{
		'name' :'stateId',
		'type' :'int',
		'map' : 'state>id'
		
	},{
		'name' : 'stateName',
		'type' : 'string',
		'map' : 'state>codeName',
	}];
	
	var columns = [
	{ text  :'state Detail Id','datafield': 'statusEditableFeild','width' : '5%',cellsalign : 'center', hidden:true,
	 cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
				var rows = $("#jqxgridC").jqxGrid("getrows");
				$("#jqxgridC").jqxGrid('setcellvalue', row, 'statusEditableFeild',false);}
	},{
		'text'  :'Id',
		'datafield':  'id',
		'width' : '50%',
		cellsalign : 'center',
		align:'center',
		editable : false,
		hidden : true
	},{
		'text'  :'GSTN No',
		'datafield':  'gstinNo',
		'width' : '40%',
		cellsalign : 'center',
		align:'center',
		editable : true,
		cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
			var rows = $("#jqxgridC").jqxGrid('getrows');
			$("#jqxgridC").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
			
			var data = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}Z[0-9A-Z]{1}?$/.test(newvalue);
			if(data == true){
		    	var gstin = newvalue;
		    	var gstinCode = gstin.substring(0,2);
		    	var gstFlag = false;
		    	 $.each(stateArr,function(k,v){
		    		 if(gstinCode == v.name){
		    			 $("#jqxgridC").jqxGrid('setcellvalue', row, 'stateName',v.description);
		    			 $("#jqxgridC").jqxGrid('setcellvalue', row, 'stateId',v.id);
		    			 gstFlag = true;
		    		 }
		    	 })
		    	 if(gstFlag == false){
		    		 $("#jqxgridC").jqxGrid('setcellvalue', row, 'stateName',"");
	    			 $("#jqxgridC").jqxGrid('setcellvalue', row, 'stateId',"");
	    			 $.growl.error({
	    				message : "State Code " + gstinCode + " not Exist for the GSTIN " + gstin + " !!!",
	    				duration : 10000,
	    				title : 'Error'
	    			 });
	    			 return "";
		    	 }
		    }
		    if(data == false){
		    	 $("#jqxgridC").jqxGrid('setcellvalue', row, 'stateName',"");
    			 $("#jqxgridC").jqxGrid('setcellvalue', row, 'stateId',"");
		    	$.growl.error({
		    		message :  "Please enter Valid GSTIN No !!!",
		    		duration : 10000,
		    		title : 'Error'
		    	});
		    	return "";
		    }
	   }   
	},{
		'text'  :'State Id',
		'datafield':  'stateId',
		'width' : '50%',
		cellsalign : 'center',
		align:'center',
		editable : true,
		hidden : true
	},{
		'text' : 'State Name',
		'datafield' : 'stateName',		
		'width' : '50%',
		editable : false,
		cellsalign: 'center',
		align: 'center',
	   cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
			var rows = $("#jqxgridC").jqxGrid('getrows');
		$("#jqxgridC").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
	   }         
	},,{
		text : 'Action',
		datafield : 'Delete',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		columntype : 'button',
		cellsrenderer : function() {
			return "Delete";
		},
		buttonclick : function(row) {
			id = $("#jqxgridC").jqxGrid('getrowid', row);
			$("#jqxgridC").jqxGrid('deleterow', id);		
		}	
	}];
	addGrid(datafields, columns, updateRows, data, "", '#jqxgridC');
	$("#jqxgridC").jqxGrid({
		width : '100%',
		theme: 'energyblue',
		rowsheight : 35,		
	});	
}


//Generate Row for Tax Computation
var rowId = 1;
var generaterowE = function(i) {
	var row = {};
	row["SlNo"] = i;
	row["id"] = "";
	row["gstinNo"] = "";
	row["stateName"] = "";
	rowId = rowId + 1;
	return row;
}

$("#addToGridE").on('click',function(){
    var rowscount = $("#jqxgridC").jqxGrid('getdatainformation').rowscount;
	$("#jqxgridC").jqxGrid('addrow', null,generaterowE(rowscount + 1));	
});

$("#clear").on('click',function(){
	$("#isVendRegisteredC").val("");
	$("#panNumberC").val("");
	$("#tanNumberC").val("");
	$("#tanDateC").val("");
	$("#gstnNoC").val("");
	$("#sourceStateC").val("");
	$("#jqxgridT").jqxGrid('clear');
});
