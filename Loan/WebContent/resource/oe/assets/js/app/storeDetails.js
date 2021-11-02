/**
 * ## AUTHOR : POOJA ## AUTHOR 2: DIPANKAR NAHA ## DATE : 03-02-2017 ## MODIFIED
 * DATE : 13-02-2017 ## DESCRIPTION : SCRIPT TO CREATE STORE MASTER
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

$('#startDate').val('');
$('#startDateVal').hide();

$("#sId").hide();
$("#cId").hide();

$('#endDate').val('');
$('#endDateVal').hide();
$('#storeType').on('change', function() {

	var selectedVal = $('#storeType').val();
	if (selectedVal == "REACHOUT") {
		$('#startDateVal').show();

		$('#endDateVal').show();
	} else {
		$('#startDate').val('');
		$('#startDateVal').hide();

		$('#endDate').val('');
		$('#endDateVal').hide();
		maxDate: 0
	}
});

// Date Format Change Function
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

var onLoadStoreLOV = function() {

	$('#regionS').empty().append('<option value="" selected>--Select--</option>');
	

	$.getJSON('/OrderExecution/api/v1/storeLOV?page=search', function(data) {
		var rList = data.payload.rList;
		var allStores = data.payload.allStores;

		$.each(rList,function(key, val) {
					$('#regionS').append('<option value="' + val.id + '">' + val.name + '</option>');
				});

		/*$.each(allStores,function(key, val) {
					$('#storeNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
				});*/

	});
}

$("#regionS").on('change',function(){
	var region =  $("#regionS").val();
	$.getJSON('/OrderExecution/api/v1/storeLOV?page=search&regionId='+region,function(data) {	
		$('#storeNameS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.allStores,function(key, val) {
			$('#storeNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	});
});

var countriesS = [];
var cityListS = [];
var allbanksS = [];
var stateListS = [];

var countriesSE = [];
var onLoadStoreLOVCreate = function() {
	
	$('#region').empty().append('<option value="" selected>--Select--</option>');
	$('#storeCity').empty().append('<option value="" selected>--Select--</option>');
	/*$('#storeCountry').empty().append('<option value="" selected>--Select--</option>');
	$('#storeState').empty().append('<option value="" selected>--Select--</option>');*/
	$('#storeType').empty().append('<option value="" selected>--Select--</option>');
	$('#dcName').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/storeLOV?page=create', function(data) {

		var rList = data.payload.rList;
		var sTypeList = data.payload.sTypeList;
		var stateList = data.payload.stateList;
		var allbanks = data.payload.bankList;
		var allstoretypes = data.payload.allstoretypes;
		var cityList = data.payload.cityList;
		var countries = data.payload.countries;
		var dcList = data.payload.allDc;
		$('#createdOnC').val(data.payload.createdon);
		$('#createdByC').val(data.payload.createdBy);
		$.each(rList,function(key, val) {
					$('#region').append('<option value="' + val.id + '">' + val.name + '</option>');
				});
		$.each(cityList, function(key, val) {
			cityListS.push({
				"id" : val.id,
				"name" : val.name
			});
			$('#storeCity').append('<option  value="' + val.id + '">' + val.name + '</option>');
		});
		$.each(allbanks, function(key, val) {
			allbanksS.push({
				"id" : val.id,
				"name" : val.name
			});
		});
		/*$.each(countries, function(key, val) {
			if(val.id == 1){
				$('#storeCountry').append('<option selected  value="' + val.id + '">' + val.name + '</option>');
				}else{
					$('#storeCountry').append('<option   value="' + val.id + '">' + val.name + '</option>');
				}
		
			countriesS.push({
				"id" : val.id,
				"name" : val.name
			});
			countriesSE.push({
				"id" : val.id,
				"name" : val.name
			});
		});*/
		/*$.each(stateList, function(key, val) {
			stateListS.push({
				"id" : val.id,
				"name" : val.name
			});
			$('#storeState').append('<option  value="' + val.id + '">' + val.name + '</option>');
		});*/
		$.each(sTypeList, function(key, val) {
			$('#storeType').append('<option  value="' + val.id + '">' + val.name + '</option>');
		});
		$.each(dcList, function(key, val) {
			$('#dcName').append('<option  value="' + val.id + '">' + val.name + '</option>');
		});

	});
}

onLoadStoreLOV();

$("#storeCity").on('change',function(){
	var city = $("#storeCity").val();
	$.getJSON('/OrderExecution/api/v1/storeCityLOV?cityId=' + city, function(data) {
		var countryId = data.payload.country.id;
		var countryName = data.payload.country.name;
		var stateId = data.payload.state.id;
		var stateName = data.payload.state.name;
		var stateCode = data.payload.state.code;
		$("#storeCountry").val(countryName);
		$("#storeState").val(stateCode + "-" + stateName);
		$("#storeStateId").val(stateId);
		$("#storeCountryId").val(countryId);
	});
	
});

var StoreFieldFilersVal = function() {

	var storeNameS = $("#storeNameS").val();
	var regionS = $("#regionS").val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (regionS != "" && regionS != null) {
		fieldFilters.fieldFilters["regionCode"] = regionS;
	}
	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["storeCode"] = storeNameS;
	}

	return fieldFilters;
}	
var z = 1;
// Edit page 
	var editStoreDet = function(id) {		
		
		$.getJSON('/OrderExecution/api/v1/storeEditList?id=' + id, function(data) {
						var selectedListData = data.payload.storelist;
							  $("#storeId").val(selectedListData.storeId);
							  $("#regionNameE").val(selectedListData.region.name);
							  $("#regionIdE").val(selectedListData.region.id);
						      $("#storeNameE").val(selectedListData.name);
						      $("#storeAddressE").val(selectedListData.address1);
						      $("#storeAddress1E").val(selectedListData.address2);
						      $("#storeAddress2E").val(selectedListData.address3);
						      $("#zipCodeE").val(selectedListData.zipcode);						     
						      $("#storeOpenTimeE").val(selectedListData.openTime);
						      $("#storeCloseTimeE").val(selectedListData.closeTime);
						      $("#storePhNoE").val(selectedListData.phoneNumber);
						      $("#phoneExtE").val(selectedListData.phoneExtension);
						      $("#startDateE").val($.date(selectedListData.startDate));
						      $("#endDateE").val($.date(selectedListData.endDate));
						      $("#tinGstNumberE").val(selectedListData.tin_gst);	
						      $("#igstNumberE").val(selectedListData.igst);	
						      $("#storeAddressId").val(selectedListData.storeAddressId);
						      $("#createdByE").val(selectedListData.createdBy);	
						      $("#createdOnE").val(selectedListData.createdOn);	
						      if(selectedListData.storeType == "REACHOUT"){
						    	  $("#strtDtE").show();
						    	  $("#endDtE").show();
						      }else{
						    	  $("#strtDtE").hide();
						    	  $("#endDtE").hide();
						      }
						      loadEditStoreDet(selectedListData.status);
						      if(z == 1){
						      onLoadStoreLOVCreate();
						      };z++;
						      onLoadStoreLOVCreateE(selectedListData.city.id, selectedListData.state.id, selectedListData.country.id, selectedListData.storeType, selectedListData.dc.id);
						     
						      editStoreDetailsItemGrid(selectedListData.storeBankList);
						      
						     
				});
		
	}

var editStoreCreate = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editStoreDetails" style="margin-top:10px;" type="button" id='
			+ row
			+ ' onclick="editStoreDet('
			+ value
			+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
	}
}

