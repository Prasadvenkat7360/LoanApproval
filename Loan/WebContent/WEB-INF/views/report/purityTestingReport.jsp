<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Ravi Teja
	##	Date Creation 	: 	18-12-2019
	## 	Description		:	Purity Testing Search Report
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Purity Testing Report 
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
									<span class="required">*</span>&nbsp;<label>Vendor Code</label> <div id="vendorCodeS"></div>
								</div>
								<div class="col-sm-2">
									<label>Lot Number</label> 
									<input type="text" class="form-control"
									placeholder="Lot No" id="lotNoS" name="lotNoS"> <input
									id="lotNoS-value" type="hidden" >
								</div>
								<div class="col-sm-2">
									<label>Segment</label> <select id="segmentS" name="segmentS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<label>Assayer Code</label>
									<input type="text" class="form-control"
									placeholder="Assayer Codes" id="assyrCodeS" name="assyrCodeS"> <input
									id="assyrCodeS-value" type="hidden" >
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



<script src="resource/oe/assets/js/app/purityTestingReport.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>