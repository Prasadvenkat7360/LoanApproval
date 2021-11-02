<!-- 
	##	Author UI : Raksha
	## 	Author JAVA : Venkat Prasad
	## 	Date Creation : 18/08/2017
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Heading Add Started -->
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> Raise Transfer Voucher - Create</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"	id="backFromCreate"	href="javascript:showContentPage('metalTransferVoucher','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>
					
				</div>
				<!-- Heading Add Ended -->

				<!-- Search Started -->
				<form class="form-horizontal" id="raiseTvForm" action="javascript:void(0);">
				<div class="col-sm-12">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-sm-2">
							<span class="required" id="mSeg">*</span>&nbsp;<label>Metal Segment</label> 
							<select id="metalTypeIdC" class="form-control">
									<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2">
							<label>TV Date</label> 
							<input type="text" class="form-control" placeholder="TV Date" id="tvDateC" name="tvDateC" disabled>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>RM/FG</label>
							<select id="rmFgC" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2" id="docTypeHide">
							<span class="required" id="fRefDocT">*</span>&nbsp;<label>From Ref Doc Type</label> 
							<select id="refDocTypeC" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2" id="docNo">
							<span class="required" id="fRefDocN">*</span>&nbsp;<label>From Ref Doc No</label> 
							<input	type="text" class="form-control" placeholder="From Ref Doc No" id="refDocNoC" name="refDocNoC">
						</div>
						
						<div class="col-sm-2" id="docSl">
							<span class="required" id="fRefDocSN">*</span>&nbsp;<label>From Ref Doc Sl No.</label> 
							<input	type="text" class="form-control" placeholder="From Ref Doc Sl No." id="refDocSrlNoC" name="refDocSrlNoC">
						</div>
					</div>
						
					<div class="row voffset2" align="center">
				  		<button type="button" class="btn btn-primary btn-sm" id="addDetails" name="addDetails"><i class="fa fa-plus fa-lg"></i>&nbsp;Add Details</button>
					</div>
						
					<div class="clearfix">&nbsp;</div>
						
					<div class="row" id="hideRow2">		
						<div class="col-sm-2" id="fLocC">
							<span class="required">*</span>&nbsp;<label>From Location</label> 
							<input	type="text" class="form-control" placeholder="From Location" id="fromLocC" name="fromLocC">
						</div>
						<div class="col-sm-2" id="fLoc">
							<span class="required">*</span>&nbsp;<label>From Location</label> 
							<select id="fromLoctn" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>To Location</label> 
							<select id="toLocC" name="toLocC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-sm-2"  id="mPurty">
							<span class="required">*</span>&nbsp;<label>Skin Purity</label> 
							<input	type="text" class="form-control" placeholder="Skin Purity" id="sPurityC" name="sPurityC">
						</div>
						<div class="col-sm-2" id="mpurityC">
							<span class="required">*</span>&nbsp;<label>Skin Purity</label> 
							<select id="skinPurityC" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Melting Purity</label> 
							<input placeholder="Melting Purity"	type="text" class="form-control" id="mPurity" name="mPurity">
						</div>
						
						<input type="hidden" class="form-control" id="grsWtC"  name="grsWtC" placeholder="Gross Wt">
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Gross Wt</label> 
							<input	type="text" class="form-control" id="grossWtC"  name="grossWtC" placeholder="Gross Wt">
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Net Wt</label> 
							<input	type="text" class="form-control" id="netWt"  name="netWt" placeholder="Net Wt" disabled>
						</div>
					</div>
					<div class="row" id="hideRow3">
						<div class="col-sm-2">
							<label>Pure Wt</label> 
							<input type="text" class="form-control" id="pureWtC" name="pureWtC" disabled>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Pcs.</label> 
							<input placeholder="Pcs." type="text" class="form-control" id="pcsC" name="pcsC">
						</div>
						<div class="col-sm-2">
							<span class="required" id="mZoneHide">*</span>&nbsp;<label>Moved To Zone</label> 
							<select id="mZoneIdC" name="mZoneIdC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-sm-2" id="vHide">
							<span class="required">*</span>&nbsp;<label>Vendor Id</label> 
							<input placeholder="Vendor Id"	type="text" class="form-control" id="vendorC" name="vendorC">
						</div>
						<div class="col-sm-2" id="vCodeHideShow">
							<span class="required" id="vCodeHide">*</span>&nbsp;<label>Vendor Code/Name</label> 
							<select id="vendorNameC" name="vendorNameC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					
					<div class="clearfix">&nbsp;</div>
					
					<div class="heading-block-action" align="right" id="showhide">
					 	<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addStoneDetails" type="button" id="stoneDetails"><i class="fa fa-plus"></i> &nbsp;Add Stones</button>
					</div>	
					
					<div class="row">
						<div class="col-sm-12 form-field" id="gridHide">
							<div id="jqxgridD"	style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
					
					<div class="clearfix">&nbsp;</div>
					<div class="clearfix">&nbsp;</div>
					
					<div class="heading-block-action" align="right" id="accHide">
					 	<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addAccDetails" type="button"	id="accessoryDetails"><i class="fa fa-plus"></i> &nbsp;Add  Acc</button>
					</div>
					
					<div class="row">
						<div class="col-sm-12 form-field" id="gridHide">
							<div id="jqxgridA"	style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>

			<div class="clearfix">&nbsp;</div>
                <div class="modal-footer  text-center" id="footerHide">
					<button type="button" class="btn btn-primary btn-sm" id="saveRtv" name="saveRtv"><i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save</button>
					<button id="clear" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
			  	</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<div id="mySidenav" class="sidenav">
  	<div class="pull-right"><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></div>
	<jsp:include page="/WEB-INF/views/common/authorization.jsp" flush="true"></jsp:include>
</div>

<!-- Stone Details Window Started -->
<div class="modal fade" id="addStoneDetails" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%; width:95%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Add Stone Details</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneDetailsForm"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started --> 
					<div class="row">
						<div class="col-sm-2">
							<span class="required">* </span><label>Ref. Doc. No.</label> 
								<input	type="text" id="stRefDocNoC" name="stRefDocNoC" placeholder="Ref. Doc. No." disabled class="form-control" />
						</div>	
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Stone Segment</label> <select id="stoneSegC" class="form-control">
									<option value="" label="--Select--" /></select>
						</div>	
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Main Category</label> <select id="stMainCatC" class="form-control">
									<option value="" label="--Select--" /></select>
						</div>	
						<div class="col-sm-2" id="subCatDescp">
						<span class="required">* </span><label>Sub Category </label><select id="subCatDescC" class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						<div class="col-sm-2" id="shapeHideShow">
							<span class="required">*</span>&nbsp;<label>Shape</label><select id="stShapeC" class="form-control">
								<option value="" label="--Select--" /></select>
						</div>
						<div class="col-sm-2">
							<span class="required">* </span><label>Stone Code</label>
								 <input type="text" class="form-control" placeholder="Stone Code" id="stoneCodeC" disabled name="stoneCodeC">
						</div>	
						
						</div>
						<div class="row">
						<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Wt/Cost Range</label><select id="costRangeC" class="form-control">
							<!-- <option value="" label="--Select--" /> --></select>
						</div>
						<div class="col-sm-2">
						<span class="required">* </span><label>Cost Price</label> 
							<input	type="text" id="stActCostPriceC" name="stActCostPriceC" placeholder="" class="form-control" />
						</div>
						<div class="col-sm-2">
							<span class="required">* </span><label>Company Wt</label> 
								<input	type="text" id="stWeightC" name="stWeightC" placeholder="" class="form-control" />
						</div>
						<div class="col-sm-2">
							<span class="required">* </span><label>Company Pcs</label> 
								<input	type="text" id="stonePcsC" name="stonePcsC" placeholder="" class="form-control" />
						</div>
						<div class="col-sm-2" id="diRate">
							<span class="required">* </span><label>Company Rate</label> 
								<input	type="text" id="stSellingRateC" name="stSellingRateC" placeholder="" class="form-control" />
						</div>
						
						<div class="col-sm-2" id="opsRate">
						<span class="required">*</span>&nbsp;<label>Company Rate</label> <select id="stoneSellingRateC" class="form-control" >
							<option value="" label="--Select--" /></select>
						</div>	
						
						<div class="col-sm-2">
							<span class="required">* </span><label>Company Price</label> 
								<input	type="text" id="stSellingPriceC" name="stSellingPriceC" disabled placeholder="" class="form-control" />
						</div>	
						</div>
						<div class="row">
						<div class="col-sm-2">
						<span class="required">* </span><label>UQC</label>
							<input type="text" class="form-control" placeholder="UQC" value="Cts" disabled id="stUqcC" name="stUqcC">
						</div>
						<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Supplied By</label> <select id="stSuppByC" class="form-control" >
							<option value="" label="--Select--" /></select>
						</div>	
						<div class="col-sm-2" id="clarity">
						<span class="required">*</span>&nbsp;<label>Clarity</label> <select id="stClarityC" class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						<div class="col-sm-2" id="color">
						<span class="required">* </span><label>Color</label><select id="stColorC" class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						<div class="col-sm-2" id="cutGrade">
						<span class="required">* </span><label>Cut Grade</label><select id="stCutGradeC" class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						 <div class="col-sm-2" id="actualColr">
						<span class="required">* </span><label>Actual Color</label><select id="stActColorC" class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						
						</div>
						<div class="row">
						  <div class="col-md-9 form-field" id="subCatHideShow">
							<label>Sub Cat Desc</label>
							<textarea rows="2" cols="50" id="subCatDescpC" name="subCatDescpC" disabled placeholder="Sub Cat Description" class="form-control"></textarea>
						</div>
						 
					</div>
				</div>
				<!--  Stone Details Window Ended 
				Stone Details Footer -->
				<br>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm voffset" type="button" data-dismiss="modal" name="addStoneDet" id="addStoneDet"><i class="fa fa-plus fa-lg"></i> &nbsp;Add</button>
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
			</div>
			</form>
		</div>
	</div>
</div>
<!-- Stone Details Window Ended

Accessory Details Window Started -->
<div class="modal fade" id="addAccDetails" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%; width:95%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Add Accessory Details</h3>
			</div>
			 <!-- Modal Window Content Started  -->
			<form class="form-horizontal" id="accDetailsForm"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-sm-2">
							<span class="required">* </span><label>Ref. Doc. No</label> 
								<input	type="text" id="accStockNoC" name="accStockNoC" disabled placeholder="Stock No" class="form-control" />
						</div>	
						<div class="col-sm-2">
							<span class="required">* </span><label>Acc. Srl No</label> 
								<input	type="text" id="accSrlNoC" name="accSrlNoC" placeholder="Acc. Srl No" class="form-control" />

						</div>	
						<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Supplied By</label> <select id="accSuppliedByC" class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Main Cat</label> <select id="accMainCatC" class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Sub Category</label> <select id="accSubCatDescC" class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						<div class="col-sm-2">
							<span class="required">* </span><label>Accessory Code</label>
								 <input type="text" class="form-control" disabled placeholder="Accessory Code" id="accCodeC" name="accCodeC">
						</div>
						</div>
						<div class="row">					
					    <div class="col-sm-2">
							<span class="required">* </span><label>Weight</label>
								<input type="text" class="form-control" id="accWtC" name="accWtC" placeholder="Weight">
						</div>	
						<div class="col-sm-2">
								<span class="required">* </span> <label>Acc. Rate</label><select
									id="accSellingRateC" name="accSellingRateC" class="form-control">
									<option value="" selected label="--Select--" />
								</select> <input type="hidden" id="rateList" />
							</div>
						<div class="col-sm-2">
							<span class="required">* </span><label>Acc Pieces</label> 
								<input type="text" class="form-control" id="accCostPriceC" placeholder="Cost Price" name="accCostPriceC">
						</div>
						<div class="col-sm-2">
							<span class="required">* </span><label>Selling Price</label> 
								<input type="text" class="form-control" id="accSellingPriceC" disabled placeholder="Selling Price" name="accSellingPriceC">
						</div>
						<div class="col-sm-2">
								<span class="required">* </span> <label>UOM</label> <input
									type="text" id="accUomC" name="accUomC" placeholder="UOM"
									value="Pcs" class="form-control" disabled />
							</div>	
					</div>
				</div>
				<!-- 	 Stone Details Window Ended Stone Details Footer -->
				<div class="modal-footer  text-center">
					<button class="btn btn-primary btn-sm voffset" type="button" data-dismiss="modal" name="addAccDet" id="addAccDet"><i class="fa fa-plus fa-lg"></i> &nbsp;Add</button>
					<button type="submit" class="btn btn-warning btn-sm " data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Accessory Details Window Ended -->


<script src="resource/oe/assets/js/app/metalTransferVoucher.js" type="text/javascript"></script>


