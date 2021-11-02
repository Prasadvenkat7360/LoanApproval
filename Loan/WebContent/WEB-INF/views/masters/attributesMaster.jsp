<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12  layout-main">
				<!-- DC Details  Header Started -->

				<div class="heading-block">
					<h1 id="head">
						<i class="fa fa-desktop"></i> &nbsp;Attributes Master
					</h1>
				</div>
				<form class="form-horizontal" id="attributeMasterS"	action="javascript: void(0)">
					<div class="mobile-responsive">
						<!-- Row 1 Started  -->
						<div class="row" id="attMasters">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
								align="left">
								<span class="required">*</span>&nbsp;<label>Attribute Masters List</label> 
								<select id="attrList" name="attrList"
									class="form-control">
									<option value="" selected label="Select" />
									<option value="Hook">Hook Type Master</option>
									<option value="Loop">Loop Type Master</option>
									<option value="Setting">Setting Type Master</option>
									<option value="Screw">Screw Type Master</option>
									<option value="Polish">Polish Master</option>
									<option value="MetalColour">Metal Colour Type Master</option>
									<option value="Purity">Metal Purity Master</option>
									<option value="Shape">Shape Type Master</option>
									<option value="StoneColour">Stone Colour Type Master</option>
									<option value="StoneCombination">Stone Combination Type Master</option>
									<option value="StoneActCol">Stone Actual Color</option>
									<option value="Clarity">Clarity Master</option>
									<option value="StoneRate">Stone Cost Range</option>
									<option value="WeightRange">Stone Weight Range</option>
									<option value="CutGrade">Cut Grade</option>
								</select>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" align="left">
								<label>Masters Name</label> <input type="text"
									class="form-control" id="mName" name="mName" disabled>

							</div>
						</div>

						<div id="hookDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Hook Type Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"	data-target="#createHookTypeM" type="button" id="creatHookC" href="javascript: void(0)"><i class="fa fa-plus"></i>
										&nbsp;Create </a>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Segment ID</label> <select id="hookSegS" class="form-control" name="hookSegS">
									<option value="" selected label="Select" />
								</select>
							</div>



							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="gobackH" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse" data-target="#CreateHook">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="hookSearch" id="hookSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearHook" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
						<div id="loopDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Loop Type Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createLoopTypeM" type="button" id="creatLoopC"
										href="javascript: void(0)"><i class="fa fa-plus"></i>
										&nbsp;Create </a>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Segment ID</label> <select id="loopSegS" class="form-control" name="loopSegS">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="gobackL" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse" data-target="#CreateLoop">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="loopSearch" id="loopSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearLoop" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
						<div id="setDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Setting Type Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createSetting" type="button" id="creatSet"
										href="javascript: void(0)"><i class="fa fa-plus"></i>
										&nbsp;Create </a>
								</div>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="goback" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse"
									data-target="#CreateSetting">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>

								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="settingSearch" id="settingSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearSetting" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
						<div id="screwDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Screw Type Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createScrewTypeM" type="button"
										id="creatScrewType" href="javascript: void(0)"><i
										class="fa fa-plus"></i> &nbsp;Create </a>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Segment ID</label> <select id="screwSegS" class="form-control" name="screwSegS">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="gobackS" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse" data-target="#CreateScrew">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="screwSearch" id="screwSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearScrew" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
						<div id="polishDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Polish Type Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createPolishTypeM" type="button"
										id="creatPolishC" href="javascript: void(0)"><i
										class="fa fa-plus"></i> &nbsp;Create </a>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Segment ID</label> <select id="polishSegS" class="form-control" name="polishSegS">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="gobackP" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse"
									data-target="#CreatePolish">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="polishSearch" id="polishSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearPolish" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
						<div id="metalColorDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Metal Colour Type Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createMetalColrTypeM" type="button"
										id="creatMetalClr" href="javascript: void(0)"><i
										class="fa fa-plus"></i> &nbsp;Create </a>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Segment ID</label> <select id="metalColSegS" class="form-control" name="metalColSegS">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="gobackMC" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse"
									data-target="#CreateMetalColor">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary voffset btn-sm" type="button"
									name="metalColorSearch" id="metalColorSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearMetalColor" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
						<div id="metalPurityDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Metal Purity Type Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createMetalPurityM" type="button"
										id="creatMetalPurity" href="javascript: void(0)"><i
										class="fa fa-plus"></i> &nbsp;Create </a>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Segment ID</label> <select id="puritySegS" class="form-control" name="puritySegS">
											<option value="" selected label="Select" />
										</select>
									</div>
							</div>
							<div class="row voffset2" align="center">
								<button id="gobackMP" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse"
									data-target="#CreateMetalPurity">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary voffset btn-sm" type="button"
									name="puritySearch" id="metalPuritySearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearPurity" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
						<div id="shapeTypeDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Shape Type Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createShapeTypeM" type="button" id="createShape"
										href="javascript: void(0)"><i class="fa fa-plus"></i>
										&nbsp;Create </a>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Category</label> <select id="shapeCatS" class="form-control" name="shapeCatS">
											<option value="" selected label="Select" />
										</select>
									</div>
							</div>
							<div class="row voffset2" align="center">
								<button id="gobackSH" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse" data-target="#CreateShape">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="shapeSearch" id="shapeSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearShape" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
						<div id="stoneColTypeDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Stone Colour Type Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createStoneColorM" type="button"
										id="createStoneCol" href="javascript: void(0)"><i
										class="fa fa-plus"></i> &nbsp;Create </a>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Category</label> <select id="stColCatS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="gobackSC" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse" data-target="#CreateShape">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="stoneColSearch" id="stoneColSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearStoneCol" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>

						<div id="stoneCombinationDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Stone Combination Type
									Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createStoneCombination" type="button"
										id="createStoneComb" href="javascript: void(0)"><i
										class="fa fa-plus"></i> &nbsp;Create </a>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Metal Segment ID</label> <select id="stCombSegS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="gobackCM" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse" data-target="#CreateShape">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="stoneComSearch" id="stoneComSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearStoneCom" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>

						<div id="stoneActualColDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Stone Actual Color Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createStoneActCol" type="button"
										id="createStoneActColr" href="javascript: void(0)"><i
										class="fa fa-plus"></i> &nbsp;Create </a>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Category</label> <select id="stActColCatS" name="stActColCatS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="gobackA" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse" data-target="#CreateShape">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="sActColSearch" id="sActColSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearActCol" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>

						<div id="clarityDetS">
							<div class="heading-block">
								<h1 id="headC">
									<i class="fa fa-desktop"></i> &nbsp;Clarity Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createClarity" type="button" id="createClarityM"
										href="javascript: void(0)"><i class="fa fa-plus"></i>
										&nbsp;Create </a>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Category</label> <select id="clarityCatS" name="clarityCatS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="gobackT" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse"
									data-target="#CreateClarity">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="claritySearch" id="claritySearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearClarity" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>

						<div id="stoneRateDetS">
							<div class="heading-block">
								<h1 id="headR">
									<i class="fa fa-desktop"></i> &nbsp;Stone Cost Range
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createStoneRate" type="button"
										id="createRateStone" href="javascript: void(0)"><i
										class="fa fa-plus"></i> &nbsp;Create </a>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Stone Segment</label> <select id="stCostSegS" name="stCostSegS" class="form-control">
										<option value="" label="--Select--" /></select>
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Category</label> <select id="stCostCatS" name="stCostCatS" class="form-control">
										<option value="" label="--Select--" /></select>
								</div>
							</div>
							<div class="row voffset2" align="center">
								<button id="gobackR" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse" data-target="#CreateRate">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="stoneRateSearch" id="stoneRateSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearStoneRate" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>

						<div id="stoneWeightRangeDetS">
							<div class="heading-block">
								<h1>
									<i class="fa fa-desktop"></i> &nbsp;Stone Weight Range
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createStWeightRange" type="button"
										id="createWeightRange" href="javascript: void(0)"><i
										class="fa fa-plus"></i> &nbsp;Create </a>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Category</label> <select id="stWtCatS" name="stWtCatS" class="form-control">
									<option value="" label="--Select--" />
								</select>
								</div>
							</div>
							
							<div class="row voffset2" align="center">
								<button id="gobackW" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse" data-target="#CreateRate">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchWeightRange" id="searchWeightRange">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearWtRange" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
						<div id="cutGradeDetS">
							<div class="heading-block">
								<h1 id="head8">
									<i class="fa fa-desktop"></i> &nbsp; Cut Grade Master
								</h1>
								<div class="heading-block-action">
									<a class="btn btn-primary btn-sm" data-toggle="modal"
										data-target="#createCutGradeM" type="button"
										id="createCutGrade" href="javascript: void(0)"><i
										class="fa fa-plus"></i> &nbsp;Create </a>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Category</label> <select	id="cgCategoryS" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button id="gobackG" class="btn btn-primary btn-sm voffset"
									type="button" data-toggle="collapse"
									data-target="#CreateCutGrade">
									<i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="cutGradeSearch" id="cutGradeSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearCutGrade" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>

					</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for Dc Master create and search-->
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

