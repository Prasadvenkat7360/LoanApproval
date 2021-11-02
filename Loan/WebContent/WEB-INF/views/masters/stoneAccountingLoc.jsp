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
						<i class="fa fa-desktop"></i> &nbsp; Stone Accounting Location
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createStoneAccLoc" type="button" id="create">
								<i class="fa fa-plus"></i> &nbsp;Create
						</button>
							
						<!-- a class="btn btn-primary" data-toggle="modal"
							data-target="#createStoneAccLoc" type="button" id="create"
							href="javascript: void(0)"><i class="fa fa-plus"></i>
							&nbsp;Create </a> -->
					</div>
				</div>


				<form class="form-horizontal" id="MetalAccLocSearch">
						<!-- Row 1 Started  -->
						<div class="row">
                            <div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>From Date</label>
									<div class="input-group"><input type="text" readonly='true' class="date-picker form-control dateBackground" name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								    </div>
							 </div>
                            <div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>To Date</label>
									<div class="input-group"><input type="text" readonly='true' class="date-picker form-control dateBackground"name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>DC/Store Type</label> <select id="stoneAccLoc"
									class="form-control">
									<option value="" label="--Select--" />
									<option value="Store">Store</option>
									<option value="DC">DC</option>
								</select>
							</div>

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>DC/Store ID</label> <select id="dcStoreIdSearch"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							
							<div class="col-sm-2">
								<label>Location</label> <select id="locationNameSearch" name="locationNameSearch"
									class="form-control">
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
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
						</div>
				</form>
				<!-- Metal Accounting Location Header Started -->

				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started for Metal Accounting Location create and search-->
				<div
					style="text-align: center; marging: auto; position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>

			</div>
		</div>
	</div>
</div>


<div class="modal fade" id="createStoneAccLoc" data-keyboard="false"
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
					<i class="fa fa-plus"></i> &nbsp; Create Stone Accounting Location
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="MetalAccLocSearchC">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment</label> <select
								id="segment" name="segment" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category</label> <select
								id="category"  name="category" class="form-control" >
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC/Store Type</label>
							<select  id="storeOrDc" name="storeOrDc"
								class="form-control">
								<option value="" label="--Select--" />
								<option value="Store">Store</option>
								<option value="DC">DC</option>
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC/Store ID</label> <select
								id="dcStoreId" name="dcStoreId" class="form-control" >
								<option value="" label="--Select--" />
							</select>
						</div>


					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp; <label>Location
								Name</label> <input type="text" class="form-control"
								placeholder="Location Name" id="locationNameCreate"
								name="locationNameCreate">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Location Code</label>
							<input type="text" class="form-control"
								placeholder="Location Code" id="locationCode"
								name="locationCode" >
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
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
						<label>Loss Location Flag</label>
						 <select id="lossLocFlagC" name="lossLocFlagC" class="form-control">
							<option value="" label="--Select--" />	
							<option value="Yes">Yes</option>
							<option value="No">No</option>
							</select>
						</div>
					</div>
					<div class="row" id="addRowSection">
						<div class="clearfix">&nbsp;</div>
						<div class="col-md-12 form-field">
							<div class="pull-left">
								<button id="addStoneAccLocRow" class="btn btn-primary btn-sm"
									type="button">
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
			</form>
			<!--  Modal Window Content Ended -->

			<!-- Modal Create Metal Accounting Location Footer -->
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveStoneAccLoc"
					name="saveStoneAccLoc">
					<i class="fa fa-save"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-primary btn-sm" id="addLineItems"
					name="addLineItems">
					<i class="fa fa-plus"></i>&nbsp;Add Line Items
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Close
				</button>

			</div>
		</div>

	</div>
</div>


<!-- Edit/View Modal window -->

<div class="modal fade" id="btnViewMetalAccLoc" data-keyboard="false"
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
						id="popupheaderlabel"></label>
				</h3>
			</div>

			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="MetalAccLocSearchE">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">

							<input type="hidden" id="stoneId" /> <span class="required">*</span>&nbsp;<label>Segment</label>
							<input class="form-control" type="hidden" placeholder="Segmente"
								id="eSegment"> <input class="form-control" disabled
								type="text" placeholder="Segmente" id="eSegmentName"
								>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category</label> <input
								class="form-control" type="hidden" placeholder="Category"
								id="eCategory"> <input class="form-control" disabled
								type="text" placeholder="Category" id="eCategoryName"
								data-validation="required">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC/Store Type</label>
							<input class="form-control" disabled type="text"
								placeholder="DC/Store Type" id="dcOrStoreType"
								>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC/Store ID</label> <input
								class="form-control" disabled type="text"
								placeholder="DC/Store ID" id="dcOrStoreId"
								>
						</div>


					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Location Name</label> <input type="text"
								class="form-control" placeholder="Location Name"
								id="locationNameE" name="locationNameE" >
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Location Code</label>
							<input type="text" class="form-control"
								placeholder="Location Code" id="locationCodeE"
								name="locationCode" >
						</div>


						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created By</label> <input
								type="text" class="form-control" placeholder="Created By"
								disabled id="createdByE" name="createdBy">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created On</label> <input
								type="text" class="form-control" placeholder="Created On"
								disabled id="createdOnE" name="createdOn">
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
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="showHideId">
							<label>ID</label>
							<input class="form-control" disabled type="text"
								placeholder="" id="stDcId"
								>
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
			</form>
			<!--  Modal Window Content Ended -->

			<!-- Modal Create Metal Accounting Location Footer -->
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="editStoneAccLoc"
					name="editStoneAccLoc">
					<i class="fa fa-save"></i>&nbsp;Save
				</button>
				<!-- button type="button" class="btn btn-primary" id="addLineItems" name="addLineItems" >
					<i class="fa fa-plus"></i>&nbsp;Add Line Items
				</button-->
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Close
				</button>

			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/stoneAccountingLoc.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>