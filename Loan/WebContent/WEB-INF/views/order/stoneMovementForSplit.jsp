<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Divya
	##	Date Creation 	: 	22-04-2020 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div id="captureUnsettingGr">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Create Stone Movement</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromMovement"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
				<div class="row">
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Movement Type</label>
							 	<input type="text" class="form-control" placeholder="Movement Type"
								 id="movTypeC" name="movTypeC" disabled>
						 </div>
						 <div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>To</label>
							 	<input type="text" class="form-control" placeholder="To"
								 id="toTypeC" name="toTypeC" disabled>
						 </div>
						 
						 <div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Stock No</label>
							 	<input type="text" class="form-control" placeholder="Stock No"
								 id="stockNoC" name="stockNoC">
						 </div>
						 <div class="col-sm-2">
							<span class="required">*</span><label>Order No</label><div id="orderNoC"></div>
						</div>

				</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button"
							name="searchSM" id="searchSM">
							<i class="fa fa-search fa-lg"></i> Search
						</button>
						<button id="clearSM" class="btn btn-warning btn-sm voffset" type="button">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
					</div>
					
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>	
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				<div class="row voffset2" align="center">
				<div class="clearfix">&nbsp;</div>
					<button type="button" class="btn btn-primary btn-sm" id="saveStoneMove" name="saveStoneMove" style="margin-top:10px;"><i class="fa fa-save"></i>&nbsp;Save</button>
				</div>
			</div>
				   	
</div>
</div>
</div>
</div>
                              
<script src="resource/oe/assets/js/app/stoneMovementForSplit.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/captureUnsettingForSplit.js" type="text/javascript"></script>
