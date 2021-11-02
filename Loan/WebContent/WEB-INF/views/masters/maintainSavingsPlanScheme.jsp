<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Savings Plan Scheme  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Maintain Savings Plan Scheme
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#createSavingsPlanScheme" type="button"
							id="createSavingsScheme">
							<i class="fa fa-plus"></i> &nbsp;Create
						</button>
					</div>
				</div>
				<form class="form-horizontal" id="SavingPlanSearch" action="">
						<!-- Row 1 Started  -->
						<div class="row">
							<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Region</label> <select
									id="region" class="form-control">
									<option value="" selected>--Select--</option>
									<option value="1">South</option>
								</select>
							</div> -->
							<div class="col-sm-2">
								<span class="required">*</span> <label>Business</label> <select name="business"
									id="business" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span> <label>Region</label> <select name="region"
									id="region" class="form-control">
									<option value="" selected>--Select--</option>
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
						</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for Savings Plan Scheme create and search-->
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

<div class="modal fade" id="createSavingsPlanScheme"
	data-keyboard="false" data-backdrop="static" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create savings plan scheme  Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Savings Plan Scheme
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createSavingsPlanC" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span> <label>Business</label> <select name="businessC" 
								id="businessC" class="form-control">
								<option value="" selected>--Select--</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span> <label>Region</label> <select name="regionC" 
								id="regionC" class="form-control">
								<option value="" selected>--Select--</option>
							</select>
						</div>
					</div>
					<!-- Row 1 Started  -->
					<div class="row">
					
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Scheme 
								Duration</label> <input type="text" class="form-control" 
								placeholder="Scheme Duration" id="schemeDur" name="schemeDur">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Scheme Name</label>
							<input type="text" class="form-control" placeholder="Scheme Name" 
								id="schemeName" name="schemeName">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Scheme
								Amount</label> <input type="text" class="form-control" 
								placeholder="Scheme Amount" id="SchemeAcc" name="SchemeAcc">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Bonus Rate %</label>
							<input type="text" class="form-control" onblur="this.value = validateNumber(this.value);"
								placeholder="Bonus Rate %" id="bonusRate" name="bonusRate">
						</div>
					</div>
					<!-- second row started -->
					<div class="row">

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Benefit Rate
								%</label> <input type="text" class="form-control"
								placeholder="Benefit Rate %" id="benefitRate" name="benefitRate" onblur="this.value = validateNumber(this.value);">
						</div>
					</div>
				</div>
			
			<div class="modal-footer  text-center">
				<button type="submit" class="btn btn-primary btn-sm" id="createSavingsPlan"
					name="createSavingsPlan">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>

<div class="modal fade" id="MaintainSavingsPlan" data-keyboard="false"
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
			<form class="form-horizontal" id="editSavingsPlan" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Scheme ID</label> <input
								type="text" class="form-control" placeholder="Scheme ID"
								disabled id="schemeIdE" name="schemeIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Scheme Name</label>
							<input type="text" class="form-control" placeholder="Scheme Name" 
								disabled id="schemeNameE" name="schemeNameE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Scheme
								Duration</label> <input type="text" class="form-control"
								placeholder="Scheme Duration" id="schemeDurE" name="schemeDurE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Scheme
								Amount</label> <input type="text" class="form-control" disabled
								placeholder="Scheme Amount" disabled id="SchemeAccE"
								name="SchemeAccE">
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Bonus Rate %</label>
							<input type="text" class="form-control" placeholder=" Bonus Rate %" id="bonusRateE" name="bonusRateE" onblur="this.value = validateNumber(this.value);">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Benefit Rate
								%</label> <input type="text" class="form-control" onblur="this.value = validateNumber(this.value);"
								placeholder="Benefit Rate %" id="benefitRateE"
								name="benefitRateE">
						</div>
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
					<div class="row">
						 <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Status</label><select id="statusE" name="statusE" class="form-control">
								<option value="" selected label="Select" />
								<option value="Yes">Active</option>
								<option value="No">In-Active</option></select>
					</div>
					</div>
				</div>
			
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="submit" class="btn btn-primary btn-sm" id="savePlanE"
					name="savePlan">
					<i class="fa fa-plus"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Close
				</button>

			</div>
			</form>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/maintainSavingsPlanScheme.js"
	type="text/javascript"></script>