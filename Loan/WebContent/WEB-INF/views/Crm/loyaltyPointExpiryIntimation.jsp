<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Ravi teja
	##	Date Creation 	: 	27-11-2020
	## 	Description		:	Loyalty Points Expiry Report
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Loyalty Points Expiry Intimation Search 
					</h1>
				</div>
					<form class="form-horizontal" id="statementOfAccountForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div id="batchRunSection">
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span><label>From Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
									<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							       </div>
						   </div>
								<div class="col-sm-2">
									<span class="required">*</span><label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
								<label>Loyalty Card No</label><input type="text" class="form-control"
									placeholder="Loyalty Card No" id="loyaltyCardNo" name="loyaltyCardNo">
									<span id="lblNumOrder" class="error">Enter Valid Card No</span>
								</div>
								<div class="col-sm-2">
								<label>Customer Name</label><input type="text" class="form-control"
									placeholder="Customer Name" id="customerName" name="customerName"> 
									<span id="lblAlphaOrder" class="error">Enter Valid Name</span>
								</div>
						</div>
						<!-- Row 1 ended  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
						</div>
						</div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
						<!-- JqGrid Started for search-->
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
				
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="createIntimation" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-eye"></i> Loyalty Points Expiry Intimation -View </h3>
				
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createAvm">
				<div class="col-sm-12" id="forLpExpiry">
					<div class="row" id="createContentLp">
						<textarea  rows="15" cols="70" id="reminderContentLpC" style="margin-left: 20px; border-radius: 8px; padding :5px;">
						</textarea>
					</div>
				</div>
				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create DC Master Footer -->
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"	id="cancel"><i class="fa fa-times"></i>&nbsp;Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/loyaltyPointExpiryIntimation.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	.validateView{
	border: 1px solid red !important;
	}
	.error
    {
        color: Red;
    }
	</style>