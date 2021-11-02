<!-- 
	##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Shreevardhan T L 
	##	Date Creation 	: 	05-09-2017
	## 	Description		:	Create, Search and Export Functionality
 -->
 
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Provisional To Actual Search
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm voffset" type="button" id="rtvCreate"
							onclick="javascript:showContentPage('provisionalCreate', 'bodySwitcher')">
							<i class="fa fa-plus"></i>&nbsp;Create
						</button>
					</div>
				</div>
				
				<form class="form-horizontal" id="provToActual">
					<div class="mobile-responsive">
						<div class="row">
							<div class="col-sm-2">
							<span class="required">*</span>	<label>Date From</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="orderFromDateS" placeholder="DD/MM/YYYY"> <label
										for="orderFromDateS" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>	<label>Date To</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="orderToDateS" placeholder="DD/MM/YYYY"> <label
										for="orderToDateS" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<label>Segment</label> <select id="metalSegmentS"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Vendor</label> <input type="text" class="form-control"
									placeholder="Vendor Code" id="vendorCodeS">
									<input id="vendorCode-value" type="hidden" name="code">
								<!-- <select id="vendor"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select> -->
								<!-- 								
								<input id="vendorCode" class="form-control" type="date-picker  text" placeholder="Vendor Code">
								<input id="vendorCode-value" type="hidden" name="code">	 -->
							</div>
							<div class="col-sm-2">
								<label>GR No.</label> <input type="number" class="form-control"
									id="grNoS" placeholder="Goods Receipt No">
							</div>
							<div class="col-sm-2">
								<label>PSR No.</label> <input type="number" class="form-control"
									id="psrNoS" placeholder="PSR No">
							</div>
						</div>
						<!-- <div class="row">
							<div class="col-sm-2">
								<label>PSR No.</label> <input type="number" class="form-control"
									id="psrNoS" placeholder="PSR No">
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>	<label>Status</label> <select  class="form-control"
									id="statusS" >
									<option value="" selected label="--Select--" />
									<option value="A">Provisional</option>
									<option value="R">Provisional to Actual</option>
									</select>
							</div>
						</div>
 -->
                       <div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportS" id="exportS" >
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
							&nbsp;
							<button name="printMR" id="printMR" type="button"
								class="btn btn-primary btn-sm voffset" disabled>
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>
						</div>
					</div>
				</form>
				<!-- Issue For Melting  Ended -->
				<div class="clearfix">&nbsp;</div>
				
<!-- ######################################################################################################## -->

<form action="#" method="post" name="createVendor" id="createVendor">
	<div id="tabGrDet" class="tabmelting row">
		<div class="panel with-nav-tabs panel-primary">
			<div class="panel-heading">
				<ul class="nav nav-tabs">
					<li id="grPanelDetails" class="active"><a data-toggle="tab"
						href="#grDetails"><i class="fa fa-user fa-lg"></i>&nbsp;GR Details</a></li>
					<li id="tabPanelStone"><a data-toggle="tab"
						href="#tabStone"><i class="fa fa-filter fa-lg"></i>&nbsp;Stones</a></li>
					<li id="tabPanelAccessories"><a data-toggle="tab"
						href="#tabAccessories"><i class="fa fa-filter fa-lg"></i>&nbsp;Accessories</a></li>
				</ul>
			</div>
			<div class="panel-body panel-body-fixed-height">
				<div class="tab-content">
					<!--  Tab 1 Started  -->
					<div id="grDetails" class="tab-pane fade in active">
					
						<div class="heading-block">								
						<h4>GR Details</h4>								
						<!-- <div class="heading-block-action">						
							<button type="button" class="btn btn-primary pull-right" id="saveGRDetails"><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save</button>&nbsp;
						</div> -->
					</div>
						<div class="row">
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" class="tabjqgrid"
									style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
						
					</div>
					<!--  Tab 2 Started  -->
					<div id="tabStone" class="tab-pane fade in">
						<div class="heading-block">
							<h4>Stones</h4>
							<!-- <div class="heading-block-action">						
								<button  type="button" class="btn btn-primary pull-right" id="saveGRSt"><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save</button>&nbsp;
							</div> -->
						</div>
						<div class="row">
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" class="tabjqgrid"
									style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
					</div>
					<!--  Tab 3 Started  -->
					<div id="tabAccessories" class="tab-pane fade in">
						<div class="heading-block">
							<h4>Accessories</h4>
							<!-- <div class="heading-block-action">						
								<button  type="button" class="btn btn-primary pull-right" id="saveGRAcc"><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save</button>&nbsp;
							</div> -->
						</div>
						<div class="row">
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" class="tabjqgrid"
									style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<div class="clearfix">&nbsp;</div>
</div>
</div>
</div>
</div>

<div class="modal fade" id="designViewGR" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
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
<script src="resource/oe/assets/js/app/grFGProvisional.js"></script>
<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>