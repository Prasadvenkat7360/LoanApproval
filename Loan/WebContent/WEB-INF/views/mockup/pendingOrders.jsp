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
						<i class="fa fa-desktop"></i>&nbsp; Pending Orders
					</h1>
				</div>
				<!-- Pending Melting Heading Add Ended -->
				<div class="panel-group" id="accordion">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">
								<!-- <a id="edit-search" data-toggle="collapse"
									data-parent="#accordion" href="#collapseOne"><i
									class="fa fa-search fa-lg"></i> &nbsp; Edit Search Options</a> -->
							</h4>
						</div>
						<!-- <div id="collapseOne" class="panel-collapse collapse in"> -->
						<div class="panel-body">
							<!-- Search Option Started ############# -->
							<form class="form-horizontal" id="pendingMelting">
								<div class="mobile-responsive">
									<div class="row">
										<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
											<label>Date From</label>
											<div class="input-group">
												<input type="text" class="date-picker form-control"
													id="orderFromDate" placeholder="DD/MM/YYYY"> <label
													for="orderFromDate" class="input-group-addon cursor"><span
													class="fa fa-calendar"></span></label>
											</div>
										</div>

										<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
											<label>Date To</label>
											<div class="input-group">
												<input type="text" class="date-picker form-control"
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
											<label>MSR No.</label> <input type="number"
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
									<div class="row">
										<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 form-field">
											<label>Vendor Code </label> <input type="text"
												class="form-control" placeholder="Vendor Code"
												id="vendorCode">
										</div>
									</div>
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
					<!-- <div id="panel-two" class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion"
									href="#collapseTwo"><i class="fa fa-list fa-lg"></i>
									Pending Orders</a>
							</h4>
						</div>
						<div id="collapseTwo" class="panel-collapse collapse">
							<div class="panel-body">
								Listing Pending Order Started
								<div id="pendingOrdersResults" class="narrow text-center">
									<div class="resposive-table-data narrow text-center">
										<table class="table table-bordered table-hover">
											<thead>
												<tr>
													<th></th>
													<th>Order No.</th>
													<th>Store Code</th>
													<th>Cust. Name</th>
													<th>Cust. ID</th>
													<th>Cust. Addr.</th>
													<th>Cust. Ph. No.</th>
													<th>Cust. Email</th>
													<th>Order Intimation Mode</th>
													<th>Delivery Address</th>
													<th>Total Advance</th>
													<th>Credit to Acc. Wt.</th>
													<th>Unrealised Amnt.</th>
													<th>Order Status</th>
													<th>Intimation Details</th>
													<th>Reminder details</th>
												</tr>
											</thead>
											<tbody>
												<tr id="po1">
													<td id="iconPlusMinus"><i
														class="fa fa-plus-square fa-lg"></i></td>
													<td>1</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>

												<tr id="po-table-expand">
													<td colspan="16">
														<table class="table table-bordered table-hover">
															<thead>
																<tr>
																	<th colspan="19"></th>
																	<th colspan="2">Finished Weight</th>
																	<th colspan="4"></th>
																</tr>
																<tr>
																	<th>Order No.</th>
																	<th>Order Sl.</th>
																	<th>Vendor Code</th>
																	<th>GRV Number</th>
																	<th>Order Item Status</th>
																	<th>Order Date</th>
																	<th>Due Date</th>
																	<th>Release Date</th>
																	<th>J/w Due Date</th>
																	<th>Order Kind</th>
																	<th>Stock Number</th>
																	<th>Segment</th>
																	<th>Jewel Type</th>
																	<th>Sub Catogery</th>
																	<th>Article Code</th>
																	<th>Pcs.</th>
																	<th>Purity</th>
																	<th>Pre Repair Wt.</th>
																	<th>Estimated Weight</th>
																	<th>From</th>
																	<th>To</th>
																	<th>Advance in Rs.</th>
																	<th>Design Status</th>
																	<th>Sales Excecutive Name</th>
																	<th>Follow up Remarks</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>25985</td>
																	<td>1</td>
																	<td>BA</td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																</tr>
																<tr>
																	<td>25985</td>
																	<td>2</td>
																	<td>AB</td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																	<td></td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>

											</tbody>
										</table>



									</div>
								</div>
								Listing Pending Order Ended
							</div>
						</div>
					</div> -->
				</div>

				<!-- Pending Melting Search Started -->


				<!-- Pending Melting Search Ended -->


			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/pendingOrders.js"></script>
<script>
	$("#Search").on('click', function() {
		pendingOrderGrid();
		$("#jqxgrid").show();
		return false;
	});
</script>