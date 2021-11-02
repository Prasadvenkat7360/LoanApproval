<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 09/05/2016
 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript">
	$("#Search").on('click', function() {
		var status = $("#statusS").val();
		if($("#accSegment").val() == "" || $("#accSegment").val() == "" ){
			$.growl.error({
				message : "Please Select Accessory Segment !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		if(status  == "" ||  status == null){
			$.growl.error({
				message : "Please Select Status !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		accArticleMasterGrid();
		$("#jqxgrid").show();
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
						<i class="fa fa-desktop"></i> Accessory Master
					</h1>
					<div class="heading-block-action">
						<!-- <button data-target="#sentParcel" data-toggle="modal"   type="button" class="btn btn-primary pull-right" ><i class="fa fa-plus-circle fa-lg"></i> &nbsp;Create</button> -->
						<button class="btn btn-primary btn-sm" data-toggle="modal" id="create"
							data-target="#accessoryMasterModal" type="button">
							<i class="fa fa-plus"></i> &nbsp;Create
						</button>
					</div>
				</div>
				<!-- FG Article Master Heading Add Ended -->

				<!-- FG Article Master Search Started -->
				<form class="form-horizontal" id="accessoryMasterForm" action="javascript:void(0);">
						<div class="row">	
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Accessory Segment</label>
								<select id="accSegment" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<%-- <div class="col-sm-2">
								<label>Accessory Segment</label> <select id="accSegment"
									class="form-control" >
									<!-- option value="" selected label="--Select--" /-->
									<c:forEach var="metalSegment" items="${metalSegment}">
										<option selected value="${metalSegment.id}">${metalSegment.description}</option>
									</c:forEach>
								</select>
							</div> --%>

							<div class="col-sm-2">
								<label>Main Category</label> <select id="mainCategory"
									class="form-control">
									<option value="">--Selected--</option>
									<c:forEach var="mainCatList" items="${mainCatList}">
										<option value="${mainCatList.id}">${mainCatList.description}</option>
									</c:forEach>
								</select>
							</div>

							<div class="col-sm-2">
								<label>Sub Category</label> <select id="subCategory"
									class="form-control">
									<option value="">--Selected--</option>
								</select> 	
							</div>

							<div class="col-sm-2">
								<label>Article Code</label> <input class="form-control"
									type="text" placeholder="Article Code" id="articleCode">
							</div>
						
							<div class="col-sm-2">
								<label>Region Name</label> <select id="storeRegionNameCTA"
									class="form-control">
									<option value="">--Selected--</option>
								
								</select>
							</div>	
							<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Status</label><select id="statusS" name="statusS" class="form-control">
										<option value="True" selected>Active</option>
										<option value="False">In-Active</option></select>
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
                           <button class="btn btn-primary btn-sm voffset" type="button"
									name="downloadacctemplate" id="downloadacctemplate">
									<i class="fa fa-file-excel-o fa-lg"></i> Download Data
						   </button>
							
							<div  class="fileUploadP btn btn-primary btn-sm voffset">
						        <span  class="glyphicon glyphicon-upload"></span> Upload file
						        <input  id="accDetailUpload" type="file" onchange="captureFileSelectEvent(event)"/>
						    </div>
							<button  class="btn btn-primary btn-sm voffset" onclick="HandleUploadExcelFile()">Upload Excel Data</button>
	    						<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportAudit" id="exportAudit">
								<i class="fa fa-file-excel-o"></i> Export To Audit
							</button>											    
							<p id="fileUploadError" class="text-danger hide"></p>							
							<div class="list-group" id="files"></div>

						</div>
				</form>
				<!-- FG Article Master Search Ended -->

				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started -->
				<div class="col-md-12" style="position: relative; z-index: 1">
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
<div class="modal fade" id="accessoryMasterModal" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabel"></label>
				</h3>
			</div>
			<!-- Modal Create FG Article Master Body -->
			<div class="modal-body">
				<div class="container sentParcel-Edit">
					<form class="form-horizontal" id="accessoryMasterform" action="">
						<!-- First Row Started -->
						<div class="row">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Region</label> 
									<select id="regionC" class="form-control" name="regionC">
									<option value="" label="--Select--"/></select>
							</div>
							
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Accessory Segment</label>
								<select id="accSegmentC" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Main
									Category</label> <select id="mainCategoryP" class="form-control">
									<option value="">--Select--</option>
									<c:forEach var="mainCatList" items="${mainCatList}">
										<option value="${mainCatList.id}">${mainCatList.description}</option>
									</c:forEach>
								</select>
							</div>

							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Sub Category</label>
								<select id="subCategoryP" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>


						</div>
						<div class="row">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>UOM</label> <input
									type="text" class="form-control" disabled placeholder="pcs"
									value="Pcs" id="uomP">
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Article Code</label>
								<input class="form-control" disabled type="text"
									placeholder="Article Code" id="articleCodeP">
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Article Description</label> <input type="text" disabled
									class="form-control" placeholder="Article Description"
									id="articleDescP">
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Customer
									Flag</label> <select id="customerFlag" class="form-control">
									<option value="true">Yes</option>
									<option value="false" selected>No</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div id="custHandleChargesDiv"
								class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Customer
									Handle charges</label> <input type="text" class="form-control"
									placeholder="Customer Handle charges" id="custHandleCharges" />
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="cdate">
							<label>Created Date</label> <input type="text" class="form-control" placeholder=""
								 id="createdDateC" name="createdDateC" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="crBy">
							<label>Created By</label> <input type="text" class="form-control" placeholder=""
								 id="createdByC" name="createdByC" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="hsnCode">
								<span class="required">*</span>&nbsp;<label>HSN Code</label> 
								<select id="hsnCodeC" class="form-control">
									<option value="">--Select--</option>
									<%-- <c:forEach var="hsnCodes" items="${hsnCodes}">
										<option value="${hsnCodes.id}">${hsnCodes.name}</option>
									</c:forEach> --%>
								</select>
							</div>
							</div>
						
							
						<!-- 	<div class="row">
							
							</div>
						 -->
						<div id="popUpGridDiv" class="row search-customer-result-con">
							<div class="heading-block">
								<h3>
									<i class="fa fa-desktop"></i> Accessory Details
								</h3>
								<div class="heading-block-action">

									
								</div>
								<div class="heading-block-action pull-right">
									<div class="col-md-2 form-group"></div>
									<div class="col-md-4 form-group">
										<input type="text" name="startVal" id="startVal"
											placeholder="Start Value" class="form-control" />
									</div>
									&nbsp;&nbsp;
									<div class="col-md-4 form-group">
										<input type="text" name="jumpVal" id="jumpVal"
											placeholder="Jump Value" class="form-control" />
									</div>
									<a class="btn btn-primary" id="addAccArticles"
										type="button"><i class="fa fa-plus"></i>&nbsp;Add </a>
									<button id="delete" class="btn btn-lg btn-danger" type="button" data-toggle="collapse" disabled>
									<i class="fa fa-trash fa-1"></i>&nbsp; Delete
									</button>
										
									<div class="clearfix">&nbsp;</div>
								</div>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-12 form-field">
							
								<div class="voffset3" style="position: relative;">
									<div class="table-responsive">
										<!-- JqGrid Started -->
										<div style="position: relative; z-index: 1">
											<div id="jqxgridp"
												style="font-size: 13px; font-family: Verdana; float: left;"></div>
										</div>
										<!-- JqGrid Ended -->
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
							</div>
							
						
						</div>
					</form>
					
						<div class="clearfix">&nbsp;</div>
						<div class="modal-footer  text-center">
								<button class="btn btn-primary btn-sm" type="button" name="save"
									id="save">
									<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
								</button>
								&nbsp;
								<button type="submit" class="btn btn-warning btn-sm"
									data-dismiss="modal">
									<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
								</button>
						</div>
					<!-- Modal Window Edit FG Article Master Form End -->
				</div>

			</div>
			<!-- Modal Edit FG Article Master Footer -->

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

<div class="modal fade" id="btnEditAccessory" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp;Edit Accessory Article
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="shapeE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input type="hidden" id="accMasterIdE" value="" />
						<input type="hidden" id="regionIdE" value="" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Region</label> <input type="text"
								class="form-control" placeholder="Region" disabled
								id="regionE" name="regionE">
						</div>
						
						<input type="hidden" id="accessoryMasterIdE" value="" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Accessory Segment</label> <input type="text" class="form-control"
								disabled id="accSegE" name="accSegE">
						</div>
						
						<input type="hidden" id="accMainCatIdE" value="" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Main Category</label> <input
								type="text" class="form-control" id="accMainCatE" name="accMainCatE" disabled>
						</div>
						
						<input type="hidden" id="accSubCatIdE" value="" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Sub Category</label> <input
								type="text" class="form-control" id="accSubCatE" name="accSubCatE" disabled>
						</div>
						
								
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>UOM</label> <input
								type="text" class="form-control" id="accUomE" name="accUomE" disabled>
						</div>
					    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Article Code</label> <input type="text" class="form-control"
								disabled id="articleCodeE" name="articleCodeE">
						</div>	
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Article Description</label> <input type="text" class="form-control"
								id="articleDescE" name="articleDescE" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Customer Flag</label> <input type="text"
								class="form-control" placeholder="Customer Flag" disabled
								id="custFlagE" name="custFlagE">
						</div>
						
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span><label>HSN Code</label> <select id="hsnCodeE"
									class="form-control">
									<option value="">--Selected--</option>
								</select> 	
							</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Updated By</label> <input type="text" class="form-control"
								id="updatedByE" name="updatedByE" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created Date</label> <input type="text"
								class="form-control" placeholder="Created Date" disabled
								id="createdDateE" name="createdDateE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Updated Date</label> <input type="text"
								class="form-control" placeholder="Updated Date" disabled
								id="updatedDateE" name="updatedDateE">
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="hideShowCH">
							<label>Customer Handling Charges</label> <input type="text"
								class="form-control" placeholder="Customer Handling Charges" id="handlingChargesE" name="handlingChargesE">
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div id="editPopUpGrid">
							<div class="heading-block">
								<h3>
									<i class="fa fa-desktop"></i> Accessory Details
								</h3>
								<div class="heading-block-action">
									<button id="addAccE" class="btn btn-primary btn-sm" type="button" data-toggle="collapse">
										<i class="fa fa-plus"></i>&nbsp; Add
									</button>
									<div class="clearfix">&nbsp;</div>
								</div>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-12 form-field">
								<div class="voffset3" style="position: relative;">
									<div class="table-responsive">
										<!-- JqGrid Started -->
										<div style="position: relative; z-index: 1">
											<div id="jqxgridE"
												style="font-size: 13px; font-family: Verdana; float: left;"></div>
										</div>
										<!-- JqGrid Ended -->
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
							</div>
							
						
						</div>
					

				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editAccE"
						name="editAccE">
						<i class="fa fa-save"></i>&nbsp;Save
					</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Edit FG Article Master Modal Pop-up Ended ##########################  -->
<script src="resource/oe/assets/js/app/accArticleMaster.js"
	type="text/javascript"></script>
