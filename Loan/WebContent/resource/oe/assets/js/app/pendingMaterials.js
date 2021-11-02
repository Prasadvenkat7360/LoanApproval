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

$("#stoneAccessory").hide();
$("#fgPendingM").hide();
$('input[name=stoneAccessory]:radio').on('click', function() {
	var selectedVal = $(this).val();

	if (selectedVal == "stoneAccessory") {
		$("#stoneAccessory").show();
		$("#fgPendingM").hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');

	} else if (selectedVal == "fG") {
		$("#fgPendingM").show();
		$("#stoneAccessory").hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');

	}
});

$("#saSeg").hide();
$("#saMainCat").hide();
$("#stAccSeg").hide();

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
	var date = month + "/" + day + "/" + year;

	return date;
};

$.date2 = function(dateObject) {
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

var onLoadPendStoneAcc = function() {

	// GET JSON API CALL FOR LOV
	$.getJSON('/OrderExecution/api/v1/onloadPMWithVendorForSA?criteria=vsolist',function(data) {
			var vlist = data.payload.vendorList;
		    var slist = data.payload.storeList;
			var orderType = data.payload.orderType;

				// vendor names Lov
				var v = '<select id="vendorCodeObj" name="vendorCodeObj" class="form-control" multiple="multiple">';
					$.each(vlist, function(key, val) {
						v += '<option value="' + val.id + '">'+ val.vendorCode + '-' + val.vendorName + '</option>';
					});
					v += '</select>';
					$("#vendorCodeS").html(v);
					$('#vendorCodeObj').multiselect({
						includeSelectAllOption : true,
						enableCaseInsensitiveFiltering:true,
						enableFiltering : true,
						maxHeight : 250,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});

				// Stores Names
				var s = '<select id="storeNameObj"  name="storeNameObj" class="form-control" multiple="multiple">';
					$.each(slist, function(key, val) {s += '<option value="' + val.id + '">'+ val.name + '</option>';
						});
					s += '</select>';
					$("#storeNameS").html(s);
					$('#storeNameObj').multiselect({
						includeSelectAllOption : true,
						enableFiltering : false,
						maxHeight : 250,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
					});

				// Order Type
				var o = '<select id="orderTypeObj" name="orderTypeObj" class="form-control" multiple="multiple">';
					$.each(orderType, function(key, val) {o += '<option value="' + val.id + '">' + val.name + '</option>';
						});
					o += '</select>';
					$("#orderTypeS").html(o);
					$('#orderTypeObj').multiselect({
					  includeSelectAllOption : true,
					  enableFiltering : false,
					  maxHeight : 250,
					  numberDisplayed : 1,
					  buttonClass : 'col-md-12 form-control text-left'
				  });
			    });
              }
onLoadPendStoneAcc();

$("#emailSA").on('click',function() {
		var vendorCodeObj = $("#vendorCodeObj").val();
		params = {
				"fieldFilters" : {
					"psrStatus" : "G,S,A",
					"vendorId" : parseInt(vendorCodeObj)
				}
			};
			if (params.fieldFilters.vendorId != null) {
				postJSON('/OrderExecution/api/v1/sendEmailByVendorForSA', JSON
						.stringify(params), function(data) {
					if (data.resCode == "1") {
						$.growl.notice({
							message : data.mesgStr,
							duration : 10000,
							title : 'Success'
						});
					} else {
						$.growl.error({
							message : data.mesgStr,
							duration : 10000,
							title : 'Error'
						});
					}

				});
			}
		});

$('#vendorCodeS').bind('change', function() {
	var vendorCodeObj = $("#vendorCodeObj").val();
	if (vendorCodeObj == null) {
		$("#emailSA").prop('disabled', true);
	} else {
		if (vendorCodeObj.length == 1) {
			$("#emailSA").prop('disabled', false);

		} else {
			$("#emailSA").prop('disabled', true);
		}
	}

});

$("#emailFg").on('click',function() {
			var vendorNameObj = $("#vendorNameObj").val();
			params = {
				"fieldFilters" : {
					"psrStatus" : "G,S,A",
					"vendorId" : parseInt(vendorNameObj)
				}
			};
			if (params.fieldFilters.vendorId != null) {
				postJSON('/OrderExecution/api/v1/sendEmailByVendorForfg', JSON.stringify(params), function(data) {
					if (data.resCode == "1") {
						$.growl.notice({
							message : data.mesgStr,
							duration : 10000,
							title : 'Success'
						});
					} else {
						$.growl.error({
							message : data.mesgStr,
							duration : 10000,
							title : 'Error'
						});
					}

				});
			}
		});

$('#vendorCodeF').bind('change', function() {
	var vendorNameObj = $("#vendorNameObj").val();
	if (vendorNameObj == null) {
		$("#emailFg").prop('disabled', true);
	} else {
		if (vendorNameObj.length == 1) {
			$("#emailFg").prop('disabled', false);

		} else {
			$("emailFg").prop('disabled', true);
		}
	}

});

// Field Filters
var stoneAccFieldFilters = function() {

	fieldFilters = {
		"fieldFilters" : {}
	};

	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var storeNameS = "";
	} else {
		var storeNameS = storeNameObj.join(",");
	}

	var orderTypeObj = $('#orderTypeObj').val();
	if (orderTypeObj == null || orderTypeObj == "") {
		var orderTypeS = "";
	} else {
		var orderTypeS = orderTypeObj.join(",");
	}

	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCodeS = "";
	} else {
		var vendorCodeS = vendorCodeObj.join(",");
	}

	var stoneAccMainCatObj = $('#stoneAccMainCatObj').val();
	if (stoneAccMainCatObj == null || stoneAccMainCatObj == "") {
		var stoneAccMainCat = "";
	} else {
		var stoneAccMainCat = stoneAccMainCatObj.join(",");
	}

	var stoneAccSegmentObj = $('#stoneAccSegmentObj').val();
	if (stoneAccSegmentObj == null || stoneAccSegmentObj == "") {
		var stoneAccSegment = "";
	} else {
		var stoneAccSegment = stoneAccSegmentObj.join(",");
	}

	if (orderTypeS != "" && orderTypeS != null) {
		fieldFilters.fieldFilters["OrderType"] = orderTypeS;
	}

	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["storeId"] = storeNameS;
	}
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendorId"] = vendorCodeS;
	}

	if (stoneAccSegment != "" && stoneAccSegment != null) {
		fieldFilters.fieldFilters["sSegId"] = stoneAccSegment;
	}

	if (stoneAccMainCat != "" && stoneAccMainCat != null) {
		fieldFilters.fieldFilters["stoneOrAcccatId"] = stoneAccMainCat;
	}

	fieldFilters.fieldFilters["psrStatus"] = "G,S,A";
	return fieldFilters;
}

function stoneAccessoryGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ {
		'name' : 'vendorName',
		'type' : 'string'
	}, {
		'name' : 'storeName',
		'type' : 'string'
	}, {
		'name' : 'orderType',
		'type' : 'string'
	}, {
		'name' : 'psrNumber',
		'type' : 'long'
	}, {
		'name' : 'orderNo',
		'type' : 'long'
	}, {
		'name' : 'orderSlNo',
		'type' : 'long'
	}, {
		'name' : 'JewelName',
		'type' : 'string'
	}, {
		'name' : 'releaseDate',
		'type' : 'date'
	}, {
		'name' : 'noOfpendingDays',
		'type' : 'long'
	}, {
		'name' : 'stoneOrAccSegment',
		'type' : 'string'
	}, {
		'name' : 'stoneOrAccMainCat',
		'type' : 'string'
	}, {
		'name' : 'stoneOrAccSubCat',
		'type' : 'string'
	}, {
		'name' : 'articleCode',
		'type' : 'string'
	}, {
		'name' : 'weightRange',
		'type' : 'double'
	}, {
		'name' : 'clarity',
		'type' : 'string'
	}, {
		'name' : 'actualColor',
		'type' : 'string'
	}, {
		'name' : 'color',
		'type' : 'string'
	}, {
		'name' : 'cutGrade',
		'type' : 'string'
	}, {
		'name' : 'compOwner',
		'type' : 'string'
	}, {
		'name' : 'stoneType',
		'type' : 'string'
	}, {
		'name' : 'stoneOrAccPcs',
		'type' : 'long'
	}, {
		'name' : 'stoneOrAccWt',
		'type' : 'double'
	}, {
		'name' : 'uom',
		'type' : 'string'
	}, {
		'name' : 'condition',
		'type' : 'string'
	}, {
		'name' : 'mivDate',
		'type' : 'date'
	}, {
		'name' : 'mivNo',
		'type' : 'long'
	},{
		'name' : 'orderKind',
		'type' : 'string'
	} ];

	var columns = [ {
		'text' : 'Vendor Code',
		'datafield' : 'vendorName',
		'width' : '5%',
		editable : false,
		cellsalign : 'left',
		align : 'center',
		sortable : true
	}, {
		'text' : 'Store/DC Name',
		'datafield' : 'storeName',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Order Type',
		'datafield' : 'orderType',
		'width' : '4%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'PSR No.',
		'datafield' : 'psrNumber',
		'width' : '3%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Order No.',
		'datafield' : 'orderNo',
		'width' : '4%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Order Sl.',
		'datafield' : 'orderSlNo',
		'width' : '4%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Order Kind',
		'datafield' : 'orderKind',
		'width' : '4%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Jewel Name',
		'datafield' : 'JewelName',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'left',
		align : 'center'
	}, {
		'text' : 'Release Dt.',
		'datafield' : 'releaseDate',
		'width' : '5%',
		editable : false,
		sortable : true,
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'No Of Days Pending',
		'datafield' : 'noOfpendingDays',
		'width' : '5%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Stone Seg',
		'datafield' : 'stoneOrAccSegment',
		'width' : '4.5%',
		editable : false,
		sortable : false,
		cellsalign : 'left',
		align : 'center'
	}, {
		'text' : 'Main Cat ',
		'datafield' : 'stoneOrAccMainCat',
		'width' : '4.5%',
		editable : false,
		sortable : false,
		cellsalign : 'left',
		align : 'center'
	}, {
		'text' : 'Sub Cat/Shape',
		'datafield' : 'stoneOrAccSubCat',
		'width' : '6.5%',
		editable : false,
		sortable : false,
		cellsalign : 'left',
		align : 'center'
	}, {
		'text' : 'Article Code ',
		'datafield' : 'articleCode',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'left',
		align : 'center'
	}, {
		'text' : 'Wt Range ',
		'datafield' : 'weightRange',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Clarity',
		'datafield' : 'clarity',
		'width' : '4.5%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Actual Color',
		'datafield' : 'actualColor',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Color',
		'datafield' : 'color',
		'width' : '3.5%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Cut Grade	',
		'datafield' : 'cutGrade',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Component Owner',
		'datafield' : 'compOwner',
		'width' : '6%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Stone Type',
		'datafield' : 'stoneType',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'left',
		align : 'center'
	}, {
		'text' : 'Stone/Acc Pcs',
		'datafield' : 'stoneOrAccPcs',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Stone/Acc Wt.',
		'datafield' : 'stoneOrAccWt',
		'width' : '6%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'UQC',
		'datafield' : 'uom',
		'width' : '3%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false
	}, {
		'text' : 'Condition',
		'datafield' : 'condition',
		'width' : '5.5%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false
	}, {
		'text' : 'MIV Dt.',
		'datafield' : 'mivDate',
		'width' : '5%',
		cellsformat : 'dd/MM/yyyy',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'

	}, {
		'text' : 'MIV No.',
		'datafield' : 'mivNo',
		'width' : '3%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'

	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchPMWithVendorForSA","list", columns, stoneAccFieldFilters(), updateRows, "id");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :true,
    	theme: 'energyblue',
        columnsheight: 100,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

// Export function for stone/Accessory
$("#exportSA").on("click",function() {
		var data;
		var vendorCodeS = $('#vendorCodeS').val();
		var storeNameS = $('#storeNameS').val();
		var orderTypeS = $('#orderTypeS').val();
			fieldFilters = {
				"fieldFilters" : {}
			};
			 var storeNameObj = $('#storeNameObj').val();
				if (storeNameObj == null || storeNameObj == "") {
					var storeNameS = "";
				} else {
					var storeNameS = storeNameObj.join(",");
				}
			var orderTypeObj = $('#orderTypeObj').val();
				if (orderTypeObj == null || orderTypeObj == "") {
					var orderTypeS = "";
				} else {
					var orderTypeS = orderTypeObj.join(",");
				}
			var vendorCodeObj = $('#vendorCodeObj').val();
				if (vendorCodeObj == null || vendorCodeObj == "") {
					var vendorCodeS = "";
				} else {
					var vendorCodeS = vendorCodeObj.join(",");
				}
			var stoneAccMainCatObj = $('#stoneAccMainCatObj').val();
				if (stoneAccMainCatObj == null || stoneAccMainCatObj == "") {
					var stoneAccMainCat = "";
			    } else {
					var stoneAccMainCat = vendorCodeObj.join(",");
				}
			var stoneAccSegmentObj = $('#stoneAccSegmentObj').val();
				if (stoneAccSegmentObj == null || stoneAccSegmentObj == "") {
					var stoneAccSegment = "";
				} else {
					var stoneAccSegment = stoneAccSegmentObj.join(",");
				}
				if (orderTypeS != "" && orderTypeS != null) {
					fieldFilters.fieldFilters["OrderType"] = orderTypeS;
				}
				if (storeNameS != "" && storeNameS != null) {
					fieldFilters.fieldFilters["storeId"] = storeNameS;
				}
				if (vendorCodeS != "" && vendorCodeS != null) {
					fieldFilters.fieldFilters["vendorId"] = vendorCodeS;
				}
				if (stoneAccSegment != "" && stoneAccSegment != null) {
					fieldFilters.fieldFilters["stoneOrAcccatId"] = stoneAccSegment;
				}
				if (stoneAccMainCat != "" && stoneAccMainCat != null) {
					fieldFilters.fieldFilters["sSegId"] = stoneAccMainCat;
				}
				fieldFilters.fieldFilters["psrStatus"] = "G,S,A";
					var sysdate = moment().format('DDMMYYYYHHmmSS');
					var rows = $("#jqxgrid").jqxGrid('getrows');
					if(typeof rows == "undefined"){
						$.growl.error({
							message : "No Data to Export.",
							duration : 10000
						});
						return false;
					}else{
					var newData = [];
					postJSON('/OrderExecution/api/v1/exportPMWithVendorForSA', JSON.stringify(fieldFilters), function(response) {
						if(response != null){
							data = response.payload.list;
							exportPendingMaterialsSA(data);	
						}
					
					});
				
											
				}
			});


// ################## ON Change lOV ########################################
$("#stoneAccSeg").on("change",function() {
	$('#stoneAccCat').empty().append('<option value="" selected>--Select--</option>');
		var id = $(this).val();
			if (id == "" || id == null) {
				$("#saSeg").hide();
				$("#saMainCat").hide();
			} else {
				$("#saSeg").show();
				$("#saMainCat").hide();
			}
					
			$.getJSON('/OrderExecution/api/v1/onloadPMWithVendorForSA?criteria=' + id,function(data) {
				if (id == "Accessory") {
				 var v = '<select id="stoneAccSegmentObj" class="form-control" multiple="multiple">';
					$.each(data.payload.accessory,function(key, val) {
					  v += '<option value="' + val.id + '">'+ val.code + '</option>';
					});
					v += '</select>';
					$("#stoneAccSegment").html(v);
					$('#stoneAccSegmentObj').multiselect({
						includeSelectAllOption : true,
						enableFiltering : false,
						maxHeight : 250,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
					});
				} else if (id == "stones") {
				 var s = '<select id="stoneAccSegmentObj" class="form-control" multiple="multiple">';
						$.each(data.payload.mTypes,function(key, val) {
						   s += '<option value="'+ val.id + '">' + val.description + '</option>';
					});
						s += '</select>';
						$("#stoneAccSegment").html(s);
						$('#stoneAccSegmentObj').multiselect(
							{
							  includeSelectAllOption : true,
							  enableFiltering : false,
							  maxHeight : 250,
							  numberDisplayed : 1,
							  buttonClass : 'col-md-12 form-control text-left'
						  });
						}
                    });
				});

$('#stoneAccSegment').bind('change',function() {
	var stoneAccSegmentObj = $("#stoneAccSegmentObj").val();
		if (stoneAccSegmentObj == "" || stoneAccSegmentObj == null) {
			$("#saMainCat").hide();
		} else {
			$("#saMainCat").show();
		}
		stoneAccSegmentObj = stoneAccSegmentObj.join(',');
			var params = {
				"fieldFilters" : {
				"sSegId" : stoneAccSegmentObj.toString()
			}
		};

	  postJSON('/OrderExecution/api/v1/getPMSAMcategory',JSON.stringify(params),function(data) {
		var c = '<select id="stoneAccMainCatObj" class="form-control" multiple="multiple">';
			$.each(data.payload.mainCatList, function(key,val) {
			 c += '<option value="' + val.id + '">' + val.code + '</option>';
			});
				c += '</select>';
				$("#stoneAccMainCat").html(c);
				$('#stoneAccMainCatObj').multiselect(
				 {
				   includeSelectAllOption : true,
				   enableFiltering : false,
				   maxHeight : 250,
				   numberDisplayed : 1,
				   buttonClass : 'col-md-12 form-control text-left'
				});
			});
		});

$('#stoneAccessoryForm').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"vendorCodeObj" : {
			required : true
		}
	},
	errorPlacement : function(error, element) {
		if (element.context.name == "vendorCodeObj") {
			error.insertAfter(element.parent());
		} else {
			error.insertAfter(element);
		}
	},
	submitHandler : function(form) {
		stoneAccessoryGrid();
		$("#jqxgrid").show();
		return false;
	}
});

