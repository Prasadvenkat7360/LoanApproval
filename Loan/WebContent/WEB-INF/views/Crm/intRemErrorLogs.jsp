<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat
	##	Date Creation 	: 	06-08-2020
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Failed Batch UI Customer Intimation/Reminder</h1>
				</div>
					<form class="form-horizontal" id="intRemRepForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-3">
								<span class="required">*</span>&nbsp;<label>Intimation Reminder Ref Doc Type</label>
									<select id="intRemRefTypeS" name="intRemRefTypeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>From Date</label>
									<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
									 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
									<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							       </div>
						   </div>
						   <div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>To Date</label>
									<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
									name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
									<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							</div>
							</div>
							
						<div class="clearfix">&nbsp;</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div class="row">
						<!-- JqGrid Started for search-->
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
						<!-- JqGrid Ended -->
						<div class="clearfix">&nbsp;</div>	
				</form>
				
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/custIntRemBatch.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>