// In grid view last column belong to action
function storeMasterGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'region',
		'type' : 'string',
		'map'	:'region>name'
	}, {
		'name' : 'name',
		'type' : 'string'
	}, {
		'name' : 'city',
		'type' : 'string',
		'map'	:'city>name'
	}, {
		'name' : 'state',
		'type' : 'string',
		'map'  : 'state>name'
	}, {
		'name' : 'stateCode',
		'type' : 'string',
		'map'  : 'state>code'
	},
	{
		'name' : 'country',
		'type' : 'string',
		'map'  : 'country>name'
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
		'type' : 'string'
	}, {
		'name' : 'openTime',
		'type' : 'string'
	}, {
		'name' : 'closeTime',
		'type' : 'string'
	}, {
		'name' : 'phoneNumber',
		'type' : 'int'
	}, {
		'name' : 'phoneExtension',
		'type' : 'string'
	}, {
		'name' : 'storeType',
		'type' : 'string'
	}, {
		'name' : 'startDate',
		'type' : 'date'
	}, {
		'name' : 'endDate',
		'type' : 'date'
	}, {
		'name' : 'dc',
		'type' : 'string',
		'map'  :  'dc>name'
	}, {
		'name' : 'tin_gst',
		'type' : 'string'
	},{
		'name' : 'storeId',
		'type' : 'int',
	} ,{
		'name' : 'actionId',
		'type' : 'long',
		'map' : 'storeId'
	} ];

	var columns = [ 
		{
		'text' : 'Region',
		'datafield' : 'region',
		'width' : '4%',
		sortable : true,
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : ' Name',
		'datafield' : 'name',
		'width' : '5%',
		sortable : true,
		cellsalign : 'left',
		align:'center',
		editable : false
	}, {
		'text' : ' City',
		'datafield' : 'city',
		'width' : '5.5%',
		sortable : true,
		cellsalign : 'center',
		align:'center',
		editable : false
	},{'text' : '',datafield : 'stateCode','width' : '3%',editable : false,hidden:true}, 
	{
		'text' : ' State',
		'datafield' : 'state',
		'width' : '5%',
		sortable : true,
		cellsalign : 'center',
		align:'center',
		editable : false,
		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
		var stateName = $('#jqxgrid').jqxGrid('getcellvalue', row, 'state');
		var stateCode = $('#jqxgrid').jqxGrid('getcellvalue', row, 'stateCode');
		
		var state = stateCode + "-" + stateName ;
		return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + state  + '</div>';
	 }
	}, {
		'text' : ' Country',
		'datafield' : 'country',
		'width' : '5%',
		sortable : true,
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : ' Address1',
		'datafield' : 'address1',
		'width' : '6%',
		sortable : false,
		cellsalign : 'left',
		align:'center',
		editable : false
	}, {
		'text' : ' Address2',
		'datafield' : 'address2',
		'width' : '6%',
		sortable : false,
		cellsalign : 'left',
		align:'center',
		editable : false
	}, {
		'text' : ' Address3',
		'datafield' : 'address3',
		'width' : '6%',
		sortable : false,
		cellsalign : 'left',
		align:'center',
		editable : false
	}, {
		'text' : ' Zip Code',
		'datafield' : 'zipcode',
		'width' : '5.5%',
		sortable : false,
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : 'Store Open Time',
		'datafield' : 'openTime',
		'width' : '4%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Store Close Time',
		'datafield' : 'closeTime',
		'width' : '4%',
		sortable : false,
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : ' Store Ph. No.',
		'datafield' : 'phoneNumber',
		'width' : '6%',
		sortable : false,
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : ' Ph. Ext.',
		'datafield' : 'phoneExtension',
		'width' : '3.5%',
		sortable : false,
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : 'Store Type',
		'datafield' : 'storeType',
		'width' : '5%',
		sortable : true,
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : 'Start Dt.',
		'datafield' : 'startDate',
		'width' : '6%',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		align:'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : true,
		editable : false
	}, {
		'text' : ' End Dt.',
		'datafield' : 'endDate',
		'width' : '5.5%',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		align:'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : true,
		editable : false
	}, {
		'text' : ' DC Name',
		'datafield' : 'dc',
		'width' : '9%',
		cellsalign : 'left',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'GSTIN No.',
		'datafield' : 'tin_gst',
		'width' : '6%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	},{
		text : '',
		'datafield' : 'actionId',
		cellsrenderer : editStoreCreate,
		editable : false,
		sortable : false,
		'width' : '3%',
		 filterable: false,
		cellsalign: 'center',
		align:'center'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/storeList ", "list",columns, StoreFieldFilersVal(), updateRows, "storeCode");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
       	autorowheight :true,
        autoheight :true,
        columnsheight: 80,
        columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});

}

function addStoreDetailsItemGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
		updates[newdata.id] = {
			"id" : newdata.id,
			"accountFor" : newdata.accountFor,
			"accountType" : newdata.accountType,
			"city" : newdata.city,
			"state" : newdata.state,
			"country" : newdata.country,
			"bankName" : newdata.bankName,
		};
	}

	var status = [{
		"id" : "true",
		"name" : "ACTIVE"
	}, {
		"id" : "false",
		"name" : "INACTIVE"
	} ];

	var statusSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : status
		};

		var statusSourceAdapter = new $.jqx.dataAdapter(statusSource, {
			autoBind : true
		});

	
	var bankNameTypeSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : allbanksS
	};
	var bankNameTypeDataAdapter = new $.jqx.dataAdapter(bankNameTypeSource, {
		autoBind : true
	});
	//State grid drop down

	var cityNameSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : cityListS
	};

	var cityNameTypeDataAdapter = new $.jqx.dataAdapter(cityNameSource, {
		autoBind : true
	});

	//State grid dropdown

	var stateNameSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : stateListS
	};

	var stateNameTypeDataAdapter = new $.jqx.dataAdapter(stateNameSource, {
		autoBind : true
	});

	//Country grid dropdown

	var countryNameTypeSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : countriesS
	};

	var countryNameTypeDataAdapter = new $.jqx.dataAdapter(
			countryNameTypeSource, {
				autoBind : true
			});

	// Account type grid dropdown
	var storeAccountType = [ {
		"id" : "Current",
		"name" : "Current"
	}, {
		"id" : "Saving",
		"name" : "Saving"
	} ];

	var storeAccountTypeSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : storeAccountType
	};

	var storeAccountTypeDataAdapter = new $.jqx.dataAdapter(
			storeAccountTypeSource, {
				autoBind : true
			});

	// Account for grid dropdown
	var storeAccountFor = [ {
		"id" : "SPD",
		"name" : "SPD"
	}, {
		"id" : "SP",
		"name" : "SP"
	}, {
		"id" : "O",
		"name" : "O"
	} ];

	var storeAccountForSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : storeAccountFor
	};

	var storeAccountForDataAdapter = new $.jqx.dataAdapter(
			storeAccountForSource, {
				autoBind : true
			});

	var datafield = [ {
		'name' : 'storeDetSlNo',
		'type' : 'int'
	}, {
		'name' : 'storeName',
		'type' : 'string'
	}, {
		'name' : 'accountFor',
		'type' : 'string'
	}, {
		'name' : 'accountHolderName',
		'type' : 'string'
	}, {
		'name' : 'accountType',
		'type' : 'string'
	}, {
		'name' : 'bankName',
		'type' : 'string'
	}, {
		'name' : 'branchName',
		'type' : 'string'
	}, {
		'name' : 'ifscCode',
		'type' : 'string'
	}, {
		'name' : 'city',
		'type' : 'string'
	}, {
		'name' : 'state',
		'type' : 'string'
	}, {
		'name' : 'country',
		'type' : 'string'
	}, {
		'name' : 'status',
		'type' : 'string'
	}, {
		name : 'statusN',
		'type' : 'string'
	}, {
		'name' : 'id',
		'type' : 'long'
	}, {
		name : 'accountTypeN',
		value : 'accountType',
		values : {
			source : storeAccountTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		name : 'accountForN',
		value : 'accountFor',
		values : {
			source : storeAccountForDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		name : 'bankNameN',
		value : 'bankName',
		values : {
			source : bankNameTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		name : 'cityN',
		value : 'city',
		values : {
			source : cityNameTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		name : 'stateN',
		value : 'state',
		values : {
			source : stateNameTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		name : 'countryN',
		value : 'country',
		values : {
			source : countryNameTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	} ,{
		'name' : 'stateIdC',
		'type' : 'int'
	},
	{
		'name' : 'countryIdC',
		'type' : 'int'
	}
	];

	var popcolumns = [
			{
				'text' : 'SL. No.',
				'datafield' : 'storeDetSlNo',
				'width' : '4%',
				cellsalign : 'center',
				align:'center',
				editable : false
			},
			{
				'text' : 'Store Name',
				'datafield' : 'storeName',
				'width' : '8%',
				cellsalign : 'center',
				align:'center',
				editable : false
			},
			{
				'text' : 'Acc. For',
				'datafield' : 'accountFor',
				columntype : 'combobox',
				displayfield : 'accountForN',
				cellsalign : 'center',
				align:'center',
				editable : true,
				'width' : '6%',
				createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : storeAccountForDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue.value != oldvalue) {
						$("#jqxgridp").jqxGrid('setcellvalue', row,"accountForN", "--Select--");
						$("#jqxgridp").jqxGrid('setcellvalue', row,"accountFor", null);
					}
					;
				}
			},
			{
				'text' : 'Acc. Holder Name',
				'datafield' : 'accountHolderName',
				'width' : '8%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false,
				validation : function(cell, value) {
					var data = /^[a-zA-Z\s]+$/.test(value);
					if(data == false)
						{
						return {
							result : false,
							message : "Only character with space!"
						};
						}
					return true;
					},
			},
			{
				'text' : 'Acc. No.',
				'datafield' : 'accpuntNum',
				'width' : '8%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : true,
				validation : function(cell, value, row) {
					var data = /^[a-z0-9]{0,20}$/.test(value);
					if(data == false)
						{
						return {
							result : false,
							message : "Please enter the valid Bank Acc. number!"
						};
						}
					return true;
					},
				
			},
			{
				'text' : 'Acc. Type',
				'datafield' : 'accountType',
				columntype : 'combobox',
				displayfield : 'accountTypeN',
				cellsalign : 'center',
				align:'center',
				editable : true,
				'width' : '7%',
				createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : storeAccountTypeDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue.value != oldvalue) {
						$("#jqxgridp").jqxGrid('setcellvalue', row,"accountTypeN", "--Select--");
						$("#jqxgridp").jqxGrid('setcellvalue', row,"accountType", null);
					}
					;
				}
			},
			{
				'text' : 'Bank Name',
				'datafield' : 'bankName',
				columntype : 'combobox',
				displayfield : 'bankNameN',
				editable : true,
				cellsalign : 'left',
				align:'center',
				'width' : '10%',
				createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : bankNameTypeDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue.value != oldvalue) {
						$("#jqxgridp").jqxGrid('setcellvalue', row,"bankNameN", "--Select--");
						$("#jqxgridp").jqxGrid('setcellvalue', row, "bankName",null);
					}
					;
				}
			},
			{
				'text' : 'Branch Name',
				'datafield' : 'branchName',
				'width' : '8%',
				cellsalign : 'left',
				align:'center',
				sortable : false,
				editable : true,
				validation : function(cell, value) {
					var data = /^[a-zA-Z\s]+$/.test(value);
					if(data == false)
						{
						return {
							result : false,
							message : "Only character with space!"
						};
						}
					return true;
					}
			},
			{
				'text' : 'IFSC Code',
				'datafield' : 'ifscCode',
				'width' : '9%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : true,
				validation : function(cell, value) {
					var data =	/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(value);
					if(data == false)
						{
						return {
							result : false,
							message : "Please enter the valid IFSC Code"
						};
						}
					return true;
					}
			},
			{
				'text' : 'City',
				'datafield' : 'city',
				columntype : 'combobox',
				displayfield : 'cityN',
				cellsalign : 'center',
				align:'center',
				editable : true,
				'width' : '7%',
				createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : cityNameTypeDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					$.getJSON('/OrderExecution/api/v1/storeCityLOV?cityId= ' + newvalue.value, function(data) {
						var cntId = data.payload.country.id ;
						var cntName = data.payload.country.name ;
						var stId = data.payload.state.id ;
						var stName = data.payload.state.name ;
						var stCode = data.payload.state.code;
						var state = stCode + "-" + stName;
						$("#jqxgridp").jqxGrid('setcellvalue', row, "state",state);
						$("#jqxgridp").jqxGrid('setcellvalue', row, "country",cntName);
						$("#jqxgridp").jqxGrid('setcellvalue', row, "stateIdC",stId);
						$("#jqxgridp").jqxGrid('setcellvalue', row, "countryIdC",cntId);
					});
					if (newvalue.value != oldvalue) {
						$("#jqxgridp").jqxGrid('setcellvalue', row, "cityN","--Select--");
						$("#jqxgridp").jqxGrid('setcellvalue', row, "city",null);
					}
					
				}
				
			},
			{
				'text' : 'State',
				'datafield' : 'state',
				//columntype : 'combobox',
				//displayfield : 'stateN',
				cellsalign : 'center',
				align:'center',
				editable : false,
				'width' : '7%',
				/*createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : stateNameTypeDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue.value != oldvalue) {
						$("#jqxgridp").jqxGrid('setcellvalue', row, "stateN","--Select--");
						$("#jqxgridp").jqxGrid('setcellvalue', row, "state",null);
					}
					;
				}*/
			},
			{
				'text' : 'State Id',
				'datafield' : 'stateIdC',
				'width' : '4%',
				cellsalign : 'center',
				align:'center',
				editable : false,
				hidden : true
			},
			{
				'text' : 'Country',
				'datafield' : 'country',
			/*	columntype : 'combobox',
				displayfield : 'countryN',*/
				cellsalign : 'center',
				align:'center',
				editable : false,
				'width' : '6%',
				/*createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : countryNameTypeDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue.value != oldvalue) {
						$("#jqxgridp").jqxGrid('setcellvalue', row, "countryN","--Select--");
						$("#jqxgridp").jqxGrid('setcellvalue', row, "country",null);
					}
					;
				}*/
			},{
				'text' : 'Country Id',
				'datafield' : 'countryIdC',
				'width' : '4%',
				cellsalign : 'center',
				align:'center',
				editable : false,
				hidden : true
			},
			{
				'text' : 'Status',
				'datafield' : 'status',
				'width' : '6%',
				cellsalign : 'center',
				align:'center',
				sortable : true,
				editable : false,
			/*	columntype : 'combobox',
				displayfield : 'statusN',
				createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : statusSourceAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue.value != oldvalue) {
						$("#jqxgridp").jqxGrid('setcellvalue', row, "statusN","--Select--");
						$("#jqxgridp").jqxGrid('setcellvalue', row, "status",null);
					}
					;
				}*/
			}, {
				text : 'Action',
				datafield : 'Delete',
				'width' : '6%',
				columntype : 'button',
				cellsrenderer : function() {
					return "Delete";
				},
				buttonclick : function(row) {
					id = $("#jqxgridp").jqxGrid('getrowid', row);
					$("#jqxgridp").jqxGrid('deleterow', id);
					var selectedrowindex = $("#jqxgridp").jqxGrid('getselectedrowindex');
			         var rowscount = $("#jqxgridp").jqxGrid('getdatainformation').rowscount;
					for(var i=0; i<rowscount; i++){
						$("#jqxgridp").jqxGrid("setcellvalue", i, "storeDetSlNo", i+1);
					}
					
				}
			} ];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafield, popcolumns, updateRows, data, addrow, "#jqxgridp")
}

