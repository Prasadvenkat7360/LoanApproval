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

var authorizationDet = localStorage.getItem("authorization");

// date picker functions
$("#fromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	 maxDate: 0,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDate").datepicker('option', 'minDate', min || '0');
    }
});

$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	 maxDate: 0,
});

var checkWeightVal = function(wtVal,type){
	if(wtVal == "" || wtVal == 0){
		if(type == "gwt"){
			$("#grossWt").val("");
		}else if(type == "nwt"){
			$("#netWt").val("");
			$("#pureWt").val("");
		}else{
			$("#pureWt").val("");
		}
		$("#pureWt").prop('disabled',false);
		$.growl.error({
			message : "Wt. Should not be Empty/Zero !!",
			duration : 10000,
			title : "Error"
		});
		return false;
	}else{
		$("#pureWt").prop('disabled',true);
	}
}

$("#grossWt").on('change',function(){
	checkWeightVal($("#grossWt").val(),"gwt");
});

var calculatePureWt = function(){
	var grossWt =  $("#grossWt").val();
	var netWt =  $("#netWt").val();
	var skinPurity = $("#skinPurity option:selected").text();
	if( netWt > 0){		
		var pureWt = netWt*skinPurity/99.9;
		$("#pureWt").val(pureWt.toFixed(3));
		$("#pureWt").prop('disabled', true);
	}
}

var calculatePureWtEdit = function(){
	var grossWt =  $("#grossWtE").val();
	var netWt =  $("#netWtE").val();
	var skinPurity = $("#skinPurityE option:selected").text();
	if(grossWt > 0 && netWt > 0){		
		var pureWt = netWt*skinPurity/99.9;
		$("#pureWtE").val(pureWt.toFixed(3));
	}
}

$("#netWt").on('blur',function(){
	if($("#grossWt").val() != ""){
		if(parseFloat($("#grossWt").val()) < parseFloat($("#netWt").val())){
			$("#netWt").val("");
			$.growl.error({
				message : "Net Wt. Should not be Greater Than Gross Wt. !!",
				duration : 10000,
				title : "Error"
			});
			return false;
		}
	}
	if($("#netWt").val() == ""){
		$("#pureWt").prop('disabled', false);
	}else{
		$("#pureWt").prop('disabled', true);
	}
	
	//if($("#grossWt").val() == ""){
	checkWeightVal($("#netWt").val(),"nwt");
	//}
});

$("#pureWt").on('change',function(){
	checkWeightVal($("#pureWt").val(),"pwt");
});
function validateNumber(val) {
	var regex = /^\d{0,9}(\.\d{0,9})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(3);
	}
	return '';
}

$("#vendorCodeE-lov-modal").hide();
$("#adjType").on("change", function() {
	$("#vendorCodeE").hide();
	var adjusTypeC = $('#adjType option:selected').text();
	if (adjusTypeC == "External") {
		$("#vendorCodeE-lov-modal").show();
		$("#vendorCodeE").show();
	} else {
		$("#vendorCodeE-lov-modal").hide();
		$("#vendorCodeE").hide();
	}
});
$("#vendorCodeC-lov-modal").hide();
$("#adjusTypeC").on("change", function() {
	$("#vendorCodeC").hide();
	var adjusTypeC = $('#adjusTypeC option:selected').text();
	if (adjusTypeC == "External") {
		$("#vendorCodeC-lov-modal").show();
		$("#vendorCodeC").show();
	} else {
		$("#vendorCodeC-lov-modal").hide();
		$("#vendorCodeC").hide();
	}
});

$("#editAdjustmentVoucher").on("click", function() {
	var adjusTypeE = $('#adjusTypeE option:selected').text();
	if (adjusTypeE == "External") {
		$("#vendorCodeE-lov-modal").show();
		$("#vendorCodeE").show();
		$("locationE").prop('disabled', false);
	} else {
		$("#vendorCodeE-lov-modal").hide();
		$("#vendorCodeE").hide();
		$("locationE").prop('disabled', true);
	}
});