<!-- Setting Type Create Window Started -->
<div class="modal fade" id="createSetting" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Setting Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createSettingC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Description"
								id="descriptionC" name="descriptionC">
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>

					<div class="heading-block">

						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowD" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridS"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>

						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveSetting"
					name="saveSetting">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Setting Type Create Window Ended -->


<!-- Screw Type Create Window Started -->
<div class="modal fade" id="createScrewTypeM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Screw Type Master - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createScrewTypC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Screw Description"
								id="screwDescC" name="screwDescC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment ID</label>
							<div id="segemtnST"></div>
						</div>
					</div>

					<div class="clearfix">&nbsp;</div>

					<div class="heading-block">

						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowS" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridD"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveScrew"
					name="saveScrew">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Screw Type Create Window Ended -->


<!-- Hook Type Create Window Started -->
<div class="modal fade" id="createHookTypeM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Hook Type Master - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createHookTypC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Hook Description"
								id="hookDescC" name="hookDescC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment ID</label>
							<div id="segmIdHT"></div>
						</div>

					</div>

					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowH" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridH"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveHook"
					name="saveHook">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Hook Type Create Window Ended -->


<!-- Loop Type Create Window Started -->
<div class="modal fade" id="createLoopTypeM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Loop Type Master - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createLoopTypC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Loop Description"
								id="loopDescC" name="loopDescC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment ID</label>
							<div id="segmIdL"></div>
						</div>
					</div>

					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowL" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridL"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveLoop"
					name="saveLoop">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Loop Type Create Window Ended -->


