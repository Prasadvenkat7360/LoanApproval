<!-- 
	##	Author UI 		: 	Dipankar Naha
	## 	Author JAVA 	: 
	##	Date Creation 	: 	18-01-2017
	## 	Description		:	Creation of Metal Accounting Location
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Metal Accounting Location Header Started -->
				<div class="heading-block">
					<!-- >h1>
						<i class="fa fa-desktop"></i> &nbsp; Parameter Details
					</h1-->
					<div class="clearfix">&nbsp;</div>
					<label class="radio-inline"><input name="parameterDet"
						type="radio" value="1" /> &nbsp; Parameter Details</label> <label
						class="radio-inline"><input name="parameterDet"
						type="radio" value="2" /> &nbsp; Credit to A/C and PB Parameter</label>

				</div>

				<div id="paramDet">
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp; Parameter Details
						</h1>
						<div class="heading-block-action">
							<a class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createParamDet" type="button" id="create"
								href="javascript: void(0)"><i class="fa fa-plus"></i>
								&nbsp;Create </a>
						</div>
					</div>
					<div class="modal fade" id="editMasterModal" data-keyboard="false"
						data-backdrop="static" tabindex="-1" role="dialog"
						aria-labelledby="myModalLabel" aria-hidden="true">
						<div class="modal-dialog modal-lg">
							<div class="modal-content"></div>
						</div>
					</div>

					<!-- Parameter Details Search -->
					<form class="form-horizontal" id="MetalAccLocSearch" action="javascript:void(0);">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">


								<div class="col-sm-2">
									<label>Region</label> <select id="region" class="form-control">
										<option value="">--Select--</option>
									</select>
								</div>

								<div class="col-sm-2">
									<label>Store Flag</label><br /> <label class="radio-inline"><input
										type="radio" id="storeS" value="Yes" name="storeS">Yes</label>
									<label class="radio-inline"><input type="radio"
										id="storeS" value="No" name="storeS">No</label>
								</div>

								<div class="col-sm-2">
									<label>DC Flag</label><br /> <label class="radio-inline"><input
										type="radio" id="dcS" value="Yes" name="dcS">Yes</label> <label
										class="radio-inline"><input type="radio" id="dcS"
										value="No" name="dcS">No</label>
								</div>

								<div class="col-sm-2">
									<label>Parameter Name</label> <input type="text"
										class="form-control" placeholder="Parameter Name"
										id="paramNameSearch" name="paramNameSearch"> <input
										id="paramName-value" type="hidden" name="code">
								</div>
							
								<div class="col-sm-2">
									<label>Status</label> <select id="statusS" class="form-control">
										<option value="">--Select--</option>
										<option value="true">Active</option>
										<option value="false">Inactive</option>
									</select>
								</div>
							</div>




							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="search" id="search">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAll" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="exportP" id="exportP">
									<i class="fa fa-file-excel-o fa-lg"></i> Export
								</button>
								&nbsp;
								<div  class="fileUploadP btn btn-primary btn-sm voffset">
							        <span  class="glyphicon glyphicon-upload"></span> Upload file
							        <input  id="parameterUpload" type="file" onchange="captureFileSelectEvent(event)"/>
							    </div>
							     <button  class="btn btn-primary btn-sm voffset" onclick="HandleUploadExcelFile()">Upload Excel Data</button>
	    						<!-- <div  class="fileUploadP btn btn-primary voffset">
							        <span class="glyphicon glyphicon-upload"></span> Upload file
							        <input  type="file" id="uploadFile" />
							    </div> -->
							    
								<p id="fileUploadError" class="text-danger hide"></p>
								
								<div class="list-group" id="files"></div>
							</div>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>


				<!-- Credit to Account Header Started -->


				<div id="creditToAcc">
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp; Credit to A/C and PB
							Parameter
						</h1>
						<div class="heading-block-action">
							<a class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createCreditToAcc" type="button" id="createCTA"
								href="javascript: void(0)"><i class="fa fa-plus"></i>
								&nbsp;Create </a>
						</div>
					</div>

					<!-- Credit to Account Details Search -->
					<form class="form-horizontal" id="MetalAccLocSearch">
							<!-- Row 1 Started  -->
							<div class="row">

								<div class="col-sm-2">
									<label>Type</label> <select id="storeRegionS"
										class="form-control">
										<option value="">--Select--</option>
										<option value="store">Store</option>
										<option value="region">Region</option>
									</select>
								</div>

								<div class="col-sm-2">
									<label>Store/Region Name</label> <select id="storeRegionNameS"
										class="form-control">
										<option value="">--Select--</option>
									</select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Metal
										Segment</label> <select id="metalSegmentCTAS" class="form-control">
										<option value="" label="--Select--" />
									</select>

								</div>


								<div class="col-sm-2">
									<label>Purpose</label> <select id="purposeS"
										class="form-control">
										<option value="">--Select--</option>
										<option value="E">Exchange</option>
										<option value="D">Direct Purchase</option>
										<option value="O">Order</option>
										<option value="DS">DPS</option>
									</select>
								</div>

								<div class="col-sm-2">
									<label>Company/Non company</label> <select
										id="companyNonCompany" class="form-control">
										<option value="">--Select--</option>
										<option value="C">Company</option>
										<option value="N">Non company</option>
									</select>
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="search" id="searchCTA">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllCTA" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="exportC" id="exportCTA" disabled>
									<i class="fa fa-file-excel-o fa-lg"></i> Export
								</button>
								&nbsp;
								<!-- <button class="btn btn-primary voffset" type="button" disabled
									name="upload" id="upload">
									<i class="fa fa-file fa-lg"></i> Upload
								</button> -->
							</div>
					</form>
					<div class="clearfix">&nbsp;</div>

				</div>

			</div>

			<div class="clearfix">&nbsp;</div>
			<!-- JqGrid Started for Metal Accounting Location create and search-->
			<div style="position: relative; z-index: 1">

				<div id="jqxgrid"
					style="font-size: 13px; font-family: Verdana; float: left;"></div>
			</div>
			<!-- JqGrid Ended -->
		</div>
	</div>
