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

var isActives = [ {
	id : '1',
	name : 'Yes'
}, {
	id : '0',
	name : 'No'
} ];

var handlecustomerFlag = function() {
	var value = $('#customerFlag option:selected').val();
	if (value == 'true') {
		$("#custHandleCharges").prop("disabled", false);
		$("#custHandleChargesDiv").show();
		$("#popUpGridDiv").hide();
		return;
	}
	$("#custHandleChargesDiv").hide();
	$('#jqxgridp').jqxGrid('clear');
	addAccessoryArticle();
	$("#jqxgridp").jqxGrid("updatebounddata");
	$("#jqxgridp").show();
	$("#popUpGridDiv").show();
}

$('#startVal').on("change",function() {
	if (this.value.match(/[^0-9]/g)) {
	   this.value = this.value.replace(/[^0-9]/g, '');
	}
});

$('#jumpVal').on("change",function() {
	if (this.value.match(/[^0-9]/g)) {
	   this.value = this.value.replace(/[^0-9]/g, '');
	}
});

$.getJSON('/OrderExecution/api/v1/companyHolidayLOV', function(data) {
	$('#regionC').empty().append('<option value="" selected>--Select--</option>');
	$('#storeRegionNameCTA').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.region, function(key, val) {
		$('#regionC').append('<option value="' + val.id + '">' + val.name	+ '</option>');
		$('#storeRegionNameCTA').append('<option value="' + val.id + '">' + val.name	+ '</option>');
	});
});

var onloadLov = function(){
	$.getJSON('/OrderExecution/api/v1/accessoryArtLOV?criteria=acc', function(data) {
		$('#accSegment').empty().append('<option value="" selected>--Select--</option>');
		$('#accSegmentC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.accSegments, function(key, val) {
				$('#accSegment').append('<option  value="' + val.id + '">' + val.name + '</option>');
				$('#accSegmentC').append('<option  value="' + val.id + '">' + val.name + '</option>');
		 });
	});
} 
onloadLov();

var creattedDateC;
$.getJSON('/OrderExecution/api/v1/raiseTransferVoucherOnloadLovs?type=createOnload', function(data) {
	creattedDateC=data.payload.createdDate
	$("#createdDateC").val(creattedDateC);	
});

var creattedBy;
$.getJSON('/OrderExecution/api/v1/metalAccountLocationLOV', function(data) {
	creattedBy = data.payload.createdBy;
	$("#createdByC").val(creattedBy);	
});


var editAccessoryArticle = function(row) {
	enableAll();
	
	var rows = $('#jqxgrid').jqxGrid('getrows');
	for(var i=0; i<rows.length; i++){
		if(rows[i].id == row){
			var selectedRowData = rows[i];
		}
	}
	if(typeof selectedRowData.mainCategory != "undefined"){
		setLov($('#mainCategoryP option'), $('#mainCategoryP'),	selectedRowData.mainCategory);
	}
	
	if(typeof selectedRowData.subCategory != "undefined"){
		fillLov($('#mainCategoryP').val(), $('#subCategoryP'), 'sCategory',	'description', selectedRowData.subCategory);
	}

	if(typeof selectedRowData.uom != "undefined"){
		setLov($('#uomP option'), $('#uomP'), selectedRowData.uom);
	}
	$('#activeYN').val(selectedRowData.activeYN == 'Yes' ? '1' : '0');
	$('#customerFlag').val(selectedRowData.custFlag == 'Yes' ? '1' : '0');

	$('#articleCodeP').val(selectedRowData.articleCode);
	$('#articleDescP').val(selectedRowData.articleDesc);
	$('#accessoryMasterId').val(selectedRowData.id);
	

	$('#custHandleCharges').val(selectedRowData.custHandleCharges);
	handlecustomerFlag();
	// disabling drop down
	$("#customerFlag").prop("disabled", true);
	$("#activeYN").prop("disabled", false);
	$("#accSegmentP").prop("disabled", true);
	$("#mainCategoryP").prop("disabled", true);
	$("#subCategoryP").val(selectedRowData.subCategory);
	$("#articleDescP").val(selectedRowData.articleDesc);
	$("#uomP").prop("disabled", true);
	$("#subCategoryP").prop("disabled", true);
	if (selectedRowData.activeYN == 'No') {
		$("#save").attr("disabled", true);
		makeReadonly();
	} else {
		$("#save").attr("disabled", false);
	}
}



var editAccessoryDet = function(id) {
	var status = $("#statusS").val();
	if($("#statusS").val() == "True"){
		status = true;
	}else{
		status = false;
	}
	var segId = $("#accSegment").val();
	$.getJSON('/OrderExecution/api/v1/getAccessoryById?id='+ id +'&isActive='+status,function(data) {
		var isActive = data.payload.masterDTO.isActive;
		accMasterEditGrid(data.payload.masterDTO.accessoryDetails);
        $("#updatedByE").val(data.payload.masterDTO.createdBy);
        $("#updatedDateE").val(data.payload.masterDTO.updatedDate);
        $("#createdDateE").val(data.payload.masterDTO.createdDate);
        
        $("#accSegE").val(data.payload.masterDTO.segmentDTO.description);
        $("#accessoryMasterIdE").val(data.payload.masterDTO.segmentDTO.id);
        
        $("#accMainCatE").val(data.payload.masterDTO.category.description);
        $("#accMainCatIdE").val(data.payload.masterDTO.category.id);
        
        $("#accSubCatE").val(data.payload.masterDTO.subCategory.description);
        $("#accSubCatIdE").val(data.payload.masterDTO.subCategory.id);
        
        loadHSN(data.payload.masterDTO.hsnMaster);
        //var res1 = data.payload.masterDTO.hsnMaster.hsnCode+"_"+data.payload.masterDTO.hsnMaster.hsnDescription
    	//$('#hsnCodeE').append('<option selected value="'+ data.payload.masterDTO.hsnMaster.id + '">'+ res1 + '</option>');
        
        $("#accUomE").val(data.payload.masterDTO.uom);
        $("#articleCodeE").val(data.payload.masterDTO.code);
        
        $("#regionE").val(data.payload.masterDTO.region.name);
        $("#regionIdE").val(data.payload.masterDTO.region.id);
        
        $("#accMasterIdE").val(data.payload.masterDTO.id);
        
        $("#handlingChargesE").val((data.payload.masterDTO.custHandlingCharges).toFixed(2));
        
        var customerF = data.payload.masterDTO.isCustomerAccessory;
         if(customerF == false){
        	 $("#custFlagE").val("No");
         }else{
        	 $("#custFlagE").val("Yes");
         }
       
        $("#articleDescE").val(data.payload.masterDTO.subCategory.description);
       
        if(isActive == true){
        	$("#addAccE").prop('disabled',false);
        	$("#editAccE").prop('disabled',false);
        }else{
        	$("#addAccE").prop('disabled',true);
        	$("#editAccE").prop('disabled',true);
        }
        
        if(data.payload.masterDTO.isCustomerAccessory == true){
        	$("#editPopUpGrid").hide();
        	$("#handlingChargesE").prop('disabled',false);
        }else{
        	$("#editPopUpGrid").show();
        	$("#handlingChargesE").prop('disabled',true);
        }
	});
var loadHSN = function(hsnCode1){
	$.getJSON('/OrderExecution/api/v1/getHsnCodesBySegmentId?id='+segId+'&type=AC',function(data) {
		$('#hsnCodeE').empty().append('<option value="" selected>--Select--</option>');
		
			$.each(data.payload.hsnCodes, function(key, val) {
				if(hsnCode1 != null){
				var res1 = hsnCode1.hsnCode+"-"+ hsnCode1.hsnDescription
				if(res1 == val.description){
     				$('#hsnCodeE').append('<option selected value="' + val.id + '">' + val.description + '</option>');
				}else{
					$('#hsnCodeE').append('<option  value="' + val.id + '">' + val.description + '</option>');	
				}
				}else{
					$('#hsnCodeE').append('<option  value="' + val.id + '">' + val.description + '</option>');
				}
			});
		});
	}
}

var accMasterEditGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'id', type : 'float','map' : 'id'}, 
			{name : 'fromCost', type : 'float','map' : 'fromCost'}, 
			{name : 'toCost', type : 'float','map' : 'toCost'},
			{name: 'tabRef', type: 'string','map':'sellingPriceReference'},
			{name: 'mupPer', type: 'float','map':'mup'},
			{name : 'accSellingRate', type : 'float','map':'sellingRate'},
			{name : 'excPerc', type : 'float','map' : 'exchangePercentage'},
			{name : 'dirPurcPerc', type : 'float','map': 'directPurchasePercentage'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridE").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : true,
		columnsheight : 65,
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'id', datafield : 'id', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'From Cost', datafield : 'fromCost', width : '12%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'To Cost', datafield : 'toCost', width : '12%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Table Ref', datafield : 'tabRefN', width : '15%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'tabRef',
				createeditor : function(row, value, editor) {
					var regId = $("#regionIdE").val();
							$.getJSON('/OrderExecution/api/v1/accessoryArtLOV?criteria=tableRefList&id='+regId,function(data) {
								editor.jqxDropDownList({ source:  data.payload.tableRefList , displayMember: 'referenceCode', valueMember: 'mup'});
							});
				},
				 cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					 $("#jqxgridE").jqxGrid('setcellvalue', row, 'mupPer',newvalue.value);
					 
					var toCostE = $('#jqxgridE').jqxGrid ('getcellvalue', row, 'toCost');
					var sellingRate = parseFloat(toCostE) + ((parseFloat(toCostE) * parseFloat(newvalue.value))/100);
					$("#jqxgridE").jqxGrid('setcellvalue', row, 'accSellingRate',sellingRate);
				   }
			},
			{ text : 'MUP %', datafield : 'mupPer', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Acc Selling Rate', datafield : 'accSellingRate', width : '15%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Exchange %', datafield : 'excPerc', width : '15%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				columntype : 'numberinput',
	        	createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 2
						});
					},
			},
			{ text : 'Direct Purch %', datafield : 'dirPurcPerc', width : '15%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				columntype : 'numberinput',
	        	createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 2
						});
					},
			},
			{text : 'Action',
				datafield : 'Delete',
				'width' : '6%',
				cellsalign:'center',
				align:'center',
				formatoptions: {editbutton:false,delbutton:false},
				editable: false,
				cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
					var rows = $("#jqxgridE").jqxGrid("getrows");
					if(typeof rows != "undefined"){
						var id = rows[row].id;
						if(typeof id != "undefined"){
							return "<button style='background:#f4bdb7;cursor:not-allowed' type='button' class='btn btn-danger btn-sm'><i class='fa fa-trash-o fa-md'></i></button>";;
						}else{					
							return  "<button onclick='deleteEditRow("+row+")'  type='button' class='btn btn-danger btn-sm'><i class='fa fa-trash-o fa-md'></i></button>";
						}
					}
				
				}
			}
		]
	});
}


var rowId = 0;
var generaterowT = function(i,fCostE,tCost) {
	var row = {};
	row["fromCost"] = parseFloat(fCostE) + 0.01;
	row["toCost"] = fCostE + tCost,
	row["tabRef"] = "",
	row["mupPer"] = "",
	row["accSellingRate"] = "",
	row["excPerc"] = "",
	row["dirPurcPerc"] = ""
	rowId = rowId + 1;
	return row;
}

$("#addAccE").on('click',function(){
	var rowData = $("#jqxgridE").jqxGrid('getrows');
	var fCostE;
	var rowE;
	for(var i = 0; i< rowData.length; i++){
		rowE = rowData[rowData.length -1];
	}
	fCostE = rowE.toCost;
	tCost = parseFloat(rowE.toCost) - parseInt(rowE.fromCost) 
	
	var datarow = generaterowT(i + 1,fCostE,tCost);
	$("#jqxgridE").jqxGrid('addrow', null, datarow); 
});

var deleteEditRow = function(rowId){		
	var id = $("#jqxgridE").jqxGrid('getrowid', rowId);
	$("#jqxgridE").jqxGrid('deleterow', id);
}

var getAccessoryDetE = function(){
	var AccessoryDetE = [] ;
		var getAccDetE = $('#jqxgridE').jqxGrid('getrows');	
		for (i = 0; i < getAccDetE.length; i++) {
			AccessoryDetE.push({
				"id" : getAccDetE[i].id,
				"fromCost":parseFloat(getAccDetE[i].fromCost),
				"toCost" :parseFloat(getAccDetE[i].toCost),
				"sellingPriceReference" :getAccDetE[i].tabRef,
				"mup":parseFloat(getAccDetE[i].mupPer),
				"sellingRate":parseFloat(getAccDetE[i].accSellingRate),
				"exchangePercentage":(getAccDetE[i].excPerc !="") ? parseFloat(getAccDetE[i].excPerc) : 0.00,
				"directPurchasePercentage":(getAccDetE[i].dirPurcPerc != "") ? parseFloat(getAccDetE[i].dirPurcPerc) : 0.00,
			})
		}
	return AccessoryDetE;
}

var getFormDataE = function() {
	var accGridDetE = getAccessoryDetE();
	var AccessoryMastEditGrid = {
	        "id" : $("#accMasterIdE").val(),
			"code" :$("#articleCodeE").val(),
			"uom" : $('#accUomE').val(),
			"region" : {"id" : parseInt($("#regionIdE").val())},
			"category" : {"id" : parseInt($('#accMainCatIdE').val())},
			"subCategory" :{"id" : parseInt($('#accSubCatIdE').val())},
			"hsnMaster" :{"id" : parseInt($('#hsnCodeE').val())},
			"isCustomerAccessory" : ($('#custFlagE').val() == "Yes") ? true : false,
			"custHandlingCharges" :  $('#handlingChargesE').val().trim(),
			"accessoryDetails" : accGridDetE 
	}
	return AccessoryMastEditGrid;
}

