<!-- 
	##	Author UI 		: 	Raksha
	##  API Integration	:   Raksha
	##  JAVA			: 	Venkat
	##	Date Creation 	: 	23-09-2020
	## 	Description		:	CAPTURE UNSETTING DETAILS - Report
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div id="cuSearchSection">
					<div class="heading-block">
						<h1><i class="fa fa-desktop"></i> &nbsp; Capture Unsetting Report</h1>						
					</div>
						
					<form class="form-horizontal" id="captureUnsettingForm">
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"	name="fromDate" id="fromDate" placeholder="From Date"> 
										<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
											
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="toDate" id="toDate" placeholder="To Date"> 
										<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
										
								<div class="col-sm-2">
									<label>Metal Segment</label> 
									<select id="metalSegmentS" name="metalSegmentS" class="form-control"><option value="" label="--Select--" /></select>
								</div>
								
								<div class="col-sm-2">
							 		<label>Item Vendor Code</label> 
									<input type="text" class="form-control" placeholder="Item Vendor Code" id="vendorCode" name="vendorCode">
									<input id="vendorCode-value" type="hidden" name="code">
								</div>
								
								<div class="col-sm-2">
									<label>Unsetting LOT No.</label> 
									<input type="text" class="form-control" placeholder="Unsetting Lot" id="unsettingLot" name="unsettingLot">
									</div>
								</div>
					</form>
					<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>
						&nbsp;
						<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
						&nbsp;
						<button class="btn btn-primary btn-sm voffset" type="button" name="export"  id="export"><i class="fa fa-file-excel-o fa-lg"></i> &nbsp; Export</button>
						&nbsp;
						<button class="btn btn-primary  btn-sm voffset" type="button" name="export" disabled id="print"><i class="fa fa-print fa-lg" ></i>&nbsp; Print</button>
					</div>
					
					<div class="clearfix">&nbsp;</div>
					
					<!-- JqGrid Started for search -->
					<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; margin-top: 3px; font-family: Verdana; z-index: 1; position: relative; width: 100%;"></div>
					</div>
				
				</div>
				
			</div>
		</div>
	
		
	</div>
</div>

<!-- Capture Un-setting details view  -->

<div class="modal fade" id="viewCapturedetail" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Capture Unsetting Details - View
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);" id="editStoreDetailsForm">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Pcs</label>
							<input type="text" disabled class="form-control input-sm" name="totalPieces" id="totalPieces" placeholder="Total Pcs">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Gross Wt</label>
							<input type="text" disabled class="form-control input-sm" name="totalGwt" id="totalGwt" placeholder="Total Gross Wt">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Net Wt</label>
							<input type="text" disabled class="form-control input-sm" name="totalNwt" id="totalNwt" placeholder="Total Net Wt">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Pure Wt</label>
							<input type="text" disabled class="form-control input-sm" name="totalPurewt" id="totalPurewt" placeholder="Total Pure Wt">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Metal Value</label>
							<input type="text" disabled class="form-control input-sm" name="totalMetalval" id="totalMetalval" placeholder="Total Metal Value">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Line Item Cost</label>
							<input type="text" disabled class="form-control input-sm" name="totalItemCost" id="totalItemCost" placeholder="Total Item Cost">
						</div>
					</div>
					
					
					<div class="row">
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Stone Pcs</label>
							<input type="text" disabled class="form-control input-sm" name="stoneTotalPcs" id="stoneTotalPcs" placeholder="Stone Total Pcs">
						</div>
					
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Stone Wt.</label>
							<input type="text" disabled class="form-control input-sm" name="stoneTotalGwt" id="stoneTotalGwt" placeholder="Stone Total Wt">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Stone Cost</label>
							<input type="text" disabled class="form-control input-sm" name="stoneTotalCost" id="stoneTotalCost" placeholder="Stone Total Cost">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Acc.  Pcs</label>
							<input type="text" disabled class="form-control input-sm" name="accTotalPcs" id="accTotalPcs" placeholder="Acc. Total Pcs">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Acc Wt.</label>
							<input type="text" disabled class="form-control input-sm" name="accTotalGwt" id="accTotalGwt" placeholder="Acc. Total Gross Wt.">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Total Acc. Cost</label>
							<input type="text" disabled class="form-control input-sm" name="accTotalCost" id="accTotalCost" placeholder="Acc. Total Cost">
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="creategrid">
						<div class="col-md-12 form-field">
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Stone Details</h5>
							<div id="viewStoneOtherItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>							
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Accessory Details</h5>
							<div id="viewAccItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
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

<!-- Metal Color Type Create Window Started -->

<!-- Metal Color Type Create Window Ended -->
<script src="resource/oe/assets/js/app/captureUnsettingReport.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>