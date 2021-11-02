<!-- 
	##	Author UI : Raksha
	##  Author UI : Dipankar
	## 	Author JAVA : Nageshwar Rao
	## 	Date Creation : 24/04/2017
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div class="heading-block">
						<h1><i class="fa fa-desktop"></i> Ageing Analysis</h1>
						<form class="form-horizontal" id="ageingAnalysis" action="javascript: void(0)">
							<div class="pull-left">
								<label class="radio-inline"><input class="element"
									type="radio" name="ageAnalysis" value="fgCustomer" id="fgCustomer">
									&nbsp; Stock FG/Customer </label> <label class="radio-inline"> <input
									class="element" type="radio" name="ageAnalysis" id="stoneAccessory"
									value="stoneAccessory"> &nbsp; Stone/Accessory
								</label>
							</div>		
						</form>
					<div class="clearfix">&nbsp;</div>
				</div>
				<!-- ########## Starting of the Stone/Accessory for search  -->
				<div id="ageAnalysis">
				<div class="clearfix">&nbsp;</div>
					<form class="form-horizontal" id="stockFgCustomer"
						action="javascript: void(0)">
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Stock FG / Customer</label><select name="scOrder" id="scOrder" class="form-control"
										data-validation="required">
										<option value="" selected label="--Select--" />
									</select>
								</div>
								
								<div id="consignmentType" class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Consignment Type</label>
									<div id="consType"></div>
								</div>
	
								<div class="col-sm-1">
									<span class="required">*</span>&nbsp;<label>Store/DC</label> <select
										id="storedc" name="storedc" class="form-control" data-validation="required">
										<option value="" selected>--Select--</option>									
									</select>
								</div>
								<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Store/DC Name</label><select name="storeDcName"
										id="storeDcName" class="form-control" data-validation="required">
										<option value="" selected label="--Select--" />
									</select>
								</div>
							
								<div class="col-sm-2">
									<label>Zone Name</label> <select
										id="zoneName" name="zoneName" class="form-control">
										<option value="" selected>--Select--</option>									
									</select>
								</div>
								<div class="col-sm-3">
									<label>Vendor</label>
									<div id="vendors"></div>
								</div>
								
							</div>
							<div class="row">
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>No of
										Days:From</label> <input type="text" class="form-control" value="" onBlur="minMaxValues();"
										placeholder="No of Days From" id="daysFrom" name="daysFrom" data-validation="required">
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>No of
										Days:To</label> <input type="text" class="form-control" value="" onBlur="minMaxValues();"
										placeholder="No of Days To" id="daysTo" name="daysTo" data-validation="required">
								</div>
							
								<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Article Segment</label>
									<div id="artSeg" data-validation="required"></div>
								</div>
	        					<div id="jewelDet" class="col-sm-2">
									<label>Jewel Code</label>
									<div id="jewelCode"></div>
								</div>
								<div id="mainCatDet" class="col-sm-2">
									<label>Main Category</label>
									<div id="mainCat"></div>
								</div>
								<div id="subCatDet" class="col-sm-2">
									<label>Sub Category</label>
									<div id="subCat"></div>
								</div>
							</div>
							<div class="row">
					        	<div id="aCode" class="col-sm-2">
									<label>Article Code</label>
									<!-- <div id="artCode"></div> -->
									 <input type="text" class="form-control" disabled placeholder="Article Code" id="artCode" name="artCode">
							 	</div>
							</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="submit" name="searchFg" id="searchFg"><i class="fa fa-search fa-lg"></i> Search</button>&nbsp;
								<button id="ClearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>&nbsp;
								<button  disabled class="btn btn-primary btn-sm voffset" type="button" name="exportFg" id="exportFg" ><i class="fa fa-file-excel-o fa-lg"></i><strike>Export</strike></button>&nbsp;
							</div>
						</form>
				</div>
				<div id="stoneAcc">
					<form class="form-horizontal" id="stoneAccessory"
						action="javascript: void(0)">
						<div class="row">

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Loose
									Stone/Accessory</label><select name="looseSA" id="looseSA"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Store/DC</label> <select
									id="storeOrDc" name="storeOrDc" class="form-control">
									<option value="" selected>--Select--</option>
									<option value="storeS">Store</option>
									<option value="dcS">DC</option>
								</select>
							</div>

							<div class="col-sm-2">
								<label>Store/DC Name</label><select name="storeDcNameS"
									id="storeDcNameS" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Zone Name</label><select name="zoneNameS"
									id="zoneNameS" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Stone/Acc Segment</label><select name="stoneAccSegment"
									id="stoneAccSegment" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Stone/Acc Category</label>
								<div id="saCat"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Stone/Acc Sub Category</label>
								<div id="saSubCat"></div>
							</div>

							<div class="col-sm-2">
								<label>Stone/Acc Article Code</label>
								<div id="saArtCode"></div>
							</div>
							<div class="col-sm-2">
								<label>Vendor</label>
								<div id="vendorCode"></div>
							</div>
							<div class="col-sm-2">
								<label>No of Days:From</label> 
								<input type="text" class="form-control"
									placeholder="No Of Days From" id="noDaysFrom" name="noDaysFrom">
							</div>
							<div class="col-sm-2">
								<label>No of Days:To</label> 
								<input type="text" class="form-control"
									placeholder="No Of Days To" id="noDaysTo" name="noDaysTo">
							</div>
						</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="searchSA" id="searchSA">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							<button id="clearAllSA" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportSA" id="exportSA" disabled>
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
						</div>
					</form>

				</div>
				<!-- Metal Account Search Ended -->
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


<div class="modal fade" id="viewStoneAccDetModal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">

	<div class="modal-dialog modal-lg" style="width: 95%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Ageing Analysis Stone Accessory Details
				</h3>
			</div>
			<div class="col-md-12">
				<div style="position: relative; z-index: 1">
					<div id="jqxgridStone" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					<div class="clearfix">&nbsp;</div>
					<div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
			</div>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">				
				<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/ageingAnalysis.js" type="text/javascript"></script>
