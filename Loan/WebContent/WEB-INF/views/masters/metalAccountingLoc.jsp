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
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Metal Accounting Location
					</h1>
					<div class="heading-block-action">
					
					<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createMetalAccLoc" type="button" id="create">
								<i class="fa fa-plus"></i> &nbsp;Create
					</button>
						<!-- <a class="btn btn-primary" data-toggle="modal"
							data-target="#createMetalAccLoc" type="button" id="create"
							href="javascript: void(0)"><i class="fa fa-plus"></i>
							&nbsp;Create </a> -->
					</div>
				</div>


				<form class="form-horizontal" id="MetalAccLocSearchS">
					<div class="mobile-responsive">
						<!-- Row 1 Started  -->
						<div class="row">
						   <div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>From Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								    </div>
							 </div>
                            <div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>To Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							</div>
							<div class="col-sm-2">
								<label>DC/Store Type</label> <select id="metalAccLoc"
									name="metalAccLoc" class="form-control">
									<option value="" label="--Select--" />
									<option value="store">Store</option>
									<option value="DC">DC</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>DC/Store ID</label> <select id="dcStoreIdSearch"
									name="dcStoreIdSearch" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							
							<div class="col-sm-2">
								<label>Location Name</label> <select id="locationName"
									name="locationName" class="form-control">
									<option value="" selected label="Select" />
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
							<!-- <button class="btn btn-primary btn-sm voffset" type="button"
								name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button> -->
						</div>
					</div>
				</form>
				<!-- Metal Accounting Location Header Started -->

				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started for Metal Accounting Location create and search-->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>

			</div>
		</div>
	</div>
</div>


<div class="modal fade" id="createMetalAccLoc" data-keyboard="false"
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
					<i class="fa fa-plus"></i> &nbsp; Create Metal Accounting Location
				</h3>

			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="MetalAccLocSearchC"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Metal Type </label> <select
								id="metalTypeId" name="metalTypeId" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC/Store Type</label>
							<select id="storeOrDc" name="storeOrDc" class="form-control">
								<option value="" label="--Select--" />
								<option value="Store">Store</option>
								<option value="DC">DC</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC/Store ID</label> <select
								id="dcStoreId" name="dcStoreId" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Location Code</label>
							<input type="text" class="form-control"
								placeholder="Location Code" id="locationCode"
								name="locationCode">
						</div>

					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Location Name</label>
							<input type="text" class="form-control"
								placeholder="Location Name" id="locationNameC" name="locationNameC">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>RM/FG</label><select
								id="rmFg" name="rmFg" class="form-control">
								<option value="" label="--Select--" />
								<option value="R">R</option>
								<option value="F">F</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="meltingFlag">
							<span class="required">*</span>&nbsp;<label>Melting Flag</label><br />
							<label class="radio-inline"><input type="radio"
								name="meltingFlag" value="true" checked>Yes</label> <label
								class="radio-inline"><input type="radio"
								name="meltingFlag" value="false">No</label>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="valuationFlag">
							<span class="required">*</span>&nbsp;<label>Valuation
								Flag</label><br /> <label class="radio-inline"><input
								type="radio" name="valuationFlag" value="true" checked>Yes</label>
							<label class="radio-inline"><input type="radio"
								name="valuationFlag" value="false">No</label>
						</div>
					</div>

					<!-- Row 3 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="fromPurityField">
							<span class="required">*</span>&nbsp;<label>From Purity</label> <select
								id="fromPurity" name="fromPurity" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="toPurityField">
							<span class="required">*</span>&nbsp;<label>To Purity</label> <select
								id="toPurity" name="toPurity" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created By</label> <input
								type="text" class="form-control" placeholder="Created By"
								disabled id="createdBy" name="createdBy">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created On</label> <input
								type="text" class="form-control" placeholder="Created On"
								disabled id="createdOn" name="createdOn">
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
						<label>Stock Check Flag</label>
						 <select id="scFlagC" name="scFlagC" class="form-control">
							<option value="" label="--Select--" />	
							<option value="Yes">Yes</option>
							<option value="No">No</option>
							</select>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
						<label>Loss Location Flag</label>
						 <select id="lossLocFlagC" name="lossLocFlagC" class="form-control">
							<option value="" label="--Select--" />	
							<option value="Yes">Yes</option>
							<option value="No">No</option>
							</select>
						</div>
					</div>

					<div class="clearfix">&nbsp;</div>
					<div class="row" id="addRowSection">
						<div class="clearfix">&nbsp;</div>
						<div class="col-md-12 form-field">
							<div class="pull-left">
								<button id="addLineItems" class="btn btn-primary btn-sm" type="button">
									<i class="fa fa-plus-circle fa-lg"></i> Add Row
								</button>
							</div>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="editgridmetalrate">
						<div class="col-md-12 form-field">
							<div id="jqxgridp"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>

				<!--  Modal Window Content Ended -->

				<!-- Modal Create Metal Accounting Location Footer -->
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-primary btn-sm" id="saveMetalAccLoc"
						name="saveMetalAccLoc">
						<i class="fa fa-save"></i>&nbsp;Save
					</button>
						&nbsp;
					<button type="submit" class="btn btn-primary btn-sm"
						id="showHideLineItems">
						<i class="fa fa-plus"></i>&nbsp;Add Line Items
					</button>
						&nbsp;
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>

				</div>
				'
			</form>
		</div>

	</div>
