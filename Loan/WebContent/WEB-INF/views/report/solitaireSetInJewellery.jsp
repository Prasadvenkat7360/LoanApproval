<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Manoranjan
	##	Date Creation 	: 	03-10-2017
	## 	Description		:	Solitaire Set in Jewellery search,export and print functionality 
 -->
<div class="main-container">
	<div class="container fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Solitaire Set in Jewellery
					</h1>
				</div>
					<form class="form-horizontal" id="solitaireSetinJewelleryForm" action="javascript: void(0)">						
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2 form-field">
									<label>Status</label><select id="statusS" name="statusS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2 form-field">
									<span id = "fd" class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
							   <div class="col-sm-2 form-field">
									<span id="td" class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
							 	</div>
								<div class="col-sm-2 form-field">
									<label>Store/DC</label> <select id="storeOrDc" name="storeOrDc"
										class="form-control">
										<option value="" selected>--Select--</option>
										<option value="Store">Store</option>
										<option value="DC">DC</option>
									</select>								
								</div>
								<div class="col-sm-2 form-field" id="storeDc">
									<label>Store/DC Name</label><div id="storeDcNameS"></div>
								</div>
								<div class="col-sm-2 form-field">
									<label>Stock No</label> <input type="text" class="form-control" placeholder="Stock No" id="stockNoS" name="stockNoS"> 
									<input id="stockNoS-value" type="hidden" name="">
								</div>
							
							</div>
							<div class="row">
								<div class="col-sm-2 form-field">
									<label>Article Segment</label><div id="artSegmentS"></div>
								</div>
							   <div class="col-sm-2 form-field" id="jCode">
									<label>Jewel Code</label><div id="jewelCodeS"></div>
								</div>
								
								<div class="col-sm-2 form-field">
									<label>Stone Segment</label>
									<input type="hidden" id="stoneSegId" />
									<input type="text" class="form-control" placeholder="Stone Segment" id="stoneSegS" name="stoneSegS" disabled>
						    	</div>
								<div class="col-sm-2 form-field">
									<label>Stone Category</label> <select id="stoneCatS" name="stoneCatS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2 form-field" id="shape">
									<label>Shape</label><div id="shapeS"></div>
								</div>
								<div class="col-sm-2 form-field" id="clarity">
									<label>Clarity</label><div id="clarityS"></div>
								</div>
								
							</div>
							<div class="row">
							<div class="col-sm-2 form-field" id="color">
								<label>Color</label><div id="colorS"></div>
							</div>	
							<div class="col-sm-2 form-field" id="actCol">
								<label>Actual Color</label><div id="actColS"></div>
							</div>
							<div class="col-sm-2 form-field" id="cutGrade">
								<label>Cut Grade</label><div id="cutGradeS"></div>
							</div>
							<div class="col-sm-2 form-field" id="fromRange">
								<label>From Carat Range</label><div id="fromCaratRangeS"></div>
									</div>
							<div class="col-sm-2 form-field" id="toRange">
								<label>To Carat Range</label><div id="toCaratRangeS"></div>
							</div>	
							</div>
					<div class="row">
					  
					</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-sm btn-primary voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-sm btn-warning voffset" type="reset">
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
					<i class="fa fa-eye fa-sm"></i> &nbsp; Photo - View
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

<script src="resource/oe/assets/js/app/solitaireSetInJewellery.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>