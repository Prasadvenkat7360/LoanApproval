<!-- 
	##	Author UI : Mani Prasad
	##  Author UI : Pooja sangve
	## 	Author JAVA : Venkat Prasad
	## 	Date Creation : 20/03/2017
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Pending Materials With Vendor
					</h1>
					<form class="form-horizontal" id="PendingMaterial"
						action="javascript: void(0)">
						<div class="pull-left">
							<label class="radio-inline"><input class="element"
								type="radio" name="stoneAccessory" value="stoneAccessory">
								&nbsp; Stone/Accessory </label> <label class="radio-inline"> <input
								class="element" type="radio" name="stoneAccessory" value="fG">
								&nbsp; FG(SP,RP,RE-RWK,NO-RWK)
							</label>
						</div>

					</form>
					<div class="clearfix">&nbsp;</div>
				</div>
				<!-- ########## Starting of the Stone/Accessory for search  -->
				<div id="stoneAccessory">
					<form class="form-horizontal" id="stoneAccessoryForm"
						action="javascript: void(0)">
						<div class="row">

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Vendor Code</label>
								<div id="vendorCodeS"></div>
							</div>
							<div class="col-sm-2">
								<label>Store/DC Name</label>
								<div id="storeNameS"></div>
							</div>

							<div class="col-sm-2">
								<label>Order Type</label>
								<div id="orderTypeS"></div>
							</div>

							<div class="col-sm-2">
								<label>Stone/Accessory</label> <select id="stoneAccSeg"
									name="stoneAccSeg" class="form-control">
									<option value="" selected>--Select--</option>
									<option value="stones">Stone</option>
									<option value="Accessory">Accessory</option>
								</select>
							</div>

						</div>
						<div class="row">
							<div class="col-sm-2" id="saSeg">
								<span class="required" id="stAccSeg">*</span>&nbsp;<label>Stone/Accessory Segment</label>
								<div id="stoneAccSegment"></div>
							</div>
							<div class="col-sm-2" id="saMainCat">
								<label>Stone/Accessory Main Category</label>
								<div id="stoneAccMainCat"></div>
							</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="searchSA" id="searchSA">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="ClearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportSA" id="exportSA">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" 
								name="printSA" id="printSA">
								<i class="fa fa-print"></i> Print
							</button>
						   &nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" disabled
								name="emailSA" id="emailSA">
								<i class="fa fa-envelope"></i> E-Mail
							</button>
						</div>
					</form>
				</div>
				<!-- ########## ending of the Stone/Accessory for search  -->
				<!-- ########### Starting of the FG radio for search items -->
				<div id="fgPendingM">
					<form class="form-horizontal" id="PendingFg"
						action="javascript: void(0)">
						<div class="row">

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Vendor Code</label>
								<div id="vendorCodeF"></div>
							</div>
							<div class="col-sm-2">
								<label>Store/DC Name</label>
								<div id="storeNameF"></div>
							</div>

							<div class="col-sm-2">
								<label>Order Type</label>
								<div id="orderTypeF"></div>
							</div>
							<div class="col-sm-2">
								<label>Order Kind</label>
								<div id="oKind"></div>
							</div>
							<div class="col-sm-2">
								<label>Article Segment</label>
								<div id="artSeg"></div>
							</div>
						</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
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
							<button class="btn btn-primary btn-sm voffset" type="button" 
								name="printFg" id="printFg">
								<i class="fa fa-print"></i> Print
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" disabled
								name="emailFg" id="emailFg">
								<i class="fa fa-envelope"></i> E-Mail
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
<script src="resource/oe/assets/js/app/pendingMaterials.js"
	type="text/javascript"></script>