</div>


<!--  Edit / View Modal window  ############################### -->
<div class="modal fade" id="btnViewMetalAccLoc" data-keyboard="false"
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
			<form class="form-horizontal" id="MetalAccLocSearchE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input type="hidden" id="metalLocationIdE" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Metal Type </label> <input class="form-control" disabled
								type="text" placeholder="Metal Type Id" id="metalTypeIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>DC/Store Type</label> <input class="form-control" disabled
								type="text" placeholder="DC/Store Type" id="storeOrDcE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>DC/Store Name</label> <input class="form-control" disabled
								type="hidden" placeholder="DC/Store ID" id="dcStoreIdE">
							<input class="form-control" disabled type="text"
								placeholder="DC/Store ID" id="dcStoreNameE">

						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Location Code</label>
							<input class="form-control" type="text"
								placeholder="Location Code" id="locationCodeE"
								name="locationCodeE">
						</div>

					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Location Name</label>
							<input type="text" class="form-control"
								placeholder="Location Name" id="locationNameE"
								name="locationNameE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>RM/FG</label> <input class="form-control" disabled
								type="text" placeholder="RM/FG" id="rmFgE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="meltingFlag">
							<label>Melting Flag</label><select id="meltingFlagE" name="meltingFlagE" class="form-control">
								<option value="" label="--Select--" />	
								<option value="Yes">Yes</option>
								<option value="No">No</option></select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="valuationFlag">
							<label>Valuation Flag</label><select id="valuationFlagE" name="valuationFlagE" class="form-control">
								<option value="" label="--Select--" />	
								<option value="Yes">Yes</option>
								<option value="No">No</option></select>
						</div>
					</div>

					<!-- Row 3 Started  -->
					<div class="row">

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="fromPuritySectionE">
							<span class="required">*</span>&nbsp;<label>From Purity</label> <select
								id="fromPurityE" name="fromPurityE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="fromPuritySectionToE">
							<span class="required">*</span>&nbsp;<label>To Purity</label> <select
								id="toPurityE" name="toPurityE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input class="form-control" disabled
								type="text" placeholder="Created By" id="createdByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								placeholder="Created On" disabled id="createdOnE"
								name="createdOnE">
						</div>
					</div>
					<div class="row">
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
						<label>Stock Check Flag</label>
						 <select id="scFlagE" name="scFlagE" class="form-control">
							<option value="" label="--Select--" />	
							<option value="Yes">Yes</option>
							<option value="No">No</option>
							</select>
					</div>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
						<label>Loss Location Flag</label>
						 <select id="lossLocFlagE" name="lossLocFlagE" class="form-control">
							<option value="" label="--Select--" />	
							<option value="Yes">Yes</option>
							<option value="No">No</option>
							</select>
					</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="editgridmetalrate">
						<div class="col-md-12 form-field">
							<div id="jqxgride"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>

				<!--  Modal Window Content Ended -->

				<!-- Modal Create Metal Accounting Location Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editMetalAccLocE"
						name="editMetalAccLocE">
						<i class="fa fa-save"></i>&nbsp;Save
					</button>
						&nbsp;
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>

				</div>
			</form>
		</div>

	</div>
</div>
<script src="resource/oe/assets/js/app/metalAccountingLoc.js"></script>

<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>