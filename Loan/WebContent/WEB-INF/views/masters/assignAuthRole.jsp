<!-- 
	##	Author1         : 	Dipankar Naha
	##	Date Creation 	: 	26-12-2018
	## 	Description		:	Assign Authorization Role
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- DC Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Assign Authorization Role
					</h1> 
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"	data-target="#createAuthRole" type="button" id="create"><i class="fa fa-plus"></i>&nbsp;Create </button>
					</div>
				</div>
				<form class="form-horizontal" id="DcMasterSearch" action="javascript: void(0)">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Authorization Type</label> 
								<select id="authType" name="authType" class="form-control"><option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>For Store/DC</label> 
								<select id="storeDC" name="storeDC" class="form-control"><option value="" selected label="Select" /></select>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>
							&nbsp;<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
						</div>
				</form>
				<!-- Dc Master Header Started -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for Dc Master create and search-->
				<div style="position: relative; z-index: 1">
					<div id="jqxGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<!--  CREATE AUTH ROLE MODAL -->
<div class="modal fade" id="createAuthRole" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Assign Authorization Role
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createDCMaster" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Authorization Type</label> 
							<select	id="authTypeC" name="authTypeC" class="form-control"><option value="" selected label="Select" /></select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>For Store/DC</label> 
							<select	id="storeDCC" name="storeDCC" class="form-control"><option value="" selected label="Select" /></select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Role</label> 
							<div id="roleC"></div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field pull-right">
							<label><br/></label> 
							<button type="button" class="btn btn-primary btn-sm" id="continueC" name="continueC"><i class="fa fa-plus"></i>&nbsp;Add</button>
							<button type="reset" class="btn btn-warning btn-sm" id="clearC" name="clearC"><i class="fa fa-times"></i>&nbsp;Clear</button>
						</div>
					</div>
					
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="assignAuthRoleGridSec">
						<div class="col-md-12 form-field">
							<div id="assignAuthRoleGrid" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			
				<!--  Modal Window Content Ended -->
				
				<!-- Modal Create DC Master Footer -->
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-primary btn-sm" id="saveAuthRole" name="saveAuthRole" disabled><i class="fa fa-save"></i>&nbsp;Save</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal" id="cancel"><i class="fa fa-times"></i>&nbsp;Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- EDIT AUTH ROLE MODAL -->
<div class="modal fade" id="viewAssignRole" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Assign Authorization Role- Edit
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createDCMaster" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Authorization Type</label> 
							<input	id="authRoleId" name="authRoleId" type="hidden"  disabled class="form-control">
							<input	id="authTypeE" name="authTypeE" type="hidden"  disabled class="form-control">
							<input	id="authTypeCodeE" name="authTypeCodeE"  type="text" disabled class="form-control">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>For Store/DC</label> 
							<input	id="storeDCE" name="storeDCE" type="text" disabled class="form-control">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Role</label> 
							<div id="roleE"></div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field pull-right">
							<label><br/></label> 
							<button type="button" class="btn btn-primary btn-sm" id="continueE" name="continueE"><i class="fa fa-plus"></i>&nbsp;Add</button>
							<button type="reset" class="btn btn-warning btn-sm" id="clearE" name="clearC"><i class="fa fa-times"></i>&nbsp;Clear</button>
						</div>
					</div>
					
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="assignAuthRoleGridSecE">
						<div class="col-md-12 form-field">
							<div id="assignAuthRoleGridE" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			
				<!--  Modal Window Content Ended -->
				
				<!-- Modal Create DC Master Footer -->
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-primary btn-sm" id="saveAuthRoleE" name="saveAuthRole"><i class="fa fa-save"></i>&nbsp;Save</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal" id="cancel"><i class="fa fa-times"></i>&nbsp;Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/assignAuthRole.js"type="text/javascript"></script>