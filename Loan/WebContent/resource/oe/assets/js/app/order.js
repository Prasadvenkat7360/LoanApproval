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

var updates = new Object();
var vendors = {};
var fieldFilters = {};
function orderFilterValues() {
	fieldFilters = {
		"fieldFilters" : {}
	};

	var fromDate = $('#orderFromDate').val();
    var toDate = $('#orderToDate').val();
	var storeCodes = $('#storeCodes-value').val();
	var orderTypes = $('#orderTypes').val();
	var segments = $('#segments').val();
	var orderNo = $('#orderNo').val();
	var vendors = $('#vendors').val();
	var orderKinds = $('#orderKindsObj').val();
	var psrNumber=$('#psrNumber').val();

	/* Assign Release Order Multi Select - Start */

	var orderTypeArr = [];
	var vendorArr = [];
	var segmentArr = [];
	var orderKindArr = [];

	var orderTypesObj = $('#orderTypeCon option:selected');
	var vendorsObj = $('#vendorsObj option:selected');
	var segmentsObj = $('#segmentsObj option:selected');
	var orderKindsObj = $('#orderKindsObj option:selected');

	$(orderTypesObj).each(function(index, ot) {
		orderTypeArr.push($(this).val());
	});

	$(vendorsObj).each(function(index, v) {
		vendorArr.push($(this).val());
	});

	$(segmentsObj).each(function(index, s) {
		segmentArr.push($(this).val());
	});
	$(orderKindsObj).each(function(index, o) {
		orderKindArr.push($(this).val());
	});

	var orderTypeArr = orderTypeArr.join(",");
	var vendorArr = vendorArr.join(",");
	var segmentArr = segmentArr.join(",");
	var orderKindArr = orderKindArr.join(",");

	/* Assign Release Order Multi Select - End */

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["orderFromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["orderToDate"] = toDate;
	}
	
	if (storeCodes != "" && storeCodes != null) {
		fieldFilters.fieldFilters["storeCodes"] = storeCodes;
	}

	if (orderNo != "" && orderNo != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNo;
	}

	if (orderTypeArr != "" && orderTypeArr != null) {
		fieldFilters.fieldFilters["orderTypes"] = orderTypeArr;
	}

	if (vendorArr != "" && vendorArr != null) {
		fieldFilters.fieldFilters["vendors"] = vendorArr;
	}
	
	if (segmentArr != "" && segmentArr != null) {
		fieldFilters.fieldFilters["segment"] = segmentArr;
	}
	
	if (orderKindArr != "" && orderKindArr != null) {
		fieldFilters.fieldFilters["orderKinds"] = orderKindArr;
	}

	if (psrNumber != "" && psrNumber != null) {
		fieldFilters.fieldFilters["psrNumber"] = psrNumber;
	}
	
	return fieldFilters;
}


function tvafilterValues() {
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();
	var transferSlip = $('#transferSlipNo').val();
	var storeOrDc = $('#storeOrDc').val();
	var fromStore = $('#fromStoreDc').val();
	var fromZone = $('#fromZone').val();
	var materialType = $('#materialType').val();
	var refDocType = $('#refDocType').val();
	var refDocNo = $('#refDocNo').val();
	

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}

	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}

	if (transferSlip != "" && transferSlip != null) {
		fieldFilters.fieldFilters["transferSlip"] = transferSlip;
	}

	if (fromStore != "" && fromStore != null) {
		fieldFilters.fieldFilters["fromStore"] = fromStore;
	}
	
	if (fromZone != "" && fromZone != null) {
		fieldFilters.fieldFilters["fromZone"] = fromZone;
	}
	
	if (materialType != "" && materialType != null) {
		fieldFilters.fieldFilters["materialType"] = materialType;
	}
	
	if (refDocType != "" && refDocType != null) {
		fieldFilters.fieldFilters["refDocType"] = refDocType;
	}
	
	if (refDocNo != "" && refDocNo != null) {
		fieldFilters.fieldFilters["refDocNo"] = refDocNo;
	}
	
	if (storeOrDc != "" && storeOrDc != null) {
		fieldFilters.fieldFilters["storeOrDc"] = storeOrDc;
	}

	return fieldFilters;
}

