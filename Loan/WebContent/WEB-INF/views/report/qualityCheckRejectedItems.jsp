<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Manoranjan 
	##	Date Creation 	: 	29-09-2017
	## 	Description		:	Quality Check Rejected Item Details Search,Export and Print Funtionality
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Quality Check Rejected Items Report 
					</h1>
				</div>
					<form class="form-horizontal" id="qcRejectedItemsDetForm" action="javascript: void(0)">
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
									<label>Vendor Code</label><div id="vendorCodeS"></div>
								</div>
								
								<div class="col-sm-2">
									<label>Article Description</label><div id="artSegS"></div>
								</div>
								<!-- <div class="col-sm-2">
									<label>Location</label><div id="locS"></div>
							</div> -->
							<div class="col-sm-2">
									<label>GIV Type</label> <select id="mivTypeS" name="mivTypeS" class="form-control">
										<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>GIV No</label><input type="text" class="form-control" placeholder="GIV No" id="mivNoS" name="mivNoS">
							</div>
						</div>
						<div class="row">
							
						    
						    <div class="col-sm-2">
								<label>PSR No</label><input type="text" class="form-control" placeholder="PSR No" id="psrNoS" name="psrNoS">
						    </div>
					   </div>
						<!-- Row 2 ended  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
							<button name="export" id="export" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-file-excel-o fa-lg" ></i>&nbsp; Export
							</button>
							<button name="printQCRJItems" id="printQCRJItems" type="button"
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


<script src="resource/oe/assets/js/app/qualityCheckRejectedItems.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>