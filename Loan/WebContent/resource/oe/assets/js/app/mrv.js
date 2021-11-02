

////loadPermission();

var redirect = function() {
	window.location.href = "javascript:showContentPage('mrvListing', 'bodySwitcher')";
	return window.location.href;
}

$(document).on('click', '#orderFromDate', function () {
    var me = $("#orderFromDate");
    var selectedDate =  $("#orderFromDate").val();
    me.datepicker({
      showOn: 'focus',
      changeMonth: true,
      changeYear: true,
      maxDate : 0,
      dateFormat:"dd/mm/yy",
        onSelect: function( selectedDate ) {
            $( "#orderToDate" ).datepicker( "option", "minDate", selectedDate );
        }
    }).focus();
    me.mask('99/99/9999');

}).on('select', '#orderFromDate', function () {
    var me = $("#orderFromDate");
}).on("change", function (e) {

});

$(document).on('click', '#orderToDate', function () { 
    var me = $("#orderToDate");
    me.datepicker({
      showOn: 'focus',
      changeMonth: true,
      changeYear: true,
      dateFormat:"dd/mm/yy",
      minDate:$("#orderFromDate").val(),
      maxDate : 0
    }).focus();
    me.mask('99/99/9999');
}).on('select', '#orderToDate', function () {
    var me = $("#orderToDate");
});

	var $jwType = $('#jwType');
	var $salesPerson = $('#salesPerson');
	$.getJSON('/OrderExecution/api/v1/mrvLOV?page=mrvList', function(data) {
		
		$.each(data.payload.mrvTypes, function(key, val) {
			$jwType.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
			
		});
		$.each(data.payload.salesExecutive, function(key, val) {
			$salesPerson.append('<option value="' + val.hrmsId + '">' + val.name
					+ '</option>');
		}) 
		
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
			     
			     $('#parcelId').empty().append('<option value="" selected>-- Select Option --</option>');
					var receiveParcel = '/OrderExecution/api/v1/receiveParcelsForVendor?vendorId='+ui.item.value;
					
					$.getJSON(receiveParcel, function(data) {
						$.each(data.payload.receiveParcel, function(key, val) {
							$parcelId.append('<option value="' + val.id + '">' + val.name + '</option>');
						})
					});
			    }
		   });
   
	  });
		

}); 

$("#Search").on("click", function() {	
	mrvListingGrid();
	$("#jqxgrid").show();
	return false;
});	


var mrvDto = new Object();
var data = {};
var stSrl = 0
    accSrl = 0;


	var sortFields = [ {
		"fieldPath" : "createdDate"
	} ];
	
$("#stoneDetails").prop("disabled",true);	
$("#accDetails").prop("disabled",true);	
$("#mrvView").hide();
$("#mrvSearch").show();
$("#mrvEdit").hide();
	
$("#gobackL").on('click',function(){
	$("#mrvSearch").show();
	$("#mrvView").hide();
	$("#mrvEdit").hide();
});


function validateNumber(val) {
	var regex = /^\d{0,9}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

$("#stateIdHide").hide();
$("#gstHide").hide();
$("#sourceStateHide").hide();
$("#stateHide").hide();
$("#vendRegisteredC").on('change',function(){
	var taxType = $("#vendRegisteredC").val();
	if(taxType == "R"){
		$("#gstHide").show();
		$("#sourceStateHide").show();
		$("#stateHide").hide();
	var vend = $("#vendorCode-value").val();
	$.getJSON('/OrderExecution/api/v1/mrvLOV?page=MrvGst&taxType='+taxType+"&&"+'vId='+vend,function(data) {	
		$('#gstinNO').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.gstnList, function(key, val) {
		$('#gstinNO').append('<option value="' + val.name + '">' + val.name + '</option>');
	});
	});
}
	if(taxType == "UR"){
		$("#gstHide").hide();
		$("#sourceStateHide").hide();
		$("#stateHide").show();
		$.getJSON('/OrderExecution/api/v1/mrvLOV?page=state&taxType='+taxType,function(data) {
			var state = data.payload.stateList;
			state.sort(function(a, b){
				return a.code-b.code;
			});
			$('#stateC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.stateList, function(key, val) {
			$('#stateC').append('<option value="' + val.id + '">' + val.code + " - " + val.name + '</option>');
		});
		});
	}
});


$("#gstinNO").on('change',function(){
	var taxType = $("#vendRegisteredC").val();
	var vend = $("#vendorCode-value").val();
	var gstNo = $("#gstinNO").val();	
	$.getJSON('/OrderExecution/api/v1/mrvLOV?page=gstState&taxType='+taxType+"&&"+'vId='+vend+"&&"+'gstinNumber='+gstNo,function(data) {	
		$('#sourceStateC').empty().append('<option value="" selected>--Select--</option>');
		var state = data.payload.State;
		var sourceState = state.code + " - " + state.name;
		$('#sourceStateC').val(sourceState);
		$('#stateIdC').val(state.id);
	});
});
	
	

var mrvPrintRenderer = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<a class="btn btn-sm btn-primary"  type="button"  onclick=mrvPrintcall('+ value +',"'+ jwType +'","'+ OType +'") href="#?id=' 
		+ value + '"/><i class="fa fa-print fa-lg"></i></a>'
		+ " "
		+ '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnViewMrvDet"  type="button" id='
		+ row
		+ ' onclick="viewMrvDet('
		+ value
		+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>'
		+ " "
		+ '<a class="btn btn-sm btn-primary" disabled type="button" id='+')"/><i class="fa fa-pencil fa-lg"></i></a>'
	}else{
		var jwType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'jwType');
		var OType  =    $('#jqxgrid').jqxGrid('getcellvalue', row, 'operationType');		
		return '<a class="btn btn-sm btn-primary"  type="button"  onclick=mrvPrintcall('+ value +',"'+ jwType +'","'+ OType +'") href="#?id=' 
					+ value + '"   /><i class="fa fa-print fa-lg"></i></a>'
				+ " "
				+ '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnViewMrvDet"  type="button" id='
				+ row
				+ ' onclick="viewMrvDet('
				+ value
				+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>'
				+ " "
				+ '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnViewMrvDet"  type="button" id='
				+ row
				+ ' onclick="editMrvDet('
				+ value
				+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-lg"></i></a>'
	}
}

$("#gobackE").on('click',function(){
	$("#mrvSearch").show();
	$("#mrvView").hide();
	$("#mrvEdit").hide();
});

