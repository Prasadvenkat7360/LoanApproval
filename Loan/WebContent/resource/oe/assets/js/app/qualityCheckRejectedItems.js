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
});


//on load LOV for Vendor Code, Article Segment,Location and MIV Types 
var onLoadFunction = function() {
		$.getJSON('/OrderExecution/api/v1/qcRejectedLOV',function(data) {
					var vCode = data.payload.vendors;
					var artSeg = data.payload.articleMasters;
					var loc = data.payload.metalAccounts;
					
						// Vendor Code LOV
						var v = '<select id="vendorCodeObj"  name="vendorCodeObj" class="form-control" multiple="multiple">';
							$.each(vCode, function(key, val) {
							v += '<option value="' + val.id + '">'+ val.name + '-' + val.description + '</option>'; });
							v += '</select>';
							$("#vendorCodeS").html(v);
							$('#vendorCodeObj').multiselect({
							includeSelectAllOption : true,
							maxHeight : 250,
							enableCaseInsensitiveFiltering:true,
							enableFiltering : true,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
							});
							
					   // Article Segment LOV		
							var s = '<select id="artSegObj"  name="artSegObj" class="form-control" multiple="multiple">';
							$.each(artSeg, function(key, val) {
							s += '<option value="' + val.id + '">' + val.description + '</option>'; });
							s += '</select>';
							$("#artSegS").html(s);
							$('#artSegObj').multiselect({
							includeSelectAllOption : true,
							maxHeight : 250,
							enableFiltering : true,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
							});
							
						/*// Location LOV		
							var l = '<select id="locationObj"  name="locationObj" class="form-control" multiple="multiple">';
							$.each(loc, function(key, val) {
							l += '<option value="' + val.id + '">' + val.description + '</option>'; });
							l += '</select>';
							$("#locS").html(l);
							$('#locationObj').multiselect({
							includeSelectAllOption : true,
							maxHeight : 250,
							enableFiltering : true,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
							});*/
							
						// MIV Types	
							$('#mivTypeS').empty().append('<option value="" selected>--Select--</option>');
							$.each(data.payload.jwtypes, function(key, val) {
							$('#mivTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');	
						});				
					});
			    }

onLoadFunction();


//Field Filters
var qcRejectItemsFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var mivTypeS = $('#mivTypeS').val();
	var vendorCodeS = $('#vendorCodeS').val();
	var mivNoS = $('#mivNoS').val();
	var psrNoS = $('#psrNoS').val();
	//var locS = $('#locS').val();
	var artSegS = $('#artSegS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromdate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (mivTypeS != "" && mivTypeS != null) {
		fieldFilters.fieldFilters["mivtype"] = mivTypeS;
	}
	if (mivNoS != "" && mivNoS != null) {
		fieldFilters.fieldFilters["givNo"] = mivNoS;
	}
	if (psrNoS != "" && psrNoS != null) {
		fieldFilters.fieldFilters["psrno"] = psrNoS;
	}
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCodeS = "";
	} else {
		var vendorCodeS = vendorCodeObj.join(",");
	}
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendor"] = vendorCodeS;
	}
	var artSegObj = $('#artSegObj').val();
	if (artSegObj == null || artSegObj == "") {
		var artSegS = "";
	} else {
		var artSegS = artSegObj.join(",");
	}
	if (artSegS != "" && artSegS != null) {
		fieldFilters.fieldFilters["articledesc"] = artSegS;
	}
	/*var locationObj = $('#locationObj').val();
	if (locationObj == null || locationObj == "") {
		var locS = "";
	} else {
		var locS = locationObj.join(",");
	}
	if (locS != "" && locS != null) {
		fieldFilters.fieldFilters["location"] = locS;
	}*/
	
	return fieldFilters;
}


function qcRejectedItemSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ {
		'name' : 'vendor',
		'type' : 'string',
		'map' : 'vendorCode'
	}, {
		'name' : 'mivDate',
		'type' : 'date',
		'map' : 'mivDate'
	}, {
		'name' : 'givNo',
		'type' : 'int',
		'map' : 'mivNo'
	}, {
		'name' : 'mivType',
		'type' : 'string',
		'map' : 'mivType'
	}, {
		'name' : 'artSeg',
		'type' : 'string',
		'map' : 'articleSegment'
	},{
		'name' : 'loc',
		'type' : 'string',
		'map' : 'location'
	}, {
		'name' : 'refNo',
		'type' : 'int',
		'map' : 'refno'
	}, {
		'name' : 'refSlNo',
		'type' : 'int',
		'map' : 'refsrlNo'
	}, {
		'name' : 'psrNo',
		'type' : 'int',
		'map' : 'psrNo'
	}, {
		'name' : 'partyBillNo',
		'type' : 'int',
		'map' : 'partyBilNo'
	}, {
		'name' : 'partyBillDate',
		'type' : 'date',
		'map' : 'billDate'
	}, {
		'name' : 'sPurity',
		'type' : 'float',
		'map' : 'skinPurity'
	}, {
		'name' : 'pcs',
		'type' : 'int',
		'map' : 'pcs'
	}, {
		'name' : 'grossWt',
		'type' : 'float',
		'map' : 'grossWeight'
	}, {
		'name' : 'netWt',
		'type' : 'float',
		'map' : 'netWt'
	}, {
		'name' : 'reason',
		'type' : 'string',
		'map' : 'reasonforReturn'
	}, {
		'name' : 'mivRaisedBy',
		'type' : 'string',
		'map' : 'mivraisedBy'
	}];

	var columns = [ {
		'text' : 'Vendor Code',
		'datafield' : 'vendor',
		'width' : '6%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : true,
	}, {
		'text' : 'GIV Date',
		'datafield' : 'mivDate',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		cellsformat : 'dd/MM/yyyy',
		sortable : false
	}, {
		'text' : 'GIV No',
		'datafield' : 'givNo',
		'width' : '4%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'GIV Type',
		'datafield' : 'mivType',
		'width' : '5%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Article Description',
		'datafield' : 'artSeg',
		'width' : '12%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Location',
		'datafield' : 'loc',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Ref No',
		'datafield' : 'refNo',
		'width' : '4%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Ref Sl No',
		'datafield' : 'refSlNo',
		'width' : '4%',
		editable : false,
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'PSR No',
		'datafield' : 'psrNo',
		'width' : '5%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			var psrNo = $('#jqxgrid').jqxGrid('getcellvalue', row, 'psrNo');
			if(psrNo == null || psrNo == ""){
				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + "None"  + '</div>';
			}else{
				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + psrNo  + '</div>';
			}
			
		 }
	}, {
		'text' : 'Party Bill No',
		'datafield' : 'partyBillNo',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Party Bill Date',
		'datafield' : 'partyBillDate',
		'width' : '6%',
		editable : false,
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Skin Purity',
		'datafield' : 'sPurity',
		'width' : '6%',
		editable : false,
		sortable : false,
		cellsformat : 'd2',
		cellsalign : 'right',
		align : 'center'
	}, {
		'text' : 'Pcs',
		'datafield' : 'pcs',
		'width' : '4%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		  aggregates: [{          
    		  'Total': function(aggregatedValue, currentValue, column, record) {
				  var total = (record['pcs'] == null) ? 0 : record['pcs'];
    			  return aggregatedValue + total;
    		  }
    	  }],
    	  aggregatesrenderer: function(aggregates) {        		 
          		if(typeof aggregates["Total"] == "undefined"){
      				return '0.00';
      		  	}else{
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      		  	}
    	  }
	}, {
		'text' : 'Gross Wt',
		'datafield' : 'grossWt',
		'width' : '6%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		aggregates: [{          
  		  'Total': function(aggregatedValue, currentValue, column, record) {
				  var total = (record['grossWt'] == null) ? 0 : record['grossWt'];
  			  return aggregatedValue + total;
  		  }
  	  }],
  	  aggregatesrenderer: function(aggregates) {        		 
        		if(typeof aggregates["Total"] == "undefined"){
    				return '0.00';
    		  	}else{
    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
    		  	}
  	  }
	}, {
		'text' : 'Net Wt',
		'datafield' : 'netWt',
		'width' : '6%',
		editable : false,
		sortable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		aggregates: [{          
  		  'Total': function(aggregatedValue, currentValue, column, record) {
				  var total = (record['netWt'] == null) ? 0 : record['netWt'];
  			  return aggregatedValue + total;
  		  }
  	  }],
  	  aggregatesrenderer: function(aggregates) {        		 
        		if(typeof aggregates["Total"] == "undefined"){
    				return '0.00';
    		  	}else{
    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
    		  	}
  	  }
	}, {
		'text' : 'Reason For Return',
		'datafield' : 'reason',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsalign : 'left',
		align : 'center'
	}, {
		'text' : 'GIV Raised By',
		'datafield' : 'mivRaisedBy',
		'width' : '8%',
		editable : false,
		sortable : false,
		cellsalign : 'center',
		align : 'center'
	}];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchRejectedStoneinQc","list", columns, qcRejectItemsFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
        showstatusbar: true,
 	    statusbarheight: 20,
 	    showaggregates: true,
	});
}


