<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	22-12-2017 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Bullion Return Listing
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button" id="goBack"
							href="javascript:showContentPage('pendingIndents', 'bodySwitcher')">
							<i class="fa fa-arrow-left"></i>&nbsp;Go Back
						</a>
					</div>
				</div>
					<form class="form-horizontal" id="raiseTvForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
							<div class="col-sm-2">
									<label>Segment</label><select id="metalSegS" name="metalSegS" class="form-control">
										<option value="" selected label="Select" />
										</select>
							</div>
							 <div class="col-sm-2">
								<label>GIV No</label><input type="text" class="form-control" placeholder="GIV No" id="mivNo" name="mivNo">
						      </div>
								<div class="col-sm-2">
									<label>Start Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<label>End Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								 <div class="col-sm-2">
									<label>GRV No</label><input type="text" class="form-control" placeholder="GRV No" id="mrvNo" name="mrvNo">
						         </div>
						         <div class="col-sm-2">
									<label>Indent PO No</label><input type="text" class="form-control" placeholder="Indent PO No" id="indPoNo" name="indPoNo">
						         </div>
						         </div>
						         <div class="row">
						          <div class="col-sm-2">
									<label>Party Bill Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											name="pbDateS" id="pbDateS" placeholder="DD/MM/YYYY">
										<label for="pbDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							  	 </div>	
						          <div class="col-sm-2">
									<label>Party Bill No</label><input type="text" class="form-control" placeholder="Party Bill No" id="pbNo" name="pbNo">
						         </div>
								</div>
								
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							
							<button class="btn btn-primary btn-sm voffset" type="button" name="searchRet" id="searchRet">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
							<button name="export" id="export" type="button"
								class="btn btn-primary btn-sm voffset" disabled>
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
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



<script src="resource/oe/assets/js/app/indent.js" type="text/javascript"></script>

<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>