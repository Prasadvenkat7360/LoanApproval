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

var parcelEditlinkrenderer = function(row, column, value) {

	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#parcelData" type="button" href="parcelData?parcelId='
			+ value + '"/><span class="fa fa-eye fa-sm"></span></a>'

}

var receiveParcelEditlinkrenderer = function(row, column, value) {

	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#receiveParcelData" type="button" href="receiveParcelData?parcelId='
			+ value + '"/><span class="fa fa-eye fa-sm"></span></a>'

}

function sentParcelDetails() {
	var parcelDetail = {
		"courierDocNumber" : $("#courierDocNo").val(),
		"fromPlace" : $("#fromPlace").val(),
		"toPlace" : $("#toPlace").val(),
		"vendorId" : $("#vendor-parcel").val(),
		"vatNumber" : $("#vatNo").val(),
		"noOfParcels" : $("#noOfParcel").val(),
		"grossWeight" : $("#grossWt").val(),
		"courierCharges" : $("#charges").val(),
		"insuranceValue" : $("#insuranceVal").val(),
		"t20WayBill" : $("#billFormNo").val(),
		"courierId" : $("#couriers").val(),
		"mivList" : [],
		"vrHeaders" : [],
		"insuranceCharges" : $("#insuranceCharges").val(),
		"courierDate" : $("#courierDate").val()

	};

	var mivLists = [];
	$.each($("#mivDetails option:selected"), function() {
		mivLists.push({
			mivSrialNo : $(this).val()
		});
	});

	parcelDetail.mivList = mivLists;
	
	var vendRetDetArr = [];
	
	$.each($("#vendRetDetails option:selected"), function() {
		vendRetDetArr.push({
			id : $(this).val()
		});
	});
	
	parcelDetail.vrHeaders = vendRetDetArr;
	
	return parcelDetail;
}

function receiveParcelDetails() {	

	var parcelDetail = {
		"courierDocNumber" : $("#courierRecNo").val(),
		"vendorId" : $("#vendor-parcel").val(),
		"noOfParcels" : $("#noOfBoxes").val(),
		"grossWeight" : $("#parcelGrWt").val(),
		"courierCharges" : $("#courierCharges").val(),
		"insuranceValue" : $("#insuredAmnt").val(),		
		"materialTYpe" : $("#materialTYpe").val(),
		"parcelDelvMode" : $("#parcelDelMode").val(),
		"parcelRecivBy" : $("#parcelRecBy").val(),
		"courierChargesBy" : $("#costBy").val(),
		"sendThruPersonName" : $("#parcelSentThru").val(),
		"coureirAgencyName" : $("#courierAgencyName").val()

	};

	return parcelDetail;
}

$(function() {

	/* Clear Form Filter and Re-set to default search and clear Grid data */
	$("#removeAll").on('click', function() {

		//$designers.empty().append('<option value="" selected>Select</option>');
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	});

	$("#clearAll").on('click', function() {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
		$('#sentParcel').trigger("reset");

	});

});

function sentParcelDetailsValidation() {

	var couriers = $('#couriers option:selected').html();
	var mivDetails = $("#mivDetails").val();
	var vendorRet = $('#vendorRetObj').val();
	var vendorParcel = $("#vendor-parcel").val();
	var grossWt = $("#grossWt").val();
	var noOfParcels = $("#noOfParcel").val();
	console.log(vendorRet);
	var validation = true;
	if((vendorRet == null || vendorRet == "") && (mivDetails == null || mivDetails == "")){
		$.growl.error({ message: "Please select either GIV Details or  Vendor Return Numbers.", duration: 10000 });
		validation = false;
		return false;
	}/*else if(((vendorRet != null && vendorRet.length) > 0) && ((mivDetails != null && mivDetails.length) >0)){
		$.growl.error({ message: "Please select either GIV Details  or  Vendor Return Numbers.", duration: 10000 });
		validation = false;
		return false;
	}*/else if (couriers == null || couriers == ""  || vendorParcel == "" || vendorParcel == null || grossWt == "" || grossWt == null || noOfParcels == "" || noOfParcels == null){
		validation = false;
	}else{
		validation = true;
	}
	

	return validation;
}

