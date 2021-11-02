<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	18-08-2017 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Raise Transfer Voucher</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm voffset" type="button" id="rtvCreate"	onclick="javascript:showContentPage('metalTransferVoucherCreate', 'bodySwitcher')"><i class="fa fa-plus"></i>&nbsp;Create</button>
					</div>
				</div>
					<form class="form-horizontal" id="raiseTvForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
									<div class="input-group">
										<input type="text" readonly class="date-picker form-control dateBackground"	name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							       </div>
							   </div>
							   
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
									<div class="input-group">
										<input type="text" readonly class="date-picker form-control dateBackground"	name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Metal Segment Id</label>
									<select id="metalSegS" name="metalSegS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>TV Type</label> 
									<select id="tvTypeS" name="tvTypeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
								<label>TV No</label>
								<input type="text" class="form-control" placeholder="TV No" id="tvNoS" name="tvNoS">
						    	</div>
						    	
								<div class="col-sm-2">
									<label>Store/DC</label> 
									<select id="storeOrDcS" name="storeOrDcS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
						</div>
						<div class="row">				
							<div class="col-sm-2">
								<label>Store/DC Name</label> 
								<select id="storeDcNameS" name="storeDcNameS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>From Location</label> 
								<select id="fromLocS" name="fromLocS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>To Location</label> 
								<select id="toLocS" name="toLocS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Current Zone Id</label> 
								<select id="cZoneIdS" name="cZoneIdS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						</div>
						<!-- Row 2 Ended  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>							
							<button name="export" id="export" type="button"	class="btn btn-primary btn-sm voffset"><i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export</button>
							<button name="print" id="print" type="button"	class="btn btn-primary btn-sm voffset" disabled><i class="fa fa-print fa-lg"></i>&nbsp; Print</button>
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
<div class="modal fade" id="viewRtvDetails" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Raise Transfer Voucher - View
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);" id="rtvDetailsViewForm">
				<div class="col-md-12">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-sm-2">
							<label>TV No</label>
							<input type="text" disabled class="form-control input-sm" placeholder="TV No" name="tvNo" id="tvNo">
						</div>	
					</div>
					<div class="clearfix">&nbsp;</div>
							
					<div class="row" id="creategrid">
						<div class="col-sm-12 form-field">
						    <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;Stone Details</h5>
							<div id="viewStoneDetGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>						
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Accessory Details</h5>
							<div id="viewAccDetGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
						</div>					
					</div>
				</div>
			</form>
			<div class="modal-footer  text-center">			
				<button type="button" class="btn btn-warning btn-sm voffset" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Close
				</button>
			</div>			
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/metalTransferVoucher.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>