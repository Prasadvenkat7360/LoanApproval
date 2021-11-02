<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 06/05/2016
 -->

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Vendor Cost Maintenance - Edit
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary voffset" type="button"
							id="backToListingFromEdit"
							href="javascript:showContentPage('vendorCostMaintenanceListing', 'bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>
				</div>
				<!-- Send Parcel Heading Add Ended -->

				<!-- Send Parcel Search Started -->
				<form class="form-horizontal" id="vcmSearch">
					<div class="mobile-responsive">
						<div>
							<div>
								<h4>
									<i class="fa fa-search"></i> Search
								</h4>
							</div>
							<!-- Row 1 Started -->
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Vendor Code</label> <input id="vendorCode"
										class="form-control" type="text" placeholder="Vendor Code" disabled>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Segment </label> <input id="segment"
										class="form-control" type="text" placeholder="Segment" disabled >
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Jewel Type Name</label> <input id="jewelType"
										class="form-control" type="text" placeholder="Jewel Type Name" disabled>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Main Category Name</label> <input id="mainCategory"
										class="form-control" type="text"
										placeholder="Main Category Name" disabled>
								</div>
							</div>
							<!-- Row 2 Started -->
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Sub Category Description</label> <input id="subCategory"
										class="form-control" type="text"
										placeholder="Sub Category Description" disabled>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>MC Charges Type </label> <select id="mcChargeType"
										class="form-control">
										<c:forEach var="mcct" items="${editPopulate.mcChargeType}">
											<option value="${mcct.id}" selected="selected">
												${mcct.name}</option>
										</c:forEach>
									</select>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Waste Charges Type</label><select id="wasteChargeType"
										class="form-control">
										<c:forEach var="wct" items="${editPopulate.wastageChargeType}">
											<option value="${wct.id}" selected="selected">
												${wct.name}</option>
										</c:forEach>
									</select>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Metal Purity</label><select id="metalPurity"
										class="form-control"disabled>
										<c:forEach var="spl" items="${editPopulate.skinPurityList}">
											<option value="${spl.id}" selected="selected" >
												${spl.name}</option>
										</c:forEach>
									</select>
								</div>
							</div>

							<!-- Action buttons -->
							<div class="row voffset2" align="center">
								<button class="btn btn-primary voffset" type="button"
									name="Search" id="Search">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
							</div>
						</div>

						<div class="row"></div>
						<div>
							<div>
								<h4>
									<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Apply
								</h4>
							</div>

							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Metal Basic Purity</label> <input id="metalBasicPurity"
										class="form-control" type="text"
										placeholder="Metal Basic Purity" value="99.90" disabled>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Cost MC (%)</label> <input id="costMcPer"
										class="form-control" type="text" title="huge, gigantic"
										allowDecimal="4" placeholder="Cost MC (%)" >
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Cost Wastage (%) </label> <input id="costWastagePer"
										class="form-control" type="text" allowDecimal="4"
										placeholder="Cost Wastage (%)" >
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Purchase Price Per Gram </label> <input
										id="metalBasicPurchaseRate" class="form-control" type="text"
										allowDecimal="2" placeholder="Metal Basic Purchase Rate">
								</div>
							</div>

							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Metal Rate For Purity</label> <input
										id="metalRateForPurity" class="form-control" type="text"
										allowDecimal="2" placeholder="Metal Rate For Purity" value=""
										disabled>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Base Cost MC Wastage PGM</label> <input
										id="costWastagePGM" class="form-control" type="text"
										allowDecimal="2" placeholder="Base Cost MC Wastage PGM">
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Base Cost MC Incremental</label> <input
										id="costMCIncremental" class="form-control" type="text"
										allowDecimal="2" placeholder="Base Cost MC Incremental">
								</div>
							</div>
						</div>
						<!-- Action buttons -->
						<div class="row voffset2" align="center">
							<button class="btn btn-primary voffset" type="button"
								name="applyEdit" id="applyEdit" disabled>
								<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
								&nbsp;Apply Edit
							</button>

							<button id="clearAll" class="btn btn-warning voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>

							<button class="btn btn-primary voffset" type="button"
								name="export" id="export" disabled>
								<i class="fa fa-download fa-lg"></i> Export
							</button>

							<button class="btn btn-primary voffset" type="button"
								name="addRecord" id="addRecord" disabled>
								<i class="fa fa-plus fa-lg"></i> &nbsp;Add Row
							</button>
						</div>
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


				<div class="row voffset2" align="center">
					<button class="btn btn-primary voffset" type="button" name="edit"
						id="edit">
						<i class="fa fa-floppy-o fa-lg"></i> Edit
					</button>
				</div>

				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<script
	src="resource/oe/assets/js/app/vendorCostMaintainanceDynamicColumns.js"></script>
<script src="resource/oe/assets/js/app/vendorCostMaintainance.js"></script>
<script src="resource/oe/assets/js/app/decimalPlaces.js"></script>