var editStatus = [ {
	"id" : "true",
	"name" : "ACTIVE"
}, {
	"id" : "false",
	"name" : "INACTIVE"
} ];

var loadEditStoreDet = function(gridRows){

	//$.each(gridRows, function(key, val) {
		$.each(editStatus, function(k, v) {
			
			if(status == v.name){
				val['status'] = v.id;
				val['statusN'] = v.name;
			}
		});
	//});
}



function editStoreDetailsItemGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
		updates[newdata.id] = {
			"id" : newdata.id,
			"accountFor" : newdata.accountFor,
			"accountType" : newdata.accountType,
			
		};
	}

	// Account type grid dropdown
	
	
	var editStatusSourceE = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : editStatus
	};

	var editStatusSourceAdapterE = new $.jqx.dataAdapter(editStatusSourceE, {
		autoBind : true
	});
	
	var bankNameTypeSourceE = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : allbanksS
		};
		var bankNameTypeDataAdapterE = new $.jqx.dataAdapter(bankNameTypeSourceE, {
			autoBind : true
		});
	
	
	
	var cityNameSourceE = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : cityListS
		};

		var cityNameTypeDataAdapterE = new $.jqx.dataAdapter(cityNameSourceE, {
			autoBind : true
		});
	
	
		// Account for grid dropdown
		var storeAccountFor = [ {
			"id" : "SPD",
			"name" : "SPD"
		}, {
			"id" : "SP",
			"name" : "SP"
		}, {
			"id" : "O",
			"name" : "O"
		} ];
	var storeAccountForSourceE = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : storeAccountFor
	};

	var storeAccountForDataAdapterE = new $.jqx.dataAdapter(
			storeAccountForSourceE, {
				autoBind : true
			});
	// Account type grid dropdown
	var storeAccountType = [ {
		"id" : "Current",
		"name" : "Current"
	}, {
		"id" : "Saving",
		"name" : "Saving"
	} ];
	
	
	var storeAccountTypeSourceE = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : storeAccountType
		};
	var storeAccountTypeDataAdapterE = new $.jqx.dataAdapter(
			storeAccountTypeSourceE, {
				autoBind : true
			});
	
	//Country grid dropdown

	var countryNameTypeSourceE = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : countriesSE
	};
	var countryNameTypeDataAdapterE = new $.jqx.dataAdapter(
			countryNameTypeSourceE, {
				autoBind : true
			});

	//State grid dropdown

	var stateNameSourceE = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : stateListS
	};

	var stateNameTypeDataAdapterE = new $.jqx.dataAdapter(stateNameSourceE, {
		autoBind : true
	});
	
	var datafield = [{
		'name' : 'id',
		 'type' : 'int'
	}, {
		'name' : 'accountFor',
		'type' : 'string'
	}, {
		'name' : 'accountHolderName',
		'type' : 'string',
		'map' : 'accountHolderName'
	}, {
		'name' : 'accountType',
		'type' : 'string'
	}, {
		'name' : 'bankName',
		'type' : 'string'
	}, {
		'name' : 'branch',
		'type' : 'string'
	}, {
		'name' : 'ifsc',
		'type' : 'string'
	}, {
		'name' : 'city',
		'type' : 'string'
	}, {
		'name' : 'cityId',
		'type' : 'string',
			'map' : 'city>id'
	}, {
		'name' : 'state',
		'type' : 'string',
		'map' : 'state>codeName'
	} ,{
		'name' : 'stateCode',
		'type' : 'string',
		'map' : 'state>code'
	}, {
		'name' : 'stateId',
		'type' : 'string',
		'map' : 'state>id'
	}, {
		'name' : 'country',
		'type' : 'string',
		'map'  : 'country>name',
	}, {
		'name' : 'countryId',
		'type' : 'string',
		'map' : 'country>id'
	}, {
		'name' : 'status',
		'type' : 'string'
	}, {
		name : 'statusN',
		value : 'status',
		map: 'status',
		values : {
			source : editStatusSourceAdapterE.records,
			value : 'id',
			name : 'name'
		}
	}, {
		name : 'accountForN',
		value : 'accountFor',
		map : 'accountFor',
		values : {
			source : storeAccountForDataAdapterE.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'accountNumber',
		'type' : 'string'
	},{
		'name':'Delete',
		'type':'int',
		'map':'id'
	}, /*{
		name : 'countryN',
		value : 'country',
		map  : 'country>name',
		values : {
			source : countryNameTypeDataAdapterE.records,
			value : 'id',
			name : 'name'
		},
		
	} */,{
		name : 'bankNameN',
		'type' : 'string',
		map: 'bankName',
		values : {
			source : bankNameTypeDataAdapterE.records,
			value : 'id',
			name : 'name'
		}
	},
	/*{
		name : 'stateN',
		'type' : 'string',
		map : 'state>name',
		values : {
			source : stateNameTypeDataAdapterE.records,
			value : 'id',
			name : 'name'
		}
	}*/,{
		name : 'accountTypeN',
		value : 'accountType',
		values : {
			source : storeAccountTypeDataAdapterE.records,
			value : 'id',
			name : 'name'
		}
	},{
		name : 'cityN',
		'type' : 'string',
		map : 'city>name',
		values : {
			source : cityNameTypeDataAdapterE.records,
			value : 'id',
			name : 'name'
		}
	},
	];

	var popcolumns = [
		{'text' : '',datafield : 'stateCode','width' : '3%',editable : false,hidden:true},
			{
				'text' : 'Acc. For',
				'datafield' : 'accountFor',
				cellsalign : 'center',
				align:'center',
				sortable : true,
				columntype : 'dropdownlist',
				displayfield : 'accountForN',
				'width' : '7%',
				cellbeginedit: function (row) {
					 var rows = $('#jqxgridpE').jqxGrid('getrows');	
					 if(typeof rows != "undefined"){
							var id = rows[row].id;
							if(typeof id != "undefined"){
								return false;
							}else{
								return true;
							}
						}
					
				 
            },createeditor: function (row, cellvalue, editor) {
		  			  editor.jqxDropDownList({ source: storeAccountForDataAdapterE , displayMember: 'name', valueMember: 'id'});
		      	  	}},
			{
				'text' : 'Acc Holder Name',
				'datafield' : 'accountHolderName',
				'width' : '8%',
				cellsalign : 'center',
				align:'center',
				sortable : true,
				editable :false,
				validation : function(cell, value) {
					var data = /^[a-zA-Z\s]+$/.test(value);
					if(data == false)
						{
						return {
							result : false,
							message : "Only character with space!"
						};
						}
					return true;
					},
				cellbeginedit: function (row) {
					 var rows = $('#jqxgridpE').jqxGrid('getrows');	
					 if(typeof rows != "undefined"){
							var id = rows[row].id;
							if(typeof id != "undefined"){
								return false;
							}else{
								return true;
							}
						}
					
				 
           }
			},
			{
				'text' : 'Acc. No.',
				'datafield' : 'accountNumber',
				'width' : '10%',
				cellsalign : 'center',
				align:'center',
				sortable : true,
				validation : function(cell, value) {
					var data = /^[a-z0-9]{0,20}$/.test(value);
					if(data == false)
						{
						return {
							result : false,
							message : "Please enter the valid Bank Acc. number!"
						};
						}
					return true;
					},
				cellbeginedit: function (row) {
					 var rows = $('#jqxgridpE').jqxGrid('getrows');	
					 if(typeof rows != "undefined"){
							var id = rows[row].id;
							if(typeof id != "undefined"){
								return false;
							}else{
								return true;
							}
						}
					
				 
           }
			},
			{
				'text' : 'Acc. Type',
				'datafield' : 'accountType',
				cellsalign : 'center',
				align:'center',
				sortable : true,
				columntype : 'dropdownlist',
				displayfield : 'accountTypeN',
				'width' : '7%',
				cellbeginedit: function (row) {
					 var rows = $('#jqxgridpE').jqxGrid('getrows');	
					 if(typeof rows != "undefined"){
							var id = rows[row].id;
							if(typeof id != "undefined"){
								return false;
							}else{
								return true;
							}
						}
				},
				createeditor: function (row, cellvalue, editor) {
		  			  editor.jqxDropDownList({ source: storeAccountTypeDataAdapterE , displayMember: 'name', valueMember: 'id'});
	      	  	}},{
				'text' : 'Bank Name',
				'datafield' : 'bankName',
				cellsalign : 'left',
				align:'center',
				sortable : true,
				columntype : 'dropdownlist',
				displayfield : 'bankNameN',
				'width' : '10%',
				cellbeginedit: function (row) {
					 var rows = $('#jqxgridpE').jqxGrid('getrows');	
					 if(typeof rows != "undefined"){
							var id = rows[row].id;
							if(typeof id != "undefined"){
								return false;
							}else{
								return true;
							}
						}
				},
				createeditor: function (row, cellvalue, editor) {
		  			  editor.jqxDropDownList({ source: bankNameTypeDataAdapterE , displayMember: 'name', valueMember: 'id'});
	      	  	}}, {
				'text' : 'Branch Name',
				'datafield' : 'branch',
				columntype: 'textbox',
				'width' : '10%',
				cellsalign : 'left',
				align:'center',
				cellbeginedit: cellbeginedit1,
				sortable : true,
				editable : true,
				validation : function(cell, value) {
					var data = /^[a-zA-Z\s]+$/.test(value);
					if(data == false)
						{
						return {
							result : false,
							message : "Only character with space!"
						};
						}
					return true;
					}
			}, {
				'text' : 'IFSC Code',
				'datafield' : 'ifsc',
				'width' : '10%',
				cellsalign : 'center',
				//columntype : 'numberinput',
				align:'center',
				sortable : false,
				validation : function(cell, value) {
					var data =	/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(value);
					if(data == false)
						{
						return {
							result : false,
							message : "Please enter the valid IFSC Code"
						};
						}
					return true;
					},
				cellbeginedit: function (row) {
					 var rows = $('#jqxgridpE').jqxGrid('getrows');	
					 if(typeof rows != "undefined"){
							var id = rows[row].id;
							if(typeof id != "undefined"){
								return false;
							}else{
								return true;
							}
						}
					
				 
           }
			},{
				'text' : 'City',
				'datafield' : 'city',
				columntype : 'dropdownlist',
				displayfield : 'cityN',
				cellsalign : 'center',
				align:'center',
				'width' : '8%',
				cellbeginedit: function (row) {
					 var rows = $('#jqxgridpE').jqxGrid('getrows');	
					 if(typeof rows != "undefined"){
							var id = rows[row].id;
							if(typeof id != "undefined"){
								return false;
							}else{
								return true;
							}
						}
				},
				createeditor: function (row, cellvalue, editor) {
		  			  editor.jqxDropDownList({ source: cityNameTypeDataAdapterE , displayMember: 'name', valueMember: 'id'});
	      	  	},
	      	  cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						 $.getJSON('/OrderExecution/api/v1/storeCityLOV?cityId='+newvalue.value, function(data) {
							 var cIdE = data.payload.country.id;
							 var sIdE = data.payload.state.id;
							 var countryName = data.payload.country.name;
							 var stateNameE = data.payload.state.name;
							 var stateCodeE = data.payload.state.code;
							 var stateE = stateCodeE + "-" + stateNameE;
							 $("#jqxgridpE").jqxGrid('setcellvalue', row, "state",stateE);
							 $("#jqxgridpE").jqxGrid('setcellvalue', row, "country",countryName);
							 $("#jqxgridpE").jqxGrid('setcellvalue', row, "stateId",sIdE);
							 $("#jqxgridpE").jqxGrid('setcellvalue', row, "countryId",cIdE);
						});
					 
				}
				},
			{
				'text' : 'State',
				'datafield' : 'state',
				cellsalign : 'center',
				align:'center',
				//columntype : 'dropdownlist',
				//displayfield : 'state',
				sortable : true,
				'width' : '10%',
				editable : false,
		/*		cellbeginedit: function (row) {
					 var rows = $('#jqxgridpE').jqxGrid('getrows');	
					 if(typeof rows != "undefined"){
							var id = rows[row].id;
							if(typeof id != "undefined"){
								return false;
							}else{
								return true;
							}
						}	 
         },
				createeditor: function (row, cellvalue, editor) {
		  			  editor.jqxDropDownList({ source: stateNameTypeDataAdapterE , displayMember: 'name', valueMember: 'id'});
	      	  	}*/},{
					'text' : 'State Id',
					datafield : 'stateId',
					'width' : '165px',
					sortable : false,
					editable : false,
					hidden : true
				},
	      	  	{
				'text' : 'Country',
				'datafield' : 'country',
				//columntype : 'dropdownlist',
				//displayfield : 'countryN',
				cellsalign : 'center',
				align:'center',
				'width' : '8%',
				editable : false,
				/*cellbeginedit: function (row) {
					 var rows = $('#jqxgridpE').jqxGrid('getrows');	
					 if(typeof rows != "undefined"){
							var id = rows[row].id;
							if(typeof id != "undefined"){
								return false;
							}else{
								return true;
							}
						}
					
				 
          },
			createeditor: function (row, cellvalue, editor) {
	  			  editor.jqxDropDownList({ source: countryNameTypeDataAdapterE , displayMember: 'name', valueMember: 'id'});
    	  	}*/},{
				'text' : 'Country Id',
				datafield : 'countryId',
				'width' : '165px',
				sortable : false,
				editable : false,
				hidden : true
			}, {
				'text' : 'Status',
				'datafield' : 'status',
				'width' : '8%',
				cellsalign : 'center',
				align:'center',
				sortable : true,
				editable : true,
				cellbeginedit: cellbeginedit,
				columntype : 'dropdownlist',
				displayfield : 'statusN',
				createeditor: function (row, cellvalue, editor, rowBoundIndex, datafield, columntype, value) {
					
					editor.jqxDropDownList({ source: editStatusSourceAdapterE , displayMember: 'name', valueMember: 'id'});
					
				}},{
				text : 'Action',
				datafield : 'Delete',
				'width' : '4%',
				cellsalign:'center',
				align:'center',
				formatoptions: {editbutton:false,delbutton:false},
				editable: false,
				cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
					var rows = $("#jqxgridpE").jqxGrid("getrows");
					if(typeof rows != "undefined"){
						var id = rows[row].id;
						if(typeof id != "undefined"){
							return  "";
						}else{					
						
							return  "<button onclick='deleteStoreEditRow("+row+")'  type='button' class='btn btn-primary btn-sm'><i class='fa fa-trash-o fa-md'></i></button>";
						}
					}
				
				}
			}];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafield, popcolumns, updateRows, data, addrow, "#jqxgridpE");
	$("#jqxgridpE").jqxGrid({
	    autorowheight:true,
	    width: '100%',
	    altRows: true,
	    columnsResize: false
	});
	
}



