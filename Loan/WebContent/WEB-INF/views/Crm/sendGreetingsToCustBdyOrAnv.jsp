<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	13-01-2021 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Greetings to Customer Birthdays/Anniversaries</h1>
					
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
									<label>Greeting Type</label>
									<select id="greetingTypeS" name="countryS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>Mode</label>
									<select id="modeS" name="modeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
							<div class="col-sm-2">
								<label>Customer Type</label><div id="custTypeS"></div>
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
								<span class="required">*</span>&nbsp;<label>Mode</label>
									<select id="modeC" name="modeC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Greeting Type</label>
									<select id="greetingTypeC" name="greetingTypeC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Customer Type</label><div id="custTypeC"></div>
								</div>
								
								<div class="col-sm-2">
									<label>Customer ID</label><input type="text" id="custIdC" name="custIdC" class="form-control" placeholder="Customer Id"/>
									<span id="lblIntOrder" class="error">Enter Valid Customer Id</span>
									
								</div>
								
								<div class="col-sm-2">
									<label>Customer Name</label><input type="text" id="custNameC" name="custNameC" class="form-control" placeholder="Customer Name"/>
									<span id="lblAlphaOrder" class="error">Enter Valid Customer Name</span>
									
								</div>
						</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="sendGreeting" id="sendGreeting">
								<i class="fa fa-arrow-right fa-lg"></i> Send
							</button>							
							<button id="back" class="btn btn-warning btn-sm voffset" type="button">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div class="row">
							<div class="col-sm-4"></div>
							<div class="col-sm-4">
							<div style="position: relative; z-index: 1">
								<div id="postalGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
							</div>
							<div class="col-sm-4"></div>
						</div>
						</div>
				</form>
				
			</div>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/sendGreetingsToCustBdyOrAnv.js" type="text/javascript"></script>
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
    .validateView{
	border: 1px solid red !important;
	}
	.error
    {
        color: Red;
    }
</style>