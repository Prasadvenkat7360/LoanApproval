<!-- 
	##	Author        : 	Dipankar Naha
	##	Date Creation 	: 	15-02-2017
	## 	Description		:	Creation of Standard Metal Rate / Metal MAP Price
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- DC Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Metal MAP Price
					</h1>
					<div class="heading-block-action"></div>
				</div>
				<form class="form-horizontal" id="metalMAPPriceForm" action="">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>
								<label>Segment</label> <select id="metalSeg" class="form-control" name="metalSeg">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Date From</label> 
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="dateFrom" placeholder="DD/MM/YYYY" name="dateFrom"> <label
										for="dateFrom" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<label>Date To</label> 
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="dateTo" placeholder="DD/MM/YYYY"  name="dateTo"> <label
										for="dateTo" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>	
							&nbsp;					
							<button id="clear" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>	
							&nbsp;					
							<button id="export" class="btn btn-primary btn-sm voffset"
								type="reset">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
						</div>
				</form>
				<!-- Dc Master Header Started -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for Dc Master create and search-->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/metalMAPPrice.js"type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>