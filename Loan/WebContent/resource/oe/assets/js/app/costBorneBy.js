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

$("#cbbFromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#cbbToDateS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#cbbToDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	maxDate : 0,
	dateFormat: "dd/mm/yy",
});

$("#cbbStatusS").on('change',function(){
	var status = $("#cbbStatusS").val();
	if(status ==  1){
		$("#cbbExport").prop('disabled', true);
	}
	else{
		$("#cbbExport").prop('disabled', false);
	}
});

// on load LOV
var grNo = [],psrNo = [],orderNo = [];
var pendGrNo,pendPsrNo,pendOrdNo ;
var compGrNo,compPsrNo,compOrdNo;
$.getJSON('/OrderExecution/api/v1/costBorneByLOV', function(data) {
	$('#cbbStatusS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.status, function(key, val) {
		$('#cbbStatusS').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	$('#segS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.segments, function(key, val) {
		$('#segS').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
		 pendGrNo = data.payload.pendingGrNos;
		 pendPsrNo = data.payload.pendingPsrNos;
		 pendOrdNo = data.payload.pendingOrderNos;
		
		 compGrNo = data.payload.completedGrNos;
		 compPsrNo = data.payload.completedPsrNos;
		 compOrdNo = data.payload.completedOrderNos;
		
	
	$("#dcS").val(data.payload.DC.name);
	$("#dcSId").val(data.payload.DC.id);
});

$("#cbbStatusS").on('change',function(){
	var status = $("#cbbStatusS").val();
	if(status  == "0"){
		orderNo = pendOrdNo;
		grNo = pendGrNo
		psrNo = pendPsrNo
	}
	else if(status  == "1"){
		orderNo = compOrdNo;
		grNo = compGrNo
		psrNo = compPsrNo
	}else{}
	
	$('#grNoS').empty().append('<option value="" selected>--Select--</option>');
		$.each(grNo, function(key, val) {
		$('#grNoS').append('<option value="' + val + '">' + val + '</option>');
	});
	$('#psrNoS').empty().append('<option value="" selected>--Select--</option>');
		$.each(psrNo, function(key, val) {
		$('#psrNoS').append('<option value="' + val + '">' + val + '</option>');
	});
	$('#orderNoS').empty().append('<option value="" selected>--Select--</option>');
		$.each(orderNo, function(key, val) {
		$('#orderNoS').append('<option value="' + val + '">' + val + '</option>');
	});
});

$('#orderNoS').empty().append('<option value="" selected>-- Select Option --</option>');	
$("#orderNoS").on("change",function(){	
	var orderNumber=$("#orderNoS").val();	
	if(orderNumber !=""){
	getJSON('/OrderExecution/api/v1/printTagOrderSlNoLOV?orderNo='+orderNumber, function(data) {
		$('#orderSlNoS').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.orderSlNos , function(key, val) {
		$('#orderSlNoS').append('<option value="' + val.id + '">' + val.id + '</option>');
		});			
	});
  }else{	
		$('#orderSlNoS').val('');			
	      return true;
		}
});

$('#grNoS').empty().append('<option value="" selected>-- Select Option --</option>');	
$("#grNoS").on("change",function(){	
	var grNumber=$("#grNoS").val();	
	if(grNumber !=""){
	getJSON('/OrderExecution/api/v1/getGrSlNoLOV?grNo='+grNumber, function(data) {
		$('#grSlNoS').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.grSrlNos , function(key, val) {
		 $('#grSlNoS').append('<option value="' + val.id + '">' + val.id + '</option>');
		});			
	});
  }else{	
		$('#grSlNoS').val('');			
	      return true;
		}
});