//###################### Export functionality #######################
$("#export").on("click",function() {
	var data;
    var newData = [];
	var fieldFilters = qcRejectItemsFieldFilters();
	
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
				postJSON('/OrderExecution/api/v1/exportRejectedStoneinQc',JSON.stringify(fieldFilters),function(response) {
			   if(response != null){
               data = response.payload.list;
               for (i = 0; i < data.length; i++) {
				newData.push({
					'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode : "",
					'GIV Date' : (data[i].mivDate != null) ? data[i].mivDate : "",
					'GIV No' : (data[i].mivNo!= null) ? data[i].mivNo  : "",		
					'GIV Type' : (data[i].mivType!= null) ? data[i].mivType  : "",
					'Article Description' : (data[i].articleSegment != null) ? data[i].articleSegment : "",
					'Location' : (data[i].location != null) ? data[i].location : "",
					'Ref No' : (data[i].refno != null) ? data[i].refno : "",
					'Ref Sl No' : (data[i].refsrlNo != null) ? data[i].refsrlNo : "",		
					'PSR No' : (data[i].psrNo != null) ? data[i].psrNo : "",	
					'Party Bill' : (data[i].partyBilNo != null) ? data[i].partyBilNo : "",
					'Party Bill Date' : (data[i].billDate != null) ? data[i].billDate : "",
					'Skin Purity' : (data[i].skinPurity!= null) ? data[i].skinPurity  : "",		
					'Pcs' : (data[i].pcs!= null) ? data[i].pcs  : "",
					'Gross Wt' : (data[i].grossWeight != null) ? data[i].grossWeight : "",
					'Net Wt' : (data[i].netWt != null) ? data[i].netWt : "",
					'Reason For Return' : (data[i].reasonforReturn != null) ? data[i].reasonforReturn : "",
					'GIV Raised By' : (data[i].mivraisedBy != null) ? data[i].mivraisedBy : "",									
                   });
               }
               var opts = [{sheetid:'QC_Rejected_Item_Details',header:true}];
	           var res = alasql('SELECT * INTO XLSX("QC_Rejected_Item_Details'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
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


// Search Functionality
$("#search").on('click', function() {
	$form = $('#qcRejectedItemsDetForm');
    $form.validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	 "fromDateS":{ required: true, dateITA : true},
	    	 "toDateS":{ required: true, dateITA : true},
	    	 "mivNoS":{ digits: true },
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
    	qcRejectedItemSearchGrid();
		$("#jqxgrid").show();
    } else {
    	 return false;
    }
    return false;
 });


//Clear grid and reset input and Drop down value
$('#clearAll').on('click', function() {
	$('#vendorCodeObj').multiselect("clearSelection");
	$('#artSegObj').multiselect("clearSelection");
	$('#locationObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
//Print Functionality to be done by Venkat
//#######################################
$("#printQCRJItems").on('click', function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var mivTypeS = $('#mivTypeS').val();
	var vendorCodeS = $('#vendorCodeS').val();
	var mivNoS = $('#mivNoS').val();
	var psrNoS = $('#psrNoS').val();
	var locS = $('#locS').val();
	var artSegS = $('#artSegS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromdate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (mivTypeS != "" && mivTypeS != null) {
		fieldFilters.fieldFilters["mivtype"] = mivTypeS;
	}
	if (mivNoS != "" && mivNoS != null) {
		fieldFilters.fieldFilters[""] = mivNoS;
	}
	if (psrNoS != "" && psrNoS != null) {
		fieldFilters.fieldFilters["psrno"] = psrNoS;
	}
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCodeS = "";
	} else {
		var vendorCodeS = vendorCodeObj.join(",");
	}
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendor"] = vendorCodeS;
	}
	var artSegObj = $('#artSegObj').val();
	if (artSegObj == null || artSegObj == "") {
		var artSegS = "";
	} else {
		var artSegS = artSegObj.join(",");
	}
	if (artSegS != "" && artSegS != null) {
		fieldFilters.fieldFilters["articledesc"] = artSegS;
	}
	var locationObj = $('#locationObj').val();
	if (locationObj == null || locationObj == "") {
		var locS = "";
	} else {
		var locS = locationObj.join(",");
	}
	if (locS != "" && locS != null) {
		fieldFilters.fieldFilters["location"] = locS;
	}
	
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateS,
			"ToDate" : toDateS,
			"locationCode":locS,
			"MivType":mivTypeS,
			"grPsrNo":psrNoS,
			"SegmentId":artSegS,
			"vendorId":vendorCodeS,
			"mode" : "pdf",
			"reportName" : "RPT_QC_Rejected_Items"
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
				navigator.msSaveBlob(file, 'RPT_QC_Rejected_Items.pdf');
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

