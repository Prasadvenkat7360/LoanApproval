<!-- 
	##	Author UI           : 	Dipankar
	## 	Author JAVA 	    :   Nagesh
	##	Date Creation 	    : 	03-08-2017
	## 	Description		    :	Design Order
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp;Design Approval
					</h1>
					<div class="heading-block-action"></div>
				</div>
				<form class="form-horizontal" id="designApproval"	action="javascript: void(0);">
						<div class="row">
							<div class="col-sm-2">
								<label>Order No.</label>
								<input type="text" class="form-control"	placeholder="Order No." id="orderNo" name="orderNo">
							</div>	
							<div class="col-sm-2">
								<label>Order Sl. No.</label>
								<input type="text" class="form-control"	placeholder="Order Sl. No." id="orderSlNo" name="orderSlNo">
							</div>							
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="searchDA" id="searchDA"><i class="fa fa-search fa-lg"></i> Search</button>
							&nbsp;
							<button id="clear" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
						</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">	
					<div id="jqxgrid" style="font-size: 12px; font-family: Verdana; float: left;"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Design Approval Modal pop-up  -->
<div class="modal fade" id="approveDesignApproval" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">


	<div class="modal-dialog modal-md">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Design Approval by Inventory Person</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="designDetailsEditForm" action="javascript:void();">
				<div class="mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="col-md-12">	
						<table class="table table-bordered table-hover">
							<thead>
								<tr>
									<th>Sl. No.</th>
									<th>Design Approval</th>
									<th>Design View</th>
									<th>File Name</th>
								</tr>
							</thead>
							<tbody id="designVariationDet">
							
							</tbody>
						</table>			
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="col-md-12 form-field">
						<span class="required">* </span> <label>Action</label> 
						<select	id="designAction" name="designAction" class="form-control"><option value="" selected label="--Select--" /></select>
					</div>	
					
					<div class="col-md-12 form-field">
						<label>Feedback</label>
						<textarea rows="3" cols="50" id="designAFeedback" name="designAFeedback" placeholder="Feedback" class="form-control"></textarea>
					</div>	
				</div>
				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create Company Master  Footer -->
				<div class="modal-footer  text-center">
					<button class="btn btn-primary btn-sm voffset" type="button" name="confirmApproveDesign" id="confirmApproveDesign"><i class="fa fa-check fa-lg"></i> &nbsp;Confirm</button>
					<button type="button" class="btn btn-warning btn-sm voffset" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/designApproval.js" type="text/javascript"></script>