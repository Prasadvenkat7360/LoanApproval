<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat
	##	Date Creation 	: 	10-06-2020
	## 	Description		:	Rotation Report-Segment Metal Jewel type wise Available vs Sale & Rotation: 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp;  Rotation Report-Segment Metal Jewel type wise Available vs Sale & Rotation
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
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
								<span class="required">*</span><label>Store Name</label> <select id="storeNameS" name="storeNameS"
									class="form-control">
									<option value="" selected>--Select--</option>
								</select>
								</div>
								 <div class="col-sm-2">
						      		 <span class="required">*</span><label>Article Segment</label>
						      		 <select id="artSegmentS" name="artSegmentS" class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								<div class="col-sm-3">
									<label>Vendor Code</label><div id="vendCodeS">
						    	</div>
						    	</div>
							</div>
							
						<div class="row">
						<div class="col-sm-2">
					      		 <span class="required">*</span><label>Report Type</label>
					      		 <select id="repTypeS" name="repTypeS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
						</div>
						<div class="col-sm-2" id="mCat">
								<span class="required" id="catS">*</span><label>Main Category</label><div id="mainCatS"></div>
								</div>
							<div class="col-sm-2" id="jType">
									<span class="required" id="jwlS">*</span><label>Jewel Type</label><div id="jewelTypeS">
									</div>
								</div>
								
							<div class="col-sm-2" id="wRange">
								<label>Weight Range</label><div id="wtRangeS"></div>
							</div>
							
								<div class="col-sm-2" id="wRange">
								<label>Diamond Weight Range</label><div id="wtRangeDiaS"></div>
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
					<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
				<div class="clearfix">&nbsp;</div>	
			</div>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/rotationalReportSegJewelTypeWise.js" type="text/javascript"></script>
<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	
	.toolbarView{
	    visibility: visible !important;
  	    height: 31px !important;
    	width: 1315px !important;
    	top: 0px !important;
    	background-color: #a4bed4 !important;
	}
	
	.contentView{
		top: 33px !important;
		 width: 1315px; 
		 height: 116px; 
		 margin-top:0px !important;
	}
	</style>