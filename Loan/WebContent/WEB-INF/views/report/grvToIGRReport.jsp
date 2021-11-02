<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   venkat
	##	Date Creation 	: 	25-02-2020
	## 	Description		:	GRV To IGR Detailed Query search functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; GRV To IGR Detailed Query
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2" id="fDateS">
									<span class="required" >*</span><label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2" id="tDateS">
									<span class="required" >*</span><label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<span class="required" >*</span><label>Vendor Code</label> <select id="vendorCodeS"
										class="form-control">
										<option value="" selected label="--Select--" />
									</select>
								</div>
								<div class="col-sm-2">
									<span class="required" >*</span><label>GRV Type</label> <select id="grvTypeS"
										class="form-control">
										<option value="" selected label="--Select--" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>GRV No</label> <input type="text" class="form-control" placeholder="GRV No" id="grvNo" name="grvNo"> 
									<input id="grvNo-value" type="hidden" name="">
								</div>
								 <div class="col-sm-2">
									<label>GRV Srl No</label> <input type="text" class="form-control" placeholder="GRV Sl No" id="grvSlNo" name="grvSlNo"> 
									<input id="grvSlNo-value" type="hidden" name="">
								</div>
							</div>
							
							<div class="row">
								<div class="col-sm-2">
									<label>IGR No</label> <input type="text" class="form-control" placeholder="IGR No" id="igrNo" name="igrNo"> 
									<input id="igrNo-value" type="hidden" name="">
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
				<div class="panel with-nav-tabs " id="gridTabs">
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									<li id="home"><a data-toggle="tab" href="#tab0default" >
									  <i class="fa fa-user fa-lg">&nbsp;</i>GRV Details</a></li>
									    <li class="tabDisabledS" id="igrDetails" ><a data-toggle="tab" href="#tab1default">IGR Item Details</a></li>
										<li class="tabDisabledS" id="attributeDetails" ><a data-toggle="tab" href="#tab2default">Attributes</a></li>
										<li class="tabDisabledS" id="stoneDetails" ><a data-toggle="tab" href="#tab3default">Stones</a></li>
										<li class="tabDisabledS" id="accDetails"><a data-toggle="tab" href="#tab4default" >Accessories</a></li>
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
								              <div id="jqxgridIgr" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                 	   <div class="tab-pane fade" id="tab2default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridAttr" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
				                   <div class="tab-pane fade" id="tab3default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridStone" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                      <div class="tab-pane fade" id="tab4default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div>
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


<script src="resource/oe/assets/js/app/grvToIGRReport.js" type="text/javascript"></script>
<style>
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
.dateBackground
	{
	background-color:white !important;
	}
#wastageFullyPC {
	height: 28px;
}
</style>