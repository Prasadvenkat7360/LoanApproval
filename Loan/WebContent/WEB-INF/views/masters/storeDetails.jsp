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
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Store Master
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#createStoreDetails" type="button"
							id="createStoreDet">
							<i class="fa fa-plus"></i> &nbsp;Create
						</button>
					</div>
				</div>
				<form class="form-horizontal" id="DcMasterSearch" action="javascript: void(0);">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Region</label> <select id="regionS" class="form-control"
								name="regionS">
									<option value="" label="--Select--"/>
								</select>
								
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Store Name</label> <select id="storeNameS"
								 name="storeNameS"
									class="form-control" ><option value="" label="--Select--"/>
				
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
				<!-- store Master Header Started -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for store Master create and search-->
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

<div class="modal fade" id="createStoreDetails" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp; Create Store</h3>
			</div>
			
			<form class="form-horizontal" action="javascript: void(0);" id="createStore">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Region</label>
							<select id="region" name="region" class="form-control"></select>
						</div>
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Store Name</label> 
							<input type="text" class="form-control" placeholder="Store Name" id="storeName" name="storeName">
						</div>
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> City</label> 
							<select id="storeCity" name="storeCity" class="form-control" ></select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>State</label>
							<input type="text" class="form-control" placeholder="State" disabled
								id="storeState" name="storeState">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Country</label>
							<input type="text" class="form-control" placeholder="Country" disabled
								id="storeCountry" name="storeCountry">
						</div>
						<!-- 
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> State</label>  
							<select	id="storeState" name="storeState" class="form-control"></select>
						</div> -->
						<!-- 
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Country</label> 
							<select	id="storeCountry" name="storeCountry" class="form-control"></select>
						</div> -->
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Address1</label> 
							<input	type="text" class="form-control" placeholder="Address" id="storeAddress"  name="storeAddress">
						</div>
					</div>					

					<div class="row">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Address2</label> 
							<input	type="text" class="form-control" placeholder="Address"	id="storeAddress1" name="storeAddress1">
						</div>
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Address3</label> 
							<input	type="text" class="form-control" placeholder="Address"	id="storeAddress2" name="storeAddress2">
						</div>
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Zip Code</label> 
							<input	type="text" class="form-control" placeholder="Zip Code"	id="zipCode" name="zipCode">
						</div>
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Store Open	Time</label> 
							<input type="text" class="form-control"	placeholder="Store Open Time" id="storeOpenTime" name="storeOpenTime">
						</div>
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Store Close Time</label> 
							<input type="text" class="form-control" placeholder="Store Close Time" id="storeCloseTime"	name="storeCloseTime">
						</div>
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Store Phone Number</label> 
							<input type="text" class="form-control"	placeholder=" Store Phone Number" id="storePhNo" name="storePhNo">
						</div>					
					</div>
					<!-- Row 4 Started -->
					<div class="row">
					<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Phone
								Extension</label> <input type="text" class="form-control"
								placeholder="Phone Extension" id="phoneExt" name="phoneExt" >
						</div>
					
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Store Type</label> <select
								id="storeType" name="storeType" class="form-control">							
							</select>
						</div>
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field" id="startDateVal">
									<span class="required">*</span>&nbsp;<label> Start Date</label> 
								<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground" id="startDate"
											name="startDate" placeholder="DD/MM/YYYY" /> <label 
											for="startDate" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field" id="endDateVal">
									<span class="required">*</span>&nbsp;<label> End Date</label>
									<div class="input-group">
										<input type="text"  readonly = 'true' class="date-picker form-control dateBackground" id="endDate"
											name="endDate" placeholder="DD/MM/YYYY"> <label 
											for="endDate" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>
								<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> DC Name</label> <select
								id="dcName" name="dcName"class="form-control" >
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> GSTIN Number
								</label> <input type="text" class="form-control"
								placeholder=" Tin/GST Number" id="tinGstNumber"
								name="tinGstNumber">
						</div>
						
					</div>
					<div class="row">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Created On</label>
							<input type="text" class="form-control" placeholder="Created On" disabled
								id="createdOnC" name="createdOnC">
						</div>
						
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Created By</label>
							<input type="text" class="form-control" placeholder="Created By" disabled
								id="createdByC" name="createdByC">
							</div>
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field" id="sId">
							<span class="required">*</span>&nbsp;<label>State ID</label>
							<input type="text" class="form-control" placeholder="State ID" disabled
								id="storeStateId" name="storeStateId">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field" id= "cId">
							<span class="required">*</span>&nbsp;<label>Country</label>
							<input type="text" class="form-control" placeholder="Country ID" disabled
								id="storeCountryId" name="storeCountryId">
						</div>
					</div>
					
					<div class="row" id="addRowSection">
						<div class="col-md-12 form-field">
							<div class="pull-right">
								<button id="addStoreRow" class="btn btn-primary btn-sm" type="submit">
									<i class="fa fa-plus-circle fa-lg"></i> Add Row
								</button>
							</div>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="editgridStoreMaster">
						<div class="col-md-12 form-field">
							<div id="jqxgridp"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Store Master Footer -->
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveStoreMaster"
					name="saveStoreMaster">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>


