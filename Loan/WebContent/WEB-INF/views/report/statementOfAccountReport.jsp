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
						<i class="fa fa-desktop"></i> &nbsp; Customer Order Statement of Account Report 
					</h1>
				</div>
					<form class="form-horizontal" id="statementOfAccountForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div id="batchRunSection">
						<div class="row">
							<div class="col-sm-2">
								<label>From Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
									<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							       </div>
						   </div>
								<div class="col-sm-2">
									<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
								<label>Order No</label><input type="text" class="form-control"
									placeholder="Order No" id="orderNo" name="orderNo">
								</div>
								<div class="col-sm-2">
								<label>Customer Name</label><input type="text" class="form-control"
									placeholder="Customer Name" id="customerName" name="customerName"> <input
									id="customerName-value" type="hidden" >
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
							<button class="btn btn-primary btn-sm voffset" type="button" name="export" id="export">
								<i class="fa fa-file fa-lg"></i> Export
							</button>
							<button class="btn btn-primary btn-sm voffset" type="button" name="print" id="print">
								<i class="fa fa-print fa-lg"></i> Print
							</button>							
						</div>
						</div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<div class="panel with-nav-tabs " id="gridTabs">
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									<li id="home"><a data-toggle="tab" href="#tab0default" >
									  <i class="fa fa-user fa-lg">&nbsp;</i>Header Details</a></li>
									  	<li class="tabDisabledS" id="itemDetails" ><a data-toggle="tab" href="#tab5default">Item Details</a></li>
									  
									    <li class="tabDisabledS" id="stoneDetails" ><a data-toggle="tab" href="#tab1default">Stone Details</a></li>
										<li class="tabDisabledS" id="accDetails" ><a data-toggle="tab" href="#tab2default">Accessory Details</a></li>
										<li class="tabDisabledS" id="credToDetails" ><a data-toggle="tab" href="#tab3default">Credit to Account Details</a></li>
										<li class="tabDisabledS" id="advDetails"><a data-toggle="tab" href="#tab4default" >Advance Details</a></li>
										<li class="tabDisabledS" id="taxDetails"><a data-toggle="tab" href="#tab6default" >Tax Details</a></li>
										
							     </ul>
						    </div>
						    <div class="panel-body" >
			                  <div class="tab-content">
			                      <div class="tab-pane fade ui-tabs-panel active in" id="tab0default">
					                <div style="text-align: center; marging: auto; position: relative; z-index: 1">
						                  <div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
					                </div>
			                 	   </div>
				                   <div class="tab-pane fade" id="tab1default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridStone" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                      <div class="tab-pane fade" id="tab2default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							           </div>
			                     </div>
			                      <div class="tab-pane fade" id="tab3default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgridCredit" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							           </div>
			                     </div>
			                      <div class="tab-pane fade" id="tab4default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgridAdv" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							           </div>
			                     </div>
			                     <div class="tab-pane fade" id="tab5default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridItem" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
				                   <div class="tab-pane fade" id="tab6default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridTax" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                 </div>
			            </div>
			       </div>
			    </div>
				
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="createIntimation" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				 <!-- Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-eye"></i> &nbsp; View Metal Rate/Value </h3>
				
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createAvm">
						<!-- JqGrid Started for search-->
						
				<div style="position: relative; z-index: 1;padding:15px; ">
					<div id="jqxgridV" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				
				<!-- Modal Create DC Master Footer -->
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"	id="cancel"><i class="fa fa-times"></i>&nbsp;Cancel</button>
					
				</div>
			</form>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/statementOfAccountReport.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>