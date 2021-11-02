<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 06/05/2016
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Vendor Cost Maintenance - Listing
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm voffset" type="button" id="vcmCreate"
							onclick="javascript:showContentPage('vendorCostMaintenance', 'bodySwitcher')">
							<i class="fa fa-plus fa-lg"></i>&nbsp;Create
						</button>
					</div>
				</div>
				<!-- Send Parcel Heading Add Ended -->

				<!-- Send Parcel Search Started -->
				<form class="form-horizontal" id="vcmSearch" action="javascript:void(0);">
						<!-- Row 1 Started -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Vendor Code</label> 
								<div id="vendorCode"></div>
							</div>

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Segment </label> <select id="segment"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Jewel Type Name</label> <select id="jewelType"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Main Category Name</label> <select id="mainCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						
							<div class="col-sm-2">
								<label>Sub Category Description</label> <select id="subCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Article Code</label> <input id="articleCode"
									class="form-control" type="text" placeholder="Article Code"
									data-validation="custom"
									data-validation-regexp="^\s*[a-zA-Z0-9\s]+\s*$">
							</div>
						</div>
						<div class="row">	
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Skin Purity</label> <select id="skinPurity"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="listingSearch" id="listingSearch" >
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="listingClearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							 <button class="btn btn-primary btn-sm voffset" type="button"
									name="downloadVfgData" id="downloadVfgData">
									<i class="fa fa-file-excel-o fa-lg"></i> Download Data
								</button>
								<div  class="fileUploadP btn btn-primary btn-sm voffset">
							        <span  class="glyphicon glyphicon-upload"></span> Upload file
							        <input  id="vendorFGUpload" type="file" onchange="captureFileSelectEvent(event)"/>
							    </div>
							    &nbsp;
							     <button  class="btn btn-primary voffset" onclick="HandleUploadExcelFile()">Upload Excel Data</button>
							    
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportAudit" id="exportAudit">
								<i class="fa fa-file-excel-o"></i> Export To Audit
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportToAudit" id="exportToAudit">
								<i class="fa fa-file-excel-o"></i> Export From Temp
							</button>
						</div>
				</form>
				<!-- Send Parcel Search Ended -->

				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<script
	src="resource/oe/assets/js/app/vendorCostMaintainanceDynamicColumns.js"></script>
<script src="resource/oe/assets/js/app/vendorCostMaintainance.js"></script>
