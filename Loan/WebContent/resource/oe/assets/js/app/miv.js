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

$("#stoneDeailsLable").hide();
$("#accDeailsLable").hide();

$("#orderFromDate").datepicker({
 	changeMonth: true,
 	changeYear: true,
 	editable : true,
 	dateFormat: "dd/mm/yy",
 	onSelect: function (dateStr) {
         var min = $(this).datepicker('getDate'); 
         $("#orderToDate").datepicker('option', 'minDate', min || '0');
     }
 });

 $("#orderToDate").datepicker({
 	changeMonth: true,
 	changeYear: true,
 	dateFormat: "dd/mm/yy",
 });

var psrByMType = {};
var materialType = {};
var metalAccLocation = {};
var vendorList = {};
var stoneType = {};
var mivDto = new Object();
var data = {};
var stSrl = 0;

var psrMap = new Object();

var redirect = function() {
	window.location.href = "javascript:showContentPage('materialIssueVoucherListing', 'bodySwitcher')";
	return window.location.href;
}

var sortFields = [ {
	"fieldPath" : "createdDate"
} ];



// on change of Miv Type load Vendor 
$("#mivType").on('change',function(){
	var mivType = $("#mivType").val();
	var result;
		if(mivType == "DE"){
			result = vend2;
		}else if(mivType == "H"){
			result = vend3;
		}
		else{
			result = vend1;
		}
		
		var data = [];
		
		$.each( result, function( key, value ) {
				data.push({ value: value.id, label: value.name});
		});
		
		$(function() {		
			$("#vendorCode").autocomplete({				
				source: data,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#vendorCode-value").val(ui.item.value);
				}
			});          
	    });  
	
});


var $jwType = $('#jwType');
var $salesPerson = $('#salesPerson');
$.getJSON('/OrderExecution/api/v1/mivLOV?page=mivDetails', function(
		data) {
	$.each(data.payload.JwTypes, function(key, val) {
		$jwType.append('<option value="' + val.id + '">' + val.name
				+ '</option>');
		
	});
	
	$.each(data.payload.salesExecutive, function(key, val) {
		$salesPerson.append('<option value="' + val.hrmsId + '">' + val.name
				+ '</option>');
	}) 
	
    $('#materialType').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.mType, function(key, val) {
		$('#materialType').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
		
		
	
	vendorList = data.payload.vCodeList;
	  
	  var data = [];
	  $.each( vendorList, function( key, value ) {         
	    data.push({ value: value.id, label: value.name});
	  });
	 
	  $(function() {  
	   $("#vendorCode").autocomplete({  
	    
	    source: data,
	    focus: function(event, ui) {
	     
	     event.preventDefault();
	     $(this).val(ui.item.label);
	     
	    },
	    select: function(event, ui) {     
	     event.preventDefault();
	     $(this).val(ui.item.label);     
	     $("#vendorCode-value").val(ui.item.value);     
	    }
	    
	   });
	   
	   
	  });

}); 

// on change of material type load segments
$("#materialType").on('change',function(){
	var matTypeS = $("#materialType").val();
	var segment = [] ;
	 $.getJSON('/OrderExecution/api/v1/mivLOV?page=mivDetails', function(data) {
		 if(matTypeS == "F"){
			 segment  = data.payload.F 
		 }else if(matTypeS == "R"){
			 segment  = data.payload.R 
		 }else if(matTypeS == "S"){
			 segment  = data.payload.S
		 }else if(matTypeS == "A"){
			 segment  = data.payload.A
		 }
		 $('#segment').empty().append('<option value="" selected>--Select--</option>');
			$.each(segment, function(key, val) {
			$('#segment').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	 });
});

$("#Search").on("click", function() {	
	materialIssueVoucherDetailsGrid();
	$("#jqxgrid").show();
	return false;
});	


function addMIVStoneOrAccDetails(row)
{
	var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
	var stoneType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'stoneTypes');
	var psrNo = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'psrNos');

	if(null == materialType){
		
		$.growl.error({ message: "Material Type mandatory", duration: 10000, title: 'Error'});
		
	}else if('S' == materialType && 'Bulk' == stoneType && null  == psrNo){
		var flag, serialNo;
		var stonedtos =  $("#stonegrid").jqxGrid('getrows');
		var mivRow =  $("#jqxgrid").jqxGrid('getrows');
		var mivSrialNo = $('#jqxgrid').jqxGrid ('getcellvalue', row, 'mivSrialNo');
		
		var newArr = [];
		$.each(stonedtos, function(k, v){
			if(mivSrialNo == v.mivSlNo){
				newArr.push(v.slNo);
			}
		});
		
		if(typeof stonedtos == "undefined"){
			flag = false;
		}else{
			for(var i=0; i<stonedtos.length; i++){
				if(stonedtos[i].mivSlNo == mivSrialNo){
					flag = true;
				}
			}
		}
		if(flag == true){
			serialNo = newArr.length + 1;
		}else{
			serialNo = 1;
		}
		$("#stonegrid").jqxGrid('addrow', null, addMIVStonerow(mivSrialNo, serialNo, row));
		
	}
	else if('S' == materialType && (null == stoneType)){		
		$.growl.warning({ message: "Stone Type is mandatory for Material Type Stones", duration: 10000, title: 'warning' });
		
	}
	
	
}

var mivRenderer = function(row, column, value) {
	var jwType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'jwType');
	var OType  =    $('#jqxgrid').jqxGrid('getcellvalue', row, 'operationType');
	return '<a class="btn btn-sm btn-primary" style="margin-left: 10px;" type="button"  onclick=mivPrintcall('+ value +',"'+ jwType +'","'+ OType +'") href="#?id=' 
				+ value + '"/><i class="fa fa-print fa-lg"></i> </a>'
		
	}

function mivPrintcall(mivNo,jtype,otype)
{
	/*if(mivNo!=null && jtype=='M' && otype=='System')
		{
	fieldFilters = {
            "fieldFilters" : {
                "manualMivNo" : mivNo,
                "mode" : "pdf",
                "reportName" : "RPT_Melting_MIV"
            }
        };
	jasperReport('RPT_Melting_MIV.pdf', fieldFilters);
		}
	else if(mivNo!=null && jtype=='S' && otype=='System')
		{
		fieldFilters = {
	            "fieldFilters" : {
	                "manualMivNo" : mivNo,
	                "mode" : "pdf",
	                "reportName" : "BullionMIV"
	            }
	        };
		jasperReport('BullionMIV.pdf', fieldFilters);
		
		}
	else if(mivNo!=null && jtype=='A' && otype=='System')
	{
	fieldFilters = {
            "fieldFilters" : {
                "manualMivNo" : mivNo,
                "mode" : "pdf",
                "reportName" : "RPT_Assaying_MIV"
            }
        };
	jasperReport('RPT_Assaying_MIV.pdf', fieldFilters);
	
	}
	
	else if(mivNo!=null && jtype=='R' && otype=='System')
	{
	fieldFilters = {
            "fieldFilters" : {
                "manualMivNo" : mivNo,
                "mode" : "pdf",
                "reportName" : "RPT_ Refining_MIV"
            }
        };
	jasperReport('RPT_ Refining_MIV.pdf', fieldFilters);
	
	}*/
	
  if(mivNo!=null && (jtype=='S' || jtype=='D' || jtype=='C' || jtype=='H') && (otype=='Regular' || otype=='System'))
	{
	fieldFilters = {
            "fieldFilters" : {
                "manualMivNo" : mivNo,
                "mode" : "pdf",
                "reportName" : "RPT_GIV_DeliveryChallan"
            }
        };
	jasperReport('RPT_GIV_DeliveryChallan.pdf', fieldFilters);
	
	}else{
		$.growl.error({ message: "Please select print in respective listing pages!", duration: 5000, title: 'Error' });
		return false;
	}
	
	/*else if(mivNo!=null && jtype=='B'  && otype=='System')
	{
	fieldFilters = {
            "fieldFilters" : {
                "manualMivNo" : mivNo,
                "mode" : "pdf",
                "reportName" : "MIV_To_Bullion_Dealer"
            }
        };
	jasperReport('MIV_To_Bullion_Dealer.pdf', fieldFilters);
	
	}
	
	else if(mivNo!=null && jtype=='D'  && otype=='System')
	{
	fieldFilters = {
            "fieldFilters" : {
                "manualMivNo" : mivNo,
                "mode" : "pdf",
                "reportName" : "RPT_Stone_Diamond_MIV_List"
            }
        };
	jasperReport('RPT_Stone_Diamond_MIV_List.pdf', fieldFilters);
	
	}
	
	*/
}
function mivDetailsFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};

    var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();	
	var vendorName = $('#vendorCode-value').val();
	var jwType = $('#jwType').val();
	var id=$('#mivNo').val();
	var materialType=$('#materialType').val();
	var segment=$('#segment').val();
	/*var psrNumber=$('#psrNumber').val();	*/
	var salesPerson=$('#salesPerson').val();	
	
    if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["orderFromDate"] = fromDate;
	}

	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["orderToDate"] = toDate;
	}
	if (vendorName != "" && vendorName != null) {
		fieldFilters.fieldFilters["vendorName"] = vendorName;
	}
	if (jwType != "" && jwType != null) {
		fieldFilters.fieldFilters["jwType"] = jwType;
	}
	if (id != "" && id != null) {
		fieldFilters.fieldFilters["id"] = id;
	}
	
	if (materialType != "" && materialType != null) {
		fieldFilters.fieldFilters["materialType"] = materialType;
	}
	
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segment"] = segment;
	}
	
	if (salesPerson != "" && salesPerson != null) {
		fieldFilters.fieldFilters["salesPerson"] = salesPerson;
	}

	return fieldFilters;
}

var mivFilterValues = function(materialType, psrNo, mivSrlNo) {

	fieldFilters = {
		"fieldFilters" : {}
	};
	
	var vendorCode = $('#vendorCode-value').val();
	var mivType = $('#mivType').val();
	
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCode;
	}

	if (mivType != "" && mivType != null) {
		fieldFilters.fieldFilters["mivType"] = mivType;
	}

	fieldFilters.fieldFilters["psrNo"] = psrNo;
	fieldFilters.fieldFilters["materialType"] = materialType;
	fieldFilters.fieldFilters["mivSrlNo"] = mivSrlNo;
	
	return fieldFilters;
}


 function mivDetails() {
	var mivDetail = {
		"mivdtos" : [],
		"stoneDTOs" : [],
		"accessoryDTOs": [],
		"mivType":null,
		"vendorCode":null
		
	};
	
	mivDetail.stoneDTOs = $("#stonegrid").jqxGrid('getrows');
	mivDetail.accessoryDTOs = $("#accgrid").jqxGrid('getrows');
	mivDetail.mivdtos = $("#jqxgrid").jqxGrid('getrows');
	mivDetail.mivType = $('#mivType').val();
	mivDetail.vendorCode = $('#vendorCode-value').val();
	
	return mivDetail;
}


/* Material Issue Voucher */

 var subMatTypes = [
		{
		  "id" : "F",
		  "name" : "Finished Goods"
		},
		{
		  "id" : "R",
		  "name" : "Raw Material"	
		},
		{
		  "id" : "S",
		  "name" : "Stones"	
		},
		{
		  "id" : "A",
		  "name" : "Accessory"	
		}
		]
 
 var DesMatTypes = [
		{
		  "id" : "F",
		  "name" : "Finished Goods"
		},
		{
		  "id" : "S",
		  "name" : "Stones"	
		},
		{
		  "id" : "A",
		  "name" : "Accessory"	
		}
		]

 var DHCMatTypes = [
		{
		  "id" : "F",
		  "name" : "Finished Goods"
		}
		]

 
 var typeCol;
 
