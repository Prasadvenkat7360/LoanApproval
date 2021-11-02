<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat 
	##	Date Creation 	: 	28-09-2017
	## 	Description		:	Stone Returned Wastage Received & Wastage Un-Received Search,Export and Print Funtionality
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Stones Returned Wastage Received & Wastage Un-Received 
					</h1>
				</div>
					<form class="form-horizontal" id="stoneReturnedForm" action="javascript: void(0)">						
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2 form-field">
								<span class="required">*</span>&nbsp;<label>From Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
									<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							       </div>
						   </div>
							<div class="col-sm-2 form-field">
								<span class="required">*</span>&nbsp;<label>To Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
									<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							</div>
							<div class="col-sm-2 form-field">
								<label>Order Type</label><div id="orderTypeS"></div>
							</div>
							
							<div class="col-sm-2 form-field">
							<label>GR No</label><input type="text" class="form-control" placeholder="GR No" id="grNoS" name="grNoS">
					    	</div>
					    	
					    	<div class="col-sm-2 form-field">
								<label>Vendor Code</label><div id="vendorCodeS"></div>
							</div>
							
							<div class="col-sm-2 form-field">
								<label>Order No</label><input type="text" class="form-control" placeholder="Order No" id="orderNoS" name="orderNoS">
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2 form-field">
								<label>Order Sl No</label><input type="text" class="form-control" placeholder="Order Sl No" id="orderSlNoS" name="orderSlNoS">
						    </div>
						    
						    <div class="col-sm-2 form-field">
								<label>PSR No</label><input type="text" class="form-control" placeholder="PSR No" id="psrNoS" name="psrNoS">
						    </div>
						    	
						</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-sm btn-primary voffset" type="submit" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-sm btn-warning voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
							<button name="export" id="export" type="button"
								class="btn btn-sm btn-primary voffset">
								<i class="fa fa-file-excel-o fa-lg" ></i>&nbsp; Export
							</button>
							<button name="printPdc" id="printstr" type="button"
								class="btn btn-sm btn-primary voffset">
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


<script src="resource/oe/assets/js/app/stoneReturned.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
		background-color:white !important;
	}
	#stoneReturnedForm input{
		height: 32px;
	}	
</style>