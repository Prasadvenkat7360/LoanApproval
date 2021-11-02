<!-- 
	##	Author UI       : 	Pooja
	##  JAVA            :  Pooja
	##	Date Creation 	: 	12-06-2018
	## 	Description		:	Vendor Stone Account Statement export and print Report 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Vendor Stone Account Statement Report
					</h1>
				</div>
					<form class="form-horizontal" id="vendorMetalAccForm" action="javascript: void(0)">						
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2 form-field" id="fDateS">
								<span class="required">*</span>&nbsp;<label>From Date</label>
									<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
									 name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
									<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							     </div>
						   </div>
							<div class="col-sm-2 form-field" id="tDateS">
								<span class="required">*</span>&nbsp;<label>To Date</label>
									<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
									name="toDate" id="toDate" placeholder="DD/MM/YYYY">
									<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							</div>
							<div class="col-sm-2 form-field" id="">
								<span class="required">*</span>&nbsp;<label>Vendor Code/Name</label> <input type="text"
									class="form-control" placeholder="Vendor Code/Name"
									id="vendorCode" name="vendorCode"> <input
									id="vendorCode-value" type="hidden" name="code">
							</div>
							<div class="col-sm-2 form-field" id="">
								<span class="required">*</span>&nbsp;<label>Type</label> 
								 <div id="typeId"></div>
							</div>
							<div class="col-sm-2 form-field" id="">
								<span class="required">*</span>&nbsp;<label>Segment</label> 
								<div id="segmentId">
								</div>
							</div>
							<div class="col-sm-2 form-field">
								<span class="required">*</span>&nbsp;<label>Category</label>
									<select id="catId" name="catId" class="form-control">
										<option value="" selected label="Select" />
									</select>
							 </div>
						</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
						  <!--   <button name="export" id="export" type="button"
								class="btn btn-primary voffset btn-sm">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button> -->
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>					
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>			
						</div>
					</form>
				</div>
			<div class="clearfix">&nbsp;</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/vendorStoneAccStmt.js" type="text/javascript"></script>
