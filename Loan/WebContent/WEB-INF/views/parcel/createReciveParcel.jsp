<script type="text/javascript">
	var $dcRp = $('#dcRp');
	var $materialTYpe = $('#materialTYpe');
	var $parcelDelMode = $('#parcelDelMode');
	var $costBy = $('#costBy');

	$.getJSON(
			'/OrderExecution/api/v1/receiveparcelLOV?page=createReciveParcel',
			function(data) {

				$.each(data.payload.allDc, function(key, val) {
					$dcRp.append('<option value="' + val.id + '">' + val.name
							+ '</option>');
				});
				$.each(data.payload.mType, function(key, val) {
					if(val.id == "P" || val.id == "D" || val.id == "S" || val.id == "G"){
						$materialTYpe.append('<option value="' + val.id + '">'	+ "FG" + " " + val.name + '</option>');	
					}else{
						$materialTYpe.append('<option value="' + val.id + '">' + val.name + '</option>');
					}
					
				});
				$.each(data.payload.parcelDelvieryMode, function(key, val) {
					$parcelDelMode.append('<option value="' + val.id + '">'
							+ val.name + '</option>');
				});

				$.each(data.payload.costBy, function(key, val) {
					$costBy.append('<option value="' + val.id + '">' + val.name
							+ '</option>');
				});

				$('#parcelRecBy').val(data.payload.employee);

				vendorList = data.payload.vCodeList;			

				$(function() {
					var availabledata = [];

					$.each(vendorList, function(key, value) {
						availabledata.push({
							value : value.id,
							label : value.name
						});
					});

					$("#vendors").autocomplete({
						source : availabledata,
						focus : function(event, ui) {
							event.preventDefault();
							$(this).val(ui.item.label);
						},
						select : function(event, ui) {
							event.preventDefault();
							$(this).val(ui.item.label);
							$("#vendor-parcel").val(ui.item.value);
						}

					});
				});

			});

	$("#save").on(
			"click",
			function() {
				if (recieveParcelDetailsValidation()) {					
					postJSON('/OrderExecution/api/v1/receiveParcel', JSON
							.stringify(receiveParcelDetails()), function(data) {
						if (1 == data.resCode) {
							$('#createReciveParcel').modal('hide');
							$("#jqxgrid").jqxGrid("updatebounddata");
							//$.growl.notice({ message: data.mesgStr, duration: 10000, title: 'Success' });
							$.growl.notice({
								message : "Successfully created parcel: "
										+ data.payload.id,
								duration : 10000,
								title : 'Success'
							});
						} else {
							$.growl.error({
								message : data.mesgStr,
								duration : 10000
							});
						}
					});
				} else {
					$.growl.error({
						message : "Please fill all the mandatory fields!",
						duration : 10000
					});
				}

			});

	$("#parcelDelMode").change(function() {

		var value = $("#parcelDelMode option:selected").val();
		if (value == 'P') {
			$('#courierAgencyName').val("");
			$('#courierRecNo').val("");
			$('#parcelSentThru').val("");
			$('#insuredAmnt').val("");
			$('#courierCharges').val("");
			$("#courierAgencyName").prop('readonly', true);
			$("#courierRecNo").prop('readonly', true);
			$("#insuredAmnt").prop('readonly', true);
			$("#courierCharges").prop('readonly', true);

		} else {
			$("#courierAgencyName").prop('readonly', false);
			$("#courierRecNo").prop('readonly', false);
			$("#insuredAmnt").prop('readonly', false);
			$("#courierCharges").prop('readonly', false);
		}

	});
	
	$("#createReceiveParcel input[type=number]").keypress(function(event) {		
		
		  if ( event.which == 45 || event.which == 189 || event.which > 96 && event.which < 123 || event.which > 64 && event.which < 91) {			
		      event.preventDefault();
		   }
		});
	
	$("#noOfBoxes").keypress(function(event) {		
	
		  if ( event.which == 46) {			
		      event.preventDefault();
		   }
		  
		});
	$("#noOfBoxes").blur(function(event) {
		var noOfBoxes = $("#noOfBoxes").val();
		if(noOfBoxes == 0){
			
					$.growl.error({
						message : "Invalid number input",
						duration : 10000
					});
					$("#noOfBoxes").val('');
					return false;
		}
		
	});
	$("#parcelGrWt").blur(function(event) {
		var parcelGrWt = $("#parcelGrWt").val();
		if(parcelGrWt == 0){
			
					$.growl.error({
						message : "Invalid number input",
						duration : 10000
					});
					$("#parcelGrWt").val('');
					return false;
		}
	});
	
