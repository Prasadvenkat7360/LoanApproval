<!-- 
	##	Author UI 		    : 	Pooja Sangve
	## 	Author JAVA 	    :   shree
	##	Date of Creation 	: 	05-10-2017
	## 	Description		    :	Consignment Loose Stones/ FG/ Accessory Stock Available Sale Report
 -->
 
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				 <div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Consignment Available Receipt Return Report
					</h1>
				</div>
				<div class="row">
					<div class="col-sm-2">
						<span class="required">*</span>&nbsp;
						<label>FG/Stone/Accessory</label> <select id="looseStoneStock" class="form-control">
							<option value="">-- Select --</option>
							<option value="stone">Stone</option>
							<option value="fg">FG</option>
							<option value="acc">Accessory</option>
						</select>
					</div>
				</div>
				<div class="clearfix">&nbsp;</div>
	
	<!--#################################### Consignment  FG Stock for sale #########################  -->		
				
				<div id="FgStockReport">
					<form class="form-horizontal" id="consignmentSearch">
							<!-- Row 1 Started  -->
							<div class="row">
								
		                           <div class="col-sm-2">
									<span id="mandatory" class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 	name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
											<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									    </div>
								 </div>
		                           <div class="col-sm-2">
									<span id="mandatory2" class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
											<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<label>Vendor Code</label> 
									<div id="vendorCodeS"></div> 
								</div>
								<div class="col-sm-2">
									<label>GRV No</label> 
									<div id="grvNoS"></div> 
								</div>
								<div class="col-sm-2">
									<label>Article Segment</label> 
									<div id="artSegS"></div> 
								</div>
							</div>
							<div class="clearfix">&nbsp;</div>
		
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchF" id="searchF">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAll" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="exportF" id="exportF">
									<i class="fa fa-file-excel-o fa-lg"></i> Export
								</button>
							</div>
						
				</form>
				</div>

<!--#################################### Consignment  LS Stock for sale #########################  -->						
				<div id="lsStockReport">
					<form class="form-horizontal" id="consignmentSearchForLs">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">
		                          <div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label><div class="input-group">
										<input type="text" class="date-picker form-control"
											 name="fromDateL" id="fromDateL" placeholder="DD/MM/YYYY">
												<label for="fromDateL" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									    </div>
								 </div>
		                          <div class="col-sm-2">
										<span class="required">*</span>&nbsp;<label>To Date</label><div class="input-group">
											<input type="text" class="date-picker form-control"
											name="toDateL" id="toDateL" placeholder="DD/MM/YYYY">
												<label for="toDateL" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<label>Vendor Code</label> 
									<div id="vendorCodeL"></div> 
								</div>	
								<div class="col-sm-2">
									<label>GRV No</label>
									<div id="grvNoL"></div> 
								</div>	
							
								<div class="col-sm-2">
									<label>Stone Segment</label><div id="stoneSegment"></div> 
								</div>
								
								<div class="col-sm-2" id="mainCat">
									<label>Main Category</label>
									<div id="mainCatLs"></div> 
								</div>
								
							</div>
							<div class="clearfix">&nbsp;</div>
		
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchLs" id="searchLs">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllLs" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="exportLs" id="exportLs">
									<i class="fa fa-file-excel-o fa-lg"></i> Export
								</button>
							</div>
						</div>
			</form>
	</div>
				
				
			

						
<!--############################## Consignment Accessory Stock  Available for Sale ######################## -->

			<div id="accStockReport">
					<form class="form-horizontal" id="consignmentSearch">
						<div class="mobile-responsive">
							<div class="row">
								 <div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											 name="accFromDateS" id="accFromDateS" placeholder="DD/MM/YYYY">
												<label for="accFromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									    </div>
								 </div>
		                           <div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											name="accToDateS" id="accToDateS" placeholder="DD/MM/YYYY">
												<label for="accToDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<label>Vendor Code</label><div id="vendCodeA"></div>
								</div>
								<div class="col-sm-2">
									<label>IGR Number</label><div id="grvNumberA"></div>
								</div>
								<div class="col-sm-2">
									<label>Accessory Segment</label><div id="artSegmentA"></div>
								</div>
								<div class="col-sm-2" id="mainCat">
									<label>Main Category</label>
									<div id="mainCatA"></div> 
								</div>
								
							</div>
							
							<div class="clearfix">&nbsp;</div>
		
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchAcc" id="searchAcc">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllAcc" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="exportAcc" id="exportAcc">
									<i class="fa fa-file-excel-o fa-lg"></i> Export
								</button>
							</div>
						</div>
					</form>
				<div class="clearfix">&nbsp;</div>
				
			</div>
		
			<div class="clearfix">&nbsp;</div>
				<div style="text-align: center; marging: auto; position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
			<div class="clearfix">&nbsp;</div>
		</div> 
	</div>
</div>
</div>
<script src="resource/oe/assets/js/app/consignmentAvlRecpRetReport.js"></script>

<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>
