<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	19-12-2019
	## 	Description		:	Statement of Account Report
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Customer Order Statement of Account  
					</h1>
					<div class="heading-block-action">
						<button id="goBack" class="btn btn-primary" type="button">
								<i class="fa fa-arrow-left fa-lg"></i>&nbsp; Back
						</button>
 					</div>
				</div>
					<form class="form-horizontal" id="statementOfAccountForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div id="batchRunSection">
						<div class="row">
						<div class="col-md-6">
							<button class="btn btn-primary" data-toggle="modal"
								data-target="#createAdjusVouchr" type="button" id="batchRun">
								<i class="fa fa-plus"></i> &nbsp;Batch Run
							</button>
							<button class="btn btn-primary" type="button" id="indvOrdNo">
							<i class="fa fa-plus"></i> &nbsp;Individual Order Number
							</button>
						</div>
						</div>
						<!-- Row 1 ended  -->
						<div class="clearfix">&nbsp;</div>
						
						</div>
						<div id="indOrdNumSection">
							<div class="col-sm-2">
								<span class="required">*</span><label>Order Number</label> <input class="form-control" type="text" id="orderNumb" name="orderNumb"/>
							</div>
							<button class="btn btn-primary btn-sm voffset" style="margin-top:20px;" type="button" name="indvBatch" id="indvBatch">
								<i class="fa fa-search fa-lg"></i> Run Batch
							</button>							
							<button id="clear" class="btn btn-warning btn-sm voffset" style="margin-top:20px;" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
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



<script src="resource/oe/assets/js/app/statementOfAccount.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>