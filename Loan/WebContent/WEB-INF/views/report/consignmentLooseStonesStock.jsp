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
				<div id="looseStoneStockReport">
				  <div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Consignment Stock FG / Stones / Acc Available Sale Report
					</h1>
					</div>
					<form class="form-horizontal" id="consignmentSearch">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
										<span class="required">*</span>&nbsp;<label>FG
											/Stone/Accessory Stone</label> <select id="looseStoneStock" class="form-control">
											<option value="stone" selected>Stone</option>
											<option value="fg">FG</option>
											<option value="acc">Accessory</option>
										</select>
								</div>
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
									<label>Status</label> <select id="status"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>GRV No.</label> <input type="text" id="mrvNo"
										class="form-control">
								</div>
								<div class="col-sm-2">
									<label>Vendor Code</label> 
									<div id="vendorCodeS"></div> <!-- <input type="text" class="form-control"
										placeholder="Vendor Code" id="vendorCodeS">
										<input id="vendorCodeS-value" type="hidden" name="code"> -->
								</div>
								
							</div>
							<div class="row">
							<div class="col-sm-2">
									<label>Store/Dc</label> <select id="storeDCS"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2" id ="storeDc">
									<label>Store/Dc Name</label> <div id="storeDcName"></div> 
									<!-- <input type="text" class="form-control"
										placeholder="Store/Dc Name" id="storeDcName">
										<input id="storeDcName-value" type="hidden" name="code"> -->
								</div>
								<div class="col-sm-2">
									<label>Stone Segment</label><div id="stoneSegment"></div> 
								<!-- 	<input type="text" class="form-control"
										placeholder="Store/Dc Name" id="stoneSegment">
										<input id="stoneSegment-value" type="hidden" name="code"> -->
								</div>
								<div class="col-sm-2">
									<label>Stone Sub-Category</label>
									<div id="stoneSubCat"></div> 
									<!-- <input type="text" class="form-control"
										placeholder="Store/Dc Name" id="stoneSubCat">
										<input id="stoneSubCat-value" type="hidden" name="code"> -->
								</div>
							</div>
							<div class="clearfix">&nbsp;</div>
		
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
								&nbsp;
								 <button name="printCS" id="printCS" type="button"class="btn btn-primary btn-sm voffset">								
								 <i class="fa fa-print fa-lg"></i>&nbsp; Print
								 </button>
							</div>
						<div class="clearfix">&nbsp;</div>
						<div style="text-align: center; marging: auto; position: relative; z-index: 1">
							<div id="jqxgrid"
								style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
				    <div class="clearfix">&nbsp;</div>
				</form>
			</div>
			
