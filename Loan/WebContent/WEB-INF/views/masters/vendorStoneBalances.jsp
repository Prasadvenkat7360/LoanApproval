<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- vendor Stone Balance Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Vendor Stone Balance
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#createVendorBalance" type="button" id="create"><i class="fa fa-plus"></i>
							&nbsp;Create </button>
					</div>
				</div>
				<form class="form-horizontal" id="vendorStoneBalanceSearch">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>From Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
									<label for="fromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>To Date</label>
								  <div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="toDate"
										id="toDate" placeholder="DD/MM/YYYY"> <label
										for="toDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Stone
									Segment</label> <select id="stoneSegment" name="stoneSegment"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Vendor Code</label> <input type="text"
									class="form-control" placeholder="Vendor Code" id="vendorCode"
									name="vendorCode"> <input id="vendorCode-value"
									type="hidden" name="code">
							</div>
						
							<div class="col-sm-2">
								<label>Stone Category</label> <select id="stoneCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2"
								id="showSubCategoryS">
								<label>Sub Category/Shape</label> <select id="subCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2"
								id="showStoneCodeS">
								<label>Stone Code</label> <input type="text"
									class="form-control" placeholder="Stone Code" disabled
									id="stoneCodeS" name="stoneCodeS">
							</div>
							<div class="col-sm-2">
								<label>DC Name</label> <select id="dcName" class="form-control">
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
				<!--vendor Stone Balance Header Started -->

				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started for create and search-->
				<div style="position: relative; z-index: 1;">
					<div id="jqxgrid" style="font-size: 13px; margin-top: 3px; font-family: Verdana; z-index: 1; position: relative; width: 100%;"></div>
				</div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<!-- Create Model Window For the vendor Stone Balance -->
<div class="modal fade" id="createVendorBalance" data-keyboard="false"data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<!-- Modal to create Vendor Stone details the  Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Create Vendor Stone
					Balance
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneDetCreate">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input type="hidden" id="stoneIdC" />
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Vendor</label> <input
								type="text" class="form-control" placeholder="Vendor Code/Name"
								id="vendorCodec" name="vendorCodec" > <input
								id="vendorCode-valuec" type="hidden" name="code">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Created By</label> <input type="text"
								class="form-control" disabled placeholder="created By"
								id="createdByC" name="createdByC">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Created On</label> <input type="text"
								class="form-control" disabled placeholder="Created On"
								id="createdOnC" name="createdOnC">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Accounted Date</label> <input type="text"
								class="form-control" disabled placeholder="Accounted Date"
								id="accountedDateC" name="accountedDateC">
						</div>
					

						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Stone Segment</label>
							<select id="stoneSegmentC" class="form-control"
							name="stoneSegmentC">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Stone
								Category</label> <select id="stoneCategoryC" name="stoneCategoryC"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field"
							id="showSubCategory">
						<span class="required">*</span>&nbsp;<label>Sub Category</label> <select id="SubCategoryC"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field"
							id="Show_Shape">
							<span class="required">*</span>&nbsp;<label>Shape</label><select id="Shape" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
				
						<input type="hidden" class="form-control" disabled
							placeholder="Stone Code " id="stoneCodeId" name="stoneCodeId">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field"
							id="bulkPsr">
							<span class="required">*</span>&nbsp;<label>Bulk/PSR</label><br /> <label class="radio-inline"><input
								id="bulkPsr" type="radio" name="bulkOrPsr" value="Bulk" checked>Bulk</label>
							<label class="radio-inline"><input id="bulkPsr"
								type="radio" name="bulkOrPsr" value="PSR">PSR</label>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Code </label> <input
								type="text" class="form-control" disabled
								placeholder="Stone Code " id="stoneCode"
								 name="stoneCode">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field"
							id="showClarity">
						<span class="required">*</span>&nbsp;<label>Clarity</label> <select id="clarity" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field"
							id="showActualColor">
							<span class="required">*</span>&nbsp;<label>Actual Color</label> <select id="actualColorC" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field"
							id="showColor">
							<span class="required">*</span>&nbsp;<label>Color</label> <select id="colorC" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field"
							id="showCutGride">
							<span class="required">*</span>&nbsp;<label>Cut Grade</label> <select id="cutGrideC"
								class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
					

						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field"
							id="showWtRange">
							<span class="required">*</span>&nbsp;<label>Wt Range</label> <select id="wtRangeC"
								class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field"
							id="showCostRange">
							<span class="required">*</span>&nbsp;<label>Cost Range</label> <select id="costRangeC"
								class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field"
							id="uomSection">
							<label>UOM</label> <input type="text"
								class="form-control" disabled placeholder="UOM"
								id="uomC" name="uomC">

						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="submit" class="btn btn-warning" id="cancel"
					data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
				<button type="button" class="btn btn-primary"
					id="vendorStoneBalanceCreate" name="vendorStoneBalanceCreate">
					<i class="fa fa-plus"></i>&nbsp;Create
				</button>
				<button type="button" class="btn btn-warning" id="ClearStoneDet">
					<i class="fa fa-times"></i>&nbsp;Clear
				</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="viewVendorBalance" data-keyboard="false"data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal to create Vendor Stone details the  Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-eye fa-lg"></i> &nbsp; View Vendor Stone
					Balance
				</h3>
				 <div class="clearfix">&nbsp;</div>
				 <div style="position: relative; z-index: 1;">
					<div id="jqxgridView" style="font-size: 13px; margin-top: 3px; font-family: Verdana; z-index: 1; position: relative; width: 100%;"></div>
				 </div>
				 </div>
				 <div class="modal-footer  text-center">
				 <div class="clearfix">&nbsp;</div>
				 <button type="submit" class="btn btn-warning" id="cancel"data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/VendorStoneBalanceSearch.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/vendorStoneBalances.js" type="text/javascript"></script>

<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>