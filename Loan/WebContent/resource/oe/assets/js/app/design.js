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

var $designBy = $('#designBy');
	var $orderTypes = $('#orderTypes');
	var $designers = $('#designers');

	$.getJSON('/OrderExecution/api/v1/designLOV?page=DesignUpload', function(
			data) {

		//iterate over the data and append a select option
		/* $.each(data.payload.orderTypes, function(key, val) {
			$orderTypes.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		}); */
		
		var o = '<select id="orderTypesObj"  name="orderTypesObj" class="form-control" multiple="multiple">';
		$.each(data.payload.orderTypes, function(key, val) {
		o += '<option value="' + val.id + '">' + val.name + '</option>'; 
		});
		
		o += '</select>';
		
		$("#orderTypeS").html(o);
		
		$('#orderTypesObj').multiselect({
		includeSelectAllOption : false,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});

		$.each(data.payload.designBy, function(key, val) {
			$designBy.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});

		internalDesigners = data.payload.Internal;
		externalDesigners = data.payload.External;

	});

	$("#designBy").on(
			"change",
			function() {
				var designBy = $('#designBy').val();
				if (designBy == "External") {
					$designers.empty().append(
							'<option value="" selected>--Select--</option>');
					$.each(externalDesigners, function(index, val) {
						$designers.append('<option value="' + val.id + '">'
								+ val.name + '</option>');
					});
				} else if (designBy == "Internal") {
					$designers.empty().append(
							'<option value="" selected>--Select--</option>');
					$.each(internalDesigners, function(index, val) {
						$designers.append('<option value="' + val.id + '">'
								+ val.name + '</option>');
					});
				} else {
					$designers.empty().append(
							'<option value="" selected>--Select--</option>');
				}

			});
	
	// search functionality
	$("#Search").on("click", function() {
		 var orderTypeObj = $("#orderTypesObj").val();
		 if(orderTypeObj =="" || orderTypeObj == null){
			 $.growl.error({
				 message : "Please Select Order Type !!!",
				 duration : 500,
				 title : 'Error'
			 });
			 return false;
		 }
		 var orderTypeVal = orderTypeObj.toString();
		 	if(orderTypeVal == "CU,ST" || orderTypeVal == "CU,CO" || orderTypeVal == "DO,ST" || orderTypeVal == "DO,CO" || orderTypeVal == "CU,DO,ST" ||
		 		orderTypeVal == "CU,DO,CO"|| orderTypeVal == "CU,ST,CO" || orderTypeVal == "DO,ST,CO" || orderTypeVal == "CU,DO,ST,CO"){
		 		designUploadGrid();
				$("#jqxgrid").hide();
		 		$.growl.error({
		 			message : "Order type can not be combination of " +  orderTypeVal,
		 			duration : 500,
		 			title : 'Error'
		 		});
		 		$("#orderTypesObj").multiselect('deselect', orderTypeObj);
				$("#orderTypesObj").multiSelect("clearSelection");

				return false;
		 		
		 	}
			designUploadGrid();
			$("#jqxgrid").show();
			
			return false;
		});
	
	// clear functionality
	$("#clearAll").on('click',function(){
		$('#orderTypesObj').multiselect("clearSelection");
		
		var validator = $("form").validate();
		validator.resetForm();

		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
		$("#designers").prop('disabled', true);
	});
	



var dataEntire = {};
var internalDesigners = {};
var externalDesigners = {};
var initialResponse = true;
var updates = new Object();
var designType = {};
var vendors = {};
var fieldFilters = {};
var designUploadId = 0;
var designVariation = 0;


var approveDesign = function(row) {
	return '<button type="Button" onClick="approveDesignEvent(event)" value="button" class="btn btn-sm btn-danger" id="'
			+ $("#jqxgrid").jqxGrid('getcellvalue', row, "id")
			+ '"><span class="fa fa-cogs fa-1"></span> Action </button>';
}

var approveDesignEvent = function(event) {

}

var designId = 0;

var uploadDesign = function(row) {
	return '<a href="designSubmit?designId="'
			+ designId
			+ ' "type="button" id="'
			+ $("#jqxgrid").jqxGrid('getcellvalue', row, "id")
			+ '"class="btn btn-sm btn-danger" data-toggle="modal" data-target="#designUpload"> <i class="fa fa-cogs fa-1"></i> Upload  </a>';
	
}

