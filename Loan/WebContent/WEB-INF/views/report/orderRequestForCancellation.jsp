<!-- 
	##	Author UI 1		: 	Raksha
	##  Author UI 2	    :  	Dipankar Naha
	##	Date Creation 	: 	09-06-2017
	## 	Description		:	REQUEST FOR CANCELLATION REPORT HAVING SEARCH AND EXPORT FUNCTIONALITY
 -->
<script src="resource/oe/assets/js/app/orderRequestForCancellation.js"></script>

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!--  Metal Balance Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop fa-lg"></i> &nbsp; List Of Order Request For Cancellation Report
					</h1>
				</div>

				<form class="form-horizontal" id="reqForCancellation"
					action="javascript: void(0);">
						<!-- Row 1 Started  -->
						<div class="row">
							<!-- <div class="col-sm-2">
								<label>Region</label>
								<div id="regionS"></div>
							</div> -->
						<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Order Type</label>
								<div id="orderTypeS"></div>
						</div>
						<div class="col-sm-2">
								<label>Store/DC Type</label>
								<select id="storeDCType" class="form-control">
									<option value="">--select--</option>
									<option value="store">Store</option>
									<option value="dc">DC</option>
								</select>
						</div>
						<div class="col-sm-2" id="storeName">
								<label>Store Name</label>
								<div id="storeNameS"></div>
						</div>
						<div class="col-sm-2" id="dcName">
								<label>DC Name</label>
								<div id="dcNameS"></div>
						</div>
													
						</div>
						<div class="clearfix">&nbsp;</div>

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
								name="export" id="export" >
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
						</div>
				</form>
				<!-- Metal Balance Search Ended -->
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
