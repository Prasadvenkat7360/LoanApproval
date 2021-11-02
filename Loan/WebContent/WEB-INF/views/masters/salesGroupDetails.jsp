<!-- 
	##	Author1         : 	Dipankar Naha
	## 	Author2 	    :   POOJA
	##	Date Creation 	: 	20-02-2017
	## 	Description		:	Creation of Sales Group Details
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12  layout-main">
				<!-- DC Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Sales Group Details
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#createSalesDetails" type="button" id="create"><i class="fa fa-plus"></i>
							&nbsp;Create </button>
					</div>
				</div>
				<form class="form-horizontal" id="Search" action="javascipt:void(0);">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Store Name</label>  
							<select	id="storeNameS"  name="storeNameS" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						
						
						<div class="col-sm-2">
							<label>Zone Name</label> 
							<select id="zoneNameS" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Month</label> 
							<select	id="monthS" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Year</label> 
							<select	id="yearS" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Status</label> 
							<select	id="statusS" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>	
							&nbsp;						
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" name="export" id="export"><i class="fa fa-file-excel-o fa-lg"></i> Export</button>
						</div>
				</form>
				<!-- sales  Header Started -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for sales  create and search-->
				<div style="position: relative; z-index: 1"><div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="createSalesDetails" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Sales Group Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="salesGroupSearchC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">
						<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>Store Name</label> 
							<select id="storeNameC" name="storeNameC" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>Zone Name</label> 
							<select id="zoneNameC" name="zoneNameC" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>Zone Type Name</label> 
							<input	type="text" class="form-control" placeholder="Zone Type Name" disabled	id="zonetypeNamec" name="zoneTypeNamec">
						</div>
						
						<div class="col-sm-3">
							<input  type="hidden" class="form-control" placeholder="Month" disabled	id="dropDownflagC" name="dropDownflagC">
							<div id="monthSectionA">
								<span class="required">*</span>&nbsp;<label>Month</label>  
								<select	id="monthC" name="monthC" class="form-control">
								<option value="" label="--Select--" /></select>
							</div>
							<div id="monthSectionB">
								<span class="required">*</span>&nbsp;<label>Month</label> 
								<input	type="text" class="form-control" placeholder="Month" disabled	id="monthCA" name="monthCA">
								<input	type="hidden" class="form-control" placeholder="Month" disabled id="monthCAValue" name="monthCAValue">
							</div>								
								
						</div>
						</div>
						<div class="row">
							<div class="col-sm-3">
								<span class="required">*</span>&nbsp;<label>Year</label>   
								<input	type="text" class="form-control" placeholder="Year" disabled id="yearC" name="yearC">
							</div>
						
						
							<div class="col-sm-3">
								<span class="required">*</span>&nbsp;<label> Start Date</label>
								<input	type="text" class="form-control" placeholder="Start Date" disabled	id="startDateC" name="startDateC">
							</div>
					
						
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label> End Date</label> 
								<input	type="text" class="form-control" placeholder="End Date" disabled id="endDateC" name="endDateC">
							</div>
						
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Supervisor Name</label>  
								<select	id="supervisorName" name="supervisorName" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>						
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row" id="addRowSection">
						<div class="clearfix">&nbsp;</div>
						<div class="col-md-12 form-field">
							<div class="pull-left">
								<button id="addSalesDetailsRow" class="btn btn-primary btn-sm" type="button"><i class="fa fa-plus-circle fa-lg"></i> Add Row</button>
							</div>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="editgridStoreMaster">
						<div class="col-md-12 form-field">
							<div id="jqxgridp"	style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="salesGrpSave" name="salesGrpSave"><i class="fa fa-floppy-o"></i>&nbsp;Save</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Cancel</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="myModalDel" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                 <h3 class="modal-title" id="myModalLabel">Warning!</h3>

            </div>
            <div class="modal-body">
                 <h4> Are you sure you want to DELETE?</h4>

            </div>
            <!--/modal-body-collapse -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" id="btnDelteYes" href="#">Yes</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
            </div>
        </div>
    </div>
</div>



<div class="modal fade" id="myModalDelLines" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%; z-index: 1;">
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

<div class="modal fade" id="editSalesDetails" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Edit Sales Group Details
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="salesGroupSearchE" action="">
				<div class="col-sm-12">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">
						<div class="col-sm-3">
							<input type="hidden" id="storeId" />
							<input type="hidden" id="saleGrID" />
							<input type="hidden" id="supIdE" />
							<input type="hidden" id="zoneIdE" />							
							<input type="hidden" id="isActiveE" />
							
							<span class="required">*</span>&nbsp;<label>Store Name</label> 
							<input	type="text" class="form-control" placeholder="Store Name" disabled	id="storeNameE" name="storeNameE">
						</div>
						
						<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>Zone Name</label> 
							<input	type="text" class="form-control" placeholder="Zone Name" disabled	id="zoneNameE" name="zoneNameE">
						</div>
						<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>Zone type Name</label> 
							<input	type="text" class="form-control" placeholder="Zone Type Name" disabled	id="zonetypeNameE" name="zoneTypeNameE">
						</div>
						
						<div class="col-sm-3">	
							<span class="required">*</span>&nbsp;<label>Month</label> 
							<input  type="text" class="form-control" placeholder="Month" disabled	id="monthCAE" name="monthCAE">
							<input	type="hidden" class="form-control" placeholder="Month" disabled	id="monthCAValueE" name="monthCAValueE">								
								
						</div>
					</div>
						
					<div class="row">
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Year</label>   <input 
								type="text" class="form-control" placeholder="Year" disabled
								id="yearE" name="yearE">
						</div>
						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
						<span class="required">*</span>&nbsp;<label> Start Date</label>
								<div class="input-group">
									<input type="text" class="form-control" disabled id="startDateE" name="startDateE" placeholder="DD/MM/YYYY">
								</div>
						</div>
						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
						<span class="required">*</span>&nbsp;<label> End Date</label> 
								<div class="input-group">
									<input type="text" class="form-control" disabled id="endDateE" name="endDateE"placeholder="DD/MM/YYYY"> 
								</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Supervisor Name</label>
							<input	type="text" class="form-control" placeholder="Zone Type Name" disabled	id="supervisorNameE" name="supervisorNameE">
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
						<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowE" type="button"><i class="fa fa-plus"></i>&nbsp;Add</button>
						</div>
					</div>
					
					<div class="row" id="editgridStoreMaster">
						<div class="col-md-12 form-field">
							<div id="jqxgridE"	style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="salesGrpSaveE" name="salesGrpSaveE"><i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Cancel</button>
			</div>
		</div>
	</div>
</div>
	
<script src="resource/oe/assets/js/app/salesGroupDetails.js"type="text/javascript"></script>