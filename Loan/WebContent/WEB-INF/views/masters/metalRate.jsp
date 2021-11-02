<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : MD Imran Ali
	## 	Date Creation : 01/06/2016
 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript">
	$("#Search").on('click', function() {
		var metalRateImpact = $("#metalRateImpact").val();
		var region = $('#region').val();
		var store = $('#store').val();

		if (metalRateImpact == "") {
			$.growl.error({
				message : "Please select metal rate impact level",
				duration : 10000
			});
			return false;
		}
		if (metalRateImpact == "Region" && region == "") {
			$.growl.error({
				message : "Please select Region!!",
				duration : 10000
			});
			return false;
		}

		if (metalRateImpact == "Store" && (region == "" || store == "")) {
			$.growl.error({
				message : "Please select Region and Store!!",
				duration : 10000
			});
			return false;
		}

		$("#saveMetalRate").hide();
		metalRateGrid();
		$("#jqxgrid").show();
		return false;
	});
</script>
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Metal Rate Maintenance
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm voffset" data-toggle="modal"
							id="metalRateCreate" data-target="#metalRateModal" type="button">
							<i class="fa fa-plus"></i> &nbsp;Create
						</button>
					</div>
				</div>
				<!-- Pending Melting Heading Add Ended -->

				<!-- Pending Melting Search Started -->
				<form class="form-horizontal" id="pendingMelting">
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Metal Rate
									Impact Level</label> <select id="metalRateImpact" class="form-control"
									data-validation="required">
									<option value="" selected>--Select--</option>
									<option value="Region" id="Region">Region</option>
									<option value="Store" id="Store">Store</option>
								</select>
							</div>

							<div id="region-lov"
								class="col-sm-2">
								<span class="required">*</span>&nbsp; <label>Region</label> <select
									id="region" class="form-control" data-validation="required">
									<option value="" selected label="--Select--" />
									<c:forEach var="region" items="${region}">
										<option value="${region.id}">${region.name}</option>
									</c:forEach>
								</select>
							</div>

							<div id="store-lov"
								class="col-sm-2">
								<span class="required">*</span>&nbsp; <label>Store</label> <select
									id="store" class="form-control" data-validation="required">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Metal Segment</label> <select id="metalSegmentId"
									class="form-control" data-validation="required">
									<option value="" selected>--Select--</option>
									<c:forEach var="metalSegment" items="${metalSegment}">
										<option value="${metalSegment.id}">${metalSegment.description}</option>
									</c:forEach>

								</select>
							</div>

							<div class="col-sm-2">
								<label>From Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="metalRateDateFrom" placeholder="DD/MM/YYYY"
										data-validation="date" data-validation-format="dd/mm/yyyy">
									<label for="metalRateDateFrom" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<label>To Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="metalRateDateTo" placeholder="DD/MM/YYYY"
										data-validation="date" data-validation-format="dd/mm/yyyy">
									<label for="metalRateDateTo" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>

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
								name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
						</div>
				</form>
				<!-- Pending Melting Search Ended -->

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
<!-- Create Issue For Melting Modal Modal Pop-up Started ##########################  -->
<div class="modal fade" id="metalRateModal" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Metal Rate
				</h3>
			</div>
			<!-- Modal Create Stone Article Master Body -->
			<div class="modal-body">
				<div class="container sentParcel-Edit">
					<form class="form-horizontal" id="designRA">
						<div class="mobile-responsive">
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span> <label>Metal Rate
										Impact Level</label> <select id="metalRateImpactModal"
										class="form-control" data-validation="required">
										<option value="" selected>--Select--</option>
										<option value="Region" id="Region">Region</option>
										<option value="Store" id="Store">Store</option>
									</select>
								</div>

								<div id="region-lov-modal"
									class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span> <label>Region</label> <select
										id="region_modal" class="form-control"
										data-validation="required">
										<option value="" selected label="--Select--" />
										<c:forEach var="region" items="${region}">
											<option value="${region.id}">${region.name}</option>
										</c:forEach>
									</select>
								</div>

								<div id="store-lov-modal"
									class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span> <label>Store</label> <select
										id="store_modal" class="form-control"
										data-validation="required">
										<option value="" selected label="--Select--" />
									</select>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span> <label>Metal Segment</label> <select
										id="metalSegment" class="form-control"
										data-validation="required">
										<option value="" selected label="--Select--" />
										<c:forEach var="metalSegment" items="${metalSegment}">
											<option value="${metalSegment.id}">${metalSegment.description}</option>
										</c:forEach>
									</select>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span> <label>Purity</label><select
										id="purity" class="form-control" data-validation="required">
										<option value="" selected label="--Select--" />
									</select>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span> <label>Basic Purchase
										Price</label> <input type="text" class="form-control"
										data-validation="number" data-validation-allowing="float"
										placeholder="Basic Purchase Price" id="basicPurchase"
										onblur="this.value = validateNumeric(this.value); calculatePurchasePrice();">
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span> <label>Bullion Dealer
										Commn. %</label> <input type="text" class="form-control"
										data-validation="number" data-validation-allowing="float"
										placeholder="Bullion Dealer Commn. %" id="bullionDealer"
										onblur="this.value = validateNumber(this.value); calculatePurchasePrice();">
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span> <label>Expenses %</label> <input
										type="text" class="form-control" placeholder="Expenses %"
										data-validation="number" data-validation-allowing="float"
										id="expPerc"
										onblur="this.value = validateNumber(this.value); calculatePurchasePrice();">
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field"
									id="manufactureLossLov">
									<span class="required">*</span> <label>Manufacturing
										Loss</label> <input type="text" class="form-control"
										placeholder="Manufacturing Loss" value='0.00'
										data-validation="number" data-validation-allowing="float"
										id="manufactureLoss"
										onblur="this.value = validateNumber(this.value) == ''? parseFloat(0).toFixed(2):parseFloat(this.value).toFixed(2); calculatePurchasePrice();">
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span> <label>TAX %</label> <input
										type="text" class="form-control" placeholder="TAX %"
										data-validation="number" data-validation-allowing="float"
										id="taxPerc"
										onblur="this.value = validateNumber(this.value); calculatePurchasePrice();">
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Purchase Price / Gm</label> <input type="text"
										class="form-control" placeholder="Purchase Price / Gm"
										id="purchPrice" disabled class="form-control">
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Start Date</label> <input type="text" class="form-control"
									 id="startDateC" name="startDateC" disabled >
								</div>
								
							   </div>
							   <div class= "row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>End Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"name="endDateC" id="endDateC" placeholder="DD/MM/YYYY">
											<label for="endDateC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								</div>
							<div class="heading-block">
								<h4>Customer Purchase Consideration</h4>
								<div class="heading-block-action"></div>
							</div>


							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp; <label>Expenses %</label>
									<select id="expensesFlag" class="form-control"
										data-validation="required">
										<option value="" selected label="--Select--" />
									</select>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>B.D.Comm%</label> <select
										id="bullionComissionFlag" class="form-control"
										data-validation="required">
										<option value="" selected label="--Select--" />
									</select>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Tax %</label> <select
										id="vatFlag" class="form-control" data-validation="required">
										<option value="" selected label="--Select--" />
									</select>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field"
									id="manuLossFlag">
									<span class="required">*</span>&nbsp;<label>Manufacturing
										Loss</label> <select id="manufactureLossFlag" class="form-control"
										data-validation="required">
										<option value="" selected label="--Select--" />
									</select>
								</div>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row" id="editgridmetalrate">

								<div class="col-md-12 form-field">
									<div id="jqxgridp"
										style="font-size: 13px; font-family: Verdana; float: left;"></div>
								</div>

							</div>
						</div>
					</form>
					<!-- Modal Edit metal rate Footer -->
				</div>
			</div>
			<div class="modal-footer  text-center">

				<button class="btn btn-primary btn-sm voffset" type="button" name="save"
					id="saveMetalRate">
					<i class="fa fa-plus fa-lg"></i> Save
				</button>
				&nbsp;
				<button class="btn btn-primary btn-sm voffset" type="button" name="save"
					id="savePurity">
					<i class="fa fa-plus fa-lg"></i> Purity Wise Details
				</button>

				&nbsp;
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>
		</div>
	</div>
</div>


<!-- Create Issue For Melting Modal Modal Pop-up Ended ##########################  -->

<script src="resource/oe/assets/js/app/metalRate.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>