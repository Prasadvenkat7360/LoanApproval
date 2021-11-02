<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Metal Accounting Location Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp;Zone Master
					</h1>

					<div class="clearfix">&nbsp;</div>
					<label class="radio-inline"><input name="zoneDet"
						type="radio" value="1" /> &nbsp; DC</label> 
						<label class="radio-inline"><input
						name="zoneDet" type="radio" value="2" /> &nbsp; Store</label> <label
						class="radio-inline"><input name="zoneDet" type="radio"
						value="3" /> &nbsp; Zone Type</label>
				</div>

				<div id="DcDet">
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp; DC Zone Details
						</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createDcDet" type="button" id="createDC"><i class="fa fa-plus"></i>
								&nbsp;Create </button>
						</div>
					</div>

					<!-- dc Details Search -->
					<form class="form-horizontal" id="zoneDetailCreate">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>DC Name</label> <select id="dcNameS"
										class="form-control">
										<option value="" label="--Select--" />
										<option value="jewel2">Jewel 2</option>
									</select>
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchDC" id="searchDC">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllDC" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>


				<!-- Store searching started -->
				<div id="StoreDet">
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp; Store Zone Details
						</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createStoreDet" type="button" id="createSDT">
								<i class="fa fa-plus"></i> &nbsp;Create
							</button>
						</div>
					</div>
					<!-- Parameter Details Search -->
					<form class="form-horizontal" id="zoneDetailCreate">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Store Name</label> <select id="storeNameS"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchStore" id="searchStore">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllStore" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>

				<div id="ZoneTypeDet">
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp; Zone Type Details
						</h1>
						<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createZoneTypeDet" type="button" id="createZTD">
								<i class="fa fa-plus"></i> &nbsp;Create
						</button>
							<!-- <a class="btn btn-primary" data-toggle="modal"
								data-target="#createZoneTypeDet" type="button" id="createZTD"
								href="javascript: void(0)"><i class="fa fa-plus"></i>
								&nbsp;Create</a> -->
						</div>
					</div>
					<!-- Parameter Details Search -->
					<form class="form-horizontal" id="zoneDetailCreate">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Zone Type</label> <select id="zoneTypeS"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchZoneType" id="searchZoneType">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllZoneType" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>
			</div>
			<div class="clearfix">&nbsp;</div>
			<!-- JqGrid Started for Zone details create and search-->
			<div style="position: relative; z-index: 1">

				<div id="jqxgrid"
					style="font-size: 13px; font-family: Verdana; float: left;"></div>
			</div>
			<!-- JqGrid Ended -->
		</div>
	</div>
</div>


<!-- Model Window for create Zone Master -->


<!-- Modal window for Store creation -->
<div class="modal fade" id="createDcDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create DC Zone Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="">
				<div class="col-md-12 mobile-responsive">
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>DC Name</label> <select id="dcName" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
					</div>


					<div class="heading-block">
						<h3></h3>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addDCDetailsRow"
								type="button">
								<i class="fa fa-plus"></i>&nbsp;Add
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgrideD"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>

				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Zone Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm voffset" type="button"
					name="createDCDetails" id="createDCDetails">
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

<!-- Modal window for Store creation -->
<div class="modal fade" id="createStoreDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Store Zone Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="">
				<div class="col-md-12 mobile-responsive">
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Store Name</label> <select id="storeName"
								class="form-control">
								<option value="" label="Select" />
							</select>
						</div>
					</div>


					<div class="heading-block">
						<h3></h3>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addStoreDetailsRow"
								type="button">
								<i class="fa fa-plus"></i>&nbsp;Add
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgrideS"
								style="font-size: 13px; font-family: Verdana; position: relative; width:100%;"></div>
						</div>
					</div>

				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Zone Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm voffset" type="button"
					name="createStoreDetails" id="createStoreDetails">
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