var editAdjVoucher = function (row, columnfield, value, defaulthtml, columnproperties) {
	  
    var adjustmentPosted = $("#jqxgrid").jqxGrid('getrowdata', row).adjustmentPosted;
   
		if(adjustmentPosted == "No"){
			return '<button class="btn btn-sm btn-primary" data-toggle="modal"  data-target="#btnEditAdjVouch" type="button" id='
			+ row
			+ ' onclick="editAdjustmentVoucher('
			+ value
			+ ')" ><span class="fa fa-pencil fa-lg"></span> </button><button class="btn btn-sm btn-success"  type="button" id='
			+ row
			+ ' onclick="postAdjustmentVoucher('
			+ value
			+ ')" ><span class="fa fa-share-square-o fa-lg"></span> </button>';
		}else{
			return '<button class="btn btn-sm btn-primary"  type="button" disabled><span class="fa fa-pencil fa-lg"></span> </button><button class="btn btn-sm btn-default"  type="button"  disabled><span class="fa fa-share-square-o fa-lg"></span> </button>';
		}
}





//############### Post Functionality #################
var dateForC;
function postAdjustmentVoucher(id) {
	$.getJSON("/OrderExecution/api/v1/postAdjustmentVoucher?id=" + id,function(data) {
		if (data.resCode == "1") {
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		adjVoucherGrid1();
		} else {
		  $.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'

		});
	  }
		$('#btnEditAdjVouch').modal('hide');
  });
}

// Lov's for Edit
$('#metalTypeC').empty().append('<option value="" selected>--Select--</option>');
$('#adjusTypeC').empty().append('<option value="" selected>--Select--</option>');
$('#vendorCodeC').empty().append('<option value="" selected>--Select--</option>');
$('#rmfg').empty().append('<option value="" selected>--Select--</option>');
$('#cdFlag').empty().append('<option value="" selected>--Select--</option>');

