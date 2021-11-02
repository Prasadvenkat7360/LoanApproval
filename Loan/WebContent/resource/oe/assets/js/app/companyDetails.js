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

$(document).ready(function() {
	$("#validateCompDet").validate();
});
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

$('input:radio[name="companyBusiness"]').filter('[value="company"]').attr(
		'checked', true);
$('#companyDet').show();
$('#businessDet').hide();
$('#DeptDet').hide();
$('input[name=companyBusiness]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if (selectedVal == "company") {
		$('#companyDet').show();
		$('#businessDet').hide();
		$('#DeptDet').hide();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();

	} else if (selectedVal == "business") {
		$('#companyDet').hide();
		$('#DeptDet').hide();
		$('#businessDet').show();

		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	} else if (selectedVal == "department") {
		$('#companyDet').hide();
		$('#businessDet').hide();
		$('#DeptDet').show();

		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	}

});

var eCompDet = function() {
	if(editValidate()){
	var editCompanyDetail = {
		"compId" : $('#compIdE').val(),
		"compCode" : $('#compCodeE').val(),
		"compName" : $('#compNameE').val(),
		"busId" : $('#blistE').val(),
		"grpId" : $('#glistE').val(),
		"compPanNo" : $('#compPanNoE').val(),
		"compRegNo" : $('#compRegNoE').val(),
		"compSinNo" : $('#compSinNoE').val(),
		"compGstinNo" : $('#compGstinNoE').val(),
		"address1" : $('#address1E').val(),
		"address2" : $('#address2E').val(),
		"address3" : $('#address3E').val(),
		"countryId" : $('#countryIdE').val(),
		"stateId" : $('#stateIdE').val(),
		"cityId" : $('#cityIdE').val(),
		"zipCode" : $('#zipCodeE').val(),
		"addressId" : $('#addressIdE').val()
	}
	return editCompanyDetail;
	}
}

var SaveCompanyDetE = function() {
	trimmer();
	
	var companyDetailEdit = eCompDet();
	if (companyDetailEdit) {

		postJSON('/OrderExecution/api/v1/updateCompanyMaster', JSON
				.stringify(companyDetailEdit), function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#createCompDet').on('hidden.bs.modal', function() {
					$(this).find('form').trigger('reset');
				});
				companyDetailsGrid();
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});

			}
			$('#editCompDet').modal('hide');

		});
	}

}

var loadDropDown = function(clist, blist, glist) {

	$('#cityIdE').empty().append(
			'<option value="" selected>--Select--</option>');
	$('#countryIdE').empty().append(
			'<option value="" selected>--Select--</option>');
	$('#stateIdE').empty().append(
			'<option value="" selected>--Select--</option>');
	$('#businessDetValueE').empty().append('');

	var id = 'company';

	if (id != "") {
		$.getJSON('/OrderExecution/api/v1/CompanyOnloadLOVs?criteria=' + id,
				function(data) {

					$.each(data.payload.cities, function(key, val) {
						if (clist.cityId == val.id) {
							$('#cityIdE').append(
									'<option selected value="' + val.id + '">'
											+ val.name + '</option>');
						} else {
							$('#cityIdE').append(
									'<option value="' + val.id + '">'
											+ val.name + '</option>');
						}
					});

					$.each(data.payload.countries, function(key, val) {
						if (clist.countryId == val.id) {
							$('#countryIdE').append(
									'<option selected value="' + val.id + '">'
											+ val.name + '</option>');
						} else {
							$('#countryIdE').append(
									'<option value="' + val.id + '">'
											+ val.name + '</option>');
						}
					});

					$.each(data.payload.states, function(key, val) {
						if (clist.stateId == val.id) {
							$('#stateIdE').append(
									'<option selected value="' + val.id + '">'
											+ val.name + '</option>');
						} else {
							$('#stateIdE').append(
									'<option value="' + val.id + '">'
											+ val.name + '</option>');
						}
					});

					$.each(data.payload.states, function(key, val) {
						if (clist.stateId == val.id) {
							$('#stateIdE').append(
									'<option selected value="' + val.id + '">'
											+ val.name + '</option>');
						} else {
							$('#stateIdE').append(
									'<option value="' + val.id + '">'
											+ val.name + '</option>');
						}
					});

				});
	}
}

