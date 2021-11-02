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

function metalAccountReportGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	
	var source = {
	        localdata: data,
	        datatype: "json",
			datafields :[ {
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
				'name' : 'receiptGrossWeight',
				'type' : 'double'
			}, {
				'name' : 'receiptNetWeight',
				'type' : 'double'
			}, {
				'name' : 'receiptPureWeight',
				'type' : 'double'
			}, {
				'name' : 'isProcessed',
				'type' : 'boolean'
			}, {
				'name' : 'details',
				'type' : 'array'
			}, {
				'name' : 'cblGross',
				'map' : 'closingLocationBalance>receiptGrossWeight',
				'type' : 'double'
			}, {
				'name' : 'cblNet',
				'map' : 'closingLocationBalance>receiptNetWeight',
				'type' : 'double'
			}, {
				'name' : 'cblPure',
				'map' : 'closingLocationBalance>receiptPureWeight',
				'type' : 'double'
			}, {
				'name' : 'cbtGross',
				'map' : 'closingTempBalance>receiptGrossWeight',
				'type' : 'double'
			}, {
				'name' : 'cbtNet',
				'map' : 'closingTempBalance>receiptNetWeight',
				'type' : 'double'
			}, {
				'name' : 'cbtPure',
				'map' : 'closingTempBalance>receiptPureWeight',
				'type' : 'double'
			}, {
				'name' : 'diffGross',
				'map' : 'difference>receiptGrossWeight',
				'type' : 'double'
			}, {
				'name' : 'diffNet',
				'map' : 'difference>receiptNetWeight',
				'type' : 'double'
			}, {
				'name' : 'diffPure',
				'map' : 'difference>receiptPureWeight',
				'type' : 'double'
			} ]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);



	//showMyGrid(datafields, "/OrderExecution/api/v1/generateMetalAccountRpt", "list", columns, metalAccountFilterValues(), updateRows, "code");
	        

	var initrowdetails = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.details;
		var inlineSource = {
			datafields : [ {
				name : 'accountDate',
				type : 'date'
			}, {
				name : 'referenceType',
				type : 'string'
			}, {
				name : 'refId',
				type : 'long'
			}, {
				name : 'refItemId',
				type : 'long'
			}, {
				name : 'receiptGrossWeight',
				type : 'double'
			}, {
				name : 'receiptNetWeight',
				type : 'double'
			}, {
				name : 'receiptPureWeight',
				type : 'double'
			}, {
				name : 'isProcessed',
				type : 'boolean'
			}, {
				name : 'issueDate',
				type : 'date'
			}, {
				name : 'issueReferenceType',
				type : 'string'
			}, {
				name : 'issueRefId',
				type : 'long'
			}, {
				name : 'issueRefItemId',
				type : 'long'
			}, {
				name : 'issueGrossWeight',
				type : 'double'
			}, {
				name : 'issueNetWeight',
				type : 'double'
			}, {
				name : 'issuePureWeight',
				type : 'double'
			}, {
				name : 'issueProcessedFlag',
				type : 'boolean'
			} ],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		if (grid != null) {
			grid.jqxGrid({
				source : inlineSource,
				width : "95%",
				height : 200,
				theme: 'energyblue',
				enabletooltips : true,
				columnsresize : true,
				columns : [ {
					text : 'Doc Date',
					datafield : 'accountDate',
					cellsformat : 'dd/MM/yyyy',
					width : "80px",
					columngroup : "receipt"
				}, {
					text : 'Doc Type',
					datafield : 'referenceType',
					width : "70px",
					columngroup : "receipt"
				}, {
					text : 'Doc No.',
					datafield : 'refId',
					width : "65px",
					columngroup : "receipt"
				}, {
					text : 'Srl #',
					datafield : 'refItemId',
					width : "40px",
					columngroup : "receipt"
				}, {
					text : 'Gross Wt.',
					datafield : 'receiptGrossWeight',
					width : "80px",
					columngroup : "receipt",
					cellsformat : 'd3',
					cellsalign : 'right',
					aggregates : [ 'sum' ],
					aggregatesrenderer : aggregatesrenderer
				}, {
					text : 'Net Wt.',
					datafield : 'receiptNetWeight',
					width : "75px",
					columngroup : "receipt",
					cellsformat : 'd3',
					cellsalign : 'right',
					aggregates : [ 'sum' ],
					aggregatesrenderer : aggregatesrenderer
				}, {
					text : 'Pure Wt.',
					datafield : 'receiptPureWeight',
					width : "80px",
					columngroup : "receipt",
					cellsformat : 'd3',
					cellsalign : 'right',
					aggregates : [ 'sum' ],
					aggregatesrenderer : aggregatesrenderer
				}, {
					'text' : 'Processed?',
					'datafield' : 'isProcessed',
					'width' : '80px',
					editable : false,
					sortable : false,
					columngroup : "receipt",
				}, {
					text : 'Doc Date',
					datafield : 'issueDate',
					cellsformat : 'dd/MM/yyyy',
					width : "90px",
					columngroup : "issue"
				}, {
					text : 'Doc Type',
					datafield : 'issueReferenceType',
					width : "70px",
					columngroup : "issue"
				}, {
					text : 'Doc No.',
					datafield : 'issueRefId',
					width : "65px",
					columngroup : "issue"
				}, {
					text : 'Srl #',
					datafield : 'issueRefItemId',
					width : "40px",
					columngroup : "issue"
				}, {
					text : 'Gross Wt.',
					datafield : 'issueGrossWeight',
					width : "80px",
					columngroup : "issue",
					cellsformat : 'd3',
					cellsalign : 'right',
					aggregates : [ 'sum' ],
					aggregatesrenderer : aggregatesrenderer
				}, {
					text : 'Net Wt.',
					datafield : 'issueNetWeight',
					width : "80px",
					columngroup : "issue",
					cellsformat : 'd3',
					cellsalign : 'right',
					aggregates : [ 'sum' ],
					aggregatesrenderer : aggregatesrenderer
				}, {
					text : 'Pure Wt.',
					datafield : 'issuePureWeight',
					width : "80px",
					columngroup : "issue",
					cellsformat : 'd3',
					cellsalign : 'right',
					aggregates : [ 'sum' ],
					aggregatesrenderer : aggregatesrenderer
				}, {
					'text' : 'Processed?',
					'datafield' : 'issueProcessedFlag',
					'width' : '80px',
					editable : false,
					cellsalign : 'center',
					align : 'center',
					sortable : false,
					columngroup : "issue",

				} ],
				columngroups : [ {
					text : 'Receipt',
					name : 'receipt',
					align : 'center'
				}, {
					text : 'Issue',
					name : 'issue',
					align : 'center'
				} ],
				showaggregates : true,
				showstatusbar : true,
			});
		}
	}

	$("#jqxgrid").jqxGrid({
		
		source : dataAdapter,
		width : '100%',	
		sortable : true,	
		altRows : true,
		theme: 'energyblue',
		pageable : 'true',
		pagesize : 20,
		columnsResize : true,
		rowdetails : true,
		rowsheight : 35,
		columns : [ {
			'text' : 'Location Code',
			'datafield' : 'code',
			'width' : '70px',
			editable : false,
			sortable : false
		}, {
			'text' : 'From Date',
			'datafield' : 'accountDate',
			'width' : '85px',
			cellsformat : 'dd/MM/yyyy',
			editable : false,
			sortable : false
		},{
			'text' : 'Gross Wt.',
			'datafield' : 'receiptGrossWeight',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "ob",
		}, {
			'text' : 'Net Wt.',
			'datafield' : 'receiptNetWeight',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "ob",
		}, {
			'text' : 'Pure Wt.',
			'datafield' : 'receiptPureWeight',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "ob",
		}, {
			'text' : 'Gross Wt.',
			'datafield' : 'cbtGross',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "cbt",
		}, {
			'text' : 'Net Wt.',
			'datafield' : 'cbtNet',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "cbt",
		}, {
			'text' : 'Pure Wt.',
			'datafield' : 'cbtPure',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "cbt",
		}, {
			'text' : 'Gross Wt.',
			'datafield' : 'cblGross',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "cbl",
		}, {
			'text' : 'Net Wt.',
			'datafield' : 'cblNet',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "cbl",
		}, {
			'text' : 'Pure Wt.',
			'datafield' : 'cblPure',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "cbl",
		}, {
			'text' : 'Gross Wt.',
			'datafield' : 'diffGross',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "diff",
		}, {
			'text' : 'Net Wt.',
			'datafield' : 'diffNet',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "diff",
		}, {
			'text' : 'Pure Wt.',
			'datafield' : 'diffPure',
			'width' : '85px',
			editable : false,
			sortable : false,
			cellsformat : 'd3',
			cellsalign : 'right',
			columngroup : "diff",
		}, {
			'text' : 'Processed?',
			'datafield' : 'isProcessed',
			'width' : '65px',
			cellsalign : 'center',
			align : 'center',
			editable : false,
			sortable : false

		} ],
		initrowdetails : initrowdetails,
		rowdetailstemplate : {
			rowdetails : "<div id='grid' style='margin: 10px;'></div>",
			rowdetailsheight : 220,
			rowdetailshidden : true
		},
		columngroups : [ {
			text : 'Opening Balance',
			name : 'ob',
			align : 'center'
		}, {
			text : 'Closing Balance per Transaction',
			name : 'cbt',
			align : 'center'
		}, {
			text : 'Closing Balance per Location',
			name : 'cbl',
			align : 'center'
		}, {
			text : 'Difference',
			name : 'diff',
			align : 'center'
		} ],

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
	var docType = $("#docType").val();

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
	} else {
		fieldFilters.fieldFilters["code"] = "ALL";
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["metalSegment.id"] = segment;
	}
	if (docType != "" && docType != null) {
		fieldFilters.fieldFilters["docType"] = docType.toUpperCase();
	} else {
		fieldFilters.fieldFilters["docType"] = "ALL";
	}
	return fieldFilters;

}

function validateReqd() {
	var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();
	var storeOrDC = $('#storeOrDC').val();
	var storeOrDcId = $('#storeOrDcId').val();
	if (fromDate == "" || fromDate == null) {
		return false;
	}
	if (toDate == "" || toDate == null) {
		return false;
	}
	if (storeOrDC == "" || storeOrDC == null) {
		return false;
	}
	if (storeOrDcId == "" || storeOrDcId == null) {
		return false;
	}
	return true;
}
$('input:text:visible:first').focus();