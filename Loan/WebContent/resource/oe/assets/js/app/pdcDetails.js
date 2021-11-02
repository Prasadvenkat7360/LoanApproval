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
$("#chequeDateFromS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#chequeDateToS").datepicker('option', 'minDate', min || '0');
    }
});
var updates = new Object();
$("#chequeDateToS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});


// on load LOV for Status and Store Name
var onLoadFunction = function() {
		$.getJSON('/OrderExecution/api/v1/postDatedChequesLOV?portal=Oe',function(data) {
					var StatusList = data.payload.StatusList;
					var slist = data.payload.storeList;
					
						// Stores Names Lov
						var s = '<select id="storeNameObj"  name="storeNameObj" class="form-control" multiple="multiple">';
							$.each(slist, function(key, val) {
							s += '<option value="' + val.id + '">' + val.name + '</option>'; });
							s += '</select>';
							$("#storeIdS").html(s);
							$('#storeNameObj').multiselect({
							includeSelectAllOption : true,
							maxHeight : 250,
							//enableFiltering : true,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
							});

							// Cheque status Lov
							var c = '<select id="statusObj" name="statusObj" class="form-control" multiple="multiple">';
								$.each(StatusList, function(key, val) {
								c += '<option value="' + val.id + '">' + val.name + '</option>'; });
								c += '</select>';
								$("#statusS").html(c);
								$('#statusObj').multiselect({
								includeSelectAllOption : true,
								maxHeight : 250,
								enableFiltering : true,
								numberDisplayed : 1,
								buttonClass : 'col-md-12 form-control text-left'
								});
						});
			}

onLoadFunction();


// Post Dated Cheques Field Filters
var pdcFieldFilters = function() {
	var chequeDateFromS = $('#chequeDateFromS').val();
	var chequeDateToS = $('#chequeDateToS').val();
	var statusS = $('#statusS').val();
	var storeIdS = $('#storeIdS').val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (chequeDateFromS != "" && chequeDateFromS != null) {
		fieldFilters.fieldFilters["fromDate"] = chequeDateFromS;
	}
	if (chequeDateToS != "" && chequeDateToS != null) {
		fieldFilters.fieldFilters["toDate"] = chequeDateToS;
	}
	var statusObj = $('#statusObj').val();
	if (statusObj == null || statusObj == "") {
		var statusS = "";
	} else {
		var statusS = statusObj.join(",");
	}
	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var storeIdS = "";
	} else {
		var storeIdS = storeNameObj.join(",");
	}
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["pdcStatus"] = statusS;
	}
	if (storeIdS != "" && storeIdS != null) {
		fieldFilters.fieldFilters["storeId"] = storeIdS;
	}
	
	fieldFilters.fieldFilters["portal"] = "Oe";
	
	return fieldFilters;
}

