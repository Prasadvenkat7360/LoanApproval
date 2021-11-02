    /**
 * ## AUTHOR : POOJA
 * ## AUTHOR 2:  DIPANKAR NAHA 
 * ## DATE : 02-02-2017
 * ## DESCRIPTION : SCRIPT TO CREATE DC MASTER
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


// Dc Details Search listing filed Filter

$.date = function(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
};

var dcDetailsFieldFilters = function() {
	var region = $("#region").val();
	var dcName = $("#dcName").val();	
	fieldFilters = {
		"fieldFilters" : {
		}
	};

	if (dcName != "" && dcName != null) {
		fieldFilters.fieldFilters["dcCode"] = dcName;
	}
	if (region != "" && region != null) {
		fieldFilters.fieldFilters["regionCode"] = region;
	}
	

	return fieldFilters;
}


//Edit functionality----------------
var editDc = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	/*if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{*/
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#maintainDcDetailsE"  type="button" id='
			+ row
			+ ' onclick="editDcDetails('
			+ value
			+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
	//}
}
// In grid view last column belong to action
function dcMasterGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'region',
		'type' : 'string',
		'map' : 'region>name'
	},{
		'name' : 'regionIdE',
		'type' : 'string',
		'map' : 'region>id'
	}, {
		'name' : 'dcname',
		'type' : 'string'
	}, {
		'name' : 'city',
		'type' : 'string',
		'map' : 'city>name'
	}, {
		'name' : 'state',
		'type' : 'string',
		'map' : 'state>name'
	},  {
		'name' : 'stateCode',
		'type' : 'string',
		'map' : 'state>code'
	},{
		'name' : 'country',
		'type' : 'string',
		'map' : 'country>name'
	}, {
		'name' : 'cityIdE',
		'type' : 'string',
		'map' : 'city>id'
	}, {
		'name' : 'stateIdE',
		'type' : 'string',
		'map' : 'state>id'
	}, {
		'name' : 'countryIdE',
		'type' : 'string',
		'map' : 'country>id'
	}, {
		'name' : 'address1',
		'type' : 'string'
	}, {
		'name' : 'address2',
		'type' : 'string'
	}, {
		'name' : 'address3',
		'type' : 'string'
	}, {
		'name' : 'zipcode',
		'type' : 'int'
	},{
		'name' : 'createdDate',
		'type' : 'date'
	}, {
		'name' : 'createdBy',
		'type' : 'date'
	}, {
		'name' : 'dcAddressId',
		'type' : 'int',
	}, {
		'name' : 'id',
		'type' : 'int',
	} ];

	var columns = [
	{'text' : '',datafield : 'stateCode','width' : '3%',editable : false,hidden:true},
	{
		'text' : 'Region',
		'datafield' : 'region',
		'width' : '5%',
		editable : false,
		cellsalign : 'center',
		align: 'center'
	}, {
		'text' : 'DC Name',
		'datafield' : 'dcname',
		'width' : '11.5%',
		editable : false,
		cellsalign : 'center',
		align: 'center'
	}, {
		'text' : 'DC City',
		'datafield' : 'city',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align: 'center'
	}, {
		'text' : 'DC State',
		'datafield' : 'state',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align: 'center',
		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			var stateName = $('#jqxgrid').jqxGrid('getcellvalue', row, 'state');
			var stateCode = $('#jqxgrid').jqxGrid('getcellvalue', row, 'stateCode');
			
			var state = stateCode + "-" + stateName ;
			return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + state  + '</div>';
		}
	}, {
		'text' : 'DC Country',
		'datafield' : 'country',
		'width' : '9%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align: 'center'
	}, {
		'text' : 'DC Address 1',
		'datafield' : 'address1',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign : 'left',
		align: 'center'
	}, {
		'text' : 'DC Address 2',
		'datafield' : 'address2',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign : 'left',
		align: 'center'
	}, {
		'text' : 'DC Address 3',
		'datafield' : 'address3',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign : 'left',
		align: 'center'
	},{
		'text' : 'Zip Code',
		'datafield' : 'zipcode',
		'width' : '6%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align: 'center'
	}, {
		'text' : 'Created On',
		'datafield' : 'createdDate',
		'width' : '7.5%',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align: 'center'
	}, {
		'text' : 'Created By',
		'datafield' : 'createdBy',
		'width' : '8%',
		cellsformat : 'd2',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align: 'center'	
	}, {
		text : '',
		datafield : 'id',
		cellsrenderer : editDc,
		editable : false,
		sortable : false,
		'width' : '3%',
		filterable : false,
		cellsalign : 'center',
		align: 'center'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/dcList", "list",columns,dcDetailsFieldFilters(), updateRows, "dcCode");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

//Validate Field for Creation of DC Details-------

var saveDcDet = function() {
// Create object
var dcDet= 
{ 
		
		 "region":  {
			"id" : $('#regionc').val(),
		   },
		  "dcname": $('#dcNamec').val(),
		  "city": {
			"id" : $('#dcCity').val(),
		   },
		  "state":  {
			"id" : $('#dcState').val(),
		   },
		  "country": {
			"id" : $('#dcCountry').val(),
		   },	
		   "defaultStoreDTO" : {
			  "storeId" : parseInt($("#storeNameC").val()) 
		   }, 
		  "address1": $('#dcAddress1').val(), 
		  "address2": $('#dcAddress2').val(),
		  "address3": $('#dcAddress3').val(), 
		  "zipcode": $('#zipCode').val()
		}
	return dcDet;
}

$("#regionc").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/dcLOV?page=create&regionId='+ $("#regionc").val(), function(data) {
		$('#storeNameC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.allStores,function(key, val) {
		$('#storeNameC').append('<option value="' + val.storeId + '">' + val.name + '</option>');
		});	
	});
});

