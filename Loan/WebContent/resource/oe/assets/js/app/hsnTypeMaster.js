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

//$('#hsnTypeDetS').show();
$('#hsnSacDetS').hide();

$('input[name=hsnMaster]:radio').click(function() {
	var selectedVal = $(this).val();
	if (selectedVal == 1) {
		$('#hsnTypeDetS').show();
		$('#hsnSacDetS').hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');

	} else if (selectedVal == 2) {
		$('#hsnTypeDetS').hide();
		$('#hsnSacDetS').show();
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');	
	}
});

// On load Lov
var onloadLov = function(){
$('#hsnTypeS').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/getHsnTypeLOV', function(data) {
		$.each(data.payload.HSNType, function(key, val) {
		$('#hsnTypeS').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});
}

onloadLov();
//############# HSN Type Field Filters #####################
var hsnTypeFieldFilters = function() {
	var hsnTypeS = $('#hsnTypeS').val();	
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (hsnTypeS != "" && hsnTypeS != null) {
		fieldFilters.fieldFilters["type"] = hsnTypeS;
	}	
	return fieldFilters;
 }

//###################### create HSN Type Master Started ######################
var saveHsnTypeC = function() {
	var hsnTypeDetails = [{
		"type" : $("#hsnTypeC").val(),
		"description" : $("#hsnNameC").val(),
		"isHsn" : $("#isHsnC").val(),
	}]
	return hsnTypeDetails;
}

//  Create and save HSN Type Master 
$('#saveHsnType').on('click', function(){	
	trimmer();
	var hsnTypeC = $("#hsnTypeC").val();
	var hsnNameC = $("#hsnNameC").val();
	var isHsnC = $("#isHsnC").val();
		if(hsnTypeC == null || hsnTypeC == "" || hsnNameC == "" || hsnNameC == null || isHsnC == "" || isHsnC == null){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	   }		
		var hsnTypeDetailsC = saveHsnTypeC();
		if (hsnTypeDetailsC) {
		postJSON('/OrderExecution/api/v1/createHSNType',JSON.stringify(hsnTypeDetailsC),function(data) {
			if (data.resCode == "1") {
				onloadLov();
				onloadHsnSacLov();
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#createHsnTypeM').modal('hide');
				hsnTypeSearchGrid();
			}else if  (data.resCode == "3") {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title :"Error"
				});
				return false;
			}	
			
		});
	     } else {
	    	 $.growl.error({
	    		 message : "Please fill the compolsary field!!",
	    		 duration : 10000
			});
	      }	
       });

// ##################### Search Grid Started #######################
function hsnTypeSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'type',
		'type' : 'string',
		'map'  : 'type'
	}, {
		'name' : 'name',
		'type' : 'string',
		'map' : 'description'
	},{
		'name' : 'isHsn',
		'type' : 'string',
		'map' :  'isHsn'
	}, {
		'name' : 'actionIdE',
		'type' : 'int',
		'map' : 'id'
	}];
	var columns = [ {
		'text' : 'Type',
		'datafield' : 'type',
		'width' : '32%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Name',
		'datafield' : 'name',
		'width' : '45%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Is HSN',
		'datafield' : 'isHsn',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdE',
		cellsrenderer : hsnTypeEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '3%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchHSNType", "list",columns, hsnTypeFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({		
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :true,
    	theme: 'energyblue',
        columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

$("#hsnTypeSearch").on('click', function() {
	var typeS = $("#hsnTypeS").val();
	console.log(typeS);
		if(typeS == "" || typeS == null){
			$.growl.error({
				message : "Please Select HSN Type !!!",
				duration : 10000,
				'title' : 'Error'
			});
			return false;
		}
		else{
			hsnTypeSearchGrid();
			$("#jqxgrid").show();
		}
});

//############### HSN Type Edit Started ########################3
var hsnTypeEdit = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditHsnType"  type="button" id='
			+ row
			+ ' onclick="editHsnType('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>'
	}
}

var editHsnType = function(id) {
	$('#popupheaderlabel').text('Edit HSN Type');
		$.getJSON('/OrderExecution/api/v1/getHsnById?hsnId=' + id, function(data) {
			var selectedRowData = data.payload.HSNType;
			
			$("#hsnIdE").val(selectedRowData.id);
			$("#typeE").val(selectedRowData.type);			
			$("#hsnNameE").val(selectedRowData.description);
			$("#isHsnE").val(selectedRowData.isHsn);		
		});	
	}

// Update HSN Type Master
var updateHsnType = function() {
	var updateHsnTypeE = {
		"id" : $("#hsnIdE").val(),
		"type" : $("#typeE").val(),
		"description" : $("#hsnNameE").val(),
		"isHsn" : $("#isHsnE").val()
	  }
	return updateHsnTypeE;
};

//Update and save Hsn Type Master
$('#hsnTypeE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "hsnNameE": { required: true }    
    },
    submitHandler: function (form) { 
    	trimmer();
    	var updateHsnE = updateHsnType();
			if (updateHsnE) {postJSON('/OrderExecution/api/v1/updateHSNType',JSON.stringify(updateHsnE), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#btnEditHsnType').modal('hide');
					$('#createHsnTypeM').on('hidden.bs.modal',function() {
						$(this).find('form').trigger('reset');
				});
					hsnTypeSearchGrid();
					onloadLov();
					onloadHsnSacLov();
				}else if(data.resCode == "3"){
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
				$('#btnEditHsnType').modal('hide');
			});
		}
   }  
});  

//Clear grid and reset input and Drop down value
$("#clearHsnType").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});