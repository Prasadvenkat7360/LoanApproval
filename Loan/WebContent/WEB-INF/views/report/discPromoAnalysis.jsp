<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Shree Vardhan
	##	Date Creation 	: 	04-05-2018
	## 	Description		:	Discount/Promotion Analysis search,export and print functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Discount/Promotion Analysis
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
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
									<label>Store Name</label><div id="storeName"></div>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Discount Type</label>									
									<select class="form-control" id="discTypeS" name="discTypeS">
										<option value="">--Select--</option>
									</select>
						    	</div>
						    	<div class="col-sm-2">
									<label>Transaction Type</label><div id="transcType"></div>
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
						<div class="clearfix">&nbsp;</div>
						
						<div id="totSection" style="display: none;">
							<div class="row">
								<div class="col-sm-3">
							  		 <label><b>Total Discount Amount Complimentary With Multiplier :</b></label> <input class="form-control totSec" disabled type="text" id="dvMultiplier" name="orderNumb"/>
								</div></div>
							<div class="row">
								<div class="col-sm-3">
									<label><b>Total Discount Amount Complimentary Without Multiplier : </b></label> <input class="form-control totSec" disabled type="text" id="dvWoMultiplier" name="orderNumb"/>
								</div>
							</div>
						</div>
						<!-- JqGrid Ended -->
						<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/discPromoAnalysis.js" type="text/javascript"></script>
<style>

.dateBackground
	{
	background-color:white !important;
	}
.totSec{
	    margin-top: -26px !important;
    	margin-left: 344px !important;
    	font-weight: 800;
    	color : green;
}
</style>