function recieveParcelDetailsValidation() {
	var materialTYpe = $('#materialTYpe option:selected').html();
	var vendorParcel = $("#vendor-parcel").val();
	var courierAgencyName = $("#courierAgencyName").val();
	var courierRecNo = $("#courierRecNo").val();
	var grossWeight = $("#parcelGrWt").val();
	var noOfBoxes = $("#noOfBoxes").val();
	var parcelSentThru = $("#parcelSentThru").val();
	var value = $("#parcelDelMode option:selected").val();
	var validation = true;
	if (value == 'P') {
		if (materialTYpe == null || materialTYpe == "" || vendorParcel == ""
				|| vendorParcel == null || grossWeight == null
				|| grossWeight == "") {

			validation = false;

		}

	}

	else {
		if (materialTYpe == null || materialTYpe == "" || vendorParcel == ""
				|| vendorParcel == null || courierAgencyName == ""
				|| courierAgencyName == null || courierRecNo == ""
				|| courierRecNo == null || parcelSentThru == ""
				|| parcelSentThru == null || grossWeight == null
				|| grossWeight == "") {

			validation = false;

		}

	}

	return validation;
}
function parcelUpdateDataValidation(assignTo) {	
	var validation = true;
	var parcelStatus = $('#parcelStatus option:selected').html();	
	if (parcelStatus == 'Close') {		
		var parcelAssignTo = $('#parcelAssignTo option:selected').html();
		var parcelRemarks = $("#parcelRemarks").val();
	
		if(parcelAssignTo != null && parcelAssignTo != "" && assignTo.valueOf() != parcelAssignTo.trim().valueOf()) {
			
			$.growl.error({
				message : "Status should be open",
				duration : 10000
			});
			validation = false;
		}
		else if (parcelRemarks == "" || parcelRemarks == null) {
			$.growl.error({
				message : "Closed remarks are mandatory",
				duration : 10000
			});
			validation = false;
		}
			
		}		
		else if (parcelStatus == 'Lost') {
			var parcelAssignTo = $('#parcelAssignTo option:selected').html();
			var remarks = $("#remarks").val();
			if(parcelAssignTo != null && parcelAssignTo != "" && assignTo.valueOf() != parcelAssignTo.trim().valueOf()) {
				
				$.growl.error({
					message : "Status should be open",
					duration : 10000
				});
				validation = false;
			}
			else if (remarks == "" || remarks == null) {
				$.growl.error({
					message : "Remarks are mandatory",
					duration : 10000
				});
				validation = false;
			}
			

	}

	return validation;

}

/*function sentParcelUpdateDataValidation() {
	var validation = true;
	var parcelStatus = $('#updatedStatus option:selected').html();

	if (parcelStatus == 'Delivered') {
		var deliveryDate = $("#deliveryDate").val();
		if (deliveryDate == "" || deliveryDate == null) {
			$.growl.error({
				message : "Delivery date is mandatory",
				duration : 10000
			});
			validation = false;
		}

	}
	if (parcelStatus == 'Lost') {
		var remarks = $("#remarks").val();
		if (remarks == "" || remarks == null) {
			$.growl.error({
				message : "Remarks is mandatory",
				duration : 10000
			});
			validation = false;
		}

	}

	return validation;

}*/

