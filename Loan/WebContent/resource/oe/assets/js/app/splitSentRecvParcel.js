var stockId;
var spOnloadFunction = function(docNo){
	stockId = docNo;
	$.getJSON('/OrderExecution/api/v1/getSentParcelOnLoadForSplitStockId?stockId='+stockId, function(data) {
		var result = data.payload;
		$("#sentParcelVendorIdC").val(result.vendorDetails.id);
		$("#sentParcelVendorC").val(result.vendorDetails.vendorName);
		$("#courierNameC").val("In Person");
		$("#parcelChargesC").val(parseFloat(0).toFixed(2));
		$("#noOfParcelsC").val(1);
		$("#spGrossWtC").val(parseFloat(result.splitGrossWt).toFixed(3));
		$("#givNumbC").val(result.splitMivDetails.id);
		$("#gstinNoC").val(result.vendorTaxDetails[0].gstinNo);
		$("#courierDocNoC").val(result.courierId);
	});
}

var rpOnloadFunction = function(docNo){
	stockId = docNo;
	$.getJSON('/OrderExecution/api/v1/getSentParcelOnLoadForSplitStockId?stockId='+stockId, function(data) {
		var result = data.payload;
		$("#rcvParcelVendorIdC").val(result.vendorDetails.id);
		$("#rcvParcelVendorC").val(result.vendorDetails.vendorName);
		$("#parcelDelModeC").val("By Person");
		$("#materialTypeRcvIdC").val(result.materialType.code);
		$("#materialTypeRcvC").val("FG " +result.materialType.description);
		$("#noOfBoxesC").val(1);
		$("#ccBorneByC").val("Vendor");
		$("#parcelGrsWtC").val(result.splitGrossWt)
	});
}

$("#saveSplitSP").on('click',function(){
	$("#saveSplitSP").prop('disabled',true);
	var sentParcelDate =
			{
			  "courierDocNumber": $("#courierDocNoC").val(),
			  "fromPlace": "",
			  "toPlace": "",
			  "vendorId": $("#sentParcelVendorIdC").val(),
			  "vatNumber":$("#gstinNoC").val(),
			  "noOfParcels": $("#noOfParcelsC").val(),
			  "grossWeight":$("#spGrossWtC").val(),
			  "courierCharges": "",
			  "insuranceValue": "",
			  "t20WayBill": "",
			  "courierId": $("#courierDocNoC").val(),
			  "mivList": [{"mivSrialNo": $("#givNumbC").val()}],
			  "vrHeaders": [],
			  "insuranceCharges": "",
			  "courierDate": "",
			  "type": "splitSentParcel",
			  "stockId": stockId
			}
	
	postJSON('/OrderExecution/api/v1/sentParcel',JSON.stringify(sentParcelDate),function(data) {
		if (data.resCode == 1) {	
			$("#saveSplitSP").prop('disabled',true);
				$.growl.notice({
					message : "Successfully Created Parcel : "+data.payload.id,
					duration : 10000,
					title : 'Success'
				});		
			window.location.href="javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')"
		} else {
			$("#saveSplitSP").prop('disabled',false);
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
			$("#saveSplitSP").prop('disabled',false);
		 }
    });
});

$("#saveSplitRP").on('click',function(){
	$("#saveSplitRP").prop('disabled',true);
	var receiveParcelDate = {
		"courierDocNumber":"",
		"vendorId":$("#rcvParcelVendorIdC").val(),
		"noOfParcels":$("#noOfBoxesC").val(),
		"grossWeight":$("#parcelGrsWtC").val(),
		"courierCharges":"",
		"insuranceValue":"",
		"materialTYpe":$("#materialTypeRcvIdC").val(),
		"parcelDelvMode":"P",
		"parcelRecivBy":"",
		"courierChargesBy":"V",
		"sendThruPersonName":"",
		"coureirAgencyName": "",
		"type":"splitReceiveParcel", 
		"stockId" :stockId
	}
	postJSON('/OrderExecution/api/v1/receiveParcel',JSON.stringify(receiveParcelDate),function(data) {
		if (data.resCode == 1) {	
			$("#saveSplitRP").prop('disabled',true);
				$.growl.notice({
					message : "Successfully Created Parcel : "+data.payload.id,
					duration : 10000,
					title : 'Success'
				});				
			window.location.href="javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')"
		} else {
			$("#saveSplitRP").prop('disabled',false);
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
			$("#saveSplitSP").prop('disabled',false);
		 }
    });
});