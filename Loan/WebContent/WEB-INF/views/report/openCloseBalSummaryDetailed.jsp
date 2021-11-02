<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Divya
	##	Date Creation 	: 	09-12-2019
	## 	Description		:	Opening,Closing Balance ,Receipt Issues Detailed,Summary search,export and print functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Opening,Closing Balance ,Receipt/Issues(Segment,Metal-Location Wise)- <br/> &nbsp; &nbsp; &nbsp; Receipts  & Issues Summary & Detailed
					</h1>
				</div>
					<form class="form-horizontal" id="openingClosingBalDetailedSummary" action="javascript:void(0);">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span><label>From Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<span class="required">*</span><label>To Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
							<div class="col-sm-2">
								<label>Store/DC</label> <select id="storeOrDc" name="storeOrDc"
									class="form-control">
									<option value="" selected>--Select--</option>
									<option value="Store">Store</option>
									<option value="DC">DC</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>Store/DC Name</label><div id="storeDCNameS"></div>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span><label>Metal Segment</label> <select id="metalSegmentS" name="metalSegmentS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>Location Code</label><div id="locationCodeS"></div>
							</div>	
						</div>
						<div class="row">
						     <div class="col-sm-2">
								<label>Document Type</label><div id="documentTypeS"></div>
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
						</div>				
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
				<div class="clearfix"></div>
				<div class="clearfix"></div>
				<br/>	
				<div class="row">
					<div class="panel with-nav-tabs " id="gridTabs" style="border:1px solid; margin:20px;" >             
					 <div class="panel-heading">
			                <ul class="nav nav-tabs">
								<li id="summaryDetails"><a data-toggle="tab" href="#tab0default">Summary</a></li>
							</ul>
					</div>
				     <div class="panel-body"  id="tab0default">
			                  <div class="tab-content">
			                      <div class="tab-pane fade ui-tabs-panel active in">
					                <div style="text-align: center; marging: auto; position: relative; z-index: 1">
						                <div id="panelId1">
							 				<div class="panel panel-default">
										    	<div class="panel-heading">
										     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle1">Summary Details</a></h4>				      
										    	</div>
												<div id="panel1"  class="panel-collapse collapse">
													<div class="panel-body">
											       		<div id="jqxgride1" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
											      	</div>
										 	   	</div>
						    				</div>
										</div>
										  <div id="panelId3">
							 				<div class="panel panel-default">
										    	<div class="panel-heading">
										     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle3">Temp Not Found in Transaction</a></h4>				      
										    	</div>
												<div id="panel3"  class="panel-collapse collapse">
													<div class="panel-body">
											       		<div id="jqxgride3" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
											      	</div>
										 	   	</div>
						    				</div>
										</div>
										<div id="panelId2">
							 				<div class="panel panel-default">
										    	<div class="panel-heading">
										     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle2">Transaction Not Found in Temp</a></h4>				      
										    	</div>
												<div id="panel2"  class="panel-collapse collapse">
													<div class="panel-body">
											       		<div id="jqxgride2" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
											      	</div>
										 	   	</div>
						    				</div>
										</div>
					                </div>
			                 	   </div>
			                 </div>
			            </div>
			      
				</div>
				
				
				<div id="detailData">
				<div class="panel with-nav-tabs " id="gridTabs1" style="border:1px solid; margin:20px;" > 
				 <div class="panel-heading">
			                <ul class="nav nav-tabs">
								<li id="detailBal"><a data-toggle="tab" href="#tab1default">Details</a></li>
							</ul>
					</div>
					 <div class="panel-body"  id="tab1default">
	                  <div class="tab-content">
	                      <div class="tab-pane fade ui-tabs-panel active in">
			                <div style="text-align: center; marging: auto; position: relative; z-index: 1">
						<div style="text-align: center; marging: auto; position: relative; z-index: 1">
							<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
						</div>
					</div>
				</div></div>
		</div>
	</div>
</div>
</div>



<script src="resource/oe/assets/js/app/openCloseBalSummaryDetailed.js" type="text/javascript"></script>
<style>
.classhidden
	{
	display:none;
	}
.tabDisabled
	 {
    pointer-events:none;
	}
#navTabsCust {
    text-align:center !important;
    padding-left:17px;
	}
.tabDisabled1
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
