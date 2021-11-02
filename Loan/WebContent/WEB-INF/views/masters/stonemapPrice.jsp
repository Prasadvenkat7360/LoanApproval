<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Stone MAP Price
					</h1>
				</div>

				<form class="form-horizontal" id="stoneMapPrice">
						<div class="row">

							<div class="col-sm-2">
								<label>From Date </label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="sMapFromDate" placeholder="DD/MM/YYYY"> <label
										for="sMapFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>To Date </label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="sMapToDate" placeholder="DD/MM/YYYY"> <label
										for="sMapToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Segment</label>
									 <select  name="segmentName" id="segmentName" class="form-control">
									<option value="">--Select--</option>
									</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Category</label>
									 <select  id="category" class="form-control" name="category">
									<option value="">--Select--</option>
									</select>
							</div>

						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							<button id="removeMatIssueDet" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
						</div>
				</form>

				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/stonemapPrice.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>