<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 09/05/2016
 -->
<script type="text/javascript">
	$("#Search").on('click', function() {
		stoneArticleMasterGrid();
		$("#jqxgrid").show();
		return false;
	});
	
	$("#addDetails").on('click', function() {
		stoneArticleMasterGrid();
		$("#jqxgrid2").show();
		return false;
	});
</script>
<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Stone Article Master Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Stone Article Master
					</h1>
					<div class="heading-block-action">
						<!-- <button data-target="#sentParcel" data-toggle="modal"   type="button" class="btn btn-primary pull-right" ><i class="fa fa-plus-circle fa-lg"></i> &nbsp;Create</button> -->
						<a class="btn btn-primary" data-toggle="modal"
							data-target="#fgArticleMasterModal" type="button"
							href="javascript:void(0);"><i class="fa fa-plus"></i>
							&nbsp;Create </a>
					</div>
				</div>
				<!-- Stone Article Master Heading Add Ended -->

				<!-- Stone Article Master Search Started -->
				<form class="form-horizontal" id="designRA">
					<div class="mobile-responsive">
						<div class="row">

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Stone Articles</label> <select id="stoneArticles"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Stone Segment</label> <select id="stoneSegment"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Stone Category</label> <select id="stoneCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Shape/Sub Category</label> <select id="subCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							
							
						</div>
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Article Code </label> <input type="text" 
									class="form-control" placeholder="Article Code"
									id="articleCode">
							</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary voffset" type="button"
								name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>

						</div>
					</div>
				</form>
				<!-- Stone Article Master Search Ended -->

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


<!-- Create Stone Article Master Modal Pop-up Started ##########################  -->
<div class="modal fade" id="fgArticleMasterModal" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Create Stone Article
				</h3>
			</div>
			<!-- Modal Create Stone Article Master Body -->
			<div class="modal-body">
				<div class="container sentParcel-Edit">
					<form action="./updateParcel" method="post" name="updateParcel"
						id="updateParcelData">
						<!-- First Row Started -->
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Stone Segment</label> <select id="stoneSegment"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Stone Category</label> <select id="stoneCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Shape/Sub Category</label> <select id="subCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>UOM</label> <select id="uom" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						</div>
						<!-- Second Row Started -->
						<div class="row">



							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Article Code </label> <input type="text" disabled
									class="form-control" placeholder="Article Code"
									id="articleCode">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Article Description</label> <input type="text" disabled
									class="form-control" placeholder="Article Description"
									id="articleDesc">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Packet/Stock P/S</label> <select id="packageStock"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Active Y/N</label> <input type="text" disabled
									class="form-control" placeholder="Active Y/N" id="activeYN">
							</div>
						</div>
						<!-- Third Row Started -->
						<div class="row">

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Re-order Y/N</label> <select id="reOrder"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Customer Flag</label><input type="text" disabled
									class="form-control" placeholder="Customer Flag" id="custFlag">
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Customer Handle charges</label><input type="text"
									class="form-control" placeholder="Customer Flag"
									id="custHandleCharges">
							</div>
						</div>
					</form>
					<!-- Modal Window Edit Stone Article Master Form End -->
					<div class="row">
				
					<div id="jqxgrid2"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				</div>

			</div>
			<!-- Modal Edit Stone Article Master Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button" name="Search"
					id="addDetails">
					<i class="fa fa-plus"></i> &nbsp;Add Details
				</button>
				&nbsp;
				<button type="button" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Create Stone Article Master Modal Pop-up Ended ##########################  -->

<!-- Edit Stone Article Master Modal Pop-up Started ##########################  -->

<div class="modal fade" id="parcelData" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>
<!-- Edit Stone Article Master Modal Pop-up Ended ##########################  -->
<script src="resource/oe/assets/js/app/stoneArticleMaster.js"></script>
