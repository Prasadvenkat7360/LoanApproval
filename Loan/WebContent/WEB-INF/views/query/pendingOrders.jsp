<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA :
	## 	Date Creation : 01/06/2016
 -->


<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Order Follow-Up Query
					</h1>
				</div>

				<!-- Search Option Started ############# -->
				<form class="form-horizontal" id="pendingMelting">
					<div class="mobile-responsive">
						<div class="row">
							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Date From</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="orderFromDate" placeholder="DD/MM/YYYY"> <label
										for="orderFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Date To</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="orderToDate" placeholder="DD/MM/YYYY"> <label
										for="orderToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Order Type </label> <select id="orderType"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Order No.</label> <input type="number"
									class="form-control" placeholder="Order No." id="orderNo">
							</div>

							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>PSR No.</label> <input type="number"
									class="form-control" placeholder="MSR No." id="msrNo">
							</div>

							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Order Status</label> <select id="orderStatus"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						</div>

						<div class="row">

							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Store Code</label> <select id="storeCode"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Sales Executive</label><select id="salesExecutive"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Customer ID</label> <input type="number"
									class="form-control" placeholder="Customer ID"
									id="customerId">
							</div>

							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Phone Number</label> <input type="number"
									class="form-control" placeholder="Phone Number" id="customerContactNumber">
							</div>

							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>E-mail</label> <input type="email" class="form-control"
									placeholder="E-mail" id="customerEmail">
							</div>

							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Customer Name</label> <input type="text"
									class="form-control" placeholder="Customer Name"
									id="customerName">
							</div>
						</div>
<!-- 						<div class="row">
							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
								<label>Vendor Code </label> <input type="text"
									class="form-control" placeholder="Vendor Code"
									id="vendorCode">
							</div>
						</div> -->
						<div class="row voffset2" align="center">
							<button class="btn btn-primary voffset" type="button"
								name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button type="reset" id="clearAll"
								class="btn btn-warning voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary voffset" type="button"
								name="export" id="export">
								<i class="fa fa-search fa-lg"></i> Export
							</button>
						</div>
					</div>
				</form>

				<!-- Search Option Ended #############-->

				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>

			</div>
			<!-- </div> -->
		</div>
	</div>
</div>
					
<script src="resource/oe/assets/js/app/pendingOrders.js"></script>
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>	
<script>
	$("#Search").on('click', function() {
		pendingOrderGrid();
		$("#jqxgrid").show();
		return false;
	});
</script>

<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>