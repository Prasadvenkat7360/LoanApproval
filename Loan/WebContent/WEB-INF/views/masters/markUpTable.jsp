<!-- 
	##	Author UI : mani prasad
	## 	Author JAVA :
	## 	Date Creation : 20/03/2017
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div class="heading-block">
				<div class="clearfix">&nbsp;</div>
					<label class="radio-inline"><input class="element"
						type="radio" name="mup" value="category"> &nbsp; MUP
						Category </label> <label class="radio-inline"> <input
						class="element" type="radio" name="mup" value="type">
						&nbsp; MUP Table
					</label>
				</div>
				<div id="mupCategory">				
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp; MUP Category
							
						</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createMupCategory" type="button" id="create"
								><i class="fa fa-plus"></i>
								&nbsp;Create </button>
						</div>
					</div>		
					<form class="form-horizontal" id="mupForm"action="javascript: void(0)">
						<div class="row">
							<div class="col-sm-2">
								&nbsp;<label>Region</label> <select id="regionSearch"
									class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Segment</label> <select
									id="segmentS" name="segmentS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								&nbsp;<label>Skin Purity</label> <select id="skinPurityS"
									name="skinPurityS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								&nbsp;<label>MUP Category</label> <select id="mupCategoryS"
									name="mupCategoryS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
						</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="search" id="search">
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
								<i class="fa fa-file-excel-o"></i> Export
							</button>
						</div>
					</form>
				</div>
				<!-- ############################# Mup Type Starts -->
				<div id="mupType">				  
				<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp; MUP Table
						</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createMupType" type="button" id="createMupTable"
								><i class="fa fa-plus"></i>
								&nbsp;Create </button>
						</div>
					</div>		
					<form class="form-horizontal" id="mupTableSearch"action="javascript: void(0)">						
						<div class="row">
							<div class="col-sm-2">
								&nbsp;<label>Business</label> <select id="BusinessMupTableS"
									name="BusinessMupTableS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								&nbsp;<label>Region</label> <select id="regionMupTableS"
									class="form-control" name="regionMupTableS">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Segment</label> <select
									id="segmentMupTableS" name="segmentMupTableS"
									class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>MUP Category</label>
								<select id="mupCategoryTableS" name="mupCategoryTableS"
									class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>

						</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="searchMupTable" id="searchMupTable">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="ClearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" disabled
								name="exportMupTable" id="exportMupTable">
								<i class="fa fa-file-excel-o"></i> Export
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" disabled
								name="uploadMupTable" id="uploadMupTable">
								<i class="fa fa-upload fa-lg"></i> Upload
							</button>
						</div>

					</form>
				</div>
				<!-- ############################# Mup Type Ends -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for Mup Category create and search-->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
		<!-- ############## modal for Create Mup Table Start-->

		<div class="modal fade" id="createMupType" data-keyboard="false"
			data-backdrop="static" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true"
			style="padding-top: 2%;">

			<div class="modal-dialog modal-lg"
				style="width: 96%; min-height: 650px; height: 550px;">

				<div class="modal-content">
					<!-- Modal Create Metal Accounting Location Header -->
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<!--  Title Goes Here -->
						<h2 class="modal-title">
							<i class="fa fa-plus"></i> &nbsp; MUP Table Creation
						</h2>

					</div>
					<!--  Modal Window Content Started  -->
					<form class="form-horizontal" id="mupTableCreation"
						action="javascript:void(0);">
						<div class="col-md-12 mobile-responsive">
							<div class="clearfix">&nbsp;</div>
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Business</label><select
										id="businessMupTableC" name="businessMupTableC"
										class="form-control">
										<option value="" label="--Select--" />
									</select>
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Region</label><select
										id="regionMupTableC" name="regionMupTableC"
										class="form-control">
										<option value="" label="--Select--" />
									</select>
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Metal
										Segment Name</label><select id="metalSegmentMupTableC"
										name="metalSegmentMupTableC" class="form-control">
										<option value="" label="--Select--" />
									</select>
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Mup
										Category</label><select id="CategoryMupTableC"
										name="CategoryMupTableC" class="form-control">
										<option value="" label="--Select--" />
									</select>
								</div>

							</div>

							<!-- Row 2 Started  -->

							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Skin Purity</label><select
										id="skinPurityMupTableC" name="skinPurityMupTableC"
										class="form-control">
										<option value="" label="--Select--" />
									</select>
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Base Metal
										Rate</label> <input type="text" class="form-control"
										placeholder="Base Metal Rate" id="baseMetalrateMupTableC"
										disabled name="baseMetalrateMupTableC">
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Metal Cost
										Rate for Purity</label> <input type="text" class="form-control"
										placeholder="Metal Cost Rate For Purity"
										id="MetalCostForPurityMupTableC" disabled
										name="MetalCostForPurityMupTableC">
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Metal Rate
										Mark UP</label> <input type="text" class="form-control" disabled
										placeholder="Metal Rate Mark UP" id="metalRateMarkUpTableC"
										name="metalRateMarkUpTableC">
								</div>
							</div>

							<!-- Row 3 Started  -->
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Selling
										Rate For Purity</label> <input type="text" class="form-control"
										disabled placeholder="Selling Rate for Purity"
										id="sellingRateforPurityTableC"
										name="sellingRateforPurityTableC">
								</div>


								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>MC
										Apportion %</label> <input type="text" class="form-control" disabled
										placeholder="Mc Apportion %" id="mcApprotionTableC"
										name="mcApprotionTableC">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Wastage
										Apportion %</label> <input type="text" class="form-control" disabled
										placeholder="Wastage Apportion %" id="wastageApprotionTableC"
										name="wastageApprotionTableC">
								</div>

							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row">
								<div class="col-md-12 form-field text-center">
									<button class="btn btn-primary btn-sm" type="submit"
										id="addRecord">
										<i class="fa fa-plus fa-lg"></i>&nbsp;Add
									</button>
								</div>
								<div class="col-md-12 form-field">
									<div id="jqxgrideD"
										style="font-size: 13px; font-family: Verdana; position: relative;"></div>
								</div>
							</div>

						</div>

						<!--  Modal Window Content Ended -->

						<!-- Modal Create Metal Accounting Location Footer -->
						<div class="clearfix">&nbsp;</div>
						<div class="modal-footer  text-center" id="createFooterMupTable">
							<button type="button" class="btn btn-primary btn-sm" id="saveMupTable"
								name="saveMupTable">
								<i class="fa fa-save"></i>&nbsp;Save
							</button>

							<button type="button" class="btn btn-warning btn-sm"
								data-dismiss="modal">
								<i class="fa fa-times"></i>&nbsp;Close
							</button>

						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- ############## modal for Create Mup Table Ends -->

		<!-- ####################### modal for Create Mup Category Starts-->
		<div class="modal fade" id="createMupCategory" data-keyboard="false"
			data-backdrop="static" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true"
			style="padding-top: 2%;">

			<div class="modal-dialog modal-lg">

				<div class="modal-content">
					<!-- Modal Create Metal Accounting Location Header -->
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<!--  Title Goes Here -->
						<h2 class="modal-title">
							<i class="fa fa-plus"></i> &nbsp; MUP Category Creation
						</h2>

					</div>
					<!--  Modal Window Content Started  -->
					<form class="form-horizontal" id="mupCategoryCreation"
						action="javascript:void(0);">
						<div class="col-md-12 mobile-responsive">
							<div class="clearfix">&nbsp;</div>
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>MUP
										Category Code</label> <input type="text" class="form-control"
										placeholder="MUP Category Code" id="mupCategoryC"
										name="mupCategoryC">
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>MUP
										Category Description</label> <input type="text" class="form-control"
										placeholder="MUP Category Description" id="mupCategoryDes"
										name="mupCategoryDes">
								</div>

							</div>
							<div class="row">
								<div class="row voffset2" align="center">
									<button class="btn btn-primary voffset" type="button"
										name="Continue" id="ContinueCreate">
										<i class="fa fa-chevron-right" aria-hidden="true"></i>
										&nbsp;Continue
									</button>
								</div>
								<div class="clearfix">&nbsp;</div>
							</div>

							<!-- Row 2 Started  -->
							<div id="continueCreateField">
								<div class="row">
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Region</label><select
											id="regionCreate" name="regionCreate" class="form-control">
											<option value="" label="--Select--" />
										</select>
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Metal
											Segment Name</label><select id="metalSegment" name="metalSegment"
											class="form-control">
											<option value="" label="--Select--" />
										</select>
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
										id="meltingFlag">
										<span class="required">*</span>&nbsp;<label>Base Metal
											Rate</label> <input type="text" class="form-control"
											placeholder="Base metal rate"
											onblur="this.value = validateNumber(this.value); metalCostPurityCalculation();"
											id="baseMetalRate" name="baseMetalRate">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
										id="valuationFlag">
										<span class="required">*</span>&nbsp;<label>Skin
											Purity</label><select id="skinPurity" name="skinPurity"
											class="form-control" onchange="metalCostPurityCalculation()">
											<option value="" ids="" label="--Select--" />
										</select>
									</div>
								</div>

								<!-- Row 2 Started  -->
								<div class="row">
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Metal Cost
											Rate For Purity</label> <input type="text" class="form-control"
											placeholder="Base metal rate" id="metalCostForPurity"
											name="metalCostForPurity" disabled>
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Metal Rate
											Mark UP</label> <input type="text" class="form-control" disabled
											placeholder="Metal Rate Mark Up" id="metalRate"
											name="metalRate">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Selling
											Rate For Purity</label> <input type="text" class="form-control"
											placeholder="Selling Rate" id="sellingRate"
											name="sellingRate" disabled>
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>MC
											Apportion %</label> <input type="text" class="form-control"
											placeholder="Mc Apportion %" id="mcApprotion"
											name="mcApprotion"
											onblur="this.value = validateNumber(this.value); mcApportionCalculate()">
									</div>


								</div>
								<div class="row">
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Wastage
											Apportion %</label> <input type="text" class="form-control"
											placeholder="Wastage Apportion %" id="wasteageApp"
											name="wasteageApp"
											onblur="this.value = validateNumber(this.value); mcApportionCalculate()">
									</div>
								</div>
							</div>
						</div>

						<!--  Modal Window Content Ended -->

						<!-- Modal Create Metal Accounting Location Footer -->
						<div class="clearfix">&nbsp;</div>
						<div class="modal-footer  text-center" id="createFooter">
							<button type="submit" class="btn btn-primary btn-sm" id="saveMup"
								name="saveMup">
								<i class="fa fa-save"></i>&nbsp;Save
							</button>

							<button type="button" class="btn btn-warning btn-sm"
								data-dismiss="modal">
								<i class="fa fa-times"></i>&nbsp;Close
							</button>

						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- ####################### modal from Create Mup Category  End-->
		<!-- ####################### modal from Edit Mup Category Start-->
		<div class="modal fade" id="editMupCategory" data-keyboard="false"
			data-backdrop="static" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true"
			style="padding-top: 2%;">

			<div class="modal-dialog modal-lg">

				<div class="modal-content">
					<!-- Modal Create Metal Accounting Location Header -->
					<div class="modal-header">
						<button type="button" class="close" onClick="mupCatEditChangeVals();">&times;</button>
						<!--  Title Goes Here -->
						<h2 class="modal-title">
							<i class="fa fa-pencil-square-o"></i> &nbsp; MUP Category Edit
						</h2>

					</div>
					<!--  Modal Window Content Started  -->
					<form class="form-horizontal" id="mupCategoryEdit"
						action="javascript: void(0)">
						<div class="col-md-12 mobile-responsive">
							<div class="clearfix">&nbsp;</div>
							<!-- Row 1 Started  -->
							<div class="row">
								<input type="hidden" class="form-control" id="mupCategoryidEdit"
									name="mupCategoryidEdit"> <input type="hidden"
									class="form-control" id="mupCategoryIdMupType"
									name="mupCategoryIdMupType">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>MUP
										Category Code</label> <input type="text" class="form-control"
										placeholder="MUP Category Code" id="mupCategoryCodeEdit"
										name="mupCategoryCodeEdit" disabled>
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>MUP
										Category Description</label> <input type="text" class="form-control"
										placeholder="MUP Category Description" id="mupCategoryDesEdit"
										name="mupCategoryDesEdit">
								</div>

							</div>
							<div class="row">
								<div class="row voffset2" align="center">
									<button class="btn btn-primary btn-sm voffset" type="button"
										name="ContinueEdit" id="ContinueEdit">
										<i class="fa fa-chevron-right" aria-hidden="true"></i>
										&nbsp;Continue
									</button>
								</div>
								<div class="clearfix">&nbsp;</div>
							</div>
							<div class="clearfix">&nbsp;</div>
							<!-- Row 2 Started  -->
							<div id="continueEditField">
								<div class="row">
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Region</label><select
											id="regionEdit" name="regionEdit" class="form-control"
											disabled>
											<option value="" label="--Select--" />
										</select>
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Metal
											Segment Name</label><select id="metalSegmentEdit"
											name="metalSegmentEdit" class="form-control" disabled>
											<option value="" label="--Select--" />
										</select>
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Base Metal
											Rate</label> <input type="text" class="form-control"
											onblur="this.value = validateNumber(this.value); metalCostPurityCalculationE();"
											placeholder="Base metal rate" id="baseMetalRateEdit"
											name="baseMetalRateEdit">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
										id="valuationFlag">
										<span class="required">*</span>&nbsp;<label>Skin
											Purity</label><select id="skinPurityEdit" name="skinPurityEdit"
											class="form-control" onchange="metalCostPurityCalculation()"
											disabled>
											<option value="" label="--Select--" />
										</select>
									</div>
								</div>

								<!-- Row 2 Started  -->
								<div class="row">
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Metal Cost
											Rate For Purity</label> <input type="text" class="form-control"
											placeholder="Metal cost Rate For Purity"
											id="metalCostForPurityEdit" disabled
											name="metalCostForPurityEdit"
											onblur="this.value = validateNumber(this.value); metalCostPurityCalculationE();">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Metal Rate
											Mark UP</label> <input type="text" class="form-control" disabled
											placeholder="Metal Rate Mark Up" id="metalRateEdit"
											name="metalRateEdit">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Selling
											Rate For Purity</label> <input type="text" class="form-control"
											disabled placeholder="Selling Rate" id="sellingRateEdit"
											name="sellingRateEdit">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>MC
											Apportion %</label> <input type="text" class="form-control"
											placeholder="Mc Apporotion %" id="mcApprotionEdit"
											onblur="this.value = validateNumber(this.value); mcApportionCalculateE();"
											name="mcApprotionEdit">
									</div>


								</div>
								<div class="row">
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span>&nbsp;<label>Wastage
											Apportion %</label> <input type="text" class="form-control"
											placeholder="Wasteage Apportion %" id="wasteageAppEdit"
											onblur="this.value = validateNumber(this.value); mcApportionCalculateE();"
											name="wasteageAppEdit">
									</div>
								</div>
							</div>
						</div>

						<!--  Modal Window Content Ended -->

						<!-- Modal Create Metal Accounting Location Footer -->
						<div class="clearfix">&nbsp;</div>
						<div class="modal-footer  text-center" id="editFooter">
							<button type="submit" class="btn btn-primary btn-sm" id="saveMupEdit"
								name="saveMupEdit">
								<i class="fa fa-save"></i>&nbsp;Save
							</button>

							<button type="button" class="btn btn-warning btn-sm"
								onClick="mupCatEditChangeVals();">
								<i class="fa fa-times"></i>&nbsp;Close
							</button>

						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- #############mup Category Edit -->
		<!-- ############# Mup Table Edit  -->
		<div class="modal fade" id="editMupTable" data-keyboard="false"
			data-backdrop="static" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true"
			style="padding-top: 2%;">

			<div class="modal-dialog modal-lg"
				style="width: 96%; min-height: 650px; height: 550px;">

				<div class="modal-content">
					<!-- Modal Create Metal Accounting Location Header -->
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<!--  Title Goes Here -->
						<h2 class="modal-title">
							<i class="fa fa-pencil-square-o"></i> &nbsp; MUP Table Edit
						</h2>

					</div>
					<!--  Modal Window Content Started  -->
					<form class="form-horizontal" id="mupTableCreation"
						action="javascript:void(0);">
						<div class="col-md-12 mobile-responsive">
							<div class="clearfix">&nbsp;</div>
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Business</label> <input type="text" class="form-control"
										placeholder="Business Name" id="businessMupTableEdit" disabled
										name="businessMupTableEdit">

								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Region</label> <input type="text" class="form-control"
										placeholder="Region Name" id="regionMupTableEdit" disabled
										name="regionMupTableEdit">

								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Metal Segment Name</label> <input type="text"
										class="form-control" placeholder="Metal Segment Name"
										id="metalSegmentMupTableEdit" disabled
										name="metalSegmentMupTableEdit">

								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Mup Category</label> <input type="text"
										class="form-control" placeholder="Mup Category"
										id="CategoryMupTableEdit" disabled name="CategoryMupTableEdit">
								</div>

							</div>

							<!-- Row 2 Started  -->

							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Skin Purity</label> <input type="text"
										class="form-control" placeholder="Skin Purity"
										id="skinPurityMupTableEidt" disabled
										name="skinPurityMupTableEidt">

								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Base Metal
										Rate</label> <input type="text" class="form-control"
										placeholder="Base Metal Rate" id="baseMetalrateMupTableEdit"
										disabled name="baseMetalrateMupTableEdit">
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Metal Cost
										Rate for Purity</label> <input type="text" class="form-control"
										placeholder="Metal Cost Rate For Purity"
										id="MetalCostForPurityMupTableEidt" disabled
										name="MetalCostForPurityMupTableEidt">
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Metal Rate
										Mark UP</label> <input type="text" class="form-control" disabled
										placeholder="Metal Rate Mark UP" id="metalRateMarkUpTableEdit"
										name="metalRateMarkUpTableEdit">
								</div>
							</div>

							<!-- Row 3 Started  -->
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Metal Selling Rate For Purity</label> <input type="text"
										class="form-control" disabled
										placeholder="Selling Rate for Purity"
										id="sellingRateforPurityTableEdit"
										name="sellingRateforPurityTableEdit">
								</div>


								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Mc Apportion %</label> <input type="text"
										class="form-control" disabled placeholder="Mc Apportion %"
										id="mcApprotionTableEidt" name="mcApprotionTableEdit">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Wastage Apportion %</label> <input type="text"
										class="form-control" disabled
										placeholder="Wastage Apportion %"
										id="wastageApprotionTableEdit"
										name="wastageApprotionTableEdit">
								</div>

							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row">

								<div class="col-md-12 form-field">
									<div id="jqxgride"
										style="font-size: 13px; font-family: Verdana; position: relative;"></div>
								</div>
							</div>

						</div>

						<!--  Modal Window Content Ended -->

						<!-- Modal Create Metal Accounting Location Footer -->
						<div class="clearfix">&nbsp;</div>
						<div class="modal-footer  text-center" id="createFooterMupTable">
							<button type="button" class="btn btn-primary btn-sm"
								id="saveMupTableEdit" name="saveMupTableEdit">
								<i class="fa fa-save"></i>&nbsp;Save
							</button>

							<button type="button" class="btn btn-warning btn-sm"
								data-dismiss="modal">
								<i class="fa fa-times"></i>&nbsp;Close
							</button>

						</div>
					</form>
				</div>
			</div>
		</div>

	</div>
</div>
<script src="resource/oe/assets/js/app/markUpTable.js"
	type="text/javascript"></script>
<script src="resource/oe/assets/js/app/mupTable.js"
	type="text/javascript"></script>
