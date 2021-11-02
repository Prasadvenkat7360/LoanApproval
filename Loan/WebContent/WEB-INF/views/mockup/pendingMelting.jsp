<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA :
	## 	Date Creation : 20/05/2016
 -->
 <script type="text/javascript">
 $("#Search").on('click', function(){
	 	pendingMeltingGrid();
		$("#jqxgrid").show();
		return false;
	});	
	
 </script>

<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Melting Lot Listing</h1>	
					<div class="heading-block-action">
						<a class="btn btn-primary voffset" data-toggle="modal"
							data-target="#ifmModal" type="button"
							href="javascript:void(0);"><i class="fa fa-plus"></i>
							&nbsp;Create </a>	
					</div>							
				</div>
				<!-- Pending Melting Heading Add Ended -->
				
				<!-- Pending Melting Search Started -->
				<form class="form-horizontal" id="pendingMelting">
					<div class="mobile-responsive">
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Date From</label>
								<div class="input-group">
									<input type="text" class="date-picker form-control"	id="orderFromDate" placeholder="DD/MM/YYYY"> 
									<label for="orderFromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Date To</label>
								<div class="input-group">
									<input type="text" class="date-picker form-control"	id="orderToDate" placeholder="DD/MM/YYYY"> 
									<label for="orderToDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Melting Lot No. </label> 
								<input type="text" class="form-control" placeholder="Melting Lot No." id="meltingLotNo">
							</div>							
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Metal Segment</label> <select id="metalSegment"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Status</label> 
								<select id="status" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						</div>						

						<div class="clearfix">&nbsp;</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary voffset" type="button" name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>						
							
						</div>
					</div>
				</form>
				<!-- Pending Melting Search Ended -->
				
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


<!-- Create Issue For Melting Modal Modal Pop-up Started ##########################  -->
<div class="modal fade" id="ifmModal" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Create Issue For Melting
				</h3>
			</div>
			<!-- Modal Create Stone Article Master Body -->
			<div class="modal-body">
				<div class="container sentParcel-Edit">							
					<form class="form-horizontal" id="designRA">
					<div class="mobile-responsive">
						<div class="row">

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Vendor Type</label> <select id="vendorType"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Vendor Code</label> <input type="text" 
									class="form-control" placeholder="Vendor Code"
									id="vendorCode">
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Segment</label> <select id="segment"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>From Location</label> <select id="fromLocation"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						</div>
						<div class="row">							
							
						
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Ref. No.</label> <input type="text" 
									class="form-control" placeholder="Ref. No."
									id="refNo">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Sl. No.</label><input type="text" 
									class="form-control" placeholder="Sl. No."
									id="slNo">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Gross Wt.</label> <input type="text" 
									class="form-control" placeholder="Gross Wt."
									id="grossWt">
							</div>
						</div>
						
						<div class="row">
							
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Net. Wt.</label> <input type="text" 
									class="form-control" placeholder="Net. Wt."
									id="netWt">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Exp. Purity %</label> <input type="text" 
									class="form-control" placeholder="expPurity"
									id="expPurity">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Exp. Pure Wt.</label><input type="text" 
									class="form-control" placeholder="Exp. Pure Wt."
									id="expPureWt">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>To Location</label> <input type="text" 
									class="form-control" placeholder="To Location"
									id="toLocation">
							</div>
						</div>
						<div class="heading-block">&nbsp;</div>
						<div class="row">							
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-field">
								<label>Remarks</label>
								<textarea id="remarks" class="form-control" name="remarks" rows="1" cols="45"></textarea>
							</div>
						</div>					
					
					</div>
				</form>
				</div>
			</div>
			<!-- Modal Edit Stone Article Master Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button"
					name="save" id="save">
					<i class="fa fa-floppy-o fa-lg"></i> Save
				</button>						

				&nbsp;
				<button type="submit" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Create Issue For Melting Modal Modal Pop-up Ended ##########################  -->


<script src="resource/oe/assets/js/app/pendingMelting.js"></script>