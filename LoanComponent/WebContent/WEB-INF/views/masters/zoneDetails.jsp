<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Metal Accounting Location Header Started -->
				<div class="heading-block">
					  	<h1>
						<i class="fa fa-desktop"></i> &nbsp;Zone Master
					</h1>

					<div class="clearfix">&nbsp;</div>
					<label class="radio-inline"><input name="zoneDet"
						type="radio" value="1" /> &nbsp; DC</label> <label class="radio-inline"><input
						name="zoneDet" type="radio" value="2" /> &nbsp; Store</label> <label
						class="radio-inline"><input name="zoneDet" type="radio"
						value="3" /> &nbsp; Zone Type</label>
				</div>

				<div id="DcDet">
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp; DC
						</h1>
						<div class="heading-block-action">
							<a class="btn btn-primary" data-toggle="modal"
								data-target="#createDcDet" type="button" id="createDC"
								href="javascript: void(0)"><i class="fa fa-plus"></i>
								&nbsp;Create </a>
						</div>
					</div>

					<!-- dc Details Search -->
					<form class="form-horizontal" id="zoneDetailCreate">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>DC Name</label> <select id="dcNameS" class="form-control">
											<option value="" label="--Select--"/>
											<option value="jewel2">Jewel 2</option>
									</select>
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary voffset" type="button"
									name="searchDC" id="searchDC">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllDC" class="btn btn-warning voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>


				<!-- Store searching started -->
				<div id="StoreDet">
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp; Store
						</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary" data-toggle="modal"
								data-target="#createStoreDet" type="button" id="createSDT"><i class="fa fa-plus"></i>
								&nbsp;Create </button>
						</div>
					</div>
					<!-- Parameter Details Search -->
					<form class="form-horizontal" id="zoneDetailCreate">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">


								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Store Name</label> <select id="storeNameS"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary voffset" type="button"
									name="searchStore" id="searchStore">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllStore" class="btn btn-warning voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>

				<div id="ZoneTypeDet">
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp; Zone type
						</h1>
						<div class="heading-block-action">
							<a class="btn btn-primary" data-toggle="modal"
								data-target="#createZoneTypeDet" type="button" id="createZTD"
								href="javascript: void(0)"><i class="fa fa-plus"></i>
								&nbsp;Create </a>
						</div>
					</div>
					<!-- Parameter Details Search -->
					<form class="form-horizontal" id="zoneDetailCreate">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">


								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Zone Type</label> <select id="zoneTypeS"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary voffset" type="button"
									name="searchZoneType" id="searchZoneType">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllZoneType" class="btn btn-warning voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>
            </div>
          	<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for Zone details create and search-->
				<div style="position: relative; z-index: 1">

					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->
			</div>
	</div>
</div>


<!-- Model Window for create Zone Master -->


<!-- Modal window for Store creation -->
<div class="modal fade" id="createDcDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Create Zone
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="">
				<div class="col-md-12 mobile-responsive">				
					<!-- Row 1 Started  -->
					<div class="row">
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>DC Name</label> <select id="dcName" class="form-control">
										<option value="" label="--Select--"/>
										<option value="jewel2">Jewel 2</option>
									</select>
								</div>
				    </div>
				
					
						<div class="heading-block">
							<h3></h3>
							<div class="heading-block-action">
								<button class="btn btn-primary" id="addDCDetailsRow" type="button">
								<i  class="fa fa-plus"></i>&nbsp;Add </button>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
						<div class="col-md-12 form-field">
						
							<div id="jqxgrideD"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						
						</div>
						</div>

				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Zone Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button" name="createDCDetails"
					id="createDCDetails">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="submit" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>

<!-- Modal window for Store creation -->
<div class="modal fade" id="createStoreDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Create Zone
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="">
				<div class="col-md-12 mobile-responsive">				
					<!-- Row 1 Started  -->
					<div class="row">
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Store Name</label> <select id="storeName" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
				    </div>
				
					
						<div class="heading-block">
							<h3></h3>
							<div class="heading-block-action">
								<button class="btn btn-primary" id="addStoreDetailsRow" type="button">
								<i  class="fa fa-plus"></i>&nbsp;Add </button>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
						<div class="col-md-12 form-field">
						
							<div id="jqxgrideS"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						
						</div>
						</div>

				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Zone Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button" name="createStoreDetails"
					id="createStoreDetails">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="submit" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>


<!-- Modal window for Zone Type creation -->
<div class="modal fade" id="createZoneTypeDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Create Zone
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="">
				<div class="col-md-12 mobile-responsive">				
					<!-- Row 1 Started  -->
					<div class="row">
					<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Zone Type Name</label> <select id="zoneTypeName" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
				    </div>
				
					
						<div class="heading-block">
							<h3></h3>
							<div class="heading-block-action">
								<button class="btn btn-primary" id="addZoneTypeDetailsRow" type="button">
								<i  class="fa fa-plus"></i>&nbsp;Add </button>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
						<div class="col-md-12 form-field">
						
							<div id="jqxgrideZ"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						
						</div>
						</div>

				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Zone Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button" name="createZoneTypeDetails"
					id="createZoneTypeDetails">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				&nbsp;
				<button type="submit" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/zoneDetails.js"></script>
