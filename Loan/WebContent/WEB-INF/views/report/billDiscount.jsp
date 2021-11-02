<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Nageshwar Rao
	##	Date Creation 	: 	05-10-2017
	## 	Description		:   Bill Discount Report Search ,Export and Print functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Bill Discount Report 
					</h1>
				</div>
					<form class="form-horizontal" id="billDiscountReportForm" action="javascript: void(0)">
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
									<label>Store Code</label>
									<select id="storeCodeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>Article Segment</label><div id="artSegS"></div>
								</div>
								<div class="col-sm-2">
									<label>Material Type</label><div id="matTypeS"></div>
								</div>
								<div class="col-sm-2">
									<label>Bill No</label> <input type="text" class="form-control" placeholder="Bill No" id="billNo" name="billNo"> 
									<input id="billNo-value" type="hidden" name="">
								</div>
								
						</div>
						<!-- Row 1 ended  -->
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
							<button name="printbdr" id="printbdr" type="button"
								class="btn btn-primary btn-sm voffset" >
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


<script src="resource/oe/assets/js/app/billDiscount.js" type="text/javascript"></script>

<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>