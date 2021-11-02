<!-- 
	##	Author UI       : 	Raksha
	## 	API Integration :   Dipankar Naha
	##  JAVA            :   Nageshwar Rao
	##	Date Creation 	: 	01-08-2017
	## 	Description		:	Cost to be Borne by functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Cost to be Borne by
					</h1>
				</div>
					<form class="form-horizontal" id="costToBeBorneByForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Cost Borne By From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="cbbFromDateS" id="cbbFromDateS" placeholder="DD/MM/YYYY">
										<label for="cbbFromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
							   
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Cost Borne By To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"name="cbbToDateS" id="cbbToDateS" placeholder="DD/MM/YYYY">
										<label for="cbbToDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Status</label><select id="cbbStatusS" name="cbbStatusS" class="form-control">
										<option value="" selected label="Select" />
										<!-- <option value="1">Pending</option>
										<option value="0">Completed</option> --></select>
								</div>
								
								<div class="col-sm-2">
									<label>Vendor Code/Name</label> <input type="text" class="form-control" placeholder="Vendor Code" id="vendorCodeS" name="vendorCodeS"> 
									<input id="vendorCode-value" type="hidden" name="code">
								</div>
								
								<div class="col-sm-2">
									<label>Segment</label> <select id="segS" name="segS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								
								<div class="col-sm-2">
									<label>IGR No</label> <select id="grNoS" name="grNoS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
						</div>
						<!-- Row 1 ended  -->
						<!-- Row 2 Started  -->
						<div class="row">
								<div class="col-sm-2">
									<label>IGR Sl. No</label> <select id="grSlNoS" name="grSlNoS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
							<div class="col-sm-2">
								<label>PSR No</label> <select id="psrNoS" name="psrNoS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Order No</label> <select id="orderNoS" name="orderNoS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>Order Sl. No</label> <select id="orderSlNoS" name="orderSlNoS" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-sm-2">
								<label>DC</label><input type="text" class="form-control" placeholder="DC Name" id="dcS" name="dcS" disabled>
								<input type="hidden" class="form-control" placeholder="DC Name" id="dcSId" name="dcSId" disabled>
						    </div>
						</div>
						<!-- Row 2 Ended  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="cbbSearch" id="cbbSearch">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
							<button name="cbbExport" id="cbbExport" type="button"
								class="btn btn-primary btn-sm voffset" disabled>
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							<button type="button" class="btn btn-primary btn-sm" id="saveCbbDet" name="saveCbbDet">
							<i class="fa fa-save"></i>&nbsp;Save</button>
							<button name="cbbPrint" id="cbbPrint" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>
						</div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for search-->
					<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/costBorneBy.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>