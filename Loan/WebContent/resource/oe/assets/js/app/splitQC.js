var gridData = [];
var segmentId;
var qcOnloadFunction = function(stockNo){
	$.getJSON('/OrderExecution/api/v1/getQCOnLoadForSplitStockId?stockId='+stockNo, function(data) {
		if(data.resCode == 1){
			$('#loading').hide();
			$("#qcStockNo").val(stockNo);
			$("#vendorQCC").val(data.payload.vendor);
			$("#qcGrNo").val(data.payload.grNo);
			$("#qcCount").val(data.payload.count);
			$("#qcSearch").prop('disabled',false);
			gridData = data.payload.grDetList;
			segmentId = data.payload.segmentId
		}
	});
}

$("#saveSplitQc").hide();
$("#qcSearch").on('click',function(){
	$('#loading').hide();
	$.each(gridData,function(k,v){
		v.paramFlag = true;
	});
	splitQcGrid(gridData);
	$("#qcItemGrid").show();
	
});

var splitQcGrid = function(response) {
	var source = {
			datafields : [
				{name : 'grDate', type : 'string','map':'grDate'}, 
				{name : 'grNo', type : 'int','map':'grNumber'},
				{name : 'grSlNo', type : 'int','map':'grSrlNumber'},
				{name: 'psrNo', type: 'int','map':'psrNumber'},
				{name: 'vCode', type: 'string','map':'vendorDTO>vendorCode'},
				
				{name: 'artCode', type: 'string','map':'articlMasterDTO>articleCode'},
				{name: 'artDesc', type: 'string','map':'articlMasterDTO>articleDesc'},
				{name : 'jewelType', type : 'string','map':'jewelTypeDTO>description'},
				
				{name : 'pcs', type : 'int','map':'pcs'},
				{name : 'splitGrossWeight', type : 'float','map':'splitGrossWeight'},
				{name : 'splitNetWeight', type : 'float','map':'splitNetWeight'},
				
				{name : 'qcParam', type : 'int','map':''},

				{name : 'qcStatus', type : 'string','map':''},
				{name : 'qcReject', type : 'string','map':''},
				
				{name : 'rwkDesc', type : 'string','map':''},
				
				{name : 'storeOrDc', type : 'string','map':'storeorDcType'},
				{name : 'toStoreOrDc', type : 'string','map':'storeOrDCName'},
				
				{name : 'toZoneType', type : 'string','map':''},
				
				{name : 'toLoc', type : 'string','map':'toLocation'},
				{name : 'toVendor', type : 'string','map':''},
				
				{name : 'costBornBy', type : 'string','map':''},
				{name : 'reason', type : 'string','map':''},
				{name: 'segmentId', type: 'int','map':'segmentDTO>id'},
				{name: 'storeOrDCId', type: 'int'},
				{name : 'paramFlag', type : 'string'},


			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#qcItemGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		editable : true,
		pagesize : 20,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		columns : [
			{ text : 'GR Date', datafield : 'grDate', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GR No.', datafield : 'grNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'GR Sl No.', datafield : 'grSlNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'PSR', datafield : 'psrNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Code', datafield : 'vCode', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Code', datafield : 'artCode', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Description', datafield : 'artDesc', width : '12%', cellsalign : 'left', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Jewel Type', datafield : 'jewelType', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Pcs', datafield : 'pcs', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt.', datafield : 'splitGrossWeight', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Net Wt.', datafield : 'splitNetWeight', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'QC Param', datafield : 'qcParam', width : '2.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsrenderer:qcParameterLinkRenderer},
			{'text' : 'QC Status',datafield : 'qcStatus','width' : '4%',editable : false,cellsalign : 'center',align:'center',
				cellsrenderer: function(row, column, value){
					return "<div align='center'style='margin-top:8px;'>Accept</div>";
				}
			},
			{ text : 'QC Reject', datafield : 'qcReject', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'RWK/Restart/Add Description', datafield : 'rwkDesc', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
		    {'text' : 'Store/DC',datafield : 'storeOrDc','width' : '5%',sortable : false,cellsalign : 'center',align:'center',editable : false},
			{ text : 'To Store/DC Name', datafield : 'toStoreOrDc', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'To Zone Type', datafield : 'toZoneType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'To Loc', datafield : 'toLoc', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'To Vendor', datafield : 'toVendor', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cost Borne By', datafield : 'costBornBy', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Reason for Unsetting', datafield : 'reason', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg Id', datafield : 'segmentId', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'Seg Id', datafield : 'storeOrDCId', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'Seg Id', datafield : 'paramFlag', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},


		]
	});
}

var qcParameterLinkRenderer = function(row, column, value) {
    var flagE = $("#qcItemGrid").jqxGrid('getrowdata', row);
    console.log(flagE.paramFlag);
    
    console.log(typeof flagE.paramFlag);
    if(flagE.paramFlag == "true"){
    	return '<button class="btn btn-sm btn-primary" onclick="qcraParameterDetailsFg('+row+');" type="button" /><i class="fa fa-plus fa-sm"></i> </button>';
    }else{
    	return '<button class="btn btn-sm btn-primary" disabled type="button" /><i class="fa fa-plus fa-sm"></i> </button>';
    }
}

var grNoId,grSlNoId,segId;
var qcraParameterDetailsFg = function(row) {
	var rows = $("#jqxgrid").jqxGrid('getrows');
	$("#rowIndex").val(row);
	var newVal;
	//grHeaderDetId = $("#qcItemGrid").jqxGrid('getcellvalue',row,'id')
	grNoId = $("#qcItemGrid").jqxGrid('getcellvalue',row,'grNo');
	grSlNoId = $("#qcItemGrid").jqxGrid('getcellvalue',row,'grSlNo');
	segId = $("#qcItemGrid").jqxGrid('getcellvalue',row,'segmentId');
	
	$.getJSON('/OrderExecution/api/v1/qcParameterList?segmentId=' + segmentId, function(data) {
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
			// itemsObj['grDetId'] = grHeaderDetId;
		var masterGrid = $("#qcItemGrid").jqxGrid('getrows');
		
			 $.each(masterGrid,function(k,v){
				 console.log(v);
				 itemsObj['grNo'] = v.grNo;
				 itemsObj['qcParamValue'] = qcParamValue;

				 paramArray.push(itemsObj);
			 });
			
				 $("#saveSplitQc").show();
				 
				 var paramList = [];
				 var paramObj = {}
				
				 var count =1;
				$.each(paramArray,function(k,v){
					console.log(v);
					 paramList.push({
						 "grNo" : v.grNo,
						 "qcParamValue" : v.qcParamValue,
						 "grSlNo":count
					 });
					 count++;
				});
			     parameterDetailsGridF(paramList);

				$.each(gridData,function(k,v){
				   v.paramFlag = false;
				});
				splitQcGrid(gridData);
				//$("#qcItemGrid").show();
	 }/*else{
		var testArray = [];
		var  grDetId = $("#grDetIdF").val(); 
		 for(var i=0; i<rows.length; i++){
			 paramArray.push(rows[i]);				  
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
			 //itemsObj['grDetId'] = grHeaderDetId;
			 itemsObj['grNo'] = grNoId;
			 itemsObj['grSlNo'] = grSlNoId;
			 itemsObj['qcParamValue'] = qcParamValue;
			 paramArray.push(itemsObj);
	 }*/
	
	// $("#jqxgrid").jqxGrid('setcellvalue', rowid, 'qcparamC', true);
	 
});

var parameterDetailsGridF = function(data) {
console.log(data);
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
							container.append('<i class="fa fa-list fa-md"></i>&nbsp; <b>QC Parameter Details </b>');
						},
						columns : [ 
							//{text : 'GR No', datafield : 'grDetId', hidden:true, width : '5%', cellsalign : 'center', align : 'center'},
							{text : 'GR No', datafield : 'grNo', width : '5%', cellsalign : 'center', align : 'center'},
							{text : 'GR Sl No', datafield : 'grSlNo', width : '5%', cellsalign : 'center', align : 'center'},
							{text : 'Qc Parameter details', datafield : 'qcParamValue',	width : '200%', cellsalign : 'left',	editable : false}
						]
					});
               }


