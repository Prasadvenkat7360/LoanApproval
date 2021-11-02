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
						<i class="fa fa-desktop"></i> &nbsp; Opening Balance Receipts/Issues & Closing Balance(Stone Location Wise)-Receipts & Issue Summary & Detailed
					</h1>
				</div>
					<form class="form-horizontal" id="roughCashBookForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div class="row">
		                          <div class="col-sm-2">
									<span class="required">*</span><label>From Date</label><div class="input-group">
										<input type="text" class="date-picker form-control"
											 name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
												<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									    </div>
								 </div>
		                          <div class="col-sm-2">
									<span class="required">*</span><label>To Date</label><div class="input-group">
										<input type="text" class="date-picker form-control" name="toDate" id="toDate" placeholder="DD/MM/YYYY">
										<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span><label>Stone Segment</label> <select id="segment"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<label>Category</label><div id="catS">
								</div></div>
								<div class="col-sm-2">
									<label>Store/DC</label>
									<select id="storeDcType" name="storeDcType" class="form-control">
											<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>Store/DC Name</label><div id="storeDcName">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
									<label>Location Code</label><div id="locCode">
							</div>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span><label>Summary Details</label>
								<select id="summaryDetS" name="summaryDetS"
									class="form-control">
									<option value="" selected>--Select--</option>
									<option value="summary">Summary</option>
									<option value="detail">Details</option>
								</select>
							</div>
							
							<div class="col-sm-2">
								<label>Doc Type</label><div id="docType">
							</div>
								</div>
						</div>
						
						<!-- Row 1 ended  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							<button id="export" class="btn btn-warning btn-sm voffset" type="button">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>							
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div id="stockCheckUpdate">
								<div class="panel panel-default">
									<div class="panel-heading">
									   <h4 class="panel-title"><a class="accordion-toggle" id="toggle5"><b>Summary :</b></a></h4>				      
							    	</div>
										<div id="panel4"  class="panel-collapse collapse">
											<div class="panel-body">
												<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   	</div>
									</div>
							</div>
						</div>
						
						<div id="receiptSection">
							<div class="panel panel-default">
									<div class="panel-heading">
									   <h4 class="panel-title"><a class="accordion-toggle" id="toggle4"><b>Receipt Details :</b></a></h4>				      
							    	</div>
										<div id="panel5"  class="panel-collapse collapse">
											<div class="panel-body">
								 	   			<div id="jqxgridR" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   		</div>
									</div>
							</div>
						</div>
						
						<div id="issueSection">
							<div class="panel panel-default">
									<div class="panel-heading">
									   <h4 class="panel-title"><a class="accordion-toggle" id="toggle6"><b>Issue Details :</b></a></h4>				      
							    	</div>
										<div id="panel6"  class="panel-collapse collapse">
											<div class="panel-body">
								 	   			<div id="jqxgridI" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   	</div>
									</div>
							</div>
						</div>
						
						<div id="failedSection">
							<div class="panel panel-default">
									<div class="panel-heading">
									   <h4 class="panel-title"><a class="accordion-toggle" id="toggle7"><b>Transactions not Accounted :</b></a></h4>				      
							    	</div>
										<div id="panel7"  class="panel-collapse collapse">
											<div class="panel-body">
								 	   			<div id="jqxgrid1" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   			<div id="jqxgrid2" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   	</div>
									</div>
							</div>
							
							<div class="panel panel-default">
									<div class="panel-heading">
									   <h4 class="panel-title"><a class="accordion-toggle" id="toggle8"><b>Accounted Without Transactions :</b></a></h4>				      
							    	</div>
										<div id="panel8"  class="panel-collapse collapse">
											<div class="panel-body">
								 	   			<div id="jqxgrid3" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   			<div id="jqxgrid4" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   	</div>
									</div>
							</div>
						</div>
						
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for search-->
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/openCloseBalSumDetReport.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>