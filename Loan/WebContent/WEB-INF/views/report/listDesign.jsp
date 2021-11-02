<!-- 
	##	Author1         : 	Dipankar Naha
	## 	Author2 	    :   POOJA
	##	Date Creation 	: 	02-02-2017
	## 	Description		:	Creation of DC Master
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Design Status Report
					</h1>
					<div class="heading-block-action"></div>
				</div>
				<form class="form-horizontal" id="listDesignSearch" action="">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<label>Release Date From</label>
								<div class="input-group">
									<input type="text"  readonly = 'true' class="date-picker form-control dateBackground"  name="listDesignFromDate"
										id="listDesignFromDate" placeholder="DD/MM/YYYY"> <label
										for="listDesignFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>Release Date To </label>
								<div class="input-group">
									<input type="text"  readonly = 'true' class="date-picker form-control dateBackground" name="listDesignToDate"
										id="listDesignToDate" placeholder="DD/MM/YYYY"> <label
										for="listDesignToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>Order Type</label>
								<div id="orderTypeS"></div>
							</div>
							
							<div class="col-sm-2">
								<label>Store Name</label>
								<div id="storeNameS"></div>
							</div>
						
							<div class="col-sm-2">
								<label>DC Name</label>
								<div id="dcNameS"></div>
							</div>
							<div class="col-sm-2">
								<label>Design Status</label>
								<div id="desStatus"></div>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>	
							&nbsp;					
							<button id="clear" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>	
							&nbsp;						
							<button name="export" id="export"  type="button" class="btn btn-primary btn-sm voffset">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
						</div>
				</form>
				<!-- store Master Header Started -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started -->
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

<script src="resource/oe/assets/js/app/listDesign.js" type="text/javascript"></script>
	
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>