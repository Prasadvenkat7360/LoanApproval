<!-- 
	##	Author1         : 	Dipankar Naha
	## 	Author2 	    :   POOJA
	##	Date Creation 	: 	13-02-2017
	## 	Description		:	Maintain Company Details
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Maintain Company Holidays
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#maitainCompanyDetails" type="button"
							id="maintainCompanyDet">
							<i class="fa fa-plus"></i> &nbsp;Create
						</button>
					</div>
				</div>
				<form class="form-horizontal" id="companyHolidaySrc" action="">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<label>Region</label> <select id="regionS" class="form-control">
									<option value="" label="--Select--" />
									<option value="Store">south</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>DC</label> <select id="dcStoreS" class="form-control">
									<option value="" label="--Select--" />
									<!-- <option value="Store">Store</option>
									<option value="DC">DC</option> -->
								</select>
							</div>
							<div class="col-sm-2">
								<label>Store</label> <select id="storeDcS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Status</label> <select id="statusS" name="statusS" class="form-control">
									<option value="" label="--Select--" />	
									<option value="True">Active</option>
									<option value="False">In-Active</option></select>
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
				<!-- Maintain Company Details Header Started -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for store Master create and search-->
				<div style="position: relative; z-index: 1;">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="maitainCompanyDetails" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal to Maintain the company details the  Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp; Create Company Holidays</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Region</label> <select
								id="region" class="form-control">
								<option value="" label="--Select--" />
								<option value="Store">south</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>DC</label> <select
								id="dcStore" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Store</label> <select
								id="store" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Holiday Name</label>
							<input type="text" class="form-control"
								placeholder="Holiday Name" id="holidayName" name="holidayName">
						</div>
					</div>
					<!-- second row started -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Start Date</label>
							<div class="input-group">
									<input type="text" readonly = 'true'  class="date-picker form-control dateBackground" data-validation="date" data-validation-format="dd/mm/yyyy"
									id="startDate" placeholder="DD/MM/YYYY"> <label
									for="startDate" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> End Date</label>
							<div class="input-group">
									<input type="text" readonly = 'true'  class="date-picker form-control dateBackground" data-validation="date" data-validation-format="dd/mm/yyyy"
									id="endDate" placeholder="DD/MM/YYYY"> <label
									for="endDate" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>

						<!--3rd row started -->
						<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Status</label> <select
								id="active" class="form-control">
								<option value="" label="--Select--" />
								<option value="1">Active</option>
								<option value="0">In-Active</option>
							</select>
						</div> -->
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Status</label> <input
								type="text" disabled class="form-control" placeholder="Status"
								id="active" name="active" value="Active">
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm"
					id="maintainCompanyHoliday" name="maintainCompanyHoliday">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="maintainCompanyHolidaysE"
	data-keyboard="false" data-backdrop="static" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
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
			<form class="form-horizontal" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input type="hidden" id="companyHolidayId">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Region</label> <select
								id="regionE" class="form-control">
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>DC</label> <select
								id="dcStoreE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Store</label> <select
								id="storeE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Holiday Name</label>
							<input type="text" class="form-control"
								placeholder="Holiday Name" id="holidayNameE" name="holidayName">
						</div>
					</div>
					<!-- second row started -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Start Date</label>
							<div class="input-group">
								<input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
									id="startDateE" placeholder="DD/MM/YYYY"> <label
									for="startDateE" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>

						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> End Date</label>
								<div class="input-group">
									<input type="text"  readonly = 'true'
										class="date-picker form-control dateBackground"
										id="endDateE" placeholder="DD/MM/YYYY"> <label
										for="endDateE" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created By</label> <input data-validation="date" data-validation-format="dd/mm/yyyy"
								type="text" class="form-control" placeholder="Created BY"
								disabled id="createdByE" name="createdByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created On</label> <input data-validation="date" data-validation-format="dd/mm/yyyy"
								type="text" class="form-control" placeholder="Created On"
								disabled id="createdOnE" name="createdOnE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Status</label> <select
								id="activeE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveCompanyE"
					name="saveCompanyE">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Close
				</button>

			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/maintainCompanyholidays.js" type="text/javascript"></script>
	
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>