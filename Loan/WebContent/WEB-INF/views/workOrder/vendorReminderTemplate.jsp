<!-- 
	##	Author UI       : 	Phaneendra.B
	##  JAVA            :   Manne Ravi teja
	##	Date Creation 	: 	14-07-2021 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="home">
						<i class="fa fa-desktop"></i> &nbsp; Vendor Reminder Template
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary" type="button" data-toggle="modal" data-target="#createIntimation" id="createMail">
							<i class="fa fa-plus"></i> &nbsp;Create
						</button>
					</div>
				</div>
				<form class="form-horizontal" id="raiseTvForm">
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>From Date</label>
							<div class="input-group">
								<input type="text" readonly='true'
									class="date-picker form-control dateBackground"
									name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
								<label for="fromDateS" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>To Date</label>
							<div class="input-group">
								<input type="text" readonly='true'
									class="date-picker form-control dateBackground" name="toDateS"
									id="toDateS" placeholder="DD/MM/YYYY"> <label
									for="toDateS" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>

						<div class="col-sm-2">
							<label>Mode</label> <select id="irModeType" name="irModeType"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-sm-2">
							<label>Active /In-Active</label> <select id="statusS"
								name="statusS" class="form-control">
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
						<button id="clearAll" class="btn btn-warning btn-sm voffset"
							type="reset">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
					</div>
					<div class="clearfix">&nbsp;</div>

					<div class="row">

						<!-- JqGrid Started for search-->
						<div class="col-sm-1"></div>
						<div class="col-sm-10">
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid"
									style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
					</div>
					<div class="col-sm-1"></div>
					<!-- JqGrid Ended -->
					<div class="clearfix">&nbsp;</div>
				</form>

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="createIntimation" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-md">
		<div class="modal-content"> 
			<!--  Modal Window Content Started  -->
			<div class="ReminderboxInner">
			<form method="POST" enctype="multipart/form-data" id="diamondCertUpload">
				<h3 class="modal-title intHead">
					<label id="popupheaderlabel"></label>  
				</h3>

				<div class="col-sm-12" id="forCustomerOrder">
					<div>
						<div class="col-sm-12">

							<div class="row" id="row1">
								<div class="col-sm-4" id="row1-1">
									<label><b>Dear :</b> </label> <span><b id="vendorName"> &nbsp; </b> </span>  
								</div>
								<div class="col-sm-4 row1-2"></div>
								<div class="col-sm-2 row1-2"">
									<label><b>Date : </b></label> <input type="text" class="currDate" name="currDate" disabled="disabled" id="currDate" placeholder="DD/MM/YYYY">
								</div> 
								<div style="display:none">
								 <input type="text"  name="irModeType" id="irModeTypeE" >
								 <input type="text"  name="templateId" id="templateId" >
								</div>

							</div>
							<div class="clearfix">&nbsp;</div>
							<span class="required">*&nbsp;</span>
							<div class="row" id="createContent">
								<textarea rows="15" cols="70" id="mailContent" name="temText"
									style="margin-left: 20px; border-radius: 8px;"></textarea>

								<div id="create-content" style="margin-left: 20px;"></div>

							</div>
							<div class="row" id="editContent">
								<input type="hidden" id="promoIdE" />
								<textarea rows="15" cols="70" id="mailContentE" style="margin-left: 20px; border-radius: 8px;"></textarea>
								<div id="page-content" style="margin-left: 20px;"></div>
							</div>

							<div class="clearfix">&nbsp;</div>
							</div>
						</div>
					</div>
				</div>

				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-primary btn-sm"
						id="saveIntimation" name="saveIntimation">
						<i class="fa fa-save"></i>&nbsp;Save
					</button>
					<button type="button" class="btn btn-primary btn-sm"
						id="updateIntimation" name="updateIntimation">
						<i class="fa fa-save"></i>&nbsp;Update
					</button>

					<button type="button" class="btn btn-warning btn-sm"
						data-dismiss="modal" id="cancel">
						<i class="fa fa-times"></i>&nbsp;Cancel
					</button>
					<button type="button" class="btn btn-warning btn-sm" id="clear">
						<i class="fa fa-times"></i>&nbsp;Clear
					</button>
				</div>

			</form>
			</div>
		</div>
	</div>
	</div>



<script src="resource/oe/assets/js/app/vendorReminderTemplate.js"
	type="text/javascript"></script>
<style>
.createvendorReminderbox{max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);}
.createvendorReminderbox form{    float: left;
    width: 100%;}
.listyStyleNumber li {
	list-style: number;
}

.dateBackground {
	background-color: white !important;
}

.intHead {
	padding: 15px;
	text-align: center;
}

.textArea {
	display: block !important;
	border: none;
}

.currDate {
	display: block !important;
	border: none !important;
	margin-left: 40px !important;
	margin-top: -24px !important;
}

.sub {
	border-left: none;
	border-top: none;
	border-right: none;
	border-bottom-color: black;
}

.subP {
	font-size: initial;
	color: #d9534f;
	font-weight: 600;
	width: 220px;
}

.sub1 {
	border-left: none;
	border-top: none;
	border-right: none;
	border-bottom: none;
}

.radio-inline {
	padding-top: 7px;
	margin-top: -10px !important;
	margin-bottom: 0;
	margin-left: 5px !important;
}

.intHead1 {
	float: left;
}
</style>