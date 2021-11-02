<!-- 
	##	Author UI       : Raksha
	#   UI  Integration : Dipankar Naha
	##  JAVA            : Nageshwar Rao
	##	Date Creation 	: 19-09-2017 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Purchase Bill Details
					</h1>
				</div>
					<form class="form-horizontal" id="purchaseBillDetailsForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" 
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label></div>
							   	</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" 
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label></div>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Material Type</label> <select id="materialTypeS" name="materialTypeS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<label>Metal Type</label><select id="metalTypeS" name="metalTypeS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<label>Location</label><select id="locS" name="locS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>	    	
								<div class="col-sm-2">
									<label>Store Name</label> <select id="storeIdS" name="storeIdS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
						</div>
						<!-- Row 1 ended  -->
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
							<button name="export" id="export" type="button"
								class="btn btn-primary btn-sm voffset" enabled>
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							<button name="printpbd" id="printpbd" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>
						</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<div class="row">
				<div class="col-md-2">
				<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
		        </div>
				</div>
					<div class="col-md-10">
				     <div style="position: relative; z-index: 1">
						<div id="jqxgridF" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
					 <div style="position: relative; z-index: 1">
						<div id="jqxgridR" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
					<div style="position: relative; z-index: 1">
						<div id="jqxgridS" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
					<div style="position: relative; z-index: 1">
						<div id="jqxgridA" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
					<div class="clearfix">&nbsp;</div>
					
				<div class="clearfix">&nbsp;</div>
			
				</div></div>
				<div class="clearfix">&nbsp;</div>	
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="viewStoneAccDetModal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style="width:95%;">
		<div class="modal-content">			
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-eye fa-sm"></i> &nbsp; FG Stone and Accessory View
				</h3>
			</div>
			<form class="form-horizontal" id="dcDetailsEdit" action="javascript: void(0)">
				<div class="col-md-12">
					<div class="clearfix">&nbsp;</div>
					 <div class="row">
					    <div class="col-md-12">
							<div style="position: relative; z-index: 1"><div id="pbFgStoneGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
							<div class="clearfix">&nbsp;</div>
							<div style="position: relative; z-index: 1"><div id="pbFgAccGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
						</div>
					</div>			
				</div>
			
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">				
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal" id="cancel">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/purchaseBillDetails.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>