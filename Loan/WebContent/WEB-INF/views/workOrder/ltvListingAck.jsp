<!--  
*** AUTH : Dipankar
*** JAVA : Divya
*** DESC :  LTV Acknowledgement
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Location Transfer Acknowledgement DC (Zone to Zone) 
					</h1>
				</div>
				<form class="form-horizontal" id="ltvHeaderSection">
						<div class="row">
							<div  class="col-sm-2">
								<span class="required">*</span><label>LTV Type</label>
								<select id="ltvType" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>		
							<div  class="col-sm-2">
								<span class="required">*</span><label>Action</label>
								<select id="action" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							<div  class="col-sm-2">
								<label>&nbsp;</label><br/>
								<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="applyTA"><i class="fa fa-check fa-lg"></i> Apply</button>&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="cancelTA"><i class="fa fa-times fa-lg"></i> Cancel</button>
							</div>							
						</div>
				</form>
				
				
				
				<form class="form-horizontal" id="ltvMainSection">
					<div class="heading-block"><h1>&nbsp;</h1></div>
						<div class="row">
							<div  class="col-sm-2">
								<span class="required">*</span><label>Date From</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground" id="orderFromDate" placeholder="DD/MM/YYYY">
									<label for="orderFromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div  class="col-sm-2">
                               <span class="required">*</span><label>Date To</label>
                               <div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground" id="orderToDate" placeholder="DD/MM/YYYY"> 
									<label for="orderToDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>                             
                           	</div>

							<div  class="col-sm-2">
								<label>DC</label>
                                <input type="text" class="form-control" disabled id="dcName" name="dcName"  placeholder="Store/DC">
                                <input type="hidden" class="form-control" disabled id="dcId" name="dcName">
							</div>

							<div  class="col-sm-2">
								<label>From Zone</label>
								<select id="fromZone" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div  class="col-sm-2">
								<label>To Zone</label>
								<select id="toZone" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>LTV No.</label>
								 <input type="text" class="form-control" name="ltvNo" placeholder="LTV No." id="ltvNo" />
							</div>
						</div>


						<div class="row">
							
							
							<div class="col-sm-2">
								<label>Ref. Type</label>
								<select id="refType" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>Ref. Doc. No.</label>
								<input type="text" class="form-control" name="refDocNo" placeholder="Ref. Doc. No." id="refDocNo" />
							</div>

							<div class="col-sm-2">
								<label>Sent Through</label>
								<input type="text" class="form-control" name="sentThrough" placeholder="Sent Through" id="sentThrough" />
							</div>
						
							<div class="col-sm-2" id="statusSection">
								<label>Status</label>
								<select id="status" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
								
						</div>
						
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="searchTA" id="searchTA"><i class="fa fa-search fa-lg"></i> Search</button>
							&nbsp;
							<button id="clearTV" class="btn btn-warning  btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" name="saveAckTA" id="saveAckTA"><i class="fa fa-floppy-o"></i> Save/Acknowledge</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" name="exportTA" id="exportTA"><i class="fa fa-file-excel-o"></i> Export</button>
						</div>
				</form>			
				
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="editLtAGridRow" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa fa-eye fa-md"></i> &nbsp; View Items
				</h3>
			</div>
			
			
			<div class="col-md-12 mobile-responsive">
				<div class="clearfix">&nbsp;</div>				
				<div class="row">
					<div class="col-md-12 form-field">
						<div id="viewLTAItemsGrid"
							style="font-size: 13px; font-family: Verdana; position: relative;"></div>
					</div>						
				</div>
			</div>
		
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">				
				<button type="button" class="btn btn-warning btn-sm voffset" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;close</button>
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/ltvListingAck.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>