//Smart Search For Vendor Code
$.getJSON('/OrderExecution/api/v1/getVendorDcCodeSPQuery', function(data) {
	vendorList = data.payload.vendorCode;
	var data = [];
	$.each(vendorList, function(key, value) {
		data.push({
			value : value.id,
			label : value.vendorCode + "-" + value.vendorName
		});
	});
		$("#vendorCodeS").autocomplete({
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

// Field Filters 
var costBorneByFieldFilters = function() {
	var vendorCode = $('#vendorCode-value').val();
	var fromDate = $("#cbbFromDateS").val();
	var toDate = $("#cbbToDateS").val();
	var status = $("#cbbStatusS").val();
	var segmentS = $('#segS').val();
	var grNoS = $('#grNoS').val();
	var grSlNoS = $('#grSlNoS').val();
	var psrNoS = $('#psrNoS').val();
	var orderNoS = $('#orderNoS').val();
	var orderSlNoS = $('#orderSlNoS').val();
	var dcS = $('#dcS').val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorId"] = vendorCode;
	}
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["segmentId"] = segmentS;
	}
	if (grNoS != "" && grNoS != null) {
		fieldFilters.fieldFilters["grNo"] = grNoS;
	}
	if (grSlNoS != "" && grSlNoS != null) {
		fieldFilters.fieldFilters["grSrlNo"] = grSlNoS;
	}
	if (psrNoS != "" && psrNoS != null) {
		fieldFilters.fieldFilters["psrNo"] = psrNoS;
	}
	if (orderNoS != "" && orderNoS != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNoS;
	}
	if (orderSlNoS != "" && orderSlNoS != null) {
		fieldFilters.fieldFilters["orderSrlNo"] = orderSlNoS;
	}
	/*if (dcS != "" && dcS != null) {
		fieldFilters.fieldFilters["dcId"] = dcS;
	}*/
	return fieldFilters;
}


var validateCbb = function() {
	var cbbLinesArr = [];
	var cbbLines = {};
	var cbbLinesArray = [];
	
	var rows = $('#jqxgrid').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var slno = rows[i].grSlNo;
		
		if(rows[i].selectionStatus == true)
		{			
			var custWastge =  rows[i].cbbCustomer;
			var compWastge =  rows[i].cbbCompany; 
			var jwWastge =   rows[i].cbbJobworker;
		
			if(custWastge == "" || custWastge == null || compWastge == "" || compWastge == null || jwWastge == "" || jwWastge == null){
				 $.growl.error({
					 message : "Please Enter Distribution % !!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			}
			cbbLinesArr.push(rows[i]);			
		}			
	}
	
	var array1 = [];
	var array2 = [];
	$.each(cbbLinesArr, function(k, v) {
	   if(v.grSlNo != null){
		   array1.push({
			   "grdId" :v.grdId,		  
				"compWastagePerc" : v.cbbCompany,
				"custWastagePerc" :  v.cbbCustomer,
				"vendorWastagePerc" :  v.cbbJobworker,
				"remarks" :  v.remarks
		   })
	   }else{
		   array2.push({
			   	"grdId" :v.grdId,
				"compMcPerc" : v.cbbCompany,
				"custMcPerc" : v.cbbCustomer,
				"vendorMcPerc" : v.cbbJobworker,
			});
	   }
	});

	var array3 = {};
	var array4 = [];
    for(var i in array1) {
        array3[i] = array1[i];
    }

    for(var i in array2) {
        for(var key in array2[i]) {
           array3[i][key] = array2[i][key];
        	
        }
        array4.push(array3);
    }
    
   var  newArray = $.unique(array4);
   return newArray;
}

//Create Cost to be Borne By
$('#saveCbbDet').on('click', function(){
	var cbbLinesC = [];
	var cbbLinesC = validateCbb();
		if (cbbLinesC) {
			postJSON('/OrderExecution/api/v1/createCostBorneBy',JSON.stringify(cbbLinesC),function(data) {
				if (data.resCode == "1") {										
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
				}
				costBorneBySearchGrid();
			});
	      } 
       });


//Search grid for pending status
function costBorneBySearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
		updates[newdata.id] = {	
				"selectionStatus" : undefined != newdata.selectionStatus ? newdata.selectionStatus	: false
		}
	}
	var datafields = [ {
		'name' : 'cbbDate',
		'type' : 'date',
		'map' : 'createdDate'
		
	}, {
		'name' : 'vendorCode',
		'type' : 'string',
		'map' : 'vendor>name'
	}, {
		'name' : 'vendorName',
		'type' : 'String',
		'map' :  'vendor>description'
	}, {
		'name' : 'grNo',
		'type' : 'long',
		'map'  : 'grNo'
	}, {
		'name' : 'grdId',
		'type' : 'long'
	}, {
		'name' : 'grSlNo',
		'type' : 'long',
		'map' :  'serialNumber'
	}, {
		'name' : 'psrNo',
		'type' : 'long',
		'map'  : 'psrNumber'
	}, {
		'name' : 'articleCode',
		'type' : 'string',
		'map'  : 'articleCode'
	}, {
		'name' : 'jewelCode',
		'type' : 'string',
		'map'  : 'jewelType'
	}, {
		'name' : 'subCat',
		'type' : 'string',
		'map'  : 'subCategory'
	}, {
		'name' : 'pieces',
		'type' : 'long',
		'map'  : 'pieces'
	}, {
		'name' : 'grossWt',
		'type' : 'double',
		'map'  : 'grossWeight'
	}, {
		'name' : 'netWt',
		'type' : 'double',
		'map'  : 'netWeight'
	}, {
		'name' : 'costComponent',
		'type' : 'String',	
		'map' : 'costComponent'
	}, {
		'name' : 'costWastage',
		'type' : 'long',
		'map' : 'costMCTotalCost'
	}, {
		'name' : 'cbbCustomer',
		'type' : 'long'
	}, {
		'name' : 'cbbJobworker',
		'type' : 'long'
	}, {
		'name' : 'cbbCompany',
		'type' : 'long'
	}, {
		'name' : 'sellingWastage',
		'type' : 'long',
		'map'  : 'sellingWastageWT'
	}, {
		'name' : 'sellingMc',
		'type' : 'long',
		'map'  : 'sellingMCTotalCost'
	}, {
		'name' : 'remarks',
		'type' : 'string'
	}, {
		'name' : 'selectionStatus',
		'type' : 'bool'
	}];

	var columns = [ {
		'text' : 'Date',
		'datafield' : 'cbbDate',
		'width' : '4%',
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Vendor Name',
		'datafield' : 'vendorName',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'IGR No',
		'datafield' : 'grNo',
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'IGR Sl No',
		'datafield' : 'grSlNo',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'PSR No',
		'datafield' : 'psrNo',
		'width' : '4%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Article Code',
		'datafield' : 'articleCode',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		text : 'Jewel Code',
		datafield : 'jewelCode',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '6%'
	}, {
		text : 'Sub-Category',
		datafield : 'subCat',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '5%'
	}, {
		text : 'Pieces',
		datafield : 'pieces',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Gross Wt',
		datafield : 'grossWt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '5%'
	}, {
		'text' : 'Net Wt',
		'datafield' : 'netWt',
		'width' : '4%',
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : true,
		editable : false
	}, {
		'text' : 'Cost Component',
		'datafield' : 'costComponent',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false,
	}, {
		text : 'Cost Wastage/MC',
		datafield : 'costWastage',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '6%'
	}, {
		text : 'Customer',
		datafield : 'cbbCustomer',
		editable : true,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d2',
		sortable : false,
		columngroup : "cbbDistributionPer",
		'width' : '4%'
	}, {
		text : 'Job Worker',
		datafield : 'cbbJobworker',
		editable : true,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d2',
		columngroup : "cbbDistributionPer",
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Company',
		datafield : 'cbbCompany',
		editable : true,
		cellsalign : 'right',
		align : 'center',
		columngroup : "cbbDistributionPer",
		cellsformat :'d2',
		sortable : false,
		'width' : '4%',
		cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) { 
    			var costWastage =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'costWastage');
	    		var cbbCustomer =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'cbbCustomer');
	    		var cbbJobworker =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'cbbJobworker');
	    		var totalWastgeMc =  parseInt(cbbCustomer) + parseInt(cbbJobworker) + parseInt(newvalue) ;
	    		console.log(totalWastgeMc);
	    		if(totalWastgeMc != 100  && costWastage > 0){
	    			$("#jqxgrid").jqxGrid('setcellvalue', row, "cbbCompany",null);
	    			$("#jqxgrid").jqxGrid('setcellvalue', row, "cbbCustomer",null);
	    			$("#jqxgrid").jqxGrid('setcellvalue', row, "cbbJobworker",null);
	    			$.growl.error({
	    			  message :"Apportion Pending for Wastage/MC  Charge",
	    			  duration : 10000,
	    			  title : 'Error'
	    			});
	    			return "";
	    		}
	    	/*	else if(cbbCustomer == ""|| cbbCustomer == null){
	    			$("#jqxgrid").jqxGrid('setcellvalue', row, "cbbCustomer",0);
	    		}
	    		else if(cbbJobworker == ""|| cbbJobworker == null){
	    			$("#jqxgrid").jqxGrid('setcellvalue', row, "cbbJobworker",0);
	    		}
	    		else if(newvalue == ""|| newvalue == null){
	    			$("#jqxgrid").jqxGrid('setcellvalue', row, "newvalue",0);
	    		} */   		
	    		
	   }
	}, {
		text : 'Selling Wastage',
		datafield : 'sellingWastage',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '6%'
	}, {
		text : 'Selling MC',
		datafield : 'sellingMc',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d2',
		sortable : false,
		'width' : '4%'
	},{
		text : 'Remarks',
		datafield : 'remarks',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		//editable : true,
		'width' : '6%',
		cellbeginedit: function(row, datafield, columntype) {
	        var value = $('#jqxgrid').jqxGrid('getcellvalue', row, 'grSlNo');
	        console.log(value);
	       if(value == null){
	    	   return false;
	       }
	       else{
	    	   return true;
	       }
		}
	},{
		text : '',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4%',
		datafield : 'selectionStatus',
		columntype : 'checkbox',
		cellbeginedit : function (row, datafield, columntype, value) {
			if ((row+1) % 2 == 0) return false;
		
        },
		cellvaluechanging : function(row, datafield, columntype,
				oldvalue, newvalue) {
			if (newvalue) {
				$("#jqxgrid").jqxGrid('selectrow', row);
				$("#jqxgrid").jqxGrid('setcellvalue', row+1, 'selectionStatus', true);
			} else {
				$("#jqxgrid").jqxGrid('unselectrow', row);
				$("#jqxgrid").jqxGrid('setcellvalue', row+1, 'selectionStatus', false);
			}
		},
		renderer : function() {
			return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
		}
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchCostBorneBy", "list",columns, costBorneByFieldFilters(), updateRows, "");
	
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		 columngroups : [ {
				text : 'Cost to be Borne by Distribution %',
				name : 'cbbDistributionPer',
				align : 'center'
			} ]
	});

}

