<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Nageshwar Rao C
	##	Date Creation 	: 	07-05-2018
	## 	Description		:	Alert Search  and View Functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Search Alert 
					</h1>
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
								<label>Role</label> <select id="roleS" name="roleS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Status</label> <select id="statusS" name="statusS" class="form-control">
									<option selected label="Select" /></select>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Read/Unread</label> <select id="readOrUnreadS" name="readOrUnreadS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Raised By</label> <select id="raisedByS" name="raisedByS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Authorized By</label> <select id="authorizedBy" name="authorizedBy" class="form-control">
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

<!-- Raise Transfer Voucher view  -->
<div class="modal fade" id="viewAlertDet" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil fa-sm"></i> &nbsp;Alert Modal Window
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);" id="rmFgViewForm">
				<div class="col-md-12 mobile-responsive">	
				<div class="clearfix">&nbsp;</div>	
					<div class="row">
						<input type="hidden" class="form-control" id="alertIdE" disabled>
						<input type="hidden" class="form-control" id="readOrUnreadE" disabled>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>From Store/DC</label> 
								   <input type="text" class="form-control" id="fromStoreOrDcTypeE" disabled>
							</div>
							
							<input type="hidden" class="form-control" id="fromStoreOrDcIdE" disabled>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>From Store/DC Name</label> 
								   <input type="text" class="form-control" id="fromStoreOrDcNameE" disabled>
							</div>
							
							<input type="hidden" class="form-control" id="toStoreOrDcIdE" disabled>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>To Store/DC</label> 
								<input type="text" class="form-control" id="toStoreOrDcE" disabled>
							</div>
							
							<input type="hidden" class="form-control" id="toStoreOrDcNameIdE" disabled>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>To Store/DC Name</label> 
									<input type="text" class="form-control" id="toStoreOrDcNameE" disabled>
							</div>				
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Raised By</label> 
									<input type="text" class="form-control" id="raisedByE" disabled>
							</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Authorized By</label> 
								<input type="text" class="form-control" id="authorizedByE" disabled>
							</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Raised To </label>
								<input type="text" class="form-control" id="raisedToE" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Title</label>
							<input type="text" class="form-control" id="titleE" disabled>
						</div>
					</div>
					<div class="row">
							<div class="col-md-9 form-field">
								<label>Message</label>
								<textarea rows="3" cols="50" id="messageE" name="messageE" placeholder="" class="form-control" disabled></textarea>
								<!-- <input type="text" class="form-control" id="messageE" disabled> -->
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span><label>Status</label> <select id="statusE" name="statusE" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-md-9 form-field">
								<span class="required">*</span><label>Remarks</label>
								<textarea rows="3" cols="50" id="remarksE" name="remarksE" placeholder="" class="form-control"></textarea>
							</div>
					</div>
				</div>
			</form>
			<div class="modal-footer  text-center">			
				<button type="button" class="btn btn-primary btn-sm" id="updateAlert" data-dismiss="modal">
					<i class="fa fa-plus fa-lg"></i>&nbsp; Update
				</button>
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Close
				</button>
			</div>			
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/alertSearch.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>