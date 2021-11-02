<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Create Bullion GRV
					</h1>
					<div class="heading-block-action"><a href="javascript:showContentPage('pendingIndents', 'bodySwitcher')" class="btn btn-primary btn-sm voffset" type="button" id="indentListing"><i class="fa fa-arrow-left"></i>&nbsp;Go Back</a></div>
				</div>
				<fieldset id="bmrvForm">
					<form class="form-horizontal">
							<div class="mobile-responsive">
								<div class="row">

									<div class="col-sm-2">
										<label>PO No</label>
										<input type="text" class="form-control" name="indentNo" id="indentNo" placeholder="PO No"	disabled="disabled" />
									</div>
									<div class="col-sm-2">
										<label>PO Date</label> 
										<input type="text"	class="form-control" name="indentDate" id="indentDate" placeholder="PO Date"	disabled="disabled" />
									</div>
									<div class="col-sm-2">
										<label>Segment</label> 
										<input type="text" class="form-control" name="segment" id="segment" placeholder="Segment" disabled="disabled" />
									</div>
									<div class="col-sm-2">
										<label>Purity</label> 
										<input type="text" class="form-control"	name="purity" id="purity" placeholder="Purity" disabled="disabled" />
									</div>
									<div class="col-sm-2">
										<label>Bullion Dealer</label> 
										<input type="text" class="form-control" name="bdCode" id="bdCode" placeholder="Bullion Dealer"	disabled="disabled" />
									</div>
									<div class="col-sm-2">
										<label>GRV Number</label> 
										<input type="text"	class="form-control" name="bMRVNo" id="bMRVNo" placeholder="GRV Number"	disabled="disabled" />
									</div>
									<div class="col-sm-2" id="bdHide">
										<label>Bullion Dealer Id</label> 
										<input type="text"	class="form-control" name="bdId" id="bdId"	placeholder="Bullion Dealer Id" disabled="disabled" />
									</div>
								</div>
								<div class="row">

									<div class="col-sm-2">
										<label><span class="required">*</span>Party Bill No.</label> 
										<input	type="text" class="form-control alphaNumeric" placeholder="Party Bill No."	name="partyBillNo" id="partyBillNo" maxlength="40" />
									</div>
									<div class="col-sm-2">
										<label><span class="required">*</span>Party Bill Date</label>
										<div class="input-group">
											<input type="text" class="date-picker form-control"	id="deliveryDate" placeholder="DD/MM/YYYY">
											<label	for="deliveryDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
									</div>
									<div class="col-sm-2">
										<label><span class="required">*</span>UQC</label> 
										<input	type="text" class="form-control" id="uom" value="Gms" placeholder="UQC"  disabled="disabled" />
									</div>

									<div class="col-sm-2">
										<label><span class="required">*</span>Party Bill Wt.</label> 
										<input	type="number" class="form-control"	name="partyBillWt" placeholder="Party Bill Wt."  id="partyBillWt" min="0.001" max="99999999.999" onchange="validateNumberInput(event)"  onkeypress='numberValidation(event)'/>
									</div>


									<div class="col-sm-2">
										<label><span class="required">*</span>Metal Rate</label> 
										<input	type="number" class="form-control" id="metalRate" placeholder="Metal Rate"  disabled="disabled" min="0.01" max="9999999999.99" />
									</div>
									<div class="col-sm-2">
										<label><span class="required">*</span>Metal Value</label> 
										<input type="number" class="date-picker form-control" id="metalValue" placeholder="Metal Value"  disabled="disabled">
									</div>

								</div>
								<div class="row">

									<div class="col-sm-2">
										<label>Commission</label> 
										<input type="number" class="form-control" name="comission" placeholder="Commission"  id="comission" min="0.01" max="9999999999.99" onkeypress='numberValidation(event)'/>
									</div>
									<div class="col-sm-2">
										<label>Insurance Charges</label> 
										<input type="number" class="form-control" name="insurance" placeholder="Insurance Charges"  id="insurance" min="0.01" max="9999999999.99" onkeypress='numberValidation(event)'/>
									</div>
									<div class="col-sm-2">
										<label>Courier Charges</label> 
										<input type="number" class="form-control" name="courier" placeholder="Courier Charges" id="courier" min="0.01" max="9999999999.99" onkeypress='numberValidation(event)'/>
									</div>
									<div class="col-sm-2">
										<span class="required">*</span><label>GSTIN</label>
										<select id="gstnNo" class="form-control"><option value="" selected label="--Select--" /></select>
									</div>

									<div class="col-sm-2">
										<span class="required">*</span><label>Source of State</label>
										<select id="sourceState" class="form-control"><option value="" selected label="--Select--" /></select>
									</div>
									
								</div>
								
								<div class="row">
									<div class="col-sm-2">
										<label>CGST%</label> <input type="text" id="cgstPer" placeholder="CGST%" class="form-control" disabled />
									</div>
									
									<div class="col-sm-2">
										<label>CGST Amount</label> <input type="text" id="cgstAmount" placeholder="CGST Amount" class="form-control" disabled />
									</div>
									
									<div class="col-sm-2">
										<label>SGST%</label> <input type="text" id="sgstPer" placeholder="SGST%"	class="form-control" disabled />
									</div>
									
									<div class="col-sm-2">
										<label>SGST Amount</label> <input type="text" id="sgstAmount" placeholder="SGST Amount" class="form-control" disabled />
									</div>
									
									<div class="col-sm-2">
										<label>IGST%</label> <input type="text" id="igstPer" placeholder="IGST%" class="form-control" disabled />
									</div>
									
									<div class="col-sm-2">
										<label>IGST Amount</label> <input type="text" id="igstAmount" placeholder="IGST Amount" class="form-control" disabled />
									</div>
									
									
								</div>
								
							</div>
							<div class="row">
									<div class="col-sm-2">
										<label>CESS%</label> <input type="text" id="cessPer" placeholder="CESS%" class="form-control" disabled />
									</div>
									<div class="col-sm-2">
										<label>CESS Amount</label> <input type="text" id="cessAmount" placeholder="CESS Amount" class="form-control" disabled />
									</div>
									
									<div class="col-sm-2">
										<label>Invoice Amount</label> <input type="text" id="invAmount" placeholder="Invoice Amount" class="form-control" disabled />
									</div>
								</div>

							<div id="indentDistribution">
								<div class="clearfix">&nbsp;</div>
								<div class="heading-block" id="stoneDeailsLable">
									<h5>
										<i class="fa fa-desktop"></i> Bullion GIV Distribution Detail:
									</h5>
								</div>
								<table class="table table-bordered" style="width: 45%"
									id="bidistribution">
									<thead>
										<tr>
											<td width="33%" style="background-color: #F5F5F5;"><label>PO Weight In Gms</label></td>
											<td width="33%" style="background-color: #F5F5F5;"><label><span	class="required">*</span>Edit Weight In Gms </label></td>
											<td width="34%" style="background-color: #F5F5F5;"><label>JW Code</label></td>
										</tr>
									</thead>
									<tbody id="bullionMIVBody"></tbody>

								</table>
							</div>

					</form>
				</fieldset>
				<div class="modal-footer  text-center">

					<button id="saveMIV" class="btn btn-primary btn-sm" type="button">
						<i class="fa fa-floppy-o"></i>&nbsp;Create
					</button>

					<button type="button" class="btn btn-warning btn-sm" id="clear">
						<i class="fa fa-times"></i>&nbsp;Clear
					</button>
					<button id="bmrvPrint" type=button class="btn btn-primary btn-sm">
						<i class="fa fa-print"></i> &nbsp;Print
					</button>

				</div>

			</div>
		</div>
	</div>
