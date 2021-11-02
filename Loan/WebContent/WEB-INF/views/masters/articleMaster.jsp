<!-- 
	##	Author UI : Ajay Prasad
	## 	Author JAVA : Ajay Prasad
	## 	Date Creation : 23/05/2016
 -->
<script type="text/javascript">
	var $sTypes = $('#sTypes');
	var $mainCatList = $('#mainCatList');
	var $articleFlag = $('#articleFlag');
	var segmentId1 = -1;
	$.getJSON(
			'/OrderExecution/api/v1/fgArticleMasterLOV?page=search&criteria=sTypes&id='
					+ segmentId1, function(data) {

				//iterate over the data and append a select option
				$.each(data.payload.sTypes, function(key, val) {
					$sTypes.append('<option value="' + val.id + '">'
							+ val.description + '</option>');
				});
				$.each(data.payload.articleFlag, function(key, val) {
					$articleFlag.append('<option value="' + val.id + '">'
							+ val.name + '</option>');
				});

			});

	$("#sTypes")
			.on(
					"change",
					function() {
						var segmentId = $('#sTypes').val();
						var $jewelType = $('#jewelType');
						if (segmentId != "") {
							$
									.getJSON(
											'/OrderExecution/api/v1/fgArticleMasterLOV?criteria=jewelType&id='
													+ segmentId,
											function(data) {
												$jewelType
														.empty()
														.append(
																'<option value="" selected>Select</option>');
												//iterate over the data and append a select option
												$
														.each(
																data.payload.jewelType,
																function(key,
																		val) {
																	$jewelType
																			.append('<option value="' + val.id + '">'
																					+ val.description
																					+ '</option>');
																});
											});
						} else {
							$jewelType
									.empty()
									.append(
											'<option value="" selected>Select</option>');
						}
					});
	$("#jewelType")
			.on(
					"change",
					function() {
						var segmentId = $('#sTypes').val();
						var jewelType = $('#jewelType').val();
						if (segmentId != "") {
							$
									.getJSON(
											'/OrderExecution/api/v1/fgArticleMasterLOV?criteria=mCategory&id='
													+ segmentId + '&jwTypeId='
													+ jewelType,
											function(data) {
												$mainCatList
														.empty()
														.append(
																'<option value="" selected>Select</option>');
												//iterate over the data and append a select option
												$
														.each(
																data.payload.mainCatList,
																function(key,
																		val) {
																	$mainCatList
																			.append('<option value="' + val.id + '">'
																					+ val.description
																					+ '</option>');
																});

											});
						} else {
							$mainCatList
									.empty()
									.append(
											'<option value="" selected>Select</option>');
						}

						$('#sCategory').empty().append(
								'<option value="" selected>Select</option>');

					});

	$("#mainCatList")
			.on(
					"change",
					function() {
						var mainCatList = $('#mainCatList').val();
						var $sCategory = $('#sCategory');
						var jewelType = $('#jewelType').val();
						if (mainCatList != "") {
							$
									.getJSON(
											'/OrderExecution/api/v1/fgArticleMasterLOV?criteria=sCategory&id='
													+ mainCatList
													+ '&jwTypeId=' + jewelType,
											function(data) {
												$sCategory
														.empty()
														.append(
																'<option value="" selected>Select</option>');
												//iterate over the data and append a select option
												$
														.each(
																data.payload.sCategory,
																function(key,
																		val) {
																	$sCategory
																			.append('<option value="' + val.id + '">'
																					+ val.description
																					+ '</option>');
																});

											});
						} else {
							$sCategory
									.empty()
									.append(
											'<option value="" selected>Select</option>');
						}
					});

	$("#Search").on('click', function() {
		fgArticleMasterGrid();
		$("#jqxgrid").show();
		return false;
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
						<i class="fa fa-desktop"></i> Article Master
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#fgArticleMasterModal" type="button" href="article" id="articleMasterCreate"><i	class="fa fa-plus"></i> &nbsp;Create </a>
					</div>
				</div>
				<!-- FG Article Master Heading Add Ended -->

				<!-- FG Article Master Search Started -->
				<form class="form-horizontal" id="fgArticleSearch" action="javascript:void(0);">
						<div class="row">
							<div class="col-sm-2">
								<label>Segment</label> <select id="sTypes" class="form-control">
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
								<label>Main Category</label> <select id="mainCatList"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Sub Category</label> <select id="sCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						
							<div class="col-sm-2">
								<label>Article Code</label> <input type="text"
									class="form-control" placeholder="Article Code"
									id="articleCode">
							</div>
							<div class="col-sm-2">
								<label>Article Flag</label> <select id="articleFlag"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
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
                           	&nbsp;
                           	<button class="btn btn-primary voffset" type="button"
									name="exportFGA" id="exportFGA">
									<i class="fa fa-file-excel-o fa-lg"></i> Download Data
						   	</button>
						   	&nbsp;	
						   	<div  class="fileUploadP btn btn-primary voffset">
						        <span  class="glyphicon glyphicon-upload"></span> Upload file
						        <input  id="fgArticleUpload" type="file" onchange="captureFileSelectEvent(event)"/>
						   	</div>
							&nbsp;
							<button  class="btn btn-primary voffset" onclick="HandleUploadExcelFile()">Upload Excel Data</button>
	    						<!-- <div  class="fileUploadP btn btn-primary voffset">
							        <span class="glyphicon glyphicon-upload"></span> Upload file
							        <input  type="file" id="uploadFile" />
							    </div> -->
							&nbsp;
							<button class="btn btn-primary voffset" type="button" name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export To Audit
							</button>    
							<p id="fileUploadError" class="text-danger hide"></p>
								
							<div class="list-group" id="files"></div>
								
							
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

<div class="modal fade" id="fgArticleMasterModal" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
		</div>
	</div>
</div>

<div class="modal fade" id="fgArticleMasterModalEdit" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Edit Article 
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneArtMasterCreateC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>		
					<div class="row">
							<input type="hidden" id="articleId">

							<div class="col-sm-2">
								<span class="required">*</span> <label>Segment</label> <input
									type="text" disabled class="form-control" id="sTypes2"
									name="sTypes2">
									<input type="hidden" disabled class="form-control" id="sTypesHide" name="sTypesHide">
									<input type="hidden" disabled class="form-control" id="hsnHide" name="hsnHide">
									<input type="hidden" disabled class="form-control" id="mupTypeIdHide" name="mupTypeIdHide">
									<input type="hidden" disabled class="form-control" id="articleIdHide" name="articleIdHide">
							</div>

							<div class="col-sm-2">
								<span class="required">*</span> <label>Jewel Type </label> <input
									type="text" disabled class="form-control" id="jewelType2">
							</div>

							<div class="col-sm-2">
								<span class="required">*</span> <label>Main Category</label> <input
									type="text" disabled class="form-control" id="mainCatList2">
							</div>

							<div class="col-sm-2">
								<span class="required">*</span><label>Sub Category</label> <input
									type="text" disabled class="form-control" id="sCategory2">
							</div>
						</div>
					<div class="row">
							<div class="col-sm-2">
								<label>Article Code</label> <input type="text" disabled
									class="form-control" id="articleCode2">
							</div>
							<div class="col-sm-2">
								<label>Article Description</label> <input type="text" disabled
									class="form-control" id="articleDesc2">
							</div>
							<div class="col-sm-2">
								<span class="required">*</span> <label>Article Flag</label>
								 <select id="articleFlag2" class="form-control">
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span> <label>Order Unit</label>
								 <select id="orderUnit2" class="form-control">
								</select>
							</div>
					  </div>
					  <div class="row">
						<div class="col-sm-2">
							<span class="required">*</span> <label>MUP Category</label> <select
								id="mupCategory1" class="form-control">
							</select>
						</div>
						<div class="col-sm-2">
							<label>Min. Wt.</label> <input type="number"
								class="form-control" placeholder="Min Weight" id="minWt"
								name="minWt1" min="0.001" max="99999999.999" />
						</div>
						<div class="col-sm-2">
							<label>Max. Wt.</label> <input type="number"
								class="form-control" placeholder="Max Weight" id="maxWt"
								name="maxWt" min="0.001" max="99999999.999">
						</div>	
						<div class="col-sm-2">
							<span class="required">*</span> <label>Active Y/N</label> <input
								type="text" class="form-control" id="activeYN2"
								name="activeYN2" disabled="disabled">

						</div>
					 </div>
					 <div class="row">
						<!-- <div class="col-sm-2">
							<span class="required">*</span> <label>Active Y/N</label> <select
								id="activeYN2" class="form-control">
							</select>
						</div> -->
						<div class="col-sm-2">
							<label>Shelf Life</label> <input type="number"
								class="form-control" placeholder="Shelf Life" id="shelfLife1"
								name="shelfLife" min="0.01" max="99999999.99">
						</div>
						<div class="col-sm-2">
							<label>Actual Shelf Life</label> <input type="number"
								class="form-control" placeholder="Actual Shelf Life"
								id="actualShelfLife1" name="actualShelfLife" min="0.01"
								max="99999999.99">
						</div>

						<div class="col-sm-2">
							<span class="required">*</span> <label>HSN Code</label> <select
								id="hsnCode1" class="form-control">
							</select>
						</div>
					</div>
				</div>
		   </form><div class="clearfix">&nbsp;</div>
		   <div class="modal-footer  text-center">
			<button class="btn btn-primary btn-sm voffset" type="button" name="save"
				id="save">
				<i class="fa fa-fa fa-floppy-o"></i> &nbsp;Save
			</button>
			&nbsp;
			<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
				<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
			</button>
         </div>
	  </div>
   </div>
</div>

<!-- Edit FG Article Master Modal Pop-up Ended ##########################  -->
<script src="resource/oe/assets/js/app/fgArticleMaster.js"></script>