var checkUncheckBox = function(row, flag, checked){
	var orderNo = $("#jqxgrid").jqxGrid('getcellvalue', row, 'orderNo');
	var orderSl = $("#jqxgrid").jqxGrid('getcellvalue', row, 'orderSl');
	if(checked == false){
		$("#jqxgrid").jqxGrid('setcellvalue', row, 'selectionStatus', false);
		
	}else{
		$.getJSON('/OrderExecution/api/v1/getOrdersInDC?orderNo='+ orderNo +'&&srlNo='+orderSl, function(data) {
			if(data.resCode == "-1"){
				if(flag == 0){
					$.growl.warning({message: data.mesgStr,	duration: 10000,title: 'warning'});
				}
				$("#jqxgrid").jqxGrid('setcellvalue', row, 'selectionStatus', false);
			}else{
				$("#jqxgrid").jqxGrid('setcellvalue', row, 'selectionStatus', true);
			}
		});
	}
}

var updatePageState = function (pagenum) {
    var datainfo = $("#jqxgrid").jqxGrid('getdatainformation');
    var pagenum = datainfo.paginginformation.pagenum;
    var pagesize = datainfo.paginginformation.pagesize;
    var startrow = pagenum * pagesize;
    // select the rows on the page.
    $("#jqxgrid").jqxGrid('beginupdate');
    var checkedItemsCount = 0;
    for (var i = startrow; i < startrow + pagesize; i++) {
        var boundindex = $("#jqxgrid").jqxGrid('getrowboundindex', i);
        var value = $("#jqxgrid").jqxGrid('getcellvalue', boundindex, 'selectionStatus');
        if (value) checkedItemsCount++;
        if (value) {
            $("#jqxgrid").jqxGrid('selectrow', boundindex);
        } else {
            $("#jqxgrid").jqxGrid('unselectrow', boundindex);
        }
    }

    $("#jqxgrid").jqxGrid('endupdate');
    if (checkedItemsCount == pagesize) {
        columnCheckBox.jqxCheckBox({
            checked: true
        });
    } else if (checkedItemsCount == 0) {
        columnCheckBox.jqxCheckBox({
            checked: false
        });
    } else {
        columnCheckBox.jqxCheckBox({
            checked: null
        });
    }
}

