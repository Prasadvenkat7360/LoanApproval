<!-- 
	##	Author UI           : 	Dipankar
	## 	Author JAVA 	    :   Venkat
	##	Date Creation 	    : 	18-05-2018
	## 	Description		    :	Design Order
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp;FAS Listing
						</h1>
						<div class="heading-block-action"></div>
					</div>
					<form class="form-horizontal" id="designOrder"	action="javascript: void(0);">
							<div class="row">
								<div class="col-sm-2">
									<label>From Date</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"	id="fromDate" name="fromDate" placeholder="DD/MM/YYYY">
										<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
	
								<div class="col-sm-2">
									<label>To Date</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"	id="toDate" name="toDate" placeholder="DD/MM/YYYY"> 
										<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
								<div class="col-sm-2">
									<label>Ref. Doc. No.</label>
									<input type="text" class="form-control" placeholder="Ref. Doc. No." id="refDocNo" name="refDocNo">
								</div>	
								<div class="col-sm-2">
									<label>Ref. Doc. Type</label>
									<select id="refDocTypeS" class="form-control"><option value="" selected label="Select" /></select>
								</div>			
								<div class="col-sm-2">
									<label>Status</label>
									<select id="status" class="form-control"><option value="" selected label="Select" /></select>
								</div>								
							</div>
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button" name="searchFas" id="searchFas"><i class="fa fa-search fa-lg"></i> Search</button>&nbsp;							
								<button id="clear" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							</div>
					</form>
				
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; z-index: 1; margin-top:5px; position: relative; width: 100%;"></div>
				
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="fasViewXML" data-keyboard="false"	data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:95%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-pencil-square-o"></i> &nbsp; <label>View XML</label></h3>
			</div>
			<form class="form-horizontal" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<h3>Header XML</h3>
					<textarea disabled style="width:100%; min-height: 120px;  overflow-y: scroll;" id="viewXML1"></textarea>
					<div class="clearfix">&nbsp;</div>	
					<h3>Detail XML</h3>
					<textarea disabled style="width:100%; min-height: 120px;  overflow-y: scroll;" id="viewXML2"></textarea>
					<div class="clearfix">&nbsp;</div>	
					<h3>Settlement XML</h3>
					<textarea disabled style="width:100%; min-height: 120px;  overflow-y: scroll;" id="viewXML3"></textarea>	
					<div class="clearfix">&nbsp;</div>
				</div>
				<div class="modal-footer  text-center">					
					<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times"></i>&nbsp;Close</button>
				</div>
			</form>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/fas.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>