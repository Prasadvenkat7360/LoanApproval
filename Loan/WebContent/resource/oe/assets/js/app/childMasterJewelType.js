/*<!-- 
	##	Author1 (UI)        :   Pooja Sangve
	## 	Author2 (java)	    :   Manoranjan
	##	Date Creation 	    : 	14-06-2017
	## 	Description		    :	Create, Search, Edit And Update of Jewel Type
 -->
*/

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

$.getJSON('/OrderExecution/api/v1/getJewelLOV',function(data) {
	jewlId = data.payload.jewelType;
	
		var v = '<select id="jewlIdObj"   name="jewlIdObj" class="form-control" multiple="multiple">';
			$.each(jewlId, function(key, val) {
			v += '<option value="' + val.id + '">' +val.id+'-'+ val.name +'</option>'; });
			v += '</select>';
			$("#jTypeId").html(v);
			$('#jewlIdObj').multiselect({
				includeSelectAllOption : true,
				enableFiltering : true,
				maxHeight : 250,
				searchable: true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
});
//############# Jewel Type Field Filters #####################

var jewelTypeFieldFilters = function() {
	var jTypeId = $('#jTypeId').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	var jewlIdObj = $('#jewlIdObj').val();
	if (jewlIdObj == null || jewlIdObj == "") {
		var jTypeId = "";
	} else {
		var jTypeId = jewlIdObj.join(",");
	}
	if (jTypeId != "" && jTypeId != null) {
		fieldFilters.fieldFilters["id"] = jTypeId;
	}
	return fieldFilters;
}



// view Page Of Jewel Type
var viewJewelTypeRenderer  = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditJewelType"  type="button" id=' + row	+ ' onclick="editJewelType('+ value	+ ')" /><i class="fa fa-pencil fa-sm"></i></a>';
	}
}


