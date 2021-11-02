activaTab('tab0default');
$("#issueLoyaltyCardSection").hide();
$("#tab1default").hide();
$("#generateLoyaltyWc").hide();
$("#wcHead").hide();
$("#newCustomer").on('click',function(){
	$("#tab0default").hide();
	$("#tab1default").show();
	$("#panelC").slideDown();
 });

$("#home").on('click',function(){
	$("#tab0default").show();
	$("#tab1default").hide();
});

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};

$("#noOfChildrens").on('click',function(){
	//$("#jqxgridT").jqxGrid('addrow', null, generaterow(rowId + 1));

	$("#childNameC").val("");
	$("#childDobC").val("");
	$("#childGenderC").val("");
	$("#childMobileNoC").val("");
});

var editFlag = false;
$("#noOfChildrensE").on('click',function(){
	var childDetE = $('#jqxgridE').jqxGrid('getrows');
	console.log($("#loyaltyFlag").val());
	
	//if($("#loyaltyFlag").val() == "false"){
		$("#jqxgridE").jqxGrid('addrow', null, generaterow(rowId + 1));
	//}
	
});

$(".tabDisabledS").addClass("tabDisabled2");
$("#addtionalDetails").hide();
$("#editSection").hide();
$("#editHead").hide();
$("#back").hide();
$("#toggle").on('click',function(){
	$("#panel1").slideToggle();
});
$("#toggleE").on('click',function(){
	$("#panelE").slideToggle();
});

$("#spouseDobC").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	yearRange: '1900:+100',
});

$("#anniversaryDateC").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	yearRange: '1900:+100',
});

$("#custDobC").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	yearRange: '1900:+100',
});

$("#childDobC").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	yearRange: '1900:+100',
});

$("#spouseDobE").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	yearRange: '1900:+100',
});

$("#anniversaryDateE").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	yearRange: '1900:+100',
});

$("#custDobE").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	yearRange: '1900:+100',
});

var intimationArr = [
    {"id": "SMS","name": "SMS"},
    {"id": "Mail","name": "Mail"},
    {"id": "Courier","name": "Courier"},
    {"id": "Postal","name": "Postal"},
    {"id": "Phone","name": "Phone"},
    {"id": "Whatsapp","name": "Whatsapp"}
    ]

var onloadFunction = function(){
	//api/v1/getOrderHeaderFieldValues?c=1
	var loyaltyTierArr = [];
	 $('#typeE').empty().append('<option value="" selected>--Select--</option>');
	 $('#titleE').empty().append('<option value="" selected>--Select--</option>');
	 $('#genderE').empty().append('<option value="" selected>--Select--</option>');
	 $('#countryE').empty().append('<option value="" selected>--Select--</option>');
	 $('#stateE').empty().append('<option value="" selected>--Select--</option>');
	 $('#cityE').empty().append('<option value="" selected>--Select--</option>');
	 
	 $('#titleLE').empty().append('<option value="" selected>--Select--</option>');
	 $('#genderLE').empty().append('<option value="" selected>--Select--</option>');
	 $('#loyaltyTierE').empty().append('<option value="" selected>--Select--</option>');
	 $('#intimationTypeE').empty().append('<option value="" selected>--Select--</option>');
	 
	 $.getJSON('/OrderExecution/api/v1/customerLOV',function(data) {
		 $('#typeC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.custoerTypes, function(key, val) {
			$('#typeC').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		
		 $('#titleC').empty().append('<option value="" selected>--Select--</option>');
		 $('#titleLC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.titleTypes, function(key, val) {
			$('#titleC').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#titleLC').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#titleLE').append('<option  value="' + val.id + '">' + val.name + '</option>');
		});
			
		 $('#genderC').empty().append('<option value="" selected>--Select--</option>');
		 $('#childGenderC').empty().append('<option value="" selected>--Select--</option>');
		 $('#genderLC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.genderTypes, function(key, val) {
			$('#genderC').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#genderLC').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#childGenderC').append('<option value="' + val.id + '">' + val.name + '</option>');
			 $('#genderLE').append('<option  value="' + val.id + '">' + val.name + '</option>');

		});
		 
		 $('#countryC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.countryList, function(key, val) {
			$('#countryC').append('<option value="' + val.id + '" idC = '+ val.name +'>' + val.description + '</option>');
		});
		
		if(globalEditResp){
			 $('#typeE').empty().append('<option value="" selected>--Select--</option>');
			 $('#titleE').empty().append('<option value="" selected>--Select--</option>');
			 $('#genderE').empty().append('<option value="" selected>--Select--</option>');
			 $('#countryE').empty().append('<option value="" selected>--Select--</option>');
			 $('#stateE').empty().append('<option value="" selected>--Select--</option>');
			 $('#cityE').empty().append('<option value="" selected>--Select--</option>');
			 
			 $('#titleLE').empty().append('<option value="" selected>--Select--</option>');
			 $('#genderLE').empty().append('<option value="" selected>--Select--</option>');


			$.each(data.payload.custoerTypes, function(k, v) {
				if(globalEditResp.customerType == v.id){
					$('#typeE').append('<option selected value="' + v.id + '">' + v.name + '</option>');

				}else{
					$('#typeE').append('<option value="' + v.id + '">' + v.name + '</option>');

				}
			});
			
			$.each(data.payload.titleTypes, function(k, v) {
				if(globalEditResp.customerTitle == v.id){
					$('#titleE').append('<option selected value="' + v.id + '">' + v.name + '</option>');
				}else{
					$('#titleE').append('<option value="' + v.id + '">' + v.name + '</option>');
				}
			});
			
			$.each(data.payload.genderTypes, function(k, v) {
				if(globalEditResp.customerSexType == v.id){
					$('#genderE').append('<option selected value="' + v.id + '">' + v.name + '</option>');
				}else{
					$('#genderE').append('<option value="' + v.id + '">' + v.name + '</option>');
				}
			});
			
			
			$.each(data.payload.titleTypes, function(k, v) {
				if(globalEditResp.loyalCustomerDetails){
					if(globalEditResp.loyalCustomerDetails.title != null ){
						if( globalEditResp.loyalCustomerDetails.title == v.id){
							$('#titleLE').append('<option selected value="' + v.id + '">' + v.name + '</option>');

						}else{
							$('#titleLE').append('<option  value="' + v.id + '">' + v.name + '</option>');
						}
					}
					else{
						$('#titleLE').append('<option  value="' + v.id + '">' + v.name + '</option>');
					}
				}
				else{
					$('#titleLE').append('<option  value="' + v.id + '">' + v.name + '</option>');
				}
			});
			
			
			$.each(data.payload.genderTypes, function(k, v) {
				if(globalEditResp.loyalCustomerDetails){
				 if(globalEditResp.loyalCustomerDetails.spouseGender != null){
					if(globalEditResp.loyalCustomerDetails.spouseGender == v.id){
						$('#genderLE').append('<option selected value="' + v.id + '">' + v.name + '</option>');
					}else{
						$('#genderLE').append('<option  value="' + v.id + '">' + v.name + '</option>');
					}
				  }else{
						$('#genderLE').append('<option  value="' + v.id + '">' + v.name + '</option>');
					}
			   }
				else{
					$('#genderLE').append('<option  value="' + v.id + '">' + v.name + '</option>');
				}
			});
			
			
			$.each(data.payload.countryList, function(key, val) {
				if(globalEditResp.address.country.id == val.id){
					$('#countryE').append('<option selected value="' + val.id + '" idR = '+ val.name +'>' + val.description + '</option>');
				}else{
					$('#countryE').append('<option value="' + val.id + '" idR = '+ val.name +'>' + val.description + '</option>');
				}
			});
			
			$.getJSON('/OrderExecution/api/v1/getStateByCountry?countryId='+globalEditResp.address.country.id,function(data) {
					$.each(data.payload.states, function(key, val) {
						if(globalEditResp.address.state.id == val.id){
							$('#stateE').append('<option selected value="' + val.id + '" idA = '+ val.name +'>' + val.description + '</option>');
						}else{
							$('#stateE').append('<option value="' + val.id + '" idA = '+ val.name +'>' + val.description + '</option>');
						}
				});
			 });
			
			$.getJSON('/OrderExecution/api/v1/getCityByState?stateId='+globalEditResp.address.state.id,function(data) {
				$.each(data.payload.cities, function(key, val) {
					if(globalEditResp.address.city.id == val.id){
						$('#cityE').append('<option selected value="' + val.id + '" idF = '+ val.name +'>' + val.description + '</option>');
					}else{
						$('#cityE').append('<option value="' + val.id + '" idF = '+ val.name +'>' + val.description + '</option>');
					}
			});
		 });
		
		 $.each(intimationArr, function(k, v) {
		  if(globalEditResp.loyalCustomerDetails){
			if(globalEditResp.loyalCustomerDetails.intimationType != null){
				if(globalEditResp.loyalCustomerDetails.intimationType == v.id){
					$('#intimationTypeE').append('<option selected value="' + v.id + '">' + v.name + '</option>');
				}else{
					$('#intimationTypeE').append('<option value="' + v.id + '">' + v.name + '</option>');
				}
			}else{
				$('#intimationTypeE').append('<option value="' + v.id + '">' + v.name + '</option>');
			}
		  }else{
			  $('#intimationTypeE').append('<option value="' + v.id + '">' + v.name + '</option>');
		  }
		});
		}
	});

	 $.getJSON('/OrderExecution/api/v1/getLoyaltyTierLOV', function(data) {
			$('#loyaltyTierC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.TierNames, function(k, v) {
				$('#loyaltyTierC').append('<option  value="' + v.tierNo + '">' + v.name + '</option>');
			});
			
			
			$('#loyaltyTierE').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.TierNames, function(k, v) {
				if(globalEditResp.loyalCustomerDetails){
					 if(globalEditResp.loyalCustomerDetails.loyaltyTier != null){
						if(globalEditResp.loyalCustomerDetails.loyaltyTier == v.name){
							$('#loyaltyTierE').append('<option selected value="' + v.tierNo + '">' + v.name + '</option>');
						}else{
							$('#loyaltyTierE').append('<option  value="' + v.tierNo + '">' + v.name + '</option>');
						}
					  }else{
							$('#loyaltyTierE').append('<option  value="' + v.tierNo + '">' + v.name + '</option>');
						}
				   }
				  else{
					$('#loyaltyTierE').append('<option  value="' + v.tierNo + '">' + v.name + '</option>');
				  }
			});
		});
}