<!--#################################### Consignment  FG Stock for sale #########################  -->		
			
			<div id="FgStockReport">
			   <div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Consignment Stock FG / Stones / Acc Available Sale Report
					</h1>
				</div>
					<form class="form-horizontal" id="consignmentSearchForFg">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
										<span class="required">*</span>&nbsp;<label>FG
											/Stone/Accessory FG</label> <select id="fgStock" class="form-control">
											<option value="stone" >Stone</option>
											<option value="fg" selected>FG</option>
											<option value="acc">Accessory</option>
										</select>
								</div>
								 <div class="col-sm-2">
									<label>Status</label> <select id="statusF"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
		                          <div class="col-sm-2">
									<label>From Date</label><div class="input-group">
										<input type="text" class="date-picker form-control"
											 name="fromDateF" id="fromDateF" placeholder="DD/MM/YYYY">
												<label for="fromDateF" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									    </div>
								 </div>
		                          <div class="col-sm-2">
										<label>To Date</label><div class="input-group">
											<input type="text" class="date-picker form-control"
											name="toDateF" id="toDateF" placeholder="DD/MM/YYYY">
												<label for="toDateF" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<label>Vendor Code</label> 
									<div id="vendorCodeF"></div> 
								</div>	
								<div class="col-sm-2">
									<label>GRV No</label> <select id="mrvNoF" name="accStatus"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>	
							</div>
							<div class="row">
							<div class="col-sm-2">
									<label>Store/Dc</label> <select id="storeDCF"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2" id ="storeDcHide">
									<label>Store/Dc Name</label> <div id="storeDcNameF"></div> 
								</div>
								<div class="col-sm-2">
									<label>Article Segment</label><div id="SegmentF"></div> 
								</div>
								<div class="col-sm-2" id="jCode">
									<label>Jewel Code</label>
									<div id="jwlCodeF"></div> 
								</div>
								<div class="col-sm-2" id="mainCat">
									<label>Main Category</label>
									<div id="mainCatF"></div> 
								</div>
								
							</div>
							<div class="clearfix">&nbsp;</div>
		
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchFg" id="searchFg">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllFg" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="exportFg" id="exportFg">
									<i class="fa fa-file-excel-o fa-lg"></i> Export
								</button>
								&nbsp;
								 <button name="printFg" id="printFg" type="button"class="btn btn-primary btn-sm voffset" disabled>								
								 <i class="fa fa-print fa-lg"></i>&nbsp; Print
								 </button>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						 <div style="text-align: center; marging: auto; position: relative; z-index: 1">
							<div id="jqxgridFg"
								style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
				     <div class="clearfix">&nbsp;</div>
			</form>
	</div>
			
<!--############################## Consignment Accessory Stock  Available for Sale ######################## -->

			<div id="accStockReport">
			    <div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Consignment Stock FG / Stones / Acc Available Sale Report
					</h1>
				</div>
					<form class="form-horizontal" id="consignmentSearch">
						<div class="mobile-responsive">
							<div class="row">
								<div class="col-sm-2">
										<span class="required">*</span>&nbsp;<label>FG
											/Stone/Accessory Acc</label> <select id="accStock" class="form-control">
											<option value="stone" >Stone</option>
											<option value="fg" >FG</option>
											<option value="acc" selected>Accessory</option>
										</select>
								</div>
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
									<label>Status</label> <select id="accStatus" name="accStatus"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								 <div class="col-sm-2">
									<label>GRV No</label> <input type="text" class="form-control" placeholder="GRV No" id="mrvNoS" name="mrvNoS"> 
									<input id="mrvNoS-value" type="hidden" name="">
								</div>
							</div>
							<div class="row">
							 <div class="col-sm-2">
									<label>Vendor Code</label><div id="vendCodeS"></div>
							</div>
							<div class="col-sm-2">
								<label>Store/Dc</label> <select id="storeDCA" class="form-control">
										<option value="" selected label="Select" />
										<option value="store">Store</option>
										<option value="dc">DC</option>
								</select>
							</div>
							<div class="col-sm-2">
									<label>Store/DC Name</label><div id="storeDcNameS"></div>
							</div>
							<div class="col-sm-2">
									<label>Accessory Category</label><div id="accCatS"></div>
							</div>
							<div class="col-sm-2">
									<label>Accessory SubCategory</label><div id="accSubCatS"></div>
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
								&nbsp;
								 <button name="printAcc" id="printAcc" type="button"class="btn btn-primary btn-sm voffset" disabled>								
								 <i class="fa fa-print fa-lg"></i>&nbsp; Print
								 </button>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div style="text-align: center; marging: auto; position: relative; z-index: 1">
							 <div id="jqxgridAcc"
								style="font-size: 13px; font-family: Verdana; float: left;"></div>
						   </div>
				<div class="clearfix">&nbsp;</div>
					</form>
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div> 
	</div>
</div>
</div>
<script src="resource/oe/assets/js/app/consignmentLooseStonesStock.js"></script>
<script src="resource/oe/assets/js/app/consignmentFgStock.js"></script>
<script src="resource/oe/assets/js/app/consignmentAccStock.js"></script>

<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>
