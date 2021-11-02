<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Raviteja
	##	Date Creation 	: 	12-10-2020
	## 	Description		:	Savings Plan Reminder Report search,export functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Savings Plan Reminder Report
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
							
								<div class="col-sm-2" id="storeDc">
									<span class="required">*</span>&nbsp;<label>Scheme Type</label><div id="schemeTypeS">
									</div>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Due Date Type</label>									
									<select class="form-control" id="dueDateType" name="dueDateType">
										<option value="">--Select--</option>
										<option value="After">After</option>
										<option value="Before">Before</option>
									</select>
						    	</div>
						    	<div class="col-sm-2">
									<label>Customer Name</label><input type="text" class="form-control" placeholder="Customer Name/Id" id="custName" name="custName">
						    	</div>
						    	<div class="col-sm-2">
									<label>Customer Mobile Number</label><input type="text" class="form-control" placeholder="Customer Mobile Number" id="mobNumb" name="mobNumb">
						    	</div>
								
							</div>
						
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
						
						<div>
						<!-- JqGrid Started for search-->
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
						<!-- JqGrid Ended -->
						<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/savingsPlanRemReport.js" type="text/javascript"></script>
<style>

.dateBackground
	{
	background-color:white !important;
	}

</style>