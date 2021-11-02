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

// Disabled by default vendor, status, MRV no, MRV Sl No
$("#vendor").prop('disabled', true);
$("#mrvNo").prop('disabled', true);
$("#mrvSlNo").prop('disabled', true);
$("#createGRSection").hide();
$("#grGridSection").hide();
$("#goBackS").hide();
$("#goBackC").hide();
$("#grTallySection").hide();
$("#mrvNoSection").show();
$("#mrvSlNoSection").show();
$("#parcelSection").hide();

var globalFlag = false;
$("#saveGRFG").prop('disabled', false);
$('#stoneAccGr option:eq(1)').prop('selected', true);

var grType = $('#stoneAccGr').val();
vendorCodeAndNameList(grType);
//----------------------------------------------------------------
$('#stoneAccGr').on('change', function(){
	var grType = $('#stoneAccGr').val();
	vendorCodeAndNameList(grType);
	$("#mrvSlNo").val("");
	$("#mrvNo").val("");
	$("#vendorCode").val("");
	$("#vendorCode-value").val("");
});

$('#vendorCode').on('change', function(){
	var vCode = $('#vendorCode').val(); 
	var vendorCode = $("#vendorCode-value").val();
	
	var stoneAccGr = $("#stoneAccGr").val();
	if(stoneAccGr == "A"){		
		$("#mrvNoSection").hide();
		$("#mrvSlNoSection").hide();
		$("#parcelSection").show();
		
		var params = {"fieldFilters": {	"vendorCode": vendorCode,"status":$("#status").val()}};
		
		$('#parcelIds').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/openParcels', JSON.stringify(params), function(data) {
			var parceIdList = data.payload.openParcels;
			parceIdList.sort(function(a, b){
				return a.parcelId-b.parcelId;
			});
			$.each(parceIdList, function(key, val) {
				$('#parcelIds').append('<option value="' + val.parcelId + '">' + val.parcelId + '</option>');
			});
			
		});
	}else{
		$("#mrvNoSection").show();
		$("#mrvSlNoSection").show();
		$("#parcelSection").hide();		
	}
	
	if(null == vCode || "" == vCode){
		$('#mrvNo').empty().append('<option value="" selected>--Select--</option>');
		$("#mrvNo").prop('disabled', true);
		$("#mrvSlNo").val("");
		return false;
	}
	getMRVList();
	$("#mrvNo").prop('disabled', false);
});

$('#status').on('change', function(){
	var vCode = $('#vendorCode').val(); 
	if(null == vCode || "" == vCode){
		$('#mrvNo').empty().append('<option value="" selected>--Select--</option>');
		$("#mrvNo").prop('disabled', true);
		$("#mrvSlNo").val("");
		return false;
	}
	getMRVList();
	$("#mrvNo").prop('disabled', false);
	$("#mrvSlNo").val("");
});

$('#mrvNo').on('change', function(){
	var mrvNo = $('#mrvNo').val();
	if(mrvNo == null || "" == mrvNo){
		$("#mrvSlNo").val("");
		return false;
	}
	$('#mrvSlNo').val(mrvNo.split("-")[1]);
});

var grPSrlCount = function(){	
	fieldEnableDisable(null);
}