var deleteStoreEditRow = function(rowId){		
		var id = $("#jqxgridpE").jqxGrid('getrowid', rowId);
		$("#jqxgridpE").jqxGrid('deleterow', id);
		var selectedrowindex = $("#jqxgridpE").jqxGrid('getselectedrowindex');
	 	var rowscount = $("#jqxgridpE").jqxGrid('getdatainformation').rowscount;
	 	var data = $('#jqxgridpE').jqxGrid('getrowdata', rowId);
		for(var i=0; i<rowscount; i++){
			$("#jqxgridpE").jqxGrid("setcellvalue", i, "id", i+1);
		}
		return false;
}

var cellbeginedit = function (row, datafield, columntype, value ) {
	var data = $('#jqxgridpE').jqxGrid('getrowdata', row);
    if (data.status =="INACTIVE") 
    
    	return false;
    	if(value == undefined){
    	editor.jqxDropDownList('disableItem', row);
    	}
}
var cellbeginedit1 = function (row, datafield, columntype, value ) {
	var data = $('#jqxgridpE').jqxGrid('getrowdata', row);
    if (data.status =="INACTIVE") 
    
    	return false;
    	
}

// Add line item after creating header
$("#createStoreDet").on("click", function() {	
	$("#storeName").prop('disabled',false)
	$('#createStoreDetails').on('hidden.bs.modal',function() {
				$(this).find('form').trigger('reset');
	});
	$("#editgridStoreMaster").hide();
	onLoadStoreLOVCreate();
	addStoreDetailsItemGrid(data);
	$("#addRowSection").show();
	$('#jqxgridp').show();
});