//Create and save DC---------
$("#createDCMaster").validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"regionc": { required: true },
        "dcNamec": { 
        	required: true,
        	regx : /^[a-zA-Z\s]+$/
        },
        "dcCity" : { required: true},
        "dcState" : { required: true},
        "dcCountry" : { required: true},
        "dcAddress1" : { required: true},
        "storeNameC" : { required: true},
      //  "dcAddress2" : { regx: /^[\w\s.-]+\d+,\s*[\w\s.-]+$/},
      //  "dcAddress3" : { regx: /^[\w\s.-]+\d+,\s*[\w\s.-]+$/},
        "zipCode" : { 
        	required: true,
        	minlength: 6,	            
            maxlength: 6,
            digits: true},
        "createdByC" : { required: true},
        "createdOnC" : { required: true}
    },
    messages: {
    	"dcNamec":{
    		lettersonly : "Only charcters are allowed!",
    		regx : "Character with space!"
    	},
    	"zipCode": {
            required: "Please enter zip code!",
            minlength: "Zip Code must be 6 numbers!",
            maxlength: "Zip Code must be 6 numbers!",
            digits: "Zip Code must be 6 numbers!"
        }
    },
    submitHandler: function (form) { 
    	trimmer();
    	var dcDetails = saveDcDet();					
		if (dcDetails) {
			postJSON('/OrderExecution/api/v1/createDC',JSON.stringify(dcDetails),function(data) {
						if (data.resCode == "1") {
							$('#createDcDetails').modal('hide');
							$.growl.notice({
								message : data.mesgStr.toUpperCase(),
								duration : 10000,
								title : 'Success'
							});
							
						} 
						else
							{
							$.growl.notice({
								message : data.mesgStr.toUpperCase(),
								duration : 10000											
						});
							}
					});
		}
        return false;
    }
});


var saveDet = function() {
		var editDcDet = {	
		"id" : $("#dcIdE").val(),
		"dcAddressId":$('#dcDetailsId').val(),
		 "region":  {
			"id" : $('#regionIdE').val(),
		   },
		  "dcname": $('#dcNameE').val(),
		  "city": {
			"id" : $('#cityIdE').val(),
		   },
		  "state":  {
			"id" : $('#stateIdE').val(),
		   },
		  "country": {
			"id" : $('#countryIdE').val(),
		   },
		"address1":$('#dcAddress1E').val(),
		"address2": $('#dcAddress2E').val(),
		"address3":$('#dcAddress3E').val(),
		"zipcode":$('#zipCodeE').val(),
		"defaultStoreDTO": {
	        "storeId": parseInt($("#defaultStoreE").val()),
	        "name": $("#defaultStoreE option:selected").text()
	      }
		
	}
	
		return editDcDet;
}

//Edit dc Details
var editDcDetails = function(row) {
	
	$('#popupheaderlabel').text('Edit DC Master');
	$.getJSON('/OrderExecution/api/v1/editDcMaster?dcId='+row, function(data) {
		var dataVal = data.payload.dcEdit;
		$("#dcIdE").val(dataVal.id);
		$("#dcDetailsId").val(dataVal.dcAddressId);		
		$("#regionIdE").val(dataVal.region.id);	
		$("#cityIdE").val(dataVal.city.id);
		$("#stateIdE").val(dataVal.state.id);
		$("#countryIdE").val(dataVal.country.id);			
		$("#regionE").val(dataVal.region.name);	
		$("#dcStateE").val(dataVal.state.code + "-" + dataVal.state.name);
		$("#dcNameE").val(dataVal.dcname);
		$("#dcCityE").val(dataVal.city.name);
		$("#dcCountryE").val(dataVal.country.name);	
		$("#dcAddress1E").val(dataVal.address1);
		$("#dcAddress2E").val(dataVal.address2);	
		$("#dcAddress3E").val(dataVal.address3);
		$("#zipCodeE").val(dataVal.zipcode);	
		var dateVal = $.date(dataVal.createdDate);		 
		$("#createdByE").val(dataVal.createdBy);
		$("#createdOnE").val(dataVal.createdDate);
		
		$.getJSON('/OrderExecution/api/v1/dcLOV?page=create&regionId=' +dataVal.region.id, function(data) {
			$("#defaultStoreE").empty().append('<option value="" selected>--Select--</option>');
		    $.each(data.payload.allStores,function(key,val){
			    	if(dataVal.defaultStoreDTO != null){
			    		if (dataVal.defaultStoreDTO.name == val.name) {
							  $("#defaultStoreE").append('<option selected value="'+val.storeId+'">'+ val.name + '</option>');
						}
			    	}
					 else{
						$("#defaultStoreE").append('<option value="'+val.storeId+'">'+ val.name +'</option>');
			        } 
			   })
		 });
	});
}

