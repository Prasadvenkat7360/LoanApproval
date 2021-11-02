/*
	##	Author UI : mani Prasad
	## 	Date Creation : 09/03/2016
	##  Modified By : Raksha
	##  Modified Date : 06/09/2017
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

// Validation Started
var vhcSegmentType = [];
var vhcSegment = [];
var vhcCategory = [];
var segType = [];
var metalSeg = [];
var stoneSeg = [];
var accSeg = [];
var taxResponse = [];
$(document).ready(function(){
	$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?page=update',
					function(data) {
						vhcSegmentType.push({
							id : -1,
							name : 'Select'
						});
						$.each(data.payload.sTypes, function(key, val) {
							vhcSegmentType.push({
								id : val.id,
								name : val.name
							});
						});
					segType = data.payload.segmentTypes;
					metalSeg = data.payload.mTypes;
					stoneSeg = data.payload.stoneSegments;
					accSeg = data.payload.accessorySegments;
					});
			});

$("#no-records-vendor").show();
$("#no-records-vendorReturn").show();

// Tax Profile Date Picker
$("#vendorTANDate").datepicker({
	showOn : 'focus',
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy"
});

// Updation Details Date Picker
$("#vendorStartDate").datepicker({
	showOn : 'focus',
	minDate : 0,
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy"
});

// Updation Details Date Picker
$("#editVStartDate").datepicker({
	showOn : 'focus',
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy"
});

// Vendor Details Master Grid
function vendorDetailsMaster() {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long'
	}, {
		'name' : 'vendorCode',
		'type' : 'string'
	}, {
		'name' : 'address1',
		'type' : 'string'
	}, {
		'name' : 'vendorType',
		'type' : 'string'
	}, {
		'name' : 'vendorBlocked',
		'type' : 'string'
	}, {
		'name' : 'vendorCity',
		'type' : 'string'
	}, {
		'name' : 'vendorCountry',
		'type' : 'string'
	}, {
		'name' : 'vendorStartDate',
		'type' : 'string'
	}, {
		'name' : 'agreementUploaded',
		'type' : 'string'
	} ,{
		'name' : "internal",
		'type' : 'string'
	}];

	var columns = [ {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center',
		width : '10%',
	}, {
		'text' : 'Vendor Name & Address',
		'datafield' : 'address1',
		editable : false,
		sortable : false,
		cellsalign : 'left',
		align : 'center',
		width : '28.5%',
	}, {
		'text' : 'Vendor Type',
		'datafield' : 'vendorType',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center',
		width : '10%',
	}, {
		'text' : 'Vendor Blocked',
		'datafield' : 'vendorBlocked',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center',
		width : '10%',
	},{
		'text' : '',
		'datafield' : 'internal',
		'hidden':true
	}, {
		'text' : 'Vendor City',
		'datafield' : 'vendorCity',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center',
		width : '10%',
	}, {
		'text' : 'Vendor Country',
		'datafield' : 'vendorCountry',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		width : '10%',
	}, {
		'text' : 'Vendor Start Date',
		'datafield' : 'vendorStartDate',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center',
		width : '10%',
	}, {
		'text' : 'Agreement Uploaded',
		'datafield' : 'agreementUploaded',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		width : '9%',
	}, {
		'text' : '',
		'datafield' : 'id',
		cellsrenderer : vendorEditlinkrenderer,
		editable : false,
		sortable : false,
		filterable : false,
		cellsalign : 'center',
		align : 'center',
		width : '2.5%',
	} ];
	// reload the vendor code list
	vendorCodeAndNameList();
	showMyGrid(datafields, "/OrderExecution/api/v1/vendorMasterList", "list",
			columns, vendorFilterValues(), updateRows, "vendorCode");

	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true 
	});

}
function vendorCodeAndNameList() {
	$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?page=search', function(data) {
		vendorList = data.payload.vCodeList;

		var data = [];
		$.each(vendorList, function(key, value) {
			data.push({
				value : value.id,
				label : value.name
			});
		});

		$(function() {
			$("#vendorCode").autocomplete({

				source : data,
				focus : function(event, ui) {

					event.preventDefault();
					$(this).val(ui.item.label);

				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#vendorCode-value").val(ui.item.value);
				}
			});
		});

	});
}


var editVendorMaster = function(value){
	var url = "vendorMasterData?id=" + value;
	  $("#editMasterModal").find('.modal-content').load(url,function(result){
			$("#editMasterModal").modal({show:true,  target: "editMasterModal"});			
		});
}

var vendorEditlinkrenderer = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary"  type="button" onclick="editVendorMaster('+ value +');" ><i class="fa fa-pencil fa-sm"></i></button>'
	}

}
function vendorFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};
	var vendorCode = $('#vendorCode').val();
	var vendorType = $('#vType').val();
	var vendorCity = $('#vendorCity').val();
	var vendorCountry = $('#vendorCountry').val();
	var vendorBlocked = $("#vendorBlocked").val();
	var Internal = $("#Internal").val();
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorCode"] = parseInt($('#vendorCode-value').val());
	}
	if (vendorType != "" && vendorType != null) {
		fieldFilters.fieldFilters["vType"] = vendorType;
	}
	if (vendorCity != "" && vendorCity != null) {
		fieldFilters.fieldFilters["vendorCity"] = vendorCity;
	}
	if (vendorCountry != "" && vendorCountry != null) {
		fieldFilters.fieldFilters["vendorCountry"] = vendorCountry;
	}
	if (vendorBlocked != "" && vendorBlocked != null) {
		fieldFilters.fieldFilters["vendorBlocked"] = vendorBlocked;
	}
	if (Internal != "" && Internal != null) {
		fieldFilters.fieldFilters["vendorInternal"] = Internal;
	}
	return fieldFilters;

}

function createVendorMasterValidation() {
	$form = $('#createVendor');
	$form.validate({
		errorElement : 'label',
		errorClass : 'help-inline',
		focusInvalid : false,
		ignore : "",
		rules : {
			"vCode" : {
				required : true
			},
			"vendorName" : {
				required : true,
				regx : /^[a-zA-Z\s]*$/,
		    },
			"vendorType" : {
				required : true
			},
			"address1" : {
				required : true
			},
			"vCity" : {
				required : true
			},
			"vendorPin" : {
				required : true,
				minlength : 6,
				maxlength : 6,
				digits : true
			},
			"vState" : {
				required : true
			},
			"vendorContactLanline" : {
				number : true,
				digits : true
			},

			"vendorContact2Mob" : {
				number : true,
				digits : true
			},

			"vCountry" : {
				required : true
			},
			"isInternal" : {
				required : true
			},
			"vendorContact1" : {
				required : true,
				regx : /^[a-zA-Z\s]*$/
			},
			"vendorContact1Mob" : {
				required : true,
				minlength : 10,
				maxlength : 10,
				digits : true
			},
			"vendorEmail1" : {
				required : true,
				email : true
			},
			"vendorAgreementUploaded" : {
				required : true
			},
			"vendorStartDate" : {
				required : true,
				dateITA : true
			},
			"panNumberC" : {
            	required: true,	           
            	regx : /[A-Z]{5}\d{4}[A-Z]{1}/,
            	minlength: 10,
            	maxlength: 10 
        	},
        	"tanNumberC" : {
        		required: true,	           
            	regx : /^[a-zA-Z0-9_+-]*$/,
            	minlength: 10,
            	maxlength: 10 
        	}
		},
		errorPlacement : function(error, element) {
			if (element.context.name == "vendorStartDate") {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		},

		messages : {
			"vCode" : {
				required : "Please enter the Vendor Code"
			},
			"vendorName" : {
				regx : "Only character with space!"
			},
			"vendorType" : {
				required : "Please select the Vendor Type"
			},
			"address1" : {
				required : "Please fil the address"
			},
			"vCity" : {
				required : "Please select the city"
			},
			"vendorPin" : {
				required : "Please enter PIN code!",
				minlength : "PIN Code must be 6 numbers!",
				maxlength : "PIN Code must be 6 numbers!",
				digits : "Your PIN code must be 6 numbers!"
			},
			"vState" : {
				required : "Please select the State"
			},
			"vCountry" : {
				required : "Please select the Country"
			},
			"vendorContact1" : {
				regx : "Only charcters are allowed!"
			},
			"vendorContact1Mob" : {
				required : "Please enter mobile code!",
				minlength : "Mobile number must be 10 numbers!",
				maxlength : "Mobile number must be 10 numbers!",
				digits : "Your Mobile code must be 10 numbers!"
			},
			"vendorEmail1" : {
				required : "Please enter the correct email"
			},
			"vendorAgreementUploaded" : {
				required : "Please select the Vendor agreement"
			},
			"vendorStartDate" : {
				dateITA : "please enter the date"
			},
			"panNumberC": {
                regx: "PAN format not correct!",
            },
            "tanNumberC": {
                regx: "TAN format not correct!",
            }

		}
	});
	if ($form.valid()) {
		return true;
	} else {
		return false;
	}
	/*
	 * var vendorCode = $('#vCode').val(); var vendorName =
	 * $('#vendorName').val(); var vendorType = $('#vendorType').val(); var
	 * address1 = $("#address1").val(); var vCity = $('#vCity').val(); var
	 * vendorPin = $("#vendorPin").val(); var vState = $("#vState").val(); var
	 * vCountry = $("#vCountry").val(); var vendorContact1 =
	 * $("#vendorContact1").val(); var vendorContact1Mob =
	 * $("#vendorContact1Mob").val(); var vendorEmail1 =
	 * $("#vendorEmail1").val(); var vendorStartDate =
	 * $("#vendorStartDate").val(); var vendorAgreementUploaded =
	 * $("#vendorAgreementUploaded").val();
	 * 
	 * var validation = true; if (vendorCode == "" || vendorName == "" ||
	 * vendorType == "" || address1 == "" || vCity == "" || vendorPin == "" ||
	 * vState == "" || vCountry == "" || vendorContact1 == "" ||
	 * vendorContact1Mob == "" || vendorEmail1 == "" || vendorStartDate == "" ||
	 * vendorAgreementUploaded == "") { validation = false;
	 *  }
	 */
	return false;
}