var rowId = 1;
// Add new row in grid to create Store Details
var generaterow = function(i) {
	var row = {};

	row["storeDetSlNo"] = i;
	row["storeName"] = $('#storeName').val();
	row["accountFor"] = "";
	row["accountHolderName"] = $('#storeName').val();
	row["accpuntNum"] = "";
	row["accountType"] = "";
	row["bankName"] = "";
	row["branchName"] = "";
	row["ifscCode"] = "";
	row["City"] = "";
	row["state"] = "";
	row["Country"] = "";
	row["City"] = "";
	row["status"] = "ACTIVE";
	rowId = rowId + 1;
	return row;
}
var rowIdEdit = 1;
var generaterowEdit = function(i) {
	var row = {};
	row["storeDetSlNo"] = i;
	row["storeName"] = $('#storeName').val();
	row["accountFor"] = "";
	row["accountHolderName"] = $("#storeNameE").val();
	row["accpuntNum"] = "";
	row["accountType"] = "";
	row["bankName"] = "";
	row["branchName"] = "";
	row["ifscCode"] = "";
	row["City"] = "";
	row["state"] = "";
	row["Country"] = "";
	row["City"] = "";
	row["City"] = "";
	row["status"] = true;
	row["statusN"] = "ACTIVE";
	rowId = rowId + 1;
	return row;
}

var SaveStoreDetails = function() {
	//storeDetailsValidate();
	var storeBankList = [];

	var rows = $('#jqxgridp').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
			if (row.accountFor == "" || row.accountHolderName == ""
					|| row.accpuntNum == "" || row.accpuntNum == "" ||row.accountType == ""||  row.bankName == ""
					||row.branchName == ""||row.ifscCode == ""||row.status == ""||row.country == ""||row.city == ""|| row.state == "") {
				$.growl.error({
					message : "Please fill All the Grid Fields!!",
					duration : 10000
				});
				return false;
			}
		storeBankList.push({
			"accountFor" : row.accountFor,
			"accountHolderName" : row.accountHolderName,
			"accountNumber" : row.accpuntNum,
			"accountType" : row.accountType,
			"bankName" : row.bankName,
			"branch" : row.branchName,
			"ifsc" : row.ifscCode,
			"isActive" :"true",
			"country" : {
				"id" : row.countryIdC
			},
			"city" : {
				"id" : row.city
			},
			"state" : {
				"id" : row.stateIdC
			}

		})

	}

	var storeDetails = {

		"region" : {
			"id" : $('#region').val(),
		},
		"city" : {
			"id" : $('#storeCity').val(),
		},

		"state" : {
			"id" : $('#storeStateId').val(),
		},

		"country" : {
			"id" : $('#storeCountryId').val(),
		},
		"dc" : {
			"id" : $('#dcName').val(),
		},

		"name" : $('#storeName').val(),
		"address1" : $('#storeAddress').val(),
		"address2" : $('#storeAddress1').val(),
		"address3" : $('#storeAddress2').val(),
		"zipcode" : $('#zipCode').val(),
		"openTime" : $('#storeOpenTime').val(),
		"closeTime" : $('#storeCloseTime').val(),
		"phoneNumber" : $('#storePhNo').val(),
		"phoneExtension" : $('#phoneExt').val(),
		"storeType" : $('#storeType').val(),
		"tin_gst" : $('#tinGstNumber').val(),
		"igst" : $('#igstNumber').val(),
		"startDate" : $('#startDate').val(),
		"endDate" : $('#endDate').val(),
		"storeBankList" : storeBankList
	}

	return storeDetails;
}

// Add row in grid lines

//Add row Edit in grid lines
$("#addStoreRowE").on("click", function() {	
	var selectedrowindex = $("#jqxgridpE").jqxGrid('getselectedrowindex');
	var rowscount = $("#jqxgridpE").jqxGrid('getdatainformation').rowscount;
	$("#jqxgridpE").jqxGrid('addrow', null, generaterow(rowscount+1));
});
// Create and save store master details
$("#saveMetalAccLoc").on('click', function() {

});

// On click on search button it will load grid
	
$('#DcMasterSearch').validate({
	 errorElement: 'label', 
	 errorClass: 'help-inline', 
	 focusInvalid: false, 
	 ignore: "",
	 rules: 
	 { 
		 "regionS": { required: true},
		 "storeNameS": { required: true},
	 },      	
	 messages: {
		 'regionS': { required: "Please enter Region!"},
		 'storeNameS': {required: "Please enter Store Name!"}
	 },  
	 submitHandler: function (form) { 
    	storeMasterGrid();
    	$("#jqxgrid").show();
    	return false;
    }
});