<div class="modal fade" id="editStoreDetails" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Edit Store Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);" id="editStoreDetailsForm">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input type="hidden" id="storeId"/>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
						<input	type="hidden" id="regionIdE" name="regionIdE" />
						<input	type="hidden" id="storeAddressId" name="storeAddressId" />
								
							<span class="required">*</span>&nbsp;<label>Region</label> <input
								type="text" class="form-control" placeholder="Region Name" disabled
								id="regionNameE" name="regionNameE"
								>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Store Name</label> <input disabled
								type="text" class="form-control" placeholder="Store Name"
								id="storeNameE" name="storeNameE"
								>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> City</label> <select disabled
								id="storeCityE" name="storeCityE" class="form-control" >							
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> State</label>  <select disabled
								id="storeStateE" name="storeStateE" class="form-control" >
							</select>
						</div>
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Country</label> <select disabled
								id="storeCountryE" name="storeCountryE" class="form-control" >								
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Address1</label> <input disabled
								type="text" class="form-control" placeholder="Address"
								id="storeAddressE" name="storeAddressE">
						</div>
					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Address2</label> <input disabled
								type="text" class="form-control" placeholder="Address"
								id="storeAddress1E" name="storeAddress1E">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Address3</label> <input disabled
								type="text" class="form-control" placeholder="Address"
								id="storeAddress2E" name="storeAddress2E">
						</div>
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Zip Code</label> <input disabled
								type="text" class="form-control" placeholder="Zip Code"
								id="zipCodeE" name="zipCodeE"
								>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Store Open
								Time</label> <input type="text" class="form-control"
								placeholder="Store Open Time" id="storeOpenTimeE"
								name="storeOpenTimeE" >
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Store Close
								Time</label> <input type="text" class="form-control"
								placeholder="Store Close Time" id="storeCloseTimeE"
								name="storeCloseTimeE" >
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Store Phone
								Number</label> <input type="text" class="form-control"
								placeholder=" Store Phone Number" id="storePhNoE"
								name="storePhNoE"
								>
						</div>
					</div>
					<!-- Row 3 Started -->
					<div class="row">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Phone
								Extension</label> <input type="text" class="form-control"
								placeholder="Phone Extension" id="phoneExtE" name="phoneExtE"
							>
						</div>
					
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Store Type</label> <select disabled
								id="storeTypeE" name="storeTypeE" class="form-control">							
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field" id="strtDtE">
							<span class="required">*</span>&nbsp;<label> Start Date</label> 
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground" disabled
										id="startDateE" name="startDateE" placeholder="DD/MM/YYYY"
										> <label
										for="startDateE" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field" id="endDtE">
							<span class="required">*</span>&nbsp;<label> End Date</label>
									<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground" disabled
										id="endDateE" name="endDateE" placeholder="DD/MM/YYYY"
										> <label
										for="endDateE" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> DC Name</label> <select
								id="dcNameE" name="dcNameE" class="form-control"  disabled>
							</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> GSTIN Number 
								Number</label> <input type="text" class="form-control" disabled
								placeholder=" Tin/GST Number" id="tinGstNumberE"
								name="tinGstNumberE"
								 >
						</div>
					</div>
					
					<div class="row">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created By</label> <input 
								type="text" class="form-control" placeholder="Created By"
								disabled id="createdByE" name="createdByE">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created On</label> <input
								type="text" class="form-control" placeholder="Created On"
								disabled id="createdOnE" name="createdOnE">
						</div>
					</div>
				
				
					<div class="row" id="addRowSectionEdit">
						<div class="col-md-12 form-field">
							<div class="pull-right">
								<button id="EditrowStoreDetails" class="btn btn-primary btn-sm" type="button">
									<i class="fa fa-plus-circle fa-lg"></i> Add Row
								</button>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridpE"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
						
					</div>
				</div>
			
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Store Master Footer -->
			<div class="modal-footer  text-center">
				<button type="submit" class="btn btn-primary btn-sm" id="saveStoreMasterE"
					name="saveStoreMasterE">
					<i class="fa fa-save"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/storeDetails.js"
	type="text/javascript"></script>
	
	<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>