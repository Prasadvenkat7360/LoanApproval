<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Nageshwar Rao C
	##	Date Creation 	: 	07-05-2018
	## 	Description		:	Notification Search and Create and View Functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Search Notification
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#createNotification" type="button" id="creatNotificationC"
							href="javascript: void(0)"><i class="fa fa-plus"></i>
							&nbsp;Create </a>
					</div>
				</div>
					<form class="form-horizontal" id="rmToFgTransferForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
									<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							 </div>
							<div class="col-sm-2">
								<label>To Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
									<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							</div>
							<div class="col-sm-2">
								<label>Store/DC</label> <select id="storeOrDcTypeS" name="storeOrDcTypeS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Store/DC Name</label> <select id="storeOrDcNameS" name="storeOrDcNameS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Read/Unread</label> <select id="readOrUnreadS" name="readOrUnreadS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Raised By</label> <select id="raisedByS" name="raisedByS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							
							
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Role</label> <select id="roleS" name="roleS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Raised To</label> <select id="raisedToS" name="raisedToS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
						</div>
						<!-- Row 1 ended  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
							<button name="export" id="export" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-file-excel-o fa-lg" ></i>&nbsp; Export
							</button>
						</div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for search-->
					<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>

<!-- Create Notification -->
<div class="modal fade" id="createNotification" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus fa-sm"></i> &nbsp;Create Notification
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal"  id="createNotificationForm" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">	
				<div class="clearfix">&nbsp;</div>	
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>From Store/DC</label> <select id="fromStoreOrDcTypeC" name="fromStoreOrDcTypeC" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>From Store/DC Name</label> <select id="fromStoreOrDcNameC" name="fromStoreOrDcNameC" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>To Store/DC</label> <select id="toStoreOrDcC" name="toStoreOrDcC" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>To Store/DC Name</label> <select id="toStoreOrDcNameC" name="toStoreOrDcNameC" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>				
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Raised By</label> <select id="raisedByC" name="raisedByC" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Role</label> <select id="roleC" name="roleC" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Raised To </label> <select id="raisedToC" name="raisedToC" class="form-control">
									<option value="" selected label="Select" /></select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Title</label>
							<textarea rows="1" cols="50" id="titleC" name="titleC"  placeholder="" class="form-control"></textarea>
					</div>
					</div>
					
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Message</label>
								<input type="text" class="form-control" id="messageC">
						</div>
						<div class="col-md-9 form-field">
							<span class="required">*</span><label>Remarks</label>
							<textarea rows="2" cols="50" id="remarksC" name="remarksC" placeholder="" class="form-control"></textarea>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>	
			<div class="modal-footer  text-center">			
				<button type="submit" class="btn btn-primary btn-sm" data-dismiss="modal" id="notificationCreate">
					<i class="fa fa-plus"></i>&nbsp;Create
				</button>
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>			
		</div>
	</div>
</div>

<!-- Notification View -->
<div class="modal fade" id="viewNotificationDet" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-eye fa-sm"></i> &nbsp;Notification Modal Window
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);" id="NotificationFormView">
				<div class="col-md-12 mobile-responsive">	
				<div class="clearfix">&nbsp;</div>	
					<div class="row">
						<input type="hidden" class="form-control" id="notifIdE">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>From Store/DC</label><input type="text" class="form-control" id="fromStoreDcTypeV" disabled>
							</div>
							
							<input type="hidden" class="form-control" id="fromStoreDcNameIdV">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>From Store/DC Name</label> <input type="text" class="form-control" id="fromStoreDcNameV" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>To Store/DC</label> <input type="text" class="form-control" id="toStoreDcV" disabled>
							</div>
							
							<input type="hidden" class="form-control" id="toStoreDcNameIdV">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>To Store/DC Name</label> <input type="text" class="form-control" id="toStoreDcNameV" disabled>
							</div>				
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Raised By</label> <input type="text" class="form-control" id="raisedByV" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Raised To </label><input type="text" class="form-control" id="raiseToV" disabled>
						</div>
						
						<input type="hidden" class="form-control" id="roleIdE">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Raised To Role</label> <input type="text" class="form-control" id="roleV" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Title</label>
								<input type="text" class="form-control" id="titleV" disabled>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span><label>Message</label>
								<input type="text" class="form-control" id="messageV" disabled>
						</div>
						<div class="col-md-9 form-field">
							<span class="required">*</span><label>Remarks</label>
							<textarea rows="2" cols="50" id="remarksV" name="remarksV" placeholder="" class="form-control"></textarea>
						</div>
						 
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>	
			<div class="modal-footer  text-center">			
				<button type="button" class="btn btn-primary btn-sm" id="updateNotification" data-dismiss="modal">
					<i class="fa fa-plus fa-lg"></i>&nbsp; Update
				</button>
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Close
				</button>
			</div>			
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/notificationSearch.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>