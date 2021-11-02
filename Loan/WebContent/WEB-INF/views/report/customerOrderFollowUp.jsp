<!-- 
	##	Author1         : 	Raksha
	## 	Author2 	    :   Dipankar
	##  Author [SERVER] :   Shiva Kumar
	##  DOCUMENT		: 	Harshit
	##	Date Creation 	: 	05-04-2017
	## 	Description		:	Search and export functionality for customer order due.
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Order Follow Up-Report

					</h1>
					<div class="heading-block-action"></div>
				</div>
				<form class="form-horizontal" id="CustOrderDue"
					action="javascript: void(0);">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Store Name</label>
								<div id="storeCode" data-validation="required"></div>
							</div>

							<div class="col-sm-2">
								<label>Vendor Code/Name</label>
								<div id="vendorCode"></div>
							</div>

							<div class="col-sm-2">
								<label>Sales Executive</label>
								<div id="salesExecutive"></div>
							</div>

							<div class="col-sm-2">
								<label>Order No</label><input type="text" class="form-control"
									placeholder="Order No" id="orderNo" name="orderNo"> <input
									id="orderNo-value" type="hidden" >
							</div>
							<div class="col-sm-2">
								<label>PSR No</label><input type="text" class="form-control"
									placeholder="PSR No" id="psrNo" name="psrNo"> <input
									id="psrNo-value" type="hidden" >
							</div>

							<div class="col-sm-2">
								<label>Order Status</label>
								<div id="orderStatus"></div>
							</div>



						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clear" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button> 
							&nbsp;
							<button name="export" id="export" type="button" 
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							&nbsp;
							<button name="print" id="printCF" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>
						</div>
				</form>
				<!-- store Master Header Started -->
				<div class="clearfix">&nbsp;</div>

				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>

			</div>
		</div>
	</div>
</div>

<!-- Add Customer Remarks Window Started  -->
<div class="modal fade" id="custOrderRemarks" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%; width:90%">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Remarks</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="customerOrderRemForm"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-md-9 form-field">
							<table class="table table-bordered table-hover" style="border: none;">
							<thead>
								<tr>
									<th>Customer Remarks</th>
								</tr>
							</thead>
							<tbody id="designVariationDetStockJw">
							
							</tbody>
						</table>	
						</div>
						
						<div class="col-md-9 form-field">
							<table class="table table-bordered table-hover" style="border: none;">
							<thead>
								<tr>
									<th>JW Remarks</th>
								</tr>
							</thead>
							<tbody id="designVariationDetStockCu">
							
							</tbody>
						</table>	
						</div>
					</div>

					<!-- Row 2 Started  -->
					
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-warning" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Add Customer Remarks Window Started  -->


<script src="resource/oe/assets/js/app/customerOrderFollowUp.js" type="text/javascript"></script>