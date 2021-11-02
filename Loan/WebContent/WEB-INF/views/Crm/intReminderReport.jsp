<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat
	##	Date Creation 	: 	06-08-2020
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Intimation/Reminder Report</h1>
				</div>
					<form class="form-horizontal" id="intRemRepForm" action="javascript: void(0)">
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
								<span class="required">*</span>&nbsp;<label>Intimation Reminder Type</label>
									<select id="intRemTypeS" name="intRemTypeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Intimation Reminder Mode</label>
									<select id="intRemModeS" name="intRemModeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
							<div class="col-sm-3">
								<span class="required">*</span>&nbsp;<label>Intimation Reminder Ref Doc Type</label>
									<select id="intRemRefTypeS" name="intRemRefTypeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
							</div>
							
							<div class="row">
								<div class="col-sm-2">
									<label>Ref Doc No</label> <input type="text" class="form-control" placeholder="Order No" id="orderNo" name="orderNo"> 
								</div>
								
								<div class="col-sm-2 form-field">
								<label>Customer Name</label> <input type="text"
									class="form-control" placeholder="Customer Name"
									id="custName" name="custName"> <input
									id="custName-value" type="hidden" name="code">
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
							<button id="print" disabled type="button" class="btn btn-warning btn-sm voffset" >
								<i class="fa fa-file fa-lg"></i>&nbsp; Print
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

<div class="modal fade" id="apBillRem" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-eye fa-lg"></i> &nbsp; Approval Bill Reminder</h3>
				
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createAvm">
				<h3 class="modal-title intHead"><label id="popupheaderlabel"></label></h3>
				
				
				<div class="col-sm-12" id="forApprovalBill">
				
				<div class="clearfix">&nbsp;</div>
					<div class="row">
						<textarea  rows="15" cols="70" id="reminderContent" style="margin-left: 20px; border-radius: 8px;"></textarea>
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
<script src="resource/oe/assets/js/app/intReminderReport.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>