<!-- Polish Type Create Window Started -->
<div class="modal fade" id="createPolishTypeM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Polish Type Master - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createPolishTypC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control"
								placeholder="Polish Description" id="polishDescC"
								name="polishDescC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment ID</label>
							<div id="segmIdP"></div>
						</div>

					</div>

					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowP" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridP"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="savePolish"
					name="savePolish">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Polish Type Create Window Ended -->

<!-- Metal Color Type Create Window Started -->
<div class="modal fade" id="createMetalColrTypeM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Metal Colour Type Master - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="metalColorTypC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Metal Description"
								id="mColorDescC" name="mColorDescC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment ID</label>
							<div id="mColorSegId"></div>
						</div>
					</div>

					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowMC" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridMC"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveMetalColor"
					name="saveMetalColor">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Metal Color Type Create Window Ended -->

<!-- Stone Color Type Create Window Started -->
<div class="modal fade" id="createStoneColorM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Stone Colour Type Master - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneColorTypC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Stone Description"
								id="sColorDescC" name="sColorDescC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category</label>
							<div id="catSC"></div>
						</div>
					</div>

					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowSC" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridSC"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveStoneColor"
					name="saveStoneColor">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Stone Color Type Create Window Ended -->

<!-- Metal Purity Type Create Window Started -->
<div class="modal fade" id="createMetalPurityM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Metal Purity Type Master - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="metalPurityTypC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Description"
								id="descC" name="descC">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Display Order</label>
							<input type="text" class="form-control"
								placeholder="Display Order" id="dispOrdC" name="dispOrdC">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Skin Purity</label> <input
								type="text" class="form-control" placeholder="Skin Purity"
								id="skinPurityC"
								onblur="this.value = validateNumber(this.value);"
								name="skinPurityC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Melting
								Purity</label> <input type="text" class="form-control"
								placeholder="Melting Purity" id="meltingPurityC"
								onblur="this.value = validateNumber(this.value);"
								name="meltingPurityC">
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							align="left">
							<span class="required">*</span>&nbsp;<label>Metal Type ID</label>
							<select id="metalTypeIdC" name="metalTypeIdC"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>

					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowMP" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridMP"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveMetalPurity"
					name="saveMetalPurity">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Metal Purity Type Create Window Ended -->