</script>
<!-- Modal Create Receive Parcel Heading -->
<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Create Receive Parcel
	</h3>
</div>
<!-- Modal Create Receive Parcel Body -->
<div class="modal-body">
	<div class="container">
		<!-- Modal Window Create Receive Parcel Form End -->
		<form action="#" method="post" id = "createReceiveParcel">
			<!-- First Row Started -->
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">

					<span class="required">*</span><label for="tags">Vendor
						</label> <input id="vendors" type="text" class="form-control"
						placeholder="Vendor Name"> <input id="vendor-parcel"
						type="hidden" name="code">
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Parcel Delivery Mode</label> <select id="parcelDelMode"
						class="form-control">
						<option value="" selected label="--Select--" />
					</select>
				</div>
			</div>
			<div class="heading-block">&nbsp;</div>
			<div class="row">
				<!-- <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>DC </label> <select id="dcRp" class="form-control">
						<option value="" selected label="Select" />
					</select>
				</div> -->

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Material Type</label> <select id="materialTYpe"
						class="form-control">
						<option value="" selected label="--Select--" />
					</select>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Insured Amount</label> <input type="number"
						class="form-control" placeholder="Insured Amount" id="insuredAmnt" min="0.01" max="9999999999.99" step='0.01'>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>No of Boxes</label> <input
						type="number" class="form-control" placeholder="No of Boxes"
						id="noOfBoxes" min="1" max="9999999999" >
				</div>
			</div>

			<!-- Second Row Started -->
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Courier Agency Name</label>
					<input type="text" class="form-control"
						placeholder="courierAgencyName" id="courierAgencyName" maxlength="200">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Courier Receipt
						Number</label> <input type="text" class="form-control"
						placeholder="Courier Receipt Number" id="courierRecNo" maxlength="200">
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Courier Charges </label> <input type="number"
						class="form-control" placeholder="Courier Charges"
						id="courierCharges" min="0.01" max="9999999999.99" step='0.01'>
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Courier Charges Borne By</label> <select id="costBy"
						class="form-control">
						<option value="" selected label="--Select--" />
					</select>

				</div>
			</div>

			<!-- Third Row Started -->
			<div class="row">

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span><label>Parcel Gross Weight</label> <input
						type="number" class="form-control" placeholder="Parcel Gross Weight"
						id="parcelGrWt" min="0.001" max="99999999.999" step='0.001'>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span><label>Parcel Received By</label> <input
						type="text" class="form-control" placeholder="Parcel Received By"
						id="parcelRecBy" disabled="disabled" maxlength="200">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Parcel Sent Through</label>
					<input type="text" class="form-control"
						placeholder="Parcel Sent Through" id="parcelSentThru" maxlength="200">
				</div>
			</div>

		</form>
		<!-- Modal Window Create Receive Parcel Form End -->
	</div>
</div>
<!-- Modal Create Receive Parcel Footer -->
<div class="modal-footer  text-center">
	<button type="button" class="btn btn-primary" id="save" name="save">
		<i class="fa fa-plus"></i>&nbsp;Add
	</button>
	<button type="submit" class="btn btn-warning" data-dismiss="modal">
		<i class="fa fa-times"></i>&nbsp;Close
	</button>

</div>
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>	