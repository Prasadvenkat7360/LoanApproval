<!-- 
	##	Author UI 		: 	Nagesh
	##  API Integration	:  	Nagesh
	##	Date Creation 	: 	25-09-2017
	## 	Description		:	PSR Cancellation Intimation UI and Integration.
 -->


<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; PSR Cancellation Intimation
					</h1>
			</div>
			<form class="form-horizontal" id="psrCancelIntimation" action="javascript: void(0)">
						<!-- Row 1 Started  -->
						<div class="row">						
                            <div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
								<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 id="fromDateC" onchange="listOfPSRNos()"
											name="fromDateC" placeholder="DD/MM/YYYY"> <label 
											for="fromDateC" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
								<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											name="toDateC"	id="toDateC" onchange="listOfPSRNos()" placeholder="DD/MM/YYYY"> <label
											for="toDateC" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
							</div>
							<input type="hidden" class="form-control" placeholder="Vendor Id"
									id="vendorId" name="vendorId">
							<div class="col-sm-2" id="storeLov">
								<label>Vendor Code</label> 
								<div id="vendorCode" onchange="listOfPSRNos()"></div>
							</div>						
							<div class="col-sm-2">
								<label>Order Type</label>
								 <div id="orderType" onchange="listOfPSRNos()"></div>
							</div>
							<div class="col-sm-2">
								<label>PSR No</label><input type="text" class="form-control"
									placeholder="PSR No" id="psrNo" name="psrNo"> <input
									id="psrNo-value" type="hidden" >
							</div>
						</div>
						
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="searchSA" id="searchPSR">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="ClearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="printHS" id="printPSR">
								<i class="fa fa-print"></i> Print
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="emailPSR" id="emailPSR">
								<i class="fa fa-envelope"></i> E-Mail
							</button>
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
<script src="resource/oe/assets/js/app/psrCancellationIntimation.js"
	type="text/javascript"></script>
	
	<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>