$("#saveGR").on('click', function(){
	var status = $('#status').val();
	var grCount = $('#grSlNoCountC').val();
	var rows = $("#grDetailsList").jqxGrid('getrows');
	
	var stoneAccFlag = true;
	var completeMRVFlag = true;
	if(rows != "undefined"){
		var gridCount = rows.length;
		for(var i=0; i<gridCount; i++){
			var rows = $('#grDetailsList').jqxGrid('getrows');
			if("No" == rows[i].isStoneAccounting || "no" == rows[i].isStoneAccounting){
				stoneAccFlag = false;
			}
			if("No" == rows[i].isCompleted || "no" == rows[i].isCompleted && stoneAccFlag == true){
				completeMRVFlag = false;
			}
		}
	
	}
	
	if(null == grCount || "" == grCount){
		$.growl.error({
			message : "Please Fill Mandatory Fields.",
			duration : 8000,
			title : 'Error'
		});
		return false;
	}	
	var params = {
		"stoneReceiptNo": $('#mrvNoC').val(),
	    "stoneReceiptSrlNo": $('#mrvSlNoC').val(),
		"grSrlCount": grCount
	}
	postJSON('/OrderExecution/api/v1/updateLooseStoneGrCount', JSON.stringify(params), function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 8000,
				title : 'Success'
			});
			if(grCount > rows.length){
				$("#createGR").prop('disabled', false);	
			}else{
				$("#createGR").prop('disabled', true);	
			}
			//$("#saveGR").prop('disabled', true);
			//$("#createGR").prop('disabled', false);	
		}else{
			$.growl.error({
				message : "Unable to Save IGR-Count.",
				duration : 8000,
				title : 'Error'
			});
		}
	});
	grPSrlCount();
});
$("#saveGRFG").on('click', function(e){
	var rowscount = $("#grStoneAccCreateGrid").jqxGrid('getdatainformation').rowscount;
	var noOfPcsTot = $("#grStoneAccCreateGrid").jqxGrid('getcolumnaggregateddata', 'noOfPcs', ['sum']);
	var stonePcs = $("#stonePcs").val();
	if(noOfPcsTot.sum > stonePcs){
		$.growl.error({
			message : "Pcs cannot be more then Stone Receipt Pieces.",
			duration : 8000,
			title : 'Error'
		});
		return false;
	}

	var dataArr = [];
	if (rowscount == 0) {
		$.growl.error({
			message : "Please Add Line Items To Grid.",
			duration : 8000,
			title : 'Error'
		});
		return false;
	} else {
		var mrvType = $('#mrvType').val();
		var period = $('#consignmentPeriod').val();
		
		if(mrvType == "Consignment"){
			if(null == period || "" == period){
				$.growl.error({
					message : "Consignment Field is Mandatory !",
					duration : 8000,
					title : 'Error'
				});	
				return false;
			}
		}
		var rows = $('#grStoneAccCreateGrid').jqxGrid('getrows');
		console.log(rows);
		for (var i = 0; i < rowscount; i++) {
			if (rows[i].segment == "" || rows[i].mainCat == "" || rows[i].subCat == "" || rows[i].articleCode == "" || rows[i].noOfPcs == "" || rows[i].stoneWt == "" || rows[i].uqc == "" || rows[i].costStoneRate == "" || rows[i].stoneVal == "") {
				$.growl.error({message : "Please fill mandatory fields.",duration : 10000,title : 'Error'});
				return false;
			}
			
			if(rows[i].segmentCode == "OS" || rows[i].segmentCode == "PS"){
				if(rows[i].costRange == "" || rows[i].costRange == null){							
					$.growl.error({message : "Please select cost range.",duration : 10000,title : 'Error'});
					return false;
				}			
				
			}
			var mainCat = rows[i].mainCat;
			var firstWord = mainCat.split(' ')[0];
			
			if(rows[i].segmentCode == "DI"){
				if(firstWord == "CD"){
					if(rows[i].costRange == null || rows[i].costRange == ""){						
						$.growl.error({	message : "Please select cost",duration : 10000,title : 'Error'});
						return false;
					}
					
					if(rows[i].wtRange == null || rows[i].wtRange == ""){
						$.growl.error({message : "Please select wt range.",duration : 10000,title : 'Error'});
						return false;
					}
				}else{
					if(rows[i].wtRange == "" || rows[i].wtRange == null){			
						$.growl.error({message : "Please select wt range.",duration : 10000,title : 'Error'});
						return false;
					}
				}
			}
				
			
			dataArr.push({
		      "serialNumber": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "grSlNo"),
		      "categoryDescription": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "mainCat"),
		      "subCategoryDescription": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "subCat"),
		      "stoneCode": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "articleCode"),
		      "clarity": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "clarity"),
		      "color": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "color"),
		      "actualColor": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "actualolor"),
		      "cutGrade": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "cutGrade"),
		      "stoneWeightRangeSlab": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "wtRangeN"),
		      "stoneCostRangeSlab": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "costRangeN"),
		      "stoneWt": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "stoneWt"),
		      "stonePcs": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "noOfPcs"),
		      "isDiamondCert" : $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "diamondCertN"),
		      "certificateCharges": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "certCharges"),//certCharges
		      "stoneCost": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "costStoneRate"),
		      //"standardRate": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], ""),
		      //"standardAmount": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], ""),
		      "uom": {
		        "name": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "uqc")
		      },
		      "jwType": {
		        "name": $('#mrvType').val()
		      },
		      "stoneCostRate": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "costStoneRate"),
		      "stoneSellingRate": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "sellingRate"),
		      "packetId": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "packetId"),
		      //$("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "packetId"),
		      "stoneValue": $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", rows[i], "stoneVal")
			});
		}
	}
	var params ={
		"type": $('#stoneAccGr').val(),
		"jwType": {
			"name": $('#mrvType').val()
		},
		"refTypeNo": $('#mrvNoC').val(),
		"refTypeSrlNo": $('#mrvSlNoC').val(),
		"noOfGrCount": $('#grSlNoCountC').val(),
		"consignmentPeriod": $('#consignmentPeriod').val(),
		"stoneSegment": {
			"id": $('#segmentId').val()
		},
		"stoneGrDetails" : dataArr
	}
	var $link = $(e.target);
	e.preventDefault();
	if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 500) {
		postJSON('/OrderExecution/api/v1/createGrForStones', JSON.stringify(params), function(data) {
			if(data.resCode == 1){
				$("#saveGRFG").prop('disabled', true);
				$('#grId').val(data.payload.grId);
				$('#grCreatedDt').val(data.payload.grCreatedDt);
				
				$('#addGrStoneAccGrid').jqxButton({disabled: true });
				$('#deleteGrStoneAccGrid').jqxButton({disabled: true });
				$("#saveGRFG").prop('disabled', true);
				$("#clearGR").prop('disabled', true);
				globalFlag = true;
				
				$.growl.notice({
					message : data.mesgStr,
					duration : 8000,
					title : 'Success'
				});
				
				
			}else{
				$("#saveGRFG").prop('disabled', false);
				$.growl.error({
					message : "Error on Saving IGR For Stone.",
					duration : 8000,
					title : 'Error'
				});
			}
		});
	}
	  $link.data('lockedAt', +new Date());
	  $("#saveGRFG").prop('disabled', false);
});	
function vendorCodeAndNameList(grType) {
	$.getJSON('/OrderExecution/api/v1/GRStoneLOV?type='+grType, function(data) {
		vendorList = data.payload.vCodeList;

		var data = [];
		$.each(vendorList, function(key, value) {
			data.push({
				value : value.id,
				label : value.name
			});
		});

		$(function() {
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

	});
}

function getMRVList() {
	var type = $('#stoneAccGr').val();
	var status = $('#status').val();
	var vendorCode = $('#vendorCode-value').val();
	var vendor = $('#vendorCode').val();
	if(null == vendor || "" == vendor || null == vendorCode || "" == vendorCode || null == status || "" == status || null == type || "" == type){
		$.growl.error({
			message : "Please Fill Mandatory Fields.",
			duration : 8000,
			title : 'Error'
		});
		return false;
	}
	var params = {
			"fieldFilters":{
				"vendorCode": vendorCode,
			    "grType": type,
			    "grStatus": status
			}
	}
	$('#mrvNo').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/openStonePOMRVSrl', JSON.stringify(params), function(data) {
		if(data.resCode == 1){
			var openMRVSrl = data.payload.openMRVSrl;
			$.each(openMRVSrl, function(key, val) {
				$('#mrvNo').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 8000,
				title : 'Error'
			});
		}
	});
}


//----------------------------------------------------------------




// Redirect to default page
var redirect = function() {
	window.location.href = "javascript:showContentPage('grStoneAcc', 'bodySwitcher')";
	return window.location.href;
}

// Stone acc drop down on change
$("#stoneAccGr").on('change', function(){
	var value =$(this).val();
	if(value == "stoneGr"){
		$("#vendor").prop('disabled', false);
	}
	if(value == "S"){
		$("#mrvNoSection").show();
		$("#mrvSlNoSection").show();
		$("#parcelSection").hide();	
	}else{
		$("#mrvNoSection").hide();
		$("#mrvSlNoSection").hide();
	}
});
$("#status").on("change",function(){
	$('#vendorCode-value').val('');
	$('#vendorCode').val('');
})

$("#clearS").on('click', function(){
	redirect();
});



var fieldEnableDisable = function(dataArray=null){
	if(dataArray == null){
		var data = $("#grDetailsList").jqxGrid('getrows');
	}else{
		data = dataArray;
	}
	var grSlNoCountC = $("#grSlNoCountC").val();
	var lengthCheckArray = [];
	var lengthCheckMAArray = [];
	if(typeof data != "undefined" && data.length > 0){
		for(var i=0; i < data.length; i++){
			if(data[i].isStoneAccounting == "Yes"){
				lengthCheckArray.push(data[i]);
			}
			
			if(data[i].isCompleted == "Yes"){
				lengthCheckMAArray.push(data[i]);
			}
		}
		
		if(data.length >= parseInt(grSlNoCountC)){
			$("#createGR").prop('disabled', true);
		}else{
			$("#createGR").prop('disabled', false);
		}
		
		
		if(parseInt(grSlNoCountC) == data.length){
			$("#saveGR").prop('disabled', true);
			$("#stoneAcc").prop('disabled', false);
			$("#completeMrvProcess").prop('disabled', true);
			if(data.length == lengthCheckArray.length){
				$("#stoneAcc").prop('disabled', true);
				$("#completeMrvProcess").prop('disabled', false);
			}
			if(lengthCheckMAArray.length == data.length){
				$("#completeMrvProcess").prop('disabled', true);
			}
		}else{			
			$("#saveGR").prop('disabled', false);
			$("#stoneAcc").prop('disabled', true);
			$("#completeMrvProcess").prop('disabled', true);
		}
	}
	
	
	
	
}

var wtRangeArr = [];
var costRangeArr = [];