</div>


<script type="text/javascript">


	var indentMDArray = [];
	var bullionRate = null;
	var indentMetal = null;
	var  gstNo = [];
    $("#bdHide").hide();
	
	$(document).ready(function() {

		$('#bmrvPrint').hide();
		$('#indentDistribution').hide();

	});
	
	var  gstNo ;
	$.getJSON('/OrderExecution/api/v1/indentDById',function(data) {
						if (1 == data.resCode) {
							indentMetal = data.payload.indentMetal;
							  gstNo = data.payload.GstnNoList;
							 
							 $('#gstnNo').empty().append('<option value="" selected>--Select--</option>');
								$.each(gstNo, function(key, val) {
									$('#gstnNo').append('<option value="' + val.id + '">' + val.gstinNo + '</option>');
							 });
								
							$('#sourceState').empty().append('<option value="" selected>--Select--</option>');
								$.each(data.payload.stateList, function(key, val) {
									$('#sourceState').append('<option value="' + val.id + '">' + val.name + '</option>');
							 });	

							$('#indentNo').val(indentMetal.id);
							$('#indentDate').val(indentMetal.creationDate);
							$('#segment').val(
									indentMetal.metalSegment.description);
							$('#purity').val(indentMetal.purity);
							$('#bdCode')
									.val(
											indentMetal.bullionDealer.vendorCode
													+ " - "
													+ indentMetal.bullionDealer.vendorName);
							$("#bdId").val(data.payload.indentMetal.bullionDealer.id);
							$('#metalRate').val(indentMetal.inputRate);
							bullionRate = indentMetal.inputRate;
							if (!indentMetal.rateConfirmed) {
								$('#metalRate').attr('disabled', false);
							}

							if (indentMetal.indentMetaDistributions.length > 0) {
								$('#indentDistribution').show();
								$
										.each(
												indentMetal.indentMetaDistributions,
												function(key, val) {
													$('#bullionMIVBody')
															.append(
																	'<tr> <td id="abc">'
																			+ val.vendorWeight
																			+ '</td><td><input type="number" id="'+(key+1)+'" class="form-control negitiveValidation" placeholder="Weight" min="0.001" max="99999999.999" onkeypress="numberValidation(event)"/></td><td id="xyz">'
																			+ val.vendor.vendorCode
																			+ '</td></tr>');

												})
							}

							return true;

						} else {
							$.growl.error({
								message : data.mesgStr,
								duration : 10000,
								title : 'Error'
							});
							return false;
						}
					});

	$("#clear").on("click",	function() {
						$('#partyBillNo').val(null);
						$('#deliveryDate').val(null);
						$('#partyBillWt').val(null);
						$('#comission').val(null);
						$('#insurance').val(null);
						$('#courier').val(null);
						$('#centralExcise').val(null);
						$('#vatGST').val(null);
						$('#cst').val(null);
						$('#metalValue').val(null);
						$('#metalRate').val(bullionRate);

						if (indentMetal.indentMetaDistributions.length > 0) {
							$("#bullionMIVBody").empty();
							$
									.each(
											indentMetal.indentMetaDistributions,
											function(key, val) {
												$('#bullionMIVBody')
														.append(
																'<tr> <td id="abc">'
																		+ val.vendorWeight
																		+ '</td><td><input type="number" id="'+val.serialNumber+'" class="form-control" placeholder="Weight"/></td><td id="xyz">'
																		+ val.vendor.vendorCode
																		+ '</td></tr>');

											})
						}

					});

	$("#cancel").on("click", function() {
		showContentPage('pendingIndents', 'bodySwitcher');
	});

	$("#partyBillWt").on("change", function() {
		valueCalculation();
	});

	$("#metalRate").on("change", function() {
		valueCalculation();
	});
	
	var res;
	$("#gstnNo").on('change',function(){
		var gstNo = $("#gstnNo").val();
		var StateDet = {
				"fieldFilters" : {
					"type" : "state",
					"bdId" : $("#bdId").val(),
					"gstnNo" : $("#gstnNo option:selected").text(),
				}
			}
			if(gstNo != ""){
				postJSON('/OrderExecution/api/v1/getBmrvTaxDetails',JSON.stringify(StateDet),function(data) {
					if (data.resCode == "1") {		
					 res = data.payload.state;
					$('#sourceState').empty().append('<option value="" selected>--Select--</option>');
					var result = [];
					 result.push(res);
					$.each(result, function(key, val) {
						$('#sourceState').append('<option value="' + val.id + '">' + val.code + "-" + val.name + '</option>');
				    });
				  }
			  });
				
			}
	});

