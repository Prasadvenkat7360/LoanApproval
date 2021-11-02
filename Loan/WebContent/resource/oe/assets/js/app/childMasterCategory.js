/*<!-- 
	##	Author1 (UI)    :   Pooja
	## 	Author2 (Java)	:   Manoranjan
	##	Date Creation 	: 	28-07-2017
	## 	Description		:	Category Create,Edit and Search Functionalities
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

// view Page Of CATEGORY

$("#showHideStone").hide();
$("#showHideAcc").hide();

$("#catType").on('change',function(){
	$("#stoneSegIdS").val("");
	$("#accSegIdS").val("");
	if($("#catType").val() == "M"){
		$("#showHideStone").hide();
		$("#showHideAcc").hide();
		
	}else if($("#catType").val() == "S"){
		$("#showHideStone").show();
		$("#showHideAcc").hide();
		
	}else if($("#catType").val() == "AC"){
		$("#showHideStone").hide();
		$("#showHideAcc").show();
		
	}else{
		
	}
});


var viewMetalTypeRenderer  = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditCategory"  type="button" id='
			+ row
			+ ' onclick="editCategory('
			+ row
			+ "," + value +')" /><i class="fa fa-pencil fa-sm"></i></a>'	
	}
}

var onloadJewelType = function(){
$.getJSON('/OrderExecution/api/v1/getJewelLOV',function(data) {
	var jewlId = data.payload.jewelType;
	 console.log(jewlId);
		var j = '<select id="catJewelTypeObj"   name="catJewelTypeObj" class="form-control" multiple="multiple">';
			$.each(jewlId, function(key, val) {
			j += '<option value="' + val.id + '">' +val.id+'-'+ val.name +'</option>'; });
			j += '</select>';
			$("#catJewelTypeC").html(j);
			$('#catJewelTypeObj').multiselect({
				includeSelectAllOption : true,
				enableFiltering : true,
				maxHeight : 250,
				searchable: true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
	});
}

$("#showHideJtype").hide();
$("#typeC").on('change', function(){
	var neVal = $("#typeC").val();
	$("#stoneSegIdC").prop('disabled', false);
	$("#accSegIdC").prop('disabled', false);
	if(neVal == "S"){
		$("#accSegIdLabel").hide();
	    $("#accSegIdC").hide();
		$("#stoneSegIdLabel").show();
		$("#stoneSegIdC").show();
		
		$("#segmDecsCLabel").show();
		$("#segmDecsC").show();
		$("#accDecsCLabel").hide();
	    $("#accDecsC").hide();
	    $("#showHideJtype").hide();
	}else if(neVal == "AC"){
		$("#stoneSegIdLabel").hide();
		$("#stoneSegIdC").hide();
		$("#accSegIdLabel").show();
	    $("#accSegIdC").show();
	    
	    $("#segmDecsCLabel").hide();
	    $("#segmDecsC").hide();
	    $("#accDecsCLabel").show();
		$("#accDecsC").show();
		$("#showHideJtype").hide();
	} else{
		$("#showHideJtype").show();
		$("#stoneSegIdLabel").hide();
		$("#stoneSegIdC").hide();
		$("#accDecsCLabel").hide();
		$("#accDecsC").hide();
		$("#stoneSegIdLabel").hide();
		$("#stoneSegIdC").hide();
		$("#accSegIdLabel").hide();
	    $("#accSegIdC").hide();
	    $("#segmDecsCLabel").hide();
	    $("#segmDecsC").hide();
	}
});
//############# Category Field Filters #####################
var categoryFieldFilters = function() {
	var catType = $('#catType').val();
	var stoneSegIdS = $('#stoneSegIdS').val();
	var accSegIdS = $('#accSegIdS').val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (catType != null && catType != "") {
		fieldFilters.fieldFilters["type"] = catType;
	}
	if(catType == "S"){
		if (stoneSegIdS != null && stoneSegIdS != "") {
			fieldFilters.fieldFilters["segment"] = stoneSegIdS;
		}
	}
	
	/*if (accSegIdS != null && accSegIdS != "") {
		fieldFilters.fieldFilters[""] = accSegIdS;
	}*/
	return fieldFilters;
}

