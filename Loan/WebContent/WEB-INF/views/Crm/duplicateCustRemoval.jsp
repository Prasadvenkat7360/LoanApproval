<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Manne Ravi teja
	##	Date Creation 	: 	27-02-2020 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Deletion of Duplicate Customer</h1>
				</div>
					<form class="form-horizontal" id="raiseTvForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<label>Alphabetical Order</label>
								<input type="text"  class="form-control input-sm" placeholder="Alphabetical Order" name="alphabeticalOrder" id="alphabeticalOrder">
								<span id="lblAlphaOrder" class="error">Enter Valid Name</span>
								
							</div>
							<div class="col-sm-2">
								<label>Email-Id</label>
								<input type="text"  class="form-control input-sm" placeholder="Email-Id" name="emailId" id="emailId">
								<span id="lblEmail" class="error">Invalid Email-Id</span>
							</div>
							<div class="col-sm-2">
								<label>Phone Number</label>
								<input type="text"  class="form-control input-sm" placeholder="Phone Number" name="phoneNumber" id="phoneNumber" >
								<span id="lblPhoneNumber" class="error">Invalid Phone Number</span>
								
							</div>
							<div class="col-sm-2" style="margin-top: 20px;">
								<button class="btn btn-primary" type="button" id="search"><i class="fa fa-search fa-lg"></i>Search</button>
								<button class="btn btn-primary" type="button" id="clear"><i class="fa fa-times fa-lg"></i>Clear</button>
								
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div class="row">
						<div class="col-sm-6">
						<!-- JqGrid Started for search-->
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
						<div class="col-sm-6">
						<!-- JqGrid Started for search-->
							<div style="position: relative; z-index: 1">
								<div id="jqxgridR" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
						</div>
						<!-- JqGrid Ended -->
						<div class="clearfix">&nbsp;</div>	
				</form>
				
			</div>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/duplicateCustRemoval.js" type="text/javascript"></script>
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