<!-- 
	##	Author UI 		: 	Pooja sangve
	## API Integration	:  	pooja sangve
	##	Date Creation 	: 	17-04-2017
	## 	Description		:	Hand Over Slip UI and Integration.
 -->


<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- HandOver Slip  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Delivery Challan
					</h1>
				</div>
				<form class="form-horizontal" id="handOverSlip" action="javascript: void(0)">
						<!-- Row 1 Started  -->
						<div class="row">						
                              <div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
								<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground" id="fromDateC"
											name="fromDateC" placeholder="DD/MM/YYYY"> <label 
											for="fromDateC" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
								<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											name="toDateC"	id="toDateC" placeholder="DD/MM/YYYY"> <label
											for="toDateC" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>
								 <input
									type="hidden" class="form-control" placeholder="From DC"
									id="fromDCId" name="fromDCId">
							<div class="col-sm-2">
								<label>From DC/Store Name</label> <input type="text"
									class="form-control" id="fromDcStoreNmeC" disabled>
							</div>							
							<div class="col-sm-2">
								<label>Store/DC</label> <select id="storeDcC"
									name="storeDcC" class="form-control">
									<option value="" label="--Select--" />									
								</select>
							</div>
							<div class="col-sm-2" id="storeLov">
								<label>Store/DC Name</label> <div id="storeDcNmeC"
									name="storeDcNmeC" ></div>
									
							</div>
							<div class="col-sm-2" id ="tozoneObj">
								<label id="tozoneNm">To Zone Name</label>
								<div id="zoneNameC"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Material Type</label>
								<div id="matTypeC"></div>
							</div>
							
							<div class="col-sm-2">
								<label>Segment</label>
								<div id="segmentC"></div>
							</div>
							<div class="col-sm-2"  id ="tolocObj">
								<label id = "tolocName">Location Code</label>
								<div id="locTypeC"></div>
							</div>
							<div class="col-sm-2">
								<label>Ref. Doc Type</label>
								 <select id="refTypeC" 
									name="refTypeC" class="form-control">
									<option value="" label="--Select--" />
								</select>
								<!-- <input type="text" class="form-control" id="refTypeC"> -->
								<!-- <div id="refTypeC"></div> -->
							</div>
							
							<div class="col-sm-2" >
								<label>Ref. Doc No</label> <input type="text"
									class="form-control" name="refTypeNoC" id="refTypeNoC">
							</div>
							<div class="col-sm-2" id="refIdNo">
								<label>Ref. Doc Sl No</label>
								<div id="refTypeSlNoC"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Status</label>
								 <select id="statusS"
									name="statusS" class="form-control">
									<option value="" label="--Select--" />
								</select>
								<!-- <input type="text" class="form-control" id="statusS"> -->
								<!-- <div id="statusS"></div> -->
														
							</div>
						</div>

						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
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
								name="printHS" id="printHS">
								<i class="fa fa-print"></i> Print
							</button>
						     &nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="emailSA" id="emailSA">
								<i class="fa fa-envelope"></i> E-Mail
							</button>
						</div>
				</form>
				<!-- HandOver Slip Search Ended -->
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
<script src="resource/oe/assets/js/app/handOverSlip.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>