<!-- Stone Color Type Create Window Started -->
<div class="modal fade" id="createShapeTypeM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Shape Master- Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="shapeMasterC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Code</label> <input
								type="text" class="form-control" placeholder="Shape Code"
								id="shapeCodeC" name="shapeCodeC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Shape Desc"
								id="shapeDescC" name="shapeDescC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category</label>
							<div id="shapeCatC"></div>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowE" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridE"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveShape"
					name="saveShape">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Stone Color Type Create Window Ended -->

<!-- Stone Combination Type Create Window Started -->
<div class="modal fade" id="createStoneCombination"
	data-keyboard="false" data-backdrop="static" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Stone Combination Master - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneCombTypC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>

					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Combination
								Code</label> <input type="text" class="form-control"
								placeholder="Combination Code" id="combCodeC" name="combCodeC">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Combination
								Description</label> <input type="text" class="form-control"
								placeholder="Combination Description" id="combDescC"
								name="combDescC">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Metal Segment ID</label> <select
									id="segSC" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
					</div>


					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowCM" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridCM"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveStoneComb"
					name="saveStoneComb">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Metal Purity Type Create Window Ended -->

<!-- Stone Color Type Create Window Started -->
<div class="modal fade" id="createStoneActCol" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Stone Actual Colour - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneActColorC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" placeholder="Actual Color Desc"
								id="sActColorDescC" name="sActColorDescC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category</label>
							<div id="actColCatC"></div>
						</div>
					</div>

					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowA" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridA"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveStoneActCol"
					name="saveStoneActCol">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Stone Color Type Create Window Ended -->

<!-- Clarity Create Window Started -->
<div class="modal fade" id="createClarity" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Clarity Master - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createClarityC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Name</label> <input
								type="text" class="form-control" placeholder="Name"
								id="claNameC" name="claNameC">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category ID</label>
							<div id="clarityCatC"></div>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>

					<div class="heading-block">

						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowT" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridT"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>

						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveClarity"
					name="saveClarity">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Clarity Create Window Ended -->

<!-- Clarity Create Window Started -->
<div class="modal fade" id="createStoneRate" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Stone Cost Range - 
					Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createStoneRateC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>From Range</label> <input
								type="text" class="form-control" onblur="this.value = validateNumberRate(this.value);"
								id="fromC" name="fromC" >
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>To Range</label> <input
								type="text" class="form-control" id="toC" onblur="this.value = validateNumberRate(this.value);"
								 name="toC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>UOM</label> <input
								type="text" class="form-control" placeholder="UOM" id="uomC"
								name="uomC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							align="left">
							<span class="required">*</span>&nbsp;<label>Segment ID</label> <select
								id="segIdR" name="segIdR" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							id="categoryRate">
							<span class="required">*</span>&nbsp;<label>Category ID</label>
							<div id="catIdR"></div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							align="left">
							<span class="required">*</span>&nbsp;<label>Business ID</label> <select
								id="buIdC" name="buIdC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>

					<div class="heading-block">

						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowR" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridR"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>

						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveStoneRate"
					name="saveStoneRate">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Clarity Create Window Ended -->

<!-- Stone Weight Range Create Window Started -->
<div class="modal fade" id="createStWeightRange" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Stone Weight Range - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createStoneWeightC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>From Range</label> <input
								type="text" class="form-control" placeholder="From Range"
								id="fromSwC" name="fromSwC"  onblur="this.value = validateNumberS(this.value);">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>To Range</label> <input
								type="text" class="form-control" placeholder="To Range"
								id="toSwC" name="toSwC"  onblur="this.value = validateNumberS(this.value);">
						</div>
						

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label> From To
								Weight Range</label> <input type="text" class="form-control"
								placeholder="" id="fromToWtC" name="fromToWtC">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							align="left">
							<span class="required">*</span>&nbsp;<label>Category</label> <select
								id="catIdSw" name="catIdSw" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>

					<div class="heading-block">
						<br>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowW" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridW"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>

						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveStoneWtRange"
					name="saveStoneWtRange">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Stone Weight Range Create Window Ended -->


<!-- Cut Grade Create Window Started -->
<div class="modal fade" id="createCutGradeM" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Cut Grade - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="cutGradeC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Name</label> <input
								type="text" class="form-control" placeholder="Cut grade Name"
								id="gradeNameC" name="gradeNameC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category ID</label>
							<div id="catCg"></div>
						</div>
					</div>

					<div class="clearfix">&nbsp;</div>

					<div class="heading-block">

						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowG" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridG"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="saveCutGrade"
					name="saveCutGrade">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Cut Grade Create Window Ended -->