//Edit Accessory
$('#editAccE').on('click', function(){
	trimmer();
	if($("#hsnCodeE").val() == ""){
		$.growl.error({
			message : "Please Select HSN Code !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	var editData = getFormDataE();
	var editAccArr = $('#jqxgridE').jqxGrid('getrows');
	 for (var i = 0; i < editAccArr.length; i++){
		 var row = editAccArr[i]; 
		 if(row.tabRef == ""){
			 $.growl.error({
				 message : "Please Select Table Ref !!!",
				 duarion : 1000,
				 title : 'Error'
			 });
			 return false;
		 }
	 }
		if (editData) {
		postJSON('/OrderExecution/api/v1/updateAccessory',JSON.stringify(editData),function(data) {
			if (data.resCode == "1") {
				
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#btnEditAccessory').modal('hide');
			}else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			}					
		});
	     } else {
	    	 $.growl.error({
	    		 message : data.mesgStr,
	    		 duration : 10000
			});
	      }	
     });




var makeReadonly = function() {
	$("#activeYN").prop("disabled", true);
	$("#customerFlag").prop("disabled", true);
	$("#custHandleCharges").prop("disabled", true);
	$("#addAccArticles").attr("disabled", true);
	var rowscounts = getGridRowCount();
	for (i = 0; i < rowscounts; i++) {
		$("#jqxgridp").jqxGrid('setcellvalue', i, "isActive", isActives[1].id);
		$("#jqxgridp").jqxGrid('setcellvalue', i, "isActives",
				isActives[1].name);
	}
	$("#jqxgridp").jqxGrid({
		editable : false
	});
}

var enableAll = function() {
	// $("select, :text").prop("disabled", false);
	$('#articleCodeP').prop("disabled", 'disabled');
	$('#articleDescP').prop("disabled", 'disabled');
	$("#addAccArticles").attr("disabled", false);
}

var setLov = function(opt, lovhandler, datatxt) {
	lovhandler.val(opt.filter(function() {
		return $(this).html() == datatxt;
	}).val());
}

function accArticleMasterGrid() {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields = [ {
		'name' : 'regionName',
		'type' : 'string'
	}, {
		'name' : 'storeName',
		'type' : 'string'
	}, {
		'name' : 'accSegment',
		'type' : 'string'

	}, {
		'name' : 'mainCategory',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	}, {
		'name' : 'uom',
		'type' : 'string',
	}, {
		'name' : 'articleCode',
		'type' : 'string'
	}, {
		'name' : 'articleDesc',
		'type' : 'string'
	}, {
		'name' : 'activeYN',
		'type' : 'string'
	}, {
		'name' : 'custFlag',
		'type' : 'string'
	}, {
		'name' : 'custHandleCharges',
		'type' : 'long'
	}, {
		'name' : 'id',
		'type' : 'long'
	} ];

	var columns = [
	  { 'text' : 'Region Name',
		  'datafield' : 'regionName', 
		  editable : false,
		  sortable : true, 
		  cellsalign: 'center', 
		  align:'center',
		  'width' : '10%',
	},{
		'text' : 'Acc. Segment',
		'datafield' : 'accSegment',
		editable : false,
		sortable : true,
		'width' : '10%',
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Main Category',
		'datafield' : 'mainCategory',
		editable : false,
		sortable : true,
		'width' : '10%',
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Article Code',
		'datafield' : 'articleCode',
		editable : false,
		'width' : '10.5%',
		sortable : true,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Article Description',
		hidden : false,
		'datafield' : 'articleDesc',
		sortable : true,
		'width' : '18%',
		cellsalign : 'left',
		align : 'center'
	},{
		'text' : 'UQC',
		'datafield' : 'uom',
		'width' : '100px',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Active Y/N',
		'datafield' : 'activeYN',
		editable : false,
		sortable : false,
		'width' : '8.5%',
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Customer Flag',
		'datafield' : 'custFlag',
		sortable : false,
		editable : false,
		'width' : '12%',
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Customer Handle charges',
		'datafield' : 'custHandleCharges',
		sortable : false,
		editable : false,
		'width' : '12%',
		cellsformat : 'd2',
		cellsalign : 'right',
		align : 'center'
	}, {
		'text' : '',
		'datafield' : 'id',
		cellsrenderer : accessoryEditlinkrenderer,
		editable : false,
		sortable : false,
		 filterable : false,
		'width' : '3%',
		cellsalign : 'center',
		align : 'center'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/SearchAccessoryArticle","list", columns, accessoryMasterFilterValues(), "");
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

var accessoryEditlinkrenderer = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
		var status = $('#jqxgrid').jqxGrid('getcellvalue', row, 'activeYN');
		if(status =="Yes"){
		var editVal= '<button class="btn btn-sm btn-primary" data-toggle="modal" margin-left:5px;  margin-bottom:5px;  margin-right:5px;" data-target="#btnEditAccessory" type="button" id='
				+ row
				+ ' onclick="editAccessoryDet('
				+ value
				+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
		}else{
			var editVal = '<button disabled class="btn btn-sm btn-primary" type="button"><i class="fa fa-pencil fa-sm"></i></button>';
		
		}
		return editVal;
	}
}


$("#error-msg").html("");
var counter = 1;
/*$('#addAccArticles').on('click',function(event) {
		event.preventDefault();
		var fromCost = $("#fromCost").val();
		var toCost = $("#toCost").val();
		var tabRef = $("#tabRef").val();
		var mupPer = $("#mupPer").val();
		var accSellingRate = $("#accSellingRate").val();
		var exchangeRate = $("#exchangeRate").val();
		var purchaseRate = $("#purchaseRate").val();
		var activeYN = $("#activeYN").val();
		if($("#regionC").val() == "" || $("#regionC").val() == null || $("#accSegmentC").val() == "" || $("#accSegmentC").val() == null
				|| $("#mainCategoryP").val() == "" ||  $("#mainCategoryP").val() == null || $("#subCategoryP").val() == null
					|| $("#subCategoryP").val() == "" || $("#customerFlag").val() == "" || $("#customerFlag").val() == null|| $("#hsnCodeC").val() == ""||
					$("#hsnCodeC").val() == null){
					$.growl.error({
						message : "Please Fill Mandatory Fields!!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
			}
		if (fromCost == "" && toCost == "" && tabRef == ""
				&& mupPer == "" && accSellingRate == ""
				&& exchangeRate == "" && purchaseRate == ""
				&& activeYN == "") {
			$("#error-msg").html("Field are Mandatory");
			// $("input:text").addClass("reqField")
		} else {
			$("#error-msg").html("");
			// $("input:text").removeClass("reqField")
			counter++;
			var newRow = $('<tr><td width="10%"><input type="text" name="fromCost'
					+ counter
					+ '" class="form-control" placeholder="From Cost" id="fromCost" /></td> '
					+ '<td width="10%"><input type="text"	name="toCost'
					+ counter
					+ '" class="form-control" placeholder="To Cost" id="toCost" /></td>'
					+ '<td width="20%"><select id="tabRef" name="tabRef'
					+ counter
					+ '" class="form-control"><option value="" selected label="Select" /></select></td>'
					+ '<td width="10%"><input type="text"	name="mupPer'
					+ counter
					+ '" class="form-control" placeholder="MUP%" id="mupPer" /></td>'
					+ '<td width="10%"><input type="text"	name="accSellingRate'
					+ counter
					+ '" class="form-control" placeholder="Acc Selling Rate" id="accSellingRate" /></td>'
					+ '<td width="10%"><input type="text"	name="exchangeRate'
					+ counter
					+ '" class="form-control" placeholder="Exchange Rate" id="exchangeRate" /></td>'
					+ '<td width="10%"><input type="text"	name="purchaseRate'
					+ counter
					+ '" class="form-control" placeholder="Purchase Rate" id="purchaseRate" /></td>'
					+ '<td width="15%"><select id="activeYN" name="activeYN'
					+ counter
					+ '" class="form-control"><option value="" selected label="Select" /></select></td>'
					+ '</tr>');
					$('table.accArticles-list').append(newRow);
			}
		});*/

$('body').on('hidden.bs.modal', '.modal', function() {
	// $(this).removeData('bs.modal');
	$("#error-msg").html("");
});

$('input:text:visible:first').focus();

/* Add Accessory Article Started */
function addAccessoryArticle() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var isActiveSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : isActives
	};

	var isActiveDataAdapter = new $.jqx.dataAdapter(isActiveSource, {
		autoBind : true
	});

	var datafields = [ {
		'name' : 'fromCost',
		'type' : 'float'
	}, {
		'name' : 'toCost',
		'type' : 'float'
	}, {
		'name' : 'sellingPriceReference',
		'type' : 'float'
	}, {
		name : 'sellingPriceReferences',
		value : 'sellingPriceReference',
		/*values : {
			source : sellingPriceReferenceDataAdapter.records,
			value : 'id',
			name : 'name'
		}*/
	}, {
		'name' : 'mup',
		'type' : 'float'
	}, {
		'name' : 'sellingRate',
		'type' : 'float'
	},

	{
		'name' : 'exchangePercentage',
		'type' : 'float'
	}, {
		'name' : 'directPurchasePercentage',
		'type' : 'float'
	},
	/*
	 * { 'name' : 'isActive', 'type' : 'double' },
	 */

	{
		name : 'isActives',
		value : 'isActive',
		values : {
			source : isActiveDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'id',
		'type' : 'long'
	} ];

	var popcolumns = [
			{
				'text' : 'From Cost',
				'datafield' : 'fromCost',
				'width' : '12%',
				'height' : '20px',
				cellsformat : 'd2',
				columntype : 'numberinput',
				sortable : false,
				cellsalign : 'right',
				align : 'center',
				editable : $('#accessoryMasterId').val() === '' ? true : false,
				createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						min : 0.01,
						decimalDigits : 2
					});
				},
				validation : function(cell, value) {
					var val = 0;
					if (!isNaN(value)) {
						val = parseFloat(value) < 0 ? 0 : parseFloat(value);

						if (val < 0.01) {
							return {
								result : false,
								message : "Invalid Number"
							};
						}
						var toCost = jQuery('#jqxgridp').jqxGrid('getCell',
								cell.row, 'toCost');
						if (val > toCost.value) {
							return {
								result : false,
								message : "To Cost should be greater than From Cost"
							};
						}
						populatesellrate(cell.row);
					}
					return true;
				}
			},
			{
				'text' : 'To Cost',
				'datafield' : 'toCost',
				cellsalign : 'right',
				align : 'center',
				'width' : '13%',
				'height' : '20px',
				cellsformat : 'd2',
				columntype : 'numberinput',
				sortable : false,
				editable : $('#accessoryMasterId').val() === '' ? true : false,
				createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						min : 0.02,
						decimalDigits : 2
					});
				},
				validation : function(cell, value) {
					var val = 0;
					if (!isNaN(value)) {
						val = parseFloat(value) < 0 ? 0 : parseFloat(value);

						if (val < 0.02) {
							return {
								result : false,
								message : "Invalid Number"
							};
						}
						var fromCost = jQuery('#jqxgridp').jqxGrid('getCell',
								cell.row, 'fromCost');
						if (val < fromCost.value) {
							return {
								result : false,
								message : "To Cost should be greater than From Cost"
							};
						}
						populatesellrate(cell.row);
					}
					return true;
				}
			},
			{
				'text' : 'Table Ref',
				'datafield' : 'sellingPriceReference',
				'width' : '12%',
				'height' : '20px',
				columntype : 'dropdownlist',
				displayfield : 'sellingPriceReferences',
				sortable : false,
				editable : true,
				cellsalign : 'center',
				align : 'center',
				/*initeditor : function(row, value, editor) {
					editor.jqxDropDownList({
						source : sellingPriceReferenceDataAdapter,
						displayMember : 'referenceCode',
						valueMember : 'mup'
					});
				},*/
				createeditor : function(row, value, editor) {
					var regId = $("#regionC").val();
				
					$.getJSON('/OrderExecution/api/v1/accessoryArtLOV?criteria=tableRefList&id='+regId,function(data) {
						var tabRefE = data.payload['tableRefList'];
						editor.jqxDropDownList({ source: tabRefE , displayMember: 'referenceCode', valueMember: 'mup'});
					});
		        },
		        
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue, event) {
					$("#jqxgridp").jqxGrid('setcellvalue', row, "mup",
							newvalue.value);
					populatesellrate(row);
				}
			},{
				'text' : 'MUP%',
				'datafield' : 'mup',
				'width' : '14%',
				'height' : '20px',
				cellsformat : 'd2',
				sortable : false,
				editable : false,
				cellsalign : 'right',
				align : 'center'
			},{
				'text' : 'Acc Selling Rate',
				'datafield' : 'sellingRate',
				'width' : '13%',
				'height' : '20px',
				cellsformat : 'd2',
				columntype : 'numberinput',
				sortable : false,
				editable : false,
				cellsalign : 'right',
				align : 'center'
			},{
				'text' : 'Exchange Percentage',
				'datafield' : 'exchangePercentage',
				'width' : '18%',
				'height' : '20px',
				cellsformat : 'd2',
				cellsalign : 'right',
				align : 'center',
				columntype : 'numberinput',
				sortable : false,
				editable : true, // $('#accessoryMasterId').val() === ''?
				// true: false,
				initeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						min : 0,
						decimalDigits : 2
					});
				},
				validation : function(cell, value) {
					if (value < 0) {
						return {
							result : false,
							message : "Invalid Number"
						};
					}
					return true;
				}
			},{
				'text' : 'Direct Purch. %',
				'datafield' : 'directPurchasePercentage',
				'width' : '18%',
				'height' : '20px',
				cellsformat : 'd2',
				columntype : 'numberinput',
				cellsalign : 'right',
				align : 'center',
				sortable : false,
				editable : true, // $('#accessoryMasterId').val() === ''?
				// true: false,
				initeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						min : 0,
						decimalDigits : 2
					});
				},
				validation : function(cell, value) {
					if (value < 0) {
						return {
							result : false,
							message : "Invalid Number"
						};
					}
					return true;
				}
			},/*,{
				'text' : 'Active Y/N',
				'datafield' : 'isActive',
				'width' : '10%',
				cellsalign : 'center',
				align : 'center',
				'height' : '20px',
				editable:false,
				columntype : 'dropdownlist',
				displayfield : 'Yes',
				sortable : false,
				editable : true,
				initeditor : function(row, value, editor) {
					editor.jqxDropDownList({
						source : isActiveDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				},
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue, event) {
					$("#jqxgridp").jqxGrid('setcellvalue', row, "isActive",
							newvalue.value);
				}
			},*//*{
				text : 'Action',
				datafield : 'Delete',
				columntype : 'button',
				'width' : '8%',
				cellsalign : 'center',
				align : 'center',
				hidden : $('#accessoryMasterId').val() === '' ? false : true,
				cellsrenderer : function() {
					return "Delete";
				},
				buttonclick : function(row) {
					id = $("#jqxgridp").jqxGrid('getrowid', row);
					$("#jqxgridp").jqxGrid('deleterow', id);
					// Imran: fixing from and To cost ranges
					var rowscounts = getGridRowCount();

					for (i = row; i < rowscounts; i++) {
						if (i == 0) {
							$("#jqxgridp").jqxGrid('setcellvalue', i,
									'fromCost', 0.01);
							$("#jqxgridp").jqxGrid('setcellvalue', i, 'toCost',
									parseFloat($('#jumpVal').val()));
						} else {

							var datarow = $("#jqxgridp").jqxGrid('getrowdata',
									i - 1);
							$("#jqxgridp").jqxGrid('setcellvalue', i,
									'fromCost',
									parseFloat(datarow.toCost) + 0.01);
							$("#jqxgridp").jqxGrid(
									'setcellvalue',
									i,
									'toCost',
									parseFloat(datarow.toCost)
											+ parseFloat($('#jumpVal').val()));
							}
					}
				}
			}*/, {
				'text' : 'id',
				'datafield' : 'id',
				hidden : true
			}];
	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
		populatesellrate(rowid);
	}
	addGrid(datafields, popcolumns, updateRows, "", addrow, "#jqxgridp");
	
}

