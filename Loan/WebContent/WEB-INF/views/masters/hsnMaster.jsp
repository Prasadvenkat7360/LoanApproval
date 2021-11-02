<!-- 
	##	Author UI       :   Raksha
	##  JAVA            :   Manoranjan
	##	Date Creation 	: 	03-08-2017
	## 	Description		:	HSN Master Functionality
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- HSN Master  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; HSN Master
					</h1>
					<div class="clearfix">&nbsp;</div>
					<label class="radio-inline"><input name="hsnMaster" type="radio" value="1" checked/> &nbsp; HSN Type</label> 
					<label class="radio-inline"><input name="hsnMaster" type="radio" value="2" /> &nbsp; HSN/SAC</label>
				</div>
				<form class="form-horizontal" id="hsnMasterForm" >
						<!-- Row 1 Started  -->
												
						<!-- HSN Type Home Window Started -->
						<div id="hsnTypeDetS">
						  <div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;HSN Type 
								</h1>
								<div class="heading-block-action">
								<button class="btn btn-primary btn-sm" data-toggle="modal"
									data-target="#createHsnTypeM" type="button" id="creatHsnType">
									<i class="fa fa-plus"></i> &nbsp;Create
								</button>
									<!-- <a class="btn btn-primary" data-toggle="modal"
										data-target="#createHsnTypeM" type="button" id="creatHsnType"
										href="javascript: void(0)"><i class="fa fa-plus"></i>
										&nbsp;Create </a> -->
								</div>
							</div>
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Type</label>
										 <select id="hsnTypeS" name="hsnTypeS" class="form-control">
											<option value="">--Select--</option>
									</select>
								</div>
							</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="hsnTypeSearch" id="hsnTypeSearch">
								<i class="fa fa-search fa-lg"></i> Search
							</button>			
							<button id="clearHsnType" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>			
						</div>
						</div>
						<!-- HSN Type Home Window Ended -->
						<!-- HSN-SAC Master Home Window Started -->
						<div id="hsnSacDetS">
						 <div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;HSN-SAC Master 
								</h1>
								<div class="heading-block-action">
									<button class="btn btn-primary btn-sm" data-toggle="modal"
									data-target="#createHsnSacM" type="button" id="creatHsnSac">
									<i class="fa fa-plus"></i> &nbsp;Create
								</button>
								
									<!-- <a class="btn btn-primary" data-toggle="modal"
										data-target="#createHsnSacM" type="button" id="creatHsnSac"
										href="javascript: void(0)"><i class="fa fa-plus"></i>
										&nbsp;Create </a> -->
								</div>
							</div>	
						<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Type</label> 
										<select id="hsnSacTypeS" class="form-control">
											<option value="">--Select--</option>
									</select>
								</div>
								<div class="col-sm-2">
										<label>Segment</label>
											 <select id="segIdS" name="segIdS" class="form-control">
										<option value="">--Select--</option>
									</select>
								</div>
							</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="hsnSacSearch" id="hsnSacSearch">
								<i class="fa fa-search fa-lg"></i> Search
							</button>						
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="hsnSacExport" id="hsnSacExport">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>			
						</div>
						</div>
						<!-- HSN-SAC Master Home Window Ended -->
				</form>				
			</div>
			<div class="clearfix">&nbsp;</div>
            <div style="position: relative; z-index: 1; width:100%;">
	        <div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
              </div>
              <div class="clearfix">&nbsp;</div>            
		</div>
	</div>
</div>

<!-- HSN Type Create Window Started -->
<div class="modal fade" id="createHsnTypeM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; HSN Type - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createhsnTypeC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>HSN Type</label> <input
								type="text" class="form-control" placeholder="HSN Type"
								id="hsnTypeC" name="hsnTypeC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Name</label> <input
								type="text" class="form-control" placeholder="Name"
								id="hsnNameC" name="hsnNameC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Is HSN</label> 
								<select id="isHsnC" class="form-control">
										<option value="">--Select--</option>
										<option value="Yes">YES</option>
										<option value="No">NO</option>
									</select>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
				</div>
			
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveHsnType"
					name="saveHsnType">
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
<!-- HSN Type Create Window Ended -->

<!-- HSN-SAC Type Create Window Started -->
<div class="modal fade" id="createHsnSacM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; HSN-SAC Master - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createhsnSacC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>HSN Type</label> 
								<select id="hsnSacTypeC" class="form-control">
										<option value="">--Select--</option>
								</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Segment</label> 
								<select id="segIdC" class="form-control">
										<option value="">--Select--</option>
								</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>HSN Code</label> <input
								type="text" class="form-control" placeholder="HSN Code"
								id="hsnCodeC" name="hsnCodeC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Description"
								id="hsnSacDescC" name="hsnSacDescC">
						</div>
						
					</div>
					<div class="clearfix">&nbsp;</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveHsnSac"
					name="saveHsnSac">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- HSN-SAC Type Create Window Ended -->

<!-- HSN Type Edit Window Started -->
<div class="modal fade" id="btnEditHsnType" data-keyboard="false"
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
						id="popupheaderlabel"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="hsnTypeE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="hsnIdE" name="hsnIdE">
						</div>
                         <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Type</label> <input type="text" class="form-control"
								disabled id="typeE" name="typeE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Name</label> <input type="text" class="form-control"
								 id="hsnNameE" name="hsnNameE">
						</div> 
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Is HSN</label><input type="text"
								 class="form-control" id="isHsnE" name="isHsnE" disabled>
						</div>	
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- HSN Type Edit Footer -->
				<div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editHsnTypeE"
						name="editHsnTypeE">
						<i class="fa fa-save"></i>&nbsp;Save
					</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- HSN Type Edit Window Ended -->

<!-- HSN-SAC Type Edit Window Started -->
<div class="modal fade" id="btnEditHsnSac" data-keyboard="false"
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
						id="popupheaderlabelH"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="hsnSacMasterE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="hsnSacIdE" name="hsnSacIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>HSN Type</label> 
								<select id="hsnSacTypeE" class="form-control">
										<option value="">--Select--</option>
								</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Segment</label> 
								<select id="segIdE" class="form-control">
										<option value="">--Select--</option>
								</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>HSN Code</label> <input type="text" class="form-control"
								 id="hsnCodeE" name="hsnCodeE" disabled>
						</div> 
						</div>
						<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label> Description</label><input type="text"
								 class="form-control" id="hsnSacDescE" name="hsnSacDescE">
						</div>	
						</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- HSN Type Edit Footer -->
				<div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary" id="editHsnSacE"
						name="editHsnSacE">
						<i class="fa fa-save"></i>&nbsp;Save
					</button>
					<button type="button" class="btn btn-warning" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- HSN Type Edit Window Ended -->



<script src="resource/oe/assets/js/app/hsnTypeMaster.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/hsnSacMaster.js" type="text/javascript"></script>
