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
				<div id="captureUnsettingGr">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Capture Unsetting GR - Create</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromCreateGr"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
				<div class="row">
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>GR Date</label>
							 	<input type="text" class="form-control" placeholder="GR Date"
								 id="grDateC" name="grDateC" disabled>
						   </div>

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Lot No</label>
									 <select id="lotNoGrC" class="form-control" name="lotNoGrC">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>Unsetting Vendor Code/Name</label>
							 	<input type="text" class="form-control" placeholder="Unsetting Vendor Code/Name"
								 id="vendorCodeC" name="vendorCodeC" disabled>
								 <input type="hidden" class="form-control"   id="vendorCodeCId" />
								  <input type="hidden" class="form-control"   id="lossCostLabour" />
						   </div>
				</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button"
							name="addDetailsGr" id="addDetailsGr">
							<i class="fa fa-plus"></i> Add Details
						</button>
						<button type="button" class="btn btn-primary btn-sm" id="saveSplitUnsetGr" name="saveSplitUnsetGr">
							<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save
						</button>
					<button id="clear" class="btn btn-warning btn-sm voffset" type="reset">
						<i class="fa fa-times fa-lg"></i>&nbsp; Clear
					</button>
					</div>
					
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
						<div id="jqxgridS" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>	
				
				<div class="clearfix">&nbsp;</div>	
				<div style="position: relative; z-index: 1">
					<div id="stoneDiamondItemGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>	
				<div style="position: relative; z-index: 1">
					<div id="otherStoneItemGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>	
				<div style="position: relative; z-index: 1">
					<div id="preciousStoneItemGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
						<div id="accGridDet" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
			</div>
				   	
</div>
</div>
</div>
</div>
                              
<script src="resource/oe/assets/js/app/captureUnsettingGr.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/captureUnsettingForSplit.js" type="text/javascript"></script>


<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>