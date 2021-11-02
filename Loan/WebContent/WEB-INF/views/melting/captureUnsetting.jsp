<!-- 
	##	Author UI 		: 	Mani prasad
	##  API Integration	:   Dipankar
	##  JAVA			: 	Venkat
	##	Date Creation 	: 	06-06-2017
	## 	Description		:	CAPTURE UNSETTING DETAILS
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div id="cuSearchSection">
					<!--  capture unsetting Header Started -->
					<div class="heading-block">
						<h1><i class="fa fa-desktop"></i> &nbsp; Capture Unsetting Details</h1>						
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="create" type="button" onclick="createFunc();"><i class="fa fa-plus"></i>&nbsp;Create </button>					
						</div>
					</div>
						
					<form class="form-horizontal" id="captureUnsettingForm">
							<div class="row">
								<div class="col-sm-2">
									<label>From Date</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"	name="fromDate" id="fromDate" placeholder="From Date"> 
										<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
											
								<div class="col-sm-2">
									<label>To Date</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="toDate" id="toDate" placeholder="To Date"> 
										<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
										
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Metal Segment</label> 
									<select id="metalSegmentS" name="metalSegmentS" class="form-control"><option value="" label="--Select--" /></select>
								</div>
								
								
								<div class="col-sm-2">
									<label>Purity</label> 
									<select id="purityS" name="purityS" class="form-control"><option value="" label="--Select--" /></select>
								</div>
								
								<div class="col-sm-2">
							 		<label>Item Vendor Code</label> 
									<input type="text" class="form-control" placeholder="Item Vendor Code" id="vendorCode" name="vendorCode">
									<input id="vendorCode-value" type="hidden" name="code">
								</div>
								<div class="col-sm-2">
									<label>Unsetting Vendor Code</label> 
									<input type="text" class="form-control" placeholder="Unsetting Vendor Code" id="unsettingVendorcode" name="unsettingVendorcode">
									<input id="unsettingVendorcode-value" type="hidden" name="code">
								</div>
								
							</div>
							<!-- row 2 -->
							
							<div class="row">
								
								
									<div class="col-sm-2">
									<label>Unsetting LOT No.</label> 
									<input type="text" class="form-control" placeholder="Unsetting Lot" id="unsettingLot" name="unsettingLot">
								</div>
									
								<div class="col-sm-2">
								 	<label>Open/Close</label> 
									<select id="openCloseS" name="openCloseS" class="form-control"><option value="" label="--Select--" /></select>
								</div>
								
							</div>							
					</form>
							
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>
						&nbsp;
						<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
						&nbsp;
						<button class="btn btn-primary btn-sm voffset" type="button" name="export" disabled id="export"><i class="fa fa-file-excel-o fa-lg"></i> &nbsp; Export</button>
						&nbsp;
						<button class="btn btn-primary btn-sm voffset" type="button" name="print" disabled id="print"><i class="fa fa-print fa-lg" ></i>&nbsp; Print</button>
						&nbsp;
						<button class="btn btn-primary btn-sm voffset" type="button" id="createGr" onclick="javascript:showContentPage('captureUnsettingMiv', 'bodySwitcher')">
							<i class="fa fa-plus"></i>&nbsp;Create GIV
						</button>	
						&nbsp;
						<!-- <button class="btn btn-primary voffset" type="button" name="createGr" id="createGr"><i class="fa fa-plus fa-lg"></i> &nbsp; Create GR</button> -->	
						<button class="btn btn-primary btn-sm voffset" type="button" id="createGrC" onclick="javascript:showContentPage('unsettingGrCreate', 'bodySwitcher')">
							<i class="fa fa-plus"></i>&nbsp; Create IGR
						</button>			
					</div>
					
					<div class="clearfix">&nbsp;</div>
					
					<!-- JqGrid Started for search -->
					<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; margin-top: 3px; font-family: Verdana; z-index: 1; position: relative; width: 100%;"></div>
					</div>
				
				</div>
				<div id="createCUSection">			
					<div class="heading-block">
						<h1><i class="fa fa-desktop"></i> &nbsp; Capture Unsetting Details - Create</h1>
						<div class="heading-block-action">
							<a class="btn btn-primary btn-sm" href="javascript:showContentPage('captureUnsetting', 'bodySwitcher');" id="goBack" type="button" ><i class="fa fa-arrow-left"></i>&nbsp;Go Back </a>					
						</div>	
					</div>
					<!--  Modal Window Content Started  -->
					<form class="form-horizontal" action="javascript:void(0);" id="cuUnseetingCreateForm">
							<div class="clearfix">&nbsp;</div>
							<!-- Row 1 Started  -->
							<div class="row">						
							
								<div class="col-sm-2">
									<span class="required">*</span><label>Unsetting Metal Type</label>
									<select name="unsettingMetalType" class="form-control" id="unsettingMetalType">
										<option value="" selected label="--Select----" />
									</select>
								</div>
									
								<div class="col-sm-2">
									<span class="required">*</span><label>Unsetting Type</label>
									<select name="unsettingType" class="form-control" id="unsettingType">
										<option value="" selected label="--Select----" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span><label>Purity</label>
									<select name="purity" class="form-control" id="purity"><option value="" selected label="--Select----" /></select>
								</div>
									
								<div class="col-sm-2">
									<span class="required">*</span><label>Unset Receipt 3<sup>rd</sup> Party Code</label>
									<select name="uVendor" class="form-control" id="uVendor"><option value="" selected label="--Select----" /></select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span><label>Ref. Doc. Type</label>
									<select name="refDoctype" class="form-control" id="refDoctype"><option value="" selected label="--Select----" /></select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span><label>Ref. Doc. No.</label>
									<input type="text" placeholder="Ref. Doc. No." class="form-control" name="refDocNo" id="refDocNo">
								</div>
							</div>
							<!-- 2nd row -->
							<div class="row">						
								
								<div class="col-sm-2" id="reSlNoSection">
								    <span class="required">*</span><label>Ref. SRL. No.</label>
								    <select id="refSrlDocNo"	class="form-control">
										<option value="" label="--Select--" />
									</select>
									<!-- <label>Ref. SRL. No.</label>
									<input type="text" placeholder="Ref. SRL. No." class="form-control" name="refSrlDocNo" id="refSrlDocNo"> -->
								</div>
							
								<div class="col-sm-2">
									<label>Unsetting Date</label>
									<input type="text" value="" class="form-control" disabled name="unsettCreatedDate" id="unsettCreatedDate" disabled>															
								</div>							
								
								<div class="col-sm-2">
									<label>Unsetting Created By</label>
									<input type="text"  class="form-control" disabled name="unsettCreatedby" id="unsettCreatedby" disabled>	
									<input type="hidden" class="form-control" disabled name="unsettCreatedId" id="unsettCreatedId" disabled>						
								</div>
								
								<div class="col-sm-2">
									<label>Status</label>
									<input type="text" disabled class="form-control" name="stausCU" id="stausCU">
								</div>
								<div class="col-sm-2">
									<label>Jewel Type</label>
									<input type="text" disabled class="form-control" name="jTypeC" id="jTypeC">
								</div>
								
								<div class="col-sm-2">
									<label>Gross Wt.</label>
									<input type="text" disabled class="form-control" name="grossWtC" id="grossWtC">
								</div>	
							</div>
							<div class="row">
								<div class="col-sm-2">
									<label>Net Wt.</label>
									<input type="text" disabled class="form-control" name="netWtC" id="netWtC">
								</div>
								<div class="col-sm-2">
									<label>Pcs</label>
									<input type="text" disabled class="form-control" name="piecesC" id="piecesC">
								</div>
								
								<div class="col-sm-2">
									<label>Purity</label>
									<input type="text" disabled class="form-control" name="purityC" id="purityC">
								</div>
								
								<div class="col-sm-2">
									<label>Item Vendor Code</label>
									<input type="text" disabled class="form-control" name="itemVendorCodeC" id="itemVendorCodeC">
									<input type="hidden" disabled class="form-control" name="delearConsign" id="delearConsign">
								</div>
							</div>
						
							<!--3nd row  -->
						
							<div class="clearfix">&nbsp;</div>
							<button type="button" class="btn btn-primary btn-sm" id="addCUDet" name="addCUDet"><i class="fa fa-plus"></i>&nbsp;Add</button>
							<div class="clearfix">&nbsp;</div>
							
							<div class="row" id="creategrid">
								<div class="col-md-12 form-field">
									<div id="cuItemMasterGrid" style="font-size: 12px; font-family: Verdana; position: relative;"></div>
									<div id="stoneItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
									<div id="stoneOPItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
									<div id="accItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
								</div>					
							</div>
						
						<!-- Modal Create Metal Accounting Location Footer -->
						<div class="row text-center" id="footerSection">
							<button type="button" class="btn btn-primary btn-sm" id="saveCUDetails" name="saveCUDetails"><i class="fa fa-save"></i>&nbsp;Save</button>
								&nbsp;
							<a class="btn btn-primary btn-sm" href="javascript:showContentPage('captureUnsetting', 'bodySwitcher');" id="goBack" type="button" ><i class="fa fa-arrow-left"></i>&nbsp;Go Back </a>	
						</div>
					</form>
		
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
						    <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Diamond Stone Details</h5>
							<div id="viewStoneDiamondItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Precious Stone Details</h5>
							<div id="viewStonePreciousItemGrid" style="font-size: 12px; font-family: Verdana; position: relative;"></div>
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Other Stone Details</h5>
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
<script src="resource/oe/assets/js/app/captureUnsetting.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>