var createFlagC = true;
function prepareVendorMasterPostData() {
	var taxArray = [];
	var isRegVen = $("#isVendRegisteredC").val();
	var getTaxDet = $('#jqxgridT').jqxGrid('getrows');
	var isFASTaxC = $("#isFASTaxC").val();
	if(isFASTaxC == null || isFASTaxC == ""){
		$.growl.error({
			message : "Is FAS Tax field is mandatory !!!",
			duration :10000,
			title : 'Error'
		});
		return false;
	}
	if(isRegVen == 'True' && getTaxDet.length == 0){
			createFlagC = false;
			$.growl.error({
				message : "Grid Fields Are Mandatory !!!",
				duration :10000,
				title : 'Error'
			});
			return false;
	}else{createFlagC = true;}
	
	for (var i = 0; i < getTaxDet.length; i++) {
		var taxDetailsC = {
				  "gstinNo": getTaxDet[i].gstnNoC,
			      "state" : {
						"id" :  getTaxDet[i].sourceStateIdC,
					}			    
		}
		taxArray.push(taxDetailsC);
	}
	var vRegistered = $("#isVendRegisteredC").val()
	if (vRegistered == "Yes"){
	var vendor = {
		"vendorCode" : $("#vCode").val(),
		"vendorName" : $("#vendorName").val(),
		"vendorType" : $("#vendorType").val(),
		"address1" : $("#address1").val(),
		"address2" : $("#address2").val(),
		"address3" : $("#address3").val(),
		"vendorCity" : $("#vCity").val(),
		"pinCode" : $("#vendorPin").val(),
		"vendorCountry" : $("#vCountry").val(),
		"contact1" : $("#vendorContact1").val(),
		"contact2" : $("#vendorContact2").val(),
		"mobileNum1" : $("#vendorContact1Mob").val(),
		"mobileNum2" : $("#vendorContact2Mob").val(),
		"landLineNum" : $("#vendorContactLanline").val(),
		"email1" : $("#vendorEmail1").val(),
		"email2" : $("#vendorEmail2").val(),
		"email3" : $("#vendorEmail3").val(),
		"vendorBlocked" : $("#vendorBlock").val(),
		"vendorStartDate" : $("#vendorStartDate").val(),
		"agreementUploaded" : $("#vendorAgreementUploaded").val(),
		"createdDate" : $("#vendorCreated").val(),
		"updatedDate" : $("#vendorUpdated").val(),
		"updatedBy" : $("#vendorUpdatedBy").val(),
		"agreementUploadedDate" :($("#vendorAgreementUploaded").val() == "Yes") ? $("#vendorLastAgre").val() : " ",
		"agreementUploadedBy" : ($("#vendorAgreementUploaded").val() == "Yes") ? $("#vendorAgrreUploaded").val() : " ",
		"isregister" : $("#isVendRegisteredC").val(),
		"pan" : $("#panNumberC").val(),
		"internal":$("#isInternalC").val(),
		"tanNumber" : $("#tanNumberC").val(),
		"tanDate" : $("#tanDateC").val(),
		"fasTax" : $("#isFASTaxC").val(),
		"vendorTaxDetailDTOs":taxArray,
	} 
	}else{
		var vendor = {
				"vendorCode" : $("#vCode").val(),
				"vendorName" : $("#vendorName").val(),
				"vendorType" : $("#vendorType").val(),
				"address1" : $("#address1").val(),
				"address2" : $("#address2").val(),
				"address3" : $("#address3").val(),
				"vendorCity" : $("#vCity").val(),
				"pinCode" : $("#vendorPin").val(),
				"vendorCountry" : $("#vCountry").val(),
				"contact1" : $("#vendorContact1").val(),
				"contact2" : $("#vendorContact2").val(),
				"mobileNum1" : $("#vendorContact1Mob").val(),
				"mobileNum2" : $("#vendorContact2Mob").val(),
				"landLineNum" : $("#vendorContactLanline").val(),
				"email1" : $("#vendorEmail1").val(),
				"email2" : $("#vendorEmail2").val(),
				"email3" : $("#vendorEmail3").val(),
				"vendorBlocked" : $("#vendorBlock").val(),
				"vendorStartDate" : $("#vendorStartDate").val(),
				"agreementUploaded" : $("#vendorAgreementUploaded").val(),
				"createdDate" : $("#vendorCreated").val(),
				"updatedDate" : $("#vendorUpdated").val(),
				"internal":$("#isInternalC").val(),
				"updatedBy" : $("#vendorUpdatedBy").val(),
				"agreementUploadedDate" :($("#vendorAgreementUploaded").val() == "Yes") ? $("#vendorLastAgre").val() : " ",
				"agreementUploadedBy" : ($("#vendorAgreementUploaded").val() == "Yes") ? $("#vendorAgrreUploaded").val() : " ",
				"isregister" : $("#isVendRegisteredC").val(),
				"pan" : $("#panNumberC").val(),
				"tanNumber" : $("#tanNumberC").val(),
				"fasTax" : $("#isFASTaxC").val(),
				"tanDate" : $("#tanDateC").val(),
			} 		
	}
	return vendor;
	
}