function sentParcelGrid() {

	var updateRows = function(rowid, newdata, commit) {
		/*
		 * updates[newdata.id] = { };
		 */
	}
	var datafields = [ {
		'name' : 'fromPlace',
		'type' : 'string'

	}, {
		'name' : 'createdDate',
		'type' : 'date'
	}, {
		'name' : 'parcelId',
		'type' : 'long'
	}, {
		'name' : 'vendorCode',
		'type' : 'long'
	}, {
		'name' : 'courierName',
		'type' : 'string'
	}, {
		'name' : 'toPlace',
		'type' : 'string'
	}, {
		'name' : 'noOfParcels',
		'type' : 'int'
	}, {
		'name' : 'grossWeight',
		'type' : 'long'
	}, {
		'name' : 'courierCharges',
		'type' : 'long'
	}, {
		'name' : 'insuranceValue',
		'type' : 'long'
	}, {
		'name' : 'insuranceCharges',
		'type' : 'long'
	}, {
		'name' : 'vatNumber',
		'type' : 'string'
	}, {
		'name' : 't20WayBill',
		'type' : 'long'
	}, {
		'name' : 'courierDocNumber',
		'type' : 'string'
	}, {
		'name' : 'parcelStatus',
		'type' : 'string'
	}, {
		'name' : 'remarks',
		'type' : 'string'
	}, {
		'name' : 'sentBy',
		'type' : 'string'
	}, {
		'name' : 'deliverDate',
		'type' : 'string'
	}, {
		'name' : 'createdUserName',
		'type' : 'string'
	}

	, {
		'name' : 'parcelActionId',
		'type' : 'long',
		'map' : 'parcelId'
	} ];

	var columns = [

	{
		'text' : 'Sent Parcel Date',
		'datafield' : 'createdDate',
		'width' : '5%',
		editable : false,
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center',
	},

	{
		'text' : 'Parcel No.',
		'datafield' : 'parcelId',
		'width' : '4%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	},

	{
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '4%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Courier Name',
		'datafield' : 'courierName',
		'width' : '6%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Courier Doc. No.',
		'datafield' : 'courierDocNumber',
		'width' : '5%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'From Place',
		'datafield' : 'fromPlace',
		'width' : '5.5%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'To Place',
		'datafield' : 'toPlace',
		'width' : '5.5%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'No. of Parcels',
		'datafield' : 'noOfParcels',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Parcel Gross Wt.',
		'datafield' : 'grossWeight',
		'width' : '6%',
		cellsformat : 'd3',
		sortable : false,
		editable : false,
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Parcel Charges',
		'datafield' : 'courierCharges',
		'width' : '5%',
		sortable : false,
		cellsformat : 'd2',
		editable : false,
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Insurance Value in Rs.',
		'datafield' : 'insuranceValue',
		'width' : '7%',
		cellsformat : 'd2',
		sortable : false,
		editable : false,
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Insurance Charges in Rs.',
		'datafield' : 'insuranceCharges',
		'width' : '7%',
		cellsformat : 'd2',
		sortable : false,
		editable : false,
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'GST No.',
		'datafield' : 'vatNumber',
		'width' : '3%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'T20 /Way Bill Form No.',
		'datafield' : 't20WayBill',
		'width' : '6%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Delivered Date',
		'datafield' : 'deliverDate',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false,		
	}, {
		'text' : 'Parcel Status',
		'datafield' : 'parcelStatus',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Remarks',
		'datafield' : 'remarks',
		'width' : '6%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Parcel Sent By ',
		'datafield' : 'sentBy',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : '',
		'datafield' : 'parcelActionId',
		cellsrenderer : parcelEditlinkrenderer,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '3%'
	}

	];

	showMyGrid(datafields, "/OrderExecution/api/v1/parcelList", "list",	columns, parcelFilterValues(), updateRows, "createdDate");
	$("#jqxgrid").jqxGrid({
		width : '100%',
		columnsheight: 80,
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true 
	});

}

function receiveParcelGrid() {

	var updateRows = function(rowid, newdata, commit) {
		/*		updates[newdata.id] = {
		 "id" : newdata.id,
		 "designer" : newdata.designer,
		 "selectionStatus" : undefined != newdata.selectionStatus ? newdata.selectionStatus
		 : false
		 };*/
	}

	var datafields = [ {
		'name' : 'parcelId',
		'type' : 'long'
	}, , {
		'name' : 'vendorCode',
		'type' : 'string'
	}, {
		'name' : 'materialTYpe',
		'type' : 'string'
	}, {
		'name' : 'courierName',
		'type' : 'string'
	}, {
		'name' : 'courierDocNumber',
		'type' : 'string'
	}, {
		'name' : 'noOfParcels',
		'type' : 'int'
	}, {
		'name' : 'grossWeight',
		'type' : 'long'
	}, {
		'name' : 'parcelStatus',
		'type' : 'string'
	}, {
		'name' : 'parcelDelvMode',
		'type' : 'string'
	}, {
		'name' : 'lastChangedDate',
		'type' : 'string'
	}, {
		'name' : 'parcelRecivBy',
		'type' : 'string'
	}, {
		'name' : 'sendThruPersonName',
		'type' : 'string'
	}, {
		'name' : 'remarks',
		'type' : 'string'
	}, {
		'name' : 'closedRemarks',
		'type' : 'string'
	}, {
		'name' : 'courierAgencyName',
		'type' : 'string'
	}, {
		'name' : 'asignTo',
		'type' : 'string'
	}, {
		'name' : 'noOfDaysOpen',
		'type' : 'long'
	},

	{
		'name' : 'actionId',
		'type' : 'long',
		'map' : 'parcelId'
	}];
	var columns = [
	{
		'text' : 'Parcel No.',
		'datafield' : 'parcelId',
		'width' : '4%',
		sortable : true,
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Days parcel pending',
		'datafield' : 'noOfDaysOpen',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Updated by and Date Time',
		'datafield' : 'lastChangedDate',
		'width' : '12%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Material Type',
		'datafield' : 'materialTYpe',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Parcel Delivery Mode',
		'datafield' : 'parcelDelvMode',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Courier Agency Name',
		'datafield' : 'courierAgencyName',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Courier Receipt No.',
		'datafield' : 'courierDocNumber',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'No of Boxes',
		'datafield' : 'noOfParcels',
		'width' : '5%',	
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Parcel Gross Wt.',
		'datafield' : 'grossWeight',
		'width' : '5%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
	}, {
		'text' : 'Parcel Received By',
		'datafield' : 'parcelRecivBy',
		'width' : '8%',
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Parcel Sent Through',
		'datafield' : 'sendThruPersonName',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Remarks',
		'datafield' : 'remarks',
		'width' : '7%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Assigned to',
		'datafield' : 'asignTo',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Status',
		'datafield' : 'parcelStatus',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Close Remarks',
		'datafield' : 'closedRemarks',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : '',
		'datafield' : 'actionId',
		cellsrenderer : receiveParcelEditlinkrenderer,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '3%'
	}];
	showMyGrid(datafields, "/OrderExecution/api/v1/reciveParcelList", "list",columns, parcelFilterValues(), updateRows, "parcelId");
		$("#jqxgrid").jqxGrid({
			width : '100%',
	        sortable: true,            
	     	altrows: true,
	     	autorowheight :true,
	        autoheight :true,
	        columnsheight: 85,
	        columnsresize: true,  
			rowsheight : 35,
			rowdetails : true,
			virtualmode : true,
		});
	}

function parcelFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};
	var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();
	var status = $('#parcelStatus').val();
	var parcelNo = $('#parcelNo').val();
	var vendorCode = $("#vendorCode").val();
	var materialType = $('#materialType').val();
	var acknowledgeBy = $('#acknowledgeBy').val();
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	if (parcelNo != "" && parcelNo != null) {
		fieldFilters.fieldFilters["parcelNo"] = parcelNo;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorCode"] = $('#vendorCode-value').val();
	}
	if (materialType != "" && materialType != null) {
		fieldFilters.fieldFilters["materialType"] = materialType;
	}
	if (acknowledgeBy != "" && acknowledgeBy != null) {
		fieldFilters.fieldFilters["acknowledgeBy"] = acknowledgeBy;
	}
	return fieldFilters;

}