</div>


<div class="modal fade" id="createParamDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<!-- Modal Create Metal Accounting Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Parameter Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="paramDetailCreate">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Region</label> <select
								id="regionPC" class="form-control">
								<option value="">--Select--</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Parameter
								Name</label> <input type="text" class="form-control"
								placeholder="Parameter Name" id="paramName" name="paramName">

						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Parameter
								Value</label> <input type="text" class="form-control"
								placeholder="Parameter Value" id="paramValue" name="paramValue">

						</div>

						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>&nbsp;<label>Start Date </label>
							<div class="input-group">
								<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									id="startDate" placeholder="DD/MM/YYYY"> <label
									for="startDate" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>



					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>&nbsp;<label>End Date </label>
							<div class="input-group">
								<input type="text" readonly = 'true' class="date-picker form-control dateBackground" id="endDate"
									placeholder="DD/MM/YYYY"> <label for="endDate"
									class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Status</label> <input
								type="text" disabled class="form-control" placeholder="Status"
								id="status" name="status" value="Active">

						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="dcFlag">
							<span class="required">*</span>&nbsp;<label>DC</label><br /> <label
								class="radio-inline"><input type="radio" name="dcVal"
								value="Yes" />Yes</label> <label class="radio-inline"><input
								type="radio" name="dcVal" value="No" checked />No</label>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="storeFlag">
							<span class="required">*</span>&nbsp;<label>Store</label><br />
							<label class="radio-inline"><input type="radio"
								name="storeVal" value="Yes" checked />Yes</label> <label
								class="radio-inline"><input type="radio" name="storeVal"
								value="No" />No</label>
						</div>
					</div>

				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Metal Accounting Location Footer -->
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="createParamDetc"
					name="createParamDetc">
					<i class="fa fa-save"></i>&nbsp;Create
				</button>
				<button type="button" class="btn btn-warning btn-sm" id="clearParamDetc">
					<i class="fa fa-times"></i>&nbsp;Clear
				</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
		</div>

	</div>
</div>

