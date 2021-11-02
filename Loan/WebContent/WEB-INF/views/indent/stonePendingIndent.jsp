<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12  layout-main">
				<div>&nbsp;</div>
				<div class="heading-block">
					<label class="radio-inline">
						<input name="POListing" type="radio" value="1" /> &nbsp; Stone Purchase Order Listing
					</label> 
					<label class="radio-inline">
						<input name="POListing" type="radio" value="2" /> &nbsp; Goods Receipt Voucher
					</label>
					<label class="radio-inline">
						<input name="POListing" type="radio" value="3" /> &nbsp;Goods Issue Voucher
					</label>
				</div>
			<!-- Left Panel Started For Stone Purchase Order Listing -------------------------------------------------->
			<div class="layout-main" id="stonePOListing">
				<div class="heading-block" >
					<h4>
						<i class="fa fa-desktop"></i> <b>Stone Purchase Order Listing</b>
					</h4>
					<div class="heading-block-action">
						<button onclick="javascript:showContentPage('stoneIndentPage', 'bodySwitcher')" class="btn btn-primary btn-sm voffset" type="button" id="indentListing"> <i class="fa fa-plus fa-lg"></i>&nbsp;Create</button>
					</div>
				</div>

				<form class="form-horizontal" id="stPO">
						<div class="row">
							<div class="col-sm-2">
								<label>From Date </label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground"
										id="orderFromDate" placeholder="DD/MM/YYYY"> <label
										for="orderFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>To Date </label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground"
										id="orderToDate" placeholder="DD/MM/YYYY"> <label
										for="orderToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div class="col-sm-2">
								<label>Stone PO No</label>
								 <input type="number" class="form-control" placeholder="Stone PO No" name="status" id="indentNo" min= "1"/> 
							</div>
							
							<div class="col-sm-2">
                                  <label><span class="required">*</span>Stone Segment</label>
                                 	<select id="stoneSegment" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
                             </div>
                            <div class="col-sm-2">
								<label>Status</label>
                                <select id="status" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							<button id="clearIndent" class="btn btn-warning btn-sm voffset"	type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							<button id="export" class="btn btn-primary btn-sm voffset"	type="button">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
					   </div>
					   
				</form>
				
				<div class="modal fade" id="stoneIndentData" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg" style="width:90%;">
						<div class="modal-content"></div>
					</div>
				</div>
				
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left; position: relative; z-index: 1;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>
				
			</div>
			
			<!-- Left Panel Started For MRV Purchase Order Listing Listing ------------------------------------------->
			<div class="layout-main" id="stoneMRVPOListing">
				<div class="heading-block" >
					<h4>
						<i class="fa fa-desktop"></i> <b>GRV Purchase Order Listing</b>
					</h4>
				</div>
				<form class="form-horizontal" id="stPOMRV">
						<div class="row">
							<div class="col-sm-2">
								<label>From Date </label>
								<div class="input-group">
									<input type="text"  readonly class="date-picker form-control dateBackground"
										id="orderFromDateMRV" placeholder="DD/MM/YYYY"> <label
										for="orderFromDateMRV" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>To Date </label>
								<div class="input-group">
									<input type="text" readonly  class="date-picker form-control dateBackground"
										id="orderToDateMRV" placeholder="DD/MM/YYYY"> <label
										for="orderToDateMRV" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div class="col-sm-2">
								<label>Vendor Invoice Date </label>
								<div class="input-group">
									<input type="text" readonly  class="date-picker form-control dateBackground"
										id="invoiceDate" placeholder="DD/MM/YYYY"> <label
										for="invoiceDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							
                            <div class="col-sm-2">
								<label>Stone PO Date </label>
								<div class="input-group">
									<input type="text" readonly  class="date-picker form-control dateBackground"
										id="stonePOdtMRV" placeholder="DD/MM/YYYY"> <label
										for="stonePOdtMRV" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
                                  <label>Segment</label>
                                 	<select id="stoneSegmentMRV" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
                             </div>
                            <div class="col-sm-2">
								<label>GRV Status</label>
                                <select id="mrvStatus" class="form-control">
									<option value="">--Select--</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Vendor Code</label>
								<input type="text" class="form-control" placeholder="Vendor Code" name="vendorCodeMRV" id="vendorCodeMRV"/> 
								<input type="hidden" class="form-control" name="vendorCodeMRV-value" id="vendorCodeMRV-value"/> 
							</div>
							<div class="col-sm-2">
								<label>GRV Type</label>
                                <select id="typesMRV" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Stone PO No.</label>
								 <select id="stIndentNo" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>GRV No.</label>
								<select id="mrvNos" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Parcel ID</label>
								<select id="parcelIdsMRV" class="form-control">
									<option value="" selected label="--Select--" />
								</select> 
							</div>
							
							 <div class="col-sm-2">
								<label>Vendor Invoice No.</label>
								<input type="text" class="form-control" name="vendorInvoiceNos" placeholder="Vendor Invoice No." id="vendorInvoiceNos"/> 
								<input type="hidden" class="form-control" name="vendorInvoiceNos-value" id="vendorInvoiceNos-value"/> 
							</div>
							</div>
					
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="searchPOMRV" id="searchPOMRV">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							<button id="clearPOMRV" class="btn btn-warning btn-sm voffset"	type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							<button id="exportPOMRV" class="btn btn-primary btn-sm voffset" type="button">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
					   </div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
					<div id="stonePOMRVGrid" style="font-size: 13px; font-family: Verdana; float: left; position: relative; z-index: 1;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>
			</div>
			
			<!-- Left Panel Started For MIV Purchase Order Listing Listing -------------------------------------------->
			<div class="layout-main" id="stoneMIVPOListing">
				<div class="heading-block" >
					<h4>
						<i class="fa fa-desktop"></i> <b>GIV Purchase Order Listing</b>
					</h4>
					
				</div>

				<form class="form-horizontal" id="stPOMIV">
						<div class="row">
							<div class="col-sm-2">
								<label>From Date </label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground"
										id="orderFromDateMIV" placeholder="DD/MM/YYYY"> <label
										for="orderFromDateMIV" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>To Date </label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground"
										id="orderToDateMIV" placeholder="DD/MM/YYYY"> <label
										for="orderToDateMIV" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
                                  <label>Segment</label>
                                 	<select id="stoneSegmentMIV" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
                             </div>
                             <div class="col-sm-2">
								<label>PR No</label>
								 <input type="number" class="form-control" placeholder="PR No" name="prNoMIV" id="prNoMIV" min= "1"/> 
							</div>
							<div class="col-sm-2">
								<label>PR Type</label>
                                <select id="prTypeMIV" class="form-control">
									<option value="" selected label="--Select--" />
									<option value="S">Stone</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>PR Done By</label>
                                <select id="prDoneByMIV" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Vendor</label>
                                <input type="text"	class="form-control" placeholder="Vendor"	id="vendorMIV" name="vendorMIV">
								<input id="vendorCode-value" type="hidden" name="code">
							</div>
							<div class="col-sm-4">
								<br/>
								<button class="btn btn-primary btn-sm voffset" type="button" name="searchPOMIV" id="searchPOMIV">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								<button id="clearPOMIV" class="btn btn-warning btn-sm  voffset" type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								<button id="exportPOMIV" class="btn btn-primary btn-sm  voffset" type="button">
									<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
								</button>
							</div>
						</div>
						
				</form>
				
				<div class="modal fade" id="stoneIndentData" data-keyboard="false"	data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg" style="width:90%;">
						<div class="modal-content"></div>
					</div>
				</div>
				
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
					<div id="stonePOMIVGrid" style="font-size: 13px; font-family: Verdana; float: left; position: relative; z-index: 1;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
		</div>
	</div>
</div>

<!-- Modal Window Started -->

	<div class="modal fade" id="btnIndentDA" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 10%;">
	    <div class="modal-dialog modal-lg">
	        <div class="modal-content">
	
	        </div>
	    </div>
	</div>

<!-- Modal Window Started Ended -->
<script src="resource/oe/assets/js/app/stoneIndent.js"></script>	
 <style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>