$('#adjusTypeE').empty().append('<option value="" selected>--Select--</option>');
$('#vendorCodeE').empty().append('<option value="" selected>--Select--</option>');
$('#rmfgE').empty().append('<option value="" selected>--Select--</option>');
$('#cdFlagE').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/adjustmentVoucherLOVs', function(data) {
	var adjTypeE = data.payload.AdjustmentTypes;
	var vendE = data.payload.vendors;
	var matTypeE = data.payload.MaterialTypes;
	var cdFlagE = data.payload.DebitCreditTypes;
	
	$('#metalType').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.segments, function(key, val) {
		console.log(data.payload.segments);
		$('#metalType').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
	$('#adjType').empty().append('<option value="" selected>--Select--</option>');

	$.each(data.payload.AdjustmentTypes, function(key, val) {
		$('#adjType').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	
	// Lov's for Create
	$.each(data.payload.segments, function(key, val) {
		$('#metalTypeC').append('<option value="' + val.id + '">' + val.description + '</option>');
	});

	$.each(data.payload.AdjustmentTypes, function(key, val) {
		$('#adjusTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

	$.each(data.payload.vendors, function(key, val) {
		$('#vendorCodeC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

	$.each(data.payload.MaterialTypes, function(key, val) {
		$('#rmfg').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

	$.each(data.payload.DebitCreditTypes, function(key, val) {
		$('#cdFlag').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	dateForC = data.payload.SystemDate;
	$("#adjDate").val(dateForC);
	
	// Smart Search For Vendor Code
	vCode = data.payload.vendors;
	var data = [];
	$.each(vCode, function(key, value) {
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
				$(this).val(ui.item.value);
				$(this).val(ui.item.label);
				$("#vendorCode-value").val(ui.item.value);
			}
		});
	});
	
	// Lov's for Edit
	$.each(adjTypeE, function(key, val) {
		$('#adjusTypeE').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

	$.each(vendE, function(key, val) {
		$('#vendorCodeE').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

	$.each(matTypeE, function(key, val) {
		$('#rmfgE').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

	$.each(cdFlagE, function(key, val) {
		$('#cdFlagE').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

});

var locationDet = function() {
	var voucherDetailsC = {
		"fieldFilters" : {
			"adjustType" : $("#adjusTypeC").val(),
			"storeOrDcType" : $("#storeDc").val(),
			"storeDcId" : $("#storeDcNameC").val(),
			"material" : $("#rmfg").val(),
			"metalSegId" : $("#metalTypeC").val(),
			"vendorId" : $("#vendorCodeC").val()
		}
	}
	return voucherDetailsC;
}
$('#storeDcNameC').on('change',function() {
			$('#locationC').empty().append('<option value="" selected>--Select--</option>');
			var voucherDetailsS = locationDet();
			var id = $("#adjusTypeC").val();
			if (voucherDetailsS) {
				postJSON('/OrderExecution/api/v1/getLocationCodes', JSON.stringify(voucherDetailsS), function(data) {
					if(data.resCode == 1){
					$.each(data.payload.locationCodes, function(key, val) {
						$('#locationC').append('<option value="' + val.id + '">' + val.name + '</option>');
					});
					}else{
						$.growl.error({
							message : data.mesgStr,
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
				});
			}
		});

var onLoadlocationDet = function() {
	var voucherDetailsC = {
		"fieldFilters" : {}
	}
	
	$('#locationC').empty().append('<option value="" selected>--Select--</option>');
	var id = $("#adjusTypeC").val();
	postJSON('/OrderExecution/api/v1/getLocationCodes', JSON.stringify(voucherDetailsC), function(data) {
		$.each(data.payload.locationCodes, function(key, val) {
			$('#locationC').append('<option value="' + val.id + '">' + val.name + '</option>');
		});

	});
	
	$('#storeDcNameC').empty().append('<option value="" selected>--Select--</option>');
	var id = "";
	 $.getJSON('/OrderExecution/api/v1/getStoreOrDcs?type=' + id,function(data) {
		$.each(data.payload.allStoreOrDc,function(key, val) {
			$('#storeDcNameC').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
	});
}
var editAdjustmentVoucher = function(id) {

	$('#popupheaderlabel').text('Edit  Adjustment Voucher');

	$.getJSON('/OrderExecution/api/v1/getAdjustmentVoucher?id=' + id, function(data) {
		var selectedRowData = data.payload.adjustmentVoucher;
		var selectedRowDataPurity = data.payload.skinPurities;
		var selectedRowDataLoc = data.payload.locationCodes;

		
		$('#skinPurityE').empty().append('<option value="" selected>--Select--</option>');
		$.each(selectedRowDataPurity,function(key, val) {
			$('#skinPurityE').append('<option value="' + val.skinPurity + '">' + val.skinPurity + '</option>');
		});
		$('#locationE').empty().append('<option value="" selected>--Select--</option>');
		$.each(selectedRowDataLoc,function(key, val) {
					$('#locationE').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		$("#adjustmentNo").val(id);
		$("#adjDateE").val(selectedRowData.adjustmentDate);
		$("#metalTypeE").val(selectedRowData.metalSegment.description);
		$("#adjusTypeE").val(selectedRowData.adjustmentType.id);
		$("#locationE").val(selectedRowData.locCode.id);
		$("#cdFlagE").val(selectedRowData.debitOrCreditType.id);
		$("#skinPurityE").val(selectedRowData.voucherPurity);
		$("#remarksE").val(selectedRowData.remarks);
		$("#rmfgE").val(selectedRowData.materialType.id);
		$("#grossWtE").val(selectedRowData.grossWeight);
		$("#storeDcNameE").val(selectedRowData.storeDcDTO.name);
		$("#pureWtE").val(selectedRowData.pureWeight);
		$("#storeDcE").val(selectedRowData.storeOrDc.id);
		$("#netWtE").val(selectedRowData.netWeight);
		if(selectedRowData.vendor != null){ 
				$("#vendorCodeE").val(selectedRowData.vendor.venSearchAndName);
		}else{}
	});

}
var updateLocationDet = function() {

	var updateVoucherDetailsC = {
		"id" : $("#adjustmentNo").val(),
		"debitOrCreditType" : {
			"id" : $("#cdFlagE").val(),
		},
		"grossWeight" : $("#grossWtE").val(),
		"netWeight" : $("#netWtE").val(),
		"pureWeight" : $("#pureWtE").val(),
		"locCode" : {
			"id" : $("#locationE").val(),
		},
		"remarks" : $("#remarksE").val(),
		"voucherPurity" : $("#skinPurityE").val(),
	}
	return updateVoucherDetailsC;
};

//Update and save metal accounting location details

$('#adjVoucherE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    //	"pureWtE": { required: true },       
        "storeDcE": { required: true },
        "storeDcNameE": { required: true },
        "locationE" : {required: true},
        "cdFlagE" :{required: true},
        "skinPurityE" :{required: true},
        "remarksE":{required: true}
    },
    submitHandler: function (form) { 
    	var updateVocDet = updateLocationDet();

		if (updateVocDet) {postJSON('/OrderExecution/api/v1/updateAdjustmentVoucher ',JSON.stringify(updateVocDet), function(data) {
			if (data.resCode == "1") {
			 $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$('#btnEditAdjVouch').modal('hide');
			adjVoucherGrid1();
		}else{
		    $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
       }
	   $('#btnEditAdjVouch').modal('hide');
	 });
	}
   }  
});  
$("#create").on("click",function(){
	$("#adjDate").val(dateForC);
})
// Adjustment Voucher filed Filters
var adjustmentVoucherFieldFilters = function() {
	var adjustmentFromDate = $("#fromDate").val();
	var adjustmentToDate = $("#toDate").val();
	var metalType = $("#metalType").val();
	var adjustmentType = $("#adjType").val();
	var locationCode = $("#locCode").val();
	var vendorCode = ($("#vendorCode").val() == "")? null: $("#vendorCode-value").val()
	var storeDcNameS = $("#storeDcNameS").val();
	var storeOrDc = $("#storeOrDc").val();
	var adjVoucherNo = $("#adjVoucherNo").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (adjustmentFromDate != "" && adjustmentFromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = adjustmentFromDate;
	}
	if (adjVoucherNo != "" && adjVoucherNo != null) {
		fieldFilters.fieldFilters["adjustId"] = adjVoucherNo;
	}
	if (adjustmentToDate != "" && adjustmentToDate != null) {
		fieldFilters.fieldFilters["toDate"] = adjustmentToDate;
	}
	if (metalType != "" && metalType != null) {
		fieldFilters.fieldFilters["metalSegId"] = metalType;
	}
	if (adjustmentType != "" && adjustmentType != null) {
		fieldFilters.fieldFilters["adjustType"] = adjustmentType;
	}
	if (locationCode != "" && locationCode != null) {
		fieldFilters.fieldFilters["locCode"] = locationCode;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendor"] = vendorCode;
	}
	if (storeOrDc == "dc") {
		fieldFilters.fieldFilters["DC"] = storeDcNameS;
	}
	if (storeOrDc == "store") {
		fieldFilters.fieldFilters["Store"] = storeDcNameS;
	}
	return fieldFilters;
}


$("#storeOrDc").on("change",function() {
		$('#storeDcNameS').empty().append('<option value="" selected>--Select--</option>');
		var id = $("#storeOrDc").val();
		$.getJSON('/OrderExecution/api/v1/getStoreOrDcs?type=' + id,function(data) {
			if (id != "") {
			 $.each(data.payload.allStoreOrDc,function(key, val) {
			  $('#storeDcNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		}
	});
	if($("#adjType").val() == "Internal"){
		$('#locCode').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getLocationCodesForSearch',JSON.stringify(locationDetS()), function(data) {
			$.each(data.payload.locationCodes, function(key,val) {
			  $('#locCode').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
         });
	}
});



$("#storeDc").on("change",function() {
		$('#storeDcNameC').empty().append('<option value="" selected>--Select--</option>');
		$('#locCode').empty().append('<option value="" selected>--Select--</option>');
		var id = $("#storeDc").val();
		 $.getJSON('/OrderExecution/api/v1/getStoreOrDcs?type=' + id,function(data) {
			if (id != "") {
			$.each(data.payload.allStoreOrDc,function(key, val) {
				$('#storeDcNameC').append('<option value="' + val.id + '">' + val.name + '</option>');
				});
			}
		});
	});

$("#metalTypeC").on("change",function() {
	$('#skinPurity').empty().append('<option value="" selected>--Select--</option>');
	$('#locCode').empty().append('<option value="" selected>--Select--</option>');
		var id = $("#metalTypeC").val();
		$.getJSON('/OrderExecution/api/v1/skinPurityLOV?id=' + id,function(data) {
		if (id != "") {
			$.each(data.payload.segments,function(key, val) {
			 $('#skinPurity').append('<option value="' + val.skinPurity + '">' + val.skinPurity + '</option>');
			});
		  }
		});
	});

// create Adjustment Voucher Started
var saveAdjVoucher = function() {
  var authById = localStorage.getItem("authById");
  var authByName = localStorage.getItem("authByName");

	var voucherDetails = {
		"adjustmentDate" : $("#adjDate").val(),
		"metalSegment" : {
			"id" : $('#metalTypeC').val()
		},
		"adjustmentType" : {
			"id" : $('#adjusTypeC').val()
		},
		"locCode" : {
			"id" : $('#locationC').val()
		},
		"debitOrCreditType" : {
			"id" : $('#cdFlag').val()
		},
		"voucherPurity" : $("#skinPurity").val(),
		"remarks" : $("#remarks").val(),
		"materialType" : {
			"id" : $('#rmfg').val()
		},

		"grossWeight" : $("#grossWt").val(),
		"netWeight" : $("#netWt").val(),
		"pureWeight" : $("#pureWt").val(),
		"storeDcId" : $("#storeDcNameC").val(),
		"storeOrDc" : {
			"id" : $('#storeDc').val()
		},

		"vendor" : {
			"id" : $('#vendorCodeC').val()
		}, 
		"authorizedBy": {
		    "id": authById,
		    "name": authByName
		  }
		

	}
	return voucherDetails;
}

// ####################################################
// Create and save adjustment voucher
var saveAdj = function(){
	var voucherDetails = saveAdjVoucher();
	if (voucherDetails) {
			postJSON('/OrderExecution/api/v1/createAdjustmentVoucher', JSON.stringify(voucherDetails), function(data) {
				if (data.resCode==1) {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,

					});
					$("#createAdjusVouchr").modal('hide');
					//adjVoucherGrid1();
					authorization('A', 2, data.id);
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}

			});

	}
}
$('#createAvm').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"adjDate": { required: true },
    	"metalTypeC": { required: true },
    //	"vendorCodeC": { required: true },
    	"cdFlag" :{ required: true },
    	"skinPurity" : { required: true },
    	"rmfg" : { required: true },
    	"locationC" :{ required: true },
        "storeDcNameC": { required: true },
        "storeDc": { required: true },
        "remarks": { required: true }  
	    
    },
    submitHandler: function (form) { 
    	var authorization = {
    			"code" : "AV",
    			"description" : "Adjustment Voucher",
    			"docType" : "ADJM",
    			"docNo" : null,
    			"transactionAmt" : null,
    	}
    	
    	localStorage.setItem("authorization",JSON.stringify(authorization));
    	openNav('AV');
    	
    }  
});  

var locationDetS = function() {
	var voucherDet = {
		"fieldFilters" : {
			"adjustType" : $("#adjType").val(),
			"metalSegId" : $("#metalType").val(),
			"storeOrDcType" : $("#storeOrDc").val(),
			"storeDcId" : $("#storeDcNameS").val(),
			"vendorId" : ($("#vendorCode").val() == "")? null: $("#vendorCode-value").val() 
		}
	}
	return voucherDet;
}
$('#adjType').on('change',function() {
			$('#locCode').empty().append('<option value="" selected>--Select--</option>');
			var voucherDetS = locationDetS();
			var id = $("#adjType").val();
			if (voucherDetS) {
				postJSON('/OrderExecution/api/v1/getLocationCodesForSearch',JSON.stringify(voucherDetS), function(data) {
				$.each(data.payload.locationCodes, function(key,val) {
				  $('#locCode').append('<option value="' + val.id + '">' + val.name + '</option>');
				});
             });
		   }
	   });

// Search grid started
function adjVoucherGrid1() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'id',
		'type' : 'long'
	}, {
		'name' : 'adjustmentDate',
		'type' : 'date'
	}, {
		'name' : 'metalSegment',
		'map' : 'metalSegment>description',
		'type' : 'String'
	}, {
		'name' : 'adjustmentType',
		'map' : 'adjustmentType>id',
		'type' : 'String'
	}, {
		'name' : 'location',
		'map' : 'locCode>name',
		'type' : 'string'
	}, {
		'name' : 'debitOrCreditType',
		'map' : 'debitOrCreditType>id',
		'type' : 'string'
	}, {
		'name' : 'voucherPurity',
		'type' : 'long'
	}, {
		'name' : 'grossWeight',
		'type' : 'string'
	}, {
		'name' : 'materialType',
		'type' : 'string',
		'map' : 'materialType>name'
	}, {
		'name' : 'vendor',
		'type' : 'string',
		'map' : 'vendor>venSearchAndName'
	}, {
		'name' : 'netWeight',
		'type' : 'long'
	}, {
		'name' : 'pureWeight',
		'type' : 'String'
	}, {
		'name' : 'remarks',
		'type' : 'String'
	}, {
		'name' : 'storeOrDc',
		'map' : 'storeDcDTO>name',
		'type' : 'String'
	}, {
		'name' : 'adjustmentPosted',
		'type' : 'String'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'id'
	} ];

	var columns = [ {
		'text' : 'MDV No',
		'datafield' : 'id',
		'width' : '3.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'MDV Dt',
		'datafield' : 'adjustmentDate',
		'width' : '6%',
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'MDV Metal Type',
		'datafield' : 'metalSegment',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'MDV Type',
		'datafield' : 'adjustmentType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'MDV Loc',
		'datafield' : 'location',
		'width' : '9%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'MDV Debit/Cr. Flag',
		'datafield' : 'debitOrCreditType',
		'width' : '8%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'MDV skin Purity',
		'datafield' : 'voucherPurity',
		'width' : '5.5%',
		sortable : false,
		cellsformat :'d2',
		editable : false,
		cellsalign : 'right',
		align : 'center'
	}, {
		text : 'MDV Gross Wt',
		datafield : 'grossWeight',
		editable : false,
		cellsformat :'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		'width' : '6%'
	}, {
		text : 'MDV Net Wt',
		datafield : 'netWeight',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '5%'
	}, {
		text : 'MDV Pure Wt',
		datafield : 'pureWeight',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '5%'
	}, {
		text : 'MDV Remarks',
		datafield : 'remarks',
		editable : false,
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		'width' : '6%'
	}, {
		'text' : 'RM/FG',
		'datafield' : 'materialType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendor',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false,
		initeditor : function(row) {
			var rows = $("#jqxgrid").jqxGrid('getrows');
			if(rows[row].adjustmentType == "External"){
				$("#jqxgrid").jqxGrid('showcolumn', 'vendor');
			}else if(rows[row].adjustmentType == "Internal"){
				$("#jqxgrid").jqxGrid('hidecolumn', 'vendor');

			}
		}
	}, {
		text : 'Store/DC Name',
		datafield : 'storeOrDc',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '8%'
	}, {
		text : 'Posting Status',
		datafield : 'adjustmentPosted',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Action',
		datafield : 'actionId',
		cellsrenderer : editAdjVoucher,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '6%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/adjustVouchSearch", "list",columns, adjustmentVoucherFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		 autorowheight :true,
         autoheight :true,
         columnsheight: 70,
		 rowdetails : true,
		 virtualmode : true,
	});
}

$("#adjType").on('change', function(){
	var adjType = $(this).val();
	if(adjType == "External"){
		$("#jqxgrid").jqxGrid('showcolumn', 'vendor');
	}else if(adjType == "Internal"){
		$("#jqxgrid").jqxGrid('hidecolumn', 'vendor');
	}
});

$("#adjusTypeC").on('change', function(){
	var adjType = $("#adjusTypeC").val();
	if(adjType == "External"){
		$('#storeDc').val('');

		onLoadlocationDet();
	}else if(adjType == "Internal"){
		$('#storeDc').val('');
		onLoadlocationDet();
	}
});


$("#metalTypeC").on('change', function(){
	var adjType = $("#adjusTypeC").val();
	if(adjType == "External"){
		$('#storeDc').val('');
		onLoadlocationDet();
	}else if(adjType == "Internal"){
		$('#storeDc').val('');
		onLoadlocationDet();
	}
});


$("#rmfg").on('change', function(){
	var adjType = $("#adjusTypeC").val();
	if(adjType == "External"){
		$('#storeDc').val('');
		onLoadlocationDet();
	}else if(adjType == "Internal"){
		$('#storeDc').val('');
		onLoadlocationDet();
	}
});


$("#vendorCodeC").on('change', function(){
	var adjType = $("#adjusTypeC").val();
	if(adjType == "External"){
		$('#storeDc').val('');
		onLoadlocationDet();
	}else if(adjType == "Internal"){
		$('#storeDc').val('');
		onLoadlocationDet();
	}
});



function validateNumberS(val) {
	var regex = /^\d{0,6}(\.\d{0,3})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(3);
	}
	return '';
}

$('#search').on('click', function() {
	adjVoucherGrid1();
	$("#jqxgrid").show();
});


//Export function for Adjustment Voucher
$("#export").on("click",function() {
		var data;
		var adjustmentFromDate = $("#fromDate").val();
		var adjustmentToDate = $("#toDate").val();
		var metalType = $("#metalType").val();
		var adjustmentType = $("#adjType").val();
		var locationCode = $("#locCode").val();
		var vendorCode = ($("#vendorCode").val() == "")? null: $("#vendorCode-value").val();
		var storeDcNameS = $("#storeDcNameS").val();
		var storeOrDc = $("#storeOrDc").val();
					
				fieldFilters = {
					"fieldFilters" : {}
				};

					if (adjustmentFromDate != "" && adjustmentFromDate != null) {
						fieldFilters.fieldFilters["fromDate"] = adjustmentFromDate;
					}
					if (adjustmentToDate != "" && adjustmentToDate != null) {
						fieldFilters.fieldFilters["toDate"] = adjustmentToDate;
					}
					if (metalType != "" && metalType != null) {
						fieldFilters.fieldFilters["metalSegId"] = metalType;
					}
					if (adjustmentType != "" && adjustmentType != null) {
						fieldFilters.fieldFilters["adjustType"] = adjustmentType;
					}
					if (locationCode != "" && locationCode != null) {
						fieldFilters.fieldFilters["locCode"] = locationCode;
					}
					if (vendorCode != "" && vendorCode != null) {
						fieldFilters.fieldFilters["vendor"] = vendorCode;
					}
					if (storeOrDc == "dc") {
						fieldFilters.fieldFilters["DC"] = storeDcNameS;
					}
					if (storeOrDc == "store") {
						fieldFilters.fieldFilters["Store"] = storeDcNameS;
					}

					var sysdate = moment().format('DDMMYYYYHHmmSS');
					var rows = $('#jqxgrid').jqxGrid('getrows');
					if (  rows == undefined || rows == 0 ) {
						$.growl
						.error({
							message : "No Data To Export",
							duration : 10000
						});
						return false;
					}else{
						var rows = $("#jqxgrid").jqxGrid('getdatainformation');
						if(rows.rowscount != 0){
							var newData = [];					
					postJSON('/OrderExecution/api/v1/adjustVouchExport',JSON.stringify(fieldFilters),function(response) {
						data = response.payload.list;
							for (i = 0; i < data.length; i++) {
								newData.push({	
									'Adjustment No' : (data[i].id != null) ? data[i].id : "",
									'Adjustment Date' : (data[i].adjustmentDate != null) ? data[i].adjustmentDate : "",
									'Adjustment Metal Type' : (data[i].metalSegment != null) ? data[i].metalSegment.description : "",
									'Adjustment Type' : (data[i].adjustmentType != null) ? data[i].adjustmentType.id : "",
									'RM/FG' : (data[i].materialType != null) ? data[i].materialType.id : "",
									'Manually/System Generated' : (data[i].isManual != null) ? data[i].isManual : "",
									'Vendor Code' : (data[i].vendor != null) ? data[i].vendor.venSearchAndName : "",
									'Adjustment Location' : (data[i].locCode != null) ? data[i].locCode.name : "",
									'Adjustment Debit/Credit Flag' : (data[i].debitOrCreditType != null) ? data[i].debitOrCreditType.id : "",
									'Adjustment Skin Purity' : (data[i].voucherPurity != null) ? data[i].voucherPurity : "",
									'Adjustment Wt.(Gross Wt in gms)' : (data[i].grossWeight != null) ?data[i].grossWeight	: "",
									'Adjustment Wt.(Net Wt in gms)' : (data[i].netWeight != null) ?data[i].netWeight : "",
									'Adjustment Wt.(Pure Wt in gms)' : (data[i].pureWeight != null) ?data[i].pureWeight : "",
									'Authorized By' : (data[i].authorizedBy != null) ? data[i].authorizedBy.name : "",
									'Authorized Date' : (data[i].authorizedDate != null) ? data[i].authorizedDate : "",
									'Adjustment Remarks' : (data[i].remarks != null) ? data[i].remarks : "",
									'Store/DC Name' : (data[i].storeDcDTO != null) ? data[i].storeDcDTO.name : ""
								});
							}
							 var opts = [{sheetid:'Adjustment_Voucher',header:true}];
		                     var res = alasql('SELECT * INTO XLSX("Adjustment Voucher_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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



// Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('adjustmentVoucher', 'bodySwitcher')"
});


$("#saveAdjVoucher").on(
		'click',
		function() {
			var adjType = $("#adjusTypeC").val();
			var grossWt = $("#grossWt").val();
			var netWt = $("#netWt").val();
			var pureWt = $("#pureWt").val();
			var vendorCode = $("#vendorCodeC")
			
			
			if (adjType == "" || adjType == null){					
				$.growl.error({
					message :"Please Select the Adjustment Type",
					duration : 10000,

				});
					return false;
			if(adjType=="External"){
				if(vendorCode== "" || vendorCode ==null){
					$.growl.error({
						message :"Please Select the Vendor Code ",
						duration : 10000,
					});						
					return false;
		}	
			}			
		}	
			
						
				
			if (grossWt == "" && netWt == "" && pureWt == "") {			
				$.growl.error({
					message : "Please fill atleast one Field either Gross Wt ,Net Wt , Pure Wt !!",
					duration :  1000,
					title :'error'
				});
				return false
			}
			/*else
				{
				$.growl.error({
					message :"Please fill atleast one Field either Net Wt ,Gross Wt or Pure Wt  ",
					duration : 10000,

				});
					return false;
				}*/
		
		});


	$("#editAdjvoucherE").on("click", function() {
	var grossWtE = $("#grossWtE").val();
	var netWtE = $("#netWtE").val();
	var pureWtE = $("#pureWtE").val();
	if (grossWtE != "" || netWtE != "" || pureWtE != "" ) {				
	}
	else
	{
	$.growl.error({
		message :"Please fill atleast one Field either Net Wt ,Gross Wt or Pure Wt  ",
		duration : 10000,
	});
		return false;
	}
	});

$("#storeDcNameS").on('change',function(){
	if($("#adjType").val() == "Internal"){
		$('#locCode').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getLocationCodesForSearch',JSON.stringify(locationDetS()), function(data) {
			$.each(data.payload.locationCodes, function(key,val) {
			  $('#locCode').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
         });
	}
});

$("#metalType").on('change',function(){
	if($("#adjType").val() == "Internal"){
		$('#locCode').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getLocationCodesForSearch',JSON.stringify(locationDetS()), function(data) {
			$.each(data.payload.locationCodes, function(key,val) {
			  $('#locCode').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
         });
	}
});

$("#vendorCode").on('change',function(){
		var voucherDet = {
			"fieldFilters" : {
				"adjustType" : $("#adjType").val(),
				"metalSegId" : $("#metalType").val(),
				"storeOrDcType" : $("#storeOrDc").val(),
				"storeDcId" : $("#storeDcNameS").val(),
				"vendorId" : ($("#vendorCode").val() == "")? null: $("#vendorCode-value").val() 
			}
		}
		if($("#adjType").val() == "External"){
		$('#locCode').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getLocationCodesForSearch',JSON.stringify(voucherDet), function(data) {
			$.each(data.payload.locationCodes, function(key,val) {
			  $('#locCode').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
         });
	}
})

$('#createAdjusVouchr').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});

$('#btnEditAdjVouch').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});