function editVendorMasterValidation() {

	$form = $('#updateVendor');
	
	$form.validate({
		errorElement : 'label',
		errorClass : 'help-inline',
		focusInvalid : false,
		ignore : "",
		rules : {
			"editVType" : {
				required : true
			},
			"editAddress1" : {
				required : true
			},
			"editVState" : {
				required : true
			},
			"editVCountry" : {
				required : true
			},
			"editVPin" : {
				required : true,
				minlength : 6,
				maxlength : 6,
				digits : true
			},
			"editVContact1" : {
				required : true,
				regx : /^[a-zA-Z\s]*$/
			},
			"editVContact1Mob" : {
				required : true,
				minlength : 10,
				maxlength : 10,
				digits : true
			},
			"editVEmail1" : {
				email : true
			},
			"bankAcc" : {
				required : true,
				minlength : 10,
				maxlength : 15,
				digits : true
			},
			"bankCode" : {
				required : false,
				regx : /[A-Z0-9]{6}/,
				minlength : 5
			},
			"bankName" : {
				required : true,
				regx1 : /^[a-zA-Z\s]+$/,
			},
			"panNumberE" : {
        	required: true,	           
        	regx : /[A-Z]{5}\d{4}[A-Z]{1}/,
        	minlength: 10,
        	maxlength: 10 
        	},
        	"tanNumberE" : {
            	required: true,	           
            	regx : /^[a-zA-Z0-9_+-]*$/,
            	minlength: 10,
            	maxlength: 10 },        	
		},
		message : {
			"editVType" : {
				required : "Please select the vendor type"
			},
			"editAddress1" : {
				required : "Please enter the ddress"
			},
			"editVState" : {
				required : "Please select the state"
			},
			"editVCountry" : {
				required : "Please select the country"
			},
			"editVPin" : {
				required : "Please enter the PIN code",
				minlength : "PIN code must be 6 digits",
				maxlength : "PIN code must be 6 digits"
			},
			"editVContact1" : {
				required : "Please select the country",
				regx : "Only charcters are allowed!"
			},
			"editVContact1Mob" : {
				required : "Please enter mobile code!",
				minlength : "Mobile number must be 10 numbers!",
				maxlength : "Mobile number must be 10 numbers!",
				digits : "Your Mobile code must be 10 numbers!"
			},
			"editVEmail1" : {
				email : "Enter the correct email"
			},
			"bankAcc" : {
				required : "Please enter mobile code!",
				minlength : "Bank account number must be 10 numbers!",
				maxlength : "Bank account number must be 15 numbers!",
				digits : "Your Bank account code must numbers!"
			},
			"bankCode" : {
				regx : "bank code  must be Alphanumeric and Accept UpperCase!",
				minlength : "bank code must be 6 letters",
				maxlength : "bank code must be 6 letters"
			},
			"bankName" : {
				regx1 : "please enter the bank name!"
			},
			"panNumberE": {
                regx: "PAN format not correct!",
            },
            "tanNumberE": {
                regx: "TAN format not correct!",
            }

		}
	});
	if ($form.valid()) {
		return true;
	} else {
		return false;
	}

	return true;
}
$.validator.addMethod("regx", function(value, element, regexp) {
	if (regexp.constructor != RegExp)
		regexp = new RegExp(regexp);
	else if (regexp.global)
		regexp.lastIndex = 0;
	return this.optional(element) || regexp.test(value);
}, "Allow only 5 letters with alphanumeric");
$.validator.addMethod("regx1", function(value, element, regexp) {
	if (regexp.constructor != RegExp)
		regexp = new RegExp(regexp);
	else if (regexp.global)
		regexp.lastIndex = 0;
	return this.optional(element) || regexp.test(value);
}, "please enter the bank name!");

function validateQty(event) {
	var key = window.event ? event.keyCode : event.which;
	if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37
			|| event.keyCode == 39) {
		return true;
	} else if (key < 48 || key > 57) {
		return false;
	} else
		return true;
};



/**
 * @returns  
 */