//###############  PDC Search Grid ################## 
function pdcSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' : 'store',
		'type' : 'string',
		'map' : 'store>name'
	}, {
		'name' : 'savingsPlanNo',
		'type' : 'int',
		'map' : 'savingsPlanNo'
	}, {
		'name' : 'custId',
		'type' : 'int',
		'map' : 'customer>id'
	}, {
		'name' : 'custName',
		'type' : 'string',
		'map' : 'customer>name'
	}, {
		'name' : 'installmentNo',
		'type' : 'int',
		'map' :'installmentNumber'
	}, {
		'name' : 'chequeDate',
		'type' : 'date',
		'map' : 'chequeDate'
	}, {
		'name' : 'chequeAmount',
		'type' : 'long',
		'map'  : 'amount'
	}, {
		'name' : 'chequeBank',
		'type' : 'string',
		'map' : 'bankName'
	}, {
		'name' : 'chequeBranch',
		'type' : 'string',
		'map' : 'bankBranch'
	}, {
		'name' : 'status',
		'type' : 'String',
		'map' : 'pdcStatus>name'
	}];
	var columns = [ {
		'text' : 'Store Name',
		'datafield' : 'store',
		'width' : '12%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Savings Plan No',
		'datafield' : 'savingsPlanNo',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Customer Id',
		'datafield' : 'custId',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Customer Name',
		'datafield' : 'custName',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Installment No',
		'datafield' : 'installmentNo',
		'width' : '10%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Cheque Date',
		'datafield' : 'chequeDate',
		'width' : '10%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy'
	}, {
		'text' : 'Cheque Amount',
		'datafield' : 'chequeAmount',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
	}, {
		text : 'Cheque Bank',
		datafield : 'chequeBank',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '10%'
	}, {
		text : 'Cheque Branch',
		datafield : 'chequeBranch',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '10%'
	}, {
		text : 'Status',
		datafield : 'status',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '10%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/postDatedChequesSearch", "list",columns, pdcFieldFilters(), updateRows, "");
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

// PDC Search Functionality
$("#searchPdc").on('click',function(){
	var cDateFrom = $("#chequeDateFromS").val();
	var cDateTo = $("#chequeDateToS").val();
	if(cDateFrom == "" || cDateFrom == null || cDateTo == "" || cDateTo == null){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	else{	
		pdcSearchGrid();
		$("#jqxgrid").show();
	}
});


// ###################### PDC Export functionality #######################
$("#exportPdc").on("click",function() {
			var data;
		    var newData = [];
		    var chequeDateFromS = $('#chequeDateFromS').val();
			var chequeDateToS = $('#chequeDateToS').val();
			var statusS = $('#statusS').val();
			var storeIdS = $('#storeIdS').val();
			fieldFilters = {
				"fieldFilters" : {}
			};
			if (chequeDateFromS != "" && chequeDateFromS != null) {
				fieldFilters.fieldFilters["fromDate"] = chequeDateFromS;
			}
			if (chequeDateToS != "" && chequeDateToS != null) {
				fieldFilters.fieldFilters["toDate"] = chequeDateToS;
			}
			var statusObj = $('#statusObj').val();
			if (statusObj == null || statusObj == "") {
				var statusS = "";
			} else {
				var statusS = statusObj.join(",");
			}
			var storeNameObj = $('#storeNameObj').val();
			if (storeNameObj == null || storeNameObj == "") {
				var storeIdS = "";
			} else {
				var storeIdS = storeNameObj.join(",");
			}
			if (statusS != "" && statusS != null) {
				fieldFilters.fieldFilters["pdcStatus"] = statusS;
			}
			if (storeIdS != "" && storeIdS != null) {
				fieldFilters.fieldFilters["storeId"] = storeIdS;
			}
			
			fieldFilters.fieldFilters["portal"] = "Oe";
			
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
     					postJSON('/OrderExecution/api/v1/postDatedChequesExport',JSON.stringify(fieldFilters),function(response) {
					   if(response != null){
                       data = response.payload.list;
                       for (i = 0; i < data.length; i++) {
						newData.push({
							'Store Name' : (data[i].store != null) ? data[i].store.name : "",
							'Savings Plan No' : (data[i].savingsPlanNo != null) ? data[i].savingsPlanNo : "",
							'Custome Id' : (data[i].customer!= null) ? data[i].customer.id  : "",		
							'Custome Name' : (data[i].customer!= null) ? data[i].customer.name  : "",
							'Installment No' : (data[i].installmentNumber != null) ? data[i].installmentNumber : "",
							'Cheque Date' : (data[i].chequeDate != null) ? data[i].chequeDate : "",
							'Cheque Amount' : (data[i].amount != null) ? data[i].amount : "",
							'Cheque Bank' : (data[i].bankName != null) ? data[i].bankName : "",
							'Cheque Branch' : (data[i].bankBranch != null) ? data[i].bankBranch	: "",
							'Status' : (data[i].pdcStatus != null) ? data[i].pdcStatus.name	: "",
                           });
								
                       }
                      // JSONToCSVConvertor(newData, "Post Dated Cheques" + "_" + sysdate, true);
                       var opts = [{sheetid:'Post_Dated_Cheques',header:true}];
                       var res = alasql('SELECT * INTO XLSX("Post Dated Cheques_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
	$('#statusObj').multiselect("clearSelection");
	$('#storeNameObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});



//Print Functionality to be done by Venkat
//#######################################
$("#printPdc").on('click', function() {
	var chequeDateFromS = $('#chequeDateFromS').val();
	var chequeDateToS = $('#chequeDateToS').val();
	var statusS = $('#statusS').val();
	var storeIdS = $('#storeIdS').val();
	fieldFilters = {
		"fieldFilters" : {
			
		}
	};
	if (chequeDateFromS != "" && chequeDateFromS != null) {
		fieldFilters.fieldFilters["fromDate"] = chequeDateFromS;
	}
	if (chequeDateToS != "" && chequeDateToS != null) {
		fieldFilters.fieldFilters["toDate"] = chequeDateToS;
	}
	var statusObj = $('#statusObj').val();
	if (statusObj == null || statusObj == "") {
		var statusS = "";
	} else {
		var statusS = statusObj.join(",");
	}
	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var storeIdS = "";
	} else {
		var storeIdS = storeNameObj.join(",");
	}
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["pdcStatus"] = statusS;
	}
	if (storeIdS != "" && storeIdS != null) {
		fieldFilters.fieldFilters["storeId"] = storeIdS;
	}
	
	fieldFilters.fieldFilters["portal"] = "oe";
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : chequeDateFromS,
			"ToDate" : chequeDateToS,
			"Status" : statusS,
			"storeId" : storeIdS,
			"Portal"  :"oe",
			"mode" : "pdf",
			"reportName" : "RPT_PDC_For_Savings_Plan"
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
				navigator.msSaveBlob(file, 'RPT_PDC_For_Savings_Plan.pdf');
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












