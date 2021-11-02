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

// On Load LOV'S
var onloadHsnSacLov = function(){
$('#hsnSacTypeS').empty().append('<option value="" selected>--Select--</option>');
$('#hsnSacTypeC').empty().append('<option value="" selected>--Select--</option>');
$('#hsnSacTypeE').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/getHsnTypeLOV', function(data) {
		$.each(data.payload.HSNType, function(key, val) {
		$('#hsnSacTypeS').append('<option code="' + val.name + '" value="' + val.id + '">' + val.description + '</option>');
		$('#hsnSacTypeC').append('<option code="' + val.name + '" value="' + val.id + '">' + val.description + '</option>');
		$('#hsnSacTypeE').append('<option code="' + val.name + '" value="' + val.id + '">' + val.description + '</option>');
	});
});
}
onloadHsnSacLov();

$('#segIdS').empty().append('<option value="" selected>--Select--</option>');
$('#segIdC').empty().append('<option value="" selected>--Select--</option>');
$('#segIdE').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/segmentLOv', function(data) {
		$.each(data.payload.segment, function(key, val) {
		$('#segIdS').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#segIdC').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#segIdE').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});

// HSN-SAC Master Field Filter
var hsnSacFieldFilters = function() {
	var hsnSacTypeS = $('#hsnSacTypeS').val();
	var segIdS = $('#segIdS').val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (hsnSacTypeS != "" && hsnSacTypeS != null) {
		fieldFilters.fieldFilters["hsnType"] = hsnSacTypeS;
	}
	if (segIdS != "" && segIdS != null) {
		fieldFilters.fieldFilters["segment"] = segIdS;
	}
	return fieldFilters;
 }

var saveHsnSacTypeC = function() {
	var hsnTypeSacDetails = [{
		"hsnTypeDTO" : {
			"id" : $("#hsnSacTypeC").val(),
		},
		"segmentDTO" : {
			"id" :  $("#segIdC").val(),
		},
		"hsnDescription" : $("#hsnSacDescC").val(),
		"hsnCode" : $("#hsnCodeC").val(),
	}]
	return hsnTypeSacDetails;
}

var validatehsnSacDetails = function() {	
	 $form = $('#createhsnSacC');
	    $form.validate({
	        errorElement: 'label', 
	        errorClass: 'help-inline', 
	        focusInvalid: false, 
	        ignore: "",
	      
	        rules: {
	        	"hsnCodeC": { 
	        		required: true ,	        	
	        		 regx : /^[0-9a-zA-Z\s]+$/,	                
	                 maxlength: 12
	        	}
	        },
	        messages: {
                "hsnCodeC": {
            		regx: "Only Numeric & Capital Letter Allowed!",            		
            		maxlength : "Maximum Length Exceeds!"
            	}
            }
	    });
	    if ($form.valid()) {
	    	 return true;
	    } else {
	    	 return false;
	    }
	    return false;
    }

//  Create and save HSN Type Master 
$('#saveHsnSac').on('click', function(){	
	var hsnSacTypeC = $("#hsnSacTypeC").val();
	var segIdC = $("#segIdC").val();
	var hsnSacDescC = $("#hsnSacDescC").val();
	var hsnCodeC = $("#hsnCodeC").val();
	var sacType = $("#hsnSacTypeC option:selected").attr('code');
    console.log(sacType);
		if(hsnSacTypeC == null || hsnSacTypeC == "" || hsnCodeC == "" || hsnCodeC == null || hsnSacDescC == "" || hsnSacDescC == null){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	   }
		if(sacType == "true"){
			if(segIdC == "" || segIdC == null){
				$.growl.error({
					message : "Please Select Segment!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
			else{}
		}else{}
		
		
		if(validatehsnSacDetails()){
		var hsnTypeSacDetailsC = saveHsnSacTypeC();
		if (hsnTypeSacDetailsC) {
		postJSON('/OrderExecution/api/v1/createHSNMaster',JSON.stringify(hsnTypeSacDetailsC),function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
					message : "HSN/SAC Master Created Successfully",
					duration : 10000,
					title : 'Success'
				});
				$('#createHsnSacM').modal('hide');
				hsnSacTypeSearchGrid();
				$("#jqxgrid").show();
			}else if(data.resCode == "3") {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
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
	  }
  });

//##################### Search Grid Started #######################
function hsnSacTypeSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'type',
		'type' : 'string',
		'map'  : 'hsnTypeDTO>type'
	}, {
		'name' : 'segId',
		'type' : 'string',
		'map' : 'segmentDTO>description'
	}, {
		'name' : 'hsnCode',
		'type' : 'string',
		'map' : 'hsnCode'
	},{
		'name' : 'description',
		'type' : 'string',
		'map' :  'hsnDescription'
	}, {
		'name' : 'actionIdE',
		'type' : 'int',
		'map' : 'id'
	}];
	var columns = [ {
		'text' : 'Type',
		'datafield' : 'type',
		'width' : '27%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segId',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'HSN Code',
		'datafield' : 'hsnCode',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Description',
		'datafield' : 'description',
		'width' : '30%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdE',
		cellsrenderer : hsnSacTypeEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '3%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchHSNMaster", "list",columns, hsnSacFieldFilters(), updateRows, "");
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

$("#hsnSacSearch").on('click', function() {
	var hsnSacTypeS = $("#hsnSacTypeS").val();
		if(hsnSacTypeS == "" || hsnSacTypeS == null){
			$.growl.error({
				message : "Please Select Mandatory Field!!!",
				duration : 10000,
				'title' : 'Error'
			});
			return false;
		}
		else{
		hsnSacTypeSearchGrid();
		$("#jqxgrid").show();
	}
});

//############### HSN Type Edit Started ########################3
var hsnSacTypeEdit = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditHsnSac"  type="button" id='
			+ row
			+ ' onclick="editHsnSac('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>'
	}
}

var editHsnSac = function(id) {
	$('#popupheaderlabelH').text('Edit HSN-SAC Master');
		$.getJSON('/OrderExecution/api/v1/getHsnMasterById?hsnMasterId=' + id, function(data) {
			console.log(data.payload.HsnMaster);
			var selectedRowData = data.payload.HsnMaster;
			$("#hsnSacIdE").val(selectedRowData.id);
			$("#hsnSacTypeE").val(selectedRowData.hsnTypeDTO.id);			
			$("#segIdE").val((selectedRowData.segmentDTO != null) ? selectedRowData.segmentDTO.id : "");
			$("#hsnCodeE").val(selectedRowData.hsnCode);	
			$("#hsnSacDescE").val(selectedRowData.hsnDescription);		
		});	
	}

//Update HSN Type Master
var updateHsnSacType = function() {
	var updateHsnSacE = {
		"id":$("#hsnSacIdE").val(),
		 "hsnTypeDTO": {
		  "id": $("#hsnSacTypeE").val()
		},
		  "segmentDTO": {
		  "id":$("#segIdE").val()
			    },
		  "hsnDescription": $("#hsnSacDescE").val(),
		   "hsnCode": $("#hsnCodeE").val()
	  }
	return updateHsnSacE;
};

//Update and save Hsn Type Master
$('#hsnSacMasterE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "hsnSacTypeE": { required: true },
        "segIdE": { required: true }  
    },
    submitHandler: function (form) { 
    	var updateHsnSacTypeE = updateHsnSacType();
			if (updateHsnSacTypeE) {postJSON('/OrderExecution/api/v1/updateHsnMaster',JSON.stringify(updateHsnSacTypeE), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#btnEditHsnSac').modal('hide');
					$('#createHsnSacM').on('hidden.bs.modal',function() {
						$(this).find('form').trigger('reset');
				});
					hsnSacTypeSearchGrid();
				}else if(data.resCode == "3"){
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
				$('#btnEditHsnSac').modal('hide');
			});
		}
   }  
});  

