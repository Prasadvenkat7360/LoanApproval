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
					<h1><i class="fa fa-desktop"></i> Transit Listing - Acknowledgement from DC</h1>
				</div>
				<form class="form-horizontal" id="transitHeaderSection">
					<div class="row">
						<div  class="col-sm-2">
							<span class="required">*</span><label>Transit Type</label>
							<select id="transitType" class="form-control"><option value="" selected label="--Select--" /></select>
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
				
				
				
				<form class="form-horizontal" id="transitMainSection">
					<div class="heading-block"><h1>&nbsp;</h1></div>
						<div class="row">
							<div  class="col-sm-2">
								<span class="required">*</span><label>Date From</label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control  dateBackground" id="orderFromDate" placeholder="DD/MM/YYYY">
									<label for="orderFromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div  class="col-sm-2">
                               <span class="required">*</span><label>Date To</label>
                               <div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground" id="orderToDate" placeholder="DD/MM/YYYY"> 
									<label for="orderToDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>                             
                           	</div>

							<div  class="col-sm-2">
								<label>Transit No.</label>
                                <input type="text" class="form-control" id="transitNo" name="transitNo"  placeholder="Store/DC">
							</div>

							<div  class="col-sm-2">
								<label id="storeOrDcType"></label>
								<select id="toFromStoreDC" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div  class="col-sm-2">
								<label id="storeOrDcName"></label>
								<select id="toFromStoreDCName" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-sm-2">
								<label id="zoneTypeLabel"></label>
								<select id="toFromZoneType" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
						</div>


						<div class="row">
							
							
							<div class="col-sm-2">
								<label id="zoneNameLabel"></label>
								<select id="toFromZone" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>Ref. Doc. Type</label>
								<select id="refDocType" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>Ref. Doc. No.</label>
								<input type="text" class="form-control" name="refDocNo" placeholder="Ref. Doc. No." id="refDocNo" />
							</div>
							
							<div class="col-sm-2">
								<label>Material Type</label>
								<select id="materialType" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>Segment</label>
								<select id="segment" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>Jewel Type</label>
								<select id="jewelType" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-sm-2">
								<label>Location</label>
								<select id="location" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
						
							<div class="col-sm-2" id="statusSection">
								<label>Status</label>
								<select id="status" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
								
						</div>
						
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="searchTA" id="searchTA"><i class="fa fa-search fa-lg"></i> Search</button>
							&nbsp;
							<button id="clearTV" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" name="saveAckTA" id="saveAckTA"><i class="fa fa-floppy-o"></i> Save/Acknowledge</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" name="exportTA" id="exportTA"><i class="fa fa-file-excel-o"></i> Export</button>
						</div>
				</form>			
				
				<div class="clearfix">&nbsp;</div>
				<div id='jqxwindow'><div id="jqxgrid" style="font-size: 13px; font-family: Verdana;position:relative; z-index:1"></div></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/transitVoucherAck.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>