var editFlagV = true;
var taxTabFlag = false;
function prepareVendorMasterPostDataForEdit() {
console.log(taxResponse);
	var vendor = {
			// vendor profile
			"vendorCode" : $("#editVCode").val(),
			"vendorName" : $("#editVName").val(),
			"vendorType" : $("#editVType").val(),
			"address1" : $("#editAddress1").val(),
			"address2" : $("#editAddress2").val(),
			"address3" : $("#editAddress3").val(),
			"vendorCity" : $("#editVCity").val(),
			"pinCode" : $("#editVPin").val(),
			"contact1" : $("#editVContact1").val(),
			"mobileNum1" : $("#editVContact1Mob").val(),
			"contact2" : $("#editVContact2").val(),
			"mobileNum2" : $("#editVContact2Mob").val(),
			"landLineNum" : $("#editVContactLanline").val(),
			"email1" : $("#editVEmail1").val(),
			"email2" : $("#editVEmail2").val(),
			"email3" : $("#editVEmail3").val(),
			"vendorBlocked" : $("#editVBlock").val(),
			"internal" : $("#editVInternal").val(),
			// Metal Details
			"purityTestGoldQty" : $("#purityGold").val(),
			"purityTestPlatinumQty" : $("#purityPlatinum").val(),
			"purityTestSilverQty" : $("#puritySilver").val(),
			"alloyPercentage" : $("#alloyAge").val(),
			"creditLimitGoldQty" : $("#creditMetalLimitGold").val(),
			"creditLimitPlatinumQty" : $("#creditMetalLimitPlatinum").val(),
			"creditLimitSilverQty" : $("#creditMetalLimitSilver").val(),
			// bank details
			"accountNumber" : $("#bankAcc").val(),
			"bankCode" : $("#bankCode").val(),
			"bankName" : $("#bankName").val(),
			"ifsc" : $("#bankIFSC").val(),
			"bankBranch" : $("#branch").val(),
			"currencyCode" : $("#currency").val(),
			// Tax Details
			"pan" : $("#panNumberE").val(),
			"cstNumber" : $("#CST").val(),
			"vatNumber" : $("#VAT").val(),
			"serviceTaxNumber" : $("#serviceTax").val(),
			"centralExciseNumber" : $("#centralExc").val(),
			"cst" : $("#CSTTaxPer").val(),
			"vat" : $("#vendorVATPer").val(),
			"excise" : $("#centralExcPer").val(),
			"surcharge" : $("#surChargePer").val(),
			"gstTax" : $("#GSTTax").val(),
			"serviceTax" : $("#ServTax").val(),
			"cess" : $("#cess").val(),
			"tanDate" : $("#tanDateE").val(),
			"tanNumber" : $("#tanNumberE").val(),
			"fasTax" : $("#isFASTaxE").val(),
			"tcsNumber" : $("#TCSNo").val(),
			"isregister" : $("#isVendRegisteredE").val(),
			// other Changes
			"courierCharges" : $("#courierCharge").val(),
			"insuranceCharges" : $("#insuranceCharge").val(),
			"packingCharges" : $("#packingCharge").val(),
			// updation Details
			"createdDate" : $("#editVCreated").val(),
			"vendorStartDate" : $("#editVStartDate").val(),
			"agreementUploadedDate" : $("#editVLastAgre").val(),
			"agreementUploadedBy" : $("#editVAgrreUploaded").val(),
			"agreementUploaded" : $("#editVAgreementUploaded").val(),
			"id" : $("#vendorId").val(),
			"vendorReturnTerms" : [],
			"vendorThirdParties" : [],
			"vendorHandlingCharges" : [],
			 "vendorTaxDetailDTOs": []
		}
	// vendor return term
	var rowscounts = getGrdRowCount("#jqxgridvrt");
	for (i = 0; i < rowscounts; i++) {
		var datarow = $("#jqxgridvrt").jqxGrid('getrowdata', i);
		
		
		if (datarow.returnType != '') {
			vendor.vendorReturnTerms.push(

			{
				"id" : datarow.id,
				"returnType" : datarow.returnType,
				"makingCharge" : (datarow.makingCharge != "") ? parseFloat(datarow.makingCharge.toFixed(2)) : null,
				"wastage" :(datarow.wastage) ? parseFloat(datarow.wastage.toFixed(2)) : null,
				"diamondPercentage" : (datarow.diamondPercentage) ? parseFloat(datarow.diamondPercentage.toFixed(2)) : null,
				"preciousPercentage" : (datarow.preciousPercentage) ? parseFloat(datarow.preciousPercentage.toFixed(2)) : null,
				"otherPercentage" :(datarow.otherPercentage) ? parseFloat(datarow.otherPercentage.toFixed(2)) : null,
				"days" : datarow.days
			})
		}
	}
	// third party vendor
	var rowscounts = getGrdRowCount("#jqxgridtpv");
	for (i = 0; i < rowscounts; i++) {
		var datarow = $("#jqxgridtpv").jqxGrid('getrowdata', i);
		if (datarow.thirdPartyName != '' && datarow.thirdPartyCity != ''
				&& datarow.thirdPartySegment != '') {
			vendor.vendorThirdParties.push(

			{
				"id" : datarow.id,
				"thirdPartyName" : datarow.thirdPartyName,
				"thirdPartyAddress1" : datarow.thirdPartyAddress1,
				"thirdPartyAddress2" : datarow.thirdPartyAddress2,
				"thirdPartyAddress3" : datarow.thirdPartyAddress3,
				"thirdPartyCity" : datarow.thirdPartyCity,
				"thirdPartyPinCode" : datarow.thirdPartyPinCode,
				"thirdPartySegment" : datarow.thirdPartySegment
			})
		}
	}
	// vendor handling charges
	var vhcRowsCounts = getGrdRowCount("#jqxgridvhc");
	for (i = 0; i < vhcRowsCounts; i++) {
		var vhcDataRow = $("#jqxgridvhc").jqxGrid('getrowdata', i);
		var segmentType = vhcDataRow.segmentType;
		var segment = vhcDataRow.segment;
		var category = vhcDataRow.category;
		var handlingCharge = vhcDataRow.handlingCharge;
		if (segmentType != '' && segment != '' && category != ''
				&& handlingCharge != '') {
			vendor.vendorHandlingCharges.push(

			{
				"id" : vhcDataRow.id,
				"segmentType" : segmentType,
				"segment" : segment,
				"category" : category,
				"handlingCharge" : parseFloat(handlingCharge).toFixed(2),
			})
		}
	}
	
	var taxDetArray = [];
	if(taxTabFlag == true){
		
		var getTaxDetE = $('#jqxgridC').jqxGrid('getrows');
	
		var isRegVendE = $("#isVendRegisteredE").val();
		if(isRegVendE == "Yes" && getTaxDetE.length == 0 && typeof getTaxDetE != "undefined"){
			editFlagV = false;
				$.growl.error({
					message : "Grid Fields are Mandatory !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		else{editFlagV = true;}
		
		if(typeof getTaxDetE != "undefined" && getTaxDetE.length > 0){
			for (var i = 0; i < getTaxDetE.length; i++) {
				var taxDetailsE = {
						  "id" :  (getTaxDetE[i].id == "") ? null : getTaxDetE[i].id  ,
						  "gstinNo": getTaxDetE[i].gstinNo,
					      "state" : {
								"id" :  getTaxDetE[i].stateId,
							}			    
				}
				if(getTaxDetE[i].gstinNo != ""){
					vendor.vendorTaxDetailDTOs.push(taxDetailsE);
				}
			//}
			}
		}
	}	
	
	console.log(vendor);

	

	return vendor;
	
}

// Vendor Return Term Grid start

// create new row.
$("#addVendorReturn").on('click', function() {
	var rowscounts = getGrdRowCount("#jqxgridvrt");
	
	var datarow = generateVRTrow();
	$("#jqxgridvrt").jqxGrid('addrow', null, datarow);
	$("#addVendorReturn").prop('disabled',true);

});
var getGrdRowCount = function(gridName) {
	var count = 0;
	var rows = $(gridName).jqxGrid('getrows');
	if (rows) {
		count = rows.length
	}
	return count;
}
var generateVRTrow = function() {
	var rowscounts = getGrdRowCount("#jqxgridvrt");
	var row = {};
	row["returnType"] = '';
	row["returnTypes"] = 'Select';
	row["makingCharge"] = '';
	row["wastage"] = '';
	row["diamondPercentage"] = '';
	row["preciousPercentage"] = '';
	row["otherPercentage"] = '';
	row["days"] = '';
	return row;
}

/* Add Vendor Return Term */
function addVendorReturnTerm() {

	var updateRows = function(rowid, newdata, commit) {
	}
	var vReturnTermSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : vReturnTerm
	};

	var vReturnTermSourceDataAdapter = new $.jqx.dataAdapter(vReturnTermSource,
			{
				autoBind : true
			});

	var datafields = [ {
		'name' : 'returnType',
		'type' : 'string'
	}, {
		name : 'returnTypes',
		value : 'returnType',
		values : {
			source : vReturnTermSourceDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'makingCharge',
		'type' : 'float'
	}, {
		'name' : 'wastage',
		'type' : 'float'
	}, {
		'name' : 'diamondPercentage',
		'type' : 'float'
	}, {
		'name' : 'preciousPercentage',
		'type' : 'float'
	}, {
		'name' : 'otherPercentage',
		'type' : 'float'
	}, {
		'name' : 'days',
		'type' : 'long'
	}, {
		'name' : 'id',
		'type' : 'long'
	} ];

	var popcolumns = [
			{
				'text' : 'Return Type',
				'datafield' : 'returnType',
				'width' : '102px',
				'height' : '20px',
				columntype : 'dropdownlist',
				displayfield : 'returnTypes',
				sortable : false,
				editable : true,
				initeditor : function(row, cellvalue, editor) {
					editor.jqxDropDownList({
						source : vReturnTermSourceDataAdapter,
						theme : 'energyblue',
						displayMember : 'name',
						valueMember : 'id',
						placeHolder : 'Select'
					});
				}
			},
			{
				'text' : 'Making Charges %',
				'datafield' : 'makingCharge',
				'width' : '135px',
				cellsformat : 'd2',
			//	columntype : 'numberinput',
				editable : true,
				sortable : false,
				cellsalign : 'right',
				align : 'center',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if(newvalue > 100 || newvalue < 0 ){
						$.growl.error({
							message : "Making Charges Should be less Than or Equal To 100!!.",
							duration : 10000
						});
						  return false ;
					} 
	}
			},
			{
				'text' : 'Wastage %',
				'datafield' : 'wastage',
				cellsformat : 'd2',
				'width' : '90px',
				//columntype : 'numberinput',
				editable : true,
				sortable : false,
				cellsalign : 'right',
				align : 'center',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if(newvalue > 100 || newvalue < 0 ){
						$.growl.error({
							message : "Wastage % Should be less Than or Equal To 100!!.",
							duration : 10000
						});
						  return false ;
					} 
	}
			},
			{
				'text' : 'Diamond %',
				'datafield' : 'diamondPercentage',
				cellsformat : 'd2',
				'width' : '90px',
				//columntype : 'numberinput',
				editable : true,
				sortable : false,
				cellsalign : 'right',
				align : 'center',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if(newvalue > 100 || newvalue < 0 ){
						$.growl.error({
							message : "Diamond % Should be less Than or Equal To 100!!.",
							duration : 10000
						});
						  return false ;
					} 
	}
			},
			{
				'text' : 'Precious Stones %',
				'datafield' : 'preciousPercentage',
				cellsformat : 'd2',
				'width' : '135px',
			//columntype : 'numberinput',
				editable : true,
				sortable : false,
				cellsalign : 'right',
				align : 'center',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if(newvalue > 100 || newvalue < 0 ){
						$.growl.error({
							message : "Precious Stones % Should be less Than or Equal To 100!!.",
							duration : 10000
						});
						  return false ;
					} 
	}
				
			},
			{
				'text' : 'Other Stones %',
				'datafield' : 'otherPercentage',
				cellsformat : 'd2',
				'width' : '120px',
				//columntype : 'numberinput',
				editable : true,
				sortable : false,
				cellsalign : 'right',
				align : 'center',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if(newvalue > 100 || newvalue < 0 ){
						$.growl.error({
							message : "Other Stones % Should be less Than or Equal To 100!!.",
							duration : 10000
						});
						  return false ;
					} 
	}
			}, {
				'text' : 'No. of Days',
				'datafield' : 'days',

				editable : true,
				sortable : false,
				validation : function(cell, value) {
					if (value.match(/[^0-9]/)) {
						return {
							result : false,
							message : "allow only  numbers."
						};
					}
					return true;
				}

			}, {
				text : 'Action',
				datafield : 'Delete',
				columntype : 'button',
				width : 75,
				cellsrenderer : function() {
					return 'Delete';
				},

				buttonclick : function(row) {
					id = $("#jqxgridvrt").jqxGrid('getrowid', row);
					$("#addVendorReturn").prop('disabled',false);
					var commit = $("#jqxgridvrt").jqxGrid('deleterow', id);
				}
			} ];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, popcolumns, updateRows, "", addrow, "#jqxgridvrt");
	// load vendor return term grid
	loadVRTPopUpGrid();
}
// vendor return type
var loadVRTPopUpGrid = function() {
	var id = $('#vendorId').val();
	if (id != '') {
		$.getJSON(
				'/OrderExecution/api/v1/vendorMaster?grid=vendorReturnTerm&id='
						+ id, function(data) {
							console.log(data.payload.vendorReturnTerm.length);
					if(data.resCode == 1){
						$.each(data.payload['vendorReturnTerm'],
								function(key, val) {

									$.each(vReturnTerm, function(key, value) {
										if (val.returnType === value.name) {
											val["returnType"] = value.id;
											val["returnTypes"] = value.name;
											return;
										}
									});

								})

						$("#jqxgridvrt").jqxGrid('addrow', null,
								data.payload['vendorReturnTerm']);
						if(data.payload.vendorReturnTerm.length == 1){
							$("#addVendorReturn").prop('disabled',true);
						}else{
							$("#addVendorReturn").prop('disabled',false);
						}
					}
				});
		
	}
}

