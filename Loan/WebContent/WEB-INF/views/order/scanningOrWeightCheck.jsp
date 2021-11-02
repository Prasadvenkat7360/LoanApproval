<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Nageshwar Rao
	##	Date Creation 	: 	25-10-2017
	## 	Description		:	Scanning/Weight Check Create & Search Functionality
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Scanned/Weight Check 
					</h1>
					
					<div class="heading-block-action">
						<button class="btn btn-primary voffset" type="button" id="create"
							onclick="javascript:showContentPage('scanningOrWtCheckCreate', 'bodySwitcher')">
							<i class="fa fa-plus"></i>&nbsp;Create
						</button>
					</div>
				</div>
					<form class="form-horizontal" id="rmToFgTransferForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Material Type</label> 
									<select id="matTypeS" name="matTypeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Article Segment</label><select id="segS" name="segS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2" id="jType">
									<label>Jewel Type</label> <select id="jTypeS" name="jTypeS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2" id="docSl">
									<label>Stock Check Id</label><input type="text" class="form-control" placeholder="Stock Check Id." 
										id="stockCheckIdS" name="stockCheckIdS">
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Type</label><select id="type" name="type" class="form-control">
										<option value="" >Select</option>
										<option value="S" >Scanned</option>
										<option value="W" >Weight Check</option>
									</select>
								</div>
						</div>
						<!-- Row 1 ended  -->
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
								<!-- <button id="testWebSocket" class="btn btn-warning voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; testWebSocket
							</button> -->	
													
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



<script src="resource/oe/assets/js/app/scanningOrWeightCheck.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	.form-control {
		height : 28px !important;
	}
	</style>