var linkrenderer = function(row, column, value) {
		
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnUploadDA" type="button" href="designSubmit?designId='
				+ value + '"/><i class="fa fa-upload fa-lg"></i> </a>'
		
	}
var mivDetails = function(row, column, value) {
	
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#sentParcelMiv" type="button" href="javascript:void(0)"/><i class="fa fa-cogs fa-1"></i> MIV Details </a>'
		
	}	


var designReviewrenderer = function(row, column, value) {
	var designReview = "designReview";
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnReviewDA" type="button" href="designReview?page='+designReview+'&designId='+ value + '"/><i class="fa fa-binoculars"></i>  </a>'
		
	}


var viewDesignVariationRenderer = function(row, column, value) {
	var designSearch = "designSearch";
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnViewDV" type="button" href="designReview?page='+designSearch+'&designId='
				+ value + '"/><i class="fa fa-eye"></i></a>'
		
}

var uploadDesignEvent = function(event) {
	designId = event.target.id;
	/*
	 * location.href = "designSubmit?designId=" + event.target.id+"
	 * data-toggle='modal' data-target='#designUpload'";
	 */
	return false;
}

var sortFields = [ {
	"fieldPath" : "createdDate"
} ];

function designFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};

	var orderSlNo = $('#orderSlNo').val();
	var designStatus = $('#designStatus').val();
	var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();
	var storeCodes = $('#storeCodes').val();
	var orderTypeS = $('#orderTypeS').val();
	var segments = $('#segments').val();
	var orderNo = $('#orderNo').val();
	var designBy = $('#designBy').val();
	var designers = $('#designers').val();
	var vendors = $('#vendors').val();
	var orderKinds = $('#orderKinds').val();
	
	
	

	if (orderSlNo != "" && orderSlNo != null) {
		fieldFilters.fieldFilters["orderSlNo"] = orderSlNo;
	}

	if (designStatus != "" && designStatus != null) {
		fieldFilters.fieldFilters["designStatus"] = designStatus;
	}

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["orderFromDate"] = fromDate;
	}

	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["orderToDate"] = toDate;
	}

	if (storeCodes != "" && storeCodes != null) {
		fieldFilters.fieldFilters["storeCodes"] = storeCodes;
	}
	
	var orderTypesObj = $('#orderTypesObj').val();
	if (orderTypesObj == null || orderTypesObj == "") {
		var orderTypeS = "";
	} else {
		var orderTypeS = orderTypesObj.join(",");
	}
	if (orderTypeS != "" && orderTypeS != null) {
		fieldFilters.fieldFilters["orderTypes"] = orderTypeS;
	}
	if (segments != "" && segments != null) {
		fieldFilters.fieldFilters["segment"] = segments;
	}

	if (orderNo != "" && orderNo != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNo;
	}

	if (designBy != "" && designBy != null) {
		fieldFilters.fieldFilters["designBy"] = designBy;
	}
	if (designers != "" && designers != null) {
		fieldFilters.fieldFilters["designer"] = designers;
	}
	if (vendors != "" && vendors != null) {
		fieldFilters.fieldFilters["vendors"] = vendors;
	}
	if (orderKinds != "" && orderKinds != null) {
		fieldFilters.fieldFilters["orderKinds"] = orderKinds;
	}
	
	return fieldFilters;
}

