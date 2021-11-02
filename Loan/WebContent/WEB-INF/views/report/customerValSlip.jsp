<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Ravi Teja
	##	Date Creation 	: 	24-12-2019
	## 	Description		:	Customer Valuation Slip search,export and print functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Customer Valuation Slip Report
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
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
									<label>Valuation Slip Number</label>
									<select id="valSlipNoS" name="valSlipNoS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
							<div class="col-sm-2">
								<label>Store Code</label> <select id="storeCodeS" name="storeCodeS"
									class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>Segment</label> <select id="segmentS" name="segmentS"
									class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>Location</label> <select id="locationS" name="locationS"
									class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							</div>
							
						<div class="row">
						    <div class="col-sm-2">
						       <label>Material Type</label>
						       <select id="matTypeS" name="matTypeS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>Purpose</label><select id="purposeS" name="purposeS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							 <div class="col-sm-2">
								<label>Ref Doc No</label><select id="refDocS" name="refDocS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Ref Doc Sl No</label><select id="refDocSlS" name="refDocSlS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Status</label><select id="statusS" name="statusS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
						</div>				
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
							<button name="export" id="export" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
						
						</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for search-->
				<div class="panel with-nav-tabs " id="gridTabs">
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									<li id="home"><a data-toggle="tab" href="#tab0default" >
									  <i class="fa fa-user fa-lg">&nbsp;</i>FG Details</a></li>
										<li class="tabDisabledS" id="stoneDetails" ><a data-toggle="tab" href="#tab1default">Stones</a></li>
										<li class="tabDisabledS" id="accDetails"><a data-toggle="tab" href="#tab2default" >Accessories</a></li>
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
								              <div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                 </div>
			            </div>
			       </div>
			    </div>
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/customerValSlip.js" type="text/javascript"></script>
<style>
	
.dateBackground
{
background-color:white !important;
}
.classhidden
{
display:none;
}
#navTabsCust {
   text-align:center !important;
   padding-left:17px;
}
.tabDisabled1
 {
   pointer-events:none;
}
.tabDisabled2
 {
   pointer-events:none;
}
a:hover{
color: black !important;
}
#wastageFullyPC {
	height: 28px;
}
</style>