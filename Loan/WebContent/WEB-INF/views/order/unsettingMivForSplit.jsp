<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Divya
	##	Date Creation 	: 	10-04-2020 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div id="captureUnsettingMIV">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Capture Unsetting MIV - Create</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromCreateGr"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
					<form class="form-horizontal" id="capUnsetMivCreateForm" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">							
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
						<span class="required">*</span><label>Unsetting Lot No.</label> 
						<select id="unsetMivLotNoC" name="unsetMivLotNoC" class="form-control">
						<option value="" label="--Select--" /></select>
						</div>		 
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Unsetting Vendor Code</label>
							<input type="text" disabled class="form-control input-sm" name="unsetMivVendCodeS" id="unsetMivVendCodeS">
							<input type="hidden" disabled class="form-control input-sm" name="unsetMivVendCodeIdS" id="unsetMivVendCodeIdS">
							
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Created By</label>
							<input type="text" disabled class="form-control input-sm" name="createdByMivS" id="createdByMivS">
						</div>							
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Created Date</label>
							<input type="text" disabled class="form-control input-sm" name="mivCreatedDateS" id="mivCreatedDateS">
						</div>	
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Metal Segment</label>
							<input type="text" disabled class="form-control input-sm" name="unsetMivMetalSegS" id="unsetMivMetalSegS">
							<input type="hidden" disabled class="form-control input-sm" name="unsetMivMetalSegIdC" id="unsetMivMetalSegIdC">
							
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Gross Weight</label>
							<input type="text" disabled class="form-control input-sm" name="unsetMivGrossWtC" id="unsetMivGrossWtC">
						</div></div>
						<div class="row">
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Net Weight</label>
							<input type="text" disabled class="form-control input-sm" name="unsetMivNetWtC" id="unsetMivNetWtC">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Pure Weight</label>
							<input type="text" disabled class="form-control input-sm" name="unsetMivPureWtC" id="unsetMivPureWtC">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Purity</label>
							<input type="text" disabled class="form-control input-sm" name="unsetMivPurityC" id="unsetMivPurityC">
						</div>
						<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 form-field" style="margin-top: 15px;">&nbsp;
								<button type="button" class="btn btn-primary btn-sm"
									id="saveSplitUnsetMiv" name="saveSplitUnsetMiv">
									<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save
								</button>
								<button type="button" id="clearMiv" class="btn btn-warning btn-sm">
									<i class="fa fa-times"></i>&nbsp;Clear
								</button>
						</div>
						</div>
						
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="capUnsetMivSplit">
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