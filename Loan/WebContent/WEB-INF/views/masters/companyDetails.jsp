<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Metal Accounting Location Header Started -->
				<div class="heading-block">
					<h1></h1>

					<div class="clearfix">&nbsp;</div>
					<label class="radio-inline"><input name="companyBusiness"
						type="radio" value="company" /> &nbsp; Company</label> <label
						class="radio-inline"><input name="companyBusiness"
						type="radio" value="business" /> &nbsp; Business</label> <label
						class="radio-inline"><input name="companyBusiness"
						type="radio" value="department" /> &nbsp; Department</label>
				</div>

				<div id="companyDet">
					<div class="heading-block">
						<h1>Company Details</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createCompDet" type="button" id="createCompanyDet"><i class="fa fa-plus"></i>
								&nbsp;Create </button>
						</div>
					</div>

					<!-- dc Details Search -->
					<form class="form-horizontal" id="companySearchS" action="">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<label>Company Code</label> <input type="text"
										class="form-control" placeholder="Company Code"
										name="compCodeS" id="compCodeS">
								</div>
								<div class="col-sm-2">
									<label>Company Name</label> <input type="text"
										name="compNameS" class="form-control"
										placeholder="Company Name" id="compNameS">
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchCompDet" id="searchCompDet">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearCompDet" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>


				<!-- Store searching started -->
				<div id="businessDet">
					<div class="heading-block">
						<h1>Business Details</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createBusinessDet" type="button"
								id="createBusiDet">
								<i class="fa fa-plus"></i> &nbsp;Create
							</button>
						</div>
					</div>
					<!-- Parameter Details Search -->
					<form class="form-horizontal" id="businessDetSearch" action="">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<label>Business</label><select id="businessListS"
										name="businessListS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>

								<div class="col-sm-2">
									<label>Business Code</label> <input type="text"
										class="form-control" placeholder="Business Code"
										id="businessCodeS" name="businessCode">
								</div>
								<div class="col-sm-2">
									<label>Business Name</label> <input type="text"
										class="form-control" placeholder="Business Name"
										id="businessNameS" name="businessNameS">
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchBusiness" id="searchBusiness">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearBusiness" class="btn btn-warning btn-sm voffset"
									type="reset" name="clearBusiness">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>

				<!-- Department Listing  started -->
				<div id="DeptDet">
					<div class="heading-block">
						<h1>Department Details</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createDeptDet" type="button"
								id="creatDeptMasterDet">
								<i class="fa fa-plus"></i> &nbsp;Create
							</button>
						</div>
					</div>
					<!-- Parameter Details Search -->
					<form class="form-horizontal" id="deptDetSearch" action="">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<label>Department</label><select id="deparmentS"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>

								<div class="col-sm-2">
									<label>Department Code</label> <input type="text"
										class="form-control" placeholder="Department Code"
										id="departmentCodeS" name="departmentCodeS">
								</div>
								<div class="col-sm-2">
									<label>Department Name</label> <input type="text"
										class="form-control" placeholder="Department Name"
										id="departmentNameS" name="departmentNameS">

								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="deptSearch" id="deptSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearDept" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>


			</div>
			<div class="clearfix">&nbsp;</div>
			<!-- JqGrid Started for Company/Business details create and search-->
			<div style="position: relative; z-index: 1">
				<div id="jqxgrid"
					style="font-size: 13px; font-family: Verdana; float: left;"></div>
			</div>
			<!-- JqGrid Ended -->
		</div>
	</div>
</div>


<!-- Modal window for Create Company Master -->
<div class="modal fade" id="createCompDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Company Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="companyDetCreate" action="">
				<div class="col-md-12 mobile-responsive">
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>Company Code</label> <input
								type="text" class="form-control" placeholder="Company Code"
								id="compCode" name="compCode">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>Company Name</label> <input
								type="text" class="form-control" placeholder="Company Name"
								id="compName" name="compName">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>PAN No.</label> <input
								type="text" class="form-control" placeholder="Company PAN No."
								id="compPanNo" name="compPanNo">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>Registration No.</label>
							<input type="text" placeholder="Company Registration No." class="form-control"
								id="compRegNo" name="compRegNo">
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>CIN No.</label> <input
								type="text" class="form-control" placeholder="Company CIN No."
								id="compSinNo" name="compSinNo">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>GSTIN No.</label> <input
								type="text" class="form-control"
								placeholder="Company GSTIN No." id="compGstinNo"
								name="compGstinNo">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="createdBy" name="createdBy">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								disabled id="createdOn" name="createdOn">
						</div>
					</div>
					<div class="heading-block">
						<h4>Address Details</h4>
						<div class="heading-block-action"></div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>Address1</label> <input
								class="form-control" placeholder="Company Address 1"
								id="address1" name="address1" />
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Address2</label> <input class="form-control"
								placeholder="Company Address 2" id="address2" name="address2" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Address3</label> <input class="form-control"
								placeholder="Company Address 3" id="address3" name="address3" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>City</label> <select
								id="cityId" name="cityId" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>Zip Code</label> <input
								type="text" class="form-control" placeholder="Zip Code"
								id="zipCode" name="zipCode">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>State</label> <select
								id="stateId" name="stateId" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">* </span> <label>Country</label> <select
								id="countryId" name="countryId" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset btn-sm" type="button"
					name="saveCompDet" id="saveCompDet">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>

