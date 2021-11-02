/*<!-- 
	##	Author1 (UI)    :   Pooja
	## 	Author2 (Java)	:   Manoranjan
	##	Date Creation 	: 	01-08-2017
	## 	Description		:	Category Create,Edit and Search Functionalities
 -->
*/

// LOV's API Integration

//$('#sJTypeS').empty().append('<option value="" selected>--Select--</option>');
//$('#jTypeC').empty().append('<option value="" selected>--Select--</option>');

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

$('#jewelTypeE').empty().append('<option value="" selected>--Select--</option>');

$.getJSON('/OrderExecution/api/v1/jewelTypeLOV', function(data) {	
		$.each(data.payload.Jeweltypes, function(key, val) {
			//$('#sJTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
			//$('#jTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#jewelTypeE').append('<option value="' + val.name + '" ids="'+val.id+'">' + val.name + '</option>');
	});
});

$("#categoryIdC").on('change',function(){
	var catId = $("#categoryIdC").val();
	$('#jTypeC').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/jewelLOV?id='+catId, function(data) {	
		$.each(data.payload.jewelLov, function(key, val) {
			$('#jTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});
})

$("#categoryIdE").on('change',function(){
	var catId = $("#categoryIdE option:selected").attr('ide');
	console.log(catId);
	$('#jewelTypeE').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/jewelLOV?id='+catId, function(data) {	
		$.each(data.payload.jewelLov, function(key, val) {
			$('#jewelTypeE').append('<option value="' + val.name + '" ids="'+val.id+'">' + val.name + '</option>');
	});
});
})

$("#jewHide").hide();
$("#sTypeC").on("change",function(){
	$('#categoryIdC').empty().append('<option value="" selected>--Select--</option>');
	  if($("#sTypeC").val() == "M"){
		  $("#jewHide").show();
	  }else{
		 $("#jewHide").hide(); 
	  }
	  var type=$("#sTypeC").val();
		if(type !=" "){
		$.getJSON('/OrderExecution/api/v1/getCategoryByType?type=' + type, function(data) {	
			$.each(data.payload.CateGories, function(key, val) {
				$('#categoryIdC').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
	     });
	   }
	})
/*$("#scTypeE").on("change",function(){
  $('#categoryIdE').empty().append('<option value="" selected>--Select--</option>');
    var type=$("#scTypeE").val();  
if(type !=" "){
$.getJSON('/OrderExecution/api/v1/getCategoryByType?type=' + type, function(data) {	
	$.each(data.payload.CateGories, function(key, val) {
		$('#categoryIdE').append('<option selected value="' + val.name + '" idE="'+val.id+'">' + val.name + '</option>');
	   });
   });
  }
})*/


$("#subCatType").on('change',function(){
	var type = $("#subCatType").val();
	$('#subCatDescS').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/subCatByType?type='+type, function(data) {	
		$.each(data.payload.subCateGories, function(key, val) {
			$('#subCatDescS').append('<option value="' + val.id + '">' + val.description + '</option>');
		   });
	   });
})
//############# Sub-Category Field Filters #####################
var subCategoryFieldFilters = function() {
	var subCatType = $('#subCatType').val();
	var subCatDescS = $('#subCatDescS').val();
	var sJTypeS = $('#sJTypeS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (subCatType != "" && subCatType != null) {
		fieldFilters.fieldFilters["type"] = subCatType;
	}
	if (subCatDescS != "" && subCatDescS != null) {
		fieldFilters.fieldFilters["id"] = subCatDescS;
	}
	if (sJTypeS != "" && sJTypeS != null) {
		fieldFilters.fieldFilters["jeweltype"] = sJTypeS;
	}	
	return fieldFilters;
}

//############# Sub Category Search Grid Started ######################################
function subCategoryGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' : 'sType',
		'type' : 'string',
		'map' : 'type'
	}, {
		'name' : 'sCatId',
		'type' : 'long',
		'map' :  'id'
	}, {
		'name' : 'sCatCode',
		'map' : 'code',
		'type' : 'String'
	}, {
		'name' : 'sCatDesc',
		'map' : 'description',
		'type' : 'string'
	}, {
		'name' : 'categoryId',
		'type' : 'long',
		'map' : 'categoryDto>code'
	}, {
		'name' : 'jewelType',
		'type' : 'string',
		'map' : 'jeweltypeDto>description'
	}, {
		'name' : 'id',
		'type' : 'int'
	}];
	var columns = [ {
		'text' : 'Type',
		'datafield' : 'sType',
		'width' : '12%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Sub Category Id',
		'datafield' : 'sCatId',
		'width' : '25%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Sub Category Code',
		'datafield' : 'sCatCode',
		'width' : '15%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Sub Category Description',
		'datafield' : 'sCatDesc',
		'width' : '25%',
		cellsalign : 'left',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Category Id',
		'datafield' : 'categoryId',
		'width' : '20%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},/* {
		'text' : 'Jewel Type',
		'datafield' : 'jewelType',
		'width' : '15%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}*/,{
		text : '',
		datafield : 'id',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		cellsrenderer : subCatEdit,
		filterable: false,
		sortable : false,
		'width' : '3%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchSubCategory", "list",columns, subCategoryFieldFilters(), updateRows, "");	
		$("#jqxgrid").jqxGrid({
			width : '100%',
	        sortable: true,            
	     	altrows: true,
	    	columnsresize: true, 
			rowsheight : 35,
			theme: 'energyblue',
			rowdetails : true,
			virtualmode : true	
		});
}
$('#subCatSearch').on('click', function() {
	var subCatType = $("#subCatType").val();
	if(subCatType == "" || subCatType == null){
		$.growl.error({ message: "Sub Category Type is Required!", duration: 5000, title: 'Error' });
		return false;
	}
	subCategoryGrid();
	$("#jqxgrid").show();
	
});

$("#clearSubCat").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('listOfChildMasters', 'bodySwitcher')";
});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});