var checkTaxPerEdit = function(row, datafield, columntype, oldvalue, newvalue, event){
	 var cgstperc = $("#editFgGrid").jqxGrid('getcellvalue', row, 'cgstperc');
	 var sgstperc = $("#editFgGrid").jqxGrid('getcellvalue', row, 'sgstperc');
	 var igstperc = $("#editFgGrid").jqxGrid('getcellvalue', row, 'igstperc');
	 var cessperc = $("#editFgGrid").jqxGrid('getcellvalue', row, 'cessperc');
	 var cgstpercFlag = $('#editFgGrid').jqxGrid ('getcellvalue', row, 'cgstpercFlag');
	 var sgstpercFlag = $('#editFgGrid').jqxGrid ('getcellvalue', row, 'sgstpercFlag');
	 var igstpercFlag = $('#editFgGrid').jqxGrid ('getcellvalue', row, 'igstpercFlag');
	 var cesspercFlag = $('#editFgGrid').jqxGrid ('getcellvalue', row, 'cesspercFlag');
	 if(datafield == "cgstperc"){
		 if(cgstpercFlag.value == "true"){
				if(newvalue == null || newvalue == "" || newvalue == 0){
		 			$("#updateMrvDet").prop('disabled',true);
			 		$.growl.error({	message : " CGST % is Mandatory !!!",duration :  1000,title : 'Error'});
			 		return "";
		 		}else{
			 		$("#updateMrvDet").prop('disabled',false);
		 		}
		 }
		 if(igstperc > 0 && newvalue > 0){
			 $("#editFgGrid").jqxGrid('setcellvalue', row, 'cgstperc', 0.00);
			 $.growl.error({ message:"Please enter either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }
	 
	 if(datafield == "sgstperc"){
		 	if(sgstpercFlag.value == "true"){
		 		if(newvalue == null || newvalue == "" || newvalue == 0){
		 			$("#updateMrvDet").prop('disabled',true);
			 		$.growl.error({	message : "SGST % is Mandatory !!!",duration :  1000,title : 'Error'});
			 		return "";
		 		}else{
			 		$("#updateMrvDet").prop('disabled',false);
		 		}
		 	}
		 	
		 if(igstperc > 0 && newvalue > 0){
			 $("#editFgGrid").jqxGrid('setcellvalue', row, 'sgstperc', 0.00);
			 $.growl.error({ message:"Please enter either either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }
	 
	 if(datafield == "igstperc" && newvalue > 0){
		$("#editFgGrid").jqxGrid('setcellvalue', row, 'cgstperc', 0.00);
		$("#editFgGrid").jqxGrid('setcellvalue', row, 'sgstperc', 0.00);
		$("#editFgGrid").jqxGrid('setcellvalue', row, 'cessperc', 0.00);
		if(igstpercFlag.value == "true"){
	 		if(newvalue == null || newvalue == "" || newvalue == 0){
	 			$("#updateMrvDet").prop('disabled',true);
		 		$.growl.error({message : " IGST % is Mandatory !!!",duration :  1000,title : 'Error'});
		 		return "";
	 		}else{
		 		$("#updateMrvDet").prop('disabled',false);
	 		}
	 	} 
	 }
 
	 /*if(datafield == "cessperc"){
		 if(cesspercFlag.value == "true"){
		 		if(newvalue == null || newvalue == "" || newvalue == 0){
		 			$("#updateMrvDet").prop('disabled',true);
			 		$.growl.error({message : " CESS % is Mandatory !!!",duration :  1000,title : 'Error'});
			 		return "";
		 		}else{
			 		$("#updateMrvDet").prop('disabled',false);
		 		}
		 	}
		 
		 if(igstperc > 0 && newvalue > 0){
			 $("#editFgGrid").jqxGrid('setcellvalue', row, 'cessperc', 0.00);
			 $.growl.error({ message:"Please enter either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }*/
 }


var checkTaxPerEditRM = function(row, datafield, columntype, oldvalue, newvalue, event){
	 var cgstperc = $("#editRmGrid").jqxGrid('getcellvalue', row, 'cgstperc');
	 var sgstperc = $("#editRmGrid").jqxGrid('getcellvalue', row, 'sgstperc');
	 var igstperc = $("#editRmGrid").jqxGrid('getcellvalue', row, 'igstperc');
	 var cessperc = $("#editRmGrid").jqxGrid('getcellvalue', row, 'cessperc');
	 var cgstpercFlag = $('#editRmGrid').jqxGrid ('getcellvalue', row, 'cgstpercFlag');
	 var sgstpercFlag = $('#editRmGrid').jqxGrid ('getcellvalue', row, 'sgstpercFlag');
	 var igstpercFlag = $('#editRmGrid').jqxGrid ('getcellvalue', row, 'igstpercFlag');
	 var cesspercFlag = $('#editRmGrid').jqxGrid ('getcellvalue', row, 'cesspercFlag');
	 if(datafield == "cgstperc"){
		 if(cgstpercFlag.value == "true"){
				if(newvalue == null || newvalue == "" || newvalue == 0){
		 			$("#updateMrvDet").prop('disabled',true);
			 		$.growl.error({	message : " CGST % is Mandatory !!!",duration :  1000,title : 'Error'});
			 		return "";
		 		}else{
			 		$("#updateMrvDet").prop('disabled',false);
		 		}
		 }
		 if(igstperc > 0 && newvalue > 0){
			 $("#editRmGrid").jqxGrid('setcellvalue', row, 'cgstperc', 0.00);
			 $.growl.error({ message:"Please enter either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }
	 
	 if(datafield == "sgstperc"){
		 	if(sgstpercFlag.value == "true"){
		 		if(newvalue == null || newvalue == "" || newvalue == 0){
		 			$("#updateMrvDet").prop('disabled',true);
			 		$.growl.error({	message : "SGST % is Mandatory !!!",duration :  1000,title : 'Error'});
			 		return "";
		 		}else{
			 		$("#updateMrvDet").prop('disabled',false);
		 		}
		 	}
		 	
		 if(igstperc > 0 && newvalue > 0){
			 $("#editRmGrid").jqxGrid('setcellvalue', row, 'sgstperc', 0.00);
			 $.growl.error({ message:"Please enter either either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }
	 
	 if(datafield == "igstperc" && newvalue > 0){
		$("#editRmGrid").jqxGrid('setcellvalue', row, 'cgstperc', 0.00);
		$("#editRmGrid").jqxGrid('setcellvalue', row, 'sgstperc', 0.00);
		$("#editRmGrid").jqxGrid('setcellvalue', row, 'cessperc', 0.00);
		if(igstpercFlag.value == "true"){
	 		if(newvalue == null || newvalue == "" || newvalue == 0){
	 			$("#updateMrvDet").prop('disabled',true);
		 		$.growl.error({message : " IGST % is Mandatory !!!",duration :  1000,title : 'Error'});
		 		return "";
	 		}else{
		 		$("#updateMrvDet").prop('disabled',false);
	 		}
	 	} 
	 }

	/* if(datafield == "cessperc"){
		 if(cesspercFlag.value == "true"){
		 		if(newvalue == null || newvalue == "" || newvalue == 0){
		 			$("#updateMrvDet").prop('disabled',true);
			 		$.growl.error({message : " CESS % is Mandatory !!!",duration :  1000,title : 'Error'});
			 		return "";
		 		}else{
			 		$("#updateMrvDet").prop('disabled',false);
		 		}
		 	}
		 
		 if(igstperc > 0 && newvalue > 0){
			 $("#editRmGrid").jqxGrid('setcellvalue', row, 'cessperc', 0.00);
			 $.growl.error({ message:"Please enter either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }*/
}

var checkTaxPerEditService = function(row, datafield, columntype, oldvalue, newvalue, event){
	 var cgstperc = $("#editServicesDetGrid").jqxGrid('getcellvalue', row, 'cgstperc');
	 var sgstperc = $("#editServicesDetGrid").jqxGrid('getcellvalue', row, 'sgstperc');
	 var igstperc = $("#editServicesDetGrid").jqxGrid('getcellvalue', row, 'igstperc');
	 var cessperc = $("#editServicesDetGrid").jqxGrid('getcellvalue', row, 'cessperc');
	 var cgstpercFlag = $('#editServicesDetGrid').jqxGrid ('getcellvalue', row, 'cgstpercFlag');
	 var sgstpercFlag = $('#editServicesDetGrid').jqxGrid ('getcellvalue', row, 'sgstpercFlag');
	 var igstpercFlag = $('#editServicesDetGrid').jqxGrid ('getcellvalue', row, 'igstpercFlag');
	 var cesspercFlag = $('#editServicesDetGrid').jqxGrid ('getcellvalue', row, 'cesspercFlag');
	 if(datafield == "cgstperc"){
		 if(cgstpercFlag.value == "true"){
				if(newvalue == null || newvalue == "" || newvalue == 0){
		 			$("#updateMrvDet").prop('disabled',true);
			 		$.growl.error({	message : " CGST % is Mandatory !!!",duration :  1000,title : 'Error'});
			 		return "";
		 		}else{
			 		$("#updateMrvDet").prop('disabled',false);
		 		}
		 }
		 if(igstperc > 0 && newvalue > 0){
			 $("#editServicesDetGrid").jqxGrid('setcellvalue', row, 'cgstperc', 0.00);
			 $.growl.error({ message:"Please enter either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }
	 
	 if(datafield == "sgstperc"){
		 	if(sgstpercFlag.value == "true"){
		 		if(newvalue == null || newvalue == "" || newvalue == 0){
		 			$("#updateMrvDet").prop('disabled',true);
			 		$.growl.error({	message : "SGST % is Mandatory !!!",duration :  1000,title : 'Error'});
			 		return "";
		 		}else{
			 		$("#updateMrvDet").prop('disabled',false);
		 		}
		 	}
		 	
		 if(igstperc > 0 && newvalue > 0){
			 $("#editServicesDetGrid").jqxGrid('setcellvalue', row, 'sgstperc', 0.00);
			 $.growl.error({ message:"Please enter either either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }
	 
	 if(datafield == "igstperc" && newvalue > 0){
		$("#editServicesDetGrid").jqxGrid('setcellvalue', row, 'cgstperc', 0.00);
		$("#editServicesDetGrid").jqxGrid('setcellvalue', row, 'sgstperc', 0.00);
		$("#editServicesDetGrid").jqxGrid('setcellvalue', row, 'cessperc', 0.00);
		if(igstpercFlag.value == "true"){
	 		if(newvalue == null || newvalue == "" || newvalue == 0){
	 			$("#updateMrvDet").prop('disabled',true);
		 		$.growl.error({message : " IGST % is Mandatory !!!",duration :  1000,title : 'Error'});
		 		return "";
	 		}else{
		 		$("#updateMrvDet").prop('disabled',false);
	 		}
	 	} 
	 }

	/* if(datafield == "cessperc"){
		 if(cesspercFlag.value == "true"){
		 		if(newvalue == null || newvalue == "" || newvalue == 0){
		 			$("#updateMrvDet").prop('disabled',true);
			 		$.growl.error({message : " CESS % is Mandatory !!!",duration :  1000,title : 'Error'});
			 		return "";
		 		}else{
			 		$("#updateMrvDet").prop('disabled',false);
		 		}
		 	}
		 
		 if(igstperc > 0 && newvalue > 0){
			 $("#editServicesDetGrid").jqxGrid('setcellvalue', row, 'cessperc', 0.00);
			 $.growl.error({ message:"Please enter either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }*/
}

//View Grids Started
//FG Details View Grid
var editFgDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'mrvSrialNo', type : 'int'}, 
			{name : 'materialType', type : 'string'},
			{name: 'psrNo', type: 'int'},
			{name : 'metalAccLocation', type : 'string'},
			{name : 'refType', type : 'string'},
			{name : 'refNo', type : 'int'},
			{name : 'refSerialNo', type : 'int'},
			{name : 'partyBillNo', type : 'string'},
			{name : 'partyBillDate', type : 'date'},
			{name : 'skinPurity', type : 'float'},
			
			{name : 'pcs', type : 'int'}, 
			{name : 'grossWeight', type : 'float'},
			{name: 'netWeight', type: 'float'},
			{name : 'wastageWeight', type : 'float'},
			{name : 'diamondWeight', type : 'float'},
			{name : 'valInRs', type : 'float','map':'valueInRs'},
			{name : 'metalRate', type : 'float'},
			{name : 'labourCharges', type : 'float'},
			{name : 'remarks', type : 'string'},
			{name : 'mrvReferenceType', type : 'string'},
			{name : 'segment', type : 'string','map':'segmentDTO>description'},
			
			{name : 'mrvAssRefPurity', type : 'float'}, 
			{name : 'mrvBillAmt', type : 'float'},
			{name: 'mrvPsrBulkFlag', type: 'string'},
			{name : 'mrvConPeriod', type : 'int'},
			{name : 'mrvConsYorN', type : 'string'},
			{name : 'melPurity', type : 'float'},
			{name : 'mrvStatus', type : 'string'},
			{name : 'pureWt', type : 'float'},
			{name : 'refSrlNo', type : 'int'},
			{name : 'stanRate', type : 'float'},
			{name : 'hsnSacCode', type : 'string'},
			{name : 'cgstperc', type : 'float'},
			{name : 'sgstperc', type : 'float'},
			{name : 'igstperc', type : 'float'},
			{name : 'cessperc', type : 'float'},
			{name : 'mrvDetailId', type : 'int'},
			
			{name : 'hsnSacCodeFlag', type : 'string'},
			{name : 'cgstpercFlag', type : 'string'},
			{name : 'sgstpercFlag', type : 'string'},
			{name : 'igstpercFlag', type : 'string'},
			{name : 'cesspercFlag', type : 'string'},
			{name : 'editFlag', type : 'string'},
			
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#editFgGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		columnsheight: 70,
		editable : true,
		theme: 'energyblue',
		columnsresize: true,  
		rowsheight : 35,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		
		columns : [ 
			{ text : 'GRV Sl No', datafield : 'mrvSrialNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Mat Type', datafield : 'materialType', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'M.Seg', datafield : 'mSegment', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'PSR No', datafield : 'psrNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Acc Loc', datafield : 'metalAccLocation', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Type', datafield : 'refType', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref No', datafield : 'refNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Sl No', datafield : 'refSerialNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Party Bill No', datafield : 'partyBillNo', width : '3%', cellsalign : 'center', align : 'center', editable : true, sortable : false},
			{ text : 'Party Bill Date', datafield : 'partyBillDate', width : '3%', cellsalign : 'center', columntype: 'datetimeinput',align : 'center', editable : true, sortable : false, cellsformat : 'dd/MM/yyyy',
				cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
					var date = new Date();
					var dateOnly = new Date(date
							.getFullYear(),
							date.getMonth(), date.getDate());
					if (newvalue <= dateOnly) {

						return newvalue;
					} else {
						$.growl
								.error({
									message : "Future Date not allowed",
									duration : 3000,
									title : 'Error'
								});
						return "";
					}
				}},
			{ text : 'M Purity', datafield : 'melPurity', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'S Purity', datafield : 'skinPurity', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			
			{ text : 'HSN/SAC Code', datafield : 'hsnSacCode', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						 var hsnSacCodeFlag = jQuery('#editFgGrid').jqxGrid ('getCell', row, 'hsnSacCodeFlag');
					 	if(hsnSacCodeFlag.value == "true"){
					 		if(newvalue == null){
					 			$("#updateMrvDet").prop('disabled',true);
						 		$.growl.error({
						 			message : "HSN/SAC Code is Mandatory !!!",
						 			duration :  1000,
						 			title : 'Error'
						 		});
						 		return "";
					 		}else if(newvalue != null){
						 		$("#updateMrvDet").prop('disabled',false);
					 		}
					 	}
					 	
				},cellbeginedit : function(row){
					var editFlagFg = jQuery('#editFgGrid').jqxGrid ('getcellvalue', row, 'editFlag');
					if(editFlagFg == 'true'){
						return true;
					}else{
						return false;
					}
				}
			},
			{ text : 'CGST %', datafield : 'cgstperc', width : '3.5%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging:checkTaxPerEdit
			},
			{ text : 'SGST %', datafield : 'sgstperc', width : '4%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging:checkTaxPerEdit
			},
			{ text : 'IGST %', datafield : 'igstperc', width : '4.5%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging: checkTaxPerEdit
			},
			{ text : 'CESS %', datafield : 'cessperc', width : '4%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',columntype : 'numberinput',
				createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						decimalDigits : 2
					});
				},
				cellvaluechanging: checkTaxPerEdit
			},
			{ text : '', datafield : 'mrvDetailId', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden : true},
			{ text : 'Pcs', datafield : 'pcs', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'G Wt.', datafield : 'grossWeight', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'N Wt.', datafield : 'netWeight', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Pure Wt', datafield : 'pureWt', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Wastage Wt', datafield : 'wastageWeight', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Diamond Wt', datafield : 'diamondWeight', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Value in Rs', datafield : 'valInRs', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Metal Rate', datafield : 'metalRate', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Labour Charges', datafield : 'labourCharges', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Remarks', datafield : 'remarks', width : '4.5%', cellsalign : 'left', align : 'left', editable : false, sortable : false},
			{ text : 'GRV Ref Type', datafield : 'mrvReferenceType', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg', datafield : 'segment', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			//{ text : 'GRV Acc Ref Purity', datafield : 'mrvAssRefPurity', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'GRV Bill Amt', datafield : 'mrvBillAmt', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			//{ text : 'GRV PSR Bulk Flag', datafield : 'mrvPsrBulkFlag', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV Period', datafield : 'mrvConPeriod', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			//{ text : 'GRV Cons Y/N', datafield : 'mrvConsYorN', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV Status', datafield : 'mrvStatus', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Sl No', datafield : 'refSrlNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Std Rate', datafield : 'stanRate', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			
			{ text : '', datafield : 'hsnSacCodeFlag', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'cgstpercFlag', width : '3.5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'sgstpercFlag', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'igstpercFlag', width : '4.5%', cellsalign : 'left', align : 'left', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'cesspercFlag', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'editFlag', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
		]
	});
}



//RM Details View Grid
var editRmDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'mrvSrialNo', type : 'int'}, 
			{name : 'materialType', type : 'string'},
			{name: 'psrNo', type: 'int'},
			{name : 'metalAccLocation', type : 'string'},
			{name : 'refType', type : 'string'},
			{name : 'refNo', type : 'int'},
			{name : 'refSerialNo', type : 'int'},
			{name : 'partyBillNo', type : 'string'},
			{name : 'partyBillDate', type : 'string'},
			{name : 'skinPurity', type : 'float'},
			
			{name : 'pcs', type : 'int'}, 
			{name : 'grossWeight', type : 'float'},
			{name: 'netWeight', type: 'float'},
			{name : 'wastageWeight', type : 'float'},
			{name : 'diamondWeight', type : 'float'},
			{name : 'valInRs', type : 'float','map':'valueInRs'},
			{name : 'metalRate', type : 'float'},
			{name : 'labourCharges', type : 'float'},
			{name : 'remarks', type : 'string'},
			{name : 'mrvReferenceType', type : 'string'},
			{name : 'segment', type : 'string','map':'segmentDTO>description'},
			
			{name : 'mrvAssRefPurity', type : 'float'}, 
			{name : 'mrvBillAmt', type : 'float'},
			{name: 'mrvPsrBulkFlag', type: 'string'},
			{name : 'mrvConPeriod', type : 'int'},
			{name : 'mrvConsYorN', type : 'string'},
			{name : 'melPurity', type : 'float'},
			{name : 'mrvStatus', type : 'string'},
			{name : 'pureWt', type : 'float'},
			{name : 'refSrlNo', type : 'int'},
			{name : 'stanRate', type : 'float'},
			{name : 'mSegment', type : 'string'},
			{name : 'hsnSacCode', type : 'string'},
			{name : 'cgstperc', type : 'float'},
			{name : 'sgstperc', type : 'float'},
			{name : 'igstperc', type : 'float'},
			{name : 'cessperc', type : 'float'},
			{name : 'mrvDetailId', type : 'int'},
			
			{name : 'hsnSacCodeFlag', type : 'string'},
			{name : 'cgstpercFlag', type : 'string'},
			{name : 'sgstpercFlag', type : 'string'},
			{name : 'igstpercFlag', type : 'string'},
			{name : 'cesspercFlag', type : 'string'},
			
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#editRmGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
        columnsheight: 71,
        columnsresize: true,
        editable : true,
		theme: 'energyblue',
		rowsheight : 35,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'GRV Sl No', datafield : 'mrvSrialNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Mat Type', datafield : 'materialType', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'M.Seg', datafield : 'mSegment', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},	
			{ text : 'PSR No', datafield : 'psrNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Acc Loc', datafield : 'metalAccLocation', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Type', datafield : 'refType', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref No', datafield : 'refNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Sl No', datafield : 'refSerialNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Party Bill No', datafield : 'partyBillNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Party Bill Date', datafield : 'partyBillDate', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'dd/MM/yyyy'},
			{ text : 'M Purity', datafield : 'melPurity', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'S Purity', datafield : 'skinPurity', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			
			{ text : 'HSN/SAC Code', datafield : 'hsnSacCode', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					 var hsnSacCodeFlag = jQuery('#editRmGrid').jqxGrid ('getCell', row, 'hsnSacCodeFlag');
				 	if(hsnSacCodeFlag.value == "true"){
				 		if(newvalue == null){
				 			$("#updateMrvDet").prop('disabled',true);
					 		$.growl.error({
					 			message : "HSN/SAC Code is Mandatory !!!",
					 			duration :  1000,
					 			title : 'Error'
					 		});
					 		return "";
				 		}else if(newvalue != null){
					 		$("#updateMrvDet").prop('disabled',false);
				 		}
				 	}
				}
			},
			{ text : 'CGST %', datafield : 'cgstperc', width : '3.5%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging: checkTaxPerEditRM
			},
			{ text : 'SGST %', datafield : 'sgstperc', width : '4%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging: checkTaxPerEditRM
			},
			{ text : 'IGST %', datafield : 'igstperc', width : '4.5%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging: checkTaxPerEditRM
			},
			{ text : 'CESS %', datafield : 'cessperc', width : '4%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging: checkTaxPerEditRM
			},
			{ text : '', datafield : 'mrvDetailId', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden : true},
			
			{ text : 'Pcs', datafield : 'pcs', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'G Wt.', datafield : 'grossWeight', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'N Wt.', datafield : 'netWeight', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Pure Wt', datafield : 'pureWt', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Wastage Wt', datafield : 'wastageWeight', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Diamond Wt', datafield : 'diamondWeight', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Value in Rs', datafield : 'valInRs', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Metal Rate', datafield : 'metalRate', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Labour Charges', datafield : 'labourCharges', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Remarks', datafield : 'remarks', width : '4.5%', cellsalign : 'left', align : 'left', editable : false, sortable : false},
			{ text : 'GRV Ref Type', datafield : 'mrvReferenceType', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg', datafield : 'segment', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			//{ text : 'GRV Acc Ref Purity', datafield : 'mrvAssRefPurity', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'GRV Bill Amt', datafield : 'mrvBillAmt', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			//{ text : 'GRV PSR Bulk Flag', datafield : 'mrvPsrBulkFlag', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV Period', datafield : 'mrvConPeriod', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			//{ text : 'GRV Cons Y/N', datafield : 'mrvConsYorN', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV Status', datafield : 'mrvStatus', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Sl No', datafield : 'refSrlNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Std Rate', datafield : 'stanRate', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			
			{ text : '', datafield : 'hsnSacCodeFlag', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'cgstpercFlag', width : '3.5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'sgstpercFlag', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'igstpercFlag', width : '4.5%', cellsalign : 'left', align : 'left', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'cesspercFlag', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			
		]
	});
}

//RM Details View Grid
var editServiceDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'hsnSacCode', type : 'string'},
			{name : 'cgstperc', type : 'float'},
			{name : 'sgstperc', type : 'float'},
			{name : 'igstperc', type : 'float'},
			{name : 'cessperc', type : 'float'},
			{name : 'mrvDetailId', type : 'int'},
			
			{name : 'hsnSacCodeFlag', type : 'string'},
			{name : 'cgstpercFlag', type : 'string'},
			{name : 'sgstpercFlag', type : 'string'},
			{name : 'igstpercFlag', type : 'string'},
			{name : 'cesspercFlag', type : 'string'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#editServicesDetGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
        columnsheight: 71,
        columnsresize: true,
        editable : true,
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'HSN/SAC Code', datafield : 'hsnSacCode', width : '20%', cellsalign : 'center', align : 'center', editable : true, sortable : false,
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					 var hsnSacCodeFlag = jQuery('#editServicesDetGrid').jqxGrid ('getCell', row, 'hsnSacCodeFlag');
				 	if(hsnSacCodeFlag.value == "true"){
				 		if(newvalue == null){
				 			$("#updateMrvDet").prop('disabled',true);
					 		$.growl.error({
					 			message : "HSN/SAC Code is Mandatory !!!",
					 			duration :  1000,
					 			title : 'Error'
					 		});
					 		return "";
				 		}else if(newvalue != null){
					 		$("#updateMrvDet").prop('disabled',false);
				 		}
				 	}
				}
			},
			{ text : 'CGST %', datafield : 'cgstperc', width : '20%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging: checkTaxPerEditService
			},
			{ text : 'SGST %', datafield : 'sgstperc', width : '20%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging: checkTaxPerEditService
			},
			{ text : 'IGST %', datafield : 'igstperc', width : '20%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging: checkTaxPerEditService
			},
			{ text : 'CESS %', datafield : 'cessperc', width : '20%', cellsalign : 'right', align : 'center', editable : true, sortable : false,cellsformat : 'd2',
				cellvaluechanging: checkTaxPerEditService
			},
			{ text : '', datafield : 'mrvDetailId', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden : true,cellsformat : 'd2'},
			
			{ text : '', datafield : 'hsnSacCodeFlag', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'cgstpercFlag', width : '3.5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'sgstpercFlag', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'igstpercFlag', width : '4.5%', cellsalign : 'left', align : 'left', editable : true, sortable : false,hidden: true},
			{ text : '', datafield : 'cesspercFlag', width : '4%', cellsalign : 'center', align : 'center', editable : true, sortable : false,hidden: true},
			]
	});
}

var viewMrvDet = function(id) {
	
	$("#mrvSearch").hide();
	$("#mrvView").show();
	$("#mrvEdit").hide();
	$.getJSON('/OrderExecution/api/v1/viewMRVDetails?mrvNo=' + id, function(data) {
		var fg = data.payload.fgDetails;	
		var rm = data.payload.rmDetails;
		var stone = data.payload.stoneDetails;
		viewFgDetGrid(fg);
		viewRmDetGrid(rm);
		viewStoneDetGrid(stone);
	});
 }

var mrvNum ;
var editMrvDet = function(id) {
	 $("#mrvSearch").hide();
	 $("#mrvView").hide();
	 $("#mrvEdit").show();
	 mrvNum = id;
		$.getJSON('/OrderExecution/api/v1/viewMRVDetails?mrvNo=' + id, function(data) {
			var fg = data.payload.fgDetails;
			editFgDetGrid(fg);
			var rm = data.payload.rmDetails;
			editRmDetGrid(rm);
			var serviceDet = data.payload.serviceDetails;
			editServiceDetGrid(serviceDet);
			var grvType;
			var headerDet = data.payload.headerDetails;
			var rows = $('#jqxgrid').jqxGrid('getrows');
			$.each(rows,function(k,v){
				if(v.mrvSrialNo == id){
					grvType = v.mrvType
				}
			});
			if(headerDet.invceAmntbeforeTax != null){ $("#invAmtE").val(headerDet.invceAmntbeforeTax.toFixed(2)); }
			if(headerDet.cgstAmnt != null){ $("#cgstAmtE").val(headerDet.cgstAmnt.toFixed(2)); }
			if(headerDet.sgstAmnt != null){ $("#sgstAmtE").val(headerDet.sgstAmnt.toFixed(2)); }
			if(headerDet.igstAmnt != null){ $("#igstAmtE").val(headerDet.igstAmnt.toFixed(2)); }
			if(headerDet.cessAmnt != null){ $("#cessAmtE").val(headerDet.cessAmnt.toFixed(2)); }
			$("#grvTypeE").val(grvType);
		});
 }

var getMrvEditDet = function(){
	var mrvdtos = [];
	var fgDet = $("#editFgGrid").jqxGrid('getrows');
	var rmDet =  $("#editRmGrid").jqxGrid('getrows');
	var serviceDet = $("#editServicesDetGrid").jqxGrid('getrows');
	for (var i = 0; i < fgDet.length; i++) {
		var fgDetailsE = {
			      "mrvDetailId": parseInt(fgDet[i].mrvDetailId),
			      "hsnSacCode": fgDet[i].hsnSacCode,
			      "cgstperc": parseFloat(fgDet[i].cgstperc),
			      "sgstperc": parseFloat(fgDet[i].sgstperc), 
			      "igstperc": parseFloat(fgDet[i].igstperc),
			      "cessperc": parseFloat(fgDet[i].cessperc)
			    }
		if(fgDet != "undefined" || fgDet.length != 0 ){
			mrvdtos.push(fgDetailsE);
		}
	}
	for (var i = 0; i < rmDet.length; i++) {
		var rmDetailsE = {
			      "mrvDetailId": parseInt(rmDet[i].mrvDetailId),
			      "hsnSacCode":rmDet[i].hsnSacCode,
			      "cgstperc": parseFloat(rmDet[i].cgstperc),
			      "sgstperc": parseFloat(rmDet[i].sgstperc), 
			      "igstperc": parseFloat(rmDet[i].igstperc),
			      "cessperc": parseFloat(rmDet[i].cessperc)
			      
			    }
			if(rmDet != "undefined" || rmDet.length != 0 ){
			mrvdtos.push(rmDetailsE);
			}
		}
	for (var i = 0; i < serviceDet.length; i++) {
		var servDetailsE = {
			      "mrvDetailId": parseInt(serviceDet[i].mrvDetailId),
			      "hsnSacCode": serviceDet[i].hsnSacCode,
			      "cgstperc": parseFloat(serviceDet[i].cgstperc),
			      "sgstperc": parseFloat(serviceDet[i].sgstperc), 
			      "igstperc": parseFloat(serviceDet[i].igstperc),
			      "cessperc": parseFloat(serviceDet[i].cessperc)
			    }
		if(serviceDet != "undefined" || serviceDet.length != 0 ){
			mrvdtos.push(servDetailsE);
		}
	}
	 var headerDetails = {
	      "invceAmntbeforeTax":$("#invAmtE").val(),
	      "cgstAmnt": parseFloat($("#cgstAmtE").val()),
	      "sgstAmnt": parseFloat($("#sgstAmtE").val()),
	      "igstAmnt": parseFloat($("#igstAmtE").val()),
	      "cessAmnt": parseFloat($("#cessAmtE").val()),
	      "mrvvNo": mrvNum,
	      "mrvdtos" : mrvdtos
	    }
	 return headerDetails;
}

$("#updateMrvDet").on('click',function(){
	var updateDetails = getMrvEditDet();
	var fgDetE = $("#editFgGrid").jqxGrid('getrows');
	var rmDetE =  $("#editRmGrid").jqxGrid('getrows');
	var serviceDetE = $("#editServicesDetGrid").jqxGrid('getrows');
	var grvTypeE = $("#grvTypeE").val();
	console.log(grvTypeE);
	
	// FG
	for (var i = 0; i < fgDetE.length; i++) {
		if( fgDetE[i].hsnSacCode == null ||  fgDetE[i].hsnSacCode == "" ){
			$.growl.error({
				message : "Please Enter HSN/SAC Code for Finished Goods!!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		
				
		if(grvTypeE !="Sub-Contract" &&  (fgDetE[i].igstperc == null || fgDetE[i].igstperc == "" || fgDetE[i].igstper == 0) &&  (fgDetE[i].cgstperc == null || fgDetE[i].cgstperc ==  0)  && (fgDetE[i].sgstperc == null || fgDetE[i].sgstperc == 0)){
			$.growl.error({
				message : "Please enter either IGST / CGST & SGST value!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		
		if(fgDetE[i].igstperc == null || fgDetE[i].igstperc == "" || fgDetE[i].igstper == 0){
			if((fgDetE[i].cgstperc >  0  && (fgDetE[i].sgstperc == null || fgDetE[i].sgstperc == 0)) || (fgDetE[i].sgstperc >  0  && (fgDetE[i].cgstperc == null || fgDetE[i].cgstperc == 0))){
				$.growl.error({
					message : "Please enter either IGST / CGST & SGST value!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
		
	}
	
	// RM
	for (var i = 0; i < rmDetE.length; i++) {
		if(rmDetE[i].hsnSacCode == null || rmDetE[i].hsnSacCode == "" ){
			$.growl.error({
				message : "Please Enter HSN/SAC Code for Raw Materials!!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		
		if(grvTypeE !="Sub-Contract" &&  (fgDetE[i].igstperc == null || fgDetE[i].igstperc == "" || fgDetE[i].igstper == 0) &&  (fgDetE[i].cgstperc == null || fgDetE[i].cgstperc ==  0)  && (fgDetE[i].sgstperc == null || fgDetE[i].sgstperc == 0)){
			$.growl.error({
				message : "Please enter either IGST / CGST & SGST value!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		
		if(grvTypeE !="Sub-Contract" &&  (fgDetE[i].igstperc == null || fgDetE[i].igstperc == "" || fgDetE[i].igstper == 0)){
			if((fgDetE[i].cgstperc >  0  && (fgDetE[i].sgstperc == null || fgDetE[i].sgstperc == 0)) || (fgDetE[i].sgstperc >  0  && (fgDetE[i].cgstperc == null || fgDetE[i].cgstperc == 0))){
				$.growl.error({
					message : "Please enter either IGST / CGST & SGST value!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
		
	}
	
	// Services
	for (var i = 0; i < serviceDetE.length; i++) {
		if(serviceDetE[i].hsnSacCode == null || serviceDetE[i].hsnSacCode == ""){
			$.growl.error({
				message : "Please Enter HSN/SAC Code for Services!!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		
		if(grvTypeE !="Sub-Contract" &&  (fgDetE[i].igstperc == null || fgDetE[i].igstperc == "" || fgDetE[i].igstper == 0) &&  (fgDetE[i].cgstperc == null || fgDetE[i].cgstperc ==  0)  && (fgDetE[i].sgstperc == null || fgDetE[i].sgstperc == 0)){
			$.growl.error({
				message : "Please enter either IGST / CGST & SGST value!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		
		if(grvTypeE !="Sub-Contract" &&  (fgDetE[i].igstperc == null || fgDetE[i].igstperc == "" || fgDetE[i].igstper == 0)){
			if((fgDetE[i].cgstperc >  0  && (fgDetE[i].sgstperc == null || fgDetE[i].sgstperc == 0)) || (fgDetE[i].sgstperc >  0  && (fgDetE[i].cgstperc == null || fgDetE[i].cgstperc == 0))){
				$.growl.error({
					message : "Please enter either IGST / CGST & SGST value!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
			
	}
	
	postJSON('/OrderExecution/api/v1/editMrvDetail',JSON.stringify(updateDetails),function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$("#mrvSearch").show();
			$("#mrvView").hide();
			$("#mrvEdit").hide();
			return true;
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
});


//  Grids Started
//FG Details View Grid
var viewFgDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'mrvSrialNo', type : 'int'}, 
			{name : 'materialType', type : 'string'},
			{name: 'psrNo', type: 'int'},
			{name : 'metalAccLocation', type : 'string'},
			{name : 'refType', type : 'string'},
			{name : 'refNo', type : 'int'},
			{name : 'refSerialNo', type : 'int'},
			{name : 'partyBillNo', type : 'string'},
			{name : 'partyBillDate', type : 'date'},
			{name : 'skinPurity', type : 'flaot'},
			
			{name : 'pcs', type : 'int'}, 
			{name : 'grossWeight', type : 'flaot'},
			{name: 'netWeight', type: 'flaot'},
			{name : 'wastageWeight', type : 'float'},
			{name : 'diamondWeight', type : 'float'},
			{name : 'valInRs', type : 'float','map':'valueInRs'},
			{name : 'metalRate', type : 'float'},
			{name : 'labourCharges', type : 'float'},
			{name : 'remarks', type : 'string'},
			{name : 'mrvReferenceType', type : 'string'},
			{name : 'segment', type : 'string','map':'segmentDTO>description'},
			
			{name : 'mrvAssRefPurity', type : 'flaot'}, 
			{name : 'mrvBillAmt', type : 'flaot'},
			{name: 'mrvPsrBulkFlag', type: 'string'},
			{name : 'mrvConPeriod', type : 'int'},
			{name : 'mrvConsYorN', type : 'string'},
			{name : 'melPurity', type : 'float'},
			{name : 'mrvStatus', type : 'string'},
			{name : 'pureWt', type : 'flaot'},
			{name : 'refSrlNo', type : 'int'},
			{name : 'stanRate', type : 'float'},
			{name : 'mSegment', type : 'string'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewFgGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
        columnsheight: 70,
        columnsresize: true,  
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'GRV Sl No', datafield : 'mrvSrialNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Mat Type', datafield : 'materialType', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'M.Seg', datafield : 'mSegment', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'PSR No', datafield : 'psrNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Acc Loc', datafield : 'metalAccLocation', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Type', datafield : 'refType', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref No', datafield : 'refNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Sl No', datafield : 'refSerialNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Party Bill No', datafield : 'partyBillNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Party Bill Date', datafield : 'partyBillDate', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'dd/MM/yyyy'},
			{ text : 'M Purity', datafield : 'melPurity', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'S Purity', datafield : 'skinPurity', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			
			{ text : 'Pcs', datafield : 'pcs', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'G Wt.', datafield : 'grossWeight', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'N Wt.', datafield : 'netWeight', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Pure Wt', datafield : 'pureWt', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Wastage Wt', datafield : 'wastageWeight', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Diamond Wt', datafield : 'diamondWeight', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Value in Rs', datafield : 'valInRs', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Metal Rate', datafield : 'metalRate', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Labour Charges', datafield : 'labourCharges', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Remarks', datafield : 'remarks', width : '4.5%', cellsalign : 'left', align : 'left', editable : false, sortable : false},
			{ text : 'GRV Ref Type', datafield : 'mrvReferenceType', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg', datafield : 'segment', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			//{ text : 'GRV Acc Ref Purity', datafield : 'mrvAssRefPurity', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'GRV Bill Amt', datafield : 'mrvBillAmt', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			//{ text : 'GRV PSR Bulk Flag', datafield : 'mrvPsrBulkFlag', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV Period', datafield : 'mrvConPeriod', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			//{ text : 'GRV Cons Y/N', datafield : 'mrvConsYorN', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'GRV Status', datafield : 'mrvStatus', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Ref Sl No', datafield : 'refSrlNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Std Rate', datafield : 'stanRate', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			
		]
	});
}

	
//RM Details View Grid
var viewRmDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'mrvSrialNo', type : 'int'}, 
			{name : 'materialType', type : 'string'},
			{name: 'psrNo', type: 'int'},
			{name : 'metalAccLocation', type : 'string'},
			{name : 'refType', type : 'string'},
			{name : 'refNo', type : 'int'},
			{name : 'refSerialNo', type : 'int'},
			{name : 'partyBillNo', type : 'string'},
			{name : 'partyBillDate', type : 'string'},
			{name : 'skinPurity', type : 'flaot'},
			
			{name : 'pcs', type : 'int'}, 
			{name : 'grossWeight', type : 'flaot'},
			{name: 'netWeight', type: 'flaot'},
			{name : 'wastageWeight', type : 'float'},
			{name : 'diamondWeight', type : 'float'},
			{name : 'valInRs', type : 'float','map':'valueInRs'},
			{name : 'metalRate', type : 'float'},
			{name : 'labourCharges', type : 'float'},
			{name : 'remarks', type : 'string'},
			{name : 'mrvReferenceType', type : 'string'},
			{name : 'segment', type : 'string','map':'segmentDTO>description'},
			
			{name : 'mrvAssRefPurity', type : 'flaot'}, 
			{name : 'mrvBillAmt', type : 'flaot'},
			{name: 'mrvPsrBulkFlag', type: 'string'},
			{name : 'mrvConPeriod', type : 'int'},
			{name : 'mrvConsYorN', type : 'string'},
			{name : 'melPurity', type : 'float'},
			{name : 'mrvStatus', type : 'string'},
			{name : 'pureWt', type : 'flaot'},
			{name : 'refSrlNo', type : 'int'},
			{name : 'stanRate', type : 'float'},
			{name : 'mSegment', type : 'string'},
			
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewRmGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
        columnsheight: 71,
        columnsresize: true,  
		rowsheight : 35,
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'GRV Sl No', datafield : 'mrvSrialNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Mat Type', datafield : 'materialType', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'M.Seg', datafield : 'mSegment', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},	
			{ text : 'PSR No', datafield : 'psrNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Acc Loc', datafield : 'metalAccLocation', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Type', datafield : 'refType', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref No', datafield : 'refNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Sl No', datafield : 'refSerialNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Party Bill No', datafield : 'partyBillNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Party Bill Date', datafield : 'partyBillDate', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'dd/MM/yyyy'},
			{ text : 'M Purity', datafield : 'melPurity', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'S Purity', datafield : 'skinPurity', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			
			{ text : 'Pcs', datafield : 'pcs', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'G Wt.', datafield : 'grossWeight', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'N Wt.', datafield : 'netWeight', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Wastage Wt', datafield : 'wastageWeight', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Diamond Wt', datafield : 'diamondWeight', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Value in Rs', datafield : 'valInRs', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Metal Rate', datafield : 'metalRate', width : '3.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Labour Charges', datafield : 'labourCharges', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Remarks', datafield : 'remarks', width : '4.5%', cellsalign : 'left', align : 'left', editable : false, sortable : false},
			{ text : 'GRV Ref Type', datafield : 'mrvReferenceType', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg', datafield : 'segment', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			//{ text : 'GRV Acc Ref Purity', datafield : 'mrvAssRefPurity', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'GRV Bill Amt', datafield : 'mrvBillAmt', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			//{ text : 'GRV PSR Bulk Flag', datafield : 'mrvPsrBulkFlag', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GRV Period', datafield : 'mrvConPeriod', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			//{ text : 'GRV Cons Y/N', datafield : 'mrvConsYorN', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'GRV Status', datafield : 'mrvStatus', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Pure Wt', datafield : 'pureWt', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Ref Sl No', datafield : 'refSrlNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Std Rate', datafield : 'stanRate', width : '3%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			
		]
	});
}


//Stone Details View Grid
var viewStoneDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'matType', type : 'string','map' :'materialType'}, 
			{name : 'metAccLoc', type : 'string','map' :'metalAccLocation'},
			{name: 'refTyp', type: 'string','map' :'refType'},
			{name : 'sPurity', type : 'float','map' :'skinPurity'},
			{name : 'gwt', type : 'float','map' : 'grossWeight'},
			{name : 'nwt', type : 'float','map' : 'netWeight'},
			{name : 'pwt', type : 'float','map' :'pureWt'},
			{name : 'segment', type : 'string','map':'segmentDTO>description'},
			{name : 'stCode', type : 'string','map' : 'stoneCode'},
			{name : 'uom', type : 'string','map' : 'uom'},
			{name : 'id', type : 'int'},
			
			
			{name : 'stMrvSlNo', type : 'int','map':'mrvSrialNo'}, 
			{name : 'sPsrNo', type : 'int','map':'psrNo'},
			{name: 'sRefNo', type: 'int','map':'refNo'},
			{name : 'sRefSlNo', type : 'int','map':'refSerialNo'},
			{name : 'sPBillNo', type : 'string','map':'partyBillNo'},
			{name : 'sPBillDt', type : 'string','map':'partyBillDate'},
			{name : 'sPcs', type : 'int','map':'pcs'},
			{name : 'sWastgWt', type : 'float','map':'wastageWeight'},
			{name : 'sDiamondWt', type : 'float','map':'diamondWeight'},
			{name : 'sMetalRate', type : 'float','map':'metalRate'},
			
			
			{name : 'sLabrChrgs', type : 'float','map':'labourCharges'}, 
			{name : 'sRemrks', type : 'string','map':'remarks'},
			{name: 'sMrvRefType', type: 'string','map':'mrvReferenceType'},
			{name : 'sMrvAssRefPurity', type : 'float','map':'mrvAssRefPurity'},
			{name : 'sMrvBillAmt', type : 'long','map':'mrvBillAmt'},
			{name : 'sMrvPsrBulkFlag', type : 'string','map':'mrvPsrBulkFlag'},
			{name : 'sMrvConPerd', type : 'int','map':'mrvConPeriod'},
			{name : 'sMrvConsYN', type : 'string','map':'mrvConsYorN'},
			{name : 'sMPurity', type : 'long','map':'melPurity'},
			{name : 'refSrlNo', type : 'int','map':'refSrlNo'},
			
			
			{name : 'sStdRate', type : 'float','map':'stanRate'}, 
			{name : 'compStPcs', type : 'int','map':'compStonePcs'},
			{name: 'compStWt', type: 'float','map':'compStoneWt'},
			{name : 'custStPcs', type : 'int','map':'custStonePcs'},
			{name : 'custStWt', type : 'float','map':'custStoneWt'},
			{name : 'sSubCatDesc', type : 'string','map':'stoneSubCatDesc'},
			{name : 'stLoc', type : 'string','map':'stoneLoc'},
			{name : 'stPcktNo', type : 'int','map':'stonePcketNo'},
			{name : 'stSlNo', type : 'string','map':'stoneSrlNo'},
			{name : 'stAmt', type : 'float','map':'stoneAmnt'},
			
			{name : 'stCondtn', type : 'string','map':'stoneCondition'}, 
			{name : 'vendStPcs', type : 'int','map':'vendorStonePcs'},
			{name: 'vendStWt', type: 'long','map':'vendorStoneWt'},
			{name : 'color', type : 'string','map':'color'},
			{name : 'clarity', type : 'string','map':'clarity'},
			{name : 'cutGrade', type : 'string','map':'cutGrade'},
			{name : 'stoneCat', type : 'string','map':'stoneCategory'},
			{name : 'wtRange', type : 'string','map':'weightRange'},
			{name : 'mrvStatus', type : 'string','map':'mrvStatus'},
			{name : 'shape', type : 'string','map' : 'shape'},
			{name : 'suppBy', type : 'string','map':'suppliedBy'},
			{name : 'subCatDesc', type : 'string','map':'subCatDesc'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewStoneDetGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 65,
		autorowheight : false,
		theme: 'energyblue',
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Material Type', datafield : 'matType', width : '13%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Segment', datafield : 'segment', width : '13%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Code', datafield : 'stCode', width : '13%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Sub Cat. Desc.', datafield : 'subCatDesc', width : '13%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Metal Acc Loc', datafield : 'metAccLoc', width : '13%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{ text : 'Ref Type', datafield : 'refTyp', width : '13%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			//{ text : 'Skin Purity', datafield : 'sPurity', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			//{ text : 'Gross Wt', datafield : 'gwt', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Stone Wt', datafield : 'nwt', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			//{ text : 'Pure Wt', datafield : 'pwt', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'UQC', datafield : 'uom', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : '', datafield : 'id', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsrenderer : stoneDetails},
			
			{ text : 'GRV Sl No', datafield : 'stMrvSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'PSR No', datafield : 'sPsrNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Ref No', datafield : 'sRefNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Ref Sl No', datafield : 'sRefSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Party Bill No', datafield : 'sPBillNo', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Party Bill Date', datafield : 'sPBillDt', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'dd/MM/yyyy',hidden : true},
			{ text : 'Pcs', datafield : 'sPcs', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Wastage Wt', datafield : 'sWastgWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3',hidden : true},
			{ text : 'Diamond Wt', datafield : 'sDiamondWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3',hidden : true},
			{ text : 'Metal Rate', datafield : 'sMetalRate', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',hidden : true},
			
			{ text : 'Labour Charges', datafield : 'sLabrChrgs', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',hidden : true},
			{ text : 'Remarks', datafield : 'sRemrks', width : '10%', cellsalign : 'left', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'GRV Ref Type', datafield : 'sMrvRefType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'GRV Acc Ref Purity', datafield : 'sMrvAssRefPurity', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2',hidden : true},
			{ text : 'GRV Bill Amt', datafield : 'sMrvBillAmt', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2',hidden : true},
			{ text : 'GRV PSR Bulk Flag', datafield : 'sMrvPsrBulkFlag', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'GRV Con Period', datafield : 'sMrvConPerd', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'GRV Cons Y/N', datafield : 'sMrvConsYN', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Melting Purity', datafield : 'sMPurity', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2',hidden : true},
			{ text : 'Ref Sl No', datafield : 'refSrlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			
			{ text : 'Std Rate', datafield : 'sStdRate', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',hidden : true},
			{ text : 'Comp Stn Pcs', datafield : 'compStPcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Comp Stn Wt', datafield : 'compStWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3',hidden : true},
			{ text : 'Cust Stn Pcs', datafield : 'custStPcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Cust Stn Wt', datafield : 'custStWt', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3',hidden : true},
			{ text : 'Sub Cat Desc', datafield : 'sSubCatDesc', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'St Loc', datafield : 'stLoc', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Stone Pckt No', datafield : 'stPcktNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Stone Sl No', datafield : 'stSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Stone Amt', datafield : 'stAmt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',hidden : true},
			
			{ text : 'Stone Condition', datafield : 'stCondtn', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Vend Stn Pcs', datafield : 'vendStPcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Vend Stn Wt', datafield : 'vendStWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Color', datafield : 'color', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Clarity', datafield : 'clarity', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Stone Category', datafield : 'stoneCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Weight Range', datafield : 'wtRange', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'GRV Status', datafield : 'mrvStatus', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Shape', datafield : 'shape', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Supp By', datafield : 'suppBy', width : '3.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},			
		]
	});
}


var stoneDetails = function(row, column, value) {
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#addStoneDet"  type="button" id='
			+ row
			+ ' onclick="showStoneDets('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>'
}

var showStoneDets = function() {
	var rows = $("#viewStoneDetGrid").jqxGrid('getrows');
	var selectedrowindex = $("#viewStoneDetGrid").jqxGrid('getselectedrowindex');	
	for (var i = 0; i < rows.length; i++) {
		if(rows[selectedrowindex].stAmt != null){
		var stAmt = (rows[selectedrowindex].stAmt).toFixed(2);}
		else{}
		
		if(rows[selectedrowindex].sMrvAssRefPurity != null){
		var mrvRefPurity = (rows[selectedrowindex].sMrvAssRefPurity).toFixed(2);}else{}
		
		if(rows[selectedrowindex].compStWt != null){
			var companyStWt = (rows[selectedrowindex].compStWt).toFixed(3);}else{}
			
		
		$("#mrvSlNo").val(rows[selectedrowindex].stMrvSlNo);
		$("#psrNo").val(rows[selectedrowindex].sPsrNo);
		$("#refNo").val(rows[selectedrowindex].sRefNo);
		$("#refSlNo").val(rows[selectedrowindex].sRefSlNo);
		$("#pBillNo").val(rows[selectedrowindex].sPBillNo);
		$("#pBillDate").val(rows[selectedrowindex].sPBillDt);
		
		$("#pcs").val(rows[selectedrowindex].sPcs);
		$("#wstgWt").val(rows[selectedrowindex].sWastgWt);
		$("#diamondWt").val(rows[selectedrowindex].sDiamondWt);
		$("#metalRate").val(rows[selectedrowindex].sMetalRate);
		$("#labrCharge").val(rows[selectedrowindex].sLabrChrgs);
		$("#remarks").val(rows[selectedrowindex].sRemrks);
		
		$("#mrvRefType").val(rows[selectedrowindex].sMrvRefType);
		$("#mrvRefPurity").val(mrvRefPurity);
		$("#mrvBillAmt").val(rows[selectedrowindex].sMrvBillAmt);
		$("#mrvPsrBulkFlag").val(rows[selectedrowindex].sMrvPsrBulkFlag);
		$("#mrvConPeriod").val(rows[selectedrowindex].sMrvConPerd);
		$("#mrvConsYorN").val(rows[selectedrowindex].sMrvConsYN);
		
		$("#mPurity").val(rows[selectedrowindex].sMPurity);
		$("#stdRate").val(rows[selectedrowindex].sStdRate);
		$("#compStonePcs").val(rows[selectedrowindex].compStPcs);
		$("#compStoneWt").val(companyStWt);
		$("#custStonePcs").val(rows[selectedrowindex].custStPcs);
		
		$("#custStoneWt").val(rows[selectedrowindex].custStWt);
		$("#stoneSubCatDesc").val(rows[selectedrowindex].sSubCatDesc);
		$("#stoneLoc").val(rows[selectedrowindex].stLoc);
		$("#stonePctNo").val(rows[selectedrowindex].stPcktNo);
		$("#stoneSrlNo").val(rows[selectedrowindex].stSlNo);
		$("#stoneAmt").val(stAmt);
		
		$("#stoneCondition").val(rows[selectedrowindex].stCondtn);
		$("#vendStonePcs").val(rows[selectedrowindex].vendStPcs);
		$("#vendStoneWt").val(rows[selectedrowindex].vendStWt);	
		$("#color").val(rows[selectedrowindex].color);
		$("#clarity").val(rows[selectedrowindex].clarity);
		$("#cutGrade").val(rows[selectedrowindex].cutGrade);
		
		$("#stoneCat").val(rows[selectedrowindex].stoneCat);
		$("#wtRange").val(rows[selectedrowindex].wtRange);
		$("#mrvStatus").val(rows[selectedrowindex].mrvStatus);
		$("#shape").val(rows[selectedrowindex].shape);
		$("#suppBy").val(rows[selectedrowindex].suppBy);
		}		
	 }
	
 
	
function mrvPrintcall(mrvNo,jtype,otype)
{
	/*if(mrvNo!=null && jtype=='B' && otype=='System')
		{
		fieldFilters = {
	            "fieldFilters" : {
	                "mrvNo" : mrvNo,
	                "mode" : "pdf",
	                "reportName" : "BullionListMRV"
	            }
	        };
		jasperReport('BullionListMRV.pdf', fieldFilters); 
		
		
		}	
	else if(mrvNo!=null && jtype=='M' && otype=='System')
	{
	fieldFilters = {
            "fieldFilters" : {
                "mrvNo" : mrvNo,
                "mode" : "pdf",
                "reportName" : "RPT_Melting_MRV"
            }
        };
	jasperReport('RPT_Melting_MRV.pdf', fieldFilters); 
	
	
	}	
	else if(mrvNo!=null && jtype=='A' && otype=='System')
	{
	fieldFilters = {
            "fieldFilters" : {
                "mrvNo" : mrvNo,
                "mode" : "pdf",
                "reportName" : "RPT_Assayer_MRV"
            }
        };
	jasperReport('RPT_Assayer_MRV.pdf', fieldFilters); 
	
	
	}	
	else if(mrvNo!=null && jtype=='R' && otype=='System')
	{
	fieldFilters = {
            "fieldFilters" : {
                "mrvNo" : mrvNo,
                "mode" : "pdf",
                "reportName" : "RPT_Refiner_MRV"
            }
        };
	jasperReport('RPT_Refiner_MRV.pdf', fieldFilters); 
	
	
	}	*/
	if(mrvNo!=null && (jtype=='S' || jtype=='D' || jtype=='C' || jtype=='H') && otype=='Regular')
	{
	fieldFilters = {
            "fieldFilters" : {
                "mrvNo" : mrvNo,
                "mode" : "pdf",
                "reportName" : "RPT_Goods_Receipt_Voucher_FSA"
            }
        };
	jasperReport('RPT_Goods_Receipt_Voucher_FSA.pdf', fieldFilters); 
	
	
	}else{
		$.growl.error({ message: "Please select print in respective listing pages!", duration: 5000, title: 'Error' });
		return false;
	}
	/*else if(mrvNo!=null && jtype=='S'  && otype=='System')
	{
	fieldFilters = {
            "fieldFilters" : {
                "mrvNo" : mrvNo,
                "mode" : "pdf",
                "reportName" : "MRV_From_Vendor"
            }
        };
	jasperReport('MRV_From_Vendor.pdf', fieldFilters); 
	
	
	}
	else if(mrvNo!=null && jtype=='D'  && otype=='System')
	{
	fieldFilters = {
            "fieldFilters" : {
                "mrvNo" : mrvNo,
                "mode" : "pdf",
                "reportName" : "RPT_Stone_Diamond_MRV"
            }
        };
	jasperReport('RPT_Stone_Diamond_MRV.pdf', fieldFilters); 
	
	
	}	*/
}


var mrvRenderer = function(row, column, value) {
	return '<a class="btn btn-sm btn-primary"  type="button"  onclick="addStoneOrAccDetails('+ value +')" href="#?id=' 
			+ value + '"/><i class="fa fa-print fa-lg"></i> Print </a>'
	
}

function addStoneOrAccDetails(row)
{
	var materialType = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'materialType');
	var stoneType = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'stoneType');
	var psrNo = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'psrNo');

	if(null == materialType.value){
		
		$.growl.error({ message: "Material Type mandatory", duration: 10000, title: 'Error'});
		
	}else if('S' == materialType.value && 'B' == stoneType.value && null  == psrNo.value){
		
		var stonedtos =  $("#stonegrid").jqxGrid('getrows');
		var mrvSrialNo = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'mrvSrialNo');
		
		$("#stonegrid").jqxGrid('addrow', null, generateMRVStonerow(mrvSrialNo.value, ++stSrl,row));
		
	}
	else if('S' == materialType.value && (null == stoneType.value)){
		
		$.growl.warning({ message: "Stone Type is mandatory for Material Type Stones", duration: 10000, title: 'warning' });
		
	}
	
	
}

 function mrvDetails() {
	 
	var mrvDetail = {
		"mrvdtos" : [],
		"stoneDTOs" : [],
		"accessoryDTOs": [],
		"mrvType":null,
		"vendorCode":null,
		"parcelId":null,
		"segment":null,
		"metalType":null,
		"gstinNo" : null,
		"state":{"id":null}
	};
	
	mrvDetail.stoneDTOs = $("#stonegrid").jqxGrid('getrows');
	mrvDetail.accessoryDTOs = $("#accgrid").jqxGrid('getrows');
	mrvDetail.mrvdtos = $("#jqxgrid").jqxGrid('getrows');
	mrvDetail.mrvType = $('#mrvType').val();
	mrvDetail.invceAmntbeforeTax = $("#invAmtC").val();
	mrvDetail.cgstAmnt = $("#cgstAmtC").val();
	mrvDetail.sgstAmnt = $("#sgstAmtC").val();
	mrvDetail.igstAmnt = $("#igstAmtC").val();
	mrvDetail.cessAmnt = $("#cessAmtC").val();
	mrvDetail.vendorCode = $('#vendorCode-value').val();
	mrvDetail.parcelId = $('#parcelId').val();
	mrvDetail.segment = $('#segment').val();
	mrvDetail.metalType = $('#metalTypeId').val();
	mrvDetail.gstinNo = $('#gstinNO').val();
	mrvDetail.state.id = ($("#vendRegisteredC").val() == "R")? $("#stateIdC").val() : $("#stateC").val()
	
	
	
	return mrvDetail;
}
 
 function addMRVDetails() {
		var mrvDetail = {
			"mrvdtos" : [],
			"stoneDTOs" : [],
			"accessoryDTOs": [],
			"mrvType":null,
			"vendorCode":null,
			"parcelId":null,
			"segment":null,
			"metalType":null
			
		};
		
		mrvDetail.vendorCode = $('#vendorCode-value').val();
		mrvDetail.parcelId = $('#parcelId').val();
		
		return mrvDetail;
	}


/* Material Receive Voucher */
 var checkTaxPer = function(row, datafield, columntype, oldvalue, newvalue, event){
	 var cgstperc = $("#jqxgrid").jqxGrid('getcellvalue', row, 'cgstperc');
	 var sgstperc = $("#jqxgrid").jqxGrid('getcellvalue', row, 'sgstperc');
	 var igstperc = $("#jqxgrid").jqxGrid('getcellvalue', row, 'igstperc');
	 var cessperc = $("#jqxgrid").jqxGrid('getcellvalue', row, 'cessperc');
	 
	 if(datafield == "cgstperc"){
		 if(igstperc > 0 && newvalue > 0){
			 $("#jqxgrid").jqxGrid('setcellvalue', row, 'cgstperc', 0.00);
			 $.growl.warning({ message:"Please enter either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }
	 
	 if(datafield == "sgstperc"){
		 if(igstperc > 0 && newvalue > 0){
			 $("#jqxgrid").jqxGrid('setcellvalue', row, 'sgstperc', 0.00);
			 $.growl.warning({ message:"Please enter either IGST / CGST & SGST value" , duration: 10000, title: 'Error' });
			 return false;
		 }
	 }
	 
	 if(datafield == "igstperc" && newvalue > 0){
		$("#jqxgrid").jqxGrid('setcellvalue', row, 'cgstperc', 0.00);
		$("#jqxgrid").jqxGrid('setcellvalue', row, 'sgstperc', 0.00);
		 
	 }
 
 }
 
var skinPurity ;
function mrvGrid()
{

	var updateRows = function(rowid, newdata, commit) {
		
	}
	
	var addrow =  function (rowid, rowdata, position, commit) {
        commit(true);
	}
	
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
	
	var segmentSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'description',
				type : 'string'
			} ],
			localdata : segment
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
			localdata : segment
		};

	var metalTypeDataAdapter = new $.jqx.dataAdapter(metalTypetSource, {
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
		name : 'mrvSrialNo',
		type : 'long'
	},{
		name : 'materialType',
		type : 'string'
	},{
		name : 'materialTypes',
		value : 'materialType',
		values : {
			source : materialTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	
	{
		name : 'stoneType',
		type : 'string'
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
		name : 'refType',
		type : 'string'
	}, {
		name : 'refNo',
		type : 'string'
	}, {
		name : 'refSerialNo',
		type : 'string'
	}, {
		name : 'metalAccLocation',
		type : 'string'
	}, {
		name : 'partyBillNo',
		type : 'string'
	}, {
		name : 'partyBillDate',
		type : 'string'
	},/* {
		name : 'skinPurity',
		type : 'decimal'
	},*/
	
	{
		name : 'skinPurity',
		type : 'string'
	},{
		name : 'skinPuritys',
		value : 'skinPurity',
		values : {
			source : skinPurityDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	
	
	{
		name : 'pcs',
		type : 'string'
	}, {
		name : 'grossWeight',
		type : 'decimal'
	}, {
		name : 'netWeight',
		type : 'decimal'
	}, {
		name: 'wastageWeight',
		type : 'decimal'
	}, {
		name : 'metalRate',
		type : 'decimal'
	}, {
		name : 'diamondWeight',
		type : 'decimal'
	}, {
		name : 'labourCharges',
		type : 'decimal'
	}, {
		name : 'valueInRs',
		type : 'decimal'
	}, {
		name : 'remarks',
		type : 'string'
	}, {
		name : 'hsnSacCode',
		type : 'string'
	},
	 {
		name : 'cgstperc',
		type : 'float'
	},
	 {
		name : 'sgstperc',
		type : 'float'
	},
	 {
		name : 'igstperc',
		type : 'float'
	},
	 {
		name : 'cessperc',
		type : 'float'
	},
	 {
		name : 'fromWtCost',
		type : 'float'
	},
	 {
		name : 'toWtCost',
		type : 'float'
	},
	{
		'name' : 'selectionStatus',
		'type' : 'bool'
	}];

	var columns = [
				
				{
					text : 'Sl. No.',
					datafield : 'mrvSrialNo',
					width : '2.5%',
					sortable : false,
					editable : false,
					cellsalign : 'center',
					align:'center',
				},
				{
					text : 'Material Type',
					datafield : 'materialType',
					//columntype : 'combobox',
					columntype : 'dropdownlist',
					displayfield : 'materialTypes',
					//cellbeginedit: checkForMRVType,
					editable : true,
					sortable : false,
					selectionmode: 'singlecell',
					'width' : '4.5%',
					/*createeditor : function(row, value, editor) {
						editor.jqxComboBox({
							source : materialTypeDataAdapter,
							displayMember : 'name',
							valueMember : 'id'
						});
					},*/
					createeditor : function(row, value, editor) {
						editor.on('click', function(event){	
						var mrvType = $("#mrvType").val();
						var matTypeArr = [];
						
						if(mrvType == "C" || mrvType == "H"){
							matTypeArr.push(materialType[3]);
						}
						else if(mrvType == "D"){
							var matTypeArry =  materialType[3] ;
							 var dataArr =  materialType[4] ;
							 matTypeArr.push(matTypeArry,dataArr) ;
						}
						else{
							 matTypeArr =  materialType ;
						}
						editor.jqxDropDownList({ source: matTypeArr , displayMember: 'name', valueMember: 'id'});	
						});
					},
					cellbeginedit : function(row){
						var materialType = $("#mrvType").val();
						if(materialType == "H"){
							return true;
						}else{
							return true;
						}
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						 $("#jqxgrid").jqxGrid('setcellvalue', row, "stoneType", null);
						 $("#jqxgrid").jqxGrid('setcellvalue', row, "stoneTypes", null);
						if(null !=   newvalue.value && ("A" ==  newvalue.value || "S" == newvalue.value)){
							
							$("#jqxgrid").jqxGrid('setcellvalue', row, "skinPurity", null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "pcs", null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "grossWeight", null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight", null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "wastageWeight", null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "diamondWeight", null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "labourCharges", null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "valueInRs", null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "metalRate", null);
							 
							 if("A" ==  newvalue.value){
									
								 $("#jqxgrid").jqxGrid('setcellvalue', row, "stoneType", "P");
								 $("#jqxgrid").jqxGrid('setcellvalue', row, "stoneTypes", "PSR");
								 
								 
							 }
							 if("SR" ==  newvalue.value &&  $("#mrvType").val() == "DE "|| $("#mrvType").val() == "H" ){
								 $.getJSON('/OrderExecution/api/v1/mrvLOV?page=hsnSacCode&mrvType='+$("#mrvType").val(),function(data)  {
										if(data.resCode == 1){
											// $("#jqxgrid").jqxGrid('setcellvalue', row, "hsnSacCode","");
										}
									});
							 }
							 return newvalue;
						}
						if(newvalue.value != null){
							if($("#mrvType").val() == "H"){
								 $("#jqxgrid").jqxGrid('setcellvalue', row, "refType", "GIV");
							}
						}
						
					}
					
				},
				{
					text : 'Stone Type',
					datafield : 'stoneType',
					columntype : 'combobox',
					displayfield : 'stoneTypes',
					editable : true,
					sortable : false,
					cellsalign : 'center',
					align:'center',
					cellbeginedit: checkForMetalType,
					'width' : '3%',
					initeditor : function(row, value, editor) {
						editor.jqxComboBox({
							source : stoneTypeDataAdapter,
							displayMember : 'name',
							valueMember : 'id'
						});
					},
					cellbeginedit : function(row){
						var materialType = $("#mrvType").val();
						var matType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
						console.log(matType);
						if(materialType == "H" || matType == "SR" || matType == "F"){
							return false;
						}else{
							return true;
						}
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						
					}
				},{
					text : 'Seg',
					datafield : 'segment',
					columntype : 'combobox',
					displayfield : 'segments',
					cellbeginedit: checkForMetalType,
					editable : true,
					sortable : false,
					cellsalign : 'center',
					align:'center',
					'width' : '4%',
					initeditor : function(row, value, editor) {
						editor.jqxComboBox({
							source : segmentDataAdapter,
							displayMember : 'description',
							valueMember : 'id'
						});
					},
					cellbeginedit : function(row){
						var materialType = $("#mrvType").val();
						var matType = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'materialType');
						
						if(materialType == "H"){
							return true;
						}else if(matType.value == "SR" || matType.value == "S")
							{return false;}
						else{
							return true;
						}
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						var materialType = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'materialType');
						
						 $("#jqxgrid").jqxGrid('setcellvalue', row, "skinPurity",null);
						 $("#jqxgrid").jqxGrid('setcellvalue', row, "skinPuritys", null);
						
						if(null == materialType.value || "" == materialType.value ){
							
							 $.growl.error({ message: "Material Type is mandatory.", duration: 10000, title: 'Error' });
							 return newvalue;
							 
						 }
						if(null !=  newvalue.value && "Diamond" == newvalue.label){
								$("#jqxgrid").jqxGrid('setcellvalue', row, "metalTypes", "Gold");
								var metalTypeC = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'metalTypes');
							 $.each(segment, function(key, val) {
								 if(val.description == metalTypeC.value){
									  $("#jqxgrid").jqxGrid('setcellvalue', row, "metalType", val.id);
								 }
							});
						 }else{
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "metalTypes", newvalue.label);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "metalType", newvalue.value);
						 }
						
						if(null !=   materialType.value && "F" ==  materialType.value){
							
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation", "STU");
							 
							 return newvalue;
						 }else{
							 
							 if("Diamond" == newvalue.label){
								
								 $("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation", "PGD");
								 return newvalue;
								 
							 }else if("Gold" == newvalue.label){
								 
								 $("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation", "PGD");
								 return newvalue;
								 
							 }else if("Silver" == newvalue.label){
								 
								 $("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation", "PSL");
								 return newvalue;
								 
							 }else if("Platinum" == newvalue.label){
								 
								 $("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation", "PPT");
								 return newvalue;
								 
							 }
							
						 }
					
						
						return newvalue;
					}
					
				},
				
				{
					text : 'Metal Type',
					datafield : 'metalType',
					columntype : 'combobox',
					displayfield : 'metalTypes',
					width : '3.5%',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : false,
					initeditor : function(row, value, editor) {
						editor.jqxComboBox({
							source : metalTypeDataAdapter,
							displayMember : 'description',
							valueMember : 'id'
						});
					},
					  cellbeginedit : function(row){
							var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
							if(materialType == "SR" || materialType == "H"){
								return false;
							}else{
								return true;
							}
						},
				},
				{
					text : 'PSR No.',
					datafield : 'psrNo',
					displayfield : 'psrNos',
					editable : true,
					sortable : false,
					cellbeginedit: checkForMetalType,
					width : '4%',
					cellsalign : 'center',
					align:'center',
					columntype : 'dropdownlist',
					
					createeditor : function(row, value, editor) {
						editor.jqxDropDownList({
							source : psrTypeDataAdapter,
							itemHeight:30,
							displayMember : 'name',
							valueMember : 'id'
						});
					},
					cellbeginedit : function(row){
						var materialType = $("#mrvType").val();
						var matType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');

						if(materialType == "H" || matType == "SR" || matType == "F"){
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
		            },

					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						
						 var mrvSrialNo = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'mrvSrialNo')
						 var materialType = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'materialType');
						 var stoneType = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'stoneType');

						 if(null == materialType.value || "" == materialType.value ){
							
							 $.growl.error({ message: "Material Type is mandatory.", duration: 10000, title: 'Error' });
							 return newvalue;
							 
						 }else if("R" == materialType.value){
							 
							 $.growl.warning({ message: "For RM Stonetype is not required", duration: 10000, title: 'warning' });
							 return "";
							 
						 }else if("S" == materialType.value && (null == stoneType.value || (null != stoneType.value && 'B' == stoneType.value))){
							 
							 $.growl.warning({ message: "PSR # is required only for Stonetype PSR; ", duration: 10000, title: 'Error' });
							 return "";
							 
							 
						 }else if("A" == materialType.value && (null == stoneType.value || (null != stoneType.value && 'B' == stoneType.value))){
							 
							 $.growl.warning({ message: "Stone type should be PSR.", duration: 10000, title: 'Error' });
							 return "";
							 
							 
						 }else if(null == newvalue.value || "" == newvalue.value){
							
							 $.growl.error({ message: "PSR is mandatory.", duration: 10000, title: 'Error' });
							 return oldvalue;
							 
						 }else{
							var characterReg = /^([0-9]{0,19})$/;
						    if(!characterReg.test(newvalue.value)) {
						    	$.growl.error({ message: "Invalid PSR value", duration: 10000, title: 'Error' });
						    	return "";
						    }
						    
						    if(mrvSrialNo.value > 1 && materialTypePSR(mrvSrialNo.value, materialType.value, newvalue.value)){
						    	
						    	$.growl.error({ message: "Duplicate PSR No for the Material type", duration: 10000, title: 'Error' });
						    	return "";
						    }
						    
						    if("S" == materialType.value && stoneDetailsValidation(mrvSrialNo.value)){
						    	
						    	$.growl.error({ message: "Duplicate PSR No for the Material type", duration: 10000, title: 'Error' });
						    	return oldvalue;
						    }
						    
						    if("A" == materialType.value && accDetailsValidation(mrvSrialNo.value)){
						    	
						    	$.growl.error({ message: "Duplicate PSR No for the Material type", duration: 10000, title: 'Error' });
						    	return oldvalue;
						    }
						    
							postJSON('/OrderExecution/api/v1/mrvPSRDetails', JSON
										.stringify(mrvFilterValues(materialType.value, newvalue.value, mrvSrialNo.value)), function(data) {
								 if(1 == data.resCode){
									 	
									 	//$("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation", data.payload.psrDetails.metalAccLocation);
										$("#jqxgrid").jqxGrid('setcellvalue', row, "skinPurity", data.payload.psrDetails.skinPurity);
										$("#jqxgrid").jqxGrid('setcellvalue', row, "pcs", data.payload.psrDetails.pcs);
										$("#jqxgrid").jqxGrid('setcellvalue', row, "grossWeight", data.payload.psrDetails.grossWeight);
										$("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight", data.payload.psrDetails.netWeight);
										
										
										
										$("#jqxgrid").jqxGrid('setcellvalue', row, "refType", data.payload.psrDetails.refType);
										$("#jqxgrid").jqxGrid('setcellvalue', row, "refNo", data.payload.psrDetails.refNo);
										$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNo", data.payload.psrDetails.refSerialNo);
										
										
										
										if("S" == materialType.value){
											$.each(data.payload.psrDetails.stoneDTO, function(index, val) {
												
												$("#stonegrid").jqxGrid('addrow', null, addPSRDetailsToStonerow(newvalue.value, val));
											});
										}else if("A" == materialType.value){

											$.each(data.payload.psrDetails.accessoryDTO, function(index, val) {
												$("#accgrid").jqxGrid('addrow', null, addPSRDetailsToAccrow(newvalue.value, val));
											});
										}
										 
										return;
										
								 }else {
									 $.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
									 $("#jqxgrid").jqxGrid('setcellvalue', row, "psrNo", "");
									
									 return "";
								 }
								
							 });
							
						 }
					},
					
				},
				{
					'text' : 'Ref. Type',
					datafield : 'refType',
					'width' : '4%',
					cellbeginedit: checkForMetalType,
					sortable : false,
					editable : true,
					cellsalign : 'center',
					align:'center',
					/*cellsrenderer: function (row, column, value) {
						var materialType = $("#mrvType").val();
						var refType = "MIV"
						if(materialType == "H"){
							return '<div style="margin-left:12px; margin-top:10px;">'+ refType + '</div>';
						}
					},*/
					
				},
				{
					'text' : 'Ref. No. ',
					datafield : 'refNo',
					'width' : '3%',
					cellsalign : 'center',
					align:'center',
					displayfield : 'refNoN',
					cellbeginedit: checkForMetalType,
					formatter:function numFormat( cellvalue, options, rowObject ){
				        return cellvalue.replace(",","");
				    },
					columntype: 'numberinput',	      
					/*initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
		            },*/
					createeditor : function(row, value, editor) {
						var vendId = $("#vendorCode-value").val();
						$.getJSON('/OrderExecution/api/v1/getHallmarkGRVDetails?Type=getMIVNumbers&vendorId='+ vendId, function(data) {
							var refNum = data.payload.MivNos;
							editor.jqxDropDownList({ source: refNum , displayMember: 'id', valueMember: 'id'});
						});
					},
		            cellbeginedit : function(row){
						var materialType = $("#mrvType").val();
						if(materialType == "H"){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNo",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "refSerialNoN",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalType",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "metalTypes",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "pcs",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "grossWeight",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "segment",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "segments",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "skinPurity",null);
						$("#jqxgrid").jqxGrid('setcellvalue', row, "skinPuritys",null);


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
				{
					'text' : 'Ref. Sl. No.',
					datafield : 'refSerialNo',
					displayfield : 'refSerialNoN',
					'width' : '3%',
					cellsalign : 'center',
					align:'center',
					cellbeginedit: checkForMetalType,
					cellsformat: 'n',
					sortable : false,
					editable : true,
					createeditor : function(row, value, editor) {
						var refNo =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'refNo')
						$.getJSON('/OrderExecution/api/v1/getHallmarkGRVDetails?Type=getMIVSrlNumbers&mivNo='+ refNo, function(data) {
							var refSlNum = data.payload.MivSrlNos;
							
							var refSlArr = [];
							 $.each(refSlNum,function(k,v){
								 refSlArr.push({
									 "id" : v.refSerialNo,
									 "name" : v.refSerialNo
								 });
							 });
							editor.jqxDropDownList({ source: refSlArr , displayMember: 'id', valueMember: 'id'});
						});
					},
					 cellbeginedit : function(row){
							var materialType = $("#mrvType").val();
							if(materialType == "H"){
								this.columntype = 'dropdownlist';
								return true;
							}else{
								return false;
							}
						},
						cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
							var refNo =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'refNo');
							var masterRows = $("#jqxgrid").jqxGrid('getrows');
							var duplicateFlag = false;
							
							if(masterRows.length > 1){
							$.each(masterRows,function(k,v){
								if(v.refSerialNo == newvalue.value && refNo == v.refNo){
									duplicateFlag = true;
									$.growl.error({
										message : "Ref No " + v.refNo +  " with Ref Sl No " + newvalue.value  + " Already Added !!!",
										duration : 10000,
										title : 'Error'
									})
									var id = $("#jqxgrid").jqxGrid('getrowid', row);
									$("#jqxgrid").jqxGrid('deleterow', id);
								}
							});
						}	
							
							// http://localhost:8081/OrderExecution/api/v1/getHallmarkGRVDetails?Type=getMIVSrlNoDetails&mivNo=213&mivSrlNo=1
						if(duplicateFlag == false){
							$.getJSON('/OrderExecution/api/v1/getHallmarkGRVDetails?Type=getMIVSrlNoDetails&mivNo='+refNo+'&mivSrlNo='+newvalue.value, function(data) {
								var mrvSlNoDetails = data.payload.MivSrlNoDetails;
								
								$("#jqxgrid").jqxGrid('setcellvalue', row, "metalAccLocation",mrvSlNoDetails.metalAccLocation);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "metalType",mrvSlNoDetails.segmentDTO.segmentId);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "metalTypes",mrvSlNoDetails.segmentDTO.description);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "segment",mrvSlNoDetails.segmentDTO.segmentId);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "segments",mrvSlNoDetails.segmentDTO.description);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "pcs",mrvSlNoDetails.pcs);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "grossWeight",mrvSlNoDetails.grossWeight);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight",mrvSlNoDetails.netWeight);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "skinPurity",mrvSlNoDetails.skinPurity);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "skinPuritys",mrvSlNoDetails.skinPurity);
								
								var materialType = $("#mrvType").val();
								var refType = "MIV"
								if(materialType == "H"){
									$("#jqxgrid").jqxGrid('setcellvalue', row, "refType","MIV");
								}
							});
						}
						},
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            }
					
				},
				{
					'text' : 'Metal A/c Loc.',
					datafield : 'metalAccLocation',
					'width' : '4%',
					cellsalign : 'center',
					align:'center',
					sortable : false,
					editable : true,
					cellbeginedit : function(row){
						var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
						var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneType');  
						
						if(materialType == "S" && stoneType == "B"){
							return true;
						}else{
							return false;
						}
					},
				},
				{
					'text' : 'HSN/SAC Code',
					datafield : 'hsnSacCode',
					'width' : '4%',
					cellsalign : 'center',
					align:'center',
					editable : true,
					validation : function(cell, value) {
						var data = /^[0-9]*$/.test(value);
						if(data == false)
							{
							return {
								result : false,
								message : "Enter Valid HSN/SAC Code !!"
								};
							}
						return true;
						},
					cellbeginedit : function(row){
						var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
						if(materialType == "SR" || materialType == "F" || materialType == "R"){
							return true;
						}else{
							return false;
						}
					},
				},
				{
					'text' : 'CGST %',
					datafield : 'cgstperc',
					'width' : '3%',
					cellsalign : 'right',
					align:'center',
					cellsformat : 'd2',					
					editable : true,
					cellbeginedit : function(row){
						var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
						if(materialType == "SR" || materialType == "F" || materialType == "R"){
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : checkTaxPer
				},
				{
					'text' : 'SGST %',
					datafield : 'sgstperc',
					'width' : '3%',
					cellsalign : 'right',
					cellsformat : 'd2',
					align:'center',
					editable : true,
					cellbeginedit : function(row){
						var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
						if(materialType == "SR" || materialType == "F" || materialType == "R"){
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : checkTaxPer
				},
				{
					'text' : 'IGST %',
					datafield : 'igstperc',
					'width' : '3%',
					cellsalign : 'right',
					cellsformat : 'd2',
					align:'center',
					editable : true,
					cellbeginedit : function(row){
						var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
						if(materialType == "SR" || materialType == "F" || materialType == "R"){
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : checkTaxPer
				},
				{
					'text' : 'CESS %',
					datafield : 'cessperc',
					'width' : '3%',
					cellsalign : 'right',
					cellsformat : 'd2',
					align:'center',
					editable : true,
					cellbeginedit : function(row){
						var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
						if(materialType == "SR" || materialType == "F" || materialType == "R"){
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : checkTaxPer
				},
				
				{
					'text' : 'Party Bill No.',
					datafield : 'partyBillNo',
					'width' : '3%',
					cellsalign : 'center',
					align:'center',
					editable : true,
					
					
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            }
				},
				{
					'text' : 'Party Bill Dt.',
					datafield : 'partyBillDate',
					'width' : '4.5%',
					sortable : false,
					editable : true,
					columntype: 'datetimeinput',
					cellsalign : 'center',
					align:'center',
					cellsformat: 'dd/MM/yyyy',
					cellvaluechanging : function(row,
							datafield, columntype, oldvalue,
							newvalue, event) {
						var date = new Date();
						var dateOnly = new Date(date
								.getFullYear(),
								date.getMonth(), date.getDate());
						if (newvalue <= dateOnly) {

							return newvalue;
						} else {
							$.growl
									.error({
										message : "Future Date not allowed",
										duration : 3000,
										title : 'Error'
									});
							return "";
						}
					}
				},
				
				{
					text : 'Skin Purity',
					datafield : 'skinPurity',
					columntype : 'dropdownlist',
					displayfield : 'skinPuritys',
					cellbeginedit: validateMRVDetails,
					'width' : '4%',
					cellsalign : 'right',
					align:'center',
					editable : true,
					sortable : false,
					createeditor : function(row, value, editor) {
						//editor.on('click', function(event){	
							var segId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'metalType'); 
							$.getJSON('/OrderExecution/api/v1/mrvPurity?segId='+ segId, function(data) {
								var skinPurityArry = data.payload.purityList;
								editor.jqxDropDownList({ source: skinPurityArry , displayMember: 'name', valueMember: 'id'});
							});
						//});
					},
					 cellbeginedit : function(row){
							var materialType = $("#mrvType").val();
							var matType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
							console.log(matType == "SR")
							if(materialType != "H" && matType !="SR" && matType != "S"){
								this.columntype = 'dropdownlist';
								return true;
							}else{
								return false;
							}
						},
					
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						
						var segment =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'segment');
						var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
						
						if("S" == $('#mrvType').val() && (materialType == "F" || materialType == "R")){
							
							fieldFilters = {
								"fieldFilters" : {}
							};
							if(null == segment || null == newvalue.value){
								$.growl.error({ message: "Please Fill Mandatory Fields.", duration: 5000, title: 'Error' });
								return;
							}
								
							fieldFilters.fieldFilters["segment"] = segment;
							fieldFilters.fieldFilters["skinPurity"] = newvalue.value;
								
							postJSON('/OrderExecution/api/v1/mrvMetalRate', JSON
									.stringify(fieldFilters), function(data) {
								 if(1 == data.resCode){
									 
									 $("#jqxgrid").jqxGrid('setcellvalue', row, "metalRate", data.payload.metalRate);
								 }else{
									 $.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
									 $("#jqxgrid").jqxGrid('setcellvalue', row, "metalRate", 0);
								 }
							});
						}
					}
				},
				{
					'text' : 'Pcs',
					datafield : 'pcs',
					'width' : '3%',
					cellbeginedit: validateMRVDetails,
					editable : true,
					cellsformat: 'n',
					cellsalign : 'center',
					align:'center',
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
		            
				}, {      
				    	text: 'Gr. Wt.',
					    datafield : 'grossWeight',
					   'width' : '3%',
					    cellbeginedit: validateMRVDetails,
					    sortable : false, menu:false,
					    cellsalign : 'right',
					    align:'center', 
					    cellsformat: 'd3',
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
		            	 }else  if(null != materialType.value &&  "" != materialType.value && "F" == materialType.value){
		            		 $("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight", null);
		            	 }
		            }

				},
				{
					'text' : 'N. Wt.',
					datafield : 'netWeight',
					'width' : '3%',
					cellbeginedit: validateMRVDetails,					
				    cellsformat: 'd3',
				    cellsalign : 'right',
				    align:'center', 
					sortable : false,
					editable : true,	      
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
		            
		            cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
		            	 var materialType = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'materialType');
		            	 var grossWeight = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'grossWeight');
		            	
		            	 if(null != materialType.value &&  "" != materialType.value && "F" == materialType.value && newvalue > grossWeight.value){
		            			 $.growl.error({ message: "Net Wt cannot be greater than gross wt", duration: 10000, title: 'Error' });
		            			 $("#jqxgrid").jqxGrid('setcellvalue', row, "netWeight", null);
		            		 return false;
		            	 }
		            }
				},
				{
					'text' : 'W. Wt.',
					datafield : 'wastageWeight',
					'width' : '4%',
					cellbeginedit: validateMRVDetails,
					sortable : false,
					editable : true, 
					cellsformat: 'd3',
				    cellsalign : 'right',
				    align:'center',
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            }
				},
				{
					'text' : 'Metal Rate',
					datafield : 'metalRate',
					'width' : '3%',
					cellbeginedit: validateMRVDetails,
					sortable : false,
					editable : true,
					cellsformat: 'd2',
				    cellsalign : 'right',
				    align:'center',
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
				 
				},
				{
					'text' : 'Diamond Wt.',
					datafield : 'diamondWeight',
					'width' : '3%',
					sortable : false,
					editable : true,
					cellbeginedit: validateMRVDetails,
					cellsformat: 'd3',
				    cellsalign : 'right',
				    align:'center', 
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
		           
				},
				{
					'text' : 'Labour Charges',
					datafield : 'labourCharges',
					'width' : '3.5%',
					sortable : false,
					editable : true,
					cellbeginedit: validateMRVDetails,
					cellsformat: 'd2',
				    cellsalign : 'right',
				    align:'center', 	            
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            }
				},
				{
					'text' : 'Value in Rs',
					datafield : 'valueInRs',
					'width' : '3%',
					sortable : false,
					editable : true,
					cellbeginedit: validateMRVDetails,
					cellsformat: 'd2',
				    cellsalign : 'right',
				    align:'center', 
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
		            cellbeginedit : function(row){
						var materialType = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'materialType');
						var mrvType = $("#mrvType").val();
						if(materialType == "SR"){
							return true;
						}else if(mrvType == "C" || mrvType == "D" ){
							return true;
						}
						else{
							return false;
						}
					},
				},
				{
					'text' : 'Remarks',
					datafield : 'remarks',
					'width' : '4%',
					cellsalign : 'left',
					align:'center',
					sortable : false,
					editable : true
				},
				{
	   				text : '',
	   				datafield :null ,
	   				cellsrenderer: function (row, column, value) {
                        return '<button id="addSA" class="btn btn-sm btn-primary" type="button" onclick="addStoneOrAccDetails('+ row +')"><i class="fa fa-plus-circle fa-lg"></i></button>';
                    },
	   				editable : false,
	   				sortable : false,
	   				'width' : '2.5%'
	   			},
				{
					text : '',
					menu : false,
					sortable : false,
					datafield : 'selectionStatus',
					columntype : 'checkbox',
					width : '2%',
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

				},{
					text : '',
					datafield : 'Delete',
					'width' : '4%',
					cellsalign : 'center',
					align:'center',
					columntype : 'button',
					cellsrenderer : function() {
						return "Delete";
					},
					buttonclick : function(row) {
						
						var masterRows = $("#jqxgrid").jqxGrid('getrows');
	   					var stoneDet = $("#stonegrid").jqxGrid('getrows');
	   					var accDet = $("#accgrid").jqxGrid('getrows');
	   					
	   					var stoneArray = [];
	   					var accArray = [];
	   					
	   					
						if(typeof stoneDet != "undefined"){
							for(var k=0; k<stoneDet.length; k++){
								if(masterRows[row].mrvSrialNo ==  stoneDet[k].mivSlNo){
									var idVal = $("#stonegrid").jqxGrid('getrowid', k);
									stoneArray.push(idVal);	
								}
							}	
						}
						
					
						if(typeof accDet != "undefined"){
							for(var n=0; n<accDet.length; n++){
								if(masterRows[row].mrvSrialNo ==  accDet[n].mivSlNo){
									var idValAcc = $("#accgrid").jqxGrid('getrowid', n);
									accArray.push(idValAcc);						
								}
							}
						}
						
	   					if(typeof stoneDet != "undefined"){
	   						$("#stonegrid").jqxGrid('deleterow', stoneArray);
	   					}
	   					
	   					if(typeof accDet != "undefined"){
	   						$("#accgrid").jqxGrid('deleterow', accArray);
	   					}
	   					
	   					var getmivSrialNo = $("#jqxgrid").jqxGrid('getcellvalue', row, "mrvSrialNo");	   					
	   					if(typeof stoneDet != "undefined"){
							for (var k = 0; k < stoneDet.length; k++) {
								var serialNos = parseInt(stoneDet[k].mivSlNo);
								
								if(serialNos > getmivSrialNo){
										$("#stonegrid").jqxGrid("setcellvalue", k,"mivSlNo", serialNos-1);
								}
							}
	   					}
	   					
	   					if(typeof accDet != "undefined"){
							for (var k = 0; k < accDet.length; k++) {
								var serialNos = parseInt(accDet[k].mivSlNo);
								
								if(serialNos > getmivSrialNo){
										$("#accgrid").jqxGrid("setcellvalue", k,"mivSlNo", serialNos-1);
								}
							}
	   					}
	   					
	   					var id = $("#jqxgrid").jqxGrid('getrowid', row);
	   					$("#jqxgrid").jqxGrid('deleterow', id);
	   					
	   					for (var j = 0; j < masterRows.length; j++) {							
	   						$("#jqxgrid").jqxGrid("setcellvalue", j,"mrvSrialNo", j + 1);
	   					}
					}		
				}
				];
	   		
	addGrid(datafields, columns, updateRows, data, addrow, "#jqxgrid");
	$("#jqxgrid").jqxGrid({
		width : '100%',
		rowsheight : 35,
		theme: 'energyblue',
		columnsresize: true, 
		columnsheight: 80,
	});	
}


var getBulkMrvPiecesWts = function(row,newvalue){
	var bulkStonrArr = [];
	var bulkStoneDet =
		{
	      "stoneLoc": null,
	      "stoneCode": $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneCode'),
	      "subCategory": $('#stonegrid').jqxGrid('getcellvalue', row, 'subCategory'),
	      "uom": $('#stonegrid').jqxGrid('getcellvalue', row, 'uom'),
	      "vendorIssuedStonePcs": $('#stonegrid').jqxGrid('getcellvalue', row, 'vendorIssuedStonePcs'),
	      "vendorIssuedStoneWt": $('#stonegrid').jqxGrid('getcellvalue', row, 'vendorIssuedStoneWt'),
	      "vendorLooseStone": $('#stonegrid').jqxGrid('getcellvalue', row, 'vendorLooseStone'),
	      "customerIssuedStonePcs": $('#stonegrid').jqxGrid('getcellvalue', row, 'customerIssuedStonePcs'),
	      "customerIssuedStoneWt": $('#stonegrid').jqxGrid('getcellvalue', row, 'customerIssuedStoneWt'),
	      "customerLooseStone": $('#stonegrid').jqxGrid('getcellvalue', row, 'customerLooseStone'),
	      "companyIssuedStonePcs": $('#stonegrid').jqxGrid('getcellvalue', row, 'companyIssuedStonePcs'),
	      "companyIssuedStoneWt": $('#stonegrid').jqxGrid('getcellvalue', row, 'companyIssuedStoneWt'),
	      "companyLooseStone": $('#stonegrid').jqxGrid('getcellvalue', row, 'companyLooseStone'),
	      "stoneConditions": $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneConditions'),
	      "materialType": $('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType'),
	      "stoneTypes": $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes'),
	      "suppliedBy": $('#stonegrid').jqxGrid('getcellvalue', row, 'suppliedBy'),
	      "suppBy": $('#stonegrid').jqxGrid('getcellvalue', row, 'suppBy'),
	      "segCode": $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'),
	      "segmentId": $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId'),
	      "segments": $('#stonegrid').jqxGrid('getcellvalue', row, 'segments'),
	      "categoryId": $('#stonegrid').jqxGrid('getcellvalue', row, 'categoryId'),
	      "mainCatN": $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN'),
	      "cutGrade": $('#stonegrid').jqxGrid('getcellvalue', row, 'cutGrade'),
	      "cutGrades": $('#stonegrid').jqxGrid('getcellvalue', row, 'cutGrades'),
	      "subCategoryId": $('#stonegrid').jqxGrid('getcellvalue', row, 'subCategoryId'),
	      "shape": $('#stonegrid').jqxGrid('getcellvalue', row, 'shape'),
	      "weightRange": $('#stonegrid').jqxGrid('getcellvalue', row, 'weightRange'),
	      "wtRanges": $('#stonegrid').jqxGrid('getcellvalue', row, 'wtRanges'),
	      "color": $('#stonegrid').jqxGrid('getcellvalue', row, 'color'),
	      "colors": $('#stonegrid').jqxGrid('getcellvalue', row, 'colors'),
	      "actualColor": $('#stonegrid').jqxGrid('getcellvalue', row, 'actualColor'),
	      "actCols": $('#stonegrid').jqxGrid('getcellvalue', row, 'actCols'),
	      "clarity": $('#stonegrid').jqxGrid('getcellvalue', row, 'clarity'),
	      "claritys": $('#stonegrid').jqxGrid('getcellvalue', row, 'claritys'),
	      "stoneId": $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneId'),
	      "fromWtCost": $('#stonegrid').jqxGrid('getcellvalue', row, 'fromWtCost'),
	      "fromWtCostN": $('#stonegrid').jqxGrid('getcellvalue', row, 'fromWtCostN'),
	      "toWtCost": newvalue,
	      "toWtCostN": newvalue
	    }
	bulkStonrArr.push(bulkStoneDet);
	return bulkStonrArr;
	
}


var wtSlab ,color ,actualColor,clarity,cutGrade,resArr,subCatArr,stRate,segmArr;

function mrvStoneGrid()
 {
	var updateRows = function(rowid, newdata, commit) {	
	}
	
	var addrow =  function (rowid, rowdata, position, commit) {
        commit(true);
	}
	
	var stoneConditionTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : stoneCondition
		};

	var stoneConditionTypeDataAdapter = new $.jqx.dataAdapter(stoneConditionTypeSource, {
		autoBind : true
	});
	
	
	var stoneLocSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : stoneLocation
		};

	var stoneLocDataAdapter = new $.jqx.dataAdapter(stoneLocSource, {
		autoBind : true
	});

	var datafields = [ {
		'name' : 'slNo',
		'type' : 'long'
	}, {
		'name' : 'mivSlNo',
		'type' : 'long'
	}, 
	{
		name : 'stoneLoc',
		type : 'string'
	},{
		name : 'stoneLocTypes',
		value : 'stoneLoc',
		values : {
			source : stoneLocDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},	
	{
		'name' : 'stoneCode',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	}, {
		'name' : 'uom',
		'type' : 'string'
	}, {
		'name' : 'vendorIssuedStonePcs',
		'type' : 'long'
	}, {
		'name' : 'vendorIssuedStoneWt',
		'type' : 'double'
	}, {
		'name' : 'vendorLooseStone',
		'type' : 'double'
	}, {
		'name' : 'customerIssuedStonePcs',
		'type' : 'long'
	}, {
		'name' : 'customerIssuedStoneWt',
		'type' : 'double'
	}, {
		'name' : 'customerLooseStone',
		'type' : 'double'
	}, {
		'name' : 'companyIssuedStonePcs',
		'type' : 'long'
	}, {
		'name' : 'companyIssuedStoneWt',
		'type' : 'double'
	}, {
		'name' : 'companyLooseStone',
		'type' : 'double'
	},
	{
		'name' : 'suppliedBy',
		'type' : 'string'
	},
	{
		'name' : 'segmentId',
		'type' : 'string'
	},
	{
		'name' : 'segCode',
		'type' : 'string'
	},
	{
		'name' : 'categoryId',
		'type' : 'string'
	},
	{
		'name' : 'subCategoryId',
		'type' : 'string'
	},
	{
		'name' : 'weightRange',
		'type' : 'string'
	},
	{
		'name' : 'color',
		'type' : 'string'
	},
	{
		'name' : 'actualColor',
		'type' : 'string'
	},{
		'name' : 'clarity',
		'type' : 'string'
	},
	{
		'name' : 'cutGrade',
		'type' : 'string'
	},{
		'name' : 'stoneRate',
		'type' : 'string'
	},	
	{
		'name' : 'stoneCondition',
		'type' : 'string'
	},{
		name : 'stoneConditions',
		value : 'stoneCondition',
		values : {
			source : stoneConditionTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	{'name' : 'materialType','type' : 'string'},
	{'name' : 'stoneTypes','type' : 'string'},
	{
		'name' : 'isCustomerStone',
		'type' : 'bool'
	},
	{
		'name' : 'fromWtCost',
		'type' : 'string'
	},
	{
		'name' : 'toWtCost',
		'type' : 'float'
	},
	{
		'name' : 'selectionStatus',
		'type' : 'bool'
	},
	{
		'name' : 'orderType',
		'type' : 'string'
	},{
		'name' : 'cPcs',
		'type' : 'long',
		'map' : 'companyIssuedStonePcs'
	},{
		'name' : 'cStWt',
		'type' : 'double',
		'map' : 'companyIssuedStoneWt'
	},{
		'name' : 'stoneId',
		'type' : 'int',
	},
	];

	var columns = [
				{'text' : '', hidden: true, datafield : 'cPcs',columngroup: 'mi','width' : '4%'},
				{'text' : '', hidden: true, datafield : 'cStWt',columngroup: 'mi','width' : '4%',cellsformat:'d2'},	
				{'text' : '', hidden: true, datafield : 'stoneId',columngroup: 'mi','width' : '4%'},	
	   			{
					'text' : 'GRV Sl.No.',
					datafield : 'mivSlNo',
					columngroup: 'mi',
					'width' : '3%',
					cellsalign : 'center',
					align : 'center',
					editable : false
				},
				{
					'text' : 'Stone Sl. No.',
					datafield : 'slNo',
					columngroup: 'mi',
					'width' : '4%',
					editable : false,
					cellsalign : 'center',
					align : 'center',
					columntype: 'number',
					cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
					}
				},
				{'text' : 'materialType', hidden: true, datafield : 'materialType',columngroup: 'mi','width' : '4%',editable : false},	
				{'text' : 'orderType', hidden: true, datafield : 'orderType',columngroup: 'mi','width' : '4%',editable : false},	
				{'text' : 'stoneTypes', hidden: true, datafield : 'stoneTypes',columngroup: 'mi','width' : '4%',editable : false},
				{'text' : 'Supp By',
					datafield : 'suppliedBy',	
					columngroup: 'mi',
					'width' : '4%',
					displayfield : 'suppBy',
					editable : true,
					cellsalign : 'center',
					align : 'center',
					columntype :'dropdownlist',
					createeditor : function(row, value, editor) {
						editor.on('click', function(event){						
								$.getJSON('/OrderExecution/api/v1/getSupplyDetails', function(data) {
									var resp = data.payload.suppliedBy[0] ;
									var suppArry = [];
									suppArry.push(resp);
										var suppArr = [];
										$.each(suppArry, function(k, v){
											suppArr.push({
												"id" : v.id,
												"name" : v.name
											});
										});
									editor.jqxDropDownList({ source: suppArr , displayMember: 'name', valueMember: 'id'});
								});
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
				},{'text' : 'Stone Seg',
					datafield : 'segmentId',	
					columngroup: 'mi',
					'width' : '5%',
					editable : true,
					displayfield : 'segments',
					initeditor : function(row, value, editor) {
						editor.on('click', function(event){	
							var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
							var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  					
							if(materialType == "S" && stoneType == "Bulk"){
								var fieldFilters = {"fieldFilters":{}};
								postJSON('/OrderExecution/api/v1/getStoneSegments',JSON.stringify(fieldFilters),function(response) {
										var res = response.payload.stoneSeg;
										segmArr = response.payload.stoneSeg;
										editor.jqxDropDownList({ source: res , displayMember: 'description', valueMember: 'id'});
								});
							}
						});
					},cellbeginedit : function(row){
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
						var seg = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'segmentId');
							if(newvalue.label == "Diamond"){
								$("#stonegrid").jqxGrid('setcellvalue', row, "segCode","DI");
							}
							if(newvalue.label == "Precious Stones"){
								$("#stonegrid").jqxGrid('setcellvalue', row, "segCode","PS");
							}
							if(newvalue.label == "Other Stones"){
								$("#stonegrid").jqxGrid('setcellvalue', row, "segCode","OS");
							}
							$('#stonegrid').jqxGrid ('setcellvalue', row, 'segmentId',  newvalue.value);
							$('#stonegrid').jqxGrid ('setcellvalue', row, 'segments', newvalue.label);
							
							$("#stonegrid").jqxGrid('setcellvalue', row, 'categoryId',null);
							$("#stonegrid").jqxGrid('setcellvalue', row, 'mainCatN',null);
							
							$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrade',null);
							$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrades',null);
							
							$('#stonegrid').jqxGrid ('setcellvalue', row, 'fromWtCost',null);
							$('#stonegrid').jqxGrid ('setcellvalue', row, 'fromWtCostN',null);
							
							$('#stonegrid').jqxGrid ('setcellvalue', row, 'toWtCost',null);
							$('#stonegrid').jqxGrid ('setcellvalue', row, 'toWtCostN',null);
						
					}
				},
				{'text' : 'code','datafield' : 'segCode','width' : '6%',columngroup: 'mi',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden : true},
				{'text' : 'Cat',datafield : 'categoryId', columngroup: 'mi',width : '5%',editable : true, displayfield : 'mainCatN',
					initeditor : function(row, value, editor) {
						editor.on('click', function(event){	
							var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
							var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');
							var seg =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
							var sCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
							
							if(materialType == "S" && stoneType == "Bulk"){
								var fieldFilters = {"fieldFilters":{"suppliedBy":"CO","sSegId":seg,"sSeg":sCode}};
								postJSON('/OrderExecution/api/v1/getStoneCategories',JSON.stringify(fieldFilters),function(response) {
										resArr = response.payload.mainCatList;
										
								});
								var newArray = [];
								$.each(resArr, function(k, v){
									newArray.push({
										"id" : v.id,
										"name" : v.description
									})
								});
								editor.jqxDropDownList({ source: newArray , displayMember: 'name', valueMember: 'id'});
							}
						});
					},
					cellbeginedit : function(row){
						var materialType = $('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
						var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
						if(materialType == "S" && stoneType == "Bulk"){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},	
					cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue) {					
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCategoryId',  null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'shape', null);
						
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'weightRange', null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'wtRanges',null);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'color', null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'colors',null);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'actualColor', null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'actCols',null);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'clarity', null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'claritys',null);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrade', null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrades',null);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'shape', null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCategoryId',null);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneCode', null);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'uom',null);
						
						$("#stonegrid").jqxGrid('setcellvalue', row, 'categoryId',newvalue.value);
						$("#stonegrid").jqxGrid('setcellvalue', row, 'mainCatN',newvalue.label);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'fromWtCost',null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'fromWtCostN',null);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'toWtCost',null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'toWtCostN',null);
					}	
				},{
					'text' : 'SubCat/Shape',
					datafield : 'subCategoryId',
					displayfield : 'shape',
					columngroup: 'mi',
					'width' : '6%',
					editable : true,
					createeditor : function(row, value, editor) {
						editor.on('click', function(event){	
							var apiName, dropDownArrayList;
							var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
							var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');
							var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
							var segment =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId'); 
							
							var category =  $('#stonegrid').jqxGrid('getcellvalue', row, 'categoryId');  
							var categoryN =  $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN');  
							if(materialType == "S" && stoneType == "Bulk"){
								if(segCode == 'DI'){
									apiName = '/OrderExecution/api/v1/getLOVByCategory?categoryId=' + category;
								}else{
									apiName = '/OrderExecution/api/v1/getLOVByCategory?categoryId=' + category;
								}
								$.getJSON(apiName, function(data) {
									if(data.resCode == 1){
										if(segCode == 'DI'){
											dropDownArrayList = data.payload.shape;
											wtSlab = data.payload.weightSlab;
											color = data.payload.color;
											clarity = data.payload.clarity;
											actualColor = data.payload.actualColor;
											cutGrade = data.payload.cutGrade;
										}else{
											dropDownArrayList = data.payload.subcat;
										}
										
										editor.jqxDropDownList({ source: dropDownArrayList , displayMember: 'description', valueMember: 'id'});
									}
								});
							}
						});
					},cellbeginedit : function(row){
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
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCategoryId',  newvalue.value);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'shape', newvalue.label);
						
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrade',null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrades',null);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'fromWtCost',null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'fromWtCostN',null);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'toWtCost',null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'toWtCostN',null);
					
						
						var segment =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');  
						var category =  $('#stonegrid').jqxGrid('getcellvalue', row, 'categoryId');  
						var subCatId = newvalue.value;
						var fieldFilter = {"segmentId" : segment, "categoryId" : category, "subCatShapeId" :  subCatId};
						postJSON('/OrderExecution/api/v1/getStoneCodeUom', JSON.stringify(fieldFilter), function(data) {
							if(data.resCode == 1){
								$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneCode',  data.payload.stoneCode);
								$('#stonegrid').jqxGrid ('setcellvalue', row, 'uom', data.payload.uom);
								$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneId', data.payload.stoneId);
							}else{
								$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneCode', null);
								$('#stonegrid').jqxGrid ('setcellvalue', row, 'uom',null);
								$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneId',null);
								$.growl.error({
									message : data.mesgStr,
									duration : 1000,
									title : 'Error'
								});
								return false;
							}
						});	  
					}	
				},	
				{'text' : 'Stone Code',
					datafield : 'stoneCode',
					columngroup: 'mi',
					'width' : '5%',
					sortable : false,cellsalign : 'center',align : 'center',
					editable : false,
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(null == newvalue || "" == newvalue){
							 $.growl.error({ message: "Stone Code is mandatory.", duration: 10000, title: 'Error' });
							 return oldvalue; 
						 }else{
							 $.getJSON('/OrderExecution/api/v1/stoneDetailsByCode?code='+newvalue, function(data) {
								 if(1 == data.resCode){
									 var subCategory = null;
									 if(null != data.payload.stone.SubCategory){
										 subCategory = data.payload.stone.SubCategory.description
									 }else{
										 subCategory = data.payload.stone.segment.description+" "+ data.payload.stone.category.description/*+" "+ data.payload.stone.shape.description*/;
									 }
									 $("#stonegrid").jqxGrid('setcellvalue', row, "subCategory", subCategory);
									 $("#stonegrid").jqxGrid('setcellvalue', row, "uom", data.payload.stone.uom);
								 }else{
									 $("#stonegrid").jqxGrid('setcellvalue', row, "stoneCode", null);
									 $.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
									 return false;
								 }
							});
						 }
					}
				},{'text' : 'Weight Range',datafield : 'weightRange',columngroup: 'mi','width' : '4%',sortable : false,editable : true,displayfield : 'wtRanges',cellsalign : 'right',align : 'center',
					createeditor : function(row, value, editor) {
						var segm = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						 	if(segCode == 'DI'){
						 		var wtArr = [];
								$.each(wtSlab, function(k,v){
									wtArr.push({
										"id" : v.id,
										"name" : v.description
									})
								});
								editor.on('click', function(event){	
									editor.jqxDropDownList({ source: wtArr , displayMember: 'name', valueMember: 'name'});
								});
						 	}
					},
					cellbeginedit : function(row){
						var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
						var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes'); 
						var segmt = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var sCode = $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						
						if(materialType == "S" && stoneType == "Bulk" && sCode == "DI"){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'weightRange',  newvalue.value);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'wtRanges', newvalue.label);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrade',null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrades',null);
					}
				},
				{'text' : 'Color',datafield : 'color',columngroup: 'mi','width' : '4%',sortable : false,editable : true,displayfield : 'colors',cellsalign : 'center',
					align : 'center',
					createeditor : function(row, value, editor) {
						var segm = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						
						 	if(segCode == 'DI'){
					 		var colArr = [];
							$.each(color, function(k,v){
								colArr.push({
									"id" : v.id,
									"name" : v.id
								})
							});
							editor.on('click', function(event){	
								editor.jqxDropDownList({ source: colArr , displayMember: 'id', valueMember: 'id'});
							});
					 	}
					},
					cellbeginedit : function(row){
						var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
						var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes'); 
						var segmt = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						
						if(materialType == "S" && stoneType == "Bulk" && segCode == 'DI'){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'color',  newvalue.value);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'colors', newvalue.label);
					}
				},
				{'text' : 'Actual Color',datafield : 'actualColor',columngroup: 'mi','width' : '4%',sortable : false,editable : true,displayfield : 'actCols',cellsalign : 'center',align : 'center',
					createeditor : function(row, value, editor) {
						var segm = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						
						 	if(segCode == 'DI'){
					 		var actColArr = [];
							$.each(actualColor, function(k,v){
								actColArr.push({
									"id" : v.id,
									"name" : v.id
								})
							});
							editor.on('click', function(event){	
								editor.jqxDropDownList({ source: actColArr , displayMember: 'id', valueMember: 'id'});
							});
					 	}
				},
					cellbeginedit : function(row){
						var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
						var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes'); 
						var segmt = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						
						if(materialType == "S" && stoneType == "Bulk" && segCode == 'DI'){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'actualColor',  newvalue.value);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'actualColor', newvalue.label);
					}
				},
				{'text' : 'Clarity',datafield : 'clarity',columngroup: 'mi','width' : '4%',sortable : false,editable : true,displayfield : 'claritys',cellsalign : 'center',
					align : 'center',
					createeditor : function(row, value, editor) {
						var segm = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						
						 	if(segCode == 'DI'){
					 		var clarityArr = [];
							$.each(clarity, function(k,v){
								clarityArr.push({
									"id" : v.id,
									"name" : v.id
								})
							});
							editor.on('click', function(event){	
								editor.jqxDropDownList({ source: clarityArr , displayMember: 'id', valueMember: 'id'});
							});
					 	}
					},
					cellbeginedit : function(row){
						var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
						var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');
						var segmt = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						
						if(materialType == "S" && stoneType == "Bulk" && segCode == 'DI'){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'clarity',  newvalue.value);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'claritys', newvalue.label);
						
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrade',null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrades',null);
					}
				},{'text' : 'Cut grade',datafield : 'cutGrade',columngroup: 'mi','width' : '4%',sortable : false,editable : true,displayfield : 'cutGrades',cellsalign : 'center',
					align : 'center',
					createeditor : function(row, value, editor) {
						var segm = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						 	if(segCode == 'DI'){
					 		var cGradeArr = [];
							$.each(cutGrade, function(k,v){
								cGradeArr.push({
									"id" : v.id,
									"name" : v.id
								})
							});
							editor.on('click', function(event){	
								editor.jqxDropDownList({ source: cGradeArr , displayMember: 'id', valueMember: 'id'});
							});	
					 	}
					},
					cellbeginedit : function(row){
						var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
						var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');  
						var segmt = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						
						if(materialType == "S" && stoneType == "Bulk" && segCode == 'DI'){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrade',  newvalue.value);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'cutGrades', newvalue.label);
						
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneRate',null);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneRateN',null);
						
						var clarity =  $('#stonegrid').jqxGrid('getcellvalue', row, 'clarity');
						var color =  $('#stonegrid').jqxGrid('getcellvalue', row, 'color');
						var cg =  $('#stonegrid').jqxGrid('getcellvalue', row, 'cutGrade');
						var wt =  $('#stonegrid').jqxGrid('getcellvalue', row, 'weightRange');
						var shape =  $('#stonegrid').jqxGrid('getcellvalue', row, 'subCategoryId');
						var uom =  $('#stonegrid').jqxGrid('getcellvalue', row, 'uom');
						
						var segm = $('#stonegrid').jqxGrid('getcellvalue', row, 'segments');
						var mCat = $('#stonegrid').jqxGrid('getcellvalue', row, 'mainCatN');
						var shape =  $('#stonegrid').jqxGrid('getcellvalue', row, 'shape');
						var actualColor =  $('#stonegrid').jqxGrid('getcellvalue', row, 'actualColor');
						var stoneId = $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneId');
						
						var subCatDesc = segm + " " + mCat + " " + shape + " " + clarity + " " + wt + " " + newvalue.value;
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'subCategory',subCatDesc);
						var fieldFilters = {
											  "fieldFilters":{
												  "suppliedBy":"CO",
												  "stoneId":stoneId,
												  "clarity":clarity,
												  "color":color,
												  "actualColor" :(actualColor != null)?actualColor : null,
												  "cutGrade":newvalue.value,
												  "weightSlab":wt,
												  "uom":uom
											}
										}
						
						postJSON('/OrderExecution/api/v1/getStoneCodeRate',JSON.stringify(fieldFilters),function(response) {
							if(response.resCode == 1){
								stRate = response.payload.rateList;
							}

							if(response.resCode == 2){
								$.growl.error({
									message : response.mesgStr,
									duration :1000,
									title : "Error"
								});
								return false;
							}
						});
					}
				},{'text' : 'Stone Rate',datafield : 'stoneRate',columngroup: 'mi','width' : '4%',sortable : false,editable : true,displayfield : 'stoneRateN',cellsalign : 'right',align : 'center',
					createeditor : function(row, value, editor) {
						editor.on('click', function(event){	
									var rateArry = [];
									$.each(stRate, function(k,v){
										rateArry.push({
											"id":v
										});
									});
								editor.jqxDropDownList({ source: rateArry , displayMember: 'id', valueMember: 'id'});
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
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneRate',  newvalue.value);
						$('#stonegrid').jqxGrid ('setcellvalue', row, 'stoneRateN', newvalue.label);
						
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						if(segCode == "DI"){
							var stoneBulkArry = getBulkMrvPiecesWts(row);
							var bulkStoneParam = 
								{
									"vendorCode" : $('#vendorCode-value').val(),
									"stoneDTO" :stoneBulkArry
								}
							postJSON('/OrderExecution/api/v1/getBulkMrvPiecesWts', JSON.stringify(bulkStoneParam), function(data) {
								if(data.resCode == "1"){
									var retWtsPcs = data.payload.PcsWts;
									$('#stonegrid').jqxGrid ('setcellvalue', row, 'companyIssuedStonePcs', retWtsPcs.companyReturnStonePcs);
									$('#stonegrid').jqxGrid ('setcellvalue', row, 'companyIssuedStoneWt', retWtsPcs.companyReturnStoneWt);
								}else{
									$('#stonegrid').jqxGrid ('setcellvalue', row, 'companyIssuedStonePcs',null);
									$('#stonegrid').jqxGrid ('setcellvalue', row, 'companyIssuedStoneWt',null);
								}
							});
						}
					}
				},
				{
					'text' : 'Sub Category Desc',
					datafield : 'subCategory',
					columngroup: 'mi',
					'width' : '5%',cellsalign : 'left',align : 'center',					
					sortable : false,
					editable : false,
				},
				{
					'text' : 'UQC',
					datafield : 'uom',
					columngroup: 'mi',
					'width' : '3%',
					sortable : false,
					cellsalign : 'center',
					align : 'center',
					editable : false
				},
				{
					'text' : 'From Cost',
					datafield : 'fromWtCost',
					columngroup: 'mi',
					'width' : '3.5%',cellsalign : 'right',align : 'center',
					sortable : false,
					editable : true,
					displayfield : 'fromWtCostN',
					initeditor : function(row, value, editor) {
						editor.on('click', function(event){	
							var subCat = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'subCategoryId');
							var category =  $('#stonegrid').jqxGrid('getcellvalue', row, 'categoryId');
							var seg =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
							var fCostArr = [];
							var fieldFilters = {"fieldFilters":{"type":"FromWtOrCost","segId":seg,"catId":category,"subcatId":subCat,"criteria":"create"}}
								postJSON('/OrderExecution/api/v1/onloadMovementOfStones',JSON.stringify(fieldFilters),function(response) {
									fCostArr = response.payload.fromWtCost;
									
									var fWtCostVal = [];
									$.each(fCostArr, function(i, el){
									    if($.inArray(el, fWtCostVal) === -1) fWtCostVal.push(el);
									});
									
									fWtCostVal.sort(function(a, b){
										{return a-b};
									});
									
									var fc = [];
									$.each(fWtCostVal, function(k, v){
										fc.push({
											"id" : v,
										});
									});
									editor.jqxDropDownList({ source: fc , displayMember: 'id', valueMember: 'id'});
								});
						});
					},
					cellbeginedit : function(row){
						var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
						var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes'); 
						var segmt = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						
						if(materialType == "S" && stoneType == "Bulk" && segCode != 'DI'){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
				},
				{
					'text' : 'To Cost',
					datafield : 'toWtCost',
					columngroup: 'mi',
					'width' : '3.5%',
					sortable : false,cellsalign : 'right',align : 'center',
					editable : true,
					displayfield : 'toWtCostN',
					initeditor : function(row, value, editor) {
						editor.on('click', function(event){	
							var fromWtCost = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'fromWtCost');
							var category =  $('#stonegrid').jqxGrid('getcellvalue', row, 'categoryId');
							var seg =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
							var tCostArr = [];
							var fieldFilters = {"fieldFilters":{"type":"ToWtOrCost","fromWtSelected":fromWtCost,"segId":seg,"catId":category,"shapeId":"","criteria":"create"}}
								postJSON('/OrderExecution/api/v1/onloadMovementOfStones',JSON.stringify(fieldFilters),function(response) {
									tCostArr = response.payload.fromWtCost;
									var tWtCostVal = [];
									$.each(tCostArr, function(i, el){
									    if($.inArray(el, tWtCostVal) === -1) tWtCostVal.push(el);
									});
									
									tWtCostVal.sort(function(a, b){
										{return a-b};
									});
									var tc = [];
									$.each(tWtCostVal, function(k, v){
										tc.push({
											"id" : v,
										});
									});
									editor.jqxDropDownList({ source: tc , displayMember: 'id', valueMember: 'id'});
								});
								
						});
					},
					cellbeginedit : function(row){
						var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
						var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes'); 
						var segmt = $('#stonegrid').jqxGrid('getcellvalue', row, 'segmentId');
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
						
						if(materialType == "S" && stoneType == "Bulk" && segCode != 'DI'){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
						var segCode =  $('#stonegrid').jqxGrid('getcellvalue', row, 'segCode'); 
							if(segCode == "PS" || segCode == "OS"){
								var stoneBulkArry = getBulkMrvPiecesWts(row,newvalue.value);
								var bulkStoneParam = 
									{
										"vendorCode" : $('#vendorCode-value').val(),
										"stoneDTO" :stoneBulkArry
									}
								postJSON('/OrderExecution/api/v1/getBulkMrvPiecesWts', JSON.stringify(bulkStoneParam), function(data) {
									if(data.resCode == "1"){
										var retWtsPcs = data.payload.PcsWts;
										$('#stonegrid').jqxGrid ('setcellvalue', row, 'companyIssuedStonePcs', retWtsPcs.companyReturnStonePcs);
										$('#stonegrid').jqxGrid ('setcellvalue', row, 'companyIssuedStoneWt', retWtsPcs.companyReturnStoneWt);
									}else{
										$('#stonegrid').jqxGrid ('setcellvalue', row, 'companyIssuedStonePcs',null);
										$('#stonegrid').jqxGrid ('setcellvalue', row, 'companyIssuedStoneWt',null);
									}
								});
							}
					 }
				},
				{
					'text' : 'Return Stone Pcs',
					datafield : 'vendorIssuedStonePcs',
					columngroup: 'vendor',
					'width' : '5%',
					editable : false,
					cellsalign : 'center',
					align : 'center',
					cellbeginedit: checkForBulk,
					cellsformat: 'n',
					columntype: 'numberinput',	
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
		            },
		            
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
					sortable : false,
					//editable : true
				},
				{
					'text' : 'Return Stone Wt',
					datafield : 'vendorIssuedStoneWt',
					cellbeginedit: checkForBulk,
					editable : false,
					cellsalign : 'right',
					align : 'center',
					columngroup: 'vendor',
					'width' : '5%',
					cellsformat: 'd3',
					columntype: 'numberinput',	      
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
		            },
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
					sortable : false,
				},
				{
					'text' : 'Set Stone / Loose Stone',
					datafield : 'vendorLooseStone',
					cellbeginedit: checkForBulk,
					columngroup: 'vendor',
					cellsalign : 'center',
					align : 'center',
					'width' : '8%',
					sortable : false,
					editable : false,
					
				},
				{
					'text' : 'Return Stone Pcs',
					datafield : 'companyIssuedStonePcs',
					columngroup: 'IssueStone',
					cellsformat: 'n',
					cellsalign : 'center',
					align : 'center',
					columntype: 'numberinput',	      
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
		            },
		            cellbeginedit : function(row){
					var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
					var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');
					var supBy = $('#stonegrid').jqxGrid('getcellvalue', row, 'suppliedBy');
						if(materialType == "S" && stoneType == "Bulk" && supBy == "CO"){
							return true;
						}else{
							return false;
						}
		            },
		            validation: function (cell, value) {
		                if (value < 0 ) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
		            cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
		            	var cPcs = $('#stonegrid').jqxGrid('getcellvalue', row, 'cPcs');
	            		if(newvalue > cPcs){
		            		$.growl.error({
		            			message : "Company Return Pcs Cannot be More than " + cPcs + " !!!",
		            			duration : 10000,
		            			title : 'Error'
		            		});
		            		return cPcs;
		            	}
		            	
		            	if(newvalue == 0){
		            		$.growl.error({
		            			message : 'Company Return Stone Pcs Cannot be 0 !!!',
		            			duration : 10000,
		            			title : 'Error'
		            		});
		            		return "";
		            	}
		            },
					'width' : '5%',
					sortable : false,
					editable : false,
				},
				{
					'text' : 'Return Stone Wt',
					datafield : 'companyIssuedStoneWt',
					columngroup: 'IssueStone',
					cellsalign : 'right',
					align : 'center',
					cellsformat: 'd3',
					columntype: 'numberinput',	      
					createeditor : function(row, value, editor) {
		                editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
		            },
		            cellbeginedit : function(row){
						var materialType = jQuery('#stonegrid').jqxGrid ('getcellvalue', row, 'materialType');
						var stoneType =  $('#stonegrid').jqxGrid('getcellvalue', row, 'stoneTypes');
						var supBy = $('#stonegrid').jqxGrid('getcellvalue', row, 'suppliedBy');
							if(materialType == "S" && stoneType == "Bulk" && supBy == "CO"){
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
		            cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
		            	var cStWt = $('#stonegrid').jqxGrid('getcellvalue', row, 'cStWt');
	            		if(newvalue > cStWt){
		            		$.growl.error({
		            			message : "Company Return Stone Wt. Cannot be More than " + cStWt + " !!!",
		            			duration : 10000,
		            			title : 'Error'
		            		});
		            		return cStWt;
		            	}
	            		
		            	if(newvalue == 0){
		            		$.growl.error({
		            			message : 'Company Return Stone Wt Cannot be 0 !!!',
		            			duration : 10000,
		            			title : 'Error'
		            		});
		            		return "";
		            	}
		            },
					'width' : '5%',
					sortable : false,
					editable : false,
				},
				{
					'text' : 'Set Stone / Loose Stone',
					datafield : 'companyLooseStone',
					cellbeginedit: checkCustomerStone,
					columngroup: 'IssueStone',
					'width' : '8%',
					cellsalign : 'center',
					align : 'center',
					sortable : false,
					editable : false,
				},
				{
					'text' : 'Return Stone Pcs',
					datafield : 'customerIssuedStonePcs',
					cellbeginedit: checkCustomerStone,
					columngroup: 'customer',
					cellsformat: 'n',
					cellsalign : 'center',
					align : 'center',
					columntype: 'numberinput',	      
					createeditor : function(row, value, editor) {
		                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
		            },
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
					'width' : '5%',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Return Stone Wt',
					datafield : 'customerIssuedStoneWt',
					cellbeginedit: checkCustomerStone,
					columngroup: 'customer',
					cellsformat: 'd3',
					cellsalign : 'right',
					align : 'center',
					columntype: 'numberinput',	      
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
		            },
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
					'width' : '5%',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Set Stone / Loose Stone',
					datafield : 'customerLooseStone',
					cellbeginedit: checkCustomerStone,
					columngroup: 'customer',
					'width' : '8%',
					cellsalign : 'center',
					align : 'center',
					sortable : false,
					editable : false,
				},
				{
					text : 'Stone Condition',
					datafield : 'stoneCondition',
					columntype : 'combobox',
					displayfield : 'stoneConditions',
					cellbeginedit: checkCustomerStone,
					editable : false,
					sortable : false,
					columngroup: 'customer',
					'width' : '5%',
					initeditor : function(row, value, editor) {
						editor.jqxComboBox({
							source : stoneConditionTypeDataAdapter,
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

				},{
					text : '',
					datafield : 'Delete',
					'width' : '5%',
					cellsalign : 'center',
					align:'center',
					columntype : 'button',
					cellsrenderer : function() {
						return "Delete";
					},
					buttonclick : function(row) {
						
						var masterRows = $("#jqxgrid").jqxGrid('getrows');
	   					var stoneDet = $("#stonegrid").jqxGrid('getrows');
	   					var headerArray = [];
	   					var stoneArray = [];
	   					var count;
	   					
	   					if(typeof masterRows != "undefined"){
							for(var k=0; k<masterRows.length; k++){
								if(masterRows[k].mrvSrialNo ==  stoneDet[row].mivSlNo){
									var idValH = $("#jqxgrid").jqxGrid('getrowid', k);
									headerArray.push(idValH);
									count = masterRows[k].mrvSrialNo;
								}
							}	
						}
	   					
						id = $("#stonegrid").jqxGrid('getrowid', row);
						$("#stonegrid").jqxGrid('deleterow', id);
						
						if(typeof stoneDet != "undefined"){
							for(var k=0; k<stoneDet.length; k++){
								if(count ==  stoneDet[k].mivSlNo){
									var idVal = $("#stonegrid").jqxGrid('getrowid', k);
									stoneArray.push(idVal);	
								}
							}	
						}
	   					
						if(stoneArray.length == 0){
							if(masterRows != "undefined"){
								$("#jqxgrid").jqxGrid('deleterow', headerArray);
							}
						}
					}		
				}
				];
	   		
	$("#stonegrid").jqxGrid({'columngroups' : [
	                 	                 { text: 'Vendor', name: 'vendor',align:'center' },
	                 	                 { text: '', name: 'mi' },
	                 	                 { text: 'Company', name: 'IssueStone',align:'center' },
	                 	                 { text: 'Customer', name: 'customer' ,align:'center'}
	              ]});
	

	addGrid(datafields, columns, updateRows, data, addrow, "#stonegrid");
	$("#stonegrid").jqxGrid({
		width : '100%',
		columnsresize: true, 
		theme: 'energyblue',
	});	
}

function mrvAccGrid()
 	{
		var updateRows = function(rowid, newdata, commit) {
	}
	
	var addrow =  function (rowid, rowdata, position, commit) {
        commit(true);
	}
	
	var accConditionTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : stoneCondition
		};

	var accConditionTypeDataAdapter = new $.jqx.dataAdapter(accConditionTypeSource, {
		autoBind : true
	});
	
	

	var datafields = [ {
		'name' : 'slNo',
		'type' : 'long'
	}, {
		'name' : 'mivSlNo',
		'type' : 'long'
	}, {
		'name' : 'location',
		'type' : 'string'
	}, {
		'name' : 'articleCode',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	}, {
		'name' : 'uom',
		'type' : 'string'
	}, {
		'name' : 'vendorIssuedAccPcs',
		'type' : 'long'
	}, {
		'name' : 'vendorIssuedAccWt',
		'type' : 'double'
	}, {
		'name' : 'vendorLooseAcc',
		'type' : 'double'
	}, {
		'name' : 'customerIssuedAccPcs',
		'type' : 'long'
	}, {
		'name' : 'customerIssuedAccWt',
		'type' : 'double'
	}, {
		'name' : 'customerLooseAcc',
		'type' : 'double'
	}, {
		'name' : 'companyIssuedAccPcs',
		'type' : 'long'
	}, {
		'name' : 'companyIssuedAccWt',
		'type' : 'double'
	}, {
		'name' : 'companyLooseAcc',
		'type' : 'double'
	}, {
		'name' : 'accountCondition',
		'type' : 'string'
	}, 
	{
		name : 'accountConditions',
		value : 'accountCondition',
		values : {
			source : accConditionTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	{
		'name' : 'isCustomerAccessory',
		'type' : 'bool'
	},
	{
		'name' : 'selectionStatus',
		'type' : 'bool'
	},
	{
		'name' : 'orderItemAccId',
		'type' : 'long'
	},{
		'name' : 'suppliedBy',
		'type' : 'string'
	},
	];

	var columns = [
				{
					'text' : '',datafield : 'orderItemAccId',columngroup: 'mi','width' : '55px',sortable : false,editable : false,hidden:true
				},
				{
					'text' : '',datafield : 'suppliedBy',columngroup: 'mi','width' : '55px',sortable : false,editable : false,hidden:true
				},
	   			{
					'text' : 'GRV Sl. No.',
					datafield : 'mivSlNo',
					columngroup: 'mi',
					'width' : '5%',cellsalign : 'center',align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Acc Sl. No.',
					datafield : 'slNo',
					columngroup: 'mi',
					'width' : '5%',cellsalign : 'center',align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Article Code',
					datafield : 'articleCode',
					columngroup: 'mi',
					'width' : '8%',cellsalign : 'center',align:'center',
					sortable : false,
					editable : false,
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(null == newvalue || "" == newvalue){
							
							 $.growl.error({ message: "Article Code is mandatory.", duration: 10000, title: 'Error' });
							 return oldvalue;
							 
						 }else{
							 $.getJSON('/OrderExecution/api/v1/accDetailsByCode?code='+newvalue, function(data) {
								 if(1 == data.resCode){
									 $("#accgrid").jqxGrid('setcellvalue', row, "subCategory", data.payload.article.SubCategory.description);
									 $("#accgrid").jqxGrid('setcellvalue', row, "uom", data.payload.article.uom);
								 }else{
									 $("#accgrid").jqxGrid('setcellvalue', row, "articleCode", null);
									 $.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
									 return false;
								 }
							});
						 }
					}
				},
				{
					'text' : 'Sub Category',
					datafield : 'subCategory',
					columngroup: 'mi',
					'width' : '8%',cellsalign : 'left',align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'UQC',
					datafield : 'uom',
					columngroup: 'mi',
					'width' : '4%',cellsalign : 'center',align:'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Return Acc Pcs',
					datafield : 'vendorIssuedAccPcs',
					columngroup: 'vendor',cellsalign : 'center',align:'center',
					cellsformat: 'n',
					columntype: 'numberinput',	      
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
		            },
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
					'width' : '8%',
					sortable : false,
					editable : false
					},
				{
					'text' : 'Return Acc Wt',
					datafield : 'vendorIssuedAccWt',
					columngroup: 'vendor',
					cellsformat: 'd3',
					cellsalign : 'right',
					align : 'center',
					columntype: 'numberinput',cellsalign : 'right',align:'center',	      
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
		            },
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
					'width' : '8%',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Set Acc / Loose Acc',
					datafield : 'vendorLooseAcc',
					columngroup: 'vendor',
					'width' : '8%',cellsalign : 'center',align:'center',
					editable : false
				},
				{
					'text' : 'Return Acc Pcs',
					datafield : 'companyIssuedAccPcs',
					//cellbeginedit: checkCustomerAccessory,
					columngroup: 'IssueStone',
					cellsformat: 'n',
					columntype: 'numberinput',cellsalign : 'center',align:'center',	      
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
		            },
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
					'width' : '8%',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Return Acc Wt',
					datafield : 'companyIssuedAccWt',
					//cellbeginedit: checkCustomerAccessory,
					columngroup: 'IssueStone',
					cellsformat: 'd3',
					cellsalign : 'right',
					align : 'center',
					columntype: 'numberinput',cellsalign : 'right',align:'center',	      
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
		            },
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
					'width' : '8%',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Set Acc / Loose Acc',
					datafield : 'companyLooseAcc',
					//cellbeginedit: checkCustomerAccessory,
					columngroup: 'IssueStone',
					'width' : '8%',cellsalign : 'center',align:'center',
					editable : false
				},
				{
					'text' : 'Return Acc Pcs',
					datafield : 'customerIssuedAccPcs',
					//cellbeginedit: checkCustomerAccessory,
					columngroup: 'customer',
					cellsformat: 'n',
					columntype: 'numberinput',cellsalign : 'center',align:'center',	      
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 0, min: 0 });
		            },
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
					'width' : '8%',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Return Acc Wt',
					datafield : 'customerIssuedAccWt',
					//cellbeginedit: checkCustomerAccessory,
					columngroup: 'customer',
					'width' : '8%',
					cellsformat: 'd3',
					cellsalign : 'right',
					align : 'center',
					columntype: 'numberinput',cellsalign : 'right',align:'center',	      
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
		            },
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Number" };
		                }
		                return true;
		            },
					sortable : false,
					editable : false
				},
				{
					'text' : 'Set Acc / Loose Acc',
					datafield : 'customerLooseAcc',
					//cellbeginedit: checkCustomerAccessory,
					columngroup: 'customer',
					'width' : '8%',cellsalign : 'center',align:'center',
					sortable : false,
					editable : false
				},
				{
					text : 'Acc Condition',
					datafield : 'accountCondition',
					columntype : 'combobox',
					displayfield : 'accountConditions',
					editable : false,
					sortable : false,
					columngroup: 'customer',cellsalign : 'center',align:'center',
					'width' : '8%',
					initeditor : function(row, value, editor) {
						editor.jqxComboBox({
							source : accConditionTypeDataAdapter,
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
					columntype : 'checkbox',cellsalign : 'center',align:'center',
					width : '2%',
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

				}
				];
	   		
	
	$("#accgrid").jqxGrid({'columngroups' : [
          { text: 'Vendor', name: 'vendor',align:'center' },
         { text: '', name: 'mi' },
         { text: 'Company', name: 'IssueStone',align:'center' },
         { text: 'Customer', name: 'customer' ,align:'center'}
    ]});


	addGrid(datafields, columns, updateRows, data, addrow, "#accgrid");

}

var rowsId = 0;
var generateMrvrow = function (i) {
	var row = {};
	
	var rows = $("#jqxgrid").jqxGrid('getrows');
	if(typeof rows == "undefined"){
		rowsId = 1;
	}else{
		rowsId = rows.length + 1;
	}
	row["mrvSrialNo"] = rowsId;
	row["materialTypes"] ="Finished Goods";
	row["materialType"] ="F";
	row["metalAccLocation"] =null;
    
    row["stoneType"] = null;
    row["psrNo"] = null;
    row["refType"] = ($("#mrvType").val() == "H") ? "GIV" : null
    row["refNo"] = null;
    row["refSerialNo"] = null;
    
    row["partyBillNo"] = null;
    row["partyBillDate"] = null;
    
    row["hsnSacCode"] = null;
    row["sgstperc"] = 0.00;
    row["igstperc"] = 0.00;
    row["cessperc"] = 0.00;
    row["cgstperc"] = 0.00;
    
    row["skinPurity"] = null;
    row["skinPuritys"] = null;
    row["pcs"] = null;
    row["grossWeight"] = null;
    row["netWeight"] = null;
    row["wastageWeight"] = null;
    row["metalRate"] = null;
    row["diamondWeight"] = null;
    row["labourCharges"] = null;
    row["valueInRs"] = null;
    row["remarks"] = null;
    row["selectionStatus"] = true;
    rowId = rowId+1;
    return row;
}

var generateMRVAccrow = function (mrvSlNo, slNo) {
    var row = {};

    row["mivSlNo"] = mrvSlNo;
    row["slNo"] = slNo;
    row["location"] = null;
    row["articleCode"] = null;
    row["subCategory"] = null;
    row["uom"] = null;
    row["vendorIssuedAccPcs"] = null;
    row["vendorIssuedAccWt"] = null;
    row["vendorLooseAcc"] = null;
    row["customerIssuedAccPcs"] = null;
    row["customerIssuedAccWt"] = null;
    row["customerLooseAcc"] = null;
    row["companyIssuedAccPcs"] = null;
    row["companyIssuedAccWt"] = null;
    row["companyLooseAcc"] = null;
    row["accountConditions"] = null;
    row["selectionStatus"] = true;
    row["isCustomerAccessory"] = false;
    
    
    return row;
}

var generateMRVStonerow = function (mrvSlno, slNO,row) {
	var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');    
    var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneTypes');
    
    var row = {};

    row["mivSlNo"] = mrvSlno;
    row["slNo"] = slNO;
    row["stoneLoc"] = null;
    row["stoneCode"] = null;
    row["subCategory"] = null;
    row["uom"] = null;
    row["vendorIssuedStonePcs"] = null;
    row["vendorIssuedStoneWt"] = null;
    row["vendorLooseStone"] = null;
    row["customerIssuedStonePcs"] = null;
    row["customerIssuedStoneWt"] = null;
    row["customerLooseStone"] = null;
    row["companyIssuedStonePcs"] = null;
    row["companyIssuedStoneWt"] = null;
    row["companyLooseStone"] = null;
    row["stoneConditions"] = null;
    row["selectionStatus"] = true;
    row["isCustomerStone"] = false;
    row["materialType"] = materialType;
    row["stoneTypes"] = stoneType;
    
    return row;
}


var addPSRDetailsToAccrow = function (psr, accData) {
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
    
    row["customerIssuedAccPcs"] = difference(accData.customerIssuedAccPcs, accData.customerReturnAccPcs);
    row["customerIssuedAccWt"] = difference(accData.customerIssuedAccWt, accData.customerReturAccWt);
    
    row["customerLooseAcc"] = 0 != accData.customerLooseAcc ? accData.customerLooseAcc : null;
    
    row["companyIssuedAccPcs"] = difference(accData.companyIssuedAccPcs, accData.companyReturnAccPcs);
    
    row["companyIssuedAccWt"] = difference(accData.companyIssuedAccWt, accData.companyReturnAccWt);
    
    row["companyLooseAcc"] = 0 != accData.companyLooseAcc ? accData.companyLooseAcc : null;
    row["accountConditions"] = accData.accountCondition;
    row["selectionStatus"] = true;
    row["isCustomerAccessory"] = accData.isCustomerAccessory;
    row["orderItemAccId"] = accData.orderItemAccId;
    
    row["suppliedBy"] = accData.suppliedBy;
    
    return row;
}




var addPSRDetailsToStonerow = function (psr, stoneData) {
	console.log(stoneData);
    var row = {};

    row["mivSlNo"] = stoneData.mivSlNo;
    row["slNo"] = stoneData.slNo;
    row["stoneLoc"] = stoneData.location;
    row["stoneLocTypes"] = stoneData.location;
    
    row["stoneCode"] = stoneData.stoneCode;
    row["subCategory"] = stoneData.subCategory;
    
    row["suppliedBy"] = stoneData.suppliedBy;
    row["suppBy"] = stoneData.suppliedBy;
    
    row["segmentId"] = stoneData.segmentId;
    row["segments"] = stoneData.segment;
    
    row["categoryId"] = stoneData.categoryId;
    row["mainCatN"] = stoneData.categoryDesc;
    
    row["subCategoryId"] = stoneData.subCategoryId;
    row["shape"] = stoneData.shape;
    
    row["weightRange"] = (stoneData.weightRange != null) ? stoneData.weightRange.id : null;
    row["wtRanges"] = (stoneData.weightRange != null) ? stoneData.weightRange.description : null;
    
    row["color"] = (stoneData.color != null) ? stoneData.color.id : null;
    row["colors"] = (stoneData.color != null) ? stoneData.color.description : null;
    
    row["cutGrade"] = (stoneData.cutGrade != null) ? stoneData.cutGrade.id : null;
    row["cutGrades"] = (stoneData.cutGrade != null) ? stoneData.cutGrade.description : null;
    
    row["clarity"] = (stoneData.clarity != null) ? stoneData.clarity.id : null;
    row["claritys"] = (stoneData.clarity != null) ? stoneData.clarity.description : null;
    
    row["actualColor"] = (stoneData.actualColor != null) ? stoneData.actualColor.id : null;
    row["actCols"] = (stoneData.actualColor != null) ? stoneData.actualColor.description : null;
    
    row["fromWtCost"] = (stoneData.fromWtCost != null) ? stoneData.fromWtCost : null;
    row["toWtCost"] = (stoneData.toWtCost != null) ? stoneData.toWtCost : null;
    
    row["uom"] = stoneData.uom;
    row["vendorIssuedStonePcs"] = stoneData.vendorReturnStonePcs;
    row["vendorIssuedStoneWt"] = stoneData.vendorReturnStoneWt;
    row["vendorLooseStone"] = stoneData.vendorLooseStone;
    
    row["orderType"] = stoneData.orderType;
    row["companyIssuedStonePcs"] = (stoneData.orderType == "ST") ? stoneData.companyReturnStonePcs : difference(stoneData.companyIssuedStonePcs, stoneData.companyReturnStonePcs);
    row["companyIssuedStoneWt"] = (stoneData.orderType == "ST") ? stoneData.companyReturnStoneWt : difference(stoneData.companyIssuedStoneWt, stoneData.companyReturnStoneWt);
    
    row["cPcs"] = (stoneData.orderType == "ST") ? stoneData.companyReturnStonePcs : difference(stoneData.companyIssuedStonePcs, stoneData.companyReturnStonePcs);
    row["cStWt"] = (stoneData.orderType == "ST") ? stoneData.companyReturnStoneWt : difference(stoneData.companyIssuedStoneWt, stoneData.companyReturnStoneWt);
    
    row["customerIssuedStonePcs"] = difference(stoneData.customerIssuedStonePcs, stoneData.customerReturnStonePcs);
    row["customerIssuedStoneWt"] = difference(stoneData.customerIssuedStoneWt, stoneData.customerReturnStoneWt);
    
    row["customerLooseStone"] = 0 != stoneData.customerLooseStone ? stoneData.customerLooseStone : null;
    
    
    
    row["companyLooseStone"] = 0 != stoneData.companyLooseStone ? stoneData.companyLooseStone :null; 
    row["stoneConditions"] = stoneData.stoneCondition;
    row["fromWtCost"] = stoneData.fromWtCost;
    row["toWtCost"] = stoneData.toWtCost;
    row["fromWtCostN"] = stoneData.fromWtCost;
    row["toWtCostN"] = stoneData.toWtCost;
    row["selectionStatus"] = true;
    row["isCustomerStone"] = stoneData.isCustomerStone;
    
    
    return row;
}



var difference = function(val1, val2){
	
	var diff = val1-val2;
	if(diff > 0){
		return diff;
	}else {
		return null;
	}
} 



var materialTypePSR = function(rowId, materialType, psr){
	var mrvRows = $("#jqxgrid").jqxGrid('getrows');
	var validation = false;
	
	for(var i = 0; i< mrvRows.length; i++){
		
		 var data = mrvRows[i];
	     
		 if(data.mrvSrialNo != rowId && data.materialType == materialType && data.psrNo == psr){
			validation = true;	
			break;
		 }
	}
	
	return validation;
}

var stoneDetailsValidation = function(mrvSRL){
	var mrvRows = $("#stonegrid").jqxGrid('getrows');
	var validation = false;
	
	for(var i = 0; i< mrvRows.length; i++){
		
		 var data = mrvRows[i];
	     
		 if(data.mivSlNo == mrvSRL){
			validation = true;	
			break;
		 }
	}
	return validation;
}

var accDetailsValidation = function(mrvSRL){
	var mrvRows = $("#accgrid").jqxGrid('getrows');
	var validation = false;
	
	for(var i = 0; i< mrvRows.length; i++){
		
		 var data = mrvRows[i];
	     
		 if(data.mivSlNo == mrvSRL){
			validation = true;	
			break;
		 }
	}	
	return validation;
}

function  mrvDetailsValidation (){
	
	var mrvType = $('#mrvType').val();
	var vendRegisteredC = $("#vendRegisteredC").val();
	var mrvRows = $("#jqxgrid").jqxGrid('getrows');
	var validation = true;
	
	for(var i = 0; i< mrvRows.length; i++){
		
		 var data = mrvRows[i];
		/* if(data.hsnSacCode == null ||  data.hsnSacCode == "" ){
				$.growl.error({
					message : "Please Enter HSN/SAC Code for Finished Goods!!!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}*/
		 if(true == data.selectionStatus){
			 if(mrvType !="S" && vendRegisteredC == "R" &&  (data.igstperc == null || data.igstperc == "" || data.igstper == 0) &&  (data.cgstperc == null || data.cgstperc ==  0)  && (data.sgstperc == null || data.sgstperc == 0)){
					$.growl.error({
						message : "Please enter either IGST / CGST & SGST value!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
				if((data.igstperc == null || data.igstperc == "" || data.igstper == 0) && (vendRegisteredC == "R")){
					if((data.cgstperc >  0  && (data.sgstperc == null || data.sgstperc == 0)) || (data.sgstperc >  0  && (data.cgstperc == null || data.cgstperc == 0))){
						$.growl.error({
							message : "Please enter either IGST / CGST & SGST value!",
							duration : 1000,
							title : 'Error'
						});
						return false;
					}
				}
				
				
			 if(data.materialType == null  || data.materialType == ""){
				 
				 $.growl.error({ message: "Material Type is mandatory", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
				 
			 }else if((data.materialType == "F"  || data.materialType == "R") && (data.segment == null || data.segment == "")){
				 
				 $.growl.error({ message: "Segment is mandatory for Material Tye FG and RM", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
				 
			 }else if((data.materialType == "F"  || data.materialType == "R") && (data.skinPurity == null || data.skinPurity == "")){
				 
				 $.growl.error({ message: "Skin Purity is mandatory for Material Tye FG and RM", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
				 
			 }else if((data.materialType == "F"  || data.materialType == "R") && (data.grossWeight == null || data.grossWeight == "")){
						 
				 $.growl.error({ message: "Gross Weight is mandatory for Material Tye FG and RM", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
				 
			 }else if((data.materialType == "F"  || data.materialType == "R") && (data.netWeight == null || data.netWeight == "")){
					 
					 $.growl.error({ message: "Net Weight is mandatory for Material Tye FG and RM", duration: 10000, title: 'Error' });
					 validation = false;	
					 break;
					 
			 }else if((data.materialType == "S"  || data.materialType == "A") && (data.stoneType == null || data.stoneType == "" || data.stoneType == "N")){
				 
				 $.growl.error({ message: "Stone type is mandatory for Material Tye S and A", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
				 
			 }else if((data.materialType == "S"  || data.materialType == "A" ) && (null == data.psrNo || ""== data.psrNo) && data.stoneType == "P"){
				 
				 $.growl.error({ message: "PSR No. is mandatrory", duration: 10000, title: 'Error'}); 
				 validation = false;	
				 break;
				 
			 }else if(data.materialType == "F" && "D" == mrvType && (null == data.metalRate || "" == data.metalRate)){
				
				 $.growl.error({ message: "MetalRate is mandatory if Material Type FG and MRV Type Dealer", duration: 10000, title: 'Error' }); 
				 validation = false;	
			 }
		 }
	}
	
	var stoneRows = $("#stonegrid").jqxGrid('getrows');
	if(undefined != stoneRows){
		for(var i = 0; i< stoneRows.length; i++){
			
			 var data = stoneRows[i];
		     
			 if(data.selectionStatus  == true  && (data.stoneCode == null  || data.stoneCode == "")){
				 
				 $.growl.error({ message: "Stone code is mandatory", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
			 }/*else if(data.selectionStatus  == true  && (data.stoneLoc == null  || data.stoneLoc == "")){
				 $.growl.error({ message: "Stone Location is mandatory", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
			 }*/
			 
		}
	}
	
	var accRows = $("#accgrid").jqxGrid('getrows');
	if(undefined != accRows){
		for(var i = 0; i< accRows.length; i++){
			
			 var data = accRows[i];
		     
			 if(data.selectionStatus  == true  &&  (data.articleCode == null  || data.articleCode == "")){
				 
				 $.growl.error({ message: "Article code is mandatory", duration: 10000, title: 'Error' });
				 validation = false;	
				 break;
				 
			 }
		}
	}
	
/*	 
	$.each(mrvRows,function(k,v){
		console.log(v.materialType);
		if(v.materialType == "F" || v.materialType == "R" || v.materialType == "SR"){
			if(v.hsnSacCode == null || v.cgstperc == null || v.cessperc == null || v.igstperc == null
					|| v.sgstperc == null){
				$.growl.error({
					message : "Please Fill Tax Fields !!!",
					duration : 10000,
					title : 'Error'
				});
				validation = false;
			}
		}
	});*/
	
	$.each(stoneRows,function(k,v){
		if(v.materialType == "S" ){
			if(v.companyIssuedStonePcs == null || v.companyIssuedStoneWt == null ){
				$.growl.error({
					message : "Company Return Stone Pcs/Wt Cannot be 0 !!!",
					duration : 10000,
					title  : 'Error'
				});
				validation = false;
			}
		}
	});
	
	return validation;
}


var mrvFilterValues = function(materialType, psrNo, mrvSrlNo) {

	fieldFilters = {
		"fieldFilters" : {}
	};
	var vendorCode = $('#vendorCode-value').val();
	var mrvType = $('#mrvType').val();
	
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCode;
	}

	if (mrvType != "" && mrvType != null) {
		fieldFilters.fieldFilters["mrvType"] = mrvType;
	}

	fieldFilters.fieldFilters["psrNo"] = psrNo;
	fieldFilters.fieldFilters["materialType"] = materialType;
	fieldFilters.fieldFilters["mrvSrlNo"] = mrvSrlNo;
	
	return fieldFilters;
}

$('input:text:visible:first').focus();

function checkForBulk (row, datafield, columntype) {
    var dtRow = $('#stonegrid').jqxGrid('getcellvalue', row, 'mivSlNo');
    var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', (dtRow-1), 'stoneType');
    if (stoneType == "P") {
        return false;
    }else {
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

function checkCustomerAccessory (row, datafield, columntype) {

	var dtRow = $('#accgrid').jqxGrid('getcellvalue', row, 'mivSlNo');
	
    var isCustomerStone = $('#accgrid').jqxGrid('getcellvalue', row, 'isCustomerAccessory');
    
    var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', (dtRow-1), 'stoneType');

    if (stoneType == "P" && isCustomerStone == true && ("companyIssuedAccPcs" == datafield || "companyIssuedAccWt" == datafield || "companyLooseStone" == datafield)) {

        return false;
        
    }else if (stoneType == "P" && isCustomerStone == false && ("customerIssuedAccPcs" == datafield || "customerIssuedAccWt" == datafield || "customerLooseAcc" == datafield)) {

        return false;
        
    }else {
       return true;
    }
    
}

function checkForMetalType (row, datafield, columntype) {

    var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
    
    var segment =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'segment');
    
    var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneType');
    
    var psrNumber =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'psrNo');
    
    if (materialType == "F" && ("segment" != datafield)) {
    	
    	return false;
        
    }else if (materialType == "F" && ("segment" != datafield && undefined != segment &&  null != segment && segment != "" )) {
    	
    	return false;
        
    }else if((materialType == "R" || materialType == "F") && ("psrNo" == datafield || "stoneType" == datafield)){
    	
    	return false;
    	
    }else if((materialType == "S" || materialType == "A") && (("segment" == datafield )|| (undefined != psrNumber &&  null != psrNumber && psrNumber != "" ))){
    	
    	return false;
    }else if(materialType == "S" && stoneType == "B" && "psrNo" == datafield){
    	
    	return false;
    }else if(materialType == "A" && ("stoneType" == datafield && stoneType == "P")){
    	
    	return false;
    	
    }
    else if(materialType == "SR"){
    	return false;
    }
    else {
       return true;
    }

}

function checkForMRVType (row, datafield, columntype) {

	var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
	
	var segment =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'segment');
	
	var stoneType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneType');
	
	var psrNumber =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'psrNo');
	
	var mrvType = $('#mrvType').val();
	
	if(materialType == "F" && mrvType != "S"){
		
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

function validateMRVDetails (row, datafield, columntype) {
	
	
	var materialType =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
	
	var segment =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'segment');
	
	if("metalRate" == datafield && "S" == $('#mrvType').val() && (materialType == "R" || materialType == "F")){
		return false;
	}else if (materialType == "S" || materialType == "A") {
    	
    	return false;
        
    }else if (materialType == "R" && ("netWeight" == datafield)) {
    	
    	return false;
        
    }else if ((materialType == "R" || materialType == "F") && "skinPurity" == datafield && ( null == segment || segment == "")) {
    	
    	return false;
        
    }else if (materialType == "SR") {
    	return false;
    }
    else{
    	return true;
    }
	
}

function mrvDetailsFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};

    var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();	
	var vendorName = $('#vendorCode-value').val();
	var jwType = $('#jwType').val();
	var id=$('#mrvNo').val();
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
	if (salesPerson != "" && salesPerson != null) {
		fieldFilters.fieldFilters["salesPerson"] = salesPerson;
	}
	
	return fieldFilters;
}


function mrvListingGrid() {
	var updateRows = function(rowid, newdata, commit) {	
	}
	
	var datafields = [ {
		'name' : 'mrvSrialNo',
		'type' : 'long'
	}, {
		'name' : 'createdDate',
		'type' : 'Date'
	}, {
		'name' : 'mrvType',
		'type' : 'String'
	}, {
		'name' : 'createdBy',
		'type' : 'String'
	}, {
		'name' : 'vendorCode',
		'type' : 'String'
	},
	{
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'mrvSrialNo'
	},
	{
		'name' : 'operationType',
		'type' : 'String'
	},
	{
		'name' : 'jwType',
		'type' : 'String'
	}
	];
	
	var columns = [
	   			{
	   				'text' : 'GRV No.',
	   				'datafield' : 'mrvSrialNo',
	   				'width' : '10%',
	   				editable : false,
	   				cellsalign : 'center',
	   				align : 'center',
	   			},
	   			{
	   				'text' : 'GRV Date',
	   				'datafield' : 'createdDate',
	   				'width' : '14%',
	   				sortable : false,
	   				editable : false,
	   				cellsalign : 'center',
	   				align : 'center',
	   			},
	   			{
	   				'text' : 'GRV Type',
	   				'datafield' : 'mrvType',
	   				'width' : '24%',
	   				sortable : false,
	   				editable : false,
	   				cellsalign : 'center',
	   				align : 'center',
	   			},
	   			{
	   				'text' : 'GRV Done By',
	   				'datafield' : 'createdBy',
	   				'width' : '20%',
	   				sortable : false,
	   				editable : false,
	   				cellsalign : 'center',
	   				align : 'center',
	   			},
	   			{
	   				'text' : 'Vendor',
	   				'datafield' : 'vendorCode',
	   				'width' : '22%',
	   				sortable : false,
	   				editable : false,
	   				cellsalign : 'left',
	   				align : 'center',
	   			},
	   			{
	   				text : 'Action',
	   				datafield : 'actionId',
	   				cellsrenderer : mrvPrintRenderer,
	   				editable : false,
	   				cellsalign : 'center',
	   				align : 'center',
	   				sortable : false,
	   				'width' : '10%'
	   			}];
	showMyGrid(datafields,"/OrderExecution/api/v1/mrvList", "list",columns, mrvDetailsFilterValues(), updateRows, "mrvSrialNo");	
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

$("#removeMatIssueDet").on('click',function(){
	$("#jqxgrid").hide();
	redirect();
});

$("#mrvType").on('change', function(){
	var mrvType = $(this).val();
	if(mrvType == "H" || mrvType == "DE"){
		var mrvApi = "/OrderExecution/api/v1/mrvLOV?page=vTypeList&vType="+mrvType;
	}else{
		var mrvApi = "/OrderExecution/api/v1/mrvLOV?page=vTypeList";
	}
	$.getJSON(mrvApi, function(data) {
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
		     
		     $('#parcelId').empty().append('<option value="" selected>-- Select Option --</option>');
				var receiveParcel = '/OrderExecution/api/v1/receiveParcelsForVendor?vendorId='+ui.item.value;
				
				$.getJSON(receiveParcel, function(data) {
					$.each(data.payload.receiveParcel, function(key, val) {
						$parcelId.append('<option value="' + val.id + '">' + val.name + '</option>');
					})
				});
		    }
		   });
	   
	  });
	 });
});