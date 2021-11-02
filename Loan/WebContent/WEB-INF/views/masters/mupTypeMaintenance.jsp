<!-- 
	##	Author UI 		: 	DIPANKAR NAHA 
	## 	Author UI	    :   POOJA
	##	Date Creation 	: 	18-01-2017
	## 	Description		:	Creation of Metal Accounting Location
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
			<!-- Mup Type Maintenance   Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; MUP Type Maintenance 
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#createMupTypeMaintenance" type="button" id="createMupDet">
							<i class="fa fa-plus"></i>
							&nbsp;Create </button>
							   </div>
			            	</div>
					<form class="form-horizontal" id="MupTypeSearch" action="">
					<div class="mobile-responsive">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Segment</label>
								 <select id="segment" class="form-control">
									<option value="" selected label="Select" />
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>Jewel Type</label> <select id="jewelType" class="form-control">
									<option value="" selected label="Select" />
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>MUP Category</label> 
								<select id="mupCategory" class="form-control">
									<option value="" selected label="Select" />
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>MUP Table</label> <select id="mupTable" class="form-control">
									<option value="" selected label="Select" />
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
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="export" id="export">
									<i class="fa fa-file fa-lg"></i> Export
								</button>

								<button class="btn btn-primary btn-sm voffset" type="button"
									name="upload" id="upload">
									<i class="fa fa-file fa-lg"></i> Upload
								</button>
							</div>
						</div>
			     </form>	
			     <!--mup type maintenance Header Started -->

				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started for MUP type maintenance  create and search-->
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

<div class="modal fade"  id="createMupTypeMaintenance" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create MUP Type Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; MUP Table Creation
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Business</label> <select
								id="business" class="form-control">
								<option value="" selected label="Select" />
								<option value="" selected>--Select--</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Region</label> <select
								id="region" class="form-control">
								<option value="" selected label="Select" />
								<option value="" selected>--Select--</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment</label> <select
								id="segment" class="form-control">
								<option value="" selected label="Select" />
								<option value="" selected>--Select--</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>MUP Category</label> <select
								id="MupCategory" class="form-control">
								<option value="" selected label="Select" />
								<option value="" selected>--Select--</option>
							</select>
						</div>
					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Base Metal Rate</label> <input
								type="text" class="form-control" placeholder="Base Metal Rate"
								id="baseMetalRate" name="baseMetalRate">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Metal Purity</label> <select
								id="metalPurity" class="form-control">
								<option value="" selected label="Select" />
								<option value="" selected>--Select--</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Metal Rate For Purity</label> <input
								type="text" class="form-control" placeholder="Metal Rate For Purity"
								id="metalratepurity" name="metalratepurity">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Metal Rate Mark UP</label> <input
								type="text" class="form-control" placeholder="Metal Rate Mark UP"
								id="metalRateMarkUp" name="metalRateMarkUp">
						</div>
					</div>
					<!-- Row 3 Started -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Metal Selling Rate For Purity</label> <input
								type="text" class="form-control" placeholder=" Metal Selling Rate For Purity"
								id="metalSellingPurity" name="metalSellingPurity">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Wastage Apportion %</label> <input
								type="text" class="form-control" placeholder="Wastage Apportion %"
								id="wastageApp" name="wastageApp">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Making Charge Apportion %</label> <input
								type="text" class="form-control" placeholder="Making Charge Apportion %"
								id="makingChargeApp" name="storeOpenTime">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> Base Cost MC Per Gm</label> <input
								type="text" class="form-control" placeholder="Base Cost MC Per Gm"
								id="baseCostPerGm" name="baseCostPerGm">
						</div>
					</div>
				
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="addRowSection">
						<div class="clearfix">&nbsp;</div>
						<div class="col-md-12 form-field">
							<div class="pull-left">
								<button id="addMupTypeRow" class="btn btn-primary btn-sm"
									type="button">
									<i class="fa fa-plus-circle fa-lg"></i> Add Table
								</button>
							</div>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="editgridMupType">
						<div class="col-md-12 form-field">
							<div id="jqxgridp"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			
			<!-- Modal Create MUP Type Maintenance Footer -->
			<div class="modal-footer  text-center">
			<button type="button" class="btn btn-primary btn-sm" id="continueMupType"
					name="continueMupType">
					<i class="fa fa-save"></i>&nbsp;Continue
				</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Clear
				</button>

			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/mupTypeMaintenance.js"type="text/javascript"></script>