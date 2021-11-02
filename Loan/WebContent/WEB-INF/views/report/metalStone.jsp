<!-- 
	##	Author UI 		: 	mani prasad
	## 	Author JAVA 	: 
	##	Date Creation 	: 	2-03-2017
	## 	Description		:	Creation of stock of metal
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!--  Metal Balance Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Stock of Stone In Premises
						Store/DC Wise/Consolidated
					</h1>
				</div>
				<!-- Metal Stone Search Started -->
				<form action="javascript:void()" class="form-horizontal" id="metalAccSearch">
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Account From
									Date</label>
								<div class="input-group">
									<input type="text" class="date-picker form-control"
										name="StoneBalancefrom" id="StoneBalancefrom"
										placeholder="Account from Date"> <label
										for="StoneBalancefrom" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
						
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Account To
									Date</label>
								<div class="input-group">
									<input type="text" class="date-picker form-control"
										name="stoneBalanceto" id="stoneBalanceto"
										placeholder="Account to Date"> <label
										for="stoneBalanceto" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>

							</div>
							
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Segment</label> <select
									id="segmentLov" name="segmentLov" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2"
								id="catDet">
								<span class="required">*</span>&nbsp;<label>Category</label>
								<div id="categoryName"></div>
							</div>
							<div class="col-sm-2">
								<label>Region</label>
								<div id="regionLov"></div>
							</div>
							<div class="col-sm-2">
								<label>Store/DC/All</label> <select id="selectStoreDC"
									name="selectStoreDC" class="form-control">
									<option value="all" selected>All</option>
									<option value="store">Store</option>
									<option value="dc">DC</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2" id="storeDiv">
								<span class="required">*</span>&nbsp;<label>Store Name</label>
								<div id="storeName"></div>
							</div>

							<div class="col-sm-2" id="dcDiv">
								<span class="required">*</span>&nbsp;<label>DC Name</label>
								<div id="dcName"></div>
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
								name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>


						</div>
				</form>
				<!-- Ending of the form  -->

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





<script src="resource/oe/assets/js/app/metalStone.js"></script>