var stoneReceiptDetail = null;
$("#searchS").on('click', function(){
	var status = $('#status').val();
	var mrvNo = $('#mrvNo').val();
	var mrvSlNo = $('#mrvSlNo').val();
	var grCount = null;
	var vCode = $('#vendorCode').val(); 
	var vendorCode = $("#vendorCode-value").val();	
	var stoneAccGr = $("#stoneAccGr").val();
	var parcelIds = $("#parcelIds").val();
	
	if(stoneAccGr == "S"){
		if(mrvSlNo == null || mrvSlNo == ""){
			$.growl.error({
				message : "Please Select MRV No & Sl No.",
				duration : 8000,
				title : 'Error'
			});
			return false;
		}
	}else{
		var parcelIds = $('#parcelIds').val(); 
		if(parcelIds == null || parcelIds == ""){
			$.growl.error({
				message : "Please Select Parcel No.",
				duration : 8000,
				title : 'Error'
			});
			return false;
		}
		// $.cookie("status", status);
		localStorage.setItem("status",status);
		localStorage.setItem("parcelIds",parcelIds);
		window.location.href = "javascript:showContentPage('grAccessory?', 'bodySwitcher')";
	}
	
	
	$("#stoneAccSearchSection").toggle();
	$("#createGRSection").toggle();
	$("#grStoneAccCreateGrid").hide();
	$("#grGridSection").hide();
	$("#goBackS").show();
	$("#goBackC").hide();
	$("#grTallySection").show();
	
	var params = {
		"stoneReceiptNo": mrvNo.split("-")[0],
	    "stoneReceiptSrlNo": mrvNo.split("-")[1]
	}
	postJSON('/OrderExecution/api/v1/stoneMRVDetailsByMRVNoAndSrl', JSON.stringify(params), function(data) {
		if(data.resCode == 1){
			
			var res1 = data.payload.stoneReceiptDetail.indentStoneDetailDTO.weightRangeList;
			var res2 = data.payload.stoneReceiptDetail.indentStoneDetailDTO.costRangeList;
			console.log(res2);
			 globalFlag = false;
			 $("#saveGRFG").prop('disabled', false);
			if(null != res1){
				for (var i = 0; i < res1.length; i++) {
					wtRangeArr.push({
						"id" : res1[i].id,
						"value" : res1[i].description,
						"description" : res1[i].name
					});
				}
			}
			
			if(null != res2){
				for (var i = 0; i < res2.length; i++) {
					costRangeArr.push({
						"id" : res2[i].id,
						"value" : res2[i].description,
						"description" : res2[i].name
					});
				}
			}
			
			stoneReceiptDetail = data.payload.stoneReceiptDetail;
			$('#vendorC ').val(stoneReceiptDetail.stoneReceiptDTO.vendor.description);
			$('#mrvNoC ').val(stoneReceiptDetail.stoneReceiptDTO.id);
			$('#mrvSlNoC ').val(stoneReceiptDetail.serialNumber);
			$('#mrvType ').val(stoneReceiptDetail.stoneReceiptDTO.mrvType);
			$('#vendorInvNo ').val(stoneReceiptDetail.stoneReceiptDTO.billNo);
			$('#segmentC ').val(stoneReceiptDetail.stoneReceiptDTO.indentStoneDTO.segment);
			$('#segmentCode ').val(stoneReceiptDetail.stoneReceiptDTO.indentStoneDTO.segmentCode);
			$('#stoneWtC ').val(stoneReceiptDetail.stoneWeight);
			$('#stonePcs ').val(stoneReceiptDetail.indentStoneDetailDTO.pieces);
			$('#grSlNoCountC').val(stoneReceiptDetail.grSrlNoCount);
			grCount = stoneReceiptDetail.grSrlNoCount;
			$('#segmentId').val(stoneReceiptDetail.stoneReceiptDTO.indentStoneDTO.segmentId);
			if("Consignment" == stoneReceiptDetail.stoneReceiptDTO.mrvType){
				$("#consignmentPeriod").prop('disabled', false);
			}else{
				$("#consignmentPeriod").prop('disabled', true);
			}
			
			//grPSrlCount();
		}
	});
	
	var grDetailsListArray = [];
	var stoneAccFlag = true;
	var completeMRVFlag = true;
	var gridCount = 0;
	postJSON('/OrderExecution/api/v1/looseStoneGrHeadersByMRVNumberAndSrlNo', JSON.stringify(params), function(data) {
		if(data.resCode == 1){
			var grStoneData = data.payload.looseStoneGrHeaders;
			if(null != grStoneData){
				for(var i=0; i<grStoneData.length; i++){
					gridCount++;
					if("No" == grStoneData[i].isStoneAccounting || "no" == grStoneData[i].isStoneAccounting){
						stoneAccFlag = false;
					}
					if("No" == grStoneData[i].isCompleted || "no" == grStoneData[i].isCompleted && stoneAccFlag == true){
						completeMRVFlag = false;
					}
					var grDetObj = {
							"srlNo" : i+1,
							"isStoneAccounting" : grStoneData[i].isStoneAccounting,
							"isCompleted" : grStoneData[i].isCompleted,
							"grDate" : grStoneData[i].createdDt,
							"grNo" : grStoneData[i].id,
							"grStoneWt" : grStoneData[i].totalStoneWeightOfDetails,
							"grDoneBy" : grStoneData[i].createdBy
					}
					grDetailsListArray.push(grDetObj);
				}
			}else{
				grDetailsListArray = [];
			}
			
			
			grDetailsList(grDetailsListArray);			

			fieldEnableDisable(grDetailsListArray);
			
		}
	});
});

$("#stoneAcc").on('click', function(){
	var grIds = [];
	var gridCount = $("#grDetailsList").jqxGrid('getdatainformation').rowscount;
	var rows = $('#grDetailsList').jqxGrid('getrows');
	var status = $('#status').val();
	var grCount = $('#grSlNoCountC').val();
	var stoneAccFlag = true;
	var completeMRVFlag = true;
	var grDetailsListArray = [];
	if(null == gridCount || 0 == gridCount || "" == gridCount){
		$.growl.error({
			message : "No Data Found For Stone Accounting !",
			duration : 8000,
			title : 'Warning !'
		});
		$("#stoneAcc").prop('disabled', true);
		$("#completeMrvProcess").prop('disabled', true);
		return false;
	}
	for (var i = 0; i < gridCount; i++) {
		if("No" == rows[i].isStoneAccounting || "no" == rows[i].isStoneAccounting){
			var grId = $("#grDetailsList").jqxGrid("getcellvalue", rows[i], "grNo");
			grIds.push(parseInt(grId));
			stoneAccFlag = false;
		}
		if("No" == rows[i].isCompleted || "no" == rows[i].isCompleted && stoneAccFlag == true){
			completeMRVFlag = false;
		}
	}
	if(null == grIds || grIds == [] || grIds.length == 0){
		$.growl.error({
			message : "Stone Accounting Already Completed !",
			duration : 8000,
			title : 'Warning !'
		});
		$("#stoneAcc").prop('disabled', true);
		return false;
	}
	
	postJSON('/OrderExecution/api/v1/grStoneAccounting', JSON.stringify(grIds), function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 8000,
				title : 'Success'
			});
			
			$("#stoneAcc").prop('disabled', true);
			var mrvNo = $('#mrvNo').val();
			var params = {
				"stoneReceiptNo": mrvNo.split("-")[0],
			    "stoneReceiptSrlNo": mrvNo.split("-")[1]
			}
			postJSON('/OrderExecution/api/v1/looseStoneGrHeadersByMRVNumberAndSrlNo', JSON.stringify(params), function(data) {
				if(data.resCode == 1){
					var grStoneData = data.payload.looseStoneGrHeaders;
					if(null != grStoneData){
						for(var i=0; i<grStoneData.length; i++){
							var grDetObj = {
									"srlNo" : i+1,
									"isStoneAccounting" : grStoneData[i].isStoneAccounting,
									"isCompleted" : grStoneData[i].isCompleted,
									"grDate" : grStoneData[i].createdDt,
									"grNo" : grStoneData[i].id,
									"grStoneWt" : grStoneData[i].totalStoneWeightOfDetails,
									"grDoneBy" : grStoneData[i].createdBy
							}
							grDetailsListArray.push(grDetObj);
						}
					}else{
						grDetailsListArray = [];
					}
					grDetailsList(grDetailsListArray);
					
					fieldEnableDisable(grDetailsListArray);
				}
			});
			
			
			
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 8000,
				title : 'Error'
			});
		}
		
	});
});
$("#completeMrvProcess").on('click', function(){
	var mrvNo = $('#mrvNoC').val();
	var mrvSLNo = $('#mrvSlNoC').val();
	var params = {
		"stoneReceiptNo": mrvNo,
	    "stoneReceiptSrlNo": mrvSLNo
	}
	if(mrvNo == null && mrvNo == "" && mrvSLNo == null && mrvSLNo == ""){
		$.growl.error({
			message : "MRV Details Not Found",
			duration : 8000,
			title : 'Warning'
		});
		return false;
	}
	postJSON('/OrderExecution/api/v1/grStoneCompleteMRVProcess', JSON.stringify(params), function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 8000,
				title : 'Success'
			});
			$("#stoneAcc").prop('disabled', true);
			$("#saveGR").prop('disabled', true);
			$("#createGR").prop('disabled', true);
			$("#completeMrvProcess").prop('disabled', true);
			redirect();
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 8000,
				title : 'Warning'
			});
		}
	});
});