$("#saveSplitQc").on('click',function(){
var qcParamArray = [];
	
	var parameterDetailsGridF = $("#parameterDetailsGridF").jqxGrid('getrows');
	var sysdate = moment().format('DD-MM-YYYY HH:mm:SS A');		
	
	var masterRows = $("#qcItemGrid").jqxGrid('getrows');
   if(typeof masterRows != "undefined"){	
		for (var i = 0; i < masterRows.length; i++) {   
	    	var parameter = { "qcparam" : []};
	    	//console.log(masterRows);
	    	
				parameter["qcStatus"] = {"name" :"Accept"};
				parameter["costBorneBy"] = { "id": null};
				
				parameter["grHid"] = masterRows[i].grNo;
				parameter["hsnId"] = null;
				parameter["psrNumber"] = masterRows[i].psrNo;
			    parameter["serialNumber"]= masterRows[i].grSlNo;
			  //  parameter["reasonForRejection"] = masterRows[i].reason;
			   // parameter["reworkRestoreAddDesc"] = masterRows[i].rwkDesc;
				parameter["toZoneType"] = { "zoneTypeId":null};
				parameter["toZoneTypeFlag"] = "No";
				parameter["toLocation"] = { "name": masterRows[i].toLoc};
				parameter["toParamQcFlag"] = "Yes";
				parameter["toLocationFlag"] = "Yes";
				parameter["storeOrDcType"] = { "id": masterRows[i].storeOrDc};
				parameter["toVendor"] = { "id": masterRows[i].toVendor};
				parameter["toVendorFlag"] = "No";
				parameter["isCostBornByEnable"] = "No"
				
				parameter["toStoreOrDc"] = { "id": masterRows[i].storeOrDCId}; 
				parameter["unsettingReason"] = { "id": masterRows[i].reason}; 
				
				
				if(typeof parameterDetailsGridF != "undefined"){
					for(var j=0; j<parameterDetailsGridF.length; j++){
						if(masterRows[i].id == parameterDetailsGridF[j].grDetId){
							parameter['qcparam'] = parameterDetailsGridF[j].paramDetObj;
						}
					}
				}
				qcParamArray.push(parameter);
	    }
   }
   
   console.log(qcParamArray);
   postJSON('/OrderExecution/api/v1/createQCFG', JSON.stringify(qcParamArray), function(data) {
		if (data.resCode == 1 && typeof data != "undefined") {
			$("#saveQCFG").prop('disabled', true);
			if(data.payload.Failure == null || data.payload.Failure.length == 0) {
				$.growl.notice({
					message : data.payload.success[0],
					duration : 10000,
					title : 'Saved GR details:'
				});
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
			updateStatusAfterQc($("#qcStockNo").val());
			
		}else{
			$("#saveQCFG").prop('disabled', false);
			$.growl.error({	message : data.mesgStr,	duration : 10000,title : 'Error'});
			return false;
		}		
	});
});

var updateStatusAfterQc = function(stockId){
	$.getJSON('/OrderExecution/api/v1/updateSplitsPostSplitQCSave?stockId='+stockId, function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			window.location.href = "javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')";

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