function assignDesignerGrid() {

	var updateRows = function(rowid, newdata, commit) {
		updates[newdata.id] = {
			"id" : newdata.id,
			"designBy" : newdata.designBy,
			"designer" : newdata.designer,
			"selectionStatus" : undefined != newdata.selectionStatus ? newdata.selectionStatus
					: false
		};
	}
	
	var designerTypeSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : designType
	};

	var designerTypeDataAdapter = new $.jqx.dataAdapter(designerTypeSource, {
		autoBind : true
	});

	var designersSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		}, {
			name : 'description',
			type : 'string'
		} ],
		localdata : internalDesigners.concat(externalDesigners)
	};

	var designersDataAdapter = new $.jqx.dataAdapter(designersSource, {
		autoBind : true
	});

	var datafields = [ {
		'name' : 'id',
		'type' : 'int'
	}, {
		'name' : 'storeCode',
		'type' : 'string'
	}, {
		'name' : 'orderNo',
		'type' : 'int'
	}, {
		'name' : 'orderSl',
		'type' : 'int'
	}, {
		'name' : 'orderType',
		'type' : 'string'
	}, {
		'name' : 'orderKind',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'jewelType',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	}, {
		'name' : 'noOfDesigns',
		'type' : 'int'
	}, {
		'name' : 'vendorCode',
		'type' : 'string'
	}, {
		'name' : 'orderDate',
		'type' : 'string'
	}, {
		'name' : 'orderItemDueDate',
		'type' : 'string'
	}, {
		'name' : 'designDueDate',
		'type' : 'string'
	}, {
		'name' : 'designStatus',
		'type' : 'string'
	}, {
		'name' : 'orderCreatedBy',
		'type' : 'string'
	},{
		'name' : 'designBy',
		'type' : 'string'
	}, {
		name : 'designBys',
		value : 'designBy',
		values : {
			source : designerTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		name : 'designer',
		type : 'int',
	}, {
		name : 'designers',
		value : 'designer',
		map: 'designerName',
		values : {
			source : designersDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'selectionStatus',
		'type' : 'bool'
	} ];

	var columns = [

			{
				'text' : 'Store',
				'datafield' : 'storeCode',
				'width' : '6%',
				editable : false,
				cellsalign : 'center',
				align : 'center',
			},
			{
				'text' : 'Order No.',
				'datafield' : 'orderNo',
				'width' : '5%',
				cellsalign : 'center',
				align : 'center',
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
			},
			{
				'text' : 'Order Type',
				'datafield' : 'orderType',
				'width' : '5%',
				sortable : false,
				cellsalign : 'center',
				align : 'center',
				editable : false
			},
			{
				'text' : 'Order Kind',
				'datafield' : 'orderKind',
				'width' : '7%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Seg',
				'datafield' : 'segment',
				'width' : '5%',
				editable : false,
				cellsalign : 'center',
				align : 'center',
			},
			{
				'text' : 'Jewel Type',
				'datafield' : 'jewelType',
				'width' : '7%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Sub Cat',
				'datafield' : 'subCategory',
				'width' : '6.5%',
				cellsalign : 'left',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'No. of Desn.',
				'datafield' : 'noOfDesigns',
				'width' : '5%',
				cellsalign : 'center',
				align : 'center',
				editable : false
			},
			{
				'text' : 'Vendor',
				'datafield' : 'vendorCode',
				'width' : '5%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order Dt.',
				'datafield' : 'orderDate',
				'width' : '5%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order Item Due Dt.',
				'datafield' : 'orderItemDueDate',
				'width' : '6%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Design Due Dt.',
				'datafield' : 'designDueDate',
				'width' : '6%',
				cellsalign : 'center',
				align : 'center',
				editable : false
			},
			{
				'text' : 'Design Status',
				'datafield' : 'designStatus',
				'width' : '7%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order Raised by',
				'datafield' : 'orderCreatedBy',
				'width' : '6%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				text : 'Designer Type',
				datafield : 'designBy',
				columntype : 'combobox',
				displayfield : 'designBys',
				cellsalign : 'center',
				align : 'center',
				editable : true,
				'width' : '5%',
				createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : designerTypeDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue.value != oldvalue) {
						$("#jqxgrid").jqxGrid('setcellvalue', row, "designers",	"--Select--");
						$("#jqxgrid").jqxGrid('setcellvalue', row, "designer",null);
					};
				}
			},
			{
				text : 'Designer',
				datafield : 'designer',
				columntype : 'dropdownlist',
				displayfield : 'designers',
				'width' : '6.5%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				initeditor : function(row, value, editor) {
					var designers = {};
					switch ($('#jqxgrid').jqxGrid('getcellvalue', row,"designBy")) {
					case "Internal":
						designers = internalDesigners;
						break;
					case "External":
						designers = externalDesigners;
						break;
					};

					var designerName = editor.val();
					editor.jqxDropDownList({
						source : designers,
						displayMember : 'name',
						valueMember : 'id'
					});
				}
			},
			{
				text : '',
				menu : true,
				sortable : false,
				cellsalign : 'center',
				align : 'center',
				datafield : 'selectionStatus',
				columntype : 'checkbox',
				width : '2%',
				rendered: function (element) {
                  
                    $(element).on('change', function (event) {
                        var checked = event.args.checked;
                       
                        if (checked == null || updatingCheckState) return;
                        $("#jqxgrid").jqxGrid('beginupdate');

                        // select all rows when the column's checkbox is checked.
                        if (checked) {
                            $("#jqxgrid").jqxGrid('selectallrows');
                        }
                        // unselect all rows when the column's checkbox is checked.
                        else if (checked == false) {
                            $("#jqxgrid").jqxGrid('clearselection');
                        }
                        $("#jqxgrid").jqxGrid('endupdate');
                    });
                    return true;
                },
            		
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					var designer = $("#jqxgrid").jqxGrid('getcellvalue', row, 'designer');
					if(designer == null || designer == ""){
						$.growl.error({
							message : "Please select designer.",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
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

	showMyGrid(datafields, "/OrderExecution/api/v1/designList?page=ARDesigner",	"list", columns, designFilterValues(), updateRows, "orderNo");
		$("#jqxgrid").jqxGrid({
			width : '100%',
	        sortable: true,            
	     	altrows: true,
	    	columnsresize: true, 
			rowsheight : 35,
			theme: 'energyblue',
			columnsheight: 75,
			rowdetails : true,
			virtualmode : true,
			selectionmode : 'none',
		});

}

function designApprovalGrid() {

	var updateRows = function(rowid, newdata, commit) {
		updates[newdata.id] = {
			"id" : newdata.id,
			"selectionStatus" : undefined != newdata.selectionStatus ? newdata.selectionStatus
					: false
		};
	}

	var datafields = [ {
		'name' : 'orderNo',
		'type' : 'int'
	}, {
		'name' : 'orderSl',
		'type' : 'int'
	}, {
		'name' : 'orderType',
		'type' : 'string'
	}, {
		'name' : 'orderKind',
		'type' : 'string'
	}, {
		'name' : 'orderDate',
		'type' : 'string'
	}, {
		'name' : 'jewelType',
		'type' : 'string'
	}, {
		'name' : 'designDueDate',
		'type' : 'string'
	}, {
		'name' : 'designStatus',
		'type' : 'string'
	}, {
		'name' : 'designInstruction',
		'type' : 'string'
	}, {
		'name' : 'designerName',
		'type' : 'string'
	}, {
		'name' : 'designIdNo',
		'type' : 'int'
	}, {
		'name' : 'id',
		'type' : 'int'
	}, {
		'name' : 'noOfDesigns',
		'type' : 'int'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'id'
	}, ];

	var columns = [

	{
		'text' : 'Order No.',
		'datafield' : 'orderNo',
		'width' : '8%',
		sortable : true,
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Order Sl. No.',
		'datafield' : 'orderSl',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Order Type',
		'datafield' : 'orderType',
		'width' : '9%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Order Kind',
		'datafield' : 'orderKind',
		'width' : '9%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Order Dt.',
		'datafield' : 'orderDate',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Jewel Type',
		'datafield' : 'jewelType',
		'width' : '9%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Design Due Dt.',
		'datafield' : 'designDueDate',
		'width' : '9%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Design Status',
		'datafield' : 'designStatus',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Design Instruction',
		'datafield' : 'designInstruction',
		'width' : '12%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Designer',
		'datafield' : 'designerName',
		'width' : '9%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Design Id No.',
		'datafield' : 'id',
		cellsalign : 'center',
		align : 'center',
		'width' : '8%',
		sortable : false,
		editable : false
	}, {
		text : 'Action',
		datafield : 'actionId',
		cellsrenderer : designReviewrenderer,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '3%'
	} ];

	showMyGrid(datafields,	"/OrderExecution/api/v1/designList?page=DesignRevApprove", "list",columns, designFilterValues(), updateRows, "orderNo");
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

function designSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		updates[newdata.id] = {	
				"selectionStatus" : undefined != newdata.selectionStatus ? newdata.selectionStatus	: false
		}
	}

	var datafields = [ {
		'name' : 'storeCode',
		'type' : 'string'
	}, {
		'name' : 'orderNo',
		'type' : 'int'
	}, {
		'name' : 'orderSl',
		'type' : 'int'
	}, {
		'name' : 'orderType',
		'type' : 'string'
	}, {
		'name' : 'orderKind',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'jewelType',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	}, {
		'name' : 'noOfDesigns',
		'type' : 'int'
	}, {
		'name' : 'orderDate',
		'type' : 'string'
	}, {
		'name' : 'orderItemDueDate',
		'type' : 'string'
	}, {
		'name' : 'designDueDate',
		'type' : 'string'
	}, {
		'name' : 'designStatus',
		'type' : 'string'
	}, {
		'name' : 'orderCreatedBy',
		'type' : 'string'
	}, {
		'name' : 'designByValue',
		'type' : 'string'
	}, {
		'name' : 'designerName',
		'type' : 'string'
	}, {
		'name' : 'id',
		'type' : 'int'
	}, 
	
	{
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'id'
	} ];

	var columns = [
			{
				'text' : 'Store/DC',
				'datafield' : 'storeCode',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				editable : false
			},
			{
				'text' : 'Order No.',
				'datafield' : 'orderNo',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				editable : false
			},
			{
				'text' : 'Order Sl.',
				'datafield' : 'orderSl',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order Type',
				'datafield' : 'orderType',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order Kind',
				'datafield' : 'orderKind',
				'width' : '7%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Seg',
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
				'width' : '7%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Sub Cat',
				'datafield' : 'subCategory',
				'width' : '8%',
				cellsalign : 'left',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'No. of Desn.',
				'datafield' : 'noOfDesigns',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				editable : false
			},
			{
				'text' : 'Order Dt.',
				'datafield' : 'orderDate',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order Item Due Dt.',
				'datafield' : 'orderItemDueDate',
				'width' : '7%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Design Due Dt',
				'datafield' : 'designDueDate',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				editable : false
			},
			{
				'text' : 'Design Status',
				'datafield' : 'designStatus',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order Raised by',
				'datafield' : 'orderCreatedBy',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Design By',
				'datafield' : 'designByValue',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Designer',
				'datafield' : 'designerName',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Design ID',
				'datafield' : 'id',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			
			{
				text : '',
				datafield : 'actionId',
				cellsalign : 'center',
				align:'center',
				cellsrenderer : viewDesignVariationRenderer,
				editable : false,
				sortable : false,
				'width' : '3%'
			},
			
			{
				text : '',
				sortable : false,
				datafield : 'selectionStatus',
				columntype : 'checkbox',
				cellsalign : 'center',
				align:'center',
				'width' : '3%',
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue) {
					console.log(newvalue);
					if (newvalue) {
						$("#jqxgrid").jqxGrid('selectrow', row);						
						
					} else {
						$("#jqxgrid").jqxGrid('unselectrow', row);
					}
				},
				renderer : function() {
					return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
				}

			}
			
			];

	showMyGrid(datafields,"/OrderExecution/api/v1/designList?page=DesignSearch", "list",
			columns, designFilterValues(), updateRows, "orderNo");
		$("#jqxgrid").jqxGrid({
			 width: '100%',
			editable : true,
			columnsheight : 70,
			autoheight : true,
			theme: "energyblue",
			pageable : 'true',
			altRows : true,
			sortable: true,
			columnsresize : true,
			selectionmode : 'none',
		});

}

function designUploadGrid() {

	var updateRows = function(rowid, newdata, commit) {
		
	}

	var datafields = [ {
		'name' : 'storeCode',
		'type' : 'string'
	}, {
		'name' : 'orderType',
		'type' : 'string'
	}, {
		'name' : 'orderNo',
		'type' : 'int'
	}, {
		'name' : 'orderSl',
		'type' : 'int'
	}, {
		'name' : 'orderKind',
		'type' : 'string'
	}, {
		'name' : 'jewelType',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'designerName',
		'type' : 'string'
	}, {
		'name' : 'orderDate',
		'type' : 'string'
	}, {
		'name' : 'orderItemDueDate',
		'type' : 'string'
	}, {
		'name' : 'releaseDate',
		'type' : 'string'
	}, {
		'name' : 'designDueDate',
		'type' : 'string'
	}, {
		'name' : 'designInstruction',
		'type' : 'string'
	}, {
		'name' : 'id',
		'type' : 'int'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'id'
	}, {
		'name' : 'noOfDesigns',
		'type' : 'int'
	} ];

	var columns = [ {
		'text' : 'Store',
		'datafield' : 'storeCode',
		'width' : '10%',
		cellsalign : 'left',
		align : 'center',
		editable : false
	},
	{
		'text' : 'Order No.',
		'datafield' : 'orderNo',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Order Sl.',
		'datafield' : 'orderSl',
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
		'text' : 'Order Kind',
		'datafield' : 'orderKind',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, 
	{
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	},
	{
		'text' : 'Jewel Type',
		'datafield' : 'jewelType',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Designer',
		'datafield' : 'designerName',
		'width' : '9%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Order Dt.',
		'datafield' : 'orderDate',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Order Item Due Dt.',
		'datafield' : 'orderItemDueDate',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Design RLS Dt.',
		'datafield' : 'releaseDate',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Design Due Dt.',
		'datafield' : 'designDueDate',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Design Instruction',
		'datafield' : 'designInstruction',
		'width' : '11%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Design ID',
		'datafield' : 'id',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		text : '',
		datafield : 'actionId',
		cellsrenderer : linkrenderer,
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false,
		'width' : '3%'
	} ];

	showMyGrid(datafields,	"/OrderExecution/api/v1/designList?page=DesignUpload", "list",	columns, designFilterValues(), updateRows, "orderNo");
		$("#jqxgrid").jqxGrid({
			width : '100%',
	        sortable: true,            
	     	altrows: true,
	     	autorowheight :true,
	        autoheight :true,
	        columnsheight: 55,
	        theme: 'energyblue',
	        columnsresize: true,  
			rowsheight : 35,
			rowdetails : true,
			virtualmode : true,
		});

}


function assignReleaseOrderGrid() {

	var updateRows = function(rowid, newdata, commit) {
		
		updates[rowid] = {
			"orderNo" : newdata.orderNo,
			"orderSl" : newdata.orderSl,
			"vendorId" : newdata.vendorId,
			"selectionStatus" : undefined != newdata.selectionStatus ? newdata.selectionStatus
					: false
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
		
		

	var datafields = [ {
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
	}, 
	{
		'name' : 'orderSl',
		'type' : 'int'
	},  {
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
		'type' : 'string'
	},{
		'name' : 'orderItemDueDate',
		'type' : 'string'
	},{
		name : 'vendorId',
		type : 'string'
	},{
		name : 'vendorIds',
		value : 'vendorId',
		values : {
			source : vendorTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	
	{
		'name' : 'selectionStatus',
		'type' : 'bool'
	} ];

	var columns = [

			{
				'text' : 'Store',
				'datafield' : 'storeCode',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				editable : false
			},
			{
				'text' : 'Order Type',
				'datafield' : 'orderType',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order No.',
				'datafield' : 'orderNo',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				editable : false
			},
			{
				'text' : 'Order Sl.',
				'datafield' : 'orderSl',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
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
				'width' : '6%',
				cellsalign : 'center',
				align:'center',
				editable : false
			},
			{
				'text' : 'Jewel Type',
				'datafield' : 'jewelType',
				'width' : '6%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Main Cat',
				'datafield' : 'category',
				'width' : '6%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Sub Cat',
				'datafield' : 'subCategory',
				'width' : '6%',
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
				'text' : 'PCS',
				'datafield' : 'pcs',
				'width' : '5%',
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
				'width' : '8%',
				cellsalign : 'left',
				align:'center',
				editable : false
			},
			{
				'text' : 'Order Date',
				'datafield' : 'orderDate',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order Due Date',
				'datafield' : 'orderItemDueDate',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Vendor Due Date',
				'width' : '5%',
				cellsalign : 'center',
				align:'center',
				sortable : false,
				editable : false
			},
			{
				text : 'Assign Vendor',
				datafield : 'vendorId',
				columntype : 'combobox',
				displayfield : 'vendorIds',
				cellsalign : 'center',
				align:'center',
				editable : true,
				sortable : false,
				'width' : '5%',
				createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : vendorTypeDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				}
			},
			{
				text : 'Release Y/N',
				sortable : false,
				datafield : 'selectionStatus',
				columntype : 'checkbox',
				cellsalign : 'center',
				align:'center',
				width : '3%',
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

	showMyGrid(datafields, "/OrderExecution/api/v1/orderList?page=AROrder", "list", columns, designFilterValues(), updateRows, "orderNo");
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


function transferVoucherGrid() {

	var updateRows = function(rowid, newdata, commit) {
		updates[newdata.id] = {
			"id" : newdata.id,
			"designer" : newdata.designer,
			"selectionStatus" : undefined != newdata.selectionStatus ? newdata.selectionStatus
					: false
		};
	}

	var designerTypeSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : designType
	};

	var designerTypeDataAdapter = new $.jqx.dataAdapter(designerTypeSource, {
		autoBind : true
	});

	
	var datafields = [ {
		'name' : 'id',
		'type' : 'int'
	}, {
		'name' : 'storeCode',
		'type' : 'string'
	}, {
		'name' : 'orderNo',
		'type' : 'int'
	}, {
		'name' : 'orderSl',
		'type' : 'int'
	}, {
		'name' : 'orderType',
		'type' : 'string'
	}, {
		'name' : 'orderKind',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'jewelType',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	}, {
		'name' : 'noOfDesigns',
		'type' : 'int'
	}, {
		'name' : 'vendorCode',
		'type' : 'string'
	}, {
		'name' : 'orderDate',
		'type' : 'string'
	}, {
		'name' : 'orderItemDueDate',
		'type' : 'string'
	}, {
		'name' : 'designDueDate',
		'type' : 'string'
	}, {
		'name' : 'designStatus',
		'type' : 'string'
	}, {
		'name' : 'orderCreatedBy',
		'type' : 'string'
	},{
		'name' : 'designBy',
		'type' : 'string'
	}, {
		name : 'designBys',
		value : 'designBy',
		values : {
			source : designerTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'selectionStatus',
		'type' : 'bool'
	} ];

	var columns = [

			{
				'text' : 'Date',
				'width' : '100px',
				editable : false
			},
			{
				'text' : 'Transfer Slip No.',
				'width' : '80px',
				editable : false
			},
			{
				'text' : 'From Store',
				'width' : '80px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'From Zone',
				'width' : '100px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'Metal Loc',
				'width' : '120px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'Ref. Doc. Type',
				'width' : '75px',
				editable : false
			},
			{
				'text' : 'Ref No.',
				'width' : '100px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'Ref Sl.No.',
				'width' : '150px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'Segment',
				'width' : '100px',
				editable : true
			},
			{
				'text' : 'Jewel Type',
				'width' : '60px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'Purity',
				'width' : '90px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'Pcs./Pairs',
				'width' : '130px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'G.Wt.',
				'width' : '130px',
				editable : true,
				cellsalign : 'right',
				align : 'center'
			},
			{
				'text' : 'N.Wt.',
				'width' : '100px',
				sortable : false,
				editable : true,
				cellsalign : 'right',
				align : 'center'
			},
			{
				'text' : 'FG Diamond wt.',
				'width' : '100px',
				sortable : false,
				editable : false,
				cellsalign : 'right',
				align : 'center'
			},
			{
				'text' : 'Stone / Acc Pcs',
				'width' : '100px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'Stone / Acc Wt',
				'width' : '100px',
				sortable : false,
				editable : true,
				cellsalign : 'right',
				align : 'center'
			},
			{
				'text' : 'Item Val in Rs.',
				'width' : '100px',
				sortable : false,
				editable : true,
				cellsalign : 'right',
				align : 'center'
			},
			{
				'text' : 'Remarks',
				'width' : '100px',
				sortable : false,
				editable : false,
				cellsalign : 'left',
				align : 'center'
			},
			{
				'text' : 'To DC',
				'width' : '100px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'To Zone',
				'width' : '100px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'Transfer Done by',
				'width' : '100px',
				sortable : false,
				editable : true
			},
			{
				'text' : 'Received by',
				'width' : '100px',
				sortable : false,
				editable : false
			},
			{
				text : 'Designer Type',
				datafield : 'designBy',
				columntype : 'combobox',
				displayfield : 'designBys',
				editable : true,
				'width' : '100px',
				createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : designerTypeDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				}
			},
			{
				text : '',
				menu : false,
				sortable : false,
				datafield : 'selectionStatus',
				columntype : 'checkbox',
				width : 50,
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

	showMyGrid(datafields, "/OrderExecution/api/v1/designList?page=TVAcknowledgement",
			"list", columns, designFilterValues(), updateRows, "orderNo");
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

$('input:text:visible:first').focus();

//Email Functionality Implementation Done By Venkat

$("#email").on('click', function(){

		var designRows = $("#jqxgrid").jqxGrid('getrows');
		if( typeof designRows =='undefined')
		{
			$.growl.warning({
				message: "Please Select Design Id To Send Email",
				duration: 10000,
				title: 'warning' 
			});
		}

		var dchecklist = [];
		for(var i = 0; i< designRows.length; i++){
			   var data = designRows[i];
			   
			   if(data.selectionStatus == true){				
				   dchecklist.push(data.id)
			   }
			  
	   }
		
	   console.log(dchecklist.toString());
	   if(dchecklist.length == 0){
		   $.growl.warning({
				message: "Please Select Designers To Send Email",
				duration: 10000,
				title: 'warning' 
			});
		   return false;
	   }else{
		fieldFilters = {
            "fieldFilters" : {
                "orderNo" : $('#orderNo').val(),
                "designId":dchecklist.toString(),
                "orderFromDate" : $('#orderFromDate').val(),
                "orderToDate" : $('#orderToDate').val(),
                "orderTypes" : $('#orderTypes').val(),
                "designBy" : $('#designBy').val(),
                "designers" : $('#designers').val(),
                "storeCodes" : $('#storeCodes').val(),
                "designStatus" : $('#designStatus').val(),
                "mode" : "pdf",
                "reportName" : "WorkOrder"
            }
        };
	 
		postJSON('/OrderExecution/api/v1/sendEmailByDesigner', JSON.stringify(fieldFilters), function(response) {			
			var listItem = response.payload.list;
			if(response.resCode == 1){
				$.growl.notice({
					message : response.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				return false;
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	  }		
});

//Export function for Design Search
$("#export").on("click",function() {
		var data;
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
			postJSON('/OrderExecution/api/v1/designList?page=DesignSearch&&type=export',JSON.stringify(designFilterValues()),function(response) {
				data = response.payload.list;
				console.log(data);
					for (i = 0; i < data.length; i++) {
						newData.push({	
							'Store/DC' : (data[i].dcCode != null) ? data[i].dcCode : (data[i].storeCode != null)?data[i].storeCode:"",
							'Order No' : (data[i].orderNo != null) ? data[i].orderNo : "",
							'Order Sl' : (data[i].orderSl!= null) ? data[i].orderSl  : "",
							'Order Type' : (data[i].orderType != null) ? data[i].orderType : "",
							'Order Kind' : (data[i].orderKind != null) ? data[i].orderKind : "",
							'Segment' : (data[i].segment != null) ? data[i].segment : "",
							'Jewel Type' : (data[i].jewelType != null) ? data[i].jewelType : "",
							'Sub Cat' : (data[i].subCategory != null) ? data[i].subCategory	: "",
							'No of Design' : (data[i].noOfDesigns == null || data[i].noOfDesigns == 0 ) ? " " : data[i].noOfDesigns,
							'Order Date' : (data[i].orderDate != null) ? data[i].orderDate : "",
							'Order Item Due Date' : (data[i].orderItemDueDate != null) ? data[i].orderItemDueDate : "",
							'Design Due Date' : (data[i].designDueDate != null) ? data[i].designDueDate : "",
							'Design Status' : (data[i].designStatus != null) ? data[i].designStatus : "",
							'Order Raised By' : (data[i].orderCreatedBy != null) ? data[i].orderCreatedBy : "",
			                'Designed By' : (data[i].designByValue != null) ? data[i].designByValue : "",
							'Designer' : (data[i].designerName != null) ? data[i].designerName : "",
			                'Design Id' : (data[i].id != null) ? data[i].id : "",
	                		'Design Complexity' : (data[i].designComplexity != null) ? data[i].designComplexity : "",
			                'Design Head Remarks' : (data[i].remarks != null) ? data[i].remarks : "",
			                'SE/Inventory Person Remarks' : (data[i].seRemarks != null) ? data[i].seRemarks : "",
						});
					}
				//JSONToCSVConvertor(newData, "Adjustment Voucher" + "_" + sysdate, true);
				 var opts = [{sheetid:'Design_',header:true}];
                 var res = alasql('SELECT * INTO XLSX("Design_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

$("#removeAll").on('click',function(){
	$("#designers").prop('disabled',true);
});
$('#btnViewDV').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});
$('#btnReviewDA').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});
$('#btnUploadDA').on('hidden.bs.modal', function() {
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();
});