$('#createParcel').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});

$('#mivparcel').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});

$('#parcelData').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});

$('#createReciveParcel').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});

$('#receiveParcelData').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});


//###################### Export functionality #######################

$("#export").on("click",function() {
		var data;
	    var newData = [];
	    var fieldFilters = parcelFilterValues();
	    
		var sysdate = moment().format('DDMMYYYYHHmmSS');
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
				postJSON('/OrderExecution/api/v1/parcelList?page=export',JSON.stringify(fieldFilters),function(response) {
			   if(response != null){
               data = response.payload.list;
               for (i = 0; i < data.length; i++) {
				newData.push({
					 	
				        "Sent Parcel Date": data[i].createdDate == null ? "" : data[i].createdDate,
				        "Parcel No": data[i].parcelId == null ? "" : data[i].parcelId,
		        		"Vendor Code": data[i].vendorCode == null ? "" : data[i].vendorCode,		       
				        "Courier Name": data[i].courierName == null ? "" : data[i].courierName,				        
		        		"Courier Doc Number": data[i].courierDocNumber ==  null ? "" : data[i].courierDocNumber,
        				"From Place": data[i].fromPlace ==  null ? "" : data[i].fromPlace,
						"To Place": data[i].toPlace ==  null ? "" : data[i].toPlace,        				
						"NoOfParcels": data[i].noOfParcels == null ? "" : data[i].noOfParcels,								
				        "Gross Weight": data[i].grossWeight == null ? "" :data[i].grossWeight,				        		
				        "Courier Charges": data[i].courierCharges == null ? "" : data[i].courierCharges,
				        "Insurance Value": data[i].insuranceValue == null ? "" : data[i].insuranceValue,
				        "Insurance Charges": data[i].insuranceCharges == null ? "" : data[i].insuranceCharges,
				        "GST No": data[i].vatNumber == null ? "" : data[i].vatNumber,
				        "T20/Way Bill":  data[i].t20WayBill == null ? "" : data[i].t20WayBill,
				        "Deliver Date": data[i].deliverDate == null ? "" : data[i].deliverDate,				        
				        "Parcel Status": data[i].parcelStatus == null ? "" : data[i].parcelStatus,
				        "Remarks": data[i].remarks == null ? "" : data[i].remarks,
				        "Sent By": data[i].sentBy == null ? "" : data[i].sentBy,		
				      
                });
            }
               var opts = [{sheetid:'SentParcelReport',header:true}];
               var res = alasql('SELECT * INTO XLSX("SentParcelReport_'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
      }
 });
 }else{
	  $.growl.error({
		message : "No Data to Export.",
			duration : 10000
		});
			return false;	
		}
	}
});


