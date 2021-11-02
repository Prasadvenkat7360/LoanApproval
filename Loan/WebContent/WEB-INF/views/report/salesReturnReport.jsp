<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Ravi teja
	##	Date Creation 	:   10-03-2020
	## 	Description		:	Sales Return search,export and print functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Sales Return Location Wise or Store Wise(Metal Wise/Stones/Accessory)
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2" id="fDateS">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2" id="tDateS">
									<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
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
								<div class="col-sm-2">
									<label>Store/DC Name</label>									
									<select class="form-control" id="storeDcNameS" name="storeDcNameS">
										<option value="">--Select--</option>
									</select>
						    	</div>
						    
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Material Type</label><div id="materialTypeS">
									</div>
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
									  <i class="fa fa-user fa-lg">&nbsp;</i>Sales Return Details</a></li>
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
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/salesReturnReport.js" type="text/javascript"></script>
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