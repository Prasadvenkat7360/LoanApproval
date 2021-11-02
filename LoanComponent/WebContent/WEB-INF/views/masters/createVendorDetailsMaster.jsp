<!-- 
	##	Author UI : Ajay Prasad
	## 	Author JAVA : Ajay Prasad
	## 	Date Creation : 27/05/2016
 -->
<!-- Create Vendor Details Master Modal Pop-up Started ##########################  -->
<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Create Vendor
		Master
	</h3>
</div>
<!-- Modal Create Vendor Details Master Body Started -->
<div class="modal-body">
	<div class="col-md-12 melting-table">
		<form action="#" method="post" name="createVendor" id="createVendor">
			<div class="tabmelting row">
				<div class="panel with-nav-tabs panel-primary">
					<div class="panel-heading">
						<ul class="nav nav-tabs">
							<li id="vendorProfile" class="active"><a data-toggle="tab"
								href="#createtabprimary"><i class="fa fa-user fa-lg"></i>&nbsp;
									Vendor Profile</a></li>
							<li id="updationDetails"><a data-toggle="tab"
								href="#tab6primary"><i class="fa fa-filter fa-lg"></i>&nbsp;Updation
									Details</a></li>
						</ul>
					</div>
					<div class="panel-body panel-body-fixed-height">
						<div class="tab-content">
							<!--  Tab 1 Started  -->
							<div id="createtabprimary" class="tab-pane fade in active">
								<div class="heading-block">
									<h4>Vendor Profile</h4>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Code</label> <input type="text"
											class="form-control" placeholder="Vendor Code" id="vCode"
											name="vCode">
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Name</label> <input type="text"
											class="form-control" placeholder="Vendor Name"
											id="vendorName" name="vendorName">
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Type</label> <select id="vendorType"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Address 1.</label> <input type="text"
											class="form-control" placeholder="Address 1." id="address1"
											name="address1">
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Address 2.</label> <input type="text"
											class="form-control" placeholder="Address 2." id="address2"
											name="address2">
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Address 3.</label> <input type="text"
											class="form-control" placeholder="Address 3." id="address3"
											name="address3">
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor City</label> <select id="vCity"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor City PIN Code</label> <input type="text"
											pattern="\d*" maxlength="6" class="form-control"
											placeholder="Vendor City PIN Code" id="vendorPin"
											name="vendorPin">
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor State</label> <select id="vState"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Country</label> <select id="vCountry"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Contact person-1</label> <input type="text"
											class="form-control" placeholder="Vendor Contact person-1"
											id="vendorContact1" name="vendorContact1">
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Contact person-1 Mobile</label> <input
											type="text" class="form-control"
											placeholder="Vendor Contact person-1 Mobile"
											id="vendorContact1Mob" name="vendorContact1Mob">
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Contact person-2</label> <input type="text"
											class="form-control" placeholder="Vendor Contact person-2"
											id="vendorContact2" name="vendorContact2">
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Contact person-2 Mobile</label> <input
											type="text" class="form-control"
											placeholder="Vendor Contact person-1" id="vendorContact2Mob"
											name="vendorContact2Mob">
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Telephone Number - Land Line</label> <input
											type="text" class="form-control"
											placeholder="Vendor Telephone Number - Land Line"
											id="vendorContactLanline" name="vendorContactLanline">
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Email id-1</label> <input type="email"
											class="form-control" placeholder="Vendor Email id-1"
											id="vendorEmail1" name="vendorEmail1">
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Email id-2</label> <input type="email"
											class="form-control" placeholder="Vendor Email id-2"
											id="vendorEmail2" name="vendorEmail2">
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Email id-3</label> <input type="email"
											class="form-control" placeholder="Vendor Email id-3"
											id="vendorEmail3" name="vendorEmail3">
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Block Y/N</label> <select id="vendorBlock"
											disabled class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
								</div>
							</div>
							<!--  Tab 6 Started  -->
							<div id="tab6primary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Updation Details</h4>
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Created on</label> <input type="text"
										class="form-control" value="" id="vendorCreated" disabled
										name="vendorCreated">
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span><label>Vendor Start Date</label>

									<div class="input-group">
										<input type="text" class="date-picker form-control"
											id="vendorStartDate" placeholder="DD/MM/YYYY"> <label
											for="vendorStartDate" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>

								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Updated on</label> <input type="text"
										class="form-control" value="" id="vendorUpdated" disabled
										name="vendorUpdated">
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Updated by</label> <input type="text"
										class="form-control" value="" id="vendorUpdatedBy" disabled
										name="vendorUpdatedBy">
								</div>

								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span><label>Vendor Agreement uploaded Y/N</label><select
										id="vendorAgreementUploaded" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor last agreement uploaded on</label> <input
										type="text" class="form-control" value="" id="vendorLastAgre"
										disabled name="vendorLastAgre">
								</div>

								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor last agreement uploaded by</label> <input
										type="text" class="form-control" value=""
										id="vendorAgrreUploaded" disabled name="vendorAgrreUploaded">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