//Search grid for completed status
function costBorneByViewGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'cbbDate',
		'type' : 'date',
		'map'  : 'createdDate'
	}, {
		'name' : 'vendorCode',
		'type' : 'string',
		'map'  : 'vendor>name'
	}, {
		'name' : 'vendorName',
		'type' : 'String',
		'map'  : 'vendor>description'
	}, {
		'name' : 'grNo',
		'type' : 'long',
		'map'  : 'grNo'
	}, {
		'name' : 'grSlNo',
		'type' : 'long',
		'map'  : 'serialNumber'
	}, {
		'name' : 'psrNo',
		'type' : 'long',
		'map'  : 'psrNumber'
	}, {
		'name' : 'articleCode',
		'type' : 'string',
		'map'  : 'articleCode'
	}, {
		'name' : 'jewelCode',
		'type' : 'string',
		'map'  : 'jewelType'
	}, {
		'name' : 'subCat',
		'type' : 'string',
		'map'  : 'subCategory'
	}, {
		'name' : 'pieces',
		'type' : 'long',
		'map'  : 'pieces'
	}, {
		'name' : 'grossWt',
		'type' : 'double',
		'map'  : 'grossWeight'
	}, {
		'name' : 'netWt',
		'type' : 'double',
		'map'  : 'netWeight'
	}, {
		'name' : 'costComponent',
		'type' : 'String',
		'map'  : 'costComponent'
	}, {
		'name' : 'costWastage',
		'type' : 'long',
		'map'  : 'costWastageWT'
	}, {
		'name' : 'cbbCustomer',
		'type' : 'long',
		'map'  : 'custWastagePerc'
	}, {
		'name' : 'cbbJobworker',
		'type' : 'long',
		'map'  : 'vendorWastagePerc'
	}, {
		'name' : 'cbbCompany',
		'type' : 'long',
		'map'  : 'compWastagePerc'
	}, {
		'name' : 'sellingWastage',
		'type' : 'long',
		'map'  : 'sellingWastageWT'
	}, {
		'name' : 'sellingMc',
		'type' : 'long',
		'map'  : 'sellingMCTotalCost'
	}, {
		'name' : 'remarks',
		'type' : 'string'
	}];

	var columns = [ {
		'text' : 'Date',
		'datafield' : 'cbbDate',
		'width' : '5%',
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Vendor Name',
		'datafield' : 'vendorName',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'IGR No',
		'datafield' : 'grNo',
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'IGR Sl No',
		'datafield' : 'grSlNo',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'PSR No',
		'datafield' : 'psrNo',
		'width' : '3%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Article Code',
		'datafield' : 'articleCode',
		'width' : '6%',
		sortable : false,
		editable : false,
		cellsalign : 'left',
		align : 'center'
	}, {
		'text' : 'Jewel Code',
		'datafield' : 'jewelCode',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '6%'
	}, {
		'text' : 'Sub-Category',
		'datafield' : 'subCat',
		editable : false,
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		'width' : '8%'
	}, {
		'text' : 'Pieces',
		'datafield' : 'pieces',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		'text' : 'Gross Wt',
		'datafield' : 'grossWt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		sortable : false,
		'width' : '5%'
	}, {
		'text' : 'Net Wt',
		'datafield' : 'netWt',
		'width' : '4%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		sortable : true,
		editable : false
	}, {
		'text' : 'Cost Component',
		'datafield' : 'costComponent',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false,
	}, {
		'text' : 'Cost Wastage',
		'datafield' : 'costWastage',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		sortable : false,
		'width' : '6%'
	}, {
		'text': 'Customer',
		'datafield' : 'cbbCustomer',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		columngroup : "cbbDistributionPercent",
		sortable : false,
		'width' : '4%'
	}, {
		'text' : 'Job Worker',
		'datafield' : 'cbbJobworker',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		columngroup : "cbbDistributionPercent",
		sortable : false,
		'width' : '4%'
	}, {
		'text' : 'Company',
		'datafield' : 'cbbCompany',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		sortable : false,
		columngroup : "cbbDistributionPercent",
		'width' : '4%'
	}, {
		'text' : 'Selling Wastage',
		'datafield' : 'sellingWastage',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		sortable : false,
		'width' : '6%'
	}, {
		'text' : 'Selling MC',
		'datafield' : 'sellingMc',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		cellsformat : 'd2',
		'width' : '5%'
	},{
		'text' : 'Remarks',
		'datafield' : 'remarks',
		editable : false,
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		'width' : '6%'
	}];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchCostBorneBy", "list",columns, costBorneByFieldFilters(), updateRows, "");
	
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :true,
        columnsheight: 50,
        theme: 'energyblue',
        columnsresize: true,  
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		columngroups : [ {
			text : 'Cost to be Borne by Distribution %',
			name : 'cbbDistributionPercent',
			align : 'center'
		} ]
	});
}