//############# Category Search Grid Started ######################################
function categoryGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' : 'type',
		'type' : 'string'
	}, {
		'name' : 'catId',
		'type' : 'long',
		'map' :  'id'
	}, {
		'name' : 'catCode',
		'map' : 'code',
		'type' : 'String'
	}, {
		'name' : 'catDesc',
		'map' : 'description',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'long',
		'map'  :'segment>description'
	},{
		'name' : 'id',
		'type' : 'int'
	}];
	var columns = [ {
		'text' : 'Type',
		'datafield' : 'type',
		'width' : '18%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Category Id',
		'datafield' : 'catId',
		'width' : '15%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Category Code',
		'datafield' : 'catCode',
		'width' : '15%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Category Description',
		'datafield' : 'catDesc',
		'width' : '28%',
		cellsalign : 'left',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Stone Segment Id',
		'datafield' : 'segment',
		'width' : '21.5%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},{
		text : '',
		datafield : 'id',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		cellsrenderer : viewMetalTypeRenderer,
		filterable: false,
		sortable : false,
		'width' : '2.5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchCategory", "list",columns,categoryFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowdetails : true,
		virtualmode : true	
	});
}

$('#categorySearch').on('click', function() {
	var catType = $("#catType").val();
	if(catType == "" || catType == null){
		$.growl.error({ message: "Category Type is Required!", duration: 5000, title: 'Error' });
		return false;
	}
	categoryGrid();
	$("#jqxgrid").show();
	
});

$("#clearCat").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('listOfChildMasters', 'bodySwitcher')";
});

//###################### Category Started ##########################

$('#createCat').on("click",function(){
	onloadJewelType();
	categoryModalGrid();	
	$("#jqxgridCat").show();
})

//Generate Row for Segment

var rowId = 0;
var generaterowC = function(i) {
	var row = {};
	
	if($("#typeC").val()=="S"){
		
		row["segmDecsC"] =  $("#stoneSegIdC option:selected").text();
		row["stoneSegIdC"] =  $("#stoneSegIdC").val();
		row["typeC"] = $("#typeC").val();
		row["catIdC"] =  $("#catIdC").val();
		row["catCodeC"] = $("#catCodeC").val();
		row["catDecsC"] = $("#catDecsC").val();
	}else 
		if($("#typeC").val()=="AC"){
		row["segmDecsC"] =  $("#accSegIdC option:selected").text();
		row["accSegIdC"] =  $("#accSegIdC").val();
		row["typeC"] = $("#typeC").val();
		row["catIdC"] =  $("#catIdC").val();
		row["catCodeC"] = $("#catCodeC").val(); 
		row["catDecsC"] = $("#catDecsC").val();
	}else{
		row["typeC"] = $("#typeC").val();
		row["catCodeC"] = $("#catCodeC").val();
		row["catDecsC"] = $("#catDecsC").val();	
	}		
	rowId = rowId + 1;
	return row;
}

//Validation and Adding the Rows in AddGrid CATEGORY
$('#createCatC').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {	
		"typeC" : {required : true},
		"catDecsC" : {required : true},
		"catCodeC" : {regx : /^[A-Z]+$/,maxlength : 4,required : true}
	},
	messages : {
		'catCodeC' : {
			regx : "Only capital letter allowed!",
			maxlength : "Code should be maximum of 4 character!"
		}						
	},
submitHandler : function(form) {
	
	 var type = $("#typeC").val();
	 var seg = $('#stoneSegIdC').val();
	 var accSegIdC = $('#accSegIdC').val();
	 
		if(type == "S"){
			if((seg == null || seg == "")){
				$.growl.error({
					message : "Please fill all the mandatory feilds!.",
					duration : 10000
				});
				return false;
			}
		}
		if(type == "AC"){
			if((accSegIdC == null || accSegIdC == "")){
				$.growl.error({
					message : "Please fill all the mandatory feilds!.",
					duration : 10000
				});
				return false;
		 	 } 
		 }
		$("#jqxgridCat").jqxGrid('addrow', null, generaterowC(rowId + 1));
	}
});