//###################### Sub-Category Create Started ##########################

$('#createSubCat').on("click",function(){
	subCatModalGrid();	
	$("#jqxgridB").show();
})

var subCatModalGrid = function() {

	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [ {
		'name' :'sTypeC',
		'type' :'string'
	}, {
		'name' :'sCatIdC',
		'type' :'string'
	}, {
		'name'  :'sCatCodeC',
		'type' : 'string'
	}, {
		'name' : 'sCatDecsC',
		'type'  :'string'
	}, {
		'name'  :'categoryIdC',
		'type'  :'string'
	}, {
		'name'  :'categoryIdCName',
		'type'  :'string'
	}, {
		'name' : 'jTypeC',
		'type' : 'string'
	}, {
		'name' : 'jTypeCName',
		'type' : 'string'
	}];
	
	var columns = [ {
		'text'  :'Type',
		'datafield':  'sTypeC',
		'width' : '11%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Sub-Cat Id',
		'datafield' : 'sCatIdC',
		'width'  :'11%',
		sortable  :false,
		cellsalign : 'center',
		hidden : true,
		align:'center',
		editable:  false
	}, {
		'text' : 'Sub-Cat Code',
		'datafield' : 'sCatCodeC',
		'width' : '13%',
		cellsalign  :'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text'  :'Sub-Category Description',
		'datafield' : 'sCatDecsC',
		'width' : '25%',
		cellsalign  :'left',
		align:'center',
		sortable : false,
		editable  :false
	}, {
		'text' : 'Category Id',
		'datafield' : 'categoryIdC',
		'width'  :'15%',
		cellsalign  :'center',
		align:'center',
		sortable : false,
		hidden: true,
		editable  :false
	}, {
		'text' : 'Category',
		'datafield' : 'categoryIdCName',
		'width'  :'18%',
		cellsalign  :'center',
		align:'center',
		sortable : false,
		editable  :false
	}, {
		'text' : 'Jewel Type',
		'datafield' : 'jTypeC',
		'width':  '23%',
		cellsalign : 'center',
		align:'center',
		hidden: true, 
		sortable: false,
		editable : false
	}, {
		'text' : 'Jewel Type',
		'datafield' : 'jTypeCName',
		'width':  '23%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
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
			id = $("#jqxgridB").jqxGrid('getrowid', row);
			$("#jqxgridB").jqxGrid('deleterow', id);		
		}		
	}];

	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridB');
	$("#jqxgridB").jqxGrid({
		theme: 'energyblue'
	});
}

