<!-- 
	##	Author UI 		: 	Nagesh
	##  API Integration	:  	Nagesh
	##	Date Creation 	: 	22-09-2017
	## 	Description		:	Order Credit to Account - open close wise report UI and Integration.
 -->


<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Credit to Account Order wise - Open/Close
					</h1>
			</div>
			<form class="form-horizontal" id="ocaOpenClose" action="javascript: void(0)">
				<div class="mobile-responsive">
						<!-- Row 1 Started  -->
						<div class="row">						
                            <div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Date From</label>
								<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 id="fromDateC" name="fromDateC" placeholder="DD/MM/YYYY"> <label 
											for="fromDateC" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Date To</label>
								<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											name="toDateC"	id="toDateC" placeholder="DD/MM/YYYY"> <label
											for="toDateC" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
							</div>
							<input type="hidden" class="form-control" placeholder="Store Id"
									id="storeId" name="storeId">
							<div class="col-sm-2" id="storeDc">
									<label>Store Name</label><div id="storeName"></div>
							</div>						
							<div class="col-sm-2" id="storeDc">
									<label>Order No</label><div id="orderNo"></div>
							</div>
							<div class="col-sm-2" id="storeDc">
									<label>Metal Segment</label><div id="segment"></div>
							</div>
							
							<div class="col-sm-2">
								<label>Status</label>
								 <div id="status"></div>
							</div>
						</div>
						
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="searchSA" id="searchSA">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="ClearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportSA" id="exportSA">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
						    &nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="printCA" id="printCA">
								<i class="fa fa-print"></i> Print
							</button>
						</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/ocaOpenCloseReport.js"
	type="text/javascript"></script>
	
		<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>