//################# create grid for Category ##################
var categoryModalGrid = function() {

	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [ {
		'name' :'typeC',
		'type' :'string'
	}, {
		'name' :'catIdC',
		'type' :'string'
	}, {
		'name'  :'catCodeC',
		'type' : 'string'
	}, {
		'name' : 'catDecsC',
		'type'  :'string'
	}, {
		'name'  :'stoneSegIdC',
		'type'  :'string'
	}, {
		'name' : 'segmDecsC',
		'type' : 'string'
	}, {
	    'name' : 'accDecsC',
	    'type' : 'string'
    }, {
	   'name' : 'accSegIdC',
	   'type' : 'string'

}];
	
	var columns = [ {
		'text'  :'Type',
		'datafield':  'typeC',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Cat Id',
		'datafield' : 'catIdC',
		'width'  :'10%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
		'text' : 'Cat Code',
		'datafield' : 'catCodeC',
		'width' : '20%',
		cellsalign  :'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text'  :'Category Description',
		'datafield' : 'catDecsC',
		'width' : '30%',
		cellsalign  :'left',
		align:'center',
		sortable : false,
		editable  :false
	}, {
		'text' : 'Stone Seg Id',
		'datafield' : 'stoneSegIdC',
		'hidden'  : true,
		'width'  :'12%',
		cellsalign  :'center',
		align:'center',
		sortable : false,
		editable  :false
	}, {
		'text' : 'Stone/Acc Segment',
		'datafield' : 'segmDecsC',
		'width':  '20%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},/*{
		'text' : 'Acc Decsription',
		'datafield' : 'accDecsC',
		'width':  '10%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	}, {
		'text' : 'Acc Seg Id',
		'datafield' : 'accSegIdC',
		'width':  '10%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},*/{
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
			id = $("#jqxgridCat").jqxGrid('getrowid', row);
			$("#jqxgridCat").jqxGrid('deleterow', id);		
		}
	}];

	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridCat');
	$("#jqxgridCat").jqxGrid({
		width : '100%',
		theme: 'energyblue',
	});
}
$("#senemntReg").hide();
$("#accRegId").hide();

$("#typeC").on("change",function(){
	var type = $("#typeC").val();
	var seg = $('#stoneSegIdC').val();
	if(type == "S"){
		$("#senemntReg").show();
	}
	if(type == "AC"){
		$("#accRegId").show();
	}
	
});

// lov for segment 
$('#stoneSegIdS').empty().append('<option value="" selected>--Select--</option>');
$('#stoneSegIdC').empty().append('<option value="" selected>--Select--</option>');
$('#stoneSegIdE').empty().append('<option value="" selected>--Select--</option>');