// clear for the StoneAccessory
$('#ClearAll').on('click', function() {
	$('#vendorCodeObj').multiselect("clearSelection");
	$('#storeNameObj').multiselect("clearSelection");
	$('#orderTypeObj').multiselect("clearSelection");
	$('#stoneAccSegmentObj').multiselect("clearSelection");
	$('#stoneAccMainCatObj').multiselect("clearSelection");
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

// ########################### FG Started #########################
var onLoadPendingFg = function() {
	// GET JSON API CALL FOR LOV
	$.getJSON('/OrderExecution/api/v1/onloadPMWithVendorForFG',function(data) {
		var vendList = data.payload.vendorList;
		var storeList = data.payload.StoreAndDcList;
		var orderKind = data.payload.orderKind;
	    var orderType = data.payload.orderType;
		var aSegment = data.payload.aSegment;

		// vendor names Lov
			var v = '<select id="vendorNameObj" name="vendorNameObj" class="form-control" multiple="multiple">';
		       $.each(vendList, function(key, val) {
				 v += '<option value="' + val.id + '">' + val.vendorCode + '-' + val.vendorName + '</option>';
				});
					v += '</select>';
					$("#vendorCodeF").html(v);
					$('#vendorNameObj').multiselect({
						includeSelectAllOption : true,
						enableCaseInsensitiveFiltering:true,
						enableFiltering : true,
						maxHeight : 250,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
					});

					// Stores Names
					var s = '<select id="storeCodeObj"  name="storeCodeObj" class="form-control" multiple="multiple">';
					 $.each(storeList, function(key, val) {
							s += '<option value="' + val.id + '">' + val.name + '</option>';
						});
						s += '</select>';
						$("#storeNameF").html(s);
						$('#storeCodeObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
						});

						// Order Kind
						var o = '<select id="orderKindObj" name="orderKindObj" class="form-control" multiple="multiple">';
						$.each(orderKind, function(key, val) {
							o += '<option value="' + val.id + '">' + val.name + '</option>';
						});
						o += '</select>';
						$("#oKind").html(o);
						$('#orderKindObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
						});

						// Article Segment
						var a = '<select id="articleSegObj" name="articleSegObj" class="form-control" multiple="multiple">';
						$.each(aSegment, function(key, val) {
							a += '<option value="' + val.id + '">' + val.description + '</option>';
						});
						a += '</select>';
						$("#artSeg").html(a);
						$('#articleSegObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
						});

						var t = '<select id="ordTypObj" name="ordTypObj" class="form-control" multiple="multiple">';
						$.each(orderType, function(key, val) {
							t += '<option value="' + val.id + '">' + val.name + '</option>';
						});
						t += '</select>';
						$("#orderTypeF").html(t);
						$('#ordTypObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
						});

					});

                  }