$("#jqxgrid").on('pagechanged', function (event) {
    updatePageState();
});
function assignReleaseOrderGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
		updates[rowid] = {
			"orderNo" : newdata.orderNo,
			"orderSl" : newdata.orderSl,
			"vendors" : newdata.vendors,
			"orderItemNo" : newdata.orderItemNo,
			"articleCode" : newdata.articleCode,
			"vendorDueDate" : newdata.vendorDueDate,
			"orderItemDueDate" : newdata.orderItemDueDate,
			"vendorInstructions" : newdata.vendorInstructions,
			"rowId" : rowid,
			"selectionStatus" : undefined != newdata.selectionStatus ? newdata.selectionStatus
					: false
		};
		 commit(true);
	}
	  var theme = "energyblue";

	
	var source = {
	        localdata: data,
	        datatype: "json",
			datafields : [ {
				'name' : 'storeCode',
				'type' : 'string'
			}, {
				'name' : 'orderType',
				'type' : 'string'
			}, {
				'name' : 'orderNo',
				'type' : 'int'
			}, {
				'name' : 'orderItemNo',
				'type' : 'long'
			}, {
				'name' : 'orderSl',
				'type' : 'int'
			}, {
				'name' : 'orderKind',
				'type' : 'string'
			}, {
				'name' : 'segmentId',
				'type' : 'string',
				'map' : 'segmentDTO>id'
			}, {
				'name' : 'jewelTypeId',
				'type' : 'string',
				'map' : 'jewelDTO>id'
			}, {
				'name' : 'categoryId',
				'type' : 'string',
				'map' : 'mainCatDTO>id'
			}, {
				'name' : 'subCategoryId',
				'type' : 'string',
				'map' : 'subCatDTO>id'
			}, {
				'name' : 'segment',
				'type' : 'string',
				'map' : 'segmentDTO>description'
			}, {
				'name' : 'jewelType',
				'type' : 'string',
				'map' : 'jewelDTO>description'
			}, {
				'name' : 'category',
				'type' : 'string',
				'map' : 'mainCatDTO>description'
			}, {
				'name' : 'subCategory',
				'type' : 'string',
				'map' : 'subCatDTO>description'
			}, {
				'name' : 'articleCode',
				'type' : 'string'
			}, {
				'name' : 'pcs',
				'type' : 'string'
			}, {
				'name' : 'fromWeight',
				'type' : 'string'
			}, {
				'name' : 'toWeight',
				'type' : 'string'
			}, {
				'name' : 'vendorInstructions',
				'type' : 'string'
			}, {
				'name' : 'orderDate',
				type :'date',
				format: 'dd/MM/yyyy'
			}, {
				'name' : 'orderItemDueDate',
				type :'date',
				format: 'dd/MM/yyyy'
			}, {
				'name' : 'vendorDueDate',
				type :'date',
				format: 'dd/MM/yyyy'
			}, {
				'name' : 'vendorCode',
				'type' : 'string'
			},
			 {
				'name' : 'approvedDesigns',
				'type' : 'array'
			},
			 {
				'name' : 'vendorId',
				'type' : 'string',
				'map' : 'vendorId'
			},{
				'name' : 'vendors',
				'type' : 'int'
			},
			{
				'name' : 'selectionStatus',
				'type' : 'bool'
			} ]
		};

	// Main Grid
		var dataAdapter = new $.jqx.dataAdapter(source);
		 var columnCheckBox = null;
		  var updatingCheckState = false;
		$("#jqxgrid").jqxGrid({
			source : dataAdapter,
			 width: '100%',
			editable : true,
			columnsheight : 70,
			autoheight : true,
			theme: theme,
			pageable : 'true',
			pagesize : 20,
			altRows : true,
			sortable: true,
			columnsresize : true,
			selectionmode : 'none',
			//enablebrowserselection: true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				container.append('<i class="fa fa-list fa-md"></i>&nbsp;Assign Vendors & Release Orders');
				
			},
			
			columns : [
						
				{
					text : '',
					columntype : 'checkbox',
					width : '2%',
					menu: false,
					sortable: false,
					datafield: 'selectionStatus',
					cellsalign : 'center',
					align:'center',
					filterable: false,
					renderer: function () {
						return '<div><div style="margin-left: 30px; margin-top: 35px;"></div><div></div></div>';
					},
					rendered: function (element) {
			              var checkbox = $(element).last();
			              $(checkbox).jqxCheckBox({
			                  width: 16,
			                  height: 16,
			                  animationShowDelay: 0,
			                  animationHideDelay: 0
			              });
			              columnCheckBox = $(checkbox);
			              $(checkbox).on('change', function (event) {
			                  var checked = event.args.checked;
			                  var pageinfo = $("#jqxgrid").jqxGrid('getpaginginformation');
			                  var pagenum = pageinfo.pagenum;
			                  var pagesize = pageinfo.pagesize;
			                  if (checked == null || updatingCheckState) return;
			                  $("#jqxgrid").jqxGrid('beginupdate');

			                  if (checked) {
			                      $("#jqxgrid").jqxGrid('selectallrows');
			                  }
			                  else if (checked == false) {
			                      $("#jqxgrid").jqxGrid('clearselection');
			                  }

			                  var startrow = pagenum * pagesize;
			                  for (var i = startrow; i < startrow + pagesize; i++) {
			                      var boundindex = $("#jqxgrid").jqxGrid('getrowboundindex', i);
			                     // $("#jqxgrid").jqxGrid('setcellvalue', boundindex, 'selectionStatus', event.args.checked);
			                      checkUncheckBox(boundindex, 1, checked);
			                  }

			                  $("#jqxgrid").jqxGrid('endupdate');
			                  for (var i = 0; i < disabled.length; i++) {
			                      var row = disabled[i];
			                      $("#jqxgrid").jqxGrid('setcellvalue', row, "selectionStatus", false);
			                      $('#jqxgrid').jqxGrid('unselectrow', row);
			                  }
			              });
			              return true;
			          },
					cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue) {						
						checkUncheckBox(row, 0, newvalue);						
					}

				},
				{
					'text' : 'Store/DC',
					'datafield' : 'storeCode',
					'width' : '7%',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Order Type',
					'datafield' : 'orderType',
					'width' : '7%',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Order No.',
					'datafield' : 'orderNo',
					cellsalign : 'center',
					align:'center',
					'width' : '4%',
					editable : false,
				},
				{
					'text' : 'Order Sl.',
					'datafield' : 'orderSl',
					'width' : '5%',
					cellsalign : 'center',
					align:'center',
					sortable : true,
					editable : false
				},

				{
					'text' : 'Order Kind',
					'datafield' : 'orderKind',
					'width' : '5%',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Segment',
					'datafield' : 'segment',
					'width' : '5%',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Jewel Type',
					'datafield' : 'jewelType',
					'width' : '5%',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Main Cat',
					'datafield' : 'category',
					'width' : '5%',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Sub Cat',
					'datafield' : 'subCategory',
					'width' : '5%',
					cellsalign : 'left',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Article Code',
					'datafield' : 'articleCode',
					'width' : '5%',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Pcs',
					'datafield' : 'pcs',
					'width' : '3%',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'From Wt',
					'datafield' : 'fromWeight',
					'width' : '5%',
					cellsalign : 'right',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'To Wt',
					'datafield' : 'toWeight',
					'width' : '5%',
					cellsalign : 'right',
					align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Vendor Instruction',
					'datafield' : 'vendorInstructions',
					'width' : '5%',
					cellsalign : 'left',
					align:'center',
					sortable : false,
					editable : true
				},
				{
					'text' : 'Order Dt.',
					'datafield' : 'orderDate',
					'width' : '5%',
					cellsalign : 'center',
					align:'center',
					cellsformat : 'dd/MM/yyyy',
					editable : false
				},
				{
					'text' : 'Order Item Due Date',
					'datafield' : 'orderItemDueDate',
					'width' : '5%',
					cellsalign : 'center',
					align:'center',
					cellsformat : 'dd/MM/yyyy',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Vendor Due Dt.',
					'datafield' : 'vendorDueDate',
					'width' : '5%',
					cellsalign : 'center',
					align:'center',
					columntype: 'datetimeinput',
					cellsformat : 'dd/MM/yyyy',
					sortable : false,
					editable : true,
					initeditor : function (row, value, editor) {
						 var orderDate = $("#jqxgrid").jqxGrid('getcellvalue', row, 'orderDate');
						 var orderItemDueDate = $("#jqxgrid").jqxGrid('getcellvalue', row, 'orderItemDueDate');
					    var today = new Date();
				    	var date = today.getDate();
				    	var month =  today.getMonth()+1;
					 	var year = today.getFullYear();
					 	var orderDate = new Date(orderDate);
						var orderDate = orderDate.toString('dd/MM/yyyy');
						 orderDate = orderDate.split('/');
						 var dd = orderDate[0];
						 var mm =  parseInt(orderDate[1]); //January is 0!
						 var yy = orderDate[2];
						 
						 var orderItemDueDate = new Date(orderItemDueDate);
							var orderItemDueDate = orderItemDueDate.toString('dd/MM/yyyy');
						 orderItemDueDate1 = orderItemDueDate.split('/');
						 var dd1 = orderItemDueDate1[0];
						 var mm1 =  parseInt(orderItemDueDate1[1]); //January is 0!
						 var yy1 = orderItemDueDate1[2];
						
						 if(new Date(yy1, mm1, dd1 ) > new Date(year, month, date) ){
							 editor.jqxDateTimeInput({min: new Date(year, month-1, date), max: new Date(yy1, mm1-1, dd1)});
						 }else{
							 editor.jqxDateTimeInput({min: new Date(year, month-1, date), max: new Date(yy1+1, mm1-1, dd1)});
						 }
					}
				},
				{
					'text' : '',
					'datafield' : 'approvedDesigns',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : false,
	   				cellsrenderer : viewDesignRender,
	   				'width' : '3%'
				},
				{
					text : 'Assign Vendor',
					datafield : 'vendors',
					columntype: 'dropdownlist',
					cellsalign : 'left',
					align:'center',
					displayfield : 'vendorCode',
					editable : true,
					sortable : false,
					'width' : '9%'	,
					initeditor : function(row, value, editor) {						
						fieldFilters = {"fieldFilters" : {}};
						editor.on('click', function(event){		
							var segmentId = $("#jqxgrid").jqxGrid('getcellvalue', row, 'segmentId');
							var jewelTypeId = $("#jqxgrid").jqxGrid('getcellvalue', row, 'jewelTypeId');
							var categoryId = $("#jqxgrid").jqxGrid('getcellvalue', row, 'categoryId');
							var subCategoryId = $("#jqxgrid").jqxGrid('getcellvalue', row, 'subCategoryId');
							var orderNo = $("#jqxgrid").jqxGrid('getcellvalue', row, 'orderNo');
							var orderSl = $("#jqxgrid").jqxGrid('getcellvalue', row, 'orderSl');
							console.log(orderNo);
							fieldFilters.fieldFilters["segId"] = segmentId;
					    	fieldFilters.fieldFilters["jewelId"] = jewelTypeId;
					    	fieldFilters.fieldFilters["catId"] = categoryId;
					    	fieldFilters.fieldFilters["subCatId"] = subCategoryId;
					    	fieldFilters.fieldFilters["orderNo"] = orderNo;
					    	fieldFilters.fieldFilters["srlNo"] = orderSl;
					    	
					    	
					    	postJSON('/OrderExecution/api/v1/getARVendors ',JSON.stringify(fieldFilters), function(data) {
					    		response = data.payload.vendors;
					    		editor.jqxDropDownList({ source: response , displayMember: 'vendorName', valueMember: 'id'});
					    	});
					    	
					});
					}
					
				}]
		});
			

}



