<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 09/05/2016
 -->
<script type="text/javascript">
	var $segments = $('#segments');
	$.getJSON(
			'/OrderExecution/api/v1/fgArtiicleMasterLOV?page=FGArticleSearch',
			function(data) {

				//iterate over the data and append a select option
				$.each(data.payload.sTypes, function(key, val) {
					$segment.append('<option value="' + val.id + '">'
							+ val.description + '</option>');
				});
			});
</script>
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- FG Article Master Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> FG Article Master
					</h1>
					<div class="heading-block-action">
						<!-- <button data-target="#sentParcel" data-toggle="modal"   type="button" class="btn btn-primary pull-right" ><i class="fa fa-plus-circle fa-lg"></i> &nbsp;Create</button> -->
						<a class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#fgArticleMasterModal" type="button"
							href="javascript:void(0);"><i class="fa fa-plus"></i>
							&nbsp;Create </a>
					</div>
				</div>
				<!-- FG Article Master Heading Add Ended -->

				<!-- FG Article Master Search Started -->
				<form class="form-horizontal" id="designRA">
						<div class="row">

							<div class="col-sm-2">
								<label>Segment</label> <select id="segment" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Jewel Type </label> <select id="jewelType"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Main Category</label> <select id="mainCategory"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Sub Category</label> <select id="subCategory"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Article Code</label> <input type="text"
									class="form-control" placeholder="Article Code"
									id="articleCode">
							</div>
							<div class="col-sm-2">
								<label>Article Flag</label> <input type="text"
									class="form-control" placeholder="Article Flag"
									id="articleFlag">
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>

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
				</form>
				<!-- FG Article Master Search Ended -->

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


<!-- Create FG Article Master Modal Pop-up Started ##########################  -->
<div class="modal fade" id="fgArticleMasterModal" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Create FG Article
				</h3>
			</div>
			<!-- Modal Create FG Article Master Body -->
			<div class="modal-body">
				<div class="container sentParcel-Edit">
					<form action="./updateParcel" method="post" name="updateParcel"
						id="updateParcelData">
						<!-- First Row Started -->
						<div class="row">

							<div class="col-sm-2">
								<label>Segment</label> <select id="segment" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Jewel Type </label> <select id="jewelType"
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
								<label>Sub Category</label> <select id="subCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Article Code</label> <input type="text" disabled
									class="form-control" placeholder="Article Code"
									id="articleCode">
							</div>
							<div class="col-sm-2">
								<label>Article Description</label> <input type="text" disabled
									class="form-control" placeholder="Article Description"
									id="articleDesc">
							</div>
							<div class="col-sm-2">
								<label>Article Flag</label> <select id="articleFlag"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Order Unit</label> <select id="orderUnit"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>MUP Category</label> <select id="mupCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Min. Wt.</label> <input type="text" class="form-control"
									placeholder="Min Weight" id="minWt" name="minWt" />
							</div>
							<div class="col-sm-2">
								<label>Max. Wt.</label> <input type="text" class="form-control"
									value="Max. Wt." id="maxWt" name="maxWt">
							</div>
						</div>

						<div class="row">

							<div class="col-sm-2">
								<label>Active Y/N</label> <input type="text" disabled
									class="form-control" placeholder="Active Y/N" id="activeYN"
									name="activeYN" value="Yes">
							</div>
							<div class="col-sm-2">
								<label>Shelf Life</label> <input type="text"
									class="form-control" placeholder="Shelf Life" id="shelfLife"
									name="shelfLife">
							</div>
							<div class="col-sm-2">
								<label>Actual Shelf Life</label> <input type="text"
									class="form-control" placeholder="Actual Shelf Life"
									id="actualShelfLife" name="actualShelfLife">
							</div>
						</div>

					</form>
					<!-- Modal Window Edit FG Article Master Form End -->
				</div>

			</div>
			<!-- Modal Edit FG Article Master Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm voffset" type="button" name="Search"
					id="Search">
					<i class="fa fa-plus"></i> &nbsp;Create
				</button>
				&nbsp;
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Create FG Article Master Modal Pop-up Ended ##########################  -->

<!-- Edit FG Article Master Modal Pop-up Started ##########################  -->

<div class="modal fade" id="parcelData" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>
<!-- Edit FG Article Master Modal Pop-up Ended ##########################  -->
<script src="resource/oe/assets/js/app/fgArticleMaster.js"></script>
<script type="text/javascript" src="resource/oe/assets/js/app/design.js"></script>