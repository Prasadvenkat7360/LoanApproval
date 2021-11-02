<!-- 
	##	Author UI       : 	Pooja
	##  JAVA            :  Pooja
	##	Date Creation 	: 	06-06-2018
	## 	Description		:	Vendor Metal Account Statement export and print Report 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Vendor Metal Account Statement Report
					</h1>
				</div>
					<form class="form-horizontal" id="vendorMetalAccForm" action="javascript: void(0)">						
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2 form-field">
							<span class="required">*</span>&nbsp;<label>Vendor Code/Name</label> <input type="text"
								class="form-control" placeholder="Vendor Code/Name"
								id="vendorCode" name="vendorCode"> <input
								id="vendorCode-value" type="hidden" name="code">
							</div>
							<div class="col-sm-2 form-field" id="fDateS">
								<span class="required">*</span>&nbsp;<label>From Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									 name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
									<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							       </div>
						   </div>
							<div class="col-sm-2 form-field" id="tDateS">
								<span class="required">*</span>&nbsp;<label>To Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									name="toDate" id="toDate" placeholder="DD/MM/YYYY">
									<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							</div>
							
							<div class="col-sm-2 form-field">
								<span class="required">*</span>&nbsp;<label>Metal Segment</label>
									<select id="metalSegment" name="metalSegment" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
						</div>												
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							 <button name="search" id="search" type="button" class="btn btn btn-primary voffset"><i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Search</button>						 	
							<button class="btn btn-primary btn-sm voffset" type="button" name="print" id="print"><i class="fa fa-print fa-lg"></i>&nbsp; Print</button>						
							<button id="clearAll" class="btn btn-sm btn-warning voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>						
						</div>
						</form>
					</div>
				
				<div class="clearfix">&nbsp;</div>				
				
			</div>
		</div>
	</div>



<script src="resource/oe/assets/js/app/vendorMetalAccStatement.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>