var rowId = 0;
$('#createStore').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"region": { required: true },
        "storeName": {  
        	required: true,
            regx: /^[a-zA-Z\s]+$/
    	},
        "storeCity": { required: true },
        "storeState": { required: true },
        "storeCountry": { required: true },
        "storeAddress": { required: true },
        "zipCode": { 
		    required: true,
		    minlength: 6,	            
	        maxlength: 6,
	        digits: true
        },
        "storeOpenTime": { required: true,},
        "storeCloseTime": { required: true },
        "storePhNo": {
    	    required: true,
          // number:true , 
            minlength: 10,	
	        maxlength: 10,
	        digits: true
        },
        "phoneExt": { required: true, maxlength: 5},
        "storeType": { required: true },
        "dcName": { required: true },
        "tinGstNumber": { 
    	    required: true,
    	    alphanumeric:true
	    },
        "igstNumber": { 
    	    required: true,
    	    alphanumeric:true
	    },    
     
        "createdByC" : { 
    	    required: true
	    },
        "createdOnC" : { 
        	    required: true,
        	    dateITA : true
	    }
	    
    },
    errorPlacement: function(error, element) {
    	if(element.context.name == "startDate" || element.context.name == "endDate"){
    		error.insertAfter(element.parent());
    	}else{
    		error.insertAfter(element);
    	}
    },
    messages: {
    'storeName': { 
    	regx : "Only character with space!"
	},
    	
    'zipCode': {
        minlength: 	"Zip Code must be 6 numbers!",
        maxlength: 	"Zip Code must be 6 numbers!",
        digits: 	"Zip code must be 6 numbers!"
	},
	'storePhNo':{
		 minlength:	"Store Phone Number  must be 10 numbers!",
		  maxlength: "Store Phone Number  must be 10 numbers!",
	        digits: "Store Phone Number  must be 10 numbers!"
	} 
 
    },
    submitHandler: function (form) { 
    	var storeType = $("#storeType").val();
    	if(storeType == "REACHOUT" && ($("#startDate").val() == "" || $("#startDate").val() == null)  && ($("#endDate").val() == "" || $("#endDate").val() == null)) 
    	{ 
    		$.growl.error({
    			message : "Please select start date and end date!",
    			duration : 10000
    		});
    		return false;
    	}
    	$('#saveStoreMaster').show();
    	$("#editgridStoreMaster").show();
    	 var selectedrowindex = $("#jqxgridp").jqxGrid('getselectedrowindex');
         var rowscount = $("#jqxgridp").jqxGrid('getdatainformation').rowscount;
      
    	$("#jqxgridp").jqxGrid('addrow', null, generaterow(rowscount+1));
    	
    	return false;
    }  
});   

            
$("#saveStoreMaster").on('click', function(){
	trimmer();
	var storeDetails = SaveStoreDetails();

	if (storeDetails) {
		postJSON('/OrderExecution/api/v1/createStore', JSON.stringify(storeDetails), function(data) {

			if (data.resCode == "1") {
				$('#createStoreDetails').on('hidden.bs.modal',function() {
					$(this).find('form').trigger('reset');
				});

				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$("#createStoreDetails").modal('hide');
				storeMasterGrid();
				$("#jqxgridp").jqxGrid('clear');
				$("#jqxgridp").jqxGrid('destroy');
				$("#jqxgridp").hide();
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
				
			}

		});

	} 
});
	        
$(function() {
	$("#startDate").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		minDate : 0,
		onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); // Get selected date
			$("#endDate").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
			
		}
	});
	$("#endDate").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		minDate : 0
		});
});	


/*
 *############################################### EDIT STORE DETAILS ######################################################
 */

$('#startDateE').val('');
$('#startDateValE').hide();

$('#endDateE').val('');
$('#endDateValE').hide();
$('#storeTypeE').on('change', function() {

	var selectedVal = $('#storeTypeE').val();
	if (selectedVal == "REACHOUT") {
		$('#startDateValE').show();

		$('#endDateValE').show();
	} else {
		$('#startDateE').val('');
		$('#startDateValE').hide();

		$('#endDateE').val('');
		$('#endDateValE').hide();
		maxDate: 0
	}
});
$(function() {
	$("#startDateE").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		//minDate : 0,
		onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); // Get selected date
			$("#endDateE").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
			
		}
	});
	$("#endDateE").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		minDate : 0,
	// maxDate: '+1Y+6M+1D',

	});
});	


var countries = [];
var cityList = [];
var allbanks = [];
var stateList = [];

var onLoadStoreLOVCreateE = function(cityId, stateId, countryId, storeTypeId, dcId) {

	$('#regionE').empty().append('<option value="" selected>--Select--</option>');
	$('#storeCityE').empty().append('<option value="" selected>--Select--</option>');
	$('#storeCountryE').empty().append('<option value="" selected>--Select--</option>');
	$('#storeStateE').empty().append('<option value="" selected>--Select--</option>');
	$('#storeTypeE').empty().append('<option value="" selected>--Select--</option>');
	$('#dcNameE').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/storeLOV?page=create', function(data) {

		var rList = data.payload.rList;
		var sTypeList = data.payload.sTypeList;
		var stateList = data.payload.stateList;
		var allbanks = data.payload.bankList;
		var allstoretypes = data.payload.allstoretypes;
		var cityList = data.payload.cityList;
		var countries = data.payload.countries;
		var dcList = data.payload.allDc;
		
		$.each(rList, function(key, val) {
			$('#regionE').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		$.each(cityList, function(key, val) { 
			cityList.push({
				"id" : val.id,
				"name" : val.name
			});
			if(val.id == cityId){
				$('#storeCityE').append('<option selected value="' + val.id + '">' + val.name + '</option>');
			}else{
				$('#storeCityE').append('<option  value="' + val.id + '">' + val.name + '</option>');
			}
			
		});
		$.each(allbanks, function(key, val) {
			allbanks.push({
				"id" : val.id,
				"name" : val.name
			});
		});
		$.each(countries, function(key, val) {
			if(val.id == countryId){
				$('#storeCountryE').append('<option selected  value="' + val.id + '">' + val.name + '</option>');
			}else{
				$('#storeCountryE').append('<option  value="' + val.id + '">' + val.name + '</option>');
			}			
			countries.push({
				"id" : val.id,
				"name" : val.name
			});
		});
		$.each(stateList, function(key, val) {
			stateList.push({
				"id" : val.id,
				"name" : val.name
			});
			if(val.id == stateId){
				$('#storeStateE').append('<option selected value="' + val.id + '">' + val.code+ "-" + val.name + '</option>');
			}else{
				$('#storeStateE').append('<option  value="' + val.id + '">'+ val.code+ "-" + val.name + '</option>');
			}
			
		});
		$.each(sTypeList, function(key, val) {
			if(val.id == storeTypeId){
				$('#storeTypeE').append('<option selected  value="' + val.id + '">' + val.name + '</option>');
			}else{
				$('#storeTypeE').append('<option  value="' + val.id + '">' + val.name + '</option>');
			}
			
		});
		$.each(dcList, function(key, val) {
			if(val.id == dcId){
				$('#dcNameE').append('<option selected value="' + val.id + '">' + val.name + '</option>');
			}else{
				$('#dcNameE').append('<option  value="' + val.id + '">' + val.name + '</option>');
			}
			
		});

	});
}
var editStoreDetailsE = function() {	
	var storeBankList = [];
	var rows = $('#jqxgridpE').jqxGrid('getrows');
	var chekUniqArr = [];
	var chekUniqArrAcc = [];
	
	for (var i = 0; i < rows.length; i++) {
		
		var row = rows[i];
		
		/*if(chekUniqArr.indexOf(row.accountNumber) == -1){
			chekUniqArr.push(row.accountNumber);
			
		}else{
			$.growl.error({
				message : "Please enter unique account number.",
				duration : 10000
			});
			return false;
		}
		
		
		if(chekUniqArrAcc.indexOf(row.accountHolderName) == -1){
			chekUniqArrAcc.push(row.accountHolderName);
			
		}else{
			$.growl.error({
				message : "Please enter unique account for.",
				duration : 10000
			});
			return false;
		}*/
		if ( typeof row.accountFor == "undefined" || typeof row.accountType == "undefined" || typeof row.accountHolderName == "undefined" || typeof  row.accountNumber == "undefined" || typeof row.ifsc == "undefined" || typeof row.bankName == "undefined"  || typeof row.branch == "undefined") {
				$.growl.error({
					message : "Please fill All the Grid Fields!!",
					duration : 10000
				});
				return false;
			}
		
		if( typeof row.id == "undefined"){
			if ( typeof row.city == "undefined" || typeof row.state == "undefined" || typeof row.country == "undefined" ||  typeof row.bankName == "undefined" ) {
				$.growl.error({
					message : "Please fill All the Grid Fields!!",
					duration : 10000
				});
				return false;
			}
			var citName =  row.cityN;
			var cityVal =  row.city;
			
			var stateNme =  row.state;
			var stateVal =  row.stateId;
			
			var countryNme =  row.country;
			var countryVal =  row.countryId;
			var idVal =  null;
			storeBankList.push({
				"id" :idVal,
				"accountFor" : row.accountFor,
				"accountHolderName" : row.accountHolderName,
				"accountNumber" : row.accountNumber,
				"accountType" : row.accountType,
				"bankName" : row.bankNameN,
				"branch" : row.branch,
				"ifsc" : row.ifsc,
				"isActive" : (row.statusN == "ACTIVE" || typeof row.statusN == "undeined") ? true : false,
				"city" : {
					"name" : citName,
					"id" : cityVal
				},
			
				"state" : {
					"name" : stateNme,
					"id" : stateVal
				},
				"country" : {				
					"name" : countryNme,
					"id" : countryVal
				}

			})

			
		}else{
			var citName =  row.cityN;
			var cityVal =  row.cityId;
			var cityVal1 =cityVal.toString();
			
			var stateNme =  row.stateN;
			
			var idVal =   row.id;
			
			var stateVal =  row.stateId;
			var stateval1=stateVal.toString();
			
			var countryNme =  row.countryN;
			
			var countryVal =  row.countryId;
			var countryVal1 =countryVal.toString();
			storeBankList.push({
				"id" :idVal,
				"accountFor" : row.accountFor,
				"accountHolderName" : row.accountHolderName,
				"accountNumber" : row.accountNumber,
				"accountType" : row.accountType,
				"bankName" : row.bankNameN,
				"branch" : row.branch,
				"ifsc" : row.ifsc,
				"isActive" : (row.statusN == "ACTIVE" || typeof row.statusN == "undeined") ? true : false,
				"city" : {
					"name" : citName,
					"id" : cityVal1
				},
			
				"state" : {
					"name" : stateNme,
					"id" : stateval1
				},
				"country" : {				
					"name" : countryNme,
					"id" : countryVal1
				}

			})
		}
		
		
	 // }
	}

	var storeDetailsE = {
	
		"storeId" : $("#storeId").val(),
		"region" : {
			"id" : $('#regionIdE').val(),
		},
		"city" : {
			"id" : $('#storeCityE').val(),
		},
		
		"state" : {
			"id" :	$('#storeStateE').val(),
		},
		
		"country" :{
			"id" : $('#storeCountryE').val(),
		},
		"dc"  : {
			"id" : $('#dcNameE').val(),
		},
		"name" : $('#storeNameE').val(),
		"address1" : $('#storeAddressE').val(),
		"address2" : $('#storeAddress1E').val(),
		"address3" : $('#storeAddress2E').val(),
		"zipcode" : $('#zipCodeE').val(),
		"openTime" : $('#storeOpenTimeE').val(),
		"closeTime" : $('#storeCloseTimeE').val(),
		"phoneNumber" : $('#storePhNoE').val(),
		"phoneExtension" : $('#phoneExtE').val(),
		"storeType" : $('#storeTypeE').val(),
		"tin_gst" : $('#tinGstNumberE').val(),
		"igst" : $('#igstNumberE').val(),
		"startDate" : $('#startDateE').val(),
		"endDate" : $('#endDateE').val(),
		"storeAddressId" :  $('#storeAddressId').val(),
		"storeBankList" : storeBankList
	}

	return storeDetailsE;
}


