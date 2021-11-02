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
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Loyalty Statement - Search </h1>
					
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
									<label>Mode</label>
									<select id="modeS" name="modeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>Loyalty Card Number</label>
									<input id="cardNoS" name="cardNoS" class="form-control"/>
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
									<span class="required">* &nbsp;</span><label>From Month/Year</label>
										<input id="Fmonth" type="month" name="month" class="fmonyear">
								</div>
								<div class="col-sm-2">
									<span class="required">* &nbsp;</span><label>To Month/Year</label>
										<input id="Tmonth" type="month" name="month" class="fmonyear">
								</div>
								<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Mode</label>
									<select id="modeC" name="modeC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>Loyalty Card No</label><input type="text" id="cardNoC" name="cardNoC" class="form-control" placeholder="Card No"/>
									<span id="lblIntOrder" class="error">Enter Valid Card No</span>
									
								</div>
								
								<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Customer Type</label>
									<select id="custTypeC" name="custTypeC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								
							
						</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="sendLS" id="sendLS">
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

<div class="modal fade" id="createIntimation" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createAvm">
				<h3 class="modal-title intHead"><label id="popupheaderlabel"></label> Loyalty Statement - View</h3>
				<input id="templateIdE" type="hidden" />
				
				<div class="col-sm-12" id="forCustomerOrder">
					<div>						
						<div class="col-sm-12">
							<div class="row">
								<div class="col-sm-4">
								</div>
								<div class="col-sm-4">
								</div>
								<div class="col-sm-2">
									<label><b>Date : </b></label>
									<input type="text"  class="currDate"
										name="currDate" id="currDate" placeholder="DD/MM/YYYY">
								</div>
							</div>
							
							<div class="row">
								<b>Dear </b> <input id="name" value="Mrs. Ramya," class="sub1" />&nbsp;<br/>
							</div>
							
							<div class="row intHead intHead1 mailPost">
								<b>Sub : </b> Card No.<b> Loyalty Point Statement .</b>
							</div>
							
							<div class="clearfix">&nbsp;</div>
							<span class="required">*&nbsp;</span>
							<div class="row" id="createContent">
								<textarea  rows="15" cols="70" id="mailContent" style="margin-left: 20px; border-radius: 8px;" disabled></textarea>
							</div>
							
							
							<div class="clearfix">&nbsp;</div>
							<div class="row mailPost">
								<i><b style="float: left;">Store Timings : 10:30 AM to 8:30 PM </b></i><br/>
							</div>
							
							<div class="clearfix">&nbsp;</div>
							<div class="row mailPost">
								<i><b style="float: left;">For : C. Krishniah Chetty & Co. Pvt Ltd</b></i> 
							</div>
							
							<div class="clearfix">&nbsp;</div>
							<div class="row mailPost">
								<i><b style="float: left;">(Signature)</b></i>
							</div>
							
							<div class="clearfix">&nbsp;</div>
							<div class="row" id="noteClass">
								<i><b style="float: left;">Note :</b></i> <br/>
								<p style="margin-top: 10px;">1. Period: After Period Keyword From Month to To Month Year will show</p>
								<p>2. Call: After Call keyword CRM person Name from CRM_PERSON_NAME parameter will show</p>
								<p>3. Contact No.: After Contact No. Keyword Phone No from CRM_Contact_Nos parameter will show.</p>
								<!-- 
								<p class="smsWap">4. Card Number: After Card Number Keyword Loyalty Card Number of customer will show</p>
								<p class="smsWap">5. Balance: After Balance Keyword, Loyalty Balance will show</p> -->
							</div>
						</div>
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

<script src="resource/oe/assets/js/app/loyaltyStatementSearch.js" type="text/javascript"></script>
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
    .fmonyear{
    width: 200px !important;
    height: 24px !important;
    margin-left: 12px !important;
    }
</style>