function transitVoucherGrid() {

	var updateRows = function(rowid, newdata, commit) {
		
			updates[rowid] = {
					"id" : newdata.id,
					"refDocType" : newdata.refDocType,
					"referenceNo" : newdata.referenceNo,
					"refSrlNO" : newdata.refSrlNO,
					"isSelected" : undefined != newdata.selectionStatus ? newdata.selectionStatus
							: false
				};
		
	}

	var datafields = [ {
		'name' : 'id',
		'type' : 'long'
	}, {
		'name' : 'fromStore',
		'type' : 'string'
	}, {
		'name' : 'fromZone',
		'type' : 'int'
	}, {
		'name' : 'metalLocation',
		'type' : 'string'
	}, {
		'name' : 'refDocType',
		'type' : 'string'
	}, {
		'name' : 'referenceNo',
		'type' : 'long'
	}, {
		'name' : 'refSrlNO',
		'type' : 'long'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'jewelType',
		'type' : 'string'
	}, {
		'name' : 'purity',
		'type' : 'double'
	}, {
		'name' : 'pcsOrPair',
		'type' : 'long'
	}, {
		'name' : 'gwtWeight',
		'type' : 'double'
	}, {
		'name' : 'netWeight',
		'type' : 'double'
	}, {
		'name' : 'fgDaimondWeight',
		'type' : 'double'
	}, {
		'name' : 'stoneOrAccPcs',
		'type' : 'long'
	}, {
		'name' : 'stoneOrAccWeight',
		'type' : 'double'
	}, {
		'name' : 'itemValueRs',
		'type' : 'double'
	},{
		'name' : 'remarks',
		'type' : 'string'
	},{
		'name' : 'toDc',
		'type' : 'string'
	},{
		'name' : 'toZone',
		'type' : 'string'
	},{
		'name' : 'transferDoneBy',
		'type' : 'string'
	},{
		'name' : 'receivedBy',
		'type' : 'string'
	},
	{
		'name' : 'designBy',
		'type' : 'string'
	}, {
		'name' : 'selectionStatus',
		'type' : 'bool'
	} ];

	var columns = [

			{
				'text' : 'Transfer Slip No.',
				datafield : 'id',
				'width' : '70px',
				editable : false
			},
			{
				'text' : 'From Store / Dc',
				datafield : 'fromStore',
				'width' : '85px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'From Zone',
				datafield : 'fromZone',
				'width' : '80px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Metal Location',
				datafield : 'metalLocation',
				'width' : '100px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Ref. Doc. Type',
				datafield : 'refDocType',
				'width' : '70px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Ref Doc. No.',
				datafield : 'referenceNo',
				'width' : '65px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Ref Sl. No.',
				datafield : 'refSrlNO',
				'width' : '50px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Segment',
				datafield : 'segment',
				'width' : '67px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Jewel Type',
				datafield : 'jewelType',
				'width' : '75px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Purity',
				datafield : 'purity',
				'width' : '45px',
				sortable : false,
				editable : false,
				cellsalign:'right',
				cellsformat : 'd2'
			},
			{
				'text' : 'Pcs / Pairs',
				datafield : 'pcsOrPair',
				'width' : '45px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Gross Wt.',
				datafield : 'gwtWeight',
				'width' : '45px',
				sortable : false,
				editable : false,
				cellsalign:'right',
			},
			{
				'text' : 'Net Wt.',
				datafield : 'netWeight',
				'width' : '45px',
				sortable : false,
				editable : false,
				cellsalign:'right',
			},
			{
				'text' : 'FG Diamond Wt.',
				datafield : 'fgDaimondWeight',
				'width' : '85px',
				sortable : false,
				cellsalign:'right',
				editable : false
			},
			{
				'text' : 'Stone / Acc Pcs',
				datafield : 'stoneOrAccPcs',
				'width' : '65px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Stone / Acc Wt',
				datafield : 'stoneOrAccWeight',
				'width' : '65px',
				sortable : false,
				cellsalign:'right',
				editable : false
			},
			{
				'text' : 'Item Value in Rs.',
				datafield : 'itemValueRs',
				'width' : '80px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Remarks',
				datafield : 'remarks',
				'width' : '60px',
				sortable : false,
				cellsalign:'left',
				editable : false
			},
			{
				'text' : 'To Store / Dc',
				datafield : 'toDc',
				'width' : '90px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'To Zone',
				datafield : 'toZone',
				'width' : '70px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Transfer Done by',
				datafield : 'transferDoneBy',
				'width' : '80px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Received by',
				datafield : 'receivedBy',
				'width' : '80px',
				sortable : false,
				editable : false
			},
			{
				text : 'Move To Metal/ Stone Location',
				datafield : null,
				sortable : false,
				editable : false,
				'width' : '70px',
			},
			{
				text : '',
				menu : false,
				sortable : false,
				datafield : 'selectionStatus',
				columntype : 'checkbox',
				width : 30,
				editable : true,
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue) {
					if (newvalue) {
						$("#jqxgrid").jqxGrid('selectrow', row);
					} else {
						$("#jqxgrid").jqxGrid('unselectrow', row);
					}
				},
				renderer : function() {
					return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
				}

			} ];

	showMyGrid(datafields,
			"/OrderExecution/api/v1/transitList?page=TVAcknowledgement", "list",
			columns, tvafilterValues(), updateRows, "id");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true
	});
	

}