<!-- Setting Type Edit Window Started -->
<div class="modal fade" id="btnEditSetting" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

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
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="settingE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Setting ID</label> <input type="text" class="form-control"
								disabled id="setIdE" name="setIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Setting
								Description</label> <input type="text" class="form-control"
								id="setDescE" name="setDescE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								placeholder="Created By" disabled id="setCreatedByE"
								name="setCreatedByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								placeholder="Created On" disabled id="setCreatedOnE"
								name="setCreatedOnE">
						</div>
					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Updated By</label> <input type="text" class="form-control"
								disabled id="setUpdatedByE" name="setUpdatedByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Updated On</label> <input type="text" class="form-control"
								disabled id="setUpdatedOnE" name="setUpdatedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editSettingType"
						name="editSettingType">
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
<!-- Setting Type Edit Window Ended -->

<!-- Screw Type Edit Window Started -->
<div class="modal fade" id="btnEditScrew" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelS"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="screwE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Screw ID</label> <input type="text" class="form-control"
								disabled id="screwIdE" name="screwIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Screw
								Description</label> <input type="text" class="form-control"
								id="screwDescE" name="screwDescE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Segment ID</label> <input type="text" class="form-control"
								disabled id="segIdE" name="segIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								placeholder="Created By" disabled id="screwCreatedByE"
								name="screwCreatedByE">
						</div>

					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								placeholder="Created On" disabled id="screwCreatedOnE"
								name="screwCreatedOnE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Updated By</label> <input type="text" class="form-control"
								disabled id="scrwUpdatedByE" name="scrwUpdatedByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Updated On</label> <input type="text" class="form-control"
								disabled id="scrwUpdatedOnE" name="scrwUpdatedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editScrewType"
						name="editScrewType">
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
<!-- Screw Type Edit Window Ended -->

<!-- Polish Type Edit Window Started -->
<div class="modal fade" id="btnEditPolish" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelP"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="polishE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="polishIdE" name="polishIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Polish
								Description</label> <input type="text" class="form-control"
								id="polishDescE" name="polishDescE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment ID</label> <select
								id="segmIdPE" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								placeholder="Created By" disabled id="polishCreatedByE"
								name="polishCreatedByE">
						</div>

					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								placeholder="Created On" disabled id="polishCreatedOnE"
								name="polishCreatedOnE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Updated By</label> <input type="text" class="form-control"
								disabled id="polishUpdatedByE" name="polishUpdatedByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Updated On</label> <input type="text" class="form-control"
								disabled id="polishUpdatedOnE" name="polishUpdatedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editPolihType"
						name="editPolihType">
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
<!-- Polish Type Edit Window Ended -->

<!-- Stone Combination Type Edit Window Started -->
<div class="modal fade" id="btnEditStComb" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelSC"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stCombinationE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="stCombIdE" name="stCombIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="createdByE" name="createdByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="createdOnE" name="createdOnE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="changedByE" name="changedByE">
						</div>


					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="changedOnE" name="changedOnE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp; <label>Combination
								Description</label> <input type="text" class="form-control"
								id="combDescE" name="combDescE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Combination Code</label> <input type="text"
								class="form-control" disabled id="combCodeE" name="combCodeE">
						</div>
                         
                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Metal Segment ID</label> <input type="text"
								class="form-control" disabled id="segmIdSCE" name="segmIdSCE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm"
						id="editStCombination" name="editStCombination">
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
<!--  Stone Combination Edit Window Ended -->

<!-- Cut Grade Edit Window Started -->
<div class="modal fade" id="btnEditCutGrade" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelCG"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="cutGradeE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="cutGradeIdE" name="cutGradeIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Grade Name</label> <input
								type="text" class="form-control" id="cGradeNameE"
								name="cGradeNameE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Category ID</label><select name="categIdE" id="categIdE"
								class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="cgCreatedByE" name="cgCreatedByE">
						</div>
					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="cgCreatedOnE" name="cgCreatedOnE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="cgChangedByE" name="cgChangedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="cgChangedOnE" name="cgCangedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editcutGradeE"
						name="editcutGradeE">
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
<!-- Cut Grade Edit Window Ended -->

