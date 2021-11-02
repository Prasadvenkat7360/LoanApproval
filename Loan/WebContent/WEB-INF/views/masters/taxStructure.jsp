<!-- 
	##	Author1         : 	Raksha
	## 	Author2 	    :   Dipankar Naha
	##  JAVA            :   Manoranjan
	##	Date Creation 	: 	09-08-2017
	## 	Description		:	Tax Structure Functionality
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!--Tax Structure  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Tax Structure
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#createTaxStructure" type="button"
							id="taxStructureCreate">
							<i class="fa fa-plus"></i> &nbsp;Create
						</button>
					</div>
				</div>
				<form class="form-horizontal" id="taxStructureForm" action="">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Type</label> <select id="typeS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>HSN Code</label> <select id="hsnCodeS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Segment</label> <select id="segIdS" name="segIdS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
									<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
							   
							<div class="col-sm-2">
								<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
							<div class="col-sm-2">
								<label>State</label> <select id="stateIdS" name="stateIdS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Status</label> <select id="statusS" name="statusS" class="form-control">
										<option value="" label="--Select--" />	
										<option value="true">Active</option>
										<option value="false">In-Active</option>
										</select>
								</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="searchTaxStruc" id="searchTaxStruc">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;							
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>	
							&nbsp;			
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportTaxStruc" id="exportTaxStruc">
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

<!-- Tax Structure  Create Window Started -->
<div class="modal fade" id="createTaxStructure" data-keyboard="false"
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
					<i class="fa fa-plus"></i> &nbsp; Tax Structure - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="taxStructureDetC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Type</label> <select id="typeC" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>HSN Code</label> <select id="hsnCodeC" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>From Date</label>
								<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="fromDateC" id="fromDateC"
                                	placeholder="DD/MM/YYYY"><label for="fromDateC" class="input-group-addon cursor">
                                		<span class="fa fa-calendar"></span></label>
								</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>To Date</label>
								<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"name="toDateC" id="toDateC" 
									placeholder="DD/MM/YYYY"><label for="toDateC" class="input-group-addon cursor">
										<span class="fa fa-calendar"></span></label>
							   </div>
						</div>
						</div>
						<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
						<span class="required">*</span>&nbsp;<label>State</label> <select id="stateIdC" name="stateIdC" class="form-control">
									<option value="" selected label="Select" />
								</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Description" id="descC" name="descC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>SGST %</label> <input
								type="text" class="form-control" id="sgstC" name="sgstC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>CGST %</label> <input
								type="text" class="form-control" id="cgstC" name="cgstC">
						</div>
					</div>
					<div class="row">
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>IGST %</label> <input
								type="text" class="form-control" id="igstC"  name="igstC">
						</div>
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Service %</label> <input
								type="text" class="form-control" id="serviceC"  name="serviceC">
					</div>
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>CESS %</label> <input
								type="text" class="form-control" id="cessC" name="cessC">
					</div>
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
						<span class="required">*</span>&nbsp;<label>Is Registered</label> <select id="isRegC" name="isRegC" class="form-control">
							<option value="" label="--Select--" />	
							<option value="true">Yes</option>
							<option value="false">No</option>
					</select>
					</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
						
							<button class="btn btn-primary" id="addRow" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridT"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveTaxStructure"
					name="saveTaxStructure">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<!-- <button id="clear" class="btn btn-warning voffset" type="reset">
					<i class="fa fa-times fa-lg"></i>&nbsp; Clear
				</button> -->
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Tax Structure Create Window Ended -->



<!-- Tax Structure Edit Window Started -->
<div class="modal fade" id="btnEditTaxStr" data-keyboard="false"
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
			<form class="form-horizontal" id="taxStructureE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
					 	<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Type</label> <input type="text" class="form-control"
								 id="typeE" name="typeE" disabled>
						</div>
					  	 <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>HSN Code</label> <input type="text" class="form-control" 
								id="hsnCodeE" name="hsnCodeE" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>From Date</label> <input type="text" class="form-control" 
								id="fromDateE" name="fromDateE" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>To Date</label>
								<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"name="toDateE" id="toDateE" 
									placeholder="DD/MM/YYYY"><label for="toDateE" class="input-group-addon cursor">
										<span class="fa fa-calendar"></span></label>
							   </div>
						</div>
						</div>
						<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>State</label> <input type="text" class="form-control" id="stateIdE" name="stateIdE" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" id="descE" name="descE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>SGST %</label> <input
								type="text" class="form-control" id="sgstE" name="sgstE">
						</div>
						 <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>CGST %</label> <input
								type="text" class="form-control" id="cgstE"  name="cgstE">
						</div>
					</div>
					<div class="row">
					    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>IGST %</label> 
								<input type="text" class="form-control" id="igstE"  name="igstE">
						</div>	
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Service %</label>
								 <input type="text" class="form-control" id="serviceE" name="serviceE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>CESS %</label><input type="text" class="form-control" placeholder="" id="cessE" name="cessE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Is Registered</label><input type="text" class="form-control" placeholder="" disabled id="isRegE" name="isRegE">
						</div>
						
					</div>
					<div class="row">
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id ="hsncode">
						<label>HSN Code</label> <input type="text" class="form-control" 
							id="hsnCode" name="hsnCode" disabled>
					</div>
					 <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id ="state">
						<label>States</label><input type="text" class="form-control" 
							id="stateId" name="stateId" disabled>
						</div>
					 <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id ="types">
						<label>Types</label><input type="text" class="form-control" 
							id="type" name="type" disabled>
					</div>
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id ="editId">
							<label>ID</label> <input type="text" class="form-control"
								 id="idE" name="idE" disabled>
					</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editTaxStructureE"
						name="editTaxStructureE">
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
<!-- Tax Structure Edit Window Ended -->


<script src="resource/oe/assets/js/app/taxStructure.js" type="text/javascript"></script>

<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>