// Edit Company details
var editCompanyDetails = function(id) {

	$('#companeEditLabel').text('Edit Company Details	Master');

	$.getJSON('/OrderExecution/api/v1/editCompanyMaster?id=' + id, function(
			data) {
		var clist = data.payload.clist;
		var blist = data.payload.blist;
		var glist = data.payload.glist;

		loadDropDown(clist, blist, glist);

		$("#compCodeE").val(clist.compCode);
		$("#compNameE").val(clist.compName);
		$("#compPanNoE").val(clist.compPanNo);
		$("#compRegNoE").val(clist.compRegNo);
		$("#compSinNoE").val(clist.compSinNo);
		$("#compGstinNoE").val(clist.compGstinNo);
		$("#address1E").val(clist.address1);
		$("#address2E").val(clist.address2);
		$("#address3E").val(clist.address3);
		$("#zipCodeE").val(clist.zipCode);
		$("#createdOnE").val($.date(clist.createdOn));
		$("#createdByE").val(clist.createdBy);
		$("#compIdE").val(clist.compId);
		$("#addressIdE").val(clist.addressId);

		$.each(blist,
				function(key, val) {
					$('#blistE').append(
							'<option value="' + val.id + '">' + val.name
									+ '</option>');
				});

		$('#glistE').empty().append(
				'<option value="" selected>--Select--</option>');

		$.each(glist,
				function(key, val) {
					$('#glistE').append(
							'<option value="' + val.id + '">' + val.name
									+ '</option>');
				});
		if (data.payload.clist.businesses != null
				&& data.payload.clist.businesses != "") {
			$('#businessStatus').show();
			$.each(data.payload.clist.businesses, function(key, val) {
				$('#businessDetValueE').append(
						'&nbsp;&nbsp;&nbsp;&nbsp;<label class="radio-inline">'
								+ val.name + '</label>');
			});
		} else {
			$('#businessStatus').hide();
		}

	});

}

// On click on create company loading pop up

var editCompanyDet = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editCompDet" type="button" id='
			+ row
			+ ' onclick="editCompanyDetails('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></button>'
	}
}

var companyFieldFilersVal = function() {
	var compCodeS = $("#compCodeS").val();
	var compNameS = $("#compNameS").val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (compCodeS != "" && compCodeS != null) {
		fieldFilters.fieldFilters["companyCode"] = compCodeS;
	}
	if (compNameS != "" && compNameS != null) {
		fieldFilters.fieldFilters["companyName"] = compNameS;
	}

	return fieldFilters;
}