$('#dcDetailsEdit').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"regionE": { required: true },
        "dcNameE": { required: true },
        "dcCityE" : { required: true},
        "dcStateE" : { required: true},
        "dcCountryE" : { required: true},
        "dcAddress1E" : { required: true},
        "dcAddress2E" : { required: true},
        "dcAddress3E" : { required: true},
        "zipCodeE" : { 
        	required: true,
        	minlength: 6,	            
            maxlength: 6,
            digits: true},
        "createdByE" : { required: true},
        "createdOnE" : { required: true}
    },
    messages: {
        'zipCodeE': {
            required: "Please enter zip code!",
            minlength: "Zip Code must be 6 numbers!",
            maxlength: "Zip Code must be 6 numbers!",
            digits: "Your zip code must be 6 numbers!"
        }
    },
    submitHandler: function (form) { 
    	trimmer();
    	
    	var dcMasterDetailsEdit = saveDet();
    	if (dcMasterDetailsEdit) {
    		postJSON('/OrderExecution/api/v1/dcUpdate',JSON.stringify(dcMasterDetailsEdit), function(data) {
    					if (data.resCode == "1") {
    						dcMasterGrid();
    						$('#maintainDcDetailsE').modal('hide');

    						$.growl.notice({
    							message : "DC details updated successfully!!",
    							duration : 10000,
    							title : 'Success'
    						});
    						$('#createDcDetails').on('hidden.bs.modal',function() {$(this).find('form').trigger('reset');
    								});
    						
    						$('#createDcDetails').modal('hide');
    						
    					} else{
    						$.growl.error({
    							message : "Please Contact Administrator!!",
    							duration : 10000
    		      });
    			}
    		});
    	}
        return false; 
    }
});

//API call for region and Dc append to the drop down
$.getJSON('/OrderExecution/api/v1/dcLOV?page=search', function(data) {
	$('#createdByC').val(data.payload.createdBy);
	$('#createdOnC').val(data.payload.createdon);
	$('#region').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.rList, function(key, val) {
		$('#region').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});

$("#region").on('change',function(){
	$('#dcName').empty().append('<option value="" selected>--Select--</option>');
	var reg = $("#region").val();
		if(reg != ""){
			var region = parseInt($("#region").val());
			$.getJSON('/OrderExecution/api/v1/dcLOV?page=search&regionId='+region,function(data) {	
				$('#dcName').empty().append('<option value="" selected>--Select--</option>');
					$.each(data.payload.allDc,function(key, val) {
					$('#dcName').append('<option value="' + val.id + '">' + val.name + '</option>');
				});
			});
	    }
});

$("#create").on('click', function(){
	$.getJSON('/OrderExecution/api/v1/dcLOV?page=create', function(data) {
		$('#createdByC').val(data.payload.createdBy);
		$('#createdOnC').val(data.payload.createdon);
	});
});
//API call for region and Dc append to the drop down in create model window
$.getJSON('/OrderExecution/api/v1/dcLOV?page=create', function(data) {
	$('#regionc').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.rList, function(key, val) {
		$('#regionc').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	
	var state = data.payload.stateList;
	// Sorting Array in Ascending Order
	state.sort(function(a, b){
		return a.code-b.code;
	});
	
	console.log(state);
	
		$('#dcState').empty().append('<option value="" selected>--Select--</option>');
    $.each(state, function(key, val) {
	    $('#dcState').append('<option value="' + val.id + '">' + val.code + "-" + val.name + '</option>');
	});
       $('#dcCity').empty().append('<option value="" selected>--Select--</option>');
    $.each(data.payload.cityList, function(key, val) {
    $('#dcCity').append('<option value="' + val.id + '">' + val.name + '</option>');
});
    $('#dcCountry').empty().append('<option value="" selected>--Select--</option>');
    $.each(data.payload.countries, function(key, val) {
    $('#dcCountry').append('<option value="' + val.id + '">' + val.name + '</option>');
  });
});

//On click on search button it will load grid
$('#DcMasterSearch').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"regionS": {
            required: true
        },
        "dcName": {
            required: true
        }
    },
    submitHandler: function (form) { 
    	dcMasterGrid();
    	$("#jqxgrid").show();
        return false;
    }
});
 
// Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('dcDetails', 'bodySwitcher')"
});


//########################################### validation Is Started ###########################################
//######## Validation Started########################
$.validator.addMethod(
        "regx",
        function(value, element, regexp) {
            if (regexp.constructor != RegExp)
                regexp = new RegExp(regexp);
            else if (regexp.global)
                regexp.lastIndex = 0;
            return this.optional(element) || regexp.test(value);
        },
        ""
);

$('.modal').on('hidden.bs.modal', function () {
	 $("form").each(function(){
		 $(this).validate();
	      $(this).validate().resetForm();
    });
	 $("form").trigger("reset");
});
