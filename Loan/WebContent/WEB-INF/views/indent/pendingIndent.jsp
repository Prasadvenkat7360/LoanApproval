<div class="main-container">
	<div class="container-fluid">		
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12 layout-main">
				<div class="row" style="margin-top: 20px;">
					<div class="col-sm-2">
		               	<select id="bullionSelection" class="form-control">
							<option value="" selected>--Select--</option>
							<option value="bullionPO">Bullion PO</option>
							<option value="bullionReceipt">Bullion Receipt</option>
							<option value="bullionReturn">Bullion Return</option>
						</select>
		        	</div>
		        	
				</div>
				
				<div class="heading-block" >
					<h1>
						<i class="fa fa-desktop"></i> Bullion PO Listing
					</h1>
					<div class="heading-block-action">
						<button onclick="javascript:showContentPage('bullionIndentDistribution', 'bodySwitcher')" class="btn btn-primary btn-sm voffset" type="button" id="indentListing"> <i class="fa fa-plus"></i>&nbsp;Create</button>
					</div>
				</div>

				<form class="form-horizontal">
						<div class="row">
							<div class="col-sm-2">
								<label>From Date </label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="orderFromDate" placeholder="DD/MM/YYYY"> <label
										for="orderFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>To Date </label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="orderToDate" placeholder="DD/MM/YYYY"> <label
										for="orderToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div class="col-sm-2">
								<label>PO No</label>
								 <input type="text" class="form-control" name="status" id="indentNo" placeholder="PO No" /> 
							</div>
							
							<div class="col-sm-2">
                                  <label><span class="required">*</span>Segment</label>
                                 	<select id="metalSegment" class="form-control">
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
							<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>
							<button id="clearIndent" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							<button id="export" class="btn btn-primary btn-sm voffset"	type="button"><i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export</button>
					   </div>
					   
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1"><div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>


<div class="modal fade" id="btnIndentDA" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

        </div>
    </div>
</div>



<script src="resource/oe/assets/js/app/indent.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>