$("#goBackS").on('click', function(){
	$("#createGR").prop('disabled', true);	
	$("#stoneAccSearchSection").toggle();
	$("#createGRSection").toggle();	
	$("#grStoneAccCreateGrid").hide();
	$("#grGridSection").hide();
	$("#goBackS").hide();
	$("#goBackC").hide();
	$("#grTallySection").hide();	
});

$("#goBackC").on('click', function(){
	$("#createGR").prop('disabled', true);
	$("#stoneAccSearchSection").hide();
	$("#createGRSection").toggle();	
	$("#grStoneAccCreateGrid").hide();
	$("#grGridSection").toggle();
	$("#goBackS").show();
	$("#goBackC").hide();
	$("#grTallySection").show();	
	grDetailsList();
});

$("#createGR").on('click', function(){
	$("#goBackS").hide();
	$("#goBackC").show();
	$("#stoneAccSearchSection").hide();
	$("#createGRSection").toggle();
	$("#grStoneAccCreateGrid").show();
	$("#grGridSection").toggle();
	grStoneAccCreateGrid();
	$("#grTallySection").hide();
});

//Common Validation for grid column
var grWtValidate = function(cell, value){	
	if(value < 0) { return { result: false, message: "Invalid Number" }};
	return true;
}


// Create GR Details Grid ##############################
var yesNoArr = [];
yesNoArr = [{
	"id" : 1,
	"description" : "Yes"
},{
	"id" : 2,
	"description" : "No"
}]

var   packetIdCost;
var   packetIDWt;


