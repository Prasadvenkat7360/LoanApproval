<!-- 
	##  Author UI : Raksha
	## 	Author JAVA : Nageshwar Rao
	## 	Date Creation : 28/03/2018
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Scanned / Weight Check Report
					</h1>
				</div>
				<form class="form-horizontal" id="scanningWeightCheck" action="javascript: void(0)">
						<div class="pull-left">
							<label class="radio-inline"><input class="element"
								type="radio" name="scanningWc" value="scanningWc">
								&nbsp; Scanning </label> <label class="radio-inline"> <input
								class="element" type="radio" name="scanningWc" value="Wc">
								&nbsp; Weight Check
							</label>
						</div>

				</form>
				<div class="clearfix">&nbsp;</div>
				<!-- ########## Starting of search for Scanning  -->
				<div class="clearfix">&nbsp;</div>
				<div id="scanning">
					<form class="form-horizontal" id="scanningForm" action="javascript: void(0)">
						<div class="row">
							<div class="col-sm-2 form-field">
								<span class="required">*</span>&nbsp;<label>From Date</label>
									<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
									 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
									<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							       </div>
						   </div>
							<div class="col-sm-2 form-field">
								<span class="required">*</span>&nbsp;<label>To Date</label>
									<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
									name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
									<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							</div>
							<div class="col-sm-2 form-field">
								<label>Material Type</label> <select id="matTypeS"
									name="matTypeS" class="form-control">
									<option value="" selected>--Select--</option>
									<option value="FG">Finished Goods</option>
									<option value="LS">Loose Stones</option>
								</select>
							</div>
							<div class="col-sm-2 form-field">
								<label>Zone Id</label> <select id="zoneIdS"
									name="zoneIdS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2 form-field">
								<span class="required">*</span>&nbsp;<label>Stock Check Id
									</label> <input type="text" class="form-control" value=""
										placeholder="Stock Check Id" id="stockCheckIdS" name="stockCheckIdS">
							</div>
							<div class="col-sm-2 form-field" id="jewlHide">
								<label>Jewel Type</label> <select id="jewelTypeS"
									name="jewelTypeS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2 form-field" id="segHide">
								<label>Segment</label> <select id="segmentS"
									name="segmentS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2 form-field" id="catHide">
								<label>Category</label> <select id="categoryS"
									name="categoryS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2 form-field">
								<label>Type of Report</label> <select id="repTypeS"
									name="repTypeS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
						</div>
						
						<div class="row voffset2" align="center">
							<button class="btn btn-sm btn-primary voffset" type="button"
								name="searchSc" id="searchSc">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="ClearAllSc" class="btn btn-sm btn-warning voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-sm btn-primary voffset" type="button"
								name="exportSc" id="exportSc">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
							&nbsp;
							<button class="btn btn-sm btn-primary voffset" type="button" 
								name="printSc" id="printSc">
								<i class="fa fa-print"></i> Print
							</button>
						</div>
					</form>
				</div>
				<!-- ########## ending of search for Scanning  -->
				<!-- ########### Starting of the FG radio for search items -->
				<div id="weightCheck">
					<form class="form-horizontal" id="weightCheckForm" action="javascript: void(0)">
						<div class="row">
							<div class="col-sm-2 form-field">
								<span class="required">*</span>&nbsp;<label>From Date</label>
									<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
									 name="fromDateW" id="fromDateW" placeholder="DD/MM/YYYY">
									<label for="fromDateW" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							       </div>
						   </div>
							<div class="col-sm-2 form-field">
								<span class="required">*</span>&nbsp;<label>To Date</label>
									<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
									name="toDateW" id="toDateW" placeholder="DD/MM/YYYY">
									<label for="toDateW" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							</div>
							<div class="col-sm-2 form-field">
								<label>Material Type</label> <select id="matTypeW"
									name="matTypeW" class="form-control">
									<option value="" selected>--Select--</option>
									<option value="FG">Finished Goods</option>
									<option value="LS">Loose Stones</option>
								</select>
							</div>
							<div class="col-sm-2 form-field">
								<label>Zone Id</label> <select id="zoneIdW"
									name="zoneIdW" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2 form-field">
								<span class="required">*</span>&nbsp;<label>Stock Check Id
									</label> <input type="text" class="form-control" value=""
										placeholder="Stock Check Id" id="stockCheckIdW" name="stockCheckIdW">
							</div>
							<div class="col-sm-2 form-field" id="jewlHideW">
								<label>Jewel Type</label> <select id="jewelTypeW"
									name="jewelTypeW" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2 form-field" id="segHideW">
								<label>Segment</label> <select id="segmentW"
									name="segmentW" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-sm-2 form-field" id="catHideW">
								<label>Category</label> <select id="categoryW"
									name="categoryW" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
					
							<div class="col-sm-2 form-field">
								<label>Type of Report</label> <select id="repTypeW"
									name="repTypeW" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-sm btn-primary voffset" type="submit"
								name="searchWc" id="searchWc">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAllWc" class="btn btn-sm btn-warning voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-sm btn-primary voffset" type="button"
								name="exportWc" id="exportWc">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
							&nbsp;
							<button class="btn btn-sm btn-primary voffset" type="button" 
								name="printWc" id="printWc">
								<i class="fa fa-print"></i> Print
							</button>
						</div>
					</form>

				</div>

				<!-- Metal Account Search Ended -->
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
<script src="resource/oe/assets/js/app/scanningWcReport.js" type="text/javascript"></script>