<!-- Hook Type Edit Window Started -->
<div class="modal fade" id="btnEditHookType" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelHT"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="hookTypeE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="hooktypeIdE" name="hooktypeIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" id="hookDescE" name="hookDescE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment ID</label> <select
								id="segmIdHTE" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="htCreatedByE" name="htCreatedByE">
						</div>
					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="htCreatedOnE" name="htCreatedOnE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="htChangedByE" name="htChangedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="htChangedOnE" name="htChangedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editHookTypE"
						name="editHookTypE">
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
<!-- Hook Type Edit Window Ended -->

<!-- Stone Actual Color Edit Window Started -->
<div class="modal fade" id="btnEditStActColor" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelAC"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stActualColE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="actColIdE" name="actColIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" id="stActColDescE"
								name="stActColDescE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Category ID</label><select name="actColCatE"
								id="actColCatE" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="acCreatedByE" name="acCreatedByE">
						</div>
					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="acCreatedOnE" name="acCreatedOnE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="acChangedByE" name="acChangedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="acChangedOnE" name="acChangedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editStActColorE"
						name="editStActColorE">
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
<!-- Stone Actual Color Edit Window Ended -->

<!-- Loop Type Edit Window Started -->
<div class="modal fade" id="btnEditLoopType" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelLT"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="loopTypeE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="looptypeIdE" name="looptypeIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" id="loopDescE" name="loopDescE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment ID</label> <select
								id="segmIdLTE" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="ltCreatedByE" name="ltCreatedByE">
						</div>
					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="ltCreatedOnE" name="ltCreatedOnE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="ltChangedByE" name="ltChangedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="ltChangedOnE" name="ltChangedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editLoopTypE"
						name="editLoopTypE">
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
<!-- Loop Type Edit Window Ended -->

<!-- Metal Color Edit Window Started -->
<div class="modal fade" id="btnEditMetalColor" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelMC"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="metalColorE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="mColorIdE" name="mColorIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" id="mColDescE" name="mColDescE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment ID</label> <select
								id="segmIdMCE" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="mcCreatedByE" name="mcCreatedByE">
						</div>
					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="mcCreatedOnE" name="mcCreatedOnE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="mcChangedByE" name="mcChangedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="mcChangedOnE" name="mcChangedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editMetalColrE"
						name="editMetalColrE">
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
<!-- Metal Color Edit Window Ended -->


<!-- Stone Color Edit Window Started -->
<div class="modal fade" id="btnEditStoneColor" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelStC"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneColorE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="stColorIdE" name="stColorIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" id="stColDescE"
								name="stColDescE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category</label> <select
								id="catStColE" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="stCreatedByE" name="stCreatedByE">
						</div>
					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="stCreatedOnE" name="stCreatedOnE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="stChangedByE" name="stChangedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="stChangedOnE" name="stChangedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editStoneColrE"
						name="editStoneColrE">
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
<!-- Stone Color Edit Window Ended -->

<!-- Clarity Edit Window Started -->
<div class="modal fade" id="btnEditClarity" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelClarity"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="clarityE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="clarityIdE" name="clarityIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Name</label> <input
								type="text" class="form-control" id="clarityNameE"
								name="clarityNameE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Category ID</label><select name="claCatIdE" id="claCatIdE"
								class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="claCreatedByE" name="claCreatedByE">
						</div>
					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="claCreatedOnE" name="claCreatedOnE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="claChangedByE" name="claChangedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="claChangedOnE" name="claChangedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editClarityE"
						name="editClarityE">
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
<!-- Clarity Edit Window Ended -->


<!-- Standard Rate Stone Edit Window Started -->
<div class="modal fade" id="btnEditStoneRate" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelStRate"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneRateE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="rateIdE" name="rateIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>From Range</label> <input
								type="text" class="form-control" id="fromRangeE"
								name="fromRangeE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>To Range</label> <input
								type="text" class="form-control" id="toRangeE" name="toRangeE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment ID</label> <input
								type="text" class="form-control" id="segRateIdE"
								name="segRateIdE" disabled>
						</div>

					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category ID</label> <input
								type="text" class="form-control" id="catRateIdE"
								name="catRateIdE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>UOM</label> <input
								type="text" class="form-control" id="uomE" name="uomE" disabled>
						</div>

						<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							align="left">
							<span class="required">*</span>&nbsp;<label>Business ID</label> <select
								id="buIdE" name="buIdE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div> -->
						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Business ID</label> <input type="text" class="form-control" 
							id="buIdE" name="buIdE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="rateCreatedByE" name="rateCreatedByE">
						</div>


					</div>

					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="rateCreatedOnE" name="rateCreatedOnE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="rateChangedByE" name="rateChangedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="rateChangedOnE" name="rateChangedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm"
						id="editStdRateStoneE" name="editStdRateStoneE">
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
<!-- Standard Rate Stone Edit Window Ended -->