var grStoneAccCreateGrid = function() {
	
	var dropDownListSourceCert = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'description',
			type : 'string'
		} ],
		localdata : yesNoArr

	};
	var dropdownListAdapterCert = new $.jqx.dataAdapter(dropDownListSourceCert, {
		autoBind : true,
		async : false
	});
	
	
	//---------------------
	var dropDownListSourceWtRange = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'description',
			type : 'string'
		} ],
		localdata : wtRangeArr

	};
	var dropdownListAdapterWtRange = new $.jqx.dataAdapter(dropDownListSourceWtRange, {
		autoBind : true,
		async : false
	});
	
	//------------------
	var dropDownListSourceCostRange = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'description',
			type : 'string'
		} ],
		localdata : costRangeArr

	};
	var dropdownListAdapterCostRange = new $.jqx.dataAdapter(dropDownListSourceCostRange, {
		autoBind : true,
		async : false
	});
	
	var generaterow = function(i) {
		var row = {};
		row["grSlNo"] = i;
		row["segment"] = stoneReceiptDetail.stoneReceiptDTO.indentStoneDTO.segment;
		row["segmentCode"] = stoneReceiptDetail.stoneReceiptDTO.indentStoneDTO.segmentCode
		row["mainCat"] = stoneReceiptDetail.indentStoneDetailDTO.category.description;
		row["subCat"] = stoneReceiptDetail.indentStoneDetailDTO.subCategorydesc;
		row["articleCode"] = stoneReceiptDetail.indentStoneDetailDTO.stoneCode;
		row["clarity"] = stoneReceiptDetail.indentStoneDetailDTO.clarity;
		row["color"] = stoneReceiptDetail.indentStoneDetailDTO.color;
		row["actualolor"] = stoneReceiptDetail.indentStoneDetailDTO.actualColor;
		row["cutGrade"] = stoneReceiptDetail.indentStoneDetailDTO.cut;
		row["wtRange"] = "";
		row["costRange"] = "";
		row["noOfPcs"] = stoneReceiptDetail.indentStoneDetailDTO.pieces;
		row["stoneWt"] = "";
		row["uqc"] = stoneReceiptDetail.indentStoneDetailDTO.uqc;
		row["diamondCert"] = "";
		row["costStoneRate"] = stoneReceiptDetail.stoneRatePerCaratInINR;
		row["sellingRate"] = stoneReceiptDetail.stoneSellingRate;
		row["stoneVal"] = (stoneReceiptDetail.stoneRatePerCaratInINR * stoneReceiptDetail.indentStoneDetailDTO.pieces);
		row["certCharges"] = 0;
		row["totalCost"] = "";
		return row;
	}
	
	var source = {
		datafields : [ 
			{name : 'grSlNo', type : 'int'}, 
			{name : 'segment', type : 'string'},
			{name : 'segmentCode', type : 'string'}, 
			{name : 'mainCat', type : 'string'}, 
			{name : 'subCat', type : 'string'}, 
			{name : 'articleCode', type : 'string'}, 
			{name : 'clarity', type : 'string'}, 
			{name : 'color', type : 'string'}, 
			{name : 'actualolor', type : 'string'}, 
			{name : 'cutGrade', type : 'string'}, 
			{name : 'wtRange', type : 'string', 
				values : {
					source : dropdownListAdapterWtRange.records,
					value : 'id',
					name : 'description'
				}
			}, 
			{name : 'costRange', type : 'string',
				values : {
					source : dropdownListAdapterCostRange.records,
					value : 'id',
					name : 'description',
					
				}
			},
			{name : 'noOfPcs', type : 'int'}, 
			{name : 'stoneWt', type : 'float'}, 
			{name : 'uqc', type : 'string'}, 
			{name : 'diamondCert', type : 'string',
				values : {
					source : dropdownListAdapterCert.records,
					value : 'id',
					name : 'description'
				}
			}, 
			{name : 'costStoneRate', type : 'float'}, 
			{name : 'sellingRate', type : 'float'}, 
			{name : 'packetId', type : 'int'}, 
			{name : 'stoneVal', type : 'float'}, 
			{name : 'certCharges', type : 'string'}, 
			{name : 'totalCost', type : 'float'}
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},

	};
	

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#grStoneAccCreateGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			
			container.append('<div class="col-md-4 row"><div style="margin-bottom:10px;"  id="addGrStoneAccGrid" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div></div>');
			container.append('<div class="col-md-4"><div style="margin-bottom:10px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="text-center">Create IGR Details</div></div>');	
			container.append('<div class="col-md-4 pull-right"><div style="margin-bottom:10px;" id="deleteGrStoneAccGrid" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div></div>');
			$("#addGrStoneAccGrid").jqxButton();
			$("#deleteGrStoneAccGrid").jqxButton();
			
		
			$("#addGrStoneAccGrid").on('click', function() {
				var rowscount = $("#grStoneAccCreateGrid").jqxGrid('getdatainformation').rowscount;

				if (rowscount == 0) {
					var rowId = 1;
				} else {
					var rowId = rowscount + 1;
					var rows = $('#grStoneAccCreateGrid').jqxGrid('getrows');
					for (var i = 0; i < rowscount; i++) {
						if (rows[i].segment == "" || rows[i].mainCat == "" || rows[i].subCat == "" || rows[i].articleCode == ""
								|| rows[i].noOfPcs == "" || rows[i].stoneWt == "" || rows[i].uqc == "" || rows[i].costStoneRate == ""
								|| rows[i].stoneVal == "" 
									) {
								$.growl.error({
											message : "Please fill mandatory fields.",
											duration : 10000,
											title : 'Error'
								});
								return false;
						}
						if($("#isValidWtRange").val() == "true"){
							if(rows[i].wtRange == "" || rows[i].wtRange == null){							
								$.growl.error({
									message : "Please select wt range.",
									duration : 10000,
									title : 'Error'
								});
								return false;
							}
						}
						
						if($("#isValidCostRange").val() == "true"){
							if(rows[i].costRange == "" || rows[i].costRange == null){							
								$.growl.error({
									message : "Please select cost range.",
									duration : 10000,
									title : 'Error'
								});
								return false;
							}
						}
						
					}
				}

				var datarow = generaterow(rowId);
				var commit = $("#grStoneAccCreateGrid").jqxGrid('addrow', null, datarow);
			});
			
			$("#deleteGrStoneAccGrid").on('click', function() {
				var selectedrowindex = $("#grStoneAccCreateGrid").jqxGrid('getselectedrowindex');
				var rowscount = $("#grStoneAccCreateGrid").jqxGrid('getdatainformation').rowscount;
				for (var i = 0; i < rowscount; i++) {
					$("#grStoneAccCreateGrid").jqxGrid("setcellvalue", i, "grSlNo", i + 1);
				}
				
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#grStoneAccCreateGrid").jqxGrid('getrowid',selectedrowindex);
					var commit = $("#grStoneAccCreateGrid").jqxGrid('deleterow', id);
				}
				
				for (var j = 0; j < rowscount; j++) {
					$("#grStoneAccCreateGrid").jqxGrid("setcellvalue", j,"grSlNo", j + 1);					
				}
			});
		},
		columns : [ 
			{text : 'Sl. No.', datafield : 'grSlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Seg.', datafield : 'segment', width : '4%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Main Cat.', datafield : 'mainCat', width : '4%', height: '3%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Shape / Sub Cat.', datafield : 'subCat', width : '8%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Stone Code', datafield : 'articleCode', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Clarity', datafield : 'clarity', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Color', datafield : 'color', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Actual Color', datafield : 'actualolor', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Cut Grade', datafield : 'cutGrade', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Wt Range', datafield : 'wtRange', width : '5%', cellsalign : 'center', align : 'center', editable : true, columntype : 'dropdownlist',displayfield : 'wtRangeN',
				createeditor : function(row, cellvalue,
						editor) {
					editor.jqxDropDownList({
						source : wtRangeArr,
						placeHolder : '--Select--',
						displayMember : 'description',
						valueMember : 'id',
						dropDownWidth : 100
					});
					
				}, cellbeginedit: function (row, editor) {
					if(wtRangeArr.length == 0 || globalFlag == true){
						editor.jqxDropDownList('disableItem', row);
						return false;
					}else{
						return true;
					}
					
               }, cellvaluechanging: function(row, datafield, columntype, oldvalue, newvalue, event){
            	   var sellingRate = null;
            	   var packetId = null;
            	   var costRange = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", row, "costRange");
	            	   for(var i = 0; i<wtRangeArr.length;i++){
	            		   if(wtRangeArr[i].description == newvalue.label){
	            			   sellingRate = wtRangeArr[i].value;
	            			   packetId = wtRangeArr[i].id;
	            			   packetIDWt =  packetId;
	            			   $("#grStoneAccCreateGrid").jqxGrid("setcellvalue", row, "sellingRate",sellingRate);
	            			  $("#grStoneAccCreateGrid").jqxGrid("setcellvalue", row, "packetId",packetId);
	            		   }
	            	   }
	            	   var mainCat = $('#grStoneAccCreateGrid').jqxGrid('getcellvalue', row, 'mainCat');
	            	   var articleCode = $('#grStoneAccCreateGrid').jqxGrid('getcellvalue', row, 'articleCode');
	            	   var clarity = $('#grStoneAccCreateGrid').jqxGrid('getcellvalue', row, 'clarity');
	            	   var cutGrade = $('#grStoneAccCreateGrid').jqxGrid('getcellvalue', row, 'cutGrade');
	            	   var color = $('#grStoneAccCreateGrid').jqxGrid('getcellvalue', row, 'color');
	            	   var actualColor = $('#grStoneAccCreateGrid').jqxGrid('getcellvalue', row, 'actualolor');
	            	   var vendorId = $('#vendorCode-value').val();
	            	   var firstword = mainCat.split(' ')[0];
	            	   if(firstword == "CD"){
	            		   var params =  {"flag" : "LooseStone","stoneCode" : articleCode,"clarity":clarity,"cutGrade":cutGrade,"color":color,"actualColor":actualColor, "wgtRange":newvalue.label, "category": mainCat,"vendorId" : vendorId};
	            		   costRangeArr = [];
	            		   postJSON('/OrderExecution/api/v1/listCostRangeForGRFG', JSON.stringify(params), function(data) {
	            				if(typeof data != "undefined"){
	            					var costRangeDetArr = data.payload.list;
	            					for (var i = 0; i < costRangeDetArr.length; i++) {
	            						costRangeArr.push({
	            							"id" : costRangeDetArr[i].id,
	            							"value" : costRangeDetArr[i].description,
	            							"description" : costRangeDetArr[i].name
	            						});
	            					}
	            				}
	            			});
	            	   }
               }
			}, 
			{text : 'Cost Range', datafield : 'costRange', width : '5%', cellsalign : 'center', align : 'center', editable : true, columntype : 'dropdownlist',displayfield : 'costRangeN',
				createeditor : function(row, cellvalue,
						editor) {
					editor.jqxDropDownList({
						source : costRangeArr,
						placeHolder : '--Select--',
						displayMember : 'description',
						valueMember : 'id',
						dropDownWidth : 100
					});
				}, cellbeginedit: function (row, editor) {
				
					if(costRangeArr.length == 0 || globalFlag == true){
						//editor.jqxDropDownList('disableItem', row);
						return false;
					}else{
						return true;
					}
               }, cellvaluechanging: function(row, datafield, columntype, oldvalue, newvalue, event){
            	   var sellingRate = null;
            	   var packetId = null;
	            	   for(var i = 0; i<costRangeArr.length;i++){
	            		   if(costRangeArr[i].description == newvalue.label){
	            			   sellingRate = costRangeArr[i].value;
	            			   packetId = costRangeArr[i].id;
	            			   packetIdCost = packetId;
	            			   console.log(sellingRate);
	            			   $("#grStoneAccCreateGrid").jqxGrid("setcellvalue", row, "sellingRate",sellingRate);
	            			   $("#grStoneAccCreateGrid").jqxGrid("setcellvalue", row, "packetId",packetId);
	            		   }
	            	   }
               }
			}, 
			{text : 'No. Of Pcs', datafield : 'noOfPcs',cellsformat: 'n', width : '5%', cellsalign : 'center', align : 'center', editable : true, validation : grWtValidate}, 
			{text : 'Stone Wt.', datafield : 'stoneWt', width : '5%', cellsalign : 'center', align : 'center', editable : true, cellsformat : 'd3', validation : grWtValidate, createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput',cellsformat: 'd3',
				cellvaluechanging: function(row, datafield, columntype, oldvalue, newvalue, event){
					var uom = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", row, "uqc");
					var costStoneRate = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", row, "costStoneRate");
					var stoneVal = 0.00;
					if(newvalue == "" || newvalue == null){
						$.growl.error({
							message : "Please Select Stone Weight.",
							duration : 10000,
							title : 'Error'
						});
						$("#grStoneAccCreateGrid").jqxGrid("setcellvalue", row, "stoneVal", costStoneRate)
						return false;
					}
					if("Cts" == uom || "Gms" == uom){
						stoneVal = parseFloat(newvalue) * parseFloat(costStoneRate);
						stoneVal = parseFloat(stoneVal).toFixed(2);
						$("#grStoneAccCreateGrid").jqxGrid("setcellvalue", row, "stoneVal", stoneVal)
					}
				} ,
				cellbeginedit: function (row, editor) {
					if(globalFlag == true){
						return false;
					}else{
						return true;
					}
				}
			},
			{text : 'UQC', datafield : 'uqc', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Diamond Cert. Det.', datafield : 'diamondCert', width : '5%', cellsalign : 'center', align : 'center', editable : true, columntype : 'dropdownlist',displayfield : 'diamondCertN',
				createeditor : function(row, cellvalue,	editor) {
					editor.jqxDropDownList({
						source : yesNoArr,
						placeHolder : '--Select--',
						displayMember : 'description',
						valueMember : 'id'
					});
				},
				cellbeginedit: function (row, editor) {
					var seg = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", row, "segment");
						if(seg == "Diamond"){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					/*if(globalFlag == true){
						editor.jqxDropDownList('disableItem', row);
					}*/
				} 
			}, 
			{text : 'Cost Stone Rate', datafield : 'costStoneRate', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Selling Stone Rate', datafield : 'sellingRate', width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : '', datafield : 'packetId', hidden : true, width : '5%', cellsalign : 'center', align : 'center', editable : false}, 
			{text : 'Stone Value', datafield : 'stoneVal', width : '5%', cellsalign : 'center', align : 'center', editable : false, cellsformat : 'd2',
				createeditor : function(row, cellvalue,	editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						decimalDigits : 2
					});
					var uom = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", row, "uqc");
					var noOfPcs = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", row, "noOfPcs");
					var stoneWt = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", row, "stoneWt");
					var costStoneRate = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", row, "costStoneRate");
					var stoneVal = 0.00;
					if(stoneWt == '' || stoneWt == 'NaN' || stoneWt == 'undefined'){
						stoneWt = 0.00;
					}
					if(uom == "Pcs"){
						stoneVal = parseFloat(noOfPcs) * parseFloat(costStoneRate);
						stoneVal = parseFloat(stoneVal).toFixed(2);
						$("#grStoneAccCreateGrid").jqxGrid("setcellvalue", row, "stoneVal", stoneVal)
					}else{
						stoneVal = parseFloat(stoneWt) * parseFloat(costStoneRate);
						stoneVal = parseFloat(stoneVal).toFixed(2);
						$("#grStoneAccCreateGrid").jqxGrid("setcellvalue", row, "stoneVal", stoneVal)
					}
				} 
			},
			{text : 'Cert./Other Charges', datafield : 'certCharges', width : '5%', cellsalign : 'center', align : 'center', editable : true, createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 2 }); },columntype : 'numberinput',cellsformat: 'd2',
				
				cellbeginedit: function (row) {
					if(globalFlag == true){
						return false;
					}else{
						return true;
					}
				}, validation : grWtValidate
			},
			{text : 'Total Cost', datafield : 'totalCost', width : '5%', cellsalign : 'center', align : 'center', editable : false,
				cellsrenderer : function(row){
					var stVal = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", row, "stoneVal");
					var certVal = $("#grStoneAccCreateGrid").jqxGrid("getcellvalue", row, "certCharges");
					if(null == certVal || certVal == ""){
						certVal = 0;
					}
					
					var totalCost = (stVal+parseFloat(certVal)).toFixed(2);
					return  "<div style='text-align:center; padding-top:5px;'>" + totalCost + "</div>";
					
				},
				cellbeginedit: function (row) {
					if(globalFlag == true){
						return false;
					}else{
						return true;
					}
				}
			}
			,{text : '', datafield : 'segmentCode', width : '5%', cellsalign : 'center', align : 'center', hidden : true}
		]
	});
}