//############# Jewel Type Search Grid Started ######################################
function jewelTypeGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [ {
		'name' : 'jewelTypeID',
		'type' : 'long',
		'map' : 'id'
	}, {
		'name' : 'jCode',
		'type' : 'string',
		'map' :  'code'
	}, {
		'name' : 'jDesc',
		'map' : 'description',
		'type' : 'String'
	}, {
		'name' : 'baseMetals',
		'map' : 'baseMetals',
		'type' : 'string'
	}, {
		'name' : 'hookType',
		'map' : 'hookTypeMaster',
		'type' : 'string'
	}, {
		'name' : 'loopType',
		'type' : 'string',
		'map' : 'loopTypeMaster'
	}, {
		'name' : 'metalPurity',
		'type' : 'double',
		'map': 'metalPurityMaster'		
	}, {
		'name' : 'metalType',
		'type' : 'string',
		'map': 'metalTypeMaster'
	}, {
		'name' : 'screwType',
		'type' : 'string',
		'map': 'screwTypeMaster'
	}, {
		'name' : 'settingType',
		'type' : 'string',
		'map': 'settingType'
	}, {
		'name' : 'polishType',
		'type' : 'string',
		'map': 'polishTypeMaster'
	}, {
		'name' : 'length',
		'type' : 'long',
		'map': 'length'
	}, {
		'name' : 'lengthSize',
		'type' : 'long',
		'map': 'lengthList'
	}, {
		'name' : 'jwSize',
		'type' : 'long',
		'map': 'size'
	}, {
		'name' : 'sizeList',
		'type' : 'long',
		'map': 'sizeList'
	} ,{
		'name' : 'height',
		'type' : 'long',
		'map': 'height'
	}, {
		'name' : 'heightList',
		'type' : 'long',
		'map': 'heightList'
	},{
		'name' : 'diameter',
		'type' : 'long',
		'map': 'diameter'
	},{
		'name' : 'diameterList',
		'type' : 'long',
		'map': 'diameterList'
	},{
		'name' : 'width',
		'type' : 'long',
		'map': 'width'
	},{
		'name' : 'widthList',
		'type' : 'long',
		'map': 'widthList'
	},{
		'name' : 'id',
		'type' : 'int',
		'map' : 'id'
	}];
	var columns = [ {
		'text' : 'Jewel Id',
		'datafield' : 'jewelTypeID',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Jewel Type Code',
		'datafield' : 'jCode',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Jewel Type Description',
		'datafield' : 'jDesc',
		'width' : '6.5%',
		cellsalign : 'left',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Hook Type',
		'datafield' : 'hookType',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
		    for(var i=0; i<rows.length; i++){
	         if(row == rows[i].boundindex){
			 if(rows[i].hookType  == false){
					return '<div style="margin-top:15%; margin-left:30%;">'
					+ "No" + '</div>';
				}else{
					return '<div style="margin-top:15%; margin-left:30%;">'
					+ "Yes" + '</div>';
				}		
	         }}},
		cellsalign : 'center',
		cellclassname: 'verticalAlign',
		align : 'center'
	}, {
		'text' : 'Loop Type',
		'datafield' : 'loopType',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
			for(var i=0; i<rows.length; i++){
		         if(row == rows[i].boundindex){			
			if(rows[i].loopType  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}
			}},
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Metal Purity',
		'datafield' : 'metalPurity',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
		 for(var i=0; i<rows.length; i++){
	       if(row == rows[i].boundindex){
			if(rows[i].metalPurity  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}
		 }},
		cellsalign : 'right',
		align : 'center'
	},{
		text : 'Metal Type',
		datafield : 'metalType',
		editable : false,
		cellsalign : 'center',
		align : 'center',		
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
		 for(var i=0; i<rows.length; i++){
	         if(row == rows[i].boundindex){
			if(rows[i].metalType  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}}}, 
		'width' : '5%',
		filterable: false,
		sortable : false
	},{
		'text' : 'Screw Type',
		'datafield' : 'screwType',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
		 for(var i=0; i<rows.length; i++){
	         if(row == rows[i].boundindex){
			if(rows[i].screwType  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}}},
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Setting Type',
		'datafield' : 'settingType',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
		 for(var i=0; i<rows.length; i++){
	         if(row == rows[i].boundindex){
			if(rows[i].settingType  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}}},
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Polish Type',
		'datafield' : 'polishType',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
		 for(var i=0; i<rows.length; i++){
	         if(row == rows[i].boundindex){
			if(rows[i].polishType  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}}},
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Length',
		'datafield' : 'length',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
		 for(var i=0; i<rows.length; i++){
	         if(row == rows[i].boundindex){
			if(rows[i].length  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}}}, 
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Length Size',
		'datafield' : 'lengthSize',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Size',
		'datafield' : 'jwSize',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
		 for(var i=0; i<rows.length; i++){
	         if(row == rows[i].boundindex){
			if(rows[i].jwSize  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}}}, 
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Size List',
		'datafield' : 'sizeList',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Height',
		'datafield' : 'height',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
		 for(var i=0; i<rows.length; i++){
	         if(row == rows[i].boundindex){
			if(rows[i].height  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}}},
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Height List',
		'datafield' : 'heightList',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Diameter',
		'datafield' : 'diameter',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
			 for(var i=0; i<rows.length; i++){
		         if(row == rows[i].boundindex){
			if(rows[i].diameter  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}}},
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Diameter List',
		'datafield' : 'diameterList',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Width',
		'datafield' : 'width',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsrenderer : function (row, columnfield, value) {
			 var rows = $("#jqxgrid").jqxGrid('getrows');
			 for(var i=0; i<rows.length; i++){
		         if(row == rows[i].boundindex){
			if(rows[i].width  == false){
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "No" + '</div>';
			}else{
				return '<div style="margin-top:15%; margin-left:30%;">'
				+ "Yes" + '</div>';
			}		
		}}}, 
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : 'Width List',
		'datafield' : 'widthList',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},{
		'text' : '',
		'datafield' : 'id',
		'width' : '2.5%',
		cellsrenderer : viewJewelTypeRenderer,
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchJwelType", "list",columns, jewelTypeFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true		
	});
}


$('#jewelSearch').on('click', function() {
	//var segIdJ = $("#segIdJ").val();
	var jTypeId = $("#jewlIdObj").val();
	//segIdJ == "" || segIdJ == null
	if(jTypeId == "" || jTypeId == null ){
		$.growl.error({ message: "Jewel Type Id is Required!", duration: 5000, title: 'Error' });
		return false;
	}
	jewelTypeGrid();
	$("#jqxgrid").show();
	
});

$("#clearJewel").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('listOfChildMasters', 'bodySwitcher')"
});



//Generate Row for Screw
var jewelTypSegC = [];
$.getJSON('/OrderExecution/api/v1/metalSegmentLOV', function(data) {
	$.each(data.payload.MsegmentLOV, function(key, val) {
		jewelTypSegC.push({
			"id" : val.id,
			"name" : val.description
		});
	});
	
});



