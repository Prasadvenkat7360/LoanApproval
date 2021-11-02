<!-- 
	##	Author1         : 	Dipankar Naha
	## 	Author2 	    :   POOJA
	##	Date Creation 	: 	02-02-2017
	## 	Description		:	Creation of DC Master
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- DC Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; DC Master
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#createDcDetails" type="button" id="create"><i class="fa fa-plus"></i>
							&nbsp;Create </button>
					</div>
				</div>
				<form class="form-horizontal" id="DcMasterSearch" action="javascript: void(0)">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Region</label> <select id="region" name="regionS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>DC Name</label> <select id="dcName" name="dcName" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
						</div>
				</form>
				<!-- Dc Master Header Started -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for Dc Master create and search-->
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
<div class="modal fade" id="createDcDetails" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create DC Master
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createDCMaster" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Region</label> <select
								id="regionc" name="regionc" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC Name</label> <input
								type="text" class="form-control" placeholder="DC Name"	id="dcNamec" name="dcNamec">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC City</label> <select
								id="dcCity" name="dcCity" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC State</label> <select
								id="dcState" name="dcState" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC Country</label> <select
								id="dcCountry" name="dcCountry" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC Address1</label> <input
								type="text" class="form-control" placeholder="DC Address1"
								id="dcAddress1" name="dcAddress1">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>DC Address2</label> <input
								type="text" class="form-control" placeholder="DC Address2" id="dcAddress2" name="dcAddress2">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>DC Address3</label> <input
								type="text" class="form-control" placeholder="DC Address3" id="dcAddress3" name="dcAddress3">
						</div>
					</div>
					<div class="row">
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Store Name</label> <select
								id="storeNameC" name="storeNameC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Zip Code</label> <input
								type="text" class="form-control" placeholder="Zip Code" id="zipCode" name="zipCode">
						</div>
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created By</label> <input disabled
								type="text" class="form-control" placeholder="Created By"
								id="createdByC" name="createdByC">
						</div>
						
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created On</label> <input disabled
								type="text" class="form-control" placeholder="Created On"
								id="createdOnC" name="createdOnC">
						</div>
							
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="editgridDcMaster">
						<div class="col-md-12 form-field">
							<div id="jqxgridp"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			
			<!--  Modal Window Content Ended -->
			
			<!-- Modal Create DC Master Footer -->
			<div class="modal-footer  text-center">
				<button type="submit" class="btn btn-primary btn-sm" id="saveDcMaster"
					name="saveDcMaster">
					<i class="fa fa-save"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal" id="cancel">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>
<!-- dc details grid-->
<div class="modal fade" id="maintainDcDetailsE"
	data-keyboard="false" data-backdrop="static" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">			
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabel"></label>
				</h3>
			</div>
			<form class="form-horizontal" id="dcDetailsEdit" action="javascript: void(0)">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
					<input id="dcIdE" type="hidden"/>
					<input id="regionIdE" type="hidden"/>
					<input id="cityIdE" type="hidden"/>
					<input id="stateIdE" type="hidden"/>
					<input id="countryIdE" type="hidden"/> 
					<input type="hidden" id="dcDetailsId">						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Region</label> <input
								type="text" class="form-control" placeholder="Region"
								disabled id="regionE" name="regionE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC Name</label> <input
								type="text" class="form-control" placeholder="DC Name" id="dcNameE" name="dcNameE" disabled>
						</div>						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC City</label> <input
								type="text" class="form-control" placeholder="DC City"
								disabled id="dcCityE" name="dcCityE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC State</label> <input
								type="text" class="form-control" placeholder="DC State"
								disabled id="dcStateE" name="dcStateE">
						</div>						
					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC Country</label> <input
								type="text" class="form-control" placeholder="DC Country"
								 disabled id="dcCountryE" name="dcCountryE">							
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC Address1</label> <input
								type="text" class="form-control" placeholder="DC Address1" id="dcAddress1E" name="dcAddress1E">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>DC Address2</label> <input
								type="text" class="form-control" placeholder="DC Address2" id="dcAddress2E" name="dcAddress2E">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>DC Address3</label> <input
								type="text" class="form-control" placeholder="DC Address3"	id="dcAddress3E" name="dcAddress3E">
						</div>
					</div>
					<div class="row">
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Zip Code</label> <input
								type="text" class="form-control" placeholder="Zip Code" id="zipCodeE" name="zipCodeE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created By</label> <input
								type="text" class="form-control" placeholder="Created By"
								disabled id="createdByE" name="createdByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created On</label> <input
								type="text" class="form-control" placeholder="Created On" 
								disabled id="createdOnE" name="createdOnE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Default Store</label> <select
								id="defaultStoreE" name="defaultStoreE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>					
				</div>
			
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="submit" class="btn btn-primary btn-sm" id="saveDcE"
					name="saveDcE">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal" id="cancel">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/dcDetails.js"type="text/javascript"></script>