onLoadPendingFg();

// Field Filters
var fgFieldFilters = function() {
	fieldFilters = {
		"fieldFilters" : {}
	};

	var vendorNameObj = $('#vendorNameObj').val();
	if (vendorNameObj == null || vendorNameObj == "") {
		var vendorCodeF = "";
	} else {
		var vendorCodeF = vendorNameObj.join(",");
	}

	var storeCodeObj = $('#storeCodeObj').val();
	if (storeCodeObj == null || storeCodeObj == "") {
		var storeNameF = "";
	} else {
		var storeNameF = storeCodeObj.join(",");
	}

	var ordTypObj = $('#ordTypObj').val();
	if (ordTypObj == null || ordTypObj == "") {
		var orderTypeF = "";
	} else {
		var orderTypeF = ordTypObj.join(",");
	}

	var orderKindObj = $('#orderKindObj').val();
	if (orderKindObj == null || orderKindObj == "") {
		var oKind = "";
	} else {
		var oKind = orderKindObj.join(",");
	}

	var articleSegObj = $('#articleSegObj').val();
	if (articleSegObj == null || articleSegObj == "") {
		var artSeg = "";
	} else {
		var artSeg = articleSegObj.join(",");
	}

	if (vendorCodeF != "" && vendorCodeF != null) {
		fieldFilters.fieldFilters["vendorId"] = vendorCodeF;
	}

	if (storeNameF != "" && storeNameF != null) {
		fieldFilters.fieldFilters["storeId"] = storeNameF;
	}
	if (oKind != "" && oKind != null) {
		fieldFilters.fieldFilters["orderKind"] = oKind;
	}

	if (artSeg != "" && artSeg != null) {
		fieldFilters.fieldFilters["articleSegId"] = artSeg;
	}

	if (orderTypeF != "" && orderTypeF != null) {
		fieldFilters.fieldFilters["OrderType"] = orderTypeF;
	}

	fieldFilters.fieldFilters["psrStatus"] = "G,S,A";

	return fieldFilters;
}

function fgGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ {
		'name' : 'vendorName',
		'type' : 'string'
	}, {
		'name' : 'storeName',
		'type' : 'string'
	}, {
		'name' : 'orderType',
		'type' : 'string'
	}, {
		'name' : 'psrNumber',
		'type' : 'long'
	}, {
		'name' : 'orderNo',
		'type' : 'long'
	}, {
		'name' : 'orderSlNo',
		'type' : 'long'
	}, {
		'name' : 'orderKind',
		'type' : 'string'
	}, {
		'name' : 'JewelName',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	}, {
		'name' : 'designYesorNo',
		'type' : 'string'
	}, {
		'name' : 'designRefNo',
		'type' : 'long'
	}, {
		'name' : 'Pieces',
		'type' : 'long'
	}, {
		'name' : 'GrossWt',
		'type' : 'double'
	}, {
		'name' : 'NetWt',
		'type' : 'double'
	}, {
		'name' : 'vendorDueDate',
		'type' : 'date'
	}, {
		'name' : 'mivDate',
		'type' : 'date'
	}, {
		'name' : 'mivNo',
		'type' : 'long'
	} ];

	var columns = [
			{
				'text' : 'Vendor Code',
				'datafield' : 'vendorName',
				'width' : '14%',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				sortable : true
			},{
				'text' : 'Store/DC Name',
				'datafield' : 'storeName',
				'width' : '10%',
				cellsalign : 'left',
				align : 'center',
				editable : false,
				sortable : true
			},{
				'text' : 'Order Type',
				'datafield' : 'orderType',
				'width' : '5%',
				editable : false,
				sortable : true,
				cellsalign : 'center',
				align : 'center'
			},{
				'text' : 'PSR No.',
				'datafield' : 'psrNumber',
				'width' : '4%',
				editable : false,
				sortable : true,
				cellsalign : 'center',
				align : 'center'
			},{
				'text' : 'Order No.',
				'datafield' : 'orderNo',
				'width' : '6%',
				editable : false,
				sortable : true,
				cellsalign : 'center',
				align : 'center'
			},{
				'text' : 'Order Sl.',
				'datafield' : 'orderSlNo',
				'width' : '4%',
				editable : false,
				sortable : true,
				cellsalign : 'center',
				align : 'center'
			},{
				'text' : 'Order Kind',
				'datafield' : 'orderKind',
				'width' : '5%',
				editable : false,
				sortable : true,
				cellsalign : 'center',
				align : 'center'
			},{
				'text' : 'Jewel Name',
				'datafield' : 'JewelName',
				'width' : '6%',
				editable : false,
				sortable : false,
				cellsalign : 'center',
				align : 'center'
			},{
				'text' : 'Sub Cat.',
				'datafield' : 'subCategory',
				'width' : '10%',
				editable : false,
				sortable : false,
				cellsalign : 'left',
				align : 'center'
			},{
				'text' : 'Design Req',
				'datafield' : 'designYesorNo',
				'width' : '6%',
				editable : false,
				sortable : false,
				cellsalign : 'center',
				align : 'center'
			},{
				'text' : 'Design Ref No. ',
				'datafield' : 'designRefNo',
				'width' : '6%',
				editable : false,
				sortable : false,
				cellsalign : 'center',
				align : 'center'
			},{
				'text' : 'Pcs',
				'datafield' : 'Pieces',
				'width' : '4%',
				editable : false,
				sortable : false,
				cellsalign : 'center',
				align : 'center'
			},{
				'text' : 'Gross Wt. ',
				'datafield' : 'GrossWt',
				'width' : '6%',
				editable : false,
				sortable : false,
				cellsalign : 'right',
				cellsformat :'d3',
				align : 'center'
			},{
				'text' : 'Net Wt. ',
				'datafield' : 'NetWt',
				'width' : '6%',
				editable : false,
				sortable : false,
				cellsformat : 'd3',
				cellsalign : 'right',
				align : 'center'
			},{
				'text' : 'Vendor Due Dt.',
				'datafield' : 'vendorDueDate',
				'width' : '8%',
				editable : false,
				cellsformat : 'dd/MM/yyyy',
				sortable : false,
				cellsalign : 'center',
				align : 'center',
				cellsrenderer : function(row, columnfield, value, defaulthtml,
						columnproperties) {
					var gridDate = $.date(value);
					var gridDate2 = new Date(gridDate);
					var sysdate = new Date();
					var day = gridDate2.getDate();
					console.log(gridDate2);
					if (!isNaN(day)) {
						if (gridDate2.setHours(0, 0, 0, 0) < sysdate.setHours(
								0, 0, 0, 0)) {
							// float: ' + columnproperties.cellsalign + ';
							return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:40px;">'
									+ $.date2(gridDate) + '</div>';
						} else {
							return '<div style="text-align:center; margin: 0;  color: #000; padding-top:10px; height:40px;">'
									+ $.date2(gridDate) + '</div>';
						}
					}
				}
			}/*,{
				'text' : 'MIV Dt.',
				'datafield' : 'mivDate',
				'width' : '8%',
				editable : false,
				cellsformat : 'dd/MM/yyyy',
				sortable : false,
				cellsalign : 'center',
				align : 'center'
			},{
				'text' : 'MIV No.',
				'datafield' : 'mivNo',
				'width' : '6%',
				editable : false,
				sortable : false,
				cellsalign : 'center',
				align : 'center'
			}*/];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchPMWithVendorForFG", "list", columns, fgFieldFilters(), updateRows, "id");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,       
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

