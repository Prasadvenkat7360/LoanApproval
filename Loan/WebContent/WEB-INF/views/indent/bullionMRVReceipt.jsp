<div class="main-container">
	<div class="container-fluid">
		
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">				
				<div class="heading-block" >
					<h1><i class="fa fa-desktop"></i> Bullion PO Receipt</h1>
					<div class="heading-block-action"><a href="javascript:showContentPage('pendingIndents', 'bodySwitcher')" class="btn btn-primary btn-sm voffset" type="button" id="indentListing"><i class="fa fa-arrow-left"></i>&nbsp;Go Back</a></div>
				</div>

				<form class="form-horizontal" id="bulionReceiptForm">
						<div class="row">
							<div class="col-sm-2">
								<label>From Date </label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"	id="orderFromDate" placeholder="DD/MM/YYYY"> <label	for="orderFromDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>To Date </label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"	id="orderToDate" placeholder="DD/MM/YYYY"> <label for="orderToDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>								
								</div>
							</div>
							
							<div class="col-sm-2">
								<label>Party Bill Date </label>
								<div class="input-group">
									<input type="text" class="date-picker form-control dateBackground"	id="partyBillDate" placeholder="DD/MM/YYYY"> <label	for="partyBillDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
								</div>
							</div>							
							
							<div class="col-sm-2">
								<label>Party Bill No</label>
							 	<input type="text" class="form-control" name="partyBillNo" id="partyBillNo" placeholder="Party Bill No"/> 
							</div>
							
							<div class="col-sm-2">
								<label>Indent PO No</label>
								<input type="text" class="form-control" name="indentPONo" id="indentPONo" /> 
							</div>
							
							<div class="col-sm-2">
                                  <label><span class="required">*</span>Segment</label>
                                 	<select id="metalSegment" class="form-control"><option value="" selected label="--Select--" /></select>
                             </div>
                            
						</div>
						<div class="row">
							 <div class="col-sm-2">
								<label>Status</label>
                                <select id="status" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							<div class="col-sm-2">
								<label>Bullion Dealer</label>
                                <select id="bullionDealer" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>PO Receipt No</label>
								 <input type="text" class="form-control" name="poReceiptNo" id="poReceiptNo" /> 
							</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="searchRecpt" id="searchRecpt"><i class="fa fa-search fa-lg"></i>Search</button>	
							<button id="clear" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							<button id="export" class="btn btn-primary btn-sm voffset"	type="button" disabled><i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export</button>
					   </div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1"><div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/bullionMRVReceipt.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>