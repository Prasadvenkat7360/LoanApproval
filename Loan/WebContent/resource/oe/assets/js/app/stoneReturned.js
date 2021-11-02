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

// date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	maxDate : 0, 
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});


// Field Filters
var stoneReturnFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var orderTypeS = $('#orderTypeS').val();
	var vendorCodeS = $('#vendorCodeS').val();
	var grNoS = $('#grNoS').val();
	var orderNoS = $('#orderNoS').val();
	var orderSlNoS = $('#orderSlNoS').val();
	var psrNoS = $('#psrNoS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (grNoS != "" && grNoS != null) {
		fieldFilters.fieldFilters["grNumber"] = grNoS;
	}
	if (orderNoS != "" && orderNoS != null) {
		fieldFilters.fieldFilters["orderNumber"] = orderNoS;
	}
	if (orderSlNoS != "" && orderSlNoS != null) {
		fieldFilters.fieldFilters["oSerialNo"] = orderSlNoS;
	}
	if (psrNoS != "" && psrNoS != null) {
		fieldFilters.fieldFilters["psrNo"] = psrNoS;
	}
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCodeS = "";
	} else {
		var vendorCodeS = vendorCodeObj.join(",");
	}
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vCode"] = vendorCodeS;
	}
	var orderTypeObj = $('#orderTypeObj').val();
	if (orderTypeObj == null || orderTypeObj == "") {
		var orderTypeS = "";
	} else {
		var orderTypeS = orderTypeObj.join(",");
	}
	if (orderTypeS != "" && orderTypeS != null) {
		fieldFilters.fieldFilters["oType"] = orderTypeS;
	}
	
	return fieldFilters;
}


//on load LOV for Vendor Code And Order Type
var onLoadFunction = function() {
		$.getJSON('/OrderExecution/api/v1/stoneReturnWastageOnloadLovs',function(data) {
					var vCode = data.payload.vlist;
					var oType = data.payload.oTypes;
					
						// Segment Lov
						var v = '<select id="vendorCodeObj"  name="vendorCodeObj" class="form-control" multiple="multiple">';
							$.each(vCode, function(key, val) {
							v += '<option value="' + val.vendorCode + '">' + val.vendorName + '</option>'; });
							v += '</select>';
							$("#vendorCodeS").html(v);
							$('#vendorCodeObj').multiselect({
							includeSelectAllOption : true,
							maxHeight : 250,
							//enableFiltering : true,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
							});
							
							var o = '<select id="orderTypeObj"  name="orderTypeObj" class="form-control" multiple="multiple">';
							$.each(oType, function(key, val) {
							o += '<option value="' + val.id + '">' + val.name + '</option>'; });
							o += '</select>';
							$("#orderTypeS").html(o);
							$('#orderTypeObj').multiselect({
							includeSelectAllOption : true,
							maxHeight : 250,
							//enableFiltering : true,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
							});
					});
			}
onLoadFunction();

function stoneReturneSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ {
		'name' : 'grDate',
		'type' : 'date',
		'map' : 'grDate'
	}, {
		'name' : 'orderType',
		'type' : 'string',
		'map' : 'orderType'
	}, {
		'name' : 'grNo',
		'type' : 'int',
		'map' : 'grNo'
	}, {
		'name' : 'grSlNo',
		'type' : 'int',
		'map' : 'grSrlNo'
	}, {
		'name' : 'vCode',
		'type' : 'string',
		'map' : 'vCode'
	},{
		'name' : 'orderNo',
		'type' : 'int',
		'map' : 'orderNumber'
	}, {
		'name' : 'orderSlNo',
		'type' : 'int',
		'map' : 'orderSrlNumber'
	}, {
		'name' : 'psrNo',
		'type' : 'int',
		'map' : 'psrNo'
	}, {
		'name' : 'stoneSlNo',
		'type' : 'int',
		'map' : 'stoneSrlNumber'
	}, {
		'name' : 'suppBy',
		'type' : 'string',
		'map' : 'suppBy'
	}, {
		'name' : 'stoneCode',
		'type' : 'string',
		'map' : 'stoneCode'
	}, {
		'name' : 'subCat',
		'type' : 'string',
		'map' : 'subCatDesc'
	}, {
		'name' : 'packetNo',
		'type' : 'int',
		'map' : 'pcketNo'
	}, {
		'name' : 'issuedPcs',
		'type' : 'int',
		'map' : 'issPcs'
	}, {
		'name' : 'issuedWt',
		'type' : 'double',
		'map' : 'issWt'
	}, {
		'name' : 'uqc',
		'type' : 'string',
		'map' : 'uqc'
	}, {
		'name' : 'usedPcs',
		'type' : 'int',
		'map' : 'usedPcs'
	}, {
		'name' : 'usedWt',
		'type' : 'double',
		'map' : 'usedWt'
	}, {
		'name' : 'retPcs',
		'type' : 'int',
		'map' : 'rtnpcs'
	}, {
		'name' : 'retWt',
		'type' : 'double',
		'map' : 'rtnWt'
	}, {
		'name' : 'brkPcsRcd',
		'type' : 'int',
		'map' : 'brkRcvdPcs'
	}, {
		'name' : 'brkWtRcd',
		'type' : 'double',
		'map' : 'brkRcvdWt'
	}, {
		'name' : 'brkPcsUnRcd',
		'type' : 'int',
		'map' : 'brkUnRevPcs'
	}, {
		'name' : 'brkWtUnRcd',
		'type' : 'double',
		'map' : 'brkUnRecWt'
	}, {
		'name' : 'stRate',
		'type' : 'double',
		'map' : 'stoneRate'
	}, {
		'name' : 'grEnteredBy',
		'type' : 'string',
		'map' : 'grEntrBy'
	}];

	var columns = [ {
		'text' : 'GR Date',
		'datafield' : 'grDate',
		'width' : '5%',
		editable : false,
		cellsalign : 'left',
		align : 'center',
		sortable : true,
		cellsformat : 'dd/MM/yyyy'
	}, {
		'text' : 'Order Type',
		'datafield' : 'orderType',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'GR No',
		'datafield' : 'grNo',
		'width' : '3.5%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'GR Sl No.',
		'datafield' : 'grSlNo',
		'width' : '3%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vCode',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Order No',
		'datafield' : 'orderNo',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Order Sl No',
		'datafield' : 'orderSlNo',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'PSR No',
		'datafield' : 'psrNo',
		'width' : '4%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Stone Sl No',
		'datafield' : 'stoneSlNo',
		'width' : '5%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Stone Supplied By',
		'datafield' : 'suppBy',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Stone Code',
		'datafield' : 'stoneCode',
		'width' : '4.5%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Stone Sub Cat',
		'datafield' : 'subCat',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsalign : 'left',
		align : 'center'
	}, {
		'text' : 'Stone Packet No ',
		'datafield' : 'packetNo',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Issued Pcs',
		'datafield' : 'issuedPcs',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Issued Wt',
		'datafield' : 'issuedWt',
		'width' : '4.5%',
		editable : false,
		sortable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
	}, {
		'text' : 'UQC',
		'datafield' : 'uqc',
		'width' : '3%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Used Pcs',
		'datafield' : 'usedPcs',
		'width' : '3.5%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Used Wt	',
		'datafield' : 'usedWt',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
	}, {
		'text' : 'Return Pcs',
		'datafield' : 'retPcs',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Return Wt',
		'datafield' : 'retWt',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
	}, {
		'text' : 'Break Pcs Received',
		'datafield' : 'brkPcsRcd',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Break Wt Received',
		'datafield' : 'brkWtRcd',
		'width' : '5%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
	}, {
		'text' : 'Break Pcs Un-Received',
		'datafield' : 'brkPcsUnRcd',
		'width' : '5%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false
	}, {
		'text' : 'Break Wt Un-Received',
		'datafield' : 'brkWtUnRcd',
		'width' : '5%',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		cellsformat : 'd3',
	}, {
		'text' : 'Stone Rate',
		'datafield' : 'stRate',
		'width' : '5%',
		cellsformat : 'd2',
		editable : false,
		sortable : false,
		cellsalign : 'right',
		align : 'center'
	}, {
		'text' : 'GR Entered By',
		'datafield' : 'grEnteredBy',
		'width' : '3%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'

	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchStoneReturnWastage","list", columns, stoneReturnFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
     	autorowheight :true,
        autoheight :true,
        columnsheight: 100,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

//Search Functionality
$("#search").on('click', function() {
	$form = $('#stoneReturnedForm');
    $form.validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	 "fromDateS":{ required: true, dateITA : true},
	    	 "toDateS":{ required: true, dateITA : true},
	    	 "grNoS":{ digits: true },
	    	 "orderNoS":{ digits: true },
	    	 "orderSlNoS":{ digits: true },
	    	 "psrNoS":{ digits: true },
        },errorPlacement: function(error, element) {
        	if(element.context.name == "fromDateS" || element.context.name == "toDateS"){
        		error.insertAfter(element.parent());
        	}else{
        		error.insertAfter(element);
        	}
        }
    });
    if ($form.valid()) {
    	 stoneReturneSearchGrid();
		 $("#jqxgrid").show();
    } else {
    	 return false;
    }
    return false;
 });


