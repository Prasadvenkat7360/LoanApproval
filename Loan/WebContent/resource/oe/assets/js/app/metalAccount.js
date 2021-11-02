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

function metalAccountGrid() {

	var updateRows = function(rowid, newdata, commit) {
		/*
		 * updates[newdata.id] = { };
		 */
	}
	
	var datafields = [ {
		'name' : 'storeOrDC',
		'type' : 'string'
	}, {
		'name' : 'accountDate',
		'type' : 'date'
	}, {
		'name' : 'storeOrDcId',
		'type' : 'long'
	}, {
		'name' : 'code',
		'type' : 'string'
	}, {
		'name' : 'name',
		'type' : 'string'
	}, {
		'name' : 'locationType',
		'type' : 'string'
	}, {
		'name' : 'metalSegment',
		'map': 'metalSegment>description',
		'type' : 'string'
	}, {
		'name' : 'fromPurity',
		'type' : 'double'
	}, {
		'name' : 'toPurity',
		'type' : 'double'
	}, {
		'name' : 'receiptGrossWeight',
		'type' : 'double'
	}, {
		'name' : 'receiptNetWeight',
		'type' : 'double'
	}, {
		'name' : 'receiptPureWeight',
		'type' : 'double'
	}, {
		'name' : 'issueGrossWeight',
		'type' : 'double'
	}, {
		'name' : 'issueNetWeight',
		'type' : 'double'
	}, {
		'name' : 'issuePureWeight',
		'type' : 'double'
	},
	, {
		'name' : 'isProcessed',
		'type' : 'boolean'
	}];

	var columns = [{
			'text' : 'Acc Date',
			'datafield' : 'accountDate',
			'width' : '90px',
			cellsformat: 'dd/MM/yyyy',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Store / DC',
			'datafield' : 'storeOrDC',
			'width' : '65px',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Name',
			'datafield' : 'storeOrDcId',
			'width' : '100px',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Segment',
			'datafield' : 'metalSegment',
			'width' : '85px',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Material Type',
			'datafield' : 'locationType',
			'width' : '85px',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Loc Code',
			'datafield' : 'code',
			'width' : '85px',
			editable : false,
			sortable : false
		},
		{
			'text' : 'From Purity',
			'datafield' : 'fromPurity',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat: 'd2',
			cellsalign: 'right',
		},,
		{
			'text' : 'To Purity',
			'datafield' : 'toPurity',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat: 'd2',
			cellsalign: 'right',
		},
		{
			'text' : 'Receipt Gross Wt.',
			'datafield' : 'receiptGrossWeight',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat: 'd3',
			cellsalign: 'right',
			aggregates: ['sum'],
			aggregatesrenderer: aggregatesrenderer
		},
		{
			'text' : 'Receipt Net Wt.',
			'datafield' : 'receiptNetWeight',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat: 'd3',
			cellsalign: 'right',
			aggregates: ['sum'],
			aggregatesrenderer: aggregatesrenderer
		},
		{
			'text' : 'Receipt Pure Wt.',
			'datafield' : 'receiptPureWeight',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat: 'd3',
			cellsalign: 'right',
			aggregates: ['sum'],
			aggregatesrenderer: aggregatesrenderer
		},
		{
			'text' : 'Issue Gross Wt.',
			'datafield' : 'issueGrossWeight',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat: 'd3',
			cellsalign: 'right',
			aggregates: ['sum'],
			aggregatesrenderer: aggregatesrenderer
		},
		{
			'text' : 'Issue Net Wt.',
			'datafield' : 'issueNetWeight',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat: 'd3',
			cellsalign: 'right',
			aggregates: ['sum'],
			aggregatesrenderer: aggregatesrenderer
		},
		{
			'text' : 'Issue Pure Wt.',
			'datafield' : 'issuePureWeight',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat: 'd3',
			cellsalign: 'right',
			aggregates: ['sum'],
			aggregatesrenderer: aggregatesrenderer
		},
		{
			'text' : 'Processed?',
			'datafield' : 'isProcessed',
			'width' : '80px',
			editable : false,
			sortable : false
			
		}];

	showMyGrid(datafields, "/OrderExecution/api/v1/metalAccountList", "list",
			columns, metalAccountFilterValues(), updateRows, "createdDate");
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

function metalAccountFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};
	var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();
	var storeOrDC = $('#storeOrDC').val();
	var segment = $('#metalSegment').val();
	var storeOrDcId = $('#storeOrDcId').val();
	var code = $("#code").val();
	var isProcessed = $("#isProcessed").val();
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (storeOrDC != "" && storeOrDC != null) {
		fieldFilters.fieldFilters["storeOrDC"] = storeOrDC;
	}
	if (storeOrDcId != "" && storeOrDcId != null) {
		fieldFilters.fieldFilters["storeOrDcId"] = storeOrDcId;
	}
	if (code != "" && code != null) {
		fieldFilters.fieldFilters["code"] = code.toUpperCase();
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["metalSegment.id"] = segment;
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["metalSegment.id"] = segment;
	}
	if (isProcessed != "" && isProcessed != null) {
		fieldFilters.fieldFilters["isProcessed"] = isProcessed;
	}

	return fieldFilters;

}

$('input:text:visible:first').focus();