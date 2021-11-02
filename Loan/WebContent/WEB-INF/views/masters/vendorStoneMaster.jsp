<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : MD IMRAN ALI
	## 	Date Creation : 16/08/2016
 -->
 
<div class="main-container">
	<div class="container-fluid">
		<div id="headerSection" class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Stone Vendor Master Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Vendor Stone
					</h1>
					<div class="heading-block-action">					
						<button class="btn btn-primary" type="button" id="create" ><i class="fa fa-plus-circle fa-lg"></i> &nbsp;Create </button>					
					</div>
				</div>
				<!-- Stone Vendor Master Heading Add Ended -->

				<!-- Stone Vendor Master Search Started -->
				<form class="form-horizontal" id="designRA" action="javascript:void(0);">
						<div class="row">
							<div class="col-sm-2">
								<label>From Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"	id="stoneVendorDateFrom" placeholder="DD/MM/YYYY">
									<label for="stoneVendorDateFrom" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>To Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"	id="stoneVendorDateTo" placeholder="DD/MM/YYYY"> 
									<label for="stoneVendorDateTo" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Business</label> 
								<select id="businessS" class="form-control"><option value="" selected label="Select" /></select>
							</div>
							
							<!-- <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<span class="required">*</span>&nbsp;<label>Region</label> 
								<select id="regionS" class="form-control"><option value="" selected label="Select" /></select>
							</div> -->
							
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Vendor</label>
								<input type="text"	class="form-control" placeholder="Vendor Code/Name"	id="vendorCode" name="vendorCode">
								<input id="vendorCode-value" type="hidden" name="code">
							</div>		
																			
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Stone Segment</label> 
								<select id="stoneSegment" class="form-control"><option value="" selected label="Select" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>Main Category</label> 
								<select id="stoneCategory"	class="form-control"><option value="" selected label="Select" /></select>
							</div>
							
							<div class="col-sm-2" id="Show_Shape">
								<label>Shape</label><select id="Shape"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2" id="Show_SubCategory">
								<label>Sub Category</label>
								<select id="subCategory" class="form-control"><option value="" selected label="Select" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>Stone Code</label><input type="text"  disabled
									class="form-control" placeholder="Stone Code" id="stoneCode">
							</div>
						
							<div class="col-sm-2" id="showClarity">
								<label>Clarity</label><select id="clarity" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2" id="showActualColor">
								<label>Actual Color</label><select id="actualColor"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2" id="showColor">
								<label>Color</label><select id="color" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2" id="showCutGrade">
								<label>Cut Grade</label><select id="cutGrade"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							
							
							<div class="col-sm-2" id="Show_SubCategory">
								<label>From Wt/Cost</label>
								<select id="fromWtCost" class="form-control"><option value="" selected label="Select" /></select>
							</div>
							
							<div class="col-sm-2" id="Show_SubCategory">
								<label>To Wt/Cost</label>
								<select id="toWtCost" class="form-control"><option value="" selected label="Select" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>Status</label><select id="status" class="form-control">
									<option value="">--Select Option--</option>
									<option value="1" selected>Active</option>
									<option value="0">In-Active</option>
								</select>
							</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="Search"><i class="fa fa-search fa-lg"></i> Search</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							&nbsp;
							<button id="exportA" class="btn btn-primary btn-sm voffset"  type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Export Active</button>
							&nbsp; 
							<button id="export" class="btn btn-primary btn-sm voffset"  type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Export In-Active</button>						
							<button class="btn btn-primary btn-sm voffset" type="button"
									name="downloadVfgData" id="downloadVfgData">
									<i class="fa fa-file-excel-o fa-lg"></i> Download Data
							</button>
							<div  class="fileUploadP btn btn-primary btn-sm voffset">
						        <span  class="glyphicon glyphicon-upload"></span> Upload file
						        <input  id="vendorStoneUpload" type="file" onchange="captureFileSelectEvent(event)"/>
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
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>

			</div>
		</div>
		<!-- Create Stone Vendor  Section Started ##########################  -->
		<div id="stoneVendorMasterCreate">
			<div class="clearfix">&nbsp;</div>
			<div class="heading-block">
				<h1><i class="fa fa-desktop"></i> &nbsp; Vendor Stone Details - Create</h1>
				<div class="heading-block-action">
					<a class="btn btn-primary" href="javascript:showContentPage('vendorStoneSearch', 'bodySwitcher')" id="goBack" type="button" ><i class="fa fa-arrow-left"></i>&nbsp;Go Back </a>					
				</div>	
			</div>
			<form class="form-horizontal" id="createStoneVendor"  action="javascript:void(0);">
					<div class="row">						
						<div class="col-sm-2">
							<span class="required">*</span><label>Vendor</label>
							<input type="text"	class="form-control" placeholder="Vendor Code/Name"	id="vendorCodeC" name="vendorCodeC">
							<input id="vendorCodeC-value" type="hidden" name="code">
						</div>		
																		
						<div class="col-sm-2">
							<span class="required">*</span><label>Stone Segment</label> 
							<select id="stoneSegmentC" class="form-control"><option value="" selected label="Select" /></select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span><label>Stone Category</label> 
							<select id="stoneCategoryC"	class="form-control"><option value="" selected label="Select" /></select>
						</div>
						
						<div class="col-sm-2" id="Show_ShapeC">
							<span class="required">*</span><label>Shape</label><select id="ShapeC"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2" id="Show_SubCategoryC">
							<span class="required">*</span><label>Sub Category</label>
							<select id="subCategoryC" class="form-control"><option value="" selected label="Select" /></select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span><label>Code</label><input type="text"  disabled
								class="form-control" placeholder="Stone Code" id="stoneCodeC">
								<input type="hidden" class="form-control" placeholder="Stone Id" id="stoneCodeIdC">
						</div>			
						
						
						<div class="col-sm-2">
							<span class="required">*</span><label>UOM</label>
							<input type="text"  class="form-control" disabled placeholder="UOM" id="uomC">
						</div>		
					</div>
					<div class="row">
						<div class="col-sm-2" id="showClarityC">
							<span class="required">*</span><label>Clarity</label><select id="clarityC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2" id="showActualColorC">
							<span class="required">*</span><label>Actual Color</label><select id="actualColorC"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2" id="showColorC">
							<span class="required">*</span><label>Color</label><select id="colorC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2" id="showCutGradeC">
							<span class="required">*</span><label>Cut Grade</label><select id="cutGradeC"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>			
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<label>Handling Charges</label>
							<input type="text"  class="form-control" placeholder="Handling Charges" id="handlingCharges">
						</div>	
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span>&nbsp;<label>Vendor HSN Code</label>
							<input type="text"  class="form-control" placeholder="Vendor HSN Code" id="vendorHsnCodeC">
						</div>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<span class="required">*</span>&nbsp;<label>Company HSN Code</label> 
								<select id="compHsnCodeC" class="form-control">
									<option value="">--Select--</option>
								</select>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row text-center">
				       <button id="addVendorStone" class="btn btn-primary btn-sm" type="button"><i class="fa fa-plus fa-md"></i>&nbsp; Add Details</button>
			        </div>
			</form>
		     <div class="clearfix">&nbsp;</div>
			 <div style="position: relative; z-index: 1">
				<div id="vendorStoneCreateGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
			</div>
			<div class="clearfix">&nbsp;</div>
			 <div class="row" id="footerSection" align="center">
		 		<button class="btn btn-primary btn-sm" type="button" name="saveVendorStone" id="saveVendorStone"><i class="fa fa-plus fa-lg"></i> Save</button>
				&nbsp;
				<button id="resetVendorStone" class="btn btn-warning btn-sm" ><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>					
			</div>
		</div>
	</div>