<!-- Edit/View Company Details Modal window -->
<div class="modal fade" id="editCompDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;
				</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="companeEditLabel"></label>
				</h3>
			</div>

			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="MetalAccLocSearch" action="">
				<div class="col-md-12 mobile-responsive">
					<!-- Row 1 Started  -->
					<input type="hidden" id="compIdE" />

					<!-- input type="hidden" id="cityIdE" /-->
					<input type="hidden" id="addressIdE" />
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Company Code</label> <input type="text"
								class="form-control" placeholder="Company Code" id="compCodeE"
								disabled name="compCodeE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Company Name</label> <input type="text" disabled
								class="form-control" placeholder="Company Name" id="compNameE"
								name="compNameE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>PAN No.</label> <input type="text" class="form-control"
								placeholder="Company PAN No." id="compPanNoE" name="compPanNoE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Registration No.</label> <input type="text"
								class="form-control" placeholder="Company Registration No."
								id="compRegNoE" name="compRegNoE">
						</div>

					</div>
					<div class="row">

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>CIN No.</label> <input type="text" class="form-control"
								placeholder="Company CIN No." id="compSinNoE" name="compSinNoE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>GSTIN No.</label> <input type="text"
								class="form-control" placeholder="Company GSTIN No."
								id="compGstinNoE" name="compGstinNoE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="createdByE" name="createdByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								disabled id="createdOnE" name="createdOnE">
						</div>
					</div>
					<div class="heading-block" id="businessStatus">
						<h4>Business Details</h4>
						<div class="heading-block-action"></div>
					</div>
					<div class="row">
						<div id="businessDetValueE" align="left"></div>
					</div>
					<div class="heading-block">
						<h4>Address Details</h4>
						<div class="heading-block-action"></div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Address1</label> <input class="form-control"
								placeholder="Company Address 1" id="address1E" name="address1E" />
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Address2</label> <input class="form-control"
								placeholder="Company Address 2" id="address2E" name="address2E" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Address3</label> <input class="form-control"
								placeholder="Company Address 3" id="address3E" name="address3E" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>City</label>
							<!-- <input type="text" class="form-control"
								placeholder="City Name" id="cityNameE" name="cityNameE"> -->
							<select id="cityIdE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Zip Code</label> <input type="text" class="form-control"
								placeholder="Zip Code" id="zipCodeE" name="zipCodeE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>State</label><select id="stateIdE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Country</label> <select id="countryIdE"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Metal Accounting Location Footer -->
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="SaveCompanyDetE"
					onclick="SaveCompanyDetE()">
					<i class="fa fa-save"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Close
				</button>

			</div>
		</div>
	</div>
</div>

<!-- Modal window for Create Business Master -->
<div class="modal fade" id="createBusinessDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Business Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input id="companyIDC" type="hidden" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Company Name</label> <input type="text" disabled
								class="form-control" placeholder="Company Name"
								id="companyNameC" name="companyNameC">
						</div>
					</div>


					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<h4>Business details</h4>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowB" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridB"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>

						</div>
					</div>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset btn-sm" type="button"
					name="saveBusinessDet" id="saveBusinessDet"
					onclick="saveBusinessDet()">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="editBusinessDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Edit Business Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input id="companyIDCE" type="hidden" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Company Name</label> <input type="text" disabled
								class="form-control" placeholder="Company Name"
								id="companyNameE" name="companyNameE">
						</div>
					</div>
				<!-- 	<div class="heading-block" id="deptStatus">
						<h4>Department Details</h4>
						<div class="heading-block-action"></div>
					</div>
					<div class="row col-md-12">
						<div id="deptDetValueE" align="left"></div>
					</div> -->

					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<h4>Business details</h4>
						<div class="heading-block-action"></div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridBE"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset btn-sm" type="button"
					name="saveBusinessDetE" id="saveBusinessDetE">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>
<!-- Modal window for Create Department Master -->
<div class="modal fade" id="createDeptDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Department Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input id="deptCompanyIdC" type="hidden" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Business Name</label> <input type="text" disabled
								class="form-control" placeholder="Business Name"
								id="deptCompanyNameC" name="deptCompanyNameC">
						</div>
					</div>


					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<h4>Department details</h4>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowD" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridDB"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>

						</div>
					</div>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset btn-sm" type="button"
					name="saveDeptDetC" id="saveDeptDetC">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="submit" class="btn btn-warning btn-sm"  data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>

<!-- Edit Department Details -->

<div class="modal fade" id="editDeptDetails" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Edit Department
					Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input id="deptBusIdE" type="hidden" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Business Name</label> <input type="text" disabled
								class="form-control" placeholder="Business Name"
								id="deptBusNameE" name="deptBusNameE">
						</div>
					</div>


					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<h4>Department details</h4>
						<div class="heading-block-action"></div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridDE"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Department Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset btn-sm" type="button"
					name="saveDeptDetE" id="saveDeptDetE">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/companyDetails.js"
	type="text/javascript"></script>
<script src="resource/oe/assets/js/app/businessDetails.js"
	type="text/javascript"></script>
<script src="resource/oe/assets/js/app/departmentMaster.js"
	type="text/javascript"></script>
