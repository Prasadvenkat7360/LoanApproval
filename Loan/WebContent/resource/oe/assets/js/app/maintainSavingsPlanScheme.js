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

//API call for Zone Type append to the drop down
$.getJSON('/OrderExecution/api/v1/savingPlanBusinessLOV', function(data) {
	$('#business').empty().append('<option value="" selected>--Select--</option>');
	$('#businessC').empty().append('<option value="" selected>--Select--</option>');

	$.each(data.payload.blist, function(key, val) {
		$('#business').append('<option value="' + val.id + '">' + val.name + '</option>');
		$('#businessC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});

$("#business").on('change',function(){
	var id = $("#business").val();
	$('#region').empty().append('<option value="" selected>--Select--</option>');
	 if(id != ""){
	$.getJSON('/OrderExecution/api/v1/savingPlanBusinessLOV?BUSINESS_ID='+id ,function(data) {
		$.each(data.payload.regions, function(key, val) {
			$('#region').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
	});	
  }
});

$("#businessC").on('change',function(){
	var id = $("#businessC").val();
	$('#regionC').empty().append('<option value="" selected>--Select--</option>');
	 if(id != ""){
	$.getJSON('/OrderExecution/api/v1/savingPlanBusinessLOV?BUSINESS_ID='+id ,function(data) {
		$.each(data.payload.regions, function(key, val) {
			$('#regionC').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
	});	
  }
});

function validateNumber(val) {
	var regex = /^\d{0,2}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

// Saving Plan Search listing filed Filter
var savingsPlanFieldFiltersVal = function() {
	var business = $("#business").val();
	var region = $("#region").val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (business != "" && business != null) {
		fieldFilters.fieldFilters["business"] = business;
	}
	if (region != "" && region != null) {
		fieldFilters.fieldFilters["region"] = region;
	}
	return fieldFilters;
}

// In grid view last column belong to action
function savingsPlanSchemeGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}
	
	var status = [{
		"id" : true,
		"name" : "Active"
	},{
		"id" : false,
		"name" : "In-Active"
	}]
	var statusSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : status
		};
	var statusSourceAdapter = new $.jqx.dataAdapter( statusSource, {
		autoBind : true
	});
	
	var datafields = [ {
		'name' : 'business',
		'type' : 'int',
		'map' : 'business>name'
	},{
		'name' : 'region',
		'type' : 'int',
		'map' : 'region>name'
	},{
		'name' : 'schemeId',
		'type' : 'long',
		'map' : 'id'
	}, {
		'name' : 'name',
		'type' : 'string'
	}, {
		'name' : 'duration',
		'type' : 'string'
	}, {
		'name' : 'amount',
		'type' : 'string'
	}, {
		'name' : 'benefitRatePercentage',
		'type' : 'float'
	}, {
		'name' : 'bonusRatePercentage',
		'type' : 'float'
	}, {
		'name' : 'createdOn',
		'type' : 'date'
	}, {
		'name' : 'createdBy',
		'type' : 'string'
	}, {
		'name' : 'active',
		'type' : 'string',
	}, {
		'name' : 'id',
		'type' : 'int'
	} ];

	var columns = [ {
		'text' : 'Business',
		'datafield' : 'business',
		'width' : '10%',
		sortable : true,
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Region',
		'datafield' : 'region',
		'width' : '7%',
		sortable : true,
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Scheme Id',
		'datafield' : 'schemeId',
		'width' : '7%',
		sortable : true,
		editable : false,
		cellsalign: 'center',
		align:'center'
	},{
		'text' : ' Scheme Name',
		'datafield' : 'name',
		'width' : '12%',
		sortable : true,
		editable : false,
		cellsalign: 'left',
		align:'center'
	}, {
		'text' : ' Scheme Duration',
		'datafield' : 'duration',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign: 'left',
		align:'center'
	}, {
		'text' : ' Scheme Amnt',
		'datafield' : 'amount',
		'width' : '11%',
		sortable : false,
		editable : false,
		cellsalign: 'right',
		align:'center',
		cellsformat: 'd2'
	}, {
		'text' : 'Benefit Rate %',
		'datafield' : 'benefitRatePercentage',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign: 'right',
		align:'center',
		cellsformat: 'd2'
	}, {
		'text' : 'Bonus Rate %',
		'datafield' : 'bonusRatePercentage',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign: 'right',
		align:'center',
		cellsformat: 'd2'
	}, {
		'text' : 'Created On',
		'datafield' : 'createdOn',
		'width' : '10%',
		columntype : 'datetimeinput',
		cellsformat : 'dd/MM/yyyy',
		sortable : true,
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Created By',
		'datafield' : 'createdBy',
		'width' : '10%',
		cellsalign : 'center',
		sortable : true,
		editable : false,
		cellsalign: 'center',
		align:'center'
	
	}, {
		text : '',
		datafield : 'id',
		cellsrenderer : editSavings,
		editable : false,
		sortable : false,
		'width' : '3%',
		 filterable: false,
		cellsalign: 'center',
		align:'center'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/SearchSavingsplan", "list",columns, savingsPlanFieldFiltersVal(), updateRows, "");
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

// Validate Field for Creation of Savings Plan

var validateNumber = function(val) {
	console.log(val);
	var regex = /^\d{0,2}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

var saveSavingsPlan = function() {

	// Create object
	var savingsPlan = {
		"bussinessId" : $('#businessC').val(),
		"region":{
			"id":$('#regionC').val(),
		},
		"duration" : $('#schemeDur').val(),
		"name" : $('#schemeName').val(),
		"amount" : $('#SchemeAcc').val(),
		"bonusRatePercentage" : $('#bonusRate').val(),
		"benefitRatePercentage" : $('#benefitRate').val()
	}
	return savingsPlan;
}

// Create and save savingsPlanSCheme
$('#createSavingsPlanC').validate({
       errorElement: 'label', 
       errorClass: 'help-inline', 
       focusInvalid: false, 
       ignore: "",
       rules: {
       	"businessC": { required: true },
       	"regionC": { required: true },
        "schemeDur": { required: true},
        "schemeName" : { required: true,regx : /^[a-zA-Z\s]+$/},
        "SchemeAcc" : { required: true},
        "bonusRate" : { required: true},
        "benefitRate" : { required: true}
       },messages : {
			"schemeName" : {
				regx : "Only character with space!"
			},
       } ,    
       submitHandler: function (form) { 
    	   trimmer();
			var savingsPlan = saveSavingsPlan();
			if (savingsPlan) {
				postJSON('/OrderExecution/api/v1/createSavingsPlan', JSON.stringify(savingsPlan), function(data) {
					if (data.resCode == "1") {
						$.growl.notice({
							message : data.mesgStr,
							duration : 10000,
							title : 'Success'
						});
						$('#createSavingsPlanScheme').modal('hide');
						savingsPlanSchemeGrid();
					} else {
						$.growl.error({
							message : data.mesgStr,
							duration : 10000,
							title : 'Error'
						});
					}
				});
			}
    	   return false;
       }
   });

var editSavings = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#MaintainSavingsPlan"  type="button" id='
			+ value
			+ ' onclick="editSavingsPlan('
			+ value
			+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
	}
}
var saveDet = function() {

	var editSavingsDet = {
		"id" : $('#schemeIdE').val(),
		"duration" : $('#schemeDurE').val(),
		"benefitRatePercentage" : $('#benefitRateE').val(),
		"bonusRatePercentage" : $('#bonusRateE').val(),
		"status" : $("#statusE").val()
	}
	return editSavingsDet;
}

// Common Code Started

// For date format
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

// Edit metal accounting location details
var editSavingsPlan = function(id) {

	$.getJSON('/OrderExecution/api/v1/getSavingPlanSchema?id=' + id, function(
			data) {
		$('#popupheaderlabel').text('Edit Savings Plan Scheme');

		var rows = data.payload.sPlanSchema;
		$("#schemeIdE").val(rows.id);
		$("#schemeNameE").val(rows.name);
		$("#schemeDurE").val(rows.duration);
		$("#SchemeAccE").val(rows.amount);
		$("#bonusRateE").val(rows.bonusRatePercentage);
		$("#benefitRateE").val(rows.benefitRatePercentage);
		$("#createdByE").val(rows.createdBy);
		var dateVal = $.date(rows.createdDate); 
		$("#createdOnE").val(dateVal);
		$("#statusE").val(rows.active);
	});
}

$('#editSavingsPlan').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"schemeIdE": { required: true },
        "schemeDurE": { required: true},
        "schemeNameE" : { required: true},
        "SchemeAccE" : { required: true},
        "bonusRateE" : { required: true},
        "benefitRateE" : { required: true}
    },
    submitHandler: function (form) { 
    	trimmer();
    	var SavingsPlanDetailEdit = saveDet();
		if (SavingsPlanDetailEdit) {
			postJSON('/OrderExecution/api/v1/savingPlanUpdate', JSON.stringify(SavingsPlanDetailEdit), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : "Savings Plan Updated Successfully",
						duration : 10000,
						title : 'Success'
					});
					$('#createSavingsPlanScheme').on('hidden.bs.modal',function() {
								$(this).find('form').trigger('reset');
							});
					$('#MaintainSavingsPlan').modal('hide');
					savingsPlanSchemeGrid();

				} else {
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

// On click on search button it will load grid
$("#search").on('click', function() {
	$form = $('#SavingPlanSearch');
    $form.validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	"business": {
                required: true
            }
        }
    });

    if ($form.valid()) {
    	savingsPlanSchemeGrid();
    	$("#jqxgrid").show();
    } else {
    	 return false;
    }
    return false;
});

// Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

$('#createSavingsScheme').on('click', function() {
	$("form").trigger("reset");
});

$('#createSavingsPlanScheme').on('hidden.bs.modal', function() {
	$("form").trigger("reset");
});


//######## Validation Started########################
// Create
$('#SchemeAcc').on('keypress',function(event) {
			if (event.keyCode != 188 && event.keyCode != 8
					&& event.keyCode != 46 ) {
				var regex = new RegExp("^[-,0-9]+$");
				var key = String.fromCharCode(!event.charCode ? event.which: event.charCode);
				if (!regex.test(key)) {
					event.preventDefault();
					return false;
				}
			}
		}); 

$('#schemeDur').on('keypress',function(event) {
			if (event.keyCode != 188 && event.keyCode != 8
					&& event.keyCode != 46 ) {
				var regex = new RegExp("^[-,0-9]+$");
				var key = String.fromCharCode(!event.charCode ? event.which
						: event.charCode);
				if (!regex.test(key)) {
					event.preventDefault();
					return false;
				}
			}
		}); 

// Edit
$('#SchemeAccE').on('keypress',
		function(event) {
			if (event.keyCode != 188 && event.keyCode != 8
					&& event.keyCode != 46 ) {
				var regex = new RegExp("^[-,0-9]+$");
				var key = String.fromCharCode(!event.charCode ? event.which
						: event.charCode);
				if (!regex.test(key)) {
					event.preventDefault();
					return false;
				}
			}
		}); 

$('#schemeDurE').on('keypress',
		function(event) {
			if (event.keyCode != 188 && event.keyCode != 8
					&& event.keyCode != 46 ) {
				var regex = new RegExp("^[-,0-9]+$");
				var key = String.fromCharCode(!event.charCode ? event.which
						: event.charCode);
				if (!regex.test(key)) {
					event.preventDefault();
					return false;
				}
			}
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

$('.modal').on('hidden.bs.modal', function () {
	 $("form").each(function(){
		 $(this).validate();
	      $(this).validate().resetForm();
    });
	 $("form").trigger("reset");
});