var loadComputeTally = function(mrvNo, mrvSlNo){
	$.getJSON('/OrderExecution/api/v1/grBillToTally?stoneRecieptNo=' + mrvNo + "&stoneRecieptSlNo=" + mrvSlNo, function(data) {
		var mrvList = data.payload.StoneRecipetDetails;
		var mivList = data.payload.StoneReturnDetials;
		var adjList = data.payload.AdjustmentVoucherStones;
		var stoneList = data.payload.LooseStoneGrDetails;
		mrvDetails(mrvList);
		mivDetails(mivList);
		adjDetails(adjList);
		stoneDetails(stoneList);
	});
	
}


//Main MRV Details Grid No 3 ************##################################****************
var mrvDetails = function(data){
	
	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'mrvDatee', type: 'date', map: 'mrvMivDate' },
            { name: 'mrvTypee', type: 'string', map: 'mrvMivType>name' },
            { name: 'metalTypee', type: 'string', map: 'segment>description' },
            { name: 'mrvNoo', type: 'number', map: 'id' },
            { name: 'mrvSlNoo', type: 'number', map: 'mrvMivSerialNo' },
            { name: 'pcss', type: 'number', map: 'pieces' },
            { name: 'stoneWtt', type: 'float', map: 'stoneWeight' },
            { name: 'invAmtt', type: 'float', map: 'invoiceAmountBeforeTax' },
            { name: 'totalAmtt', type: 'float', map: 'invoiceAmountIncludingTax' }
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#mrvDetails").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 60,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
        source: dataAdapter, 
        theme: 'energyblue',
        showstatusbar: true,
	    statusbarheight: 50,
	    showaggregates: true,
        columns: [
          { text: 'GRV Date', datafield: 'mrvDatee', width: '9%', cellsalign : 'center',sortable : true, menu : true, align:'center', cellsformat : 'dd/MM/yyyy' },
          { text: 'GRV Type', datafield: 'mrvTypee', width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center'},
          { text: 'Segment', datafield: 'metalTypee', width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
          { text: 'GRV No.', datafield: 'mrvNoo', width: '10%', cellsalign : 'center',sortable : true, menu : true, align:'center' },
          { text: 'GRV Sl No.', datafield: 'mrvSlNoo', width: '10%', cellsalign : 'center',sortable : true, menu : true, align:'center' },
          { text: 'Pcs', datafield: 'pcss', width: '10%', cellsalign : 'center', align:'center'},
          { text: 'Stone Wt.', datafield: 'stoneWtt', width: '10%', cellsalign : 'center', align:'center', cellsformat: 'd3', sortable : false, menu : false,
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['stoneWtt'] == null) ? 0 : parseFloat(record['stoneWtt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {      
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      		  		return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
          	  } 
          },
          { text: 'Invoice Amt. Bef.', datafield: 'invAmtt', width: '15%',sortable : false, menu : false, cellsalign : 'center', cellsformat: 'd3', align:'center',
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['invAmtt'] == null) ? 0 : parseFloat(record['invAmtt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {    
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
	       	  }   
          },
          { text: 'Total Amt.', datafield: 'totalAmtt', width: '16%',sortable : false, menu : false, cellsalign : 'center', cellsformat: 'd3', align:'center',
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['totalAmtt'] == null) ? 0 : parseFloat(record['totalAmtt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {    
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
          	  } 	
          }
        ]
    });
}