// --------------------------------------Third Party
// Vendor---------------------------------------------------------
// Third Party Vendor Grid start
// create new row.
$("#addThirdPartyVendor").on('click', function() {
	var rowscounts = getGrdRowCount("#jqxgridtpv");
	var datarow = generateTPVrow();
	$("#jqxgridtpv").jqxGrid('addrow', null, datarow);
	$("#addThirdPartyVendor").prop('disabled',true);
});
var generateTPVrow = function() {
	var rowscounts = getGrdRowCount("#jqxgridtpv");
	var row = {};
	row["thirdPartyName"] = '';
	row["thirdPartyAddress1"] = '';
	row["thirdPartyAddress2"] = '';
	row["thirdPartyAddress3"] = '';
	row["thirdPartyCity"] = '';
	row["thirdPartyCities"] = 'Select';
	row["thirdPartyPinCode"] = '';
	row["thirdPartyState"] = '';
	row["thirdPartyCountry"] = '';
	row["thirdPartySegment"] = '';
	row["thirdPartySegments"] = 'Select';

	return row;
}

/* Add Vendor Return Term */
function addThirdPartyVendor() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var vSegmentSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : tpSegment
	};

	var vSegmentSourceDataAdapter = new $.jqx.dataAdapter(vSegmentSource, {
		autoBind : true
	});

	var vCitySource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : tpCity
	};

	var vCitySourceDataAdapter = new $.jqx.dataAdapter(vCitySource, {
		autoBind : true
	});

	var datafields = [ {
		'name' : 'thirdPartyName',
		'type' : 'string'
	}, {
		'name' : 'thirdPartyAddress1',
		'type' : 'string'
	}, {
		'name' : 'thirdPartyAddress2',
		'type' : 'string'
	}, {
		'name' : 'thirdPartyAddress3',
		'type' : 'string'
	}, {
		'name' : 'thirdPartyCity',
		'type' : 'string'
	}, {
		name : 'thirdPartyCities',
		value : 'thirdPartyCity',
		values : {
			source : vCitySourceDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'thirdPartyPinCode',
		'type' : 'string'
	}, {
		'name' : 'thirdPartyState',
		'type' : 'string'
	}, {
		'name' : 'thirdPartyCountry',
		'type' : 'string'
	}, {
		'name' : 'thirdPartySegment',
		'type' : 'string'
	}, {
		name : 'thirdPartySegments',
		value : 'thirdPartySegment',
		values : {
			source : vSegmentSourceDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'id',
		'type' : 'long'
	} ];

	var popcolumns = [
			{
				'text' : 'Vendor Name',
				'datafield' : 'thirdPartyName',
				'width' : '125px',
				cellsalign : 'center',
				align : 'center',
				'height' : '10px',
				editable : true,
				sortable : false
			},
			{
				'text' : 'Address 1.',
				'datafield' : 'thirdPartyAddress1',
				'width' : '125px',
				cellsalign : 'left',
				align : 'center',
				'height' : '10px',
				editable : true,
				sortable : false
			},
			{
				'text' : 'Address 2.',
				'datafield' : 'thirdPartyAddress2',
				'width' : '125px',
				cellsalign : 'left',
				align : 'center',
				'height' : '10px',
				editable : true,
				sortable : false
			},
			{
				'text' : 'Address 3.',
				'datafield' : 'thirdPartyAddress3',
				'width' : '125px',
				cellsalign : 'left',
				align : 'center',
				'height' : '10px',
				editable : true,
				sortable : false
			},
			{
				'text' : 'Vendor City',
				'datafield' : 'thirdPartyCity',
				'width' : '125px',
				cellsalign : 'center',
				align : 'center',
				'height' : '10px',
				columntype : 'dropdownlist',
				displayfield : 'thirdPartyCities',
				sortable : false,
				editable : true,
				initeditor : function(row, cellvalue, editor) {
					editor.jqxDropDownList({
						source : vCitySourceDataAdapter,
						theme : 'energyblue',
						displayMember : 'name',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue, event) {
					populateStateAndCountry(row, oldvalue, newvalue);
				}
			}, {
				'text' : 'Vendor City PIN Code',
				'datafield' : 'thirdPartyPinCode',
				'width' : '125px',
				cellsalign : 'center',
				align : 'center',
				'height' : '10px',
				editable : true,
				sortable : false
			}, {
				'text' : 'Vendor State',
				'datafield' : 'thirdPartyState',
				'width' : '125px',
				cellsalign : 'center',
				align : 'center',
				'height' : '10px',
				editable : false,
				sortable : false
			}, {
				'text' : 'Vendor Country',
				'datafield' : 'thirdPartyCountry',
				'width' : '125px',
				cellsalign : 'center',
				align : 'center',
				'height' : '10px',
				editable : false,
				sortable : false
			}, {
				'text' : 'Segment',
				'datafield' : 'thirdPartySegment',
				'width' : '125px',
				cellsalign : 'center',
				align : 'center',
				'height' : '20px',
				columntype : 'dropdownlist',
				displayfield : 'thirdPartySegments',
				sortable : false,
				editable : true,
				initeditor : function(row, cellvalue, editor) {
					editor.jqxDropDownList({
						source : vSegmentSourceDataAdapter,
						theme : 'energyblue',
						displayMember : 'name',
						valueMember : 'id'
					});
				}
			}, {
				text : 'Action',
				datafield : 'Delete',
				columntype : 'button',
				width : 100,
				cellsalign : 'center',
				align : 'center',
				cellsrenderer : function() {
					return "Delete";
				},
				buttonclick : function(row) {
					id = $("#jqxgridtpv").jqxGrid('getrowid', row);
					$("#addThirdPartyVendor").prop('disabled',false);
					var commit = $("#jqxgridtpv").jqxGrid('deleterow', id);
				}
			} ];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, popcolumns, updateRows, "", addrow, "#jqxgridtpv");
	// load vendor return term grid
	loadTPVPopUpGrid();
}
var populateStateAndCountry = function(row, oldvalue, newvalue) {

	var cityId = newvalue.value;
	if (cityId == '' || cityId == -1) {
		return;
	}

	$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?cityId=' + cityId,
			function(data) {

				$("#jqxgridtpv").jqxGrid('setcellvalue', row,
						"thirdPartyState", data.payload['vState']);
				$("#jqxgridtpv").jqxGrid('setcellvalue', row,
						"thirdPartyCountry", data.payload['vCountry']);

			});
}


// vendor return type
var loadTPVPopUpGrid = function() {
	var id = $('#vendorId').val();
	if (id != '') {
		$.getJSON('/OrderExecution/api/v1/vendorMaster?grid=thirdPartyVendor&id='+ id, function(data) {
			if(data.resCode == 1){
				$.each(data.payload['thirdPartyVendor'],
						function(key, val) {
							$.each(tpSegment, function(key, value) {
								if (val.thirdPartySegment == value.name) {
									val["thirdPartySegment"] = value.id;
									val["thirdPartySegments"] = value.name;
									return;
								}
							});
							$.each(tpCity, function(key, value) {
								if (val.thirdPartyCity == value.name) {
									val["thirdPartyCity"] = value.id;
									val["thirdPartyCities"] = value.name;
									return;
								}
							});

						})

				$("#jqxgridtpv").jqxGrid('addrow', null,
						data.payload['thirdPartyVendor']);
				
				if(data.payload.thirdPartyVendor.length == 0){
					$("#addThirdPartyVendor").prop('disabled',false);
				}else{
					$("#addThirdPartyVendor").prop('disabled',true);
				}
			}else{
				
			}
		});	
		
	}
}

// --------------------------------------Vendor Handling
// Charges--------------------
// Vendor Handling Charges Grid start
// create new row.
$("#addVendorHandlingCharges").on('click', function() {
	vhcSegment.length = 0;
	var rowscounts = getGrdRowCount("#jqxgridvhc");
	var datarow = generateVHCrow();
	$("#jqxgridvhc").jqxGrid('addrow', null, datarow);
	$("#addVendorHandlingCharges").prop('disabled',true);
});
var generateVHCrow = function() {
	var rowscounts = getGrdRowCount("#jqxgridvhc");
	var row = {};
	row["segmentType"] = '';
	row["segmentTypes"] = 'Select';
	row["segment"] = '';
	row["segments"] = 'Select';
	row["category"] = '';
	row["categorys"] = 'Select';
	row["handlingCharge"] = '';

	return row;
}

var segmArr = [];
var catArry = [];
/* Add Vendor Handling Charges */
function addVendorHandlingCharges() {

	var updateRows = function(rowid, newdata, commit) {
	}
	var vhcSegmentTypeSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : vhcSegmentType
	};

	var vhcSegmentTypeSourceDataAdapter = new $.jqx.dataAdapter(
			vhcSegmentTypeSource, {
				autoBind : true
			});

	var vhcSegmentSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : vhcSegment
	};

	var vhcSegmentSourceDataAdapter = new $.jqx.dataAdapter(vhcSegmentSource, {
		autoBind : true
	});

	var vhcCategorySource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : vhcCategory
	};

	var vhcCategorySourceDataAdapter = new $.jqx.dataAdapter(vhcCategorySource,
			{
				autoBind : true
			});

	var datafields = [ {
		'name' : 'segmentType',
		'type' : 'string'
	}, {
		name : 'segmentTypes',
		value : 'segmentType',
		values : {
			source : vhcSegmentTypeSourceDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		name : 'segments',
		value : 'segment',
		values : {
			source : vhcSegmentSourceDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'category',
		'type' : 'string'
	}, {
		name : 'categorys',
		value : 'category',
		values : {
			source : vhcCategorySourceDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'handlingCharge',
		'type' : 'double'
	}, {
		'name' : 'id',
		'type' : 'long'
	} ];

	var popcolumns = [
			{
				'text' : 'Segment Type',
				'datafield' : 'segmentType',
				columntype : 'dropdownlist',
				displayfield : 'segmentTypes',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : true,
				initeditor : function(row, cellvalue, editor) {
					editor.jqxDropDownList({
						source : segType,
						theme : 'energyblue',
						displayMember : 'name',
						valueMember : 'id',
					});
				},
			
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					$("#jqxgridvhc").jqxGrid('setcellvalue', row,'segment',null);
					$("#jqxgridvhc").jqxGrid('setcellvalue', row,'segments',null);
					if(newvalue.value == "M"){
						segmArr = metalSeg;
					}else if(newvalue.value == "S"){
						segmArr = stoneSeg;
					}else if(newvalue.value == "AC"){
						segmArr = accSeg;
					}
				},
				cellbeginedit : function(row, datafield, columntype) {
					var value = $('#jqxgridvhc').jqxGrid('getcellvalue', row,
							'handlingCharge');
					if (value > 0)
						return false;
				}
			},
			{
				'text' : 'Segment',
				'datafield' : 'segment',
				columntype : 'dropdownlist',
				displayfield : 'segments',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : true,
				initeditor : function(row, cellvalue, editor) {
					editor.jqxDropDownList({
						source : segmArr,
						theme : 'energyblue',
						displayMember : 'description',
						valueMember : 'id',
					});
					//editor.jqxDropDownList({ source: segmArr , displayMember: 'description', valueMember: 'id'});
				},
				/*createeditor : function(row, value, editor) {
					editor.on('click', function(event){						
						editor.jqxDropDownList({ source: segmArr , displayMember: 'description', valueMember: 'id'});
					});
				},*/
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					$("#jqxgridvhc").jqxGrid('setcellvalue', row,'category',null);
					$("#jqxgridvhc").jqxGrid('setcellvalue', row,'categorys',null);
					var sType = $('#jqxgridvhc').jqxGrid('getcellvalue', row, 'segmentType');
					$.getJSON('/OrderExecution/api/v1/vendorMasterVHC?sType=' + sType + "&segmentId=" + newvalue.value, function(data) {
						 if(data.resCode == 1){
							 catArry = data.payload.category;
						 }
					});
				},
				cellbeginedit : function(row, datafield, columntype) {
					var value = $('#jqxgridvhc').jqxGrid('getcellvalue', row,
							'handlingCharge');
					if (value > 0)
						return false;
				}
			},
			{
				'text' : 'Category',
				'datafield' : 'category',
				columntype : 'dropdownlist',
				displayfield : 'categorys',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : true,
				initeditor : function(row, cellvalue, editor) {
					editor.on('click', function(event){
					editor.jqxDropDownList({
						source : catArry,
						theme : 'energyblue',
						displayMember : 'description',
						valueMember : 'id',
					});
					});
				},
				/*createeditor : function(row, value, editor) {
					editor.on('click', function(event){						
						editor.jqxDropDownList({ source: catArry , displayMember: 'description', valueMember: 'id'});
					});
				},*/
				cellbeginedit : function(row, datafield, columntype) {
					var value = $('#jqxgridvhc').jqxGrid('getcellvalue', row,
							'handlingCharge');
					if (value > 0)
						return false;
				}
			}, {
				'text' : 'Handling Charges',
				'datafield' : 'handlingCharge',
				cellsformat : 'd2',
				columntype : 'numberinput',
				cellsalign : 'right',
				align : 'center',
				editable : true,
				sortable : false,
				createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						decimalDigits : 2
					});
				}
			}, {
				text : 'Action',
				datafield : 'Delete',
				columntype : 'button',
				cellsalign : 'center',
				align : 'center',
				width : 75,
				cellsrenderer : function() {
					return "Delete";
				},
				buttonclick : function(row) {
					id = $("#jqxgridvhc").jqxGrid('getrowid', row);
					$("#addVendorHandlingCharges").prop('disabled',false);
					var commit = $("#jqxgridvhc").jqxGrid('deleterow', id);
				}
			} ];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, popcolumns, updateRows, "", addrow, "#jqxgridvhc");
	// load vendor return term grid
	loadVHCPopUpGrid();
}
/*var populateSegment = function(row, newvalue) {
	vhcSegment.length = 0;
	var sType = newvalue.value;
	if (sType == '' || sType == -1) {
		vhcSegment.length = 0;
		return;
	}

	$.getJSON('/OrderExecution/api/v1/vendorMasterVHC?sType=' + sType,
			function(data) {
				vhcSegment.length = 0;
				vhcSegment.push({
					id : -1,
					name : 'Select'
				});
				$.each(data.payload.segements, function(key, val) {
					vhcSegment.push({
						id : val.id,
						name : val.description
					});
				});

			});
}*/
/*var populateCategory = function(row, newvalue) {

	var sType = $("#jqxgridvhc").jqxGrid('getcellvalue', row, "segmentType");
	var segmentId = newvalue.value;

	if (segmentId == null || segmentId == -1) {
		vhcCategory.length = 0;
		return;
	}
	vhcCategory.length = 0;
	$.getJSON('/OrderExecution/api/v1/vendorMasterVHC?sType=' + sType
			+ "&segmentId=" + segmentId, function(data) {
		vhcCategory.length = 0;
		vhcCategory.push({
			id : -1,
			name : 'Select'
		});
		$.each(data.payload.category, function(key, val) {
			vhcCategory.push({
				id : val.id,
				name : val.description
			});
		});

	});
}*/
var segTypes;
var metalSegs
var stoneSegs
var accSegs;
var onLoadFunction = function(){
	$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?page=update',function(data) {
		segTypes = data.payload.segmentTypes;
		metalSegs = data.payload.mTypes;
		stoneSegs = data.payload.stoneSegments;
		accSegs = data.payload.accessorySegments;
	});
}
onLoadFunction();