$("#delete").on('click',function(){
	var rows = $("#jqxgridp").jqxGrid('getrows');
	 $("#jqxgridp").jqxGrid('deleterow',rows.length-1);
});

$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('#accessoryMasterForm').trigger("reset");	
});

/*// Select Store / Region and accordingly API call will load Region or store
$('input[name=storeRegion]:radio').click(
		function() {
			var selectedVal = $(this).val();
			$('#regionStoreName').empty().append(
					'<option value="" selected>--Select--</option>');
			$.getJSON('/OrderExecution/api/v1/accessoryArtLOV?criteria='
					+ selectedVal, function(data) {

				if (selectedVal == "Stores") {
					var dataVal = data.payload.StoreDetails;
				} else if (selectedVal == "Region") {
					var dataVal = data.payload.RegionDetails;
				}

				$.each(dataVal, function(key, val) {

					$('#regionStoreName').append(
							'<option value="' + val.id + '">' + val.name
									+ '</option>');
				});
			});
		});*/
$("#save").attr("disabled",true);
$("#create").on("click",function() {
		$("#cdate").show();
		$("#crBy").show();
		$('#mainCategoryP').prop("disabled", false);
		$('#subCategoryP').prop("disabled", false);
		$('#addAccArticles').show();
		$("#save").attr("disabled", false);
		$('#startVal').val('');
		$('#jumpVal').val('');
		$("#customerFlag").prop("disabled", false);
		var accSeg = $('#accSegment').text().trim();
		var accSegVal = $('#accSegment').val();

		$('#startVal').prop("disabled", false);
		$('#jumpVal').prop("disabled", false);
		$("#startVal").show();
		$("#jumpVal").show();
		$("#createdByC").val(creattedBy);
		$("#createdDateC").val(creattedDateC);

		$('#popupheaderlabel').text('Create Accessory Article');
		$('#accessoryMasterId').val("");

		$('#accessoryMasterform').children().find('input,select').each(function() {
			if ((this).id == "activeYN") {
				$(this).val('1');
			} else if ((this).id == "customerFlag") {
				$(this).val('0');
			} else if ((this).id == "subCategoryP") {
				$("#subCategoryP").empty().append('<option value="" selected>--Select--</option>');
			}
		});
		enableAll();
		$("#popUpGridDiv").hide();
		$("#custHandleChargesDiv").show();
		$("#activeYN").prop("disabled", 'disabled');
		handlecustomerFlag();
		$('#accSegmentPT').val(accSeg);
		$('#accSegmentP').val(accSegVal);
		$("#save").prop("disabled",true);
});

