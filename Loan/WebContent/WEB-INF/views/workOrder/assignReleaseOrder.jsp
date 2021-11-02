<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Assign Vendors & Release Orders
					</h1>
				</div>

				<form class="form-horizontal" action="javascript: void(0)">
						<div class="row">
							<div class="col-sm-2">
								<label>Store Code </label> <input type="text"
									class="form-control" name="storeCodes" placeholder="Store Code"
									id="storeCodes" /> <input id="storeCodes-value" type="hidden"
									name="code">
							</div>

							<div class="col-sm-2">
								<label>Order No.</label> <input type="text" class="form-control"
									name="orderNo" placeholder="Order No." id="orderNo" />
							</div>

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Order Type</label>
								<div id="orderTypeCon"></div>
							</div>

							
							<div class="col-sm-2">
								<label>Vendor</label><input type="text" class="form-control"
									placeholder="Vendor" id="vendorsCon" name="vendorsCon"> <input
									id="vendorsCon-value" type="hidden">
							</div>
							<div class="col-sm-2">
								<label>Segment </label>
								<div id="segmentsCon"></div>
							</div>

							<div class="col-sm-2">
								<label>Order Kind </label>
								<div id="orderKindsCon"></div>
							</div>
						</div>


						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="removeAllRelease" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="submit" name="Save"
								id="Save">
								<i class="fa fa-floppy-o fa-lg"></i> Save
							</button>
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
<div class="modal fade" id="designViewOrder" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Design View</h3>				
			</div>
			<div class="modal-body" align="center" id="content">
				<div id="page-content"> </div>
		            <div class="text-center">
		            <ul id="pagination-demo" class="pagination-sm sync-pagination"></ul>
		            </div>
			</div>
			    
        </div>
    </div>
</div> 
<script src="resource/oe/assets/js/app/assignReleaseOrder.js"></script>