function psrNumberListingGrid() {
	var updateRows = function(rowid, newdata, commit) {
		updates[rowid] = {
				
		};
	}

	var vendorTypeSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : vendors
	};

	var vendorTypeDataAdapter = new $.jqx.dataAdapter(vendorTypeSource, {
		autoBind : true
	});

	var datafields = [ 
	                   {
		'name' : 'psrNumber',
		'type' : 'Long'
	}, {
		'name' : 'orderType',
		'type' : 'string'
	}, {
		'name' : 'orderNo',
		'type' : 'int'
	}, {
		'name' : 'storeCode',
		'type' : 'string'
	},{
		'name' : 'orderSl',
		'type' : 'int'
	},{
		'name' : 'orderItemNo',
		'type' : 'long'
	}, 
	 {
		'name' : 'orderKind',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'jewelType',
		'type' : 'string'
	}, {
		'name' : 'category',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	}, {
		'name' : 'articleCode',
		'type' : 'string'
	}, {
		'name' : 'psrStatus',
		'type' : 'string'
	}, {
		'name' : 'pcs',
		'type' : 'string'
	}, {
		'name' : 'fromWeight',
		'type' : 'string'
	}, {
		'name' : 'toWeight',
		'type' : 'string'
	}, {
		name : 'vendorCode',
		type : 'string'
	},
	{
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'psrNumber'
	}
	
	];

	var columns = [

			{
				'text' : 'PSR No',
				'datafield' : 'psrNumber',
				'width' : '4%',	
				cellsalign : 'center',
				align : 'center',
				editable : false
			},{
				'text' : 'PSR Status',
				'datafield' : 'psrStatus',
				'width' : '4%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order Type',
				'datafield' : 'orderType',
				'width' : '7%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order No.',
				'datafield' : 'orderNo',
				'width' : '4%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order Sl.',
				'datafield' : 'orderSl',
				'width' : '5%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},{
				'text' : 'Store',
				'datafield' : 'storeCode',
				'width' : '10%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},{
				'text' : 'Order Kind',
				'datafield' : 'orderKind',
				'width' : '8%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Segment',
				'datafield' : 'segment',
				'width' : '6%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Jewel Type',
				'datafield' : 'jewelType',
				'width' : '7%',
				sortable : false,
				cellsalign : 'center',
				align : 'center',
				editable : false
			},
			{
				'text' : 'Main Category',
				'datafield' : 'category',
				'width' : '7%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Sub Category',
				'datafield' : 'subCategory',
				'width' : '10%',
				cellsalign : 'left',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Article Code',
				'datafield' : 'articleCode',
				'width' : '8%',
				sortable : false,
				editable : false,
				cellsalign : 'center',
				align : 'center'
			},
			{
				'text' : 'Pcs',
				'datafield' : 'pcs',
				'width' : '3%',
				sortable : false,
				editable : false,
				cellsalign : 'center',
				align : 'center'
			},
			{
				'text' : 'From Wt',
				'datafield' : 'fromWeight',
				'width' : '6%',
				sortable : false,
				editable : false,
				cellsalign : 'right',
				align : 'center'
			},
			{
				'text' : 'To Wt',
				'datafield' : 'toWeight',
				'width' : '5%',
				sortable : false,
				editable : false,
				cellsalign : 'right',
				align : 'center'
			},
			{
				text : 'Assign Vendor',
				datafield : 'vendorCode',	
				editable : false,
				sortable : false,
				'width' : '6%',
				cellsalign : 'center',
				align : 'center'
			}
 ];
	
	
	showMyGrid(datafields, "/OrderExecution/api/v1/orderList?page=psr",	"list", columns, orderFilterValues(), updateRows, "psrNumber");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true
	});

}


function wOrderDetailsFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};

    var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();	
	var vendorId = $('#vendorCode').val();
	var vendorval = $('#vendorCode-value').val();
	var workOrderNumber=$('#workOrderNumber').val();
	
	
    if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["orderFromDate"] = fromDate;
	}

	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["orderToDate"] = toDate;
	}
	if (vendorId != "" && vendorId != null) {
		fieldFilters.fieldFilters["vendorId"] = vendorval;
	}
	if (workOrderNumber != "" && workOrderNumber != null) {
		fieldFilters.fieldFilters["workOrderNumber"] = workOrderNumber;
	}

	return fieldFilters;
}


function openApprovedDesign(value)
{
	
	var viewDesign = $('#jqxgrid').jqxGrid('getcellvalue', value, 'approvedDesigns');
	console.log(viewDesign);
	var viewDesignList = [];
	 viewDesignList = viewDesign.list;
	$('#pagination-demo').twbsPagination({
	    totalPages: viewDesign.size,
	    visiblePages: "5",
	    onPageClick: function (event, page) {
	    		$.each(viewDesignList, function(k, v){
	    			if((page-1) == k){
	    				console.log(v);
	    				var img =  "<a href='/uf/"+v.id+"' target='_blank'><img src='/uf/"+v.id+"' height='60%' width ='60%' /></a>";
	    				$('#page-content').html(img);
	    			}
	    		});
	    }
	});
	
}

