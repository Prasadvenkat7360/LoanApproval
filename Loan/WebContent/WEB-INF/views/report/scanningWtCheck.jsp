<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Shree Vardhan
	##	Date Creation 	: 	09-10-2017
	## 	Description		:	FG Stock Item search,export and print functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Scanned Weight Check Report					
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
							   <div class="col-sm-2">
								   <span class="required">*</span><label>Scanning/Wt Check</label>
								   <select id="swCheck" name="swCheck"class="form-control" onChange="onload()">								   		
										<option value="S">Scanning</option>
										<option value="W">Weight Check</option>
								   </select>
							    </div>
								<div class="col-sm-2">
									<span class="required">*</span><label>Stock Check Id</label>
									<!-- <input type="text" class="form-control" placeholder="Stock Check Id" id="stockChkId" name="stockChkId"> -->
									<select id="stockChkId" name="stockChkId" class="form-control">
										<option value="">--Select--</option>										
								   </select>
						    	</div>
								<div class="col-sm-2">
								   <label>Material Type</label>
								   <select id="materialType" name="materialType"class="form-control" disabled>
										<option value="">--Select--</option>
										<option value="FG">Finished Goods</option>
										<option value="LS">Loose Stone</option>
										<option value="A">Accessory</option>
								   </select>
							    </div>
							    <div class="col-sm-2">
								   <label>Zone Id</label>
								   <select id="zoneId" name="zoneId"class="form-control" disabled>
										<option value="" selected>--Select--</option>
								   </select>
							    </div>						    
						    	<div class="col-sm-2">
								   <label>Article Segment</label>
								   <select id="segmentId" name="segmentId" class="form-control" disabled>
										<option value="" selected>--Select--</option>
								   </select>
							    </div>								   
							    <div class="col-sm-2">
								   <label>Jewel Type</label>
								   <select id="jwlTypeId" name="jwlTypeId" class="form-control" disabled>
										<option value="" selected>--Select--</option>
								   </select>
							    </div>
							    <div class="col-sm-2">
								   <span class="required">*</span><label>Type of Report</label>
								   <select id="reportId" name="ReportId" class="form-control">
										<option value="" selected>--Select--</option>
										<option value="DR">Detailed Report</option>
										<option value="ER">Exception Report</option>
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
							<button name="export" id="export" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							<button name="print" id="print" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>
						</div>
				  </form>
				<div class="clearfix">&nbsp;</div>
					<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/scanningWtCheck.js" type="text/javascript"></script>
<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>