var mivDetails = function(data){
	
	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'mivDate', type: 'date', map: 'mrvMivDate' },
            { name: 'mivType', type: 'string', map: 'mrvMivType>name' },
            { name: 'metalType', type: 'string', map: 'segment>description' },
            { name: 'mivNo', type: 'number', map: 'id' },
            { name: 'mivSlNo', type: 'number', map: 'mrvMivSerialNo' },
            { name: 'pcs', type: 'number', map: 'pieces' },
            { name: 'stoneWt', type: 'float', map: 'stoneWeight' },
            { name: 'invAmt', type: 'float', map: 'invoiceAmountBeforeTax' },
            { name: 'totalAmt', type: 'float', map: 'invoiceAmountIncludingTax' }
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#mivDetails").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 60,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		theme: 'energyblue',
        source: dataAdapter, 
        showstatusbar: true,
	    statusbarheight: 50,
	    showaggregates: true,
        columns: [
          { text: 'GIV Date', datafield: 'mivDate', width: '9%', cellsalign : 'center',sortable : true, menu : true, align:'center', cellsformat : 'dd/MM/yyyy' },
          { text: 'GIV Type', datafield: 'mivType', width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center'},
          { text: 'Metal Type', datafield: 'metalType', width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
          { text: 'GIV No.', datafield: 'mivNo', width: '10%', cellsalign : 'center',sortable : true, menu : true, align:'center' },
          { text: 'GIV Sl No.', datafield: 'mivSlNo', width: '10%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Pcs', datafield: 'pcs', width: '10%', cellsalign : 'center', align:'center'},
          { text: 'Stone Wt.', datafield: 'stoneWt', width: '10%', cellsalign : 'center', align:'center', cellsformat: 'd3', sortable : false, menu : false,
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['stoneWt'] == null) ? 0 : parseFloat(record['stoneWt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
          	  } 
          },
          { text: 'Amount Before Tax', datafield: 'invAmt', width: '15%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd3',
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['invAmt'] == null) ? 0 : parseFloat(record['invAmt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
          	  }   
          },
          { text: 'Amount Including Tax', datafield: 'totalAmt', width: '16%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd3',
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['totalAmt'] == null) ? 0 : parseFloat(record['totalAmt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
          	  }   
          },  
        ]
    });
}
//Adjustment Details Grid No 4 ************##################################****************
var adjDetails = function(data){
	
	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'adjNo', type: 'string', map: 'id' },
            { name: 'adjMetalType', type: 'string', map: 'stoneSegment>code' },
            { name: 'adjType', type: 'string', map: 'adjustmentType>name' },
            { name: 'adjLocCode', type: 'string', map: 'locationCode' },
            { name: 'adjDCFlag', type: 'string', map: 'debitOrCreditType>name' },
            { name: 'stoneWt', type: 'float', map: 'stoneWeight' },
            { name: 'uqc', type: 'string', map: 'uqc>name' },
            { name: 'amt', type: 'string', map: 'voucherValue' },
            { name: 'supplier', type: 'number', map: 'vendorOrCompany>name' }
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#adjDetails").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 60,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
		showtoolbar : true,
        source: dataAdapter,
        showstatusbar: true,
	      statusbarheight: 50,
	      showaggregates: true,
        columns: [
          { text: 'Adj. No.', datafield: 'adjNo', width: '11%', cellsalign : 'center',sortable : true, menu : true, align:'center'},
          { text: 'Adj. Segment', datafield: 'adjMetalType', width: '11%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
          { text: 'Adj. Type ', datafield: 'adjType', width: '11%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
          { text: 'Adj. Loc Code', datafield: 'adjLocCode', width: '11%', cellsalign : 'center',sortable : false, menu : false, align:'center'},
          { text: 'Adj. Debit Credit Flag ', datafield: 'adjDCFlag', width: '12%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Stone Wt.', datafield: 'stoneWt', width: '11%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd3', 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['stoneWt'] == null) ? 0 : parseFloat(record['stoneWt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } 
          },
          { text: 'UQC', datafield: 'uqc', width: '11%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Amount', datafield: 'amt', width: '11%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Vendor/Company', datafield: 'supplier', width: '11%',sortable : false, menu : false, cellsalign : 'center', align:'center'}
        ]
    });
}