$("#editHsnSacE").on('click',function(){
	var segIdE = $("#segIdE").val();
	var hsnSacTypeE  = $("#hsnSacTypeE").val();
	if(segIdE ==  "" || segIdE == null || hsnSacTypeE == "" || hsnSacTypeE == null){
		$.growl.error({
			message : "Please Select Mandatory Fields!!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
});

//Export functionality
$("#hsnSacExport").on("click",function() {
		var data;
		var hsnSacTypeS = $('#hsnSacTypeS').val();
		var segIdS = $('#segIdS').val();
		
		fieldFilters = {
				"fieldFilters" : {}
			};
		if (hsnSacTypeS != "" && hsnSacTypeS != null) {
			fieldFilters.fieldFilters["hsnType"] = hsnSacTypeS;
		}
		if (segIdS != "" && segIdS != null) {
			fieldFilters.fieldFilters["segment"] = segIdS;
		}
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		var rows = $('#jqxgrid').jqxGrid('getrows');
			if (  rows == undefined || rows == 0 ) {
					$.growl.error({
							message : "No Data To Export",
							duration : 10000
						});
						return false;
					}else{
						var rows = $("#jqxgrid").jqxGrid('getdatainformation');
						if(rows.rowscount != 0){
							var newData = [];					
					postJSON('/OrderExecution/api/v1/exportHsnMaster',JSON.stringify(fieldFilters),function(response) {
						data = response.payload.list;
							for (i = 0; i < data.length; i++) {
								newData.push({	
									'HSN Type' : (data[i].hsnTypeDTO != null) ? data[i].hsnTypeDTO.type : "",
									'Segment' : (data[i].segmentDTO != null) ? data[i].segmentDTO.description : "",
									'HSN Code' : (data[i].hsnCode != null) ? data[i].hsnCode : "",
									'HSN Description' : (data[i].hsnDescription != null) ? data[i].hsnDescription : "",
								});
							}
							//JSONToCSVConvertor(newData, "HSN-SAC Master" + "_" + sysdate, true);
							var opts = [{sheetid:'HSN-SAC_Master',header:true}];
					        var res = alasql('SELECT * INTO XLSX("HSN-SAC Master_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
						});	
						}else{
							   $.growl
								.error({
									message : "No Data To Export",
									duration : 10000
								});
							   return false;	
							   }
						   }
				});


//Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

$.validator.addMethod("regx", function(value, element, regexp) {
	if (regexp.constructor != RegExp)
		regexp = new RegExp(regexp);
	else if (regexp.global)
		regexp.lastIndex = 0;
	return this.optional(element) || regexp.test(value);
}, "");


$('#createHsnTypeM').on('hidden.bs.modal', function() {
	$("form").trigger("reset");
});

$('#createHsnSacM').on('hidden.bs.modal', function() {
	$("form").trigger("reset");
});

$('#btnEditHsnType').on('hidden.bs.modal', function() {
	$("form").trigger("reset");
});

$('#btnEditHsnSac').on('hidden.bs.modal', function() {
	$("form").trigger("reset");
});