<!-- Credit to Account Modal Window -->
<div class="modal fade" id="createCreditToAcc" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<!-- Modal Create Metal Accounting Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; <span id="popupheaderlabelCTA"></span>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="paramDetailCreate">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Region</label> <select
								id="storeRegionCTA" class="form-control">
								<option value="">--Select--</option>
								<option value="region">Region</option>
								<option value="store">Store</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Store/Region
								Name</label> <select id="storeRegionNameCTA" class="form-control">
								<option value="">--Select--</option>
							</select>

						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Metal Segment</label>
							<select id="metalSegmentCTA" class="form-control">
								<option value="" label="--Select--" />
							</select>

						</div>

						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>&nbsp;<label>Purpose</label> <select
								id="purposeCTA" class="form-control">
								<option value="">--Select--</option>
								<option value="E">Exchange</option>
								<option value="D">Direct Purchase</option>
								<option value="O">Order</option>
								<option value="DS">DPS</option>
							</select>

						</div>



					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>&nbsp;<label>Company/Non-Company</label>
							<select id="compNonComp" class="form-control">
								<option value="">--Select--</option>
								<option value="C">Company</option>
								<option value="N">Non-Company</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>From Purity</label> <select
								id="fromPurity" class="form-control">
								<option value="">--Select--</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>To Purity</label> <select
								id="toPurity" class="form-control">
								<option value="">--Select--</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Deduct
								Percentage</label> <input type="text" class="form-control"
								placeholder="Deduct Percentage" id="dedPer" name="dedPer">
						</div>
					</div>

					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Add
								Percentage</label> <input type="text" class="form-control"
								placeholder="Add Percentage" id="addPer" name="addPer">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Exchanging
								Rate</label> <input type="text" class="form-control"
								placeholder="Exchanging Rate" id="exchangingRate"
								name="exchangingRate">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Refining Rate</label>
							<input type="text" class="form-control"
								placeholder="Refining Rate" id="refRate" name="refRate">
						</div>

						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<label>Start Date </label>
							<div class="input-group">
								<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									id="startDateCTA" placeholder="DD/MM/YYYY"> <label
									for="startDateCTA" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<label>End Date </label>
							<div class="input-group">
								<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									id="endDateCTA" placeholder="DD/MM/YYYY"> <label
									for="endDateCTA" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Status</label> <input type="text" class="form-control"
								placeholder="Status" id="statusCTA" name="statusCTA"
								value="Active" disabled />
						</div>
					</div>


					<!-- 		<div id="popUpGridDiv" class="search-customer-result-con">
						<div class="heading-block">
							<h3></h3>
							<div class="heading-block-action">
								<a class="btn btn-primary" id="addAccArticles" type="button"><i
									class="fa fa-plus"></i>&nbsp;Add </a>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-12 form-field">
							<div class="voffset3" style="position: relative;">
								<div class="table-responsive">
									
									<div style="position: relative; z-index: 1">
										<div id="jqxgrideCTA"
											style="font-size: 13px; font-family: Verdana; float: left;"></div>
									</div>
									
								</div>
								<div class="clearfix">&nbsp;</div>
							</div>
						</div>
					</div> -->

				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create parameter Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm voffset" type="button"
					name="saveCTAAcc" id="saveCTAAccount">
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


<div class="modal fade" id="EditParamDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<!-- Modal Create Metal Accounting Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabel"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="paramDetailCreate">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input type="hidden" id="parameterDetId" /> <input type="hidden"
							id="statusActiveE" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Region</label> <select
								id="regionPCE" class="form-control">
								<option value="">--Select--</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Parameter
								Name</label> <input type="text" class="form-control" disabled
								placeholder="Parameter Name" id="paramNameE" name="paramNameE">

						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Parameter
								Value</label> <input type="text" class="form-control"
								placeholder="Parameter Value" id="paramValueE"
								name="paramValueE">

						</div>

						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<label>Start Date </label>
							<div class="input-group">
								<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									id="startDateE" placeholder="MM/DD/YYYY"> <label
									for="startDateE" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>



					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<label>End Date </label>
							<div class="input-group">
								<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									id="endDateE" placeholder="DD/MM/YYYY"> <label
									for="endDateE" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Status</label> <input
								type="text" disabled class="form-control" placeholder="Status"
								id="statusE" name="statusE">

						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="dcFlag">
							<span class="required">*</span>&nbsp;<label>DC</label><br /> <label
								class="radio-inline"><input type="radio" name="dcValE"
								value="Yes" />Yes</label> <label class="radio-inline"><input
								type="radio" name="dcValE" value="No" />No</label>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="storeFlag">
							<span class="required">*</span>&nbsp;<label>Store</label><br />
							<label class="radio-inline"><input type="radio"
								name="storeValE" value="Yes" />Yes</label> <label class="radio-inline"><input
								type="radio" name="storeValE" value="No" />No</label>
						</div>
					</div>

				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Metal Accounting Location Footer -->
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="createParamDetE"
					name="createParamDetE">
					<i class="fa fa-save"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" id="clearParamDetE">
					<i class="fa fa-times"></i>&nbsp;Clear
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
		</div>

	</div>