//Stone Details Grid No 6 ************##################################****************
var stoneDetails = function(data){
	 
	  var source = {
	      localdata: data,
	      datatype: "array",
	      datafields:  
    	  [
	            { name: 'grNo', type: 'number', map: 'id' },
	            { name: 'stoneSeg', type: 'string', map: 'grHeader>stoneSegment>description' },
	            { name: 'stoneArticle', type: 'string', map: 'stoneCode' },
	            { name: 'shapeCatDesc', type: 'string', map: 'subCategoryDescription' },
	            { name: 'wtCostRange', type: 'string', map: 'stoneWeightRangeSlab' },
	            { name: 'stonePcs', type: 'float', map: 'stonePcs' },
	            { name: 'stoneWt', type: 'float', map: 'stoneWt' },
	            { name: 'uom', type: 'string', map: 'uom>name' },
	            { name: 'stoneRate', type: 'float', map: 'stoneCostRate' },
	            { name: 'certOtherChges', type: 'float', map: 'certificateCharges' },
	            { name: 'stoneValue', type: 'float', map: 'stoneValue' },
	            { name: 'grBy', type: 'string', map: 'grHeader>createdBy' }
          ],
	      updaterow: function (rowid, rowdata) {
	          // synchronize with the server - send update command   
	      }
	  };
	  
	  var toThemeProperty = function (className) {
		    return className;
		};

		function getSubItems(data) {
		    var subItems = [];
		    if (data.subItems.length > 0) {
		        subItems = data.subItems;
		    } else if (data.subGroups.length > 0) {
		        for (var i = 0; i < data.subGroups.length; i++) {
		            if (data.subGroups[i].subItems.length > 0) {
		                subItems = subItems.concat(data.subGroups[i].subItems);
		            } else {
		                subItems = subItems.concat(getSubItems(data.subGroups[i]));
		            }
		        }
		    }
		    return subItems;
		}

		var groupsrenderer = function (text, group, expanded, data) {
		    var number = dataAdapter.formatNumber(group, data.groupcolumn.cellsformat);
		    var text = data.groupcolumn.text + ': ' + number;

		    var aggregate = this.getcolumnaggregateddata('stoneValue', ['sum'], true, getSubItems(data));
		    return '<div class="' + toThemeProperty('jqx-grid-groups-row') + '" style="position: absolute;"><span>' + text + ', </span>' + '<span class="' + toThemeProperty('jqx-grid-groups-row-details') + '">' + "Total" + ' (' + aggregate.sum + ')' + '</span></div>';
		};
		
		
	  var dataAdapter = new $.jqx.dataAdapter(source);
	  // initialize jqxGrid
	  $("#stoneDetails").jqxGrid({
			width : '100%',
			editable : false,
			height : 200,
			columnsheight : 60,
			autorowheight : true,
			autoheight : true,
			altRows : true,
			theme: 'energyblue',
			columnsresize : true,
			showtoolbar : true,
	      source: dataAdapter,
	      showstatusbar: true,
	      statusbarheight: 50,
	      showaggregates: true,
	      groupsrenderer: groupsrenderer,
	      groupable: true,
	      selectionmode: 'singlecell',
	      columns: [
	    	  { text: 'IGR No.',datafield: 'grNo', width: '5%', cellsalign : 'center',sortable : true, menu : true, align:'center', groupsexpandedbydefault : true},
	    	  { text: 'Stone Seg', datafield: 'stoneSeg',  width: '9%', cellsalign : 'center',sortable : true, menu : true, align:'center' }, 
	    	  { text: 'Stone Article', datafield: 'stoneArticle',  width: '8%', cellsalign : 'center',sortable : false, menu : false, align:'center' }, 
	    	  { text: 'Shape/Sub Cat.Desc', datafield: 'shapeCatDesc',  width: '9%', cellsalign : 'center',sortable : true, menu : true, align:'center' }, 
	    	  { text: 'Weight/Cost-Range', datafield: 'wtCostRange',  width: '9%', cellsalign : 'center',sortable : false, menu : false, align:'center' }, 
	    	  { text: 'Stone Pcs', datafield: 'stonePcs',  width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center',
	    		  aggregates: [{          
	        		  'Total': function(aggregatedValue, currentValue, column, record) {
	    				  var total = (record['stonePcs'] == null) ? 0 : parseFloat(record['stonePcs']);
	        			  return aggregatedValue + total;
	        		  }
	        	  }],
	        	  aggregatesrenderer: function(aggregates) {        		 
	        		    if(typeof aggregates["Total"] == "undefined"){
		      				return '0.00';
		      		  	}else{
		      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		      		  	}
	        	  }  
	    	  },
	    	  { text: 'Stone Wt.', datafield: 'stoneWt',  width: '9%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd3',
	    		  aggregates: [{          
	        		  'Total': function(aggregatedValue, currentValue, column, record) {
	    				  var total = (record['stoneWt'] == null) ? 0 : parseFloat(record['stoneWt']);
	        			  return aggregatedValue + total;
	        		  }
	        	  }],
	        	  aggregatesrenderer: function(aggregates) {        		 
	        		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
	        	  }    
	    	  },
	    	  { text: 'UQC', datafield: 'uom',  width: '5%', cellsalign : 'center', align:'center',sortable : false, menu : false}, 
	    	  { text: 'Stone Rate', datafield: 'stoneRate',  width: '8%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd2' }, 
	    	  { text: 'Cert/Other Charges', datafield: 'certOtherChges',  width: '13%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd2',
	    		  aggregates: [{          
	        		  'Total': function(aggregatedValue, currentValue, column, record) {
	    				  var total = (record['certOtherChges'] == null) ? 0 : parseFloat(record['certOtherChges']);
	        			  return aggregatedValue + total;
	        		  }
	        	  }],
	        	  aggregatesrenderer: function(aggregates) {        		 
	        		    if(typeof aggregates["Total"] == "undefined"){
		      				return '0.00';
		      		  	}else{
		      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		      		  	}
	        	  } 
	    	  }, 
	    	  { text: 'Stone Value', datafield: 'stoneValue',  width: '8%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat : 'd2',   columntype : 'numberinput',
	 			 createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 2
						});
					},
					  aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['stoneValue'] == null) ? 0 : parseFloat(record['stoneValue']);
		        			  return aggregatedValue + total;
		        		  }
		        	  }],
		        	  aggregatesrenderer: function(aggregates) {        		 
		        		    if(typeof aggregates["Total"] == "undefined"){
			      				return '0.00';
			      		  	}else{
			      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
			      		  	}
		        	  } 
	    	  },
	    	  { text: 'IGR By', datafield: 'grBy',  width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center'} 
    	  ]
	  });
}


var grDetailsList = function(data){
	
	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'srlNo', type: 'string' },
            { name: 'grDate', type: 'date' },
            { name: 'isStoneAccounting', type: 'string' },
            { name: 'isCompleted', type: 'string' },
            { name: 'grNo', type: 'string'},
            { name: 'grStoneWt', type: 'number' },
            { name: 'grDoneBy', type: 'number'}
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#grDetailsList").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 40,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
		showtoolbar : true,
        source: dataAdapter, 
        columns: [
          { text: 'SL No.', datafield: 'srlNo', width: '20%', cellsalign : 'center',sortable : true, menu : true, align:'center' },
          { text: 'IsStoneAccounting', datafield: 'isStoneAccounting', width: '20%',hidden:true, cellsalign : 'center',sortable : true, menu : true, align:'center' },
          { text: 'IsCompleted', datafield: 'isCompleted', width: '20%',hidden:true, cellsalign : 'center',sortable : true, menu : true, align:'center' },
          { text: 'IGR Date', datafield: 'grDate', width: '20%', cellsalign : 'center',sortable : false, menu : false, align:'center',columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy'},
          { text: 'IGR #', datafield: 'grNo', width: '20%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
          { text: 'Stone Wt', datafield: 'grStoneWt', width: '20%', cellsalign : 'center', align:'center'},
          { text: 'IGR Done By', datafield: 'grDoneBy', width: '20%', cellsalign : 'center', align:'center', sortable : false}
        ]
    });
}
$("#toggle1").on('click', function(){
	$("#panel1").toggle();
});


$("#toggle2").on('click', function(){
	$("#panel2").toggle();
});


$("#toggle3").on('click', function(){
	$("#panel3").toggle();
});

$("#toggle4").on('click', function(){
	$("#panel4").toggle();
});


$("#grTally").on('click', function(){
	var mrvNo = $('#mrvNoC').val();
	var mrvSlNo = $('#mrvSlNoC').val();	
	loadComputeTally(mrvNo, mrvSlNo);
})  

$("#clearGR").on('click', function(){
	$("#grStoneAccCreateGrid").jqxGrid('clear');
	$("#grId").val('');
	$("#grCreatedDt").val('');
	//$('#addGrStoneAccGrid').jqxButton({disabled: false });
	//$('#deleteGrStoneAccGrid').jqxButton({disabled: false });
	$("#saveGRFG").prop('disabled', false);
	globalFlag = false;
});