// Add Grid While Creation  of Jewel Type
var jewelTypeAddGrid = function() {

	var updateRows = function(rowId, newdata, commit) {
	}
	
	var datafields = [ {
		'name' :'jwlCode',
		'type' :'string'
	}, {
		'name'  :'jwlTypeDesc',
		'type' : 'string'
	}, {
		'name' : 'hookMaster',
		'type'  :'string'		
	}, {
		'name'  :'loopMaster',
		'type'  :'string'
	}, {
		'name'  :'purityMaster',
		'type'  :'string'
	}, {
		'name'  :'typeMaster',
		'type'  :'string'
	},{
		'name'  :'screwTypeMaster',
		'type'  :'string'
	}, {
		'name'  :'settingTypeMaster',
		'type'  :'string'
	}, {
		'name'  :'polishTypeMaster',
		'type'  :'string'
	}, {
		'name'  :'height',
		'type'  :'string'
	}, {
		'name'  :'heightList',
		'type'  :'string'
	}, {
		'name'  :'lengthList',
		'type'  :'string'
	}, {
		'name'  :'length',
		'type'  :'string'
	}, {
		'name'  :'jobWorkerSize',
		'type'  :'string'
	}, {
		'name'  :'sizeList',
		'type'  :'string'
	}, {
		'name'  :'daimeter',
		'type'  :'string'
	}, {
		'name'  :'daimeterList',
		'type'  :'string'
	}, {
		'name'  :'width',
		'type'  :'string'
	}, {
		'name'  :'widthList',
		'type'  :'string'
	}];
	
	var columns = [{
		'text'  :'Jwl Type Code',
		'datafield' : 'jwlCode',
		'width'  :'5%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
		'text' : 'Jwl Desc',
		'datafield' : 'jwlTypeDesc',
		'width' : '5%',
		cellsalign  :'left',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text'  :'Hook Master',
		'datafield' : 'hookMaster',
		'width' : '5%',
		cellsalign  :'center',
		align:'center',
		sortable : false,
		editable  :false
	}, {
		'text' : 'Loop Master',
		'datafield' : 'loopMaster',
		'width'  :'5%',
		cellsalign  :'center',
		align:'center',
		sortable : false,
		editable  :false
	}, {
		'text' : 'Metal Pur Master',
		'datafield' : 'purityMaster',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Metal Master',
		'datafield' : 'typeMaster',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Screw Master',
		'datafield' : 'screwTypeMaster',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Setting Master',
		'datafield' : 'settingTypeMaster',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Polish Master',
		'datafield' : 'polishTypeMaster',
     	'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Length',
		'datafield' : 'length',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Length List',
		'datafield' : 'lengthList',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Job Worker Size',
		'datafield' : 'jobWorkerSize',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Size list',
		'datafield' : 'sizeList',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Height',
		'datafield' : 'height',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Height List',
		'datafield' : 'heightList',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Diameter',
		'datafield' : 'daimeter',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Diameter List',
		'datafield' : 'daimeterList',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Width',
		'datafield' : 'width',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		'text' : 'Width List',
		'datafield' : 'widthList',
		'width':  '5%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	}, {
		text : 'Action',
		datafield : 'Delete',
		'width' : '5%',
		columntype : 'button',
		cellsalign : 'center',
		align:'center',
		cellsrenderer : function() {
			return "Delete";
		},
		buttonclick : function(row) {
			id = $("#jqxgridJewel").jqxGrid('getrowid', row);
			$("#jqxgridJewel").jqxGrid('deleterow', id);		}	
	}];
	var addrow = function(rowId, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, data, addrow, '#jqxgridJewel');
}
	var rowId = 0;
	var generaterowJewel = function(i) {
		var row = {};
		row["jwlCode"] =  $("#jTypeCode").val();
		row["jwlTypeDesc"] = $("#jTypeDesc").val();
		row["hookMaster"] = $("#hookType option:selected").val();		
		row["loopMaster"] =  $("#loopType option:selected").val();
		row["purityMaster"] = $("#metalPurity option:selected").val();	
		row["typeMaster"] = $("#metalType option:selected").val();
		row["screwTypeMaster"] =  $("#screwType option:selected").val();
		row["settingTypeMaster"] = $("#settingType option:selected").val();
		row["polishTypeMaster"] = $("#polishPurity option:selected").val();
		row["height"] = $("#height option:selected").val();
		row["heightList"] =  $("#heightList").val();	
		row["jobWorkerSize"] = $("#jwSize option:selected").val();
		row["sizeList"] =  $("#sizeList").val();
		row["length"] = $("#length option:selected").val();
		row["lengthList"] = $("#lengthList").val();
		row["daimeter"] =  $("#diameter option:selected").val();
		row["daimeterList"] =  $("#diameterList").val();	
		row["width"] =  $("#width option:selected").val();	
		row["widthList"] =  $("#widthList").val();	
		rowId = rowId + 1;
		return row;
	}
	/*$("#addRowJewel").on('click', function(){
		$("#jqxgridJewel").jqxGrid('addrow', null, generaterowJewel(rowId + 1));   
	});*/
	
	//Validation and Adding the Rows in AddGrid
	$('#createJewelTypeC').validate(
	{
		errorElement : 'label',
		errorClass : 'help-inline',
		focusInvalid : false,
		ignore : "",
		rules : {
			
		   "diameter" : {
				required : true,
			 },
			"hookType" : {
				required : true,
			 },
			"metalType" : {
				required : true,
			 },
			"screwType" : {
				required : true,
			},
			"screwType" : {
				required : true,
			},
			"settingType" : {
				required : true,
			},
			"polishPurity" : {
				required : true,
			},
			"width" : {
				required : true,
			},
			"height" : {
				required : true,
			},
			"jwSize" : {
				required : true,
			},
			"length" : {
				required : true,
			},
			"jTypeDesc" : {
				required : true,
				regx : /^[0-9a-zA-Z\s]+$/
			},
			"jTypeCode" : {
				required : true,
				regx : /^[A-Z]+$/,
				maxlength : 4
			},
			"loopType" : {
				required : true,
			},
			"metalPurity" : {
				required : true,
			},
			"metalType" : {
				required : true,
			},
			"jewelTypSegC" : {
				required : true
			}				
		},
		messages : {
			'jTypeCode' : {
				regx : "Only capital letter allowed!",
				maxlength : "Code should be maximum of 4 character!"
			},
			   "jTypeDesc" : {
				   regx : "Only Alpha numeric with space!"
				}			
		},
	submitHandler : function(form) {
		
		var length = $("#length").val();
		 var lengthList = $("#lengthList").val();
			if ( length === "True" && lengthList == "") {
				$.growl.error({
					message :"Please fill the Length List Field !!" ,
					duration : 10000,
					title : 'Error'
				});
			return false;
			}
		
		var sizeList = 	$("#sizeList").val();
		 var jwSize = $("#jwSize").val();
			if ( jwSize === "True" && sizeList == "") {
				$.growl.error({
					message :"Please fill the Size List Field !!" ,
					duration : 10000,
					title : 'Error'
				});
			return false;
			}
				
		 var heightList = 	$("#heightList").val();
		 var height = $("#height").val();
			if ( heightE === "True" && heightList == "") {
				$.growl.error({
					message :"Please fill the Height List Field !!" ,
					duration : 10000,
					title : 'Error'
				});
			return false;
			}	
				
		 var diameterList = 	$("#diameterList").val();
		 var diameter = $("#diameter").val();
			if ( diameter === "True" && diameterList == "") {
				$.growl.error({
					message :"Please fill the Diameter List Field !!" ,
					duration : 10000,
					title : 'Error'
				});
			return false;
			}
				
		 var widthList = 	$("#widthList").val();
		 var width = $("#width").val();
			if ( width === "True" && widthList == "") {
				$.growl.error({
					message :"Please fill the Width List Field !!" ,
					duration : 10000,
					title : 'Error'
				});
			return false;
			}
					
		$("#jqxgridJewel").jqxGrid('addrow', null, generaterowJewel(rowId + 1));
		}
   });
	
	$("#listOfChildMastersJewel").on("click",function(){	
		$.getJSON('/OrderExecution/api/v1/metalSegmentLOV ',function(data) {
			var seg = data.payload.MsegmentLOV;
			
			var d = '<select id="segmIdJTObj" name="segmIdJTObj" class="form-control" multiple="multiple">';
			$.each(seg, function(key, val) {
				d += '<option value="' + val.id + '">' + val.description + '</option>';
			});
			d += '</select>';

			$("#jewelTypSegC").html(d);
			$('#segmIdJTObj').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
			jewelTypeAddGrid();	
			$("#jqxgridJewel").show();
	});
});



