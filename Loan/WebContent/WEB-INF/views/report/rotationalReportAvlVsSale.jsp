<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat
	##	Date Creation 	: 	28-05-2020
	## 	Description		:	 Rotation Report search,export  functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Segment-Wise Av vs Sale and Rotation Details
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
								<span class="required">*</span><label>Store Name</label>
								<select id="storeNameS" name="storeNameS" class="form-control">
										<option value="" selected label="Select" />
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
							
							<button class="btn btn-primary btn-sm voffset" type="button" name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>							
						</div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for search-->
				<div class="row" style="margin: -5px;">
					<div class="col-md-12">
						<div style="position: relative; z-index: 1">
							<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
					</div>
				</div>
				<div class="clearfix">&nbsp;</div>	
			</div>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/rotationalReportAvlVsSale.js" type="text/javascript"></script>
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