//Generate Row for SUB-CATEGORY

var rowId = 0;
var generaterowS = function(i) {
	var row = {};
	row["sTypeC"] = $("#sTypeC").val();
	row["sCatIdC"] =  $("#sCatIdC").val();
	row["sCatCodeC"] = $("#sCatCodeC").val();
	row["sCatDecsC"] = $("#sCatDecsC").val();
	row["categoryIdC"] = $("#categoryIdC").val();
	row["categoryIdCName"] = $("#categoryIdC option:selected").text();
	row["jTypeC"] =  ($("#sTypeC").val() == "M") ? $("#jTypeC").val() : " ",
	row["jTypeCName"] = ($("#sTypeC").val() == "M") ? $("#jTypeC option:selected").text() : " ",
	
	rowId = rowId + 1;
	return row;
}

//Validation and Adding the Rows in AddGrid SUB-CATEGORY
$('#createSubCatC').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {	
		"sTypeC" : {required : true},
	    "categoryIdC" : {required : true},
		"sCatCodeC" : {	regx : /^[A-Z0-9]+$/,maxlength : 4,required : true},
	},
	messages : {
		'sCatCodeC' : {regx : "Only capital letter allowed!",maxlength : "Code should be maximum of 4 character!"},
	},
   submitHandler : function(form) {
		$("#jqxgridB").jqxGrid('addrow', null, generaterowS(rowId + 1));
		}
});

$("#addRowS").on('click',function(){
	var type = $("#sTypeC").val();
	var jType = $("#jTypeC").val();
	   if(type == "M"){
		   if(jType == "" || jType == null){
			   $.growl.error({
				   message : "Please Select Jewel Type!!",
				   duration : 10000,
				   title :'Error'
			   });
			   return false;
		   }else{
			 //  $("#jqxgridB").jqxGrid('addrow', null, generaterowS(rowId + 1));
		   }
	   }
});


$("#jwlTypeShw").hide();
$("#sTypeC").on('change',function(){
	var type = $("#sTypeC").val();
	if(type == "M"){
		$("#jwlTypeShw").show();
	}else{
		$("#jwlTypeShw").hide();
	}
});

var validateSubCategory = function() {
	var subCatLines = [];
	var rows = $('#jqxgridB').jqxGrid('getrows');

	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		console.log(row.sTypeC );
		if( row.sTypeC == "M"){
			subCatLines.push({	
				 "code": row.sCatCodeC,
				    "description": row.sCatDecsC,
				    "type": row.sTypeC,
				    "jeweltypeDto": {
				      "id": row.jTypeC,
				    },
				    "categoryDto": {
				      "id": row.categoryIdC,
				    }			
		});
		}else{
			subCatLines.push({	
			    "code": row.sCatCodeC,
			    "description": row.sCatDecsC,
			    "type": row.sTypeC,
			    "categoryDto": {
			      "id": row.categoryIdC,
			    }			
		});
		}
    }
	return subCatLines;
 }

// Creating the SUB-CATEGORY
$("#saveSubCatagory").on('click',function() {
	trimmer();
	 var rows = $('#jqxgridB').jqxGrid('getrows');
	 var chekUniqArr = [];
	 for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			if(chekUniqArr.indexOf(row.sCatCodeC) == -1){
				chekUniqArr.push(row.sCatCodeC);
			}else{
				$.growl.error({
					message : "Please enter unique Sub-Category Code.",
					duration : 10000
				});
				return false;
			}
	      }
		var subCatLines = [];		
		var subCatLines = validateSubCategory();
		if (subCatLines) {		
	  postJSON('/OrderExecution/api/v1/createSubCategory',JSON.stringify(subCatLines), function(data) {
			if (data.resCode == "1") {
			  $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			 $("#createSubCategory").modal('hide');
			// subCategoryGrid();
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			 }
	   });
	}
});
var subCatEdit = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditSubCategory"  type="button" id='
			+ row
			+ ' onclick="editSubCat('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>'
	}
}

