<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	22-02-2018 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block" id="unsetGrHeader">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Capture Unsetting Details - GIV
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm voffset" data-toggle="modal" data-target="#createUnsetMiv" type="button" id="creatunsetMivC"><i class="fa fa-plus"></i>
							&nbsp;Create</button>
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromCreateGr"
							href="javascript:showContentPage('captureUnsetting','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>
				</div>
				   	<form class="form-horizontal" id="captureUnsettingGrForm">
						<div id="unsetGrSearch">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<label>From Date</label><div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground" 
										name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							       </div>
							   </div> 
								<div class="col-sm-2">
									<label>To Date</label><div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
									<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
								<div class="col-sm-2">
										<label>Vendor Code</label>
									 <input type="text" class="form-control" placeholder="Vendor Code/Name"
									id="vendorCode" name="vendorCode"> <input
									id="vendorCode-value" type="hidden" name="code">
								</div>
								<div class="col-sm-2">
									<label>Metal Segment</label> <select id="segmentS" name="segmentS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<label>Lot No</label><input type="text" class="form-control" placeholder="LOT No"
									id="lotNoS" name="lotNoS"> 
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
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							<!-- <button name="print" id="print" type="button"
								class="btn btn-primary btn-sm voffset" disabled>
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button> -->
						</div>
						<div class="clearfix">&nbsp;</div>
						<!-- JqGrid Started for search-->
						<div style="position: relative; z-index: 1">
							<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
					</div>
			</form>
<div class="modal fade" id="createUnsetMiv" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;" style="width:90%;">
	<div class="modal-dialog modal-lg"  style="width:90%;">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Capture Unsetting Details - GIV 
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="capUnsetMivC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">							
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
						<label>Unsetting Lot No.</label> 
						<select id="unsetLotNoC" name="unsetLotNoC" class="form-control">
						<option value="" label="--Select--" /></select>
						</div>		 
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Unsetting Vendor Code</label>
							<input type="text" disabled class="form-control input-sm" name="unsetVendCodeS" id="unsetVendCodeS">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Created By</label>
							<input type="text" disabled class="form-control input-sm" name="createdByS" id="createdByS">
						</div>							
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Created Date</label>
							<input type="text" disabled class="form-control input-sm" name="createdDateS" id="createdDateS">
						</div>	
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Metal Segment</label>
							<input type="text" disabled class="form-control input-sm" name="unsetMetalSegS" id="unsetMetalSegS">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Gross Weight</label>
							<input type="text" disabled class="form-control input-sm" name="unsetGrossWtC" id="unsetGrossWtC">
						</div></div>
						<div class="row">
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Net Weight</label>
							<input type="text" disabled class="form-control input-sm" name="unsetNetWtC" id="unsetNetWtC">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Pure Weight</label>
							<input type="text" disabled class="form-control input-sm" name="unsetPureWtC" id="unsetPureWtC">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Purity</label>
							<input type="text" disabled class="form-control input-sm" name="unsetPurityC" id="unsetPurityC">
						</div>
						<!-- <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Pieces</label>
							<input type="text" disabled class="form-control input-sm" name="unsetMivPcsC" id="unsetMivPcsC">
						</div> -->
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="mSeg">&nbsp;
							<label>Metal Segments</label>
							<input type="text" disabled class="form-control input-sm" name="unsetMetalSegC" id="unsetMetalSegC">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="vCode">&nbsp;
							<label>Vendor Code</label>
							<input type="text" disabled class="form-control input-sm" name="unsetVendCodeC" id="unsetVendCodeC">
						</div>
						</div>
						
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="capUnsetMiv">
						<div class="col-md-12 form-field">
						    <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Diamond Stone Details</h5>
							<div id="stoneDiamondItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Precious Stone Details</h5>
							<div id="preciousStoneItemGrid" style="font-size: 12px; font-family: Verdana; position: relative;"></div>
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Other Stone Details</h5>
							<div id="otherStoneItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Accessory Details</h5>
							<div id="accGridDet" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
						</div>					
					</div>
					<div class="clearfix">&nbsp;</div>	
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			    <div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm"
					id="saveUnsetMiv" name="saveUnsetMiv">
					<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="viewUnsetMiv" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Capture Unsetting GIV Details - View
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="capUnsetMivV" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">							
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
						<label>Unsetting Lot No.</label> 
						<input type="text" disabled class="form-control input-sm" name="unsetLotNoV" id="unsetLotNoV">
						</div>		 
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Unsetting Vendor Code</label>
							<input type="text" disabled class="form-control input-sm" name="unsetVendCodeV" id="unsetVendCodeV">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Created By</label>
							<input type="text" disabled class="form-control input-sm" name="createdByV" id="createdByV">
						</div>							
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Created Date</label>
							<input type="text" disabled class="form-control input-sm" name="createdDateV" id="createdDateV">
						</div>	
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Metal Segment</label>
							<input type="text" disabled class="form-control input-sm" name="unsetMetalSegV" id="unsetMetalSegV">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Gross Weight</label>
							<input type="text" disabled class="form-control input-sm" name="unsetGrossWtV" id="unsetGrossWtV">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Net Weight</label>
							<input type="text" disabled class="form-control input-sm" name="unsetNetWtV" id="unsetNetWtV">
						</div>
						 <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Pure Weight</label>
							<input type="text" disabled class="form-control input-sm" name="unsetPureWtV" id="unsetPureWtV">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Purity</label>
							<input type="text" disabled class="form-control input-sm" name="unsetPurityV" id="unsetPurityV">
						</div>
				</div>
						
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="capUnsetMiv">
						<div class="col-md-12 form-field">
						    <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Diamond Stone Details</h5>
							<div id="stoneDiamondItemGridV" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Precious Stone Details</h5>
							<div id="preciousStoneItemGridV" style="font-size: 12px; font-family: Verdana; position: relative;"></div>
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Other Stone Details</h5>
							<div id="otherStoneItemGridV" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Accessory Details</h5>
							<div id="accGridDetV" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
						</div>					
					</div>
					<div class="clearfix">&nbsp;</div>	
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			    <div class="modal-footer  text-center">
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>

</div>
</div>
</div>
</div>
                              
<script src="resource/oe/assets/js/app/captureUnsettingCreateMiv.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/captureUnsettingForSplit.js" type="text/javascript"></script>

<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>