var validateJewel = function() {
	var segLines = [];
	var rows = $('#jqxgridJewel').jqxGrid('getrows');

	
	var segmIdJTObj = $("#segmIdJTObj").val();
	var segmentArr=[];
	
	$.each(segmIdJTObj,function(key,val){
		var segmentDet  = {
		"segmentId": val
		}
		segmentArr.push(segmentDet);
	})
	
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var segLinesItems = {			
			"code" : row.jwlCode,
	        "description" : row.jwlTypeDesc,
			"hookTypeMaster" : ((row.hookMaster)=="True"?true:false),
			"loopTypeMaster" : ((row.loopMaster)=="True"?true:false),
			"metalPurityMaster" : ((row.purityMaster)=="True"?true:false),	
			"metalTypeMaster" : ((row.typeMaster)=="True"?true:false),
			"screwTypeMaster" : ((row.screwTypeMaster)=="True"?true:false),
			"settingType" : ((row.settingTypeMaster)=="True"?true:false),
			"polishTypeMaster" : ((row.polishTypeMaster)=="True"?true:false),
			"height" : ((row.height)=="True"?true:false),
			"heightList" : row.heightList,	
			"size" : ((row.jobWorkerSize)=="True"?true:false),
			"sizeList" :  row.sizeList,
			"length" : ((row.length)=="True"?true:false),
			"lengthList": row.lengthList,
			"diameter" : ((row.daimeter)=="True"?true:false),
			"diameterList" :  row.daimeterList,
			"width" :  ((row.width)=="True"?true:false),	
			"widthList" :row.widthList,
			"metalSegments":segmentArr
		};
		segLines.push(segLinesItems)
    }
	return segLines
 }