$("#customerFlag").on("change", function() {
	handlecustomerFlag();
	var customerFlag = $("#customerFlag option:selected").text();
	if(customerFlag == "Yes"){
		$("#save").prop("disabled",false);
	}else{
		$("#save").prop("disabled",true);
	}
//	loadPopUpGrid();
});

$("#activeYN").on("change", function() {
	/*
	 * if($('#activeYN').val() == '0') { makeReadonly(); }
	 */
});

$("#mainCategory").on("change",function() {
	fillLov($('#mainCategory').val(), $('#subCategory'), 'sCategory','description');
});

$("#mainCategoryP").on("change",function() {
	fillLov($('#mainCategoryP').val(), $('#subCategoryP'), 'sCategory','description');
});

$("#subCategoryP").on("change",function() {
	var segmentId1 = $('#accSegmentC').val();
	var mainCatList1 = $('#mainCategoryP').val();
	var sCategory1 = $('#subCategoryP').val();
	$("#customerFlag").val("");
	if (sCategory1 != "" && segmentId1 != "") {
		$.getJSON('/OrderExecution/api/v1/accessoryArt/validate?id='+ segmentId1 + '&cat=' + mainCatList1 + '&sub='+ sCategory1, function(data) {
			if (1 == data.resCode) {
				$("#articleCodeP").val(data.payload.articleCode.articleCode);
				$("#articleDescP").val(data.payload.articleCode.articleDesc);
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			}
		});
	}

});

$("#customerFlag").on('change',function(){
	var accCodeC = $("#articleCodeP").val();
	if(accCodeC != ""){
		$.getJSON('/OrderExecution/api/v1/getJumpValuesByAccCode?accCode='+accCodeC,function(data) {
			if(data.resCode == 1){
				$("#startVal").val(data.payload.dto.name);
				$("#jumpVal").val(data.payload.dto.description);
				$("#startVal").prop('disabled',true);
				$("#jumpVal").prop('disabled',true);
			}else{
				$("#startVal").val("");
				$("#jumpVal").val("");
				$("#startVal").prop('disabled',false);
				$("#jumpVal").prop('disabled',false);
			}
		});
	}
});

// create new row.
$("#addAccArticles").on('click', function() {
	var rowscounts = getGridRowCount();
	var mainCategoryP = $('#mainCategoryP').val();
	var subCategoryP = $('#subCategoryP').val();
	var uomP = $('#uomP').val();
	var articleCodeP = $('#articleCodeP').val();
	var articleDescP = $('#articleDescP').val();
	var regionStoreName = $('#regionStoreName').val();
	var startVal = $('#startVal').val();
	var jumpVal = $('#jumpVal').val()
	var customerFlag = $('#customerFlag').val();
	var hsnCodeC = $('#hsnCodeC').val();
	var custHandleCharges = $('#custHandleCharges').val()
	if (mainCategoryP == "" || subCategoryP == "" || uomP == ""|| regionStoreName == ""|| hsnCodeC == "") {
		$.growl.error({
			message : "Please fill all the mandatory fields",
			duration : 10000
		});
		return false;
	}
	if ($('#startVal').val() == "" && $('#jumpVal').val() == "") {
		$.growl.error({
			message : 'Start Value and Jump Value are mandatory!!',
			duration : 10000
		});
		return false;
	}else{
		$("#delete").prop('disabled',false);
		var rows = generaterow();
		$("#jqxgridp").jqxGrid('addrow', null, rows);
		$("#save").prop("disabled",false);
	}
});

//Generate Row for Setting

$("#save").on('click',function() {
	trimmer();
	
	var mainCategoryP = $('#mainCategoryP').val();
	var subCategoryP = $('#subCategoryP').val();
	var uomP = $('#uomP').val();
	var articleCodeP = $('#articleCodeP').val();
	var articleDescP = $('#articleDescP').val();
	var regionStoreName = $('#regionStoreName').val();
	var hsnCodeC = $('#hsnCodeC').val();
	var custHandleCharges = $('#custHandleCharges').val()
	var customerFlag = $('#customerFlag').val();

	if(customerFlag == "" ){
		$.growl.error({
			message : "Please fill all the mandatory fields",
			duration : 10000
		});
		return false;
	}
	if(customerFlag == "true"){
		if (mainCategoryP == "" || subCategoryP == "" || uomP == ""|| regionStoreName == "" || hsnCodeC == "" || custHandleCharges =="") {
			$.growl.error({
				message : "Please fill all the mandatory fields",
				duration : 10000
			});
			return false;
		}
	}else{
		var rows = $("#jqxgridp").jqxGrid('getrows');
		if(typeof rows == "undefined" || rows.length == 0){
			$.growl.error({
				message : "Please add line items.",
				duration : 10000
			});
			return false;
		}
		/*$.each(rows,function(k,v){
			if(v.fromCost == "" || v.toCost == "" || v.sellingPriceReferences == "" || v.mup == ""||v.sellingRate == ""
				|| v.directPurchasePercentage == "" || v.exchangePercentage == "" ||
				v.fromCost == null || v.toCost == null || v.sellingPriceReferences == null || v.mup == null||v.sellingRate == null
					|| v.directPurchasePercentage == null || v.exchangePercentage == null){
				$.growl.error({
					message : 'Grids fields are mandatory!!',
					duration : 5000,
					title : 'Error'
				});
				return false;
			}
		});*/
		var rows = $("#jqxgridp").jqxGrid('getrows');
		var fromCost = rows[0].fromCost
		var toCost = rows[0].toCost;
		var sellingPriceReference = rows[0].sellingPriceReference;
		var mup = rows[0].mup;
		var sellingRate = rows[0].sellingRate;
		var exchangePercentage = rows[0].exchangePercentage;
		var directPurchasePercentage = rows[0].directPurchasePercentage;
		if (fromCost == "" || toCost == ""|| sellingPriceReference == "" || mup == ""|| sellingRate == "") {
			$.growl.error({
				message : 'Grids fields are mandatory!!',
				duration : 5000
			});
			return false;
		}
	}
	if (!validateCostRange()) {
	    $.growl.error({
				message : "Cost range entered should be in sequential order",
				duration : 10000
			});
	   return false;
	}
    postJSON('/OrderExecution/api/v1/saveAccessory',JSON.stringify(getFormData()),function(data) {
			if (data.resCode == 1) {
				AccessoryDet = [];
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				accArticleMasterGrid();
				$('#accessoryMasterId').on('hidden.bs.modal', function() {
						$("form").trigger("reset");
				});
				$('#accessoryMasterModal').modal('hide');

			} else {
				AccessoryDet = [] ;
				$.growl.error({
					message :data.mesgStr ,
					duration : 10000,
					title : 'Error'
				});
				return false;
		 	}
	   });
});

