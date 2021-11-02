<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> Goods Issue Voucher Listing</h1>
					<div class="heading-block-action">
						<button	onclick="javascript:showContentPage('materialIssueVoucher', 'bodySwitcher')"	class="btn btn-primary btn-sm voffset" type="button" id="indentListing"><i class="fa fa-plus fa-lg"></i>&nbsp;Create GIV</button>
					</div>
				</div>

				<form class="form-horizontal" id="psrSearch">
					<div class="row">
						<div class="col-sm-2">
							<label>From Date </label>
							<div class="input-group">
								<input type="text" readonly class="date-picker form-control dateBackground" id="orderFromDate" placeholder="DD/MM/YYYY"> 
								<label	for="orderFromDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
							</div>
						</div>

						<div class="col-sm-2">
							<label>To Date </label>
							<div class="input-group">
								<input type="text" readonly class="date-picker form-control dateBackground"	id="orderToDate" placeholder="DD/MM/YYYY"> 
								<label for="orderToDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
							</div>
						</div>

						<div class="col-sm-2">
							<label>Vendor Name</label> 
							<input type="text" id="vendorCode"	class="form-control" placeholder="Vendor Name" /> 
							<input	id="vendorCode-value" type="hidden" name="code">
						</div>
						<div class="col-sm-2">
							<label>GIV Type </label> 
							<select id="jwType"	class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-sm-2">
							<label>GIV No.</label> <input type="number" id="mivNo"
								class="form-control" placeholder="GIV No." />
						</div>
						<div class="col-sm-2">
                               <label>GIV Done By </label>
                             		<select id="salesPerson" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
                           </div>
                      
					</div>
					<div class="row">     
                           <div class="col-sm-2">
                               <label>Goods Type</label>
                          		<select id="materialType" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
                           </div>
                           
                           <div class="col-sm-2">
                               <label>Segment</label>
                          		<select id="segment" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
                           </div>
					</div>
					
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="Search"><i class="fa fa-search fa-lg"></i> Search</button>
						<button id="clearAll" class="btn btn-warning btn-sm" type="button"><i class="fa fa-times fa-lg"></i> Clear</button>						
						<button class="btn btn-primary btn-sm voffset" type="button" name="export" id="export"><i class="fa fa-file-excel-o fa-lg"></i> Export</button>
					</div>
				</form>

				<div class="clearfix">&nbsp;</div>
				<div id='jqxwindow'><div id="jqxgrid" style="font-size: 13px; font-family: Verdana;"></div></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/miv.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>