<!-- Modal window for Zone Type creation -->
<div class="modal fade" id="createZoneTypeDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Zone Type Details
				</h3>
			</div>
			<form class="form-horizontal" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Zone Type
								Name</label> <input type="text" class="form-control"
								placeholder="Zone Type Name" id="zoneTypeNameZ"
								name="zoneTypeNameZ">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Zone Type
								Description</label> <input type="text" class="form-control"
								placeholder="Zone Type Description" id="zoneTypeDescriptionZ"
								name="zoneTypeDescriptionZ">
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm"
					id="createZoneTypeDetails" name="createZoneTypeDetails">
					<i class="fa fa-plus"></i>&nbsp;Create
				</button>
				<button type="submit" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
		</div>
	</div>
</div>



<!-- model window to create the Zone type -->
<div class="modal fade" id="maintainZoneTypeE" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal CreateZone Type  Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabel"></label>
				</h3>
			</div>
			<form class="form-horizontal" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input type="hidden" id="zoneTypeId">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Zone Type
								Name</label> <input type="text" class="form-control"
								placeholder="Zone Type Name" id="zoneTypeNameZE"
								name="zoneTypeNameZE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Zone Type
								Description</label> <input type="text" class="form-control"
								placeholder="Zone Type Description" id="zoneTypeDescriptionZE"
								name="zoneTypeDescriptionZE">
						</div>
					</div>
					<!-- second row started -->
					<div class="row">

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created By</label> <input
								type="text" class="form-control" placeholder="Created BY"
								disabled id="createdByE" name="createdByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created On</label> <input
								type="text" class="form-control" placeholder="Created On"
								disabled id="createdOnE" name="createdOnE">
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveZoneTypeE"
					name="saveZoneTypeE">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;cancel
				</button>

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="maintainStoreE" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelStoreE"></label>
				</h3>
			</div>
			<form class="form-horizontal" action="">
				<div class="col-md-12 mobile-responsive">
				<input type="hidden" id="dcOrStoreId" />
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Store Name</label> <input id="storeNameE" name="storeNameE"
								placeholder="Store Name" class="form-control" disabled />
						</div>
						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Zone Id</label> <input id="zoneIdE" name="zoneIdE"
								placeholder="Zone Id" class="form-control" disabled />
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Zone Code</label> <input id="zoneCodeE" name="zoneCodeE"
								disabled placeholder="Zone Code" class="form-control" />
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Zone Description</label> <input id="zoneDescE"
								name="zoneDescE" placeholder="Zone Description"
								class="form-control" />
						</div>
						
					</div>

					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Zone Type</label> <!-- <select id="zoneTypeE"
								disabled class="form-control">
								<option value="" selected label="Select" />
							</select> -->
							<input id="zoneTypeE" disabled
								name="zoneTypeE" placeholder="Zone Type"
								class="form-control" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Status</label> <select id="statusE"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Order Metal Type</label> <!-- <select id="metalTypeE"
								class="form-control">
								<option value="" selected label="Select" />
							</select> -->
							<div id="metalTypeE"></div>
							
							<input type="hidden" id="zoneMetalTypeId" />
						</div>
						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Zone Target Type</label> <select id="zoneTargetTypeE"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Zone Locked Status</label> <select id="zoneLockedStatus"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>

				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="updateStoreE"
					name="updateStoreE">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="maintainDcE" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelDC"></label>
				</h3>
			</div>
			<form class="form-horizontal" action="">
				<div class="col-md-12 mobile-responsive">
				<input type="hidden" id="dcOrStoreIdDc" />
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Zone Id</label> <input id="zoneIdEDc" name="zoneIdEDc"
								placeholder="Zone Id" class="form-control" disabled />
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Zone Code</label> <input id="zoneCodeEDc" name="zoneCodeEDc"
								disabled placeholder="Zone Code" class="form-control" />
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Zone Description</label> <input id="zoneDescEDc"
								name="zoneDescEDc" placeholder="Zone Description"
								class="form-control" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Zone Type</label> <select id="zoneTypeEDc"
								class="form-control" disabled>
							</select>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Status</label> <select id="statusEDc"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
					</div>

				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="updateDCE"
					name="updateDCE">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/zoneDetails.js"></script>