</div>


<!-- Credit to Account Modal Window -->
<div class="modal fade" id="editCreditToAcc" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<!-- Modal Create Metal Accounting Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <span
						id="popupheaderlabelCTAE"></span>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="paramDetailCreate">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input type="hidden" id="ctaDetId" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Region</label> <select
								id="storeRegionCTAE" class="form-control">
								<option value="">--Select--</option>
								<option value="region">Region</option>
								<option value="store">Store</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Store/Region
								Name</label> <select id="storeRegionNameCTAE" class="form-control">
								<option value="">--Select--</option>
							</select>

						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Metal Segment</label>
							<select id="metalSegmentCTAE" class="form-control">
								<option value="" label="--Select--" />
							</select>

						</div>

						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>&nbsp;<label>Purpose</label> <select
								id="purposeCTAE" class="form-control">
								<option value="">--Select--</option>
								<option value="E">Exchange</option>
								<option value="D">Direct Purchase</option>
								<option value="O">Order</option>
							</select>

						</div>



					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>&nbsp;<label>Company/Non-Company</label>
							<select id="compNonCompCTAE" class="form-control">
								<option value="">--Select--</option>
								<option value="C">Company</option>
								<option value="N">Non-Company</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>From Purity</label> <select
								id="fromPurityCTAE" class="form-control">
								<option value="">--Select--</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>To Purity</label> <select
								id="toPurityCTAE" class="form-control">
								<option value="">--Select--</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Deduct
								Percentage</label> <input type="text" class="form-control"
								placeholder="Deduct Percentage" id="dedPerCTAE" name="dedPerE">
						</div>
					</div>

					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Add
								Percentage</label> <input type="text" class="form-control"
								placeholder="Add Percentage" id="addPerCTAE" name="addPerE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Exchanging
								Rate</label> <input type="text" class="form-control"
								placeholder="Exchanging Rate" id="exchangingRateCTAE"
								name="exchangingRateE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Refining Rate</label>
							<input type="text" class="form-control"
								placeholder="Refining Rate" id="refRateCTAE" name="refRateE">
						</div>

						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<label>Start Date </label>
							<div class="input-group">
								<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									id="startDateCTAE" placeholder="MM/DD/YYYY"> <label
									for="startDateCTAE" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<label>End Date </label>
							<div class="input-group">
								<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									id="endDateCTAE" placeholder="DD/MM/YYYY"> <label
									for="endDateCTAE" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Status</label> <input type="text" class="form-control"
								placeholder="Status" id="statusCTAE" name="statusCTAE"
								value="Active" disabled />
						</div>
					</div>

				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create parameter Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm voffset" type="button"
					name="saveCTAAccE" id="saveCTAAccE">
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


		
		<script id="fileUploadProgressTemplate" type="text/x-jquery-tmpl">
    <div class="list-group-item">
        <div class="progress progress-striped active">
            <div class="progress-bar progress-bar-info" style="width: 0%;"></div>
        </div>
    </div>
	</script>
		
		<script id="fileUploadItemTemplate" type="text/x-jquery-tmpl">
    <div class="list-group-item">
        <button type="button" class="close">&times;</button>
        <span class="glyphicon glyphicon-file"></span> File name (type, date, etc)
    </div>
	</script>
	
<script src="resource/oe/assets/js/app/parameterDetails.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>