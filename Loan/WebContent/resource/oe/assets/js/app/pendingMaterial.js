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
	
	if(selectedVal == "stoneAccessory"){
	$("#stoneAccessory").show();
	$("#fgPendingM").hide();
	
	}else if(selectedVal == "fG"){
		$("#fgPendingM").show();
		$("#stoneAccessory").hide();
	 }
});

//clear for the StoneAccessory
$("#ClearAll").on("click",function(){
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

function metalAccountReportGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ {
		'name' : 'vendorCode',
		'type' : 'string'
	},{
		'name' : 'storeName',
		'type' : 'string'
	},{
		'name' : 'orderType',
		'type' : 'long'
	},{
		'name' : 'psrno',
		'type' : 'long'
	},{
		'name' : 'orderNo',
		'type' : 'long'
	},{
		'name' : 'oderSi',
		'type' : 'long'
	},{
		'name' : 'jewelName',
		'type' : 'long'
	},{
		'name' : 'ReleaseDate',
		'type' : 'Date'
	},{
		'name' : 'noOfDayPending',
		'type' : 'long'
	},{
		'name' : 'stoneSegment',
		'type' : 'string'
	},{
		'name' : 'mainCategory',
		'type' : 'string'
	},{
		'name' : 'subCategoryShape',
		'type' : 'string'
	},{
		'name' : 'articleCode',
		'type' : 'string'
	},{
		'name' : 'weightRange',
		'type' : 'double'
	},{
		'name' : 'clarity',
		'type' : 'string'
	},{
		'name' : 'actualColor',
		'type' : 'string'
	}, {
		'name' : 'color',
		'type' : 'string'
	}, {
		'name' : 'cutGrade',
		'type' : 'string'
	}, {
		'name' : 'componentOwner',
		'type' : 'string'
	}, {
		'name' : 'stoneType',
		'type' : 'string'
	}, {
		'name' : 'stoneAccPcs',
		'type' : 'string'
	}, {
		'name' : 'StoneAccWt',
		'type' : 'string'
	}, {
		'name' : 'uOM',
		'type' : 'string'
	}, {
		'name' : 'condition',
		'type' : 'string'
	}, {
		'name' : 'mivDate',
		'type' : 'string'
	}, {
		'name' : 'mivNo',
		'type' : 'string'
	}];

	var columns = [ {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '10%',
		editable : false,
		sortable : true
	}, {
		'text' : 'Store Name',
		'datafield' : 'storeName',
		'width' : '10%',
		editable : false,
		sortable : true
	},{
		'text' : 'Order Type',
		'datafield' : 'orderType',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'PSR No.',
		'datafield' : 'psrno',
		'width' : '10%',
		editable : false,
		sortable : true,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Order No.',
		'datafield' : 'orderNo',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Order SI',
		'datafield' : 'oderSi',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Jewel Name',
		'datafield' : 'jewelName',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Release Date',
		'datafield' : 'ReleaseDate',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'right'
	}, {
		'text' : 'No Of Days Pending',
		'datafield' : 'noOfDayPending',
		'width' : '10%',
		editable : false,
		sortable : true,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Stone Segment',
		'datafield' : 'stoneSegment',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Main Category ',
		'datafield' : 'mainCategory',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Sub Category/Shape',
		'datafield' : 'subCategoryShape',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Article Code ',
		'datafield' : 'articleCode',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Weight Range ',
		'datafield' : 'weightRange',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Clarity',
		'datafield' : 'clarity',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Actual Color',
		'datafield' : 'actualColor',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Color',
		'datafield' : 'color',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	}, {
		'text' : 'Cut Grade	',
		'datafield' : 'cutGrade',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	},{
		'text' : 'Component Owner',
		'datafield' : 'componentOwner',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	},{
		'text' : 'Stone Type',
		'datafield' : 'stoneType',
		'width' : '10%',
		editable : false,
		sortable : false,
		cellsformat : 'd3',
		cellsalign : 'right'
	},{
		'text' : 'Stone/Acc Pcs',
		'datafield' : 'stoneAccPcs',
		'width' : '65px',
		editable : false,
		sortable : false

	},{
		'text' : 'Stone/acc Wt.',
		'datafield' : 'StoneAccWt',
		'width' : '65px',
		editable : false,
		sortable : false

	},{
		'text' : 'UOM',
		'datafield' : 'uOM',
		'width' : '65px',
		editable : false,
		sortable : false

	},{
		'text' : 'Condition',
		'datafield' : 'condition',
		'width' : '65px',
		editable : false,
		sortable : false

	},{
		'text' : 'MIV Date',
		'datafield' : 'mivDate',
		'width' : '65px',
		cellsformat : 'dd/MM/yyyy',
		editable : false,
		sortable : false

	},{
		'text' : 'MIV No.',
		'datafield' : 'mivNo',
		'width' : '65px',
		editable : false,
		sortable : false

	} ];

	showMyGrid(datafields, "", "list", columns, updateRows, "code");

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
				enabletooltips : true,
				columnsresize : true,
				columns : [ {
					text : 'Doc Date',
					datafield : 'accountDate',
					cellsformat : 'dd/MM/yyyy',
					width : "90px",
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
					width : "35px",
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
					width : "80px",
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
					width : "35px",
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
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		initrowdetails : initrowdetails,
		rowdetailstemplate : {
			rowdetails : "<div id='grid' style='margin: 10px;'></div>",
			rowdetailsheight : 220,
			rowdetailshidden : true
		},
		

	});

}

//Search Validation
$('#stoneAccessoryForm').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	 "stoneAccessoryNameSA":{required: true }
    },
    submitHandler: function (form) { 
    	metalAccountReportGrid();
    	$("#jqxgrid").show();
        return false;
    }
});