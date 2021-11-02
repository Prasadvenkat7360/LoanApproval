<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Metal Accounting Location Header Started -->
				<div class="heading-block">
					<h1>
					
					</h1>

					<div class="clearfix">&nbsp;</div>
					<label class="radio-inline"><input name="fgRMParam"
						type="radio" value="fg" /> &nbsp; FG</label> <label class="radio-inline"><input
						name="fgRMParam" type="radio" value="rm" /> &nbsp; RM</label>
				</div>

				<div id="fgParamDet">
					<div class="heading-block">
						<h1>	<i class="fa fa-desktop"></i> &nbsp;Maintain Quality Parameter FG</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createFgParamDet" type="button"
								id="createFgParamDetails" ><i
								class="fa fa-plus"></i> &nbsp;Create </button>
						</div>
					</div>

					<!-- dc Details Search -->
					<form class="form-horizontal" id="zoneDetailCreate" action="javascript:void(0);">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<label>Segment</label> <select id="fgSegmentS"
										class="form-control" data-validation="required">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>Code</label> <input type="text" class="form-control"
										placeholder="Code" id="fgCodeS" name="fgCodeS">
								</div>
								<div class="col-sm-2">
									<label>Code Description</label> <input type="text"
										class="form-control" placeholder="Code Description"
										id="fgCodeDescS" name="fgCodeDescS">
								</div>
								<div class="col-sm-2">
							&nbsp;<label>Status</label> <select
								id="fgStatusS" class="form-control" data-validation="required">
								<option value="" label="--Select--" />
								<option value="1">Active</option>
								<option value="0">In-Active</option>						
							</select>
						</div>
							</div>						

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="submit"
									name="searchFG" id="searchFG">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllFG" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>


				<!-- Store searching started -->
				<div id="rmParamDet">
					<div class="heading-block">
						<h1>	<i class="fa fa-desktop"></i> &nbsp;Maintain Quality Parameter	RM</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createRMDet" type="button" id="createRMDetails">
								<i class="fa fa-plus"></i> &nbsp;Create
							</button>
						</div>
					</div>
					<!-- Parameter Details Search -->
					<form class="form-horizontal" id="searchRmDetails" action="javascript:void(0);">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<label>Segment</label> <select id="segmentRM"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>Code</label> <input type="text" class="form-control"
										placeholder="Code" id="codeRM" name="codeRM">
								</div>
								<div class="col-sm-2">
									<label>Code Description</label> <input type="text"
										class="form-control" placeholder="Code Description"
										id="codeDescRM" name="codeDescRM">
								</div>
								<div class="col-sm-2">
							&nbsp;<label>Status</label> <select
								id="statusRM" class="form-control" data-validation="required">
								<option value="" label="--Select--" />
								<option value="1">Active</option>
								<option value="0">In-Active</option>						
							</select>
						</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="submit"
									name="searchRM" id="searchRM">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllRM" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>
			
			<!-- JqGrid Started for Zone details create and search-->
			<div style="position: relative; z-index: 1; width:100%;">
				<div id="jqxgrid"
					style="font-size: 13px; font-family: Verdana; float: left;"></div>
			</div>
			<!-- JqGrid Ended -->

			</div>
			<div class="clearfix">&nbsp;</div>
			
		</div>
	</div>
</div>


<!-- Model Window for create Zone Master -->

<!-- Modal window for FG creation -->
<div class="modal fade" id="createFgParamDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus fa-lg"></i> &nbsp; Create FG Parameter Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createFGParameterDet" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Segment</label> <select id="fgSegment" name="fgSegment"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Code</label> <input type="text" class="form-control"
										placeholder="Code" id="fgCode" name="fgCode">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Code Description</label> <input type="text"
										class="form-control" placeholder="Code Description"
										id="fgCodeDesc" name="fgCodeDesc">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Status</label> <input
										type="text" disabled class="form-control" placeholder="Status"
										id="fgStatus" name="fgStatus" value="Active">
								</div>
							</div>
					
				</div>
			
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Zone Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm voffset" type="submit"
					name="saveFGDetails" id="saveFGDetails">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>


