<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12 layout-main">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Renumbering GR FG</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" id="create" type="button" name="create"><i class="fa fa-plus"></i>&nbsp;Create </button>
						<button class="btn btn-primary btn-sm" id="back" type="button" name="back"><i class="fa fa-arrow-left"></i>&nbsp;Back </button>
					</div>
				</div>
				
				<div id="searchGrFgForm">
					<form class="form-horizontal" id="grFgForm1">
						<div class="mobile-responsive">
							<div class="row">			
								<div class="col-sm-2">
									<span class="required"></span><label></label> 
									<select	id="optionType" class="form-control">
										<option value="" selected>--Select Option--</option>
										<option value="S">Search</option>
										<option value="C">Create</option>
									</select>
								</div>
								
								<div class="col-sm-2" id="refTypeSec">
									<span class="required" id="refTypeStar">*</span><label>Ref Type :</label> 
									<select	id="refType" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>														
								
								<div class="col-sm-2" id="refNoSec">
									<span class="required" id="refNoStar">*</span><label>Ref. No.</label> 
									<input type="number" class="form-control" placeholder="Ref. No." name="refNo" id="refNo" />
									<select	id="refNoS" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>	
								
								<div class="col-sm-2" id="refSlNoSec">
									<span class="required" id="refSlNoStar">*</span><label>Ref. Sl. No.</label> 
									<select	id="refSlNo" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>
								
								<div class="col-sm-2"  id="igrNoSec">
									<label>IGR No.</label> 
									<select	id="igrNo" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>							
								
								<div class="col-sm-2" id="vendorSec">
									<span class="required" id="vendorStar">*</span><label>Vendor</label> 
									<!-- <input id="vendorCode" class="form-control" type="text" placeholder="Vendor Name" autofocus> 
									<input id="vendorCode-value" type="hidden" name="code">
									 -->
									<select	id="vendorCode" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div>
								
								<div class="col-sm-2" id="fromDateSec">
									<span class="required">*</span><label>From Date </label>
									<div class="input-group">
										<input type="text" class="date-picker form-control dateBackground"
											id="fromDate" placeholder="DD/MM/YYYY"> <label
											for="fromDate" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>
	
								
							</div>	
							
							<div class="row">
								<div class="col-sm-2" id="toDateSec">
									<span class="required">*</span><label>To Date </label>
									<div class="input-group">
										<input type="text" class="date-picker form-control dateBackground"
											id="toDate" placeholder="DD/MM/YYYY"> <label
											for="toDate" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>	
								<!-- <div class="col-sm-2" id="metalSegSec">
									<label>Metal Segment</label> 
									<select	id="metalSeg" class="form-control"><option value="" selected>--Select Option--</option></select>
								</div> -->
							</div>	
							<div class="clearfix">&nbsp;</div>
							<div class="row" align="center" id="searchSec">								
								<button class="btn btn-primary btn-sm voffset" type="button"  name="search" id="search"><i class="fa fa-search fa-lg"></i>Search</button>&nbsp;
								<button id="clearGR" class="btn btn-warning btn-sm voffset" type="button"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"  name="export" id="export"><i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export</button>
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
					<input id="vendorCodeC" type="hidden" name="code">	
					<input type="hidden" class="form-control"	name="skinPurityRate" id="skinPurityRate" disabled>	
					
					<input type="hidden" class="form-control"	name="skinPurity" id="skinPurity" disabled>
					<input type="hidden" class="form-control"	name="metalSegment" id="metalSegment" disabled>
					<input type="hidden" class="form-control"	name="meltingPurity" id="meltingPurity" disabled>
					<input type="hidden" name="metalSegmentId" id="metalSegmentId">
			        <div  id="grDetailsId" style="position: relative; z-index: 1; display: none">
						<div id="grDetailsGrid"></div><br/><div id="stoneDetailsGrid"></div><br/><div id="accDetailsGrid"></div>
				   	</div>
					
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button" name="saveRenumberGRFG" id="saveRenumberGRFG"><i class="fa fa-floppy-o"></i> Save</button>&nbsp;
						<button id="clearGRS" class="btn btn-warning btn-sm voffset" type="button"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>&nbsp; 
						<a href="javascript:showContentPage('renumberingGRFG', 'bodySwitcher')" class="btn btn-primary btn-sm voffset" type="button" id="grListing"><i class="fa fa-list"></i>&nbsp;Back</a>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>

<!-- Article code pop up -->
<div class="modal fade" id="articleSearch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<!-- Stone Search pop up -->
<div class="modal fade" id="stoneSearch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>
<!-- Accessory Search pop up -->
<div class="modal fade" id="accSearch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>
<!-- Attribute Search pop up -->
<div class="modal fade" id="attributeSearch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>
<!-- Attribute Search pop up -->
<div class="modal fade" id="viewRenumberingGR" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="reset" id="closeSearch" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-pencil-square-o"></i> &nbsp; Stone/Accessory Details</h3>
			</div>
			<!-- Modal Body -->
			<div class="modal-body">
				<div class="container">
					<div class="modal-body">
						<div class="row">
							<div  style="position: relative; z-index: 1;">
								<div id="stoneSearchGrid"></div><br/><div id="accSearchGrid"></div>
						   	</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-warning btn-sm voffset" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src='resource/oe/assets/js/app/renumberingGRFG.js'></script>