<div class="clearfix">&nbsp;</div>
<!-- Modal Create Vendor Details Master Body Ended -->
<div class="modal-footer  text-center">
	<button class="btn btn-primary voffset" type="button" name="save"
		id="save">
		<i class="fa fa-floppy-o fa-lg"></i> Create
	</button>

	&nbsp;
	<button type="submit" class="btn btn-warning" data-dismiss="modal">
		<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
	</button>
</div>

<!-- Create Vendor Details Master Modal Pop-up Ended ##########################  -->

<!-- Edit FG Article Master Modal Pop-up Started ##########################  -->
<script src="resource/oe/assets/js/app/vendorDetailsMaster.js"></script>
<script type="text/javascript">
	var $vendorType = $('#vendorType');
	var $vCity = $('#vCity');
	var $vendorBlock = $('#vendorBlock');
	var $vendorAgreementUploaded = $('#vendorAgreementUploaded');

	$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?page=create', function(
			data) {

		//iterate over the data and append a select option
		$.each(data.payload.vType, function(key, val) {
			$vendorType.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});
		$.each(data.payload.vCity, function(key, val) {
			$vCity.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});
		$.each(data.payload.vBlocked, function(key, val) {
			$vendorBlock.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});
		$.each(data.payload.vAgreementUploaded, function(key, val) {
			$vendorAgreementUploaded.append('<option value="' + val.id + '">'
					+ val.name + '</option>');
		});
		$vendorType[0].selectedIndex = 1;
		$vendorBlock[0].selectedIndex = 1;
		$vendorAgreementUploaded[0].selectedIndex = 1;
		$("#vendorCreated").val(data.payload.createdDate);
		$("#vendorUpdated").val(data.payload.lastChangedDate);
		$("#vendorUpdatedBy").val(data.payload.lastChangedBy);
		$("#vendorLastAgre").val(data.payload.agreementUploadedDate);
		$("#vendorAgrreUploaded").val(data.payload.agreementUploadedBy);
	});
	$("#vCity")
			.on(
					"change",
					function() {
						var vendorCityId = $('#vCity').val();
						var $vendorState1 = $('#vState');
						if (vendorCityId != "") {
							$
									.getJSON(
											'/OrderExecution/api/v1/vendorMasterLOV?page=create&cityId='
													+ vendorCityId
													+ '&stateId=',
											function(data) {
												$vendorState1
														.empty()
														.append(
																'<option value="" selected>Select</option>');
												//iterate over the data and append a select option
												$
														.each(
																data.payload.vState,
																function(key,
																		val) {
																	$vendorState1
																			.append('<option value="' + val.id + '">'
																					+ val.name
																					+ '</option>');
																});
											});
						} else {
							$vendorState1
									.empty()
									.append(
											'<option value="" selected>Select</option>');
						}
					});

	$("#vState")
			.on(
					"change",
					function() {
						var vendorCityId = $('#vCity').val();
						var vendorStateId = $('#vState').val();
						var $vCountry = $('#vCountry');
						if (vendorStateId != "") {
							$
									.getJSON(
											'/OrderExecution/api/v1/vendorMasterLOV?page=create&cityId='
													+ vendorCityId
													+ '&stateId='
													+ vendorStateId,
											function(data) {
												$vCountry
														.empty()
														.append(
																'<option value="" selected>Select</option>');
												//iterate over the data and append a select option
												$
														.each(
																data.payload.vCountry,
																function(key,
																		val) {
																	$vCountry
																			.append('<option value="' + val.id + '">'
																					+ val.name
																					+ '</option>');
																});
											});
						} else {
							$vCountry
									.empty()
									.append(
											'<option value="" selected>Select</option>');
						}
					});

	$("#save")
			.on(
					"click",
					function() {
						if (createVendorMasterValidation()) {
							postJSON(
									'/OrderExecution/api/v1/vendorMaster/create',
									JSON
											.stringify(prepareVendorMasterPostData()),
									function(data) {
										if (1 == data.resCode) {
											$('#vendorMasterModal').modal(
													'hide');
											vendorDetailsMaster();
											$("#jqxgrid").jqxGrid(
													"updatebounddata");
											$.growl
													.notice({
														message : "Successfully created Vendor with code: "
																+ data.payload.code,
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
							$.growl
									.error({
										message : "Please fill all the mandatory fields",
										duration : 10000
									});
						}
					});
</script>

