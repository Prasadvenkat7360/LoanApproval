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
				<div class="heading-block" style="margin-top:15px;">
					<div class="clearfix">&nbsp;</div>
					<label class="radio-inline"><input name="loyaltyMaster"
						type="radio" value="1" /> &nbsp; Loyalty Tiers</label> <label
						class="radio-inline"><input name="loyaltyMaster"
						type="radio" value="2" /> &nbsp; Loyalty Point Master</label>

				</div>

				<div id="loyaltyTier">
					<div class="heading-block">
						<h1 id="createHead">
							<i class="fa fa-desktop"></i> &nbsp; Loyalty Tiers
						</h1>
					</div>
					<!-- Parameter Details Search -->
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<select id="type" class="form-control">
								<option value="" selected>--Select--</option>
									<option value="search">Search</option>
									<option value="create">Create</option>
								</select>
							</div>
							<div class="col-sm-8"></div>
							<div class="col-sm-2">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="goBack" id="goBack">
									<i class="fa fa-arrow-left fa-lg"></i> Back
								</button>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>	
						<div id="searchSection">
							<form class="form-horizontal" id="loyaltyTierSearchForm" action="javascript:void(0);">
							<div class="row">
								<div class="col-sm-2">
									<label>Tier Id</label> <select id="tierIdS" class="form-control">
										<option value="">--Select--</option>
									</select>
								</div>
								<div class="col-sm-2">
									<label>Tier Name</label> <select id="tierNameS" class="form-control">
										<option value="">--Select--</option>
									</select>
								</div>
							
								<div class="col-sm-2">
									<label>Status</label> <select id="statusS" class="form-control">
										<option value="" selected>--Select--</option>
										<option value="1">Active</option>
										<option value="0">In-Active</option>
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
							</div>
							<div class="clearfix">&nbsp;</div>
							<div style="position: relative; z-index: 1">
							<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
							
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="updateLp" id="updateLp">
									<i class="fa fa-plus fa-lg"></i> Save
								</button></div>
							</form>
						</div>
						<div id="createSection">
						<form class="form-horizontal" id="loyaltyTierCreate" action="javascript:void(0);">
							<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span><label>Tier Name</label> 
								<input type="text" class="form-control" placeholder="Tier Name" id="tierNameC" name="tierNameC"> 
							</div>
							<div class="col-sm-2">
								<span class="required">*</span><label>Tier Id</label> <select id="tierIdC" class="form-control">
									<option value="">--Select--</option>
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span><label>Priority</label> <select id="priorityC" class="form-control">
									<option value="">--Select--</option>
								</select>
							</div>
							<div class="col-sm-3">
								<span class="required">*</span><label>Upgrade/Downgrade of Loyalty Points</label> 
								<input type="text" class="form-control" placeholder="Upgrade/Downgrade of Loyalty Points" id="upDownLptsC" name="upDownLptsC"> 
							</div>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row">
							<div class="col-sm-4">
								<span class="required">*</span><label>No of Months for Upgrade/Downgrade of Loyalty Tier</label> 
								<input type="text" class="form-control" placeholder="No of Months for Upgrade/Downgrade of Loyalty Tier" id="noOfMonthsC" name="noOfMonths"> 
							</div>
							<div class="col-sm-2">
								<span class="required">*</span><label>Description</label> 
								<input type="text" class="form-control" placeholder="Description" id="descriptionC" name="descriptionC"> 
							</div>
							</div>
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="saveLp" id="saveLp">
									<i class="fa fa-plus fa-lg"></i> Save
								</button>
								&nbsp;
								<button id="clearLp" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="backLtC" id="backLtC">
									<i class="fa fa-arrow-left fa-lg"></i> Back
								</button>
							</div></form>
						</div>
						
						</div>
					
				</div>


				<!-- Credit to Account Header Started -->


				<div id="loyaltyPoint">
					<div class="heading-block">
						<h1 id="createHeadLp">
							<i class="fa fa-desktop"></i> &nbsp; Loyalty Point Master
						</h1>
					</div>
					<div class="mobile-responsive">
					<form class="form-horizontal" id="loyaltyPointSearch">
							
						<div class="row">
							<div class="col-sm-2">
								<select id="typeLp" class="form-control">
								<option value="" selected>--Select--</option>
									<option value="search">Search</option>
									<option value="create">Create</option>
								</select>
							</div>
							<div class="col-sm-8"></div>
							<div class="col-sm-2">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="goBackLS" id="goBackLS">
									<i class="fa fa-arrow-left fa-lg"></i> Back
								</button>
							</div>
						</div>
						<div id="searchLpSection">
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span><label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromdateLS" id="fromdateLS" placeholder="DD/MM/YYYY">
										<label for="fromDateLS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
							   
							   <div class="col-sm-2">
									<span class="required">*</span><label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="todateLS" id="todateLS" placeholder="DD/MM/YYYY">
										<label for="todateLS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
							   
							   <div class="col-sm-2">
									<label>Benefit Type</label> <select id="benefitTypeS" class="form-control">
										<option value="">--Select--</option>
									</select>
								</div>
								<div class="col-sm-2">
									<label>Tier Name</label> <select id="tierNamelPS" class="form-control">
										<option value="">--Select--</option>
									</select>
								</div>
							
								<div class="col-sm-2">
									<label>Status</label> <select id="statuslPS" class="form-control">
										<option value="" selected>--Select--</option>
										<option value="1">Active</option>
										<option value="0">In-Active</option>
									</select>
								</div>
							</div>
							
								<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchLp" id="searchLp">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllCTA" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div style="position: relative; z-index: 1">
							<div id="jqxgridLP" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
							
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="updateLpE" id="updateLpE">
									<i class="fa fa-plus fa-lg"></i> Save
								</button>
							</div>
						</div>
						<div id="createLpSection">
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span><label>Benefit Type</label> <select id="benefitTypeC" class="form-control">
										<option value="">--Select--</option>
									</select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span><label>Tier Name</label> <select id="tierNamelPC" class="form-control">
										<option value="">--Select--</option>
									</select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span><label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromdateC" id="fromdateC" placeholder="DD/MM/YYYY">
										<label for="fromDateC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
							   
							   <div class="col-sm-2">
									<span class="required">*</span><label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="todateC" id="todateC" placeholder="DD/MM/YYYY">
										<label for="todateC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
							   <div class="col-sm-2" id="dayC">
									<span class="required" id="dayH">*</span><label>Days</label><div id="daysC"></div>
								</div>
							<div class="col-sm-2">
								<span class="required" id="fTimeH">*</span><label>From Time</label>
								<div class="input-group bootstrap-timepicker timepicker">
									 <input id="timepicker1" type="text" class="form-control input-small">
	 								<span class="input-group-addon"><i class="fa fa-clock-o"></i></span>
								</div>
							</div>
								</div>
						<div class="row">
					
						<div class="col-sm-2">
							<span class="required" id="tTimeH">*</span><label>To Time</label>
							<div class="input-group bootstrap-timepicker timepicker">
								 <input id="timepicker2" type="text" class="form-control input-small">
 								<span class="input-group-addon"><i class="fa fa-clock-o"></i></span>
							</div>
						</div>
						   <div class="col-sm-2">
								<span class="required" id="fValH">*</span><label>From Value</label><input class="form-control" type="text" id="fromValueC" />
							</div>
							<div class="col-sm-2">
								<span class="required" id="tValH">*</span><label>To Value</label><input class="form-control" type="text" id="toValueC" />
							</div>
							<div class="col-sm-2">
								<span class="required" id="diffValH">*</span><label>Value Difference</label><input class="form-control" type="text" id="valueDiffC" />
							</div>
							
							  <div class="col-sm-2">
								<span class="required" id="pointTypeH">*</span><label>Point Type</label> <select id="pointTypeC" class="form-control">
									<option value="">--Select--</option>
								</select>
							</div>
						</div>
						<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="addLp" id="addLp">
									<i class="fa fa-plus fa-lg"></i> Add
								</button>
								&nbsp;
								<button id="clearLpC" class="btn btn-warning btn-sm voffset"
									type="button">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								&nbsp;
								<button id="backFromLpc" class="btn btn-warning btn-sm voffset"
									type="button">
									<i class="fa fa-arrow-left fa-lg"></i>&nbsp; Back
								</button>
						</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row">
						<div class="col-md-12">
						<div style="position: relative; z-index: 1">
						<div id="jqxgridC" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div></div>
						</div>	
						<div class="clearfix">&nbsp;</div>
						<div class="row">
						<div class="col-md-4">	</div>
						<div class="col-md-4">	
						<div class="clearfix">&nbsp;</div>
							<div style="position: relative; z-index: 1">
							<div id="jqxgridP" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
						<div class="col-md-4"></div></div>
						
						<div class="row">
							<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="createLp" id="createLp">
								<i class="fa fa-plus fa-lg"></i> Save
							</button>
							&nbsp;</div>
							</div>
						</div>
					
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>
				</div>

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="createAdjusVouchr" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog">
		 <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                 <h3 class="modal-title" id="myModalLabel">Warning!</h3>

            </div>
            <div class="modal-body">
                 <h4> Are you sure you want to DELETE?</h4>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-sm" id="btnDelteYesLines" href="#">Yes</button>
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">No</button>
            </div>
        </div>
	</div>
</div>




<!-- Credit to Account Modal Window -->


	
<script src="resource/oe/assets/js/app/loyaltyMaster.js"></script>
<script src="resource/oe/assets/js/app/loyaltyPointsMaster.js"></script>

<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>