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
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Greetings to Customer Birthdays/Anniversaries Template</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary" data-toggle="modal"
								data-target="#createIntimation" type="button" id="createMail">
								<i class="fa fa-plus"></i> &nbsp;Create
						</button>
					</div>
				</div>
					<form class="form-horizontal" id="raiseTvForm">
							<!-- Row 1 Started  -->
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
								<label>Greeting Type</label>
									<select id="greetingTypeS" name="greetingTypeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
							
							<div class="col-sm-2">
								<label>Active /In-Active</label> <select id="statusS" name="statusS" class="form-control">
									<option value="" label="--Select--" />	
									</select>
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
				</form>
				
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="createIntimation" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<!--  Modal Window Content Started  -->
				<form method="POST" enctype="multipart/form-data" id="diamondCertUpload">
				<h3 class="modal-title intHead"><label id="popupheaderlabel"></label></h3>
				
				<div class="col-sm-12" id="forCustomerOrder">
					<div>						
						<div class="col-sm-12">
							<div class="row" id="row1">
								<div class="col-sm-4">
									<label><b>From :</b> </label>
									<textarea rows="9" cols="40" id="from" style="border:none;">
										C. Krishniah Chetty & Co. Pvt Ltd.
										No.35
										Commercial Street
										Bangalore - 560001
									</textarea>
									
									<!-- <div class="textArea">
										<input id="name" value="C. Krishniah Chetty & Co. Pvt Ltd" class="sub1" style="width:250px;"/>&nbsp;<br/>
										<input id="add1" value="No.35" class="sub1" style="width:250px;"/>&nbsp;
										<input id="add2" value="Commercial Street" class="sub1" style="width:250px;"/>&nbsp;
										<input id="city" value="Bangalore - 560001" class="sub1" style="width:250px;"/>&nbsp;
									</div> -->
								</div>
								<div class="col-sm-4">
								</div>
								<div class="col-sm-2">
									<label><b>Date : </b></label>
									<input type="text"  class="currDate"
										name="currDate" id="currDate" placeholder="DD/MM/YYYY">
								</div>
								<div class="col-sm-2"  style="display: none;">
									<label><b>Date : </b></label>
									<input type="hidden"  class="currDate"
										name="GreetingType" id="GreetingType">
								</div>
								<div class="col-sm-2"  style="display: none;">
									<label><b>Date : </b></label>
									<input type="hidden"  class="currDate"
										name="Mode" id="Mode">
								</div>
								<div class="col-sm-2" style="display: none;">
									<label><b>Date : </b></label>
									<input type="hidden"  class="currDate"
										name="Text" id="Text">
								</div>
								<div class="col-sm-2" style="display: none;">
									<label><b>Date : </b></label>
									<input type="hidden"  class="currDate"
										name="Id" id="Id">
								</div>
							</div>
							<div class="row intHead" style="margin-left:-30px;" id="row2">
								<b id="subjc"> </b> 
							</div>
							
							<div class="row">
								&nbsp;&nbsp;<label><b style="margin-left: 8px;">Dear Mr./Mrs./Ms.</b></label><br/>
							</div>
							
							<div class="clearfix">&nbsp;</div>
							<span class="required">*&nbsp;</span><div class="row" id="createContent">
								<textarea  rows="15" cols="70" id="mailContent" style="margin-left: 20px; border-radius: 8px;"></textarea>
								
								<div id="create-content" style="margin-left: 20px;"> </div>
								
							</div>
							
							<div class="row" id="editContent">
								<input type="hidden" id="promoIdE" />
								<textarea rows="15" cols="70" id="mailContentE" style="margin-left: 20px; border-radius: 8px;"></textarea>
								
								<div id="page-content" style="margin-left: 20px;"> </div>
							</div>
							
							
							
							<div class="clearfix">&nbsp;</div>
							
							<div class="row intHead intHead1">
								<i><b style="float: left;">For :</b></i> &nbsp; <b> C. Krishniah Chetty & Co. Pvt Ltd</b>
							</div><br/>
							
							<div class="row" id="addRowSectionEdit">
								<div class="col-md-12 form-field">
									<div class="col-sm-6 pull-left">
										<div class="btn btn-primary btn-sm col-sm-4" style="padding: 5px">
											<i class="fa fa-search fa-lg"></i> Browse 
												<input id='abSig'  style="width:100px;"  class="fileUpload btn btn-primary input-sm" type="file" name="abSig"/>
										</div>
									</div>
									
								</div>
							</div>
							<div class="row">
								<label id="imgName" style="margin-left:30px;"></label>
							</div>
						</div>
					</div>
				</div>
				
				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create DC Master Footer -->
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-primary btn-sm" id="saveIntimation" name="saveIntimation"><i class="fa fa-save"></i>&nbsp;Save</button>
					<button type="button" class="btn btn-primary btn-sm" id="updateIntimation" name="updateIntimation"><i class="fa fa-save"></i>&nbsp;Update</button>
					
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"	id="cancel"><i class="fa fa-times"></i>&nbsp;Cancel</button>
					<button type="button" class="btn btn-warning btn-sm"	id="clear"><i class="fa fa-times"></i>&nbsp;Clear</button>
					
				</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/greetingsToCustBdyOrAnvTemplate.js" type="text/javascript"></script>
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
    
    .subP{
    	font-size: initial;
    	color: #d9534f; 
    	font-weight: 600;
    	width: 220px;
    }
    
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