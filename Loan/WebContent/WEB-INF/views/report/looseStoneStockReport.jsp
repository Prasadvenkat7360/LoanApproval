<!-- 
	##	Author UI 		    : 	Pooja Sangve
	##	Date of Creation 	: 	09-10-2017
	## 	Description		    :	Loose Stone Stock Check Report 
 -->
 
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Loose Stone Stock Report 
					</h1>
				</div>
				<form class="form-horizontal" id="looseStoneStockReport">
						<!-- Row 1 Started  -->
						<div class="row">
						<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Status</label> <select id="status"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
                            <div class="col-sm-2">
								<label>From Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								    </div>
							 </div>
                            <div class="col-sm-2">
								<label>To Date</label>
									<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							</div>
							<div class="col-sm-2">
								<label>Store/Dc</label> <select id="storeDCS"
									class="form-control">
									<option value="" selected label="--Select--" />
									<option value="Store">Store</option>
									<option value="DC">DC</option>
								</select>
							</div>
							<div class="col-sm-2" id ="storeDc">
								<label>Store/Dc Name</label> <div id="storeDcName"></div> 
							</div>
							<div class="col-sm-2">
								<label>Zone</label> <div id="zone"></div> 
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Segment</label><div id="segment"></div> 
							</div>
							<div class="col-sm-2">
								<label>Main Category</label><div id="mainCat"></div> 
							</div>
							<div class="col-sm-2">
								<label>Vendor Code</label>
								<div id="vendorCode"></div> 
							</div>
							<div class="col-sm-2" >
								<label>Lab Name</label> <div id="labName"></div>
							</div>
							<div class="col-sm-2">
							<label>Stock/Packet</label> <select id="stockPacket"
								class="form-control">
								<option value="" selected label="--Select--" />
							</select>
							</div>
							<div class="col-sm-2" id="fromwtS">
								<label>From/To Wt Range</label> <div id="fromToWtRange"></div>
							</div>
							<div class="col-sm-2" id="fCostRange">
								<label>From Cost Range</label> <div id="fromToCostRange"></div>
							</div>
							 </div>
							<div class="row">
							<div class="col-sm-2" id="tCostRange">
								<label>To Cost Range</label> <div id="toCostRange"></div>
							</div>
							<div class="col-sm-2" id="hideClarity">
								<label>Clarity</label><div id="clarity"></div> 
							</div>
							<div class="col-sm-2" id="hideColor">
								<label>Color</label><div id="color"></div> 
							</div>
							<div class="col-sm-2" id="hideActual">
								<label>Actual Color</label>
								<div id="actualColor"></div> 
							</div>
							<div class="col-sm-2" id="hideCut">
								<label>Cut</label> <div id="cut"></div>
							</div>
							
						</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
						</div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<div class="panel with-nav-tabs " id="gridTabs">
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									<li id="home"><a data-toggle="tab" href="#tab0default" >
									  <i class="fa fa-user fa-lg">&nbsp;</i>Stone Details</a></li>
									 	<li class="tabDisabledS" id="historyDetails" ><a data-toggle="tab" href="#tab1default">Item History</a></li>
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
								              <div id="jqxgridHist" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
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
<script src="resource/oe/assets/js/app/looseStoneStockReport.js"></script>
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