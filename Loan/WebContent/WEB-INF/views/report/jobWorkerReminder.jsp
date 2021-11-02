<!-- 
    ##	Author UI           : 	Raksha
	##	Author UI           : 	Dipankar
	## 	Author JAVA 	    :   Nageshwar Rao
	##	Date Creation 	    : 	20-04-2017
	## 	Description		    :	Job Worker Reminder Search and Export Functionality.
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Pending PSR Reminder - Report
					</h1>
					<div class="heading-block-action"></div>
				</div>
				<form class="form-horizontal" id="jobWorkerReminder"
					action="javascript: void(0);">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<label>DC Name</label>
								<div id="dcNameS"></div>
							</div>
							<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Vendor Code/Name</label>
								<div id="vendorCodes"></div>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Order Type</label>
								<div id="orderTypeS"></div>
							</div>

						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clear" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button name="export" id="export" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							&nbsp;
							<button name="print" id="printJWR" type="button" 
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" 
								name="emailJWR" id="emailJWR">
								<i class="fa fa-envelope"></i> E-Mail
							</button>
						</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				<div
					style="text-align: center; marging: auto; position: relative; z-index: 1"
					id='row'>
					<div id="jqxgrid"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/jobWorkerReminder.js"
	type="text/javascript"></script>