// company grid code
var companyDetailsGrid = function() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'compCode',
		'type' : 'string'
	}, {
		'name' : 'compName',
		'type' : 'string'
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
		'name' : 'zipCode',
		'type' : 'string'
	}, {
		'name' : 'cityName',
		'type' : 'string'
	}, {
		'name' : 'stateName',
		'type' : 'string'
	}, {
		'name' : 'countryname',
		'type' : 'string'
	}, {
		'name' : 'busId',
		'type' : 'int'
	}, {
		'name' : 'businessName',
		'type' : 'string'
	}, {
		'name' : 'compPanNo',
		'type' : 'string'
	}, {
		'name' : 'compRegNo',
		'type' : 'string'
	}, {
		'name' : 'compSinNo',
		'type' : 'int'
	}, {
		'name' : 'compGstinNo',
		'type' : 'string'
	}, {
		'name' : 'createdOn',
		'type' : 'date'
	}, {
		'name' : 'createdBy',
		'type' : 'string'
	}, {
		'name' : 'compId',
		'type' : 'int',
	} ];

	var columns = [ {
		'text' : 'Code',
		'datafield' : 'compCode',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Company Name',
		'datafield' : 'compName',
		'width' : '8%',
		cellsalign : 'left',
		align : 'center',
		editable : false
	}, {
		'text' : 'Address',
		'datafield' : 'address1',
		'width' : '6%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Address 2',
		'datafield' : 'address2',
		'width' : '6%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Address 3',
		'datafield' : 'address3',
		'width' : '6%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Zip Code',
		'datafield' : 'zipCode',
		'width' : '4.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false

	}, {
		'text' : 'City',
		'datafield' : 'cityName',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'State',
		'datafield' : 'stateName',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Country',
		'datafield' : 'countryname',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Business',
		'datafield' : 'businessName',
		'width' : '7%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'PAN No.',
		'datafield' : 'compPanNo',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Reg No.',
		'datafield' : 'compRegNo',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false,
	}, {
		'text' : 'CIN No.',
		'datafield' : 'compSinNo',
		'width' : '7%',
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		editable : false,
		cellsformat : 'd',
		columntype : 'numberinput'
	}, {
		'text' : 'GSTIN No.',
		'datafield' : 'compGstinNo',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false,
		cellsformat : 'd',
		columntype : 'numberinput'
	}, {
		'text' : 'Created On',
		'datafield' : 'createdOn',
		'width' : '6%',
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		editable : false,
		columntype : 'datetimeinput',
		cellsformat : 'dd/MM/yy'
	}, {
		'text' : 'Created By',
		'datafield' : 'createdBy',
		'width' : '5.5%',
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		editable : false,
		cellsformat : 'd',
		columntype : 'numberinput'
	}, {
		text : '',
		datafield : 'compId',
		cellsrenderer : editCompanyDet,
		editable : false,
		filterable: false,
		sortable : false,
		'width' : '3%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchCompany", "list",
			columns, companyFieldFilersVal(), updateRows, "id");
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

var validateCompDet = function() {

	var compCode = $('#compCode').val();
	var compName = $('#compName').val();
	var busId = $('#business').val();
	var grpId = $('#groupId').val();
	var compPanNo = $('#compPanNo').val();
	var compRegNo = $('#compRegNo').val();
	var compSinNo = $('#compSinNo').val();
	var compTinOrGstNo = $('#compTinOrGstNo').val();
	var compIGSTNo = $('#compIGSTNo').val();
	var compCSTNo = $('#compCSTNo').val();
	var address1 = $('#address1').val();
	var address2 = $('#address2').val();
	var address3 = $('#address3').val();
	var countryId = $('#countryId').val();
	var stateId = $('#stateId').val();
	var cityId = $('#cityId').val();
	var zipCode = $('#zipCode').val();

	var validation = true;

	if (compCode == "" || compName == "" || busId == "" || grpId == ""
			|| compPanNo == "" || compRegNo == "" || compSinNo == ""
			|| compTinOrGstNo == "" || compIGSTNo == "" || compCSTNo == ""
			|| address1 == "" || countryId == "" || stateId == ""
			|| cityId == "" || zipCode == "") {
		validation = false;
	}
	return validation;
}

$('#createCompanyDet').on(
		'click',
		function() {
			$('#businessDetValue').empty().append('');
			$('#groupId').empty().append(
					'<option value="" selected>--Select--</option>');

			$('#countryId').empty().append(
					'<option value="" selected>--Select--</option>');

			$('#cityId').empty().append(
					'<option value="" selected>--Select--</option>');

			$('#stateId').empty().append(
					'<option value="" selected>--Select--</option>');

			var id = 'company';

			if (id != "") {
				$.getJSON('/OrderExecution/api/v1/CompanyOnloadLOVs?criteria='
						+ id, function(data) {
					$('#createdBy').val(data.payload.createdBy);
					$('#createdOn').val(data.payload.createdon);
					$.each(data.payload.glist, function(key, val) {
						$('#groupId').append(
								'<option value="' + val.id + '">' + val.name
										+ '</option>');
					});
					$.each(data.payload.blist, function(key, val) {
						$('#businessDetValue').append(
								'<label class="radio-inline"><input type="checkbox" id="business" value="'
										+ val.id + '">&nbsp; &nbsp;' + val.name
										+ '</label>');
					});
					$.each(data.payload.cities, function(key, val) {
						$('#cityId').append(
								'<option value="' + val.id + '">' + val.name
										+ '</option>');
					});
					$.each(data.payload.countries, function(key, val) {
						$('#countryId').append(
								'<option value="' + val.id + '">' + val.name
										+ '</option>');
					});
					// iterate over the data and append a select option
					$.each(data.payload.states, function(key, val) {
						$('#stateId').append(
								'<option value="' + val.id + '">' + val.name
										+ '</option>');
					});
				});
			}
		});

// Create JSON for create company details
var saveCompanyDetails = function() {

	var companyDetails = {
		"compCode" : $('#compCode').val(),
		"compName" : $('#compName').val(),
		"busId" : $('#business').val(),
		"grpId" : $('#groupId').val(),
		"compPanNo" : $('#compPanNo').val(),
		"compRegNo" : $('#compRegNo').val(),
		"compSinNo" : $('#compSinNo').val(),
		"compGstinNo" : $('#compGstinNo').val(),
		"address1" : $('#address1').val(),
		"address2" : $('#address2').val(),
		"address3" : $('#address3').val(),
		"countryId" : $('#countryId').val(),
		"stateId" : $('#stateId').val(),
		"cityId" : $('#cityId').val(),
		"zipCode" : $('#zipCode').val()
	}
	return companyDetails;
}
// Create and save metal accounting location details
$("#saveCompDet")
		.on(
				'click',
				function() {
					trimmer();
					if (validateComDetails()) {
						var companyDetails = saveCompanyDetails();
						if (companyDetails) {
							postJSON(
									'/OrderExecution/api/v1/saveCompanyDetails?criteria=company',
									JSON.stringify(companyDetails),
									function(data) {
										if (data.resCode == "1") {
											$.growl.notice({
												message : data.mesgStr,
												duration : 10000,
												title : 'Success'
											});
											$('#createCompDet')
													.on(
															'hidden.bs.modal',
															function() {
																$(this)
																		.find(
																				'form')
																		.trigger(
																				'reset');
															});
											$('#createCompDet').modal('hide');
											companyDetailsGrid();
										} else {
											$.growl.error({
												message : data.mesgStr,
												duration : 10000
											});

										}
									});
						}
					} /*else {
						$.growl.error({
							message : "Please fill all the mandatory fields",
							duration : 10000
						});
					}*/
				});
// Company details search and load grid with data from the server
//Search business details
$("#searchCompDet").on('click', function(){
	companyDetailsGrid();
	$('#jqxgrid').show();	
});

//Validate Field for Creation of Company Details-------
var validateComDetails = function() {	
	 $form = $('#companyDetCreate');
	    $form.validate({
	        errorElement: 'label', 
	        errorClass: 'help-inline', 
	        focusInvalid: false, 
	        ignore: "",
	      
	        rules: {
	        	"compCode": { 
	        		 required: true ,	        	
	        		 regx : /^[A-Z]+$/,	                
	        		 maxlength: 4
	        	},	        		
	            "compName": { 
	            	required: true,
	            	regx:/^[ A-Za-z_@.,%*$()/#&+-]*$/
	            },
	            "compPanNo" : {
	            	required: true,	           
	            	regx : /[A-Z]{5}\d{4}[A-Z]{1}/,
	            	minlength: 10,
	            	maxlength: 10 
            	},	
             
            	"zipCode" : {
            		 required: true,
         		    minlength: 6,	            
         	        maxlength: 6,
         	        digits: true 
            	},	                      
	            "compRegNo" : { required: true},
	            "compSinNo" : { required: true},
	            "compGstinNo" : { required: true},
	            "address1" : { required: true},	          
	            "cityId" : { required: true},
	            "stateId" : { required: true},
	            "countryId" : { required: true},
	                 
	        },
	        messages: {
	        	"compName":{
	        		regx : "Only character with space!"
	        	},
	        	"compPanNo": {
                    regx: "PAN format not correct!",
                },
                "compCode": {
            		regx: "Only capital letter allowed!",            		
            		maxlength : "Code should be maximum of 4 character!"
            	},
            	 'zipCode': {
            	        minlength: 	"Zip Code must be 6 numbers!",
            	        maxlength: 	"Zip Code must be 6 numbers!",
            	        digits: 	"Zip code must be 6 numbers!"
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
//Validation for the Edit page
var editValidate = function(){
	$form = $('#MetalAccLocSearch');
    $form.validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	"compCodeE": { 
        		required: false ,	        	
        		 regx :/^[A-Z]+$/,                
                 maxlength: 4
        	},	        		
            "compNameE": { 
            	required: false,
            	lettersonly:true
            },        
        	"compPanNoE" : {
            	required: false,	           
            	regx : /[A-Z]{5}\d{4}[A-Z]{1}/,
            	minlength: 10,
            	maxlength: 10 
            	},   
                "zipCodeE" : { 
                	
               		 required: true,
            		    minlength: 6,	            
            	        maxlength: 6,
            	        digits: true 
                                 
        	},	           
        },
        messages: {
	        	"compNameE":{
	        		lettersonly : "Only charcters are allowed!"
	        	 },
	        	"compPanNoE": {
	        		regx: "PAN format not correct!"                
               },
               "compCodeE": {
            	   	regx: "Only capital letter allowed!",            		
           			maxlength : "Code should be maximum of 4 character!"
         	},
         	'zipCodeE': {
    	        minlength: 	"Zip Code must be 6 numbers!",
    	        maxlength: 	"Zip Code must be 6 numbers!",
    	        digits: 	"Zip code must be 6 numbers!"
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

$('.modal').on('hidden.bs.modal', function() {
	$(this).find('form')[0].reset();
});

// Clear search form and grid
$('#clearCompDet').on('click', function() {
	var validator = $( "form" ).validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

$('body').on('hidden.bs.modal', '.modal', function() {
	$(this).removeData('bs.modal');
	$(this).removeData("bs.modal").find(".modal-content select").empty();
});

//############################################################ Validation is Added ###########################################
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