var onLoadDropDown = function(CatE,typeE) {
	$('#categoryIdE').empty().append('<option value="" selected>--Select--</option>');	
	
	$.getJSON('/OrderExecution/api/v1/getCategoryByType?type=' + typeE, function(data) {
		var typeEs = data.payload.CateGories;
		$.each(typeEs, function(key, val) {			
			if (CatE == val.name) {
				$('#categoryIdE').append('<option selected value="' + val.name + '"idE="'+val.id+'">' + val.name + '</option>');
			} else {
				$('#categoryIdE').append('<option value="' + val.name + '"idE="'+val.id+'">' + val.name + '</option>');
			}	
		   });
	   });
	
}
onLoadDropDown();

var editSubCat = function(id) {	
	$('#popupheaderlabelSubCat').text('Edit SubCategory details');
	$.getJSON('/OrderExecution/api/v1/getSubcategoryById?id='+ id,function(data) {			
		var selectedRowData = data.payload.subcategory;	
		
		onLoadDropDown(selectedRowData.categoryDto.code,selectedRowData.type);
		
		if(selectedRowData.type=="M"){
			 $("#jewelTypeE").prop("disabled", false);
		}else{
			 $("#jewelTypeE").prop("disabled", true);
		}

		$("#scTypeE").val(selectedRowData.type);
		$("#sCIdE").val(selectedRowData.id);	
		$("#sCatCodeE").val(selectedRowData.code);
		
		$("#sCatDescE").val(selectedRowData.description);
		$("#categoryIdE").val(data.payload.subcategory.categoryDto.code);
		
		$("#catDespE").val(selectedRowData.categoryDto.description);	
		
		$("#subCatCreatedByE").val(selectedRowData.createdBy);
		$("#subCatCreatedOnE").val(selectedRowData.cretedDate);
		$("#subCatChangedByE").val(selectedRowData.lastChangedby);
		$("#subCatChangedOnE").val(selectedRowData.lastchangedDate);
		$("#jewelTypeE").val(data.payload.subcategory.jeweltypeDto.code);
		$("#jwlTypeDespE").val(selectedRowData.jeweltypeDto.description);
	});
	
};


var updateSubCategory = function() {
			var selectedRowData =  $("#scTypeE").val();	
			if(selectedRowData=="M"){
				var jwlTypeEdit = $("#jewelTypeE").val();
				if(jwlTypeEdit == null || jwlTypeEdit == ""){
					$.growl.error({ 
						message: "Jewel Type is Mandatory!",
						duration: 5000, 
						title: 'Error'
					});
					return false;
				}
			}
	var subCategoryUpdationDetails={
			    "id": $("#sCIdE").val(),
			    "code": $("#sCatCodeE").val(),
			    "description": $("#sCatDescE").val(),
			    "type": $("#scTypeE").val(),
			    "jeweltypeDto": {
			      "id": $("#jewelTypeE option:selected").attr('ids')
			    },
			    "categoryDto": {
			      "id": $("#categoryIdE option:selected").attr('idE')
			    }
	       }
	return subCategoryUpdationDetails;
}
	
//Update Functionality of the SUB-CATEGORY
$("#subCatE").validate(
{
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {			
		"scTypeE" : {required : true}
	},
   submitHandler : function(form) {	
	   trimmer();
	   
		var subCatType = updateSubCategory();
		if (subCatType) {
		postJSON('/OrderExecution/api/v1/updateSubCategory', JSON.stringify(subCatType), function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
		        }); 
				$('#btnEditSubCategory').modal('hide');	
				subCategoryGrid();
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