var viewDesignRender = function(row, column, value) {
	
	 var approvedDesigns = $('#jqxgrid').jqxGrid('getcellvalue', row, 'approvedDesigns');
	 if(approvedDesigns == null || approvedDesigns == ""){
		 return '<div class="text-center"><a class="btn btn-sm btn-primary" disabled /><span class="fa fa-eye"></span> </a></div>';
	 }else{
		 return '<div class="text-center"><a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#designViewOrder" type="button" onclick="openApprovedDesign('
		 + row + ')"/><span class="fa fa-eye"></span> </a></div>';
	 }
}



var wOrderPrintRenderer = function(row, column, value) {
	var Parcelid =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'pacelId');
	var Okind  =    $('#jqxgrid').jqxGrid('getcellvalue', row, 'orderKind');
	var WorkOrderNo  =    $('#jqxgrid').jqxGrid('getcellvalue', row,'workOrderNumber');
	return '<a class="btn btn-sm btn-primary"  type="button" style="margin-right:5px"  onclick=wOrderPrintcall('+ value +',"'+ Parcelid  +'","'+ Okind  +'","'+WorkOrderNo.split(" ")+'") href="#?id=' 
	+ value + '"/><i class="fa fa-print fa-lg"></i> </a>'+ '<a class="btn btn-sm btn-danger "  type="button"  onclick=wOrderEmaild('+ value +',"'+ Parcelid  +'","'+ Okind  +'","'+WorkOrderNo+'") href="#?id=' 
		+ value + '"/><i class="fa fa-envelope"></i> </a>'
		
	}