var generaterow = function() {
	var rowscounts = getGridRowCount();
	var row = {};
	var fromCost = $("#startVal").val();
	var toCost = parseFloat($("#jumpVal").val());
	var toCostVal = parseFloat(fromCost) + toCost;

	if (rowscounts == 0) {
		$('#startVal').prop('disabled', true);
		$('#jumpVal').prop('disabled', true);

		row["fromCost"] = parseFloat(fromCost);
		row["toCost"] = parseFloat(toCostVal);
		row["sellingPriceReference"] = "";
		row["sellingPriceReferences"] ="";
		row["mup"] = "";
		row["sellingRate"] = 0.00;
		row["exchangePercentage"] = 0.00;
		row["directPurchasePercentage"] = 0.00;
		row["isActive"] = isActives[0].id;
		row["isActives"] = isActives[0].name;
	} else {

		var datarow = $("#jqxgridp").jqxGrid('getrowdata', rowscounts - 1);
		row["fromCost"] = parseFloat(datarow.toCost) + 0.01;
		row["toCost"] = parseFloat(datarow.toCost) + toCost;
		row["sellingPriceReference"] = datarow.sellingPriceReference;
		row["sellingPriceReferences"] = datarow.sellingPriceReferences;
		row["mup"] = datarow.mup;
		row["sellingRate"] = datarow.sellingRate;
		row["exchangePercentage"] = datarow.exchangePercentage;
		row["directPurchasePercentage"] = datarow.directPurchasePercentage;
		row["isActive"] = isActives[0].id;
		row["isActives"] = isActives[0].name;
	}
	return row;
}

var validateCostRange = function() {
	var rowscounts = getGridRowCount();
	if ($('#customerFlag').val() == '0' && rowscounts > 0) {
		for (i = 1; i < rowscounts; i++) {
			var datarow = $("#jqxgridp").jqxGrid('getrowdata', i - 1);
			var currentdatarow = $("#jqxgridp").jqxGrid('getrowdata', i);

			if ((parseFloat(currentdatarow.fromCost - datarow.toCost))
					.toFixed(2) != 0.01) {
				return false
			}
		}
	}
	return true;
}

var populatesellrate = function(row) {
	var toCost = parseFloat(validateNumeric(jQuery('#jqxgridp').jqxGrid(
			'getCell', row, 'toCost').value));
	var mup = parseFloat(validateNumeric(jQuery('#jqxgridp').jqxGrid('getCell',
			row, 'mup').value));
	var sellingR = toCost + ((toCost * mup) / 100);
	$("#jqxgridp").jqxGrid('setcellvalue', row, 'sellingRate', sellingR);
}

function validateNumeric(val) {
	if (val && !isNaN(val)) {
		return parseFloat(val) < 0 ? '' : parseFloat(val).toFixed(2);
	}
	return 0;
}

var getGridRowCount = function() {
	var count = 0;
	var rows = $('#jqxgridp').jqxGrid('getrows');
	if (rows) {
		count = rows.length
	}
	return count;
}

function fillLov(id, $lov, crt, displayKey, tarselected) {
	// filling data
	if (id != "") {
		$.getJSON('/OrderExecution/api/v1/accessoryArtLOV?criteria=' + crt
				+ '&id=' + id, function(data) {
			$lov.empty()
					.append('<option value="" selected>--Select--</option>');

			if (tarselected) {
				// iterate over the data and append a select option
				$.each(data.payload[crt], function(key, val) {
					if (val[displayKey] === tarselected) {
						$lov.append('<option value="' + val.id + '" selected>'
								+ val[displayKey] + '</option>');
					} else {
						$lov.append('<option value="' + val.id + '">'
								+ val[displayKey] + '</option>');

					}
				});
			} else {
				$.each(data.payload[crt], function(key, val) {
					$lov.append('<option value="' + val.id + '">'
							+ val[displayKey] + '</option>');
				});
			}

		});
	} else {
		$lov.empty().append('<option value="" selected>--Select--</option>');
	}
}

function accessoryMasterFilterValues() {
	fieldFilters = {
		"fieldFilters" : {}
	};
	var metalSegment = parseInt($('#accSegment').val());
	var mainCat = $('#mainCategory').val();
	var subCategory = $('#subCategory').val();
	var articleCode = $('#articleCode').val();
	var storeRegionNameCTA = $("#storeRegionNameCTA").val();
	var statusS = $('#statusS').val();
	
	if (storeRegionNameCTA != "" && storeRegionNameCTA != null) {
		fieldFilters.fieldFilters["regionId"] = parseInt(storeRegionNameCTA);
	}
	if (metalSegment != "" && metalSegment != null) {
		fieldFilters.fieldFilters["metalSegment"] = metalSegment;
	}
	if (mainCat != "" && mainCat != null) {
		fieldFilters.fieldFilters["mainCat"] = mainCat;
	}
	if (subCategory != "" && subCategory != null) {
		fieldFilters.fieldFilters["subCategory"] = subCategory;
	}
	if (articleCode != "" && articleCode != null) {
		fieldFilters.fieldFilters["articleCode"] = articleCode;
	}
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["isActive"] = statusS == "True" ? true : false;
	}
	return fieldFilters;
}



var AccessoryDet = [] ;
var getFormData = function() {
	var getAccDet = $('#jqxgridp').jqxGrid('getrows');	
	for (i = 0; i < getAccDet.length; i++) {
		var datarow = $("#jqxgridp").jqxGrid('getrowdata', i);
		AccessoryDet.push({
			"id" : null,
			"fromCost":parseFloat(getAccDet[i].fromCost),
			"toCost" :parseFloat(getAccDet[i].toCost),
			"sellingPriceReference" :getAccDet[i].sellingPriceReferences,
			"mup":parseFloat(getAccDet[i].mup),
			"sellingRate":parseFloat(getAccDet[i].sellingRate),
			"exchangePercentage":parseFloat(getAccDet[i].exchangePercentage),
			"directPurchasePercentage":parseFloat(getAccDet[i].directPurchasePercentage),
		})
	}
	var AccessoryMastGrid = {
			"segmentDTO" :{"id" : parseInt($("#accSegmentC").val())},
			"code" :$("#articleCodeP").val(),
			"uom" : $('#uomP').val(),
			"region" : {"id" : parseInt($("#regionC").val())},
			"category" : {"id" : parseInt($('#mainCategoryP').val())},
			"subCategory" :{"id" : parseInt($('#subCategoryP').val())},
			"hsnMaster" :{"id" : parseInt($('#hsnCodeC').val())},
			"isCustomerAccessory" : ($('#customerFlag').val() == "true") ? true : false,
			"custHandlingCharges" : ($('#customerFlag').val() == "true") ? $('#custHandleCharges').val().trim(): "",
			"accessoryDetails" :($('#customerFlag').val() == "false") ? AccessoryDet : null
	}
	return AccessoryMastGrid;
}

var validateMandatory = function() {
	setLov($('#mainCategoryP option'), $('#mainCategoryP'),
			selectedRowData.mainCategory);
	fillLov($('#mainCategoryP').val(), $('#subCategoryP'), 'sCategory',
			'description', selectedRowData.subCategory);
	// setLov($('#accSegmentP option'), $('#accSegmentP'),
	// selectedRowData.accSegment);
	setLov($('#uomP option'), $('#uomP'), selectedRowData.uom);

	$('#activeYN').val(selectedRowData.activeYN == 'Yes' ? '1' : '0');
	$('#customerFlag').val(selectedRowData.custFlag == 'Yes' ? '1' : '0');

	$('#articleCodeP').val(selectedRowData.articleCode);
	$('#articleDescP').val(selectedRowData.articleDesc);
	$('#accessoryMasterId').val(selectedRowData.id);

	$('#custHandleCharges').val(selectedRowData.custHandleCharges);

}