// On click on search button it will load grid
$('#PendingFg').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"vendorNameObj" : {
			required : true
		}
	},
	errorPlacement : function(error, element) {
		if (element.context.name == "vendorNameObj") {
			error.insertAfter(element.parent());
		} else {
			error.insertAfter(element);
		}
	},
	submitHandler : function(form) {
		fgGrid();
		$("#jqxgrid").show();
		return false;
	}
});


$("#stoneAccSeg").on('change',function(){
	if($("#stoneAccSeg").val() != ""){
		$("#stAccSeg").show();
	}else{
		$("#stAccSeg").hide();
	}
	
});


$("#searchSA").on('click',function(){
	var stAccSegS = $("#stoneAccSegmentObj").val();
	if($("#stoneAccSeg").val() != ""){
		if(stAccSegS == null){
			$("#jqxgrid").hide();
			$.growl.error({
				message : "Please Select Stone/Acc Segment !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	}
});

// Export function for Pending Fg
$("#exportFg").on("click",function() {
		var data;
	    var vendorCodeF = $('#vendorCodeF').val();
		var storeNameF = $('#storeNameF').val();
		var orderTypeF = $('#orderTypeF').val();
		var oKind = $('#oKind').val();
		var artSeg = $('#artSeg').val();
		  fieldFilters = {
			"fieldFilters" : {}
		  };
			var vendorNameObj = $('#vendorNameObj').val();
				if (vendorNameObj == null || vendorNameObj == "") {
					var vendorCodeF = "";
				} else {
					var vendorCodeF = vendorNameObj.join(",");
				}
			var storeCodeObj = $('#storeCodeObj').val();
				if (storeCodeObj == null || storeCodeObj == "") {
					var storeNameF = "";
				} else {
					var storeNameF = storeCodeObj.join(",");
				}
			var orderKindObj = $('#orderKindObj').val();
				if (orderKindObj == null || orderKindObj == "") {
					var oKind = "";
				} else {
					var oKind = orderKindObj.join(",");
				}
			var articleSegObj = $('#articleSegObj').val();
				if (articleSegObj == null || articleSegObj == "") {
					var artSeg = "";
				} else {
					var artSeg = articleSegObj.join(",");
				}
				if (vendorCodeF != "" && vendorCodeF != null) {
						fieldFilters.fieldFilters["vendorId"] = vendorCodeF;
				}
				if (storeNameF != "" && storeNameF != null) {
						fieldFilters.fieldFilters["storeId"] = storeNameF;
				}
				if (oKind != "" && oKind != null) {
						fieldFilters.fieldFilters["orderKind"] = oKind;
				}
				if (artSeg != "" && artSeg != null) {
						fieldFilters.fieldFilters["articleSegId"] = artSeg;
				}
				if (orderTypeF != "" && orderTypeF != null) {
						fieldFilters.fieldFilters["OrderType"] = orderTypeF;
				}
					fieldFilters.fieldFilters["psrStatus"] = "G,S,A";

					var sysdate = moment().format('DDMMYYYYHHmmSS');
					var rows = $("#jqxgrid").jqxGrid('getrows');
					 if(typeof rows == "undefined"){
						$.growl.error({
							message : "No Data to Export.",
							duration : 10000
						});
						return false;
						}else{			
							var rows = $("#jqxgrid").jqxGrid('getdatainformation');
							if(rows.rowscount != 0){
					var newData = [];
					postJSON('/OrderExecution/api/v1/exportPMWithVendorForFG',JSON.stringify(fieldFilters),function(response) {
						 if(response != null){

									data = response.payload.list;
									exportPendingMaterialsFG(data);
						 			}
		                      });
						      }else{
								  $.growl.error({
									message : "No Data to Export.",
									duration : 10000
								});
									return false;	
							}
						}
					});

// clear for the FG
$("#clearAllFg").on("click", function() {
	$('#vendorNameObj').multiselect("clearSelection");
	$('#storeCodeObj').multiselect("clearSelection");
	$('#orderKindObj').multiselect("clearSelection");
	$('#articleSegObj').multiselect("clearSelection");
	$('#ordTypObj').multiselect("clearSelection");
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
// Print Functionality to be done by Venkat
// #######################################
// Print Functionality to be done by Venkat
// #######################################
// This is print is for Stones And Accessory
$("#printSA").on(
		'click',
		function() {
			var vendorCodeObj = $('#vendorCodeObj').val();
			var orderTypeF = $('#orderTypeObj').val();
			if (vendorCodeObj == null || vendorCodeObj == "") {
				var vendorCodeS = 0;
			} else {
				var vendorCodeS = vendorCodeObj.join(",");
			}
			if (orderTypeF != "" && orderTypeF != null) {
				var orderTypeS = orderTypeF.join(",");
		}
			fieldFilters = {
				"fieldFilters" : {
					"vendorId" : vendorCodeS,
					"orderTypes" : orderTypeS,
					"mode" : "pdf",
					"reportName" : "RPT_Pending_Material_Stone_Accessory"
				}
			}
			$.ajax({
				url : 'jasperReport',
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
						navigator.msSaveBlob(file,
								'RPT_Pending_Material_Stone_Accessory.pdf');
					} else {
						var file = new Blob([ data ], {
							type : 'application/pdf'
						});
						var fileURL = URL.createObjectURL(file);
						window.open(fileURL);
					}
				}
			});

		});

// this print is for FG

$("#printFg").on('click', function() {
	var orderTypeF = $('#orderTypeF').val();
	var vendorNameObj = $('#vendorNameObj').val();
	if (vendorNameObj == null || vendorNameObj == "") {
		var vendorCodeF = "";
	} else {
		var vendorCodeF = vendorNameObj.join(",");
	}

	var storeCodeObj = $('#storeCodeObj').val();
	if (storeCodeObj == null || storeCodeObj == "") {
		var storeNameF = "";
	} else {
		var storeNameF = storeCodeObj.join(",");
	}

	var orderKindObj = $('#orderKindObj').val();
	if (orderKindObj == null || orderKindObj == "") {
		var oKind = "";
	} else {
		var oKind = orderKindObj.join(",");
	}

	var articleSegObj = $('#articleSegObj').val();
	if (articleSegObj == null || articleSegObj == "") {
		var artSeg = "";
	} else {
		var artSeg = articleSegObj.join(",");
	}
	fieldFilters = {
		"fieldFilters" : {
			"vendorId" : vendorCodeF,
			"storeId" : storeNameF,
			"orderTypes" : orderTypeF,
			"OrderKind" : oKind,
			"ArticleSegment" : artSeg,
			"mode" : "pdf",
			"reportName" : "RPT_Pending_Material_For_FG"
		}
	}
	$.ajax({
		url : 'jasperReport',
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
				navigator.msSaveBlob(file, 'RPT_Pending_Material_For_FG.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});

});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});
function exportPendingMaterialsFG(data)
{
	var sql0 = 'SEARCH / AS @pm \
		RETURN ( \
			   @pm->vendorName AS [Vendor Code], \
		       @pm->storeName AS [StoreName], \
			   @pm->orderType AS [Order Type], \
		       @pm->psrNumber AS [PSR No], \
		       @pm->orderNo AS [Order No], \
		       @pm->orderSlNo AS [OrderSlNo], \
		       @pm->orderKind AS [Order Kind], \
		       @pm->JewelName AS [Jewel Type], \
		       @pm->subCategory AS [Sub Category], \
		       @pm->designYesorNo AS [Design Y/N], \
		       @pm->designRefNo AS [Design Ref No], \
	           @pm->Pieces AS [Pieces], \
		       @pm->GrossWt AS [GrossWt],\
		       @pm->NetWt AS [Net Wt], \
		       @pm->vendorDueDate AS [Vendor Due Date]\
			) \
		FROM $0';

    var sql1 = 'SELECT * FROM ?';
    

 var res = null;
    
    var mystyle = {
      cellStyles: true,
      headers:true, 
      column: {style:{Font:{Bold:30}}},
      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
      cells: {1:{1:{
        style: {Font:{Color:"#00FFFF"}}
      }}}
    };
    
    try
    {
    
    	res0 = alasql(sql0,[data]);
    	res = alasql(sql1,[res0]);
    	adjustObjectKeys(res); 
    	removeNullData(res);
    	res = alasql("SELECT * INTO XLSX('PendingMaterialFG.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	alert(err.message);
    }
}

function exportPendingMaterialsSA(data)
{
	var sql0 = 'SEARCH / AS @pmsa \
		RETURN ( \
			   @pmsa->vendorName AS [Vendor Code], \
		       @pmsa->storeName AS [StoreName], \
			   @pmsa->orderType AS [Order Type], \
		       @pmsa->psrNumber AS [PSR No], \
		       @pmsa->orderNo AS [Order No], \
		       @pmsa->orderSlNo AS [OrderSlNo], \
		       @pmsa->orderKind AS [Order Kind], \
		       @pmsa->JewelName AS [Jewel Type], \
		       @pmsa->releaseDate AS [Release Date], \
		       @pmsa->noOfpendingDays AS [No of Days Pending With Vendor], \
		       @pmsa->stoneOrAccSegment AS [Stone Segment], \
	           @pmsa->stoneOrAccMainCat AS [Main Category], \
		       @pmsa->stoneOrAccSubCat AS [Sub Cat/Shape],\
		       @pmsa->articleCode AS [Article Code], \
		       @pmsa->weightRange AS [Weight Range],\
			   @pmsa->clarity AS [Clarity], \
		       @pmsa->actualColor AS [Actual Color], \
			   @pmsa->color AS [Color], \
		       @pmsa->cutGrade AS [Cut Grade], \
		       @pmsa->compOwner AS [Component Owner], \
		       @pmsa->stoneType AS [Stone Type], \
		       @pmsa->stoneOrAccPcs AS [Stone/Acc pcs], \
		       @pmsa->stoneOrAccWt AS [Stone/Acc Wt], \
		       @pmsa->uom AS [UQC], \
		       @pmsa->condition AS [Condition], \
		       @pmsa->mivDate AS [MIV Date], \
		       @pmsa->mivNo AS [MIV No]\
			) \
		FROM $0';
            	

    var sql1 = 'SELECT * FROM ?';
    

 var res = null;
    
    var mystyle = {
      cellStyles: true,
      headers:true, 
      column: {style:{Font:{Bold:30}}},
      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
      cells: {1:{1:{
        style: {Font:{Color:"#00FFFF"}}
      }}}
    };
    
    try
    {
    
    	res0 = alasql(sql0,[data]);
    	res = alasql(sql1,[res0]);
    	adjustObjectKeys(res); 
    	removeNullData(res);
    	res = alasql("SELECT * INTO XLSX('PendingMaterialSA.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	alert(err.message);
    }
}