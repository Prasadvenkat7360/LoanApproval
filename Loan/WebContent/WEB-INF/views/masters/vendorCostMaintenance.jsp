<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 06/05/2016
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Vendor Cost Maintenance - Create
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backToListingFromCreate"
							href="javascript:showContentPage('vendorCostMaintenanceListing', 'bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>
				</div>
				<!-- Send Parcel Heading Add Ended -->

				<!-- Send Parcel Search Started -->
				<form class="form-horizontal" id="vcmSearch"
					action="javascript:void()">
						<!-- Row 1 Started -->
						<div class="row">
							<div class="col-sm-2">
								<label>Vendor Code</label> <select id="vendorCode"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Segment </label> <select id="segment"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Jewel Type Name</label> <select id="jewelType"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Main Category Name</label> <select id="mainCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						
							<div class="col-sm-2">
								<label>Sub Category Description</label> <select id="subCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>MC Charges Type </label> <select id="mcChargeType"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Waste Charges Type</label> <select id="wasteChargeType"
									class="form-control" disabled>
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Metal Basic Purity</label> <input id="metalBasicPurity"
									class="form-control" type="text"
									placeholder="Metal Basic Purity" value="99.90" disabled>
							</div>
						
							<div class="col-sm-2">
								<label>Purchase Price Per Gram </label> <input
									id="metalBasicPurchaseRate" class="form-control"
									data-validation="number" data-validation-allowing="float"
									type="text" placeholder="Metal Basic Purchase Rate" onblur="this.value = validateNumber(this.value);">
							</div>

							<div class="col-sm-2">
								<label>Cost MC (%)</label> <input id="costMcPer"
									class="form-control" type="text" data-validation="number"
									data-validation-allowing="float" title="huge, gigantic"
									placeholder="Cost MC (%)" onblur="this.value = validateNumber(this.value);">
							</div>

							<div class="col-sm-2">
								<label>Cost Wastage (%) </label> <input id="costWastagePer"
									class="form-control" type="text" data-validation="number"
									data-validation-allowing="float" placeholder="Cost Wastage (%)" onblur="this.value = validateNumber(this.value);">
							</div>

							<div class="col-sm-2">
								<label>Metal Purity</label><select id="metalPurity"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						
							<div class="col-sm-2">
								<label>Metal Rate For Purity</label> <input
									id="metalRateForPurity" class="form-control" type="text"
									placeholder="Metal Rate For Purity" value="" disabled>
							</div>

							<div class="col-sm-2">
								<label>Base Cost MC Wastage PGM</label> <input
									id="costWastagePGM" class="form-control"
									data-validation="number" data-validation-allowing="float"
									type="text" placeholder="Base Cost MC Wastage PGM" onblur="this.value = validateNumberForWt(this.value);">
							</div>

							<div class="col-sm-2">
								<label>Base Cost MC Incremental</label> <input
									id="costMCIncremental" class="form-control" type="text"
									data-validation="number" data-validation-allowing="float"
									placeholder="Base Cost MC Incremental" onblur="this.value = validateNumber(this.value);">
							</div>
						</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="export" id="export" disabled>
								<i class="fa fa-file-excel-o"></i> Export
							</button>
							&nbsp; <a class="btn btn-primary btn-sm voffset" type="button"
								id="upload" data-toggle="modal" data-target="#vcmUploadModal"
								href="vcmUploadModal"> <i class="fa fa-upload fa-lg"></i>
								Upload
							</a> &nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="addRecord" id="addRecord" disabled>
								<i class="fa fa-plus fa-lg"></i> &nbsp;Add Row
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="deleteRecord" id="deleteRecord" disabled>
								<i class="fa fa-times fa-lg"></i> &nbsp;Delete Row
							</button>
						</div>
				</form>
				<!-- Send Parcel Search Ended -->

				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->


				<div class="row voffset2" align="center">
					<button class="btn btn-primary btn-sm voffset" type="button" name="save"
						id="save">
						<i class="fa fa-floppy-o fa-lg"></i> Save
					</button>
				</div>

				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>


<!-- Upload Modal Pop-up Started -->
<div class="modal fade" id="vcmUploadModal" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="vcmUploadModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<script src="resource/oe/assets/js/app/vendorCostMaintainance.js"></script>
<script	src="resource/oe/assets/js/app/vendorCostMaintainanceDynamicColumns.js"></script>
<script src="resource/oe/assets/js/app/decimalPlaces.js"></script>
