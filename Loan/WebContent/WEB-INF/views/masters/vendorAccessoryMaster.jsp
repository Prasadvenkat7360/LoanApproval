<!-- 
	##	Author UI : Dipankar Naha,
	## 	Author JAVA : Nageshwar Rao 
	## 	Date Creation : 16/08/2016
	##  Modified By  : Raksha H O
	##  Modified Date : 20/02/2018
 -->
<script type="text/javascript">
	
</script>
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Stone Vendor Master Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Vendor Accessory
					</h1>
					<div class="heading-block-action">
						<button data-target="#accVendorMasterCreate" data-toggle="modal"
							type="button" class="btn btn-primary pull-right" id="createVA"
							style="margin-right: 10px">
							<i class="fa fa-plus-circle fa-lg"></i> &nbsp;Create
						</button>
						&nbsp;
					</div>
				</div>
				<!-- Stone Vendor Master Heading Add Ended -->

				<!-- Stone Vendor Master Search Started -->
				<form class="form-horizontal" id="designRA" action="javascript:void(0);">
						<div class="row">
							<div class="col-sm-2">
								<label>Vendor Code/Name</label> <input type="text"
									class="form-control" placeholder="Vendor Code/Name"
									id="vendorCode" name="vendorCode"> <input
									id="vendorCode-value" type="hidden" name="code">
							</div>

							<div class="col-sm-2">
								<label>Accessory Segment</label> <select id="accSegment"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Main Category</label> <select id="mainCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Sub Category</label><select id="subCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Status</label><select id="status" class="form-control">
									<option value="">--Select Option--</option>
									<option value="true" selected>Active</option>
									<option value="false">In-Active</option>
								</select>
							</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button id="export" class="btn btn-primary btn-sm voffset" type="reset">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Active/InActive Export
							</button>
							<button class="btn btn-primary btn-sm voffset" type="button"
									name="downloadVAccData" id="downloadVAccData">
									<i class="fa fa-file-excel-o fa-lg"></i> Download Data
							</button>
							<div  class="fileUploadP btn btn-primary btn-sm voffset">
						        <span  class="glyphicon glyphicon-upload"></span> Upload file
						        <input  id="vendorAccessoryUpload" type="file" onchange="captureFileSelectEvent(event)"/>
						    </div>
						    &nbsp;
						    <button  class="btn btn-primary voffset" onclick="HandleUploadExcelFile()">Upload Excel Data</button>							   
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportAudit" id="exportAudit">
								<i class="fa fa-file-excel-o"></i> Export To Audit
							</button>							
						</div>
				</form>
				<!-- Stone Vendor  Master Search Ended -->

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


<!-- Create Stone Vendor  Master Modal Pop-up Started ##########################  -->
<div class="modal fade" id="accVendorMasterCreate" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%">
	
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Create Vendor Accessory 
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createSegC" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Vendor Code/Name</label> <input type="text"
									class="form-control" placeholder="Vendor Code/Name"
									id="vendorCodeC" name="vendorCodeC"> <input
									id="vendorCodeC-value" type="hidden" name="code">
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Segment</label> <select id="accSegmentC"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Main Category</label> <select id="mainCategoryC"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Sub Category</label> <select id="subCategoryC"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Accessory Code </label> <input type="text"
									class="form-control" placeholder="Article Code"
									id="articleCode" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>UOM </label> <input type="text" class="form-control"
									placeholder="UOM" id="uom" value="Pcs" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Vendor HSN Code</label>
								<input type="text"  class="form-control" placeholder="Vendor HSN Code" id="vendorHsnCodeC">
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Company HSN Code</label> 
								<select id="compHsnCodeC" class="form-control">
									<option value="">--Select--</option>
								</select>
							</div>
						</div>
					<br>
					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action"   align="center">
							<button class="btn btn-primary btn-sm" id="add" type="button">
								<i class="fa fa-plus fa-lg"></i>&nbsp;Add
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div style="position: relative; z-index: 1">	
							<div id="jqxgridS"	style="font-size: 12px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
					</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm"
					id="saveVendAcc" name="saveVendAcc">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Create Stone Vendor Master Modal Pop-up Ended ##########################  -->

<div class="modal fade" id="accVendorMasterEdit" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;width:95%">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil fa-1"></i> &nbsp;Edit Vendor Accessory 
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createSegC">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">
							<input type="hidden" id="vendorAccessoryIdE" value="" />
							
							<input type="hidden" id="vendorIdE" value="" />
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Vendor Code/Name</label> <input type="text" class="form-control"
									placeholder="Vendor" id="vendorE" disabled>
							</div>
							
							<input type="hidden" id="segmentIdE" value="" />
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Segment</label> <input type="text" class="form-control"
									placeholder="Segment" id="segmentE" disabled>
							</div>
							
							<input type="hidden" id="mainCatIdE" value="" />
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Main Category</label> <input type="text" class="form-control"
									placeholder="Main Category" id="MainCatE" disabled>
							</div>
							
							<input type="hidden" id="subCatIdE" value="" />
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Sub Category</label> <input type="text" class="form-control"
									placeholder="Sub Category" id="subCatE" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Accessory Code </label> <input type="text"
									class="form-control" placeholder="Article Code"
									id="articleCodeE" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>UOM </label> <input type="text" class="form-control"
									placeholder="UOM" id="uomE"disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Article Description </label> <input type="text" class="form-control"
									placeholder="Article Description" id="artDescE"disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>From Cost </label> <input type="text" class="form-control"
									placeholder="From Cost " id="fromCostE" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>To Cost</label> <input type="text" class="form-control"
									placeholder="To Cost " id="toCostE"disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Cost Price</label><input type="text" class="form-control"
									placeholder="Cost Price"   onblur="this.value = validateNumberPercentage(this.value);" id="costPriceE" name="costPriceE">
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Selling Price</label><input type="text" class="form-control"
									placeholder="Selling Price" id="sellingPriceE" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Vendor HSN Code</label>
								<input type="text"  class="form-control" placeholder="Vendor HSN Code" id="vendorHsnCodeE">
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Company HSN Code</label> 
								<select id="compHsnCodeE" class="form-control">
									<option value="">--Select--</option>
								</select>
							</div>
							
						</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm"
					id="saveVendAccE" name="saveVendAccE">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!--Vendor Master Modal Pop-up Ended ##########################  -->





<script src="resource/oe/assets/js/app/vendorAccessory.js"></script>