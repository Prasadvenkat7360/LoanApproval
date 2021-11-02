<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Raksha
	##	Date Creation 	: 	28-02-2020
	## 	Description		:	Daily Stock Check Report Search , Export Functionality
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Daily Stock Check Report 
					</h1>
				</div>
					<form class="form-horizontal" id="rmToFgTransferForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span><label>Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="dateS" id="dateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<span class="required">*</span><label>DC</label> <select id="dcS" name="dcS" class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span><label>Type</label> <select id="typeS" name="typeS" class="form-control">
										<option value="" selected>--Select--</option>
									</select>
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
						</div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for search-->
					<h4 id="searchHeading"></h4>
					<div class="panel with-nav-tabs " id="gridTabs">
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									  	<li class="tabDisabledS" id="fgDetails" ><a data-toggle="tab" href="#tab1default">FG Details</a></li>
										<li class="tabDisabledS" id="stoneDetails" ><a data-toggle="tab" href="#tab2default">Stones</a></li>
										<li class="tabDisabledS" id="accDetails"><a data-toggle="tab" href="#tab3default" >Accessories</a></li>
							     </ul>
						    </div>
						    <div class="panel-body" >
			                  <div class="tab-content">
			                 	   <div class="tab-pane fade" id="tab1default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridFg" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                 	   <div class="tab-pane fade" id="tab2default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridStone" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
				                    <div class="tab-pane fade" id="tab3default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                 </div>
			            </div>
			       </div>
			    </div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/dailyStockCheckReportDC.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>