$("#saveMIV").on("click",function() {
	if($("#partyBillNo").val() == "" || $("#deliveryDate").val() == "" || $("#partyBillWt").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	if(gstNo != ""){
		if($("#gstnNo").val() == "" || $("#gstnNo").val() == null){
			$.growl.error({
				message : "Please Select GSTIN !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
	if(typeof res === 'object'){
		if($('#sourceState').val() == "" || $('#sourceState').val() == null ){
			$.growl.error({
				message : "Please Select Source State !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	}
	if (validateBullionMRV()) {
		if (validateVendorWeight()) {
			postJSON('/OrderExecution/api/v1/bReceipt',JSON.stringify(bullionMRVDetails()),function(data) {
				if (1 == data.resCode) {
					if (data.mesgStr.length > 0) {
						$.growl.warning({
							message : data.mesgStr,
							duration : 10000,
							title : 'warning'
						});
					}
					$.growl.notice({
						message : "Successfully created Bullion GRV: "
								+ data.payload.bRId,
						duration : 10000,
						title : 'Success'
					});

					$('#bmrvForm').attr('disabled','disabled');
					$('#bMRVNo').val(data.payload.bRId);

					$('#saveMIV').hide();
					$('#clear').hide();
					$('#bmrvPrint').show();
					window.location.href="javascript:showContentPage('pendingIndents', 'bodySwitcher')"
						return true;
					} else {
						$.growl.error({
							message : data.mesgStr,
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
				});
			}
				}
			});

	function valueCalculation() {
		var metalWeight = $('#partyBillWt').val();
		var metalRate = $('#metalRate').val();

		if (metalWeight.length != 0 && metalRate.length != 0) {

			$("#metalValue").val(metalWeight * metalRate);
		} else {
			$("#metalValue").val(null);
		}
	}

	function validateBullionMRV() {

		if ($('#partyBillWt').val().length == 0
				|| parseFloat($('#weight').val()) == 0) {
			return false;
		}

		if ($('#metalRate').val().length == 0
				|| parseFloat($('#metalRate').val()) == 0) {
			return false;
		}

		if ($('#deliveryDate').val().length == 0) {
			return false;
		}

		if ($('#partyBillNo').val().length == 0
				|| parseFloat($('#partyBillNo').val()) == 0) {
			return false;
		}

		return true;
	}

	function bullionMRVDetails() {
		var bullionReceipt = {
			"indentDTO" : {},
			"receivedWeight" : $('#partyBillWt').val(),
			"purity" : $('#purity').val(),
			"billNumber" : $('#partyBillNo').val(),
			"billDate" : $('#deliveryDate').val(),
			"uom" : $('#uom').val(),
			"metalRate" : $('#metalRate').val(),
			"metalValue" : $('#metalValue').val(),
			"commission" : $('#comission').val(),
			"insurance" : $('#insurance').val(),
			"courier" : $('#courier').val(),
			"cst" : $('#cst').val(),
			"ced" : $('#centralExcise').val(),
			"vatOrGST" : $('#vatGST').val(),
			"cgstperc": ($("#cgstPer").val() == "")? 0.00 : $("#cgstPer").val() ,
			"cgstAmnt": $("#cgstAmount").val(),
			"sgstperc": ($("#sgstPer").val() == "")? 0.00 : $("#sgstPer").val(),
			"sgstAmnt": $("#sgstAmount").val(),
			"igstPerc":($("#igstPer").val() == "")? 0.00 : $("#igstPer").val(),
			"igstAmnt": $("#igstAmount").val(),
			"cessPerc": ($("#cessPer").val() == "")? 0.00 : $("#cessPer").val(),
		    "cessAmnt": $("#cessAmount").val(),
		    "invoiceAmnt": $("#invAmount").val(),
		    "gstnNo":$("#gstnNo option:Selected").text(),
		    "stateId": $("#sourceState").val()
			
		};

		var indentDetail = {
			"indentMetalDList" : [],
			"id" : $('#indentNo').val(),
		}

		indentDetail.indentMetalDList = indentMDArray;
		bullionReceipt.indentDTO = indentDetail;
		return bullionReceipt;
	}

	function validateVendorWeight() {
		//var table = $("#bidistribution tbody");
		var tVendorDWeight = 0;
		var noOfRows = $('#bidistribution >tbody >tr').length;

		if (noOfRows > 0) {

			for (var i = 1; i <= noOfRows; i++) {

				if ($('#' + i).val().length > 0) {

					if ($('#' + i).val() == 0) {
						$.growl
								.error({
									message : "Please fill Mandatory fields (should not be NULL or zero)",
									duration : 10000
								});
						return false;
					} else {
						var indent = {
							"slNo" : i,
							"actualWeight" : $('#' + i).val()
						};

						indentMDArray.push(indent);

						tVendorDWeight = parseFloat(tVendorDWeight)
								+ parseFloat($('#' + i).val());
					}

				} /* else {
					$.growl
							.error({
								message : "Please fill Mandatory fields (should not be NULL or zero)",
								duration : 10000
							});
					return false;
				} */

			}

			var partyWeight = parseFloat($('#partyBillWt').val());
			if (tVendorDWeight > partyWeight) {
				indentMDArray = []
				$.growl
						.error({
							message : "Total Bullion GIV Distribution Weight cannot be greater than the Party Bill Weight.",
							duration : 10000
						});
				return false;
			}

		}

		return true;
	}

	$("#bmrvPrint").on("click", function() {
		fieldFilters = {
			"fieldFilters" : {
				"BmrvNo" : $('#bMRVNo').val(),
				"mode" : "pdf",
				"reportName" : "BullionMRV"
			}
		};
		
		jasperReport("BullionMRV.pdf", fieldFilters); 

	});

	$(document).on("change", ".negitiveValidation", function() {
		var val = $(this).val();
		 if($(this).val().indexOf('.')!=-1){         
		       if($(this).val().split(".")[1].length > 3){                
		           if( isNaN( parseFloat( this.value ) ) ) return;
		           this.value = parseFloat(this.value).toFixed(3);
		       }  
		    }            
		    return this; //for chaining
		if (parseInt(val) < 0 || isNaN(val)) {
			$.growl.error({
				message : "Invalid Number",
				duration : 3000
			});
			$(this).val("");
			$(this).focus();
		}
	});
	$("#deliveryDate").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		maxDate : 0
	});
	
	function numberValidation(event) {

		if (event.which == 45 || event.which == 189 || event.which > 96
				/* && event.which < 123 || event.which > 64 */ && event.which < 91) {
			event.preventDefault();
		}
	}
	 function validateNumberInput(el){
		 var partyBillWeight = $('#partyBillWt').val();
		 var decimal= /^[0-9]{1,8}(?:\.[0-9]{1,3})?$/;
		 if(partyBillWeight.match(decimal)){
		 	return true;  
		 }  
		 else{   
			$.growl.error({ message: "Maximum Value is 99999999.999", duration: 3000});
		 	$("#partyBillWt").val(null);
		 }  
	}
	 
	 var invAmount = 0.00;
	 var cgstS;
	 var sgstS;
	 var cessS;
	 var igstS;
	 var courierS;
	 var commS;
	 var ins ;
	 var metVal;
	 
	 $("#sourceState").on('change',function(){
			var state = $("#sourceState").val();
			var taxDet = {
					"fieldFilters" : {
						"type" : "taxDetails",
						"indentId" : $("#indentNo").val(),
						"stateId" : $("#sourceState").val(),
						"gstnNo" : $("#gstnNo option:selected").text()
					}
				}
				if(state != ""){
					postJSON('/OrderExecution/api/v1/getBmrvTaxDetails',JSON.stringify(taxDet),function(data) {
						if(data.resCode == "1"){
							var resp = data.payload.taxDetails;
							if(resp.cgstperc != "undefined"){
								$("#cgstPer").val(resp.cgstperc);
							}
							if(resp.cgstAmnt != "undefined"){
								$("#cgstAmount").val(resp.cgstAmnt);
							}
							if(resp.sgstperc != "undefined"){
								$("#sgstPer").val(resp.sgstperc);
							}
							if(resp.sgstAmnt != "undefined"){
								$("#sgstAmount").val(resp.sgstAmnt);
							}
							if(resp.igstperc != "undefined"){
								$("#igstPer").val(resp.igstperc);
							}
							if(resp.igstAmnt != "undefined"){
								$("#igstAmount").val(resp.igstAmnt);
							}
							if(resp.cessperc != "undefined"){
								$("#cessPer").val(resp.cessperc);
							}
							if(resp.cessAmnt != "undefined"){
								$("#cessAmount").val(resp.cessAmnt);
							}
						    var metalVal = $("#metalValue").val();
						     
						    var sgstAmount = metalVal * $("#sgstPer").val() / 100;
						    $("#sgstAmount").val(sgstAmount);
						    
						    var cgstAmt = metalVal * $("#cgstPer").val() / 100;
						    $("#cgstAmount").val(cgstAmt);
						    
						    var cessAmt = metalVal * $("#cessPer").val() / 100;
						    $("#cessAmount").val(cessAmt);
						    
						    var igstAmt = metalVal * $("#igstPer").val() / 100;
						    $("#igstAmount").val(igstAmt);
						    
						    caluclateInvAmt();
						}else{
							$.growl.error({
								message: data.mesgStr,
								duration : 10000,
								title : 'Error'
							});
							return false;
						}
						
				  });
				}
			});
	 
	var caluclateInvAmt = function(){
		 var metalVal =  ($("#metalValue").val() != "") ? parseFloat($("#metalValue").val()) : 0;
		 var comm = ($("#comission").val() != "") ? parseFloat($("#comission").val()) : 0;
		 var incChrg = ($("#insurance").val() != "") ? parseFloat($("#insurance").val()) : 0;
		 var couChrg = ($("#courier").val() != "") ? parseFloat($("#courier").val()) :0;
		 var sgstAmount = metalVal * $("#sgstPer").val() / 100;
		 var cgstAmt = metalVal * $("#cgstPer").val() / 100;
		 var cessAmt = metalVal * $("#cessPer").val() / 100;
		 var igstAmt = metalVal * $("#igstPer").val() / 100; 
		 var invAmount  = metalVal + comm + incChrg + couChrg + sgstAmount + cgstAmt + cessAmt + igstAmt ;
		 $("#invAmount").val(invAmount.toFixed(2));
	}
	
	 $("#courier").on('change',function(){
		 caluclateInvAmt();
	 });
	 
	 $("#comission").on('change',function(){
		 caluclateInvAmt();
	 });
	 
	 $("#insurance").on('change',function(){
		 caluclateInvAmt();
	 });
	 
	 $("#partyBillWt").on('change',function(){
		 caluclateInvAmt();
	 });
</script>

<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>
<script src="resource/oe/assets/js/app/indent.js"></script>