</div>

<!-- Edit Stone Vendor Master Modal Pop-up Ended ##########################  -->
<div class="modal fade" id="editStonendorDet" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Vendor Stone Details - Edit
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);" id="editStoreDetailsForm">
				<div class="col-md-12 mobile-responsive">
				<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">	
						<input type="hidden" id="vendorStoneDetID" />	
						<input type="hidden" id="vendorStoneID" />									
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<label>Vendor</label>
							<input type="text"	class="form-control" placeholder="Vendor Code/Name"	id="vendorCodeNameE" disabled name="vendorCodeNameE">
							<input id="vendorCodeE-value" type="hidden" name="code">
							<input id="vendorCodeE" type="hidden" name="code">
						</div>		
																		
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<label>Stone Segment</label> 
							<!-- <select id="stoneSegmentE" disabled class="form-control"><option value="" selected label="Select" /></select> -->
							<input type="hidden" id="stoneSegIdE">
							<input type="text"	class="form-control" placeholder="Stone Segment" id="stoneSegmentE" disabled name="stoneSegmentE">
						</div>
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<label>Stone Category</label> 
							<!-- <select id="stoneCategoryE"	 disabled class="form-control"><option value="" selected label="Select" /></select> -->
							<input type="text"	class="form-control" placeholder="Category" id="stoneCategoryE" disabled name="stoneCategoryE">
						</div>
						
							<!--  id="Show_SubCategoryE" -->
						<!-- <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field" id="subCatEditSection">
							<label> Stone Sub Category</label>
							<select id="subCategoryE" disabled class="form-control"><option value="" selected label="Select" /></select>
							<input type="text"	class="form-control" placeholder="Sub Category" id="subCategoryE" disabled name="subCategoryE">
						</div>
						 -->
					
						<!--  id="Show_ShapeE" -->
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field" id="shapeEditSection">
							<label>Shape</label><!-- <select id="ShapeE" disabled
								class="form-control">
								<option value="" selected label="Select" />
							</select> -->
							<input type="text"	class="form-control" placeholder="Shape" id="ShapeE" disabled name="ShapeE">
						</div>
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<label>Code</label><input type="text"  disabled
								class="form-control" placeholder="Stone Code" id="stoneCodeE">
								<input type="hidden" class="form-control" placeholder="Article Code" id="stoneCodeIdE">
						</div>			
					
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<label>UOM</label>
							<input type="text"  class="form-control" disabled placeholder="UOM" id="uomE">
						</div>													
						<!-- id="showClarityE" -->			
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field" id="clarityEditSection">
							<label>Clarity</label><!-- <select id="clarityE" disabled class="form-control">
								<option value="" selected label="Select" />
							</select> -->
							<input type="text"  class="form-control" disabled placeholder="Clarity" id="clarityE">
						</div>
						<!-- id="showActualColorE" -->
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field" id="actualColorEditSection">
							<label>Actual Color</label><!-- <select id="actualColorE" disabled
								class="form-control">
								<option value="" selected label="Select" />
							</select> -->
							
							<input type="text"  class="form-control" disabled placeholder="Actual Color" id="actualColorE">
						</div>
						<!--  id="showColorE" -->
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field" id="colorEditSection">
							<label>Color</label><!-- <select id="colorE" disabled class="form-control"> 
								<option value="" selected label="Select" />
							</select> -->
							<input type="text"  class="form-control" disabled placeholder="Color" id="colorE">
						</div>
						<!--  id="showCutGradeE" -->
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field"  id="cutGradeEditSection">
							<label>Cut Grade</label><!-- <select id="cutGradeE" disabled
								class="form-control">
								<option value="" selected label="Select" />
							</select> -->
							<input type="text"  class="form-control" disabled placeholder="Cut Grade" id="cutGradeE">
						</div>
													
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span><label>Selling Rate</label>
							<input type="text" disabled class="form-control" placeholder="Selling Rate" id="sellingRateE" >
						</div>
						
				
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<label>Handling Charges</label>
							<input type="text"  class="form-control" placeholder="Handling Charges" id="handlingChargesE">
						</div>	
									
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span><label>From Cost/ Wt Range</label>
							<input type="text" disabled  class="form-control" placeholder="From Cost Range" id="fromCostRangeE">
						</div>
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span><label>To Cost/ Wt Range </label>
							<input type="text" disabled class="form-control" placeholder="To Cost Range" id="toCostRangeE">
						</div>
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span><label>Cost Price</label>
							<input type="text"  class="form-control" placeholder="Wt/Cost Range" id="costPriceE">
							<input type="hidden"  class="form-control" id="colorDiamondFromCost">
							<input type="hidden"  class="form-control" id="colorDiamondToCost">
							<input type="hidden"  class="form-control" id="segmentIdE">
							<input type="hidden"  class="form-control" id="CatIdE">
						</div>
								
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span><label>Direct %</label>
							<input type="text"  class="form-control" placeholder="Direct %" id="directPerE">
						</div>	
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span><label>Exchange %</label>
							<input type="text"  class="form-control" placeholder="Exchange  %" id="exchangePerE">
						</div>
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span>&nbsp;<label>Vendor HSN Code</label>
							<input type="text"  class="form-control" placeholder="Vendor HSN Code" id="vendorHsnCodeE">
						</div>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<span class="required">*</span>&nbsp;<label>Company HSN Code</label> 
								<select id="compHsnCodeE" class="form-control">
									<option value="">--Select--</option>
								</select>
						</div>
				
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Store Master Footer -->
			<div class="modal-footer  text-center">
				<button type="submit" class="btn btn-primary btn-sm" id="saveStoreMasterE"
					name="saveStoreMasterE">
					<i class="fa fa-save"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
		</div>
	</div>
</div>	
<script src="resource/oe/assets/js/app/VendorStoneSearch.js"></script>
<script src="resource/oe/assets/js/app/vendorStone.js"></script>

<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>