//###################### Export functionality #######################
$("#export").on("click",function() {
			var data;
		    var newData = [];
		    var fromDateS = $('#fromDateS').val();
			var toDateS = $('#toDateS').val();
			var orderTypeS = $('#orderTypeS').val();
			var vendorCodeS = $('#vendorCodeS').val();
			var grNoS = $('#grNoS').val();
			var orderNoS = $('#orderNoS').val();
			var orderSlNoS = $('#orderSlNoS').val();
			var psrNoS = $('#psrNoS').val();
			
			fieldFilters = {
				"fieldFilters" : {}
			};
			if (fromDateS != "" && fromDateS != null) {
				fieldFilters.fieldFilters["fromDate"] = fromDateS;
			}
			if (toDateS != "" && toDateS != null) {
				fieldFilters.fieldFilters["toDate"] = toDateS;
			}
			if (grNoS != "" && grNoS != null) {
				fieldFilters.fieldFilters["grNumber"] = grNoS;
			}
			if (orderNoS != "" && orderNoS != null) {
				fieldFilters.fieldFilters["orderNumber"] = orderNoS;
			}
			if (orderSlNoS != "" && orderSlNoS != null) {
				fieldFilters.fieldFilters["oSerialNo"] = orderSlNoS;
			}
			if (psrNoS != "" && psrNoS != null) {
				fieldFilters.fieldFilters["psrNumber"] = psrNoS;
			}
			var vendorCodeObj = $('#vendorCodeObj').val();
			if (vendorCodeObj == null || vendorCodeObj == "") {
				var vendorCodeS = "";
			} else {
				var vendorCodeS = vendorCodeObj.join(",");
			}
			if (vendorCodeS != "" && vendorCodeS != null) {
				fieldFilters.fieldFilters["vCode"] = vendorCodeS;
			}
			var orderTypeObj = $('#orderTypeObj').val();
			if (orderTypeObj == null || orderTypeObj == "") {
				var orderTypeS = "";
			} else {
				var orderTypeS = orderTypeObj.join(",");
			}
			if (orderTypeS != "" && orderTypeS != null) {
				fieldFilters.fieldFilters["oType"] = orderTypeS;
			}
			
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
     					postJSON('/OrderExecution/api/v1/exportStoneReturnWastage',JSON.stringify(fieldFilters),function(response) {
					   if(response != null){
                       data = response.payload.list;
                       for (i = 0; i < data.length; i++) {
						newData.push({
							'GR Date' : (data[i].grDate != null) ? data[i].grDate : "",
							'Order Type' : (data[i].orderType != null) ? data[i].orderType : "",
							'GR No' : (data[i].grNo!= null) ? data[i].grNo  : "",		
							'GR Sl No' : (data[i].grSrlNo!= null) ? data[i].grSrlNo  : "",
							'Vendor Code' : (data[i].vCode != null) ? data[i].vCode : "",
							'Order No' : (data[i].orderNumber != null) ? data[i].orderNumber : "",
							'Order Sl No' : (data[i].orderSrlNumber != null) ? data[i].orderSrlNumber : "",
							'PSR No' : (data[i].psrNo != null) ? data[i].psrNo : "",		
							'Stone Sl No' : (data[i].stoneSrlNumber != null) ? data[i].stoneSrlNumber : "",	
							'Stone Supplied By' : (data[i].suppBy != null) ? data[i].suppBy : "",
							'Stone Code' : (data[i].stoneCode != null) ? data[i].stoneCode : "",
							'Stone Sub Cat' : (data[i].subCatDesc!= null) ? data[i].subCatDesc  : "",		
							'Stone Packet No' : (data[i].pcketNo!= null) ? data[i].pcketNo  : "",
							'Issued Pcs' : (data[i].issPcs != null) ? data[i].issPcs : "",
							'Issued Wt' : (data[i].issWt != null) ? data[i].issWt : "",
							'UQC' : (data[i].uqc != null) ? data[i].uqc : "",
							'Used Pcs' : (data[i].usedPcs != null) ? data[i].usedPcs : "",		
							'Used Wt' : (data[i].usedWt != null) ? data[i].usedWt : "",	
						    'Return Pcs' : (data[i].rtnpcs != null) ? data[i].rtnpcs : "",
							'Return Wt' : (data[i].rtnWt != null) ? data[i].rtnWt : "",
							'Break Pcs Received' : (data[i].brkRcvdPcs!= null) ? data[i].brkRcvdPcs  : "",		
							'Break Wt Received' : (data[i].brkRcvdWt!= null) ? data[i].brkRcvdWt  : "",
							'Break Pcs Un-Received' : (data[i].brkUnRevPcs != null) ? data[i].brkUnRevPcs : "",
							'Break Wt Un-Received' : (data[i].brkUnRecWt != null) ? data[i].brkUnRecWt : "",
							'Stone Rate' : (data[i].stoneRate != null) ? data[i].stoneRate : "",
							'GR Entered By' : (data[i].grEntrBy != null) ? data[i].grEntrBy : "",								
                           });
								
                       }
                      // JSONToCSVConvertor(newData, "Stone_Returned_Wastage_Received_&_Wastage_Un-Received" + "_" + sysdate, true);
                       var opts = [{sheetid:'Stone_Returned_Wastage_Received_&_Wastage_Un-Received',header:true}];
                       var res = alasql('SELECT * INTO XLSX("Stone Returned Wastage Received & Wastage Un-Received_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

//Clear grid and reset input and Drop down value
$('#clearAll').on('click', function() {
	$('#orderTypeObj').multiselect("clearSelection");
	$('#vendorCodeObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//Print Functionality to be done by Venkat
//#######################################
$("#printstr").on('click', function() {
	 var fromDateS = $('#fromDateS').val();
		var toDateS = $('#toDateS').val();
		var orderTypeS = $('#orderTypeS').val();
		var vendorCodeS = $('#vendorCodeS').val();
		var grNoS = $('#grNoS').val();
		var orderNoS = $('#orderNoS').val();
		var orderSlNoS = $('#orderSlNoS').val();
		var psrNoS = $('#psrNoS').val();
		
		fieldFilters = {
			"fieldFilters" : {}
		};
		if (fromDateS != "" && fromDateS != null) {
			fieldFilters.fieldFilters["fromDate"] = fromDateS;
		}
		if (toDateS != "" && toDateS != null) {
			fieldFilters.fieldFilters["toDate"] = toDateS;
		}
		if (grNoS != "" && grNoS != null) {
			fieldFilters.fieldFilters["grNumber"] = grNoS;
		}
		if (orderNoS != "" && orderNoS != null) {
			fieldFilters.fieldFilters["orderNumber"] = orderNoS;
		}
		if (orderSlNoS != "" && orderSlNoS != null) {
			fieldFilters.fieldFilters["oSerialNo"] = orderSlNoS;
		}
		if (psrNoS != "" && psrNoS != null) {
			fieldFilters.fieldFilters["psrNumber"] = psrNoS;
		}
		var vendorCodeObj = $('#vendorCodeObj').val();
		if (vendorCodeObj == null || vendorCodeObj == "") {
			var vendorCodeS = "";
		} else {
			var vendorCodeS = vendorCodeObj.join(",");
		}
		if (vendorCodeS != "" && vendorCodeS != null) {
			fieldFilters.fieldFilters["vCode"] = vendorCodeS;
		}
		var orderTypeObj = $('#orderTypeObj').val();
		if (orderTypeObj == null || orderTypeObj == "") {
			var orderTypeS = "";
		} else {
			var orderTypeS = orderTypeObj.join(",");
		}
		if (orderTypeS != "" && orderTypeS != null) {
			fieldFilters.fieldFilters["oType"] = orderTypeS;
		}
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateS,
			"ToDate" : toDateS,
			"grNo" : grNoS,
			"orderId":orderNoS,
			"oItemSrlNo":orderSlNoS,
			"orderTypes":orderTypeS,
			"grPsrNo":psrNoS,
			"vendorCode":vendorCodeS,
			"mode" : "pdf",
			"reportName" : "RPT_Stone_Return_Wastage"
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
				navigator.msSaveBlob(file, 'RPT_Stone_Return_Wastage.pdf');
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

