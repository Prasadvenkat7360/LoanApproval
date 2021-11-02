/* 
	##	Author        : 	Dipankar Naha
	##	Date Creation 	: 	15-02-2017
	## 	Description		:	Creation of Standard Metal Rate / Metal MAP Price
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

$("#dateFrom").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0,
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#dateTo").datepicker('option', 'minDate', min || '0'); 
	}
});

$("#dateTo").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0
// maxDate: '+1Y+6M+1D',
});

// Segment On load
var segmentList = function() {
	$('#metalSeg').empty().append(
			'<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/standardRateMetalLOV', function(data) {
		$.each(data.payload.sTypes, function(key, val) {
			$('#metalSeg').append(
					'<option value="' + val.id + '">' + val.description
							+ '</option>');
		});
	});
}

segmentList();

// Metal MAP Price Field Filter
var metalMAPPriceFieldFilter = function() {
	var segmentCode = $("#metalSeg").val();
	var fromDate = $("#dateFrom").val();
	var toDate = $("#dateTo").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (segmentCode != "" && segmentCode != null) {
		fieldFilters.fieldFilters["segmentCode"] = segmentCode;
	}
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}

	return fieldFilters;
}

// Search grid for Metal MAP Price
function metalMAPPriceGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'metalSegment',
		'type' : 'string'
	}, {
		'name' : 'fromDate',
		'type' : 'string',
		'map' : 'dateOfTx'
	}, {
		'name' : 'standardDocType',
		'type' : 'string'
	}, {
		'name' : 'transactionWeight',
		'type' : 'long'
	}, {
		'name' : 'transactionValue',
		'type' : 'long'
	}, {
		'name' : 'cumulativeWeight',
		'type' : 'long'
	}, {
		'name' : 'cumulativeValue',
		'type' : 'long'
	}, {
		'name' : 'refDocSlNo',
		'type' : 'int'
	}, {
		'name' : 'refDocNo',
		'type' : 'int'
	}, {
		'name' : 'standardRate',
		'type' : 'float',
	}, {
		'name' : 'isProcessed',
		'type' : 'int'
	} ];

	var columns = [ {
		'text' : 'Segment',
		'datafield' : 'metalSegment',
		'width' : '8%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : ' Date of Transaction',
		'datafield' : 'fromDate',
		'width' : '10%',
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Ref Doc Type ',
		'datafield' : 'standardDocType',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Ref Doc No',
		'datafield' : 'refDocNo',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Ref Doc Sl No',
		'datafield' : 'refDocSlNo',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false,
	}, {
		'text' : 'Transaction Wt',
		'datafield' : 'transactionWeight',
		'width' : '10%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,
		cellsformat : 'd3'
	}, {
		'text' : 'Transaction Val',
		'datafield' : 'transactionValue',
		'width' : '10%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,
		cellsformat : 'd2'
	}, {
		'text' : 'Cumulative Wt',
		'datafield' : 'cumulativeWeight',
		'width' : '10%',
		columntype : 'datetimeinput',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,
		cellsformat : 'd3'
	}, {
		'text' : 'Cumulative Val',
		'datafield' : 'cumulativeValue',
		'width' : '10%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,
		cellsformat : 'd2'
	}, {
		'text' : 'MAP Rate',
		'datafield' : 'standardRate',
		'width' : '8%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,
		cellsformat : 'd2'
	}, {
		text : 'Processed Flag ',
		datafield : 'isProcessed',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '10%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/standardMetalRateList",
			"list", columns, metalMAPPriceFieldFilter(), updateRows,
			"");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true	
	});
	

}

// Search Metal MAP Price
$('#search').on('click', function() {
	 $form = $('#metalMAPPriceForm');
	    $form.validate({
	        errorElement: 'label', 
	        errorClass: 'help-inline', 
	        focusInvalid: false, 
	        ignore: "",
	        rules: {
	        	"metalSeg": {
	                required: true
	            },
	            "dateFrom": {
	            	dateITA : true 
	            },
	            "dateTo": {
	            	dateITA : true 
	            }
	        },errorPlacement: function(error, element) {
	        	if(element.context.name == "dateFrom" || element.context.name == "dateTo" ){
	        		error.insertAfter(element.parent());
	        	}else{
	        		error.insertAfter(element);
	        	}
	        }
	    });

	    if ($form.valid()) {
	    	metalMAPPriceGrid();
	    	$('#jqxgrid').show();
	    } else {
	    	 return false;
	    }

	    return false;

	
});

// Clear form and Grid
$('#clear').on('click', function() {
	var validator = $( "form" ).validate();
	validator.resetForm();
	
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

// Export Metal MAP Price records
$('#export').on(
		'click',
		function() {

			var data;
			var segmentCode = $("#metalSeg").val();
			var fromDate = $("#dateFrom").val();
			var toDate = $("#dateTo").val();

			var sysdate = moment().format('DDMMYYYYHHmmSS');
			var rows = $('#jqxgrid').jqxGrid('getrows');
			console.log(rows);
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
			postJSON('/OrderExecution/api/v1/standardMetalRateExportList', JSON.stringify(metalMAPPriceFieldFilter()), function(response) {
				if(response!=null){
				data = response.payload.list;
				for (i = 0; i < data.length; i++) {
					newData.push({
						'Metal Segment ' : (data[i].metalSegment !=null) ? data[i].metalSegment :"",
						'Date OF Tx' : (data[i].dateOfTx !=null) ? data[i].dateOfTx:"" ,
						'Standard Doc Type' : (data[i].standardDocType !=null) ? data[i].standardDocType : "",
						'Ref Doc No' : (data[i].refDocNo!=null)?data[i].refDocNo:"",
						'Ref SI No' : (data[i].refDocSlNo!=null) ?  data[i].refDocSlNo :"",						
						'Transaction Wt' : (data[i].transactionWeight!=null)?data[i].transactionWeight:"",
						'Transaction Value ' : (data[i].transactionValue !=null) ? data[i].transactionValue:"" ,
						'Cumulative Value' : (data[i].cumulativeValue !=null)? data[i].cumulativeValue:"",
						'Cumulative Wt' : (data[i].cumulativeWeight !=null)? data[i].cumulativeWeight:"",
						'Standard Rate' : (data[i].standardRate !=null)? data[i].standardRate:"",
						'Is Process' : (data[i].isProcessed !=null)? data[i].isProcessed:""

					})
				   }
				 var opts = [{sheetid:'Metal Map Price',header:true}];
                 var res = alasql('SELECT * INTO XLSX("Metal_Map_Price_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
				}
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

//####################################### Validation is Started #############################################