<!-- Standard Rate Stone Edit Window Started -->
<div class="modal fade" id="btnEditStoneWeight" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelStWeight"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneWeightE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="weightIdE" name="weightIdE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>From Range</label> <input
								type="text" class="form-control" id="fromWtRangeE"
								name="fromWtRangeE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>To Range</label> <input
								type="text" class="form-control" id="toWtRangeE"
								name="toWtRangeE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>From To
								Weight Range</label> <input type="text" class="form-control"
								id="fromToWtRangeE" name="fromToWtRangeE" disabled>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Category</label> <input type="text"
								class="form-control" disabled id="wtCatE" name="wtCatE">
						</div>


						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="weightCreatedByE" name="weightCreatedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="weightCreatedOnE" name="weightCreatedOnE" disabled>
						</div>


						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="wtChangedByE" name="wtChangedByE">
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="wtChangedOnE" name="wtChangedOnE">
						</div>
					</div>

				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editStoneWtE"
						name="editStoneWtE">
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
<!-- Standard Rate Stone Edit Window Ended -->

<!-- Metal Purity Edit Window Started -->
<div class="modal fade" id="btnEditMetalPurity" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelMPurity"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="metalPurityE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="purityIdE" name="purityIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" id="descE" name="descE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Display Order</label>
							<input type="text" class="form-control" id="displayOrdE"
								name="displayOrdE">
						</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Skin Purity</label> <input
								type="text" class="form-control" id="skinPurityE"
								name="skinPurityE">
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Melting
								Purity</label> <input type="text" class="form-control"
								id="meltingPurityE" name="meltingPurityE">
						</div>
					

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"
							align="left">
							<span class="required">*</span>&nbsp;<label>Metal Type ID</label>
							<select id="metalTypeIdE" name="metalTypeIdE"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="purirtCreatedByE" name="purirtCreatedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="purityCreatedOnE" name="purityCreatedOnE" disabled>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="purityChangedByE" name="purityChangedByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="purityChangedOnE" name="purityChangedOnE">
						</div>
					</div>

				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editpurityE"
						name="editpurityE">
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
<!-- Metal Purity Edit Window Ended -->

<!-- Metal Purity Edit Window Started -->
<div class="modal fade" id="btnEditShape" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelShape"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="shapeE"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>ID</label> <input type="text" class="form-control"
								disabled id="shapeIdE" name="shapeIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Shape Code</label> <input
								type="text" class="form-control" id="shapeCodeE" name="shapeCodeE" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Description</label> <input
								type="text" class="form-control" id="shapeDescE" name="shapeDescE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"  id="showHideJtypeE">
								<label>Category</label><div id="shapeCatE"></div>
						</div>
						<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category</label>
							 <select id="shapeCatE" class="form-control" name="shapeCatE">
									<option value="" selected label="Select" />
								</select>
						</div> -->
								
					</div>
					<div class="row">
					    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="shapeCreatedByE" name="shapeCreatedByE">
						</div>	
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="shapeCreatedOnE" name="shapeCreatedOnE" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="shapeChangedByE" name="shapeChangedByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="shapeChangedOnE" name="shapeChangedOnE">
						</div>
					</div>

				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editShapeE"
						name="editShapeE">
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
<!-- Metal Purity Edit Window Ended -->
<div class="modal fade" id="modalConfirmDel" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
		<div class="modal-dialog modal-lg">
		<div class="modal-content">
    <div class="modal-header">
        <a href="#" data-dismiss="modal" aria-hidden="true" class="close">×</a>
         <h3>Delete</h3>
    </div>
    <div class="modal-body">
        <p>You are about to delete.</p>
        <p>Do you want to proceed?</p>
    </div>
    <div class="modal-footer">
      <a href="#" id="btnYes" class="btn btn-danger">Yes</a>
      <a href="#" data-dismiss="modal" aria-hidden="true" class="btn btn-warning">No</a>
    </div>
    </div>
    </div>
</div>
<script src="resource/oe/assets/js/app/attributesMaster.js"	type="text/javascript"></script>