function validateModalBox() {
	var accSegmentP = $('#accSegmentP').val();
	var mainCategoryP = $('#mainCategoryP').val();
	var subCategoryP = $('#subCategoryP').val();
	var uomP = $('#uomP').val();
	var articleCodeP = $('#articleCodeP').val();
	var articleDescP = $('#articleDescP').val();
	// var activeYN = $('#activeYN').val();
	var customerFlag = $('#customerFlag').val();
	/*
	 * if (customerFlag == '1') { var custHandleCharges =
	 * $('#custHandleCharges').val(); }
	 */
	// var regionStoreName = $('#regionStoreName').val();
	var flag = accSegmentP != '';
	flag = flag && mainCategoryP != '';
	flag = flag && subCategoryP != '';
	flag = flag && uomP != '';
	flag = flag && articleCodeP != '';
	flag = flag && articleDescP != '';
	// flag = flag && activeYN != '';
	flag = flag && customerFlag != '';
	//
	// flag = flag && region_modal != '';
	if (flag) {
		if (customerFlag == '1') {
			flag = flag && custHandleCharges != ''
					&& parseFloat(custHandleCharges) > 0;
		} else {
			flag = getGridRowCount() > 0
		}
	}
	return flag;
}

function validateNumeric(val) {
	if (val && !isNaN(val)) {
		return parseFloat(val) < 0 || parseFloat(val) > 9999999999.99 ? ''
				: parseFloat(val).toFixed(2);
	}
	return '';
}

$('#accessoryMasterModal').on('hidden.bs.modal', function() {
	$("form").trigger("reset");

});


$("#accSegmentC").on("change",function(){
	var accSegmentC = $("#accSegmentC").val();
	$('#hsnCodeC').empty().append('<option value="" selected>--Select--</option>');
	if(accSegmentC != ""){
		$('#hsnCodeC').empty().append('<option value="" selected>--Select--</option>');
		$.getJSON("/OrderExecution/api/v1/getHsnCodesBySegmentId?id="+ accSegmentC +'&type=AC',function(data){
			$.each(data.payload.hsnCodes,function(k,v){
				$("#hsnCodeC").append('<option value="' + v.id + '">'+ v.description+ '</option>');
			})
	  })
	}
});


//Download Template Files


/*$("#downloadacctemplate").on("click",function() {
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var newData = [];

	$.getJSON('/OrderExecution/api/v1/uploadAccessoryMasterColumns',function(data) {
		if(data != null){		
			data = data.payload.accmasterColsDetails;
				newData.push({
			        'Region' : data.Region,
					'AccessorySegment' : data.AccessorySegment,
					'Category ' : data.Category,
					'SubCategory' : data.SubCategory,
					'UOM ' : data.UOM,
					'ArticleCode' : data.ArticleCode,
					'ArticleDescription' : data.ArticleDescription,
					'CustFlag ' : data.CustFlag,
					'CustHandCharges':data.CustHandCharges,
					'IsActive':data.IsActive,
					'CreatedDate' : data.CreatedDate,
					'CreatedBy' : data.CreatedBy,
					'HSNCode ' : data.HSNCode,
					'FromCost ' : data.FromCost,
					'ToCost':data.ToCost,
					'TableRef':data.TableRef,
					'MupPerc':data.MupPerc,
					'AccSellingRate':data.AccSellingRate,
					'ExcPerc':data.ExcPerc,
					'DirectPurPerc':data.DirectPurPerc			
				});
				//JSONToCSVConvertor(newData,	"Credit TO Account" + "_" + sysdate, true);
				var opts = [{sheetid:'uploadAccMasterColumns',header:true}];
               var res = alasql('SELECT * INTO XLSX("uploadAccMasterColumns_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
               
		}
	});
});*/

//end of download template files


///////////*************Export to Audit************//////////
$("#exportAudit").on("click",function(){
	
	    var fieldFilters = accessoryMasterFilterValues();
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		var rows = $("#jqxgrid").jqxGrid('getrows');
		if(typeof rows == "undefined" || rows.length==0){
			$.growl.error({
				message : "No Data to Download.",
				duration : 10000
			});
			return false;
		}				
		if(rows.length != 0){
			postJSON('/OrderExecution/api/v1/downloadOrExportAccessory',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
					data = response.payload.list;
					exportAccessoryMasterSideBySide(data);
				}
			});
		}
		 else{
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;	
		}
	 
});

function exportAccessoryMasterSideBySide(data){

	var sql0 = 'SEARCH / AS @vh \
		RETURN ( \
		   @vh->[acmHeaderId] AS [AcmHeaderId], \
	       @vh->[hsnMaster]->hsnCode AS [HsnMaster] ,\
		   @vh->[Region]->name AS [Region], \
	       @vh->[AccessorySegment]->description AS [AccSegDesc], \
		   @vh->[detailIsActive] AS [DetailIsActive], \
	       @vh->[Category]->description AS [Category], \
		   @vh->[SubCategory]->description AS [SubCategoryDesc], \
	       @vh->[business]->name AS [Business], \
	       @vh->[UOM] AS [UQC], \
		   @vh->[ArticleCode] AS [ArticleCode], \
	       @vh->[ArticleDescription] AS [ArticleDescription], \
	       @vh->[CustFlag] AS [CustFlag], \
	       @vh->[CustHandCharges] AS [CustHandCharges], \
	       @vh->[IsActive] AS [IsActive], \
		   @vh->[acmDetailId] AS [AcmDetailId], \
	       @vh->[FromCost] AS [FromCost], \
	       @vh->[ToCost] AS [ToCost], \
	       @vh->[TableRef] AS [TableRef], \
		   @vh->[MupPerc] AS [MupPerc], \
		   @vh->[AccSellingRate] AS [AccSellingRate], \
	       @vh->[ExcPerc] AS [ExcPerc], \
		   @vh->[DirectPurPerc] AS [DirectPurPerc] \
			) \
		FROM $0';
	

	 var sql1 = 'SELECT * FROM ? AS m ';
    
 var res = null;
    
    var mystyle = {
      cellStyles: true,
      headers:true, 
      column: {style:{Font:{Bold:30}}},
      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
      cells: {1:{1:{
        style: {Font:{Color:"#00FFFF"}}
      }}}
    };
    
    try
    {
    	// Following code generates export data as Master-Child side-by-side
    	res0 = alasql(sql0,[data]);
    	//res1 = alasql(sql1,[data]);
    	res = alasql(sql1,[res0, res]);
    	adjustObjectKeys(res); 
    	removeNullData(res);
    	res = alasql("SELECT * INTO XLSX('AccessoryMasterDetails.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	alert(err.message);
    }

	
}

///////////Download the Vendor Stone Article ///////////////////////////
$("#downloadacctemplate").on("click",function(){
		var fieldFilters = accessoryMasterFilterValues();
		var rows = $("#jqxgrid").jqxGrid('getrows');
		if(typeof rows == "undefined"){
			$.growl.error({
				message : "No Data to Download.",
				duration : 10000
			});
			return false;
		 }else{				
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
				postJSON('/OrderExecution/api/v1/downloadOrExportAccessory',JSON.stringify(fieldFilters),function(response) {
					if (response != null) {
						data = response.payload.list;
						downloadAccessoryMasterSideBySide(data);
					}
				});
			}
			 else{
				$.growl.error({
					message : "No Data to Download",
					duration : 10000
				});
				return false;	
			}
		 }
	});