function wOrderPrintcall(wOrderId , pId , oKind,wOnumber)
{
	if(wOrderId!=null && pId!='null' && (oKind.includes("CRP") || oKind.includes("CSP")) )
		{	
	fieldFilters = {
            "fieldFilters" : {
                "wHeaderId" : wOrderId,
                "mode" : "pdf",
                "reportName" : "RPT_VendorPO"
            }
        };
	jasperReport('RPT_VendorPO.pdf', fieldFilters);
		}
	else if(wOrderId!=null && !oKind.includes("CRP") && !oKind.includes("CSP"))
		{
		fieldFilters = {
	            "fieldFilters" : {
	                "wHeaderId" : wOrderId,
	                "mode" : "pdf",
	                "reportName" : "RPT_VendorPO"
	            }
	        };
		jasperReport('RPT_VendorPO.pdf', fieldFilters);
		
		
		}
	else 
	{
	$.growl.warning({
	    message : "Parcel ID does not exist for WO:" +wOnumber+". "+"Cannot print the WO.",
	    duration : 10000,
	    title : 'Warning'
	   });
	
	}
}



function workOrderListingGrid() {
	var updateRows = function(rowid, newdata, commit) {
		
	}
	
	var datafields = [ {
		'name' : 'workOrderNumber',
		'type' : 'String'
	}, {
		'name' : 'createdDate',
		'type' : 'Date'
	}, {
		'name' : 'vendor',
		'type' : 'String'
	},
	{
		'name' : 'id',
		'type' : 'int'
	},
	{
		'name' : 'pacelId',
		'type' : 'Long'
	},
	{
		'name' : 'orderKind',
		'type' : 'String'
	}
	];
	
	var columns = [
	   			{
	   				'text' : 'Work Order No.',
	   				'datafield' : 'workOrderNumber',
	   				'width' : '25%',
	   				cellsalign : 'center',
	   				align : 'center',
	   				editable : false
	   			},
	   			{
	   				'text' : 'Work Order Date',
	   				'datafield' : 'createdDate',
	   				'width' : '34%',
	   				cellsalign : 'center',
	   				align : 'center',
	   				sortable : true,
	   				editable : false
	   			},
	   			{
	   				'text' : 'Vendor',
	   				'datafield' : 'vendor',
	   				'width' : '35%',
	   				cellsalign : 'left',
	   				align : 'center',
	   				sortable : true,
	   				editable : false
	   			},
	   			{
	   				text : 'Action',
	   				datafield : 'id',
	   				cellsrenderer : wOrderPrintRenderer,
	   				editable : false,
	   				cellsalign : 'center',
	   				align : 'center',
	   				sortable : false,
	   				'width' : '6%'
	   			}
	   					
	   			];
	showMyGrid(datafields,
			"/OrderExecution/api/v1/worderList?page=wOrderList", "list",
			columns, wOrderDetailsFilterValues(), updateRows, "workOrderNumber");	
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
	
     }

$('input:text:visible:first').focus();

var wOrderEmaild = function(wOrderId , pId , oKind,wOnumber)
{
	var params = {
		"fieldFilters":
		{
		"wHeaderId":wOrderId,
		"mode":"pdf",
		"reportName":"RPT_VendorPO"
		}
		}
	 postJSON('/OrderExecution/api/v1/sendEmailByPurchaseOrder', JSON.stringify(params),function(data){
		 
		 if(data.resCode == 1){
				if(data.mesgStr != ""){
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					return false;
				}
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
	 });
	

}