<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Shree Vardhan
	##	Date Creation 	: 	13-09-2017
	## 	Description		:	Post Dated Cheques Search and Export functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Post Dated Cheque Details 
					</h1>
				</div>
					<form class="form-horizontal" id="pdcDetailsForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Cheque Date From</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"  name="chequeDateFromS" id="chequeDateFromS" placeholder="DD/MM/YYYY">
										<label for="chequeDateFromS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Cheque Date To</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" 
										name="chequeDateToS" id="chequeDateToS" placeholder="DD/MM/YYYY">
										<label for="chequeDateToS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<label>Status Input</label><div id="statusS"></div>
								</div>
								<div class="col-sm-2">
									<label>Store Id</label><div id="storeIdS"></div>
								</div>
						</div>
						<!-- Row 1 ended  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="searchPdc" id="searchPdc">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
							<button name="exportPdc" id="exportPdc" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							<button name="printPdc" id="printPdc" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
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

<script src="resource/oe/assets/js/app/pdcDetails.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>