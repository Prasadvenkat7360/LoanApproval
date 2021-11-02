<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	26-09-2017
	## 	Description		:	RM to Fg/Fg to Rm Transfer Search and Export functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; RM to FG / FG to RM Transfer Report 
					</h1>
				</div>
					<form class="form-horizontal" id="rmToFgTransferForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<label>Metal Segment</label> <select id="metalSegS" name="metalSegS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<label>From Location</label> <select id="fromLocS" name="fromLocS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<label>To Location</label> <select id="toLocS" name="toLocS" class="form-control">
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
<div class="modal fade" id="viewRmFgTransferDet" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-eye fa-sm"></i> &nbsp;RM to FG/FG to RM Transfer - View
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);" id="rmFgViewForm">
				<div class="col-md-12 mobile-responsive">	
				<div class="clearfix">&nbsp;</div>	
					<div class="row">
						<div class="col-md-12 form-field">
						    <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;Stone Details</h5>
							<div id="viewStoneDetGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
							<div class="clearfix">&nbsp;</div>						
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Accessory Details</h5>
							<div id="viewAccDetGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
						</div>					
					</div>
				</div>
			</form>
			<div class="modal-footer  text-center">			
				<button type="button" class="btn btn-warning voffset" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Close
				</button>
			</div>			
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/rmtoFgTransfer.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>