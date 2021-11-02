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
	maxDate : 0
});

var storeId;
//on load LOV for Metal Segment
var onLoadFunction = function() {
		$.getJSON('/OrderExecution/api/v1/onloadMetalRateQuery',function(data) {
					var seg = data.payload.metalSegments;
					storeId = data.payload.storeId;
						// Segment Lov
						var s = '<select id="segmentObj"  name="segmentObj" class="form-control" multiple="multiple">';
							$.each(seg, function(key, val) {
							s += '<option value="' + val.id + '">' + val.description + '</option>'; });
							s += '</select>';
							$("#metalSegS").html(s);
							$('#segmentObj').multiselect({
							includeSelectAllOption : true,
							maxHeight : 250,
							//enableFiltering : true,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
							});
					});
			}
onLoadFunction();


//Metal Rate Query Field Filters
var metalRateQueryFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var metalSegS = $('#metalSegS').val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	var segmentObj = $('#segmentObj').val();
	if (segmentObj == null || segmentObj == "") {
		var metalSegS = "";
	} else {
		var metalSegS = segmentObj.join(",");
	}
	if (metalSegS != "" && metalSegS != null) {
		fieldFilters.fieldFilters["segmentCode"] = metalSegS;
	}
	return fieldFilters;
}

//############### Metal Rate Query Search Grid ################## 
function metalRateQueryGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' : 'fromDate',
		'type' : 'string',
		'map' : 'date'
	}, {
		'name' : 'time',
		'type' : 'string',
		'map' : 'time'
	}, {
		'name' : 'purity',
		'type' : 'long',
		'map' : 'purity'
	}, {
		'name' : 'costPrice',
		'type' : 'long',
		'map' : 'costPrice'
	}, {
		'name' : 'sellingPrice',
		'type' : 'long',
		'map' :'sellingprice'
	}, {
		'name' : 'segment',
		'type' : 'string',
		'map' : 'segmentDTO>description'
	},
	{
		'name' : 'CustomerPurchaseRate',
		'type' : 'string',
		'map' : 'customerPurchaseRate'
	}
	
	];
	var columns = [{
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '14%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Purity',
		'datafield' : 'purity',
		'width' : '12%',
		cellsalign : 'right',
		align : 'center',
		sortable : true,
		editable : false,
		cellsformat : 'd2'
	},{
		'text' : 'Date',
		'datafield' : 'fromDate',
		'width' : '16%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false,
		cellsformat : 'dd/MM/yyyy'
	}, {
		'text' : 'Time',
		'datafield' : 'time',
		'width' : '16%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Cost Price',
		'datafield' : 'costPrice',
		'width' : '14%',
		cellsalign : 'right',
		align : 'center',
		sortable : true,
		editable : false,
		cellsformat : 'd2'
	}, 
	
	{
		'text' : 'Selling Price',
		'datafield' : 'sellingPrice',
		'width' : '14%',
		sortable : true,
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2'
	},
	{
		'text' : 'Customer Purchase Rate',
		'datafield' : 'CustomerPurchaseRate',
		'width' : '14%',
		sortable : true,
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2'
	}
	
	];
	showMyGrid(datafields,"/OrderExecution/api/v1/metalRateQueryList", "list",columns, metalRateQueryFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 45,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true,
	});
}

//Search Validation
$('#metalRateQueryForm').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"fromDateS":{ required: true, dateITA : true},
    	"toDateS":{ required: true, dateITA : true},
    	"segmentObj" : { required : true }
	   },
		errorPlacement : function(error, element) {
    	if(element.context.name == "fromDateS" || element.context.name == "toDateS" || element.context.name == "segmentObj"){
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler : function(form) {
			 metalRateQueryGrid();
			 $("#jqxgrid").show();
				return false;
			}
		});


//###################### Metal Rate Query Export functionality #######################
$("#export").on("click",function() {
			var data;
		    var newData = [];
		    var fromDateS = $('#fromDateS').val();
			var toDateS = $('#toDateS').val();
			var metalSegS = $('#metalSegS').val();
			fieldFilters = {
				"fieldFilters" : {},
				"sortingFields" : {
					"fromDate" : true
				}
			};
			if (fromDateS != "" && fromDateS != null) {
				fieldFilters.fieldFilters["fromDate"] = fromDateS;
			}
			if (toDateS != "" && toDateS != null) {
				fieldFilters.fieldFilters["toDate"] = toDateS;
			}
			var segmentObj = $('#segmentObj').val();
			if (segmentObj == null || segmentObj == "") {
				var metalSegS = "";
			} else {
				var metalSegS = segmentObj.join(",");
			}
			if (metalSegS != "" && metalSegS != null) {
				fieldFilters.fieldFilters["segmentCode"] = metalSegS;
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
     					postJSON('/OrderExecution/api/v1/metalRateQueryExportList',JSON.stringify(fieldFilters),function(response) {
					   if(response != null){
                       data = response.payload.list;
                       for (i = 0; i < data.length; i++) {
						newData.push({
							'Segment' : (data[i].segmentDTO != null) ? data[i].segmentDTO.description : "",
							'Purity' : (data[i].purity!= null) ? data[i].purity  : "",	
							'Date' : (data[i].date != null) ? data[i].date : "",
							'Time' : (data[i].time != null) ? data[i].time : "",	
							'Cost Price' : (data[i].costPrice!= null) ? data[i].costPrice  : "",
							'Selling Price' : (data[i].sellingprice != null) ? data[i].sellingprice : "",
							'Customer Purchase Rate' : (data[i].customerPurchaseRate != null) ? data[i].customerPurchaseRate : "",
                           });
								
                       }
                       //JSONToCSVConvertor(newData, "Metal Rate Query" + "_" + sysdate, true);
                       var opts = [{sheetid:'Metal_Rate_Query',header:true}];
                       var res = alasql('SELECT * INTO XLSX("Metal Rate Query'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
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
	$('#segmentObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//Print Functionality to be done by Venkat
//#######################################
$("#printmrq").on('click', function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var metalSegS = $('#metalSegS').val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	var segmentObj = $('#segmentObj').val();
	if (segmentObj == null || segmentObj == "") {
		var metalSegS = "";
	} else {
		var metalSegS = segmentObj.join(",");
	}
	if (metalSegS != "" && metalSegS != null) {
		fieldFilters.fieldFilters["segmentCode"] = metalSegS;
	}
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateS,
			"ToDate" : toDateS,
			"SegmentId" : metalSegS,
			"storeId" : storeId,
			"mode" : "pdf",
			"reportName" : "RPT_Metal_Rate_Query"
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
				navigator.msSaveBlob(file, 'RPT_Metal_Rate_Query.pdf');
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