function downloadAccessoryMasterSideBySide(data){
		var sql0 = 'SEARCH / AS @vh \
			RETURN ( \
			   @vh->[acmHeaderId] AS [AcmHeaderId], \
		       @vh->[hsnMaster]->id AS [HsnId], \
			   @vh->[hsnMaster]->hsnDescription AS [HsnDesc], \
			   @vh->[Region]->id AS [RegionId], \
			   @vh->[Region]->name AS [RegionName], \
		       @vh->[AccessorySegment]->id AS [AccSegId], \
			   @vh->[AccessorySegment]->description AS [AccSegDesc], \
			   @vh->[detailIsActive] AS [DetailIsActive], \
		       @vh->[Category]->id AS [Category], \
			   @vh->[Category]->description AS [CategoryDesc], \
			   @vh->[SubCategory]->id AS [SubCategoryId], \
			   @vh->[SubCategory]->description AS [SubCategoryDesc], \
		       @vh->[business]->businessId AS [BusinessId], \
			   @vh->[business]->name AS [BusinessDesc], \
		       @vh->[UOM] AS [UQC], \
			   @vh->[ArticleCode] AS [ArticleCode], \
		       @vh->[ArticleDescription] AS [ArticleDescription], \
		       @vh->[CustFlag] AS [CustFlag], \
		       @vh->[CustHandCharges] AS [CustHandCharges], \
		       @vh->[IsActive] AS [IsActive], \
			   @vh->[acmDetailId] AS [AcmDetailId], \
		       @vh->[FromCost] AS [FromCost], \
		       @vh->[ToCost] AS [ToCost], \
		       @vh->[TableRef] AS [TableRef], \
			   @vh->[MupPerc] AS [MupPerc], \
			   @vh->[AccSellingRate] AS [AccSellingRate], \
		       @vh->[ExcPerc] AS [ExcPerc], \
			   @vh->[DirectPurPerc] AS [DirectPurPerc] \
				) \
			FROM $0';
		

		 var sql1 = 'SELECT * FROM ? AS m ';
	    
	 var res = null;
	    
	    var mystyle = {
	      cellStyles: true,
	      headers:true, 
	      column: {style:{Font:{Bold:30}}},
	      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
	      cells: {1:{1:{
	        style: {Font:{Color:"#00FFFF"}}
	      }}}
	    };
	    
	    try
	    {
	    	// Following code generates export data as Master-Child side-by-side
	    	res0 = alasql(sql0,[data]);
	    	//res1 = alasql(sql1,[data]);
	    	res = alasql(sql1,[res0, res]);
	    	adjustObjectKeys(res); 
	    	removeNullData(res);
	    	res = alasql("SELECT * INTO XLSX('DownloadAccessoryMasterDetails.xlsx',?) FROM ?",[mystyle, res]);
	    }
	    catch (err)
	    {
	    	alert(err.message);
	    } 	 
}


///////************************upload Functionality Implementation Done By Venkat*************/////////////
function HandleUploadExcelFile()
{
	// Check if file select event is captured
	if (fileEvent == null || (fileEvent != null && $.type(fileEvent) != "object"))
	{
		alert("Please select the data Excel file to load!");
		return;
	}

	var event = fileEvent;
    try {
	    alasql('SELECT * FROM FILE(?,{headers:true})', [event], function(data){
	        // Process data here if any conversion or validation is required!
			if (data != null)
			{
				var cols = getColumnHeaders(data);
				if (cols != null && cols.length > 0) {
									
				}
				else {
					alert("No data found in the uploaded file...");
				}
				var dataAccessoryDetails = [];
				$.each(data,function(key,value){
					var flag = false;
					if(value.AcmHeaderId != null && value.AcmHeaderId != 'undefined' && value.AcmHeaderId != ''){
						 if(dataAccessoryDetails.length>0){
							$.each(dataAccessoryDetails,function(index,dataValue){
								if(value.AcmHeaderId == dataValue.acmHeaderId){
									flag = true;
									var row ={										
											"acmDetailId": value.AcmDetailId,
									        "FromCost": value.FromCost,
									        "ToCost": value.ToCost,
									        "detailIsActive": value.DetailIsActive,
									        "TableRef": value.TableRef,
									        "MupPerc": value.MupPerc,
									        "AccSellingRate": value.AccSellingRate,
									        "ExcPerc": value.ExcPerc,
									        "DirectPurPerc": value.DirectPurPerc									 
									};
									dataValue.AccDetails.push(row);
									return;
								}
							});						
						}
						if(flag == false){
							var rowObject = {
									"acmHeaderId": value.AcmHeaderId,
							        "Region": {
							          "id": value.RegionId,						          
							        },
							        "AccessorySegment": {
							          "id": value.AccSegId,
							        },
							        "Category": {
							          "id": value.CategoryId
							        },
							        "SubCategory": {
							          "id": value.SubCategoryId,
							        },
							        "business": {
							          "id": value.BusinessId,
							        },
							        "UOM": value.UOM,
							        "ArticleCode": value.ArticleCode,
							        "ArticleDescription": value.ArticleDescription,
							        "CustFlag": value.CustFlag,
							        "hsnMaster": {
							          "id": value.HsnId,
							        },
							        "CustHandCharges": value.CustHandCharges,
							        "IsActive": value.IsActive,
							        "AccDetails" : [{
							        	"acmDetailId": value.AcmDetailId,
								        "FromCost": value.FromCost,
								        "ToCost": value.ToCost,
								        "detailIsActive": value.DetailIsActive,
								        "TableRef": value.TableRef,
								        "MupPerc": value.MupPerc,
								        "AccSellingRate": value.AccSellingRate,
								        "ExcPerc": value.ExcPerc,
								        "DirectPurPerc": value.DirectPurPerc	
							        }]
							};	
							dataAccessoryDetails.push(rowObject);
						}
					}else{
						var rowObject = {
								"acmHeaderId": null,
						        "Region": {
						          "id": value.RegionId,						          
						        },
						        "AccessorySegment": {
						          "id": value.AccSegId,
						        },
						        "Category": {
						          "id": value.CategoryId
						        },
						        "SubCategory": {
						          "id": value.SubCategoryId,
						        },
						        "business": {
						          "id": value.BusinessId,
						        },
						        "UOM": value.UOM,
						        "ArticleCode": value.ArticleCode,
						        "ArticleDescription": value.ArticleDescription,
						        "CustFlag": value.CustFlag,
						        "hsnMaster": {
						          "id": value.HsnId,
						        },
						        "CustHandCharges": value.CustHandCharges,
						        "IsActive": value.IsActive,
						        "AccDetails" : [{
						        	"acmDetailId": value.AcmDetailId,
							        "FromCost": value.FromCost,
							        "ToCost": value.ToCost,
							        "detailIsActive": value.DetailIsActive,
							        "TableRef": value.TableRef,
							        "MupPerc": value.MupPerc,
							        "AccSellingRate": value.AccSellingRate,
							        "ExcPerc": value.ExcPerc,
							        "DirectPurPerc": value.DirectPurPerc	
						        }]
						};	
						dataAccessoryDetails.push(rowObject);
					}
					
				});
				var arrFg = [];		
				for(var i=0;i<dataAccessoryDetails.length;i++){					
					if( dataAccessoryDetails[i].acmHeaderId == null && dataAccessoryDetails[i].Region.id == undefined && dataAccessoryDetails[i].hsnMaster.id == undefined &&
							dataAccessoryDetails[i].AccessorySegment.id == undefined && dataAccessoryDetails[i].Category.id == undefined && 
							dataAccessoryDetails[i].SubCategory.id	== undefined && dataAccessoryDetails[i].SubCategory.id	== undefined ) {	
						
					} else {
						arrFg.push(dataAccessoryDetails[i]);
					}
				}
				 var accdetails = JSON.stringify(arrFg);
				console.log(accdetails);
				
				// Calling API to upload Parameter Details.
				 
				 postJSON('/OrderExecution/api/v1/uploadAccessoryMaster', accdetails, function(response) {
					if (response.resCode == 1) {
						$.growl.notice({
							message : response.mesgStr,
							duration : 10000,
							title : 'Success'
						});
						return false;
					}else {
						$.growl.error({
							message : response.mesgStr,
							duration : 10000
						});
						return false;
					}
					
				});
			}
			else {
				alert("Invalid data in the uploaded file...");
			}
	    });	    	
    }
	catch(err) {
		//console.log('Upload Error: ', err);
		alert('Upload Error: ', err);
	};
	//change the 'testUpload' to the input id in your page
	document.getElementById("accDetailUpload").value = "";
	fileEvent = null;
 }
 function captureFileSelectEvent(event)
 {
 	fileEvent = event;
 }