//Update and save metal accounting location details
$('#editStoreDetailsForm').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"regionNameE": { required: true },
        "storeNameE": { required: true },
        "storeCityE": { required: true },
        "storeStateE": { required: true },
        "storeCountryE": { required: true },
        "storeAddressE": { required: true },
        "zipCodeE": { 
		    required: true
        },
        "storeOpenTimeE": { required: true},
        "storeCloseTimeE": { required: true },
        "storePhNoE": {
    	    required: true,
            number:true,
            minlength: 10,	
	        maxlength: 10,
	        digits: true
        },
        "phoneExtE": { required: true, maxlength: 5},
        "storeTypeE": { required: true },
        "dcNameE": { required: true },
        "tinGstNumberE": { 
    	    required: true
	    },
        "igstNumberE": { 
    	    required: true
	    },    
     
        "createdByE" : { 
    	    required: true
	    },
        "createdOnE" : { 
        	    required: true,
        	    dateITA : true
	    }
    },
    errorPlacement: function(error, element) {
    	if(element.context.name == "startDate" || element.context.name == "endDate"){
    		error.insertAfter(element.parent());
    	}else{
    		error.insertAfter(element);
    	}
    },
    messages: {
    'storeNameE': { 
    	regx : "Only character with space!"
	},
	  'phoneExtE': { 
		  maxlength : "Phone No should be max 11 char.!"
		},
	    		
    'zipCodeE': {
        minlength: 	"Zip Code must be 6 numbers!",
        maxlength: 	"Zip Code must be 6 numbers!",
        digits: 	"Zip code must be 6 numbers!"
	},
	'storePhNoE':{
		 minlength:	"Store Phone Number  must be 10 numbers!",
		  maxlength: "Store Phone Number  must be 10 numbers!",
	        digits: "Store Phone Number  must be 10 numbers!"
	} 

 
    }, 

    submitHandler: function (form) {
    	trimmer();
    	var storeDetE = editStoreDetailsE();    
    		if (storeDetE) {
			postJSON('/OrderExecution/api/v1/storeupdate',JSON.stringify(storeDetE),function(data) {
			if (data.resCode == "1") {										
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});		
				$("#editStoreDetails").modal('hide');
				onLoadStoreLOVCreate();
				editStoreDetailsItemGrid();
				 } else {
					$.growl.error({
					  message : data.mesgStr,
					  duration : 10000
				   });		
				}
			});
		 // }	
        return false;  
    	}
    }  
   
});  

/*
 *############################################### EDIT STORE DETAILS ######################################################
 */
// Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	 var validator = $( "form" ).validate();
		validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

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
	 $(this).find('form')
		.trigger('reset');
});

$('#createStoreDet').on("click" ,function(){	
	rowId = 1;
	$('#saveStoreMaster').hide();
});

$("#EditrowStoreDetails").on('click',function(){
	 var selectedrowindex = $("#jqxgridpE").jqxGrid('getselectedrowindex');
     var rowscount = $("#jqxgridpE").jqxGrid('getdatainformation').rowscount;
     $("#jqxgridpE").jqxGrid('addrow', null, generaterowEdit(rowscount+1));
	//$("#jqxgridpE").jqxGrid('addrow', null,{"accountHolderName" : $("#storeNameE").val()},'last',{"statusN": "ACTIVE"},'last', generaterowEdit(rowscount + 1));	
});
/*var bnftYearCheck = function (value) {
    if (/^[a-zA-Z\s]+$/.test(value)) {
        return [true];
    } else {
        return [false, "Incorrect input for the  column."]
    }{'storeDetSlNo': i,"statusN": "ACTIVE" , 'storeName':$('#storeName').val(), 'accountHolderName':$('#storeName').val()}
};*/

$("#addStoreRow").on('click',function(){
	if($("#storeName").val() != "" && $("#region").val() != ""){
		$("#storeName").prop('disabled',true);
		$("#region").prop('disabled',true);
	}else{
		$("#storeName").prop('disabled',false);
		$("#region").prop('disabled',false);
	}
});