function mivGrid()
{
	var updateRows = function(rowid, newdata, commit) {
		/*
		 * updates[newdata.id] = {
		 *  };
		 */
	}
	
	var addrow =  function (rowid, rowdata, position, commit) {
        commit(true);
	}
	
	
	var metalAccLocationSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : metalAccLocation
		};

	var metalAccLocationeDataAdapter = new $.jqx.dataAdapter(metalAccLocationSource, {
		autoBind : true
	});
	
	var materialTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : materialType
		};

	var materialTypeDataAdapter = new $.jqx.dataAdapter(materialTypeSource, {
		autoBind : true
	});
	var refNoS = [{
		"id" : 1,
		"name" : "test"
	}]
	
	var refNoSSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : refNoS
		};

	var refNoSDataAdapter = new $.jqx.dataAdapter(refNoSSource, {
		autoBind : true
	});
	
	
	
	var stoneTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : stoneType
		};

	var stoneTypeDataAdapter = new $.jqx.dataAdapter(stoneTypeSource, {
		autoBind : true
	});
	
	var psrTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'long'
			}, {
				name : 'name',
				type : 'long'
			} ],
			localdata : psrList
		};

	var psrTypeDataAdapter = new $.jqx.dataAdapter(psrTypeSource, {
		autoBind : true
	});
	
	
	var segmentSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'description',
				type : 'string'
			} ],
			localdata : segmentTypeF
		};

	var segmentDataAdapter = new $.jqx.dataAdapter(segmentSource, {
		autoBind : true
	});
	
	var metalTypetSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'description',
				type : 'string'
			} ],
			localdata : segmentTypeF
		};

	var metalTypeDataAdapter = new $.jqx.dataAdapter(metalTypetSource, {
		autoBind : true
	});	
	
	var skinPuritySource = {
		datatype : 'json',
		datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} 
		],
		localdata : goldSkinPurity
	};

	var skinPurityDataAdapter = new $.jqx.dataAdapter(skinPuritySource, {
		autoBind : true
	});
	
	var datafields = [ {
		'name' : 'mivSrialNo',
		'type' : 'int'
	},{
		name : 'materialTypes',
		value : 'materialType',
		values : {
			source : materialTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},{
		name : 'stoneTypes',
		value : 'stoneType',
		values : {
			source : stoneTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	{
		name : 'segment',
		type : 'string'
	},{
		name : 'segments',
		value : 'segment',
		values : {
			source : segmentDataAdapter.records,
			value : 'id',
			name : 'description'
		}
	},
	{
		name : 'metalType',
		type : 'string'
	},{
		name : 'metalTypes',
		value : 'metalType',
		values : {
			source : metalTypeDataAdapter.records,
			value : 'id',
			name : 'description'
		}
	},
	
	{
		name : 'psrNo',
		type : 'string'
	},{
		name : 'psrNos',
		value : 'psrNo',
		values : {
			source : psrTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	
	{
		'name' : 'metalAccLocation',
		'type' : 'string'
	},{
		name : 'metalAccLocations',
		value : 'metalAccLocation',
		values : {
			source : metalAccLocationeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'refType',
		'type' : 'string'
	}, {
		'name' : 'refNo',
		'type' : 'string'
	},{
		name : 'refNoS',
		value : 'refNo',
		values : {
			source : refNoSDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'refSerialNo',
		'type' : 'string'
	}, {
		'name' : 'partyBillNo',
		'type' : 'string'
	}, {
		'name' : 'partyBillDat',
		'type' : 'string'
	}, 
	
	
	{
		name : 'mivSkinPurity',
		type : 'string'
	},{
		name : 'skinPuritys',
		value : 'mivSkinPurity',
		values : {
			source : skinPurityDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	
	{
		'name' : 'pcs',
		'type' : 'string'
	}, {
		'name' : 'grossWeight',
		'type' : 'decimal'
	}, {
		'name' : 'netWeight',
		'type' : 'decimal'
	}, {
		'name' : 'remarks',
		'type' : 'string'
	},{
		'name' : 'selectionStatus',
		'type' : 'bool'
	},{
		'name' : 'stoneAccFlag',
		'type' : 'bool'
	}];

	var columns = [
		{'text' : 'Sl. No.',datafield : 'mivSrialNo','width' : '5%',cellsalign : 'center',align:'center',editable : false},
		{text : 'Material Type',datafield : 'materialType',	columntype : 'dropdownlist',displayfield : 'materialTypes',cellsalign : 'center',align:'center',	cellbeginedit: checkForMIVType,	editable : true,sortable : false,'width' : '7%',
			createeditor : function(row, value, editor) {
				var materialTypes = [];
				var mivType = $("#mivType").val()
				
					
				if(mivType === "S"){
					materialTypes = subMatTypes;
				}
				else if(mivType == "DE"){
					materialTypes = DesMatTypes;
				}
				else if(mivType == "H" || mivType == "D" || mivType == "C"){
					materialTypes = DHCMatTypes;
				}
				
				editor.jqxDropDownList({ source: materialTypes , displayMember: 'name', valueMember: 'id'});
				
			},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {	
				$("#jqxgrid").jqxGrid('setcellvalue', row, "materialTypes", newvalue.label);
				$("#jqxgrid").jqxGrid('setcellvalue', row, "materialType", newvalue.value);
				
				
				if(newvalue.value == "A"){
					$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneTypes", "PSR");
					$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneType", "P");					
				}
				
				if(newvalue.value == "R"){
					$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneTypes", null);
					$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneType", null);					
				}
			}
		},
		{text : 'Type',datafield : 'stoneType',columntype : 'dropdownlist',displayfield : 'stoneTypes',cellsalign : 'center',align:'center',editable : true,sortable : false,'width' : '5%',
				createeditor : function(row, value, editor) {
					editor.on('click', function(event){	
					var mivType = $("#mivType").val();
					var stTypeArr = [];
					var matType = $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
					if(matType === "F"){
						if(mivType == "H" ||mivType == "D" || mivType == "C"){
							 stTypeArr.push(fgPsrType[1]);
						}else{
							var stTypeArr =  fgPsrType;
						}
					}
					 if(matType === "S"){
						stTypeArr.push(stoneType[0]) ;
					}
						
						 var stTypeArry = [];
						 $.each(stTypeArr,function(k,v){
							 stTypeArry.push({
								 "id" : v.id,
								 "name" : v.name
							 });
						 });
						 editor.jqxDropDownList({ source: stTypeArry , displayMember: 'name', valueMember: 'id'});	
					});
				},
				cellbeginedit : function(row){
					var matType = $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
					if(matType == "R" || matType == "A"){
						return false;
					}
				}, 
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(oldvalue != newvalue.value){
						$("#jqxgrid").jqxGrid('setcellvalue', row, "segment", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "segments", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalType", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalTypes", null);					
						$("#jqxgrid").jqxGrid('setcellvalue', row, "psrNo", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "psrNos", null);					
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocations", null);					
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refType", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNo", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNos", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "partyBillNo", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "partyBillDat", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "mivSkinPurity", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "pcs", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "grossWeight", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight", null);
					}
					if(newvalue.label == "None"){
						$("#jqxgrid").jqxGrid('setcellvalue', row, "psrNo", "None");
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocations", "STU");
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation", "STU");
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refType", "MRV");
						var matType = $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
						if(matType == "F"){
							$("#jqxgrid").jqxGrid('setcellvalue', row, "psrNos", "NONE");
							$("#jqxgrid").jqxGrid('setcellvalue', row, "psrNo", "N");
						}
						$("#jqxgrid").jqxGrid('setcellvalue', row, "psrNos", null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "psrNo", null);
					 }
					 
					 if(newvalue.label == "Bulk"){
						 $("#jqxgrid").jqxGrid('setcellvalue', row, "psrNos", null);
						 $("#jqxgrid").jqxGrid('setcellvalue', row, "psrNo", null);
					 }
					 var mivSrialNo = $('#jqxgrid').jqxGrid('getcellvalue', row, 'mivSrialNo');
					 var rowsStone = $('#stonegrid').jqxGrid("getrows");
					 var newArrayStone = [];
					 if(typeof rowsStone != "undefined"){
							for(var k=0; k<rowsStone.length; k++){
							if(mivSrialNo ==  rowsStone[k].mivSlNo){
								var idVal = $("#stonegrid").jqxGrid('getrowid', k);
								newArrayStone.push(idVal);	
							}
						}
						if(oldvalue != newvalue.value){
							 $("#stonegrid").jqxGrid('deleterow', newArrayStone);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "refNo",null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "mivSkinPurity",null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "refNos",null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "skinPuritys",null);
						}
					}
				}	
			},		
			{text : 'Segment',datafield : 'segment',columntype : 'combobox',displayfield : 'segments',cellsalign : 'center',align:'center',
				cellbeginedit: checkForMIVMetalType,
				editable : true,
				sortable : false,
				'width' : '5%',
				cellbeginedit: function(row, datafield, columntype) {
					var matType = $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
					if(matType == "S" || matType == "A"){
						return false;
					}else{
						return true;
					}
				},
				createeditor : function(row, value, editor) {
					var segments = [];
					var matType = $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
					if(matType == "F"){
						segments = segmentTypeF;
					}
					else if(matType == "R"){
						segments = segmentTypeR;
					}
					
					editor.jqxComboBox({
							source : segments,
							displayMember : 'description',
							valueMember : 'id'
						});
					},
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					
					$("#jqxgrid").jqxGrid('setcellvalue', row, "segment", newvalue.value);
					$("#jqxgrid").jqxGrid('setcellvalue', row, "segments", newvalue.label);
					
					var materialType = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'materialType');
					if(null == materialType.value || "" == materialType.value ){
						$.growl.error({ message: "Material Type is mandatory.", duration: 10000, title: 'Error' });
							return newvalue;
						}
					if(null !=  newvalue.value && "Diamond" == newvalue.label){
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalTypes", "Gold");
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalType", newvalue.value);
					}else{
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalTypes", newvalue.label);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalType", newvalue.value);
					}
								
					return newvalue;
				}
			},
			{text : 'Metal Type',datafield : 'metalType',columntype : 'combobox',displayfield : 'metalTypes',width : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false,
				initeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : metalTypeDataAdapter,
						displayMember : 'description',
						valueMember : 'id'
					});
				},
			},		
			{'text' : '', hidden: true, datafield : 'stoneAccFlag',columngroup: 'mi','width' : '4%',cellsalign : 'center',align:'center',editable : false},	

			{text : 'PSR No.',datafield : 'psrNo',columntype : 'dropdownlist',displayfield : 'psrNos',cellsalign : 'center',align:'center',
				cellbeginedit: checkForMIVMetalType,
				editable : true,
				sortable : false,
				'width' : '5%',
				
				createeditor : function(row, value, editor) {
					editor.on('click', function(event){	
						  var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneType');    
						
						  var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');     
							var segmentId = $('#jqxgrid').jqxGrid('getcellvalue', row, "segment")
							var psrBySegId = [];
							if("F" == materialType){
								if(typeof psrMap[segmentId] != "undeined" && psrMap[segmentId] != null){
									psrBySegId = psrMap[segmentId];
								}else{
									psrBySegId = [];
								}
							}			
							else{
								psrBySegId = psrMap[materialType];
							}
							
							var designerName = editor.val();
							var psrBySegIdArr = [];
							$.each(psrBySegId,function(k,v){
								psrBySegIdArr.push({
									"id" : v.id,
									"name" : v.name
								});
							});
							if(psrBySegIdArr != null){
								editor.jqxDropDownList({
									source : psrBySegIdArr,
									displayMember : 'name',
									valueMember : 'id'
								});
							}
					});
				},
				
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					var mivSrialNo = $('#jqxgrid').jqxGrid ('getCell', row, 'mivSrialNo')
					var materialType = $('#jqxgrid').jqxGrid ('getCell', row, 'materialType');
				    var stoneType = $('#jqxgrid').jqxGrid ('getcellvalue', row, 'stoneType');
				if(null == materialType.value || "" == materialType.value ){
					$.growl.error({ message: "Material Type is mandatory.", duration: 10000, title: 'Error' });
					return "";
				}else if("R" == materialType.value){
					$.growl.warning({ message: "Functionality is not implemented, Change Material Type.", duration: 10000, title: 'warning' });
					return "";
				}else if("S" == materialType.value && (null == stoneType || (null != stoneType && 'B' == stoneType))){
					$.growl.warning({ message: "PSR # is required only for Stonetype PSR; ", duration: 10000, title: 'Error' });
					return "";
				}else if(null != stoneType && "P" != stoneType){
					if(stoneType.value == null || stoneType.value == ""){
						$.growl.warning({ message: "PSR # is required only for Stonetype PSR; ", duration: 10000, title: 'Error' });
						return "";
					}
				}else if("A" == materialType.value && (null == stoneType || (null != stoneType && 'B' == stoneType))){
					$.growl.warning({ message: "Stone type should be PSR.", duration: 10000, title: 'Error' });
					return "";
				}else if(null == newvalue || "" == newvalue){
					$.growl.error({ message: "PSR is mandatory.", duration: 10000, title: 'Error' });
					return "";
				}else{
					var characterReg = /^([0-9]{0,19})$/;
					if(!characterReg.test(newvalue.label)) {
						$.growl.error({ message: "Invalid PSR value", duration: 10000, title: 'Error' });
					    return "";
				    }
					if(materialTypePSR(mivSrialNo.value, materialType.value, newvalue.label)){
						$.growl.error({ message: "Duplicate PSR No for the Material type", duration: 10000, title: 'Error' });
				    	return "";
				    }						    
					if("S" == materialType.value && stoneDetailsValidation(mivSrialNo.value,materialType.value, newvalue.label)){
						$.growl.error({ message: "Duplicate PSR No for the Material type", duration: 10000, title: 'Error' });
					    return "";
				    }
					if("A" == materialType.value && accDetailsValidation(mivSrialNo.value,materialType.value, newvalue.label)){
						$.growl.error({ message: "Duplicate PSR No for the Material type", duration: 10000, title: 'Error' });
				    	return "";
				    }
					var resCode = 1;
					$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneAccFlag", false);

					postJSON('/OrderExecution/api/v1/PSRDetails?page=miv', JSON.stringify(mivFilterValues(materialType.value, newvalue.label, mivSrialNo.value)), function(data) {
					if(1 == data.resCode){
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocations", data.payload.psrDetails.metalAccLocation);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation", data.payload.psrDetails.metalAccLocation);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "mivSkinPurity", data.payload.psrDetails.skinPuritys);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "skinPuritys", data.payload.psrDetails.skinPuritys);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "pcs", data.payload.psrDetails.pcs);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "grossWeight", data.payload.psrDetails.grossWeight);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight", data.payload.psrDetails.netWeight);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refType", data.payload.psrDetails.refType);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refNos", data.payload.psrDetails.refNo);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refNo", data.payload.psrDetails.refNo);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNos", data.payload.psrDetails.refSerialNo);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNo", data.payload.psrDetails.refSerialNo);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "partyBillDat", data.payload.psrDetails.partyBillDat);						
						if(materialType.value =="S" || materialType.value == "A"){
							if(data.payload.psrDetails.accessoryDTO.length == 0 && data.payload.psrDetails.stoneDTO.length == 0 ){
								$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneAccFlag", true);
							}
								
						}
						//stone			
							var slno = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'mivSrialNo');
							var matType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
							var stType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'stoneType');
							var stoneRows = $("#stonegrid").jqxGrid('getrows');
							var stoneRowId = 0;
							var count = 0;
 							if(stoneRows.length!=0){
								$.each(stoneRows,function(key,value){
									if(slno == value.mivSlNo){																					
										stoneRowId = key;
										count = count + 1;
									}																			
								})
							}
 							if(count!=0){
 								for(var i = 0 , id=stoneRowId; i < count;i++){
 									$("#stonegrid").jqxGrid('deleterow', id--);
 								}
 							}
							if(data.payload.psrDetails.stoneDTO.length > 0){{}																
								if(count!=0){
									$.each(data.payload.psrDetails.stoneDTO, function(index, val) {																		
										$("#stonegrid").jqxGrid('addrow', null, generateMIVStonerow(newvalue.label, val,matType,stType),stoneRowId++);																																
									});																		
								}
								if(count == 0){
									$.each(data.payload.psrDetails.stoneDTO, function(index, val) {									
										$("#stonegrid").jqxGrid('addrow', null, generateMIVStonerow(newvalue.label, val,matType,stType));
									});
								}
							}
						//acc
							
							var slno1 = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'mivSrialNo');
							var stoneRows1 = $("#accgrid").jqxGrid('getrows');
							var matType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
							var stType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'stoneType');
							var stoneRowId1 = 0;
							var count1 = 0;
 							if(stoneRows1.length!=0){
								$.each(stoneRows1,function(key,value){
									if(slno1 == value.mivSlNo){																					
										stoneRowId1 = key;
										count1 = count1 + 1;
									}																			
								})
							}
 							if(count1!=0){
 								for(var i = 0 , id=stoneRowId1; i < count1;i++){
 									$("#accgrid").jqxGrid('deleterow', id--);
 								}
 							}
							if(data.payload.psrDetails.accessoryDTO.length > 0){{}																
								if(count1!=0){																	
									$.each(data.payload.psrDetails.accessoryDTO, function(index, val) {																		
										$("#accgrid").jqxGrid('addrow', null, generateMIVAccrow(newvalue.label, val,matType,stType),stoneRowId1++);																																
									});																		
								}
								if(count1 == 0){
									$.each(data.payload.psrDetails.accessoryDTO, function(index, val) {									
										$("#accgrid").jqxGrid('addrow', null, generateMIVAccrow(newvalue.label, val,matType,stType));
									});
								}
							}
							
					}else {												
						$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
							$("#jqxgrid").jqxGrid('setcellvalue', row, "psrNo", "");
							resCode = 2;
							
					}
						
					});
					if(resCode == 1){
						return newvalue;
					}else{
						return ""; 
					}
				}
					
				},
				sortable : false,
				editable : true
			},
			{'text' : 'Metal A/c Loc.',	datafield : 'metalAccLocation',	'width' : '7%',sortable : false,editable : true,cellsalign : 'center',align:'center',columntype : 'combobox',displayfield : 'metalAccLocations',cellbeginedit: checkForMIVMetalTypeMAL,
				createeditor : function(row, value, editor) {
					editor.on('click', function(event){	
						var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
						var segment = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'segment');
						if("R" ==  materialType){
							$.getJSON('/OrderExecution/api/v1/mivMetalAccLocs?segmentId=' + segment, function(data) {
								if(data.resCode == 1){
									editor.jqxComboBox({
										source : data.payload.metalAccLocs,
										displayMember : 'name',
										valueMember : 'id'
									});
								}else{
									editor.jqxComboBox({
										source : [],
										displayMember : 'name',
										valueMember : 'id'
									});
									$.growl.error({ message: data.mesgStr, duration: 5000, title: 'Error' });
								}
							})
						}
					});
				},
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
					if(newvalue.value == 0 && materialType != "R"){
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refType", "STK");
					}else{
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refType", null);
					}
				}
			},			
			{'text' : 'Ref. Type',datafield : 'refType','width' : '5%',cellbeginedit: checkForRefMetalTypeRM,cellsalign : 'center',align:'center',sortable : false,editable : true,
				cellbeginedit: function(row, datafield, columntype){
					var refType = $("#jqxgrid").jqxGrid('getcellvalue', row, "refType");
					var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");						
					var stoneType = $("#jqxgrid").jqxGrid('getcellvalue', row, "stoneTypes");
					var metalAccLocation = $("#jqxgrid").jqxGrid('getcellvalue', row, "metalAccLocation");	
					// as per discussion with murty sir Valuation slip flag will be always false in DC so checking metalAccLocation with 0 - 1/10/2019
					if(materialType == "R" && metalAccLocation == 0){
						return false;
					}
					
					if(materialType == "S"){
						return false;
					}else{
						if(refType == "" || refType == null){
							return true;
						}else{
							return false;
						}
					}
			}},
			{'text' : 'Ref. No. ',datafield : 'refNo','width' : '5%',cellsalign : 'center',align:'center',
				createeditor : function(row, value, editor) {
					editor.on('click', function(event){	
						var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");						
						var refType = $("#jqxgrid").jqxGrid('getcellvalue', row, "refType");
						var stoneType = $("#jqxgrid").jqxGrid('getcellvalue', row, "stoneTypes");
						var segment = $("#jqxgrid").jqxGrid('getcellvalue', row, "segment");
						
						if(materialType == "R"  && refType == "STK" ){							
							$.getJSON('/OrderExecution/api/v1/openStockNos?segmentId=' + segment, function(data) {
								if(data.resCode == 1){
									editor.jqxDropDownList({ source: data.payload.stockItemNos , displayMember: 'name', valueMember: 'id'});
								}else{
									$.growl.error({ message: data.mesgStr, duration: 10000});
									return false;
								}
							});
						}else if(materialType == "F" && stoneType == "None"){
							
							if(typeof segment == "undefined" || segment == null){
								$.growl.error({
									message : "Please Select the Segment Feild",
									duration : 10000
								});
								return false;
							}
							else{
							var vendorCode = $("#vendorCode-value").val();
							var mivType = $("#mivType").val();
							
							$.getJSON('/OrderExecution/api/v1/openMrvForVendor?vendorId='+vendorCode+'&jwType='+mivType+'&segment='+segment, function(data) {
								if(data.resCode == 1){
									editor.jqxDropDownList({ source: data.payload.mrvNos , displayMember: 'name', valueMember: 'id'});
								}else{
									$.growl.error({ message: data.mesgStr, duration: 10000});
									return false;
								}
							});
						}
						}else{
							typeCol = 'numberinput';
							editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
						}
					})	
				}, 
				formatter:function numFormat( cellvalue, options, rowObject ){
			        return cellvalue.replace(",","");
			    },
				cellbeginedit : function(row){
					var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");						
					var refType = $("#jqxgrid").jqxGrid('getcellvalue', row, "refType");
					var stoneType = $("#jqxgrid").jqxGrid('getcellvalue', row, "stoneTypes");
					var segment = $("#jqxgrid").jqxGrid('getcellvalue', row, "segment");
					var metalAccLocation = $("#jqxgrid").jqxGrid('getcellvalue', row, "metalAccLocation");
					
					
					if((materialType == "R"  && refType == "STK" ) || (materialType == "F" && stoneType == "None")){
						 this.columntype = 'dropdownlist';
						 return true;
						// as per discussion with murty sir Valuation slip flag will be always false in DC so checking metalAccLocation with 0 - 1/10/2019
					}else if(materialType == "R" && metalAccLocation == 0){
						return false;
					}
					else if(materialType == "R" && stoneType == null){
						this.columntype = 'numberinput';
						return true;
					}
					else{
						return false;
					}
				},
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					
					var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");	
					var refType = $("#jqxgrid").jqxGrid('getcellvalue', row, "refType");
					var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");	
					var refType = $("#jqxgrid").jqxGrid('getcellvalue', row, "refType");
					var refNo = $("#jqxgrid").jqxGrid('getcellvalue', row, "refNo");
					
					$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNo", null);
					$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNos", null);
					$("#jqxgrid").jqxGrid('setcellvalue', row, "partyBillNo", null);
					$("#jqxgrid").jqxGrid('setcellvalue', row, "partyBillDat", null);
					$("#jqxgrid").jqxGrid('setcellvalue', row, "mivSkinPurity", null);
					$("#jqxgrid").jqxGrid('setcellvalue', row, "pcs", null);
					$("#jqxgrid").jqxGrid('setcellvalue', row, "grossWeight", null);
					$("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight", null);
					
				
					if(materialType == "R"  && refType == "STK" ){						
						
						$.getJSON('/OrderExecution/api/v1/getMivDetsForStockItem?stockItemId='+newvalue.value, function(data) {
							if(data.resCode == 1){
								$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNo", data.payload.psrDetails.refSerialNo);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNos", data.payload.psrDetails.refSerialNo);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "partyBillNo", data.payload.psrDetails.partyBillNo);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "partyBillDat", data.payload.psrDetails.partyBillDat);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "mivSkinPurity", data.payload.psrDetails.skinPuritys);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "skinPuritys", data.payload.psrDetails.skinPuritys);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "pcs", data.payload.psrDetails.pcs);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "grossWeight", data.payload.psrDetails.grossWeight);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight", data.payload.psrDetails.netWeight);
								
							}else{
								$.growl.error({ message: data.mesgStr, duration: 10000});
								return false;
							}
							
						});
					}
				},
				displayfield : 'refNos',
	            validation: function (cell, value) {
	                if (value < 0) {
	                    return { result: false, message: "Invalid Number" };
	                }
	                return true;
	            },
				sortable : false,
				editable : true
			},
			{'text' : 'Ref Sl. No.',datafield : 'refSerialNo','width' : '5%',	cellsformat: 'n',cellsalign : 'center',align:'center',
				initeditor: function (row, cellvalue, editor) {
					var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");		
					var refType = $("#jqxgrid").jqxGrid('getcellvalue', row, "refType");
					var refNo = $("#jqxgrid").jqxGrid('getcellvalue', row, "refNo");
					var vendorCode = $("#vendorCode-value").val();
					var mivType = $("#mivType").val();
					var segment = $('#jqxgrid').jqxGrid ('getcellvalue', row, 'segment');
					if(materialType== "F" && refType == "MRV"){
						if(refNo == "" || refNo == null){
							$.growl.error({ message: "Please Fill the Ref No Feild", duration: 10000});
							return false;
						}else{
						$.getJSON('/OrderExecution/api/v1/openMrvSrlNosForVendor?vendorId='+vendorCode+'&jwType='+mivType+'&mrvNo='+refNo+'&segment='+segment, function(data) {
							if(data.resCode == 1){
								editor.jqxDropDownList({ source: data.payload.mrvNoSrlNos , displayMember: 'name', valueMember: 'id'});
							}else{
								$.growl.error({ message: data.mesgStr, duration: 10000});
								return false;
							}
						});
					}}
	            },cellbeginedit : function(row){
	            	var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");	
	            	var metalAccLocation = $("#jqxgrid").jqxGrid('getcellvalue', row, "metalAccLocation");	
	            	var refType = $("#jqxgrid").jqxGrid('getcellvalue', row, "refType");
					var refNo = $("#jqxgrid").jqxGrid('getcellvalue', row, "refNo");
					var vendorCode = $("#vendorCode-value").val();
					var mivType = $("#mivType").val();
					var metalAccLocation = $("#jqxgrid").jqxGrid('getcellvalue', row, "metalAccLocation");	
					// as per discussion with murty sir Valuation slip flag will be always false in DC so checking metalAccLocation with 0 - 1/10/2019
					
					if(materialType == "R" && metalAccLocation == 0){
						return false;
					}else if(materialType== "F" && refType == "MRV"){
						this.columntype = 'dropdownlist';
						return true;
					}else if(materialType== "R" && metalAccLocation == 0){
						this.columntype = 'numberinput';
						return true;
					}else{
						return false;
					}
				},cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					
					var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");	
					var refType = $("#jqxgrid").jqxGrid('getcellvalue', row, "refType");
					var refNo = $("#jqxgrid").jqxGrid('getcellvalue', row, "refNo");
					
					var mivRows = $("#jqxgrid").jqxGrid('getrows');
					var duplicateFlag = false;
					
					if(mivRows.length > 1){
						$.each(mivRows,function(k,v){
							if(v.refNo == refNo && v.refSerialNo == newvalue.value){
								duplicateFlag = true;
								$.growl.error({ 
									message : "Ref No "+ refNo + " with Ref Sl No " + newvalue.value + " Already Added !!!",
									duration : 10000,
									title : 'Error'
								});
								var id = $("#jqxgrid").jqxGrid('getrowid', row);
								$("#jqxgrid").jqxGrid('deleterow', id);
							}
						});
					}
					
					if(materialType == "F"  && refType == "MRV"  && duplicateFlag == false){	
												
						$.getJSON('/OrderExecution/api/v1/getMivDetsForMrv?mrvNo='+refNo+'&mrvSrlNo='+newvalue.value, function(data) {
							if(data.resCode == 1){
								$("#jqxgrid").jqxGrid('setcellvalue', row, "partyBillNo", data.payload.psrDetails.partyBillNo);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "partyBillDat", data.payload.psrDetails.partyBillDat);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "mivSkinPurity", data.payload.psrDetails.skinPuritys);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "skinPuritys", data.payload.psrDetails.skinPuritys);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "pcs", data.payload.psrDetails.pcs);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "grossWeight", data.payload.psrDetails.grossWeight);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight", data.payload.psrDetails.netWeight);
								
								if(data.payload.psrDetails.stoneDTO.length > 0){
									$.each(data.payload.psrDetails.stoneDTO, function(index, val) {
										$("#stonegrid").jqxGrid('addrow', null, generateMIVStonerow(newvalue.label, val));
									});
								}
								
								if(data.payload.psrDetails.accessoryDTO.length > 0){
									$.each(data.payload.psrDetails.accessoryDTO, function(index, val) {
										$("#accgrid").jqxGrid('addrow', null, generateMIVAccrow(newvalue.label, val));
									});
								}
								
							}else{
								$.growl.error({ message: data.mesgStr, duration: 10000});
								return false;
							}
							
						});
					}
				},
		        validation: function (cell, value) {
		        	if (value < 0) {
		        		return { result: false, message: "Invalid Number" };
	                }
		            return true;
	            },
				sortable : false,
				displayfield : 'refSerialNos',
				editable : true
			},
			{'text' : 'Party Bill No.',datafield : 'partyBillNo','width' : '5%',editable : false,cellsformat: 'n',cellsalign : 'center',align:'center',
				cellbeginedit : function(row){
					var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");	
	            	var metalAccLocation = $("#jqxgrid").jqxGrid('getcellvalue', row, "metalAccLocation");	
	            	if(materialType == "R" && metalAccLocation == 0){
	            		return false;
	            	}else{
	            		return true;
	            	}
				
				},
				validation: function (cell, value) {
	                if (value < 0) {
	                    return { result: false, message: "Invalid Number" };
	                }
	                return true;
	            }
			},
			{'text' : 'Party Bill Dt.',datafield : 'partyBillDat','width' : '5%',sortable : false,editable : false,columntype: 'datetimeinput',cellsalign : 'center',align:'center',cellsformat: 'dd/MM/yyyy',
				cellbeginedit : function(row){
					var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");	
	            	var metalAccLocation = $("#jqxgrid").jqxGrid('getcellvalue', row, "metalAccLocation");	
	            	
	            	// as per discussion with murty sir Valuation slip flag will be always false in DC so checking metalAccLocation with 0 - 1/10/2019
	            	if(materialType == "R" && metalAccLocation == 0){
	            		return false;
	            	}else{
	            		return true;
	            	}
				
				},
			},
			
			{text : 'Skin Purity',datafield : 'mivSkinPurity', displayfield : 'skinPuritys','width' : '5%',cellsalign : 'right',align:'center',sortable : false,editable : true,
				
				createeditor : function(row, value, editor) {
					editor.on('click', function(event){	
						
						var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");	
		            	var metalAccLocation = $("#jqxgrid").jqxGrid('getcellvalue', row, "metalAccLocation");	
						var skinrity = $('#jqxgrid').jqxGrid('getcellvalue', row, "segments");
						var skinpurityArr = [];
						var designerName = editor.val();
						if(materialType == "R"){
							if(skinrity == "Platinum"){
								skinpurityArr = ["95", "99.9"];
							}else{
								skinpurityArr = ["99.5", "99.9"];
							}
							
							editor.jqxDropDownList({ source: skinpurityArr , displayMember: 'name', valueMember: 'id'});
						}else{
							editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
						}
						
						
					});
				},
				cellbeginedit : function(row){
					var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");	
	            	var metalAccLocation = $("#jqxgrid").jqxGrid('getcellvalue', row, "metalAccLocation");
	            	console.log(metalAccLocation);
	            	console.log(typeof metalAccLocation);
	            	// as per discussion with murty sir Valuation slip flag will be always false in DC so checking metalAccLocation with 0 - 1/10/2019
	            	// as per murthy sir's mail removed location condition for RM and Platinum (10/03/2021)
					if(materialType == "R"){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
				}
			},
			{'text' : 'Pcs',datafield : 'pcs','width' : '5%',cellbeginedit: validateMIVDetails,cellsformat: 'n',columntype: 'numberinput',cellsalign : 'center',align:'center',
				initeditor: function (row, cellvalue, editor) {
					editor.on('click', function(event){	
					
						var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");	
		            	var metalAccLocation = $("#jqxgrid").jqxGrid('getcellvalue', row, "metalAccLocation");
		            	
		            	// as per discussion with murty sir Valuation slip flag will be always false in DC so checking metalAccLocation with 0 - 1/10/2019
						if(materialType == "R" &&  metalAccLocation == 0 ){
							editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
						}
						
						
					});
					editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
	            },
	            cellbeginedit : function(row){
					var materialType = $("#jqxgrid").jqxGrid('getcellvalue', row, "materialType");	
	            	var metalAccLocation = $("#jqxgrid").jqxGrid('getcellvalue', row, "metalAccLocation");	
	            	
	            	// as per discussion with murty sir Valuation slip flag will be always false in DC so checking metalAccLocation with 0 - 1/10/2019
					if(materialType == "R" &&  metalAccLocation == 0 ){
						return true;
					}else{
						return false;
					}
				},
	            validation: function (cell, value) {
	                if (value < 0) {
	                    return { result: false, message: "Invalid Number" };
	                }
	                return true;
	            },
				editable : true
			},
			{'text' : 'Gross Wt.',datafield : 'grossWeight','width' : '5%',cellbeginedit: validateMIVDetails,cellsalign : 'right',align:'center',cellsformat: 'd3',columntype: 'numberinput',
				initeditor: function (row, cellvalue, editor) {
					editor.jqxNumberInput({ decimalDigits:3, min: 0.000 });
	            },
		        validation: function (cell, value) {
		        	if (value < 0) {
		        		return { result: false, message: "Invalid Number" };
	                }
		            return true;
	            },
		        cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
		        	var materialType = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'materialType');
		            if(null != materialType.value &&  "" != materialType.value && "R" == materialType.value){
		            	$("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight", newvalue);
	            	}
	            },
				sortable : false,
				editable : true
			},
			{'text' : 'Net Wt.',datafield : 'netWeight','width' : '5%',cellbeginedit: validateMIVDetails,cellsalign : 'right',align:'center',	cellsformat: 'd3',columntype: 'numberinput',
				initeditor: function (row, cellvalue, editor) {
					editor.jqxNumberInput({ decimalDigits:3, min: 0.000 });
	            },
		        validation: function (cell, value) {
		        if (value < 0) {
		        	return { result: false, message: "Invalid Number" };
	            }
		        return true;
		        },
				sortable : false,
				editable : true
			},
			{'text' : 'Remarks',datafield : 'remarks','width' : '5%',sortable : false,cellsalign : 'left',align:'center',editable : true},
			{text : 'Action',datafield :null,cellsalign : 'center',align:'center' ,
				cellsrenderer: function (row, column, value) {
					return '<button id="addSA" class="btn btn-sm btn-primary" type="button" onclick="addMIVStoneOrAccDetails('+ row +')"><i class="fa fa-plus-circle fa-lg"></i></button>';
				},
   				editable : false,
	   			sortable : false,
	   			'width' : '5%'
   			},
			{text : '',	menu : false, hidden:true, sortable : false,datafield : 'selectionStatus',columntype : 'checkbox',cellsalign : 'center',align:'center',width : '5%',
   				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue) {
						$("#jqxgrid").jqxGrid('selectrow', row);
					} else {
						$("#jqxgrid").jqxGrid('unselectrow', row);
					}
				},
				renderer : function() {
					return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
				}

			},
   			{ text : '',datafield : 'delete','width' : '5%',columntype : 'button',cellsalign : 'center',align:'center',
   				cellsrenderer : function() {
   					return "Delete";
   				},
   				buttonclick : function(row) {
   					var masterRows = $("#jqxgrid").jqxGrid('getrows');
   					var rowsStone = $("#stonegrid").jqxGrid('getrows');
   					var rowsAcc = $("#accgrid").jqxGrid('getrows');
   					
   					var newArrayStone = [];
   					var newArrayAcc = [];
   					
   					
					if(typeof rowsStone != "undefined"){
						for(var k=0; k<rowsStone.length; k++){
							if(masterRows[row].mivSrialNo ==  rowsStone[k].mivSlNo){
								var idVal = $("#stonegrid").jqxGrid('getrowid', k);
								newArrayStone.push(idVal);						
							}
						}	
					}
					
				
					if(typeof rowsAcc != "undefined"){
						for(var n=0; n<rowsAcc.length; n++){
							if(masterRows[row].mivSrialNo ==  rowsAcc[n].mivSlNo){
								var idValAcc = $("#accgrid").jqxGrid('getrowid', n);
								newArrayAcc.push(idValAcc);						
							}
						}
					}
					
					//return false;
   					if(typeof rowsStone != "undefined"){
   						$("#stonegrid").jqxGrid('deleterow', newArrayStone);
   					}
   					
   					if(typeof rowsAcc != "undefined"){
   						$("#accgrid").jqxGrid('deleterow', newArrayAcc);
   					}
   					
   					var getmivSrialNo = $("#jqxgrid").jqxGrid('getcellvalue', row, "mivSrialNo");	   					
   					if(typeof rowsStone != "undefined"){
						for (var k = 0; k < rowsStone.length; k++) {
							var serialNos = parseInt(rowsStone[k].mivSlNo);
							
							if(serialNos > getmivSrialNo){
									$("#stonegrid").jqxGrid("setcellvalue", k,"mivSlNo", serialNos-1);
							}
						}
   					}
   					
   					if(typeof rowsAcc != "undefined"){
						for (var k = 0; k < rowsAcc.length; k++) {
							var serialNos = parseInt(rowsAcc[k].mivSlNo);
							
							if(serialNos > getmivSrialNo){
									$("#accgrid").jqxGrid("setcellvalue", k,"mivSlNo", serialNos-1);
							}
						}
   					}
   					
   					var id = $("#jqxgrid").jqxGrid('getrowid', row);
   					$("#jqxgrid").jqxGrid('deleterow', id);
   					
   					for (var j = 0; j < masterRows.length; j++) {
   						$("#jqxgrid").jqxGrid("setcellvalue", j,"mivSrialNo", j + 1);
   					}
   					
	   				
   					
   				}
   		    },
		];	   		
	
		addGrid(datafields, columns, updateRows, data, addrow, "#jqxgrid");
	}
	var mainCatArry,colorArr, clarityArr, actualColorArr, cutGradeArr, wtRangeArr, costRangeArr;
	function mivStoneGrid()
	{
	
		var updateRows = function(rowid, newdata, commit) {		
		}
		
		var addrow =  function (rowid, rowdata, position, commit) {
	        commit(true);
		}
	
		var stoneConditionTypeSource = {
				datatype : 'json',
				datafields : [
					{name : 'id',type : 'string'}, 
					{name : 'name',	type : 'string'} 
				],
				localdata : stoneConditionType
			};
	
		var stoneConditionTypeDataAdapter = new $.jqx.dataAdapter(stoneConditionTypeSource, {
			autoBind : true
		});	
		
		var stoneLocSource = {
				datatype : 'json',
				datafields : [ 
				{name : 'id',type : 'string'}, 
				{name : 'name',	type : 'string'} 
			],
			localdata : stoneLocation
		};
	
		var stoneLocDataAdapter = new $.jqx.dataAdapter(stoneLocSource, {
			autoBind : true
		});
		
		
		
	
		
		var datafields = [ 
		{'name' : 'slNo','type' : 'long'}, 
		{'name' : 'mivSlNo','type' : 'long'},
		{name : 'stoneLoc',type : 'string'},
		{name : 'stoneLocTypes',value : 'stoneLoc',
			values : {
				source : stoneLocDataAdapter.records,
				value : 'id',
				name : 'name'
			}
		},
		
		{'name':'suppliedBy','type':'string'},
		
		{'name' : 'materialType','type' : 'string'},
		{'name' : 'stoneTypes','type' : 'string'},
		
		{'name' : 'stoneCode','type' : 'string'}, 
		{'name' : 'subCategory','type' : 'string'},
		{'name' : 'shape','type' : 'string'},
		{'name' : 'segment','type' : 'string'},

		{'name' : 'mainCat','type' : 'string'},
		{'name' : 'uom','type' : 'string'}, 		
		{'name' : 'wtRange','type' : 'string'},		
		{'name' : 'packId','type' : 'long'},
		{'name' : 'costRange','type' : 'string'},
		{'name' : 'clarity','type' : 'string'}, 
		{'name' : 'color','type' : 'string'}, 
		{'name' : 'actualColor','type' : 'string'}, 
		{'name' : 'cutGrade','type' : 'string'}, 
		{'name' : 'stnWt','type' : 'string'}, 
		{'name' : 'stnPcs','type' : 'string'}, 
		{'name' : 'subCatDesc','type' : 'string'}, 
		
		{'name' : 'vendorIssuedStonePcs','type' : 'long'}, 
		{'name' : 'vendorIssuedStoneWt','type' : 'double'}, 
		{'name' : 'vendorLooseStone','type' : 'double'}, 
		{'name' : 'customerIssuedStonePcs','type' : 'long'}, 
		{'name' : 'customerIssuedStoneWt','type' : 'double'}, 
		{'name' : 'customerLooseStone','type' : 'double'}, 
		{'name' : 'companyIssuedStonePcs','type' : 'long'}, 
		{'name' : 'companyIssuedStoneWt','type' : 'double'}, 
		{'name' : 'companyLooseStone','type' : 'double'},
		{'name' : 'stoneCondition','type' : 'string'},{
			name : 'stoneConditions',
			value : 'stoneCondition',
			values : {
				source : stoneConditionTypeDataAdapter.records,
				value : 'id',
				name : 'name'
			}
		},	
		{'name' : 'compSetPieces','type' : 'long'}, 
		{'name' : 'compSetWeight','type' : 'double'}, 
		{'name' : 'custSetPieces','type' : 'long'}, 
		{'name' : 'custSetWeight','type' : 'double'}, 
		{'name' : 'vendorSetPieces','type' : 'long'}, 
		{'name' : 'vendorSetWeight','type' : 'double'}, 
		{'name' : 'selectionStatus','type' : 'bool'}
		];
	
		var columns = [
		{'text' : 'GIV Sl. No.',datafield : 'mivSlNo',columngroup: 'mi','width' : '3%',cellsalign : 'center',align:'center',editable : false},
		
		{'text' : 'Stn Sl. No.',datafield : 'slNo',columngroup: 'mi','width' : '3%',cellsalign : 'center',align:'center',editable : false},	
		{'text' : 'materialType', hidden: true, datafield : 'materialType',columngroup: 'mi','width' : '4%',cellsalign : 'center',align:'center',editable : false},	
		{'text' : 'stoneTypes', hidden: true, datafield : 'stoneTypes',columngroup: 'mi','width' : '4%',cellsalign : 'center',align:'center',editable : false},	
		{'text' : 'Seg',datafield : 'segment',columngroup: 'mi','width' : '3%',sortable : false, editable : true,cellsalign : 'center',align:'center', displayfield : 'segments',
			createeditor : function(row, value, editor) {
				editor.on('click', function(event){	
					var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
					var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  					
					
					if(materialType == "S" && stoneType == "Bulk"){
						$.getJSON('/OrderExecution/api/v1/stoneMUPLOV', function(data) {
							if(data.resCode == 1){
								editor.jqxDropDownList({ source: data.payload.stoneSeg , displayMember: 'description', valueMember: 'id'});
							}
						});
					}
				});
			},
			cellbeginedit : function(row){
				var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
				if(materialType == "S" && stoneType == "Bulk"){
					this.columntype = 'dropdownlist';
					return true;
				}else{
					return false;
				}
			},
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'segment',  newvalue.value);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'segments', newvalue.label);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'mainCat',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'mainCatN', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCategory',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCategorys', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'color',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'colors', null);
				
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'actualColor',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'actualColN', null);


				$('#stonegrid').jqxGrid ('setcellvalue', row, 'clarity',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'claritys', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrade',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrades', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneCode',  null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'uom',  null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'wtRange',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'wtRange', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'costRange',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'costRanges', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCatDesc',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneLoc', null);
			}
		},
		{'text' : 'Cat',datafield : 'mainCat', columngroup: 'mi',width : '3%',editable : true,cellsalign : 'center',align:'center', displayfield : 'mainCatN',
			createeditor : function(row, cellvalue, editor) {
				editor.on('click', function(event){	
					var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
					var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  					
					var segment =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segment');  
					
					if(materialType == "S" && stoneType == "Bulk"){
						$.getJSON('/OrderExecution/api/v1/getStoneCategoryByStone?segmentId=' + segment, function(data) {
							if(data.resCode == 1){
								mainCatArry = data.payload.stoneCats;
								editor.jqxDropDownList({ source: mainCatArry, displayMember: 'description', valueMember: 'id'});
							}
						});
					}
				});
			},
			cellbeginedit : function(row){
				var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
				if(materialType == "S" && stoneType == "Bulk"){
					this.columntype = 'dropdownlist';
					return true;
				}else{
					return false;
				}
			},
			cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue) {					
				var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes'); 
				var catCodeV;
				if(materialType == "S" && stoneType == "Bulk"){
					$.each(mainCatArry,function(k,v){
						if(v.id == newvalue.value){
							catCodeV = v.name;
						}
					});
					
					if(catCodeV == "CM" || catCodeV == "CP" || catCodeV == "CS"){
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'mainCatN',  null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'mainCat', null);
						$.growl.error({
							message : "Color Diamonds Cannot be Issued as Bulk !!!",
							duration : 1000,
							title : 'Error'
						});
						return "";
					}
				}
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCategory',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCategorys', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'color',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'colors', null);
				
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'actualColor',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'actualColN', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'clarity',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'claritys', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrade',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrades', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneCode',  null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'uom',  null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'wtRange',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'wtRange', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'costRange',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'costRanges', null);

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCatDesc',  null);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneLoc', null);
				
				$("#stonegrid").jqxGrid('setcellvalue', row, 'mainCat',newvalue.value);
				$("#stonegrid").jqxGrid('setcellvalue', row, 'mainCatN',newvalue.label);
			}
		},		
		{'text' : 'Sub Cat/Shape', datafield : 'subCategory', displayfield : 'subCategorys',columngroup: 'mi','width' : '5%',cellsalign : 'center',align:'center',sortable : false,editable : true,
			createeditor : function(row, value, editor) {
				editor.on('click', function(event){	
					var apiName, dropDownArrayList;
					var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
					var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  					
					var segments =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segments');  
					var category =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCat');  
					var categoryN =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN');  
					if(materialType == "S" && stoneType == "Bulk"){
						if(segments == "Diamond"){
							apiName = '/OrderExecution/api/v1/getLOVByCategory?categoryId=' + category;
						}else{
							apiName = '/OrderExecution/api/v1/getLOVByCategory?categoryId=' + category;
						}
						$.getJSON(apiName, function(data) {
							if(data.resCode == 1){
								if(segments == "Diamond"){
									dropDownArrayList = data.payload.shape;
									colorArr = data.payload.color;
									clarityArr = data.payload.clarity;
									actualColorArr = data.payload.actualColor;
									cutGradeArr = data.payload.cutGrade;
								}else{
									dropDownArrayList = data.payload.subcat;
								}
								editor.jqxDropDownList({ source: dropDownArrayList , displayMember: 'description', valueMember: 'id'});
							}
						});
					}
				});
			},
			cellbeginedit : function(row){
				var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
				if(materialType == "S" && stoneType == "Bulk"){
					this.columntype = 'dropdownlist';
					return true;
				}else{
					return false;
				}
			},
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
			
				
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCategory',  newvalue.value);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCategorys', newvalue.label);
				
				var segment =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segment');  
				var category =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCat');  
				var subCatId = newvalue.value;
				var fieldFilter = {"segmentId" : segment, "categoryId" : category, "subCatShapeId" :  subCatId};
				postJSON('/OrderExecution/api/v1/getStoneCodeUom', JSON.stringify(fieldFilter), function(data) {
					if(data.resCode == 1){
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneCode',  data.payload.stoneCode);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'uom', data.payload.uom);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneLoc', data.payload.stoneLocation);
					}else{
						$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Warning' });
					}
				});
			} 
		},		
		{'text' : 'Color',datafield : 'color',columngroup: 'mi','width' : '4%',sortable : false,editable : true,cellsalign : 'center',align:'center',displayfield : 'colors',
			createeditor : function(row, value, editor) {
				editor.on('click', function(event){	
					editor.jqxDropDownList({ source: colorArr , displayMember: 'id', valueMember: 'id'});
				});
			},
			cellbeginedit : function(row){
				var materialType = $('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
				var segment = $('#stonegrid').jqxGrid ('getcellvalue', row, 'segments');
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
				if(segment != "Diamond"){
					return false;
				}else{
					if(materialType == "S" && stoneType == "Bulk"){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
				}
			},
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'color',  newvalue.value);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'colors', newvalue.label);
			}
		},
		{'text' : 'Actual Color',datafield : 'actualColor',columngroup: 'mi','width' : '4%',sortable : false,cellsalign : 'center',align:'center',editable : true,displayfield : 'actualColN',
			createeditor : function(row, value, editor) {
				editor.on('click', function(event){	
					editor.jqxDropDownList({ source: actualColorArr , displayMember: 'id', valueMember: 'id'});
				});
			},
			cellbeginedit : function(row){
				var materialType = $('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
				var segment = $('#stonegrid').jqxGrid ('getcellvalue', row, 'segments');
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes'); 
				var mainCat =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN'); 
				var catCode ;
					$.each(mainCatArry,function(k,v){
						if(mainCat == v.description){
							catCode = v.name;
						}
					});
				if(segment != "Diamond"){
					return false;
				}else{
					if(materialType == "S" && stoneType == "Bulk" && catCode == "CM" || catCode == "CP" || catCode == "CS"){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
				}
			},
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'actualColor',  newvalue.value);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'actualColN', newvalue.label);
			}
		},
		{'text' : 'Clarity',datafield : 'clarity',columngroup: 'mi','width' : '4%',sortable : false,editable : true,cellsalign : 'center',align:'center',displayfield : 'claritys',
			createeditor : function(row, value, editor) {
				editor.on('click', function(event){	
					editor.jqxDropDownList({ source: clarityArr , displayMember: 'id', valueMember: 'id'});
				});
			},
			cellbeginedit : function(row){
				var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
				var segment = $('#stonegrid').jqxGrid ('getcellvalue', row, 'segments');
				if(segment != "Diamond"){
					return false;
				}else{
					if(materialType == "S" && stoneType == "Bulk"){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
				}
			},
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {			
				
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'clarity',  newvalue.value);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'claritys', newvalue.label);
			}
		},
		{'text' : 'Cut Grade',datafield : 'cutGrade',columngroup: 'mi','width' : '4%',sortable : false,editable : true,cellsalign : 'center',align:'center',displayfield : 'cutGrades',
			createeditor : function(row, value, editor) {
				editor.on('click', function(event){	
					editor.jqxDropDownList({ source: cutGradeArr , displayMember: 'id', valueMember: 'id'});
				});
			},
			cellbeginedit : function(row){
				var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
				var segment = $('#stonegrid').jqxGrid ('getcellvalue', row, 'segments');
				if(segment != "Diamond"){
					return false;
				}else{
					if(materialType == "S" && stoneType == "Bulk"){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
				}
			},
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {				

				$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrade',  newvalue.value);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrades', newvalue.label);
			}
		},
		{'text' : 'Stn Code',	datafield : 'stoneCode',columngroup: 'mi','width' : '4%', sortable : false,cellsalign : 'center',align:'center',editable : false},
		{'text' : 'UQC',datafield : 'uom',columngroup: 'mi','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center'},		
		{'text' : 'Wt Range',datafield : 'wtRange',columngroup: 'mi','width' : '4%',sortable : false,editable : true,displayfield : 'wtRange',cellsalign : 'right',align:'center',
			createeditor : function(row, value, editor) {
				editor.on('click', function(event){	
					var color =  $('#stonegrid').jqxGrid('getcellvalue', row, 'color');  
					var clarity =  $('#stonegrid').jqxGrid('getcellvalue', row, 'clarity'); 
					var cutGrade =  $('#stonegrid').jqxGrid('getcellvalue', row, 'cutGrade'); 
					var stoneCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneCode'); 
					var segment =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segments'); 
					var mainCatN =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN'); 
					if(segment == "Diamond"){
						var fieldFilter = {"color" : color, "clarity" : clarity, "cutGrade" :  cutGrade, "stoneCode" : stoneCode};
						postJSON('/OrderExecution/api/v1/wtCostRangesForMivSt', JSON.stringify(fieldFilter), function(data) {
							if(data.resCode == 1){
								wtRangeArr = data.payload.weightRangeList;
							}else{
								$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Warning' });
							}
						});
					}
					editor.jqxDropDownList({ source: wtRangeArr , displayMember: 'name', valueMember: 'value'});
				});
			},
			cellbeginedit : function(row){
				var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
				var segment =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segments'); 
				var mainCatN =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN'); 
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
				
				if(materialType == "S" && stoneType == "Bulk"){
					if(segment == "Diamond"){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
				}else{
					return false;
				}
			},
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				var segment =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segments'); 
				var mainCatN =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN'); 
				var subCategorys =  $('#stonegrid').jqxGrid('getcellvalue', row, 'subCategorys'); 
				var colors =  $('#stonegrid').jqxGrid('getcellvalue', row, 'colors'); 
				var claritys =  $('#stonegrid').jqxGrid('getcellvalue', row, 'claritys'); 
				var cutGrades =  $('#stonegrid').jqxGrid('getcellvalue', row, 'cutGrades'); 
				
				if(colors == null || colors == ""){
					colors = "";
				}
				if(claritys == null || claritys == ""){
					claritys = "";
				}
				if(cutGrades == null || cutGrades == ""){
					cutGrades = "";
				}
				
				var subCatDesc = segment + " " + mainCatN + " " + subCategorys + " " +colors + " " +claritys + " " +cutGrades + " " +newvalue.label;
				
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'wtRange',  newvalue.value);
				
				var wtRangeValC ;
				$.each(wtRangeArr,function(k,v){
					if(newvalue == v.name){
						wtRangeValC = v.value;
					}
				});
				
				if(segment == "Diamond" && mainCatN == "Melees" || mainCatN == "Pointers" || mainCatN == "Solitaire"){
					$('#stonegrid').jqxGrid ('setcellvalue', row, 'packId',wtRangeValC);
				}
				
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'wtRanges', newvalue.label); 
				if(segment == "Diamond"){
					$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCatDesc', subCatDesc); 
				}else{
					$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCatDesc', subCategorys);
				}
			}
		},
		{'text' : 'Cost Range',datafield : 'costRange',columngroup: 'mi','width' : '3%',sortable : false,editable : true,cellsalign : 'right',align:'center', displayfield : 'costRanges',
			createeditor : function(row, value, editor) {
				editor.on('click', function(event){	
					var color =  $('#stonegrid').jqxGrid('getcellvalue', row, 'color');  
					var clarity =  $('#stonegrid').jqxGrid('getcellvalue', row, 'clarity'); 
					var cutGrade =  $('#stonegrid').jqxGrid('getcellvalue', row, 'cutGrade'); 
					var stoneCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneCode'); 
					
					var segment =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segments'); 
					var mainCatN =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN'); 
					
					if((segment == "Diamond" &&  (mainCatN == "CD Melees" || mainCatN == "CD Pointers" || mainCatN == "CD Solitaire")) || segment == "Other Stones" || segment == "Precious Stones"){
						var fieldFilter = {"color" : color, "clarity" : clarity, "cutGrade" :  cutGrade, "stoneCode" : stoneCode};
						postJSON('/OrderExecution/api/v1/wtCostRangesForMivSt', JSON.stringify(fieldFilter), function(data) {
							if(data.resCode == 1){
								costRangeArr = data.payload.CostRangeList;
							}else{
								$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Warning' });
							}
						});
					}
					editor.jqxDropDownList({ source: costRangeArr , displayMember: 'name', valueMember: 'value'});
				});
			},
			cellbeginedit : function(row){
				var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
				var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
				var segment =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segments'); 
				var mainCatN =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN'); 
				
				if(materialType == "S" && stoneType == "Bulk"){
					if((segment == "Diamond" &&  (mainCatN == "CD Melees" || mainCatN == "CD Pointers" || mainCatN == "CD Solitaire")) || segment == "Other Stones" || segment == "Precious Stones"){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
				}else{
					return false;
				}
			},
			
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				var segment =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segments'); 
				var mainCatN =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN'); 
				
				var subCategorys =  $('#stonegrid').jqxGrid('getcellvalue', row, 'subCategorys'); 
				var colors =  $('#stonegrid').jqxGrid('getcellvalue', row, 'colors'); 
				var claritys =  $('#stonegrid').jqxGrid('getcellvalue', row, 'claritys'); 
				var cutGrades =  $('#stonegrid').jqxGrid('getcellvalue', row, 'cutGrades'); 
				
				if(colors == null || colors == ""){
					colors = "";
				}
				if(claritys == null || claritys == ""){
					claritys = "";
				}
				if(cutGrades == null || cutGrades == ""){
					cutGrades = "";
				}
				var subCatDesc = segment + " " + mainCatN + " " + subCategorys + " " +colors + " " +claritys + " " +cutGrades + " " +newvalue.label;
				
						
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'costRange',  newvalue.value);
				if((segment == "Diamond" &&  (mainCatN == "CD Melees" || mainCatN == "CD Pointers" || mainCatN == "CD Solitaire")) || segment == "Other Stones" || segment == "Precious Stones"){
					$('#stonegrid').jqxGrid ('setcellvalue', row, 'packId',  newvalue.value);		
				}
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'costRanges', newvalue.label);
				$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCatDesc', subCatDesc);
			}
		},
		{'text' : 'Packet Id',datafield : 'packId',columngroup: 'mi','width' : '3%',sortable : false,cellsalign : 'center',align:'center',editable : false},
		{'text' : 'Sub Cat Desc',datafield : 'subCatDesc',columngroup: 'mi','width' : '6%',cellsalign : 'left',align:'center',sortable : false,editable : false},		
		{text : 'Stn Loc.',datafield : 'stoneLoc',columngroup: 'mi', editable : false,sortable : false,cellsalign : 'center',align:'center','width' : '4%'},		
		{'text' : 'Issued Stn Pcs',datafield : 'vendorIssuedStonePcs',columngroup: 'vendor','width' : '4%',	sortable : false,editable : false,cellsformat: 'n',columntype: 'numberinput',	      
			initeditor: function (row, cellvalue, editor) {
                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
            },
            validation: function (cell, value) {
                if (value < 0) {
                    return { result: false, message: "Invalid Number" };
                }
                return true;
            },
            cellbeginedit : function(row){
				var matType = $('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
				var type =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
				if(matType == "S" && type == "PSR"){
					return false;
				}else{
					return true;
				}
			}
		},
		{'text' : 'Issued Stn Wt',datafield : 'vendorIssuedStoneWt',columngroup: 'vendor','width' : '4%',sortable : false,cellsalign : 'right',align:'center',editable : false,cellsformat: 'd3',columntype: 'numberinput',	      
			initeditor: function (row, cellvalue, editor) {
                editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
            },
            validation: function (cell, value) {
                if (value < 0) {
                    return { result: false, message: "Invalid Number" };
                }
                return true;
            }, cellbeginedit : function(row){
				var matType = $('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
				var type =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
				if(matType == "S" && type == "PSR"){
					return false;
				}else{
					return true;
				}
			}
		},
		{'text' : 'Set/Loose Stn',datafield : 'vendorLooseStone',	columngroup: 'vendor','width' : '4%',	sortable : false,cellsalign : 'center',align:'center',editable : false,cellsformat: 'd3',columntype: 'numberinput',	      
			initeditor: function (row, cellvalue, editor) {
                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
            },
            validation: function (cell, value) {
                if (value < 0) {
                    return { result: false, message: "Invalid Number" };
                }
                return true;
            }
		},
		{'text' : 'Issued Stn Pcs',datafield : 'companyIssuedStonePcs',columngroup: 'IssueStone','width' : '4%',sortable : false,cellsalign : 'center',align:'center',editable : true,cellsformat: 'n',columntype: 'numberinput',	      
				initeditor: function (row, cellvalue, editor) {
	                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
	            },
	            validation: function (cell, value) {
	                if (value < 0) {
	                    return { result: false, message: "Invalid Number" };
	                }
	                return true;
	            },
	            cellbeginedit : function(row){
	            	var supplied = $('#stonegrid').jqxGrid ('getcellvalue', row, 'suppliedBy');
					var matType = $('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
					var type =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');
					
					if( matType == "S" && type == "P"){
						return false;
					}else{
						return true;
					}
				}
			},
			{'text' : 'Issued Stn Wt',datafield : 'companyIssuedStoneWt',	columngroup: 'IssueStone','width' : '4%',cellsalign : 'right',align:'center',sortable : false,editable : true,cellsformat: 'd3',columntype: 'numberinput',	      
				initeditor: function (row, cellvalue, editor) {
	                editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
	            },
	            validation: function (cell, value) {
	                if (value < 0) {
	                    return { result: false, message: "Invalid Number" };
	                }
	                return true;
	            },
	            cellbeginedit : function(row){
	            	var supplied = $('#stonegrid').jqxGrid ('getcellvalue', row, 'suppliedBy');
					var matType = $('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
					var type =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
					
					if(matType == "S" && type == "P") {
						return false;
					}else{
						return true;
					}
				}
			},
			{'text' : 'Set/Loose Stn',datafield : 'companyLooseStone',columngroup: 'IssueStone','width' : '4%',cellsalign : 'center',align:'center',sortable : false,editable : false,cellbeginedit: checkForBulk,cellsformat: 'd3',columntype: 'numberinput',	      
				initeditor: function (row, cellvalue, editor) {
	                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
	            },
	            validation: function (cell, value) {
	                if (value < 0) {
	                    return { result: false, message: "Invalid Number" };
	                }
	                return true;
	            }
			},
			{'text' : 'Issued Stn Pcs',datafield : 'customerIssuedStonePcs',columngroup: 'customer','width' : '4%',cellsalign : 'center',align:'center',sortable : false,editable : false,cellsformat: 'n',columntype: 'numberinput',
				initeditor: function (row, cellvalue, editor) {
					editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
		        },
			    validation: function (cell, value) {
			    	if (value < 0) {
			    		return { result: false, message: "Invalid Number" };
		            }
			        return true;
		        },
		        cellbeginedit : function(row){
					var matType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
					var type =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
					if(matType == "S" && type == "PSR"){
						return false;
					}else{
						return true;
					}
				}
			},
			{'text' : 'Issued Stn Wt',datafield : 'customerIssuedStoneWt',columngroup: 'customer','width' : '4%',cellsalign : 'right',align:'center',sortable : false,editable : false,	cellsformat: 'd3',columntype: 'numberinput',	      
				initeditor: function (row, cellvalue, editor) {
	                editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
	            },
	            validation: function (cell, value) {
	                if (value < 0) {
	                    return { result: false, message: "Invalid Number" };
	                }
	                return true;
	            },
	            cellbeginedit : function(row){
					var matType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
					var type =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
					if(matType == "S" && type == "PSR"){
						return false;
					}else{
						return true;
					}
				}
			},
			{'text' : 'Set/Loose Stn',datafield : 'customerLooseStone',columngroup: 'customer','width' : '4%',cellsalign : 'center',align:'center',sortable : false,	editable : false,cellsformat: 'd3',columntype: 'numberinput',	      
				initeditor: function (row, cellvalue, editor) {
	                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
	            },
	            validation: function (cell, value) {
	                if (value < 0) {
	                    return { result: false, message: "Invalid Number" };
	                }
	                return true;
	            }
			},
			{text : 'Stn Cond',datafield : 'stoneCondition',columntype : 'combobox',displayfield : 'stoneConditions',cellsalign : 'center',align:'center',cellbeginedit: checkCustomerStone,editable : false,	sortable : false,columngroup: 'customer','width' : '8%',
				initeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : stoneConditionTypeDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				}
			},
			
			{'text' : '',datafield : 'compSetWeight','width' : '3%',editable : false,cellsformat : 'd3',hidden : true},
			{'text' : '',datafield : 'compSetPieces','width' : '3%',editable : false,hidden : true},
			{'text' : '',datafield : 'custSetWeight','width' : '3%',editable : false,cellsformat : 'd3',hidden : true},
			{'text' : '',datafield : 'custSetPieces','width' : '3%',editable : false,hidden : true},
			{'text' : '',datafield : 'vendorSetWeight','width' : '3%',editable : false,cellsformat : 'd3',hidden : true},
			{'text' : '',datafield : 'vendorSetPieces','width' : '3%',editable : false,hidden : true},
			
			{text : '',	menu : false,sortable : false,datafield : 'selectionStatus',columntype : 'checkbox',width : '4%', hidden: true,
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue) {
						$("#jqxgrid").jqxGrid('selectrow', row);
					} else {
						$("#jqxgrid").jqxGrid('unselectrow', row);
					}
				},
				renderer : function() {
					return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
				}
			}];
		
		$("#stonegrid").jqxGrid({
			'columngroups' : [		
				{ text: 'Vendor', name: 'vendor',align:'center' },
				{ text: '', name: 'mi' },
		        { text: 'Company', name: 'IssueStone',align:'center' },
		        { text: 'Customer', name: 'customer' ,align:'center'}
	        ]
		});
			
		addGrid(datafields, columns, updateRows, data, addrow, "#stonegrid");	
	}

	function mivAccGrid()
	{
		var updateRows = function(rowid, newdata, commit) {		
		}
		
		var addrow =  function (rowid, rowdata, position, commit) {
	        commit(true);
		}
	
		var datafields = [ 
			{'name' : 'slNo','type' : 'long'}, 
			{'name' : 'mivSlNo','type' : 'long'}, 
			{'name' : 'location','type' : 'string'}, 
			{'name' : 'articleCode','type' : 'string'}, 
			{'name' : 'subCategory','type' : 'string'}, 
			{'name' : 'uom','type' : 'string'}, 
			{'name' : 'vendorIssuedAccPcs','type' : 'long'}, 
			{'name' : 'vendorIssuedAccWt','type' : 'double'}, 
			{'name' : 'vendorLooseAcc','type' : 'double'}, 
			{'name' : 'customerIssuedAccPcs','type' : 'long'}, 
			{'name' : 'customerIssuedAccWt','type' : 'double'}, 
			{'name' : 'customerLooseAcc','type' : 'double'}, 
			{'name' : 'companyIssuedAccPcs','type' : 'long'}, 
			{'name' : 'companyIssuedAccWt','type' : 'double'}, 
			{'name' : 'companyLooseAcc','type' : 'double'}, 
			{'name' : 'accountCondition','type' : 'string'}, 
			
			{'name':'suppliedBy','type':'string'},
			{'name' : 'compSetPieces','type' : 'long'}, 
			{'name' : 'compSetWeight','type' : 'double'}, 
			{'name' : 'custSetPieces','type' : 'long'}, 
			{'name' : 'custSetWeight','type' : 'double'}, 
			{'name' : 'vendorSetPieces','type' : 'long'}, 
			{'name' : 'vendorSetWeight','type' : 'double'},
			{'name' : 'selectionStatus','type' : 'bool'},
			
			{'name' : 'materialType','type' : 'string'},
			{'name' : 'stoneTypes','type' : 'string'},
		];
	
		var columns = [
			{'text' : 'GIV Sl. No.',datafield : 'mivSlNo',columngroup: 'mi','width' : '6%',cellsalign : 'center',align:'center',editable : false},
			{'text' : 'Acc Sl. No.',datafield : 'slNo',columngroup: 'mi','width' : '6%',cellsalign : 'center',align:'center',editable : false},
			{'text' : 'Article Code',datafield : 'articleCode',	columngroup: 'mi','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'Sub Category',datafield : 'subCategory',columngroup: 'mi','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'UQC',datafield : 'uom',columngroup: 'mi','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'Issued Acc Pcs',	datafield : 'vendorIssuedAccPcs',columngroup: 'vendor','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'Issued Acc Wt',datafield : 'vendorIssuedAccWt',columngroup: 'vendor','width' : '6%',cellsalign : 'right',align:'center',sortable : false,editable : false,cellsformat :'d3'},
			{'text' : 'Set Acc / Loose Acc',datafield : 'vendorLooseAcc',columngroup: 'vendor','width' : '10%',cellsalign : 'center',align:'center',editable : false,cellsformat :'d3'},
			{'text' : 'Issued Acc Pcs',datafield : 'companyIssuedAccPcs',columngroup: 'IssueStone','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'Issued Acc Wt',datafield : 'companyIssuedAccWt',columngroup: 'IssueStone','width' : '6%',cellsalign : 'right',align:'center',sortable : false,editable : false,cellsformat :'d3'},
			{'text' : 'Set Acc / Loose Acc',datafield : 'companyLooseAcc',columngroup: 'IssueStone','width' : '10%',cellsalign : 'center',align:'center',editable : false,cellsformat :'d3'},
			{'text' : 'Issued Acc Pcs',datafield : 'customerIssuedAccPcs',columngroup: 'customer','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'Issued Acc Wt',datafield : 'customerIssuedAccWt',columngroup: 'customer','width' : '6%',cellsalign : 'right',align:'center',sortable : false,editable : false,cellsformat :'d3'},
			{'text' : 'Set Acc / Loose Acc',datafield : 'customerLooseAcc',columngroup: 'customer','width' : '8%',cellsalign : 'center',align:'center',sortable : false,editable : false,cellsformat :'d3'},
			{'text' : 'Acc Condition',datafield : 'accountCondition',columngroup: 'customer','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			
			{'text' : '',datafield : 'compSetWeight','width' : '3%',editable : false,cellsformat : 'd3',hidden : true},
			{'text' : '',datafield : 'compSetPieces','width' : '3%',editable : false,hidden : true},
			{'text' : '',datafield : 'custSetWeight','width' : '3%',editable : false,cellsformat : 'd3',hidden : true},
			{'text' : '',datafield : 'custSetPieces','width' : '3%',editable : false,hidden : true},
			{'text' : '',datafield : 'vendorSetWeight','width' : '3%',editable : false,cellsformat : 'd3',hidden : true},
			{'text' : '',datafield : 'vendorSetPieces','width' : '3%',editable : false,hidden : true},
			
			{text : '',menu : false,sortable : false,datafield : 'selectionStatus',columntype : 'checkbox',cellsalign : 'center',align:'center',width : '6%', hidden: true,
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
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
		
		$("#accgrid").jqxGrid({
			'columngroups' : [
				{ text: 'Vendor', name: 'vendor',align:'center' },
		        { text: '', name: 'mi' },
		        { text: 'Company', name: 'IssueStone',align:'center' },
		        { text: 'Customer', name: 'customer' ,align:'center'}
	        ]
		});
	
		addGrid(datafields, columns, updateRows, data, addrow, "#accgrid");
	
	}

	var generateMIVAccrow = function (psr, accData,mType,sType) {
	    var row = {};
	
	    row["mivSlNo"] = accData.mivSlNo;
	    row["slNo"] = accData.slNo;
	    row["location"] = accData.location;
	    row["articleCode"] = accData.articleCode;
	    row["subCategory"] = accData.subCategory;
	    row["uom"] = accData.uom;
	    row["vendorIssuedAccPcs"] = accData.vendorIssuedAccPcs;
	    row["vendorIssuedAccWt"] = accData.vendorIssuedAccWt;
	    row["vendorLooseAcc"] = accData.vendorLooseAcc;
	    row["customerIssuedAccPcs"] = accData.customerIssuedAccPcs;
	    row["customerIssuedAccWt"] = accData.customerIssuedAccWt;
	    row["customerLooseAcc"] = accData.customerLooseAcc;
	    row["companyIssuedAccPcs"] = accData.companyIssuedAccPcs;
	    row["companyIssuedAccWt"] = accData.companyIssuedAccWt;
	    row["companyLooseAcc"] = accData.companyLooseAcc;
	    row["accountCondition"] = accData.accountCondition;
	    
	    row["compSetWeight"] = accData.compSetWeight;
	    row["compSetPieces"] = accData.compSetPieces;
	    row["custSetWeight"] = accData.custSetWeight;
	    row["custSetPieces"] = accData.custSetPieces;
	    row["vendorSetWeight"] = accData.vendorSetWeight;
	    row["vendorSetPieces"] = accData.vendorSetPieces;
	    row["suppliedBy"] = accData.suppliedBy;
	    row["selectionStatus"] = true;
	    
	    row["materialType"] = mType;
	    row["stoneTypes"] = sType;
	    
	    return row;
	}
	
	var generateMIVStonerow = function (psr, stoneData,mType,sType) {
		
	    var row = {};
	    row["mivSlNo"] = stoneData.mivSlNo;
	    row["slNo"] = stoneData.slNo;
	    row["stoneLoc"] = stoneData.location;
	    row["segment"] = stoneData.segment;
	    row["stoneLocTypes"] = stoneData.location;
	    row["stoneCode"] = stoneData.stoneCode;
	    row["subCategory"] = stoneData.subCategory;
	    row["uom"] = stoneData.uom;
	    
	    row["segment"] = stoneData.segmentId;
	    row["segments"] = stoneData.segment;
	    
	    row["mainCat"] = stoneData.categoryId;
	    row["mainCatN"] = stoneData.categoryDesc;
	    row["clarity"] = (stoneData.clarity != null) ? stoneData.clarity.id : null;
	    row["claritys"] = (stoneData.clarity != null) ? stoneData.clarity.id : null;
	    row["color"] = (stoneData.color != null ) ? stoneData.color.id : null;
	    row["colors"] = (stoneData.color != null ) ? stoneData.color.id : null;
	    row["actualColor"] = (stoneData.actualColor != null ) ? stoneData.actualColor.id : null;
	    row["actualColN"] = (stoneData.actualColor != null ) ? stoneData.actualColor.id : null;
	    row["cutGrade"] = (stoneData.cutGrade != null) ? stoneData.cutGrade.id : null;
	    row["cutGrades"] = (stoneData.cutGrade != null) ? stoneData.cutGrade.id : null;
	    row["subCatDesc"] = stoneData.subCatDesc;
	    row["packId"] = stoneData.packetId;
	    row["wtRange"] = (stoneData.weightRange != null) ? stoneData.weightRange.id : null;
	    row["subCategory"] = stoneData.subCategoryId;
	    row["subCategorys"] = stoneData.subCategory;
	    row["costRange"] = stoneData.costRange;
	    row["costRanges"] = stoneData.costRange;
	    
	    row["vendorIssuedStonePcs"] = stoneData.vendorIssuedStonePcs;
	    row["vendorIssuedStoneWt"] = stoneData.vendorIssuedStoneWt;
	    row["vendorLooseStone"] = stoneData.vendorLooseStone;
	    row["customerIssuedStonePcs"] = stoneData.customerIssuedStonePcs;
	    row["customerIssuedStoneWt"] = stoneData.customerIssuedStoneWt;
	    row["customerLooseStone"] = stoneData.customerLooseStone;
	    row["companyIssuedStonePcs"] = stoneData.companyIssuedStonePcs;
	    row["companyIssuedStoneWt"] = stoneData.companyIssuedStoneWt;
	    row["companyLooseStone"] = stoneData.companyLooseStone;
	    row["stoneConditions"] = stoneData.stoneCondition;
	    
	    row["compSetWeight"] = stoneData.compSetWeight;
	    row["compSetPieces"] = stoneData.compSetPieces;
	    row["custSetWeight"] = stoneData.custSetWeight;
	    row["custSetPieces"] = stoneData.custSetPieces;
	    row["vendorSetWeight"] = stoneData.vendorSetWeight;
	    row["vendorSetPieces"] = stoneData.vendorSetPieces;
	    row["selectionStatus"] = true;
	    
	    row["materialType"] = mType;
	    row["stoneTypes"] = sType;
	    
	    
	    row["suppliedBy"] = stoneData.suppliedBy
	    return row;
	}
	
	var materialTypePSR = function(rowId, materialType, psr){
		var mivRows = $("#jqxgrid").jqxGrid('getrows');
		var validation = false;
		
		for(var i = 0; i< mivRows.length; i++){		
			 var data = mivRows[i];	     
			 //(data.mivSrialNo != rowId &&) removed from if cond : for same row if we select same psr no then also it should show duplicate
			 if( data.materialType == materialType && data.psrNos == psr){
				validation = true;	
				break;
			 }
		}	
		return validation;
	}
	//function(mivSRL)
	var stoneDetailsValidation = function(rowId, materialType, psr){
		var mivRows = $("#stonegrid").jqxGrid('getrows');
		var validation = false;
		
		for(var i = 0; i< mivRows.length; i++){		
			 var data = mivRows[i];	     
			 /*if(data.mivSlNo == mivSRL){
				validation = true;	
				break;
			 }*/
			 if( data.materialType == materialType && data.psrNos == psr){
					validation = true;	
					break;
				 }

		}
		
		return validation;
	}
	
	var accDetailsValidation = function(rowId, materialType, psr){
		var mivRows = $("#accgrid").jqxGrid('getrows');
		var validation = false;	
		for(var i = 0; i< mivRows.length; i++){		
			 var data = mivRows[i];	     
			 /*if(data.mivSlNo == mivSRL){
				validation = true;	
				break;
			 }*/
			 if( data.materialType == materialType && data.psrNos == psr){
					validation = true;	
					break;
				 }
		}	
		return validation;
	}

    var wtFlagForStone = true;
    var wtFlagForAcc = true;
	function  mivDetailsValidation (){
		var mrvType = $('#mivType').val();	
		var mrvRows = $("#jqxgrid").jqxGrid('getrows');
		var validation = true;
		
		for(var i = 0; i< mrvRows.length; i++){		
			 var data = mrvRows[i];
			 if(true == data.selectionStatus){			 
				 if(data.materialType == null  || data.materialType == ""){				 
					 $.growl.error({ message: "Material Type is mandatory", duration: 10000, title: 'Error' });
					 validation = false;	
					 break;				 
				 }else if((data.materialType == "F"  || data.materialType == "R") && (data.segment  == undefined)){				 
					 $.growl.error({ message: "Segment is mandatory for Material Type FG and RM", duration: 10000, title: 'Error' });
					 validation = false;	
					 break;				 
				 }else if(data.materialType == "R" && (data.mivSkinPurity == null || data.mivSkinPurity == "")){				 
					 $.growl.error({ message: "Skin Purity is mandatory for Material Type RM", duration: 10000, title: 'Error' });
					 validation = false;	
					 break;				 
				 }else if((data.materialType == "R") && (data.grossWeight == null || data.grossWeight == 0)){						 
					 $.growl.error({ message: "Gross Weight is mandatory for Material Type FG and RM", duration: 10000, title: 'Error' });
					 validation = false;	
					 break;				 
				 }else if((data.materialType == "R") && (data.netWeight == null || data.netWeight == "")){					 
						 $.growl.error({ message: "Net Weight is mandatory for Material Type FG and RM", duration: 10000, title: 'Error' });
						 validation = false;	
						 break;					 
				 }else if((data.materialType == "S"  || data.materialType == "A") && (data.stoneType == null || data.stoneType == "" || data.stoneType == "N")){				 
					 $.growl.error({ message: "Stone type is mandatory for Material Type S and A", duration: 10000, title: 'Error' });
					 validation = false;	
					 break;				 
				 }else if((data.materialType = "S"  || data.materialType == "A" || data.materialType == "F" ) && (null == data.psrNos || ""== data.psrNos) && data.stoneType == "P"){
				 	$.growl.error({ message: "PSR No. is mandatrory", duration: 10000, title: 'Error'}); 
					 validation = false;	
					 break;				 
				 }
				
			 }
		}
		
		var stoneRows = $("#stonegrid").jqxGrid('getrows');
		if(undefined != stoneRows){
			var mrvRows = $("#jqxgrid").jqxGrid('getrows');
			var mType="";			
			for(var i = 0; i< stoneRows.length; i++){		
				 var data = stoneRows[i];
				 for(var j=0; j < mrvRows.length ; j++){
					if(mrvRows[j].mivSrialNo == stoneRows[i].mivSlNo){
						mType= mrvRows[j].materialTypes;
					}				 
				 }
				 if(mType == "Finished Goods"){
					 continue;
				 }
		    	 if(data.suppliedBy == "Customer"){
		    		 if(data.customerIssuedStoneWt == "0.000"){
							 $.growl.error({ message: " issued Wt should not be 0 !!", duration: 10000, title: 'Error' });
							 validation = false;	
							 break;
					  }
				 }else if(data.suppliedBy == "Company"){
					 if(data.companyIssuedStoneWt == "0.000"){
						 $.growl.error({ message: " issued Wt should not be 0 !!", duration: 10000, title: 'Error' });
						 validation = false;	
						 break;
					 }
				 }else if(data.suppliedBy == "Vendor"){
					 if(data.vendorIssuedStoneWt == "0.000"){
						 $.growl.error({ message: " issued Wt should not be 0 !!", duration: 10000, title: 'Error' });
						 validation = false;	
						 break;
					 }
				 }else{
					 if(data.companyIssuedStoneWt == "0"){
						 $.growl.error({ message: " issued Wt should not be 0 !!", duration: 10000, title: 'Error' });
						 validation = false;	
						 break;
				     }
				 }
			 if(data.selectionStatus  == true  && (data.stoneCode == null  || data.stoneCode == "")){				 
				 $.growl.error({ message: "Stone code is mandatory", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
			 }else if(data.selectionStatus  == true  && (data.stoneLoc == null  || data.stoneLoc == "")){
				 $.growl.error({ message: "Stone Location is mandatory", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
			 }else if(data.selectionStatus  == true  && (data.subCatDesc == null  || data.subCatDesc == "")){
				 $.growl.error({ message: "subCatDesc is mandatory", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
			 }	
			}
		}
		
		var accRows = $("#accgrid").jqxGrid('getrows');
		if(undefined != accRows){
			for(var i = 0; i< accRows.length; i++){			
				 var data = accRows[i];	
				 var mrvRows = $("#jqxgrid").jqxGrid('getrows');
				 var mType = "";
				 for(var j=0; j < mrvRows.length ; j++){
						if(mrvRows[j].mivSrialNo == accRows[i].mivSlNo){
							mType= mrvRows[j].materialTypes;
						}				 
				 }
				 if(mType == "Finished Goods"){					 
					 continue;
				 }
				 if(data.suppliedBy == "Customer"){
					 if(data.customerIssuedAccWt == "0.000"){
						 $.growl.error({ message: " issued Wt should not be 0 !!", duration: 10000, title: 'Error' });
						 validation = false;	
						 break;
					 }
				 }else if(data.suppliedBy == "Company"){
					 if(data.companyIssuedAccWt == "0.000"){
						 $.growl.error({ message: " issued Wt should not be 0 !!", duration: 10000, title: 'Error' });
						 validation = false;	
						 break;
					 }
				 }else{
					 if(data.vendorIssuedAccWt == "0.000"){
						 $.growl.error({ message: " issued Wt should not be 0 !!", duration: 10000, title: 'Error' });
						 validation = false;	
						 break;
				    }
				 }
				 if(data.selectionStatus  == true  &&  (data.articleCode == null  || data.articleCode == "")){				 
					 $.growl.error({ message: "Article code is mandatory", duration: 10000, title: 'Error' });
					 validation = false;	
					 break;				 
				 }
			}
		}
			return validation;
		}

	function materialIssueVoucherDetailsGrid() {
		var updateRows = function(rowid, newdata, commit) {
			
		}
		
		var datafields = [ 
			{'name' : 'mivSrialNo','type' : 'long'}, 
			{'name' : 'createdDate','type' : 'Date'}, 
			{'name' : 'mivType','type' : 'String'},
			{'name' : 'createdBy','type' : 'String'},
			{'name' : 'vendorCode','type' : 'String'},
			{'name' : 'actionId','type' : 'int','map' : 'mivSrialNo'},
			{'name' : 'operationType','type' : 'String'},
			{'name' : 'jwType','type' : 'String'}
		];
	
		var columns = [
			{'text' : 'GIV No.','datafield' : 'mivSrialNo','width' : '15%',editable : false,cellsalign : 'center',align : 'center'},
   			{'text' : 'GIV Date','datafield' : 'createdDate','width' : '15%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
   			{'text' : 'GIV Type','datafield' : 'mivType','width' : '20%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
	   		{'text' : 'Sales Person','datafield' : 'createdBy','width' : '20%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
	   		{'text' : 'Vendor','datafield' : 'vendorCode','width' : '25%',sortable : false,editable : false,cellsalign : 'left',align : 'center'},
   			{text : '',datafield : 'actionId',cellsrenderer : mivRenderer,editable : false,sortable : false,'width' : '5%',cellsalign : 'center',align : 'center'}	   					
   		];
		
		showMyGrid(datafields,"/OrderExecution/api/v1/mivList?page=mivDetails", "list",	columns, mivDetailsFilterValues(), updateRows, "id");
		$("#jqxgrid").jqxGrid({
			width : '100%',
		    sortable: true,            
		 	altrows: true,
			columnsresize: true, 
			autoheight: false,
			height: '275px',
			theme: 'energyblue',
			rowsheight : 30,
			columnsheight: 30,
			rowdetails : true,
			virtualmode : true
		});	
	 }


	var addMIVStonerow = function (mrvSlno, slNO,row) {
		var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');    
	    var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneTypes');
		
	    var row = {};
	    row["mivSlNo"] = mrvSlno;
	    row["slNo"] = slNO;
	    row["stoneLoc"] = null;
	    row["articleCode"] = null;
	    row["materialType"] = materialType;
	    row["stoneTypes"] = stoneType;
	    
	    row["subCategory"] = null;
	    row["segment"] = null;
	    row["uom"] = null;
	    row["vendorIssuedAccPcs"] = null
	    row["vendorIssuedAccWt"] = null;
	    row["vendorLooseAcc"] = null;
	    row["customerIssuedAccPcs"] = null;
	    row["customerIssuedAccWt"] = null;
	    row["customerLooseAcc"] = null;
	    row["companyIssuedAccPcs"] = null;
	    row["companyIssuedAccWt"] = null;
	    row["companyLooseAcc"] = null;
	    row["accountCondition"] = null;
	    row["selectionStatus"] = true;    
	    return row;
	}


	function checkForRefMetalTypeRM (row, datafield, columntype) {	
		var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
		var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneType');
	
		if(materialType == "F" || materialType == "A" ||(materialType == "S" && stoneType == "P")){
	    	return false;
	    }
	    else {
	       return true;
	    }	
	}
	
	function checkForMIVMetalType (row, datafield, columntype, editor) {	
	    var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');    
	    var segment =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'segment');    
	    var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneTypes');    
	  
	    if((materialType == "F" && stoneType == "None") || (materialType == "R" && stoneType == null) || (materialType == "S" && stoneType == "Bulk")){
	    	return false
	    }
	}
	function checkForMIVMetalTypeMAL (row, datafield, columntype, editor) {	
	    var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');    
	    var segment =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'segment');    
	    var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneTypes');    
	 

	    if(materialType == "R"){
	    	return true;
	    }else{
			return false;
	    }
	    
	  
	}
	function checkForMIVType (row, datafield, columntype) {
		var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');	
		var segment =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'segment');	
		var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneType');	
		var psrNumber =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'psrNos');	
		var mivType = $('#mivType').val();
		
		if(materialType == "F" && mivType != "S"){		
			return false;		
		}else if ((materialType == "F" || materialType == "R") && undefined != segment &&  null != segment && segment != "" ) {    	
	    	return false;        
	    }else if((materialType == "S" && stoneType == "B") || (materialType == "S" && stoneType == "P" && null != psrNumber  && "" != psrNumber)){    	
	    	return false;    	
	    }else if(materialType == "A" && null != psrNumber  && "" != psrNumber){    	
	    	return false;    	
	    }else {
	       return true;
	    }
	}
	
	function validateMIVDetails (row, datafield, columntype) {	
		var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');	
		var segment =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'segment');	
		var refType = $("#jqxgrid").jqxGrid('getcellvalue', row, "refType");
		
		if (materialType == "S" || materialType == "A"|| materialType == "F") {    	
	    	return false;        
	    }else if (materialType == "R" && (refType == "STK")) {    	
	    	return false;        
	    }else if (materialType == "R" && ("netWeight" == datafield)) {    	
	    	return false;        
	    }else if ((materialType == "R") && "mivSkinPurity" == datafield && ( null == segment || segment == "")) {    	
	    	return false;        
	    }else{
	    	return true;
	    }	
	}
	
	function checkForBulk (row, datafield, columntype) {
	    var dtRow = $('#stonegrid').jqxGrid('getcellvalue', row, 'mivSlNo');    
	    var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', (dtRow-1), 'stoneType');
	    if (stoneType == "P") {
	        return false;
	    }
	    else {
	       return true;
	    }
	}
	
	function checkCustomerStone (row, datafield, columntype) {
		var dtRow = $('#stonegrid').jqxGrid('getcellvalue', row, 'mivSlNo');	
	    var isCustomerStone = $('#stonegrid').jqxGrid('getcellvalue', row, 'isCustomerStone');    
	    var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', (dtRow-1), 'stoneType');    
	    if (stoneType == "P" && isCustomerStone == true && ("companyIssuedStonePcs" == datafield || "companyIssuedStoneWt" == datafield || "companyLooseAcc" == datafield)) {
	        return false;        
	    }else if (stoneType == "P" && isCustomerStone == false && ("customerIssuedStonePcs" == datafield || "customerIssuedStoneWt" == datafield || "customerLooseStone" == datafield)) {
	        return false;        
	    }else if (stoneType == "B" && ("customerIssuedStonePcs" == datafield || "customerIssuedStoneWt" == datafield || "customerLooseStone" == datafield)) {
	        return false;        
	    } else {
	       return true;
	    }
	}
	
	$("#clear").on('click', function(){
		$("#accgrid").jqxGrid('clear');
		$("#stonegrid").jqxGrid('clear');
		$("#jqxgrid").jqxGrid('clear');
		$('#vendorCode').val('');
		 $('#vendorCode-value').val('');
		 $('#mivType').val('');
		 $('#vendorCode').attr('disabled', false);
	 	 $('#mivType').attr('disabled', false);
	});
	
$("#clearAll").on("click",function(){
	$("#jqxgrid").hide();
	redirect();
})	
	
	
	
	
	$("#export").on("click",function(){
		fieldFilters = {
				"fieldFilters" : {}
			};
		    var fromDate = $('#orderFromDate').val();
			var toDate = $('#orderToDate').val();	
			var vendorName = $('#vendorCode-value').val();
			var jwType = $('#jwType').val();
			var id=$('#mivNo').val();
			var materialType=$('#materialType').val();
			var segment=$('#segment').val();
			/*var psrNumber=$('#psrNumber').val();	*/
			var salesPerson=$('#salesPerson').val();	
			
		    if (fromDate != "" && fromDate != null) {
				fieldFilters.fieldFilters["orderFromDate"] = fromDate;
			}

			if (toDate != "" && toDate != null) {
				fieldFilters.fieldFilters["orderToDate"] = toDate;
			}
			if (vendorName != "" && vendorName != null) {
				fieldFilters.fieldFilters["vendorName"] = vendorName;
			}
			if (jwType != "" && jwType != null) {
				fieldFilters.fieldFilters["jwType"] = jwType;
			}
			if (id != "" && id != null) {
				fieldFilters.fieldFilters["id"] = id;
			}
			
			if (materialType != "" && materialType != null) {
				fieldFilters.fieldFilters["materialType"] = materialType;
			}
			
			if (segment != "" && segment != null) {
				fieldFilters.fieldFilters["segment"] = segment;
			}
			
			if (salesPerson != "" && salesPerson != null) {
				fieldFilters.fieldFilters["salesPerson"] = salesPerson;
			}

		var newData = [];
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
				postJSON('/OrderExecution/api/v1/mivExport',JSON.stringify(fieldFilters),function(response) {
					if (response != null) {
						if(response.resCode == 1){
							data = response.payload.list;
							exportMivDetailSideBySide(data);
						}else{
							$.growl.error({ message: response.mesgStr, duration: 10000, title: 'Warning' });
						}

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
		 }
	});
	
	
	
	function exportMivDetailSideBySide(data)
	{
		var sql0 = 'SEARCH / AS @ud \
			RETURN ( \
			@ud->[mivHeader]->[id] AS [GIV No], \
			@ud->mivSrialNo AS [GIV Sl NO], \
			@ud->[id] AS [GIV Detial Id], \
			@ud->mivHeader->dc->name AS [DC Name], \
			@ud->mivHeader->jwType->name AS [JW Type], \
			@ud->mivType AS [GIV TYPE], \
			@ud->[createdBy] AS [Created BY], \
			@ud->createdDate AS [Created Date], \
			@ud->mivHeader->vendorName->id AS [Vendor Code], \
			@ud->mivHeader->vendorName->name AS [Vendor Name], \
			@ud->mivHeader->parcelId AS [Parcel ID], \
			@ud->materialType AS [Material Type], \
			@ud->psrBulk AS [PSR/Bulk], \
			@ud->metalSegment->description AS [Metal Segment], \
			@ud->metalAccLocation AS [Location Code ], \
			@ud->grossWeight AS [Gross Wt], \
			@ud->netWeight AS [Net Wt], \
			@ud->[pureWt] AS [Pure Wt], \
			@ud->[pcs] AS [Pcs], \
			@ud->[psrNos] AS [PSR NO], \
			@ud->refType AS [Ref Type], \
			@ud->refNo AS [Ref No], \
			@ud->refSerialNo AS [Ref Sl No], \
			@ud->skinPuritys AS [Skin Purity], \
			@ud->meltingPurity AS [Melting Purity], \
			@ud->meltingLotNo AS [Melting Lot NO] \
				) \
			FROM $0';
		

		  // Query to get first child records (stones)	
		var sql1 = 'SEARCH / AS @ud\
			stoneDTO / AS @us \
				RETURN ( \
			@ud->[id] AS [GIV Detial Id], \
			@us->[slNo] AS [GIV_Stone_Sl_No], \
			@us->companyIssuedStonePcs AS [GIV Stone_Comp Given Pcs], \
			@us->companyIssuedStoneWt AS [GIV Stone_Comp Given Wt], \
			@us->customerIssuedStonePcs AS [GIV Stone_Cust Given Pcs], \
			@us->customerIssuedStoneWt AS [GIV Stone_Cust Given Wt], \
			@us->vendorIssuedStonePcs AS [Vendor Stone Pcs], \
			@us->[vendorIssuedStoneWt] AS [Vendor Stone Wt], \
			@us->[compSetWeight] AS [Stone-Company Set Wt], \
			@us->[compSetPieces] AS [Stone-Company Set Pcs], \
			@us->[custSetWeight] AS [Stone-Cust Set Wt], \
			@us->[custSetPieces] AS [Stone-Cust Set Pcs], \
			@us->[vendorSetWeight] AS [Stone-Vendor Set Wt], \
			@us->[vendorSetPieces] AS [Stone- Vendor Set Pcs] \
					) \
				FROM $0';

		var sql2 = 'SEARCH / AS @ud\
			accessoryDTO / AS @ua \
				RETURN ( \
			@ud->[id] AS [GIV Detial Id], \
			@ua->[slNo] AS [Acc_Sl_No], \
			@ua->companyIssuedAccPcs AS [Acc_Company_Given_Pcs], \
			@ua->companyIssuedAccWt AS [ACC_Company_Given_Wt], \
			@ua->customerIssuedAccPcs AS [Customer_Given_Pcs], \
			@ua->customerIssuedAccWt AS [ACC_Customer Give_Wt], \
			@ua->compSetWeight AS [ACC-Company Set Wt], \
			@ua->compSetPieces AS [ACC-Company Set Pcs], \
			@ua->custSetWeight AS [ACC-Cust Set Wt], \
			@ua->[custSetPieces] AS [ACC-Cust Set Pcs], \
			@ua->[vendorSetWeight] AS [ACC-Vendor Set Wt], \
			@ua->[vendorSetPieces] AS [ACC- Vendor Set Pcs ] \
					) \
				FROM $0';

	    var sql3 = 'SELECT * FROM ? AS s FULL OUTER JOIN ? AS a ON s.[MIV Detial Id] = a.[MIV Detial Id] AND s.[MIV_Stone_Sl_No] = a.[Acc_Sl_No]';
	    
	    var sql4 = 'SELECT * FROM ? AS m  OUTER JOIN ? AS o ON m.[MIV Detial Id] = o.[MIV Detial Id] ';

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
	    	var i = 0;
	    	for(i=0; i<data.length; i++){
	    		if(null == data[i].stoneDTO){
	    			data[i].stoneDTO = []
	    		}
	    		if(null == data[i].accessoryDTO){
	    			data[i].accessoryDTO = []
	    		}
	    	}
	    	
	    	// Following code generates export data as Master-Child side-by-side
	    	res0 = alasql(sql0,[data]);
	    	res1 = alasql(sql1,[data]);
	    	res2 = alasql(sql2,[data]);
	    	res = alasql(sql3,[res1, res2]);
	    	res = alasql(sql4,[res0, res]);
	    	adjustObjectKeys(res); 
	    	removeNullData(res);
	    	res = alasql("SELECT * INTO XLSX('MivDetails.xlsx',?) FROM ?",[mystyle, res]);
	    }
	    catch (err)
	    {
	    	alert(err.message);
	    }
	}