// search functionality
$("#cbbSearch").on('click',function(){
	var fromDateS = $("#cbbFromDateS").val();
	var toDateS = $("#cbbToDateS").val();
	var statusS = $("#cbbStatusS").val();
	if(fromDateS == "" || fromDateS == null || toDateS == "" || toDateS == null || statusS == "" || statusS == null){
		$.growl.error({
			message : "Please Select Mandatory Fields",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	else{
			if(statusS == 1){
				costBorneByViewGrid();
				$("#jqxgrid").show();
		}
			if(statusS == 0){
				costBorneBySearchGrid();
				$("#jqxgrid").show();
			}
	   }
});

//Export function for Adjustment Voucher
$("#cbbExport").on("click",function() {
		var data;
		var vendorCode = $('#vendorCode-value').val();
		var fromDate = $("#cbbFromDateS").val();
		var toDate = $("#cbbToDateS").val();
		var status = $("#cbbStatusS").val();
		var segmentS = $('#segS').val();
		var grNoS = $('#grNoS').val();
		var grSlNoS = $('#grSlNoS').val();
		var psrNoS = $('#psrNoS').val();
		var orderNoS = $('#orderNoS').val();
		var orderSlNoS = $('#orderSlNoS').val();
		var dcS = $('#dcS').val();
		fieldFilters = {
			"fieldFilters" : {}
		};

		if (vendorCode != "" && vendorCode != null) {
			fieldFilters.fieldFilters["vendorId"] = vendorCode;
		}
		if (fromDate != "" && fromDate != null) {
			fieldFilters.fieldFilters["fromDate"] = fromDate;
		}
		if (toDate != "" && toDate != null) {
			fieldFilters.fieldFilters["toDate"] = toDate;
		}
		if (status != "" && status != null) {
			fieldFilters.fieldFilters["status"] = status;
		}
		if (segmentS != "" && segmentS != null) {
			fieldFilters.fieldFilters["segmentId"] = segmentS;
		}
		if (grNoS != "" && grNoS != null) {
			fieldFilters.fieldFilters["grNo"] = grNoS;
		}
		if (grSlNoS != "" && grSlNoS != null) {
			fieldFilters.fieldFilters["grSrlNo"] = grSlNoS;
		}
		if (psrNoS != "" && psrNoS != null) {
			fieldFilters.fieldFilters["psrNo"] = psrNoS;
		}
		if (orderNoS != "" && orderNoS != null) {
			fieldFilters.fieldFilters["orderNo"] = orderNoS;
		}
		if (orderSlNoS != "" && orderSlNoS != null) {
			fieldFilters.fieldFilters["orderSrlNo"] = orderSlNoS;
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
					postJSON('/OrderExecution/api/v1/exportCostBorneBy',JSON.stringify(fieldFilters),function(response) {
						data = response.payload.list;
							for (i = 0; i < data.length; i++) {
								newData.push({	
									'Date' : (data[i].createdDate != null) ? data[i].createdDate : "",
									'Vendor Code' : (data[i].vendor != null) ? data[i].vendor.name : "",
									'Vendor Name' : (data[i].vendor != null) ? data[i].vendor.description : "",
									'IGR No' : (data[i].grNo != null) ? data[i].grNo: "",
									'IGR Sl No' : (data[i].serialNumber != null) ? data[i].serialNumber: "",
									'PSR No' : (data[i].psrNumber != null) ? data[i].psrNumber : "",
									'Article Code' : (data[i].articleCode != null) ? data[i].articleCode : "",
									'Jewel Code' : (data[i].jewelType != null) ? data[i].jewelType : "",
									'Sub Category' : (data[i].subCategory != null) ? data[i].subCategory: "",
									'Pieces' : (data[i].pieces != null) ? data[i].pieces : "",
									'Gross Wt' : (data[i].grossWeight != null) ?data[i].grossWeight	: "",
									'Net Wt' : (data[i].netWeight != null) ?data[i].netWeight : "",
									'Cost Component' : (data[i].costComponent != null) ?data[i].costComponent : "",
									'Cost Wastage' : (data[i].compWastagePerc != null) ? data[i].costWastageWT : "",
									'Customer %' : (data[i].custWastagePerc != null) ? data[i].custWastagePerc : "",
									'Job Worker %' : (data[i].vendorWastagePerc != null) ? data[i].vendorWastagePerc : "",
									'Company %' : (data[i].compWastagePerc != null) ? data[i].compWastagePerc : "",
									'Selling Wastage' : (data[i].sellingWastageWT != null) ? data[i].sellingWastageWT : "",
									'Selling Mc' : (data[i].sellingMCTotalCost != null) ? data[i].sellingMCTotalCost : "",
									'Remarks' : (data[i].remarks != null) ? data[i].remarks : ""
								});
							}
							JSONToCSVConvertor(newData, "Cost to Be Borne By" + "_" + sysdate, true);
						});	
						}else{
							   $.growl.error({
									message : "No Data To Export",
									duration : 10000
								});
							   return false;	
							   }
						   }
				});

//Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('costBorneBy', 'bodySwitcher')"
});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