// Creating the Jewel Type
$("#createJType").on('click',function() {	 
	trimmer();
	 var rows = $('#jqxgridJewel').jqxGrid('getrows');
		if(rows.length == 0){
			$.growl.error({
				message : "Grid fields are mandatory!!",
				duration : 10000
			});
			return false;
		}
		
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			if(rows.length > 1){
	    	    var filterednames = rows.filter(function(obj) {
	    	    	 return (obj.jwlCode === rows[i].jwlCode)
	    	    });
			       if(filterednames.length >  1){
			        		$.growl.error({
								message : "Duplicate records are Exists",
								duration : 10000,
								title : 'Error'
							});
			       return false;
			    }	      
			}
		}
		
		var segLines = [];		
		var segLines = validateJewel();
		if (segLines) {		
	  postJSON('/OrderExecution/api/v1/createJwelType',JSON.stringify(segLines), function(data) {
			if (data.resCode == "1") {
			  $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			 $("#createJewelType").modal('hide');
			 jewelTypeGrid();
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			 }
	   });
	}
});

////////////////////////////////////////View or edit page//////////////////////////////////////////////
	
	var editJewelType = function(id) {
	$('#popupheaderlabelJewel').text('Edit Jewel Type  details');
	
	$('#lengthE').empty().append('<option value="" selected>--Select--</option>');	
	var lengthArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	$('#hookTypeE').empty().append('<option value="" selected>--Select--</option>');	
	var hookTypeEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	
	$('#loopTypeE').empty().append('<option value="" selected>--Select--</option>');	
	var loopTypeEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	$('#mPurityE').empty().append('<option value="" selected>--Select--</option>');	
	var mPurityEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	$('#metalTypeE').empty().append('<option value="" selected>--Select--</option>');	
	var metalTypeEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	$('#screwTypeE').empty().append('<option value="" selected>--Select--</option>');	
	var screwTypeEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	$('#settingTypeE').empty().append('<option value="" selected>--Select--</option>');	
	var settingTypeEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	
	$('#polishTypeE').empty().append('<option value="" selected>--Select--</option>');	
	var polishPurityEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	$('#heightE').empty().append('<option value="" selected>--Select--</option>');	
	var heightEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	$('#jwSizeE').empty().append('<option value="" selected>--Select--</option>');	
	var jwSizeEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	$('#diameterE').empty().append('<option value="" selected>--Select--</option>');	
	var diameterEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	$('#widthE').empty().append('<option value="" selected>--Select--</option>');	
	var widthEArr = [{
		"id" : true,
		"name" : "Yes"
	}, {
		"id" : false,
		"name" : "No"
	}];
	
	$.getJSON('/OrderExecution/api/v1/getJewelTypeById?id=' + id,function(data) {
	
	var selectedRowData = data.payload.hookType;
	
	if(selectedRowData.length == false){
		$("#lengthListE").prop('disabled', true);
	}else{
		$("#lengthListE").prop('disabled', false);
	}
	$.each(lengthArr, function(k, v){	
		if(selectedRowData.length == v.id){
			$('#lengthE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#lengthE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});
	$.each(hookTypeEArr, function(k, v){	
		if(selectedRowData.hookTypeMaster  == v.id){
			$('#hookTypeE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#hookTypeE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});
	
	$.each(loopTypeEArr, function(k, v){	
		if(selectedRowData.loopTypeMaster  == v.id){
			$('#loopTypeE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#loopTypeE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});
	
	$.each(mPurityEArr, function(k, v){	
		if(selectedRowData.metalPurityMaster  == v.id){
			$('#mPurityE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#mPurityE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});
	$.each(metalTypeEArr, function(k, v){	
		if(selectedRowData.metalTypeMaster  == v.id){
			$('#metalTypeE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#metalTypeE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});
	
	$.each(screwTypeEArr, function(k, v){	
		if(selectedRowData.screwTypeMaster  == v.id){
			$('#screwTypeE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#screwTypeE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});
	$.each(settingTypeEArr, function(k, v){	
		if(selectedRowData.settingType  == v.id){
			$('#settingTypeE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#settingTypeE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});
	$.each(polishPurityEArr, function(k, v){	
		if(selectedRowData.polishTypeMaster  == v.id){
			$('#polishTypeE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#polishTypeE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});
	if(selectedRowData.height == false){
		$("#heightListE").prop('disabled', true);
	}else{
		$("#heightListE").prop('disabled', false);
	}
	$.each(heightEArr, function(k, v){	
		if(selectedRowData.height  == v.id){
			$('#heightE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#heightE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});	
	if(selectedRowData.size == false){
		$("#sizeListE").prop('disabled', true);
	}else{
		$("#sizeListE").prop('disabled', false);
	}
	$.each(jwSizeEArr, function(k, v){	
		if(selectedRowData.size  == v.id){
			$('#jwSizeE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#jwSizeE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});
	
	if(selectedRowData.diameter == false){
		$("#diameterListE").prop('disabled', true);
	}else{
		$("#diameterListE").prop('disabled', false);
	}
	$.each(diameterEArr, function(k, v){	
		if(selectedRowData.diameter  == v.id){
			$('#diameterE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#diameterE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});
	
	if(selectedRowData.width == false){
		$("#widthListE").prop('disabled', true);
	}else{
		$("#widthListE").prop('disabled', false);
		}
	$.each(widthEArr, function(k, v){		
		if(selectedRowData.width  == v.id){
			$('#widthE').append('<option selected value="' + v.id + '">' + v.name	+ '</option>');
		}else{
			$('#widthE').append('<option value="' + v.id + '">' + v.name	+ '</option>');
		}
	});	

	$("#jTypeIdE").val(selectedRowData.id);
	$("#jTypeCodeE").val(selectedRowData.code);	
	$("#jTypeDescE").val(selectedRowData.description);		
	$("#heightListE").val(selectedRowData.heightList);	
	$("#sizeListE").val(selectedRowData.sizeList);
	$("#lengthListE").val(selectedRowData.lengthList);	
	$("#diameterListE").val(selectedRowData.diameterList);
	$("#widthListE").val(selectedRowData.widthList);	
	$("#jewelCreatedOnE").val(selectedRowData.craetedDate);	
	$("#jewelCreatedByE").val(selectedRowData.createdby);
	$("#jewelTypeChangedByE").val(selectedRowData.lastChangedBy);
	$("#jewelTypeChangedOnE").val(selectedRowData.lastChanedDate);
	
	
	var segmentArr = [];
	$.each(selectedRowData.metalSegments,function(k , v){
		segmentArr.push(v.segmentId);
	});
	var mSeg = '<div class="col-md-12">';
	$.each(jewelTypSegC,function(k , v){		
		 if ($.inArray(parseInt(v.id), segmentArr) != -1)
		 { 
			 mSeg += '<label class="checkbox-inline"><input checked name="segmentList" disabled type="checkbox" value="'+v.id+'" id="segmentList"  /> &nbsp; '+v.name+' </label>';			
         }else{ 
        	 mSeg += '<label class="checkbox-inline"><input name="segmentList" type="checkbox" value="'+v.id+'" id="segmentList'+v.id+'"  /> &nbsp; '+v.name+' </label>';     		
         }
	});
	mSeg += '</div>' 
	$("#metalSegSection").html(mSeg);
  });
}
	
	
/////////////////////////////////////Update Of the  Records ////////////////////////////////////////////////////

var updateJewelType = function() {
	var selecteditems = [];

	$("#metalSegSection").find("input:checked").each(function (i, ob) { 
	    selecteditems.push({
	          "segmentId": $(ob).val()
        });
	});
	
	var JewelTypeChildMstr={
		"id" : parseInt($("#jTypeIdE").val()),
		"code" : $("#jTypeCodeE").val(),
		"description" : $("#jTypeDescE").val(),
		"hookTypeMaster" :($("#hookTypeE option:selected").val() == "true")  ? true : false,
		"loopTypeMaster" : ($("#loopTypeE  option:selected").val() == "true") ? true : false, 
		"metalPurityMaster" : ($("#mPurityE  option:selected").val() == "true") ? true : false, 
		"metalTypeMaster" : ($("#metalTypeE  option:selected").val() == "true") ? true : false,
		"screwTypeMaster" : ($("#screwTypeE  option:selected").val() == "true")  ? true : false,
		"settingType" : ($("#settingTypeE  option:selected").val() == "true")  ? true : false,
		"polishTypeMaster" :($("#polishTypeE  option:selected").val() == "true")  ? true : false,
		"height" :($("#heightE  option:selected").val() == "true")  ? true : false,
		"heightList" : $("#heightListE").val(),	
		"size" :($("#jwSizeE  option:selected").val() == "true")  ? true : false,
		"sizeList" :  $("#sizeListE").val(),
		"length" :($("#lengthE  option:selected").val() == "true") ? true : false ,
		"lengthList" : $("#lengthListE").val(),
		"diameter" : ($("#diameterE  option:selected").val() == "true")  ? true : false,
		"diameterList" :  $("#diameterListE").val(),
		"width" :($("#widthE  option:selected").val() == "true") ? true : false,
		"widthList" : $("#widthListE").val(),
		 "metalSegments": selecteditems
	}
	return JewelTypeChildMstr;
}
	
	
//Update Functionality of the Jewel Type
$("#JewelTypeE").validate(
{
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"diameterE" : {
		required : true,
		},
		"hookTypeE" : {
		required : true,
		},
		"metalTypeE" : {
		required : true
		},
		"screwTypeE" : {
		required : true
		},
		"settingTypeE" : {
		required : true
		},
		"polishTypeE" : {
		required : true
		},
		"widthE" : {
		required : true
		},
		"heightE" : {
		required : true
		},
		"jwSizeE" : {
		required : true
		},
		"lengthE" : {
		required : true
		},
		"jTypeDescE" : {
		required : true,
		regx : /^[0-9a-zA-Z\s]+$/
		},
		"jTypeCodeE" : {
		required : true,
		regx : /^[A-Z]+$/,
		maxlength : 4
		},
		"loopTypeE" : {
		required : true
		},
		"mPurityE" : {
		required : true
		},
		"metalTypeE" : {
		required : true
		}			
	},
	messages : {
		'jTypeCodeE' : {
		regx : "Only capital letter allowed!",
		maxlength : "Code should be maximum of 4 character!"
		},
		"jTypeDescE" : {
			regx : "Only Alpha numeric with space!"
		}
	},
submitHandler : function(form) {
	trimmer();
	 var sizeListE = 	$("#sizeListE").val();
	 var jwSizeE = $("#jwSizeE").val();
		if ( jwSizeE === "true" && sizeListE == "") {
			$.growl.error({
				message :"Please fill the Size List Field !!" ,
				duration : 10000,
				title : 'Error'
			});
		return false;
		}
		
	 var heightListE = 	$("#heightListE").val();
	 var heightE = $("#heightE").val();
		if ( heightE === "true" && heightListE == "") {
			$.growl.error({
				message :"Please fill the Height List Field !!" ,
				duration : 10000,
				title : 'Error'
			});
		return false;
		}	
		
	 var diameterListE = 	$("#diameterListE").val();
	 var diameterE = $("#diameterE").val();
		if ( diameterE === "true" && diameterListE == "") {
			$.growl.error({
				message :"Please fill the Diameter List Field !!" ,
				duration : 10000,
				title : 'Error'
			});
		return false;
		}
		
	 var widthListE = 	$("#widthListE").val();
	 var widthE = $("#widthE").val();
		if ( widthE === "true" && widthListE == "") {
			$.growl.error({
				message :"Please fill the Width List Field !!" ,
				duration : 10000,
				title : 'Error'
			});
		return false;
		}
						
	var jwlEdit = updateJewelType();
	if (jwlEdit) {
	postJSON('/OrderExecution/api/v1/updateJweltype', JSON.stringify(jwlEdit), function(data) {
		if (data.resCode == "1") {
			$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
	        }); 
			$('#btnEditJewelType').modal('hide');
			$('#createJewelType').on('hidden.bs.modal',	function() {
				$(this).find('form').trigger('reset');
		});
	      jewelTypeGrid();
	} else {
		$.growl.error({
		message : data.mesgStr,
		duration : 10000
		});
	   }
	 });
    }
  }
});

$("#widthList").prop('disabled', false);
$("#lengthList").prop('disabled', false);
$("#diameterList").prop('disabled', false);
$("#heightList").prop('disabled', false);
$("#sizeList").prop('disabled', false);

$("#widthListE").prop('disabled', false);
$("#diameterListE").prop('disabled', false);
$("#heightListE").prop('disabled', false);
$("#sizeListE").prop('disabled', false);
$("#lengthListE").prop('disabled', false);

/// edit
$("#widthE").on('change', function(){
	var neVal = $("#widthE").val();
	if(neVal == "true"  ){
		$("#widthListE").prop('disabled', false);
	}else{
		$("#widthListE").prop('disabled', true);
		$("#widthListE").val("");
	}
})	
$("#lengthE").on('change', function(){
	var neVal = $("#lengthE").val();
	if(neVal == "true"  ){
		$("#lengthListE").prop('disabled', false);
	}else{
		$("#lengthListE").prop('disabled', true);
		$("#lengthListE").val("");
	}
})	

$("#diameterE").on('change', function(){
	var neVal = $("#diameterE").val();
	if(neVal == "true"  ){
		$("#diameterListE").prop('disabled', false);
	}else{
		$("#diameterListE").prop('disabled', true);
		$("#diameterListE").val("");
	}
})	
$("#heightE").on('change', function(){
	var neVal = $("#heightE").val();
	if(neVal == "true"  ){
		$("#heightListE").prop('disabled', false);
	}else{
		$("#heightListE").prop('disabled', true);
		$("#heightListE").val("");
	}
})	
$("#jwSizeE").on('change', function(){
	var neVal = $("#jwSizeE").val();
	if(neVal == "true"  ){
		$("#sizeListE").prop('disabled', false);
	}else{
		$("#sizeListE").prop('disabled', true);
		$("#sizeListE").val("");
	}
})	
//############################## While Adding Or Creating #####################################

$("#width").on('change', function(){
	var neVal = $("#width").val();
	if(neVal == "True"  ){
		$("#widthList").prop('disabled', false);
	}else{
		$("#widthList").prop('disabled', true);
		$("#widthList").val("");
	}
})	
$("#length").on('change', function(){
	var neVal = $("#length").val();
	if(neVal == "True"  ){
		$("#lengthList").prop('disabled', false);
	}else{
		$("#lengthList").prop('disabled', true);
		$("#lengthList").val("");
	}
});	
$("#diameter").on('change', function(){
	var neVal = $("#diameter").val();
	if(neVal == "True"  ){
		$("#diameterList").prop('disabled', false);
	}else{
		$("#diameterList").prop('disabled', true);
		$("#diameterList").val("");
	}
});	
$("#height").on('change', function(){
	var neVal = $("#height").val();
	if(neVal == "True"  ){
		$("#heightList").prop('disabled', false);
	}else{
		$("#heightList").prop('disabled', true);
		$("#heightList").val("");
	}
});	
$("#jwSize").on('change', function(){
	var neVal = $("#jwSize").val();
	if(neVal == "True"  ){
		$("#sizeList").prop('disabled', false);
	}else{
		$("#sizeList").prop('disabled', true);
		$("#sizeList").val("");
	}
});	



	$.validator.addMethod("regx", function(value, element, regexp) {
	if (regexp.constructor != RegExp)
	regexp = new RegExp(regexp);
	else if (regexp.global)
	regexp.lastIndex = 0;
	return this.optional(element) || regexp.test(value);
	}, "");