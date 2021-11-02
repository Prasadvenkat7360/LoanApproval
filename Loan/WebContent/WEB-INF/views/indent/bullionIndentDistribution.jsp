<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp;Create Bullion PO and Distribution
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button" id="rtvCreate"
							href="javascript:showContentPage('pendingIndents', 'bodySwitcher')">
							<i class="fa fa-arrow-left"></i>&nbsp;Go Back
						</a>
					</div>
				</div>
				<fieldset id="indentForm">
					<form class="form-horizontal">
							<div class="row">

								<div class="col-sm-2">
									<label>PO No</label> <input type="text"
										class="form-control" name="status" id="indentNo"
										disabled="disabled" />
								</div>

								<div class="col-sm-2">
									<label><span class="required">*</span> Bullion Dealer
										Code</label> <select id="bDealerCode" class="form-control">
										<option value="" selected label="--Select--" />
									</select>

								</div>
								<div class="col-sm-2">
									<label><span class="required">*</span>Metal Segment</label> <select
										id="metalSegment" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<label><span class="required">*</span>HSN Code</label> 
									<select	id="hsnCode" class="form-control"><option value="" selected label="--Select--" /></select>
								</div>
								
								<div class="col-sm-2">
									<label><span class="required">*</span>Metal Purity</label> <select
										id="metalPurity" class="form-control">
										<option value="" selected label="--Select--" />
										<option value="99.90">99.90</option>
										<option value="99.50">99.50</option>
									</select>
								</div>
								
								<div class="col-sm-2">
									<label><span class="required">*</span>Weight</label> <input
										type="number" class="form-control" name="status" id="weight"
										placeholder="Weight" min="0.001" max="99999999.999"
										onkeypress='numberValidation(event)' />
								</div>

							</div>

							<div class="row">							

								<div class="col-sm-2">
									<label><span class="required">*</span>Metal Rate</label> <input
										type="number" class="form-control input-text qty text"
										name="status" id="metalRate" placeholder="Metal Rate"
										min="0.01" max="9999999999.99" onchange="validateFloatKeyPress(this);"
										onkeypress='numberValidation(event)' />
								</div>
								<div class="col-sm-2">
									<label><span class="required">*</span>Rate Confirmation</label>
									<select id="rateConfirm" class="form-control">
										<option value="" selected label="--Select--" />
										<option value="1">Yes</option>
										<option value="0">No</option>
									</select>
								</div>
								<div class="col-sm-2">
									<label>Value</label> <input type="number" class="form-control"
										name="status" id="value" disabled="disabled" />
								</div>

									<div class="col-sm-2">
									<label><span class="required">*</span>Delivery Date</label>
									<!-- <input type="text" class="form-control" name="status" id="deliveryDate" /> -->
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											id="deliveryDateIndent" placeholder="DD/MM/YYYY"> <label
											for="deliveryDateIndent" class="input-group-addon cursor">
											<span class="fa fa-calendar"></span>
										</label>
									</div>
								</div>


								<div class="col-sm-2">
									<label><span class="required">*</span>Delivery Type</label> <select
										id="deliveryType" class="form-control">
										<option value="" selected label="--Select--" />
										<option value="Party">Party</option>
										<option value="Self">Self</option>
									</select>
								</div>

								<div class="col-sm-2">
									<label>Remarks</label>
									<textarea rows="1" id="remarks" name="remarks"
										class="form-control" style="resize: none;" maxlength="490"></textarea>
								</div>
							</div>
							<div class="row">

							
							</div>


							<div class="row" align="right">
								<!-- <button class="btn btn-primary voffset" type="button" name="Save"
								id="save">
								<i class="fa fa-floppy-o"></i> Create Indent
							</button>&nbsp; -->
								<button id="addIndent" class="btn btn-primary btn-sm" type="button">
									<i class="fa fa-plus-circle fa-lg"></i> Add Distribution
								</button>
								&nbsp;
								<!-- <button id="clearIndent" class="btn btn-warning voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							&nbsp; -->
								<!-- <button class="btn btn-primary voffset" type="button" name="Print"
								id="print">
								<i class="fa fa-floppy-o"></i> Print
							</button>
							&nbsp;
							<a class="btn btn-primary voffset" data-toggle="modal" data-target="#btnBullionDA" type="button" id="view" href="indentView?indentId=0"> <i class="fa fa-binoculars"></i> View </a>
							&nbsp;
							<a href="javascript:showContentPage('pendingIndents', 'bodySwitcher')" class="btn btn-primary voffset" type="button" id="indentListing"> <i class="fa fa-list"></i>&nbsp;Indent listing</a>
						 -->
							</div>
					</form>
				</fieldset>

				<div id="distributionSection">
					<div class="heading-block" id="stoneDeailsLable">
						<h5>
							<i class="fa fa-desktop"></i> PO DISTRIBUTION DETAILS
						</h5>
					</div>
					<div style="position: relative; z-index: 1">
						<div id="jqxgrid"
							style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
				</div>
				<div class="row voffset2" align="center">
					<button class="btn btn-primary btn-sm voffset" type="button" name="Save"
						id="save">
						<i class="fa fa-floppy-o"></i> Create PO
					</button>
					&nbsp;

					<button id="clearIndent" class="btn btn-warning btn-sm voffset"
						type="reset">
						<i class="fa fa-times fa-lg"></i>&nbsp; Clear
					</button>
					&nbsp;
					<button class="btn btn-primary btn-sm voffset" type="button" name="Print"
						id="print">
						<i class="fa fa-print"></i> Print
					</button>
					&nbsp; <a class="btn btn-primary btn-sm voffset" data-toggle="modal"
						data-target="#btnBullionDA" type="button" id="view"
						href="indentView?indentId=0"> <i class="fa fa-binoculars"></i>
						View
					</a> &nbsp; <!-- <a
						href="javascript:showContentPage('pendingIndents', 'bodySwitcher')"
						class="btn btn-primary voffset" type="button" id="indentListing">
						<i class="fa fa-list"></i>&nbsp;PO listing
					</a> -->
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="btnBullionDA" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 10%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<script type="text/javascript">

	var $metalSegment = $('#metalSegment');
	var $rateConfirm = $('#rateConfirm');
	var $metalPurity = $('#metalPurity');
	var $bDealerCode = $('#bDealerCode');
	
	
	var rowId = 0;

	//alert(moment().format('DD-MM-YYYY')+" "+${sessionScope.LoggedInUser.name});
	$(document).ready(function(){

		$('#addIndent').attr('disabled', true);
		/* $('#print').attr('disabled', true);
		$('#view').attr('disabled', true); */
		$('#print').hide();
		$('#view').hide();
		$('#indentListing').hide();
		$('#distributionSection').hide();
		$('#addIndent').hide();
		
		
	});
	
	$('#indentDate').val(moment().format('DD-MM-YYYY'));
	/* var user = ${sessionScope.LoggedInUser.name};
	alert(user); */
	//$('#indentRaisedBy').val(${sessionScope.LoggedInUser.name});
	
	
	
	$.getJSON('/OrderExecution/api/v1/indentLOV?page=bullion', function(data) {
	
		if(data.resCode == 1){
			$("#metalSegment").empty().append('<option value="" selected>--Select--</option>');
			$("#bDealerCode").empty().append('<option value="" selected>--Select--</option>');
			//iterate over the data and append a select option
			$.each(data.payload.mTypes, function(key, val) {				
				$("#metalSegment").append('<option value="' + val.id + '">' + val.description + '</option>');
			})
			
			/* $.each(data.payload.confirmation, function(key, val) {
				$rateConfirm.append('<option value="' + val.id + '">' + val.name
						+ '</option>');
			}) */
			
			$.each(data.payload.bDealers, function(key, val) {
				$("#bDealerCode").append('<option value="' + val.id + '">' + val.name
						+ '</option>');
			})
			
			$('#indentRaisedBy').val(data.payload.LoggedInUser);
			
			deliveryType = data.payload.deliveryType;
			statusType = data.payload.deliveryStatus;
			vendorCodeList = data.payload.vCodeList;
			
			bullionGrid();
			$("#jqxgrid").show();
			
		}
		
	});
	
	/* $("#metalSegment").on("change", function() {
				
		var segmentId = $('#metalSegment').val();
		 $.getJSON('/OrderExecution/api/v1/metalPurityForSegment?segmentId=' + segmentId, function(data) {
			 
			 if(1 == data.resCode){
				 $metalPurity.empty().append('<option value="" selected> --Select-- </option>');
				 $.each(data.payload.metalPurityId, function(key, val) {
						$metalPurity.append('<option value="' + val.skinPurity + '">' + val.skinPurity
								+ '</option>');
					})
			 }
			 
		 });
		
	}); */
	
	
	$("#deliveryType").on("change", function() {
		
		 if($('#deliveryType').val() == "Party"){
			 $('#addIndent').attr('disabled', false);
			 $("#jqxgrid").jqxGrid('clear');
			 $('#distributionSection').show();
			 $('#addIndent').show();
		 }else if($('#deliveryType').val() == 0 || $('#deliveryType').val() == "Self"){
			 $('#addIndent').attr('disabled', true);
			 $("#jqxgrid").jqxGrid('clear');
			 $('#distributionSection').hide();
			 $('#addIndent').hide();
		 }
	});
	
	$("#addIndent").on("click", function() {
		
		var weight = $('#weight').val();
		var metalPurity = $('#metalPurity').val();
		
		
		if(validateBullionIndent()){
				 
			$("#jqxgrid").jqxGrid('addrow', null, generaterow(rowId+1));
			
		}else{
			$.growl.error({ message: "Please fill Mandatory fields (should not be empty or zero or negative)", duration: 10000});
		}
		
		return false;
	});
	
	$("#save").on("click", function() {
		
		if(validateIndentDetails()){
			if(!validateBullionIndent()){
				validateDeliveryType();
				$.growl.error({ message: "Please fill Mandatory fields (should not be empty or zero or negative)", duration: 10000});
				return false;
			}
			
			if(!validateDeliveryType()){
				$.growl.error({ message: "For Delivery Type Party, Indent Distribution details is Mandatory", duration: 10000});
				return false;
			}
			
			if($("#hsnCode").val () == "" || $("#hsnCode").val () == null ){
				$.growl.error({
					message : "Please Fill HSN Code!!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
			
			postJSON('/OrderExecution/api/v1/bIDDetails', JSON
					.stringify(bullionDetails()), function(data) {
				if(1 == data.resCode){
					 
					$.growl.notice({ message:"PO ID "+  data.payload.bIDId +" Created Successfully", duration: 10000, title: 'Success' });
					
					$('#indentNo').val(data.payload.bIDId);
					
					/* $('#save').attr('disabled', true);
					$('#addIndent').attr('disabled', true);
					$('#clearIndent').attr('disabled', true); */
					//$('#view').attr('disabled', false);
					
					window.location.href="javascript:showContentPage('pendingIndents', 'bodySwitcher')"

					
					/* $('#save').hide();
					$('#addIndent').hide();
					$('#clearIndent').hide();  */
					
					$('#print').show();
					$('#indentListing').show();
					$('#print').removeAttr('disabled');
					$('#print').prop('disabled', false);
					$("#jqxgrid").jqxGrid('editable', false);
					
					return true;
					
				}else{
					$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
					return false;
				}
			});
			
		}
		
		return false;
	});
	
	var generaterow = function (i) {
        var row = {};
		
        row["slNo"] = i;
        row["metalPurity"] = $('#metalPurity').val();
        row["weightInGms"] = null;
        row["deliveryType"] = "Party";
        row["jwCode"] = null;
        row["jwNameAndAddress"] = null;
        row["status"] = "GENERATED";
        rowId = rowId+1;
        return row;
    }
	
	
	$("#weight").on("change", function() {
		valueCalculation();
	});
	
	$("#metalRate").on("change", function() {
		valueCalculation();
	});
	
	function valueCalculation(){
		
		var metalWeight = $('#weight').val();
		var metalRate = $('#metalRate').val();
		if(metalWeight.length != 0 && metalRate.length != 0){
			var rate=metalWeight * metalRate;
			$("#value").val(parseFloat(rate).toFixed(2));
		}else{
			$("#value").val(null);
		}
		
		
		
	}
	
	function validateBullionIndent(){
		
		if($('#weight').val().length == 0 || parseFloat($('#weight').val()) <= 0){
			return false;
		}
		
		if($('#metalRate').val().length == 0 || parseFloat($('#metalRate').val()) <= 0){
			return false;
		}
		
		if( $('#value').val().length == 0){
			return false;
		}
		
		if($('#bDealerCode').val().length == 0){
			return false;
		}
		
		if($('#metalSegment').val().length == 0){
			return false;
		}
		
		if($('#metalPurity').val().length == 0){
			return false;
		}
		
		if($('#rateConfirm').val().length == 0){
			return false;
		}
		
		if($('#deliveryDateIndent').val().length == 0){
			return false;
		}
		if($('#deliveryType').val().length == 0){
			return false;
		}
		
		return true;
	}
	
	function validateDeliveryType(){
		var indentRows = $("#jqxgrid").jqxGrid('getrows');
		if($('#deliveryType').val() == "Party" && indentRows.length == 0){
			return false;
		}
		return true;
		
	}
	
	function validateIndentDetails(){
		var indentRows = $("#jqxgrid").jqxGrid('getrows');
		
		var metalWeight = $('#weight').val();
		
		var validation = true;
		
		var totalVDWeight = 0;
		
		for(var i = 0; i< indentRows.length; i++){
			
			 var data = indentRows[i];
		     
			 if(data.jwCode == null || data.jwCode == ""){
				 $.growl.error({ message: "JW Code is Mandatory.", duration: 10000});
				validation = false;	
				break;
			 }
			 
			 if(data.weightInGms == null || data.weightInGms == "" || parseFloat(data.weightInGms) == 0){
				 $.growl.error({ message: "Distribution weight is Mandatory", duration: 10000});
				validation = false;	
				break;
			 }
			 
			 totalVDWeight = parseFloat(totalVDWeight)+parseFloat(data.weightInGms);
			 if(totalVDWeight > metalWeight){
				 $.growl.error({ message: "Distribution weight should be less than or equal to Indent weight.", duration: 10000});
				 validation = false;
				 break;
			 }
		}
		
		return validation;
	}
	
	$("#metalPurity").on("change", function() {
		var indentRows = $("#jqxgrid").jqxGrid('getrows');
		for(var i = 0; i < indentRows.length; i++) {
			$("#jqxgrid").jqxGrid('setcellvalue',i, 'metalPurity',  $('#metalPurity').val());
		}		
	});

	
	 $("#print").on("click", function() {
		 fieldFilters = {
		            "fieldFilters" : {
	               	 "IndentNo" : $('#indentNo').val(),
		                "mode" : "pdf",
		                "reportName" : "RPT_Purchase_Order_Bullion"
		            }
		        };
		jasperReport('RPT_Purchase_Order_Bullion.pdf', fieldFilters); 
			
	});
	 
	 function numberValidation(event) {
			if (event.which == 45 || event.which == 189 || event.which > 96	&& event.which < 123 || event.which > 64 && event.which < 91) {
				event.preventDefault();
			}
		} 
	 function validateFloatKeyPress(el) {
		    var v = parseFloat(el.value);
		    el.value = (isNaN(v)) ? '' : v.toFixed(2);
		}
		
</script>

<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>
<script src="resource/oe/assets/js/app/indent.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>