<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Metal Account Heading  Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Diamond Solitaire Query 
					</h1>
				</div>
				<!-- Metal Account Heading  Ended -->

				<!-- Metal Account Search Started -->
				<form class="form-horizontal" id="diamondSolitaireyQueryForm" action="javascript:void(0);">
					<div class="mobile-responsive">
						<div class="row">	
							<div class="col-sm-2">
								<label>From Date :</label>
								<div class="input-group">
									<input type="text" class="date-picker form-control"	id="fromDate" placeholder="DD/MM/YYYY"> <label	for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<label>To Date :</label>
								<div class="input-group">
									<input type="text" class="date-picker form-control"	id="toDate" placeholder="DD/MM/YYYY"> <label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>													
							<div class="col-sm-2">
								<label>DC/Store :</label> 
								<select id="dcStore" class="form-control"><option value="" label="--Select--"/></select>
							</div>
							<div class="col-sm-2">
								<label>DC/Store Name :</label> 
								<select id="dcStoreName" class="form-control"><option value="" label="--Select--"/></select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span><label>FG/Loose Solitaire :</label> 
								<select id="fgLooseSolitaire" name="fgLooseSolitaire" class="form-control"><option value="" label="--Select--"/></select>
							</div>						
							<div class="col-sm-2">
								<label>Comp Cert. No :</label> 
								<input type="text" class="form-control" placeholder="Comp Cert. No." id="compCertNo">
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Lab Code :</label> 
								<select id="labCode" class="form-control"><option value="" label="--Select--"/></select>
							</div>
							<!-- <div class="col-sm-2">
								<label>Lab Cert. No.</label> 
								<input type="text" class="form-control" placeholder="Lab Cert. No." id="labCertNo">
							</div> -->
							<div class="col-sm-2">
								<label>Ref Type :</label> 
								<select id="refType" class="form-control"><option value="" label="--Select--"/></select>
							</div>
							<div class="col-sm-2">
								<label>Ref No :</label> 
								<input type="text" class="form-control" placeholder="Ref. No." id="refNo">
							</div>
							<!-- <div class="col-sm-2">
								<label>Stock No.</label> 
								<input type="text" class="form-control" placeholder="Stock No." id="stockNo">
							</div> -->
							<div class="col-sm-2">
								<label>Shape :</label> 
								<select id="shape" class="form-control"><option value="" label="--Select--"/></select>
							</div>
							
							<div class="col-sm-2">
								<label>Color :</label> 
								<select id="color" class="form-control"><option value="" label="--Select--"/></select>
							</div>
							
							<div class="col-sm-2">
								<label>Clarity :</label> 
								<select id="clarity" class="form-control"><option value="" label="--Select--"/></select>
							</div>
							
						</div>
						<div class="row">
							
							<div class="col-sm-2">
								<label>Cut :</label> 
								<select id="cut" class="form-control"><option value="" label="--Select--"/></select>
							</div>
							<div class="col-sm-2">
								<label>Weight Range :</label> 
								<div id="weightRange"></div>
							</div>
							<div class="col-sm-2">
								<label>From Price :</label> 
								<select id="fromPrice" class="form-control"><option value="" label="--Select--"/></select>
							</div>
							<div class="col-sm-2">
								<label>To Price :</label> 
								<select id="toPrice" class="form-control"><option value="" label="--Select--"/></select>
							</div>
							
						</div>
						<!-- <div class="row">
							
							<div class="col-sm-2">
								<label>Status</label> 
								<select id="status" class="form-control"><option value="" label="--Select--"/></select>
							</div>
						</div> -->
						<div class="row voffset2" align="center">
							<button class="btn btn-primary voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>&nbsp;
							<button type="reset" id="clear"	class="btn btn-warning voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>&nbsp;
							<button class="btn btn-primary voffset" type="button" name="export" id="export"><i class="fa fa-file-excel-o fa-lg"></i> Export</button>&nbsp;
						</div>
					</div>
				</form>
				<!-- Metal Account Search Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1"><div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="viewDiamondSolitaireForm" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Diamond Solitaire Query - View</h3>				
			</div>
			<div class="modal-body" align="center" id="content">
				
				<div id="page-content"> </div>
		            <div class="text-center">
		            <ul id="pagination-demo" class="pagination-sm sync-pagination"></ul>
		            </div>
			</div>
		  	<div class="modal-footer text-center">
		  		<button type="button" class="btn btn-primary"><i class="fa fa-print fa-lg"></i>&nbsp; Print</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
			</div>  
        </div>
    </div>
</div>
<script src="resource/oe/assets/js/app/diamondSolitaireQuery.js"></script>