// Export Receive Parcel
$("#exportRp").on("click",function(){
	var count = 0;
	var data;
	var newData = [];
	var rows = $("#jqxgrid").jqxGrid('getrows');
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
	 }else{				
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/reciveParcelList?page=export',JSON.stringify(parcelFilterValues()),function(response) {
				if (response != null) {
					data = response.payload.list;
		             for (i = 0; i < data.length; i++) {
						newData.push({
			                'Parcel No' : (data[i].parcelId != null) ? data[i].parcelId : "",
							'Days Parcel Pending' : (data[i].noOfDaysOpen != null) ? data[i].noOfDaysOpen: "",
							'Update By & Date Time' : (data[i].updatedByAndDate != null) ? data[i].updatedByAndDate : "",		
							'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode: "",
							'Material Type' : (data[i].materialTYpe != null) ? data[i].materialTYpe : "",
							
							'Parcel Delivery Mode' : (data[i].parcelDelvMode != null) ? data[i].parcelDelvMode : "",		
							'Courier Agency Name' : (data[i].courierAgencyName != null) ? data[i].courierAgencyName : "",	
							'Courier Receipt No' : (data[i].courierDocNumber != null) ? data[i].courierDocNumber : "",
							'No of Boxes' : (data[i].noOfParcels != null) ? data[i].noOfParcels : "",
							
							'Parcel Gross Wt' : (data[i].grossWeight != null) ? data[i].grossWeight : "",
							'Parcel Received By' : (data[i].parcelRecivBy != null) ? data[i].parcelRecivBy : "",
							
							'Parcel Sent Through' : (data[i].sendThruPersonName != null) ? data[i].sendThruPersonName : "",
							'Remarks' : (data[i].remarks != null) ? data[i].remarks : "",
							'Assigned To' : (data[i].asignTo != null) ? data[i].asignTo : "",
						    "Status" : (data[i].parcelStatus != null) ? data[i].parcelStatus : "", 	
						    "Close Remarks" :(data[i].closedRemarks != null) ? data[i].closedRemarks : "",
		              });
		          }
		       //JSONToCSVConvertor(newData, "Bill Discount Report" + "_" + sysdate, true);
		             var opts = [{sheetid:'Receive Parcel',header:true}];
		             var res = alasql('SELECT * INTO XLSX("Receive Parcel_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
