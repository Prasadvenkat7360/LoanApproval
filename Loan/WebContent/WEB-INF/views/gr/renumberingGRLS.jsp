<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12 layout-main">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Renumbering GR LS</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" id="create" type="button" name="create"><i class="fa fa-plus"></i>&nbsp;Create </button>
						<button class="btn btn-primary btn-sm" id="back" type="button" name="back"><i class="fa fa-arrow-left"></i>&nbsp;Back </button>
					</div>
				</div>
				
				<div id="searchGrFgForm">
					<form class="form-horizontal" id="grFgForm1">
						<div class="mobile-responsive">
							<div class="row">
								<div class="col-sm-2" id="fromDateSec">
									<span class="required">*</span><label>From Date </label>
									<div class="input-group">
										<input type="text" class="date-picker form-control dateBackground"	id="fromDate" placeholder="DD/MM/YYYY"> 
										<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
								
								<div class="col-sm-2" id="fromDateSec">
									<span class="required">*</span><label>To Date </label>
									<div class="input-group">
										<input type="text" class="date-picker form-control dateBackground"	id="toDate" placeholder="DD/MM/YYYY"> 
										<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
								
								<div class="col-sm-2" id="refTypeSec">
									<label>Ref Type :</label> 
									<select	id="refTypeS" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>	
								
								<div class="col-sm-2" id="refNoSec">
									<label>Ref No.</label> 
									<select	id="refSlNoS" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>
								
								<div class="col-sm-2">
									<label>Segment</label> 
									<select	id="segmentS" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>
								
								<div class="col-sm-2" id="refTypeSec">
									<label>Category :</label> 
									<select	id="categoryS" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>	
								
								<div class="col-sm-2"  id="igrNoSec">
									<label>IGR No.</label> 
									<!-- <select	id="igrNoS" class="form-control"><option value="" selected>--Select Option--</option></select>
									 -->
									<input type="number" class="form-control" placeholder="IGR NO." name="igrNoS" id="igrNoS" />
								</div>													
								
								<!-- <div class="col-sm-2" id="refNoSec">
									<label>Ref. No.</label> 
									<input type="number" class="form-control" placeholder="Ref. No." name="refNoS" id="refNoS" />
								</div-->
							</div>	
							
							
							<div class="clearfix">&nbsp;</div>
							<div class="row" align="center" id="searchSec">								
								<button class="btn btn-primary btn-sm voffset" type="button"  name="search" id="search"><i class="fa fa-search fa-lg"></i>Search</button>&nbsp;
								<button id="clear" class="btn btn-warning btn-sm voffset" type="button"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
								<button class="btn btn-primary btn-sm voffset" type="button"  name="export" id="export"><i class="fa fa-search fa-lg"></i>Export</button>&nbsp;
								<button class="btn btn-primary btn-sm" type="button" id="print"><i class="fa fa-print fa-lg"></i> Print</button>
							</div>				
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>					
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgrid"	style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
				
		        <div id="createGrFgForm">     
					<form class="form-horizontal" id="grFgForm1">
						<div class="mobile-responsive">
							<div class="row">
								<div class="col-sm-2" id="refTypeSec">
									<label>Ref Type :</label> 
									<select	id="refType" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>	
								
								<div class="col-sm-2" id="refNoSec">
									<label>Ref. No.</label> 
									<input type="number" class="form-control" placeholder="Ref. No." name="refNo" id="refNo" />
								</div>
								
								<div class="col-sm-2" id="refNoSec">
									<label>Ref. Sl. No.</label> 
									<select	id="refSlNo" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>
								
								<div class="col-sm-2">
									<label>Vendor Code</label> 
									<select	id="vendorCode" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>
								<div class="col-sm-4" id="refNoSec">
									<br />
									<button class="btn btn-primary btn-sm voffset" type="button"  name="addGr" id="addGr"><i class="fa fa-plus fa-lg"></i></button>&nbsp;
									<button id="clearCreateGR" class="btn btn-warning btn-sm voffset" type="button"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
								</div>
							</div>	
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>					
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridCreate"	style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1"></div>
						</div>
					</div>
					
					<div class="row" align="center" id="searchSec">								
						<button class="btn btn-primary btn-sm voffset" type="button"  name="save" id="save"><i class="fa fa-search fa-lg"></i>Save</button>&nbsp;
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>


<div class="modal fade" id="certDetails" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="reset" id="closeSearch" class="close"	data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-pencil-square-o"></i> &nbsp; Diamond Certificate</h3>
			</div>
				<!-- Modal Body -->
			<div class="modal-body">
				<div class="container">
					<form class="form-horizontal" autocomplete="off" role="form" name="certDetailsForm" id="certDetailsForm" onsubmit="return false;">
						<div class="modal-body">
							
							<div class="row">
								<div class="col-md-12">
									<table id="myTableId" class="table table-bordered table-hover">
										<thead>
											<tr>
												<th>Stone Srl. No.</th>
												<th>Certificate Lab Number</th>
												<th>Stone Wt.</th>
												<th width="5%">Is Used</th>
												<th width="5%">Is Return</th>
											</tr>
										</thead>
										
										<tbody id="certDetailsSec"></tbody>
									</table>
									
								</div>
							</div>
						</div>
						<div class="modal-footer text-center">
							<button type="submit" id="selectStone" class="btn btn-primary"
								data-dismiss="modal">
								<i class="fa fa-check fa-lg"></i>&nbsp;Select
							</button>
							<button type="button" id="clear" class="btn btn-warning"  data-dismiss="modal">
								<i class="fa fa-times"></i>&nbsp;Cancel
							</button>
						</div>
					</form>
				</div>
				<!-- Modal Window Form End -->
			</div>
		</div>
	</div>
</div>

<!-- Stone Search pop up -->
<div class="modal fade" id="stoneSearch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>
<script type="text/javascript" src='resource/oe/assets/js/app/renumberingGRLS.js'></script>