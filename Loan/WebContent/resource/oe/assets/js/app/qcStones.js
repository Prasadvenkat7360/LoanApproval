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

var qcStoneLov = null;
$("#qcStoneSection").hide();
$.getJSON('/OrderExecution/api/v1/getQCLOVs',
		function(data) {
	qcStoneLov = null;
	qcStoneLov = data.payload;
});


$.getJSON('/OrderExecution/api/v1/getVendorLOV?type=S',
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
		

	$("#vendorCodeStone").autocomplete({

		source : data,
		focus : function(event, ui) {

			event.preventDefault();
			$(this).val(ui.item.label);

		},
		select : function(event, ui) {
			event.preventDefault();
			$(this).val(ui.item.label);
			$("#vendorCodeStone-value").val(ui.item.value);
		}

	});

});
$("#grStoneNoVendor").prop('disabled', true);
$("#vendorCodeStone").on('change', function(){
	var value = $("#vendorCodeStone-value").val();
	
	$('#grStoneNoVendor').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/getGrHeaderIdsForVendorQcStones?vendorId=' + value, function(data) {
		if(data.resCode == 1){
			$("#grStoneNoVendor").prop('disabled', false);
			var grNos = data.payload.list;
			$.each(grNos, function(k, v) {
				$('#grStoneNoVendor').append('<option  value="' + v.id + '">' + v.id + '</option>');
			});
			$("#grStoneNo").val('');
		}else{
			$("#grStoneNoVendor").prop('disabled', true);
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
			
		}
	});
});

$("#grStoneNo").on('keypress', function(){
	$("#vendorCodeStone").val('');
	$("#vendorCodeStone-value").val('');
	$('#grStoneNoVendor option[value=""]').attr('selected','selected');
});

$("#grStoneNo").prop('disabled', false);
$("#grStoneNoVendor").on('change', function(){
	var value = $(this).val();
	$("#grStoneNo").val('');
	if(value == null || value == ""){
		$("#grStoneNo").prop('disabled', false);		
	}else{
		$("#grStoneNo").prop('disabled', true);
	}
});

var qcStoneFilterValues = function(){
	fieldFilters = {
			"fieldFilters" : {}
		};
		var grNo;
		
		var vendorCode = $('#vendorCodeStone-value').val();
		var grStoneNo = $("#grStoneNo").val();
		var grStoneNoVendor = $("#grStoneNoVendor option:selected").val();
		
		if(vendorCode == null || vendorCode == ""){
			grNo = grStoneNo;
			
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


var qcraParameterDetails = function(row) {
	var rows = $("#jqxgrid").jqxGrid('getrows');
	$("#rowIndex").val(row);
	var newVal;
	var segId = rows[row].segmentId;
	var grDetId = rows[row].grDetId;
	var grNoId = rows[row].grNo;
	var grSlNoId = rows[row].grSlNo;
	
	$("#grDetId").val(grDetId);
	$("#grNoId").val(grNoId);
	$("#grSlNoId").val(grSlNoId);
	
	$.getJSON('/OrderExecution/api/v1/qcParameterList?segmentId=' + segId, function(data) {

		var qcParmListDetails = data.payload.qcParmList;

		if (typeof qcParmListDetails != "undefined") {			
			$("#qcParameterDetailSection").empty().append('');
			$.each(qcParmListDetails, function(key, value) {
				newVal = "<tr>";
				newVal += '<td class="text-center">' + (key+1) + '</td>';
				newVal += '<td class="text-center">' + value.code + '<input type="hidden" value="'+value.code+'" /></td>';
				newVal += '<td class="text-center"><div>'+value.codeDescription+'</div></td>';
				newVal += '<td class="text-center"><select onchange="remarksEnable('+key+');" id="qcOption'+key+'">';
				newVal += '<option value="Yes" selected>Yes</option><option value="No">No</option></select>';
				newVal += '<td class="text-center"><textarea rows="1" class="form-control" disabled cols="25" id="remarks'+key+'"> </textarea></td>';
				newVal += "</tr>";
				$("#qcParameterDetailSection").append(newVal);
			});			
			
			
		}
	});

}

var remarksEnable = function(row){
	var qcOption = $("#qcOption"+row).val();
	if(qcOption == "Yes"){
		$("#remarks"+row).val('');
		$("#remarks"+row).prop('disabled', true);
	}else{
		$("#remarks"+row).val('');
		$("#remarks"+row).prop('disabled', false);
	}
}


var parameterDetailsGrid = function(data) {

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
	$("#parameterDetailsGrid").jqxGrid(
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
								var selectedrowindex = $("#parameterDetailsGrid").jqxGrid('getselectedrowindex');
								var rowscount = $("#parameterDetailsGrid").jqxGrid('getdatainformation').rowscount;
							
								if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
									var id = $("#parameterDetailsGrid").jqxGrid('getrowid', selectedrowindex);
									var commit = $("#parameterDetailsGrid").jqxGrid('deleterow',	id);
								}
								
								for (var i = 0; i < rowscount; i++) { 
									$("#parameterDetailsGrid").jqxGrid("setcellvalue",i,"artLinkSlNo",i + 1);									
								}
							});
						},
						columns : [ 
							{text : 'GR No', datafield : 'grDetId', hidden:true, width : '10%', cellsalign : 'center', align : 'center'},
							{text : 'GR No', datafield : 'grNo', width : '10%', cellsalign : 'center', align : 'center'},
							{text : 'GR Sl No', datafield : 'grSlNo', width : '10%', cellsalign : 'center', align : 'center'},
							{text : 'Qc Parameter details', datafield : 'qcParamValue',	width : '90%', cellsalign : 'left',	editable : false}
						]
					});
}