<!-- Modal window for RM creation -->
<div class="modal fade" id="createRMDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus fal-lg"></i> &nbsp; Create RM Parameter Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createRmParameterDet" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment</label> <select id="segmentCreateRM" name="segmentCreateRM" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Code</label> <input type="text" class="form-control"
								placeholder="Code" id="codeCreateRM" name="codeCreateRM">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Code Description</label> <input type="text"
								class="form-control" placeholder="Code Description"
								id="codeDescCreateRM" name="codeDescCreateRM" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Status</label> <input
							type="text" disabled class="form-control" placeholder="Status"
							id="statusCreateRM" name="statusCreateRM" value="Active">
						</div>
					</div>
				</div>
			
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Zone Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm voffset" type="submit"
					name="saveRMDetails" id="saveRMDetails">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>
<!-- Edit Window for RM -->

<div class="modal fade" id="btnViewRM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	 <div class="modal-dialog modal-lg">
		<div class="modal-content">
		
			<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;
	</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title"><i class="fa fa-pencil-square-o"></i> &nbsp;  <label id="popupheaderlabelRM"></label></h3>
</div>

<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="qualityParamSearchRM" action="javascript:void(0);">
					<div class="col-md-12 mobile-responsive">
					 	<div class="clearfix">&nbsp;</div>
						<!-- Row 1 Started  -->
						<div class="row">
						<input type="hidden" id="paramDetailsRmID">	
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Segment</label>
							<input type="text" class="form-control" 
								disabled placeholder="Code" id="segmentCreateRME" name="segmentCreateRME" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Code</label> <input type="text" class="form-control"
								disabled placeholder="Code" id="codeCreateRME" name="codeCreateRME" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Code Description</label> <input type="text"
								class="form-control" placeholder="Code Description"
								id="codeDescCreateRME" name="codeDescCreateRME" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Status</label> <select
								id="statusCreateRME" name="statusCreateRME" class="form-control">
								<option value="" label="--Select--" />				
							</select>
						</div>
						</div>
						
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" disabled
								class="form-control" placeholder="Created By"
								id="rmCreatedVyE" name="rmCreatedByE" />
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" disabled
								class="form-control" placeholder="Created On"
								id="rmCreatedOnE" name="rmCreatedOnE" />
						</div>
					</div>				
								
				</div>
			
				<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm voffset" type="submit"
					name="saveRMDetailsE" id="saveRMDetailsE">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>
	<!-- Edit Grid for FG -->
	
	<div class="modal fade" id="btnViewFG" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	 <div class="modal-dialog modal-lg">
		<div class="modal-content">
		
			<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;
	</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title"><i class="fa fa-pencil-square-o"></i> &nbsp;  <label id="popupheaderlabelFG"></label></h3>
</div>

<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="qualityParamSearch" action="javascript:void(0);">
					<div class="col-md-12 mobile-responsive">
					 	<div class="clearfix">&nbsp;</div>
						<!-- Row 1 Started  -->
						<div class="row">
						<input type="hidden" id="fgSegmentIdE">	
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Segment</label> 
									 <input type="text"
										class="form-control" placeholder="FG Segment" disabled
										id="fgSegmentE" name="fgSegmentE">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Code</label> <input type="text" class="form-control"
									disabled placeholder="Code" id="fgCodeE" name="fgCodeE">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Code Description</label> <input type="text"
										class="form-control" placeholder="Code Description"
										id="fgCodeDescE" name="fgCodeDescE" />
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Status</label> <select
								id="fgStatusE" name="fgStatusE" class="form-control">
								<option value="" label="--Select--" />					
							</select>
						</div>
						</div>
								<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Created By</label> <input type="text" disabled
										class="form-control" placeholder="Created By"
										id="fgCreatedVyE" name="fgCreatedByE">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Created On</label> <input type="text" disabled
										class="form-control" placeholder="Created On"
										id="fgCreatedOnE" name="fgCreatedOnE">
								</div>
							</div>



				</div>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm voffset" type="submit"
					name="saveFGDetailsE" id="saveFGDetailsE">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/qualityParamFgRm.js"></script>
