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
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Intimation and Reminder Template</h1>
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
								<span class="required">*</span>&nbsp;<label>Intimation Reminder Mode</label>
									<select id="intRemModeS" name="intRemModeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Intimation Reminder Type</label>
									<select id="intRemTypeS" name="intRemTypeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
							<div class="col-sm-3">
								<span class="required">*</span>&nbsp;<label>Intimation Reminder Ref Doc Type</label>
									<select id="intRemRefTypeS" name="intRemRefTypeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
							<div class="col-sm-2">
								<label>Active /In-Active</label> <select id="statusS" name="statusS" class="form-control">
									<option value="" label="--Select--" />	
									<option value="True">Active</option>
									<option value="False">In-Active</option></select>
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
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
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
			<!-- Modal Create Dc Master Location Header -->
			<!-- <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				 Title Goes Here
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp; Customer Intimation </h3>
				
			</div> -->
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createAvm">
				<h3 class="modal-title intHead"><label id="popupheaderlabel"></label></h3>
				<input id="templateIdE" type="hidden" />
				
				<div class="col-sm-12" id="forCustomerOrder">
					<div>						
						<div class="col-sm-12">
							<div class="row">
								<div class="col-sm-4">
									<label><b>To :</b> </label>
									<div class="textArea">
										<input id="name" value="Mrs. Ramya" class="sub1" style="width:250px; margin-bottom: -10px;"/>&nbsp;<br/>
										<input id="add1" value="No.199, 4th Cross," class="sub1" style="width:250px; margin-top:-20px; margin-bottom: -10px;"/>&nbsp;<br/>
										<input id="add4" value="Telecom Layout," class="sub1" style="width:250px; margin-top:-20px; margin-bottom: -10px;" />&nbsp;<br/>
										<input id="add2" value="Srirampura, Jakkur Post," class="sub1" style="width:250px;margin-top:-20px; margin-bottom: -10px;" />&nbsp;<br/>
										<input id="add3" value="BENGALURU-560064" class="sub1" style="width:250px;margin-top:-20px; margin-bottom: -10px;"/>&nbsp;<br/>
									</div>
								</div>
								<div class="col-sm-4">
								</div>
								<div class="col-sm-2">
									<label><b>Date : </b></label><div class="textArea" id="currDate"></div>
								</div>
							</div>
							
							<div class="row intHead">
								<b>Sub : Order No:</b><input id="orderNo" class="sub" />&nbsp;<b>Dated : </b> <input class="sub" id="orderDated" /> 
							</div>
							
							<div class="row">
								<b>Dear </b> <input id="name" value="Mrs. Ramya," class="sub1" />&nbsp;<br/>
							</div>
							
							<div class="clearfix">&nbsp;</div>
							<div class="row" id="createContent">
								<textarea  rows="15" cols="70" id="mailContent" style="margin-left: 20px; border-radius: 8px;"></textarea>
							</div>
							<!-- <div class="row" id="createContentS">
								<textarea  rows="15" cols="70" id="dummyContent" style="margin-left: 20px; border-radius: 8px;"></textarea>
							</div> -->
							<div class="row" id="editContent">
								<textarea rows="15" cols="70" id="mailContentE" style="margin-left: 20px; border-radius: 8px;"></textarea>
							</div>
							
							<div class="clearfix">&nbsp;</div>
							<div class="row">
								<b>Yours Sincerely, </b> <br/>
								<b> for Krishniah Chetty & Co.,</b>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row">
								<b>(Authorized Signatory) </b> <br/>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row">
								<p><b><u>P.S. :</u> </b>
								Please bring your Original Order Form with you for delivery. To protect your interest, Jewellery 
								will not be delivered without the Original Order Form. Metal rates and interest clauses 
								shall be applied as per terms & conditions of Order, as printed on the reverse of the Order Form. 
								</p>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row">
								<p>
								For further information, please Contact : <b><u>+91-80-41135988</u></b>
								</p>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row">
								<p>Store timings: <b>11:00 am to 08.00 pm (Monday to Sunday).</b></p>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row">
								<p>Other holidays, if any, are listed below</p>
							</div>
							<div class="row" > 
							<textarea rows="6" cols="70" id="holidayList" disabled style="border-radius: 8px; border: none;"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-12" id="forApprovalBill">
				<div class="row">
					<div class="col-md-3">
						<b>Interval in Days:</b><input class="form-control" id="intervalC" style="margin-left:105px; margin-top:-20px;" disabled/>
					</div>
				</div>
				<div class="clearfix">&nbsp;</div>
				
				<div class="row" style="margin-left:5px;">
					<b>Approval Bill No:</b><input id="abId" class="sub1" value="12345"/><br/>
					<b>Approval Bill Srl No:</b><input id="abSrlNo" class="sub1" value="1"/><br/>
					<b>Approval Bill Date:</b><input id="abDate" class="sub1" value="12/08/2020"/><br/>
					<b>Approval Bill Due Date:</b><input id="abDueDate" class="sub1" value="12/08/2020"/><br/>
					<b>Customer Name:</b><input id="custName" class="sub1" value="Mrs. Ramya"/>&nbsp;
				</div>
				<div class="clearfix">&nbsp;</div>
					<div class="row" id="createContentR">
						<textarea  rows="15" cols="70" id="reminderContent" style="margin-left: 20px; border-radius: 8px;"></textarea>
					</div>
					
					<div class="row" id="createContentER">
						<textarea  rows="15" cols="70" id="reminderContentE" style="margin-left: 20px; border-radius: 8px;"></textarea>
					</div>
				<div class="row" id="storeFlagC">
					<div class="col-sm-6">
						<label>Store :</label><label class="radio-inline"><input
							type="radio" id="storeS" value="Yes" name="storeS">Yes</label>
						<label class="radio-inline"><input type="radio"
							id="storeS" value="No" name="storeS">No</label>
					</div>
				</div>
				<div class="row" id="storeFlagE">
					<div class="col-sm-6">
						<label>Store :</label><label class="radio-inline"><input
							type="radio" id="storeE" value="Yes" name="storeE">Yes</label>
						<label class="radio-inline"><input type="radio"
							id="storeE" value="No" name="storeE">No</label>
					</div>
				</div>
				<div class="clearfix">&nbsp;</div>
				
				<div class="row">
				<div class="col-sm-6">
					<b>Contact : +91-80-41135988</b></div>
				</div>
				</div>
				<div class="col-sm-12" id="forLpExpiry">
					<div class="row">
						<div class="col-sm-6">
							<b>Dear </b> <input id="name" value="Mrs. Ramya," class="sub1" />&nbsp;<br/>
						</div>
					</div>
					<div class="row intHead intHead1">
						<b>Sub : Expiry of Loyalty Points</b>
					</div>
					
					<div class="row" id="createContentLp">
						<textarea  rows="15" cols="70" id="reminderContentLpC" style="margin-left: 20px; border-radius: 8px;">
						</textarea>
					</div>
					
					<div class="row" id="createContentLp">
						<textarea  rows="15" cols="70" id="reminderContentLpE" style="margin-left: 20px; border-radius: 8px;">
						</textarea>
					</div>
					
					<div class="row intHead intHead1">
						<p> <b>Store timings:11:00 am to 08.00 pm (Monday to Sunday).</b></p>
					</div>
					<div class="row intHead intHead1">
						<i><b style="float: left;">Note :</b></i> <br/><br/>
							<p>1. Expiry loyalty points will show before keywords <b>Reward Points.</b></p>
							<p style="margin-left: -50px;">2. Number of expiry days will show before <b> Days </b>keyword.
						</p>
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
<script src="resource/oe/assets/js/app/intimationAndReminder.js" type="text/javascript"></script>
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