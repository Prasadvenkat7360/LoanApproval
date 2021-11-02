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
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Generate Promotion Events</h1>
					<h1 id="home1"><i class="fa fa-desktop"></i> &nbsp; Generate Promotion Events - Create</h1>
					
					<div class="heading-block-action">
						<button class="btn btn-primary"  type="button" id="createEvent">
								<i class="fa fa-plus"></i> &nbsp;Create
						</button>
						<button class="btn btn-primary"  type="button" id="goBack">
								<i class="fa fa-chevron-left"></i> &nbsp;Back
						</button>
					</div>
				</div>
					<form class="form-horizontal" id="raiseTvForm">
							<!-- Row 1 Started  -->
							<div id="searchSection">
						<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
							   <div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<label>Promo Type</label><div id="promoTypeS"></div>
								</div>
								<div class="col-sm-2">
									<label>Country</label>
									<select id="countryS" name="countryS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
							
							<div class="col-sm-2">
								<label>State</label> <select id="stateS" name="stateS" class="form-control">
									<option value="" label="--Select--" />	</select>
							</div>
							
							<div class="col-sm-2">
								<label>City</label><div id="cityS"></div>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div class="row">
						
						<!-- JqGrid Started for search-->
						<div class="col-sm-1"></div>
						<div class="col-sm-10">
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div></div>
						<div class="col-sm-1"></div>
						<!-- JqGrid Ended -->
						<div class="clearfix">&nbsp;</div>	
						</div>
						<div id="createSection">
							<div class="row">
								<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Store Name</label>
									<select id="storeNameC" name="storeNameC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<input type="hidden" id="countryIdC" />
									<span class="required">*</span>&nbsp;<label>Country</label><input type="text" class="form-control" placeholder="Country" id="countryC" name="countryC" disabled>
						    	</div>
							
								<div class="col-sm-2">
									<input type="hidden" id="stateIdC" />
									<span class="required">*</span>&nbsp;<label>State</label><input type="text" class="form-control" placeholder="State" id="stateC" name="stateC" disabled>
						    	</div>
							
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>City</label><div id="cityC"></div>
								</div>
								<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Promotion Type</label>
									<select id="promoTypeC" name="promoTypeC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Mode</label>
									<select id="modeC" name="modeC" class="form-control">
										<option value="" selected label="Select" />
										<option value="Mail">Mail</option>
									</select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Customer Type</label><div id="custTypeC"></div>
								</div>
						</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="sendEvent" id="sendEvent">
								<i class="fa fa-plus fa-lg"></i> Save
							</button>							
							<button id="back" class="btn btn-warning btn-sm voffset" type="button">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
						</div>
						</div>
				</form>
				
			</div>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/generatePromoEvents.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
	.intHead{
	padding: 15px;
	text-align: center;
	}
	.textArea{
		display: block !important;
		border: none;
	}
	.currDate{
		display: block !important;
		border: none !important;
		margin-left: 40px !important;
    	margin-top: -24px !important;
	}
	.sub{
	border-left: none;
    border-top: none;
    border-right: none;
    border-bottom-color: black;	}
    
   .sub1{
	border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: none;
    	}
	
	.radio-inline{
    padding-top: 7px;
    margin-top: -10px !important;
    margin-bottom: 0;
    margin-left: 5px !important;}
    
    .intHead1{
    	float :left;
    }
</style>