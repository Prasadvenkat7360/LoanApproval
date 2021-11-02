/** AUTHOR UI : SHREEVARDHAN TL
 *  AUTHOR JAVA : SHREEVARDHAN TL
 *  DESC : Cancellation Of PSR
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

// API call for Vendor code drop down
var onLoadPsrCancelReq = function() {
	$.getJSON('/OrderExecution/api/v1/psrCancelLOVs', function(data) {
		var vendorCodeS = data.payload.vCodeList;
		var v = '<select id="vendorCodeObj" name="vendorCodeObj" class="form-control" multiple="multiple">';
		$.each(vendorCodeS, function(key, val) {
			v += '<option value="' + val.id + '">' + val.name + '</option>';							
		});
		v += '</select>';
		$("#vendorCode").html(v);
		$('#vendorCodeObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	});
}
onLoadPsrCancelReq();

// Field Filters
var cancelPsrFieldFilters = function() {
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCodeS = "";
	} else {
		var vendorCodeS = vendorCodeObj.join(",");
	}
	
	var orderId = $("#orderNo").val();
	var orderItemSlNo = $('#orderItemSlNo').val();
	var psrNo = $('#psrNo').val();

	queryFilter = {
		"fieldFilters" : {}
	};

	if (vendorCodeS != "" && vendorCodeS != null) {
		queryFilter.fieldFilters["vendorCode"] = vendorCodeS;
	}
	if (orderId != "" && orderId != null) {
		queryFilter.fieldFilters["orderId"] = orderId;
	}
	if (orderItemSlNo != "" && orderItemSlNo != null) {
		queryFilter.fieldFilters["itemSlNo"] = orderItemSlNo;
	}
	if (psrNo != "" && psrNo != null) {
		queryFilter.fieldFilters["psrNo"] = psrNo;
	}
	return queryFilter;
}


//Search grid 
function cancelPsrGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' : 'VendorCode', 'type' : 'String', 'map' : 'vendorCode'}, 
		{'name' : 'workBagDetId', 'type' : 'long', 'map' : 'id'},
		{'name' : 'workBagDId','type' : 'long','map' : 'id'},
		{'name' : 'workBagDetPrintId','type' : 'long','map' : 'id'},
		{'name' : 'psrCode', 'type' : 'long', 'map' : 'psrNumber'}, 
		{'name' : 'orderId', 'type' : 'long', 'map' : 'orderHeaderNo'}, 
		{'name' : 'orderItemSlNo','type' : 'long', 'map' : 'serialNumber'}, 
		{'name' : 'orderKind','type' : 'String', 'map' : 'oKind'}, 
		{'name' : 'suppliedBy', 'type' : 'String', 'map' : 'compOrCustsuppliedFlag'},
		{'name' : 'mivMadeFlag', 'type' : 'String', 'map' : 'MIVMadeFlag'}
		];

	var columns = [ 
		{'text' : 'Vendor Code','datafield' : 'VendorCode','width' : '23%',cellsalign : 'left',align : 'center',editable : false}, 
		{'text' : 'PSR No','datafield' : 'psrCode',cellsalign : 'center',align : 'center','width' : '15%',editable : false,sortable : true}, 
		{'text' : 'Order ID','datafield' : 'orderId','width' : '18%',cellsalign : 'center',align : 'center',editable : false}, 
		{'text' : 'Order Sl NO','datafield' : 'orderItemSlNo','width' : '12%',cellsalign : 'center',align : 'center',editable : false},
		{'text' : 'Order Kind','datafield' : 'orderKind','width' : '12%',cellsalign : 'center',align : 'center',editable : false}, 
		{'text' : 'Comp/Cust Supplied','datafield' : 'suppliedBy','width' : '15%', cellsalign : 'center', align : 'center', editable : false}, 
		{'text' : '',datafield : 'workBagDetId',editable : false,cellsrenderer : viewMivDetails,cellsalign : 'center',	align : 'center',filterable: false,sortable : false,'width' : '2.5%'},
		{'text' : '',datafield : 'workBagDId',editable : false,cellsrenderer : cancelPsrNoView ,cellsalign : 'center',	align : 'center',filterable: false,sortable : false,'width' : '2.5%'},
		//{'text' : '',datafield : 'workBagDetPrintId',editable : false,cellsrenderer : printMivDetails,cellsalign : 'center', align : 'center',filterable: false,sortable : false,'width' : '2%'},
		{'text' : '', 'datafield' : 'mivMadeFlag', 'width' : '5%', hidden: true, sortable : true, editable : false, cellsalign :'center', align : 'center'}	
	];

	showMyGrid(datafields, "/OrderExecution/api/v1/cancelPsrSearch", "list",columns, cancelPsrFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        theme: 'energyblue',
		columnsheight : 35,
     	altrows: false,
    	columnsresize: true 
	});
}

$("#cancelOfPsr").validate(
		 {
		 	errorElement : 'label',
		 	errorClass : 'help-inline',
		 	focusInvalid : false,
		 	ignore : "",
		 	rules: {
		 		"vendorCodeObj" : { required : true },
	            "orderNo": {  digits: true  },
	            "orderItemSlNo": {  digits: true },
	            "psrNo": {  digits: true },
	        },
	        messages: {
	        	"orderNo":{
	        		digits : "Please Enter Only Numbers!"
	        	 },
	        	"orderItemSlNo": {
	        		digits: "Please Enter Only Numbers!"                
               },
               "psrNo": {
            	   digits: "Please Enter Only Numbers!"           		
           	    },   	
        },
        errorPlacement : function(error, element) {
        	if(element.context.name == "vendorCodeObj"){
    					error.insertAfter(element.parent());
    				} else {
    					error.insertAfter(element);
    				}
    			},
		    submitHandler : function(form) {	
		    	cancelPsrGrid();
		    	$("#jqxgrid").show();
		    }
	 });

//print 
var printMivDet = function(workBagDetPrintId){
	var vendorCodeObj = $('#vendorCodeObj').val();
	var orderId = $("#orderNo").val();
	var orderSrlNo = $("#orderItemSlNo").val();
	var psrNo = $("#psrNo").val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCodeS = "";
	} else {
		var vendorCodeS = vendorCodeObj.join(",");
	}	
	fieldFilters = {
			"fieldFilters" : {
				"oItemSrlNo":orderSrlNo,
				"psrNo":psrNo,
				"orderId":orderId,
				"wrkBagDetailiId" : workBagDetPrintId,
				"vendorId" : vendorCodeS,
				"mode" : "pdf",
				"reportName" : "RPT_Cancallation_of_PSR"
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
					navigator.msSaveBlob(file,
							'RPT_Cancallation_of_PSR.pdf');
				} else {
					var file = new Blob([ data ], {
						type : 'application/pdf'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
			}
		});

}

var printMivDetails = function (row, columnfield, value, defaulthtml, columnproperties) {   	
	return '<button class="btn btn-sm btn-danger btn-sm" type="button" id='
	+ row
	+ ' onclick="printMivDet('
	+ value
	+ ')" ><i class="fa fa-download fa-sm"></i></button>';
		
}

//view functionality started 
var viewMivDet = function(workBagDetId)
{
	 $.getJSON('/OrderExecution/api/v1/cancelPsrMivDetails?workBagDetId=' + workBagDetId,function(data) {
		var vd = data.payload;
		
		viewMIVDetGrid(vd.mivDetail);
		viewMIVAccessoryGrid(vd.mivAccessories);
		viewMIVStoneGrid(vd.mivStones);
	});
}
var viewMivDetails = function (row, columnfield, value, defaulthtml, columnproperties) {
    var mivMadeFlag = $("#jqxgrid").jqxGrid('getrowdata', row).mivMadeFlag;
	if(mivMadeFlag == "Yes"){
			return '<button class="btn btn-sm btn-primary" data-toggle="modal"  data-target="#viewMivDetails" type="button" id='
			+ row
			+ ' onclick="viewMivDet('
			+ value
			+ ')" ><i class="fa fa-eye fa-sm"></i> </button>';
		}else{
			return '<button class="btn btn-sm btn-primary btn-sm"  type="button" disabled><i class="fa fa-eye fa-sm"></i> </button> ';
		}
}

//cancel
var cancelPsrNo = function(workBagDetId){
	$("#remarksE").val("");
	$('#cPsrId').val(workBagDetId);
}

var cancelPsrNoView = function (row, columnfield, value, defaulthtml, columnproperties) {
    var mivMadeFlag = $("#jqxgrid").jqxGrid('getrowdata', row).mivMadeFlag;
			return '<button class="btn btn-sm btn-warning btn-sm" data-toggle="modal"  data-target="#cancelPsrView" type="button" id='
			+ row
			+ ' onclick="cancelPsrNo('
			+ value
			+ ')" ><i class="fa fa-times-circle fa-sm"></i> </button>';

}

// Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('#vendorCodeObj').multiselect("clearSelection");
	
});

var viewMIVDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'srlNoForUI', type : 'long', map : 'srlNoForUI'}, 
			{name : 'orderNo', type : 'long', map : 'refNo'}, 
			{name : 'orderItSlNo', type : 'long', map : 'refSerialNo'},
			{name: 'pieces', type: 'string', map:'pcs'},
			{name : 'grossWt', type : 'string', map:'grossWeight'},
			{name : 'netWt', type : 'string', map : 'netWeight'},
			{name : 'jewelType', type : 'string', map: 'jewelType'},
			{name : 'metalSegment', type : 'string', map : 'metalSegment>description'}
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewMivDetGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 65,
		autorowheight : true,
		theme: 'energyblue',
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Sl No', datafield : 'srlNoForUI', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Order No', datafield : 'orderNo', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Order Sl No', datafield : 'orderItSlNo', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Segment', datafield : 'metalSegment', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Jewel Type', datafield : 'jewelType', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt', datafield : 'grossWt', width : '13%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Net Wt', datafield : 'netWt', width : '13%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pieces', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false}
			]
	});
}

var viewMIVStoneGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'srlNoForUI', type : 'long', map : 'srlNoForUI'}, 
			{name : 'suppliedBy', type : 'long','map' : 'suppliedBy'}, 
			{name : 'segment', type : 'long','map' : 'segment'},
			{name: 'category', type: 'string','map':'categoryDesc'},
			{name : 'subcatShape', type : 'string','map':'subCategory'},
			{name : 'weightRg', type : 'string','map' : 'weightRange>name'},
			{name : 'clarity', type : 'string','map': 'clarity>name'},
			{name : 'actualColor', type : 'string','map' : 'actualColor>name'},
			{name : 'color', type : 'string','map': 'color>name'},
			{name : 'cutGrade', type : 'string','map': 'cutGrade>name'},
			{name : 'uom', type : 'string','map': 'uom'},
			{name : 'pieces', type : 'string','map': 'pcs'},
			{name : 'wieght', type : 'string','map': 'weight'}],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewMivStoneGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 65,
		autorowheight : true,
		theme: 'energyblue',
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Sl No', datafield : 'srlNoForUI', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supplied By', datafield : 'suppliedBy', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Segment', datafield : 'segment', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Category', datafield : 'category', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'SubCategory/Shape', datafield : 'subcatShape', width : '14%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Weight Range', datafield : 'weightRg', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'clarity', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Actual Color', datafield : 'actualColor', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Color', datafield : 'color', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uom', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pieces', datafield : 'pieces', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Weight', datafield : 'wieght', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false}
			]
	});

}

var viewMIVAccessoryGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'srlNoForUI', type : 'long', map : 'srlNoForUI'}, 
			{name : 'suppliedBy', type : 'long','map' : 'suppliedBy'}, 
			{name : 'segment', type : 'long','map' : 'segment>description'},
			{name: 'category', type: 'string','map':'categoryDesc'},
			{name : 'subcatShape', type : 'string','map':'subCategory'},
			{name : 'uom', type : 'string','map': 'uom'},
			{name : 'pieces', type : 'string','map': 'pcs'},
			{name : 'wieght', type : 'string','map': 'wieght'}
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewMivAccGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 65,
		autorowheight : true,
		theme: 'energyblue',
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Sl No', datafield : 'srlNoForUI', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supplied By', datafield : 'suppliedBy', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Segment', datafield : 'segment', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Category', datafield : 'category', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'SubCategory/Shape', datafield : 'subcatShape', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uom', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pieces', datafield : 'pieces', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Weight', datafield : 'wieght', width : '12%', cellsalign : 'right', align : 'center', editable : false, sortable : false}
			]
	});
}
	
	$("#cancelPsrE").on("click", function() {
		var remark = $("#remarksE").val();
		var workBagDId =  $("#cPsrId").val();
		if (remark != "" && remark != undefined && remark != null ) { 
	    	var cancelObj = {"workDetId": workBagDId, 
	    			"remarks": remark };
			if (cancelObj) {postJSON('/OrderExecution/api/v1/cancelPsr',JSON.stringify(cancelObj), function(data) {
				if (data.resCode == "1") {
				 $.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
			 $('#cancelPsrView').modal('hide');
			 cancelPsrGrid();
			}else if(data.resCode == "3"){
			    $.growl.error({
					message : data.mesgStr,
					duration : 10000
			});
	       }
		   $('#cancelPsrE').modal('hide');
		 });
		}
	   }
		else{
			$.growl.error({
				message :"Please Enter Remark",
				duration : 10000,
			});
			return false;
		  }
		});

	$.validator.addMethod(
	        "regx",
	        function(value, element, regexp) {
	            if (regexp.constructor != RegExp)
	                regexp = new RegExp(regexp);
	            else if (regexp.global)
	                regexp.lastIndex = 0;
	            return this.optional(element) || regexp.test(value);
	        },
	        ""
	);

$('#viewMivDetails').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});

$('#cancelPsrView').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});