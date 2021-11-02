/*  ##	Author UI : Dipankar 
	##	Author UI : Pooja Sangve
	## date :28/06/2017 ## modified		
	## 	Author JAVA : Shreevardhan T L
	## 	Date Creation : 28/06/2017
*/

var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	$(".layout-main button").each(function() {
		var value = '#'+this.id;
		var value2 = '#'+this.id+'C';
		var value3 = '#'+this.id+'S';
		var val = $(value).text();
		val = val.trim();
		if( val == "search" || val == "Search"){
			if(permission.canSearch == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}  
		
		if(val=="Create" || val=="create"){
			if(permission.canAdd == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if( val == "export" || val == "Export"){
			if(permission.canExport == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "print" || val == "Print"){
			if(permission.canPrint == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "delete" || val == "Delete"){
			if(permission.canDelete == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
	});
}

//loadPermission();

var redirect = function() {
	window.location.href = "javascript:showContentPage('qcFg', 'bodySwitcher')";
	return window.location.href;
}

$("#qcFGSection").hide();

function QcParameter(id){
	var row = $("#row_"+id).val();
	if(row != 'Yes'){
		$("#row1_"+id).attr("disabled", false);	
	}
	else{
		$("#row1_"+id).val('');
		$("#row1_"+id).attr("disabled", true);
	}
}

var qcFgLov = null;

$.getJSON('/OrderExecution/api/v1/getQCLOVs',
		function(data) {
	qcFgLov = null;
	qcFgLov = data.payload;
});



$.getJSON('/OrderExecution/api/v1/vcmLOV?page=search&criteria=vType&id=-1',
		function(data) {
			$.each(data.payload.sTypes, function(key, val) {
				$('#metalSegment').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
			
			vendorList = data.payload.vCodeList;
			data = [];
			$.each(vendorList, function(key, value) {
				data.push({
					value : value.id,
					label : value.name
				});
			});
			
			$("#vendorCode").autocomplete({

				source : data,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#vendorCode-value").val(ui.item.value);
				}
			});
		});

$("#grNo").prop('disabled', true);
$("#vendorCode").on('change', function(){
	var value = $("#vendorCode-value").val();
	$('#grNo').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/getGrHeaderIdsForVendor?vendorId=' + value, function(data) {
		if(data.resCode == 1){
			$("#grNo").prop('disabled', false);
			var grNos = data.payload.list;
			$.each(grNos, function(k, v) {
				$('#grNo').append('<option  value="' + v.id + '">' + v.id + '</option>');
			});
			$("#grFgNoS").val('');
		}else{
			$("#grNo").prop('disabled', true);
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
});

$("#grFgNoS").on('keypress', function(){
	$("#vendorCode").val('');
	$("vendorCode-value").val('');
	$('#grNo option[value=""]').attr('selected','selected');
});

$("#grFgNoS").prop('disabled', false);
$("#grNo").on('change', function(){
	var value = $(this).val();
	$("#grFgNoS").val('');
	if(value == null || value == ""){
		$("#grFgNoS").prop('disabled', false);		
	}else{
		$("#grFgNoS").prop('disabled', true);
	}
});
var storeList = {};



var modalOpened = [];
var modalAttrs = [];
var modalAttrId = [];
var modalRemarks = [];
var grNo;

var qcParameterLinkRenderer = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" onclick="qcraParameterDetailsFg('+row+');" type="button" /><i class="fa fa-plus fa-sm"></i> </button>';
}

var grHeaderDetId;
var segId ;
var grNoId ;
var grSlNoId ;

var qcraParameterDetailsFg = function(row) {
	var rows = $("#jqxgrid").jqxGrid('getrows');
	$("#rowIndex").val(row);
	var newVal;
	grHeaderDetId = $("#jqxgrid").jqxGrid('getcellvalue',row,'id')
	grNoId = $("#jqxgrid").jqxGrid('getcellvalue',row,'grHid')
	grSlNoId = $("#jqxgrid").jqxGrid('getcellvalue',row,'serialNumber')
	segId = $("#jqxgrid").jqxGrid('getcellvalue',row,'metalSegment')
	
	$.getJSON('/OrderExecution/api/v1/qcParameterList?segmentId=' + segId, function(data) {
		if(typeof data != "undefined" && data.resCode == "1"){
			var qcParmListDetails = data.payload.qcParmList;
			
			if (typeof qcParmListDetails != "undefined") {			
				$("#qcParameterDetailSectionFg").empty().append('');
				$.each(qcParmListDetails, function(key, value) {
					newVal = "<tr>";
					newVal += '<td class="text-center">' + (key+1) + '</td>';
					newVal += '<td class="text-center">' + value.code + '<input type="hidden" value="'+value.code+'" /></td>';
					newVal += '<td class="text-center"><div>'+value.codeDescription+'</div></td>';
					newVal += '<td class="text-center"><select onchange="remarksEnableS('+key+');" id="qcOptionS'+key+'">';
					newVal += '<option value="Yes" selected>Yes</option><option value="No">No</option></select>';
					newVal += '<td class="text-center"><textarea rows="1" class="form-control" disabled cols="25" id="remarks'+key+'"> </textarea></td>';
					newVal += "</tr>";
					$("#qcParameterDetailSectionFg").append(newVal);
				});			
				$("#qcParameter").modal('show');
			}
		}else{
			$("#qcParameter").modal('hide');
			$.growl.warning({ message:"Server is slow, Please reload the page." , duration: 10000, title: 'Notice' });
			return false;
		}
	});
}
var remarksEnableS = function(row){
	var qcOption = $("#qcOptionS"+row).val();
	if(qcOption == "Yes"){
		$("#remarks"+row).val('');
		$("#remarks"+row).prop('disabled', true);
	}else{
		$("#remarks"+row).val('');
		$("#remarks"+row).prop('disabled', false);
	}
}


$("#addQcParamDetFg").on('click', function() {	
	$("#parameterDetailsGridF").show();
	var rows = $("#parameterDetailsGridF").jqxGrid('getrows');
	var rowid = $("#rowIndex").val();
	var paramArray = [];
	var qcParamValue = "";
	 var itemsObj = {
			 "paramDetObj"  : []
	 };
	 if(typeof rows == "undefined"){
		$('#qcParameterDetailFormFg tbody tr').each(function (k, v) {
				var paramObj = {
				        "code": $(this).find('input').val(),
				        "description": $(this).find('div').text(),
				        "remarks": $(this).find('textarea').val(),
				        "yesOrNo": {
				          "id": $(this).find('select').val()
				        }
			      }
				
				itemsObj['paramDetObj'].push(paramObj);
				 qcParamValue = qcParamValue + "" + "<b>Code :</b> " + $(this).find('input').val() + "," +
				 		" <b> Description :</b> "+ $(this).find('div').text() + 
				 		", <b>remarks : </b>" + $(this).find('textarea').val() + 
				 		", <b>QC Y/N : </b>" + $(this).find('select').val() + "; ";
			 });
			 itemsObj['grDetId'] = grHeaderDetId;
			 itemsObj['grNo'] = grNoId;
			 itemsObj['grSlNo'] = grSlNoId;
			 itemsObj['qcParamValue'] = qcParamValue;
			 paramArray.push(itemsObj);	 
			
	 }else{
		var testArray = [];
		var  grDetId = $("#grDetIdF").val(); 
		 for(var i=0; i<rows.length; i++){
			if(grHeaderDetId == rows[i].grDetId){
				 $.growl.error({
						message : "QC Parameters for " + rows[i].grNo + " - " + rows[i].grSlNo + " already addeed.",
						duration : 10000,
						title   : 'Error'
					});
					return false;
			 }else{
				 paramArray.push(rows[i]);				  
			 }
		 }		 	
			 $('#qcParameterDetailFormFg tbody tr').each(function (k, v) {
					var paramObj = {
					        "code": $(this).find('input').val(),
					        "description": $(this).find('div').text(),
					        "remarks": $(this).find('textarea').val(),
					        "yesOrNo": {
					          "id": $(this).find('select').val()
					        }
				      }
					
					itemsObj['paramDetObj'].push(paramObj);
					 qcParamValue = qcParamValue + "" + "<b>Code :</b> " + $(this).find('input').val() + "," +
					 		" <b> Description :</b> "+ $(this).find('div').text() + 
					 		", <b>remarks : </b>" + $(this).find('textarea').val() + 
					 		", <b>QC Y/N : </b>" + $(this).find('select').val() + "; ";
			 });
			 itemsObj['grDetId'] = grHeaderDetId;
			 itemsObj['grNo'] = grNoId;
			 itemsObj['grSlNo'] = grSlNoId;
			 itemsObj['qcParamValue'] = qcParamValue;
			 paramArray.push(itemsObj);
	 }
	 parameterDetailsGridF(paramArray);
	 $("#jqxgrid").jqxGrid('setcellvalue', rowid, 'qcparamC', true);
	 
});

var parameterDetailsGridF = function(data) {

	var source = {
		datafields : [ {
			name : 'grDetId',
			type : 'int'
		},{
			name : 'grNo',
			type : 'int'
		},{
			name : 'grSlNo',
			type : 'int'
		}, {
			name : 'qcParamValue',
			type : 'string'
		}, {
			name : 'paramDetObj',
			type : 'array'
		}],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#parameterDetailsGridF").jqxGrid(
					{
						source : dataAdapter,
						width : '100%',
						editable : false,
						height : '150px',
						autoheight : false,
						altRows : true,
						columnsresize : false,
						showtoolbar : true,
						rendertoolbar : function(toolbar) {
							var me = this;
							var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
							toolbar.append(container);
							container.append('<i class="fa fa-list fa-md"></i>&nbsp; QC Parameter Details <div class="pull-right">(select row to delete)&nbsp;<div style="margin-bottom: 10px;" id="deleteQCParam" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
							$("#deleteQCParam").jqxButton();

							$("#deleteQCParam").on('click', 	function() {
								var selectedrowindex = $("#parameterDetailsGridF").jqxGrid('getselectedrowindex');
								var rowscount = $("#parameterDetailsGridF").jqxGrid('getdatainformation').rowscount;
							
								if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
									var id = $("#parameterDetailsGridF").jqxGrid('getrowid', selectedrowindex);
									var commit = $("#parameterDetailsGridF").jqxGrid('deleterow',	id);
								}
								for (var i = 0; i < rowscount; i++) { 
									$("#parameterDetailsGridF").jqxGrid("setcellvalue",i,"artLinkSlNo",i + 1);									
								}
							});
						},
						columns : [ 
							{text : 'GR No', datafield : 'grDetId', hidden:true, width : '10%', cellsalign : 'center', align : 'center'},
							{text : 'GR No', datafield : 'grNo', width : '10%', cellsalign : 'center', align : 'center'},
							{text : 'GR Sl No', datafield : 'grSlNo', width : '10%', cellsalign : 'center', align : 'center'},
							{text : 'Qc Parameter details', datafield : 'qcParamValue',	width : '700%', cellsalign : 'left',	editable : false}
						]
					});
               }

/* Clear Form Filter and Re-set to default search and clear Grid data */

$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$("#qcFGSection").hide();
	$("#parameterDetailsGridF").jqxGrid('clear');
	$("#parameterDetailsGridF").hide();
	$('#qcFg').trigger("reset");
	$(this).find('form').trigger('reset');
	window.location.href="javascript:showContentPage('qcFg', 'bodySwitcher')";
});

var updateRowData = function(row, rowId, resp){
	 var psrNumber =  $("#jqxgrid").jqxGrid('getcellvalue', row, 'psrNumber');
	 var rework = $("#jqxgrid").jqxGrid('getcellvalue', row, 'rework');
	var rowData = $("#jqxgrid").jqxGrid('getrowdatabyid', rowId);
	console.log(rework);
 	if(resp.defaultStoreDcType != "" || resp.defaultStoreDcType != null){
 		rowData['StoreDc'] = resp.defaultStoreDcType;
 		rowData['statusN'] = resp.defaultStoreDcType;
 	}
	if(psrNumber == null && rework == "Reject"){	 
		rowData['location'] =	null;							 
		rowData['locationN'] = null;
	}else{
		rowData['location'] = resp.locationList.id;
	 	rowData['locationN'] = resp.locationList.name;
	 }
	 rowData['storeId'] = resp.StoreDcList.id;
	 rowData['storeIdN'] = resp.StoreDcList.name;
	 rowData['zoneType'] = 	resp.zone.id;
	 rowData['zoneN'] = resp.zone.name;
	 rowData['costBorneBy'] = resp.costBornBy.id;
	 rowData['costBorneByN'] = 	resp.costBornBy.name;
	 rowData['toVendorCode'] = resp.vendors.id;
	 rowData['vendorCodeN'] = resp.vendors.name;
	 rowData['toVendor'] = 	resp.isVendorEnable;
	 rowData['toStoreOrDC'] = resp.isStoreDcEnable;
	 rowData['storeOrDC'] = resp.isStoreDcTypeEnable;
	 rowData['toLocation'] = resp.isLocationEnable;
	 rowData['toParamQc'] = resp.isParamMandatory;
	 rowData['isZoneType'] = resp.isZoneEnable;
	 rowData['isCostBornByEnable'] = resp.isCostBornByEnable;
	 rowData['costBrnBy'] = resp.isCostBornByEnable;	
	 $('#jqxgrid').jqxGrid('updaterow', rowId, rowData);
}

var cellvalueChangeQcStatus = function(row, datafield, columntype, oldvalue, newvalue){
	if(newvalue){
		var grId = $("#jqxgrid").jqxGrid('getcellvalue', row, 'grId');
		var fieldFilterS = {"grDetId":grId,"qcStatus":newvalue};   
		
		postJSON('/OrderExecution/api/v1/getStoreDcAndFlags', JSON.stringify(fieldFilterS), function(data) {
		 
		 if(typeof data != "undefined" && data.resCode == 1){
			 var resp = data.payload;		
			 	var datarow = $("#jqxgrid").jqxGrid('getrows');
			 	for(var i =0; i<datarow.length; i++){
			 		if(datarow[i].boundindex == row){
			 			updateRowData(row, i, resp);
			 		}
			 	}
			 	
			}else{
			 $.growl.error({message : data.mesgStr,	duration : 10000,title   : 'Error'});
				 return false;
			 }
		 });
	}else{
		$.growl.error({
			message : "Please Select QC Status !!",
			duration : 1000,
			title : 'Error'
		});
		return "";
	}
	
}

// Common Editable or Non Editable field check
var commonEditableFieldCheck = function(row,datafield,displayfield){
	if(datafield == "qcparamC"){
		var toParamQc = $("#jqxgrid").jqxGrid('getcellvalue',row,'toParamQc'); 
		if(toParamQc == "Yes") { return true; }else{ return false;}
	}
	if(datafield == "reason"){
		var rework = $('#jqxgrid').jqxGrid('getcellvalue', row, 'rework');
	    var orderType = $('#jqxgrid').jqxGrid('getcellvalue', row, 'orderType');
	    if (rework == "Reject" || orderType =="CU"){return true;}else{return false;}
	}
	
	if(datafield == "statusDesc"){
		var rework = $('#jqxgrid').jqxGrid('getcellvalue', row, 'rework');
		if( rework == "Accept" ||  rework == "Reject" ||  rework == "Unsetting" ||  rework == "Purity Testing"){return false;}else{return true;}
	}
	
	if(datafield == "StoreDc"){
		var storeOrDC = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDC');			
		if(storeOrDC == "No"){return false;}else{return true;}
	}
	
	if(datafield == "storeId"){
		 var StoreDc = $('#jqxgrid').jqxGrid('getcellvalue', row, 'StoreDc');
		 var toStoreOrDC = $('#jqxgrid').jqxGrid('getcellvalue', row, 'toStoreOrDC');		   			
		 if(StoreDc == "" || StoreDc == null || toStoreOrDC == "No"){$.growl.error({message : "Please select Store/DC",duration : 10000,	title : 'Error'}); return false;}else{return true;}
	}
	
	if(datafield == "zoneType"){
		var zoneTypes = $('#jqxgrid').jqxGrid('getcellvalue', row, 'zoneTypes');
 		var isZoneType = $('#jqxgrid').jqxGrid('getcellvalue', row, 'isZoneType');  	   			
 		if(zoneTypes == "Yes" || isZoneType == 'Yes'){return true;}else{return false;}
	}
	
	if(datafield == "zoneType"){
		var toLocation = $('#jqxgrid').jqxGrid('getcellvalue', row, 'toLocation');	    	
		if(toLocation == "No"){	return false;}else{	return true;}	
	}
	
	if(datafield == "toVendorCode"){
		var toVendor = $('#jqxgrid').jqxGrid('getcellvalue', row, 'toVendor');					
		if(toVendor == "Yes"){return true;}else{return false;}	
	}
	
	if(datafield == "costBorneBy"){
		var costBrnBy = $('#jqxgrid').jqxGrid('getcellvalue', row, 'costBrnBy');	
		if(costBrnBy == "No"){return false;	}else{return true;}	
	}
	
	if(datafield == "selectionStatus"){
		var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'selectionStatus');		
		if(datafield == "selectionStatus" &&  selectionStatus == false){return true;}else{return true;}
	}
	
	if(datafield == "reasonUnsetting"){
		var rework = $('#jqxgrid').jqxGrid('getcellvalue', row, 'rework');
		 if (rework == "Unsetting"){return true;}else{return false;}
	}
}

// On Load QC Status
var onloadQCStatus = function (row, cellvalue, editor) {
	editor.on('click', function(event){
		var grId = $("#jqxgrid").jqxGrid('getcellvalue', row, 'grId');
		var fieldFilter = {"grDetId":grId};    	 
		postJSON('/OrderExecution/api/v1/getQcStatus', JSON.stringify(fieldFilter), function(data) {
			editor.jqxDropDownList({ source: data.payload.qcStatusList , displayMember: 'name', valueMember: 'id'});		
		});
	});
}

// On Load Store/DC
var onloadStoreDC = function(row, cellvalue, editor, rowBoundIndex, datafield, columntype, value) {					
	editor.on('click', function(event){
		var StoreDcTypeList = [{"id" : "Store","name" : "Store"}, {"id" : "DC","name" : "DC"}];	
		var qcStatus = $('#jqxgrid').jqxGrid('getcellvalue', row, 'rework');
		if(typeof qcStatus == "undefined" || qcStatus == null){
			$.growl.error({
				message : "Please Select the Qc Status",
				duration : 10000
			});
			return false;
		}else{
			editor.jqxDropDownList({ source: StoreDcTypeList , displayMember: 'name', valueMember: 'id'});
		}	
	});
}

var onloadTOStoreDC = function (row, cellvalue, editor) { 
	editor.on('click', function(event){
		var StoreDc = $('#jqxgrid').jqxGrid('getcellvalue', row, 'StoreDc');		
		var storeDcList = [];
		(StoreDc == 'Store') ? storeDcList = qcFgLov.storeList : storeDcList = qcFgLov.dcList;	
		editor.jqxDropDownList({ source: storeDcList , displayMember: 'name', valueMember: 'id'});
	});
}

var onchangeToStoreDC = function(row, datafield, columntype,oldvalue, newvalue) {
	var StoreDc = $('#jqxgrid').jqxGrid('getcellvalue', row, 'StoreDc');
	var grId = $("#jqxgrid").jqxGrid('getcellvalue', row, "grId");
	var rework = $('#jqxgrid').jqxGrid('getcellvalue', row, 'rework');
		
	if(StoreDc == 'DC' && newvalue.value == qcFgLov.loggedInDcId ){
		var fieldFilterS = {"grDetId":grId,"qcStatus":rework,	"storeDcId":newvalue.value,"storeDcType":StoreDc}; 			        
		postJSON('/OrderExecution/api/v1/getToLocations', JSON.stringify(fieldFilterS), function(data) {
			var resp1 = data.payload.locationList;
	    	$.each(resp1, function(k, v){
	    		if(v.name==data.payload.defaultLocation){
	    			$("#jqxgrid").jqxGrid("setcellvalue" , row, 'location', v.name);      					
	    			$("#jqxgrid").jqxGrid('setcellvalue', row, 'locationN', v.description);
	    		}
	    	});
	    	
	    	$("#jqxgrid").jqxGrid("setcellvalue" , row, 'toLocation', data.payload.isLocationEnable);  
		});	
	}
	else{
		$("#jqxgrid").jqxGrid("setcellvalue" , row, 'location', "TRA");      					
		$("#jqxgrid").jqxGrid('setcellvalue', row, 'locationN', "TRA");
	}

    if(StoreDc == 'DC' && qcFgLov.loggedInDcId == newvalue.value){
		 $("#jqxgrid").jqxGrid('setcellvalue', row, 'zoneTypes', 'Yes');
		 $("#jqxgrid").jqxGrid('setcellvalue', row, 'isZoneType', 'Yes');
	}
	 else{
		 $("#jqxgrid").jqxGrid('setcellvalue', row, 'zoneTypes', 'No');
		 $("#jqxgrid").jqxGrid('setcellvalue', row, 'isZoneType', 'No');
		 
		 $("#jqxgrid").jqxGrid("setcellvalue" , row, 'zoneType', null);      					
		 $("#jqxgrid").jqxGrid('setcellvalue', row, 'zoneN', null);
	 }

 }	

var onloadToZoneType = function (row, cellvalue, editor) { 
	editor.on('click', function(event){
		var storeOrDC = $('#jqxgrid').jqxGrid('getcellvalue', row, 'StoreDc');
		var storeOrDCId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeId'); 
		var zoneList = [];
		if(storeOrDC == "DC" && qcFgLov.loggedInDcId == storeOrDCId){
			zoneList = qcFgLov.zoneList;
		}
		editor.jqxDropDownList({ source: zoneList , displayMember: 'description', valueMember:'id'});
	});
}

var onloadToLoc = function (row, cellvalue, editor) { 
	editor.on('click', function(event){
		var grId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'grId');
		var rework = $('#jqxgrid').jqxGrid('getcellvalue', row, 'rework');
		var StoreDc = $('#jqxgrid').jqxGrid('getcellvalue', row, 'StoreDc');
		var storeId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeId');
	
	    var fieldFilterS = {"grDetId":grId,"qcStatus":rework,"storeDcId":storeId,"storeDcType":StoreDc};    	 
	    postJSON('/OrderExecution/api/v1/getToLocations', JSON.stringify(fieldFilterS), function(data) {          					          				
	    	editor.jqxDropDownList({ source: data.payload.locationList , displayMember: 'description', valueMember: 'name'});
	   });
	});
}

// On Load Vendor
var onLoadToVendor = function (row, cellvalue, editor) { 
	editor.on('click', function(event){
		var grId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'grId');
		var rework = $('#jqxgrid').jqxGrid('getcellvalue', row, 'rework');
		var fieldFilterS = {"grDetId":grId,"qcStatus":rework};    	 
		postJSON('/OrderExecution/api/v1/getVendors', JSON.stringify(fieldFilterS), function(data) {          					          				
			editor.jqxDropDownList({ source: data.payload.vendors , displayMember: 'description', valueMember:'id'});
		});
	});
}

var onLoadcostBorneBy = function (row, cellvalue, editor) { 
	editor.on('click', function(event){
		var grId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'grId');
		var rework = $('#jqxgrid').jqxGrid('getcellvalue', row, 'rework');		
		if(rework == "Rework"){	
			var fieldFilterS = {"grDetId":grId,"qcStatus":rework};     	
			postJSON('/OrderExecution/api/v1/getCostBornBy', JSON.stringify(fieldFilterS), function(data) {         					          				
				editor.jqxDropDownList({ source: data.payload.costBornBy , displayMember: 'name', valueMember:'id'});
			});
		}
	});
}

// On Load Reason
var onLoadReason = function (row, cellvalue, editor) {
	editor.on('click', function(event){
		$.getJSON('/OrderExecution/api/v1/qcUnsetPurityTestLOV', function(data) {
	  		editor.jqxDropDownList({ source: data.payload.unSettingReason , displayMember: 'name', valueMember: 'id'});
		}); 
	});
}

// Common Method On Change QC Coloumn
var onchangeCommonQC = function(row, datafield, columntype,oldvalue, newvalue ) {
	$("#jqxgrid").jqxGrid("setcellvalue" , row, 'storeId', null);      					
	$("#jqxgrid").jqxGrid('setcellvalue', row, 'storeIdN', null);
	$("#jqxgrid").jqxGrid("setcellvalue" , row, 'location', null);      					
   	$("#jqxgrid").jqxGrid('setcellvalue', row, 'locationN',null);
   	$("#jqxgrid").jqxGrid("setcellvalue" , row, 'zoneType', null);      					
   	$("#jqxgrid").jqxGrid('setcellvalue', row, 'zoneN',null);			
   	$("#jqxgrid").jqxGrid('setcellvalue', row, 'toStoreOrDC', 'Yes'); 
}



var qcFgGrid = function () {
	var updateRows = function(rowid, newdata, commit) {		
		commit(true);
	}
	
	var StoreDcTypeList = [{"id" : "Store","name" : "Store"}, {"id" : "DC","name" : "DC"}];	
	var stateNameSourceE = {datatype : 'json',datafields : [ {name : 'id',type : 'string'}, {name : 'name',	type : 'string'}],localdata : StoreDcTypeList};
	var storeDCTypeDataAdapter = new $.jqx.dataAdapter(stateNameSourceE, {	autoBind : true});
	
	var	datafields  = [ 
		{'name' : 'grId',	'type' : 'int', 'map' : 'id'},
		{'name' : 'createDate',	'type' : 'string'},
		{'name' : 'vendorCode',	'map' : 'grHeader>vendor>vendorCode', 'type' : 'long'},
		{'name' : 'qcparamC', 'type' : 'String'},
		{'name' : 'id',	'type' : 'int'},
		{'name' : 'statusN', value : 'StoreDc', values : {	source : storeDCTypeDataAdapter.records, value : 'id', name : 'name'}},
		{'name' : 'grHid', 'map' : 'grHeader>id', 'type' : 'long'},
		{'name' : 'serialNumber', 'type' : 'long'},
		{'name' : 'psrNumber', 'type' : 'long'},
		{'name' : 'articleDescripton', 'type' : 'String'},
		{'name' : 'reasonUnsetting', 'type' : 'String'},
		{'name' : 'articleCode', 'type' : 'string'},
		{'name' : 'jewelryType', 'type' : 'string'},
		{'name' : 'recieptPieces', 'type' : 'long'},
		{'name' : 'grossWeight', 'type' : 'double'},
		{'name' : 'netWeight', 'type' : 'double'},
		{'name' : 'acceptOrReject', 'type' : 'String'},
		{'name' : 'rework', 'type' : 'String'},
		{'name' : 'storeId', 'type' : 'long'},
		{ 'name' : 'storeList', value : 'code', values : {source : storeList, value : 'id', name : 'name'}},
		{'name' : 'zoneType', 'type' : 'String'},
		{'name' : 'location', 'type' : 'String'},
		{'name' : 'StoreDcTypeList', 'type' : 'string'},
		{'name' : 'metalSegment', 'type' : 'long'},
		{'name' : 'toParamQc', 'type' : 'string'},
		{'name' : 'reason', 'type' : 'String'},
		{'name' : 'reason', 'type' : 'String'},
		{'name' : 'toVendorCode', 'type' : 'long'},
		{'name' : 'selectionStatus', 'type' : 'bool'},
		{'name' : 'statusDesc', 'type' : 'string'},
		{'name' : 'toStoreOrDC', 'type' : 'string'},
		{'name' : 'storeOrDC', 'type' : 'string'},
		{'name' : 'toLocation', 'type' : 'string'},
		{'name' : 'isCostBornByEnable', 'type' : 'string'},
		{'name' : 'hsnCode', 'type' : 'string' , 'map' : 'hsnMaster>description'}
	];	
	
	var columns = [ 
		{'text' : 'GR Date', 'datafield' : 'createDate', 'width' : '4%', sortable : true, editable : false},
		{'text' : 'GR No.', 'datafield' : 'grHid', 'width' : '4%', sortable : true, editable : false},
		{'text' : 'GR Sl.No.', 'datafield' : 'serialNumber', 'width' : '4%', sortable : true, editable : false},
		{'text' : 'PSR', 'datafield' : 'psrNumber', 'width' : '4%', sortable : true, editable : false},
		{'text' : 'Vendor Code', 'datafield' : 'vendorCode', 'width' : '5%', sortable : true, editable : false},
		{'text' : 'Article Code', 'datafield' : 'articleCode', 'width' : '5%', sortable : false, editable : false},
		{'text' : 'Article Description', 'datafield' : 'articleDescripton', sortable : false, 'width' : '8%', editable : false},
		{'text' : 'Jewel Type', 'datafield' : 'jewelryType', 'width' : '5%', sortable : false, editable : false},
		{'text' : 'Pcs', 'datafield' : 'recieptPieces', 'width' : '4%', sortable : false, editable : false},
		{'text' : 'Gross wt.', 'datafield' : 'grossWeight', 'width' : '4%', cellsformat : 'd3', sortable : false, editable : false},
		{'text' : 'Net wt.', 'datafield' : 'netWeight',	'width' : '4%', cellsformat : 'd3', sortable : false,	editable : false},		
		{'text' : 'QC Param', 'datafield' : 'qcparamC', 'width' : '3%', editable : false, sortable : false, cellsrenderer:qcParameterLinkRenderer,cellbeginedit : commonEditableFieldCheck}, 
		{'text' : 'QC Status', 'datafield' : 'rework', 'width' : '4%', align:"center", editable : true, sortable : false, columnType: 'dropdownlist',createeditor : onloadQCStatus, cellvaluechanging : cellvalueChangeQcStatus}, 
		{'text' : 'QC Reject Reason', 'datafield' : 'reason',	'width' : '5%', sortable : false,cellbeginedit : commonEditableFieldCheck},
		{'text' : 'RWK/Restart/Add desc', 'datafield' : 'statusDesc', 'width' : '5%', editable : true, sortable : false,cellbeginedit : commonEditableFieldCheck},
		{'text' : 'Store/DC', 'datafield' : 'StoreDc', 'width' : '4%',align:'center',columntype : 'dropdownlist',displayfield : 'statusN',createeditor : onloadStoreDC, cellvaluechanging: onchangeCommonQC, editable : true, sortable : false,cellbeginedit : commonEditableFieldCheck},
		{'text' : 'To Store/DC', 'datafield' : 'storeId', 'width' : '5%', editable : true, selectionmode: 'singlecell',displayfield : 'storeIdN',columnType: 'dropdownlist',cellsalign : 'center',align:'center',createeditor: onloadTOStoreDC, cellvaluechanging: onchangeToStoreDC, sortable : false,cellbeginedit : commonEditableFieldCheck},
		{'text' : 'To Zone Type', 'datafield' : 'zoneType', 'width' : '5%',cellbeginedit: commonEditableFieldCheck,editable : true,displayfield : 'zoneN',sortable : false,columnType: 'dropdownlist',createeditor : onloadToZoneType},
		{'text' : 'To Loc', 'datafield' : 'location', 'width' : '4%', cellsformat : 'd2', editable : true, sortable : false,displayfield : 'locationN',columnType: 'dropdownlist',	cellbeginedit : commonEditableFieldCheck, createeditor: onloadToLoc},
		{'text' : 'To Vendor', 'datafield' : 'toVendorCode', 'width' : '4%', sortable : false, editable : true,cellbeginedit : commonEditableFieldCheck,displayfield : 'vendorCodeN',columnType: 'dropdownlist',createeditor : onLoadToVendor},
		{'text' : 'Cost Borne By', 'datafield' : 'costBorneBy', 'width' : '3%', align:"center", editable : true, sortable : false, columnType: 'dropdownlist', displayfield : 'costBorneByN',cellbeginedit :commonEditableFieldCheck, createeditor : onLoadcostBorneBy},
		{'text' : 'Reason for Unsetting', 'datafield' : 'reasonUnsetting', 'width' : '4%', align:"center", editable : true, sortable : false, columnType: 'dropdownlist',displayfield: 'reasonUnsettingN', cellbeginedit : commonEditableFieldCheck, createeditor : onLoadReason},
		{'text' : '', sortable : false, datafield : 'selectionStatus', columntype : 'checkbox',  width : '3%',cellbeginedit : commonEditableFieldCheck},
		
		// All Hidden Field
		{'text' : '', 'datafield' : 'toStoreOrDC', hidden : true},
		{'text' : '', 'datafield' : 'storeOrDC', hidden : true},
		{'text' : '', 'datafield' : 'toLocation', hidden : true},
		{'text' : '', 'datafield' : 'toParamQc', hidden : true},
		{'text' : '', 'datafield' : 'toVendor',	hidden : true},
		{'text' : '', 'datafield' : 'costBrnBy', hidden : true},
		{'text' : '', 'datafield' : 'isZoneType', hidden : true},
		{'text' : '', 'datafield' : 'isCostBornByEnable', hidden : true},
		{'text' : '', 'datafield' : 'zoneTypes', hidden : true}
	];
	
	showMyGrid(datafields, "/OrderExecution/api/v1/qcFgList", "list", columns,qcFgFilterValues(), updateRows, "createDate");
	
	
	$("#jqxgrid").jqxGrid({
		width : '100%',
		editable : true,
		columnsheight : 50,
		theme: 'energyblue',
		sortable: true,
		columnsresize: true, 
		virtualmode: true,
		height: '240px'		
	});	
}

$("#Search").on('click', function() {	
	/*var qcSearchArray = [];
	var params = qcFgFilterValues();
	postJSON('/OrderExecution/api/v1/qcFgList', JSON.stringify(params), function(data) {
		if(data.resCode == 1 && typeof data != "undefined"){
			var obj = data.payload;	
			qcSearchArray.push(obj);
		}
		qcFgGrid(qcSearchArray);
	});
	*/
	qcFgGrid();
	$("#jqxgrid").show();
	$("#qcFGSection").show();
	return false;
});

var qcFgFilterValues = function(){
	fieldFilters = {
			"fieldFilters" : {}
		};
		var grNo;
		
		var vendorCode = $('#vendorCode-value').val();
		var grFgNoS = $("#grFgNoS").val();
		var grStoneNoVendor = $("#grNo option:selected").val();
		
		if(vendorCode == null || vendorCode == ""){
			grNo = grFgNoS;
		}else{
			grNo = grStoneNoVendor;
		}
		
		if(grNo != ""  && grNo != null){
			fieldFilters.fieldFilters["grNo"] = grNo;
		}
		
		if (vendorCode != "" && vendorCode != null) {
			fieldFilters.fieldFilters["vendorCode"] = vendorCode;
		}
		return fieldFilters;
}
// adding the validation to grid
function isValidAllqcFGDetails(data) {
	if(data.length == 0){
		$.growl.error({
			message : "Please select atleast one row.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		for (var i = 0; i < data.length; i++) {	
				/*if(data[i].hsnId == null || data[i].hsnId == ""){
					$.growl.error({
						message : "Please select HSN Code.",
						duration : 10000
					});
					return false;
				}*/
				if (typeof data[i].qcStatus.name  == "undefined") {
					$.growl.error({
						message : "Please select Qc Status.",
						duration : 10000
					});
					return false;
				}
				if ((data[i].psrNumber  == null && data[i].qcStatus.name  == "Reject") && data[i].toLocation.name == null) {
					$.growl.error({
						message : "Please select Location.",
						duration : 10000
					});
					return false;
				}
				 
				if (data[i].qcStatus.name  == "Reject") {
					if(data[i].reasonForRejection == "" || data[i].reasonForRejection == null){
						$.growl.error({
							message : "QC Reason is mandatory for Qc Status Reject.",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
				}
				
				if(data[i].toLocationFlag == "Yes"){
					if(typeof data[i].toLocation.name == "undefined"){
						$.growl.error({
							message : "Please select To location Type.",
							duration : 10000
						});
						return false;
					}
				}
				if(data[i].toParamQcFlag == "Yes"){
					if(data[i].qcparam.length == 0){
						$.growl.error({
							message : "Please select To QC Parameter for GR No " + data[i].grHid + " With Sl No " + data[i].serialNumber + " !!!",
							duration : 10000
						});
						return false;
					}
				}
				if(data[i].toVendorFlag == "Yes"){
					if(typeof data[i].toVendor.id == "undefined"){
						$.growl.error({
							message : "Please select To Vendor.",
							duration : 10000
						});
						return false;
					}
				}
				
				if(data[i].toZoneTypeFlag == "Yes"){
					if(typeof data[i].toZoneType.zoneTypeId == "undefined"){
						$.growl.error({
							message : "Please select zone type.",
							duration : 10000
						});
						return false;
					}
				}
				if(data[i].isCostBornByEnable == "Yes"){
					if(typeof data[i].costBorneBy.id == "undefined"){
						$.growl.error({
							message : "Please select To Cost Born By.",
							duration : 10000
						});
						return false;
					}
				}
				if (typeof data[i].storeOrDcType.id  == "undefined") {
					$.growl.error({
						message : "Please select Store/DC.",
						duration : 10000
					});
					return false;
					
					if(data[i].storeOrDcType.id == "DC"){
						if(typeof data[i].toZoneType.zoneTypeId == "undefined"){
							$.growl.error({
								message : "Please select to zone type.",
								duration : 10000
							});
							return false;
						}
					}
				}
				if (typeof data[i].toStoreOrDc.id  == "undefined") {
					$.growl.error({
						message : "Please select To Store/DC",
						duration : 10000
					});
					return false;
				}
				
				if (typeof data[i].toStoreOrDc.id  == "undefined") {
					$.growl.error({
						message : "Please select To Store/DC",
						duration : 10000
					});
					return false;
				}
		}
		return true;
	}
}

// saving of the records 
$("#saveQCFG").on("click",function(e) {
	
	var qcParamArray = [];
	
	var parameterDetailsGridF = $("#parameterDetailsGridF").jqxGrid('getrows');
	var sysdate = moment().format('DD-MM-YYYY HH:mm:SS A');		
	
	var masterRows = $("#jqxgrid").jqxGrid('getrows');
   if(typeof masterRows != "undefined"){	
		for (var i = 0; i < masterRows.length; i++) {   
	    	var parameter = { "qcparam" : []};
	    	
	    	
			if(masterRows[i].selectionStatus == true){				
				parameter["qcStatus"] = { "name": masterRows[i].rework};
				parameter["costBorneBy"] = { "id": masterRows[i].costBorneBy};
				
				parameter["grHid"] = masterRows[i].grHid;
				parameter["hsnId"] = masterRows[i].hsnCode;
				parameter["psrNumber"] = masterRows[i].psrNumber;
			    parameter["serialNumber"]= masterRows[i].serialNumber;
			    parameter["reasonForRejection"] = masterRows[i].reason;
			    parameter["reworkRestoreAddDesc"] = masterRows[i].statusDesc;
				parameter["toZoneType"] = { "zoneTypeId": masterRows[i].zoneType};
				parameter["toZoneTypeFlag"] =  masterRows[i].isZoneType;
				parameter["toLocation"] = { "name": masterRows[i].location};
				parameter["toParamQcFlag"] =  masterRows[i].toParamQc;
				parameter["toLocationFlag"] = masterRows[i].toLocation;
				parameter["storeOrDcType"] = { "id": masterRows[i].StoreDc};
				parameter["toVendor"] = { "id": masterRows[i].toVendorCode};
				parameter["toVendorFlag"] = masterRows[i].toVendor;
				parameter["isCostBornByEnable"] = masterRows[i].isCostBornByEnable;
				
				parameter["toStoreOrDc"] = { "id": masterRows[i].storeId}; 
				parameter["unsettingReason"] = { "id": masterRows[i].reasonUnsetting}; 
				
				
				if(typeof parameterDetailsGridF != "undefined"){
					for(var j=0; j<parameterDetailsGridF.length; j++){
						if(masterRows[i].id == parameterDetailsGridF[j].grDetId){
							parameter['qcparam'] = parameterDetailsGridF[j].paramDetObj;
						}
					}
				}
				qcParamArray.push(parameter);
				checkVal = true;
			}
	    }
   }
if(isValidAllqcFGDetails(qcParamArray)) {
	var $link = $(e.target);
	e.preventDefault();
	if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 500) {
	postJSON('/OrderExecution/api/v1/createQCFG', JSON.stringify(qcParamArray), function(data) {
		if (data.resCode == 1 && typeof data != "undefined") {
			$("#saveQCFG").prop('disabled', true);
			if(data.payload.Failure == null || data.payload.Failure.length == 0) {
				$.growl.notice({
					message : data.payload.success[0],
					duration : 10000,
					title : 'Saved GR details:'
				});
				redirect();
			}
			
			if(data.payload.success == null || data.payload.success.length == 0) {
				$("#saveQCFG").prop('disabled', false);
				$.growl.error({
					message : data.payload.Failure[0],
					title : 'Failed GR Details:',
					duration : 10000
				});
			}
			
			/*$("#parameterDetailsGridF").jqxGrid('clear');
			$("#parameterDetailsGridF").hide();
			qcFgGrid();*/
			
			
		}else{
			$("#saveQCFG").prop('disabled', false);
			$.growl.error({	message : data.mesgStr,	duration : 10000,title : 'Error'});
			return false;
		}		
	});	
	}
	
  }
	$link.data('lockedAt', +new Date());
	$("#saveQCFG").prop('disabled', false);
});

$('#qcParameter').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});