// vendor handling charge
var loadVHCPopUpGrid = function() {
	var id = $('#vendorId').val();
	var segmentId = 0;
	if (id != '') {
		$.getJSON('/OrderExecution/api/v1/vendorMaster?grid=vendorHandlingCharge&id='+ id,function(data) {
			if(data.resCode == 1){
				$.each(data.payload['vendorHandlingCharge'],function(key, val) {
					vhcSegment.length = 0;
					vhcCategory.length = 0;
					
					$.each(segTypes,function(key,value) {
						if (val.segmentType == value.name) {
							val["segmentType"] = value.id;
							val["segmentTypes"] = value.name;
							var sType = value.id;

							
							if(typeof segmArr === 'object'){
								val["segment"] = val.segment;
								val["segments"] = val.segment;
							}else{
								$.each(segmArr,function(key,value) {
									if (val.segment == value.name) {
										val["segment"] = value.id;
										val["segments"] = value.description;
									}
								});
							}
							
								if(typeof catArry == "object"){
									val["category"] = val.category;
									val["categorys"] = val.category;
								}else{
									$.each(catArry,function(key,value) {
										if (val.category == value.description) {
											val["category"] = value.id;
											val["categorys"] = value.description;
										}
									});
								}

						}
					});
				});
				
				if(data.payload.vendorHandlingCharge.length == 0){
					$("#addVendorHandlingCharges").prop('disabled',false);
				}else{
					$("#addVendorHandlingCharges").prop('disabled',true);
				}

				$(function() {
					function show_popup() {
						var value = $("#jqxgridvhc").jqxGrid('addrow',null,data.payload['vendorHandlingCharge']);
					};
					window.setTimeout(show_popup, 1000); // 1
				});
			}
			
		});
	}

}

$("#Search").on('click', function() {

	/*
	 * $form = $('#vendorSearch'); $form.validate({ errorElement: 'label',
	 * errorClass: 'help-inline', focusInvalid: false, ignore: "", rules: {
	 * "vendorCode": { required: true } }, messages: { "vendorCode":{ required :
	 * "Please enter the vendor Code/Name!" },
	 *  } }); if ($form.valid()) {
	 */
	vendorDetailsMaster();
	$("#jqxgrid").show();
	// }
});

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

$('#vendorMasterModal').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();
	$("#jqxgridT").jqxGrid('clear');
});
