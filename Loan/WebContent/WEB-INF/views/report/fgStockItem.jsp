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
						<i class="fa fa-desktop"></i> &nbsp; FG Stock Item AV/Sale Report
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Status</label>
										<select id="statusS" name="statusS" class="form-control">
											<option value="" selected label="Select" />
										</select>
								</div>
								<div class="col-sm-2">
									<label>From Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<label>To Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
								<label>Store/DC</label> <select id="storeOrDc" name="storeOrDc"
									class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
								<div class="col-sm-2" id="storeDc">
									<label>Store/Dc Name</label><div id="storeDcNameS">
									</div>
								</div>
								<div class="col-sm-2">
									<label>Zone</label><div id="zoneS">
									</div>
								</div>	
							</div>
							
						<div class="row">
						       <div class="col-sm-2">
						       <label>Article Segment</label>
						       <select id="artSegmentS" name="artSegmentS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
								</div>
								<div class="col-sm-2">
									<label>Jewel Type</label><select id="jewelTypeS" name="jewelTypeS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
							   <div class="col-sm-2" id="mainCat">
									<label>Main Category</label><div id="mainCatS"></div>
								</div>
								<div class="col-sm-2" id="subCat">
									<label>Sub Category</label><div id="subCatS"></div>
								</div>
								<div class="col-sm-2">
									<label>Article Code</label><input type="text" class="form-control" placeholder="Article Code" id="artCode" name="artCode">
						    	</div>
						    	
								<div class="col-sm-2">
									<label>Weight Range</label><div id="wtRangeS">
								</div>
						</div>				
						</div>	
						
					<div class="row">
				   <div class="col-sm-2">
						<label>From Selling Price</label><div id="fromSp"></div>
					</div>
				   
				   <div class="col-sm-2">
						<label>To Selling Price</label><div id="toSp"></div>
					</div>
					 
					  <div class="col-sm-2" id="size">
						<label>Size</label><div id="sizeS"></div>
					</div>
					   <div class="col-sm-2" id="length">
							<label>Length</label><div id="lengthS"></div>
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
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>

<!-- Polish Type Edit Window Started -->
<div class="modal fade" id="btnView" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%; width:90%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-eye fa-sm"></i> &nbsp; FG Stock Item - View
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="viewFgStockItemForm"	action="javascript:void(0);">
				<div class="col-md-12">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-md-12 form-field text-center">
							<div id="page-content"> </div>
			            	<ul id="pagination-demo" class="pagination-sm sync-pagination"></ul>
						</div>
					</div>	
				</div>
				<div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>
				</div>
				
			</form>
		</div>
	</div>
</div>
<!-- Polish Type Edit Window Ended -->

<script src="resource/oe/assets/js/app/fgStockItem.js" type="text/javascript"></script>
<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>