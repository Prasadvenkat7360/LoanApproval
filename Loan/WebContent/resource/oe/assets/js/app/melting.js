var loadPermission  = function(){
	debugger;
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	if(typeof permission != "undefined"){
		debugger;
		$(".layout-main button").each(function() {
			var value = '#'+this.id;
			var value2 = '#'+this.id+'C';
			var value3 = '#'+this.id+'S';
			var val = $(value).text();
			val = val.trim();
			if( val.startsWith("search") || val.startsWith("Search")){
				console.log(val + "" + permission.canSearch);
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

loadPermission();

$("#segment")
		.change(
				function() {
					var fromLocation = $("#fromLocation option:selected").val();
					$('#fromLocation').empty();
					getJSON(
							'/OrderExecution/api/v1/issueForMeltingLOV?page=segmentLOV&segment='
									+ $("#segment option:selected").val(),
							function(data) {
								$fromLocation
										.append('<option value="" selected label="--Select--" />');
								$.each(data.payload.location,
										function(key, val) {
											$fromLocation
													.append('<option value="'
															+ val.id + '">'
															+ val.id + "-" + val.name
															+ '</option>');
										});

							});
				});

$("#vendors").on("autocompleteselect", function(event, ui) {

	var value = $("#vendorType option:selected").val();
	if (value == "External") {
		vendor = ui.item.label;
		$('#toLocation').val(vendor);
		$('#toLocation').prop('disabled', true);
	}
});

$("#save").on("click",function() {
	if($("#fromLocation").val() == "TQM" && ($("#refNo").val() == "" || $("#slNo").val() == "")){
		alert("hi");
		$.growl.error({
			message : "Please Enter Ref No and Ref Sl No !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		if (createIssueForMeltingValidation()) {
			postJSON('/OrderExecution/api/v1/issueForMelting',JSON.stringify(createIssueForMelting()),function(data) {
				if (1 == data.resCode) {
					$('#createIssueForMelting').modal('hide');
					$("#jqxgrid").jqxGrid("updatebounddata");
						$.growl.notice({
							message : "Successfully created issue for melting: " + data.payload.id,
							duration : 10000,
							title : 'Success'
						});
				} else if (2 == data.resCode) {
						$.growl.error({
							message : data.mesgStr,
							duration : 10000
					});
				}
				else if(data.resCode == 3){
						$.growl.error({
							message  : data.mesgStr,
							duration : 1000,
							title : 'Error'
						})
					return false;
				}
				else{}
			});
		}else{
			$.growl.error({	message  : "Please enter gross wt, net wt and remarks.",duration : 1000,title : 'Error'});
			return false;
			}
	}
});

var pureWtOfLocation;
var netWtOfLocation;
netWt = $('#netWt').val();
$("#fromLocation").change(function() {
					$('#grossWt').val('');
					$('#expPurity').val('');
					$('#expPureWt').val('');
					$('#netWt').val('');
					$("#grossWt").prop('disabled',false);
					var fromLocation = $("#fromLocation option:selected").val();
					var segment = $("#segment option:selected").val();
					if (fromLocation != null && fromLocation != ''
							&& segment != null && segment != '' && fromLocation != "TQM")
						getJSON(
								'/OrderExecution/api/v1/getExpPureData?segment='
										+ $("#segment option:selected").val()
										+ '&locationCode='
										+ $('#fromLocation').val(),
								function(data) {
									if (1 == data.resCode) {
										pureWtOfLocation = data.payload.meltingData.pureWtOfLocation;
										netWtOfLocation = data.payload.meltingData.netWtOfLocation;

									}

								});

				});

$("#grossWt").mouseover(function() {
	$(this).prop("title", "Available Gross Weight : " + netWtOfLocation + "");
});

$("#slNo").on('change',function(){
	if($("#segment").val() != null && $('#fromLocation').val() != null && $('#fromLocation').val() == "TQM" && $('#refNo').val() != null 
			&& $('#slNo').val() != null ){
		getJSON('/OrderExecution/api/v1/getExpPureData?segment='
				+ $("#segment").val()
				+'&locationCode='+ $('#fromLocation').val()
				+'&refNo='+ $('#refNo').val()
				+'&refSrlNo='+ $('#slNo').val(),function(data) {
					if (1 == data.resCode) {
						if($("#fromLocation").val() == "TQM"){
							$("#grossWt").val(data.payload.meltingData.grossWt);
							$("#netWt").val(data.payload.meltingData.netWtOfLocation);
							$("#expPurity").val(data.payload.meltingData.pureWtOfLocation.toFixed(2));
							var expPurityPerc = $("#expPurity").val();
							var grossWt = $("#grossWt").val();
							var netWt = $("#netWt").val();

							$('#expPureWt').val(((expPurityPerc * netWt) / 99.9).toFixed(3));
							$("#grossWt").prop('disabled',true);
						}
						pureWtOfLocation = data.payload.meltingData.pureWtOfLocation;
						netWtOfLocation = data.payload.meltingData.netWtOfLocation;
					}
					else if(data.resCode == 3){
						$.growl.error({
							message  : data.mesgStr,
							duration : 1000,
							title : 'Error'
						})
						return false;
					}

				});
	}else{
		$("#grossWt").prop('disabled',false);
	}
	
});

$("#grossWt").change(function(event) {

					var fromLocation = $("#fromLocation option:selected").val();
					var segment = $("#segment option:selected").val();
					grossWt = $('#grossWt').val();
					if (grossWt == 0) {
						$('#grossWt').val('');
						$.growl.error({
							message : "Weight should not be Zero"
						});
						return false;
					} else {
						grossWt = parseFloat(grossWt).toFixed(3);
					}
					if (fromLocation != null && fromLocation != ''
							&& segment != null && segment != '') {
						if (parseFloat(grossWt) > parseFloat(netWtOfLocation)) {
							$.growl.error({
								message : "Weight exceeded"
							});
							$('#grossWt').val('');

						} else {
							$('#grossWt').val(grossWt);
							$('#netWt').val(grossWt);
							if($("#fromLocation").val() == "TQM"){
								var expPurity = pureWtOfLocation.toFixed(2);
							}else{
								var expPurity = ((pureWtOfLocation / netWtOfLocation) * 99.9).toFixed(2);
							}
							
							$('#expPurity').val(expPurity);
							$('#expPureWt').val(((expPurity * grossWt) / 99.9).toFixed(3));
						}
					} else {
						$('#grossWt').val('');
						$.growl.error({
							message : "Please Select From Location",
							duration : 10000
						});
					}
				});

$("#createIssueForMelting input[type=number]").keypress(
		function(event) {

			if (event.which == 45 || event.which == 189 || event.which > 96
					&& event.which < 123 || event.which > 64
					&& event.which < 91) {
				event.preventDefault();
			}
		});

$("#refNo").keypress(function(event) {
	if (event.which == 46) {
		event.preventDefault();
	}
});

$("#slNo").keypress(function(event) {

	if (event.which == 46) {
		event.preventDefault();
	}
});

$(function() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	var today = dd + '/' + mm + '/' + yyyy;
	/*
	 * On blur check dateFormat Right or Wrong. If Wrong it will take current
	 * date else selected date.
	 */

	/* Clear Form Filter and Re-set to default search and clear Grid data */
	$("#removeAll").on('click', function() {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	});

	$("#clearAll").on('click', function() {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();

		$('#issueForMelting').trigger("reset");
	//	window.location.href = "javascript:showContentPage('issueForMelting', 'bodySwitcher')";


	});

});

var meltingViewLinkRenderer = function(row, column, value) {

	return '<a class="btn btn-sm btn-primary" data-toggle="modal"  type="button" onclick="formSubmit('
			+ value + ')"><span class="fa fa-eye fa-sm"></span></a>'

}

function formSubmit(value) {
	showContentPage('meltingView?meltingLotId=' + value, 'bodySwitcher');

}
function issueForMeltingGrid() {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields = [ {
		'name' : 'createdDate',
		'type' : 'string'

	}, {
		'name' : 'meltingLotId',
		'type' : 'long'
	}, {
		'name' : 'vendorType',
		'type' : 'string'
	}, {
		'name' : 'vendorCode',
		'type' : 'string'
	}, {
		'name' : 'metalSegement',
		'type' : 'string'
	}, {
		'name' : 'mivOrTvNo',
		'type' : 'long'
	}, {
		'name' : 'serialNo',
		'type' : 'long'
	}, {
		'name' : 'referenceNo',
		'type' : 'long'
	}, {
		'name' : 'grossWt',
		'type' : 'double'
	}, {
		'name' : 'netWt',
		'type' : 'double'
	}, {
		'name' : 'meltedBarGrossWt',
		'type' : 'double'
	}, {
		'name' : 'meltedBarNetWt',
		'type' : 'double'
	}, {
		'name' : 'expPurity',
		'type' : 'double'
	}, {
		'name' : 'expPureWt',
		'type' : 'string'
	}, {
		'name' : 'status',
		'type' : 'string'
	}, {
		'name' : 'toLocation',
		'type' : 'string'
	}, {
		'name' : 'meltingActionId',
		'type' : 'long',
		'map' : 'meltingLotId'
	} ];

	var columns = [

	{
		'text' : 'Date',
		'datafield' : 'createdDate',
		'width' : '6%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	},
	{
		'text' : 'Melting Lot No.',
		'datafield' : 'meltingLotId',
		'width' : '7%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	},
	{
		'text' : 'Vendor Type',
		'datafield' : 'vendorType',
		'width' : '6%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Metal Segment',
		'datafield' : 'metalSegement',
		'width' : '6%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		
	}, {
		'text' : 'MIV/TV No.',
		'datafield' : 'mivOrTvNo',
		'width' : '5%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Loc',
		'datafield' : 'toLocation',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Ref No.',
		'datafield' : 'referenceNo',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Sl.No.',
		'datafield' : 'serialNo',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Initial Issue Gross Wt',
		'datafield' : 'grossWt',
		'width' : '7.5%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Initial Issue Net Wt',
		'datafield' : 'netWt',
		'width' : '7.5%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Melted Bar Gross Wt',
		'datafield' : 'meltedBarGrossWt',
		'width' : '7%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Melted Bar Net Wt',
		'datafield' : 'meltedBarNetWt',
		'width' : '7%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Expected Purity %',
		'datafield' : 'expPurity',
		'width' : '7%',
		sortable : false,
		editable : false,
		cellsformat : 'd2',
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Expected Pure Wt.',
		'datafield' : 'expPureWt',
		'width' : '7%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Status',
		'datafield' : 'status',
		'width' : '7%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : '',
		'datafield' : 'meltingActionId',
		cellsrenderer : meltingViewLinkRenderer,
		editable : false,
		sortable : false,
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
	}

	];

	showMyGrid(datafields, "/OrderExecution/api/v1/meltingList", "list",columns, meltingFilterValues(), updateRows, "meltingLotId");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
       	autorowheight :true,
        autoheight :true,
        theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}





function meltingFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};
	var fromDate = $('#meltingFromDate').val();
	var toDate = $('#meltingToDate').val();
	var status = $('#status').val();
	var meltingLotNo = $('#meltingLotNo').val();
	var metalSegment = $("#metalSegment").val();
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["meltingStatus"] = status;
	}
	if (meltingLotNo != "" && meltingLotNo != null) {
		fieldFilters.fieldFilters["meltingLotNo"] = meltingLotNo;
	}
	if (metalSegment != "" && metalSegment != null) {
		fieldFilters.fieldFilters["metalSegment"] = metalSegment;
	}

	return fieldFilters;

}

function createIssueForMelting() {
	var meltingData = {
		"vendorType" : $("#vendorType").val(),
		"vendorId" : $("#vendor-parcel").val(),
		"segmentId" : $("#segment").val(),
		"segmentLocationCode" : $("#fromLocation").val(),
		"referenceNo" : $("#refNo").val(),
		"serialNo" : $("#slNo").val(),
		"grossWt" : $("#grossWt").val(),
		"netWt" : $("#netWt").val(),
		"expPurity" : $("#expPurity").val(),
		"expPureWt" : $("#expPureWt").val(),
		"remarks" : $("#remarks").val(),
		"toLocation" : $("#toLocation").val()

	};

	return meltingData;
}

function createMeltingRecipet(meltingId, vendorId, segmentId, locationCode) {

	var meltingData = {
		"referenceNo" : $("#refNo").val(),
		"serialNo" : $("#refSlNo").val(),
		"meltedBarGrossWt" : $("#meltedgrossWt").val(),
		"meltedBarNetWt" : $("#meltednetWt").val(),
		"expPurity" : $("#expectedPurity").val(),
		"spillageWt" : $("#spillageWt").val(),
		"meltingLoss" : $("#meltingLoss").val(),
		"remarks" : $("#remarks").val(),
		"authBy" : $("#authBy").val(),
		"meltingLotId" : meltingId,
		"vendorId" : vendorId,
		"segmentId" : segmentId,
		"spillageWgtPurity" : $("#spillagepureWgt").val(),
		"pureWgt" : $("#meltedPureWgt").val(),
		"segmentLocationCode" : locationCode
	};

	return meltingData;
}

function createRecipetForMeltingValidation() {

	meltedgrossWt = $("#meltedgrossWt").val();
	meltednetWt = $("#meltednetWt").val();
	expectedPurity = $("#expectedPurity").val();
	spillageWt = $("#spillageWt").val();

	var validation = true;
	if (meltedgrossWt == null || meltedgrossWt == "" || meltednetWt == ""
			|| meltednetWt == null || spillageWt == "" || spillageWt == null) {
		$("#saveMelting").prop('disabled', false);
		validation = false;

	}

	return validation;
}

function createIssueForMeltingValidation() {

	var vendorType = $("#vendorType").val();
	var vendorId = $("#vendor-parcel").val();
	var segmentId = $("#segment").val();
	var segmentLocationCode = $("#fromLocation").val();
	var grossWt = $("#grossWt").val();
	var netWt = $("#netWt").val();
	var refNo = $("#refNo").val();
	var slNo = $("#slNo").val();
	var remarks = $("#remarks").val();
	
	var validation = true;
	if (vendorType == null || vendorType == "" || segmentId == ""
			|| segmentId == null || segmentLocationCode == ""
			|| segmentLocationCode == null || grossWt == "" || grossWt == null
			|| netWt == "" || netWt == null) {

		validation = false;

	}
	
	/*console.log(segmentLocationCode);
	if(segmentLocationCode == "TQM" && (refNo == "" || slNo == "" || remarks == "")){
		$.growl.error({
			message : "Please Enter Ref No and Ref Sl No !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}*/
	
	if (vendorType != 'Internal') {
		if (vendorId == "" || vendorId == null) {
			validation = false;
		}
	}

	return validation;
}

$("#receiptFromRefiner").draggable({
	handle : ".modal-header"
});

function setVendorData() {
	var $vendor = $('#vendor' + id);

	$.each(vendors, function(key, val) {
		$vendor.append('<option value="' + val.id + '">' + val.name
				+ '</option>');
	});
	++id;

}
/* Saving Melting Details */

function removeRow(id) {
	$("#removeAssayer" + id).parents("tr").remove();
	$("#removeRefining" + id).parents("tr").remove();
	$("#removeReceipt" + id).parents("tr").remove();

}

$('input:text:visible:first').focus();
var recipid = 0;

function createAssayerReceipt(mivId, vendorName, vendorId, grossWt, netWt) {
	++recipid;
	for (var i = 1; i < recipid; i++) {

		var value = $("#mivId" + i).text();

		if (value == mivId) {
			$.growl
					.error({
						message : "Input Grid for entering Receipt info Is already provided",
						duration : 10000
					});
			return false;
		}
	}

	$(".no-records").remove();

	$("#dynamicTable3 tbody")
			.append(
					"<tr id='disbleTr"
							+ recipid
							+ "'>`"
							+ "<td id ='date"
							+ recipid
							+ "'></td>"
							+ "<td id='vendor'>"
							+ vendorName
							+ "</td>"
							+ "<td id='mrv"
							+ recipid
							+ "'></td>"
							+ "<td id='refNo'><input class='form-control input-sm' type='number' id='refernceNo"
							+ recipid
							+ "' style='width: 75px;' onkeypress='decimalNumberValidation(event)' min='0'/></td>"
							+ "<td><input class='form-control input-sm' type='number' id='serialNo"
							+ recipid
							+ "' style='width: 75px;' onkeypress='decimalNumberValidation(event)' min = '0'/></td>"
							+ "<td><input class='form-control input-sm' type='number' min='0.001' max='99999999.999' id='grossWt"
							+ recipid
							+ "' value='"
							+ grossWt
							+ "' disabled/>"
							+ "<td><input class='form-control input-sm'  style='width: 75px;'  type='number' min='0.001' max='99999999.999' id='netWt"
							+ recipid
							+ "' value='"
							+ netWt
							+ "' disabled/></td><td><input class='form-control input-sm' type='number'min='0.001' max='99999999.999' step='0.001'  id='unassayedwgt"
							+ recipid
							+ "' onchange='assayerLossCal(this.value,"
							+ recipid
							+ ","
							+ netWt
							+ ")' onkeypress='numberValidation(event)'/></td><td><input class='form-control input-sm' type='number' min='0.01' max='99.99' step='0.01' id='purity"
							+ recipid
							+ "' onchange='purityInput(this.value,"
							+ recipid
							+ ","
							+ netWt
							+ ")' onkeypress='numberValidation(event)'/></td>"
							+ "<td><input class='form-control input-sm' type='number' min='0.001' max='99999999.999' id='recievedWt"
							+ recipid
							+ "' disabled/><td><input class='form-control input-sm' type='number' min='0.001' max='99999999.999' id='assayerLoss"
							+ recipid
							+ "' disabled/></td><td><input class='form-control input-sm' type='number' min='0.01' max='9999999999.99' id='assayerCharges"
							+ recipid
							+ "' onkeypress='numberValidation(event)'/></td><td><input class='form-control input-sm' type='text' id='assayercert"
							+ recipid
							+ "' onkeypress='isAlphaNumeric(event)'/></td>"
							+ "<td><input class='form-control input-sm' type='text' id='remarks"
							+ recipid
							+ "'/></td><td style='display:none;' id='mivId"
							+ recipid + "'>" + mivId
							+ "</td><td style='display:none;' id='vendorcodeId"
							+ recipid + "'>" + vendorId + "</td>"
							+ "<td id='addButtonReceipt" + recipid
							+ "' align='center'><i id='removeReceipt" + recipid
							+ "' onclick='removeRow(" + recipid
							+ ")' class='fa fa-trash fa-lg'></i></td></tr>"
							+ "</tr>");
	$("#receiveFromAssay").prop("disabled", false);

}

var refinerecipid = 0;
function createRefIssue(mivId, vendorName, vendorId, grossWt, netWt) {

	++refinerecipid;
	for (var i = 1; i < refinerecipid; i++) {

		var value = $("#refinemivId" + i).text();

		if (value == mivId) {
			$.growl
					.error({
						message : "Input Grid for entering Receipt info Is already provided",
						duration : 10000
					});
			return false;
		}
	}
	$("#dynamicTable5 tbody")
			.append(
					"<tr id='disableTrRefining"
							+ refinerecipid
							+ "'>`"
							+ "<td id ='refinedate"
							+ refinerecipid
							+ "'></td>"
							+ "<td id='refinevendor'>"
							+ vendorName
							+ "</td>"
							+ "<td id='refinemrv"
							+ refinerecipid
							+ "'></td>"
							+ "<td id='refinerefNo'><input class='form-control input-sm' type='number' id='refinerefernceNo"
							+ refinerecipid
							+ "'  onkeypress='decimalNumberValidation(event)' min='0'/></td>"
							+ "<td><input class='form-control input-sm' type='number' id='refineserialNo"
							+ refinerecipid
							+ "' onkeypress='decimalNumberValidation(event)' min='0'/></td>"
							+ "<td><input class='form-control input-sm' type='number' min='0.001' max='99999999.999' id='refinegrossWt"
							+ refinerecipid
							+ "' value='"
							+ grossWt
							+ "' disabled/>"
							+ "</td><td><input class='form-control input-sm' type='number' id='refinenetWt"
							+ refinerecipid
							+ "' value='"
							+ netWt
							+ "' disabled/></td><td><input class='form-control input-sm' type='number' min='0.01' max='99.99' step='0.01' id='refinepurity"
							+ refinerecipid
							+ "' onchange='receivedWtCal(this.value,"
							+ refinerecipid
							+ ","
							+ netWt
							+ ")' onkeypress='numberValidation(event)'/></td>"
							+ "<td><input class='form-control input-sm' type='text' disabled id='refinerecievedWt"
							+ refinerecipid
							+ "' disabled/></td><td><input class='form-control input-sm' type='text' disabled id='refineLoss"
							+ refinerecipid

							+ "'</td><td><input class='form-control input-sm twoDecimalValidation' type='number' min='0.01' max='9999999999.99' id='refinecharges"
							+ refinerecipid
							+ "' onkeypress='numberValidation(event)'/></td><td><input class='form-control input-sm' type='text' id='refineremarks"
							+ refinerecipid
							+ "'</td><td style='display:none;' id='refinemivId"
							+ refinerecipid
							+ "'>"
							+ mivId
							+ "</td><td style='display:none;' id='refinevendorcodeId"
							+ refinerecipid + "'>" + vendorId + "</td>"
							+ "<td id='addButtonReceipt" + refinerecipid
							+ "' align='center'><i id='removeReceipt"
							+ refinerecipid + "' onclick='removeRow("
							+ refinerecipid
							+ ")' class='fa fa-trash fa-lg'></i></td>"
							+ "</tr>");
	$("#receiveFromRefiner").prop('disabled', false);

}

function assayerLossCal(unassayedWt, index, netwt) {

	var num1 = parseFloat(unassayedWt).toFixed(3);

	$('#unassayedwgt' + index).val(num1);
	var num3 = parseFloat(netwt);
	if (num3 < num1) {
		$.growl.error({
			message : "Unassyed weight exceeded",
			duration : 10000
		});

		$('#unassayedwgt' + index).val('');
		return false;
	}

	var purityVal = $("#purity" + index).val();
	var purity = parseFloat(purityVal);
	var reciveWgt = ((num3 - num1) * purity) / 99.9;
	var num2 = parseFloat(reciveWgt);

	var total = num3 - (parseFloat(num1) + num2);

	if (total >= 0) {
		// var lossWgt = num3-(num1+reciveWgt);
		$("#recievedWt" + index).val(num2.toFixed(3));
		$("#assayerLoss" + index).val(total.toFixed(3));

	}
}

function purityInput(purity, index, netwt) {
	if (purity == 0 || purity > 99.9) {
		$("#purity" + index).val('');
		$.growl.error({
			message : "Invalid purity",
			duration : 10000
		});
		return false;
	}
	var unassayedWt = $("#unassayedwgt" + index).val();
	var purity = parseFloat(purity).toFixed(2);
	$("#purity" + index).val(purity);

	if (unassayedWt == null || unassayedWt == '') {
		$("#unassayedWt" + index).val('');
		$("#recievedWt" + index).val('');
		$("#assayerLoss" + index).val('');
	} else {
		var num1 = parseFloat(unassayedWt);
		var num3 = parseFloat(netwt);
		if (num3 < num1) {
			$.growl.error({
				message : "Unassyed weight exceeded",
				duration : 10000
			});

			$("#unassayedWt" + index).val('');
			return false;
		}

		var reciveWgt = ((num3 - num1) * purity) / 99.9;
		var num2 = parseFloat(reciveWgt);
		var total = num3 - (num1 + num2);

		if (total >= 0) {
			var lossWgt = num3 - (num1 + reciveWgt);
			$("#recievedWt" + index).val(num2.toFixed(3));
			$("#assayerLoss" + index).val(total.toFixed(3));

		}

	}

}
function proceedRefing(meltingId) {
	var value = $("#mltStatus").text();
	if (value.trim().valueOf() == new String("Melted").valueOf()) {
		$.growl.error({
			message : "No Data Found",
			duration : 10000
		});

		return false;
	}

	var count = document.getElementById("rfatb").getElementsByTagName("tr").length;
	var count1 = document.getElementById("itatb").getElementsByTagName("tr").length;
	if (count != count1) {
		$.growl.error({
			message : "Receipt is missing",
			duration : 10000
		});
		return;
	}
	$("#dynamicTable3 tr:gt(0)")
			.each(
					function(row) {
						var index = parseInt(row) + 1;
						$(this)
								.find('td')
								.each(
										function(column, td) {

											if (column == 7 || column == 9
													|| column == 11
													|| column == 12
													|| column == 2) {

												if ($(
														'#dynamicTable3 tr:eq('
																+ index
																+ ') td:eq('
																+ column + ')')
														.text() == null
														|| $(
																'#dynamicTable3 tr:eq('
																		+ index
																		+ ') td:eq('
																		+ column
																		+ ')')
																.text() == '') {

													$.growl
															.error({
																message : "please fill all the mandatory fields",
																duration : 10000
															});

													return false;
												}
											}

										});

					});

	getJSON('/OrderExecution/api/v1/updateToRefining?id=' + meltingId,
			function(data) {
				if (1 == data.resCode) {

					$("#mltStatus").text(data.payload.status);
					$("[id='createReceipt']").hide();
					$("#refining").removeClass('disabledTab');
					$("#generate").hide();
					$("#issueToAssayer").hide();
					$("#receiveFromAssay").hide();
					$("#proceedToRefine").hide();
					//$("#refinAdd").css("display", "block");
					
					$.growl.notice({
						message : "Successfully Assigned To Refining",
						duration : 10000,
						title : 'Success'
					});
				} else {
					$.growl.error({
						message : "Receipt is missing",
						duration : 10000
					});
					return;
				}

			});

}

function receivedWtCal(purity, id, netwt) {
	if (purity == 0) {
		$("#refinepurity" + id).val('');
		$.growl.error({
			message : "Purity should not be Zero",
			duration : 10000
		});
		return false;
	} else if (purity >= 99.99) {
		$("#refinepurity" + id).val('');
		$.growl.error({
			message : "Purity excedded",
			duration : 10000
		});
		return false;
	}

	var num1 = parseFloat(purity).toFixed(2);
	$("#refinepurity" + id).val(num1);
	var num2 = parseFloat(netwt);

	receiveWt = (num1 * num2) / 99.9;
	var loss = (num2 - receiveWt).toFixed(3);

	$("#refinerecievedWt" + id).val(receiveWt.toFixed(3));
	$("#refineLoss" + id).val(loss);

}

function completeRefining(meltingId) {
	if ($("#mlbWeight").text() != 0) {
		$.growl.error({
			message : "Mlb weight should be 0",
			duration : 10000
		});
		return;
	}

	// $("#createRefReceipt").hide();
	var count = document.getElementById("refineTb").getElementsByTagName("tr").length;
	var count1 = document.getElementById("refineRcTb").getElementsByTagName(
			"tr").length;
	if (count != count1) {
		$.growl.error({
			message : "Receipt is missing",
			duration : 10000
		});
		return;
	}
	getJSON('/OrderExecution/api/v1/updateToRefined?id=' + meltingId, function(
			data) {
		if (data.resCode == 1) {
			$("#refinAdd").hide();
			$("#issueToRefiner").hide();
			$("#receiveFromRefiner").hide();
			$("#completed").hide();
			$("[id='createRefReceipt']").hide();
			$("#mltStatus").text(data.payload.status);
			$.growl.notice({
				message : "Successfully Completed Refining",
				duration : 10000,
				title : 'Success'
			});
		} else if (data.resCode == 1) {
			$.growl.error({
				message : "Receipt is missing",
				duration : 10000
			});
		}
	});
}
function setAssayedNetWgt(index, value) {
	$("#netWt" + index).val(value);

}
// var globalmlbweight=0.0;
function setNetWgtValue(value, id) {
	if (value == 0) {
		$.growl.error({
			message : "Weight Should not be Zero",
			duration : 10000
		});
		$("#grossWt" + id).val('');
		return false;
	}
	value = parseFloat(value).toFixed(3)
	$("#grossWt" + id).val(value);
	$("#netWt" + id).val(value);

	var mlbWgt = parseFloat($("#mlbWeight").text());

	var currentWGt = parseFloat(value);
	if (mlbWgt < currentWGt) {
		$("#grossWt" + id).val('');
		$("#netWt" + id).val('');
		$.growl.error({
			message : "Weight excedded",
			duration : 10000
		});

	}
}

function setRefinerNetWgtValue(value, id) {
	if (value == 0) {
		$("#refingrossWt" + id).val('');
		$.growl.error({
			message : "Weight should not be Zero",
			duration : 10000
		});
		return false;
	}
	value = parseFloat(value).toFixed(3);
	$("#refingrossWt" + id).val(value);
	$("#refinnetWt" + id).val(value);

	var mlbWgt = parseFloat($("#mlbWeight").text());

	var currentWGt = parseFloat(value);
	if (mlbWgt < currentWGt) {
		$("#refingrossWt" + id).val('');
		$("#refinnetWt" + id).val('');
		$.growl.error({
			message : "Weight excedded",
			duration : 10000
		});

	}
}

$("#meltingViewForm input[type=number]").keypress(
		function(event) {

			if (event.which == 45 || event.which == 189 || event.which > 96
					&& event.which < 123 || event.which > 64
					&& event.which < 91) {
				event.preventDefault();
			}
		});

function decimalValue(event) {

	if (event.which == 46) {
		event.preventDefault();
	}
}

function numberValidation(event) {

	if (event.which == 45 || event.which == 189 || event.which > 96
			&& event.which < 123 || event.which > 64 && event.which < 91) {
		event.preventDefault();
	}
}

function decimalNumberValidation(event) {

	if (event.which == 45 || event.which == 46 || event.which == 189
			|| event.which > 96 && event.which < 123 || event.which > 64
			&& event.which < 91) {
		event.preventDefault();
	}
}

function isAlphaNumeric(event) {
	if (event.which == 45 || event.which == 189 || event.which > 64 && event.which < 91 || event.shiftKey) {
		event.preventDefault();
	}
}
$(document).on("change", ".twoDecimalValidation", function() {
	var val = $(this).val();
	 if($(this).val().indexOf('.')!=-1){         
	       if($(this).val().split(".")[1].length > 2){                
	           if( isNaN( parseFloat( this.value ) ) ) return;
	           this.value = parseFloat(this.value).toFixed(2);
	       }  
	    }            
	    return this; //for chaining
});
$('#createIssueForMelting').on('hidden.bs.modal', function() {
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();
})



//----------------------------For Report Page----------------------------------------------------



function issueForMeltingGridReport() {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields = [ 
		
		{
			'name' : 'dcName',
			'type' : 'string',
		},
		{
			'name' : 'createdDate',
			'type' : 'string',
		},
		{
			'name' : 'meltingLotID',
			'type' : 'long',
		},
		{
			'name' : 'createdBy',
			'type' : 'String',
		},
		 {
			'name' : 'segment',
			'type' : 'string',
		},
		{
			'name' : 'fromLocation_MLD',
			'type' : 'string',
		},
		{
			'name' : 'grossWt',
			'type' : 'long',
		},
		{
			'name' : 'netWt',
			'type' : 'long',
		},
		{
			'name' : 'expectedPurity_mlt',
			'type' : 'long',
		}, 
		{
			'name' : 'expectedPureWt',
			'type' : 'long',
		},
		{
			'name' : 'receivingLocation_mlting',
			'type' : 'string',
		},
		{
			'name' : 'meltedBarWt',
			'type' : 'double',
		},
		{
			'name' : 'spillageWt',
			'type' : 'double',
		},
		{
			'name' : 'meltingLoss',
			'type' : 'double',
		},
		{
			'name' : 'expectedPurity_mlb',
			'type' : 'double',
		},
		{
			'name' : 'expectedMeltedBarPureWt',
			'type' : 'double',
		},
		{
			'name' : 'spillagePureWt',
			'type' : 'double',
		},
		/*{
			'name' : 'receivingLocation_assayer',
			'type' : 'String',
		},*/
		{
			'name' : 'assayerVendorCode',
			'type' : 'long',
		},
		{
			'name' : 'issuedToAssayedWt',
			'type' : 'double',
		},
		{
			'name' : 'assayerUnrefinedWt',
			'type' : 'double',
		},
		{
			'name' : 'assayerPurity',
			'type' : 'long',
		},
		{
			'name' : 'assayerPureWt',
			'type' : 'double',
		}, 
		{
			'name' : 'assayerLoss',
			'type' : 'long',
		}, 
		{
			'name' : 'refinerVendorCode',
			'type' : 'long',
		}, 
		{
			'name' : 'receivingLocation',
			'type' : 'string',
		}, 
		{
			'name' : 'issuedToRefiner',
			'type' : 'double',
		}, 
		{
			'name' : 'refinerPurity',
			'type' : 'double',
		}, {
			'name' : 'refinedPureWt',
			'type' : 'double',
		}, {
			'name' : 'refinningLoss',
			'type' : 'double',
		}, {
			'name' : 'gainOrLossInPureWt',
			'type' : 'double',
		}
		];

	var columns = [

	{
		'text' : 'DC',
		'datafield' : 'dcName',
		'width' : '6%',
		sortable : false,
		cellsalign : 'left',
		align:'center',
		editable : false
	},
	{
		'text' : 'Created Dt.',
		'datafield' : 'createdDate',
		'width' : '4.5%',
		sortable : false,
		cellsformat: 'dd/MM/yyyy',
		cellsalign : 'center',
		align:'center',
		editable : false
	},

	{
		'text' : 'Lot No.',
	    'datafield' : 'meltingLotID',
		'width' : '3.5%',
		sortable : false,
		cellsalign : 'center',
		align:'center',
		editable : false
	},
	{
		'text' : 'Lot Raised By',
	    'datafield' : 'createdBy',
		'width' : '5%',
		sortable : false,
		cellsalign : 'center',
		align:'center',
		editable : false
	},
	 {
		'text' : 'Metal Seg',
		'datafield' : 'segment',
		'width' : '5%',
		sortable : false,
		cellsalign : 'center',
		align:'center',
		editable : false
	},
	{
		'text' : 'From Loc',
		'datafield' : 'fromLocation_MLD',
		'width' : '4%',
		sortable : false,
		cellsalign : 'center',
		align:'center',
		editable : false
	},
	{
		'text' : 'Gross Wt.',
		'datafield' : 'grossWt',
		'width' : '4%',
		cellsalign : 'right',
		align:'center',
		cellsformat : 'd3',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Net Wt.',
		'datafield' : 'netWt',
		'width' : '4%',
		cellsalign : 'right',
		align:'center',
		cellsformat :'d3',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Exp Purity %',
		'datafield' : 'expectedPurity_mlt',
		'width' : '5%',
		cellsformat : 'd2',
		sortable : false,
		cellsalign : 'right',
		align:'center',
		editable : false
	}, 
	{
		'text' : 'Exp Pure Wt.',
		'datafield' : 'expectedPureWt',
		'width' : '5%',
		cellsalign : 'right',
		cellsformat :'d3',
		align:'center',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Receiving Loc',
	    'datafield' : 'receivingLocation_mlting',
		'width' : '5%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Melted Bar Wt',
		'datafield' : 'meltedBarWt',
		'width' : '4%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align:'center',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Spillage Wt',
	    'datafield' : 'spillageWt',
		'width' : '4%',
		cellsalign : 'right',
		align:'center',
		cellsformat :'d3',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Melting Loss',
        'datafield' : 'meltingLoss',
		'width' : '4%',
		cellsalign : 'right',
		align:'center',
		cellsformat :'d3',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Exp Purity %',
	    'datafield' : 'expectedPurity_mlb',
		'width' : '4%',
		cellsalign : 'right',
		align:'center',
		cellsformat :'d2',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Exp Pure Wt',
		'datafield' : 'expectedMeltedBarPureWt',
		'width' : '6%',
		cellsalign : 'right',
		align:'center',
		cellsformat : 'd3',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Spillage Pure Wt.',
		'datafield' : 'spillagePureWt',
		'width' : '5%',
		cellsalign : 'right',
		align:'center',
		cellsformat : 'd3',
		sortable : false,
		editable : false
	},	
	{
		'text' : 'Assayer Vendor Code',
		'datafield' : 'assayerVendorCode',
		'width' : '4%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Issue to Assayer Wt.',
		'datafield' : 'issuedToAssayedWt',
		'width' : '4%',
		cellsalign : 'right',
		align:'center',
		cellsformat : 'd3',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Assayer Unrefined Wt.',
		'datafield' : 'assayerUnrefinedWt',
		'width' : '5%',
		cellsalign : 'right',
		align:'center',
		cellsformat : 'd3',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Assayer Purity %',
		'datafield' : 'assayerPurity',
		'width' : '4%',
		cellsalign : 'right',
		align:'center',
		cellsformat : 'd2',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Assayer Pure Wt.',
		'datafield' : 'assayerPureWt',
		'width' : '5%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align:'center',
		editable : false
	}, 
	{
		'text' : 'Assayer Loss',
		'datafield' : 'assayerLoss',
		'width' : '4%',
		cellsformat :'d3',
		cellsalign : 'right',
		align:'center',
		editable : false
	}, 
	{
		'text' : 'Refiner Vendor Code',
		'datafield' : 'refinerVendorCode',
		'width' : '5%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, 
	{
		'text' : 'Receiving Loc',
		'datafield' : 'receivingLocation',
		'width' : '5%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, 
	{
		'text' : 'Issued to Refiner',
		'datafield' : 'issuedToRefiner',
		'width' : '5%',
		cellsformat :'d3',
		cellsalign : 'right',
		align:'center',
		editable : false
	}, 
	{
		'text' : 'Refiner Purity %',
		'datafield' : 'refinerPurity',
		'width' : '4%',
		cellsalign : 'right',
		align:'center',
		cellsformat :'d2',
		sortable : false,
		editable : false
	}, {
		'text' : 'Refined Pure Wt.',
		'datafield' : 'refinedPureWt',
		'width' : '4%',
		sortable : false,
		cellsformat :'d3',
		cellsalign : 'right',
		align:'center',
		editable : false
	}, {
		'text' : 'Refining Loss',
		'datafield' : 'refinningLoss',
		'width' : '4%',
		cellsformat :'d3',
		sortable : false,
		cellsalign : 'right',
		align:'center',
		editable : false
	}, {
		'text' : 'Gain/Loss in Pure Wt.',
		'datafield' : 'gainOrLossInPureWt',
		'width' : '5%',
		cellsformat :'d3',
		cellsalign : 'right',
		align:'center',
		sortable : false,
		editable : false
	}
	];

	showMyGrid(datafields, "/OrderExecution/api/v1/meltingListReport", "list",columns, meltingFilterValuesReport(), updateRows, "meltingLot");
	$("#jqxgrid").jqxGrid({
		 width : '100%',
         sortable: true,            
     	 altrows: true,
     	 theme: 'energyblue',
    	 columnsresize: true, 
         columnsheight: 80,
		 virtualmode : true
	});

}


function meltingFilterValuesReport() {

	fieldFilters = {
		"fieldFilters" : {}
	};
	var fromDate = $('#meltingFromDate').val();
	var toDate = $('#meltingToDate').val();
	var dcName = $('#dcName').val();
	var meltingLotNo = $('#meltingLotNo').val();
	var metalSegment = $("#metalSegment").val();
	var refinerCode = $("#refinerCode").val();
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (dcName != "" && dcName != null) {
		fieldFilters.fieldFilters["dcName"] = dcName;
	}
	if (meltingLotNo != "" && meltingLotNo != null) {
		fieldFilters.fieldFilters["mLot"] = meltingLotNo;
	}
	if (metalSegment != "" && metalSegment != null) {
		fieldFilters.fieldFilters["metalSegment"] = metalSegment;
	}
	if (refinerCode != "" && refinerCode != null) {
		fieldFilters.fieldFilters["refiner"] = refinerCode;
	}

	return fieldFilters;

}
$("#meltingFromDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0,
	//showOn : "none",
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#meltingToDate").datepicker('option', 'minDate', min || '0'); 
	}
});

$("#meltingToDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0
// maxDate: '+1Y+6M+1D',
});

//Print Functionality to be done by Venkat
//#######################################
$("#printMAR").on('click', function() {
var mFromDate = $('#meltingFromDate').val();
var mToDate = $('#meltingToDate').val();
var mlotNo=$('#meltingLotNo').val();
var msegment=$('#metalSegment').val();
var dcName=$('#dcName').val();
var refCode=$('#refinerCode').val();
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : mFromDate,
			"ToDate" : mToDate,
			"DcName" : dcName,
			"meltingLotNo" : mlotNo,
			"refCode" : refCode,
			"segType" : msegment,
			"mode" : "pdf",
			"reportName" : "RPT_Melting_Assaying_Refining"
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
				navigator.msSaveBlob(file, 'RPT_Melting_Assaying_Refining.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});

});



var $metalSegment = $('#metalSegment');
var $refinerCode = $('#refinerCode');
var $dcName = $('#dcName');

	$("#export").on("click", function() {		
		var data;
		var newData = [];
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		
		var rows = $("#jqxgrid").jqxGrid('getrows');
		if(typeof rows == "undefined"){
			$.growl.error({
				message : "No Data to Export.",
				duration : 5000
			});
			return false;
		}else{
		postJSON('/OrderExecution/api/v1/meltingListReportExport',JSON.stringify(meltingFilterValuesReport()), function(response) {
			if(null != response){
				data = response.payload.list;
				for(i=0; i<data.length; i++){
					var obj = data[i];
					var melting = {
							'DC' :(null!=obj.dcName)?obj.dcName :" ",
							'Created Dt.' : (null!=obj.createdDate)?obj.createdDate :" ",
							'Lot No' : (null!=obj.meltingLotID)?obj.meltingLotID :" ",
							'Lot Raised By' : (null!=obj.createdBy)?obj.createdBy :" ",						
							'Metal Seg' :(null!=obj.segment)?obj.segment :" ",
							'From Loc' : (null!=obj.fromLocation_MLD)?obj.fromLocation_MLD :" ",
							'Gross Wt.' : (null!=obj.grossWt)?obj.grossWt :" ",
							'Net Wt.' : (null!=obj.netWt)?obj.netWt :" ",						
							'Expected Purity %' : (null!=obj.expectedPurity_mlt)?obj.expectedPurity_mlt :" ",							
							'Expected Pure Wt.' : (null!=obj.expectedPureWt)?obj.expectedPureWt :" ",						
							'Receiving Loc' : (null!=obj.receivingLocation_mlting)?obj.receivingLocation_mlting :" ",						
							'Melted Bar Wt.' : (null!=obj.meltedBarWt)?obj.meltedBarWt :" ",						
							'Spillage Wt.' : (null!=obj.spillageWt)?obj.spillageWt :" ",						
							'Melting Loss' : (null!=obj.meltingLoss)?obj.meltingLoss :" ",						
							'Exp Purity %' : (null!=obj.expectedPurity_mlb)?obj.expectedPurity_mlb :" ",						
							'Exp Pure Wt.' : (null!=obj.expectedMeltedBarPureWt)?obj.expectedMeltedBarPureWt :" ",						
							'Spillage Pure Wt.' : (null!=obj.spillagePureWt)?obj.spillagePureWt :" ",						
							'Assayer Vendor Code' : (null!=obj.assayerVendorCode)?obj.assayerVendorCode:"",						
							'Issue To Assayer Wt.' : (null!=obj.issuedToAssayedWt)?obj.issuedToAssayedWt :" ",							
							'Assayer Unrefined Wt.' : (null!=obj.assayerUnrefinedWt)?obj.assayerUnrefinedWt :" ",						
							'Assayer Purity %' : (null!=obj.assayerPurity)?obj.assayerPurity :" ",						
							'Assayer Pure Wt.' : (null!=obj.assayerPureWt)?obj.assayerPureWt :" ",						
							'Assayer Loss' : (null!=obj.assayerLoss)?obj.assayerLoss :" ",					
							'Refiner Vendor Code' : (null!=obj.refinerVendorCode)?obj.refinerVendorCode :" ",							
							'Receiving Loc' : (null!=obj.receivingLocation)?obj.receivingLocation :" ",							
							'Issue To Refiner' : (null!=obj.issuedToRefiner)?obj.issuedToRefiner :"",							
							'Refiner Purity %' : (null!=obj.refinerPurity)?obj.refinerPurity :" ",						
							'Refined Pure Wt.' : (null!=obj.refinedPureWt)?obj.refinedPureWt :" ",						
							'Refining Loss' : (null!=obj.refinningLoss)?obj.refinningLoss :"",					
							'Gain Or Loss In Pure Wt.' : (null!=obj.gainOrLossInPureWt)?obj.gainOrLossInPureWt :""							
						}
						newData.push(melting);							
				   }	
				/*console.log(newData);
				JSONToCSVConvertor(newData, "MeltingAssayingRefiningReport" + "_" + sysdate, true);*/
				 var opts = [{sheetid:'Melting_Assaying_Refining_Report',header:true}];
                 var res = alasql('SELECT * INTO XLSX("Melting Assaying Refining Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
				}
			});
		}
	});
	
	$.getJSON('/OrderExecution/api/v1/meltingLOVReport', function(data) {
		
		/*$.each(data.payload.segements, function(key, val) {			
			$metalSegment.append('<option value="' + val.description + '">' + val.description
					+ '</option>');
		});
		*/
		$.each(data.payload.refinerCode, function(key, val) {			
			$refinerCode.append('<option value="' + val.id + '">' + val.vendorCode + '-' + val.vendorName
					+ '</option>');
		});
		
		var dcList = data.payload.dcList;
		var data = [];
		$.each(dcList, function(key, val) {	
			data.push({ value: val.id, label: val.dcname});
		});
		$(function() {
			$("#dcName").autocomplete({

				source: data,
				focus: function(event, ui) {

					event.preventDefault();
					$(this).val(ui.item.label);

				},
				select: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#dcName-value").val(ui.item.value);
				}
			});
		});
	
		
	});
	
$('#Search').on('click', function() {
	$form = $('#issueForMelting');
	$form.validate({
		errorElement: 'label', 
		        errorClass: 'help-inline', 
		        focusInvalid: false, 
		        ignore: "",
		        rules: {	        	
		            "meltingFromDate": {
		            	dateITA : true ,
		            	required : true
		            },
		            "meltingToDate": {
		            	required : true,
		            	dateITA : true 
		            }
		        },errorPlacement: function(error, element) {
		        	if(element.context.name == "meltingFromDate" || element.context.name == "meltingToDate" ){
		        		error.insertAfter(element.parent());
		        	}else{
		        		error.insertAfter(element);
		        	}
		        },  
		   	 submitHandler: function (form) { 
		   		issueForMeltingGridReport();
				$("#jqxgrid").show();		
		     	return false;
		     }
		    });
		
	});
