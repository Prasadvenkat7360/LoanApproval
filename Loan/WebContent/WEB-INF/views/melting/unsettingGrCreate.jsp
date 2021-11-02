<!-- 
	##	Author UI       : 	Raksha
	##  Author UI       :   Dipankar Naha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	23-08-2017 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block" id="unsetGrHeader">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Un-Setting GR
					</h1>
					<div class="heading-block-action">
						<button id="createUnsetGr" class="btn btn-primary btn-sm voffset" type="button">
							<i class="fa fa-plus"></i>&nbsp;Create
						</button>
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
								<span class="required">*</span>&nbsp;<label>Unset Vendor Code/Name</label>
									 <input type="text" class="form-control" placeholder="Vendor Code/Name"
									id="vendorCode" name="vendorCode"> <input
									id="vendorCode-value" type="hidden" name="code">
								</div>
								
								<div class="col-sm-2">
										<label>GR No</label><input type="text" class="form-control numeric" placeholder="GR No"
									id="grNoS" name="grNoS"> <input
									id="grNoS-value" type="hidden" name="">
								</div>
								
								<div class="col-sm-2">
								<label>Lot No</label>
									 <input type="text" class="form-control numeric" placeholder="Lot No"
									id="lotNoS" name="lotNoS"> <input
									id="lotNoS-value" type="hidden" name="">
								</div>
						    	
								<div class="col-sm-2">
									<label>GR Done By</label> <select id="grDoneByS" name="grDoneByS" class="form-control">
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
								class="btn btn-primary btn-sm voffset" disabled>
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
					<div id="unsettingGrCreate">
							<div class="heading-block">
								<h1>
									<i class=""></i> &nbsp;Unsetting GR - Create
								</h1>
								<div class="heading-block-action">
								 	<button id="goback" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse" data-target="">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Back
								</button>
								</div>
							</div>
							<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>GR Date</label>
							 	<input type="text" class="form-control" placeholder="GR Date"
								 id="grDateC" name="grDateC" disabled>
						   </div>

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Lot No</label>
									 <select id="lotNoC" class="form-control" name="lotNoC">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>Unsetting Vendor Code/Name</label>
							 	<input type="text" class="form-control" placeholder="Unsetting Vendor Code/Name"
								 id="vendorCodeC" name="vendorCodeC" disabled>
								 <input type="hidden" class="form-control"   id="vendorCodeCId" />
								  <input type="hidden" class="form-control"   id="lossCostLabour" />
						   </div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="addDetails" id="addDetails">
									<i class="fa fa-plus"></i> Add Details
								</button>
								<button type="button" class="btn btn-primary btn-sm" id="saveUnsetGr" name="saveUnsetGr">
									<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save
								</button>
							<button id="clear" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							</div>
						</div>
				</form>
				<!-- JqGrid Ended -->
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
                              
<script src="resource/oe/assets/js/app/captureUnsettingGr.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/captureUnsettingForSplit.js" type="text/javascript"></script>

<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>