//Print Functionality to be done by Venkat
//#######################################
$("#cbbPrint").on('click', function() {
	var vendorCode = $('#vendorCode-value').val();
	var fromDate = $("#cbbFromDateS").val();
	var toDate = $("#cbbToDateS").val();
	var status = $("#cbbStatusS").val();
	var segmentS = $('#segS').val();
	var grNoS = $('#grNoS').val();
	var grSlNoS = $('#grSlNoS').val();
	var psrNoS = $('#psrNoS').val();
	var orderNoS = $('#orderNoS').val();
	var orderSlNoS = $('#orderSlNoS').val();	
	var dcId = $("#dcSId").val();

		
	fieldFilters = {
			"fieldFilters" : {}
		};

	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorId"] = vendorCode;
	}
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["segmentId"] = segmentS;
	}
	if (grNoS != "" && grNoS != null) {
		fieldFilters.fieldFilters["grNo"] = grNoS;
	}
	if (grSlNoS != "" && grSlNoS != null) {
		fieldFilters.fieldFilters["grSrlNo"] = grSlNoS;
	}
	if (psrNoS != "" && psrNoS != null) {
		fieldFilters.fieldFilters["psrNo"] = psrNoS;
	}
	if (orderNoS != "" && orderNoS != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNoS;
	}
	if (orderSlNoS != "" && orderSlNoS != null) {
		fieldFilters.fieldFilters["orderSrlNo"] = orderSlNoS;
	}
	fieldFilters = {
		"fieldFilters" : {
			"cbByFlag" :status ,
			"cbFromDate":fromDate,
			"cbToDate":toDate,
			"grDCId":dcId,
			"grHeaderId":grNoS,
			"grSrlNo":grSlNoS,
			"mSegId":segmentS,
			"grOrderNo":orderNoS,
			"oItemSrlNo":orderSlNoS,
			"grPsrNo":psrNoS,
			"vendorId":vendorCode,
			"mode" : "pdf",
			"reportName" : "RPT_Cost_To_Be_Born_By"
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
				navigator.msSaveBlob(file, 'RPT_Order_Advance_Pending.pdf');
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