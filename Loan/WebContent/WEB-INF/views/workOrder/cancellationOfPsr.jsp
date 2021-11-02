<!-- 
	##	Author UI 		: 	Shreevardhan TL
	## 	API Integration	:  	Shreevardhan TL
	##	Date Creation 	: 	22-09-2017
	## 	Description		:	Cancellation of PSR in work bag detail
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!--  Cancellation Of PSR Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop fa-lg"></i> &nbsp; Cancellation Of PSR
					</h1>
				</div>

				<!-- Cancellation Of PSR Search Started -->
				
				<form class="form-horizontal" id="cancelOfPsr" 	action="javascript: void(0);">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Vendor Code</label>
								<div id="vendorCode"></div>
							</div>
							<div class="col-sm-2">
								<label>Order ID</label><input type="text" class="form-control"
									placeholder="Order ID" id="orderNo" name="orderNo">
							</div>

							<div class="col-sm-2">
								<label>Order Sl No</label><input type="text" class="form-control"
									placeholder="Order Sl No" id="orderItemSlNo" name="orderItemSlNo">
							</div>

							<div class="col-sm-2">
								<label>PSR No</label><input type="text" class="form-control"
									placeholder="PSR No" id="psrNo" name="psrNo">
							</div>
						</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
						</div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started -->
				<div id='jqxwindow'><div id="jqxgrid" style="font-size: 13px; font-family: Verdana;"></div></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>

			</div>
		</div>
	</div>
</div>


<!-- MIV view -->
<div class="modal fade" id="viewMivDetails" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; GIV details - View
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);" id="rtvDetailsViewForm">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="creategrid">
						<div class="col-md-12 form-field">
						    <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;FG Details</h5>
							<div id="viewMivDetGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>	
						    <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;Stone Details</h5>
							<div id="viewMivStoneGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>						
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Accessory Details</h5>
							<div id="viewMivAccGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
						</div>					
					</div>
				</div>
			</form>
			<div class="modal-footer  text-center">			
				<button type="button" class="btn btn-warning btn-sm voffset" data-dismiss="modal">	<i class="fa fa-times"></i>&nbsp;Close</button>
			</div>			
		</div>
	</div>
</div>
<!-- Cancel PSR view-->
<div class="modal fade" id="cancelPsrView" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">

	<div class="modal-dialog modal-lg" style="width:40%;">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-times-circle fa-lg"></i> &nbsp; Cancel PSR - View
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="psrE"  action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<input type="hidden" id="cPsrId"/>
						<div class="col-sm-12">
						<span class="required">*</span>&nbsp;<label>Remarks</label>
						<textarea rows="3" cols="100" id="remarksE" name="remarksE" placeholder="Remarks" class="form-control"></textarea> 
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended -->

				<!-- Modal Create Metal Accounting Location Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="cancelPsrE" name="cancelPsrE"><i class="fa fa-save"></i>&nbsp;Cancel</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Back</button>

				</div>
			</form>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/cancellationOfPsr.js" type="text/javascript"></script>