<!-- 
	##	Author UI : Mahesh		
	## 	Author JAVA : Mahesh
	## 	Date Creation : 16/09/2016
 -->
<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Issue For Melting Heading Add Started -->
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i>&nbsp; Quality Check FG</h1>						 
				</div>
				
				
				<form class="form-horizontal" id="qcFg">
					<div class="mobile-responsive">
						<div class="row">
                            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Vendor</label> 
								<input type="text" class="form-control" placeholder="Vendor Code" id="vendorCode"> 
								<input id="vendorCode-value" type="hidden" name="vendorCode-value">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>GR No. Vendor Wise</label><select  class="form-control" id="grNo" name="grNo">
								<option value="" selected label="Select" /></select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>GR No.</label><input type="text" class="form-control" placeholder="GR No." id="grFgNoS"> 
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label>&nbsp;</label><br/>								
								<button class="btn btn-primary voffset" type="button" name="Search" id="Search"><i class="fa fa-search fa-lg"></i> Search</button>									
							</div>
				  		</div>
						
					</div>
				</form>
				
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>	
					<div id="parameterDetailsGridF" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				
								
				<div class="row" align="center" id="qcFGSection">	
					<button class="btn btn-primary voffset" type="button" name="Save" id="saveQCFG"><i class="fa fa-floppy-o"></i> Save</button>&nbsp;
					<button id="clearAll" class="btn btn-warning voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>			
				</div>
			</div>
		</div>
	</div>
</div>

<!-- QC Parameter Modal Pop-up Started ##########################  -->


<div class="modal fade" id="qcParameter" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; QC Parameter Details
				</h3>
			</div>
			<form class="form-horizontal" id="qcParameterDetailFormFg" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>Sl No</th>
								<th>Code</th>
								<th>Description</th>
								<th>QC-Y/N</th>
								<th>Remarks</th>
							</tr>					
						</thead>
						<tbody id="qcParameterDetailSectionFg"></tbody>
					</table>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button"	data-dismiss="modal" name="saveQcParamDetFg" id="addQcParamDetFg"><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Update</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/qcFG.js"></script>