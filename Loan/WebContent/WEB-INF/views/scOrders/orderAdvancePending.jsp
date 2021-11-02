<!-- 
    ##	Author UI           : 	Raksha
	##	Author UI           : 	Dipankar
	## 	Author JAVA 	    :   Manoranjan
	##	Date Creation 	    : 	17-04-2017
	## 	Description		    :	Order Advance Pending.
 -->

<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp;Order Advance Pending
					</h1>
					<div class="heading-block-action"></div>
				</div>
				<form class="form-horizontal" id="advancePending"
					action="javascript: void(0);">
					<div class="mobile-responsive">
						<!-- Row 1 Started  -->

						<div class="row">

							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Store Name</label><!-- <input type="text" class="form-control"
									placeholder="Store Name" id="storeId" name="storeId"> <input
									id="storeId-value" type="hidden"> -->
									<select id="storeId" name="storeId" class="form-control">
										<option value="" selected label="Select" /></select>
							</div>
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Order No</label><input type="text" class="form-control"
									placeholder="Order No" id="orderNo" name="orderNo"> <input
									id="orderNo-value" type="hidden">
							</div>
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Customer Id</label><input type="text"
									class="form-control" placeholder="Customer Id" id="customerId"
									name="customerId"> <input id="customerId-value"
									type="hidden">
							</div>
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label> Customer Name </label> <input type="text"
									class="form-control" placeholder="Customer Name"
									id="customerName" name="customerName">
									<input type="hidden"
									class="form-control" placeholder="Customer Id"
									id="customerName-value" name="customerName-value">
							</div>
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
						           <label> Status  </label>
						           <select id="statusS" name="statusC" class="form-control">
						           <option value="">--Select--</option>
						           </select>
						     </div>
							
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary voffset" type="submit"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clear" class="btn btn-warning voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button name="export" id="export" type="button" 
								class="btn btn-primary voffset">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							&nbsp;
							<button name="print" id="printOA" type="button" 
								class="btn btn-primary voffset">
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>
						</div>
					</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				<div
					style="text-align: center; marging: auto; position: relative; z-index: 1"
					id='row'>
					<div id="jqxgrid"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/orderAdvancePending.js"
	type="text/javascript"></script>