var qcraParameterModal = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" onclick="qcraParameterDetails('+row+');" data-toggle="modal"  id='+row+' data-target="#qcrameterDet" style="text-align:center; vertical-align: middle;  float:left; -webkit-align-content: center; marging:8px; align-content: center;" type="button" /><i class="fa fa-plus fa-sm"></i> </button>';
}

var qcStoneGrid = function(){
	
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
	var datafields = [
		{'name' : 'systemDate',	'type' : 'date', 'map' : 'createdDate'},
		{'name' : 'grNo',	'type' : 'long', 'map' : 'grHeaderNo'},
		{'name' : 'grDetId',	'type' : 'long', 'map' : 'id'},
		{'name' : 'grSlNo',	'type' : 'long', 'map' : 'serialNumber'},
		{'name' : 'vendorId',	'type' : 'int', 'map' : 'vendor>id'},
		{'name' : 'vendorCode',	'type' : 'string', 'map' : 'grHeader>vendor>description'},
		{'name' : 'segmentId', 'type' : 'int', 'map' : 'grHeader>stoneSegment>id'},
		{'name' : 'segment', 'type' : 'string', 'map' : 'grHeader>stoneSegment>description'},
		{'name' : 'mainCat', 'type' : 'string', 'map' : 'categoryDescription'},
		{'name' : 'subCat',	'type' : 'string', 'map' : 'subCategoryDescription'},
		{'name' : 'articleCode', 'type' : 'string', 'map' : 'stoneCode'},
		{'name' : 'clarity', 'type' : 'string', 'map' : 'clarity'},
		{'name' : 'color',	'type' : 'string', 'map' : 'color'},
		{'name' : 'actualColor', 'type' : 'string', 'map' : 'actualColor'},
		{'name' : 'cutGrade',	'type' : 'string', 'map' : 'cutGrade'},
		{'name' : 'noOfPcs',	'type' : 'int', 'map' : 'stonePcs'},
		{'name' : 'stoneWt',	'type' : 'float', 'map' : 'stoneWt'},
		{'name' : 'uqc',	'type' : 'string', 'map' : 'uom>name'},
		{'name' : 'qcParameter',	'type' : 'string'},
		{'name' : 'qcAcceptReject',	'type' : 'string'},
		{'name' : 'stockNo',	'type' : 'int', 'map' : 'packetId'},
		{'name' : 'storeOrDC',	'type' : 'string'},
		{'name' : 'storeOrDCId',	'type' : 'int'},
		{'name' : 'selectionStatus',	'type' : 'bool'},
		{'name' : 'rejectReason',	'type' : 'string'},
		{'name' : 'toZone',	'type' : 'string'},
		{'name' : 'toLocation',	'type' : 'long'},
		
		{'name' : 'isStoreDcEnable',	'type' : 'string'},
		{'name' : 'isParamEnable',	'type' : 'string'},
		{'name' : 'isStoreDcTypeEnable',	'type' : 'string'},
		{'name' : 'isLocationEnable',	'type' : 'string'},
		{'name' : 'isZoneEnable',	'type' : 'string'},
		{'name' : 'isParamMandatory',	'type' : 'string'}
	];
	
	var columns = [
		{'text' : 'GRDate', 'datafield' : 'systemDate', 'width' : '4%', 'cellsformat' : 'dd/MM/yyyy', sortable : true, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'GR NO', 'datafield' : 'grNo', 'width' : '4%', sortable : true, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : '', 'datafield' : 'grDetId', 'width' : '4%', hidden: true, sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		
		{'text' : '', 'datafield' : 'isStoreDcEnable', 'width' : '4%', hidden: true, sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : '', 'datafield' : 'isParamEnable', 'width' : '4%', hidden: true, sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : '', 'datafield' : 'isStoreDcTypeEnable', 'width' : '4%', hidden: true, sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : '', 'datafield' : 'isLocationEnable', 'width' : '4%', hidden: true, sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : '', 'datafield' : 'isZoneEnable', 'width' : '4%', hidden: true, sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : '', 'datafield' : 'isParamMandatory', 'width' : '4%', hidden: true, sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		
		
		{'text' : 'GR SL NO', 'datafield' : 'grSlNo', 'width' : '4%', sortable : true, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : '', 'datafield' : 'vendorId', 'width' : '4%', sortable : false, hidden: true, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Vendor Code', 'datafield' : 'vendorCode', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : '', 'datafield' : 'segmentId', 'width' : '4%', hidden: true,  sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Segment', 'datafield' : 'segment', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Main Cat', 'datafield' : 'mainCat', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Sub Cat', 'datafield' : 'subCat', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Article Code', 'datafield' : 'articleCode', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Clarity', 'datafield' : 'clarity', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Color', 'datafield' : 'color', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Actual Col', 'datafield' : 'actualColor', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Cut Grade', 'datafield' : 'cutGrade', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Pcs', 'datafield' : 'noOfPcs', 'width' : '3%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Stn Wt', 'datafield' : 'stoneWt', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center', cellsformat : 'd3',   columntype : 'numberinput',
			 createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						decimalDigits : 3
					});
				}
		},
		{'text' : 'UQC', 'datafield' : 'uqc', 'width' : '3%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'HSN Code', 'datafield' : 'hsnCode', 'width' : '4%', editable : true, sortable : false, columnType: 'dropdownlist',displayfield : 'hsnCodeN',
			createeditor: function (row, cellvalue, editor) { 
				editor.on('click', function(event){
					segId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'segmentId');
					console.log(segId);
					$.getJSON(('/OrderExecution/api/v1/hsnBySegmentHsnType?segmentId='+ segId+'&'+'hsnType=S'), function(data) {
						var res = data.payload.hsnMasterList;
						var hsnArry = [];
						$.each(res, function(k, v){
							hsnArry.push({
								"id" : v.id,
								"name" : v.hsnCode + ' ' +'-'+ ' ' + v.hsnDescription
							})
						});
          		  		editor.jqxDropDownList({source:hsnArry , displayMember:'name',valueMember:'id'});
					});
				});
			},
		},
		{'text' : 'QC Parameters ', 'datafield' : 'qcParameter', 'width' : '5%', sortable : false, editable : false, cellsalign : 'center', align : 'center', cellsrenderer : qcraParameterModal},
		{'text' : 'QC Accept/Reject', 'datafield' : 'qcAcceptReject', 'width' : '5%', sortable : false, editable : true, cellsalign : 'center', align : 'center', displayfield : 'qcAcceptRejectN', columntype : 'dropdownlist',
			createeditor : function(row, cellvalue,	editor) {
				
				var acceptRejecctArray = [{
					"id" : "AC",
					"name" : "Accept"
				},{
					"id" : "RJ",
					"name" : "Reject"
				}] 
				editor.jqxDropDownList({
					source : acceptRejecctArray,
					displayMember : 'name',
					valueMember : 'id'
				});
			},
			cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
				var grDetId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'grDetId');
				var fieldFilters = {"grDetId": grDetId,"qcStatus": newvalue.value};
				
				postJSON('/OrderExecution/api/v1/getStoreDcAndFlagsForQcStones', JSON.stringify(fieldFilters), function(data) {
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isStoreDcEnable', data.payload.isStoreDcEnable);
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isParamEnable', data.payload.isParamEnable);
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isStoreDcTypeEnable', data.payload.isStoreDcTypeEnable);
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isLocationEnable', data.payload.isLocationEnable);
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isZoneEnable', data.payload.isZoneEnable);
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isParamMandatory', data.payload.isParamMandatory);					
					
					$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocation', data.payload.locationList.id);
					$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocationN', data.payload.locationList.description);				
				
					$("#jqxgrid").jqxGrid('setcellvalue', row,'storeOrDC', data.payload.StoreOrDcType.id);
					$("#jqxgrid").jqxGrid('setcellvalue', row,'storeOrDCN', data.payload.StoreOrDcType.name);				
				
					$("#jqxgrid").jqxGrid('setcellvalue', row,'storeOrDCId', data.payload.StoreDc.id);
					$("#jqxgrid").jqxGrid('setcellvalue', row,'storeOrDCIdN', data.payload.StoreDc.name);
					
					
				});
			}
		},
		{'text' : 'Stone Packet/Stock NO.', 'datafield' : 'stockNo', 'width' : '4%', sortable : false, editable : false, cellsalign : 'center', align : 'center'},
		{'text' : 'Store/DC', 'datafield' : 'storeOrDC', 'width' : '4%', sortable : false, cellsalign : 'center', align : 'center', displayfield : 'storeOrDCN', columntype : 'dropdownlist',
			createeditor : function(row, cellvalue,	editor) {				
				var storeDcTypeArray = [{
					"id" : "Store",
					"name" : "Store"
				},{
					"id" : "DC",
					"name" : "DC"
				}] 
				editor.jqxDropDownList({
					source : storeDcTypeArray,
					displayMember : 'name',
					autoDropDownHeight: true, 
					valueMember : 'id'
				});
			},
			cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
				$("#jqxgrid").jqxGrid('setcellvalue', row,'storeOrDC', newvalue.value);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'storeOrDCN', newvalue.label);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'storeOrDCId', null);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'storeOrDCIdN', null);
				if(newvalue.value == "Store"){
					$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocation', "TRS");
					$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocationN', "TRS");
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isZoneEnable', "No");
				}else{
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isZoneEnable', "Yes");
					$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocation', null);
					$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocationN', null);
				}
				$("#jqxgrid").jqxGrid('setcellvalue', row,'toZone', null);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'toZoneN', null);
			},
			cellbeginedit : function(row) {
				var isStoreDcTypeEnable = $('#jqxgrid').jqxGrid('getcellvalue', row, 'isStoreDcTypeEnable');	
				if(isStoreDcTypeEnable == "Yes"){
					return true;
				}else{
					return false;
				}
			}
		},
		{'text' : 'Store/DC ID', 'datafield' : 'storeOrDCId', 'width' : '4%', sortable : false,  cellsalign : 'center', align : 'center', displayfield : 'storeOrDCIdN', columntype : 'dropdownlist',
			initeditor : function(row, cellvalue,	editor) {				
				editor.on('click',function(event) {
					
					var storeOrDC = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDC');
					console.log(storeOrDC);
					var storeDcList = [];
					if(storeOrDC == 'Store'){
						storeDcList = qcStoneLov.storeList;
					}
					else if(storeOrDC == 'DC'){
						storeDcList = qcStoneLov.dcList;
					}
					
					editor.jqxDropDownList({
						source : storeDcList,
						autoDropDownHeight: true, 
						displayMember : 'name',
						valueMember : 'id'
					});
				});
			},
			cellvaluechanging : function(row,datafield, columntype, oldvalue, newvalue, event) {
				var storeOrDC = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDC');
				$("#jqxgrid").jqxGrid('setcellvalue', row,'storeOrDCId', newvalue.value);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'storeOrDCIdN', newvalue.label);
				
				$("#jqxgrid").jqxGrid('setcellvalue', row,'rejectReason', null);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'toZone', null);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'toZoneN', null);

				var storeOrDC = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDC');
				var fieldFilters = {"storeOrDc":storeOrDC}
				if(storeOrDC == "DC" && qcStoneLov.loggedInDcId ==newvalue.value){

					var grDetId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'grDetId');
					var qcAcceptReject = $('#jqxgrid').jqxGrid('getcellvalue', row, 'qcAcceptReject');
					var storeOrDC = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDC');
					var storeOrDCId = newvalue.value;
					
					var fieldFilters = {"grDetId": grDetId.toString(),"qcStatus": qcAcceptReject, "storeDcType":storeOrDC,"storeDcId": storeOrDCId};
					
					postJSON('/OrderExecution/api/v1/getToLocationsForQcStone', JSON.stringify(fieldFilters), function(data) {
						$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocation', data.payload.locationList[0].id);
						$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocationN', data.payload.locationList[0].name);
						});
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isLocationEnable', "No");
					

					$("#jqxgrid").jqxGrid('setcellvalue', row,'isZoneEnable', "Yes");
				}
				else{
					$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocation', "TRS");
					$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocationN', "TRS");
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isZoneEnable', "No");
					$("#jqxgrid").jqxGrid('setcellvalue', row,'isLocationEnable', "No");
				}
			},
			cellbeginedit : function(row) {
				var isStoreDcEnable = $('#jqxgrid').jqxGrid('getcellvalue', row, 'isStoreDcEnable');	
				if(isStoreDcEnable == "Yes"){
					return true;
				}else{
					return false;
				} 
			}
		},		
		{'text' : 'Reject Reason', 'datafield' : 'rejectReason', 'width' : '4%', sortable : false, cellsalign : 'center', align : 'center',
			cellbeginedit : function(row) {
				var qcAcceptReject = $('#jqxgrid').jqxGrid('getcellvalue', row, 'qcAcceptReject');	
				if(qcAcceptReject == "AC"){
					return false;
				}else{
					return true;
				} 
			}
		},		
		{'text' : 'TO Zone', 'datafield' : 'toZone', 'width' : '4%', sortable : false, cellsalign : 'center', align : 'center', displayfield : 'toZoneN', columntype : 'dropdownlist',
			createeditor : function(row, cellvalue,	editor) {				
				editor.on('click',function(event) {
					var storeOrDC = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDC');
					var storeOrDCId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDCId');
					var zoneList = [];
					if(storeOrDC == "DC" && qcStoneLov.loggedInDcId ==storeOrDCId){
						zoneList = qcStoneLov.zoneList;
					}
					editor.jqxDropDownList({
						source : zoneList,
						displayMember : 'description',
						valueMember : 'id'
					});
				});
			},
			cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
				$("#jqxgrid").jqxGrid('setcellvalue', row,'toZone', newvalue.value);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'toZoneN', newvalue.label);
			},
			cellbeginedit : function(row) {
				var isZoneEnable = $('#jqxgrid').jqxGrid('getcellvalue', row, 'isZoneEnable');
				var storeOrDC = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDCN');
				if(storeOrDC == "Store"){
					return false;
				}
				var storeOrDCId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDCId');
				if(storeOrDC == "DC" && storeOrDCId != qcStoneLov.loggedInDcId){
					return false;
				}
				if(isZoneEnable == "Yes"){
					return true;
				} 
				else{
					return false;
				} 
			}
		},
		{'text' : 'TO Location', 'datafield' : 'toLocation', 'width' : '4%', sortable : false,  cellsalign : 'center', align : 'center', displayfield : 'toLocationN', columntype : 'dropdownlist', 
			createeditor : function(row, cellvalue,	editor) {				
				editor.on('click',function(event) {
					var grDetId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'grDetId');
					var qcAcceptReject = $('#jqxgrid').jqxGrid('getcellvalue', row, 'qcAcceptReject');
					var storeOrDC = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDC');
					var storeOrDCId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'storeOrDCId');
					
					var fieldFilters = {"grDetId": grDetId.toString(),"qcStatus": qcAcceptReject, "storeDcType":storeOrDC,"storeDcId": storeOrDCId};
					
					postJSON('/OrderExecution/api/v1/getToLocationsForQcStone', JSON.stringify(fieldFilters), function(data) {
						editor.jqxDropDownList({
							source : data.payload.locationList,
							displayMember : 'name',
							valueMember : 'id'
						});
					});
				});
			},
			cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
				$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocation', newvalue.value);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'toLocationN', newvalue.label);
			},
			cellbeginedit : function(row) {
				var isLocationEnable = $('#jqxgrid').jqxGrid('getcellvalue', row, 'isLocationEnable');	
				if(isLocationEnable == "Yes"){
					return true;
				}else{
					return false;
				} 
			}
		
		},
		{'text' : '', 'datafield' : 'selectionStatus', 'width' : '4%', sortable : false, cellsalign : 'center', align : 'center',  columntype : 'checkbox'}
	];
	
	showMyGrid(datafields, "/OrderExecution/api/v1/searchGrStonesForQc", "list", columns, qcStoneFilterValues(), updateRows, "");
	
	$("#jqxgrid").jqxGrid({
		editmode : 'click',
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 30,
		rowdetails : true,
		virtualmode : true
	});
}
	