$.getJSON('/OrderExecution/api/v1/stoneCombinationLOV', function(data) {	
		$.each(data.payload.StoneSegments, function(key, val) {
			$('#stoneSegIdS').append('<option value="' + val.id + '">' + val.description + '</option>');
			$('#stoneSegIdC').append('<option value="' + val.id + '">' + val.description + '</option>');
			$('#stoneSegIdE').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});
$('#accSegIdE').empty().append('<option value="" selected>--Select--</option>');
$('#accSegIdS').empty().append('<option value="" selected>--Select--</option>');
$('#accSegIdC').empty().append('<option value="" selected>--Select--</option>');

$.getJSON('/OrderExecution/api/v1/accessorySegmentLOV',function(data) {
	var slist = data.payload.accessory;
	$.each(slist, function(key, val) {
		$('#accSegIdS').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#accSegIdC').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#accSegIdE').append('<option value="' + val.name + '" ids="'+ val.id +'">' + val.description + '</option>');
	 });
});

var validateCategory = function() {
	var jwlTypeDet;
	var jewelTypeTObj = $("#catJewelTypeObj").val();
	var jTypeDetArr=[];
	
	$.each(jewelTypeTObj,function(key,val){
		console.log(val);
		 jwlTypeDet  = {
				"id": val
		}
		 jTypeDetArr.push(jwlTypeDet);
	})
	console.log(jTypeDetArr);
	
	var catLines = [];
	var rows = $('#jqxgridCat').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if(row.typeC == "M"){
			catLines.push({			
				"type" : row.typeC,
		        "description" : row.catDecsC,
				"code" : row.catCodeC,
				"stoneOrAcId" :((row.typeC=="S")?row.stoneSegIdC:row.accSegIdC),
				"jewelTypeDTOs": jTypeDetArr
			});
		}else{
			catLines.push({			
				"type" : row.typeC,
		        "description" : row.catDecsC,
				"code" : row.catCodeC,
				"stoneOrAcId" :((row.typeC=="S")?row.stoneSegIdC:row.accSegIdC),
			});
		}
    }
	return catLines;
 }

// Creating the Jewel Type
$("#saveCatagory").on('click',function() {	
	trimmer();
	var chekUniqArr = [];
	 var rows = $('#jqxgridCat').jqxGrid('getrows');
		
	 for (var i = 0; i < rows.length; i++) {
			
			var row = rows[i];
			console.log(row.catCodeC);
			if(chekUniqArr.indexOf(row.catCodeC) == -1){
				chekUniqArr.push(row.catCodeC);
			}else{
				$.growl.error({
					message : "Please enter unique Category Code.",
					duration : 10000
				});
				return false;
			}
	      }
		var segLines = [];		
		var segLines = validateCategory();
		console.log(segLines);
		if (segLines) {		
	  postJSON('/OrderExecution/api/v1/ctreateCategory',JSON.stringify(segLines), function(data) {
			if (data.resCode == "1") {
			  $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			 $("#createCategory").modal('hide');
			// categoryGrid();
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			 }
	   });
	}
});

var loadJewelType = function(jewelType){
	jTypeDetArrE = jewelType;
	$('#catJewelTypeE').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/getJewelLOV', function(data) {
		var catJewelTypeE = data.payload.jewelType;
		
		var s = '<select id="catJewelTypeEditObj"  name="catJewelTypeEditObj" class="form-control" multiple="multiple">';
		if(jewelType == null){
			$.each(catJewelTypeE, function(key, val) {					
				s += '<option value="' + val.id + '">' +  + val.id+'-'+ val.name +
						+ '</option>';	
			});
		}else{
			 var result = [];
			
			 $.each(catJewelTypeE, function(key, val) {	
				 $.each(jewelType, function(k,v){
					 if( v.id == val.id){		
						 result.push(val.id);
						 s += '<option selected disabled="disabled" value="' + val.id + '">'  + val.id+'-'+ val.name + '</option>';
					}
				 });
				 
				 if (result.indexOf(val.id) == -1){
					 result.push(val.id);
					 s += '<option value="' + val.id + '">' + val.id+'-'+ val.name + '</option>';
				 }
				
			})
		}
		s += '</select>';
		$("#catJewelTypeE").html(s);
		$('#catJewelTypeEditObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	});
}


// Edit Functionality of the Category
$("#showHideJtypeE").hide();
var editCategory = function(row,value) {
	var rows = $("#jqxgrid").jqxGrid('getrows');
	var type = $('#jqxgrid').jqxGrid('getcellvalue', row, 'type');
	$('#popupheaderlabelCat').text('Edit Category details');
	
	$.getJSON('/OrderExecution/api/v1/getCategoryById?type='+type+'&id='+ value,function(data) {		
	var selectedRowData = data.payload.category;	
	var selectedRowDataAcc = data.payload.category.accessorySegment;
		if(selectedRowData.type == "S"){
			$("#showHideJtypeE").hide();
			$("#accSegIdE").hide();
		    $("#AccSegIdE").hide();
		    $("#accDecsELabel").hide();
		    $("#accDecsE").hide();
		    
		    $("#stoneSegIdE").show();
			$("#stnSegIdE").show();
			$("#segmDecsELabel").show();
			$("#segmDecsE").show();
		}else if(selectedRowData.type == "AC"){
			$("#showHideJtypeE").hide();
			$("#stoneSegIdE").hide();
			$("#stnSegIdE").hide();
			$("#segmDecsELabel").hide();
			$("#segmDecsE").hide();
			
			$("#accSegIdE").show();
		    $("#AccSegIdE").show();
		    $("#accDecsELabel").show();
		    $("#accDecsE").show();
		}else{
			$("#showHideJtypeE").show();
			$("#stoneSegIdE").hide();
			$("#stnSegIdE").hide();
			$("#segmDecsELabel").hide();
			$("#segmDecsE").hide();
			$("#accSegIdE").hide();
		    $("#AccSegIdE").hide();
		    $("#accDecsELabel").hide();
		    $("#accDecsE").hide();
		    
		    if(selectedRowData.jewelTypeDTOs != null){
		    	loadJewelType(selectedRowData.jewelTypeDTOs);
			}else{
				loadJewelType(null);
			}
			
		}
		$("#catIdE").val(selectedRowData.id);
		$("#catDescE").val(selectedRowData.description);	
		$("#catCodeE").val(selectedRowData.code);		
		$("#cTypeE").val(selectedRowData.type);
		$("#stoneSegIdE").val(selectedRowData.stoneOrAcId);
		
		if(selectedRowData.type == "AC"){
			$("#accSegIdE").val(selectedRowDataAcc.code);	
			$("#accDecsE").val(selectedRowDataAcc.description);	
		}
		if(selectedRowData.type == "S"){
			$("#segmDecsE").val(selectedRowData.segment.description);	
		}	
	});
	
}

var jTypeDetArrE=[];
var updateCategory = function() {
	var jwlTypeDetE;
	var jewelTypeEObj = $("#catJewelTypeEditObj").val();
	
	$.each(jewelTypeEObj,function(key,val){
		jwlTypeDetE  = {
				"id": parseInt(val)
		}
		jTypeDetArrE.push(jwlTypeDetE);
	})
	var categoryUpdationDetails;
	if($("#cTypeE").val() == "M"){
		 categoryUpdationDetails = {
					"id" : ($("#catIdE").val()),
					"description" : $("#catDescE").val(),
					"code" : $("#catCodeE").val(),
					"type" : $("#cTypeE").val(),
					"stoneOrAcId" :($("#cTypeE").val()=="S")? ($("#stoneSegIdE").val()): ($("#accSegIdE option:selected").attr('ids')),
					"jewelTypeDTOs" : jTypeDetArrE 
				}
	}else{
		 categoryUpdationDetails = {
					"id" : ($("#catIdE").val()),
					"description" : $("#catDescE").val(),
					"code" : $("#catCodeE").val(),
					"type" : $("#cTypeE").val(),
					"stoneOrAcId" :($("#cTypeE").val()=="S")? ($("#stoneSegIdE").val()): ($("#accSegIdE option:selected").attr('ids')),
				}
	}
	return categoryUpdationDetails;
}
	
//Update Functionality of the CATEGORY
$("#categoryE").validate(
{
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {			
		"catDescE" : {required : true},
		"catCodeE" : {regx : /^[A-Z]+$/,maxlength : 4}
	},
	messages : {
		'catCodeE' : {regx : "Only capital letter allowed!",	maxlength : "Code should be maximum of 4 character!"},
	},
   submitHandler : function(form) {
	   trimmer();
		var catType = updateCategory();
		if (catType) {
		postJSON('/OrderExecution/api/v1/updateCategory', JSON.stringify(catType), function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
		        }); 
				$('#btnEditCategory').modal('hide');
				//categoryGrid();
				$('#createCategory').on('hidden.bs.modal',	function() {
					$(this).find('form').trigger('reset');
			});
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