onloadFunction();

$("#countryC").on('change',function(){
	 $.getJSON('/OrderExecution/api/v1/getStateByCountry?countryId='+$("#countryC").val(),function(data) {
		 $('#stateC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.states, function(key, val) {
			$('#stateC').append('<option value="' + val.id + '" idS = '+ val.name +'>' + val.description + '</option>');
		});
	 });
});

$("#stateC").on('change',function(){
	 $.getJSON('/OrderExecution/api/v1/getCityByState?stateId='+$("#stateC").val(),function(data) {
		 $('#cityC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.cities, function(key, val) {
			$('#cityC').append('<option value="' + val.id + '" idT = '+ val.name +'>' + val.description + '</option>');
		});
	 });
});

$("#countryE").on('change',function(){
	 $.getJSON('/OrderExecution/api/v1/getStateByCountry?countryId='+$("#countryE").val(),function(data) {
		 $('#stateE').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.states, function(key, val) {
			$('#stateE').append('<option value="' + val.id + '" idS = '+ val.name +'>' + val.description + '</option>');
		});
	 });
});

$("#stateE").on('change',function(){
	 $.getJSON('/OrderExecution/api/v1/getCityByState?stateId='+$("#stateE").val(),function(data) {
		 $('#cityE').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.cities, function(key, val) {
			$('#cityE').append('<option value="' + val.id + '" idT = '+ val.name +'>' + val.description + '</option>');
		});
	 });
});


var customerFieldFilters = function() {
	var customerIdS = $('#customerIdS').val();
	var custNameS = $('#custNameS').val();
	var contactNoS = $('#contactNoS').val();
	var loyaltyIdS = $('#loyaltyIdS').val();

	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (customerIdS != "" && customerIdS != null) {
		fieldFilters.fieldFilters["id"] = customerIdS;
	}
	if (custNameS != "" && custNameS != null) {
		fieldFilters.fieldFilters["firstName"] = custNameS;
	}
	if (contactNoS != "" && contactNoS != null) {
		fieldFilters.fieldFilters["mobileOne"] = contactNoS;
	}
	if (loyaltyIdS != "" && loyaltyIdS != null) {
		fieldFilters.fieldFilters["loyaltyCard"] = loyaltyIdS;
	}
	
	return fieldFilters;
}

function customerSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'id','type' : 'long','map' : 'id'},
		{'name' : 'firstName','type' : 'string'},
		{'name' : 'middleName','type' : 'string'}, 
		{'name' : 'lastName','type' : 'string'}, 

		{'name' : 'loyaltyCard','type' : 'string','map' : 'loyalCustomer>loyaltyCardNumber'},
		{'name' : 'mobileOne','type' : 'string'},
		{'name' : 'mobileTwo','type' : 'string'},
		{'name' : 'mobileThree','type' : 'string'},

		{'name' : 'email','type' : 'string'},
		{'name' : 'address','type' : 'string','map' : 'address>address1'}, 
		{'name' : 'address1','type' : 'string','map' : 'address>address2'}, 
		{'name' : 'address2','type' : 'string','map' : 'address>address3'}, 
		{'name' : 'city','type' : 'string','map' : 'address>city>name'}, 
		{'name' : 'zipCode','type' : 'string','map' : 'address>zipCode'}, 
		{'name' : 'state','type' : 'string','map' : 'address>state>name'},
		{'name' : 'homePhone','type' : 'string'},
		{'name' : 'actionId','type' : 'int','map' : 'id'},
		{'name' : 'loyaltyPoints','type' : 'long'},
		{'name':'issue','type':'int','map':'id'},
		{'name':'wcLetter','type':'int','map':'id'}

	];

	var columns = [
		{'text' : 'ID','datafield' : 'id','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Customer Name','datafield' : 'firstName','width' : '12%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
				var middleName =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'middleName');
				var lastName =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'lastName');
				var fullName = "";
				
				if(middleName != null && middleName != undefined){
					 fullName = value + " " + middleName + " " + lastName ; 
				}else{
					 fullName = value + " " + lastName ;
				}
				
				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">'+ fullName +'</div>';
    		 }
		},
		{'text' : 'Loyalty Card','datafield' : 'loyaltyCard','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Loyalty Points','datafield' : 'loyaltyPoints','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Contact Number','datafield' : 'mobileOne','width' : '10%',sortable : false,cellsalign : 'center',align : 'center',   editable: false,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
				var homePhone =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'homePhone');
				var mobileTwo =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'mobileTwo');
				var mobileThree =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'mobileThree');

				var contactNo = value; 
				if(mobileTwo != undefined){
					contactNo = contactNo + " " + mobileTwo + ",";
				}
				if(mobileThree != undefined){
					contactNo = contactNo + " " + mobileThree + ","; 
				}
				if(homePhone != null && homePhone != undefined){
					 contactNo = contactNo + " " + homePhone ;  
				}else{
					 contactNo = contactNo ; 
				}
				
				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">'+ contactNo +'</div>';

    		 }
		},
		{'text' : 'Email','datafield' : 'email','width' : '18%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Address','datafield' : 'address','width' : '28%',sortable : false,cellsalign : 'left',align : 'center',
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
				var address= value;
				var address1 = jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'address1');
				var address2 = jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'address2');

				var city =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'city');
				var zCode =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'zipCode');
				var state = jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'state');
				
				if(address1 != undefined && address1 != null){
					 address = address + "," + address1 ;
				}
				if(address2 != undefined && address2 != null){
					 address = address + "," + address2 ;
				}
				if(city != undefined && city != null){
					 address = address + " " + city ;
				}
				if(zCode != undefined && zCode != null){
					address = address + "-" + zCode + ",";
				}
				if(state != undefined && state != null){
					address = address + " " + state;
				}
				
				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">'+ address +'</div>';

    		 }
		},
		{
			text : '',
			datafield : 'actionId',
			cellsrenderer : editLoyaltyCust,
			editable : false,
			cellsalign : 'center',
			align : 'center',
			filterable: false,
			sortable : false,
			'width' : '12%'
		},
		{
			text : '',
			datafield : 'issue',
			cellsrenderer : issueLoyaltyCard,
			editable : false,
			cellsalign : 'center',
			align : 'center',
			filterable: false,
			sortable : false,
			'width' : '13%'
		},
		{
			text : '',
			datafield : 'wcLetter',
			cellsrenderer : generateWcLetter,
			editable : false,
			cellsalign : 'center',
			align : 'center',
			filterable: false,
			sortable : false,
			'width' : '15%'
		},
		{'text' : '','datafield' : 'address1','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
		{'text' : '','datafield' : 'address2','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},

		{'text' : '','datafield' : 'middleName','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
		{'text' : '','datafield' : 'city','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
		{'text' : '','datafield' : 'zipCode','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
		{'text' : '','datafield' : 'state','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
		{'text' : '','datafield' : 'homePhone','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},

		{'text' : '','datafield' : 'mobileTwo','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
		{'text' : '','datafield' : 'mobileThree','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},

	];
	showMyGrid(datafields, "/OrderExecution/api/v1/customers?portal=OE","list",columns,customerFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 35,
		rowdetails : true,
		virtualmode : true,
	});
}

//####################### edit started ##################################33

$("#addtionalDetailsE").hide();
var editLoyaltyCust = function (row, columnfield, value, defaulthtml, columnproperties) {
    	return '<button class="btn btn-sm btn-primary"  type="button" style="margin-top: 20px; margin-left: 8px;" id='
    	+ row
    	+ ' onclick="editloyaltyCustomer('
    	+ value
    	+ ')" ><span class="fa fa-user fa-lg"></span> Customer Profile </button>';
    
}

var issueLoyaltyCard = function (row, columnfield, value, defaulthtml, columnproperties) {
	return '<button class="btn btn-sm btn-primary dropdown-toggle"  type="button" data-toggle="dropdown" style="margin-top: 20px; margin-left: 8px;" id='
	+ row
	+ ' onclick="issueLoyaltyCardDet('
	+ value
	+ ')" ><span class="fa fa-credit-card"></span> Issue Loyalty Card</button>';

}

var generateWcLetter = function (row, columnfield, value, defaulthtml, columnproperties) {
	return '<button class="btn btn-sm btn-primary dropdown-toggle"  type="button" data-toggle="dropdown" style="margin-top: 20px; margin-left: 8px;" id='
	+ row
	+ ' onclick="generateWcLet('
	+ value
	+ ')" ><span class="fa fa-share"></span> Generate Welcome Letter </button>';

}


$("#issueHead").hide();
$("#issueLoyaltyCardSection").hide();
var issueLoyaltyCardDet = function(id){
		
	$.getJSON('/OrderExecution/api/v1/LoyaltyCardLOV?c='+id,function(data) {
		if(data.resCode == 1){
			$("#issueLoyaltyCardSection").show();
			$("#createSection").hide();
			$("#editSection").hide();
			
			$("#createHead").hide();
			$("#editHead").hide();
			$("#issueHead").show();
			$("#gridTabs").hide();
			$("#enableDisable").hide();
			$("#back").show();
			
			var loyaltyCustDet = data.payload.loyaldetails;
			
			$("#customerIdI").val(id);
			$("#customerNameI").val(loyaltyCustDet.customerName);
			$("#loyaltyNumI").val(loyaltyCustDet.loyalCardNumber);
			$("#loyaltyCreatedDateI").val(loyaltyCustDet.loyalCreatedDate);
			$("#loyaltyEndDateI").val(loyaltyCustDet.loyalCardEndDate);
			$("#loyaltyCardIntimationI").val(loyaltyCustDet.intimation);
			$("#intimationModeI").val(loyaltyCustDet.intimationType);
			$("#loyaltyTierTypeI").val(loyaltyCustDet.loyaltyTier);
			
		}else{
			$("#issueLoyaltyCardSection").hide();
			$("#createSection").show();
			$("#editSection").hide();
			
			$("#createHead").show();
			$("#editHead").hide();
			$("#issueHead").hide();
			$("#gridTabs").show();
			$("#enableDisable").hide();
			$("#back").show();
			
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
}

$("#issueLoyaltyCard").on('click',function(){
	$("#issueLoyaltyCard").prop('disabled',true);
	$.getJSON('/OrderExecution/api/v1/createLoyaltyCard?c='+$("#customerIdI").val(),function(data) {
		if(data.resCode == 1){
			$("#issueLoyaltyCard").prop('disabled',true);
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		}else{
			$("#issueLoyaltyCard").prop('disabled',false);
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
});

var generateWcLet = function(id){
	
	console.log(id);
	$.getJSON('/OrderExecution/api/v1/validateLoyWelLetter?custId='+id,function(data) {
		if(data.resCode == 1){
			$("#createSection").hide();
			$("#editSection").hide();
			$("#issueLoyaltyCardSection").hide();
			$("#generateLoyaltyWc").show();
			$("#gridTabs").hide();
			$("#wcHead").show();
			$("#createHead").hide();
			
			$("#wcCustId").val(id);
		}else{
			$("#generateLoyaltyWc").hide();
			$("#wcHead").hide();
			
			$.growl.error({
				message : data.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
}

$("#sendWcletter").on('click',function(){
	if($("#modeC").val() == ""){
		$.growl.error({
			message : "Please Select Mode",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		if($("#modeC").val() == "Mail"){
			var sendParams = {"fieldFilters": {"CustomerID": $("#wcCustId").val(),"intMode": $("#modeC").val()}}
			postJSON('/OrderExecution/api/v1/sendEmailLoyCustWelLetter', JSON.stringify(sendParams), function(data){
				if(data.resCode == 1){
					$.growl.notice({
						message : data.mesgStr,
						duration : 1000,
						title : 'Success'
					});
					window.location.href="javascript:showContentPage('loyaltyCustSearch', 'bodySwitcher')"
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			});
		}else{
			postWelcomeLetter($("#wcCustId").val())
		}
	}
});

var postWelcomeLetter = function(custId){
	var fieldFilters = {
            "fieldFilters" : {
                "CustomerID" : $("#wcCustId").val(),
                "intMode":$("#modeC").val(),
            }
        }
	
	$.ajax({
		url : 'api/v1/sendPostalLoyCustWelLetter',
		type : 'post',
		data : fieldFilters,
		contentType : "application/x-www-form-urlencoded",
		xhrFields : {
			responseType : "arraybuffer"
		},
		success : function(data) {
			console.log(data);
			if (navigator.msSaveBlob) {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});   
				navigator.msSaveBlob(file, 'RPT_Post_Welcome_Letter.pdf');
				window.location.href="javascript:showContentPage('loyaltyCustSearch', 'bodySwitcher')"
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
				
				window.location.href="javascript:showContentPage('loyaltyCustSearch', 'bodySwitcher')"

			}
		}
	});
}

$("#clearAll").on('click',function(){
	$("#jqxgrid").hide();
});


$("#clearCardDet").on('click',function(){
	$("#issueLoyaltyCardSection").hide();
	$("#createSection").show();
	$("#editSection").hide();
	
	$("#createHead").show();
	$("#editHead").hide();
	$("#issueHead").hide();
	$("#gridTabs").show();
	$("#enableDisable").hide();
	$("#back").show();
});

var globalEditResp ;
var editloyaltyCustomer = function(id){
	$("#mobileFieldE").hide();
	$("#emailFieldE").hide();
	$("#pinCodeFieldE").hide();
	$("#lblPinCodeE").hide();
	
	$.getJSON('/OrderExecution/api/v1/getCustomerForEdit?c='+id,function(data) {
		if(data.resCode == 1){
			onloadFunction();
			
			$("#createSection").hide();
			$("#editSection").show();
			$("#issueLoyaltyCardSection").hide();
			$("#gridTabs").hide();
			$("#createHead").hide();
			$("#editHead").show();
			$("#back").show();
			
			/* $.getJSON('/OrderExecution/api/v1/getLoyaltyTierLOV', function(data) {
				$.each(data.payload.TierNames, function(key, val) {
					$('#loyaltyTierE').append('<option value="' + val.tierNo + '">' + val.name + '</option>');
				});
			});*/
			
			globalEditResp = {};
			var result = data.payload.Customer;
			globalEditResp = data.payload.Customer;
			
			if(result.loyalCustomerDetails != null){
				$("#loyaltyFlag").val(true);
			}else{
				$("#loyaltyFlag").val(false);
			}
			
			$("#custIdE").val(result.id);
			$("#address1E").val(result.address.address1);
			$("#address2E").val(result.address.address2);
			$("#address3E").val(result.address.address3);
			$("#panNoE").val(result.pancard);
			$("#mobile1E").val(result.mobileOne);
			$("#mobile2E").val(result.mobileTwo);
			$("#landLineHE").val(result.homePhone);
			$("#landLineOE").val(result.officePhone);
			$("#emailE").val(result.email);
			$("#pinCodeE").val(result.address.zipCode);
			$("#gstinE").val(result.gstinNo);
			$("#adharNoE").val(result.aadharCard);
			$("#fNameE").val(result.firstName);
			$("#mNameE").val(result.middleName);
			$("#lNameE").val(result.lastName);
			
			// Loyalty Details
			if(result.loyalCustomerDetails){
				// Spouse Date
				var spouseDobE = result.loyalCustomerDetails.spouseDOB;
				
				var spDate = new Date(spouseDobE);
				
				var dd = spDate.getDate();
				var mm = spDate.getMonth() + 1;
				var yy = spDate.getFullYear();
				var spouseDt = dd + "/" + mm + "/" + yy;
				
				// Anniversary Date
				var annDateE = result.loyalCustomerDetails.aniverseryDate;
				var annvDate = new Date(annDateE);
				
				var dd1 = annvDate.getDate();
				var mm1 = annvDate.getMonth() + 1;
				var yy1 = annvDate.getFullYear();
				var anniversaryDateE = dd1 + "/" + mm1 + "/" + yy1;
				
				// Customer Date
				
				var custDob = result.loyalCustomerDetails.customerDOB;
				var custDt = new Date(custDob);
				
				var dd2 = custDt.getDate();
				var mm2 = custDt.getMonth() + 1;
				var yy2 = custDt.getFullYear();
				var custDobE = dd2 + "/" + mm2 + "/" + yy2;
				
				
				$("#spouseNameE").val(result.loyalCustomerDetails.spouseName);
				
				if(result.loyalCustomerDetails.spouseDOB != null){
					$("#spouseDobE").val(spouseDt);
				}else{
					$("#spouseDobE").val("");
				}
				
				$("#spouseMblNoE").val(result.loyalCustomerDetails.spouseMobileNumber);
				$("#loyaltyE").val(result.loyalCustomerDetails.loyalty);
				$("#spouseEmailE").val(result.loyalCustomerDetails.spouseEmail);
				$("#lpReedmptionE").val(result.loyalCustomerDetails.loyaltyPointAccrualOrRedeemption);
				$("#intimationE").val(result.loyalCustomerDetails.intimation);
				
				if(result.loyalCustomerDetails.aniverseryDate != null){
					$("#anniversaryDateE").val(anniversaryDateE);
				}else{
					$("#anniversaryDateE").val("");
				}
				
				if(result.loyalCustomerDetails.customerDOB != null){
					$("#custDobE").val(custDobE);
				}else{
					$("#custDobE").val("");
				}
				
				
				
				
				var childDetails = result.loyalCustomerDetails.childrensDeatils;
				
					$.each(childDetails,function(k,v){
						v.deleteFlag = false;
					});
				childrenGridEdit(childDetails);
				$("#jqxgridE").show();
			}else{
				childrenGridEdit();
				$("#jqxgridE").show();
			}
		
		}else{
			$("#createSection").show();
			$("#editSection").hide();
			$("#gridTabs").show();
			$("#editHead").hide();
			$("#createHead").show();
			$("#back").hide();
			
			$.growl.error({
				message : data.mesgStr,
				duration: 10000,
				title : 'Error'
			});
			return false;
		}
	});
	
}

var childrenGridEdit = function(data) {
	console.log(data);
	var source = {
		datafields : [ 
			{
				'name' :'childName',
				'type' :'string',
				 'map':'name'
			}, {
				'name' :'childDob',
				'type' :'date',
				 'map':'dob'
			}, {
				'name' :'childGender',
				'type' :'string',
				'map':'gendor'
			}, {
				'name' :'childMobileNo',
				'type' :'string',
				'map':'mobileNumber'
			
			},{'name':'id','type':'int'},
			{'name' : 'deleteFlag','type' : 'string'},
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridE").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		height : 200,
		theme: 'energyblue',
		columnsheight : 30,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Children Details');			
		},
		columns : [ 
			 {
					'text'  :'Child Name',
					'datafield':  'childName',
					'width' : '25%',
					cellsalign : 'center',
					align:'center',
					editable : true,
					cellbeginedit : function(row){
						if(editFlag == true){
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(newvalue == ""){
							$.growl.error({
								message : "Please Enter Child Name !!",
								duration : 10000,
								title : 'Error'
							});
							$("#update").prop('disabled',true);
						}else{
							$("#update").prop('disabled',false);
						}
					}
				}, {
					'text'  :'Child DOB',
					'datafield':  'childDob',
					'width' : '22%',
					cellsalign : 'center',
					cellsformat : 'dd/MM/yyyy',
					align:'center',
					columntype: 'datetimeinput',
					editable : true,
					cellbeginedit : function(row){
						if(editFlag == true){
							return true;
						}else{
							return false;
						}
					},
					createeditor : function(rowIndex,cellValue, editor) {
						var d = new Date();
						d.setDate(d.getDate() - 1);
						//editor.jqxDateTimeInput('setMinDate', d.toLocaleString());
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(newvalue == null){
							$.growl.error({
								message : "Please Enter Child DOB !!",
								duration : 10000,
								title : 'Error'
							});
							$("#update").prop('disabled',true);
						}else{
							$("#update").prop('disabled',false);
						}
					}
				}, {
					'text'  :'Child Gender',
					'datafield':  'childGender',
					'width' : '20%',
					cellsalign : 'center',
					align:'center',
					editable : true,
					cellbeginedit : function(row){
						if(editFlag == true){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
					createeditor : function(row, value, editor) {
						var gender = [
							{"name": "MALE","id":"MALE"},
							{"name": "FEMALE","id":"FEMALE"}
						]
						editor.jqxDropDownList({ source: gender , displayMember: 'name', valueMember: 'id'});
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(newvalue == ""){
							$.growl.error({
								message : "Please Enter Child Gender !!",
								duration : 10000,
								title : 'Error'
							});
							$("#update").prop('disabled',true);
						}else{
							$("#update").prop('disabled',false);
						}
					}
				}, {
					'text'  :'Child Mobile No',
					'datafield':  'childMobileNo',
					'width' : '30%',
					cellsalign : 'center',
					align:'center',
					editable : true,
					cellbeginedit : function(row){
						if(editFlag == true){
							return true;
						}else{
							return false;
						}
					},
				}, {
					'text'  :'id',
					'datafield':  'id',
					'width' : '30%',
					cellsalign : 'center',
					align:'center',
					editable : false,
					hidden : true
				},	
				{ text : '', datafield : 'delete', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsrenderer : deleteDetails},

				{'text' : 'flag','datafield' : 'deleteFlag','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},

		]
	});
}

var deleteDetails = function(row, column, value) {
	
	var deleteFlag = $("#jqxgridE").jqxGrid('getrowdata', row).deleteFlag;
	
	if(deleteFlag == "false"){
		var deleteVal = '<button  class="btn btn-sm btn-danger" style="margin-top: 3px; margin-left: 3px;" disabled  type="button"><i class="fa fa-trash fa-sm"></i></button>';
	}else{
		var deleteVal= '<button class="btn btn-sm btn-danger" style="margin-top: 3px; margin-left: 3px;"  type="button" id='
			+ row
			+ ' onclick="deleteFunction('
			+ row
			+ ')"/><i class="fa fa-trash fa-sm"></i></button>'
	}
	return deleteVal;
}


var deleteFunction = function(id){
	$("#jqxgridE").jqxGrid('deleterow', id);
}

var count = 0;

$("#enableDisable").on('click',function(){
	enableDisableFields();
});

var enableDisableFields = function(){
	console.log($("#loyaltyTierE").val());
	if(count % 2 == 0){
		$("#address1E").prop('disabled',false);
		$("#address2E").prop('disabled',false);
		$("#address3E").prop('disabled',false);
		$("#panNoE").prop('disabled',false);
		$("#mobile1E").prop('disabled',false);
		$("#mobile2E").prop('disabled',false);
		$("#landLineHE").prop('disabled',false);
		$("#landLineOE").prop('disabled',false);
		$("#emailE").prop('disabled',false);
		$("#pinCodeE").prop('disabled',false);
		$("#gstinE").prop('disabled',false);
		$("#adharNoE").prop('disabled',false);
		
		$("#typeE").prop('disabled',false);
		$("#titleE").prop('disabled',false);
		$("#fNameE").prop('disabled',false);
		$("#mNameE").prop('disabled',false);
		$("#lNameE").prop('disabled',false);
		$("#genderE").prop('disabled',false);
		$("#countryE").prop('disabled',false);
		$("#stateE").prop('disabled',false);
		$("#cityE").prop('disabled',false);
		
		$("#update").prop('disabled',false);
		$("#addDetE").prop('disabled',false);
		
		$("#titleLE").prop('disabled',false);
		$("#spouseNameE").prop('disabled',false);
		$("#spouseDobE").prop('disabled',false);
		$("#spouseMblNoE").prop('disabled',false);
		
		if($("#loyaltyE").val() == "0" || $("#loyaltyE").val() == null || $("#loyaltyE").val() == ""){
			$("#loyaltyE").prop('disabled',false);
		}else{
			$("#loyaltyE").prop('disabled',true);
		}
		
		$("#spouseEmailE").prop('disabled',false);
		
		if($("#loyaltyTierE").val() == ""){
			$("#loyaltyTierE").prop('disabled',false);
		}else{
			$("#loyaltyTierE").prop('disabled',true);
		}
		
		
		$("#lpReedmptionE").prop('disabled',true);
		$("#intimationE").prop('disabled',false);
		$("#genderLE").prop('disabled',false);
		
		$("#anniversaryDateE").prop('disabled',false);
		$("#custDobE").prop('disabled',false);
		$("#intimationTypeE").prop('disabled',false);
		
		$("#noOfChildrensE").prop('disabled',false);
		
		$('#anniversaryDateE').addClass("dateBackground");
		$("#custDobE").addClass("dateBackground");
		$("#spouseDobE").addClass("dateBackground");
		
		editFlag = true;
	}else{
		$("#address1E").prop('disabled',true);
		$("#address2E").prop('disabled',true);
		$("#address3E").prop('disabled',true);
		$("#panNoE").prop('disabled',true);
		$("#mobile1E").prop('disabled',true);
		$("#mobile2E").prop('disabled',true);
		$("#landLineHE").prop('disabled',true);
		$("#landLineOE").prop('disabled',true);
		$("#emailE").prop('disabled',true);
		$("#pinCodeE").prop('disabled',true);
		$("#gstinE").prop('disabled',true);
		$("#adharNoE").prop('disabled',true);
		
		$("#typeE").prop('disabled',true);
		$("#titleE").prop('disabled',true);
		$("#fNameE").prop('disabled',true);
		$("#mNameE").prop('disabled',true);
		$("#lNameE").prop('disabled',true);
		$("#genderE").prop('disabled',true);
		$("#countryE").prop('disabled',true);
		$("#stateE").prop('disabled',true);
		$("#cityE").prop('disabled',true);
		
		$("#update").prop('disabled',true);
		$("#addDetE").prop('disabled',true);
		
		$("#titleLE").prop('disabled',true);
		$("#spouseNameE").prop('disabled',true);
		$("#spouseDobE").removeClass("dateBackground");
		$("#spouseMblNoE").prop('disabled',true);
		
		if($("#loyaltyE").val() == "" || $("#loyaltyE").val() == "no" || $("#loyaltyE").val() == null){
			$("#loyaltyE").prop('disabled',false);
		}else{
			$("#loyaltyE").prop('disabled',true);
		}
		
		
		$("#spouseEmailE").prop('disabled',true);
		
		if($("#loyaltyTierE").val() == ""){
			$("#loyaltyTierE").prop('disabled',false);
		}else{
			$("#loyaltyTierE").prop('disabled',true);
		}
		
		$("#lpReedmptionE").prop('disabled',true);
		$("#intimationE").prop('disabled',true);
		$("#genderLE").prop('disabled',true);

		$('#anniversaryDateE').removeClass("dateBackground");
		$("#custDobE").removeClass("dateBackground");
		$("#intimationTypeE").prop('disabled',true);
		
		$("#noOfChildrensE").prop('disabled',true);
		
		editFlag = false;
	}
	count++ ;
}



$("#addDetE").on('click',function(){
	$("#addtionalDetailsE").show();
	$("#panelE").slideDown();
});

$("#update").on('click',function(){
	var loyaltyFlag = $("#loyaltyFlag").val();
	
	if($("#typeE").val() == "" || $("#titleE").val() == "" || $("#fNameE").val() == "" || $("#lNameE").val() == ""
		|| $("#address1E").val() == "" || $("#mobile1E").val() == "" || $("#countryE").val() == "" || $("#stateE").val() == ""
		|| $("#cityE").val() == "" || $("#emailE").val() == "" || $("#pinCodeE").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
	if($("#loyaltyE").val() != "" && $("#loyaltyE").val() == "1" && $("#loyaltyTierE").val() == ""){
		$.growl.error({
			message : "Please Select Loyalty Tier !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	 
	if($("#intimationE").val() != "" && $("#intimationE").val() == "yes" && $("#intimationTypeE").val() == "" ){
		$.growl.error({
			message : "Please Select Intimation Type !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	 
	else{
		alert("update");
		var childData =  $('#jqxgridE').jqxGrid('getrows');
		var childrenData = [];
		
		if(childData != "undefined" && childData.length > 0){
			$.each(childData,function(k,v){
				var dateF  = new Date(v.childDob);
				
           		var dd = dateF.getDate();
           		var mm = dateF.getMonth() + 1;
           		var yy = dateF.getFullYear();
           		var cDobE = dd + "/" + mm + "/" + yy;
           		
				childrenData.push({
					"id": v.id,
		            "name": v.childName,
		            "dob": cDobE,
		            "gendor": v.childGender,
		            "mobileNumber": v.childMobileNo
				})
			});
		}else{
			childrenData = null;
		}
		
		
	var loyaltyDetails = {
        "id": null,
        "title": ($("#titleLE").val() != "") ? $("#titleLE").val() : null,
        "spouseName": ($("#spouseNameE").val() != "") ? $("#spouseNameE").val() : null,
        "spouseGender": ($("#genderLE").val() != "")? $("#genderLE").val() : null,
        "spouseDOB": ($("#spouseDobE").val() != "") ? $("#spouseDobE").val() : null,
        "spouseMobileNumber": ($("#spouseMblNoE").val()) ? $("#spouseMblNoE").val() : null,
        "loyalty":($("#loyaltyE").val()) ? $("#loyaltyE").val() : null,
        "childrensDeatils": childrenData ,
        "loyaltyTier": ($("#loyaltyTierE").val() != "" ) ? $("#loyaltyTierE").val() : null,
        "spouseEmail": ($("#spouseEmailE").val() != "") ? $("#spouseEmailE").val() : null,
        "loyaltyCardTransaction":  null,
        "loyaltyPointAccrualOrRedeemption": ($("#lpReedmptionE").val() != "") ? $("#lpReedmptionE").val() : null,
        "intimation": ($("#intimationE").val() != "") ? $("#intimationE").val() : null,
        "aniverseryDate": ($("#anniversaryDateE").val() != "") ? $("#anniversaryDateE").val() : null,
        "customerDOB": ($("#custDobE").val() != "") ? $("#custDobE").val() : null,
        "intimationType": ($("#intimationTypeE").val() != "") ? $("#intimationTypeE").val() : null,
        "storeOrDcType" : null,
        "storeOrDcId":null,
      //  "loyaltyTier": ($("#loyaltyTierE").val() != "") ? $("#loyaltyTierE").val() : null
  }
	
	var editDetails = {
			  "id": $("#custIdE").val(),
			  "customerType": $("#typeE").val(),
			   "customerTitle": $("#titleE").val(),
			      "firstName": $("#fNameE").val(),
			      "middleName": $("#mNameE").val(),
			      "lastName": $("#lNameE").val(),
			      "email": $("#emailE").val(),
			      "mobileOne": $("#mobile1E").val(),
			      "mobileTwo": $("#mobile2E").val(),
			      "mobileThree": $("#mobile3E").val(),
			      "homePhone": $("#landLineHE").val(),
			      "officePhone": $("#landLineOE").val(),
			      "customerSexType":$("#genderE").val(),
			      "customerTitles": {
			          "description": null,
			          "id": $("#titleE").val(),
			          "name": $("#titleE").val()
			      },
			      "gender": {
			          "description": null,
			          "id": $("#genderE").val(),
			          "name": $("#genderE").val(),
			      },
			      "address": {
			        "id": null,
			        "address1":$("#address1E").val(),
			        "address2": $("#address2E").val(),
			        "address3": $("#address3E").val(),
			        "country": {
			          "id": $("#countryE").val(),
			          "name":$("#countryE option:selected").text(),
			          "code": $("#countryE option:selected").attr('idr'),
			        },
			        "state": {
			          "id": $("#stateE").val(),
			          "name": $("#stateE option:selected").text(),
			          "code": $("#stateE option:selected").attr('ida'),
			        },
			        "city": {
			          "id": $("#cityE").val(),
			          "name": $("#cityE option:selected").text(),
			          "code": $("#cityE option:selected").attr('idf'),
			        },
			        "zipCode":$("#pinCodeE").val()
			      },
			      "pancard": $("#panNoE").val(),
			    
			      "gstinNo": $("#gstinE").val(),
			      "aadharCard": $("#adharNoE").val(),
			      "customerStoreOrDcType":"DC",
			      "loyalCustomerDetails" : loyaltyDetails
			}

	var updateDetails ;
	if(loyaltyFlag == "true"){
		updateDetails = editDetails;
	}else{
		updateDetails = loyaltyDetails
	}
	console.log(updateDetails);
	//if(loyaltyFlag == "true"){
		postJSON('/OrderExecution/api/v1/updateCustomer', JSON.stringify(editDetails), function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				enableDisableFields();
				editFlag = false;
				window.location.href="javascript:showContentPage('loyaltyCustSearch', 'bodySwitcher')"

			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	//}
	/*else{
		editDetails.loyalCustomerDetails = null;
		postJSON('/OrderExecution/api/v1/updateCustomer', JSON.stringify(editDetails), function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				enableDisableFields();
				editFlag = false;
				window.location.href="javascript:showContentPage('loyaltyCustSearch', 'bodySwitcher')"

			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
		
		postJSON('/OrderExecution/api/v1/addLoyalCustomer?c='+$("#custIdE").val(), JSON.stringify(updateDetails), function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$("#loyaltyCustomerForm").trigger("reset");
				$("#genderC").prop('disabled',false);
				$("#jqxgridT").jqxGrid('clear');
				enableDisableFields();
				editFlag = false;
				window.location.href="javascript:showContentPage('loyaltyCustSearch', 'bodySwitcher')"
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
		}*/
	}
});

$("#search").on('click',function(){
	customerSearchGrid();
	$("#jqxgrid").show();
});

//############################ Validations Started ###################
$("#typeC").on('blur',function(){
	if(this.value == ""){
		$("#typeField").show();
		$("#typeC").addClass("validateView");
	}else{
		$("#typeField").hide();
		$("#typeC").removeClass("validateView");
	}
});

$("#titleC").on('blur',function(){
	if(this.value == ""){
		$("#titleField").show();
		$("#titleC").addClass("validateView");
	}else{
		$("#titleField").hide();
		$("#titleC").removeClass("validateView");
	}
});

$("#fNameC").on('blur',function(){
	if(this.value == ""){
		$("#fnameField").show();
		$("#fNameC").addClass("validateView");
	}else{
		$("#fnameField").hide();
		$("#fNameC").removeClass("validateView");
	}
});

$("#lNameC").on('blur',function(){
	if(this.value == ""){
		$("#lNameField").show();
		$("#lNameC").addClass("validateView");
	}else{
		$("#lNameField").hide();
		$("#lNameC").removeClass("validateView");
	}
});

$("#address1C").on('blur',function(){
	if(this.value == ""){
		$("#addressrField").show();
		$("#address1C").addClass("validateView");
	}else{
		$("#addressrField").hide();
		$("#address1C").removeClass("validateView");
	}
});

$("#countryC").on('blur',function(){
	if(this.value == ""){
		$("#countryField").show();
		$("#countryC").addClass("validateView");
	}else{
		$("#countryField").hide();
		$("#countryC").removeClass("validateView");
	}
});

$("#stateC").on('blur',function(){
	if(this.value == ""){
		$("#stateField").show();
		$("#stateC").addClass("validateView");
	}else{
		$("#stateField").hide();
		$("#stateC").removeClass("validateView");
	}
});

$("#cityC").on('blur',function(){
	if(this.value == ""){
		$("#cityField").show();
		$("#cityC").addClass("validateView");
	}else{
		$("#cityField").hide();
		$("#cityC").removeClass("validateView");
	}
});

// PAN No Validation

$("#lblPANCard").hide();
$("#panNoC").on('blur',function(){
	var panVal = $('#panNoC').val();
	var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

	if(regpan.test(panVal)){
		$("#lblPANCard").hide();
		$("#panNoC").removeClass("validateView");
	} else {
	   // invalid pan card number
		$("#lblPANCard").show();
		$("#panNoC").addClass("validateView");
	}
});

$("#lblPANCardE").hide();
$("#panNoE").on('blur',function(){
	var panVal = $('#panNoE').val();
	var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

	if(regpan.test(panVal)){
		$("#lblPANCardE").hide();
		$("#panNoE").removeClass("validateView");
	} else {
	   // invalid pan card number
		$("#lblPANCardE").show();
		$("#panNoE").addClass("validateView");
	}
});

// Mobile No validation
$("#lblMobile1").hide();
$("#mobile1C").on('blur',function(){
	var val = $("#mobile1C").val();
	
	if(val == ""){
		$("#mobileField").show();
		$("#lblMobile1").hide();
		$("#mobile1C").addClass("validateView");
	}else{
		$("#mobileField").hide();
		$("#mobile1C").removeClass("validateView");
		
		if (/^\d{10}$/.test(val)) {
			$("#lblMobile1").hide();
			$("#mobile1C").removeClass("validateView");
		} else {
			$("#lblMobile1").show();
			$("#mobile1C").addClass("validateView");
		}
	}
	
});

$("#lblMobile1E").hide();
$("#mobile1E").on('blur',function(){
	var val = $("#mobile1E").val();
	
	if(val == ""){
		$("#mobileFieldE").show();
		$("#lblMobile1E").hide();
		$("#mobile1E").addClass("validateView");
	}else{
		$("#mobileFieldE").hide();
		$("#mobile1E").removeClass("validateView");
		
		if (/^\d{10}$/.test(val)) {
			$("#lblMobile1E").hide();
			$("#mobile1E").removeClass("validateView");
		} else {
			$("#lblMobile1E").show();
			$("#mobile1E").addClass("validateView");
		}
	}
	
});

// Email Id Validation

$("#lblEmail").hide();
$("#emailC").on('blur',function(){
	var val = $("#emailC").val();
	if(val == ""){
		$("#emailField").show();
		$("#lblEmail").hide();
		$("#emailC").addClass("validateView");
	}else{
		$("#emailField").hide();
		$("#emailC").removeClass("validateView");
		
		if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val)) {
		    // value is ok, use it
			$("#lblEmail").hide();
			$("#emailC").removeClass("validateView");
		} else {
			$("#lblEmail").show();
			$("#emailC").addClass("validateView");
		}
	}
});

$("#lblEmailE").hide();
$("#emailE").on('blur',function(){
	var val = $("#emailE").val();
	if(val == ""){
		$("#emailFieldE").show();
		$("#lblEmailE").hide();
		$("#emailE").addClass("validateView");
	}else{
		$("#emailFieldE").hide();
		$("#emailE").removeClass("validateView");
		
		if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val)) {
		    // value is ok, use it
			$("#lblEmailE").hide();
			$("#emailE").removeClass("validateView");
		} else {
			$("#lblEmailE").show();
			$("#emailE").addClass("validateView");
		}
	}
});

// Pin Code Validation
$("#lblPinCode").hide();
$("#pinCodeC").on('blur',function(){
	var val = $("#pinCodeC").val();
	if(val == ""){
		$("#pinCodeField").show();
		$("#lblPinCode").hide();
		$("#pinCodeC").addClass("validateView");
	}else{
		$("#pinCodeField").hide();
		$("#pinCodeC").removeClass("validateView");
		
		if (/^\d{6}$/.test(val)) {
			$("#lblPinCode").hide();
			$("#pinCodeC").removeClass("validateView");
		} else {
			$("#lblPinCode").show();
			$("#pinCodeC").addClass("validateView");
		}
	}
});

$("#lblPinCodeE").hide();
$("#pinCodeE").on('blur',function(){
	var val = $("#pinCodeE").val();
	if(val == ""){
		$("#pinCodeFieldE").show();
		$("#lblPinCodeE").hide();
		$("#pinCodeE").addClass("validateView");
	}else{
		$("#pinCodeFieldE").hide();
		$("#pinCodeE").removeClass("validateView");
		
		if (/^\d{6}$/.test(val)) {
			$("#lblPinCodeE").hide();
			$("#pinCodeE").removeClass("validateView");
		} else {
			$("#lblPinCodeE").show();
			$("#pinCodeE").addClass("validateView");
		}
	}
});

// GSTIN No Validation

$("#lblGstinNo").hide();
$("#gstinNoC").on('blur',function(){
	var val = $("#gstinNoC").val();
	
	if(val != ""){
		if (/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val)) {
			$("#lblGstinNo").hide();
			$("#gstinNoC").removeClass("validateView");
		} else {
			$("#lblGstinNo").show();
			$("#gstinNoC").addClass("validateView");
		}
	}else{
		$("#lblGstinNo").hide();
		$("#gstinNoC").removeClass("validateView");
	}
	
});

$("#lblGstinNoE").hide();
$("#gstinE").on('blur',function(){
	var val = $("#gstinE").val();
	
	if(val != ""){
		if (/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val)) {
			$("#lblGstinNoE").hide();
			$("#gstinE").removeClass("validateView");
		} else {
			$("#lblGstinNoE").show();
			$("#gstinE").addClass("validateView");
		}
	}else{
		$("#lblGstinNoE").hide();
		$("#gstinE").removeClass("validateView");
	}
	
});

// Aadhar card No Validation

$("#lblAdharNo").hide();
$("#adharCardC").on('blur',function(){
	var val = $("#adharCardC").val();
	
	if(val != ""){
		if (/^\d{12}$/.test(val)) {
			$("#lblAdharNo").hide();
			$("#adharCardC").removeClass("validateView");
		} else {
			$("#lblAdharNo").show();
			$("#adharCardC").addClass("validateView");
		}
	}else{
		$("#lblAdharNo").hide();
		$("#adharCardC").removeClass("validateView");
	}
	
});

$("#lblAdharNoE").hide();
$("#adharCardE").on('blur',function(){
	var val = $("#adharCardE").val();
	
	if(val != ""){
		if (/^\d{12}$/.test(val)) {
			$("#lblAdharNoE").hide();
			$("#adharCardE").removeClass("validateView");
		} else {
			$("#lblAdharNoE").show();
			$("#adharCardE").addClass("validateView");
		}
	}else{
		$("#lblAdharNoE").hide();
		$("#adharCardE").removeClass("validateView");
	}
	
});

$("#typeC").on('change',function(){
	if($("#typeC").val() == "C"){
		$("#genderC").prop('disabled',true);
	}else{
		$("#genderC").prop('disabled',false);
	}
});

$("#typeE").on('change',function(){
	if($("#typeE").val() == "C"){
		$("#genderE").prop('disabled',true);
	}else{
		$("#genderE").prop('disabled',false);
	}
});
//############################# add Children details ###############################
//Generate Row 
var rowId = 0;
var generaterow = function(i) {
	var row = {};	
	row["childName"] = $("#childNameC").val();
	row["childDob"] = $("#childDobC").val();	
	row["childGender"] = $("#childGenderC").val();
	row["childMobileNo"] = $("#childMobileNoC").val();	
	row["deleteFlag"] = true;
	rowId = rowId + 1;
	return row;
}

$("#addChild").hide();

var childrenGrid = function() {
	var source = {
		datafields : [ 
			{
				'name' :'childName',
				'type' :'string',
				 'map':'childName'
			}, {
				'name' :'childDob',
				'type' :'date',
				 'map':'childDob'
			}, {
				'name' :'childGender',
				'type' :'string',
				'map':'childGender'
			}, {
				'name' :'childMobileNo',
				'type' :'string',
				'map':'childMobileNo'
			
			}
		],
		//localdata : accData,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridT").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : false,
		height : 200,
		theme: 'energyblue',
		columnsheight : 30,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Children Details');			
		},
		columns : [ 
			 {
					'text'  :'Child Name',
					'datafield':  'childName',
					'width' : '20%',
					cellsalign : 'center',
					align:'center',
					editable : false
				}, {
					'text'  :'Child DOB',
					'datafield':  'childDob',
					'width' : '20%',
					cellsalign : 'center',
					cellsformat : 'dd/MM/yyyy',
					align:'center',
					editable : false
				}, {
					'text'  :'Child Gender',
					'datafield':  'childGender',
					'width' : '20%',
					cellsalign : 'center',
					align:'center',
					editable : false
				}, {
					'text'  :'Child Mobile No',
					'datafield':  'childMobileNo',
					'width' : '30%',
					cellsalign : 'center',
					align:'center',
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
						id = $("#jqxgridT").jqxGrid('getrowid', row);
						$("#jqxgridT").jqxGrid('deleterow', id);		
					}		
				}
		]
	});
}

var childrensDet = [];
var childrensDeatils = [];
$("#addChildRow").on('click',function(){
	if($("#childNameC").val() == "" || $("#childDobC").val() == "" || $("#childGenderC").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$('#addChildren').modal('hide');
		$("#jqxgridT").jqxGrid('addrow', null, generaterow(rowId + 1));
		$("#jqxgridE").jqxGrid('addrow', null, generaterow(rowId + 1));

	}
});
//################################ Create Customer Details ##################################
$("#typeField").hide();
$("#fnameField").hide();
$("#lNameField").hide();
$("#titleField").hide();
$("#genderField").hide();
$("#addressrField").hide();
$("#mobileField").hide();
$("#countryField").hide();

$("#stateField").hide();
$("#cityField").hide();
$("#emailField").hide();
$("#pinCodeField").hide();

$("#intTypeC").hide();
$("#intimationC").on('change',function(){
	console.log($("#intimationC").val());
	if($("#intimationC").val() == "yes"){
		$("#intTypeC").show();
		$("#intimationTypeC").prop('disabled',false);
	}else{
		$("#intTypeC").hide();
		$("#intimationTypeC").val("");
		$("#intimationTypeC").prop('disabled',true);
	}
});

$("#intTypeE").hide();
$("#intimationE").on('change',function(){
	if($("#intimationE").val() == "yes"){
		$("#intTypeE").show();
		$("#intimationTypeE").prop('disabled',false);
	}else{
		$("#intTypeE").hide();
		$("#intimationTypeE").val("");
		$("#intimationTypeE").prop('disabled',true);
	}
});

$("#lTierE").hide();
$("#loyaltyE").on('change',function(){
	console.log($("#loyaltyE").val());
	if($("#loyaltyE").val() == "1"){
		$("#loyaltyTierE").prop('disabled',false);
		$("#lTierE").show();
	}else{
		$("#lTierE").hide();
		$("#loyaltyTierE").val("");
		$("#loyaltyTierE").prop('disabled',true);
	}
});

$("#lTierC").hide();
$("#loyaltyC").on('change',function(){
	if($("#loyaltyC").val() == "1"){
		$("#lTierC").show();
		$("#loyaltyTierC").prop('disabled',false);
	}else{
		$("#lTierC").hide();
		$("#loyaltyTierC").val("");
		$("#loyaltyTierC").prop('disabled',true);
	}
});

$("#addC").on('click',function(){
	var loyaltyDetails = {};
	if($("#typeC").val() == "" || $("#titleC").val() == "" || $("#fNameC").val() == "" || $("#lNameC").val() == ""
		 || $("#address1C").val() == "" || $("#mobile1C").val() == "" || $("#countryC").val() == ""
		|| $("#stateC").val() == "" || $("#cityC").val() == "" || $("#emailC").val() == "" || $("#pinCodeC").val() == ""){
		
		/*$("#typeC").addClass("validateView");
		$("#titleC").addClass("validateView");
		$("#fNameC").addClass("validateView");
		
		$("#lNameC").addClass("validateView");
		$("#address1C").addClass("validateView");
		
		$("#mobile1C").addClass("validateView");
		$("#countryC").addClass("validateView");
		$("#stateC").addClass("validateView");
		
		$("#cityC").addClass("validateView");
		$("#emailC").addClass("validateView");
		$("#pinCodeC").addClass("validateView");
		
		$("#typeField").show();
		$("#fnameField").show();
		$("#lNameField").show();
		$("#titleField").show();
		
		if($("#typeC").val() == "I"){
			$("#genderField").show();
			$("#genderC").addClass("validateView");
		}else{
			$("#genderField").hide();
			$("#genderC").removeClass("validateView");
		}
		
		$("#addressrField").show();
		$("#mobileField").show();
		$("#countryField").show();
		
		$("#stateField").show();
		$("#cityField").show();
		$("#emailField").show();
		$("#pinCodeField").show();*/
		
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	} else{
		createLoyaltyCustomer();
	}
});

$("#additionalDetC").on('click',function(){
	$("#addtionalDetails").show();
	$("#panel1").slideDown();
	childrenGrid();
	$("#jqxgridT").show();
});


var createLoyaltyCustomer= function(additionalDetails){
	 if($("#loyaltyC").val() != "" && $("#loyaltyC").val() == "1" ){
		if($("#loyaltyTierC").val() == ""){
			$.growl.error({
				message : "Please Select Loyalty Tier !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}else{}
	}else{}
	 
	if($("#intimationC").val() != "" && $("#intimationC").val() == "yes"){
		if($("#intimationTypeC").val() == ""){
			$.growl.error({
				message : "Please Select Intimation Type !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}else{}
	}else{}
	 
	var childDetails = $('#jqxgridT').jqxGrid('getrows');
	
	var childDetailsC =  [];
	$.each(childDetails,function(k,v){
		childDetailsC.push({
			"id": null,
            "name": v.childName,
            "dob": v.childDob,
            "gendor": v.childGender,
            "mobileNumber": v.childMobileNo
		});
	});
	var customerDetails = {
			"address": {
			    "address1": $("#address1C").val(),
			    "address2": $("#address2C").val(),
			    "address3": $("#address2C").val(),
			    "country": {
			      "id":$("#countryC").val(),
			      "name": $("#countryC option:selected").attr('idC'),
			      "description": $("#countryC option:selected").text()
			    },
			    "state": {
			      "id": $("#stateC").val(),
			      "name":  $("#stateC option:selected").attr('idS'),
			      "description": $("#stateC option:selected").text()
			    },
			    "city": {
			      "id": $("#cityC").val(),
			      "name": $("#cityC option:selected").attr('idT'),
			      "description": $("#cityC option:selected").text()
			    },
			    "zipCode": $("#pinCodeC").val()
			  },
			  "customerType": $("#typeC").val(),
			  "customerTitles":$("#titleC").val(),
			  "firstName": $("#fNameC").val(),
			  "middleName": $("#mNameC").val(),
			  "lastName": $("#lNameC").val(),
			  "gender":$("#genderC").val(),
			  "pancard": $("#panNoC").val(),
			  "mobileOne":$("#mobile1C").val(),
			  "mobileTwo": $("#mobile2C").val(),
			  "homePhone": $("#landLineH").val(),
			  "officePhone": $("#landLineO").val(),
			  "gstinNo": $("#gstinNoC").val(),
			  "aadharCard": $("#adharCardC").val(),
			  "email": $("#emailC").val(),
			  "customerStoreOrDcType":"DC",
			  "loyalCustomerDetails":($("#spouseNameC").val() != "") ? {
				  	"title": $("#titleLC").val(),
				    "spouseName":$("#spouseNameC").val(),
				    "spouseGender":$("#genderLC").val(),
				    "spouseDOB":($("#spouseDobC").val() == "") ? null : $("#spouseDobC").val(),
				    "spouseMobileNumber":$("#spouseMblNoC").val(),
				    "loyalty":$("#loyaltyC").val(),
				    "loyaltyTier":$("#loyaltyTierC").val(),
				    "spouseEmail":$("#spouseEmailC").val(),
				    "loyaltyCardTransaction":null,
				    "loyaltyPointAccrualOrRedeemption":null,
				    "intimation":$("#intimationC").val(),
				    "aniverseryDate":($("#anniversaryDateC").val() == "") ? null : $("#anniversaryDateC").val(),
				    "customerDOB":($("#custDobC").val() == "" ) ? null : $("#custDobC").val(),
				    "intimationType":$("#intimationTypeC").val(),
				    "storeOrDcType" : null,
				    "storeOrDcId":null,
				    "childrensDeatils": (childDetails !="undefined" || childDetails != undefined ) ? childDetailsC : []
			  }:null
			}
	
	postJSON('/OrderExecution/api/v1/createCustomer', JSON.stringify(customerDetails), function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$("#loyaltyCustomerForm").trigger("reset");
			$("#genderC").prop('disabled',false);
			$("#jqxgridT").jqxGrid('clear');
			window.location.href="javascript:showContentPage('loyaltyCustSearch', 'bodySwitcher')"

			//return
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