$("#addQcParamDet").on('click', function() {	
	$("#parameterDetailsGrid").show();
	var rows = $("#parameterDetailsGrid").jqxGrid('getrows');
	var rowid = $("#rowIndex").val();
	var paramArray = [];
	var qcParamValue = "";
	 var itemsObj = {
			 "paramDetObj"  : []
	 };
	 
	 if(typeof rows == "undefined"){
		$('#qcParameterDetailForm tbody tr').each(function (k, v) {
				var paramObj = {
				        "code": $(this).find('input').val(),
				        "description": $(this).find('div').text(),
				        "remarks": $(this).find('textarea').val(),
				        "qcPass": {
				          "id": $(this).find('select').val()
				        }
			      }
				
				itemsObj['paramDetObj'].push(paramObj);
				 qcParamValue = qcParamValue + "" + "<b>Code :</b> " + $(this).find('input').val() + "," +
				 		" <b> Description :</b> "+ $(this).find('div').text() + 
				 		", <b>remarks : </b>" + $(this).find('textarea').val() + 
				 		", <b>QC Y/N : </b>" + $(this).find('select').val() + "; ";
			 });
			 itemsObj['grDetId'] = $("#grDetId").val();
			 itemsObj['grNo'] = $("#grNoId").val();
			 itemsObj['grSlNo'] = $("#grSlNoId").val();
			 itemsObj['qcParamValue'] = qcParamValue;
			 paramArray.push(itemsObj);	 
			 
			
	 }else{
		var testArray = [];
		var  grDetId = $("#grDetId").val(); 
		 for(var i=0; i<rows.length; i++){
			if(grDetId == rows[i].grDetId){
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
		 
		 
			 $('#qcParameterDetailForm tbody tr').each(function (k, v) {
	
					var paramObj = {
					        "code": $(this).find('input').val(),
					        "description": $(this).find('div').text(),
					        "remarks": $(this).find('textarea').val(),
					        "qcPass": {
					          "id": $(this).find('select').val()
					        }
				      }
					
					itemsObj['paramDetObj'].push(paramObj);
					 qcParamValue = qcParamValue + "" + "<b>Code :</b> " + $(this).find('input').val() + "," +
					 		" <b> Description :</b> "+ $(this).find('div').text() + 
					 		", <b>remarks : </b>" + $(this).find('textarea').val() + 
					 		", <b>QC Y/N : </b>" + $(this).find('select').val() + "; ";
			 });
			 
			 itemsObj['grDetId'] = $("#grDetId").val();
			 itemsObj['grNo'] = $("#grNoId").val();
			 itemsObj['grSlNo'] = $("#grSlNoId").val();
			 itemsObj['qcParamValue'] = qcParamValue;
			
			 paramArray.push(itemsObj);

	 }
	 
	 parameterDetailsGrid(paramArray);
	 $("#jqxgrid").jqxGrid('setcellvalue', rowid, 'qcParameter', true);
	 
});

$("#SearchStone").on('click', function() {	
	qcStoneGrid();
	$("#jqxgrid").show();
	$("#qcStoneSection").show();
	return false;
});


$("#saveQCStone").on('click', function(){
	
	
	var rows = $("#jqxgrid").jqxGrid('getrows');
	var parameterDetailsGrid = $("#parameterDetailsGrid").jqxGrid('getrows');
	var createQcStone = [];
	var checkBoxArr = [];
	if(typeof rows != "undefined"){
		
		for(var i=0; i<rows.length; i++){		
			
			var fieldFilter = {
					
					"toZoneType" : {},
					"qcStatus" : {},
					"toStoreOrDc" : {},
					"storeOrDcType" : {},			
					"qcForStoneDetails" : []
			}
			if(rows[i].selectionStatus == true){
				if(rows[i].qcParameter == "" || rows[i].qcParameter == null){
					$.growl.error({
						message : "Please select QC Parameter Details.",
						duration : 10000,
						title   : 'Error'
					});
					return false;
				}
				
				if(rows[i].qcAcceptReject == "" || rows[i].qcAcceptReject == null){
					$.growl.error({
						message : "Please select QC Accept/Reject Coloumn.",
						duration : 10000,
						title   : 'Error'
					});
					return false;
				}
				
				if(rows[i].qcAcceptReject == "RJ"){
					if(rows[i].rejectReason == "" || rows[i].rejectReason == null){
						$.growl.error({
							message : "Please select reason.",
							duration : 10000,
							title   : 'Error'
						});
						return false;
					}
				}
				
				var isZoneEnable = $('#jqxgrid').jqxGrid('getcellvalue', i, 'isZoneEnable');	
				if(isZoneEnable == "Yes"){
					if( rows[i].toZone == null || rows[i].toZone == ""){
						$.growl.error({
							message : "Please select to zone.",
							duration : 10000,
							title   : 'Error'
						});
						return false;
					}
				}
				if(rows[i].toLocation == "" || rows[i].toLocation == null){
					$.growl.error({
						message : "Please select To location.",
						duration : 10000,
						title   : 'Error'
					});
					return false;
				}
				
				if(rows[i].hsnCode == "" || rows[i].hsnCode == null){
					$.growl.error({
						message : "Please select HSN Code.",
						duration : 10000,
						title   : 'Error'
					});
					return false;
				}
				checkBoxArr.push(rows[i].selectionStatus);
				fieldFilter['toZoneType']  = { "id": rows[i].toZone};
				fieldFilter['toLocation']  = rows[i].toLocation
				fieldFilter['reasonForRejection']  =rows[i].rejectReason
				fieldFilter['qcStatus']  = { "id": rows[i].qcAcceptReject};
				fieldFilter['toStoreOrDc']  = { "id": rows[i].storeOrDCId};
				fieldFilter['storeOrDcType']  = { "id": rows[i].storeOrDC};
				fieldFilter['remarks']  = rows[i].rejectReason
				fieldFilter['stoneGrHeadId']  = rows[i].grNo
				fieldFilter['stoneGrDetSrlNo']   =rows[i].grSlNo
				fieldFilter['hsnMasterId']   =rows[i].hsnCode
				
				
				
				if(typeof parameterDetailsGrid != "undefined"){
					for(var j=0; j<parameterDetailsGrid.length; j++){
						if(rows[i].grDetId == parameterDetailsGrid[j].grDetId){
							fieldFilter['qcForStoneDetails'] = parameterDetailsGrid[j].paramDetObj;
						}
					}
				}
				createQcStone.push(fieldFilter);
			}
			
		
			
			
		}
	}
	
	if(createQcStone.length == 0){
		$.growl.error({
			message : "Please select atleast one checkbox.",
			duration : 10000,
			title   : 'Error'
		});
		return false;
	}
	
	postJSON('/OrderExecution/api/v1/createQCForStones', JSON.stringify(createQcStone), function(data) {
		if(data.resCode == 1){
			if(data.payload.success != null && data.payload.success.length > 0) {
				$.growl.notice({
					message : proceseMessage(data.payload.success),
					duration : 10000,
					title : 'Saved GR details:'
				});
			}
			
			if(data.payload.Failure != null && data.payload.Failure.length > 0) {
				$.growl.error({
					message : proceseMessage(data.payload.Failure),
					fixed : true,
					title : 'Failed GR Details:'
				});
			}
			qcStoneGrid();
			$("#parameterDetailsGrid").jqxGrid('clear');
			$("#parameterDetailsGrid").hide();
			return false;
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title   : 'Error'
			});
			return false;
		}
	});

});

$("#clearAllStone").on('click', function(){
	$("#jqxgrid").jqxGrid('clear');
	$("#parameterDetailsGrid").jqxGrid('clear');
	$("#qcStoneSection").hide();
	$("#grDetId").val('');
	$("#vendorCodeStone").val('');
	$("#grStoneNo").val('');
	$(this).find('form').trigger('reset');
	window.location.href="javascript:showContentPage('qcFgStone', 'bodySwitcher')";
});
